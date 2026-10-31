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
  Trash2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface DrillArenaProps {
  mistakes: MistakeRecord[];
  onExerciseAttempt: (exercise: Exercise, isCorrect: boolean, forceAddToVault?: boolean) => void;
  onClearMasteredMistakes: () => void;
  initialLevel?: Level | 'ALL';
  initialTopicId?: string | null;
  onOpenSettings?: () => void;
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
  initialTopicId = null,
  onOpenSettings
}) => {
  const [drillMode, setDrillMode] = useState<'infinite' | 'mistakes' | 'ai_generator'>('infinite');
  const [selectedLevel, setSelectedLevel] = useState<Level | 'ALL'>(initialLevel);
  const [selectedCategory, setSelectedCategory] = useState<ExerciseCategory | 'ALL'>('ALL');
  const [selectedType, setSelectedType] = useState<ExerciseType | 'ALL'>('ALL');
  const [topicFilter, setTopicFilter] = useState<string | null>(initialTopicId);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const [customBank, setCustomBank] = useState<Exercise[]>(() => loadCustomAIExercises());
  const [proceduralExtras, setProceduralExtras] = useState<Exercise[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [streak, setStreak] = useState(0);
  const [sessionDone, setSessionDone] = useState(0);
  const [sessionRight, setSessionRight] = useState(0);

  // Estado para el Generador IA
  const [aiLevel, setAiLevel] = useState<Level>('B1+');
  const [aiCategory, setAiCategory] = useState<ExerciseCategory>('grammar');
  const [aiCustomFocus, setAiCustomFocus] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  // Banco combinado: estáticos + generados en sesión + guardados IA
  const allExercises = useMemo(() => {
    const statics = getAllStaticExercises();
    return [...proceduralExtras, ...customBank, ...statics];
  }, [proceduralExtras, customBank]);

  // Fallos activos del usuario (no dominados)
  const activeMistakes = useMemo(() => {
    return mistakes.filter((m) => !m.mastered);
  }, [mistakes]);

  // Pool filtrado para el modo Infinite
  const filteredPool = useMemo(() => {
    return allExercises.filter((ex) => {
      if (selectedLevel !== 'ALL' && ex.level !== selectedLevel) return false;
      if (selectedCategory !== 'ALL' && ex.category !== selectedCategory) return false;
      if (selectedType !== 'ALL' && ex.type !== selectedType) return false;
      if (topicFilter && ex.topicId !== topicFilter) return false;
      return true;
    });
  }, [allExercises, selectedLevel, selectedCategory, selectedType, topicFilter]);

  // Ejercicio activo según el modo
  const currentExercise = useMemo<Exercise | null>(() => {
    if (drillMode === 'mistakes') {
      if (activeMistakes.length === 0) return null;
      const idx = currentIndex % activeMistakes.length;
      return activeMistakes[idx].exercise;
    }
    if (filteredPool.length === 0) return null;
    const idx = currentIndex % filteredPool.length;
    return filteredPool[idx];
  }, [drillMode, activeMistakes, filteredPool, currentIndex]);

  const handleAttempt = (
    exercise: Exercise,
    isCorrect: boolean,
    forceAddToVault = false
  ) => {
    setSessionDone((d) => d + 1);
    if (isCorrect) {
      setSessionRight((r) => r + 1);
      setStreak((s) => s + 1);
    } else {
      setStreak(0);
    }
    onExerciseAttempt(exercise, isCorrect, forceAddToVault);
  };

  const handleNext = () => {
    setCurrentIndex((i) => i + 1);
  };

  const handleShuffle = () => {
    if (filteredPool.length > 1) {
      const rand = Math.floor(Math.random() * filteredPool.length);
      setCurrentIndex(rand);
    }
  };

  const handleSpawnProceduralNow = () => {
    const variation = generateProceduralVariation(selectedLevel, selectedCategory);
    setProceduralExtras((prev) => [variation, ...prev]);
    setSelectedLevel('ALL');
    setSelectedCategory('ALL');
    setSelectedType('ALL');
    setTopicFilter(null);
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
    <div className="space-y-4 sm:space-y-6">
      {/* Top Mode Switcher & Session Counter */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-3 sm:p-4 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => {
              setDrillMode('infinite');
              setCurrentIndex(0);
            }}
            className={`px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer ${
              drillMode === 'infinite'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Flame className="w-4 h-4 text-amber-500" />
            <span>Práctica Infinita</span>
            <span className="text-xs px-1.5 py-0.5 rounded-md bg-black/10">
              {filteredPool.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              setDrillMode('mistakes');
              setCurrentIndex(0);
            }}
            className={`px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer ${
              drillMode === 'mistakes'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <RefreshCw className="w-4 h-4" />
            <span>Repetir Fallos</span>
            <span className="px-2 py-0.5 text-xs rounded-full bg-black/10 font-bold">
              {activeMistakes.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setDrillMode('ai_generator')}
            className={`px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer ${
              drillMode === 'ai_generator'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Cpu className="w-4 h-4 text-purple-600" />
            <span>Tanda IA</span>
          </button>
        </div>

        {/* Mini Session Stats */}
        <div className="flex items-center justify-between sm:justify-end gap-3 text-xs bg-slate-50 px-3 py-2 rounded-xl border border-slate-200">
          <div>
            <span className="text-slate-500">Sesión: </span>
            <strong className="text-slate-900">{sessionDone} hechos</strong>
          </div>
          <div className="h-3 w-px bg-slate-300" />
          <div>
            <span className="text-slate-500">Acierto: </span>
            <strong className="text-emerald-700">
              {sessionDone > 0 ? Math.round((sessionRight / sessionDone) * 100) : 100}%
            </strong>
          </div>
        </div>
      </div>

      {/* Mode 1: Infinite Drill Filters & Card */}
      {drillMode === 'infinite' && (
        <>
          {/* Mobile Filter Toggle & Quick Actions (Prevents scrolling past heavy filters on phone) */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-3 sm:p-4 shadow-sm space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 sm:cursor-default"
              >
                <Filter className="w-3.5 h-3.5 text-indigo-600" />
                <span>
                  Filtros: {selectedLevel === 'ALL' ? 'Todos los niveles' : `Nivel ${selectedLevel}`}
                </span>
                <span className="sm:hidden text-slate-400">
                  {showMobileFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </span>
              </button>

              <div className="flex items-center gap-2">
                {topicFilter && (
                  <button
                    type="button"
                    onClick={() => setTopicFilter(null)}
                    className="text-xs px-2.5 py-1.5 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 cursor-pointer font-semibold"
                  >
                    Quitar tema ✕
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleShuffle}
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-1.5 cursor-pointer"
                >
                  <Shuffle className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Aleatorio</span>
                </button>
                <button
                  type="button"
                  onClick={handleSpawnProceduralNow}
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>+ Variación</span>
                </button>
              </div>
            </div>

            {/* Level Pills & Selects (visible on sm screens or when expanded on mobile) */}
            <div className={`${showMobileFilters ? 'block' : 'hidden sm:block'} space-y-3 pt-1 border-t sm:border-0 border-slate-100`}>
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
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                    }`}
                  >
                    {lvl === 'ALL' ? 'Todos' : lvl}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value as ExerciseCategory | 'ALL');
                    setCurrentIndex(0);
                  }}
                  className="bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-800 outline-none focus:border-indigo-600"
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
                  className="bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-800 outline-none focus:border-indigo-600"
                >
                  {TYPES.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {currentExercise ? (
            <ExerciseCard
              exercise={currentExercise}
              onAttempt={handleAttempt}
              onNext={handleNext}
              indexLabel={`#${(currentIndex % filteredPool.length) + 1} de ${filteredPool.length}`}
              streakCount={streak}
            />
          ) : (
            <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center space-y-3 shadow-sm">
              <p className="text-slate-700 font-medium">
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
                className="px-4 py-2 bg-indigo-600 text-white text-sm font-bold rounded-xl cursor-pointer hover:bg-indigo-700"
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
          <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-rose-950 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-rose-600" />
                Cámara de Repetición Espaciada (Tus Fallos)
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 mt-0.5">
                Cada ejercicio que fallas se guarda aquí. Debes acertarlo <strong>3 veces seguidas</strong> para que se marque como Dominado.
              </p>
            </div>
            {mistakes.some((m) => m.mastered) && (
              <button
                type="button"
                onClick={onClearMasteredMistakes}
                className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-rose-300 text-xs font-bold text-rose-800 flex items-center gap-1.5 shrink-0 cursor-pointer shadow-xs"
              >
                <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                Limpiar ya dominados
              </button>
            )}
          </div>

          {activeMistakes.length > 0 && currentExercise ? (
            <>
              <div className="flex items-center justify-between text-xs text-slate-600 px-1">
                <span>
                  Repasando fallo {(currentIndex % activeMistakes.length) + 1} de {activeMistakes.length}
                </span>
                <span className="text-amber-800 font-semibold bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                  Aciertos seguidos:{' '}
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
            <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center space-y-3 shadow-sm">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h4 className="text-lg font-bold text-slate-900">
                ¡Tienes tu lista de fallos limpia ahora mismo!
              </h4>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Cuando falles un ejercicio en cualquier zona o pulses el botón "Forzar Repetición", aparecerá aquí para que puedas machacarlo hasta dominarlo.
              </p>
              <button
                type="button"
                onClick={() => setDrillMode('infinite')}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl cursor-pointer shadow-xs"
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
          className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <Cpu className="w-6 h-6 text-purple-600" />
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  Generador de Ejercicios Infinitos con IA
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  Pide 5 ejercicios nuevos sobre cualquier punto gramatical, phrasal verb o transformación.
                </p>
              </div>
            </div>

            {onOpenSettings && (
              <button
                type="button"
                onClick={onOpenSettings}
                className="self-start sm:self-auto px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-700 font-bold text-xs flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>⚙️ Ajustes / Cambiar API Key</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">
                Nivel Objetivo
              </label>
              <select
                value={aiLevel}
                onChange={(e) => setAiLevel(e.target.value as Level)}
                className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 text-sm outline-none focus:border-indigo-600"
              >
                <option value="A2+">A2+ (A2 Advanced)</option>
                <option value="B1">B1 (Intermediate)</option>
                <option value="B1+">B1+ (Intermediate Advanced)</option>
                <option value="B2">B2 (Upper-Intermediate)</option>
                <option value="B2+">B2+ (B2 Advanced / Pre-C1)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">
                Categoría Principal
              </label>
              <select
                value={aiCategory}
                onChange={(e) => setAiCategory(e.target.value as ExerciseCategory)}
                className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 text-sm outline-none focus:border-indigo-600"
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
            <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">
              ¿Qué quieres machacar exactamente? (Opcional)
            </label>
            <input
              type="text"
              value={aiCustomFocus}
              onChange={(e) => setAiCustomFocus(e.target.value)}
              placeholder="Ej: Inversiones con No sooner y Hardly, o Phrasal verbs con GET, o Third Conditional..."
              className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 text-sm outline-none focus:border-purple-600"
            />
          </div>

          {aiError && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm">
              {aiError}
            </div>
          )}

          <button
            type="submit"
            disabled={aiLoading}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-bold rounded-xl shadow-xs flex items-center justify-center gap-2 cursor-pointer min-h-[48px]"
          >
            <Sparkles className="w-4 h-4" />
            {aiLoading ? 'Generando 5 ejercicios nuevos...' : 'Generar 5 Ejercicios y Empezar a Hacerlos'}
          </button>
        </form>
      )}
    </div>
  );
};
