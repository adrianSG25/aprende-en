import React, { useState, useId } from 'react';
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
  BookMarked,
  Settings,
  Lightbulb
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
      questionEn: "Why didn't Daniel hear the station announcement before jumping onto the train?",
      questionEs: '¿Por qué no escuchó Daniel el anuncio de la estación antes de subirse al tren?',
      targetStructureHint: 'Responde con una frase completa usando Past Continuous (was/were + -ing).',
      sampleIdealAnswer:
        "He didn't hear the announcement because he was looking for his charger at the bottom of his backpack."
    },
    {
      id: 'boq-a2p-2',
      questionEn:
        'What did the ticket inspector advise Daniel to do, and what would you have done in his situation?',
      questionEs:
        '¿Qué le aconsejó hacer el revisor a Daniel y qué habrías hecho tú en su situación?',
      targetStructureHint:
        'Usa "told/advised him to..." o "had better" y cuenta qué habrías hecho tú.',
      sampleIdealAnswer:
        "The inspector told him that he had better get off at the next stop so he wouldn't end up in the Highlands."
    }
  ],
  'story-b1-remote-work': [
    {
      id: 'boq-b1-1',
      questionEn:
        'What was the hardest thing for Sofia to get used to when she started working from home?',
      questionEs:
        '¿Qué fue lo que más le costó acostumbrarse a Sofía cuando empezó a teletrabajar?',
      targetStructureHint: 'Responde usando la estructura "wasn\'t used to + -ing" o "get used to + -ing".',
      sampleIdealAnswer:
        "At first, she wasn't used to working on her own all day and it took her months to get used to organizing her own schedule."
    },
    {
      id: 'boq-b1-2',
      questionEn:
        'Under what condition would Sofia return to a traditional office? Would you prefer working from home or in an office?',
      questionEs:
        '¿Bajo qué condición volvería Sofía a una oficina tradicional? ¿Preferirías tú teletrabajar o ir a la oficina?',
      targetStructureHint:
        'Usa un 2º Condicional ("She wouldn\'t return unless..." / "If I had the choice, I would...").',
      sampleIdealAnswer:
        "She wouldn't return to a traditional office unless they offered her double her current salary."
    }
  ],
  'story-b1p-heist': [
    {
      id: 'boq-b1p-1',
      questionEn:
        'Why was the thief able to steal the portrait so easily without being caught on camera?',
      questionEs:
        '¿Por qué pudo el ladrón robar el retrato tan fácilmente sin ser grabado por la cámara?',
      targetStructureHint:
        'Usa Past Perfect o el Phrasal Verb "put off" + causativo ("having the system repaired").',
      sampleIdealAnswer:
        'Because the management had kept putting off having the faulty security camera repaired for over six months.'
    },
    {
      id: 'boq-b1p-2',
      questionEn:
        'How could the gallery have prevented the theft? Write a sentence using a Third Conditional.',
      questionEs:
        '¿Cómo podría haber evitado el robo la galería? Escribe una frase usando el 3º Condicional.',
      targetStructureHint: 'Usa "If the gallery had..., the thief wouldn\'t have...".',
      sampleIdealAnswer:
        "If the gallery had fixed the cameras earlier, the thief wouldn't have got away with stealing the painting."
    }
  ],
  'story-b2-algorithm': [
    {
      id: 'boq-b2-1',
      questionEn:
        'According to cybersecurity experts, how do algorithms actually manage to come up with such accurate predictions?',
      questionEs:
        'Según los expertos en ciberseguridad, ¿cómo logran realmente los algoritmos generar predicciones tan precisas?',
      targetStructureHint:
        'Explica la razón con tus propias palabras usando conectores o phrasal verbs como "rely on" y "come up with".',
      sampleIdealAnswer:
        'Instead of using secret microphones, algorithms rely on thousands of data points that users willingly hand over online.'
    },
    {
      id: 'boq-b2-2',
      questionEn:
        'What do many internet users regret doing over the past decade? Use "wish + Past Perfect" or "regret + -ing".',
      questionEs:
        '¿De qué se arrepienten muchos usuarios de internet en la última década? Usa "wish + Past Perfect" o "regret + -ing".',
      targetStructureHint: 'Escribe una frase completa con "wish they hadn\'t..." o "regret clicking...".',
      sampleIdealAnswer:
        'Many users now wish they hadn\'t clicked "Accept All" on every cookie banner without thinking about their privacy.'
    }
  ],
  'story-b2p-expedition': [
    {
      id: 'boq-b2p-1',
      questionEn: 'Under what circumstances would the research team have called off the Arctic crossing?',
      questionEs:
        '¿Bajo qué circunstancias habría cancelado el equipo de investigación la travesía ártica?',
      targetStructureHint:
        'Responde usando una inversión o un condicional mixto ("Had the weather worsened...", "Under no circumstances would they...").',
      sampleIdealAnswer:
        'Under no circumstances would they have carried on had the satellite communication system failed completely.'
    },
    {
      id: 'boq-b2p-2',
      questionEn: 'What crucial lesson did Elena take away from her time in Svalbard?',
      questionEs: '¿Qué lección crucial se llevó Elena de su estancia en Svalbard?',
      targetStructureHint:
        'Usa una estructura enfática ("Not only did she realize...", "It was the extreme silence that...").',
      sampleIdealAnswer:
        'Not only did she learn to cope with extreme isolation, but she also realized how fragile the Arctic ecosystem truly is.'
    }
  ]
};

export const ReadingZone: React.FC<ReadingZoneProps> = ({
  completedStories,
  onMarkStoryComplete,
  onExerciseAttempt,
  onOpenSettings
}) => {
  const lookupInputId = useId();
  const aiLevelSelectId = useId();
  const aiTopicInputId = useId();
  const customTextareaId = useId();

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

  // Estados para el buscador de palabras de la lectura
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
    const current = repetitionMap[questionId] || {
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
          errorNotice:
            'No coincide exactamente. Fíjate en cada palabra de la frase corregida y vuelve a escribirla.'
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
        grammar:
          'bg-[var(--accent-soft)] text-[var(--accent)] border-b-2 border-[var(--accent)] hover:bg-[#dce8fb]',
        phrasal_verb:
          'bg-[var(--brass-soft)] text-[var(--brass)] border-b-2 border-[var(--brass)] hover:bg-[#faefc9]',
        connector:
          'bg-[var(--pine-soft)] text-[var(--pine)] border-b-2 border-[var(--pine)] hover:bg-[#d8f1e4]',
        vocab:
          'bg-[var(--surface-2)] text-[var(--ink)] border-b-2 border-[var(--tarmac)] hover:bg-[var(--surface-3)]'
      };

      const isActive = activeAnnotation?.phrase === seg.text;

      return (
        <button
          key={i}
          type="button"
          onClick={() => setActiveAnnotation(seg.ann)}
          aria-pressed={isActive}
          className={`px-1 py-0.5 mx-0.5 rounded font-semibold transition-colors inline ${
            colorMap[seg.ann.type] || colorMap.grammar
          } ${isActive ? 'ring-2 ring-[var(--accent)]/40' : ''}`}
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
    <section className="card p-5 sm:p-6 space-y-5">
      <div className="flex items-start gap-3 pb-3 border-b border-[var(--border)]">
        <div className="w-10 h-10 rounded-xl bg-[var(--accent-soft)] border border-[var(--accent-border)] text-[var(--accent)] flex items-center justify-center shrink-0">
          <BookMarked className="w-5 h-5" aria-hidden="true" />
        </div>
        <div>
          <h3 className="font-display text-base sm:text-lg font-bold text-[var(--ink)]">
            Palabras y expresiones del texto
          </h3>
          <p className="text-xs sm:text-sm text-[var(--ink-muted)] mt-0.5">
            Consulta cualquier palabra que no entiendas o añade las expresiones clave directamente a tu Machaque.
          </p>
        </div>
      </div>

      {/* Buscador de cualquier palabra de la lectura */}
      <div className="inset-well p-4 space-y-3">
        <label
          htmlFor={lookupInputId}
          className="text-xs font-semibold text-[var(--ink)] flex items-center gap-1.5"
        >
          <Search className="w-3.5 h-3.5 text-[var(--accent)]" aria-hidden="true" />
          <span>¿Alguna palabra de esta lectura que no conozcas?</span>
        </label>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            id={lookupInputId}
            type="text"
            value={lookupQuery}
            onChange={(e) => setLookupQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleLookupWord(paragraphs);
              }
            }}
            placeholder="Ej: delayed, inspector, refund, rushed…"
            className="input-field flex-1"
          />
          <button
            type="button"
            disabled={lookupLoading || !lookupQuery.trim()}
            onClick={() => handleLookupWord(paragraphs)}
            className="btn btn-primary shrink-0"
          >
            {lookupLoading ? (
              <>
                <RotateCcw className="w-4 h-4 animate-spin" aria-hidden="true" />
                <span>Consultando…</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" aria-hidden="true" />
                <span>¿Qué significa?</span>
              </>
            )}
          </button>
        </div>

        {lookupError && (
          <p
            role="alert"
            className="text-xs text-[var(--crimson)] bg-[var(--crimson-soft)] border border-[var(--crimson-border)] p-3 rounded-xl font-medium"
          >
            {lookupError}
          </p>
        )}

        {/* Resultado del buscador */}
        {lookupResult && (
          <div
            aria-live="polite"
            className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)] space-y-3"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2 min-w-0">
                <span className="font-display text-base sm:text-lg font-bold text-[var(--ink)]">
                  {lookupResult.word}
                </span>
                {lookupResult.pron && (
                  <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-md bg-[var(--brass-soft)] text-[var(--brass)] border border-[var(--brass-border)]">
                    [{lookupResult.pron}]
                  </span>
                )}
                {lookupResult.partOfSpeech && (
                  <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-[var(--surface-2)] text-[var(--ink-muted)]">
                    {lookupResult.partOfSpeech}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => speakEnglishText(lookupResult.word)}
                  aria-label={`Escuchar pronunciación de ${lookupResult.word}`}
                  title="Escuchar pronunciación"
                  className="icon-btn bg-[var(--surface-2)] border border-[var(--border)]"
                >
                  <Volume2 className="w-4 h-4 text-[var(--accent)]" aria-hidden="true" />
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
                  className={`btn btn-sm ${
                    savedWords.has(lookupResult.word.toLowerCase()) ? 'btn-soft' : 'btn-pine'
                  }`}
                >
                  {savedWords.has(lookupResult.word.toLowerCase()) ? (
                    <>
                      <Check className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Guardada en vocabulario</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Guardar en Machaque</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[var(--ink)] font-semibold">
              Significado: {lookupResult.meaningEs}
            </p>

            {lookupResult.exampleEn && (
              <div className="inset-well p-3 text-xs space-y-1">
                <p className="font-medium text-[var(--ink)]">"{lookupResult.exampleEn}"</p>
                {lookupResult.exampleEs && (
                  <p className="italic text-[var(--ink-muted)]">{lookupResult.exampleEs}</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Expresiones y vocabulario clave del texto */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-semibold text-[var(--ink-muted)] tabular-nums">
            Expresiones destacadas del texto ({annotations.length})
          </span>
          <span className="text-xs text-[var(--ink-subtle)]">
            Pulsa añadir para guardarlas en tu repaso
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-80 overflow-y-auto pr-1">
          {annotations.map((ann, idx) => {
            const isSaved = savedWords.has(ann.phrase.toLowerCase());
            return (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-[var(--surface-2)]/60 border border-[var(--border)] flex flex-col justify-between gap-3"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-[var(--surface)] text-[var(--accent)] border border-[var(--accent-border)]">
                      {ann.label}
                    </span>
                    <button
                      type="button"
                      onClick={() => speakEnglishText(ann.phrase)}
                      aria-label={`Escuchar pronunciación de ${ann.phrase}`}
                      title="Escuchar pronunciación"
                      className="icon-btn min-w-[36px] min-h-[36px] bg-[var(--surface)] border border-[var(--border)]"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-[var(--accent)]" aria-hidden="true" />
                    </button>
                  </div>
                  <h4 className="font-display text-sm font-bold text-[var(--ink)]">
                    "{ann.phrase}"
                  </h4>
                  <p className="text-xs text-[var(--ink-muted)] line-clamp-2 leading-relaxed">
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
                  className={`btn btn-sm w-full ${isSaved ? 'btn-soft' : 'btn-secondary'}`}
                >
                  {isSaved ? (
                    <>
                      <Check className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Guardada</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Añadir a vocabulario</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );

  // Bloque reutilizable para renderizar las Preguntas Abiertas de Escribir
  const renderOpenWritingQuestionsBlock = (
    questions: AIStoryOpenQuestion[],
    paragraphs: string[],
    level: Level
  ) => (
    <section className="card p-5 sm:p-6 space-y-5">
      <div className="pb-3 border-b border-[var(--border)]">
        <h3 className="font-display text-base sm:text-lg font-bold text-[var(--ink)] flex items-center gap-2">
          <PenTool className="w-4 h-4 text-[var(--pine)] shrink-0" aria-hidden="true" />
          <span>Preguntas abiertas sobre la historia</span>
        </h3>
        <p className="text-xs sm:text-sm text-[var(--ink-muted)] mt-1">
          Escribe tu respuesta completa en inglés y revisa cada error o mejora hacia un nivel natural B2.
        </p>
      </div>

      <div className="space-y-5">
        {questions.map((oq, idx) => {
          const val = openInputs[oq.id] || '';
          const fb = openFeedbacks[oq.id];
          const isLoading = openLoadingId === oq.id;
          const showTrans = !!openShowTrans[oq.id];
          const textareaId = `reading-open-q-${oq.id}`;
          const repInputId = `reading-open-rep-${oq.id}`;

          return (
            <article
              key={oq.id}
              className="p-4 sm:p-5 rounded-xl bg-[var(--surface-2)]/60 border border-[var(--border)] space-y-3.5"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <p className="font-semibold text-sm sm:text-base text-[var(--ink)] leading-snug">
                  <span className="font-mono text-xs text-[var(--ink-subtle)] mr-1.5 tabular-nums">
                    0{idx + 1}
                  </span>
                  {oq.questionEn}
                </p>
                <button
                  type="button"
                  onClick={() =>
                    setOpenShowTrans((prev) => ({ ...prev, [oq.id]: !prev[oq.id] }))
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
                  {oq.questionEs}
                </p>
              )}

              <p className="text-xs text-[var(--brass)] font-medium flex items-start gap-1.5">
                <Lightbulb className="w-3.5 h-3.5 shrink-0 mt-0.5" aria-hidden="true" />
                <span>{oq.targetStructureHint}</span>
              </p>

              <div>
                <label htmlFor={textareaId} className="sr-only">
                  Respuesta en inglés para la pregunta {idx + 1}
                </label>
                <textarea
                  id={textareaId}
                  rows={3}
                  value={val}
                  onChange={(e) =>
                    setOpenInputs((prev) => ({ ...prev, [oq.id]: e.target.value }))
                  }
                  placeholder="Escribe tu respuesta completa en inglés aquí…"
                  className="input-field resize-y min-h-[92px]"
                  spellCheck={false}
                />
              </div>

              <button
                type="button"
                disabled={isLoading || !val.trim()}
                onClick={() => handleEvaluateOpenQuestion(oq, paragraphs, level)}
                className="btn btn-pine w-full sm:w-auto"
              >
                {isLoading ? (
                  <>
                    <RotateCcw className="w-4 h-4 animate-spin" aria-hidden="true" />
                    <span>Analizando errores…</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" aria-hidden="true" />
                    <span>Corregir mi respuesta escrita</span>
                  </>
                )}
              </button>

              {fb && (
                <div
                  aria-live="polite"
                  className="mt-3 p-4 sm:p-5 rounded-xl bg-[var(--surface)] border border-[var(--border)] space-y-4 text-xs sm:text-sm"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-[var(--border)]">
                    <span className="font-semibold text-[var(--pine)] flex items-center gap-1.5 tabular-nums">
                      <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>Corrección de tu respuesta · Nota: {fb.scoreOutOf10}/10</span>
                    </span>
                  </div>

                  <p className="text-[var(--ink)] leading-relaxed">{fb.feedbackEs}</p>

                  {fb.errorsFound.length > 0 && (
                    <div className="space-y-2">
                      <span className="text-xs font-semibold text-[var(--crimson)] block">
                        Errores detectados en tu frase
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="inset-well p-3.5 space-y-1">
                      <span className="text-xs font-semibold text-[var(--pine)] block">
                        Tu frase corregida
                      </span>
                      <p className="text-[var(--ink)] font-medium">{fb.correctedUserSentence}</p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[var(--brass-soft)] border border-[var(--brass-border)] space-y-1">
                      <span className="text-xs font-semibold text-[var(--brass)] block">
                        Versión de nivel B2 / modelo
                      </span>
                      <p className="text-[var(--ink)] font-medium">
                        {fb.b2UpgradeSentence || oq.sampleIdealAnswer}
                      </p>
                    </div>
                  </div>

                  {/* Repetición activa de fallos */}
                  {(() => {
                    const targetSentence = (
                      fb.correctedUserSentence || oq.sampleIdealAnswer
                    ).trim();
                    const hasMistakes =
                      (fb.errorsFound && fb.errorsFound.length > 0) ||
                      fb.scoreOutOf10 < 8 ||
                      normalizeSentence(val) !== normalizeSentence(targetSentence);
                    const repState = repetitionMap[oq.id];

                    if (!hasMistakes) {
                      return (
                        <div className="p-3.5 rounded-xl bg-[var(--pine-soft)] border border-[var(--pine-border)] flex items-center gap-2 text-xs sm:text-sm text-[var(--pine)] font-semibold">
                          <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden="true" />
                          <span>Respuesta impecable sin fallos. No necesitas repetir nada.</span>
                        </div>
                      );
                    }

                    return (
                      <div className="p-4 rounded-xl bg-[var(--brass-soft)] border border-[var(--brass-border)] space-y-3">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <RotateCcw className="w-4 h-4 text-[var(--brass)]" aria-hidden="true" />
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
                          Recuerda la corrección de arriba y escribe la frase completa sin errores <strong>2 veces seguidas de memoria</strong>.
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
                              Repetición de memoria para la respuesta corregida
                            </label>
                            <input
                              id={repInputId}
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
                              placeholder={`Repetición ${(repState?.repsCompleted || 0) + 1} de 2: escribe la frase de memoria…`}
                              className="input-field"
                            />

                            <button
                              type="button"
                              onClick={() => handleCheckRepetition(oq.id, targetSentence)}
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
                            <span>Fallo superado: estructura fijada tras 2 repeticiones exactas.</span>
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
        explanation:
          'Expresa una acción en progreso durante un tiempo ANTES de otro momento del pasado.'
      },
      {
        category: 'Tiempos Perfectos / Continuos',
        label: 'Past Perfect Simple (had + participio)',
        regex:
          /\bhad(n't|\s+not)?\s+(already\s+|just\s+|never\s+)?(tested|worked|seen|gone|been|done|made|taken|left|arrived|finished|checked|started|lost|found|bought|told|said)\b/gi,
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
        regex:
          /\b(called off|put off|turned down|come up with|bumped into|ran into|gave up|ended up|carried out|look forward to)\b/gi,
        explanation: 'Verbo compuesto indispensable para los exámenes B1 y B2.'
      },
      {
        category: 'Conectores B2',
        label: 'Conector de contraste / adición (Despite / Although / Furthermore)',
        regex:
          /\b(despite\s+(the\s+fact\s+that)?|in\s+spite\s+of|although|even\s+though|furthermore|moreover|nevertheless|on\s+the\s+contrary)\b/gi,
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
              baseSentence: gapped.slice(0, 200) + '…',
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
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Cabecera y selector segmentado unificado */}
      <section className="card p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5 min-w-0">
          <div className="w-11 h-11 rounded-xl bg-[var(--accent-soft)] border border-[var(--accent-border)] text-[var(--accent)] flex items-center justify-center shrink-0">
            <BookOpen className="w-5 h-5" aria-hidden="true" />
          </div>
          <div className="space-y-1 min-w-0">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-[var(--ink)] tracking-[-0.02em]">
              Lecturas, historias con IA y análisis de texto
            </h2>
            <p className="text-xs sm:text-sm text-[var(--ink-muted)] leading-relaxed">
              Lee relatos reales con rayos X gramaticales, crea lecturas a medida y practica preguntas escritas.
            </p>
          </div>
        </div>

        <div className="segmented w-full lg:w-auto shrink-0" role="tablist" aria-label="Modos de lectura">
          <button
            type="button"
            role="tab"
            aria-selected={subTab === 'stories'}
            onClick={() => setSubTab('stories')}
            className={`segmented-item tabular-nums ${
              subTab === 'stories' ? 'segmented-item-active' : ''
            }`}
          >
            <BookOpen className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Historias ({READING_STORIES.length})</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={subTab === 'ai_story_creator'}
            onClick={() => setSubTab('ai_story_creator')}
            className={`segmented-item ${
              subTab === 'ai_story_creator' ? 'segmented-item-active' : ''
            }`}
          >
            <Cpu className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Crear con IA</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={subTab === 'custom_analyzer'}
            onClick={() => setSubTab('custom_analyzer')}
            className={`segmented-item ${
              subTab === 'custom_analyzer' ? 'segmented-item-active' : ''
            }`}
          >
            <FileSearch className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Analizar texto</span>
          </button>
        </div>
      </section>

      {/* TAB A: AI STORY CREATOR + OPEN WRITTEN QUESTIONS */}
      {subTab === 'ai_story_creator' && (
        <div className="space-y-6">
          <form onSubmit={handleCreateAIStory} className="card p-5 sm:p-6 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[var(--border)]">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[var(--pine-soft)] border border-[var(--pine-border)] text-[var(--pine)] flex items-center justify-center shrink-0">
                  <Cpu className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-display text-base sm:text-lg font-bold text-[var(--ink)]">
                    Generador IA de historias con preguntas de escribir
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--ink-muted)] mt-0.5">
                    La IA redactará una historia de tu nivel con estructuras resaltadas y preguntas abiertas debajo.
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
                  <span>Ajustes IA / API Key</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label
                  htmlFor={aiLevelSelectId}
                  className="block text-xs font-semibold text-[var(--ink)]"
                >
                  Nivel de la historia
                </label>
                <select
                  id={aiLevelSelectId}
                  value={aiLevel}
                  onChange={(e) => setAiLevel(e.target.value as Level)}
                  className="input-field"
                >
                  <option value="A2+">A2+ (A2 Advanced)</option>
                  <option value="B1">B1 (Intermediate)</option>
                  <option value="B1+">B1+ (Intermediate Advanced)</option>
                  <option value="B2">B2 (Upper-Intermediate)</option>
                  <option value="B2+">B2+ (B2 Advanced)</option>
                </select>
              </div>

              <div className="sm:col-span-2 space-y-1.5">
                <label
                  htmlFor={aiTopicInputId}
                  className="block text-xs font-semibold text-[var(--ink)]"
                >
                  Temática o género (opcional)
                </label>
                <input
                  id={aiTopicInputId}
                  type="text"
                  value={aiTopic}
                  onChange={(e) => setAiTopic(e.target.value)}
                  placeholder="Ej: Un problema en un hotel de Londres, misterio, entrevista…"
                  className="input-field"
                />
              </div>
            </div>

            {aiStoryError && (
              <div
                role="alert"
                className="p-3.5 rounded-xl bg-[var(--crimson-soft)] border border-[var(--crimson-border)] text-[var(--crimson)] text-xs sm:text-sm flex items-center gap-2 font-medium"
              >
                <AlertTriangle className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>{aiStoryError}</span>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-3">
              <button type="submit" disabled={aiStoryLoading} className="btn btn-pine">
                {aiStoryLoading ? (
                  <>
                    <RotateCcw className="w-4 h-4 animate-spin" aria-hidden="true" />
                    <span>Escribiendo historia y preguntas…</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" aria-hidden="true" />
                    <span>Crear nueva historia ahora</span>
                  </>
                )}
              </button>

              {aiStoriesList.length > 1 && (
                <div className="flex flex-wrap gap-2">
                  {aiStoriesList.map((st) => (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => setAiActiveStory(st)}
                      className={`btn btn-sm ${
                        activeAiStory?.id === st.id ? 'btn-soft' : 'btn-secondary'
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
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <article className="lg:col-span-2 card p-5 sm:p-7 space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[var(--border)]">
                    <div className="space-y-1">
                      <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-md bg-[var(--pine-soft)] text-[var(--pine)] border border-[var(--pine-border)]">
                        Nivel {activeAiStory.level} · {activeAiStory.genre}
                      </span>
                      <h3 className="font-display text-lg sm:text-2xl font-bold text-[var(--ink)]">
                        {activeAiStory.title}
                      </h3>
                    </div>

                    <button
                      type="button"
                      onClick={() => setXrayActive(!xrayActive)}
                      aria-pressed={xrayActive}
                      className={`btn btn-sm ${xrayActive ? 'btn-soft' : 'btn-secondary'}`}
                    >
                      <Microscope className="w-4 h-4" aria-hidden="true" />
                      <span>{xrayActive ? 'Rayos X activo' : 'Activar Rayos X'}</span>
                    </button>
                  </div>

                  <div className="max-w-[65ch] space-y-4 text-[var(--ink)] text-base sm:text-[17px] leading-[1.8]">
                    {activeAiStory.paragraphs.map((p, idx) => (
                      <p key={idx}>
                        <span className="text-xs font-mono text-[var(--ink-subtle)] mr-2 select-none tabular-nums">
                          [P{idx + 1}]
                        </span>
                        {renderAnnotatedParagraph(p, activeAiStory.annotations)}
                      </p>
                    ))}
                  </div>
                </article>

                {/* Inspector de Estructuras (Historia IA) */}
                <aside className="card p-5 space-y-4">
                  <h4 className="font-display text-sm font-bold text-[var(--ink)] flex items-center gap-2">
                    <Microscope className="w-4 h-4 text-[var(--accent)]" aria-hidden="true" />
                    <span>Estructuras clave</span>
                  </h4>

                  {activeAnnotation ? (
                    <div className="inset-well p-4 space-y-2">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-[var(--surface)] text-[var(--accent)] border border-[var(--accent-border)] inline-block">
                        {activeAnnotation.label}
                      </span>
                      <p className="font-display text-base font-bold text-[var(--ink)]">
                        "{activeAnnotation.phrase}"
                      </p>
                      <p className="text-xs sm:text-sm text-[var(--ink-muted)] leading-relaxed">
                        {activeAnnotation.explanationEs}
                      </p>
                    </div>
                  ) : (
                    <div className="inset-well p-3.5 text-xs text-[var(--ink-muted)] leading-relaxed">
                      Pulsa cualquier expresión subrayada en el texto para ver su explicación.
                    </div>
                  )}

                  <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                    {activeAiStory.annotations.map((ann, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setActiveAnnotation(ann)}
                        className={`w-full text-left p-3 rounded-xl border text-xs transition-colors ${
                          activeAnnotation?.phrase === ann.phrase
                            ? 'bg-[var(--accent-soft)] border-[var(--accent-border)] text-[var(--ink)] font-semibold'
                            : 'bg-[var(--surface-2)]/60 border-[var(--border)] text-[var(--ink)] hover:border-[var(--border-strong)]'
                        }`}
                      >
                        <div className="font-semibold text-[var(--brass)]">"{ann.phrase}"</div>
                        <div className="text-[var(--ink-muted)] mt-0.5">{ann.label}</div>
                      </button>
                    ))}
                  </div>
                </aside>
              </div>

              {renderVocabularyExplorationBox(
                activeAiStory.annotations,
                activeAiStory.paragraphs
              )}

              {renderOpenWritingQuestionsBlock(
                activeAiStory.openQuestions,
                activeAiStory.paragraphs,
                activeAiStory.level
              )}
            </div>
          )}
        </div>
      )}

      {/* TAB B: CURATED STORIES */}
      {subTab === 'stories' && (
        <div className="space-y-6">
          {/* Selector de relatos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
            {READING_STORIES.map((story) => {
              const isSelected = story.id === currentStory.id;
              const isDone = completedStories.includes(story.id);
              return (
                <button
                  key={story.id}
                  type="button"
                  onClick={() => handleSelectStory(story.id)}
                  aria-current={isSelected ? 'true' : undefined}
                  className={`text-left p-3.5 rounded-2xl border flex flex-col justify-between gap-2 transition-colors min-h-[88px] ${
                    isSelected
                      ? 'bg-[var(--accent-soft)] border-[var(--accent)] text-[var(--ink)]'
                      : 'card-interactive text-[var(--ink)]'
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-md bg-[var(--surface)] text-[var(--accent)] border border-[var(--accent-border)]">
                        {story.level}
                      </span>
                      {isDone && (
                        <CheckCircle2
                          className="w-4 h-4 text-[var(--pine)] shrink-0"
                          aria-label="Completada"
                        />
                      )}
                    </div>
                    <h3 className="font-display font-bold text-sm text-[var(--ink)] line-clamp-2 leading-snug">
                      {story.title}
                    </h3>
                  </div>
                  <p className="text-xs text-[var(--ink-muted)]">{story.genre}</p>
                </button>
              );
            })}
          </div>

          {/* Lectura principal + destripador lateral */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <article className="lg:col-span-2 card p-5 sm:p-7 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[var(--border)]">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--ink-muted)]">
                    <span className="font-mono font-semibold px-2 py-0.5 rounded-md bg-[var(--accent-soft)] text-[var(--accent)] border border-[var(--accent-border)]">
                      Nivel {currentStory.level}
                    </span>
                    <span>{currentStory.genre}</span>
                    <span className="tabular-nums">· {currentStory.readingTimeMin} min lectura</span>
                  </div>
                  <h3 className="font-display text-lg sm:text-2xl font-bold text-[var(--ink)]">
                    {currentStory.title}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setXrayActive(!xrayActive)}
                  aria-pressed={xrayActive}
                  className={`btn btn-sm ${xrayActive ? 'btn-soft' : 'btn-secondary'}`}
                >
                  <Microscope className="w-4 h-4" aria-hidden="true" />
                  <span>{xrayActive ? 'Rayos X activo' : 'Activar Rayos X'}</span>
                </button>
              </div>

              <div className="max-w-[65ch] space-y-4 text-[var(--ink)] text-base sm:text-[17px] leading-[1.8]">
                {currentStory.paragraphs.map((p, idx) => (
                  <p key={idx}>
                    <span className="text-xs font-mono text-[var(--ink-subtle)] mr-2 select-none tabular-nums">
                      [P{idx + 1}]
                    </span>
                    {renderAnnotatedParagraph(p, currentStory.annotations)}
                  </p>
                ))}
              </div>
            </article>

            {/* Destripador gramatical lateral */}
            <aside className="card p-5 space-y-4">
              <h4 className="font-display text-sm font-bold text-[var(--ink)] flex items-center gap-2">
                <Microscope className="w-4 h-4 text-[var(--accent)]" aria-hidden="true" />
                <span>Destripador gramatical</span>
              </h4>

              {activeAnnotation ? (
                <div className="inset-well p-4 space-y-2">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-[var(--surface)] text-[var(--accent)] border border-[var(--accent-border)] inline-block">
                    {activeAnnotation.label}
                  </span>
                  <p className="font-display text-base font-bold text-[var(--ink)]">
                    "{activeAnnotation.phrase}"
                  </p>
                  <p className="text-xs sm:text-sm text-[var(--ink-muted)] leading-relaxed">
                    {activeAnnotation.explanationEs}
                  </p>
                </div>
              ) : (
                <div className="inset-well p-3.5 text-xs text-[var(--ink-muted)] leading-relaxed">
                  Pulsa sobre cualquier expresión resaltada en el texto para ver por qué el autor usó esa estructura.
                </div>
              )}

              <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                {currentStory.annotations.map((ann, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveAnnotation(ann)}
                    className={`w-full text-left p-3 rounded-xl border text-xs transition-colors ${
                      activeAnnotation?.phrase === ann.phrase
                        ? 'bg-[var(--accent-soft)] border-[var(--accent-border)] text-[var(--ink)] font-semibold'
                        : 'bg-[var(--surface-2)]/60 border-[var(--border)] text-[var(--ink)] hover:border-[var(--border-strong)]'
                    }`}
                  >
                    <div className="font-semibold text-[var(--brass)]">"{ann.phrase}"</div>
                    <div className="text-[var(--ink-muted)] mt-0.5">{ann.label}</div>
                  </button>
                ))}
              </div>
            </aside>
          </div>

          {renderVocabularyExplorationBox(currentStory.annotations, currentStory.paragraphs)}

          {BUILTIN_OPEN_QUESTIONS[currentStory.id] &&
            renderOpenWritingQuestionsBlock(
              BUILTIN_OPEN_QUESTIONS[currentStory.id],
              currentStory.paragraphs,
              currentStory.level
            )}

          {/* Análisis gramatical y transformaciones del texto */}
          <section className="card p-5 sm:p-6 space-y-5">
            <div className="pb-3 border-b border-[var(--border)]">
              <h3 className="font-display text-base sm:text-lg font-bold text-[var(--ink)] flex items-center gap-2 tabular-nums">
                <Sparkles className="w-4 h-4 text-[var(--brass)] shrink-0" aria-hidden="true" />
                <span>
                  Análisis gramatical y transformaciones ({currentStory.questions.length})
                </span>
              </h3>
            </div>

            <div className="space-y-4">
              {currentStory.questions.map((q, idx) => {
                const userAns = answers[q.id] || '';
                const isChecked = !!checked[q.id];
                const isRight = isChecked && checkAnswerMatch(userAns, q.acceptedAnswers);
                const qInputId = `reading-gram-q-${q.id}`;

                return (
                  <article
                    key={q.id}
                    className="p-4 sm:p-5 rounded-xl bg-[var(--surface-2)]/60 border border-[var(--border)] space-y-3"
                  >
                    <p className="font-semibold text-sm sm:text-base text-[var(--ink)]">
                      <span className="font-mono text-xs text-[var(--ink-subtle)] mr-1.5 tabular-nums">
                        0{idx + 1}
                      </span>
                      {q.question}
                    </p>

                    {q.quoteFromText && (
                      <p className="text-xs sm:text-sm italic text-[var(--accent)] bg-[var(--accent-soft)] px-3.5 py-2.5 rounded-xl border border-[var(--accent-border)]">
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
                              className={`w-full text-left px-4 py-3 rounded-xl text-xs sm:text-sm font-medium border transition-colors min-h-[44px] ${
                                selected
                                  ? isRight
                                    ? 'bg-[var(--pine-soft)] border-[var(--pine)] text-[var(--pine)] font-semibold'
                                    : 'bg-[var(--crimson-soft)] border-[var(--crimson)] text-[var(--crimson)] font-semibold'
                                  : 'bg-[var(--surface)] border-[var(--border)] text-[var(--ink)] hover:border-[var(--border-strong)]'
                              }`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="flex flex-col sm:flex-row gap-2">
                        <label htmlFor={qInputId} className="sr-only">
                          Respuesta para la pregunta {idx + 1}
                        </label>
                        <input
                          id={qInputId}
                          type="text"
                          value={userAns}
                          onChange={(e) =>
                            setAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))
                          }
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleCheckStoryQuestion(q.id);
                            }
                          }}
                          placeholder="Escribe tu respuesta aquí…"
                          className="input-field flex-1"
                        />
                        <button
                          type="button"
                          onClick={() => handleCheckStoryQuestion(q.id)}
                          disabled={!userAns.trim()}
                          className="btn btn-primary shrink-0"
                        >
                          Comprobar
                        </button>
                      </div>
                    )}

                    {isChecked && (
                      <div
                        aria-live="polite"
                        className={`p-3.5 rounded-xl border text-xs sm:text-sm space-y-1 ${
                          isRight
                            ? 'bg-[var(--pine-soft)] border-[var(--pine-border)] text-[var(--ink)]'
                            : 'bg-[var(--crimson-soft)] border-[var(--crimson-border)] text-[var(--ink)]'
                        }`}
                      >
                        <div className="flex items-center gap-2 font-semibold">
                          {isRight ? (
                            <>
                              <CheckCircle2
                                className="w-4 h-4 text-[var(--pine)] shrink-0"
                                aria-hidden="true"
                              />
                              <span className="text-[var(--pine)]">Análisis correcto.</span>
                            </>
                          ) : (
                            <>
                              <XCircle
                                className="w-4 h-4 text-[var(--crimson)] shrink-0"
                                aria-hidden="true"
                              />
                              <span className="text-[var(--crimson)]">
                                Respuesta esperada: {q.acceptedAnswers.join(' / ')}
                              </span>
                            </>
                          )}
                        </div>
                        <p className="text-[var(--ink-muted)] leading-relaxed">{q.explanation}</p>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </section>
        </div>
      )}

      {/* TAB C: CUSTOM TEXT ANALYZER */}
      {subTab === 'custom_analyzer' && (
        <div className="space-y-6">
          <section className="card p-5 sm:p-6 space-y-4">
            <div className="space-y-1">
              <label
                htmlFor={customTextareaId}
                className="font-display text-base sm:text-lg font-bold text-[var(--ink)] flex items-center gap-2"
              >
                <FileSearch className="w-4 h-4 text-[var(--accent)] shrink-0" aria-hidden="true" />
                <span>Pega cualquier texto en inglés para analizar su gramática</span>
              </label>
              <p className="text-xs sm:text-sm text-[var(--ink-muted)]">
                Detecta tiempos perfectos, condicionales, phrasal verbs y conectores de nivel B2 para convertirlos en práctica.
              </p>
            </div>

            <textarea
              id={customTextareaId}
              rows={5}
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder="Pega aquí cualquier fragmento de libro, artículo o guion en inglés…"
              className="input-field resize-y min-h-[130px]"
            />

            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-[var(--ink-muted)] tabular-nums">
                Estructuras detectadas en tu texto:{' '}
                <strong className="text-[var(--ink)]">{customAnalysis.findings.length}</strong>
              </span>
              <button
                type="button"
                onClick={() => {
                  setCustomExercises(customAnalysis.generatedEx);
                  setCustomExIdx(0);
                }}
                disabled={customAnalysis.generatedEx.length === 0}
                className="btn btn-primary tabular-nums"
              >
                <Dumbbell className="w-4 h-4" aria-hidden="true" />
                <span>
                  Generar {customAnalysis.generatedEx.length} ejercicios de este texto
                </span>
              </button>
            </div>

            {customAnalysis.findings.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                {customAnalysis.findings.map((f, i) => (
                  <div
                    key={i}
                    className="inset-well p-4 text-xs sm:text-sm space-y-1.5"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-semibold text-[var(--brass)]">"{f.match}"</span>
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-[var(--surface)] text-[var(--accent)] border border-[var(--accent-border)]">
                        {f.category}
                      </span>
                    </div>
                    <p className="text-[var(--ink)] font-semibold text-xs">{f.label}</p>
                    <p className="text-[var(--ink-muted)] text-xs leading-relaxed">
                      {f.explanation}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>

          {customExercises.length > 0 && (
            <div>
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
