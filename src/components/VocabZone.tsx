import React, { useState, useMemo } from 'react';
import { Level, Exercise } from '../types';
import { VOCABULARY_ITEMS, CURATED_VOCAB_EXERCISES } from '../data/vocabularyData';
import { getAllStaticExercises } from '../data/infiniteGenerator';
import { ExerciseCard } from './ExerciseCard';
import {
  Brain,
  Dumbbell,
  BookMarked,
  AlertCircle,
  Eye,
  EyeOff
} from 'lucide-react';

interface VocabZoneProps {
  onExerciseAttempt: (exercise: Exercise, isCorrect: boolean, forceAddToVault?: boolean) => void;
}

const LEVELS: (Level | 'ALL')[] = ['ALL', 'A2+', 'B1', 'B1+', 'B2', 'B2+'];

const CAT_LABELS: Record<string, string> = {
  ALL: 'Todas las áreas',
  confusing_words: 'Confusing Words & False Friends',
  collocations: 'Collocations (Make/Do & Adverbios B2)',
  prepositions: 'Preposiciones Dependientes (ON/IN/OF/FOR)',
  connectors: 'Conectores y Linkers (B1-B2+)',
  word_formation: 'Word Formation (Familias de palabras)'
};

export const VocabZone: React.FC<VocabZoneProps> = ({ onExerciseAttempt }) => {
  const [mode, setMode] = useState<'study' | 'drill'>('study');
  const [selectedLevel, setSelectedLevel] = useState<Level | 'ALL'>('ALL');
  const [selectedCat, setSelectedCat] = useState<string>('ALL');
  const [hideTerms, setHideTerms] = useState(false);
  const [revealedIds, setRevealedIds] = useState<string[]>([]);
  const [exIdx, setExIdx] = useState(0);

  const vocabDrillPool = useMemo(() => {
    const all = getAllStaticExercises().filter((e) =>
      ['vocabulary', 'word_formation', 'prepositions', 'connectors'].includes(e.category)
    );
    return all.length > 0 ? all : CURATED_VOCAB_EXERCISES;
  }, []);

  const filteredItems = VOCABULARY_ITEMS.filter((item) => {
    if (selectedLevel !== 'ALL' && item.level !== selectedLevel) return false;
    if (selectedCat !== 'ALL' && item.category !== selectedCat) return false;
    return true;
  });

  const filteredExercises = vocabDrillPool.filter(
    (e) => selectedLevel === 'ALL' || e.level === selectedLevel
  );

  const currentEx =
    filteredExercises[exIdx % Math.max(1, filteredExercises.length)];

  const toggleReveal = (id: string) => {
    setRevealedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Brain className="w-5 h-5 text-emerald-400" />
            Vocabulario, Collocations, Preposiciones y Word Formation
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Fija las estructuras léxicas que marcan la diferencia entre A2+, B1 y B2 Advanced.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setMode('study')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer ${
              mode === 'study'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <BookMarked className="w-4 h-4" />
            Tarjetas de Estudio Activo ({filteredItems.length})
          </button>

          <button
            type="button"
            onClick={() => setMode('drill')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer ${
              mode === 'drill'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Dumbbell className="w-4 h-4" />
            Ejercicios de Léxico, Preposiciones y Raíces ({filteredExercises.length})
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          {LEVELS.map((lvl) => (
            <button
              key={lvl}
              type="button"
              onClick={() => {
                setSelectedLevel(lvl);
                setExIdx(0);
              }}
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

        {mode === 'study' && (
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={selectedCat}
              onChange={(e) => setSelectedCat(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-200 outline-none"
            >
              {Object.entries(CAT_LABELS).map(([k, v]) => (
                <option key={k} value={k}>
                  {v}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={() => {
                setHideTerms(!hideTerms);
                setRevealedIds([]);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border cursor-pointer ${
                hideTerms
                  ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                  : 'bg-slate-800 border-slate-700 text-slate-300'
              }`}
            >
              {hideTerms ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              {hideTerms ? 'Mostrar Términos en Inglés' : 'Modo Autoevaluación (Ocultar Inglés)'}
            </button>
          </div>
        )}
      </div>

      {/* Mode 1: Study Cards */}
      {mode === 'study' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredItems.map((item) => {
            const isHidden = hideTerms && !revealedIds.includes(item.id);
            return (
              <div
                key={item.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between gap-3"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
                      Nivel {item.level}
                    </span>
                    <span className="text-xs text-slate-400 font-semibold">
                      {CAT_LABELS[item.category]}
                    </span>
                  </div>

                  {isHidden ? (
                    <button
                      type="button"
                      onClick={() => toggleReveal(item.id)}
                      className="w-full py-2.5 px-4 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-bold text-sm text-left cursor-pointer"
                    >
                      👁️ Pulsa para comprobar el término en inglés...
                    </button>
                  ) : (
                    <h3 className="text-lg font-extrabold text-white">
                      {item.term}
                    </h3>
                  )}

                  <p className="text-sm font-semibold text-emerald-300">
                    {item.meaningEs}
                  </p>

                  {/* Word Formation Family Table if present */}
                  {item.rootFamily && !isHidden && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs">
                      {item.rootFamily.noun && (
                        <div>
                          <span className="text-slate-500 block">Sustantivo:</span>
                          <strong className="text-white">{item.rootFamily.noun}</strong>
                        </div>
                      )}
                      {item.rootFamily.verb && (
                        <div>
                          <span className="text-slate-500 block">Verbo:</span>
                          <strong className="text-white">{item.rootFamily.verb}</strong>
                        </div>
                      )}
                      {item.rootFamily.adjective && (
                        <div>
                          <span className="text-slate-500 block">Adjetivo (+):</span>
                          <strong className="text-emerald-300">{item.rootFamily.adjective}</strong>
                        </div>
                      )}
                      {item.rootFamily.negative && (
                        <div>
                          <span className="text-slate-500 block">Negativo (-):</span>
                          <strong className="text-rose-300">{item.rootFamily.negative}</strong>
                        </div>
                      )}
                      {item.rootFamily.adverb && (
                        <div>
                          <span className="text-slate-500 block">Adverbio:</span>
                          <strong className="text-amber-300">{item.rootFamily.adverb}</strong>
                        </div>
                      )}
                    </div>
                  )}

                  {!isHidden && (
                    <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800/80 text-xs sm:text-sm space-y-1">
                      <p className="text-slate-100 font-medium">"{item.contextExample}"</p>
                      <p className="text-slate-400 text-xs">{item.contextTranslation}</p>
                    </div>
                  )}
                </div>

                {item.commonMistake && (
                  <div className="flex items-start gap-2 text-xs bg-rose-950/25 border border-rose-500/25 text-rose-200 px-3 py-2 rounded-lg">
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <span>{item.commonMistake}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Mode 2: Drill */}
      {mode === 'drill' && currentEx && (
        <ExerciseCard
          exercise={currentEx}
          onAttempt={onExerciseAttempt}
          onNext={() => setExIdx((i) => i + 1)}
          indexLabel={`Ejercicio Léxico ${(exIdx % filteredExercises.length) + 1} / ${filteredExercises.length}`}
        />
      )}
    </div>
  );
};
