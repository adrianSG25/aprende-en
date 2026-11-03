import React, { useState, useEffect } from 'react';
import {
  generateMediaAnalysisWithAI,
  evaluateMediaQuestionAnswerWithAI,
  checkSpanishMeaningMatch,
  MediaAnalysisSession,
  MediaWordItem,
  MediaQuestionItem,
  OpenAnswerFeedback
} from '../services/aiService';
import {
  appendCustomDictionaryWords,
  DictionaryWord
} from '../data/fieldDictionaryData';
import {
  loadMediaSessions,
  saveMediaSession,
  deleteMediaSession
} from '../services/storageService';
import { GameProgress } from '../types/streetGame';
import {
  Tv,
  Sparkles,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Volume2,
  Check,
  Plus,
  Clock,
  Trash2,
  Languages,
  AlertTriangle,
  Wrench,
  Edit3,
  AlertCircle,
  X
} from 'lucide-react';

interface MediaLearningZoneProps {
  progress?: GameProgress;
  onUpdateProgress?: (updated: GameProgress) => void;
  onOpenSettings?: () => void;
}

// Pronunciación de voz nativa británica en navegador
const speakEnglishText = (text: string) => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'en-GB';
      u.rate = 0.9;
      window.speechSynthesis.speak(u);
    } catch {
      // Ignorar si el navegador bloquea audio automático
    }
  }
};

// Normalizar texto para comparación tolerante
const normalizeSentence = (str: string) => {
  return str
    .toLowerCase()
    .replace(/[.,/#!$%^&*;:{}=\-_`~()?"'’]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
};

interface WordAttemptState {
  userTyped: string;
  isEvaluated: boolean;
  isCorrect: boolean;
  correctionRepInput?: string;
  correctionRepDone?: boolean;
}

interface QuestionRepetitionState {
  currentInput: string;
  repsCompleted: number;
  isCompleted: boolean;
  errorNotice?: string;
}

const PRESET_SUGGESTIONS = [
  {
    type: 'series' as const,
    title: 'The Gentlemen',
    episode: 'Temporada 1, Episodio 2',
    label: '🎩 The Gentlemen (T1 E2)',
    notes: 'Eddie negocia la deuda de Freddy con Tommy Dixon y descubre la granja oculta'
  },
  {
    type: 'series' as const,
    title: 'Peaky Blinders',
    episode: 'Temporada 1, Episodio 1',
    label: '🥃 Peaky Blinders (T1 E1)',
    notes: 'Thomas Shelby roba el cargamento de armas del gobierno en Birmingham'
  },
  {
    type: 'series' as const,
    title: 'Top Boy',
    episode: 'Temporada 1, Episodio 1',
    label: '🏙️ Top Boy (T1 E1)',
    notes: 'Dushane y Sully controlan el barrio de Summerhouse en Londres'
  },
  {
    type: 'series' as const,
    title: 'Ted Lasso',
    episode: 'Temporada 1, Episodio 2',
    label: '⚽ Ted Lasso (T1 E2)',
    notes: 'Ted intenta ganarse al vestuario y a Jamie Tartt con galletas'
  },
  {
    type: 'movie' as const,
    title: 'Snatch: Cerdos y Diamantes',
    episode: 'Película completa',
    label: '🥊 Snatch (Película)',
    notes: 'Turco y Tommy en el mundo del boxeo ilegal y gánsteres de Londres'
  },
  {
    type: 'movie' as const,
    title: 'Harry Potter y la Piedra Filosofal',
    episode: 'Película completa',
    label: '⚡ Harry Potter (Película)',
    notes: 'Harry llega a Hogwarts, la selección de casas y el espejo de Oesed'
  }
];

export const MediaLearningZone: React.FC<MediaLearningZoneProps> = ({
  progress,
  onUpdateProgress,
  onOpenSettings
}) => {
  // Formulario
  const [mediaType, setMediaType] = useState<'series' | 'movie' | 'book'>('series');
  const [mediaTitle, setMediaTitle] = useState('The Gentlemen');
  const [episodeOrPart, setEpisodeOrPart] = useState('Temporada 1, Episodio 2');
  const [userNotes, setUserNotes] = useState('');

  // Estados de generación
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);

  // Sesión activa e historial
  const [activeSession, setActiveSession] = useState<MediaAnalysisSession | null>(null);
  const [savedSessions, setSavedSessions] = useState<MediaAnalysisSession[]>([]);

  // Estados de palabras (Parte 1: el usuario escribe el significado en español)
  const [wordAttempts, setWordAttempts] = useState<Record<string, WordAttemptState>>({});
  const [savedWordIds, setSavedWordIds] = useState<Set<string>>(new Set());

  // Estados de preguntas (Parte 2: el usuario responde en inglés qué pasó)
  const [questionAnswers, setQuestionAnswers] = useState<Record<string, string>>({});
  const [evaluatingQId, setEvaluatingQId] = useState<string | null>(null);
  const [questionFeedbacks, setQuestionFeedbacks] = useState<Record<string, OpenAnswerFeedback>>({});
  const [questionShowTrans, setQuestionShowTrans] = useState<Record<string, boolean>>({});
  const [repetitionMap, setRepetitionMap] = useState<Record<string, QuestionRepetitionState>>({});

  // Estados para el apartado de corrección por si la IA se equivoca de trama o personajes
  const [showCorrectionBox, setShowCorrectionBox] = useState(false);
  const [correctionNotes, setCorrectionNotes] = useState('');
  const [isRegeneratingCorrection, setIsRegeneratingCorrection] = useState(false);
  const [isEditingSynopsis, setIsEditingSynopsis] = useState(false);
  const [editedSynopsis, setEditedSynopsis] = useState('');

  // Cargar historial al iniciar
  useEffect(() => {
    const list = loadMediaSessions();
    setSavedSessions(list);
    if (list.length > 0 && !activeSession) {
      setActiveSession(list[0]);
    }
  }, []);

  // Manejar preset rápido
  const handleSelectPreset = (preset: typeof PRESET_SUGGESTIONS[0]) => {
    setMediaType(preset.type);
    setMediaTitle(preset.title);
    setEpisodeOrPart(preset.episode);
    setUserNotes(preset.notes);
  };

  // Generar sesión con IA
  const handleGenerateSession = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mediaTitle.trim() || !episodeOrPart.trim()) return;

    setIsGenerating(true);
    setGenerationError(null);

    try {
      const session = await generateMediaAnalysisWithAI(
        mediaTitle.trim(),
        mediaType,
        episodeOrPart.trim(),
        userNotes.trim()
      );
      const updatedList = saveMediaSession(session);
      setSavedSessions(updatedList);
      setActiveSession(session);
      // Reset estados de inputs
      setWordAttempts({});
      setQuestionAnswers({});
      setQuestionFeedbacks({});
      setRepetitionMap({});
    } catch (err: unknown) {
      setGenerationError(
        err instanceof Error
          ? err.message
          : 'Error al generar el análisis con IA. Revisa tu API key en Ajustes IA.'
      );
    } finally {
      setIsGenerating(false);
    }
  };

  // Eliminar sesión
  const handleDeleteSession = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = deleteMediaSession(id);
    setSavedSessions(updated);
    if (activeSession?.id === id) {
      setActiveSession(updated[0] || null);
    }
  };

  // Regenerar la sesión obligando a la IA a seguir la trama real del usuario
  const handleRegenerateWithCorrection = async () => {
    if (!activeSession) return;
    setIsRegeneratingCorrection(true);
    setGenerationError(null);

    const fullCorrectionInstruction = `CORRECCIÓN URGENTE DEL USUARIO: La trama previa fue errónea o mezcló personajes de otra película o temporada no estrenada. Utiliza OBLIGATORIAMENTE esta información real del episodio: "${correctionNotes}". No inventes otros personajes ajenos a esto.`;

    try {
      const session = await generateMediaAnalysisWithAI(
        activeSession.mediaTitle,
        activeSession.mediaType,
        activeSession.episodeOrPart,
        fullCorrectionInstruction
      );
      // Mantener id de la sesión para sobrescribirla limpiamente
      const correctedSession = { ...session, id: activeSession.id };
      const updatedList = saveMediaSession(correctedSession);
      setSavedSessions(updatedList);
      setActiveSession(correctedSession);
      setShowCorrectionBox(false);
      setCorrectionNotes('');
      setWordAttempts({});
      setQuestionAnswers({});
      setQuestionFeedbacks({});
      setRepetitionMap({});
    } catch (err: unknown) {
      setGenerationError(
        err instanceof Error ? err.message : 'Error al regenerar con la corrección.'
      );
    } finally {
      setIsRegeneratingCorrection(false);
    }
  };

  // Guardar edición manual de la sinopsis
  const handleSaveEditedSynopsis = () => {
    if (!activeSession || !editedSynopsis.trim()) return;
    const updated: MediaAnalysisSession = {
      ...activeSession,
      synopsisEs: editedSynopsis.trim()
    };
    const list = saveMediaSession(updated);
    setSavedSessions(list);
    setActiveSession(updated);
    setIsEditingSynopsis(false);
  };

  // PARTE 1: Comprobar traducción al español escrita por el alumno
  const handleCheckWordMeaning = (w: MediaWordItem) => {
    const attempt = wordAttempts[w.id];
    if (!attempt || !attempt.userTyped.trim()) return;

    const isMatch = checkSpanishMeaningMatch(attempt.userTyped, w.acceptedMeaningsEs);
    setWordAttempts((prev) => ({
      ...prev,
      [w.id]: {
        ...prev[w.id],
        isEvaluated: true,
        isCorrect: isMatch
      }
    }));

    // Si acertó y hay sistema de progreso, dar XP
    if (isMatch && onUpdateProgress && progress) {
      onUpdateProgress({
        ...progress,
        xp: progress.xp + 10,
        quids: progress.quids + 1
      });
    }
  };

  // Guardar palabra en el Machaque / Diccionario personal
  const handleSaveWordToVocabulary = (w: MediaWordItem) => {
    const newWord: DictionaryWord = {
      id: `media-custom-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      es: w.primaryMeaningEs,
      en: w.wordEn,
      acceptedAnswers: [w.wordEn.toLowerCase().trim()],
      pron: w.pron,
      category: 'custom_ai',
      partOfSpeech: w.partOfSpeech === 'slang' ? 'expression' : w.partOfSpeech,
      exampleEn: w.sceneContextEn,
      exampleEs: w.sceneContextEs
    };

    appendCustomDictionaryWords([newWord]);
    setSavedWordIds((prev) => new Set(prev).add(w.id));
  };

  // PARTE 2: Evaluar respuesta a la pregunta del episodio
  const handleEvaluateQuestion = async (q: MediaQuestionItem) => {
    const userText = questionAnswers[q.id]?.trim();
    if (!userText || !activeSession) return;

    setEvaluatingQId(q.id);
    try {
      const fb = await evaluateMediaQuestionAnswerWithAI(
        activeSession.mediaTitle,
        activeSession.episodeOrPart,
        q.questionEn,
        userText,
        q.sampleIdealAnswerEn
      );

      setQuestionFeedbacks((prev) => ({ ...prev, [q.id]: fb }));
      setRepetitionMap((prev) => ({
        ...prev,
        [q.id]: {
          currentInput: '',
          repsCompleted: 0,
          isCompleted: false
        }
      }));

      if (fb.scoreOutOf10 >= 8 && onUpdateProgress && progress) {
        onUpdateProgress({
          ...progress,
          xp: progress.xp + 25,
          quids: progress.quids + 3
        });
      }
    } catch (err: unknown) {
      alert(
        err instanceof Error
          ? err.message
          : 'Error al evaluar la respuesta. Comprueba tu conexión y clave de IA.'
      );
    } finally {
      setEvaluatingQId(null);
    }
  };

  // Repetición activa de errores de memoria (0/2 repeticiones)
  const handleCheckRepetition = (qId: string, targetSentence: string) => {
    const current = repetitionMap[qId] || { currentInput: '', repsCompleted: 0, isCompleted: false };
    const inputClean = normalizeSentence(current.currentInput);
    const targetClean = normalizeSentence(targetSentence);

    if (!inputClean) return;

    if (inputClean === targetClean) {
      const nextReps = current.repsCompleted + 1;
      const isDone = nextReps >= 2;
      setRepetitionMap((prev) => ({
        ...prev,
        [qId]: {
          currentInput: '',
          repsCompleted: nextReps,
          isCompleted: isDone,
          errorNotice: undefined
        }
      }));
    } else {
      setRepetitionMap((prev) => ({
        ...prev,
        [qId]: {
          ...current,
          errorNotice: 'No coincide exactamente. Recuerda la corrección de arriba y vuelve a escribirla de memoria.'
        }
      }));
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-5 sm:p-7 shadow-md border border-indigo-900/50">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                <Tv className="w-5 h-5 text-indigo-400" />
              </span>
              <span className="text-xs font-black uppercase tracking-wider text-indigo-300">
                Aprende con tus Series, Pelis y Libros
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              Inglés de Series & Cine con IA
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Dile a la IA qué episodio o película acabas de ver. Te dará primero las palabras y jerga
              poco comunes que tienes que traducir al español, y después preguntas sobre la trama
              con corrección gramatical y repetición de fallos.
            </p>
          </div>

          {onOpenSettings && (
            <button
              type="button"
              onClick={onOpenSettings}
              className="self-start sm:self-center px-4 py-2.5 rounded-2xl bg-indigo-600/80 hover:bg-indigo-600 text-white font-bold text-xs flex items-center gap-2 border border-indigo-400/40 cursor-pointer shrink-0 transition-all"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Ajustes IA</span>
            </button>
          )}
        </div>
      </div>

      {/* Formulario de Análisis con IA */}
      <form
        onSubmit={handleGenerateSession}
        className="bg-white border-2 border-slate-200 rounded-3xl p-5 sm:p-6 shadow-sm space-y-4"
      >
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            ¿Qué has visto o leído hoy?
          </h3>
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
            100% IA
          </span>
        </div>

        {/* Tipo de obra */}
        <div>
          <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1.5">
            Tipo de contenido:
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(
              [
                { id: 'series', label: '📺 Serie de TV' },
                { id: 'movie', label: '🎬 Película' },
                { id: 'book', label: '📖 Libro' }
              ] as const
            ).map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setMediaType(t.id)}
                className={`py-2.5 px-3 rounded-2xl font-bold text-xs sm:text-sm border transition-all cursor-pointer ${
                  mediaType === t.id
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sugerencias Rápidas */}
        <div className="space-y-1.5">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            Ejemplos en 1 clic:
          </span>
          <div className="flex flex-wrap gap-1.5 text-xs">
            {PRESET_SUGGESTIONS.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectPreset(preset)}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-300 text-slate-700 border border-slate-200 font-bold transition-all cursor-pointer"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Inputs de Título y Episodio */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Título de la Serie, Peli o Libro:
            </label>
            <input
              type="text"
              value={mediaTitle}
              onChange={(e) => setMediaTitle(e.target.value)}
              placeholder="Ej: The Gentlemen, Peaky Blinders, Ted Lasso..."
              className="w-full bg-white border-2 border-slate-300 focus:border-indigo-600 rounded-2xl p-3 text-xs sm:text-sm font-semibold text-slate-900 outline-none"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Temporada y Episodio / Capítulo:
            </label>
            <input
              type="text"
              value={episodeOrPart}
              onChange={(e) => setEpisodeOrPart(e.target.value)}
              placeholder="Ej: Temporada 1, Episodio 2 (o Película completa)"
              className="w-full bg-white border-2 border-slate-300 focus:border-indigo-600 rounded-2xl p-3 text-xs sm:text-sm font-semibold text-slate-900 outline-none"
              required
            />
          </div>
        </div>

        {mediaTitle.toLowerCase().includes('gentlemen') && (
          <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-200 text-xs text-indigo-950 space-y-1">
            <p className="font-bold">
              💡 Aclaración sobre <em>The Gentlemen</em>:
            </p>
            <p>
              • <strong>Serie de Netflix (2024):</strong> Protagonizada por Eddie Horniman (Theo James) y Susie Glass (Kaya Scodelario). Tiene 8 episodios en la Temporada 1. (La Temporada 2 aún no se ha estrenado).
            </p>
            <p>
              • <strong>Película de 2019:</strong> Protagonizada por Mickey Pearson (Matthew McConaughey) y Ray (Charlie Hunnam).
            </p>
          </div>
        )}

        {/* Detalles opcionales que recuerde */}
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">
            ¿Quiénes salen o qué pasó? (Pega la sinopsis de Netflix o tus notas para que la IA no invente nada):
          </label>
          <input
            type="text"
            value={userNotes}
            onChange={(e) => setUserNotes(e.target.value)}
            placeholder="Ej: Es la serie de Netflix con Eddie Horniman / Pega aquí la sinopsis de Netflix / Escena del pub..."
            className="w-full bg-white border-2 border-slate-300 focus:border-indigo-600 rounded-2xl p-3 text-xs sm:text-sm font-semibold text-slate-900 outline-none"
          />
        </div>

        {/* Error Message */}
        {generationError && (
          <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Error de la IA:</p>
              <p>{generationError}</p>
            </div>
          </div>
        )}

        {/* Botón de Enviar */}
        <button
          type="submit"
          disabled={isGenerating || !mediaTitle.trim() || !episodeOrPart.trim()}
          className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] disabled:opacity-40 text-white font-black text-xs sm:text-sm rounded-2xl shadow-sm flex items-center justify-center gap-2 cursor-pointer transition-all min-h-[46px]"
        >
          {isGenerating ? (
            <>
              <RotateCcw className="w-4 h-4 animate-spin" />
              <span>Analizando episodio y extrayendo vocabulario poco común...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Analizar este Episodio con IA</span>
            </>
          )}
        </button>
      </form>

      {/* Historial de Episodios Previos */}
      {savedSessions.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-2.5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-indigo-600" />
              Episodios y Pelis que has analizado ({savedSessions.length}):
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {savedSessions.map((s) => {
              const isSelected = activeSession?.id === s.id;
              return (
                <div
                  key={s.id}
                  onClick={() => setActiveSession(s)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-indigo-50 border-indigo-400 text-indigo-900 shadow-2xs'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span>
                    {s.mediaType === 'series' ? '📺' : s.mediaType === 'movie' ? '🎬' : '📖'}{' '}
                    {s.mediaTitle} ({s.episodeOrPart})
                  </span>
                  <button
                    type="button"
                    onClick={(e) => handleDeleteSession(s.id, e)}
                    className="text-slate-400 hover:text-rose-600 p-0.5 rounded cursor-pointer"
                    title="Eliminar sesión"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* CONTENIDO DE LA SESIÓN ACTIVA */}
      {activeSession && (
        <div className="space-y-6 animate-in fade-in">
          {/* Header de la Sesión Activa */}
          <div className="bg-white border-2 border-indigo-200 rounded-3xl p-5 sm:p-6 shadow-sm space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-black uppercase px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                {activeSession.mediaType === 'series'
                  ? 'Serie de TV'
                  : activeSession.mediaType === 'movie'
                  ? 'Película'
                  : 'Libro'}
              </span>
              <span className="text-xs text-slate-500 font-semibold">
                {new Date(activeSession.createdAt).toLocaleDateString('es-ES')}
              </span>
            </div>

            <h3 className="text-lg sm:text-2xl font-black text-slate-900">
              {activeSession.mediaTitle} — {activeSession.episodeOrPart}
            </h3>

            {!isEditingSynopsis ? (
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-700 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-900 flex items-center gap-1.5">
                    🎬 Resumen de la trama:
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setEditedSynopsis(activeSession.synopsisEs);
                      setIsEditingSynopsis(true);
                    }}
                    className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>Editar texto</span>
                  </button>
                </div>
                <p className="leading-relaxed">{activeSession.synopsisEs}</p>
              </div>
            ) : (
              <div className="bg-indigo-50/50 p-3.5 rounded-2xl border border-indigo-200 space-y-2">
                <span className="text-xs font-bold text-indigo-950 block">
                  Editar resumen de la trama manualmente:
                </span>
                <textarea
                  rows={3}
                  value={editedSynopsis}
                  onChange={(e) => setEditedSynopsis(e.target.value)}
                  className="w-full bg-white border border-indigo-300 rounded-xl p-2.5 text-xs sm:text-sm text-slate-900 outline-none"
                />
                <div className="flex gap-2 justify-end">
                  <button
                    type="button"
                    onClick={() => setIsEditingSynopsis(false)}
                    className="px-3 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveEditedSynopsis}
                    className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold cursor-pointer"
                  >
                    Guardar resumen
                  </button>
                </div>
              </div>
            )}

            {/* Botón y Panel de Corrección de Alucinación / Error de IA */}
            <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => setShowCorrectionBox(!showCorrectionBox)}
                className={`text-xs font-bold px-3 py-2 rounded-xl border flex items-center gap-1.5 cursor-pointer transition-all ${
                  showCorrectionBox
                    ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                    : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-300'
                }`}
              >
                <AlertCircle className="w-4 h-4 text-amber-600" />
                <span>¿La IA se ha equivocado o inventado la trama? Corregir aquí</span>
              </button>

              <button
                type="button"
                onClick={(e) => handleDeleteSession(activeSession.id, e)}
                className="text-xs text-rose-600 hover:text-rose-800 font-bold px-2 py-1 flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Borrar este episodio</span>
              </button>
            </div>

            {/* Apartado Desplegable de Corrección */}
            {showCorrectionBox && (
              <div className="p-4 rounded-2xl bg-amber-50/90 border-2 border-amber-300 space-y-3 animate-in fade-in">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Wrench className="w-4 h-4 text-amber-800 shrink-0" />
                    <h4 className="font-extrabold text-amber-950 text-xs sm:text-sm">
                      Apartado de Corrección: Dile a la IA lo que pasó realmente
                    </h4>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowCorrectionBox(false)}
                    className="text-amber-800 hover:text-amber-950 p-1 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs text-amber-900 leading-relaxed">
                  Las IAs a veces mezclan películas y series del mismo nombre (ej: <em>The Gentlemen</em> de Netflix de 2024 con Eddie Horniman vs la peli de 2019 con Mickey Pearson), o inventan historias si una temporada aún no se ha estrenado.
                </p>

                {/* Chips rápidos de corrección */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider block">
                    Aclaraciones rápidas sugeridas:
                  </span>
                  <div className="flex flex-wrap gap-1.5 text-xs">
                    <button
                      type="button"
                      onClick={() =>
                        setCorrectionNotes(
                          'Es la serie de Netflix de 2024 (Guy Ritchie) con Eddie Horniman (Theo James), Susie Glass y Freddy Horniman. No es la película de 2019 de Mickey Pearson.'
                        )
                      }
                      className="px-2.5 py-1 rounded-lg bg-white border border-amber-300 hover:bg-amber-100 text-amber-950 font-semibold cursor-pointer"
                    >
                      🎩 Es la serie de Netflix (Eddie & Susie Glass)
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setCorrectionNotes(
                          'Es la película de 2019 con Mickey Pearson (Matthew McConaughey) y Ray (Charlie Hunnam).'
                        )
                      }
                      className="px-2.5 py-1 rounded-lg bg-white border border-amber-300 hover:bg-amber-100 text-amber-950 font-semibold cursor-pointer"
                    >
                      🥊 Es la película de 2019 (Mickey & Ray)
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setCorrectionNotes(
                          'La Temporada 2 de Netflix aún no se ha estrenado. Céntrate en los personajes de la Temporada 1 (Eddie Horniman heredando el ducado y Susie Glass).'
                        )
                      }
                      className="px-2.5 py-1 rounded-lg bg-white border border-amber-300 hover:bg-amber-100 text-amber-950 font-semibold cursor-pointer"
                    >
                      ⚠️ La Temporada 2 aún no existe en Netflix
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setCorrectionNotes(
                          'Temporada 1 Episodio 2: Eddie intenta saldar la deuda de 8 millones de libras de su hermano Freddy con Tommy Dixon mientras Susie controla la granja de marihuana bajo la mansión.'
                        )
                      }
                      className="px-2.5 py-1 rounded-lg bg-white border border-amber-300 hover:bg-amber-100 text-amber-950 font-semibold cursor-pointer"
                    >
                      📺 T1 E2: Deuda de Freddy con Tommy Dixon
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-amber-950 block">
                    Escribe o pega aquí la trama real o lo que viste:
                  </label>
                  <textarea
                    rows={3}
                    value={correctionNotes}
                    onChange={(e) => setCorrectionNotes(e.target.value)}
                    placeholder="Ej: Salen Eddie Horniman y Susie Glass. Eddie descubre que bajo su mansión hay una granja oculta de marihuana y Tommy Dixon exige 8 millones..."
                    className="w-full bg-white border-2 border-amber-300 focus:border-amber-600 rounded-xl p-3 text-xs sm:text-sm text-slate-900 outline-none"
                  />
                </div>

                <button
                  type="button"
                  disabled={isRegeneratingCorrection || !correctionNotes.trim()}
                  onClick={handleRegenerateWithCorrection}
                  className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 disabled:opacity-40 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs cursor-pointer flex items-center justify-center gap-2 min-h-[42px]"
                >
                  {isRegeneratingCorrection ? (
                    <>
                      <RotateCcw className="w-4 h-4 animate-spin" />
                      <span>Regenerando sesión con la trama real...</span>
                    </>
                  ) : (
                    <>
                      <RotateCcw className="w-4 h-4" />
                      <span>Regenerar sesión con esta trama real</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* ======================================================== */}
          {/* PARTE 1: PALABRAS POCO COMUNES (Escribe en español) */}
          {/* ======================================================== */}
          <div className="bg-white border-2 border-amber-200 rounded-3xl p-5 sm:p-6 shadow-sm space-y-5">
            <div className="pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-black text-sm">
                  1
                </span>
                <h4 className="text-base sm:text-lg font-black text-slate-900">
                  Palabras y Jerga Poco Comunes del Episodio
                </h4>
              </div>
              <p className="text-xs text-slate-600 mt-1">
                La IA ha extraído las palabras no habituales de este episodio. <strong>Escribe tú qué significa cada una en español</strong> para entrenar tu cerebro:
              </p>
            </div>

            <div className="space-y-4">
              {activeSession.words.map((w, idx) => {
                const attempt = wordAttempts[w.id] || {
                  userTyped: '',
                  isEvaluated: false,
                  isCorrect: false
                };
                const isSaved = savedWordIds.has(w.id);

                return (
                  <div
                    key={w.id}
                    className={`p-4 sm:p-5 rounded-2xl border-2 transition-all space-y-3 ${
                      attempt.isEvaluated
                        ? attempt.isCorrect
                          ? 'bg-emerald-50/60 border-emerald-300'
                          : 'bg-rose-50/50 border-rose-300'
                        : 'bg-slate-50/80 border-slate-200 hover:border-amber-300'
                    }`}
                  >
                    {/* Fila del término en inglés y pronunciación */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xs font-mono font-bold text-slate-400">
                          #{idx + 1}
                        </span>
                        <h5 className="text-base sm:text-lg font-black text-slate-900">
                          {w.wordEn}
                        </h5>
                        {w.pron && (
                          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-lg bg-amber-50 text-amber-900 border border-amber-200">
                            [{w.pron}]
                          </span>
                        )}
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 uppercase">
                          {w.partOfSpeech}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => speakEnglishText(w.wordEn)}
                        title="Escuchar pronunciación británica"
                        className="p-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 cursor-pointer shadow-2xs"
                      >
                        <Volume2 className="w-4 h-4 text-indigo-600" />
                      </button>
                    </div>

                    {/* Frase de contexto en el episodio */}
                    <div className="text-xs sm:text-sm bg-white p-3 rounded-xl border border-slate-200 space-y-1">
                      <span className="text-[10px] font-black uppercase text-slate-400 block">
                        Cómo se usó en el episodio:
                      </span>
                      <p className="font-semibold text-slate-900">"{w.sceneContextEn}"</p>
                      <button
                        type="button"
                        onClick={() => speakEnglishText(w.sceneContextEn)}
                        className="text-[11px] text-indigo-600 font-bold hover:underline flex items-center gap-1 cursor-pointer pt-0.5"
                      >
                        <Volume2 className="w-3 h-3" />
                        <span>Escuchar frase completa</span>
                      </button>
                    </div>

                    {/* Input para que el usuario escriba en español */}
                    {!attempt.isEvaluated ? (
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-700 block">
                          ¿Qué significa en español? (Escribe tu traducción):
                        </label>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <input
                            type="text"
                            value={attempt.userTyped}
                            onChange={(e) => {
                              const val = e.target.value;
                              setWordAttempts((prev) => ({
                                ...prev,
                                [w.id]: {
                                  ...(prev[w.id] || { isEvaluated: false, isCorrect: false }),
                                  userTyped: val
                                }
                              }));
                            }}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                handleCheckWordMeaning(w);
                              }
                            }}
                            placeholder="Ej: fianza, garantía, tipo sospechoso..."
                            className="flex-1 bg-white border-2 border-slate-300 focus:border-amber-500 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => handleCheckWordMeaning(w)}
                            disabled={!attempt.userTyped.trim()}
                            className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 disabled:opacity-40 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer min-h-[42px] shrink-0"
                          >
                            Comprobar significado
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* Resultado de la comprobación */
                      <div className="space-y-2.5">
                        <div
                          className={`p-3 rounded-xl border text-xs sm:text-sm font-semibold flex items-center justify-between gap-2 ${
                            attempt.isCorrect
                              ? 'bg-emerald-100/70 border-emerald-300 text-emerald-950'
                              : 'bg-rose-100/70 border-rose-300 text-rose-950'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            {attempt.isCorrect ? (
                              <>
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                                <span>¡Exacto! Tu respuesta: "{attempt.userTyped}"</span>
                              </>
                            ) : (
                              <>
                                <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                                <span>
                                  Pusiste: "{attempt.userTyped}". Significado real: <strong>{w.primaryMeaningEs}</strong>
                                </span>
                              </>
                            )}
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              setWordAttempts((prev) => ({
                                ...prev,
                                [w.id]: {
                                  ...prev[w.id],
                                  isEvaluated: false
                                }
                              }))
                            }
                            className="text-xs text-slate-600 hover:text-slate-900 underline font-bold cursor-pointer"
                          >
                            Reintentar
                          </button>
                        </div>

                        {/* Explicación y contexto */}
                        <div className="text-xs bg-white p-3 rounded-xl border border-slate-200 text-slate-700 space-y-1">
                          <p>
                            <strong>💡 Significado en español:</strong> {w.primaryMeaningEs} (Traducción frase: <em>"{w.sceneContextEs}"</em>)
                          </p>
                          {w.explanationWhyEs && (
                            <p className="text-slate-500">
                              <strong>🇬🇧 Uso en UK:</strong> {w.explanationWhyEs}
                            </p>
                          )}
                        </div>

                        {/* Botón para añadir a mi Machaque */}
                        <button
                          type="button"
                          onClick={() => handleSaveWordToVocabulary(w)}
                          disabled={isSaved}
                          className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                            isSaved
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                              : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
                          }`}
                        >
                          {isSaved ? (
                            <>
                              <Check className="w-4 h-4 text-emerald-600" />
                              <span>¡Guardada en tu Diccionario de Machaque!</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-4 h-4" />
                              <span>➕ Añadir a mi Vocabulario para Machacarla</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* ======================================================== */}
          {/* PARTE 2: PREGUNTAS SOBRE QUÉ HA PASADO EN EL EPISODIO */}
          {/* ======================================================== */}
          <div className="bg-white border-2 border-indigo-200 rounded-3xl p-5 sm:p-6 shadow-sm space-y-5">
            <div className="pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center font-black text-sm">
                  2
                </span>
                <h4 className="text-base sm:text-lg font-black text-slate-900">
                  ¿Qué ha pasado en este episodio? (Escribe en inglés)
                </h4>
              </div>
              <p className="text-xs text-slate-600 mt-1">
                Escribe en inglés con tus propias palabras qué ocurrió. La IA revisará la exactitud
                con lo que pasó en el episodio, corregirá tu gramática y te pedirá repetir los fallos de memoria.
              </p>
            </div>

            <div className="space-y-5">
              {activeSession.questions.map((q, idx) => {
                const userAns = questionAnswers[q.id] || '';
                const isEvaluating = evaluatingQId === q.id;
                const fb = questionFeedbacks[q.id];
                const showTrans = !!questionShowTrans[q.id];
                const repState = repetitionMap[q.id];

                return (
                  <div
                    key={q.id}
                    className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-3"
                  >
                    {/* Pregunta en inglés */}
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <p className="font-extrabold text-sm sm:text-base text-slate-900">
                        {idx + 1}. {q.questionEn}
                      </p>
                      <button
                        type="button"
                        onClick={() =>
                          setQuestionShowTrans((prev) => ({ ...prev, [q.id]: !prev[q.id] }))
                        }
                        className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 flex items-center gap-1.5 cursor-pointer shrink-0"
                      >
                        <Languages className="w-3.5 h-3.5" />
                        {showTrans ? 'Ocultar traducción' : 'Traducir pregunta'}
                      </button>
                    </div>

                    {showTrans && (
                      <p className="text-xs sm:text-sm text-indigo-950 bg-indigo-50 border border-indigo-200 rounded-xl px-3 py-2">
                        🌐 {q.questionEs}
                      </p>
                    )}

                    {q.sceneHintEs && (
                      <p className="text-xs text-slate-500 font-medium">
                        🎬 {q.sceneHintEs} • {q.targetGrammarHint}
                      </p>
                    )}

                    {/* Textarea de respuesta */}
                    <textarea
                      rows={3}
                      value={userAns}
                      onChange={(e) =>
                        setQuestionAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))
                      }
                      placeholder="Escribe tu respuesta en inglés aquí sobre qué pasó..."
                      className="w-full bg-white border-2 border-slate-300 focus:border-indigo-600 rounded-xl p-3 text-xs sm:text-sm text-slate-900 outline-none min-h-[85px]"
                      spellCheck={false}
                    />

                    {/* Botón Corregir */}
                    <button
                      type="button"
                      disabled={isEvaluating || !userAns.trim()}
                      onClick={() => handleEvaluateQuestion(q)}
                      className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs flex items-center justify-center gap-2 cursor-pointer min-h-[42px]"
                    >
                      {isEvaluating ? (
                        <>
                          <RotateCcw className="w-4 h-4 animate-spin" />
                          <span>Analizando tu respuesta con IA...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4" />
                          <span>Corregir mi respuesta</span>
                        </>
                      )}
                    </button>

                    {/* Feedback de la IA */}
                    {fb && (
                      <div className="mt-4 p-4 rounded-2xl bg-white border border-emerald-300 space-y-3.5 text-xs sm:text-sm shadow-xs">
                        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-100">
                          <span className="font-extrabold text-emerald-800 text-sm">
                            ✅ Corrección de la IA (Nota: {fb.scoreOutOf10}/10)
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-bold border ${
                              fb.isContentAccurate
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : 'bg-amber-50 text-amber-800 border-amber-200'
                            }`}
                          >
                            {fb.isContentAccurate
                              ? '🎬 Hechos del episodio correctos'
                              : '⚠️ Revisa los hechos del episodio'}
                          </span>
                        </div>

                        <p className="text-slate-700 leading-relaxed">{fb.feedbackEs}</p>

                        {/* Errores encontrados */}
                        {fb.errorsFound && fb.errorsFound.length > 0 && (
                          <div className="space-y-2">
                            <span className="text-xs font-bold uppercase text-rose-800 block">
                              Errores detectados en tu inglés:
                            </span>
                            {fb.errorsFound.map((err, i) => (
                              <div
                                key={i}
                                className="bg-slate-50 border border-rose-200 rounded-xl p-2.5 space-y-1"
                              >
                                <p className="text-rose-700 line-through">❌ {err.wrong}</p>
                                <p className="text-emerald-800 font-bold">✅ {err.right}</p>
                                <p className="text-slate-500 text-xs">{err.whyEs}</p>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Frase corregida y Versión B2 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-1">
                          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                            <span className="text-[10px] uppercase font-bold text-emerald-800 block mb-1">
                              Tu frase corregida:
                            </span>
                            <p className="text-slate-900 font-semibold">
                              {fb.correctedUserSentence}
                            </p>
                          </div>
                          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
                            <span className="text-[10px] uppercase font-bold text-amber-900 block mb-1">
                              Versión modelo nativa:
                            </span>
                            <p className="text-amber-950 font-semibold">
                              {fb.b2UpgradeSentence || q.sampleIdealAnswerEn}
                            </p>
                          </div>
                        </div>

                        {/* REPETICIÓN ACTIVA DE FALLOS (0/2 DE MEMORIA) */}
                        {(() => {
                          const targetSentence = (
                            fb.correctedUserSentence || q.sampleIdealAnswerEn
                          ).trim();
                          const hasMistakes =
                            (fb.errorsFound && fb.errorsFound.length > 0) ||
                            fb.scoreOutOf10 < 8 ||
                            normalizeSentence(userAns) !== normalizeSentence(targetSentence);

                          if (!hasMistakes) {
                            return (
                              <div className="mt-3 p-3 rounded-xl bg-emerald-50 border border-emerald-300 flex items-center gap-2 text-xs sm:text-sm text-emerald-900 font-bold">
                                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                                <span>🌟 ¡Respuesta impecable sin fallos! No necesitas repetir nada.</span>
                              </div>
                            );
                          }

                          return (
                            <div className="mt-4 p-4 rounded-xl bg-amber-50/80 border-2 border-amber-300 space-y-3">
                              <div className="flex flex-wrap items-center justify-between gap-2">
                                <div className="flex items-center gap-2">
                                  <RotateCcw className="w-4 h-4 text-amber-700" />
                                  <span className="font-extrabold text-amber-950 text-xs sm:text-sm">
                                    🔁 Repite de memoria para fijar el fallo ({repState?.repsCompleted || 0}/2)
                                  </span>
                                </div>
                                {repState?.isCompleted && (
                                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black border border-emerald-300 flex items-center gap-1">
                                    <Check className="w-3 h-3" />
                                    ¡Fallo superado!
                                  </span>
                                )}
                              </div>

                              <p className="text-xs text-amber-900 font-medium leading-relaxed">
                                Recuerda la corrección de arriba y escribe la frase completa sin errores <strong>2 veces seguidas de memoria</strong> para fijarla:
                              </p>

                              {!repState?.isCompleted && (
                                <div className="flex items-center justify-end">
                                  <button
                                    type="button"
                                    onClick={() => speakEnglishText(targetSentence)}
                                    title="Escuchar pista en audio"
                                    className="text-[11px] font-bold text-amber-900 hover:text-amber-950 flex items-center gap-1 bg-amber-100/70 hover:bg-amber-200 px-2.5 py-1 rounded-lg cursor-pointer transition-colors"
                                  >
                                    <Volume2 className="w-3.5 h-3.5" />
                                    <span>Pista en audio (escuchar)</span>
                                  </button>
                                </div>
                              )}

                              {!repState?.isCompleted ? (
                                <div className="space-y-2.5">
                                  <input
                                    type="text"
                                    value={repState?.currentInput || ''}
                                    onChange={(e) => {
                                      const text = e.target.value;
                                      setRepetitionMap((prev) => ({
                                        ...prev,
                                        [q.id]: {
                                          ...(prev[q.id] || { repsCompleted: 0, isCompleted: false }),
                                          currentInput: text,
                                          errorNotice: undefined
                                        }
                                      }));
                                    }}
                                    onKeyDown={(e) => {
                                      if (e.key === 'Enter') {
                                        e.preventDefault();
                                        handleCheckRepetition(q.id, targetSentence);
                                      }
                                    }}
                                    placeholder={`Repetición ${(repState?.repsCompleted || 0) + 1} de 2: Escribe la frase de memoria...`}
                                    className="w-full bg-white border-2 border-amber-300 focus:border-amber-600 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 outline-none"
                                  />

                                  <button
                                    type="button"
                                    onClick={() => handleCheckRepetition(q.id, targetSentence)}
                                    disabled={!repState?.currentInput?.trim()}
                                    className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 active:scale-[0.99] disabled:opacity-40 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs cursor-pointer min-h-[42px] flex items-center justify-center gap-1.5"
                                  >
                                    <Check className="w-4 h-4" />
                                    <span>Comprobar repetición</span>
                                  </button>

                                  {repState?.errorNotice && (
                                    <p className="text-xs text-rose-700 font-semibold bg-rose-50 p-2.5 rounded-lg border border-rose-200">
                                      ⚠️ {repState.errorNotice}
                                    </p>
                                  )}

                                  {(repState?.repsCompleted || 0) === 1 && !repState?.isCompleted && (
                                    <p className="text-xs text-emerald-800 font-bold bg-emerald-50 p-2 rounded-lg border border-emerald-200 flex items-center gap-1.5">
                                      <Check className="w-4 h-4 text-emerald-600" />
                                      ¡1ª repetición perfecta! Escríbela 1 vez más de memoria para dominarla.
                                    </p>
                                  )}
                                </div>
                              ) : (
                                <div className="bg-emerald-50 border border-emerald-300 p-3 rounded-xl flex items-center gap-2 text-emerald-900 text-xs sm:text-sm font-bold">
                                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                                  <span>🎉 ¡Fallo superado con éxito! Has escrito la frase perfecta 2 veces seguidas de memoria.</span>
                                </div>
                              )}
                            </div>
                          );
                        })()}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
