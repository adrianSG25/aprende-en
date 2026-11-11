import React, { useState } from 'react';
import { Exercise } from '../types';
import {
  checkAnswerMatch,
  evaluateExerciseSubmission,
  extractTargetAndTranslation,
  DetailedEvaluation
} from '../data/infiniteGenerator';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  BookmarkPlus,
  Sparkles,
  ArrowRight,
  Lightbulb,
  Languages
} from 'lucide-react';

interface ExerciseCardProps {
  exercise: Exercise;
  onAttempt: (exercise: Exercise, isCorrect: boolean, forceAddToVault?: boolean) => void;
  onNext?: () => void;
  indexLabel?: string;
  streakCount?: number;
}

const LEVEL_BADGE_STYLES: Record<string, string> = {
  'A2+': 'bg-[var(--pine-soft)] text-[var(--pine)] border-[var(--pine-border)]',
  'B1': 'bg-[var(--accent-soft)] text-[var(--accent)] border-[var(--accent-border)]',
  'B1+': 'bg-[var(--accent-soft)] text-[var(--accent)] border-[var(--accent-border)]',
  'B2': 'bg-[var(--brass-soft)] text-[var(--brass)] border-[var(--brass-border)]',
  'B2+': 'bg-[var(--crimson-soft)] text-[var(--crimson)] border-[var(--crimson-border)]'
};

const TYPE_LABELS: Record<string, string> = {
  cloze: 'Rellenar hueco',
  transformation: 'Transformación con palabra clave',
  error_correction: 'Corregir el error',
  translation: 'Traducción inversa (ES → EN)',
  word_formation: 'Formación de palabras',
  multiple_choice: 'Opción múltiple'
};

export const ExerciseCard: React.FC<ExerciseCardProps> = ({
  exercise,
  onAttempt,
  onNext,
  indexLabel,
  streakCount
}) => {
  const [prevExerciseId, setPrevExerciseId] = useState(exercise.id);
  const [userInput, setUserInput] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [evaluation, setEvaluation] = useState<DetailedEvaluation | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const [savedToVault, setSavedToVault] = useState(false);
  const [practiceAgainInput, setPracticeAgainInput] = useState('');
  const [practiceAgainSuccess, setPracticeAgainSuccess] = useState(false);

  if (exercise.id !== prevExerciseId) {
    setPrevExerciseId(exercise.id);
    setUserInput('');
    setSubmitted(false);
    setEvaluation(null);
    setShowHint(false);
    setShowTranslation(false);
    setSavedToVault(false);
    setPracticeAgainInput('');
    setPracticeAgainSuccess(false);
  }

  const { englishTargetWithGap, spanishTranslation } = extractTargetAndTranslation(exercise);

  const handleCheck = (e?: React.FormEvent, directOption?: string) => {
    if (e) e.preventDefault();
    const val = directOption !== undefined ? directOption : userInput;
    if (!val.trim() && !submitted) return;

    if (directOption !== undefined) {
      setUserInput(directOption);
    }

    const evalResult = evaluateExerciseSubmission(val, exercise);
    setEvaluation(evalResult);
    setSubmitted(true);
    onAttempt(exercise, evalResult.isCorrect, false);
  };

  const handleSaveToVault = () => {
    setSavedToVault(true);
    onAttempt(exercise, evaluation?.isCorrect ?? false, true);
  };

  const handlePracticeAgainCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const res = evaluateExerciseSubmission(practiceAgainInput, exercise);
    if (res.isCorrect || checkAnswerMatch(practiceAgainInput, exercise.acceptedAnswers)) {
      setPracticeAgainSuccess(true);
    }
  };

  const sortedAnswers = [...exercise.acceptedAnswers].sort((a, b) => a.length - b.length);
  const shortTargetAnswer = sortedAnswers[0] || '';
  const wordCount = shortTargetAnswer.split(' ').length;
  const firstLetterHint = shortTargetAnswer
    ? `Empieza por: «${shortTargetAnswer.slice(0, Math.min(3, shortTargetAnswer.length))}…» (${wordCount} ${wordCount === 1 ? 'palabra' : 'palabras'})`
    : '';

  const renderHighlightedFullSentence = (fullSentence: string, highlightChunk: string) => {
    if (!highlightChunk) return fullSentence;
    const idx = fullSentence.toLowerCase().indexOf(highlightChunk.toLowerCase());
    if (idx === -1) return fullSentence;
    const before = fullSentence.slice(0, idx);
    const match = fullSentence.slice(idx, idx + highlightChunk.length);
    const after = fullSentence.slice(idx + highlightChunk.length);
    return (
      <>
        {before}
        <span className="px-1.5 py-0.5 mx-0.5 rounded bg-[var(--pine-soft)] border border-[var(--pine-border)] text-[var(--pine)] font-bold underline decoration-[var(--pine)]">
          {match}
        </span>
        {after}
      </>
    );
  };

  return (
    <article className="card p-4 sm:p-6 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5">
          {indexLabel && (
            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[var(--surface-2)] text-[var(--ink)] tabular-nums">
              {indexLabel}
            </span>
          )}
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${
              LEVEL_BADGE_STYLES[exercise.level] ||
              'bg-[var(--surface-2)] text-[var(--ink-muted)] border-[var(--border)]'
            }`}
          >
            Nivel {exercise.level}
          </span>
          <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-[var(--surface-2)] text-[var(--ink-muted)]">
            {TYPE_LABELS[exercise.type] || exercise.type}
          </span>
          <span className="text-xs text-[var(--ink-muted)]">· {exercise.topicLabel}</span>
        </div>

        <div className="flex items-center gap-2">
          {spanishTranslation && exercise.type !== 'translation' && (
            <button
              type="button"
              onClick={() => setShowTranslation(!showTranslation)}
              className={`btn btn-sm ${showTranslation ? 'btn-soft' : 'btn-secondary'}`}
            >
              <Languages className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{showTranslation ? 'Ocultar traducción' : 'Ver traducción'}</span>
            </button>
          )}

          {streakCount !== undefined && streakCount > 0 && (
            <div className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-md bg-[var(--brass-soft)] text-[var(--brass)] border border-[var(--brass-border)] tabular-nums">
              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Racha: {streakCount}</span>
            </div>
          )}
        </div>
      </div>

      <div>
        <p
          className={
            exercise.prompt.includes('___')
              ? 'text-base sm:text-lg font-semibold text-[var(--ink)] inset-well p-4'
              : 'text-sm sm:text-base font-medium text-[var(--ink)]'
          }
        >
          {exercise.prompt}
        </p>
      </div>

      {exercise.baseSentence && (
        <div className="inset-well p-4 space-y-2">
          <p className="text-base sm:text-lg font-semibold text-[var(--ink)] leading-relaxed">
            {exercise.baseSentence}
          </p>
          {exercise.keyWord && (
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-[var(--ink-muted)]">Palabra clave:</span>
              <span className="px-2.5 py-0.5 rounded-md bg-[var(--brass-soft)] border border-[var(--brass-border)] text-[var(--brass)] font-mono font-bold text-sm">
                {exercise.keyWord}
              </span>
            </div>
          )}
          {exercise.type === 'error_correction' && (
            <p className="text-xs text-[var(--ink-muted)]">
              Puedes escribir solo el fragmento corregido o la frase completa.
            </p>
          )}
        </div>
      )}

      {englishTargetWithGap && (
        <div className="rounded-xl p-4 bg-[var(--accent-soft)] border border-[var(--accent-border)] space-y-1">
          <span className="text-xs font-semibold text-[var(--accent)] block">
            Completa la segunda frase con el mismo sentido
          </span>
          <p className="text-base sm:text-lg text-[var(--ink)] font-bold">
            {englishTargetWithGap}
          </p>
        </div>
      )}

      {exercise.type === 'translation' && spanishTranslation && (
        <div className="rounded-xl p-4 bg-[var(--accent-soft)] border border-[var(--accent-border)] space-y-1">
          <span className="text-xs font-semibold text-[var(--accent)] block">
            Frase a traducir al inglés
          </span>
          <p className="text-base sm:text-lg text-[var(--ink)] font-bold">
            “{spanishTranslation}”
          </p>
        </div>
      )}

      {showTranslation && spanishTranslation && exercise.type !== 'translation' && (
        <div className="rounded-xl p-3.5 bg-[var(--brass-soft)] border border-[var(--brass-border)] flex items-center gap-2.5 text-sm text-[var(--ink)]">
          <Languages className="w-4 h-4 text-[var(--brass)] shrink-0" aria-hidden="true" />
          <span>
            <strong className="font-semibold">Traducción:</strong> {spanishTranslation}
          </span>
        </div>
      )}

      {exercise.options && exercise.options.length > 0 && !submitted && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {exercise.options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => handleCheck(undefined, opt)}
              className="text-left px-4 py-3.5 rounded-xl bg-[var(--surface-2)] hover:bg-[var(--accent-soft)] border border-[var(--border)] hover:border-[var(--accent-border)] text-[var(--ink)] font-semibold transition-colors flex items-center justify-between group min-h-[48px]"
            >
              <span>{opt}</span>
              <ArrowRight
                className="w-4 h-4 text-[var(--ink-subtle)] group-hover:text-[var(--accent)] transition-colors"
                aria-hidden="true"
              />
            </button>
          ))}
        </div>
      )}

      <form onSubmit={(e) => handleCheck(e)} className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-2.5">
          <div className="flex-1">
            <label htmlFor={`exercise-input-${exercise.id}`} className="sr-only">
              Tu respuesta
            </label>
            <input
              id={`exercise-input-${exercise.id}`}
              name="exerciseAnswer"
              type="text"
              value={userInput}
              disabled={submitted}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder={
                exercise.type === 'error_correction'
                  ? 'Escribe la parte corregida o la frase entera…'
                  : exercise.type === 'translation'
                  ? 'Escribe la frase traducida al inglés…'
                  : 'Escribe tu respuesta para el hueco…'
              }
              className="input-field font-medium"
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
            />
          </div>

          {!submitted ? (
            <div className="flex gap-2">
              <button type="submit" className="btn btn-primary flex-1 sm:flex-initial">
                Comprobar
              </button>
              <button
                type="button"
                onClick={() => setShowHint(!showHint)}
                className="btn btn-secondary px-3.5"
                aria-label="Mostrar pista"
              >
                <HelpCircle className="w-5 h-5 text-[var(--brass)]" aria-hidden="true" />
              </button>
            </div>
          ) : (
            onNext && (
              <button type="button" onClick={onNext} className="btn btn-pine">
                <span>Siguiente</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            )
          )}
        </div>

        {showHint && !submitted && (
          <div className="flex items-start gap-2.5 text-xs sm:text-sm bg-[var(--brass-soft)] border border-[var(--brass-border)] text-[var(--ink)] px-3.5 py-2.5 rounded-xl">
            <Lightbulb className="w-4 h-4 text-[var(--brass)] shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="font-semibold">{firstLetterHint}</p>
              {exercise.grammarRule && (
                <p className="text-[var(--ink-muted)] mt-0.5">Fórmula: {exercise.grammarRule}</p>
              )}
            </div>
          </div>
        )}
      </form>

      {submitted && evaluation && (
        <div
          aria-live="polite"
          className={`rounded-xl p-4 sm:p-5 border space-y-4 ${
            evaluation.isCorrect
              ? 'bg-[var(--pine-soft)] border-[var(--pine-border)]'
              : 'bg-[var(--crimson-soft)] border-[var(--crimson-border)]'
          }`}
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex items-start gap-2.5">
              {evaluation.isCorrect ? (
                <CheckCircle2 className="w-5 h-5 text-[var(--pine)] shrink-0 mt-0.5" aria-hidden="true" />
              ) : (
                <XCircle className="w-5 h-5 text-[var(--crimson)] shrink-0 mt-0.5" aria-hidden="true" />
              )}
              <div>
                <h4
                  className={`font-bold text-sm sm:text-base ${
                    evaluation.isCorrect ? 'text-[var(--pine)]' : 'text-[var(--crimson)]'
                  }`}
                >
                  {evaluation.isCorrect
                    ? evaluation.hasMinorSpellingTypos
                      ? 'Gramática correcta (con una errata menor de escritura)'
                      : 'Correcto: estructura clavada.'
                    : 'No es exacto; revisa la frase corregida abajo.'}
                </h4>

                {evaluation.hasMinorSpellingTypos && evaluation.typoNotes.length > 0 && (
                  <p className="text-xs sm:text-sm text-[var(--brass)] font-semibold mt-1">
                    Revisa ortografía en: {evaluation.typoNotes.join(', ')}
                  </p>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={handleSaveToVault}
              disabled={savedToVault}
              className="btn btn-secondary btn-sm"
            >
              <BookmarkPlus className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{savedToVault ? 'Guardado' : 'Guardar fallo'}</span>
            </button>
          </div>

          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-4 space-y-2.5">
            {exercise.type === 'error_correction' && exercise.errorWord && (
              <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
                <span className="text-[var(--ink-muted)] font-semibold">Corrección clave:</span>
                <span className="px-2 py-0.5 rounded bg-[var(--crimson-soft)] border border-[var(--crimson-border)] text-[var(--crimson)] line-through font-mono">
                  {exercise.errorWord}
                </span>
                <span className="text-[var(--ink-subtle)]" aria-hidden="true">
                  →
                </span>
                <span className="px-2.5 py-0.5 rounded bg-[var(--pine-soft)] border border-[var(--pine-border)] text-[var(--pine)] font-mono font-bold">
                  {evaluation.shortCorrection}
                </span>
              </div>
            )}

            <div>
              <span className="text-xs font-semibold text-[var(--pine)] block mb-1">
                Frase completa corregida
              </span>
              <p className="text-base sm:text-lg text-[var(--ink)] font-semibold leading-relaxed">
                {renderHighlightedFullSentence(
                  evaluation.fullCorrectedSentence,
                  evaluation.shortCorrection
                )}
              </p>
            </div>

            {(!evaluation.isCorrect || evaluation.hasMinorSpellingTypos) &&
              evaluation.wordDiff.length > 0 && (
                <div className="pt-2.5 border-t border-[var(--border)]">
                  <span className="text-xs font-medium text-[var(--ink-muted)] block mb-1.5">
                    Comparación palabra por palabra
                  </span>
                  <div className="flex flex-wrap gap-1.5 text-sm">
                    {evaluation.wordDiff.map((token, idx) => {
                      if (token.status === 'ok') {
                        return (
                          <span key={idx} className="text-[var(--pine)] font-medium">
                            {token.word}
                          </span>
                        );
                      }
                      if (token.status === 'typo') {
                        return (
                          <span
                            key={idx}
                            className="px-1.5 py-0.5 rounded bg-[var(--brass-soft)] border border-[var(--brass-border)] text-[var(--brass)] font-semibold"
                            title={`Errata: ${token.expected}`}
                          >
                            {token.word}{' '}
                            <span className="text-[var(--pine)] text-xs">({token.expected})</span>
                          </span>
                        );
                      }
                      return (
                        <span
                          key={idx}
                          className="px-1.5 py-0.5 rounded bg-[var(--crimson-soft)] border border-[var(--crimson-border)] text-[var(--crimson)] line-through font-semibold"
                        >
                          {token.word}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}
          </div>

          <div className="text-sm space-y-2">
            <p className="leading-relaxed text-[var(--ink)]">
              <strong className="font-semibold text-[var(--accent)]">Por qué: </strong>
              {exercise.explanation}
            </p>
            {exercise.grammarRule && (
              <p className="text-xs font-mono bg-[var(--accent-soft)] border border-[var(--accent-border)] px-3 py-1.5 rounded-lg text-[var(--accent)] inline-block font-semibold">
                Regla: {exercise.grammarRule}
              </p>
            )}
          </div>

          {!evaluation.isCorrect && (
            <form onSubmit={handlePracticeAgainCheck} className="pt-3 border-t border-[var(--border)] space-y-2">
              <label
                htmlFor={`retype-${exercise.id}`}
                className="block text-xs font-semibold text-[var(--ink)]"
              >
                Escribe ahora «{evaluation.shortCorrection}» para fijarlo:
              </label>
              <div className="flex gap-2">
                <input
                  id={`retype-${exercise.id}`}
                  name="retypeAnswer"
                  type="text"
                  value={practiceAgainInput}
                  onChange={(e) => setPracticeAgainInput(e.target.value)}
                  placeholder={`Escribe: ${evaluation.shortCorrection}`}
                  className="input-field !min-h-[42px]"
                />
                <button type="submit" className="btn btn-brass btn-sm">
                  <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Fijar</span>
                </button>
              </div>
              {practiceAgainSuccess && (
                <p className="text-xs text-[var(--pine)] font-semibold">
                  Correcto, estructura fijada.
                </p>
              )}
            </form>
          )}
        </div>
      )}
    </article>
  );
};
