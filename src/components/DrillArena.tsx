import React, { useState, useMemo } from 'react';
import {
  Exercise,
  Level,
  ExerciseCategory,
  ExerciseType,
  MistakeRecord
} from '../types';
import {
  getAllStaticExercises,
  generateProceduralVariation
} from '../data/infiniteGenerator';
import {
  loadCustomAIExercises,
  appendCustomAIExercises
} from '../services/storageService';
import { generateAIExercisesBatch } from '../services/aiService';
import { ExerciseCard } from './ExerciseCard';
import {
  Flame,
  RefreshCw,
  Filter,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Shuffle,
  Cpu,
  Trash2
} from 'lucide-react';

interface DrillArenaProps {
  mistakes: MistakeRecord[];
  onExerciseAttempt: (exercise: Exercise, isCorrect: boolean, forceAddToVault?: boolean) => void;
  onClearMasteredMistakes: () => void;
  initialLevel?: Level | 'ALL';
  initialTopicId?: string | null;
}

const LEVELS: (Level | 'ALL')[] = ['ALL', 'A2+', 'B1', 'B1+', 'B2', 'B2+'];

const CATEGORIES: { id: ExerciseCategory | 'ALL'; label: string }[] = [
  { id: 'ALL', label: 'Todas las categorías' },
  { id: 'grammar', label: 'Gramática Pura' },
  { id: 'phrasal_verbs', label: 'Phrasal Verbs' },
  { id: 'word_formation', label: 'Word Formation (Raíces)' },
  { id: 'prepositions', label: 'Preposiciones Dependientes' },
  { id: 'connectors', label: 'Conectores B1-B2+' },
  { id: 'vocabulary', label: 'Vocabulario & Trampas' }
];

const TYPES: { id: ExerciseType | 'ALL'; label: string }[] = [
  { id: 'ALL', label: 'Todos los formatos' },
  { id: 'transformation', label: 'Key Word Transformation' },
  { id: 'cloze', label: 'Rellenar Hueco (Cloze)' },
  { id: 'error_correction', label: 'Caza y Corrige el Error' },
  { id: 'translation', label: 'Traducción Inversa (ES → EN)' },
  { id: 'word_formation', label: 'Word Formation' }
];

export const DrillArena: React.FC<DrillArenaProps> = ({
  mistakes,
  onExerciseAttempt,
  onClearMasteredMistakes,
  initialLevel = 'ALL',
  initialTopicId = null
}) => {
  const [drillMode, setDrillMode] = useState<'infinite' | 'mistakes' | 'ai_generator'>('infinite');
  const [selectedLevel, setSelectedLevel] = useState<Level | 'ALL'>(initialLevel);
  const [selectedCategory, setSelectedCategory] = useState<ExerciseCategory | 'ALL'>('ALL');
  const [selectedType, setSelectedType] = useState<ExerciseType | 'ALL'>('ALL');
  const [topicFilter, setTopicFilter] = useState<string | null>(initialTopicId);

  const [customBank, setCustomBank] = useState<Exercise[]>(() => loadCustomAIExercises());
  const [proceduralExtras, setProceduralExtras] = useState<Exercise[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [streak, setStreak] = useState(0);
  const [sessionDone, setSessionDone] = useState(0);
  const [sessionRight, setSessionRight] = useState(0);

  // Estado para el Generador IA
  const [aiLevel, setAiLevel] = useState<Level>('B2');
  const [aiCategory, setAiCategory] = useState<ExerciseCategory>('grammar');
  const [aiCustomFocus, setAiCustomFocus] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const staticBank = useMemo(() => getAllStaticExercises(), []);

  const filteredPool = useMemo(() => {
    const all = [...proceduralExtras, ...customBank, ...staticBank];
    return all.filter((ex) => {
      if (topicFilter && ex.topicId !== topicFilter) return false;
      if (selectedLevel !== 'ALL' && ex.level !== selectedLevel) return false;
      if (selectedCategory !== 'ALL' && ex.category !== selectedCategory) return false;
      if (selectedType !== 'ALL' && ex.type !== selectedType) return false;
      return true;
    });
  }, [staticBank, customBank, proceduralExtras, selectedLevel, selectedCategory, selectedType, topicFilter]);

  const activeMistakes = useMemo(
    () => mistakes.filter((m) => !m.mastered),
    [mistakes]
  );

  const currentExercise =
    drillMode === 'mistakes'
      ? activeMistakes[currentIndex % Math.max(1, activeMistakes.length)]?.exercise
      : filteredPool[currentIndex % Math.max(1, filteredPool.length)];

  const handleAttempt = (ex: Exercise, isCorrect: boolean, forceAddToVault?: boolean) => {
    onExerciseAttempt(ex, isCorrect, forceAddToVault);
    if (!forceAddToVault) {
      setSessionDone((d) => d + 1);
      if (isCorrect) {
        setSessionRight((r) => r + 1);
        setStreak((s) => s + 1);
      } else {
        setStreak(0);
      }
    }
  };

  const handleNext = () => {
    if (drillMode === 'infinite' && currentIndex + 1 >= filteredPool.length) {
      // Generar automáticamente un nuevo ejercicio procedural para que nunca se acaben
      const fresh = generateProceduralVariation(selectedLevel, selectedCategory);
      setProceduralExtras((prev) => [fresh, ...prev]);
      setCurrentIndex(0);
    } else {
      setCurrentIndex((i) => i + 1);
    }
  };

  const handleShuffle = () => {
    const poolLen = drillMode === 'mistakes' ? activeMistakes.length : filteredPool.length;
    if (poolLen > 1) {
      const nextIdx = Math.floor(Math.random() * poolLen);
      setCurrentIndex(nextIdx === currentIndex ? (currentIndex + 1) % poolLen : nextIdx);
    }
  };

  const handleSpawnProceduralNow = () => {
    const fresh = generateProceduralVariation(selectedLevel, selectedCategory);
    setProceduralExtras((prev) => [fresh, ...prev]);
    setTopicFilter(null);
    setSelectedType('ALL');
    setCurrentIndex(0);
  };

  const handleGenerateAIBatch = async (e: React.FormEvent) => {
    e.preventDefault();
    setAiLoading(true);
    setAiError(null);
    try {
      const batch = await generateAIExercisesBatch(aiLevel, aiCategory, aiCustomFocus, 5);
      const updated = appendCustomAIExercises(batch);
      setCustomBank(updated);
      setSelectedLevel(aiLevel);
      setSelectedCategory(aiCategory);
      setSelectedType('ALL');
      setTopicFilter(null);
      setDrillMode('infinite');
      setCurrentIndex(0);
    } catch (err: unknown) {
      setAiError(err instanceof Error ? err.message : 'Error generando ejercicios con IA.');
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Mode Switcher & Session Counter */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => {
              setDrillMode('infinite');
              setCurrentIndex(0);
            }}
            className={`px-4 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all cursor-pointer ${
              drillMode === 'infinite'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Flame className="w-4 h-4 text-amber-300" />
            Práctica Infinita ({filteredPool.length} en filtro)
          </button>

          <button
            type="button"
            onClick={() => {
              setDrillMode('mistakes');
              setCurrentIndex(0);
            }}
            className={`px-4 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all cursor-pointer ${
              drillMode === 'mistakes'
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <RefreshCw className="w-4 h-4" />
            Machacar Mis Fallos
            <span className="px-2 py-0.5 text-xs rounded-full bg-black/30">
              {activeMistakes.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setDrillMode('ai_generator')}
            className={`px-4 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all cursor-pointer ${
              drillMode === 'ai_generator'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Cpu className="w-4 h-4" />
            Crear Tanda IA a Medida
          </button>
        </div>

        {/* Mini Session Stats */}
        <div className="flex items-center gap-4 text-xs sm:text-sm bg-slate-950/80 px-4 py-2.5 rounded-xl border border-slate-800">
          <div>
            <span className="text-slate-400">Sesión hoy: </span>
            <strong className="text-white">{sessionDone} hechos</strong>
          </div>
          <div className="h-4 w-px bg-slate-800" />
          <div>
            <span className="text-slate-400">Precisión: </span>
            <strong className="text-emerald-400">
              {sessionDone > 0 ? Math.round((sessionRight / sessionDone) * 100) : 100}%
            </strong>
          </div>
        </div>
      </div>

      {/* Mode 1: Infinite Drill Filters & Card */}
      {drillMode === 'infinite' && (
        <>
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                <Filter className="w-3.5 h-3.5 text-indigo-400" />
                Filtra tu machaque (A2+ hasta B2+)
              </div>

              <div className="flex flex-wrap gap-2">
                {topicFilter && (
                  <button
                    type="button"
                    onClick={() => setTopicFilter(null)}
                    className="text-xs px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 cursor-pointer"
                  >
                    Quitar filtro de tema específico ✕
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleShuffle}
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1.5 cursor-pointer"
                >
                  <Shuffle className="w-3.5 h-3.5" />
                  Aleatorio
                </button>
                <button
                  type="button"
                  onClick={handleSpawnProceduralNow}
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  + Generar Variación Nueva
                </button>
              </div>
            </div>

            {/* Level Pills */}
            <div className="flex flex-wrap gap-1.5">
              {LEVELS.map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => {
                    setSelectedLevel(lvl);
                    setCurrentIndex(0);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedLevel === lvl
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-800/80 text-slate-400 hover:text-white'
                  }`}
                >
                  {lvl === 'ALL' ? 'Todos los Niveles' : `Nivel ${lvl}`}
                </button>
              ))}
            </div>

            {/* Category & Format Selects */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value as ExerciseCategory | 'ALL');
                  setCurrentIndex(0);
                }}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 outline-none focus:border-indigo-500"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>

              <select
                value={selectedType}
                onChange={(e) => {
                  setSelectedType(e.target.value as ExerciseType | 'ALL');
                  setCurrentIndex(0);
                }}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 outline-none focus:border-indigo-500"
              >
                {TYPES.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {currentExercise ? (
            <ExerciseCard
              exercise={currentExercise}
              onAttempt={handleAttempt}
              onNext={handleNext}
              indexLabel={`Ejercicio ${(currentIndex % filteredPool.length) + 1} de ${filteredPool.length}`}
              streakCount={streak}
            />
          ) : (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-3">
              <p className="text-slate-300 font-medium">
                No hay ejercicios con esta combinación exacta de filtros.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedLevel('ALL');
                  setSelectedCategory('ALL');
                  setSelectedType('ALL');
                  setTopicFilter(null);
                }}
                className="px-4 py-2 bg-indigo-600 text-white text-sm font-bold rounded-xl cursor-pointer"
              >
                Restablecer filtros
              </button>
            </div>
          )}
        </>
      )}

      {/* Mode 2: Mistake Vault (SRS) */}
      {drillMode === 'mistakes' && (
        <div className="space-y-4">
          <div className="bg-rose-950/20 border border-rose-500/30 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-rose-200 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-rose-400" />
                Cámara de Repetición Espaciada (Tus Fallos)
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                Cada ejercicio que fallas se guarda aquí. Debes acertarlo <strong>3 veces seguidas</strong> en momentos distintos para que se marque como Dominado.
              </p>
            </div>
            {mistakes.some((m) => m.mastered) && (
              <button
                type="button"
                onClick={onClearMasteredMistakes}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 flex items-center gap-1.5 shrink-0 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                Limpiar ya dominados
              </button>
            )}
          </div>

          {activeMistakes.length > 0 && currentExercise ? (
            <>
              <div className="flex items-center justify-between text-xs text-slate-400 px-1">
                <span>
                  Repasando fallo {(currentIndex % activeMistakes.length) + 1} de {activeMistakes.length}
                </span>
                <span className="text-amber-300 font-semibold">
                  Aciertos consecutivos en este ítem:{' '}
                  {activeMistakes[currentIndex % activeMistakes.length]?.consecutiveCorrect || 0} / 3
                </span>
              </div>
              <ExerciseCard
                exercise={currentExercise}
                onAttempt={handleAttempt}
                onNext={() => setCurrentIndex((i) => i + 1)}
                indexLabel={`Repetición #${(currentIndex % activeMistakes.length) + 1}`}
              />
            </>
          ) : (
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-8 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h4 className="text-lg font-bold text-white">
                ¡Tienes tu lista de fallos limpia ahora mismo!
              </h4>
              <p className="text-sm text-slate-400 max-w-md mx-auto">
                Cuando falles un ejercicio en cualquier zona o pulses el botón "Forzar Repetición", aparecerá aquí para que puedas machacarlo hasta dominarlo.
              </p>
              <button
                type="button"
                onClick={() => setDrillMode('infinite')}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold rounded-xl cursor-pointer"
              >
                Volver a Práctica Infinita
              </button>
            </div>
          )}
        </div>
      )}

      {/* Mode 3: Custom AI Batch Generator */}
      {drillMode === 'ai_generator' && (
        <form
          onSubmit={handleGenerateAIBatch}
          className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4"
        >
          <div className="flex items-center gap-2.5">
            <Cpu className="w-6 h-6 text-purple-400" />
            <div>
              <h3 className="text-lg font-bold text-white">
                Generador de Ejercicios Infinitos con IA (Híbrido)
              </h3>
              <p className="text-xs sm:text-sm text-slate-400">
                Pide 5 ejercicios nuevos sobre cualquier punto gramatical, phrasal verb o transformación y se guardarán permanentemente en tu banco.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">
                Nivel Objetivo
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
                <option value="B2+">B2+ (B2 Advanced / Pre-C1)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">
                Categoría Principal
              </label>
              <select
                value={aiCategory}
                onChange={(e) => setAiCategory(e.target.value as ExerciseCategory)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white text-sm"
              >
                <option value="grammar">Gramática & Key Word Transformations</option>
                <option value="phrasal_verbs">Phrasal Verbs en Contexto</option>
                <option value="word_formation">Word Formation (Raíces)</option>
                <option value="prepositions">Preposiciones Dependientes</option>
                <option value="connectors">Conectores y Linkers</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">
              ¿Qué quieres machacar exactamente? (Opcional)
            </label>
            <input
              type="text"
              value={aiCustomFocus}
              onChange={(e) => setAiCustomFocus(e.target.value)}
              placeholder="Ej: Inversiones con No sooner y Hardly, o Phrasal verbs con GET y PUT, o Third Conditional..."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-purple-500"
            />
          </div>

          {aiError && (
            <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-200 text-xs sm:text-sm">
              {aiError}
            </div>
          )}

          <button
            type="submit"
            disabled={aiLoading}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-bold rounded-xl shadow-lg shadow-purple-600/25 flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            {aiLoading ? 'Generando 5 ejercicios nuevos...' : 'Generar 5 Ejercicios y Empezar a Hacerlos'}
          </button>
        </form>
      )}
    </div>
  );
};
