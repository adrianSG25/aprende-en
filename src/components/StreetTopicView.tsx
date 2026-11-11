import React, { useState } from 'react';
import { StreetTopic, StreetExercise } from '../types/streetGame';
import { checkAnswer } from '../utils/answerChecker';
import {
  ArrowLeft,
  Sparkles,
  BookOpen,
  Volume2,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Lightbulb,
  Send,
  PenLine,
  Info
} from 'lucide-react';

interface StreetTopicViewProps {
  topic: StreetTopic;
  onBack: () => void;
  onCompleteExercise: (exerciseId: string, isCorrect: boolean, xp: number) => void;
  completedExerciseIds: string[];
}

export const StreetTopicView: React.FC<StreetTopicViewProps> = ({
  topic,
  onBack,
  onCompleteExercise,
  completedExerciseIds
}) => {
  const [activeTab, setActiveTab] = useState<'phrases' | 'drills'>('phrases');
  const [drillIndex, setDrillIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const currentExercise: StreetExercise | undefined = topic.exercises[drillIndex];
  const isCompleted = currentExercise ? completedExerciseIds.includes(currentExercise.id) : false;

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!currentExercise || !userInput.trim() || isAnswered) return;

    const correct = checkAnswer(userInput, currentExercise.acceptedAnswers);
    setIsCorrect(correct);
    setIsAnswered(true);
    onCompleteExercise(currentExercise.id, correct, correct ? currentExercise.xpReward : 0);
  };

  const handleNextDrill = () => {
    if (drillIndex + 1 < topic.exercises.length) {
      setDrillIndex((prev) => prev + 1);
      setUserInput('');
      setShowHint(false);
      setIsAnswered(false);
      setIsCorrect(false);
    }
  };

  return (
    <div className="space-y-5 max-w-3xl mx-auto">
      {/* Barra superior con vuelta y selector de modo */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="btn btn-secondary btn-sm self-start"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>Volver al mapa</span>
        </button>

        <div className="segmented w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setActiveTab('phrases')}
            className={`segmented-item ${
              activeTab === 'phrases' ? 'segmented-item-active' : ''
            }`}
          >
            <BookOpen className="w-4 h-4" aria-hidden="true" />
            <span>Expresiones</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('drills')}
            className={`segmented-item tabular-nums ${
              activeTab === 'drills' ? 'segmented-item-active' : ''
            }`}
          >
            <PenLine className="w-4 h-4" aria-hidden="true" />
            <span>Práctica ({topic.exercises.length})</span>
          </button>
        </div>
      </div>

      {/* Cabecera editorial del tema */}
      <section className="card p-5 sm:p-6 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2
              id="topic-view-heading"
              tabIndex={-1}
              className="font-display text-xl sm:text-2xl font-bold text-[var(--ink)] outline-none"
            >
              {topic.title}
            </h2>
            <p className="text-sm text-[var(--accent)] font-medium mt-0.5">{topic.subtitle}</p>
          </div>
          <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-md bg-[var(--surface-2)] text-[var(--ink-muted)] shrink-0 tabular-nums">
            {topic.phrases.length} claves
          </span>
        </div>

        <p className="text-sm text-[var(--ink-muted)] leading-relaxed">{topic.description}</p>
      </section>

      {/* PESTAÑA 1: COMPARATIVA ACADEMIA VS CALLE */}
      {activeTab === 'phrases' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-[var(--accent-soft)] border border-[var(--accent-border)] text-xs sm:text-sm text-[var(--ink)] flex items-start gap-3">
            <Sparkles className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <strong className="font-semibold text-[var(--accent)]">
                Inglés real frente a manual escolar:
              </strong>{' '}
              así habla la gente a diario en Londres sin sonar rígida ni artificial.
            </div>
          </div>

          <div className="space-y-3.5">
            {topic.phrases.map((item, idx) => (
              <article key={idx} className="card p-4 sm:p-5 space-y-3.5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="inset-well p-3.5 space-y-1">
                    <span className="text-xs font-medium text-[var(--ink-subtle)] block">
                      En libros de texto
                    </span>
                    <p className="text-sm font-medium text-[var(--ink-muted)] line-through">
                      “{item.formal}”
                    </p>
                  </div>

                  <div className="rounded-xl p-3.5 bg-[var(--pine-soft)] border border-[var(--pine-border)] space-y-1">
                    <span className="text-xs font-semibold text-[var(--pine)] block">
                      En la calle en UK
                    </span>
                    <p className="text-sm sm:text-base font-bold text-[var(--ink)]">
                      “{item.street}”
                    </p>
                  </div>
                </div>

                <div className="text-sm text-[var(--ink)]">
                  <span className="text-[var(--ink-muted)]">Significado equivalente: </span>
                  <strong className="font-semibold">{item.es}</strong>
                </div>

                <div className="text-xs sm:text-sm text-[var(--ink-muted)] flex items-start gap-2 pt-2 border-t border-[var(--border)]">
                  <Info className="w-4 h-4 text-[var(--ink-subtle)] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{item.context}</span>
                </div>

                {item.notes && (
                  <p className="text-xs text-[var(--accent)] bg-[var(--accent-soft)] px-3 py-2 rounded-lg">
                    {item.notes}
                  </p>
                )}
              </article>
            ))}
          </div>

          {/* Notas culturales y entonación */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="card p-4 sm:p-5 space-y-2.5">
              <div className="flex items-center gap-2 text-sm font-bold text-[var(--ink)]">
                <BookOpen className="w-4 h-4 text-[var(--accent)]" aria-hidden="true" />
                <span>Claves culturales en UK</span>
              </div>
              <ul className="space-y-1.5 text-xs sm:text-sm text-[var(--ink-muted)]">
                {topic.culturalSecrets.map((secret, sIdx) => (
                  <li key={sIdx} className="flex items-start gap-2">
                    <span className="text-[var(--accent)] font-bold" aria-hidden="true">
                      •
                    </span>
                    <span>{secret}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card p-4 sm:p-5 space-y-2.5">
              <div className="flex items-center gap-2 text-sm font-bold text-[var(--ink)]">
                <Volume2 className="w-4 h-4 text-[var(--pine)]" aria-hidden="true" />
                <span>Pronunciación y ritmo</span>
              </div>
              <p className="text-xs sm:text-sm text-[var(--ink-muted)] leading-relaxed">
                {topic.audioTips}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setActiveTab('drills')}
            className="btn btn-primary w-full"
          >
            <span>Pasar a los ejercicios escritos (+XP)</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      )}

      {/* PESTAÑA 2: EJERCICIOS ESCRITOS */}
      {activeTab === 'drills' && currentExercise && (
        <section className="card p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between text-xs font-semibold text-[var(--ink-muted)] tabular-nums">
            <div className="flex items-center gap-2">
              <span>
                Ejercicio {drillIndex + 1} de {topic.exercises.length}
              </span>
              {isCompleted && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[var(--pine-soft)] text-[var(--pine)] border border-[var(--pine-border)]">
                  <CheckCircle2 className="w-3 h-3" aria-hidden="true" />
                  Superado
                </span>
              )}
            </div>
            <span className="px-2.5 py-0.5 rounded-md bg-[var(--brass-soft)] text-[var(--brass)] border border-[var(--brass-border)] font-semibold">
              +{currentExercise.xpReward} XP
            </span>
          </div>

          <div className="inset-well p-4 text-sm space-y-1">
            <span className="text-xs font-semibold text-[var(--ink-muted)] block">
              Situación
            </span>
            <p className="text-[var(--ink)] font-medium leading-relaxed">
              {currentExercise.situation}
            </p>
          </div>

          <h3 className="font-display font-bold text-base sm:text-lg text-[var(--ink)]">
            {currentExercise.question}
          </h3>

          {currentExercise.hint && (
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
                  {currentExercise.hint}
                </div>
              )}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label htmlFor="topic-drill-input" className="sr-only">
                Tu respuesta en inglés
              </label>
              <input
                id="topic-drill-input"
                name="topicAnswer"
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
                      ¡Exacto! Expresión natural (+{currentExercise.xpReward} XP)
                    </span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
                    <span>En la calle se suele decir de otra forma</span>
                  </>
                )}
              </div>

              <div className="bg-[var(--surface)] p-3.5 rounded-lg border border-[var(--border)]">
                <span className="text-xs font-medium text-[var(--ink-muted)] block mb-0.5">
                  Respuesta recomendada
                </span>
                <strong className="text-[var(--pine)] text-sm sm:text-base font-bold">
                  “{currentExercise.sampleIdealAnswer}”
                </strong>
              </div>

              <p className="text-xs sm:text-sm text-[var(--ink)]">
                {currentExercise.explanationEs}
              </p>

              <p className="text-xs text-[var(--ink-muted)]">
                <strong className="text-[var(--ink)]">Consejo:</strong> {currentExercise.streetTip}
              </p>

              {drillIndex + 1 < topic.exercises.length ? (
                <button
                  type="button"
                  onClick={handleNextDrill}
                  className="btn btn-dark w-full"
                >
                  <span>Siguiente ejercicio</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              ) : (
                <div className="pt-2 space-y-2.5 text-center border-t border-[var(--border)]">
                  <p className="text-xs sm:text-sm font-semibold text-[var(--pine)]">
                    Has completado todos los ejercicios escritos de este tema.
                  </p>
                  <button type="button" onClick={onBack} className="btn btn-dark w-full">
                    Volver al mapa de barrios
                  </button>
                </div>
              )}
            </div>
          )}
        </section>
      )}
    </div>
  );
};
