import React, { useState, useMemo } from 'react';
import { Level, Exercise } from '../types';
import {
  PHRASAL_VERBS_LIST,
  PARTICLE_LOGIC_GUIDE,
  CURATED_PHRASAL_EXERCISES
} from '../data/phrasalVerbsData';
import { ExerciseCard } from './ExerciseCard';
import {
  Rocket,
  Search,
  Bookmark,
  Dumbbell,
  Compass,
  BookOpen,
  Shuffle
} from 'lucide-react';

interface PhrasalVerbsZoneProps {
  bookmarkedIds: string[];
  onToggleBookmark: (id: string) => void;
  onExerciseAttempt: (exercise: Exercise, isCorrect: boolean, forceAddToVault?: boolean) => void;
}

const LEVELS: (Level | 'ALL')[] = ['ALL', 'A2+', 'B1', 'B1+', 'B2', 'B2+'];

export const PhrasalVerbsZone: React.FC<PhrasalVerbsZoneProps> = ({
  bookmarkedIds,
  onToggleBookmark,
  onExerciseAttempt
}) => {
  const [subTab, setSubTab] = useState<'drill' | 'explorer' | 'particles'>('drill');
  const [selectedLevel, setSelectedLevel] = useState<Level | 'ALL'>('ALL');
  const [drillFormat, setDrillFormat] = useState<'all' | 'particle' | 'formal' | 'bookmarked'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyBookmarked, setOnlyBookmarked] = useState(false);
  const [currentExIdx, setCurrentExIdx] = useState(0);

  // Construimos un banco masivo combinando los ejercicios curados + ejercicios generados de cada Phrasal Verb
  const dynamicPhrasalExercises = useMemo(() => {
    const generated: Exercise[] = [];

    PHRASAL_VERBS_LIST.forEach((pv) => {
      // 1) Ejercicio de completar la partícula en la frase de ejemplo
      const exSentence = pv.examples[0]?.en || '';
      const particleRegex = new RegExp(`\\b${pv.particle}\\b`, 'i');
      const gappedSentence = particleRegex.test(exSentence)
        ? exSentence.replace(particleRegex, '___')
        : `${pv.baseVerb} ___ (${pv.meaningEs})`;

      generated.push({
        id: `pv-dyn-part-${pv.id}`,
        level: pv.level,
        category: 'phrasal_verbs',
        topicLabel: `Partícula de "${pv.baseVerb.toUpperCase()}"`,
        type: 'cloze',
        prompt: `Escribe la partícula exacta que completa el Phrasal Verb (${pv.baseVerb} + ___):`,
        baseSentence: gappedSentence,
        spanishHint: `${pv.examples[0]?.es || pv.meaningEs}`,
        acceptedAnswers: [pv.particle, pv.verb],
        explanation: `"${pv.verb}" (${pv.meaningEs}). Truco: ${pv.memoryTrick}`,
        grammarRule: `${pv.verb} = ${pv.formalEquivalent}`
      });

      // 2) Ejercicio de sustituir el equivalente formal por el Phrasal Verb
      generated.push({
        id: `pv-dyn-formal-${pv.id}`,
        level: pv.level,
        category: 'phrasal_verbs',
        topicLabel: 'Verbo Formal → Phrasal Verb',
        type: 'transformation',
        prompt: 'Escribe el Phrasal Verb (en infinitivo) que equivale a este verbo formal y significado:',
        baseSentence: `Formal equivalent: "${pv.formalEquivalent}" — Significado: ${pv.meaningEs}`,
        keyWord: pv.baseVerb.toUpperCase(),
        spanishHint: `Ejemplo: "${pv.examples[0]?.es}"`,
        acceptedAnswers: [pv.verb, pv.verb.replace(' someone ', ' ')],
        explanation: `"${pv.formalEquivalent}" equivale al Phrasal Verb "${pv.verb}". ${pv.memoryTrick}`,
        grammarRule: `${pv.formalEquivalent} = ${pv.verb}`
      });
    });

    return [...CURATED_PHRASAL_EXERCISES, ...generated];
  }, []);

  const filteredDrillPool = useMemo(() => {
    return dynamicPhrasalExercises.filter((ex) => {
      if (selectedLevel !== 'ALL' && ex.level !== selectedLevel) return false;
      if (drillFormat === 'particle' && !ex.id.startsWith('pv-dyn-part-')) return false;
      if (drillFormat === 'formal' && !ex.id.startsWith('pv-dyn-formal-')) return false;
      if (drillFormat === 'bookmarked') {
        const matchBookmark = bookmarkedIds.some((bId) => ex.id.includes(bId));
        if (!matchBookmark) return false;
      }
      return true;
    });
  }, [dynamicPhrasalExercises, selectedLevel, drillFormat, bookmarkedIds]);

  const filteredExplorerList = useMemo(() => {
    return PHRASAL_VERBS_LIST.filter((pv) => {
      if (selectedLevel !== 'ALL' && pv.level !== selectedLevel) return false;
      if (onlyBookmarked && !bookmarkedIds.includes(pv.id)) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          pv.verb.toLowerCase().includes(q) ||
          pv.meaningEs.toLowerCase().includes(q) ||
          pv.formalEquivalent.toLowerCase().includes(q) ||
          pv.particle.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [selectedLevel, onlyBookmarked, bookmarkedIds, searchQuery]);

  const currentExercise =
    filteredDrillPool[currentExIdx % Math.max(1, filteredDrillPool.length)];

  return (
    <div className="space-y-6">
      {/* Sub-navigation Header */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Rocket className="w-5 h-5 text-amber-400" />
            Zona Intensiva de Phrasal Verbs (A2+ → B2+)
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Domina las partículas por lógica, busca equivalentes formales y machaca decenas de ejercicios.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setSubTab('drill')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer transition-all ${
              subTab === 'drill'
                ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Dumbbell className="w-4 h-4" />
            Ejercicios de Phrasal Verbs ({filteredDrillPool.length})
          </button>

          <button
            type="button"
            onClick={() => setSubTab('explorer')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer transition-all ${
              subTab === 'explorer'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Diccionario y Mis Difíciles ({PHRASAL_VERBS_LIST.length})
          </button>

          <button
            type="button"
            onClick={() => setSubTab('particles')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer transition-all ${
              subTab === 'particles'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Compass className="w-4 h-4" />
            Lógica de las Partículas
          </button>
        </div>
      </div>

      {/* Level Filter Bar (for Drill & Explorer) */}
      {subTab !== 'particles' && (
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            {LEVELS.map((lvl) => (
              <button
                key={lvl}
                type="button"
                onClick={() => {
                  setSelectedLevel(lvl);
                  setCurrentExIdx(0);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedLevel === lvl
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {lvl === 'ALL' ? 'Todos los Niveles' : `Nivel ${lvl}`}
              </button>
            ))}
          </div>

          {subTab === 'drill' && (
            <div className="flex flex-wrap items-center gap-2">
              <select
                value={drillFormat}
                onChange={(e) => {
                  setDrillFormat(e.target.value as 'all' | 'particle' | 'formal' | 'bookmarked');
                  setCurrentExIdx(0);
                }}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-200 outline-none"
              >
                <option value="all">Modo Mixto Completo (Transformaciones + Partículas + Equivalentes)</option>
                <option value="particle">Solo Rellenar la Partícula (up / down / out / off...)</option>
                <option value="formal">Solo Verbo Formal → Phrasal Verb (postpone → put off)</option>
                <option value="bookmarked">Solo Mis Phrasal Verbs Guardados ({bookmarkedIds.length})</option>
              </select>

              <button
                type="button"
                onClick={() =>
                  setCurrentExIdx(Math.floor(Math.random() * Math.max(1, filteredDrillPool.length)))
                }
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 flex items-center gap-1.5 cursor-pointer"
              >
                <Shuffle className="w-3.5 h-3.5" />
                Mezclar
              </button>
            </div>
          )}
        </div>
      )}

      {/* TAB 1: PHRASAL VERB DRILL */}
      {subTab === 'drill' && (
        <div>
          {currentExercise ? (
            <ExerciseCard
              exercise={currentExercise}
              onAttempt={onExerciseAttempt}
              onNext={() => setCurrentExIdx((i) => i + 1)}
              indexLabel={`Phrasal Verb Drill ${(currentExIdx % filteredDrillPool.length) + 1} / ${filteredDrillPool.length}`}
            />
          ) : (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-3">
              <p className="text-slate-300 font-medium">
                No hay Phrasal Verbs marcados en este filtro todavía.
              </p>
              <button
                type="button"
                onClick={() => setDrillFormat('all')}
                className="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl cursor-pointer"
              >
                Ver todos los ejercicios de Phrasal Verbs
              </button>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: PHRASAL VERBS EXPLORER */}
      {subTab === 'explorer' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por verbo (put, take, get...), partícula (up, off), significado en español o equivalente..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white outline-none focus:border-indigo-500"
              />
            </div>

            <button
              type="button"
              onClick={() => setOnlyBookmarked(!onlyBookmarked)}
              className={`px-4 py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 border cursor-pointer ${
                onlyBookmarked
                  ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                  : 'bg-slate-900 border-slate-800 text-slate-300'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              Solo Mis Guardados ({bookmarkedIds.length})
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredExplorerList.map((pv) => {
              const isSaved = bookmarkedIds.includes(pv.id);
              return (
                <div
                  key={pv.id}
                  className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between gap-3 hover:border-slate-700 transition-all"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-extrabold text-amber-300">
                            {pv.verb}
                          </span>
                          <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
                            {pv.level}
                          </span>
                          <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                            {pv.separable ? 'Separable' : 'Inseparable'}
                          </span>
                        </div>
                        <p className="text-sm font-semibold text-white mt-1">
                          {pv.meaningEs}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => onToggleBookmark(pv.id)}
                        title="Guardar para repasar"
                        className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                          isSaved
                            ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                            : 'bg-slate-800/70 border-slate-700 text-slate-400 hover:text-white'
                        }`}
                      >
                        <Bookmark className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-xs text-indigo-300 font-mono mt-2">
                      🎓 Equivalente formal: <strong>{pv.formalEquivalent}</strong>
                    </p>

                    <div className="mt-3 space-y-1.5 bg-slate-950/70 p-3 rounded-xl border border-slate-800/80">
                      {pv.examples.map((ex, i) => (
                        <div key={i} className="text-xs sm:text-sm">
                          <p className="text-slate-100 font-medium">• "{ex.en}"</p>
                          <p className="text-slate-400 text-xs">{ex.es}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="text-xs bg-emerald-950/25 border border-emerald-500/25 text-emerald-200 px-3 py-2 rounded-lg">
                    💡 <strong>Truco mental:</strong> {pv.memoryTrick}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: PARTICLE LOGIC GUIDE */}
      {subTab === 'particles' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PARTICLE_LOGIC_GUIDE.map((item) => (
            <div
              key={item.particle}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3"
            >
              <div className="flex items-center gap-3">
                <span className="px-3.5 py-1.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 font-extrabold text-base">
                  {item.particle}
                </span>
                <h3 className="font-bold text-white text-sm sm:text-base">
                  {item.coreMeaning}
                </h3>
              </div>

              <ul className="space-y-2 text-xs sm:text-sm text-slate-300 bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
                {item.examples.map((ex, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">→</span>
                    <span>{ex}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
