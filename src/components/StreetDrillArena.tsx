import React, { useState, useMemo } from 'react';
import { StreetExercise, GameProgress } from '../types/streetGame';
import { STREET_LEVELS } from '../data/streetData';
import { checkAnswer } from '../utils/answerChecker';
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  Lightbulb,
  Send,
  Flame,
  Sparkles,
  Coins
} from 'lucide-react';

interface StreetDrillArenaProps {
  progress: GameProgress;
  onUpdateProgress: (updated: GameProgress) => void;
  onOpenSettings?: () => void;
}

export const StreetDrillArena: React.FC<StreetDrillArenaProps> = ({
  progress,
  onUpdateProgress
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

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
      <div className="card p-8 text-center max-w-lg mx-auto">
        <p className="text-sm text-[var(--ink-muted)]">
          No hay ejercicios disponibles en este momento.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5 max-w-2xl mx-auto">
      {/* Cabecera compacta */}
      <section className="card p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-[var(--brass-soft)] border border-[var(--brass-border)] text-[var(--brass)] flex items-center justify-center shrink-0">
            <Flame className="w-5 h-5" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <h2 className="font-display font-bold text-base sm:text-lg text-[var(--ink)] truncate">
              Machaque de escritura callejera
            </h2>
            <p className="text-xs text-[var(--ink-muted)] truncate">
              Entrena respuestas rápidas de los barrios desbloqueados
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold tabular-nums shrink-0">
          <span className="px-2.5 py-1 rounded-lg bg-[var(--brass-soft)] text-[var(--brass)] border border-[var(--brass-border)] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{progress.xp} XP</span>
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-[var(--pine-soft)] text-[var(--pine)] border border-[var(--pine-border)] flex items-center gap-1">
            <Coins className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{progress.quids} Quids</span>
          </span>
        </div>
      </section>

      {/* Tarjeta de ejercicio */}
      <section className="card p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between text-xs font-semibold text-[var(--ink-muted)] tabular-nums">
          <span>
            Frase {(currentIndex % availableExercises.length) + 1} de {availableExercises.length}
          </span>
          <span className="px-2.5 py-0.5 rounded-md bg-[var(--brass-soft)] text-[var(--brass)] border border-[var(--brass-border)]">
            +{currentQ.xpReward} XP
          </span>
        </div>

        <div className="inset-well p-4 text-sm space-y-1">
          <span className="text-xs font-semibold text-[var(--ink-muted)] block">Situación</span>
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
            <label htmlFor="drill-arena-input" className="sr-only">
              Tu respuesta en inglés
            </label>
            <input
              id="drill-arena-input"
              name="drillAnswer"
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              disabled={isAnswered}
              placeholder="Escribe cómo lo dirías en inglés cotidiano…"
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
              <span>Comprobar respuesta</span>
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
                  <span className="tabular-nums">
                    Natural y directo (+{currentQ.xpReward} XP y +1 Quid)
                  </span>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
                  <span>No suena como lo diría un local</span>
                </>
              )}
            </div>

            <div className="bg-[var(--surface)] p-3.5 rounded-lg border border-[var(--border)]">
              <span className="text-xs font-medium text-[var(--ink-muted)] block mb-0.5">
                Respuesta natural esperada
              </span>
              <strong className="text-[var(--pine)] text-sm sm:text-base font-bold">
                “{currentQ.sampleIdealAnswer}”
              </strong>
            </div>

            <p className="text-xs sm:text-sm text-[var(--ink)]">{currentQ.explanationEs}</p>
            <p className="text-xs text-[var(--ink-muted)]">
              <strong className="text-[var(--ink)]">Truco:</strong> {currentQ.streetTip}
            </p>

            <button type="button" onClick={handleNext} className="btn btn-dark w-full">
              <span>Siguiente frase</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        )}
      </section>
    </div>
  );
};
