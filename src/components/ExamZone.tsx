import React, { useState } from 'react';
import { Level, Exercise, ExamResult } from '../types';
import {
  getAllStaticExercises,
  evaluateExerciseSubmission,
  extractTargetAndTranslation
} from '../data/infiniteGenerator';
import {
  Trophy,
  Play,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Award,
  Flame,
  Languages
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
  const [visibleTranslations, setVisibleTranslations] = useState<Record<string, boolean>>({});
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

    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, Math.min(questionCount, shuffled.length));

    setActiveQuestions(selected);
    setUserResponses({});
    setVisibleTranslations({});
    setExamSubmitted(false);
    setExamStarted(true);
  };

  const handleFinishExam = (e: React.FormEvent) => {
    e.preventDefault();
    let score = 0;
    const breakdown: Record<string, { correct: number; total: number }> = {};

    activeQuestions.forEach((q) => {
      const ans = userResponses[q.id] || '';
      const evalRes = evaluateExerciseSubmission(ans, q);
      if (evalRes.isCorrect) score += 1;

      const catKey = q.category;
      if (!breakdown[catKey]) breakdown[catKey] = { correct: 0, total: 0 };
      breakdown[catKey].total += 1;
      if (evalRes.isCorrect) breakdown[catKey].correct += 1;

      onExerciseAttempt(q, evalRes.isCorrect, false);
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

  const totalRight = activeQuestions.filter(
    (q) => evaluateExerciseSubmission(userResponses[q.id] || '', q).isCorrect
  ).length;
  const pctScore =
    activeQuestions.length > 0 ? Math.round((totalRight / activeQuestions.length) * 100) : 0;

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
        <div>
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            Zona de Tests & Simulacros Use of English
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Mide tu nivel real de A2+ a B2+. Todos los fallos van directos a tu Zona de Repetición.
          </p>
        </div>

        {examStarted && (
          <button
            type="button"
            onClick={() => setExamStarted(false)}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 border border-slate-200 flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Configurar otro test</span>
          </button>
        )}
      </div>

      {/* Exam Configurator */}
      {!examStarted && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-6 space-y-4 sm:space-y-5 shadow-sm">
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Configura tu Examen o Test de Nivel
            </h3>

            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase text-slate-600">
                1. Elige la modalidad de Test:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  { id: 'PLACEMENT', title: '🎯 Test Diagnóstico Global (A2+ → B2+)', desc: 'Mezcla progresiva de todos los niveles para medir tu techo actual.' },
                  { id: 'USE_OF_ENGLISH', title: '🔥 Simulacro Use of English (B1/B2/B2+)', desc: 'Transformaciones, Word Formation y Corrección de Errores.' },
                  { id: 'A2+', title: 'Examen Nivel A2+ (A2 Advanced)', desc: 'Past Continuous, Present Perfect, Comparativos y Modales.' },
                  { id: 'B1', title: 'Examen Nivel B1 (Intermediate)', desc: 'Past Perfect, Used to, 1st & 2nd Conditional, Pasiva.' },
                  { id: 'B1+', title: 'Examen Nivel B1+ (Intermediate Advanced)', desc: '3rd Conditional, Causative, Future Perfect y Phrasals.' },
                  { id: 'B2', title: 'Examen Nivel B2 (First Certificate)', desc: 'Wish/If only, Mixed Conditionals, Modales Perfectos.' },
                  { id: 'B2+', title: 'Examen Nivel B2+ (B2 Advanced)', desc: 'Inversión negativa, Pasiva Personal, Unreal Past y Clefts.' }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setExamTarget(opt.id as Level | 'PLACEMENT' | 'USE_OF_ENGLISH')}
                    className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                      examTarget === opt.id
                        ? 'bg-indigo-50 border-2 border-indigo-600 text-slate-900 shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="font-bold text-xs sm:text-sm">{opt.title}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase text-slate-600">
                2. Número de preguntas del examen:
              </label>
              <div className="flex flex-wrap gap-2.5">
                {[10, 15, 25, 35].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setQuestionCount(num)}
                    className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm border cursor-pointer ${
                      questionCount === num
                        ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
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
              className="w-full sm:w-auto px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-xs flex items-center justify-center gap-2 cursor-pointer min-h-[48px]"
            >
              <Play className="w-4 h-4" />
              Comenzar Examen Ahora
            </button>
          </div>

          {/* Exam History Sidebar */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 space-y-3.5 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" />
              Historial de Exámenes
            </h3>

            {examHistory.length === 0 ? (
              <p className="text-xs text-slate-500">
                Todavía no has completado ningún examen. ¡Haz tu primer test para registrar tu evolución!
              </p>
            ) : (
              <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
                {examHistory.map((item) => {
                  const pct = Math.round((item.score / Math.max(1, item.total)) * 100);
                  return (
                    <div
                      key={item.id}
                      className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between"
                    >
                      <div>
                        <p className="font-bold text-xs text-slate-900">{item.level}</p>
                        <p className="text-[11px] text-slate-500">{item.date}</p>
                      </div>
                      <div className="text-right">
                        <span
                          className={`text-xs sm:text-sm font-extrabold ${
                            pct >= 70 ? 'text-emerald-700' : pct >= 50 ? 'text-amber-700' : 'text-rose-700'
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
          {activeQuestions.map((q, idx) => {
            const { englishTargetWithGap, spanishTranslation } = extractTargetAndTranslation(q);
            const isTransVisible = !!visibleTranslations[q.id];

            return (
              <div
                key={q.id}
                className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 space-y-3 shadow-xs"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200">
                    Pregunta {idx + 1} de {activeQuestions.length} • Nivel {q.level}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500 font-medium">{q.topicLabel}</span>
                    {spanishTranslation && q.type !== 'translation' && (
                      <button
                        type="button"
                        onClick={() =>
                          setVisibleTranslations((prev) => ({
                            ...prev,
                            [q.id]: !prev[q.id]
                          }))
                        }
                        className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 flex items-center gap-1 cursor-pointer"
                      >
                        <Languages className="w-3.5 h-3.5" />
                        {isTransVisible ? 'Ocultar traducción' : 'Mostrar traducción'}
                      </button>
                    )}
                  </div>
                </div>

                <p className="text-sm font-medium text-slate-800">{q.prompt}</p>

                {q.baseSentence && (
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5">
                    <p className="font-bold text-slate-900">{q.baseSentence}</p>
                    {q.keyWord && (
                      <span className="inline-block mt-1.5 px-2.5 py-0.5 rounded bg-amber-100 border border-amber-300 text-amber-900 font-mono font-bold text-xs">
                        KEYWORD: {q.keyWord}
                      </span>
                    )}
                  </div>
                )}

                {englishTargetWithGap && (
                  <p className="text-sm sm:text-base text-indigo-950 font-bold bg-indigo-50/70 border border-indigo-200 rounded-xl p-3">
                    🎯 {englishTargetWithGap}
                  </p>
                )}

                {q.type === 'translation' && spanishTranslation && (
                  <p className="text-sm sm:text-base text-indigo-950 font-bold bg-indigo-50/70 border border-indigo-200 rounded-xl p-3">
                    🎯 "{spanishTranslation}"
                  </p>
                )}

                {isTransVisible && spanishTranslation && q.type !== 'translation' && (
                  <p className="text-xs sm:text-sm text-amber-950 bg-amber-50/80 border border-amber-200 rounded-xl p-2.5">
                    🌐 Traducción: {spanishTranslation}
                  </p>
                )}

                <input
                  type="text"
                  value={userResponses[q.id] || ''}
                  onChange={(e) =>
                    setUserResponses((prev) => ({ ...prev, [q.id]: e.target.value }))
                  }
                  placeholder="Escribe tu respuesta..."
                  className="w-full bg-white border-2 border-slate-300 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 rounded-xl px-4 py-3 text-base text-slate-900 outline-none min-h-[48px]"
                />
              </div>
            );
          })}

          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 flex items-center justify-between shadow-sm">
            <span className="text-xs sm:text-sm text-slate-600 font-medium">
              Respondidas: {Object.values(userResponses).filter((v) => v.trim().length > 0).length} /{' '}
              {activeQuestions.length}
            </span>
            <button
              type="submit"
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-xs cursor-pointer min-h-[48px]"
            >
              Entregar y Corregir
            </button>
          </div>
        </form>
      )}

      {/* Exam Results & Detailed Review */}
      {examStarted && examSubmitted && (
        <div className="space-y-4 sm:space-y-6">
          <div className="bg-white border border-indigo-200 rounded-2xl p-6 text-center space-y-4 shadow-sm">
            <Award className="w-12 h-12 text-amber-500 mx-auto" />
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Resultado: {totalRight} / {activeQuestions.length} ({pctScore}%)
            </h3>
            <p className="text-sm sm:text-base text-indigo-700 font-bold">
              Diagnóstico: {calculateDiagnosedLevel(pctScore)}
            </p>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
              Todas las preguntas falladas se han guardado automáticamente en tu <strong>Cámara de Repetición</strong> para que puedas machacarlas.
            </p>

            <div className="flex flex-wrap justify-center gap-2.5 pt-2">
              <button
                type="button"
                onClick={onGoToMistakes}
                className="px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center gap-2 cursor-pointer shadow-xs min-h-[44px]"
              >
                <Flame className="w-4 h-4" />
                Ir a Repetir Mis Fallos del Examen
              </button>
              <button
                type="button"
                onClick={startNewExam}
                className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm rounded-xl border border-slate-200 flex items-center gap-2 cursor-pointer min-h-[44px]"
              >
                <RotateCcw className="w-4 h-4" />
                Repetir Nuevo Examen
              </button>
            </div>
          </div>

          {/* Review List */}
          <div className="space-y-3">
            <h4 className="text-sm sm:text-base font-bold text-slate-900">
              Revisión Detallada Pregunta por Pregunta:
            </h4>
            {activeQuestions.map((q, idx) => {
              const userAns = userResponses[q.id] || '';
              const evalRes = evaluateExerciseSubmission(userAns, q);
              return (
                <div
                  key={q.id}
                  className={`p-4 rounded-2xl border text-xs sm:text-sm space-y-2 shadow-2xs ${
                    evalRes.isCorrect
                      ? 'bg-emerald-50/70 border-emerald-200'
                      : 'bg-rose-50/70 border-rose-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">
                      {idx + 1}. [{q.level}] {q.topicLabel}
                    </span>
                    {evalRes.isCorrect ? (
                      <span className="flex items-center gap-1 text-emerald-700 font-bold">
                        <CheckCircle2 className="w-4 h-4" /> Correcta
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-rose-700 font-bold">
                        <XCircle className="w-4 h-4" /> Fallo
                      </span>
                    )}
                  </div>
                  {q.baseSentence && <p className="text-slate-800 font-medium">{q.baseSentence}</p>}
                  <p>
                    <span className="text-slate-500">Tu respuesta: </span>
                    <strong className={evalRes.isCorrect ? 'text-emerald-800' : 'text-rose-700 line-through'}>
                      {userAns || '(En blanco)'}
                    </strong>
                  </p>
                  <p className="text-emerald-800 font-semibold">
                    ✅ Frase completa corregida: {evalRes.fullCorrectedSentence}
                  </p>
                  <p className="text-slate-600 text-xs">{q.explanation}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
