import React, { useState } from 'react';
import { StreetTopic, StreetExercise } from '../types/streetGame';
import {
  ArrowLeft,
  Sparkles,
  BookOpen,
  Volume2,
  CheckCircle2,
  XCircle,
  ArrowRight
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
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const currentExercise: StreetExercise = topic.exercises[drillIndex];
  const isCompleted = completedExerciseIds.includes(currentExercise?.id);
  const isCorrect = selectedOption === currentExercise?.correctIndex;

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);
    const correct = idx === currentExercise.correctIndex;
    onCompleteExercise(currentExercise.id, correct, correct ? currentExercise.xpReward : 0);
  };

  const handleNextDrill = () => {
    if (drillIndex + 1 < topic.exercises.length) {
      setDrillIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    }
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto animate-in fade-in duration-200">
      {/* Top Bar with Back Button */}
      <div className="flex items-center justify-between gap-3 bg-white border border-slate-200 rounded-2xl p-3 sm:p-4 shadow-xs">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700 hover:text-indigo-600 px-3 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Mapa de Barrios</span>
        </button>

        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
          <button
            type="button"
            onClick={() => setActiveTab('phrases')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'phrases'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            📖 Expresiones de Calle
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('drills')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'drills'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            ⚡ Desafíos ({topic.exercises.length})
          </button>
        </div>
      </div>

      {/* Topic Header */}
      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-5 sm:p-6 shadow-md border border-indigo-800">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-3xl shrink-0 shadow-inner">
            {topic.icon}
          </div>
          <div>
            <span className="text-[10px] font-black tracking-widest uppercase px-2.5 py-0.5 rounded-full bg-indigo-500/30 border border-indigo-400 text-indigo-200">
              Tema de Calle
            </span>
            <h2 className="text-xl sm:text-2xl font-black mt-1 text-white tracking-tight">
              {topic.title}
            </h2>
            <p className="text-xs sm:text-sm text-indigo-200 font-medium mt-0.5">
              {topic.subtitle}
            </p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 mt-4 leading-relaxed bg-black/20 p-3.5 rounded-2xl border border-white/5">
          {topic.description}
        </p>
      </div>

      {/* TAB 1: PHRASES (TEXTBOOK VS STREET) */}
      {activeTab === 'phrases' && (
        <div className="space-y-4">
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs sm:text-sm text-amber-950 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-black text-amber-900">Regla de Oro Británica:</strong>
              <p className="mt-0.5 text-amber-800">
                Aprende la diferencia radical entre el inglés "encorsetado" que te enseñan en la escuela y cómo lo dice de verdad la gente en la calle en el día a día.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {topic.phrases.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border-2 border-slate-200 p-4 sm:p-5 shadow-xs hover:border-indigo-300 transition-all space-y-3"
              >
                {/* Contrast Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-1">
                      ❌ Lo que te enseña la academia
                    </span>
                    <p className="text-xs sm:text-sm font-semibold text-slate-700 line-through">
                      "{item.formal}"
                    </p>
                  </div>

                  <div className="bg-emerald-50 border-2 border-emerald-300 rounded-xl p-3 shadow-xs">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 block mb-1">
                      ✅ Cómo lo dice un inglés en la calle
                    </span>
                    <p className="text-xs sm:text-sm font-black text-emerald-950">
                      "{item.street}"
                    </p>
                  </div>
                </div>

                {/* Spanish Meaning & Context */}
                <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div>
                    <span className="text-slate-400 font-bold">En cristiano:</span>{' '}
                    <strong className="text-slate-900 font-bold">{item.es}</strong>
                  </div>
                </div>

                <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  💡 <strong>Cuándo se usa:</strong> {item.context}
                </p>

                {item.notes && (
                  <p className="text-xs text-indigo-700 bg-indigo-50/70 p-2 rounded-xl">
                    ⚠️ {item.notes}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Cultural Secrets & Audio Guidance */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-xs font-black text-slate-900">
                <BookOpen className="w-4 h-4 text-indigo-600" />
                <span>Secretos Culturales de Calle</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {topic.culturalSecrets.map((secret, sIdx) => (
                  <li key={sIdx} className="flex items-start gap-1.5">
                    <span className="text-indigo-500 font-bold">•</span>
                    <span>{secret}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-xs font-black text-slate-900">
                <Volume2 className="w-4 h-4 text-emerald-600" />
                <span>Pronunciación y Ritmo Real</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {topic.audioTips}
              </p>
            </div>
          </div>

          {/* Direct CTA to Exercises */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setActiveTab('drills')}
              className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-98 cursor-pointer"
            >
              <span>¡Entendido! Pasar a los Desafíos de Práctica (+XP)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: DRILLS */}
      {activeTab === 'drills' && currentExercise && (
        <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <div className="flex items-center gap-2">
              <span>
                Desafío {drillIndex + 1} de {topic.exercises.length}
              </span>
              {isCompleted && (
                <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full font-bold">
                  ✓ Ya superado
                </span>
              )}
            </div>
            <span className="bg-indigo-50 text-indigo-700 border border-indigo-200 px-2 py-0.5 rounded-full font-black">
              +{currentExercise.xpReward} XP Callejera ⚡
            </span>
          </div>

          {/* Situation Box */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs sm:text-sm">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">
              Situación Real
            </span>
            <p className="text-slate-800 font-medium">{currentExercise.situation}</p>

            {currentExercise.incomingMessage && (
              <div className="mt-2.5 bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 text-emerald-950 font-mono text-xs">
                💬 {currentExercise.incomingMessage}
              </div>
            )}
          </div>

          {/* Question */}
          <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
            {currentExercise.question}
          </h3>

          {/* Options */}
          <div className="space-y-2.5">
            {currentExercise.options.map((opt, idx) => {
              let btnClass =
                'bg-white border-slate-200 text-slate-800 hover:border-indigo-400 hover:bg-indigo-50/50';

              if (isAnswered) {
                if (idx === currentExercise.correctIndex) {
                  btnClass = 'bg-emerald-500 border-emerald-600 text-white shadow-sm font-bold';
                } else if (idx === selectedOption) {
                  btnClass = 'bg-rose-500 border-rose-600 text-white font-bold';
                } else {
                  btnClass = 'bg-slate-100 border-slate-200 text-slate-400 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswered}
                  className={`w-full text-left p-3.5 rounded-2xl border-2 text-xs sm:text-sm transition-all flex items-start gap-3 cursor-pointer ${btnClass}`}
                >
                  <span className="w-6 h-6 rounded-xl bg-black/10 flex items-center justify-center font-bold text-xs shrink-0">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="flex-1 leading-snug">{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Result Card */}
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
                    <span>¡Clavado! Hablas como un local</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-rose-600" />
                    <span>¡Ojo, trampa de guiri!</span>
                  </>
                )}
              </div>
              <p className="text-xs sm:text-sm mt-1">{currentExercise.explanationEs}</p>
              <div className="mt-2 text-xs font-semibold bg-white/80 p-2.5 rounded-xl text-slate-700">
                💡 <strong>Truco callejero:</strong> {currentExercise.streetTip}
              </div>

              {drillIndex + 1 < topic.exercises.length ? (
                <button
                  type="button"
                  onClick={handleNextDrill}
                  className="mt-3.5 w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                  <span>Siguiente Desafío</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <div className="mt-4 p-3 bg-white rounded-xl border border-emerald-200 text-center">
                  <span className="text-xs font-black text-emerald-800">
                    🎉 ¡Has completado todos los ejercicios de este tema!
                  </span>
                  <button
                    type="button"
                    onClick={onBack}
                    className="mt-2 w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs cursor-pointer"
                  >
                    Volver al Mapa y Desafiar al Jefe
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
