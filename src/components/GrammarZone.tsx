import React, { useState } from 'react';
import { Level, Exercise } from '../types';
import { GRAMMAR_UNITS, CURATED_GRAMMAR_EXERCISES } from '../data/grammarData';
import { getAllStaticExercises } from '../data/infiniteGenerator';
import { ExerciseCard } from './ExerciseCard';
import {
  BookOpen,
  AlertOctagon,
  CheckCircle,
  Dumbbell,
  ChevronDown,
  ChevronUp,
  Lightbulb
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
    if (direct.length > 0) return direct;
    return CURATED_GRAMMAR_EXERCISES.filter((e) => e.level === unitLevel);
  };

  return (
    <div className="space-y-6">
      {/* Header & Level Selector */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-400" />
            Guía Gramatical al Grano + Ejercicios por Tema (A2+ → B2+)
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Fórmulas directas, errores típicos de hispanohablantes y práctica inmediata debajo de cada unidad.
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {LEVELS.map((lvl) => (
            <button
              key={lvl}
              type="button"
              onClick={() => setSelectedLevel(lvl)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedLevel === lvl
                  ? 'bg-indigo-600 text-white'
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

          return (
            <div
              key={unit.id}
              className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden transition-all"
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
                    <ChevronUp className="w-5 h-5 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  )}
                </div>
              </button>

              {/* Expanded Unit Content */}
              {isExpanded && (
                <div className="p-5 pt-0 border-t border-slate-800/80 space-y-5">
                  {/* Formula Box */}
                  <div className="mt-4 bg-slate-950 border border-indigo-500/30 rounded-xl p-4">
                    <span className="text-xs uppercase tracking-wider font-bold text-indigo-400 block mb-1">
                      📐 Estructura / Fórmula Gramatical:
                    </span>
                    <p className="font-mono text-sm sm:text-base text-white font-semibold">
                      {unit.formula}
                    </p>
                  </div>

                  {/* When to use */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                        ✅ Cuándo y cómo usarlo
                      </h4>
                      <ul className="space-y-2 text-sm text-slate-200">
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

                  {/* Examples & Exam Tips */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-4 space-y-2.5">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Ejemplos en contexto
                      </h4>
                      {unit.examples.map((ex, i) => (
                        <div key={i} className="text-sm border-l-2 border-indigo-500 pl-3 py-0.5">
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

                  {/* Toggle Embedded Practice */}
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
