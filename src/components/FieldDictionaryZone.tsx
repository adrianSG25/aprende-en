import React, { useState, useMemo } from 'react';
import { DictionaryWord, DICTIONARY_CATEGORIES, DICTIONARY_WORDS } from '../data/fieldDictionaryData';
import { GameProgress } from '../types/streetGame';
import { checkAnswer } from '../utils/answerChecker';
import {
  BookOpen,
  Search,
  Volume2,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Sparkles,
  Send
} from 'lucide-react';

interface FieldDictionaryZoneProps {
  progress: GameProgress;
  onUpdateProgress: (updated: GameProgress) => void;
}

export const FieldDictionaryZone: React.FC<FieldDictionaryZoneProps> = ({
  progress,
  onUpdateProgress
}) => {
  const [activeTab, setActiveTab] = useState<'study' | 'quiz' | 'drill'>('study');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Quiz state
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizInput, setQuizInput] = useState('');
  const [showPhoneticHint, setShowPhoneticHint] = useState(false);
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [quizCorrect, setQuizCorrect] = useState(false);
  const [quizMasteredIds, setQuizMasteredIds] = useState<string[]>([]);

  // Drill (3 reps) state
  const [drillIndex, setDrillIndex] = useState(0);
  const [drillInput, setDrillInput] = useState('');
  const [drillReps, setDrillReps] = useState<Record<string, number>>({});
  const [drillAnswered, setDrillAnswered] = useState(false);
  const [drillCorrect, setDrillCorrect] = useState(false);

  // Filtered words based on category and search
  const filteredWords = useMemo(() => {
    return DICTIONARY_WORDS.filter((w) => {
      const matchesCat = selectedCategory === 'all' || w.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        w.es.toLowerCase().includes(q) ||
        w.en.toLowerCase().includes(q) ||
        w.pron.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Active list of words for Quiz & Drill
  const practiceWords = useMemo(() => {
    if (selectedCategory === 'all') return DICTIONARY_WORDS;
    return DICTIONARY_WORDS.filter((w) => w.category === selectedCategory);
  }, [selectedCategory]);

  const currentQuizWord: DictionaryWord | undefined =
    practiceWords[quizIndex % (practiceWords.length || 1)];

  const currentDrillWord: DictionaryWord | undefined =
    practiceWords[drillIndex % (practiceWords.length || 1)];

  // Quiz submit handler
  const handleQuizSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!currentQuizWord || !quizInput.trim() || quizAnswered) return;

    const isCorrect = checkAnswer(quizInput, [currentQuizWord.en, ...currentQuizWord.acceptedAnswers]);
    setQuizCorrect(isCorrect);
    setQuizAnswered(true);

    if (isCorrect) {
      if (!quizMasteredIds.includes(currentQuizWord.id)) {
        setQuizMasteredIds((prev) => [...prev, currentQuizWord.id]);
      }
      onUpdateProgress({
        ...progress,
        xp: progress.xp + 10,
        quids: progress.quids + 1
      });
    }
  };

  const handleNextQuiz = () => {
    setQuizIndex((prev) => prev + 1);
    setQuizInput('');
    setShowPhoneticHint(false);
    setQuizAnswered(false);
    setQuizCorrect(false);
  };

  // Drill (3 reps) submit handler
  const handleDrillSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!currentDrillWord || !drillInput.trim() || drillAnswered) return;

    const isCorrect = checkAnswer(drillInput, [currentDrillWord.en, ...currentDrillWord.acceptedAnswers]);
    setDrillCorrect(isCorrect);
    setDrillAnswered(true);

    const curReps = drillReps[currentDrillWord.id] || 0;
    if (isCorrect) {
      const nextReps = curReps + 1;
      setDrillReps((prev) => ({ ...prev, [currentDrillWord.id]: nextReps }));
      onUpdateProgress({
        ...progress,
        xp: progress.xp + 5
      });
    } else {
      setDrillReps((prev) => ({ ...prev, [currentDrillWord.id]: 0 }));
    }
  };

  const handleNextDrill = () => {
    const curReps = drillReps[currentDrillWord?.id || ''] || 0;
    if (curReps >= 3) {
      setDrillIndex((prev) => prev + 1);
    }
    setDrillInput('');
    setDrillAnswered(false);
    setDrillCorrect(false);
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-4 sm:p-6 shadow-md border border-indigo-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-2xl shadow-md shrink-0">
            📖
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40">
              Diccionario de Campo & Vocabulario
            </span>
            <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
              Top 50 Palabras, Verbos & Conceptos Clave
            </h2>
            <p className="text-xs text-slate-300">
              Con pronunciación fonética en español, ejemplos reales y entrenamiento por escritura.
            </p>
          </div>
        </div>

        {/* Global Mastered Stats Pill */}
        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-2xl p-2.5 shrink-0">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-bold text-slate-200">
            Dominadas: <strong className="text-amber-300">{quizMasteredIds.length}</strong> / {DICTIONARY_WORDS.length}
          </span>
        </div>
      </div>

      {/* Main Tab Switcher */}
      <div className="flex items-center gap-2 p-1.5 bg-slate-200/80 rounded-2xl overflow-x-auto text-xs font-bold">
        <button
          type="button"
          onClick={() => setActiveTab('study')}
          className={`flex-1 py-2.5 px-3 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center justify-center gap-2 ${
            activeTab === 'study'
              ? 'bg-white text-indigo-700 shadow-xs font-black'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Diccionario ({filteredWords.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('quiz')}
          className={`flex-1 py-2.5 px-3 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center justify-center gap-2 ${
            activeTab === 'quiz'
              ? 'bg-white text-indigo-700 shadow-xs font-black'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>✍️ Escribir y Evaluar</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('drill')}
          className={`flex-1 py-2.5 px-3 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center justify-center gap-2 ${
            activeTab === 'drill'
              ? 'bg-white text-indigo-700 shadow-xs font-black'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>🔁 Repetición 3x (Fijar)</span>
        </button>
      </div>

      {/* Category Pills Filter */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        <button
          type="button"
          onClick={() => setSelectedCategory('all')}
          className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap cursor-pointer transition-all ${
            selectedCategory === 'all'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
          }`}
        >
          Todas ({DICTIONARY_WORDS.length})
        </button>

        {DICTIONARY_CATEGORIES.map((cat) => {
          const count = DICTIONARY_WORDS.filter((w) => w.category === cat.id).length;
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap cursor-pointer transition-all flex items-center gap-1.5 ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label} ({count})</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: STUDY / DICTIONARY VIEW */}
      {activeTab === 'study' && (
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por español, inglés o pronunciación (ej: knowledge, saber, nóu)..."
              className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 outline-none focus:border-indigo-600 shadow-2xs"
            />
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredWords.map((item) => (
              <div
                key={item.id}
                className="bg-white border-2 border-slate-200 hover:border-indigo-300 rounded-2xl p-4 shadow-xs transition-all space-y-2 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                        {item.partOfSpeech === 'verb'
                          ? '⚡ Verbo'
                          : item.partOfSpeech === 'noun'
                          ? '📦 Sustantivo / Concepto'
                          : item.partOfSpeech === 'adjective'
                          ? '🎨 Adjetivo'
                          : '🔗 Conector'}
                      </span>
                      <h4 className="text-base sm:text-lg font-black text-slate-900 capitalize">
                        {item.es}
                      </h4>
                    </div>

                    <div className="text-right">
                      <span className="text-sm sm:text-base font-black text-indigo-700 block">
                        {item.en}
                      </span>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-amber-50 text-amber-900 border border-amber-200 inline-block mt-0.5 font-mono">
                        [{item.pron}]
                      </span>
                    </div>
                  </div>
                </div>

                {/* Example sentence */}
                <div className="pt-2 border-t border-slate-100 text-xs bg-slate-50 p-2.5 rounded-xl">
                  <p className="font-semibold text-slate-800">"{item.exampleEn}"</p>
                  <p className="text-[11px] text-slate-500 mt-0.5 italic">{item.exampleEs}</p>
                </div>
              </div>
            ))}
          </div>

          {filteredWords.length === 0 && (
            <div className="bg-white rounded-3xl p-8 text-center border border-slate-200">
              <p className="text-xs sm:text-sm text-slate-500">
                No se encontraron palabras para "{searchQuery}".
              </p>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: QUIZ / ACTIVE WRITING PRACTICE */}
      {activeTab === 'quiz' && currentQuizWord && (
        <div className="bg-white border-2 border-slate-200 rounded-3xl p-5 sm:p-6 shadow-sm space-y-4 max-w-2xl mx-auto">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
            <span>
              Palabra {(quizIndex % practiceWords.length) + 1} de {practiceWords.length}
            </span>
            <span className="bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-0.5 rounded-full font-black">
              +10 XP ⚡
            </span>
          </div>

          {/* Word Prompt in Spanish */}
          <div className="text-center py-4 bg-slate-50 rounded-2xl border border-slate-200">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 block mb-1">
              ¿Cómo se dice en inglés?
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 capitalize">
              {currentQuizWord.es}
            </h3>
            <span className="text-xs text-slate-500 block mt-1">
              {currentQuizWord.partOfSpeech === 'verb'
                ? '(Verbo)'
                : currentQuizWord.partOfSpeech === 'noun'
                ? '(Sustantivo / Concepto)'
                : '(Adjetivo / Palabra clave)'}
            </span>
          </div>

          {/* Phonetic Pronunciation Hint Button */}
          <div className="text-center">
            {!showPhoneticHint ? (
              <button
                type="button"
                onClick={() => setShowPhoneticHint(true)}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1.5 mx-auto cursor-pointer"
              >
                <Volume2 className="w-4 h-4 text-indigo-500" />
                <span>Mostrar cómo se pronuncia (pista fonética)</span>
              </button>
            ) : (
              <div className="inline-block px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-xl text-xs font-mono font-bold text-amber-900 animate-in fade-in">
                🔊 Se pronuncia: <strong>[{currentQuizWord.pron}]</strong>
              </div>
            )}
          </div>

          {/* User Input Form */}
          <form onSubmit={handleQuizSubmit} className="space-y-3">
            <input
              type="text"
              value={quizInput}
              onChange={(e) => setQuizInput(e.target.value)}
              disabled={quizAnswered}
              placeholder="Escribe la palabra en inglés..."
              className="w-full p-4 rounded-2xl border-2 border-slate-300 focus:border-indigo-600 focus:bg-white text-base font-bold text-slate-900 outline-none text-center transition-all placeholder:text-slate-400"
              autoComplete="off"
              autoFocus
            />

            {!quizAnswered ? (
              <button
                type="submit"
                disabled={!quizInput.trim()}
                className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm cursor-pointer transition-all"
              >
                <span>Comprobar</span>
                <Send className="w-4 h-4" />
              </button>
            ) : null}
          </form>

          {/* Feedback Card */}
          {quizAnswered && (
            <div
              className={`p-4 rounded-2xl border-2 animate-in fade-in duration-200 ${
                quizCorrect
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : 'bg-rose-50 border-rose-300 text-rose-950'
              }`}
            >
              <div className="flex items-center gap-2 font-black text-sm mb-1">
                {quizCorrect ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>¡Correcto! (+10 XP)</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                    <span>No es correcto</span>
                  </>
                )}
              </div>

              <div className="mt-2 bg-white/90 p-3 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase text-slate-500 block">
                    Palabra correcta en inglés:
                  </span>
                  <strong className="text-indigo-900 text-base font-black">
                    {currentQuizWord.en}
                  </strong>
                </div>
                <span className="text-xs font-mono font-bold px-2 py-1 rounded bg-amber-50 text-amber-900 border border-amber-200">
                  [{currentQuizWord.pron}]
                </span>
              </div>

              <div className="mt-2 text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <span className="font-bold text-slate-700 block mb-0.5">Ejemplo en la vida real:</span>
                <p className="font-semibold text-slate-900">"{currentQuizWord.exampleEn}"</p>
                <p className="text-[11px] text-slate-500 italic">{currentQuizWord.exampleEs}</p>
              </div>

              <button
                type="button"
                onClick={handleNextQuiz}
                className="mt-3.5 w-full py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <span>Siguiente Palabra</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: DRILL MODE (3 CONSECUTIVE REPS) */}
      {activeTab === 'drill' && currentDrillWord && (
        <div className="bg-white border-2 border-slate-200 rounded-3xl p-5 sm:p-6 shadow-sm space-y-4 max-w-2xl mx-auto">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
            <span>
              Repetición muscular: Palabra {(drillIndex % practiceWords.length) + 1} de {practiceWords.length}
            </span>
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400">Aciertos:</span>
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => {
                  const reps = drillReps[currentDrillWord.id] || 0;
                  const isFilled = i < reps;
                  return (
                    <span
                      key={i}
                      className={`w-3 h-3 rounded-full border transition-all ${
                        isFilled
                          ? 'bg-emerald-500 border-emerald-600 scale-110'
                          : 'bg-slate-200 border-slate-300'
                      }`}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          <div className="text-center py-4 bg-slate-50 rounded-2xl border border-slate-200">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 block mb-1">
              Escribe 3 veces seguidas bien para fijarla:
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 capitalize">
              {currentDrillWord.es}
            </h3>
            <span className="text-xs text-indigo-700 font-mono font-bold block mt-1">
              Inglés: {currentDrillWord.en} [{currentDrillWord.pron}]
            </span>
          </div>

          <form onSubmit={handleDrillSubmit} className="space-y-3">
            <input
              type="text"
              value={drillInput}
              onChange={(e) => setDrillInput(e.target.value)}
              disabled={drillAnswered}
              placeholder={`Escribe "${currentDrillWord.en}"...`}
              className="w-full p-4 rounded-2xl border-2 border-slate-300 focus:border-indigo-600 focus:bg-white text-base font-bold text-slate-900 outline-none text-center transition-all placeholder:text-slate-400"
              autoComplete="off"
              autoFocus
            />

            {!drillAnswered ? (
              <button
                type="submit"
                disabled={!drillInput.trim()}
                className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm cursor-pointer transition-all"
              >
                <span>Comprobar escritura</span>
                <Send className="w-4 h-4" />
              </button>
            ) : null}
          </form>

          {drillAnswered && (
            <div
              className={`p-4 rounded-2xl border-2 animate-in fade-in duration-200 text-center ${
                drillCorrect
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : 'bg-rose-50 border-rose-300 text-rose-950'
              }`}
            >
              <div className="flex items-center justify-center gap-2 font-black text-sm mb-1">
                {drillCorrect ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>
                      {(drillReps[currentDrillWord.id] || 0) >= 3
                        ? '🎉 ¡Palabra dominada al 100%!'
                        : `¡Bien escrito! (${drillReps[currentDrillWord.id] || 0}/3)`}
                    </span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                    <span>Has fallado. El contador vuelve a 0/3</span>
                  </>
                )}
              </div>

              <button
                type="button"
                onClick={handleNextDrill}
                className="mt-3 w-full py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <span>
                  {(drillReps[currentDrillWord.id] || 0) >= 3
                    ? 'Siguiente Palabra del Diccionario'
                    : 'Escribir de nuevo para confirmar'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
