import React, { useState, useMemo } from 'react';
import { StreetExercise, GameProgress } from '../types/streetGame';
import { STREET_LEVELS } from '../data/streetData';
import {
  CheckCircle2,
  XCircle,
  ArrowRight
} from 'lucide-react';

interface StreetDrillArenaProps {
  progress: GameProgress;
  onUpdateProgress: (updated: GameProgress) => void;
  onOpenSettings?: () => void;
}

export const StreetDrillArena: React.FC<StreetDrillArenaProps> = ({
  progress,
  onUpdateProgress,
  onOpenSettings: _onOpenSettings
}) => {
  const [filterType, setFilterType] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  // Extract all exercises from unlocked levels + boss challenges
  const availableExercises: StreetExercise[] = useMemo(() => {
    const list: StreetExercise[] = [];
    STREET_LEVELS.forEach((lvl) => {
      if (progress.unlockedLevels.includes(lvl.id)) {
        lvl.topics.forEach((t) => {
          list.push(...t.exercises);
        });
        list.push(...lvl.boss.questions);
      }
    });

    if (filterType === 'all') return list;
    return list.filter((ex) => ex.type === filterType);
  }, [progress.unlockedLevels, filterType]);

  const currentQ: StreetExercise | undefined = availableExercises[currentIndex % (availableExercises.length || 1)];

  const handleSelectOption = (idx: number) => {
    if (isAnswered || !currentQ) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    const isCorrect = idx === currentQ.correctIndex;
    const updated: GameProgress = {
      ...progress,
      xp: isCorrect ? progress.xp + currentQ.xpReward : progress.xp,
      quids: isCorrect ? progress.quids + 1 : progress.quids,
      completedExerciseIds: isCorrect && !progress.completedExerciseIds.includes(currentQ.id)
        ? [...progress.completedExerciseIds, currentQ.id]
        : progress.completedExerciseIds
    };
    onUpdateProgress(updated);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => prev + 1);
    setSelectedOption(null);
    setIsAnswered(false);
  };

  if (!currentQ) {
    return (
      <div className="bg-white rounded-3xl p-8 text-center max-w-lg mx-auto border border-slate-200">
        <p className="text-slate-600 text-sm">No hay ejercicios para el filtro seleccionado.</p>
        <button
          type="button"
          onClick={() => setFilterType('all')}
          className="mt-3 px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs"
        >
          Ver todos los ejercicios
        </button>
      </div>
    );
  }

  const isCorrect = selectedOption === currentQ.correctIndex;

  return (
    <div className="space-y-4 max-w-3xl mx-auto animate-in fade-in duration-200">
      {/* Header Bar */}
      <div className="bg-white border border-slate-200 rounded-3xl p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-300 flex items-center justify-center text-xl shrink-0">
            ⚡
          </div>
          <div>
            <h2 className="font-extrabold text-slate-900 text-sm sm:text-base">
              Machaque Rápido de Calle
            </h2>
            <p className="text-xs text-slate-500">
              Entrena respuestas instantáneas y gana XP y Quids para desbloquear más barrios.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-black px-3 py-1.5 rounded-xl bg-amber-50 text-amber-700 border border-amber-200">
            {progress.xp} XP ⚡
          </span>
          <span className="text-xs font-black px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
            {progress.quids} Quids 💷
          </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        <button
          type="button"
          onClick={() => {
            setFilterType('all');
            setCurrentIndex(0);
            setSelectedOption(null);
            setIsAnswered(false);
          }}
          className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap cursor-pointer transition-all ${
            filterType === 'all'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
          }`}
        >
          Todos ({availableExercises.length})
        </button>

        <button
          type="button"
          onClick={() => {
            setFilterType('street_translate');
            setCurrentIndex(0);
            setSelectedOption(null);
            setIsAnswered(false);
          }}
          className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap cursor-pointer transition-all ${
            filterType === 'street_translate'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
          }`}
        >
          🔄 De Formal a Callejero
        </button>

        <button
          type="button"
          onClick={() => {
            setFilterType('whatsapp_decode');
            setCurrentIndex(0);
            setSelectedOption(null);
            setIsAnswered(false);
          }}
          className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap cursor-pointer transition-all ${
            filterType === 'whatsapp_decode'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
          }`}
        >
          📱 Descifra el WhatsApp
        </button>

        <button
          type="button"
          onClick={() => {
            setFilterType('sarcasm_radar');
            setCurrentIndex(0);
            setSelectedOption(null);
            setIsAnswered(false);
          }}
          className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap cursor-pointer transition-all ${
            filterType === 'sarcasm_radar'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
          }`}
        >
          🎭 Radar de Sarcasmo
        </button>
      </div>

      {/* Exercise Card */}
      <div className="bg-white rounded-3xl border-2 border-slate-200 p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
          <span>
            Pregunta {(currentIndex % availableExercises.length) + 1} de {availableExercises.length}
          </span>
          <span className="bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-0.5 rounded-full font-black">
            +{currentQ.xpReward} XP ⚡
          </span>
        </div>

        {/* Situation */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs sm:text-sm">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">
            Situación de Calle:
          </span>
          <p className="text-slate-800 font-medium">{currentQ.situation}</p>

          {currentQ.incomingMessage && (
            <div className="mt-2.5 bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 text-emerald-950 font-mono text-xs">
              💬 {currentQ.incomingMessage}
            </div>
          )}
        </div>

        {/* Question */}
        <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
          {currentQ.question}
        </h3>

        {/* Options */}
        <div className="space-y-2.5">
          {currentQ.options.map((opt, idx) => {
            let btnStyle =
              'bg-white border-slate-200 text-slate-800 hover:border-indigo-400 hover:bg-indigo-50/50';

            if (isAnswered) {
              if (idx === currentQ.correctIndex) {
                btnStyle = 'bg-emerald-500 border-emerald-600 text-white shadow-xs font-bold';
              } else if (idx === selectedOption) {
                btnStyle = 'bg-rose-500 border-rose-600 text-white font-bold';
              } else {
                btnStyle = 'bg-slate-100 border-slate-200 text-slate-400 opacity-60';
              }
            }

            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectOption(idx)}
                disabled={isAnswered}
                className={`w-full text-left p-3.5 rounded-2xl border-2 text-xs sm:text-sm transition-all flex items-start gap-3 cursor-pointer ${btnStyle}`}
              >
                <span className="w-6 h-6 rounded-xl bg-black/10 flex items-center justify-center font-bold text-xs shrink-0">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="flex-1 leading-snug">{opt}</span>
              </button>
            );
          })}
        </div>

        {/* Feedback Card */}
        {isAnswered && (
          <div
            className={`p-4 rounded-2xl border-2 animate-in fade-in duration-200 ${
              isCorrect
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                : 'bg-rose-50 border-rose-300 text-rose-950'
            }`}
          >
            <div className="flex items-center gap-2 font-black text-sm mb-1">
              {isCorrect ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>¡Totalmente acertado! (+{currentQ.xpReward} XP y +1 Quid 💷)</span>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-rose-600" />
                  <span>¡Trampa típica de extranjero!</span>
                </>
              )}
            </div>
            <p className="text-xs sm:text-sm mt-1">{currentQ.explanationEs}</p>
            <div className="mt-2 text-xs font-semibold bg-white/80 p-2.5 rounded-xl text-slate-700">
              💡 <strong>Truco callejero:</strong> {currentQ.streetTip}
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="mt-3.5 w-full py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm cursor-pointer transition-transform active:scale-98"
            >
              <span>Siguiente Frase de Calle</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
