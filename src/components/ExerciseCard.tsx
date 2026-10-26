import React, { useState, useEffect } from 'react';
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

const LEVEL_BADGE_COLORS: Record<string, string> = {
  'A2+': 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
  'B1': 'bg-sky-500/20 text-sky-300 border-sky-500/40',
  'B1+': 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40',
  'B2': 'bg-purple-500/20 text-purple-300 border-purple-500/40',
  'B2+': 'bg-rose-500/20 text-rose-300 border-rose-500/40'
};

const TYPE_LABELS: Record<string, string> = {
  cloze: 'Rellenar Hueco',
  transformation: 'Key Word Transformation',
  error_correction: 'Caza y Corrige el Error',
  translation: 'Traducción Inversa (ES → EN)',
  word_formation: 'Word Formation (Raíz)',
  multiple_choice: 'Opción Múltiple'
};

export const ExerciseCard: React.FC<ExerciseCardProps> = ({
  exercise,
  onAttempt,
  onNext,
  indexLabel,
  streakCount
}) => {
  const [userInput, setUserInput] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [evaluation, setEvaluation] = useState<DetailedEvaluation | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const [savedToVault, setSavedToVault] = useState(false);
  const [practiceAgainInput, setPracticeAgainInput] = useState('');
  const [practiceAgainSuccess, setPracticeAgainSuccess] = useState(false);

  useEffect(() => {
    setUserInput('');
    setSubmitted(false);
    setEvaluation(null);
    setShowHint(false);
    setShowTranslation(false);
    setSavedToVault(false);
    setPracticeAgainInput('');
    setPracticeAgainSuccess(false);
  }, [exercise.id]);

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

  // Ordenamos respuestas para que la pista muestre la respuesta corta (el núcleo gramatical)
  const sortedAnswers = [...exercise.acceptedAnswers].sort((a, b) => a.length - b.length);
  const shortTargetAnswer = sortedAnswers[0] || '';
  const firstLetterHint = shortTargetAnswer
    ? `Empieza por: "${shortTargetAnswer.slice(0, Math.min(3, shortTargetAnswer.length))}..." (${shortTargetAnswer.split(' ').length} palabra${shortTargetAnswer.split(' ').length > 1 ? 's' : ''})`
    : '';

  // Resaltar dentro de la frase completa corregida la parte que se ha cambiado/rellenado
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
        <span className="px-1.5 py-0.5 mx-0.5 rounded bg-emerald-500/30 border border-emerald-400 text-emerald-200 font-extrabold underline decoration-emerald-400">
          {match}
        </span>
        {after}
      </>
    );
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl transition-all">
      {/* Header Badges */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div className="flex flex-wrap items-center gap-2">
          {indexLabel && (
            <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300">
              {indexLabel}
            </span>
          )}
          <span
            className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${
              LEVEL_BADGE_COLORS[exercise.level] || 'bg-slate-800 text-slate-300'
            }`}
          >
            Nivel {exercise.level}
          </span>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-800/80 text-amber-300 border border-amber-500/20">
            {TYPE_LABELS[exercise.type] || exercise.type}
          </span>
          <span className="text-xs text-slate-400 font-medium">
            • {exercise.topicLabel}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Botón opcional para mostrar/ocultar traducción al español */}
          {spanishTranslation && exercise.type !== 'translation' && (
            <button
              type="button"
              onClick={() => setShowTranslation(!showTranslation)}
              className={`text-xs font-bold px-3 py-1.5 rounded-xl border flex items-center gap-1.5 transition-all cursor-pointer ${
                showTranslation
                  ? 'bg-indigo-600/30 border-indigo-400 text-indigo-200'
                  : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300'
              }`}
            >
              <Languages className="w-3.5 h-3.5" />
              {showTranslation ? 'Ocultar traducción' : 'Mostrar traducción'}
            </button>
          )}

          {streakCount !== undefined && streakCount > 0 && (
            <div className="flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-orange-500/15 text-orange-300 border border-orange-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              Racha: {streakCount}
            </div>
          )}
        </div>
      </div>

      {/* Prompt Instruction (or Cloze Sentence) */}
      <div className="mb-3">
        <p
          className={`${
            exercise.prompt.includes('___')
              ? 'text-base sm:text-lg font-semibold text-white bg-slate-950/90 border border-slate-800 rounded-xl p-4'
              : 'text-slate-300 text-sm sm:text-base font-medium'
          }`}
        >
          {exercise.prompt}
        </p>
      </div>

      {/* Base Sentence (for Transformation, Error Correction, Word Formation) */}
      {exercise.baseSentence && (
        <div className="bg-slate-950/90 border border-slate-800/90 rounded-xl p-4 mb-4 space-y-2.5">
          <p className="text-base sm:text-lg font-semibold text-white leading-relaxed">
            {exercise.baseSentence}
          </p>
          {exercise.keyWord && (
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                Palabra clave:
              </span>
              <span className="px-3 py-0.5 rounded-md bg-amber-500/20 border border-amber-400/50 text-amber-300 font-mono font-bold text-sm tracking-widest">
                {exercise.keyWord}
              </span>
            </div>
          )}
          {exercise.type === 'error_correction' && (
            <p className="text-xs text-slate-400">
              💡 Puedes escribir <strong>solo las palabras corregidas</strong> o la <strong>frase entera corregida</strong>.
            </p>
          )}
        </div>
      )}

      {/* Target English Sentence with Gap (for Key Word Transformation) */}
      {englishTargetWithGap && (
        <div className="bg-indigo-950/35 border border-indigo-500/35 rounded-xl p-4 mb-4">
          <span className="text-[11px] uppercase tracking-wider text-indigo-300 font-bold block mb-1">
            Completa la segunda frase para que signifique lo mismo:
          </span>
          <p className="text-base sm:text-lg text-white font-bold">
            {englishTargetWithGap}
          </p>
        </div>
      )}

      {/* Direct Spanish Prompt (ONLY for Reverse Translation exercises) */}
      {exercise.type === 'translation' && spanishTranslation && (
        <div className="bg-indigo-950/35 border border-indigo-500/35 rounded-xl p-4 mb-4">
          <span className="text-[11px] uppercase tracking-wider text-indigo-300 font-bold block mb-1">
            Frase a traducir al inglés:
          </span>
          <p className="text-base sm:text-lg text-white font-bold">
            "{spanishTranslation}"
          </p>
        </div>
      )}

      {/* Optional Spanish Translation Box (when user clicks "Mostrar traducción") */}
      {showTranslation && spanishTranslation && exercise.type !== 'translation' && (
        <div className="bg-slate-950/80 border border-indigo-500/30 rounded-xl p-3.5 mb-4 flex items-center gap-2.5 text-sm text-indigo-200">
          <Languages className="w-4 h-4 text-indigo-400 shrink-0" />
          <span>
            <strong>Traducción:</strong> {spanishTranslation}
          </span>
        </div>
      )}

      {/* Multiple Choice Options if available and not submitted */}
      {exercise.options && exercise.options.length > 0 && !submitted && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
          {exercise.options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => handleCheck(undefined, opt)}
              className="text-left px-4 py-3 rounded-xl bg-slate-800/70 hover:bg-indigo-600/30 border border-slate-700 hover:border-indigo-500/60 text-slate-100 font-medium transition-all flex items-center justify-between group cursor-pointer"
            >
              <span>{opt}</span>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-300 transition-transform group-hover:translate-x-0.5" />
            </button>
          ))}
        </div>
      )}

      {/* Text Input Form */}
      <form onSubmit={(e) => handleCheck(e)} className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-2.5">
          <input
            type="text"
            value={userInput}
            disabled={submitted}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder={
              exercise.type === 'error_correction'
                ? 'Escribe el verbo/parte corregida (o la frase entera)...'
                : exercise.type === 'translation'
                ? 'Escribe la frase traducida al inglés...'
                : 'Escribe tu respuesta para el hueco...'
            }
            className="flex-1 bg-slate-950 border border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-base outline-none disabled:opacity-70"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
          />

          {!submitted ? (
            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 sm:flex-initial px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/25 transition-all cursor-pointer"
              >
                Comprobar
              </button>
              <button
                type="button"
                onClick={() => setShowHint(!showHint)}
                title="Ver pista"
                className="px-3.5 py-3 bg-slate-800 hover:bg-slate-700 text-amber-300 rounded-xl border border-slate-700 transition-all cursor-pointer"
              >
                <HelpCircle className="w-5 h-5" />
              </button>
            </div>
          ) : (
            onNext && (
              <button
                type="button"
                onClick={onNext}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Siguiente</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )
          )}
        </div>

        {/* Hint Box before submitting */}
        {showHint && !submitted && (
          <div className="flex items-start gap-2.5 text-xs sm:text-sm bg-amber-500/10 border border-amber-500/30 text-amber-200 px-3.5 py-2.5 rounded-xl">
            <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">{firstLetterHint}</p>
              {exercise.grammarRule && (
                <p className="text-amber-300/90 mt-0.5">Fórmula: {exercise.grammarRule}</p>
              )}
            </div>
          </div>
        )}
      </form>

      {/* Feedback & Full Corrected Sentence Section */}
      {submitted && evaluation && (
        <div
          className={`mt-5 rounded-xl p-4 sm:p-5 border space-y-4 ${
            evaluation.isCorrect
              ? 'bg-emerald-950/35 border-emerald-500/40 text-emerald-100'
              : 'bg-rose-950/35 border-rose-500/40 text-rose-100'
          }`}
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex items-start gap-2.5">
              {evaluation.isCorrect ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-6 h-6 text-rose-400 shrink-0 mt-0.5" />
              )}
              <div>
                <h4 className="font-bold text-base">
                  {evaluation.isCorrect
                    ? evaluation.hasMinorSpellingTypos
                      ? '¡Gramática correcta! (Con una pequeña errata de letras al copiar la frase)'
                      : '¡Correcto! Muy bien clavada la estructura.'
                    : '¡Casi! Mira la frase corregida abajo (se ha guardado en tu Zona de Repetición).'}
                </h4>

                {/* Si tenía errata de teclado en el resto de la frase pero acertó la gramática */}
                {evaluation.hasMinorSpellingTypos && evaluation.typoNotes.length > 0 && (
                  <p className="text-xs sm:text-sm text-amber-300 font-semibold mt-1">
                    ⚠️ Ojo solo al spelling de: {evaluation.typoNotes.join(', ')}
                  </p>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={handleSaveToVault}
              disabled={savedToVault}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg border flex items-center gap-1.5 transition-all cursor-pointer ${
                savedToVault
                  ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                  : 'bg-slate-900/80 hover:bg-slate-800 border-slate-700 text-slate-200'
              }`}
            >
              <BookmarkPlus className="w-3.5 h-3.5" />
              {savedToVault ? 'Guardado en Repetición' : 'Forzar Repetición'}
            </button>
          </div>

          {/* CAJA DE FRASE CORREGIDA COMPLETA + CAMBIO EXACTO */}
          <div className="bg-slate-950/90 border border-white/10 rounded-xl p-4 space-y-2.5">
            {exercise.type === 'error_correction' && exercise.errorWord && (
              <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
                <span className="text-slate-400 font-semibold">Cambio gramatical clave:</span>
                <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 line-through font-mono">
                  ❌ {exercise.errorWord}
                </span>
                <span className="text-slate-400">→</span>
                <span className="px-2.5 py-0.5 rounded bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 font-mono font-bold">
                  ✅ {evaluation.shortCorrection}
                </span>
              </div>
            )}

            <div>
              <span className="text-[11px] uppercase tracking-wider text-emerald-400 font-bold block mb-1">
                ✅ Frase completa corregida:
              </span>
              <p className="text-base sm:text-lg text-white font-semibold leading-relaxed">
                {renderHighlightedFullSentence(
                  evaluation.fullCorrectedSentence,
                  evaluation.shortCorrection
                )}
              </p>
            </div>

            {/* Si el usuario cometió errores o erratas, le mostramos palabra por palabra dónde falló su frase */}
            {(!evaluation.isCorrect || evaluation.hasMinorSpellingTypos) &&
              evaluation.wordDiff.length > 0 && (
                <div className="pt-2 border-t border-slate-800">
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block mb-1">
                    🔍 Lo que escribiste tú (revisión palabra por palabra):
                  </span>
                  <div className="flex flex-wrap gap-1.5 text-sm">
                    {evaluation.wordDiff.map((token, idx) => {
                      if (token.status === 'ok') {
                        return (
                          <span key={idx} className="text-emerald-300 font-medium">
                            {token.word}
                          </span>
                        );
                      }
                      if (token.status === 'typo') {
                        return (
                          <span
                            key={idx}
                            className="px-1.5 py-0.5 rounded bg-amber-500/20 border border-amber-500/40 text-amber-200 font-bold"
                            title={`Errata: ${token.expected}`}
                          >
                            {token.word}{' '}
                            <span className="text-emerald-300 text-xs">
                              ({token.expected})
                            </span>
                          </span>
                        );
                      }
                      return (
                        <span
                          key={idx}
                          className="px-1.5 py-0.5 rounded bg-rose-500/25 border border-rose-500/40 text-rose-200 line-through font-bold"
                        >
                          {token.word}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}
          </div>

          {/* Detailed Grammatical Explanation */}
          <div className="pt-1 text-sm space-y-1.5">
            <p className="leading-relaxed text-slate-200">
              <strong className="text-amber-300">Por qué: </strong>
              {exercise.explanation}
            </p>
            {exercise.grammarRule && (
              <p className="text-xs font-mono bg-slate-950/70 px-3 py-1.5 rounded-lg text-indigo-300 inline-block">
                📐 Regla: {exercise.grammarRule}
              </p>
            )}
          </div>

          {/* Instant Re-type Box when the user fails */}
          {!evaluation.isCorrect && (
            <form onSubmit={handlePracticeAgainCheck} className="pt-3 border-t border-white/10">
              <label className="block text-xs font-bold uppercase tracking-wider text-amber-300 mb-1.5">
                ✍️ Escribe ahora "{evaluation.shortCorrection}" (o la frase entera) para fijarlo:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={practiceAgainInput}
                  onChange={(e) => setPracticeAgainInput(e.target.value)}
                  placeholder={`Escribe: ${evaluation.shortCorrection}`}
                  className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-amber-400"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition-all cursor-pointer flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Fijar
                </button>
              </div>
              {practiceAgainSuccess && (
                <p className="text-xs text-emerald-300 font-semibold mt-1.5">
                  ✅ ¡Perfecto! Ya la tienes en la memoria muscular.
                </p>
              )}
            </form>
          )}
        </div>
      )}
    </div>
  );
};
