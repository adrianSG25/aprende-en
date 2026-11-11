import React, { useState } from 'react';
import { StreetBossChallenge, StreetExercise } from '../types/streetGame';
import { checkAnswer } from '../utils/answerChecker';
import { NativeDialog } from './NativeDialog';
import confetti from 'canvas-confetti';
import {
  ShieldAlert,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Lightbulb,
  Send,
  Heart,
  Trophy,
  X,
  Swords
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
  const [userInput, setUserInput] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [showResult, setShowResult] = useState(false);

  const currentQ: StreetExercise = boss.questions[currentIndex];
  const totalQ = boss.questions.length;
  const pct = Math.round((score / totalQ) * 100);
  const isPassed = pct >= boss.passPercentage;

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!userInput.trim() || isAnswered) return;

    const correct = checkAnswer(userInput, currentQ.acceptedAnswers);
    setIsCorrect(correct);
    setIsAnswered(true);

    if (correct) {
      setScore((prev) => prev + 1);
    } else {
      setHearts((prev) => Math.max(0, prev - 1));
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < totalQ && hearts > 0) {
      setCurrentIndex((prev) => prev + 1);
      setUserInput('');
      setShowHint(false);
      setIsAnswered(false);
      setIsCorrect(false);
    } else {
      setShowResult(true);
      const passed = Math.round((score / totalQ) * 100) >= boss.passPercentage;
      if (passed) {
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.6 }
        });
        onVictory(boss.levelId, 80);
      }
    }
  };

  const handleRetry = () => {
    setCurrentIndex(0);
    setUserInput('');
    setShowHint(false);
    setIsAnswered(false);
    setIsCorrect(false);
    setScore(0);
    setHearts(3);
    setShowResult(false);
  };

  return (
    <NativeDialog
      open={true}
      onClose={onClose}
      lightDismiss={false}
      labelledBy="boss-dialog-title"
    >
      {/* Cabecera en tono asfalto sin degradados morados */}
      <div className="bg-[var(--tarmac)] text-white p-5 sm:p-6 relative border-b border-[var(--tarmac-border)] space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-12 h-12 rounded-xl bg-[var(--tarmac-soft)] border border-[var(--tarmac-border)] flex items-center justify-center text-amber-400 shrink-0">
              <Swords className="w-6 h-6" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <span className="text-xs font-medium text-amber-300 block">
                Prueba final · Zona 0{boss.levelId}
              </span>
              <h2
                id="boss-dialog-title"
                className="font-display text-lg sm:text-xl font-bold text-white truncate"
              >
                {boss.bossName}
              </h2>
              <p className="text-xs text-slate-300 truncate">{boss.bossTitle}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="min-w-[40px] min-h-[40px] rounded-xl bg-[var(--tarmac-soft)] hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center border border-[var(--tarmac-border)] shrink-0"
            aria-label="Salir de la prueba del jefe"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        <p className="rounded-xl bg-[var(--tarmac-soft)] border border-[var(--tarmac-border)] px-3.5 py-2.5 text-xs sm:text-sm text-slate-200 italic">
          “{boss.bossQuote}”
        </p>

        {!showResult && (
          <div className="flex items-center justify-between pt-1 text-xs">
            <div className="flex items-center gap-1.5" aria-label={`${hearts} de 3 vidas`}>
              <span className="text-slate-400 font-medium mr-1">Vidas:</span>
              {[0, 1, 2].map((idx) => (
                <Heart
                  key={idx}
                  className={`w-4 h-4 ${
                    idx < hearts ? 'text-rose-400 fill-rose-400' : 'text-slate-600'
                  }`}
                  aria-hidden="true"
                />
              ))}
            </div>
            <span className="font-semibold text-amber-300 tabular-nums">
              Pregunta {currentIndex + 1} de {totalQ}
            </span>
          </div>
        )}
      </div>

      {/* Cuerpo del reto */}
      {!showResult ? (
        <div className="p-5 sm:p-6 space-y-4">
          <div className="inset-well p-3.5 sm:p-4 text-sm space-y-1">
            <div className="flex items-center gap-1.5 text-[var(--accent)] font-semibold text-xs">
              <ShieldAlert className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Situación</span>
            </div>
            <p className="text-[var(--ink)] font-medium leading-relaxed">{currentQ.situation}</p>
          </div>

          <h3 className="font-display font-bold text-base sm:text-lg text-[var(--ink)]">
            {currentQ.question}
          </h3>

          {currentQ.hint && (
            <div>
              {!showHint ? (
                <button
                  type="button"
                  onClick={() => setShowHint(true)}
                  className="text-xs font-semibold text-[var(--brass)] hover:underline flex items-center gap-1.5"
                >
                  <Lightbulb className="w-4 h-4" aria-hidden="true" />
                  <span>Ver pista</span>
                </button>
              ) : (
                <div className="p-3 rounded-xl bg-[var(--brass-soft)] border border-[var(--brass-border)] text-xs sm:text-sm text-[var(--ink)]">
                  {currentQ.hint}
                </div>
              )}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label htmlFor="boss-answer-input" className="sr-only">
                Tu respuesta para el jefe
              </label>
              <input
                id="boss-answer-input"
                name="bossAnswer"
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                disabled={isAnswered}
                placeholder="Escribe tu respuesta en inglés…"
                className="input-field font-medium"
                autoComplete="off"
                spellCheck={false}
              />
            </div>

            {!isAnswered && (
              <button
                type="submit"
                disabled={!userInput.trim()}
                className="btn btn-primary w-full"
              >
                <span>Enviar respuesta</span>
                <Send className="w-4 h-4" aria-hidden="true" />
              </button>
            )}
          </form>

          {isAnswered && (
            <div
              aria-live="polite"
              className={`p-4 rounded-xl border space-y-3 ${
                isCorrect
                  ? 'bg-[var(--pine-soft)] border-[var(--pine-border)]'
                  : 'bg-[var(--crimson-soft)] border-[var(--crimson-border)]'
              }`}
            >
              <div
                className={`flex items-center gap-2 font-bold text-sm ${
                  isCorrect ? 'text-[var(--pine)]' : 'text-[var(--crimson)]'
                }`}
              >
                {isCorrect ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 shrink-0" aria-hidden="true" />
                    <span className="tabular-nums">Respuesta natural (+{currentQ.xpReward} XP)</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
                    <span>No encaja con lo que diría un local (-1 vida)</span>
                  </>
                )}
              </div>

              <div className="bg-[var(--surface)] p-3 rounded-lg border border-[var(--border)]">
                <span className="text-xs font-medium text-[var(--ink-muted)] block mb-0.5">
                  Respuesta esperada
                </span>
                <strong className="text-[var(--pine)] text-sm font-bold">
                  “{currentQ.sampleIdealAnswer}”
                </strong>
              </div>

              <p className="text-xs sm:text-sm text-[var(--ink)]">{currentQ.explanationEs}</p>
              <p className="text-xs text-[var(--ink-muted)]">
                <strong className="text-[var(--ink)]">Consejo:</strong> {currentQ.streetTip}
              </p>

              <button type="button" onClick={handleNext} className="btn btn-dark w-full">
                <span>
                  {currentIndex + 1 < totalQ && hearts > 0
                    ? 'Siguiente pregunta'
                    : 'Ver veredicto'}
                </span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="p-6 text-center space-y-4">
          <div
            className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center border ${
              isPassed
                ? 'bg-[var(--pine-soft)] border-[var(--pine-border)] text-[var(--pine)]'
                : 'bg-[var(--crimson-soft)] border-[var(--crimson-border)] text-[var(--crimson)]'
            }`}
          >
            {isPassed ? (
              <Trophy className="w-8 h-8" aria-hidden="true" />
            ) : (
              <ShieldAlert className="w-8 h-8" aria-hidden="true" />
            )}
          </div>

          <div className="space-y-1">
            <h3 className="font-display text-2xl font-bold text-[var(--ink)]">
              {isPassed ? 'Prueba superada' : 'Prueba no superada'}
            </h3>
            <p className="text-sm text-[var(--ink-muted)] max-w-sm mx-auto tabular-nums">
              {isPassed
                ? `Has acertado ${score} de ${totalQ} (${pct}%). ${boss.bossName} te da paso al siguiente barrio.`
                : `Has acertado ${score} de ${totalQ} (${pct}%). Necesitas al menos un ${boss.passPercentage}% para avanzar.`}
            </p>
          </div>

          {isPassed ? (
            <div className="rounded-xl bg-[var(--pine-soft)] border border-[var(--pine-border)] p-4 space-y-2.5">
              <div className="flex items-center justify-center gap-1.5 font-semibold text-sm text-[var(--pine)]">
                <Sparkles className="w-4 h-4" aria-hidden="true" />
                <span>Recompensas obtenidas</span>
              </div>
              <div className="flex justify-center flex-wrap gap-2 text-xs font-semibold tabular-nums">
                <span className="bg-[var(--surface)] px-3 py-1.5 rounded-lg border border-[var(--pine-border)] text-[var(--ink)]">
                  +80 XP
                </span>
                <span className="bg-[var(--surface)] px-3 py-1.5 rounded-lg border border-[var(--pine-border)] text-[var(--ink)]">
                  +5 Quids
                </span>
                <span className="bg-[var(--surface)] px-3 py-1.5 rounded-lg border border-[var(--pine-border)] text-[var(--ink)]">
                  Zona 0{boss.levelId + 1} abierta
                </span>
              </div>
            </div>
          ) : (
            <div className="rounded-xl bg-[var(--crimson-soft)] border border-[var(--crimson-border)] p-4 text-xs sm:text-sm text-[var(--ink)] font-medium">
              “Repasa las expresiones del barrio e inténtalo de nuevo cuando quieras.”
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-2 pt-1">
            {!isPassed && (
              <button type="button" onClick={handleRetry} className="btn btn-primary flex-1">
                <RotateCcw className="w-4 h-4" aria-hidden="true" />
                <span>Reintentar</span>
              </button>
            )}
            <button type="button" onClick={onClose} className="btn btn-dark flex-1">
              <span>{isPassed ? 'Continuar al mapa' : 'Volver al barrio'}</span>
            </button>
          </div>
        </div>
      )}
    </NativeDialog>
  );
};
