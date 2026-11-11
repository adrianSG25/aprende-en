import React, { useState, useId } from 'react';
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
import { fetchOnlineEpisodeData, TVEpisodeInfo } from '../services/tvEpisodeService';
import {
  Tv,
  Film,
  BookOpen,
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
  X,
  Search,
  Settings,
  Lightbulb,
  Clapperboard
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
    episode: 'Temporada 2, Episodio 2',
    label: 'The Gentlemen (T2 E2: Milán)',
    notes:
      'Eddie Horniman y Susie Glass viajan a Milán para cerrar el acuerdo con el capo de la mafia italiana Marco Moretti'
  },
  {
    type: 'series' as const,
    title: 'The Gentlemen',
    episode: 'Temporada 2, Episodio 1',
    label: 'The Gentlemen (T2 E1: Cacería)',
    notes:
      'Eddie organiza una cacería de alto riesgo en la mansión Halstead con mafiosos italianos y un jeque para expandir el negocio'
  },
  {
    type: 'series' as const,
    title: 'The Gentlemen',
    episode: 'Temporada 1, Episodio 2',
    label: 'The Gentlemen (T1 E2)',
    notes: 'Eddie negocia la deuda de Freddy con Tommy Dixon y descubre la granja oculta'
  },
  {
    type: 'series' as const,
    title: 'Peaky Blinders',
    episode: 'Temporada 1, Episodio 1',
    label: 'Peaky Blinders (T1 E1)',
    notes: 'Thomas Shelby roba el cargamento de armas del gobierno en Birmingham'
  },
  {
    type: 'series' as const,
    title: 'Top Boy',
    episode: 'Temporada 1, Episodio 1',
    label: 'Top Boy (T1 E1)',
    notes: 'Dushane y Sully controlan el barrio de Summerhouse en Londres'
  },
  {
    type: 'series' as const,
    title: 'Ted Lasso',
    episode: 'Temporada 1, Episodio 2',
    label: 'Ted Lasso (T1 E2)',
    notes: 'Ted intenta ganarse al vestuario y a Jamie Tartt con galletas'
  },
  {
    type: 'movie' as const,
    title: 'Snatch: Cerdos y Diamantes',
    episode: 'Película completa',
    label: 'Snatch (Película)',
    notes: 'Turco y Tommy en el mundo del boxeo ilegal y gánsteres de Londres'
  },
  {
    type: 'movie' as const,
    title: 'Harry Potter y la Piedra Filosofal',
    episode: 'Película completa',
    label: 'Harry Potter (Película)',
    notes: 'Harry llega a Hogwarts, la selección de casas y el espejo de Oesed'
  }
];

export const MediaLearningZone: React.FC<MediaLearningZoneProps> = ({
  progress,
  onUpdateProgress,
  onOpenSettings
}) => {
  const formTitleId = useId();
  const formEpisodeId = useId();
  const formNotesId = useId();
  const editSynopsisId = useId();
  const correctionNotesId = useId();

  // Formulario
  const [mediaType, setMediaType] = useState<'series' | 'movie' | 'book'>('series');
  const [mediaTitle, setMediaTitle] = useState('The Gentlemen');
  const [episodeOrPart, setEpisodeOrPart] = useState('Temporada 2, Episodio 2');
  const [userNotes, setUserNotes] = useState(
    'Eddie Horniman y Susie Glass viajan a Milán para cerrar el acuerdo con Marco Moretti'
  );

  // Estados para búsqueda de datos oficiales en tiempo real
  const [detectedOnlineInfo, setDetectedOnlineInfo] = useState<TVEpisodeInfo | null>(null);
  const [isSearchingOnline, setIsSearchingOnline] = useState(false);

  // Estados de generación
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);

  // Sesión activa e historial
  const [savedSessions, setSavedSessions] = useState<MediaAnalysisSession[]>(() =>
    loadMediaSessions()
  );
  const [activeSession, setActiveSession] = useState<MediaAnalysisSession | null>(() => {
    const list = loadMediaSessions();
    return list.length > 0 ? list[0] : null;
  });

  // Estados de palabras (Parte 1: el usuario escribe el significado en español)
  const [wordAttempts, setWordAttempts] = useState<Record<string, WordAttemptState>>({});
  const [savedWordIds, setSavedWordIds] = useState<Set<string>>(new Set());

  // Estados de preguntas (Parte 2: el usuario responde en inglés qué pasó)
  const [questionAnswers, setQuestionAnswers] = useState<Record<string, string>>({});
  const [evaluatingQId, setEvaluatingQId] = useState<string | null>(null);
  const [questionFeedbacks, setQuestionFeedbacks] = useState<Record<string, OpenAnswerFeedback>>({});
  const [questionErrors, setQuestionErrors] = useState<Record<string, string>>({});
  const [questionShowTrans, setQuestionShowTrans] = useState<Record<string, boolean>>({});
  const [repetitionMap, setRepetitionMap] = useState<Record<string, QuestionRepetitionState>>({});

  // Estados para el apartado de corrección por si la IA se equivoca de trama o personajes
  const [showCorrectionBox, setShowCorrectionBox] = useState(false);
  const [correctionNotes, setCorrectionNotes] = useState('');
  const [isRegeneratingCorrection, setIsRegeneratingCorrection] = useState(false);
  const [isEditingSynopsis, setIsEditingSynopsis] = useState(false);
  const [editedSynopsis, setEditedSynopsis] = useState('');

  const handleSelectPreset = (preset: (typeof PRESET_SUGGESTIONS)[0]) => {
    setMediaType(preset.type);
    setMediaTitle(preset.title);
    setEpisodeOrPart(preset.episode);
    setUserNotes(preset.notes);
    setDetectedOnlineInfo(null);
  };

  // Buscar sinopsis oficial del episodio en tiempo real (TVMaze)
  const handleSearchOnlineSynopsis = async () => {
    if (!mediaTitle.trim()) return;
    setIsSearchingOnline(true);
    setGenerationError(null);
    try {
      const info = await fetchOnlineEpisodeData(mediaTitle.trim(), episodeOrPart.trim());
      setDetectedOnlineInfo(info);
      if (info && !userNotes.trim()) {
        setUserNotes(`Episodio "${info.episodeName}": ${info.summary}`);
      }
    } catch (err) {
      console.warn('Error al buscar en vivo:', err);
    } finally {
      setIsSearchingOnline(false);
    }
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
        userNotes.trim(),
        detectedOnlineInfo
      );
      const updatedList = saveMediaSession(session);
      setSavedSessions(updatedList);
      setActiveSession(session);
      setWordAttempts({});
      setQuestionAnswers({});
      setQuestionFeedbacks({});
      setQuestionErrors({});
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

  // Regenerar un episodio que se quedó con el mensaje de "no dispongo de información"
  const handleRegenerateFailedSession = async (sessionToFix: MediaAnalysisSession) => {
    setIsGenerating(true);
    setGenerationError(null);
    try {
      const fixed = await generateMediaAnalysisWithAI(
        sessionToFix.mediaTitle,
        sessionToFix.mediaType,
        sessionToFix.episodeOrPart
      );
      const updatedSession: MediaAnalysisSession = { ...fixed, id: sessionToFix.id };
      const list = saveMediaSession(updatedSession);
      setSavedSessions(list);
      setActiveSession(updatedSession);
      setWordAttempts({});
      setQuestionAnswers({});
      setQuestionFeedbacks({});
      setQuestionErrors({});
      setRepetitionMap({});
    } catch (err: unknown) {
      setGenerationError(
        err instanceof Error ? err.message : 'Error al regenerar el episodio con datos oficiales.'
      );
    } finally {
      setIsGenerating(false);
    }
  };

  // Eliminar sesión
  const handleDeleteSession = (id: string) => {
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
      const correctedSession = { ...session, id: activeSession.id };
      const updatedList = saveMediaSession(correctedSession);
      setSavedSessions(updatedList);
      setActiveSession(correctedSession);
      setShowCorrectionBox(false);
      setCorrectionNotes('');
      setWordAttempts({});
      setQuestionAnswers({});
      setQuestionFeedbacks({});
      setQuestionErrors({});
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
    setQuestionErrors((prev) => {
      const next = { ...prev };
      delete next[q.id];
      return next;
    });

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
      setQuestionErrors((prev) => ({
        ...prev,
        [q.id]:
          err instanceof Error
            ? err.message
            : 'Error al evaluar la respuesta. Comprueba tu conexión y clave de IA.'
      }));
    } finally {
      setEvaluatingQId(null);
    }
  };

  // Repetición activa de errores de memoria (0/2 repeticiones)
  const handleCheckRepetition = (qId: string, targetSentence: string) => {
    const current = repetitionMap[qId] || {
      currentInput: '',
      repsCompleted: 0,
      isCompleted: false
    };
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
          errorNotice:
            'No coincide exactamente. Recuerda la corrección de arriba y vuelve a escribirla de memoria.'
        }
      }));
    }
  };

  const renderMediaTypeIcon = (type: 'series' | 'movie' | 'book') => {
    if (type === 'series') return <Tv className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />;
    if (type === 'movie') return <Film className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />;
    return <BookOpen className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />;
  };

  const hasStaleAiNotice = activeSession
    ? /no dispongo|no tengo informaci[oó]n|lo siento|i do not have|cannot provide/i.test(
        activeSession.synopsisEs
      )
    : false;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Cabecera editorial */}
      <section className="card p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5 min-w-0">
          <div className="w-11 h-11 rounded-xl bg-[var(--accent-soft)] border border-[var(--accent-border)] text-[var(--accent)] flex items-center justify-center shrink-0">
            <Clapperboard className="w-5 h-5" aria-hidden="true" />
          </div>
          <div className="space-y-1 min-w-0">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-[var(--ink)] tracking-[-0.02em]">
              Inglés de series, cine y libros
            </h2>
            <p className="text-sm text-[var(--ink-muted)] max-w-2xl leading-relaxed">
              Elige un episodio o película real. Extrae primero la jerga y las palabras poco comunes para traducirlas al español, y responde después sobre la trama con corrección gramatical.
            </p>
          </div>
        </div>

        {onOpenSettings && (
          <button
            type="button"
            onClick={onOpenSettings}
            className="btn btn-secondary btn-sm self-start sm:self-center shrink-0"
          >
            <Settings className="w-4 h-4" aria-hidden="true" />
            <span>Ajustes IA</span>
          </button>
        )}
      </section>

      {/* Formulario de Análisis */}
      <form onSubmit={handleGenerateSession} className="card p-5 sm:p-6 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[var(--border)]">
          <h3 className="font-display text-base sm:text-lg font-bold text-[var(--ink)] flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[var(--accent)] shrink-0" aria-hidden="true" />
            <span>¿Qué has visto o leído hoy?</span>
          </h3>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[var(--accent-soft)] text-[var(--accent)] border border-[var(--accent-border)]">
            Generado con IA
          </span>
        </div>

        {/* Selector segmentado de tipo de obra */}
        <div className="space-y-1.5">
          <span className="text-xs font-semibold text-[var(--ink-muted)] block">
            Tipo de contenido
          </span>
          <div className="segmented" role="group" aria-label="Tipo de contenido">
            {(
              [
                { id: 'series', label: 'Serie', icon: Tv },
                { id: 'movie', label: 'Película', icon: Film },
                { id: 'book', label: 'Libro', icon: BookOpen }
              ] as const
            ).map((t) => {
              const Icon = t.icon;
              const active = mediaType === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setMediaType(t.id)}
                  aria-pressed={active}
                  className={`segmented-item whitespace-nowrap ${active ? 'segmented-item-active' : ''}`}
                >
                  <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sugerencias rápidas en 1 clic */}
        <div className="space-y-2">
          <span className="text-xs font-semibold text-[var(--ink-muted)] block">
            Ejemplos en 1 clic
          </span>
          <div className="flex flex-wrap gap-1.5">
            {PRESET_SUGGESTIONS.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectPreset(preset)}
                className="btn btn-secondary btn-sm text-xs font-semibold"
              >
                {renderMediaTypeIcon(preset.type)}
                <span>{preset.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Inputs de Título y Episodio */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label
              htmlFor={formTitleId}
              className="text-xs font-semibold text-[var(--ink)] block"
            >
              Título de la serie, peli o libro
            </label>
            <input
              id={formTitleId}
              type="text"
              value={mediaTitle}
              onChange={(e) => {
                setMediaTitle(e.target.value);
                setDetectedOnlineInfo(null);
              }}
              placeholder="Ej: The Gentlemen, Peaky Blinders, Reacher…"
              className="input-field"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor={formEpisodeId}
              className="text-xs font-semibold text-[var(--ink)] block"
            >
              Temporada y episodio o capítulo
            </label>
            <input
              id={formEpisodeId}
              type="text"
              value={episodeOrPart}
              onChange={(e) => {
                setEpisodeOrPart(e.target.value);
                setDetectedOnlineInfo(null);
              }}
              placeholder="Ej: Temporada 4, Episodio 2 (o Película completa)"
              className="input-field"
              required
            />
          </div>
        </div>

        {/* Búsqueda oficial en tiempo real para series */}
        {mediaType === 'series' && (
          <div className="inset-well p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start sm:items-center gap-2.5 min-w-0">
              <Search className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5 sm:mt-0" aria-hidden="true" />
              <p className="text-xs text-[var(--ink-muted)] leading-relaxed">
                ¿Temporada reciente o estreno? Consulta la ficha oficial de TV en tiempo real antes de generar.
              </p>
            </div>
            <button
              type="button"
              onClick={handleSearchOnlineSynopsis}
              disabled={isSearchingOnline || !mediaTitle.trim()}
              className="btn btn-soft btn-sm shrink-0 self-start sm:self-center"
            >
              {isSearchingOnline ? (
                <>
                  <RotateCcw className="w-3.5 h-3.5 animate-spin" aria-hidden="true" />
                  <span>Buscando datos oficiales…</span>
                </>
              ) : (
                <>
                  <Search className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Comprobar sinopsis oficial</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Notificación de episodio oficial confirmado */}
        {detectedOnlineInfo && (
          <div
            aria-live="polite"
            className="p-4 rounded-xl bg-[var(--pine-soft)] border border-[var(--pine-border)] text-[var(--ink)] text-xs sm:text-sm space-y-2"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-semibold flex items-center gap-1.5 text-[var(--pine)]">
                <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>
                  Episodio oficial confirmado: {detectedOnlineInfo.showName} S{detectedOnlineInfo.season}E{detectedOnlineInfo.number} — "{detectedOnlineInfo.episodeName}"
                </span>
              </span>
              {detectedOnlineInfo.airdate && (
                <span className="text-xs font-mono text-[var(--pine)] px-2 py-0.5 rounded bg-[var(--surface)] border border-[var(--pine-border)] tabular-nums">
                  Emisión: {detectedOnlineInfo.airdate}
                </span>
              )}
            </div>
            <p className="text-xs text-[var(--ink)] leading-relaxed italic bg-[var(--surface)] p-2.5 rounded-lg">
              "{detectedOnlineInfo.summary}"
            </p>
          </div>
        )}

        {/* Nota de desambiguación para The Gentlemen */}
        {mediaTitle.toLowerCase().includes('gentlemen') && (
          <div className="p-4 rounded-xl bg-[var(--accent-soft)] border border-[var(--accent-border)] text-xs text-[var(--ink)] space-y-1.5">
            <p className="font-semibold text-[var(--accent)] flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Referencia rápida: The Gentlemen (serie de Netflix)</span>
            </p>
            <p className="leading-relaxed">
              <strong>Protagonistas reales:</strong> Eddie Horniman (Theo James), Susie Glass (Kaya Scodelario), Bobby Glass (Ray Winstone) y Freddy Horniman.
            </p>
            <p className="leading-relaxed">
              <strong>Temporada 2:</strong> Eddie y Susie viajan a Milán para negociar con el capo Marco Moretti.
            </p>
            <p className="text-[var(--ink-muted)]">
              Nota: La película de 2019 protagonizada por Mickey Pearson y Ray es una trama distinta a la serie.
            </p>
          </div>
        )}

        {/* Detalles opcionales */}
        <div className="space-y-1.5">
          <label
            htmlFor={formNotesId}
            className="text-xs font-semibold text-[var(--ink)] block"
          >
            Personajes o notas de la trama (opcional, evita confusiones de la IA)
          </label>
          <input
            id={formNotesId}
            type="text"
            value={userNotes}
            onChange={(e) => setUserNotes(e.target.value)}
            placeholder="Ej: Serie de Netflix con Eddie Horniman, escena en el pub…"
            className="input-field"
          />
        </div>

        {/* Error de generación */}
        {generationError && (
          <div
            role="alert"
            className="p-3.5 rounded-xl bg-[var(--crimson-soft)] border border-[var(--crimson-border)] text-[var(--crimson)] text-xs sm:text-sm flex items-start gap-2.5"
          >
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
            <div className="space-y-0.5">
              <p className="font-semibold">No se pudo completar el análisis</p>
              <p className="text-[var(--ink)]">{generationError}</p>
            </div>
          </div>
        )}

        {/* Botón de envío */}
        <button
          type="submit"
          disabled={isGenerating || !mediaTitle.trim() || !episodeOrPart.trim()}
          className="btn btn-primary w-full"
        >
          {isGenerating ? (
            <>
              <RotateCcw className="w-4 h-4 animate-spin" aria-hidden="true" />
              <span>Analizando episodio y extrayendo vocabulario…</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" aria-hidden="true" />
              <span>Analizar este episodio con IA</span>
            </>
          )}
        </button>
      </form>

      {/* Historial de Episodios Previos (grupos semánticos de botones hermanos, nunca botón dentro de botón/div clickable) */}
      {savedSessions.length > 0 && (
        <section className="card p-4 sm:p-5 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-xs font-semibold text-[var(--ink-muted)] flex items-center gap-1.5 tabular-nums">
              <Clock className="w-3.5 h-3.5 text-[var(--accent)]" aria-hidden="true" />
              <span>Episodios y películas guardados ({savedSessions.length})</span>
            </h3>
          </div>

          <ul className="flex flex-wrap gap-2">
            {savedSessions.map((s) => {
              const isSelected = activeSession?.id === s.id;
              return (
                <li
                  key={s.id}
                  className={`inline-flex items-stretch rounded-xl border overflow-hidden transition-colors ${
                    isSelected
                      ? 'bg-[var(--accent-soft)] border-[var(--accent-border)] text-[var(--accent)]'
                      : 'bg-[var(--surface-2)] border-[var(--border)] text-[var(--ink)]'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setActiveSession(s)}
                    aria-current={isSelected ? 'true' : undefined}
                    className="px-3 py-2 text-xs font-semibold flex items-center gap-2 min-h-[40px] text-left hover:bg-black/5 transition-colors"
                  >
                    {renderMediaTypeIcon(s.mediaType)}
                    <span>
                      {s.mediaTitle} ({s.episodeOrPart})
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteSession(s.id)}
                    aria-label={`Eliminar sesión ${s.mediaTitle} (${s.episodeOrPart})`}
                    title="Eliminar sesión"
                    className="px-2.5 border-l border-[var(--border)] text-[var(--ink-muted)] hover:text-[var(--crimson)] hover:bg-[var(--crimson-soft)] flex items-center justify-center transition-colors min-w-[38px]"
                  >
                    <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {/* CONTENIDO DE LA SESIÓN ACTIVA */}
      {activeSession && (
        <div className="space-y-6">
          {/* Header y sinopsis de la Sesión Activa */}
          <section className="card p-5 sm:p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md bg-[var(--accent-soft)] text-[var(--accent)] border border-[var(--accent-border)]">
                {renderMediaTypeIcon(activeSession.mediaType)}
                <span>
                  {activeSession.mediaType === 'series'
                    ? 'Serie de TV'
                    : activeSession.mediaType === 'movie'
                    ? 'Película'
                    : 'Libro'}
                </span>
              </span>
              <span className="text-xs font-mono text-[var(--ink-muted)] tabular-nums">
                {new Date(activeSession.createdAt).toLocaleDateString('es-ES')}
              </span>
            </div>

            <h3 className="font-display text-lg sm:text-2xl font-bold text-[var(--ink)] tracking-[-0.02em]">
              {activeSession.mediaTitle} — {activeSession.episodeOrPart}
            </h3>

            {/* Aviso de rescate si el episodio se guardó anteriormente con "no dispongo de información" */}
            {hasStaleAiNotice && (
              <div className="p-4 rounded-xl bg-[var(--brass-soft)] border border-[var(--brass-border)] text-[var(--ink)] space-y-3">
                <div className="flex items-start gap-2.5">
                  <AlertTriangle
                    className="w-5 h-5 text-[var(--brass)] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div className="space-y-1">
                    <h4 className="font-semibold text-xs sm:text-sm text-[var(--brass)]">
                      Este episodio se generó sin acceso a datos actualizados
                    </h4>
                    <p className="text-xs text-[var(--ink)] leading-relaxed">
                      Ahora la app consulta la base de televisión en tiempo real. Puedes regenerar este episodio para obtener su trama oficial y vocabulario real.
                    </p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    disabled={isGenerating}
                    onClick={() => handleRegenerateFailedSession(activeSession)}
                    className="btn btn-primary btn-sm"
                  >
                    {isGenerating ? (
                      <>
                        <RotateCcw className="w-4 h-4 animate-spin" aria-hidden="true" />
                        <span>Regenerando con datos en vivo…</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" aria-hidden="true" />
                        <span>Regenerar con base oficial en vivo</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Resumen de trama / editor inline */}
            {!isEditingSynopsis ? (
              <div className="inset-well p-4 text-xs sm:text-sm text-[var(--ink)] space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold text-[var(--ink)] flex items-center gap-1.5">
                    <Clapperboard className="w-4 h-4 text-[var(--accent)]" aria-hidden="true" />
                    <span>Resumen de la trama</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setEditedSynopsis(activeSession.synopsisEs);
                      setIsEditingSynopsis(true);
                    }}
                    className="text-xs font-semibold text-[var(--accent)] hover:underline flex items-center gap-1 min-h-[32px] px-1.5"
                  >
                    <Edit3 className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Editar texto</span>
                  </button>
                </div>
                <p className="leading-relaxed text-[var(--ink-muted)]">{activeSession.synopsisEs}</p>
              </div>
            ) : (
              <div className="inset-well p-4 space-y-3">
                <label
                  htmlFor={editSynopsisId}
                  className="text-xs font-semibold text-[var(--ink)] block"
                >
                  Editar resumen de la trama manualmente
                </label>
                <textarea
                  id={editSynopsisId}
                  rows={3}
                  value={editedSynopsis}
                  onChange={(e) => setEditedSynopsis(e.target.value)}
                  className="input-field resize-y min-h-[88px]"
                />
                <div className="flex gap-2 justify-end">
                  <button
                    type="button"
                    onClick={() => setIsEditingSynopsis(false)}
                    className="btn btn-secondary btn-sm"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveEditedSynopsis}
                    className="btn btn-primary btn-sm"
                  >
                    Guardar resumen
                  </button>
                </div>
              </div>
            )}

            {/* Acciones de la sesión */}
            <div className="pt-3 border-t border-[var(--border)] flex flex-wrap items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => setShowCorrectionBox(!showCorrectionBox)}
                aria-expanded={showCorrectionBox}
                className={`btn btn-sm ${showCorrectionBox ? 'btn-brass' : 'btn-secondary'}`}
              >
                <AlertCircle className="w-4 h-4" aria-hidden="true" />
                <span>¿La IA se ha equivocado de trama? Corregir aquí</span>
              </button>

              <button
                type="button"
                onClick={() => handleDeleteSession(activeSession.id)}
                className="btn btn-danger-outline btn-sm"
              >
                <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Borrar episodio</span>
              </button>
            </div>

            {/* Apartado desplegable de corrección */}
            {showCorrectionBox && (
              <div className="p-4 sm:p-5 rounded-xl bg-[var(--brass-soft)] border border-[var(--brass-border)] space-y-3.5">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Wrench className="w-4 h-4 text-[var(--brass)] shrink-0" aria-hidden="true" />
                    <h4 className="font-display font-bold text-[var(--ink)] text-sm sm:text-base">
                      Corregir la trama para la IA
                    </h4>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowCorrectionBox(false)}
                    aria-label="Cerrar panel de corrección"
                    className="icon-btn min-w-[36px] min-h-[36px]"
                  >
                    <X className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>

                <p className="text-xs text-[var(--ink)] leading-relaxed">
                  Las IAs pueden mezclar películas y series con el mismo título (como <em>The Gentlemen</em> de Netflix de 2024 frente a la película de 2019). Indica los personajes o hechos reales y se regenerará el ejercicio completo.
                </p>

                <div className="space-y-1.5">
                  <span className="text-xs font-semibold text-[var(--brass)] block">
                    Aclaraciones rápidas sugeridas
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    <button
                      type="button"
                      onClick={() =>
                        setCorrectionNotes(
                          'The Gentlemen Temporada 2, Episodio 2 ("There\'s a Rat in the Kitchen"): Eddie Horniman viaja a Milán junto a Susie Glass para cerrar un acuerdo arriesgado con el capo de la mafia italiana Marco Moretti, mientras en Inglaterra Freddy lidia con problemas y tensiones.'
                        )
                      }
                      className="btn btn-secondary btn-sm text-xs"
                    >
                      The Gentlemen T2 E2: Milán con Marco Moretti
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setCorrectionNotes(
                          'The Gentlemen Temporada 2, Episodio 1 ("The Road to Kingdom"): Eddie Horniman organiza una cacería de alto riesgo en la mansión Halstead con mafiosos italianos y un jeque para expandir el imperio a Europa.'
                        )
                      }
                      className="btn btn-secondary btn-sm text-xs"
                    >
                      The Gentlemen T2 E1: Cacería con Eddie
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setCorrectionNotes(
                          'Es la serie de Netflix (Guy Ritchie) protagonizada por Eddie Horniman (Theo James), Susie Glass (Kaya Scodelario) y Freddy Horniman. No es la película de 2019 de Mickey Pearson.'
                        )
                      }
                      className="btn btn-secondary btn-sm text-xs"
                    >
                      Serie de Netflix (Eddie y Susie)
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setCorrectionNotes(
                          'Temporada 1 Episodio 2: Eddie intenta saldar la deuda de 8 millones de libras de su hermano Freddy con Tommy Dixon mientras Susie controla la granja de marihuana bajo la mansión.'
                        )
                      }
                      className="btn btn-secondary btn-sm text-xs"
                    >
                      T1 E2: Deuda de Freddy con Tommy Dixon
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor={correctionNotesId}
                    className="text-xs font-semibold text-[var(--ink)] block"
                  >
                    Escribe o pega la trama real que viste
                  </label>
                  <textarea
                    id={correctionNotesId}
                    rows={3}
                    value={correctionNotes}
                    onChange={(e) => setCorrectionNotes(e.target.value)}
                    placeholder="Ej: Salen Eddie Horniman y Susie Glass. Eddie descubre que bajo su mansión hay una granja oculta…"
                    className="input-field resize-y min-h-[88px]"
                  />
                </div>

                <button
                  type="button"
                  disabled={isRegeneratingCorrection || !correctionNotes.trim()}
                  onClick={handleRegenerateWithCorrection}
                  className="btn btn-brass w-full"
                >
                  {isRegeneratingCorrection ? (
                    <>
                      <RotateCcw className="w-4 h-4 animate-spin" aria-hidden="true" />
                      <span>Regenerando sesión con la trama real…</span>
                    </>
                  ) : (
                    <>
                      <RotateCcw className="w-4 h-4" aria-hidden="true" />
                      <span>Regenerar sesión con esta trama real</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </section>

          {/* PARTE 1: PALABRAS POCO COMUNES */}
          <section className="card p-5 sm:p-6 space-y-5">
            <div className="pb-3 border-b border-[var(--border)] flex items-start gap-3">
              <span className="w-7 h-7 rounded-lg bg-[var(--brass-soft)] text-[var(--brass)] border border-[var(--brass-border)] flex items-center justify-center font-mono font-bold text-xs shrink-0 tabular-nums mt-0.5">
                01
              </span>
              <div className="space-y-1">
                <h4 className="font-display text-base sm:text-lg font-bold text-[var(--ink)]">
                  Palabras y jerga poco comunes del episodio
                </h4>
                <p className="text-xs sm:text-sm text-[var(--ink-muted)]">
                  Escribe qué significa cada término en español a partir de su uso en la escena.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {activeSession.words.map((w, idx) => {
                const attempt = wordAttempts[w.id] || {
                  userTyped: '',
                  isEvaluated: false,
                  isCorrect: false
                };
                const isSaved = savedWordIds.has(w.id);
                const wordInputId = `media-word-input-${w.id}`;

                return (
                  <article
                    key={w.id}
                    className={`p-4 sm:p-5 rounded-xl border space-y-3.5 transition-colors ${
                      attempt.isEvaluated
                        ? attempt.isCorrect
                          ? 'bg-[var(--pine-soft)]/50 border-[var(--pine-border)]'
                          : 'bg-[var(--crimson-soft)]/50 border-[var(--crimson-border)]'
                        : 'bg-[var(--surface)] border-[var(--border)]'
                    }`}
                  >
                    {/* Fila del término en inglés y pronunciación */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-2 min-w-0">
                        <span className="text-xs font-mono font-semibold text-[var(--ink-subtle)] tabular-nums">
                          #{idx + 1}
                        </span>
                        <h5 className="font-display text-base sm:text-lg font-bold text-[var(--ink)]">
                          {w.wordEn}
                        </h5>
                        {w.pron && (
                          <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-md bg-[var(--brass-soft)] text-[var(--brass)] border border-[var(--brass-border)]">
                            [{w.pron}]
                          </span>
                        )}
                        <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-[var(--surface-2)] text-[var(--ink-muted)]">
                          {w.partOfSpeech}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => speakEnglishText(w.wordEn)}
                        aria-label={`Escuchar pronunciación de ${w.wordEn}`}
                        title="Escuchar pronunciación británica"
                        className="icon-btn bg-[var(--surface-2)] border border-[var(--border)]"
                      >
                        <Volume2 className="w-4 h-4 text-[var(--accent)]" aria-hidden="true" />
                      </button>
                    </div>

                    {/* Frase de contexto en el episodio */}
                    <div className="inset-well p-3.5 text-xs sm:text-sm space-y-1.5">
                      <span className="text-[11px] font-semibold text-[var(--ink-muted)] block">
                        Uso en el episodio
                      </span>
                      <p className="font-medium text-[var(--ink)] leading-relaxed">
                        "{w.sceneContextEn}"
                      </p>
                      <button
                        type="button"
                        onClick={() => speakEnglishText(w.sceneContextEn)}
                        className="text-xs text-[var(--accent)] font-semibold hover:underline inline-flex items-center gap-1.5 min-h-[32px]"
                      >
                        <Volume2 className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Escuchar frase completa</span>
                      </button>
                    </div>

                    {/* Input para escribir significado en español */}
                    {!attempt.isEvaluated ? (
                      <div className="space-y-2">
                        <label
                          htmlFor={wordInputId}
                          className="text-xs font-semibold text-[var(--ink)] block"
                        >
                          ¿Qué significa en español?
                        </label>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <input
                            id={wordInputId}
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
                            placeholder="Ej: fianza, garantía, tipo sospechoso…"
                            className="input-field flex-1"
                          />
                          <button
                            type="button"
                            onClick={() => handleCheckWordMeaning(w)}
                            disabled={!attempt.userTyped.trim()}
                            className="btn btn-brass shrink-0"
                          >
                            Comprobar significado
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div aria-live="polite" className="space-y-2.5">
                        <div
                          className={`p-3.5 rounded-xl border text-xs sm:text-sm font-medium flex flex-wrap items-center justify-between gap-2 ${
                            attempt.isCorrect
                              ? 'bg-[var(--pine-soft)] border-[var(--pine-border)] text-[var(--ink)]'
                              : 'bg-[var(--crimson-soft)] border-[var(--crimson-border)] text-[var(--ink)]'
                          }`}
                        >
                          <div className="flex items-start sm:items-center gap-2">
                            {attempt.isCorrect ? (
                              <>
                                <CheckCircle2
                                  className="w-4 h-4 text-[var(--pine)] shrink-0 mt-0.5 sm:mt-0"
                                  aria-hidden="true"
                                />
                                <span>
                                  <strong className="text-[var(--pine)]">Correcto.</strong> Tu respuesta: "{attempt.userTyped}"
                                </span>
                              </>
                            ) : (
                              <>
                                <XCircle
                                  className="w-4 h-4 text-[var(--crimson)] shrink-0 mt-0.5 sm:mt-0"
                                  aria-hidden="true"
                                />
                                <span>
                                  Pusiste "{attempt.userTyped}". Significado real:{' '}
                                  <strong className="text-[var(--ink)]">{w.primaryMeaningEs}</strong>
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
                            className="text-xs text-[var(--ink)] hover:text-[var(--accent)] underline font-semibold min-h-[32px] px-1"
                          >
                            Reintentar
                          </button>
                        </div>

                        <div className="inset-well p-3.5 text-xs text-[var(--ink)] space-y-1.5">
                          <p>
                            <strong>Significado en español:</strong> {w.primaryMeaningEs}{' '}
                            <span className="text-[var(--ink-muted)] italic">
                              ("{w.sceneContextEs}")
                            </span>
                          </p>
                          {w.explanationWhyEs && (
                            <p className="text-[var(--ink-muted)]">
                              <strong className="text-[var(--ink)]">Uso en Reino Unido:</strong>{' '}
                              {w.explanationWhyEs}
                            </p>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={() => handleSaveWordToVocabulary(w)}
                          disabled={isSaved}
                          className={`btn w-full btn-sm ${isSaved ? 'btn-soft' : 'btn-primary'}`}
                        >
                          {isSaved ? (
                            <>
                              <Check className="w-4 h-4" aria-hidden="true" />
                              <span>Guardada en tu diccionario de Machaque</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-4 h-4" aria-hidden="true" />
                              <span>Añadir a mi vocabulario para repasar</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </section>

          {/* PARTE 2: PREGUNTAS SOBRE QUÉ HA PASADO EN EL EPISODIO */}
          <section className="card p-5 sm:p-6 space-y-5">
            <div className="pb-3 border-b border-[var(--border)] flex items-start gap-3">
              <span className="w-7 h-7 rounded-lg bg-[var(--accent-soft)] text-[var(--accent)] border border-[var(--accent-border)] flex items-center justify-center font-mono font-bold text-xs shrink-0 tabular-nums mt-0.5">
                02
              </span>
              <div className="space-y-1">
                <h4 className="font-display text-base sm:text-lg font-bold text-[var(--ink)]">
                  ¿Qué ha pasado en este episodio? (Escribe en inglés)
                </h4>
                <p className="text-xs sm:text-sm text-[var(--ink-muted)]">
                  Responde con tus palabras en inglés. La IA verificará los hechos, corregirá la gramática y te pedirá fijar los fallos de memoria.
                </p>
              </div>
            </div>

            <div className="space-y-5">
              {activeSession.questions.map((q, idx) => {
                const userAns = questionAnswers[q.id] || '';
                const isEvaluating = evaluatingQId === q.id;
                const fb = questionFeedbacks[q.id];
                const qErr = questionErrors[q.id];
                const showTrans = !!questionShowTrans[q.id];
                const repState = repetitionMap[q.id];
                const qTextareaId = `media-question-input-${q.id}`;
                const repInputId = `media-rep-input-${q.id}`;

                return (
                  <article
                    key={q.id}
                    className="p-4 sm:p-5 rounded-xl bg-[var(--surface-2)]/60 border border-[var(--border)] space-y-3.5"
                  >
                    {/* Pregunta en inglés */}
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <p className="font-semibold text-sm sm:text-base text-[var(--ink)] leading-snug">
                        <span className="font-mono text-xs text-[var(--ink-subtle)] mr-1.5 tabular-nums">
                          0{idx + 1}
                        </span>
                        {q.questionEn}
                      </p>
                      <button
                        type="button"
                        onClick={() =>
                          setQuestionShowTrans((prev) => ({ ...prev, [q.id]: !prev[q.id] }))
                        }
                        aria-expanded={showTrans}
                        className="btn btn-secondary btn-sm shrink-0"
                      >
                        <Languages className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>{showTrans ? 'Ocultar traducción' : 'Traducir pregunta'}</span>
                      </button>
                    </div>

                    {showTrans && (
                      <p className="text-xs sm:text-sm text-[var(--accent)] bg-[var(--accent-soft)] border border-[var(--accent-border)] rounded-xl px-3.5 py-2.5">
                        {q.questionEs}
                      </p>
                    )}

                    {q.sceneHintEs && (
                      <p className="text-xs text-[var(--ink-muted)] flex items-start gap-1.5">
                        <Lightbulb
                          className="w-3.5 h-3.5 text-[var(--brass)] shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span>
                          {q.sceneHintEs}
                          {q.targetGrammarHint ? ` · ${q.targetGrammarHint}` : ''}
                        </span>
                      </p>
                    )}

                    <div className="space-y-1.5">
                      <label htmlFor={qTextareaId} className="sr-only">
                        Respuesta en inglés para la pregunta {idx + 1}
                      </label>
                      <textarea
                        id={qTextareaId}
                        rows={3}
                        value={userAns}
                        onChange={(e) =>
                          setQuestionAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))
                        }
                        placeholder="Escribe tu respuesta en inglés aquí sobre qué ocurrió…"
                        className="input-field resize-y min-h-[88px]"
                        spellCheck={false}
                      />
                    </div>

                    {qErr && (
                      <div
                        role="alert"
                        className="p-3 rounded-xl bg-[var(--crimson-soft)] border border-[var(--crimson-border)] text-[var(--crimson)] text-xs font-medium flex items-center gap-2"
                      >
                        <AlertTriangle className="w-4 h-4 shrink-0" aria-hidden="true" />
                        <span>{qErr}</span>
                      </div>
                    )}

                    <button
                      type="button"
                      disabled={isEvaluating || !userAns.trim()}
                      onClick={() => handleEvaluateQuestion(q)}
                      className="btn btn-pine w-full sm:w-auto"
                    >
                      {isEvaluating ? (
                        <>
                          <RotateCcw className="w-4 h-4 animate-spin" aria-hidden="true" />
                          <span>Analizando tu respuesta…</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4" aria-hidden="true" />
                          <span>Corregir mi respuesta</span>
                        </>
                      )}
                    </button>

                    {/* Feedback de la IA */}
                    {fb && (
                      <div
                        aria-live="polite"
                        className="mt-3 p-4 sm:p-5 rounded-xl bg-[var(--surface)] border border-[var(--border)] space-y-4 text-xs sm:text-sm"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-[var(--border)]">
                          <span className="font-semibold text-[var(--pine)] flex items-center gap-1.5 tabular-nums">
                            <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden="true" />
                            <span>Evaluación completada · Nota: {fb.scoreOutOf10}/10</span>
                          </span>
                          <span
                            className={`px-2.5 py-0.5 rounded-md text-xs font-semibold border ${
                              fb.isContentAccurate
                                ? 'bg-[var(--pine-soft)] text-[var(--pine)] border-[var(--pine-border)]'
                                : 'bg-[var(--brass-soft)] text-[var(--brass)] border-[var(--brass-border)]'
                            }`}
                          >
                            {fb.isContentAccurate
                              ? 'Hechos del episodio correctos'
                              : 'Revisa los hechos de la escena'}
                          </span>
                        </div>

                        <p className="text-[var(--ink)] leading-relaxed">{fb.feedbackEs}</p>

                        {/* Errores encontrados */}
                        {fb.errorsFound && fb.errorsFound.length > 0 && (
                          <div className="space-y-2">
                            <span className="text-xs font-semibold text-[var(--crimson)] block">
                              Errores detectados en tu inglés
                            </span>
                            {fb.errorsFound.map((err, i) => (
                              <div
                                key={i}
                                className="bg-[var(--crimson-soft)]/50 border border-[var(--crimson-border)] rounded-xl p-3 space-y-1"
                              >
                                <p className="text-[var(--crimson)] line-through flex items-center gap-1.5">
                                  <XCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                                  <span>{err.wrong}</span>
                                </p>
                                <p className="text-[var(--pine)] font-semibold flex items-center gap-1.5">
                                  <Check className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                                  <span>{err.right}</span>
                                </p>
                                <p className="text-[var(--ink-muted)] text-xs">{err.whyEs}</p>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Frase corregida y versión nativa */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="inset-well p-3.5 space-y-1">
                            <span className="text-xs font-semibold text-[var(--pine)] block">
                              Tu frase corregida
                            </span>
                            <p className="text-[var(--ink)] font-medium">
                              {fb.correctedUserSentence}
                            </p>
                          </div>
                          <div className="p-3.5 rounded-xl bg-[var(--brass-soft)] border border-[var(--brass-border)] space-y-1">
                            <span className="text-xs font-semibold text-[var(--brass)] block">
                              Versión modelo nativa
                            </span>
                            <p className="text-[var(--ink)] font-medium">
                              {fb.b2UpgradeSentence || q.sampleIdealAnswerEn}
                            </p>
                          </div>
                        </div>

                        {/* Repetición activa de fallos (0/2 de memoria) */}
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
                              <div className="p-3.5 rounded-xl bg-[var(--pine-soft)] border border-[var(--pine-border)] flex items-center gap-2 text-xs sm:text-sm text-[var(--pine)] font-semibold">
                                <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden="true" />
                                <span>Respuesta precisa sin fallos. No necesitas repetición adicional.</span>
                              </div>
                            );
                          }

                          return (
                            <div className="p-4 rounded-xl bg-[var(--brass-soft)] border border-[var(--brass-border)] space-y-3">
                              <div className="flex flex-wrap items-center justify-between gap-2">
                                <div className="flex items-center gap-2">
                                  <RotateCcw
                                    className="w-4 h-4 text-[var(--brass)]"
                                    aria-hidden="true"
                                  />
                                  <span className="font-semibold text-[var(--ink)] text-xs sm:text-sm tabular-nums">
                                    Repite de memoria para fijar el fallo ({repState?.repsCompleted || 0}/2)
                                  </span>
                                </div>
                                {repState?.isCompleted && (
                                  <span className="px-2.5 py-0.5 rounded-md bg-[var(--pine-soft)] text-[var(--pine)] text-xs font-semibold border border-[var(--pine-border)] flex items-center gap-1">
                                    <Check className="w-3 h-3" aria-hidden="true" />
                                    <span>Fallo superado</span>
                                  </span>
                                )}
                              </div>

                              <p className="text-xs text-[var(--ink)] leading-relaxed">
                                Escribe la frase corregida completa <strong>2 veces seguidas de memoria</strong> sin errores para fijarla.
                              </p>

                              {!repState?.isCompleted && (
                                <div className="flex items-center justify-end">
                                  <button
                                    type="button"
                                    onClick={() => speakEnglishText(targetSentence)}
                                    className="btn btn-secondary btn-sm text-xs"
                                  >
                                    <Volume2 className="w-3.5 h-3.5 text-[var(--accent)]" aria-hidden="true" />
                                    <span>Pista en audio</span>
                                  </button>
                                </div>
                              )}

                              {!repState?.isCompleted ? (
                                <div className="space-y-2.5">
                                  <label htmlFor={repInputId} className="sr-only">
                                    Repetición de memoria para la frase corregida
                                  </label>
                                  <input
                                    id={repInputId}
                                    type="text"
                                    value={repState?.currentInput || ''}
                                    onChange={(e) => {
                                      const text = e.target.value;
                                      setRepetitionMap((prev) => ({
                                        ...prev,
                                        [q.id]: {
                                          ...(prev[q.id] || {
                                            repsCompleted: 0,
                                            isCompleted: false
                                          }),
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
                                    placeholder={`Repetición ${(repState?.repsCompleted || 0) + 1} de 2: escribe la frase…`}
                                    className="input-field"
                                  />

                                  <button
                                    type="button"
                                    onClick={() => handleCheckRepetition(q.id, targetSentence)}
                                    disabled={!repState?.currentInput?.trim()}
                                    className="btn btn-brass w-full"
                                  >
                                    <Check className="w-4 h-4" aria-hidden="true" />
                                    <span>Comprobar repetición</span>
                                  </button>

                                  {repState?.errorNotice && (
                                    <p
                                      role="alert"
                                      className="text-xs text-[var(--crimson)] font-medium bg-[var(--crimson-soft)] p-2.5 rounded-lg border border-[var(--crimson-border)] flex items-center gap-1.5"
                                    >
                                      <AlertTriangle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                                      <span>{repState.errorNotice}</span>
                                    </p>
                                  )}

                                  {(repState?.repsCompleted || 0) === 1 && !repState?.isCompleted && (
                                    <p className="text-xs text-[var(--pine)] font-semibold bg-[var(--pine-soft)] p-2.5 rounded-lg border border-[var(--pine-border)] flex items-center gap-1.5">
                                      <Check className="w-4 h-4 shrink-0" aria-hidden="true" />
                                      <span>Primera repetición correcta. Escríbela una vez más.</span>
                                    </p>
                                  )}
                                </div>
                              ) : (
                                <div className="bg-[var(--pine-soft)] border border-[var(--pine-border)] p-3 rounded-xl flex items-center gap-2 text-[var(--pine)] text-xs sm:text-sm font-semibold">
                                  <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden="true" />
                                  <span>Fallo superado: has escrito la frase exacta 2 veces de memoria.</span>
                                </div>
                              )}
                            </div>
                          );
                        })()}
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </section>
        </div>
      )}
    </div>
  );
};
