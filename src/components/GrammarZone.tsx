import React, { useState } from 'react';
import { Level, Exercise } from '../types';
import { GRAMMAR_UNITS, CURATED_GRAMMAR_EXERCISES } from '../data/grammarData';
import { GRAMMAR_PLAIN_EXPLANATIONS } from '../data/grammarPlainExplanations';
import { getAllStaticExercises } from '../data/infiniteGenerator';
import { ExerciseCard } from './ExerciseCard';
import {
  BookOpen,
  AlertOctagon,
  CheckCircle,
  Dumbbell,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  Sparkles,
  Zap,
  Coffee,
  HelpCircle,
  ArrowRight
} from 'lucide-react';

interface GrammarZoneProps {
  onExerciseAttempt: (exercise: Exercise, isCorrect: boolean, forceAddToVault?: boolean) => void;
}

const LEVELS: (Level | 'ALL')[] = ['ALL', 'A2+', 'B1', 'B1+', 'B2', 'B2+'];

export const GrammarZone: React.FC<GrammarZoneProps> = ({ onExerciseAttempt }) => {
  const [selectedLevel, setSelectedLevel] = useState<Level | 'ALL'>('ALL');
  const [expandedUnitId, setExpandedUnitId] = useState<string | null>(GRAMMAR_UNITS[0].id);
  const [practicingUnitId, setPracticingUnitId] = useState<string | null>(null);
  const [exerciseIdx, setExerciseIdx] = useState(0);

  const allExercises = getAllStaticExercises();

  const filteredUnits = GRAMMAR_UNITS.filter(
    (u) => selectedLevel === 'ALL' || u.level === selectedLevel
  );

  const getExercisesForUnit = (unitId: string, unitLevel: Level): Exercise[] => {
    const direct = allExercises.filter((e) => e.topicId === unitId);
    const unique = Array.from(new Map(direct.map((e) => [e.id, e])).values());
    if (unique.length > 0) return unique;
    return CURATED_GRAMMAR_EXERCISES.filter((e) => e.level === unitLevel);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header & Level Selector */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-600" />
              Guía Gramatical + Práctica Inmediata
            </h2>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
              <Sparkles className="w-3 h-3 text-amber-600" /> Explicaciones en Cristiano
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Pensada si la gramática te cuesta en español: situaciones cotidianas (el móvil, el trabajo, las cañas), sin tecnicismos y con trucos mentales rápidos.
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5 shrink-0">
          {LEVELS.map((lvl) => (
            <button
              key={lvl}
              type="button"
              onClick={() => setSelectedLevel(lvl)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedLevel === lvl
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {lvl === 'ALL' ? 'Todos' : lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Units Accordion */}
      <div className="space-y-3 sm:space-y-4">
        {filteredUnits.map((unit) => {
          const isExpanded = expandedUnitId === unit.id;
          const isPracticing = practicingUnitId === unit.id;
          const unitExercises = getExercisesForUnit(unit.id, unit.level);
          const currentEx = unitExercises[exerciseIdx % Math.max(1, unitExercises.length)];
          const plainInfo = GRAMMAR_PLAIN_EXPLANATIONS[unit.id];

          return (
            <div
              key={unit.id}
              className={`bg-white border rounded-2xl overflow-hidden transition-all shadow-xs ${
                isExpanded ? 'border-indigo-400 ring-2 ring-indigo-500/10' : 'border-slate-200/90'
              }`}
            >
              {/* Unit Header */}
              <button
                type="button"
                onClick={() => setExpandedUnitId(isExpanded ? null : unit.id)}
                className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200">
                      Nivel {unit.level}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">
                      {unit.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-500">{unit.subtitle}</p>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                  <span className="hidden sm:inline-block text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                    {unitExercises.length} ejercicios
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-indigo-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  )}
                </div>
              </button>

              {/* Expanded Unit Content */}
              {isExpanded && (
                <div className="p-4 sm:p-5 pt-0 border-t border-slate-100 space-y-4 sm:space-y-5">
                  {/* ==================== 1. EN CRISTIANO: EXPLICACIÓN SIN RODEOS ==================== */}
                  {plainInfo && (
                    <div className="mt-3 bg-gradient-to-br from-amber-50/70 via-white to-indigo-50/40 border border-amber-200 rounded-2xl p-4 sm:p-5 space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-200/70 pb-3">
                        <div className="flex items-center gap-2 text-amber-900 font-bold text-sm sm:text-base">
                          <Coffee className="w-4 h-4 text-amber-700 shrink-0" />
                          <span>¿De qué va esto en cristiano? (Sin palabros raros)</span>
                        </div>
                        {plainInfo.mentalTrick && (
                          <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                            <Zap className="w-3.5 h-3.5 text-amber-600" />
                            Truco mental de 5 seg
                          </span>
                        )}
                      </div>

                      {/* Explicación en lenguaje directo */}
                      <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-normal">
                        {plainInfo.inPlainSpanish}
                      </p>

                      {/* Comparativa Español vs Inglés */}
                      {plainInfo.spanishParallel && (
                        <div className="bg-white border border-slate-200 rounded-xl p-3.5 sm:p-4 text-xs sm:text-sm space-y-1.5 shadow-2xs">
                          <div className="text-indigo-900 font-bold flex items-center gap-1.5">
                            <HelpCircle className="w-4 h-4 text-indigo-600 shrink-0" />
                            <span>Cómo piensa tu mente en español vs. Cómo lo ven ellos en inglés:</span>
                          </div>
                          <p className="text-slate-700 leading-relaxed">
                            {plainInfo.spanishParallel}
                          </p>
                        </div>
                      )}

                      {/* Truco mental mnemotécnico */}
                      {plainInfo.mentalTrick && (
                        <div className="bg-amber-100/70 border border-amber-300 rounded-xl p-3 sm:p-3.5 flex items-start gap-2.5 text-xs sm:text-sm">
                          <Zap className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                          <div className="text-amber-950">
                            <strong className="text-amber-900 font-bold block sm:inline mr-1">
                              Fórmula mnemotécnica rápida:
                            </strong>
                            <span>{plainInfo.mentalTrick}</span>
                          </div>
                        </div>
                      )}

                      {/* Casos cotidianos desglosados (Street Examples) */}
                      {plainInfo.streetExamples && plainInfo.streetExamples.length > 0 && (
                        <div className="space-y-2.5 pt-1">
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                            📱 Situaciones reales de la calle (Paso a paso):
                          </span>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {plainInfo.streetExamples.map((item, idx) => (
                              <div
                                key={idx}
                                className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-2 flex flex-col justify-between shadow-2xs"
                              >
                                <div>
                                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider pb-1 border-b border-slate-100 mb-2">
                                    {item.situation}
                                  </div>
                                  <div className="space-y-1.5">
                                    <div className="text-xs text-slate-700">
                                      <span className="text-rose-600 font-bold mr-1">🇪🇸 En español:</span>
                                      <em>«{item.howYouSayItInSpanish}»</em>
                                    </div>
                                    <div className="text-xs text-emerald-800 font-semibold">
                                      <span className="text-emerald-700 font-bold mr-1">🇬🇧 En inglés:</span>
                                      {item.howEnglishBuildsIt}
                                    </div>
                                  </div>
                                </div>
                                <div className="text-[11px] text-slate-500 border-t border-slate-100 pt-2 flex items-start gap-1">
                                  <ArrowRight className="w-3 h-3 text-indigo-500 shrink-0 mt-0.5" />
                                  <span>{item.breakdown}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* ==================== 2. FÓRMULA GRAMATICAL / ESTRUCTURA ==================== */}
                  <div className="bg-slate-50 border border-indigo-200 rounded-xl p-3.5 sm:p-4">
                    <span className="text-xs uppercase tracking-wider font-bold text-indigo-700 block mb-1">
                      📐 Estructura / Fórmula Gramatical Oficial:
                    </span>
                    <p className="font-mono text-xs sm:text-sm text-slate-900 font-semibold">
                      {unit.formula}
                    </p>
                  </div>

                  {/* ==================== 3. CUÁNDO USARLO & TRAMPAS ==================== */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-4 space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                        ✅ Cuándo y cómo usarlo
                      </h4>
                      <ul className="space-y-2 text-xs sm:text-sm text-emerald-950">
                        {unit.whenToUse.map((rule, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-emerald-600 font-bold">•</span>
                            <span>{rule}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Spanish Speaker Traps */}
                    <div className="bg-rose-50/60 border border-rose-200 rounded-xl p-4 space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-rose-800 flex items-center gap-1.5">
                        <AlertOctagon className="w-4 h-4 text-rose-600" />
                        Trampas Mortales para Hispanohablantes
                      </h4>
                      {unit.spanishSpeakerTraps.map((trap, i) => (
                        <div key={i} className="text-xs sm:text-sm space-y-1 bg-white p-3 rounded-lg border border-rose-200 shadow-2xs">
                          <p className="text-rose-700 line-through">❌ {trap.wrong}</p>
                          <p className="text-emerald-800 font-semibold flex items-center gap-1">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> {trap.right}
                          </p>
                          <p className="text-slate-600 text-xs pt-0.5">{trap.why}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* ==================== 4. EJEMPLOS & TRUCOS DE EXAMEN ==================== */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2.5">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                        Ejemplos adicionales de examen
                      </h4>
                      {unit.examples.map((ex, i) => (
                        <div key={i} className="text-xs sm:text-sm border-l-2 border-indigo-500 pl-3 py-0.5">
                          <p className="text-slate-900 font-medium">{ex.en}</p>
                          <p className="text-slate-500 text-xs">{ex.es}</p>
                        </div>
                      ))}
                    </div>

                    <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-4 space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                        <Lightbulb className="w-4 h-4 text-amber-600" />
                        Trucos de Examen (Key Word Transformation)
                      </h4>
                      <ul className="space-y-1.5 text-xs sm:text-sm text-amber-950">
                        {unit.keyTips.map((tip, i) => (
                          <li key={i}>⚡ {tip}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* ==================== 5. PRACTICAR INMEDIATAMENTE ESTE TEMA ==================== */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setPracticingUnitId(isPracticing ? null : unit.id);
                        setExerciseIdx(0);
                      }}
                      className="w-full sm:w-auto px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer min-h-[48px]"
                    >
                      <Dumbbell className="w-4 h-4" />
                      {isPracticing
                        ? 'Ocultar ejercicios de este tema'
                        : `Practicar ahora este tema (${unitExercises.length} ejercicios)`}
                    </button>

                    {isPracticing && currentEx && (
                      <div className="mt-4 pt-4 border-t border-slate-200">
                        <ExerciseCard
                          exercise={currentEx}
                          onAttempt={onExerciseAttempt}
                          onNext={() => setExerciseIdx((i) => i + 1)}
                          indexLabel={`Práctica del Tema: ${(exerciseIdx % unitExercises.length) + 1} / ${unitExercises.length}`}
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
