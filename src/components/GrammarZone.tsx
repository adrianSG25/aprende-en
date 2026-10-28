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
    <div className="space-y-6">
      {/* Header & Level Selector */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-400" />
              Guía Gramatical al Grano + Práctica Inmediata
            </h2>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
              <Sparkles className="w-3 h-3" /> Explicaciones en Cristiano
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Diseñada especialmente si la gramática te cuesta en español: situaciones cotidianas (el móvil, el trabajo, las cañas), analogías sin tecnicismos y trucos mentales de 5 segundos.
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
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {lvl === 'ALL' ? 'Todos' : lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Units Accordion */}
      <div className="space-y-4">
        {filteredUnits.map((unit) => {
          const isExpanded = expandedUnitId === unit.id;
          const isPracticing = practicingUnitId === unit.id;
          const unitExercises = getExercisesForUnit(unit.id, unit.level);
          const currentEx = unitExercises[exerciseIdx % Math.max(1, unitExercises.length)];
          const plainInfo = GRAMMAR_PLAIN_EXPLANATIONS[unit.id];

          return (
            <div
              key={unit.id}
              className={`bg-slate-900/90 border rounded-2xl overflow-hidden transition-all ${
                isExpanded ? 'border-indigo-500/40 shadow-xl shadow-indigo-950/20' : 'border-slate-800'
              }`}
            >
              {/* Unit Header */}
              <button
                type="button"
                onClick={() => setExpandedUnitId(isExpanded ? null : unit.id)}
                className="w-full text-left p-5 flex items-center justify-between gap-4 hover:bg-slate-800/40 transition-colors cursor-pointer"
              >
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      Nivel {unit.level}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-white">
                      {unit.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-400">{unit.subtitle}</p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="hidden sm:inline-block text-xs font-semibold px-3 py-1 rounded-full bg-slate-800 text-slate-300">
                    {unitExercises.length} ejercicios
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-indigo-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  )}
                </div>
              </button>

              {/* Expanded Unit Content */}
              {isExpanded && (
                <div className="p-5 pt-0 border-t border-slate-800/80 space-y-5">
                  {/* ==================== 1. EN CRISTIANO: EXPLICACIÓN SIN RODEOS ==================== */}
                  {plainInfo && (
                    <div className="mt-4 bg-gradient-to-br from-amber-950/25 via-slate-950 to-indigo-950/25 border border-amber-500/30 rounded-2xl p-4 sm:p-5 space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-500/20 pb-3">
                        <div className="flex items-center gap-2 text-amber-300 font-bold text-sm sm:text-base">
                          <Coffee className="w-4 h-4 text-amber-400 shrink-0" />
                          <span>¿De qué va esto en cristiano? (Sin palabros raros)</span>
                        </div>
                        {plainInfo.mentalTrick && (
                          <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                            <Zap className="w-3.5 h-3.5 text-amber-400" />
                            Truco mental de 5 seg
                          </span>
                        )}
                      </div>

                      {/* Explicación en lenguaje directo */}
                      <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                        {plainInfo.inPlainSpanish}
                      </p>

                      {/* Comparativa Español vs Inglés */}
                      {plainInfo.spanishParallel && (
                        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 sm:p-4 text-xs sm:text-sm space-y-1.5">
                          <div className="text-indigo-300 font-bold flex items-center gap-1.5">
                            <HelpCircle className="w-4 h-4 text-indigo-400 shrink-0" />
                            <span>Cómo piensa tu mente en español vs. Cómo lo ven ellos en inglés:</span>
                          </div>
                          <p className="text-slate-300 leading-relaxed">
                            {plainInfo.spanishParallel}
                          </p>
                        </div>
                      )}

                      {/* Truco mental mnemotécnico */}
                      {plainInfo.mentalTrick && (
                        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 sm:p-3.5 flex items-start gap-2.5 text-xs sm:text-sm">
                          <Zap className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                          <div className="text-amber-100">
                            <strong className="text-amber-300 font-bold block sm:inline mr-1">
                              Fórmula mnemotécnica rápida:
                            </strong>
                            <span>{plainInfo.mentalTrick}</span>
                          </div>
                        </div>
                      )}

                      {/* Casos cotidianos desglosados (Street Examples) */}
                      {plainInfo.streetExamples && plainInfo.streetExamples.length > 0 && (
                        <div className="space-y-2.5 pt-1">
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                            📱 Situaciones reales de la calle (Paso a paso):
                          </span>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {plainInfo.streetExamples.map((item, idx) => (
                              <div
                                key={idx}
                                className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 space-y-2 flex flex-col justify-between"
                              >
                                <div>
                                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider pb-1 border-b border-slate-800/60 mb-2">
                                    {item.situation}
                                  </div>
                                  <div className="space-y-1.5">
                                    <div className="text-xs text-slate-300">
                                      <span className="text-rose-400 font-bold mr-1">🇪🇸 En español:</span>
                                      <em>«{item.howYouSayItInSpanish}»</em>
                                    </div>
                                    <div className="text-xs text-emerald-300 font-semibold">
                                      <span className="text-emerald-400 font-bold mr-1">🇬🇧 En inglés:</span>
                                      {item.howEnglishBuildsIt}
                                    </div>
                                  </div>
                                </div>
                                <div className="text-[11px] text-slate-400 border-t border-slate-800/60 pt-2 flex items-start gap-1">
                                  <ArrowRight className="w-3 h-3 text-indigo-400 shrink-0 mt-0.5" />
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
                  <div className="bg-slate-950 border border-indigo-500/20 rounded-xl p-3.5 sm:p-4">
                    <span className="text-xs uppercase tracking-wider font-bold text-indigo-400 block mb-1">
                      📐 Estructura / Fórmula Gramatical Oficial:
                    </span>
                    <p className="font-mono text-xs sm:text-sm text-white font-semibold">
                      {unit.formula}
                    </p>
                  </div>

                  {/* ==================== 3. CUÁNDO USARLO & TRAMPAS ==================== */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                        ✅ Cuándo y cómo usarlo
                      </h4>
                      <ul className="space-y-2 text-xs sm:text-sm text-slate-200">
                        {unit.whenToUse.map((rule, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-emerald-400 font-bold">•</span>
                            <span>{rule}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Spanish Speaker Traps */}
                    <div className="bg-rose-950/20 border border-rose-500/30 rounded-xl p-4 space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-rose-300 flex items-center gap-1.5">
                        <AlertOctagon className="w-4 h-4 text-rose-400" />
                        Trampas Mortales para Hispanohablantes
                      </h4>
                      {unit.spanishSpeakerTraps.map((trap, i) => (
                        <div key={i} className="text-xs sm:text-sm space-y-1 bg-slate-950/80 p-3 rounded-lg border border-slate-800">
                          <p className="text-rose-300 line-through">❌ {trap.wrong}</p>
                          <p className="text-emerald-300 font-semibold flex items-center gap-1">
                            <CheckCircle className="w-3.5 h-3.5 shrink-0" /> {trap.right}
                          </p>
                          <p className="text-slate-400 text-xs pt-0.5">{trap.why}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* ==================== 4. EJEMPLOS & TRUCOS DE EXAMEN ==================== */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-4 space-y-2.5">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Ejemplos adicionales de examen
                      </h4>
                      {unit.examples.map((ex, i) => (
                        <div key={i} className="text-xs sm:text-sm border-l-2 border-indigo-500 pl-3 py-0.5">
                          <p className="text-white font-medium">{ex.en}</p>
                          <p className="text-slate-400 text-xs">{ex.es}</p>
                        </div>
                      ))}
                    </div>

                    <div className="bg-amber-950/20 border border-amber-500/30 rounded-xl p-4 space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                        <Lightbulb className="w-4 h-4 text-amber-400" />
                        Trucos de Examen (Key Word Transformation)
                      </h4>
                      <ul className="space-y-1.5 text-xs sm:text-sm text-amber-100/90">
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
                      className="w-full sm:w-auto px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 transition-all cursor-pointer"
                    >
                      <Dumbbell className="w-4 h-4" />
                      {isPracticing
                        ? 'Ocultar ejercicios de este tema'
                        : `Practicar ahora este tema (${unitExercises.length} ejercicios)`}
                    </button>

                    {isPracticing && currentEx && (
                      <div className="mt-4 pt-4 border-t border-slate-800">
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
