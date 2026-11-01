import React, { useState } from 'react';
import { StreetBossChallenge, StreetExercise } from '../types/streetGame';
import confetti from 'canvas-confetti';
import {
  ShieldAlert,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface StreetBossFightProps {
  boss: StreetBossChallenge;
  onVictory: (levelId: number, xpEarned: number) => void;
  onClose: () => void;
}

export const StreetBossFight: React.FC<StreetBossFightProps> = ({
  boss,
  onVictory,
  onClose
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [showResult, setShowResult] = useState(false);

  const currentQ: StreetExercise = boss.questions[currentIndex];
  const totalQ = boss.questions.length;
  const isCorrect = selectedOption === currentQ.correctIndex;
  const isPassed = Math.round((score / totalQ) * 100) >= boss.passPercentage;

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    if (idx === currentQ.correctIndex) {
      setScore((prev) => prev + 1);
    } else {
      setHearts((prev) => Math.max(0, prev - 1));
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < totalQ && hearts > 0) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
      const finalScore = isCorrect ? score : score; // already updated
      const passed = Math.round((finalScore / totalQ) * 100) >= boss.passPercentage;
      if (passed) {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
        onVictory(boss.levelId, 80);
      }
    }
  };

  const handleRetry = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setHearts(3);
    setShowResult(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border-4 border-amber-400 overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Boss Header Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-4 sm:p-6 text-center relative border-b border-indigo-800">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 text-slate-400 hover:text-white text-xs bg-slate-800/80 px-2.5 py-1.5 rounded-xl border border-slate-700"
          >
            ✕ Salir
          </button>

          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-2xl bg-amber-400/20 border-2 border-amber-400 flex items-center justify-center text-3xl sm:text-4xl shadow-inner mb-2.5">
            {boss.bossAvatar}
          </div>

          <span className="inline-block text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full bg-rose-600 text-white mb-1 shadow-sm">
            ⚔️ Desafío de Jefe de Nivel {boss.levelId}
          </span>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            {boss.bossName}
          </h2>
          <p className="text-xs text-amber-300 font-semibold">{boss.bossTitle}</p>

          <div className="mt-3 bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-2.5 text-xs text-slate-200 italic max-w-md mx-auto">
            "{boss.bossQuote}"
          </div>

          {/* Hearts & Progress */}
          {!showResult && (
            <div className="flex items-center justify-between mt-4 px-2 text-xs">
              <div className="flex items-center gap-1">
                <span className="text-slate-400 font-bold">Vidas:</span>
                <span className="text-base tracking-wider">
                  {'❤️'.repeat(hearts)}
                  {'🖤'.repeat(3 - hearts)}
                </span>
              </div>
              <div className="font-bold text-amber-300">
                Pregunta {currentIndex + 1} de {totalQ}
              </div>
            </div>
          )}
        </div>

        {/* Boss Fight Content */}
        {!showResult ? (
          <div className="p-4 sm:p-6 space-y-4">
            {/* Situation Card */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 sm:p-4 text-xs sm:text-sm">
              <div className="flex items-center gap-1.5 text-indigo-700 font-bold text-xs uppercase tracking-wider mb-1">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Situación de Calle:</span>
              </div>
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
                    btnStyle = 'bg-emerald-500 border-emerald-600 text-white shadow-md font-bold';
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

            {/* Feedback & Street Tip */}
            {isAnswered && (
              <div
                className={`p-3.5 sm:p-4 rounded-2xl border-2 animate-in fade-in duration-200 ${
                  isCorrect
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                    : 'bg-rose-50 border-rose-300 text-rose-950'
                }`}
              >
                <div className="flex items-center gap-2 font-black text-sm mb-1">
                  {isCorrect ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <span>¡Respuesta Perfecta de Calle! (+{currentQ.xpReward} XP)</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-rose-600" />
                      <span>¡Cazado como un guiri! Pierdes un corazón</span>
                    </>
                  )}
                </div>
                <p className="text-xs sm:text-sm mt-1">{currentQ.explanationEs}</p>
                <div className="mt-2 text-xs font-semibold bg-white/70 p-2 rounded-xl text-slate-700">
                  💡 <strong>Truco callejero:</strong> {currentQ.streetTip}
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  className="mt-3.5 w-full py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer transition-transform active:scale-95"
                >
                  <span>{currentIndex + 1 < totalQ && hearts > 0 ? 'Siguiente Desafío' : 'Ver Veredicto del Jefe'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Victory or Defeat Result Screen */
          <div className="p-6 text-center space-y-4">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-100 flex items-center justify-center text-4xl shadow-inner border border-amber-300">
              {isPassed ? '🏆' : '💀'}
            </div>

            <h3 className="text-2xl font-black text-slate-900">
              {isPassed ? '¡JEFE DERROTADO!' : 'TE HAN CAZADO'}
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto">
              {isPassed
                ? `Has acertado ${score} de ${totalQ} (${Math.round((score / totalQ) * 100)}%). ${boss.bossName} reconoce que tienes calle y te permite pasar al siguiente nivel.`
                : `Has acertado ${score} de ${totalQ} (${Math.round((score / totalQ) * 100)}%). Necesitas al menos el ${boss.passPercentage}% de acierto para avanzar.`}
            </p>

            {isPassed ? (
              <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-4 text-emerald-950 text-xs sm:text-sm">
                <div className="flex items-center justify-center gap-2 font-bold mb-1">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Recompensas Desbloqueadas</span>
                </div>
                <div className="flex justify-center gap-4 text-xs font-black mt-2">
                  <span className="bg-white px-3 py-1.5 rounded-xl border border-emerald-200">
                    +80 XP Callejera ⚡
                  </span>
                  <span className="bg-white px-3 py-1.5 rounded-xl border border-emerald-200">
                    +5 Quids 💷
                  </span>
                  <span className="bg-white px-3 py-1.5 rounded-xl border border-emerald-200">
                    Nivel {boss.levelId + 1} Abierto 🔓
                  </span>
                </div>
              </div>
            ) : (
              <div className="bg-rose-50 border-2 border-rose-300 rounded-2xl p-4 text-rose-950 text-xs sm:text-sm">
                <p className="font-bold">
                  "{boss.bossName}: Repasa las frases del nivel en los temas y vuelve a intentarlo cuando estés listo, colega."
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              {!isPassed && (
                <button
                  type="button"
                  onClick={handleRetry}
                  className="flex-1 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reintentar Combate</span>
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <span>{isPassed ? 'Continuar al Mapa' : 'Volver a Estudiar'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
