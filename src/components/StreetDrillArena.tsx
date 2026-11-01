import React, { useState, useMemo } from 'react';
import { StreetExercise, GameProgress } from '../types/streetGame';
import { STREET_LEVELS } from '../data/streetData';
import { checkAnswer } from '../utils/answerChecker';
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  Lightbulb,
  Send
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

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
    return list;
  }, [progress.unlockedLevels]);

  const currentQ: StreetExercise | undefined =
    availableExercises[currentIndex % (availableExercises.length || 1)];

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!currentQ || !userInput.trim() || isAnswered) return;

    const correct = checkAnswer(userInput, currentQ.acceptedAnswers);
    setIsCorrect(correct);
    setIsAnswered(true);

    const updated: GameProgress = {
      ...progress,
      xp: correct ? progress.xp + currentQ.xpReward : progress.xp,
      quids: correct ? progress.quids + 1 : progress.quids,
      completedExerciseIds:
        correct && !progress.completedExerciseIds.includes(currentQ.id)
          ? [...progress.completedExerciseIds, currentQ.id]
          : progress.completedExerciseIds
    };
    onUpdateProgress(updated);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => prev + 1);
    setUserInput('');
    setShowHint(false);
    setIsAnswered(false);
    setIsCorrect(false);
  };

  if (!currentQ) {
    return (
      <div className="bg-white rounded-3xl p-8 text-center max-w-lg mx-auto border border-slate-200">
        <p className="text-slate-600 text-sm">No hay ejercicios disponibles en este momento.</p>
      </div>
    );
  }

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
              Machaque de Escritura Callejera
            </h2>
            <p className="text-xs text-slate-500">
              Escribe las respuestas en inglés cotidiano para ganar XP y Quids.
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

      {/* Exercise Card */}
      <div className="bg-white rounded-3xl border-2 border-slate-200 p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
          <span>
            Frase {(currentIndex % availableExercises.length) + 1} de {availableExercises.length}
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
        </div>

        {/* Question */}
        <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
          {currentQ.question}
        </h3>

        {/* Hint */}
        {currentQ.hint && (
          <div>
            {!showHint ? (
              <button
                type="button"
                onClick={() => setShowHint(true)}
                className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1.5 cursor-pointer"
              >
                <Lightbulb className="w-4 h-4 text-amber-500" />
                <span>¿Dudas? Ver pista para escribir</span>
              </button>
            ) : (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 animate-in fade-in">
                💡 {currentQ.hint}
              </div>
            )}
          </div>
        )}

        {/* Form with Input */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            disabled={isAnswered}
            placeholder="Escribe cómo lo dirías en inglés cotidiano..."
            className="w-full p-4 rounded-2xl border-2 border-slate-300 focus:border-indigo-600 focus:bg-white text-sm font-semibold text-slate-900 outline-none transition-all placeholder:text-slate-400"
            autoComplete="off"
            autoFocus
          />

          {!isAnswered && (
            <button
              type="submit"
              disabled={!userInput.trim()}
              className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm cursor-pointer transition-all"
            >
              <span>Comprobar respuesta</span>
              <Send className="w-4 h-4" />
            </button>
          )}
        </form>

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
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>¡Totalmente natural! (+{currentQ.xpReward} XP y +1 Quid 💷)</span>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  <span>No suena como lo diría un local</span>
                </>
              )}
            </div>

            <div className="mt-2 text-xs sm:text-sm bg-white/90 p-3 rounded-xl border border-slate-200">
              <span className="text-[10px] font-black uppercase text-slate-500 block mb-0.5">
                Respuesta natural ideal:
              </span>
              <strong className="text-emerald-900 font-black">
                "{currentQ.sampleIdealAnswer}"
              </strong>
            </div>

            <p className="text-xs sm:text-sm mt-2">{currentQ.explanationEs}</p>
            <div className="mt-2 text-xs font-semibold bg-white/80 p-2.5 rounded-xl text-slate-700">
              💡 <strong>Truco callejero:</strong> {currentQ.streetTip}
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="mt-3.5 w-full py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm cursor-pointer transition-transform active:scale-98"
            >
              <span>Siguiente Frase</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
