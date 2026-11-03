import React, { useState } from 'react';
import { StoryAnnotation, Exercise, Level } from '../types';
import { READING_STORIES } from '../data/readingData';
import { checkAnswerMatch } from '../data/infiniteGenerator';
import { analyzeWritingLocally } from '../data/writingData';
import {
  generateAIStoryWithOpenQuestions,
  evaluateStoryOpenAnswerWithAI,
  explainWordInStoryContextWithAI,
  AIGeneratedStory,
  AIStoryOpenQuestion,
  OpenAnswerFeedback
} from '../services/aiService';
import {
  appendCustomDictionaryWords,
  DictionaryWord,
  DICTIONARY_WORDS
} from '../data/fieldDictionaryData';
import { ExerciseCard } from './ExerciseCard';
import {
  BookOpen,
  Microscope,
  CheckCircle2,
  XCircle,
  Sparkles,
  FileSearch,
  Dumbbell,
  Cpu,
  PenTool,
  AlertTriangle,
  Languages,
  Search,
  Volume2,
  Check,
  Plus,
  RotateCcw,
  BookMarked
} from 'lucide-react';

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

// Normalizar texto para comparación tolerante de signos de puntuación
const normalizeSentence = (str: string) => {
  return str
    .toLowerCase()
    .replace(/[.,/#!$%^&*;:{}=\-_`~()?"'’]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
};

interface RepetitionStatus {
  currentInput: string;
  repsCompleted: number;
  isCompleted: boolean;
  errorNotice?: string;
}

interface ReadingZoneProps {
  completedStories: string[];
  onMarkStoryComplete: (storyId: string) => void;
  onExerciseAttempt: (exercise: Exercise, isCorrect: boolean, forceAddToVault?: boolean) => void;
  onOpenSettings?: () => void;
}

// Preguntas abiertas de escribir para las historias integradas
const BUILTIN_OPEN_QUESTIONS: Record<string, AIStoryOpenQuestion[]> = {
  'story-a2p-train': [
    {
      id: 'boq-a2p-1',
      questionEn: 'Why didn\'t Daniel hear the station announcement before jumping onto the train?',
      questionEs: '¿Por qué no escuchó Daniel el anuncio de la estación antes de subirse al tren?',
      targetStructureHint: 'Responde con una frase completa usando Past Continuous (was/were + -ing).',
      sampleIdealAnswer: 'He didn\'t hear the announcement because he was looking for his charger at the bottom of his backpack.'
    },
    {
      id: 'boq-a2p-2',
      questionEn: 'What did the ticket inspector advise Daniel to do, and what would you have done in his situation?',
      questionEs: '¿Qué le aconsejó hacer el revisor a Daniel y qué habrías hecho tú en su situación?',
      targetStructureHint: 'Usa "told/advised him to..." o "had better" y cuenta qué habrías hecho tú.',
      sampleIdealAnswer: 'The inspector told him that he had better get off at the next stop so he wouldn\'t end up in the Highlands.'
    }
  ],
  'story-b1-remote-work': [
    {
      id: 'boq-b1-1',
      questionEn: 'What was the hardest thing for Sofia to get used to when she started working from home?',
      questionEs: '¿Qué fue lo que más le costó acostumbrarse a Sofía cuando empezó a teletrabajar?',
      targetStructureHint: 'Responde usando la estructura "wasn\'t used to + -ing" o "get used to + -ing".',
      sampleIdealAnswer: 'At first, she wasn\'t used to working on her own all day and it took her months to get used to organizing her own schedule.'
    },
    {
      id: 'boq-b1-2',
      questionEn: 'Under what condition would Sofia return to a traditional office? Would you prefer working from home or in an office?',
      questionEs: '¿Bajo qué condición volvería Sofía a una oficina tradicional? ¿Preferirías tú teletrabajar o ir a la oficina?',
      targetStructureHint: 'Usa un 2º Condicional ("She wouldn\'t return unless..." / "If I had the choice, I would...").',
      sampleIdealAnswer: 'She wouldn\'t return to a traditional office unless they offered her double her current salary.'
    }
  ],
  'story-b1p-heist': [
    {
      id: 'boq-b1p-1',
      questionEn: 'Why was the thief able to steal the portrait so easily without being caught on camera?',
      questionEs: '¿Por qué pudo el ladrón robar el retrato tan fácilmente sin ser grabado por la cámara?',
      targetStructureHint: 'Usa Past Perfect o el Phrasal Verb "put off" + causativo ("having the system repaired").',
      sampleIdealAnswer: 'Because the management had kept putting off having the faulty security camera repaired for over six months.'
    },
    {
      id: 'boq-b1p-2',
      questionEn: 'How could the gallery have prevented the theft? Write a sentence using a Third Conditional.',
      questionEs: '¿Cómo podría haber evitado el robo la galería? Escribe una frase usando el 3º Condicional.',
      targetStructureHint: 'Usa "If the gallery had..., the thief wouldn\'t have...".',
      sampleIdealAnswer: 'If the gallery had fixed the cameras earlier, the thief wouldn\'t have got away with stealing the painting.'
    }
  ],
  'story-b2-algorithm': [
    {
      id: 'boq-b2-1',
      questionEn: 'According to cybersecurity experts, how do algorithms actually manage to come up with such accurate predictions?',
      questionEs: 'Según los expertos en ciberseguridad, ¿cómo logran realmente los algoritmos generar predicciones tan precisas?',
      targetStructureHint: 'Explica la razón con tus propias palabras usando conectores o phrasal verbs como "rely on" y "come up with".',
      sampleIdealAnswer: 'Instead of using secret microphones, algorithms rely on thousands of data points that users willingly hand over online.'
    },
    {
      id: 'boq-b2-2',
      questionEn: 'What do many internet users regret doing over the past decade? Use "wish + Past Perfect" or "regret + -ing".',
      questionEs: '¿De qué se arrepienten muchos usuarios de internet en la última década? Usa "wish + Past Perfect" o "regret + -ing".',
      targetStructureHint: 'Escribe una frase completa con "wish they hadn\'t..." o "regret clicking...".',
      sampleIdealAnswer: 'Many users now wish they hadn\'t clicked "Accept All" on every cookie banner without thinking about their privacy.'
    }
  ],
  'story-b2p-expedition': [
    {
      id: 'boq-b2p-1',
      questionEn: 'Under what circumstances would the research team have called off the Arctic crossing?',
      questionEs: '¿Bajo qué circunstancias habría cancelado el equipo de investigación la travesía ártica?',
      targetStructureHint: 'Responde usando una inversión o un condicional mixto ("Had the weather worsened...", "Under no circumstances would they...").',
      sampleIdealAnswer: 'Under no circumstances would they have carried on had the satellite communication system failed completely.'
    },
    {
      id: 'boq-b2p-2',
      questionEn: 'What crucial lesson did Elena take away from her time in Svalbard?',
      questionEs: '¿Qué lección crucial se llevó Elena de su estancia en Svalbard?',
      targetStructureHint: 'Usa una estructura enfática ("Not only did she realize...", "It was the extreme silence that...").',
      sampleIdealAnswer: 'Not only did she learn to cope with extreme isolation, but she also realized how fragile the Arctic ecosystem truly is.'
    }
  ]
};

export const ReadingZone: React.FC<ReadingZoneProps> = ({
  completedStories,
  onMarkStoryComplete,
  onExerciseAttempt,
  onOpenSettings
}) => {
  const [subTab, setSubTab] = useState<'stories' | 'ai_story_creator' | 'custom_analyzer'>('stories');
  const [selectedStoryId, setSelectedStoryId] = useState<string>(READING_STORIES[0].id);
  const [xrayActive, setXrayActive] = useState(true);
  const [activeAnnotation, setActiveAnnotation] = useState<StoryAnnotation | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  // Creador IA de historias
  const [aiLevel, setAiLevel] = useState<Level>('B1+');
  const [aiTopic, setAiTopic] = useState('');
  const [aiStoryLoading, setAiStoryLoading] = useState(false);
  const [aiStoryError, setAiStoryError] = useState<string | null>(null);
  const [aiStoriesList, setAiStoriesList] = useState<AIGeneratedStory[]>([]);
  const [activeAiStory, setAiActiveStory] = useState<AIGeneratedStory | null>(null);

  // Estados para las preguntas abiertas de escribir
  const [openInputs, setOpenInputs] = useState<Record<string, string>>({});
  const [openLoadingId, setOpenLoadingId] = useState<string | null>(null);
  const [openFeedbacks, setOpenFeedbacks] = useState<Record<string, OpenAnswerFeedback>>({});
  const [openShowTrans, setOpenShowTrans] = useState<Record<string, boolean>>({});
  const [repetitionMap, setRepetitionMap] = useState<Record<string, RepetitionStatus>>({});

  // Estados para el buscador de palabras que no sabes de la lectura
  const [lookupQuery, setLookupQuery] = useState('');
  const [lookupLoading, setLookupLoading] = useState(false);
  const [lookupResult, setLookupResult] = useState<{
    word: string;
    meaningEs: string;
    pron: string;
    partOfSpeech: string;
    exampleEn: string;
    exampleEs: string;
  } | null>(null);
  const [lookupError, setLookupError] = useState<string | null>(null);
  const [savedWords, setSavedWords] = useState<Set<string>>(new Set());

  // Analizador libre de texto pegado
  const [customText, setCustomText] = useState('');
  const [customExercises, setCustomExercises] = useState<Exercise[]>([]);
  const [customExIdx, setCustomExIdx] = useState(0);

  const currentStory =
    READING_STORIES.find((s) => s.id === selectedStoryId) || READING_STORIES[0];

  const handleSelectStory = (id: string) => {
    setSelectedStoryId(id);
    setActiveAnnotation(null);
    setAnswers({});
    setChecked({});
    setOpenInputs({});
    setOpenFeedbacks({});
    setLookupQuery('');
    setLookupResult(null);
    setLookupError(null);
    setRepetitionMap({});
  };

  const handleCheckStoryQuestion = (qId: string, directAnswer?: string) => {
    const val = directAnswer !== undefined ? directAnswer : answers[qId];
    if (!val) return;
    if (directAnswer !== undefined) {
      setAnswers((prev) => ({ ...prev, [qId]: directAnswer }));
    }
    setChecked((prev) => ({ ...prev, [qId]: true }));

    const qObj = currentStory.questions.find((x) => x.id === qId);
    if (qObj) {
      const isRight = checkAnswerMatch(val, qObj.acceptedAnswers);
      const exObj: Exercise = {
        id: `reading-q-${qId}`,
        level: currentStory.level,
        category: 'grammar',
        topicLabel: `Reading: ${currentStory.title}`,
        type: qObj.inputMode === 'choice' ? 'multiple_choice' : 'cloze',
        prompt: qObj.question,
        baseSentence: qObj.quoteFromText,
        acceptedAnswers: qObj.acceptedAnswers,
        explanation: qObj.explanation
      };
      onExerciseAttempt(exObj, isRight, false);
    }

    const allQIds = currentStory.questions.map((q) => q.id);
    const allDone = allQIds.every((id) => id === qId || checked[id]);
    if (allDone) {
      onMarkStoryComplete(currentStory.id);
    }
  };

  const handleEvaluateOpenQuestion = async (
    q: AIStoryOpenQuestion,
    storyParagraphs: string[],
    level: Level
  ) => {
    const userText = openInputs[q.id]?.trim();
    if (!userText) return;

    setOpenLoadingId(q.id);
    try {
      const aiRes = await evaluateStoryOpenAnswerWithAI(
        storyParagraphs,
        q.questionEn,
        userText,
        level
      );
      setOpenFeedbacks((prev) => ({ ...prev, [q.id]: aiRes }));
      setRepetitionMap((prev) => ({
        ...prev,
        [q.id]: {
          currentInput: '',
          repsCompleted: 0,
          isCompleted: false
        }
      }));
    } catch {
      // Fallback local
      const local = analyzeWritingLocally(userText);
      const fallbackFeedback: OpenAnswerFeedback = {
        isContentAccurate: true,
        scoreOutOf10: Math.round(local.scoreOutOf100 / 10),
        correctedUserSentence: userText,
        b2UpgradeSentence: q.sampleIdealAnswer,
        feedbackEs:
          local.feedbackItems.length > 0
            ? local.feedbackItems.map((f) => `${f.messageEs} (${f.suggestionEn})`).join(' | ')
            : 'Frase revisada localmente. Compara tu respuesta con la respuesta modelo de nivel B2.',
        errorsFound: local.feedbackItems
          .filter((f) => f.type === 'error')
          .map((f) => ({
            wrong: f.snippet,
            right: f.suggestionEn,
            whyEs: f.messageEs
          }))
      };
      setOpenFeedbacks((prev) => ({ ...prev, [q.id]: fallbackFeedback }));
      setRepetitionMap((prev) => ({
        ...prev,
        [q.id]: {
          currentInput: '',
          repsCompleted: 0,
          isCompleted: false
        }
      }));
    } finally {
      setOpenLoadingId(null);
    }
  };

  const handleCheckRepetition = (questionId: string, targetSentence: string) => {
    const current = repetitionMap[questionId] || { currentInput: '', repsCompleted: 0, isCompleted: false };
    const inputClean = normalizeSentence(current.currentInput);
    const targetClean = normalizeSentence(targetSentence);

    if (!inputClean) return;

    if (inputClean === targetClean) {
      const nextReps = current.repsCompleted + 1;
      const isDone = nextReps >= 2;
      setRepetitionMap((prev) => ({
        ...prev,
        [questionId]: {
          currentInput: '',
          repsCompleted: nextReps,
          isCompleted: isDone,
          errorNotice: undefined
        }
      }));
    } else {
      setRepetitionMap((prev) => ({
        ...prev,
        [questionId]: {
          ...current,
          errorNotice: 'No coincide exactamente. Fíjate en cada palabra de la frase corregida y vuelve a escribirla.'
        }
      }));
    }
  };

  const handleLookupWord = async (storyParagraphs: string[]) => {
    const q = lookupQuery.trim().toLowerCase();
    if (!q) return;

    setLookupLoading(true);
    setLookupError(null);

    try {
      // 1. Coincidencia estática en el diccionario local
      const match = DICTIONARY_WORDS.find(
        (w) => w.en.toLowerCase() === q || w.acceptedAnswers.some((a) => a.toLowerCase() === q)
      );

      if (match) {
        setLookupResult({
          word: match.en,
          meaningEs: match.es,
          pron: match.pron,
          partOfSpeech: match.partOfSpeech,
          exampleEn: match.exampleEn,
          exampleEs: match.exampleEs
        });
        return;
      }

      // 2. Consulta a la IA con contexto de la historia
      const fullStory = storyParagraphs.join(' ');
      const aiRes = await explainWordInStoryContextWithAI(q, fullStory);
      setLookupResult({
        word: q,
        meaningEs: aiRes.meaningEs,
        pron: aiRes.pron,
        partOfSpeech: aiRes.partOfSpeech,
        exampleEn: aiRes.exampleEn,
        exampleEs: aiRes.exampleEs
      });
    } catch {
      setLookupError('No se pudo consultar el significado. Comprueba tu conexión o clave de IA.');
    } finally {
      setLookupLoading(false);
    }
  };

  const handleSaveWordToVocabulary = (
    word: string,
    meaningEs: string,
    pron?: string,
    exampleEn?: string,
    exampleEs?: string
  ) => {
    const newWord: DictionaryWord = {
      id: `story-custom-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      es: meaningEs,
      en: word,
      acceptedAnswers: [word.toLowerCase().trim()],
      pron: pron || word.toLowerCase(),
      category: 'custom_ai',
      partOfSpeech: 'expression',
      exampleEn: exampleEn || `I learned "${word}" from the text.`,
      exampleEs: exampleEs || `Aprendí "${word}" de la historia.`
    };
    appendCustomDictionaryWords([newWord]);
    setSavedWords((prev) => new Set(prev).add(word.toLowerCase()));
  };

  const handleCreateAIStory = async (e: React.FormEvent) => {
    e.preventDefault();
    setAiStoryLoading(true);
    setAiStoryError(null);
    try {
      const newStory = await generateAIStoryWithOpenQuestions(aiLevel, aiTopic);
      setAiStoriesList((prev) => [newStory, ...prev]);
      setAiActiveStory(newStory);
      setActiveAnnotation(null);
      setLookupQuery('');
      setLookupResult(null);
      setLookupError(null);
      setRepetitionMap({});
    } catch (err: unknown) {
      setAiStoryError(
        err instanceof Error ? err.message : 'Error al generar la historia con IA.'
      );
    } finally {
      setAiStoryLoading(false);
    }
  };

  const renderAnnotatedParagraph = (
    paragraph: string,
    annotationsList: StoryAnnotation[]
  ) => {
    if (!xrayActive) return paragraph;

    let segments: (string | { text: string; ann: StoryAnnotation })[] = [paragraph];

    annotationsList.forEach((ann) => {
      if (!ann.phrase) return;
      const nextSegments: (string | { text: string; ann: StoryAnnotation })[] = [];
      segments.forEach((seg) => {
        if (typeof seg !== 'string') {
          nextSegments.push(seg);
          return;
        }
        const idx = seg.indexOf(ann.phrase);
        if (idx === -1) {
          nextSegments.push(seg);
        } else {
          if (idx > 0) nextSegments.push(seg.slice(0, idx));
          nextSegments.push({ text: ann.phrase, ann });
          if (idx + ann.phrase.length < seg.length) {
            nextSegments.push(seg.slice(idx + ann.phrase.length));
          }
        }
      });
      segments = nextSegments;
    });

    return segments.map((seg, i) => {
      if (typeof seg === 'string') return <span key={i}>{seg}</span>;

      const colorMap = {
        grammar: 'bg-indigo-100 text-indigo-900 border-b-2 border-indigo-500 hover:bg-indigo-200',
        phrasal_verb: 'bg-amber-100 text-amber-900 border-b-2 border-amber-500 hover:bg-amber-200',
        connector: 'bg-emerald-100 text-emerald-900 border-b-2 border-emerald-500 hover:bg-emerald-200',
        vocab: 'bg-purple-100 text-purple-900 border-b-2 border-purple-500 hover:bg-purple-200'
      };

      return (
        <button
          key={i}
          type="button"
          onClick={() => setActiveAnnotation(seg.ann)}
          className={`px-1.5 py-0.5 mx-0.5 rounded font-semibold transition-colors cursor-pointer ${
            colorMap[seg.ann.type] || colorMap.grammar
          }`}
        >
          {seg.text}
        </button>
      );
    });
  };

  // Recuadro: Palabras que no sabes del texto + Buscador inteligente
  const renderVocabularyExplorationBox = (
    annotations: StoryAnnotation[],
    paragraphs: string[]
  ) => (
    <div className="bg-white border-2 border-indigo-200 rounded-2xl p-4 sm:p-6 space-y-4 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
            <BookMarked className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-black text-slate-900">
              Palabras que no sabes del texto
            </h3>
            <p className="text-xs text-slate-600">
              Vocabulario clave con significado en español y pronunciación. Guarda cualquier palabra en tu Machaque.
            </p>
          </div>
        </div>
      </div>

      {/* Buscador de cualquier palabra de la lectura */}
      <div className="bg-slate-50 border border-indigo-100 rounded-xl p-3.5 space-y-2.5">
        <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
          <Search className="w-3.5 h-3.5 text-indigo-600" />
          <span>¿Hay alguna otra palabra de este texto que no conozcas? Escríbela:</span>
        </label>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={lookupQuery}
            onChange={(e) => setLookupQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleLookupWord(paragraphs);
              }
            }}
            placeholder="Ej: delayed, inspector, refund, rushed..."
            className="flex-1 bg-white border border-slate-300 focus:border-indigo-600 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 outline-none"
          />
          <button
            type="button"
            disabled={lookupLoading || !lookupQuery.trim()}
            onClick={() => handleLookupWord(paragraphs)}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-2 cursor-pointer min-h-[42px]"
          >
            {lookupLoading ? (
              <span>Consultando...</span>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>¿Qué significa?</span>
              </>
            )}
          </button>
        </div>

        {lookupError && (
          <p className="text-xs text-rose-700 bg-rose-50 border border-rose-200 p-2.5 rounded-xl">
            {lookupError}
          </p>
        )}

        {/* Resultado del buscador */}
        {lookupResult && (
          <div className="mt-2 p-3.5 rounded-xl bg-white border border-indigo-200 space-y-2 shadow-2xs">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-base font-black text-indigo-900">
                  {lookupResult.word}
                </span>
                {lookupResult.pron && (
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200">
                    [{lookupResult.pron}]
                  </span>
                )}
                {lookupResult.partOfSpeech && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200 uppercase">
                    {lookupResult.partOfSpeech}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => speakEnglishText(lookupResult.word)}
                  title="Escuchar pronunciación"
                  className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleSaveWordToVocabulary(
                      lookupResult.word,
                      lookupResult.meaningEs,
                      lookupResult.pron,
                      lookupResult.exampleEn,
                      lookupResult.exampleEs
                    )
                  }
                  disabled={savedWords.has(lookupResult.word.toLowerCase())}
                  className={`text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 cursor-pointer transition-all ${
                    savedWords.has(lookupResult.word.toLowerCase())
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  }`}
                >
                  {savedWords.has(lookupResult.word.toLowerCase()) ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>¡Guardada en Vocabulario!</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>Guardar en mi Machaque</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-800 font-semibold">
              👉 {lookupResult.meaningEs}
            </p>

            {lookupResult.exampleEn && (
              <div className="text-xs bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-slate-600">
                <p className="font-semibold text-slate-900">"{lookupResult.exampleEn}"</p>
                {lookupResult.exampleEs && (
                  <p className="italic text-slate-500 mt-0.5">{lookupResult.exampleEs}</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Expresiones y vocabulario clave del texto */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
            Vocabulario y expresiones destacadas del texto ({annotations.length}):
          </span>
          <span className="text-[11px] text-slate-400">
            Pulsa '+' para guardarlas en tu vocabulario
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 max-h-72 overflow-y-auto pr-1">
          {annotations.map((ann, idx) => {
            const isSaved = savedWords.has(ann.phrase.toLowerCase());
            return (
              <div
                key={idx}
                className="bg-slate-50 border border-slate-200 hover:border-indigo-300 rounded-xl p-3 flex flex-col justify-between gap-2 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                      {ann.label}
                    </span>
                    <button
                      type="button"
                      onClick={() => speakEnglishText(ann.phrase)}
                      title="Escuchar pronunciación"
                      className="p-1 rounded bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <h4 className="text-sm font-black text-slate-900">
                    "{ann.phrase}"
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                    {ann.explanationEs}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    handleSaveWordToVocabulary(
                      ann.phrase,
                      ann.explanationEs,
                      undefined,
                      ann.phrase,
                      ann.explanationEs
                    )
                  }
                  disabled={isSaved}
                  className={`w-full py-1.5 px-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                    isSaved
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                      : 'bg-white hover:bg-indigo-50 text-indigo-700 border border-indigo-200 hover:border-indigo-400'
                  }`}
                >
                  {isSaved ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Guardada</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>Añadir a mi Vocabulario</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  // Bloque reutilizable para renderizar las Preguntas Abiertas de Escribir
  const renderOpenWritingQuestionsBlock = (
    questions: AIStoryOpenQuestion[],
    paragraphs: string[],
    level: Level
  ) => (
    <div className="bg-white border border-indigo-200 rounded-2xl p-4 sm:p-6 space-y-4 sm:space-y-5 shadow-sm">
      <div>
        <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
          <PenTool className="w-5 h-5 text-emerald-600" />
          Preguntas Abiertas sobre la Historia (Escribe con tus palabras)
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Escribe tu respuesta completa en inglés y la herramienta te señalará cada errata o mejora de nivel B2.
        </p>
      </div>

      <div className="space-y-4 sm:space-y-5">
        {questions.map((oq, idx) => {
          const val = openInputs[oq.id] || '';
          const fb = openFeedbacks[oq.id];
          const isLoading = openLoadingId === oq.id;
          const showTrans = !!openShowTrans[oq.id];

          return (
            <div
              key={oq.id}
              className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-3"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <p className="font-bold text-sm sm:text-base text-slate-900">
                  {idx + 1}. {oq.questionEn}
                </p>
                <button
                  type="button"
                  onClick={() =>
                    setOpenShowTrans((prev) => ({ ...prev, [oq.id]: !prev[oq.id] }))
                  }
                  className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  <Languages className="w-3.5 h-3.5" />
                  {showTrans ? 'Ocultar traducción' : 'Traducir pregunta'}
                </button>
              </div>

              {showTrans && (
                <p className="text-xs sm:text-sm text-indigo-950 bg-indigo-50 border border-indigo-200 rounded-xl px-3.5 py-2">
                  🌐 {oq.questionEs}
                </p>
              )}

              <p className="text-xs text-amber-800 font-medium">
                💡 {oq.targetStructureHint}
              </p>

              <textarea
                rows={3}
                value={val}
                onChange={(e) =>
                  setOpenInputs((prev) => ({ ...prev, [oq.id]: e.target.value }))
                }
                placeholder="Escribe tu respuesta completa en inglés aquí..."
                className="w-full bg-white border-2 border-slate-300 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 rounded-xl p-3.5 text-sm sm:text-base text-slate-900 outline-none min-h-[90px]"
                spellCheck={false}
              />

              <div className="flex items-center justify-between gap-2">
                <button
                  type="button"
                  disabled={isLoading || !val.trim()}
                  onClick={() => handleEvaluateOpenQuestion(oq, paragraphs, level)}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
                >
                  <Sparkles className="w-4 h-4" />
                  {isLoading ? 'Analizando tus errores...' : 'Corregir mi respuesta escrita'}
                </button>
              </div>

              {fb && (
                <div className="mt-3 p-4 rounded-xl bg-white border border-emerald-300 space-y-3 text-xs sm:text-sm shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-800">
                      ✅ Corrección de tu respuesta (Nota: {fb.scoreOutOf10}/10)
                    </span>
                  </div>

                  <p className="text-slate-700 leading-relaxed">{fb.feedbackEs}</p>

                  {fb.errorsFound.length > 0 && (
                    <div className="space-y-2">
                      <span className="text-xs font-bold uppercase text-rose-800 block">
                        Errores detectados en tu frase:
                      </span>
                      {fb.errorsFound.map((err, i) => (
                        <div
                          key={i}
                          className="bg-slate-50 border border-rose-200 rounded-lg p-3 space-y-1"
                        >
                          <p className="text-rose-700 line-through">❌ {err.wrong}</p>
                          <p className="text-emerald-800 font-bold">✅ {err.right}</p>
                          <p className="text-slate-500 text-xs">{err.whyEs}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                      <span className="text-[11px] uppercase font-bold text-emerald-800 block mb-1">
                        Tu frase corregida:
                      </span>
                      <p className="text-slate-900 font-semibold">{fb.correctedUserSentence}</p>
                    </div>
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
                      <span className="text-[11px] uppercase font-bold text-amber-900 block mb-1">
                        Versión de Nivel B2 / Modelo:
                      </span>
                      <p className="text-amber-950 font-semibold">
                        {fb.b2UpgradeSentence || oq.sampleIdealAnswer}
                      </p>
                    </div>
                  </div>

                  {/* Sección de Repetición Activa de Fallos (2 Repeticiones obligatorias si hubo errores) */}
                  {(() => {
                    const targetSentence = (fb.correctedUserSentence || oq.sampleIdealAnswer).trim();
                    const hasMistakes =
                      (fb.errorsFound && fb.errorsFound.length > 0) ||
                      fb.scoreOutOf10 < 8 ||
                      normalizeSentence(val) !== normalizeSentence(targetSentence);
                    const repState = repetitionMap[oq.id];

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
                          Has tenido algún fallo o errata. Recuerda la corrección de arriba y escribe la frase completa sin errores <strong>2 veces seguidas de memoria</strong> para fijarla:
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
                                  [oq.id]: {
                                    ...(prev[oq.id] || { repsCompleted: 0, isCompleted: false }),
                                    currentInput: text,
                                    errorNotice: undefined
                                  }
                                }));
                              }}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  handleCheckRepetition(oq.id, targetSentence);
                                }
                              }}
                              placeholder={`Repetición ${(repState?.repsCompleted || 0) + 1} de 2: Escribe la frase de memoria...`}
                              className="w-full bg-white border-2 border-amber-300 focus:border-amber-600 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 outline-none"
                            />

                            <button
                              type="button"
                              onClick={() => handleCheckRepetition(oq.id, targetSentence)}
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
                            <span>🎉 ¡Fallo superado con éxito! Has escrito la frase perfecta 2 veces seguidas. ¡Estructura fijada!</span>
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
  );

  // Analizador automático de cualquier texto que pegue el usuario
  const analyzeCustomText = () => {
    const patterns: {
      category: string;
      label: string;
      regex: RegExp;
      explanation: string;
    }[] = [
      {
        category: 'Tiempos Perfectos / Continuos',
        label: 'Past Perfect Continuous (had been + -ing)',
        regex: /\bhad\s+(not\s+)?been\s+\w+ing\b/gi,
        explanation: 'Expresa una acción en progreso durante un tiempo ANTES de otro momento del pasado.'
      },
      {
        category: 'Tiempos Perfectos / Continuos',
        label: 'Past Perfect Simple (had + participio)',
        regex: /\bhad(n't|\s+not)?\s+(already\s+|just\s+|never\s+)?(tested|worked|seen|gone|been|done|made|taken|left|arrived|finished|checked|started|lost|found|bought|told|said)\b/gi,
        explanation: 'El "pasado del pasado": indica una acción anterior a otra acción pasada.'
      },
      {
        category: 'Condicionales y Deseos',
        label: 'Third Conditional (would/could have + participio)',
        regex: /\b(would|wouldn't|could|couldn't|might)\s+(not\s+)?have\s+\w+(ed|en|t|ne|wn)\b/gi,
        explanation: 'Consecuencia irreal en el pasado (Third Conditional o Modal Perfecto).'
      },
      {
        category: 'Phrasal Verbs Comunes',
        label: 'Phrasal Verb con partícula off/up/out/down/into',
        regex: /\b(called off|put off|turned down|come up with|bumped into|ran into|gave up|ended up|carried out|look forward to)\b/gi,
        explanation: 'Verbo compuesto indispensable para los exámenes B1 y B2.'
      },
      {
        category: 'Conectores B2',
        label: 'Conector de contraste / adición (Despite / Although / Furthermore)',
        regex: /\b(despite\s+(the\s+fact\s+that)?|in\s+spite\s+of|although|even\s+though|furthermore|moreover|nevertheless|on\s+the\s+contrary)\b/gi,
        explanation: 'Conectores avanzados para estructurar discursos y ensayos de Use of English.'
      }
    ];

    const findings: {
      category: string;
      label: string;
      match: string;
      explanation: string;
    }[] = [];

    const generatedEx: Exercise[] = [];

    if (customText.trim()) {
      patterns.forEach((pat) => {
        const matches = customText.match(pat.regex);
        if (matches) {
          matches.slice(0, 3).forEach((m) => {
            findings.push({
              category: pat.category,
              label: pat.label,
              match: m,
              explanation: pat.explanation
            });

            const gapped = customText.replace(m, '___');
            generatedEx.push({
              id: `custom-${Date.now()}-${Math.random()}`,
              level: 'B2',
              category: 'grammar',
              topicLabel: pat.label,
              type: 'cloze',
              prompt: `Rellena el hueco detectado en tu texto (${pat.label}):`,
              baseSentence: gapped.slice(0, 200) + '...',
              acceptedAnswers: [m],
              explanation: pat.explanation
            });
          });
        }
      });
    }

    return { findings, generatedEx };
  };

  const customAnalysis = analyzeCustomText();

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header & Mode Tabs */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 shadow-sm">
        <div>
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-sky-500" />
            Zona de Historias, Textos IA & Preguntas de Escribir
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Lee historias o crea nuevas con IA y responde preguntas de escribir con corrección de errores.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setSubTab('stories')}
            className={`px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer transition-all ${
              subTab === 'stories'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Historias ({READING_STORIES.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setSubTab('ai_story_creator')}
            className={`px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer transition-all ${
              subTab === 'ai_story_creator'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>Crear con IA</span>
          </button>

          <button
            type="button"
            onClick={() => setSubTab('custom_analyzer')}
            className={`px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer transition-all ${
              subTab === 'custom_analyzer'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <FileSearch className="w-4 h-4" />
            <span>Analizar Texto</span>
          </button>
        </div>
      </div>

      {/* TAB A: AI STORY CREATOR + OPEN WRITTEN QUESTIONS */}
      {subTab === 'ai_story_creator' && (
        <div className="space-y-4 sm:space-y-6">
          <form
            onSubmit={handleCreateAIStory}
            className="bg-white border border-emerald-200 rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <Cpu className="w-6 h-6 text-emerald-600" />
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    Generador IA de Historias con Preguntas Abiertas de Escribir
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600">
                    La IA escribirá una historia de tu nivel con estructuras clave resaltadas y preguntas abiertas debajo.
                  </p>
                </div>
              </div>
              {onOpenSettings && (
                <button
                  type="button"
                  onClick={onOpenSettings}
                  className="self-start sm:self-auto px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 font-bold text-xs flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  <Cpu className="w-3.5 h-3.5" />
                  <span>⚙️ Ajustes / Cambiar API Key</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">
                  Nivel de la Historia
                </label>
                <select
                  value={aiLevel}
                  onChange={(e) => setAiLevel(e.target.value as Level)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 text-sm outline-none focus:border-emerald-600"
                >
                  <option value="A2+">A2+ (A2 Advanced)</option>
                  <option value="B1">B1 (Intermediate)</option>
                  <option value="B1+">B1+ (Intermediate Advanced)</option>
                  <option value="B2">B2 (Upper-Intermediate)</option>
                  <option value="B2+">B2+ (B2 Advanced)</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">
                  Temática o Género de la Historia (Opcional)
                </label>
                <input
                  type="text"
                  value={aiTopic}
                  onChange={(e) => setAiTopic(e.target.value)}
                  placeholder="Ej: Un problema en un hotel en Londres, misterio, entrevista de trabajo..."
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 text-sm outline-none focus:border-emerald-600"
                />
              </div>
            </div>

            {aiStoryError && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{aiStoryError}</span>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="submit"
                disabled={aiStoryLoading}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold rounded-xl shadow-xs flex items-center justify-center gap-2 cursor-pointer min-h-[48px]"
              >
                <Sparkles className="w-4 h-4" />
                {aiStoryLoading
                  ? 'Escribiendo historia y preguntas...'
                  : 'Crear Nueva Historia Ahora'}
              </button>

              {aiStoriesList.length > 1 && (
                <div className="flex flex-wrap gap-2">
                  {aiStoriesList.map((st) => (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => setAiActiveStory(st)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border cursor-pointer ${
                        activeAiStory?.id === st.id
                          ? 'bg-emerald-50 border-emerald-400 text-emerald-800'
                          : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      [{st.level}] {st.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </form>

          {activeAiStory && (
            <div className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <div className="lg:col-span-2 bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-6 space-y-4 shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
                    <div>
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Nivel {activeAiStory.level} • {activeAiStory.genre}
                      </span>
                      <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-1">
                        {activeAiStory.title}
                      </h3>
                    </div>

                    <button
                      type="button"
                      onClick={() => setXrayActive(!xrayActive)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 border cursor-pointer ${
                        xrayActive
                          ? 'bg-indigo-50 border-indigo-300 text-indigo-700'
                          : 'bg-slate-100 border-slate-200 text-slate-700'
                      }`}
                    >
                      <Microscope className="w-4 h-4" />
                      {xrayActive ? 'Rayos X: ACTIVADO' : 'Activar Rayos X'}
                    </button>
                  </div>

                  <div className="space-y-4 text-slate-800 text-base sm:text-lg leading-relaxed">
                    {activeAiStory.paragraphs.map((p, idx) => (
                      <p key={idx} className="leading-8">
                        <span className="text-xs font-mono text-slate-400 mr-2 select-none">
                          [P{idx + 1}]
                        </span>
                        {renderAnnotatedParagraph(p, activeAiStory.annotations)}
                      </p>
                    ))}
                  </div>
                </div>

                {/* X-Ray Sidebar for AI Story */}
                <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 space-y-3 shadow-sm">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-700 flex items-center gap-2">
                    <Microscope className="w-4 h-4" />
                    Estructuras Clave de la Historia
                  </h4>

                  {activeAnnotation ? (
                    <div className="bg-slate-50 border border-indigo-200 rounded-xl p-4 space-y-1.5">
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                        {activeAnnotation.label}
                      </span>
                      <p className="text-base font-extrabold text-slate-900">
                        "{activeAnnotation.phrase}"
                      </p>
                      <p className="text-sm text-slate-600">{activeAnnotation.explanationEs}</p>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500">
                      Pulsa cualquier expresión subrayada en el texto para ver su explicación.
                    </p>
                  )}

                  <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                    {activeAiStory.annotations.map((ann, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setActiveAnnotation(ann)}
                        className="w-full text-left p-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs cursor-pointer"
                      >
                        <div className="font-bold text-amber-800">"{ann.phrase}"</div>
                        <div className="text-slate-500 mt-0.5">{ann.label}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recuadro de Palabras que no sabes del texto */}
              {renderVocabularyExplorationBox(
                activeAiStory.annotations,
                activeAiStory.paragraphs
              )}

              {/* Open Writing Questions for the AI Story */}
              {renderOpenWritingQuestionsBlock(
                activeAiStory.openQuestions,
                activeAiStory.paragraphs,
                activeAiStory.level
              )}
            </div>
          )}
        </div>
      )}

      {/* TAB B: CURATED STORIES + X-RAY + OPEN WRITTEN QUESTIONS + EXERCISES */}
      {subTab === 'stories' && (
        <div className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
            {READING_STORIES.map((story) => {
              const isSelected = story.id === currentStory.id;
              const isDone = completedStories.includes(story.id);
              return (
                <button
                  key={story.id}
                  type="button"
                  onClick={() => handleSelectStory(story.id)}
                  className={`text-left p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-1.5 shadow-2xs ${
                    isSelected
                      ? 'bg-sky-50 border-2 border-sky-600 text-slate-900 shadow-xs'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-[11px] font-extrabold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                        {story.level}
                      </span>
                      {isDone && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                    </div>
                    <h3 className="font-bold text-xs sm:text-sm text-slate-900 line-clamp-2">
                      {story.title}
                    </h3>
                  </div>
                  <p className="text-[11px] text-slate-500">{story.genre}</p>
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2 bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-6 space-y-4 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-sky-50 text-sky-700 border border-sky-200">
                      Nivel {currentStory.level}
                    </span>
                    <span className="text-xs text-slate-500">
                      • {currentStory.genre} • {currentStory.readingTimeMin} min lectura
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-1">
                    {currentStory.title}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setXrayActive(!xrayActive)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 border transition-all cursor-pointer ${
                    xrayActive
                      ? 'bg-indigo-50 border-indigo-300 text-indigo-700'
                      : 'bg-slate-100 border-slate-200 text-slate-700'
                  }`}
                >
                  <Microscope className="w-4 h-4" />
                  {xrayActive ? 'Rayos X: ACTIVADO' : 'Activar Rayos X'}
                </button>
              </div>

              <div className="space-y-4 text-slate-800 text-base sm:text-lg leading-relaxed font-normal">
                {currentStory.paragraphs.map((p, idx) => (
                  <p key={idx} className="leading-8">
                    <span className="text-xs font-mono text-slate-400 mr-2 select-none">
                      [P{idx + 1}]
                    </span>
                    {renderAnnotatedParagraph(p, currentStory.annotations)}
                  </p>
                ))}
              </div>
            </div>

            <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 flex flex-col justify-between gap-4 shadow-sm">
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-700 flex items-center gap-2">
                  <Microscope className="w-4 h-4" />
                  Destripador Gramatical
                </h4>

                {activeAnnotation ? (
                  <div className="bg-slate-50 border border-indigo-200 rounded-xl p-3.5 space-y-1.5">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                      {activeAnnotation.label}
                    </span>
                    <p className="text-base font-extrabold text-slate-900">
                      "{activeAnnotation.phrase}"
                    </p>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {activeAnnotation.explanationEs}
                    </p>
                  </div>
                ) : (
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-500">
                    👆 Pulsa sobre cualquiera de las palabras resaltadas en la historia para ver por qué el autor usó esa estructura.
                  </div>
                )}

                <div className="space-y-1.5 max-h-80 overflow-y-auto pr-1">
                  {currentStory.annotations.map((ann, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActiveAnnotation(ann)}
                      className={`w-full text-left p-2.5 rounded-xl border text-xs transition-all cursor-pointer ${
                        activeAnnotation?.phrase === ann.phrase
                          ? 'bg-indigo-50 border-indigo-300 text-indigo-900 font-bold'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <div className="font-bold text-amber-800">"{ann.phrase}"</div>
                      <div className="text-slate-500 mt-0.5">{ann.label}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recuadro de Palabras que no sabes del texto */}
          {renderVocabularyExplorationBox(
            currentStory.annotations,
            currentStory.paragraphs
          )}

          {/* 1. Open Writing Questions for Built-in Story */}
          {BUILTIN_OPEN_QUESTIONS[currentStory.id] &&
            renderOpenWritingQuestionsBlock(
              BUILTIN_OPEN_QUESTIONS[currentStory.id],
              currentStory.paragraphs,
              currentStory.level
            )}

          {/* 2. Grammar Analysis & Transformations of the Text */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-6 space-y-4 shadow-sm">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                Análisis Gramatical y Transformaciones del Texto ({currentStory.questions.length})
              </h3>
            </div>

            <div className="space-y-3.5">
              {currentStory.questions.map((q, idx) => {
                const userAns = answers[q.id] || '';
                const isChecked = !!checked[q.id];
                const isRight = isChecked && checkAnswerMatch(userAns, q.acceptedAnswers);

                return (
                  <div
                    key={q.id}
                    className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5 space-y-3"
                  >
                    <p className="font-bold text-sm sm:text-base text-slate-900">
                      {idx + 1}. {q.question}
                    </p>

                    {q.quoteFromText && (
                      <p className="text-xs sm:text-sm italic text-indigo-900 bg-indigo-50 px-3 py-2 rounded-lg border border-indigo-200">
                        Fragmento del texto: "{q.quoteFromText}"
                      </p>
                    )}

                    {q.inputMode === 'choice' && q.options ? (
                      <div className="space-y-2">
                        {q.options.map((opt) => {
                          const selected = userAns === opt;
                          return (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => handleCheckStoryQuestion(q.id, opt)}
                              className={`w-full text-left px-4 py-3 rounded-xl text-xs sm:text-sm font-medium border transition-all cursor-pointer ${
                                selected
                                  ? isRight
                                    ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold'
                                    : 'bg-rose-50 border-rose-500 text-rose-900 font-bold'
                                  : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50'
                              }`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="flex flex-col sm:flex-row gap-2">
                        <input
                          type="text"
                          value={userAns}
                          onChange={(e) =>
                            setAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))
                          }
                          placeholder="Escribe tu respuesta aquí..."
                          className="flex-1 bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-indigo-600"
                        />
                        <button
                          type="button"
                          onClick={() => handleCheckStoryQuestion(q.id)}
                          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl cursor-pointer shadow-xs min-h-[44px]"
                        >
                          Comprobar
                        </button>
                      </div>
                    )}

                    {isChecked && (
                      <div
                        className={`p-3.5 rounded-xl border text-xs sm:text-sm ${
                          isRight
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                            : 'bg-rose-50 border-rose-300 text-rose-950'
                        }`}
                      >
                        <div className="flex items-center gap-2 font-bold mb-1">
                          {isRight ? (
                            <>
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              ¡Análisis correcto!
                            </>
                          ) : (
                            <>
                              <XCircle className="w-4 h-4 text-rose-600" />
                              Respuesta esperada: {q.acceptedAnswers.join(' / ')}
                            </>
                          )}
                        </div>
                        <p className="text-slate-700">{q.explanation}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB C: CUSTOM TEXT ANALYZER */}
      {subTab === 'custom_analyzer' && (
        <div className="space-y-4 sm:space-y-6">
          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-6 space-y-4 shadow-sm">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <FileSearch className="w-5 h-5 text-purple-600" />
              Pega cualquier texto o historia en inglés para destripar su gramática
            </h3>
            <textarea
              rows={5}
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder="Pega aquí cualquier texto en inglés..."
              className="w-full bg-white border-2 border-slate-300 rounded-xl p-4 text-sm sm:text-base text-slate-900 outline-none focus:border-purple-600 min-h-[120px]"
            />

            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-slate-500">
                Estructuras detectadas en tu texto: <strong>{customAnalysis.findings.length}</strong>
              </span>
              <button
                type="button"
                onClick={() => {
                  setCustomExercises(customAnalysis.generatedEx);
                  setCustomExIdx(0);
                }}
                disabled={customAnalysis.generatedEx.length === 0}
                className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 disabled:opacity-40 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-xs min-h-[44px]"
              >
                <Dumbbell className="w-4 h-4" />
                Generar {customAnalysis.generatedEx.length} Ejercicios de Este Texto
              </button>
            </div>

            {customAnalysis.findings.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                {customAnalysis.findings.map((f, i) => (
                  <div
                    key={i}
                    className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs sm:text-sm space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-amber-800">"{f.match}"</span>
                      <span className="text-[11px] px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200">
                        {f.category}
                      </span>
                    </div>
                    <p className="text-slate-900 font-semibold text-xs">{f.label}</p>
                    <p className="text-slate-600 text-xs">{f.explanation}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {customExercises.length > 0 && (
            <div className="space-y-3">
              <ExerciseCard
                exercise={customExercises[customExIdx % customExercises.length]}
                onAttempt={onExerciseAttempt}
                onNext={() => setCustomExIdx((i) => i + 1)}
                indexLabel={`Ejercicio #${(customExIdx % customExercises.length) + 1} de ${customExercises.length}`}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
