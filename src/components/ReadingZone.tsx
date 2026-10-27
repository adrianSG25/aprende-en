import React, { useState } from 'react';
import { ReadingStory, StoryAnnotation, Exercise, Level } from '../types';
import { READING_STORIES } from '../data/readingData';
import { checkAnswerMatch } from '../data/infiniteGenerator';
import { analyzeWritingLocally } from '../data/writingData';
import {
  generateAIStoryWithOpenQuestions,
  evaluateStoryOpenAnswerWithAI,
  AIGeneratedStory,
  AIStoryOpenQuestion,
  OpenAnswerFeedback
} from '../services/aiService';
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
  Languages
} from 'lucide-react';

interface ReadingZoneProps {
  completedStories: string[];
  onMarkStoryComplete: (storyId: string) => void;
  onExerciseAttempt: (exercise: Exercise, isCorrect: boolean, forceAddToVault?: boolean) => void;
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
      questionEn: 'What astonished the glaciologists as soon as they analysed the first ice core samples from Lake Vostok?',
      questionEs: '¿Qué asombró a los glaciólogos nada más analizar las primeras muestras de hielo del lago Vostok?',
      targetStructureHint: 'Intenta usar una estructura de nivel B2+ como "No sooner had they..." o "Little did they suspect...".',
      sampleIdealAnswer: 'No sooner had they analysed the samples than they discovered microscopic organisms thriving in total darkness.'
    },
    {
      id: 'boq-b2p-2',
      questionEn: 'Why is this Antarctic discovery considered so important for future space exploration?',
      questionEs: '¿Por qué se considera tan importante este descubrimiento antártico para la futura exploración espacial?',
      targetStructureHint: 'Usa "Not only has it..., but..." o pasiva impersonal ("It is believed that...").',
      sampleIdealAnswer: 'Not only has it changed our view of life on Earth, but it also suggests that life could exist beneath the ice of Jupiter\'s moon Europa.'
    }
  ]
};

export const ReadingZone: React.FC<ReadingZoneProps> = ({
  completedStories,
  onMarkStoryComplete,
  onExerciseAttempt
}) => {
  const [subTab, setSubTab] = useState<'stories' | 'ai_story_creator' | 'custom_analyzer'>('stories');
  const [selectedStoryId, setSelectedStoryId] = useState<string>(READING_STORIES[0].id);
  const [xrayActive, setXrayActive] = useState<boolean>(true);
  const [activeAnnotation, setActiveAnnotation] = useState<StoryAnnotation | null>(null);

  // Respuestas a ejercicios estructurados
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  // Respuestas abiertas (de escribir frases completas) para cualquier historia
  const [openInputs, setOpenInputs] = useState<Record<string, string>>({});
  const [openShowTrans, setOpenShowTrans] = useState<Record<string, boolean>>({});
  const [openFeedbacks, setOpenFeedbacks] = useState<Record<string, OpenAnswerFeedback>>({});
  const [openLoadingId, setOpenLoadingId] = useState<string | null>(null);

  // Estado del Generador de Historias con IA
  const [aiLevel, setAiLevel] = useState<Level>('B1+');
  const [aiTopic, setAiTopic] = useState<string>('');
  const [aiStoryLoading, setAiStoryLoading] = useState<boolean>(false);
  const [aiStoryError, setAiStoryError] = useState<string | null>(null);
  const [aiStoriesList, setAiStoriesList] = useState<AIGeneratedStory[]>([]);
  const [activeAiStory, setAiActiveStory] = useState<AIGeneratedStory | null>(null);

  // Custom Text Analyzer state
  const [customText, setCustomText] = useState<string>(
    'Although the team had been working on the prototype for months, they had to put off the launch when they ran into an unexpected software bug. If they had tested the system earlier, they wouldn\'t have wasted so much time. Nevertheless, the engineers came up with a brilliant fix, and the product is now believed to be the fastest on the market.'
  );
  const [customExercises, setCustomExercises] = useState<Exercise[]>([]);
  const [customExIdx, setCustomExIdx] = useState(0);

  const currentStory: ReadingStory =
    READING_STORIES.find((s) => s.id === selectedStoryId) || READING_STORIES[0];

  const handleSelectStory = (id: string) => {
    setSelectedStoryId(id);
    setActiveAnnotation(null);
    setAnswers({});
    setChecked({});
  };

  const handleCheckStoryQuestion = (qId: string, val?: string) => {
    if (val !== undefined) {
      setAnswers((prev) => ({ ...prev, [qId]: val }));
    }
    setChecked((prev) => ({ ...prev, [qId]: true }));

    const totalQ = currentStory.questions.length;
    const answeredCount = Object.keys({ ...checked, [qId]: true }).length;
    if (answeredCount >= totalQ) {
      onMarkStoryComplete(currentStory.id);
    }
  };

  // Evaluar respuesta escrita abierta (con IA o con corrector local si no hay clave IA)
  const handleEvaluateOpenQuestion = async (
    q: AIStoryOpenQuestion,
    paragraphs: string[],
    level: Level
  ) => {
    const userText = (openInputs[q.id] || '').trim();
    if (!userText) return;

    setOpenLoadingId(q.id);
    try {
      const aiRes = await evaluateStoryOpenAnswerWithAI(
        paragraphs,
        q.questionEn,
        userText,
        level
      );
      setOpenFeedbacks((prev) => ({ ...prev, [q.id]: aiRes }));
    } catch {
      // Fallback al motor gramatical local si no tiene IA o falla la red
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
    } finally {
      setOpenLoadingId(null);
    }
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
        grammar: 'bg-indigo-500/25 text-indigo-200 border-b-2 border-indigo-400 hover:bg-indigo-500/40',
        phrasal_verb: 'bg-amber-500/25 text-amber-200 border-b-2 border-amber-400 hover:bg-amber-500/40',
        connector: 'bg-emerald-500/25 text-emerald-200 border-b-2 border-emerald-400 hover:bg-emerald-500/40',
        vocab: 'bg-purple-500/25 text-purple-200 border-b-2 border-purple-400 hover:bg-purple-500/40'
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

  // Bloque reutilizable para renderizar las Preguntas Abiertas de Escribir debajo de cualquier historia
  const renderOpenWritingQuestionsBlock = (
    questions: AIStoryOpenQuestion[],
    paragraphs: string[],
    level: Level
  ) => (
    <div className="bg-slate-900 border border-indigo-500/40 rounded-2xl p-6 space-y-5">
      <div>
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <PenTool className="w-5 h-5 text-emerald-400" />
          Preguntas Abiertas sobre la Historia (Escribe con tus propias palabras)
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Aquí no es rellenar huecos: escribe tu respuesta completa en inglés y el corrector te señalará cada fallo gramatical y cómo mejorarlo a nivel B2.
        </p>
      </div>

      <div className="space-y-5">
        {questions.map((oq, idx) => {
          const val = openInputs[oq.id] || '';
          const fb = openFeedbacks[oq.id];
          const isLoading = openLoadingId === oq.id;
          const showTrans = !!openShowTrans[oq.id];

          return (
            <div
              key={oq.id}
              className="bg-slate-950/90 border border-slate-800 rounded-2xl p-5 space-y-3.5"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <p className="font-bold text-base text-white">
                  {idx + 1}. {oq.questionEn}
                </p>
                <button
                  type="button"
                  onClick={() =>
                    setOpenShowTrans((prev) => ({ ...prev, [oq.id]: !prev[oq.id] }))
                  }
                  className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  <Languages className="w-3.5 h-3.5" />
                  {showTrans ? 'Ocultar traducción' : 'Traducir pregunta'}
                </button>
              </div>

              {showTrans && (
                <p className="text-xs sm:text-sm text-indigo-200 bg-indigo-950/30 border border-indigo-500/20 rounded-xl px-3.5 py-2">
                  🌐 {oq.questionEs}
                </p>
              )}

              <p className="text-xs text-amber-300/90 font-medium">
                💡 {oq.targetStructureHint}
              </p>

              <textarea
                rows={3}
                value={val}
                onChange={(e) =>
                  setOpenInputs((prev) => ({ ...prev, [oq.id]: e.target.value }))
                }
                placeholder="Escribe tu respuesta completa en inglés aquí..."
                className="w-full bg-slate-900 border border-slate-700 focus:border-indigo-500 rounded-xl p-3.5 text-sm sm:text-base text-white outline-none"
                spellCheck={false}
              />

              <div className="flex items-center justify-between gap-2">
                <button
                  type="button"
                  disabled={isLoading || !val.trim()}
                  onClick={() => handleEvaluateOpenQuestion(oq, paragraphs, level)}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-emerald-600/20 flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  {isLoading ? 'Analizando tus errores...' : 'Corregir mi respuesta escrita'}
                </button>
              </div>

              {fb && (
                <div className="mt-3 p-4 rounded-xl bg-slate-900 border border-emerald-500/30 space-y-3 text-xs sm:text-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-300">
                      ✅ Corrección de tu respuesta (Nota: {fb.scoreOutOf10}/10)
                    </span>
                  </div>

                  <p className="text-slate-200 leading-relaxed">{fb.feedbackEs}</p>

                  {fb.errorsFound.length > 0 && (
                    <div className="space-y-2">
                      <span className="text-xs font-bold uppercase text-rose-300 block">
                        Errores detectados en tu frase:
                      </span>
                      {fb.errorsFound.map((err, i) => (
                        <div
                          key={i}
                          className="bg-slate-950 border border-rose-500/30 rounded-lg p-3 space-y-1"
                        >
                          <p className="text-rose-300 line-through">❌ {err.wrong}</p>
                          <p className="text-emerald-300 font-bold">✅ {err.right}</p>
                          <p className="text-slate-400 text-xs">{err.whyEs}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                    <div className="bg-slate-950 border border-slate-800 rounded-xl p-3">
                      <span className="text-[11px] uppercase font-bold text-emerald-400 block mb-1">
                        Tu frase corregida:
                      </span>
                      <p className="text-white font-semibold">{fb.correctedUserSentence}</p>
                    </div>
                    <div className="bg-slate-950 border border-slate-800 rounded-xl p-3">
                      <span className="text-[11px] uppercase font-bold text-amber-300 block mb-1">
                        Versión de Nivel B2 / Modelo:
                      </span>
                      <p className="text-amber-100 font-semibold">
                        {fb.b2UpgradeSentence || oq.sampleIdealAnswer}
                      </p>
                    </div>
                  </div>
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
        category: 'Voz Pasiva y Reportaje',
        label: 'Pasiva Impersonal / Personal (is believed/said/thought to...)',
        regex: /\b(is|are|was|were)\s+(believed|thought|said|reported|considered|expected|known)\s+to\b/gi,
        explanation: 'Estructura formal de pasiva personal de nivel B2 / B2+.'
      },
      {
        category: 'Phrasal Verbs Detectados',
        label: 'Phrasal Verb en contexto',
        regex: /\b(put off|put up with|come up with|came up with|ran into|run into|ran out of|run out of|look forward to|cut down on|do away with|figure out|figured out|turned down|turn down|broke down|break down|set off|carried on|carry on|get away with|got away with|brush up on|fell through)\b/gi,
        explanation: 'Phrasal verb clave de nivel B1-B2+.'
      },
      {
        category: 'Conectores B1-B2+',
        label: 'Linker / Conector Discursivo',
        regex: /\b(although|even though|despite|in spite of|nevertheless|nonetheless|furthermore|moreover|whereas|however|consequently|therefore|unless|as long as|provided that)\b/gi,
        explanation: 'Conector de contraste, adición o condición que estructura el texto.'
      }
    ];

    const findings: { match: string; label: string; category: string; explanation: string }[] = [];
    const generatedEx: Exercise[] = [];

    patterns.forEach((p, idx) => {
      const matches = customText.match(p.regex);
      if (matches) {
        Array.from(new Set(matches)).forEach((m, mIdx) => {
          findings.push({
            match: m,
            label: p.label,
            category: p.category,
            explanation: p.explanation
          });

          const sentences = customText.split(/(?<=[.!?])\s+/);
          const parentSentence = sentences.find((s) => s.toLowerCase().includes(m.toLowerCase()));
          if (parentSentence) {
            const gapped = parentSentence.replace(new RegExp(m, 'i'), '___');
            generatedEx.push({
              id: `cust-txt-ex-${idx}-${mIdx}-${Date.now()}`,
              level: 'B2',
              category: 'grammar',
              topicLabel: p.label,
              type: 'cloze',
              prompt: `Completa la estructura (${p.label}) extraída de tu propio texto:`,
              baseSentence: gapped,
              spanishHint: `Pista gramatical: ${p.explanation}`,
              acceptedAnswers: [m],
              explanation: `En el texto original se usó "${m}" (${p.label}): ${p.explanation}`,
              grammarRule: p.label
            });
          }
        });
      }
    });

    return { findings, generatedEx };
  };

  const customAnalysis = analyzeCustomText();

  return (
    <div className="space-y-6">
      {/* Header & Mode Tabs */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-sky-400" />
            Zona de Historias, Generador de Textos IA y Preguntas de Escribir
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Lee historias o genera historias nuevas con IA y responde debajo escribiendo con tus propias palabras para que te corrija los errores.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setSubTab('ai_story_creator')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer ${
              subTab === 'ai_story_creator'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/25'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Cpu className="w-4 h-4" />
            ✨ Crear Historia con IA + Preguntas de Escribir
          </button>

          <button
            type="button"
            onClick={() => setSubTab('stories')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer ${
              subTab === 'stories'
                ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/20'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Historias Base ({READING_STORIES.length})
          </button>

          <button
            type="button"
            onClick={() => setSubTab('custom_analyzer')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer ${
              subTab === 'custom_analyzer'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <FileSearch className="w-4 h-4" />
            Analizar Mi Propio Texto
          </button>
        </div>
      </div>

      {/* TAB A: AI STORY CREATOR + OPEN WRITTEN QUESTIONS */}
      {subTab === 'ai_story_creator' && (
        <div className="space-y-6">
          <form
            onSubmit={handleCreateAIStory}
            className="bg-slate-900 border border-emerald-500/30 rounded-2xl p-6 space-y-4"
          >
            <div className="flex items-center gap-2.5">
              <Cpu className="w-6 h-6 text-emerald-400" />
              <div>
                <h3 className="text-lg font-bold text-white">
                  Generador IA de Historias con Preguntas Abiertas de Escribir
                </h3>
                <p className="text-xs sm:text-sm text-slate-400">
                  La IA escribirá una historia del nivel que elijas con estructuras clave resaltadas y 4 preguntas abiertas debajo para que respondas escribiendo frases completas.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">
                  Nivel de la Historia
                </label>
                <select
                  value={aiLevel}
                  onChange={(e) => setAiLevel(e.target.value as Level)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white text-sm"
                >
                  <option value="A2+">A2+ (A2 Advanced)</option>
                  <option value="B1">B1 (Intermediate)</option>
                  <option value="B1+">B1+ (Intermediate Advanced)</option>
                  <option value="B2">B2 (Upper-Intermediate)</option>
                  <option value="B2+">B2+ (B2 Advanced)</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">
                  Temática o Género de la Historia (Opcional)
                </label>
                <input
                  type="text"
                  value={aiTopic}
                  onChange={(e) => setAiTopic(e.target.value)}
                  placeholder="Ej: Un problema en un hotel en Londres, un misterio policíaco, una entrevista de trabajo que sale mal..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {aiStoryError && (
              <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-200 text-xs sm:text-sm flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{aiStoryError}</span>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="submit"
                disabled={aiStoryLoading}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/25 flex items-center gap-2 cursor-pointer"
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
                          ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200'
                          : 'bg-slate-800 border-slate-700 text-slate-300'
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
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
                    <div>
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                        Nivel {activeAiStory.level} • {activeAiStory.genre}
                      </span>
                      <h3 className="text-xl font-extrabold text-white mt-1">
                        {activeAiStory.title}
                      </h3>
                    </div>

                    <button
                      type="button"
                      onClick={() => setXrayActive(!xrayActive)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 border cursor-pointer ${
                        xrayActive
                          ? 'bg-indigo-600/30 border-indigo-400 text-indigo-200'
                          : 'bg-slate-800 border-slate-700 text-slate-300'
                      }`}
                    >
                      <Microscope className="w-4 h-4" />
                      {xrayActive ? 'Rayos X: ACTIVADO' : 'Activar Rayos X'}
                    </button>
                  </div>

                  <div className="space-y-4 text-slate-100 text-base sm:text-lg leading-relaxed">
                    {activeAiStory.paragraphs.map((p, idx) => (
                      <p key={idx} className="leading-8">
                        <span className="text-xs font-mono text-slate-500 mr-2 select-none">
                          [P{idx + 1}]
                        </span>
                        {renderAnnotatedParagraph(p, activeAiStory.annotations)}
                      </p>
                    ))}
                  </div>
                </div>

                {/* X-Ray Sidebar for AI Story */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-indigo-300 flex items-center gap-2">
                    <Microscope className="w-4 h-4" />
                    Estructuras Clave de la Historia
                  </h4>

                  {activeAnnotation ? (
                    <div className="bg-slate-950 border border-indigo-500/40 rounded-xl p-4 space-y-2">
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
                        {activeAnnotation.label}
                      </span>
                      <p className="text-base font-extrabold text-white">
                        "{activeAnnotation.phrase}"
                      </p>
                      <p className="text-sm text-slate-300">{activeAnnotation.explanationEs}</p>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400">
                      Pulsa cualquier expresión subrayada en el texto para ver su explicación gramatical.
                    </p>
                  )}

                  <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                    {activeAiStory.annotations.map((ann, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setActiveAnnotation(ann)}
                        className="w-full text-left p-2.5 rounded-xl border border-slate-800 bg-slate-950/60 hover:bg-slate-800/50 text-xs cursor-pointer"
                      >
                        <div className="font-bold text-amber-300">"{ann.phrase}"</div>
                        <div className="text-slate-400 mt-0.5">{ann.label}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

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
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {READING_STORIES.map((story) => {
              const isSelected = story.id === currentStory.id;
              const isDone = completedStories.includes(story.id);
              return (
                <button
                  key={story.id}
                  type="button"
                  onClick={() => handleSelectStory(story.id)}
                  className={`text-left p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                    isSelected
                      ? 'bg-sky-950/50 border-sky-500 text-white shadow-lg shadow-sky-500/10'
                      : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-1.5">
                      <span className="text-xs font-extrabold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
                        Nivel {story.level}
                      </span>
                      {isDone && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                    </div>
                    <h3 className="font-bold text-sm text-white line-clamp-2">
                      {story.title}
                    </h3>
                  </div>
                  <p className="text-[11px] text-slate-400">{story.genre}</p>
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-sky-500/20 text-sky-300">
                      Nivel {currentStory.level}
                    </span>
                    <span className="text-xs text-slate-400">
                      • {currentStory.genre} • {currentStory.readingTimeMin} min lectura
                    </span>
                  </div>
                  <h3 className="text-xl font-extrabold text-white mt-1">
                    {currentStory.title}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setXrayActive(!xrayActive)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 border transition-all cursor-pointer ${
                    xrayActive
                      ? 'bg-indigo-600/30 border-indigo-400 text-indigo-200'
                      : 'bg-slate-800 border-slate-700 text-slate-300'
                  }`}
                >
                  <Microscope className="w-4 h-4" />
                  {xrayActive ? 'Rayos X Gramatical: ACTIVADO' : 'Activar Rayos X Gramatical'}
                </button>
              </div>

              <div className="space-y-4 text-slate-100 text-base sm:text-lg leading-relaxed font-normal">
                {currentStory.paragraphs.map((p, idx) => (
                  <p key={idx} className="leading-8">
                    <span className="text-xs font-mono text-slate-500 mr-2 select-none">
                      [P{idx + 1}]
                    </span>
                    {renderAnnotatedParagraph(p, currentStory.annotations)}
                  </p>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between gap-4">
              <div className="space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-wider text-indigo-300 flex items-center gap-2">
                  <Microscope className="w-4 h-4" />
                  Destripador Gramatical del Texto
                </h4>

                {activeAnnotation ? (
                  <div className="bg-slate-950 border border-indigo-500/40 rounded-xl p-4 space-y-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
                      {activeAnnotation.label}
                    </span>
                    <p className="text-base font-extrabold text-white">
                      "{activeAnnotation.phrase}"
                    </p>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {activeAnnotation.explanationEs}
                    </p>
                  </div>
                ) : (
                  <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 text-xs sm:text-sm text-slate-400">
                    👆 Pulsa sobre cualquiera de las palabras resaltadas en la historia para ver por qué el autor usó ese tiempo verbal, conector o phrasal verb.
                  </div>
                )}

                <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                  {currentStory.annotations.map((ann, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActiveAnnotation(ann)}
                      className={`w-full text-left p-2.5 rounded-xl border text-xs transition-all cursor-pointer ${
                        activeAnnotation?.phrase === ann.phrase
                          ? 'bg-indigo-950/60 border-indigo-500/60 text-white'
                          : 'bg-slate-950/50 border-slate-800/80 text-slate-300 hover:bg-slate-800/50'
                      }`}
                    >
                      <div className="font-bold text-amber-300">"{ann.phrase}"</div>
                      <div className="text-slate-400 mt-0.5">{ann.label}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 1. Open Writing Questions for Built-in Story */}
          {BUILTIN_OPEN_QUESTIONS[currentStory.id] &&
            renderOpenWritingQuestionsBlock(
              BUILTIN_OPEN_QUESTIONS[currentStory.id],
              currentStory.paragraphs,
              currentStory.level
            )}

          {/* 2. Grammar Analysis & Transformations of the Text */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                Análisis Gramatical y Transformaciones del Texto ({currentStory.questions.length})
              </h3>
            </div>

            <div className="space-y-4">
              {currentStory.questions.map((q, idx) => {
                const userAns = answers[q.id] || '';
                const isChecked = !!checked[q.id];
                const isRight = isChecked && checkAnswerMatch(userAns, q.acceptedAnswers);

                return (
                  <div
                    key={q.id}
                    className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 sm:p-5 space-y-3"
                  >
                    <p className="font-bold text-sm sm:text-base text-white">
                      {idx + 1}. {q.question}
                    </p>

                    {q.quoteFromText && (
                      <p className="text-xs sm:text-sm italic text-indigo-300 bg-indigo-950/30 px-3 py-2 rounded-lg border border-indigo-500/20">
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
                                    ? 'bg-emerald-950/50 border-emerald-500 text-emerald-200'
                                    : 'bg-rose-950/50 border-rose-500 text-rose-200'
                                  : 'bg-slate-900 border-slate-800 text-slate-200 hover:border-slate-700'
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
                          className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white outline-none focus:border-indigo-500"
                        />
                        <button
                          type="button"
                          onClick={() => handleCheckStoryQuestion(q.id)}
                          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold rounded-xl cursor-pointer"
                        >
                          Comprobar
                        </button>
                      </div>
                    )}

                    {isChecked && (
                      <div
                        className={`p-3.5 rounded-xl border text-xs sm:text-sm ${
                          isRight
                            ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                            : 'bg-rose-950/30 border-rose-500/40 text-rose-200'
                        }`}
                      >
                        <div className="flex items-center gap-2 font-bold mb-1">
                          {isRight ? (
                            <>
                              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                              ¡Análisis correcto!
                            </>
                          ) : (
                            <>
                              <XCircle className="w-4 h-4 text-rose-400" />
                              Respuesta esperada: {q.acceptedAnswers.join(' / ')}
                            </>
                          )}
                        </div>
                        <p className="text-slate-300">{q.explanation}</p>
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
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <FileSearch className="w-5 h-5 text-purple-400" />
              Pega cualquier texto o historia en inglés para destripar su gramática
            </h3>
            <textarea
              rows={5}
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder="Pega aquí cualquier texto en inglés..."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-sm sm:text-base text-white outline-none focus:border-purple-500"
            />

            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-slate-400">
                Estructuras detectadas en tu texto: <strong>{customAnalysis.findings.length}</strong>
              </span>
              <button
                type="button"
                onClick={() => {
                  setCustomExercises(customAnalysis.generatedEx);
                  setCustomExIdx(0);
                }}
                disabled={customAnalysis.generatedEx.length === 0}
                className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center gap-2 cursor-pointer"
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
                    className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs sm:text-sm space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-amber-300">"{f.match}"</span>
                      <span className="text-[11px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">
                        {f.category}
                      </span>
                    </div>
                    <p className="text-white font-semibold text-xs">{f.label}</p>
                    <p className="text-slate-400 text-xs">{f.explanation}</p>
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
                indexLabel={`Ejercicio de tu texto ${(customExIdx % customExercises.length) + 1} / ${customExercises.length}`}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
