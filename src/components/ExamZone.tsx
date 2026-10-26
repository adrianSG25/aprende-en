import React, { useState } from 'react';
import { Level, Exercise, ExamResult } from '../types';
import { getAllStaticExercises, checkAnswerMatch } from '../data/infiniteGenerator';
import {
  Trophy,
  Play,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Award,
  Flame
} from 'lucide-react';

interface ExamZoneProps {
  examHistory: ExamResult[];
  onSaveExamResult: (result: ExamResult) => void;
  onExerciseAttempt: (exercise: Exercise, isCorrect: boolean, forceAddToVault?: boolean) => void;
  onGoToMistakes: () => void;
}

export const ExamZone: React.FC<ExamZoneProps> = ({
  examHistory,
  onSaveExamResult,
  onExerciseAttempt,
  onGoToMistakes
}) => {
  const [examTarget, setExamTarget] = useState<Level | 'PLACEMENT' | 'USE_OF_ENGLISH'>('PLACEMENT');
  const [questionCount, setQuestionCount] = useState<number>(15);
  const [activeQuestions, setActiveQuestions] = useState<Exercise[]>([]);
  const [userResponses, setUserResponses] = useState<Record<string, string>>({});
  const [examSubmitted, setExamSubmitted] = useState<boolean>(false);
  const [examStarted, setExamStarted] = useState<boolean>(false);

  const startNewExam = () => {
    const all = getAllStaticExercises();
    let pool = [...all];

    if (examTarget === 'USE_OF_ENGLISH') {
      pool = all.filter((e) =>
        ['transformation', 'word_formation', 'error_correction'].includes(e.type)
      );
    } else if (examTarget !== 'PLACEMENT') {
      pool = all.filter((e) => e.level === examTarget);
    }

    // Shuffle pool
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, Math.min(questionCount, shuffled.length));

    setActiveQuestions(selected);
    setUserResponses({});
    setExamSubmitted(false);
    setExamStarted(true);
  };

  const handleFinishExam = (e: React.FormEvent) => {
    e.preventDefault();
    let score = 0;
    const breakdown: Record<string, { correct: number; total: number }> = {};

    activeQuestions.forEach((q) => {
      const ans = userResponses[q.id] || '';
      const right = checkAnswerMatch(ans, q.acceptedAnswers);
      if (right) score += 1;

      const catKey = q.category;
      if (!breakdown[catKey]) breakdown[catKey] = { correct: 0, total: 0 };
      breakdown[catKey].total += 1;
      if (right) breakdown[catKey].correct += 1;

      // Record attempt so missed questions automatically enter the Mistake Vault!
      onExerciseAttempt(q, right, false);
    });

    const result: ExamResult = {
      id: `exam-${Date.now()}`,
      date: new Date().toLocaleDateString('es-ES'),
      level:
        examTarget === 'PLACEMENT'
          ? 'Diagnóstico A2+ a B2+'
          : examTarget === 'USE_OF_ENGLISH'
          ? 'Use of English'
          : `Nivel ${examTarget}`,
      score,
      total: activeQuestions.length,
      breakdown
    };

    onSaveExamResult(result);
    setExamSubmitted(true);
  };

  const calculateDiagnosedLevel = (pct: number): string => {
    if (pct >= 88) return 'B2+ (B2 Advanced Consolidado)';
    if (pct >= 74) return 'B2 (Upper-Intermediate)';
    if (pct >= 60) return 'B1+ (Intermediate Advanced)';
    if (pct >= 45) return 'B1 (Intermediate)';
    return 'A2+ (A2 Advanced)';
  };

  const totalRight = activeQuestions.filter((q) =>
    checkAnswerMatch(userResponses[q.id] || '', q.acceptedAnswers)
  ).length;
  const pctScore =
    activeQuestions.length > 0 ? Math.round((totalRight / activeQuestions.length) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            Zona de Tests, Exámenes por Nivel y Simulacros Use of English
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Evalúa tu nivel real desde A2+ hasta B2+. Todos los fallos del test pasan directamente a tu Cámara de Repetición.
          </p>
        </div>

        {examStarted && (
          <button
            type="button"
            onClick={() => setExamStarted(false)}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Configurar otro test
          </button>
        )}
      </div>

      {/* Exam Configurator */}
      {!examStarted && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
            <h3 className="text-lg font-bold text-white">
              Configura tu Examen o Test de Nivel
            </h3>

            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase text-slate-400">
                1. Elige la modalidad de Test:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  { id: 'PLACEMENT', title: '🎯 Test Diagnóstico Global (A2+ → B2+)', desc: 'Mezcla progresiva de todos los niveles para medir tu techo actual.' },
                  { id: 'USE_OF_ENGLISH', title: '🔥 Simulacro Use of English (B1/B2/B2+)', desc: 'Solo Key Word Transformations, Word Formation y Corrección de Errores.' },
                  { id: 'A2+', title: 'Examen Nivel A2+ (A2 Advanced)', desc: 'Past Continuous, Present Perfect, Comparativos y Modales de obligación.' },
                  { id: 'B1', title: 'Examen Nivel B1 (Intermediate)', desc: 'Past Perfect, Used to / Be used to, 1st & 2nd Conditional, Pasiva y Reported Speech.' },
                  { id: 'B1+', title: 'Examen Nivel B1+ (Intermediate Advanced)', desc: '3rd Conditional, Causative (Have/Get done), Future Perfect y Phrasal Verbs.' },
                  { id: 'B2', title: 'Examen Nivel B2 (First Certificate)', desc: 'Wish/If only, Mixed Conditionals, Modales Perfectos y Gerund vs Infinitive.' },
                  { id: 'B2+', title: 'Examen Nivel B2+ (B2 Advanced)', desc: 'Inversión negativa, Pasiva Personal (is believed to have...), Unreal Past y Clefts.' }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setExamTarget(opt.id as Level | 'PLACEMENT' | 'USE_OF_ENGLISH')}
                    className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                      examTarget === opt.id
                        ? 'bg-indigo-600/25 border-indigo-500 text-white'
                        : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="font-bold text-sm">{opt.title}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase text-slate-400">
                2. Número de preguntas del examen:
              </label>
              <div className="flex gap-3">
                {[10, 15, 25, 35].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setQuestionCount(num)}
                    className={`px-4 py-2.5 rounded-xl font-bold text-sm border cursor-pointer ${
                      questionCount === num
                        ? 'bg-amber-500 text-slate-950 border-amber-400'
                        : 'bg-slate-950 border-slate-800 text-slate-300'
                    }`}
                  >
                    {num} preguntas
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={startNewExam}
              className="w-full sm:w-auto px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Play className="w-4 h-4" />
              Comenzar Examen Ahora
            </button>
          </div>

          {/* Exam History Sidebar */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              Historial de Exámenes
            </h3>

            {examHistory.length === 0 ? (
              <p className="text-xs sm:text-sm text-slate-400">
                Todavía no has completado ningún examen. ¡Haz tu primer test para registrar tu evolución!
              </p>
            ) : (
              <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
                {examHistory.map((item) => {
                  const pct = Math.round((item.score / Math.max(1, item.total)) * 100);
                  return (
                    <div
                      key={item.id}
                      className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 flex items-center justify-between"
                    >
                      <div>
                        <p className="font-bold text-xs sm:text-sm text-white">{item.level}</p>
                        <p className="text-[11px] text-slate-400">{item.date}</p>
                      </div>
                      <div className="text-right">
                        <span
                          className={`text-sm font-extrabold ${
                            pct >= 70 ? 'text-emerald-400' : pct >= 50 ? 'text-amber-300' : 'text-rose-400'
                          }`}
                        >
                          {item.score}/{item.total} ({pct}%)
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Active Exam Questions */}
      {examStarted && !examSubmitted && (
        <form onSubmit={handleFinishExam} className="space-y-4">
          {activeQuestions.map((q, idx) => (
            <div
              key={q.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold px-2.5 py-1 rounded bg-slate-800 text-indigo-300">
                  Pregunta {idx + 1} de {activeQuestions.length} • Nivel {q.level}
                </span>
                <span className="text-xs text-slate-400">{q.topicLabel}</span>
              </div>

              <p className="text-sm font-medium text-slate-300">{q.prompt}</p>

              {q.baseSentence && (
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5">
                  <p className="font-bold text-white">{q.baseSentence}</p>
                  {q.keyWord && (
                    <span className="inline-block mt-1.5 px-2.5 py-0.5 rounded bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono font-bold text-xs">
                      KEYWORD: {q.keyWord}
                    </span>
                  )}
                </div>
              )}

              {q.spanishHint && (
                <p className="text-xs sm:text-sm text-indigo-200 font-medium">
                  🎯 {q.spanishHint}
                </p>
              )}

              <input
                type="text"
                value={userResponses[q.id] || ''}
                onChange={(e) =>
                  setUserResponses((prev) => ({ ...prev, [q.id]: e.target.value }))
                }
                placeholder="Escribe tu respuesta..."
                className="w-full bg-slate-950 border border-slate-700 focus:border-indigo-500 rounded-xl px-4 py-2.5 text-sm sm:text-base text-white outline-none"
              />
            </div>
          ))}

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center justify-between">
            <span className="text-xs sm:text-sm text-slate-300">
              Respondidas: {Object.values(userResponses).filter((v) => v.trim().length > 0).length} /{' '}
              {activeQuestions.length}
            </span>
            <button
              type="submit"
              className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/25 cursor-pointer"
            >
              Entregar y Corregir Examen
            </button>
          </div>
        </form>
      )}

      {/* Exam Results & Detailed Review */}
      {examStarted && examSubmitted && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-indigo-500/40 rounded-2xl p-6 text-center space-y-4">
            <Award className="w-12 h-12 text-amber-400 mx-auto" />
            <h3 className="text-2xl font-extrabold text-white">
              Resultado: {totalRight} / {activeQuestions.length} ({pctScore}%)
            </h3>
            <p className="text-sm sm:text-base text-indigo-300 font-bold">
              Diagnóstico de rendimiento: {calculateDiagnosedLevel(pctScore)}
            </p>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
              Todas las preguntas que has fallado ya se han guardado automáticamente en tu <strong>Cámara de Repetición de Fallos</strong> para que puedas machacarlas.
            </p>

            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={onGoToMistakes}
                className="px-6 py-3 bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm rounded-xl flex items-center gap-2 cursor-pointer"
              >
                <Flame className="w-4 h-4" />
                Ir a Machacar Mis Fallos del Examen
              </button>
              <button
                type="button"
                onClick={startNewExam}
                className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm rounded-xl flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                Repetir Nuevo Examen
              </button>
            </div>
          </div>

          {/* Review List */}
          <div className="space-y-3">
            <h4 className="text-base font-bold text-white">
              Revisión Detallada Pregunta por Pregunta:
            </h4>
            {activeQuestions.map((q, idx) => {
              const userAns = userResponses[q.id] || '';
              const isRight = checkAnswerMatch(userAns, q.acceptedAnswers);
              return (
                <div
                  key={q.id}
                  className={`p-4 rounded-2xl border text-xs sm:text-sm space-y-2 ${
                    isRight
                      ? 'bg-emerald-950/20 border-emerald-500/30'
                      : 'bg-rose-950/25 border-rose-500/35'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">
                      {idx + 1}. [{q.level}] {q.topicLabel}
                    </span>
                    {isRight ? (
                      <span className="flex items-center gap-1 text-emerald-400 font-bold">
                        <CheckCircle2 className="w-4 h-4" /> Correcta
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-rose-400 font-bold">
                        <XCircle className="w-4 h-4" /> Fallo
                      </span>
                    )}
                  </div>
                  {q.baseSentence && <p className="text-slate-200 font-medium">{q.baseSentence}</p>}
                  {q.spanishHint && <p className="text-indigo-200">{q.spanishHint}</p>}
                  <p>
                    <span className="text-slate-400">Tu respuesta: </span>
                    <strong className={isRight ? 'text-emerald-300' : 'text-rose-300 line-through'}>
                      {userAns || '(En blanco)'}
                    </strong>
                    {!isRight && (
                      <>
                        {' '}
                        → <strong className="text-emerald-300">{q.acceptedAnswers.join(' / ')}</strong>
                      </>
                    )}
                  </p>
                  <p className="text-slate-300 text-xs">{q.explanation}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
