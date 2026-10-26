import React, { useState, useEffect } from 'react';
import { Exercise } from '../types';
import { checkAnswerMatch } from '../data/infiniteGenerator';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  BookmarkPlus,
  Sparkles,
  ArrowRight,
  Lightbulb
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
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [savedToVault, setSavedToVault] = useState(false);
  const [practiceAgainInput, setPracticeAgainInput] = useState('');
  const [practiceAgainSuccess, setPracticeAgainSuccess] = useState(false);

  useEffect(() => {
    setUserInput('');
    setSubmitted(false);
    setIsCorrect(false);
    setShowHint(false);
    setSavedToVault(false);
    setPracticeAgainInput('');
    setPracticeAgainSuccess(false);
  }, [exercise.id]);

  const handleCheck = (e?: React.FormEvent, directOption?: string) => {
    if (e) e.preventDefault();
    const val = directOption !== undefined ? directOption : userInput;
    if (!val.trim() && ! submitted) return;

    if (directOption !== undefined) {
      setUserInput(directOption);
    }

    const correct = checkAnswerMatch(val, exercise.acceptedAnswers);
    setIsCorrect(correct);
    setSubmitted(true);
    onAttempt(exercise, correct, false);
  };

  const handleSaveToVault = () => {
    setSavedToVault(true);
    onAttempt(exercise, isCorrect, true);
  };

  const handlePracticeAgainCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (checkAnswerMatch(practiceAgainInput, exercise.acceptedAnswers)) {
      setPracticeAgainSuccess(true);
    }
  };

  const firstAnswer = exercise.acceptedAnswers[0] || '';
  const firstLetterHint = firstAnswer
    ? `Empieza por: "${firstAnswer.slice(0, Math.min(3, firstAnswer.length))}..." (${firstAnswer.split(' ').length} palabra${firstAnswer.split(' ').length > 1 ? 's' : ''})`
    : '';

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

        {streakCount !== undefined && streakCount > 0 && (
          <div className="flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-orange-500/15 text-orange-300 border border-orange-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            Racha: {streakCount} seguidas
          </div>
        )}
      </div>

      {/* Prompt Instruction */}
      <p className="text-slate-300 text-sm sm:text-base font-medium mb-3">
        {exercise.prompt}
      </p>

      {/* Base Sentence (for Transformation, Error Correction, Word Formation) */}
      {exercise.baseSentence && (
        <div className="bg-slate-950/90 border border-slate-800/90 rounded-xl p-4 mb-4">
          <p className="text-base sm:text-lg font-semibold text-white leading-relaxed">
            {exercise.baseSentence}
          </p>
          {exercise.keyWord && (
            <div className="mt-2.5 flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                Palabra clave obligatoria:
              </span>
              <span className="px-3 py-0.5 rounded-md bg-amber-500/20 border border-amber-400/50 text-amber-300 font-mono font-bold text-sm tracking-widest">
                {exercise.keyWord}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Spanish Hint or Target Sentence with Gap */}
      {exercise.spanishHint && (
        <div className="bg-indigo-950/30 border border-indigo-500/25 rounded-xl p-3.5 mb-4">
          <p className="text-sm sm:text-base text-indigo-200 font-medium">
            🎯 {exercise.spanishHint}
          </p>
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
              className="text-left px-4 py-3 rounded-xl bg-slate-800/70 hover:bg-indigo-600/30 border border-slate-700 hover:border-indigo-500/60 text-slate-100 font-medium transition-all flex items-center justify-between group"
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
                ? 'Escribe la parte corregida o la frase entera corregida...'
                : exercise.type === 'translation'
                ? 'Escribe la frase traducida al inglés...'
                : 'Escribe tu respuesta aquí...'
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

      {/* Feedback & Explanation Section */}
      {submitted && (
        <div
          className={`mt-5 rounded-xl p-4 border ${
            isCorrect
              ? 'bg-emerald-950/35 border-emerald-500/40 text-emerald-100'
              : 'bg-rose-950/35 border-rose-500/40 text-rose-100'
          }`}
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex items-center gap-2.5">
              {isCorrect ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
              ) : (
                <XCircle className="w-6 h-6 text-rose-400 shrink-0" />
              )}
              <div>
                <h4 className="font-bold text-base">
                  {isCorrect
                    ? '¡Correcto! Muy bien clavada la estructura.'
                    : '¡Casi! Se ha añadido automáticamente a tu Zona de Repetición de Fallos.'}
                </h4>
                <p className="text-sm mt-0.5">
                  <span className="opacity-80">Respuesta correcta: </span>
                  <span className="font-mono font-bold text-white bg-slate-900/90 px-2 py-0.5 rounded border border-white/10">
                    {exercise.acceptedAnswers.join('  /  ')}
                  </span>
                </p>
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

          {/* Detailed Grammatical Explanation */}
          <div className="mt-3 pt-3 border-t border-white/10 text-sm space-y-1.5">
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

          {/* Instant Re-type Box when the user fails (to lock it into muscle memory immediately!) */}
          {!isCorrect && (
            <form onSubmit={handlePracticeAgainCheck} className="mt-3 pt-3 border-t border-white/10">
              <label className="block text-xs font-bold uppercase tracking-wider text-amber-300 mb-1.5">
                ✍️ Escríbela ahora bien una vez para que se te quede grabada:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={practiceAgainInput}
                  onChange={(e) => setPracticeAgainInput(e.target.value)}
                  placeholder={`Escribe: ${exercise.acceptedAnswers[0]}`}
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
