import React, { useState } from 'react';
import { ReadingStory, StoryAnnotation, Exercise } from '../types';
import { READING_STORIES } from '../data/readingData';
import { checkAnswerMatch } from '../data/infiniteGenerator';
import { ExerciseCard } from './ExerciseCard';
import {
  BookOpen,
  Microscope,
  CheckCircle2,
  XCircle,
  Sparkles,
  FileSearch,
  Dumbbell
} from 'lucide-react';

interface ReadingZoneProps {
  completedStories: string[];
  onMarkStoryComplete: (storyId: string) => void;
  onExerciseAttempt: (exercise: Exercise, isCorrect: boolean, forceAddToVault?: boolean) => void;
}

export const ReadingZone: React.FC<ReadingZoneProps> = ({
  completedStories,
  onMarkStoryComplete,
  onExerciseAttempt
}) => {
  const [subTab, setSubTab] = useState<'stories' | 'custom_analyzer'>('stories');
  const [selectedStoryId, setSelectedStoryId] = useState<string>(READING_STORIES[0].id);
  const [xrayActive, setXrayActive] = useState<boolean>(true);
  const [activeAnnotation, setActiveAnnotation] = useState<StoryAnnotation | null>(null);

  // Answers state for the current story's questions
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState<Record<string, boolean>>({});

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

    // Check if all questions are answered
    const totalQ = currentStory.questions.length;
    const answeredCount = Object.keys({ ...checked, [qId]: true }).length;
    if (answeredCount >= totalQ) {
      onMarkStoryComplete(currentStory.id);
    }
  };

  // Render paragraph with highlighted annotations when X-Ray mode is on
  const renderAnnotatedParagraph = (paragraph: string) => {
    if (!xrayActive) return paragraph;

    let segments: (string | { text: string; ann: StoryAnnotation })[] = [paragraph];

    currentStory.annotations.forEach((ann) => {
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
            colorMap[seg.ann.type]
          }`}
        >
          {seg.text}
        </button>
      );
    });
  };

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

          // Crear un ejercicio Cloze automático sacando esta estructura de la frase donde aparece
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
            Zona de Lectura, Análisis de Textos y Caza Gramatical
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Lee historias graduadas (A2+ a B2+), destripa por qué se usa cada estructura y haz ejercicios sobre el texto.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
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
            Historias con Ejercicios ({READING_STORIES.length})
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
            Analizar Mi Propio Texto y Sacar Ejercicios
          </button>
        </div>
      </div>

      {/* TAB 1: CURATED STORIES + X-RAY + EXERCISES */}
      {subTab === 'stories' && (
        <div className="space-y-6">
          {/* Story Selector Cards */}
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
                      {isDone && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      )}
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

          {/* Story Reader & X-Ray Panel */}
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

              {xrayActive && (
                <div className="flex flex-wrap items-center gap-3 text-xs bg-slate-950/80 px-3.5 py-2 rounded-xl border border-slate-800">
                  <span className="text-slate-400">Haz clic en cualquier expresión subrayada:</span>
                  <span className="px-2 py-0.5 rounded bg-indigo-500/25 text-indigo-200 border-b border-indigo-400">
                    Gramática
                  </span>
                  <span className="px-2 py-0.5 rounded bg-amber-500/25 text-amber-200 border-b border-amber-400">
                    Phrasal Verbs
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/25 text-emerald-200 border-b border-emerald-400">
                    Conectores
                  </span>
                </div>
              )}

              {/* Story Paragraphs */}
              <div className="space-y-4 text-slate-100 text-base sm:text-lg leading-relaxed font-normal">
                {currentStory.paragraphs.map((p, idx) => (
                  <p key={idx} className="leading-8">
                    <span className="text-xs font-mono text-slate-500 mr-2 select-none">
                      [P{idx + 1}]
                    </span>
                    {renderAnnotatedParagraph(p)}
                  </p>
                ))}
              </div>
            </div>

            {/* X-Ray Inspector Sidebar */}
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

                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase text-slate-400 block">
                    Todas las estructuras clave de esta historia:
                  </span>
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
          </div>

          {/* Post-Reading Exercises & Text Analysis Suite */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                Ejercicios de Análisis del Texto y Transformaciones ({currentStory.questions.length})
              </h3>
              <p className="text-xs sm:text-sm text-slate-400">
                Analiza por qué se usan las estructuras del texto, caza phrasal verbs y transforma frases de la historia.
              </p>
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

      {/* TAB 2: CUSTOM TEXT ANALYZER & EXERCISE GENERATOR */}
      {subTab === 'custom_analyzer' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <FileSearch className="w-5 h-5 text-purple-400" />
              Pega cualquier texto o historia en inglés para destripar su gramática
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Pega un párrafo de un libro, noticia o subtítulo. La app detectará automáticamente tiempos perfectos, condicionales, pasivas, conectores y phrasal verbs, y creará ejercicios interactivos de huecos con tu texto.
            </p>

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

            {/* Detected Structures Grid */}
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
              <h4 className="text-sm font-bold uppercase tracking-wider text-purple-300">
                Ejercicios generados automáticamente de tu texto:
              </h4>
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
