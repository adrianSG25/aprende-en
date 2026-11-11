import React, { useState, useMemo } from 'react';
import {
  DictionaryWord,
  DICTIONARY_CATEGORIES,
  DICTIONARY_WORDS,
  loadCustomDictionaryWords,
  appendCustomDictionaryWords
} from '../data/fieldDictionaryData';
import { GameProgress } from '../types/streetGame';
import { checkAnswer } from '../utils/answerChecker';
import { generateCustomVocabularyWithAI } from '../services/aiService';
import { NativeDialog } from './NativeDialog';
import {
  BookOpen,
  Search,
  Volume2,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Sparkles,
  Send,
  X,
  RefreshCw,
  Star,
  History,
  Zap,
  Brain,
  Link2,
  Landmark,
  PenLine,
  Repeat,
  AlertTriangle
} from 'lucide-react';

interface FieldDictionaryZoneProps {
  progress: GameProgress;
  onUpdateProgress: (updated: GameProgress) => void;
}

function getCategoryIcon(catId: string): React.ComponentType<{ className?: string }> {
  switch (catId) {
    case 'top50':
      return Star;
    case 'past_verbs':
      return History;
    case 'verbs':
      return Zap;
    case 'core_concepts':
      return Brain;
    case 'connectors':
      return Link2;
    case 'uk_life':
      return Landmark;
    default:
      return Sparkles;
  }
}

function getPartOfSpeechLabel(item: DictionaryWord): string {
  if (item.category === 'past_verbs') return 'Verbo en pasado';
  if (item.partOfSpeech === 'verb') return 'Verbo';
  if (item.partOfSpeech === 'noun') return 'Sustantivo';
  if (item.partOfSpeech === 'adjective') return 'Adjetivo';
  return 'Conector';
}

const AI_QUICK_TOPICS = [
  {
    id: 'past',
    label: '50 verbos en pasado',
    prompt: '50 verbos en pasado irregulares y cotidianos'
  },
  {
    id: 'pub',
    label: '50 palabras de pub',
    prompt: '50 palabras y jerga para ir al pub y salir en UK'
  },
  {
    id: 'work',
    label: '50 términos de trabajo',
    prompt: '50 términos de trabajo, oficina y contratos en UK'
  },
  {
    id: 'grocery',
    label: '50 palabras de súper',
    prompt: '50 palabras de cocina, comida y supermercado en UK'
  },
  {
    id: 'cars',
    label: '50 términos de motor',
    prompt: '50 términos de coches, taller mecánico y tráfico'
  }
];

export const FieldDictionaryZone: React.FC<FieldDictionaryZoneProps> = ({
  progress,
  onUpdateProgress
}) => {
  const [activeTab, setActiveTab] = useState<'study' | 'quiz' | 'drill'>('study');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [customWords, setCustomWords] = useState<DictionaryWord[]>(() =>
    loadCustomDictionaryWords()
  );

  const [showAIModal, setShowAIModal] = useState(false);
  const [aiTopic, setAiTopic] = useState('50 verbos en pasado irregulares y cotidianos');
  const [aiCount, setAiCount] = useState(50);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [aiSuccessMsg, setAiSuccessMsg] = useState<string | null>(null);

  const [quizIndex, setQuizIndex] = useState(0);
  const [quizInput, setQuizInput] = useState('');
  const [showPhoneticHint, setShowPhoneticHint] = useState(false);
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [quizCorrect, setQuizCorrect] = useState(false);
  const [quizMasteredIds, setQuizMasteredIds] = useState<string[]>([]);

  const [drillIndex, setDrillIndex] = useState(0);
  const [drillInput, setDrillInput] = useState('');
  const [drillReps, setDrillReps] = useState<Record<string, number>>({});
  const [drillAnswered, setDrillAnswered] = useState(false);
  const [drillCorrect, setDrillCorrect] = useState(false);

  const allWords = useMemo(() => {
    return [...customWords, ...DICTIONARY_WORDS];
  }, [customWords]);

  const filteredWords = useMemo(() => {
    return allWords.filter((w) => {
      const matchesCat =
        selectedCategory === 'all' ||
        w.category === selectedCategory ||
        (selectedCategory === 'custom_ai' &&
          (w.category === 'custom_ai' || customWords.some((c) => c.id === w.id)));
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        w.es.toLowerCase().includes(q) ||
        w.en.toLowerCase().includes(q) ||
        w.pron.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [allWords, selectedCategory, searchQuery, customWords]);

  const practiceWords = useMemo(() => {
    if (selectedCategory === 'all') return allWords;
    return allWords.filter(
      (w) =>
        w.category === selectedCategory ||
        (selectedCategory === 'custom_ai' &&
          (w.category === 'custom_ai' || customWords.some((c) => c.id === w.id)))
    );
  }, [allWords, selectedCategory, customWords]);

  const currentQuizWord: DictionaryWord | undefined =
    practiceWords[quizIndex % (practiceWords.length || 1)];

  const currentDrillWord: DictionaryWord | undefined =
    practiceWords[drillIndex % (practiceWords.length || 1)];

  const handleQuizSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!currentQuizWord || !quizInput.trim() || quizAnswered) return;

    const isCorrect = checkAnswer(quizInput, [
      currentQuizWord.en,
      ...currentQuizWord.acceptedAnswers
    ]);
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

  const handleDrillSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!currentDrillWord || !drillInput.trim() || drillAnswered) return;

    const isCorrect = checkAnswer(drillInput, [
      currentDrillWord.en,
      ...currentDrillWord.acceptedAnswers
    ]);
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

  const handleGenerateVocabulary = async () => {
    if (!aiTopic.trim()) return;
    setIsGeneratingAI(true);
    setAiError(null);
    setAiSuccessMsg(null);

    try {
      const existingEnglishWords = allWords.map((w) => w.en.toLowerCase().trim());
      const generated = await generateCustomVocabularyWithAI(
        aiTopic,
        aiCount,
        existingEnglishWords
      );

      if (!generated || generated.length === 0) {
        throw new Error('La IA no devolvió palabras válidas. Concreta un poco más el tema.');
      }

      const formattedWords: DictionaryWord[] = generated.map((item, idx) => ({
        id: `ai-word-${Date.now()}-${idx}`,
        es: item.es,
        en: item.en,
        acceptedAnswers: item.acceptedAnswers,
        pron: item.pron,
        category: aiTopic.toLowerCase().includes('pasado') ? 'past_verbs' : 'custom_ai',
        partOfSpeech: item.partOfSpeech,
        exampleEn: item.exampleEn,
        exampleEs: item.exampleEs
      }));

      const updated = appendCustomDictionaryWords(formattedWords);
      setCustomWords(updated);
      setAiSuccessMsg(
        `Se han añadido ${formattedWords.length} palabras nuevas sobre «${aiTopic}» al diccionario.`
      );
      onUpdateProgress({
        ...progress,
        xp: progress.xp + 30,
        quids: progress.quids + 2
      });

      if (aiTopic.toLowerCase().includes('pasado')) {
        setSelectedCategory('past_verbs');
      } else {
        setSelectedCategory('custom_ai');
      }

      setTimeout(() => {
        setShowAIModal(false);
        setAiSuccessMsg(null);
      }, 1500);
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : 'Error al conectar con la IA. Revisa tu clave API en Ajustes IA.';
      setAiError(msg);
    } finally {
      setIsGeneratingAI(false);
    }
  };

  return (
    <div className="space-y-5 max-w-4xl mx-auto">
      {/* Cabecera editorial limpia */}
      <section className="card p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5 flex-wrap">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-[var(--ink)] tracking-[-0.02em]">
              Diccionario de campo
            </h2>
            <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-md bg-[var(--surface-2)] border border-[var(--border)] text-[var(--ink-muted)] tabular-nums">
              {allWords.length} términos
            </span>
          </div>
          <p className="text-sm text-[var(--ink-muted)]">
            Vocabulario esencial, verbos en pasado, pronunciación fonética aproximada y ampliaciones con IA.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAIModal(true)}
          className="btn btn-primary shrink-0"
        >
          <Sparkles className="w-4 h-4" aria-hidden="true" />
          <span>Generar lista con IA</span>
        </button>
      </section>

      {/* Selector de modo */}
      <div className="segmented">
        <button
          type="button"
          onClick={() => setActiveTab('study')}
          className={`segmented-item tabular-nums ${
            activeTab === 'study' ? 'segmented-item-active' : ''
          }`}
        >
          <BookOpen className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>Diccionario ({filteredWords.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('quiz')}
          className={`segmented-item ${
            activeTab === 'quiz' ? 'segmented-item-active' : ''
          }`}
        >
          <PenLine className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>Evaluar</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('drill')}
          className={`segmented-item ${
            activeTab === 'drill' ? 'segmented-item-active' : ''
          }`}
        >
          <Repeat className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>Fijar 3x</span>
        </button>
      </div>

      {/* Filtros por categoría */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
        <button
          type="button"
          onClick={() => setSelectedCategory('all')}
          className={`px-3 py-2 rounded-lg font-semibold whitespace-nowrap transition-colors min-h-[36px] tabular-nums border ${
            selectedCategory === 'all'
              ? 'bg-[var(--ink)] text-white border-[var(--ink)]'
              : 'bg-[var(--surface)] text-[var(--ink-muted)] border-[var(--border)] hover:text-[var(--ink)]'
          }`}
        >
          Todas ({allWords.length})
        </button>

        {DICTIONARY_CATEGORIES.map((cat) => {
          const count = allWords.filter((w) => w.category === cat.id).length;
          const isActive = selectedCategory === cat.id;
          const CatIcon = getCategoryIcon(cat.id);
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-2 rounded-lg font-semibold whitespace-nowrap transition-colors min-h-[36px] flex items-center gap-1.5 tabular-nums border ${
                isActive
                  ? 'bg-[var(--accent)] text-white border-[var(--accent)]'
                  : 'bg-[var(--surface)] text-[var(--ink-muted)] border-[var(--border)] hover:text-[var(--ink)]'
              }`}
            >
              <CatIcon className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>
                {cat.label} ({count})
              </span>
            </button>
          );
        })}

        {customWords.length > 0 && (
          <button
            type="button"
            onClick={() => setSelectedCategory('custom_ai')}
            className={`px-3 py-2 rounded-lg font-semibold whitespace-nowrap transition-colors min-h-[36px] flex items-center gap-1.5 tabular-nums border ${
              selectedCategory === 'custom_ai'
                ? 'bg-[var(--brass)] text-white border-[var(--brass)]'
                : 'bg-[var(--brass-soft)] text-[var(--brass)] border-[var(--brass-border)]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span>Creadas con IA ({customWords.length})</span>
          </button>
        )}
      </div>

      {/* PESTAÑA 1: LISTADO DEL DICCIONARIO */}
      {activeTab === 'study' && (
        <div className="space-y-4">
          <div className="relative">
            <label htmlFor="dictionary-search" className="sr-only">
              Buscar palabra en español, inglés o pronunciación
            </label>
            <Search
              className="w-4 h-4 text-[var(--ink-subtle)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              id="dictionary-search"
              name="dictionarySearch"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por español, inglés o fonética (ej: went, knowledge, uént)…"
              className="input-field !pl-10"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredWords.map((item) => (
              <article
                key={item.id}
                className="card p-4 space-y-3 flex flex-col justify-between"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <span className="text-xs font-medium text-[var(--ink-subtle)] block">
                      {getPartOfSpeechLabel(item)}
                    </span>
                    <h3 className="font-display text-base sm:text-lg font-bold text-[var(--ink)] capitalize mt-0.5">
                      {item.es}
                    </h3>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="font-display text-base sm:text-lg font-bold text-[var(--accent)] block">
                      {item.en}
                    </span>
                    <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-[var(--brass-soft)] text-[var(--brass)] border border-[var(--brass-border)] inline-block mt-1">
                      [{item.pron}]
                    </span>
                  </div>
                </div>

                <div className="inset-well p-3 text-xs sm:text-sm space-y-0.5">
                  <p className="font-medium text-[var(--ink)]">“{item.exampleEn}”</p>
                  <p className="text-xs text-[var(--ink-muted)] italic">{item.exampleEs}</p>
                </div>
              </article>
            ))}
          </div>

          {filteredWords.length === 0 && (
            <div className="card p-8 text-center">
              <p className="text-sm text-[var(--ink-muted)]">
                No se encontraron términos que coincidan con «{searchQuery}».
              </p>
            </div>
          )}
        </div>
      )}

      {/* PESTAÑA 2: EVALUACIÓN ACTIVA */}
      {activeTab === 'quiz' && currentQuizWord && (
        <section className="card p-5 sm:p-6 space-y-4 max-w-xl mx-auto">
          <div className="flex items-center justify-between text-xs font-semibold text-[var(--ink-muted)] tabular-nums">
            <span>
              Término {(quizIndex % practiceWords.length) + 1} de {practiceWords.length}
            </span>
            <span className="px-2.5 py-0.5 rounded-md bg-[var(--brass-soft)] text-[var(--brass)] border border-[var(--brass-border)]">
              +10 XP
            </span>
          </div>

          <div className="inset-well text-center py-5 px-4 space-y-1">
            <span className="text-xs font-medium text-[var(--ink-muted)] block">
              ¿Cómo se escribe en inglés?
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-[var(--ink)] capitalize">
              {currentQuizWord.es}
            </h3>
            <span className="text-xs text-[var(--ink-subtle)] block">
              {getPartOfSpeechLabel(currentQuizWord)}
            </span>
          </div>

          <div className="text-center">
            {!showPhoneticHint ? (
              <button
                type="button"
                onClick={() => setShowPhoneticHint(true)}
                className="text-xs font-semibold text-[var(--accent)] hover:underline inline-flex items-center gap-1.5"
              >
                <Volume2 className="w-4 h-4" aria-hidden="true" />
                <span>Mostrar pista fonética</span>
              </button>
            ) : (
              <div className="inline-block px-3 py-1.5 rounded-lg bg-[var(--brass-soft)] border border-[var(--brass-border)] text-xs font-mono font-semibold text-[var(--brass)]">
                Pronunciación aproximada: [{currentQuizWord.pron}]
              </div>
            )}
          </div>

          <form onSubmit={handleQuizSubmit} className="space-y-3">
            <div>
              <label htmlFor="vocab-quiz-input" className="sr-only">
                Escribe la palabra en inglés
              </label>
              <input
                id="vocab-quiz-input"
                name="vocabQuizInput"
                type="text"
                value={quizInput}
                onChange={(e) => setQuizInput(e.target.value)}
                disabled={quizAnswered}
                placeholder="Escribe la palabra en inglés…"
                className="input-field text-center font-semibold"
                autoComplete="off"
                spellCheck={false}
              />
            </div>

            {!quizAnswered && (
              <button
                type="submit"
                disabled={!quizInput.trim()}
                className="btn btn-primary w-full"
              >
                <span>Comprobar</span>
                <Send className="w-4 h-4" aria-hidden="true" />
              </button>
            )}
          </form>

          {quizAnswered && (
            <div
              aria-live="polite"
              className={`p-4 rounded-xl border space-y-3 ${
                quizCorrect
                  ? 'bg-[var(--pine-soft)] border-[var(--pine-border)]'
                  : 'bg-[var(--crimson-soft)] border-[var(--crimson-border)]'
              }`}
            >
              <div
                className={`flex items-center gap-2 font-bold text-sm ${
                  quizCorrect ? 'text-[var(--pine)]' : 'text-[var(--crimson)]'
                }`}
              >
                {quizCorrect ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 shrink-0" aria-hidden="true" />
                    <span className="tabular-nums">Correcto (+10 XP)</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
                    <span>Respuesta incorrecta</span>
                  </>
                )}
              </div>

              <div className="bg-[var(--surface)] p-3 rounded-lg border border-[var(--border)] flex items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-medium text-[var(--ink-muted)] block">
                    Término correcto
                  </span>
                  <strong className="font-display text-base font-bold text-[var(--accent)]">
                    {currentQuizWord.en}
                  </strong>
                </div>
                <span className="text-xs font-mono font-semibold px-2 py-1 rounded bg-[var(--brass-soft)] text-[var(--brass)] border border-[var(--brass-border)]">
                  [{currentQuizWord.pron}]
                </span>
              </div>

              <div className="inset-well p-3 text-xs space-y-0.5">
                <p className="font-medium text-[var(--ink)]">“{currentQuizWord.exampleEn}”</p>
                <p className="text-[var(--ink-muted)] italic">{currentQuizWord.exampleEs}</p>
              </div>

              <button type="button" onClick={handleNextQuiz} className="btn btn-dark w-full">
                <span>Siguiente término</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          )}
        </section>
      )}

      {/* PESTAÑA 3: REPETICIÓN MUSCULAR 3X */}
      {activeTab === 'drill' && currentDrillWord && (
        <section className="card p-5 sm:p-6 space-y-4 max-w-xl mx-auto">
          <div className="flex items-center justify-between text-xs font-semibold text-[var(--ink-muted)] tabular-nums">
            <span>
              Fijación {(drillIndex % practiceWords.length) + 1} de {practiceWords.length}
            </span>
            <div className="flex items-center gap-2">
              <span>Racha:</span>
              <div className="flex gap-1.5">
                {[0, 1, 2].map((i) => {
                  const reps = drillReps[currentDrillWord.id] || 0;
                  const isFilled = i < reps;
                  return (
                    <span
                      key={i}
                      className={`w-3 h-3 rounded-full border transition-colors ${
                        isFilled
                          ? 'bg-[var(--pine)] border-[var(--pine)]'
                          : 'bg-[var(--surface-2)] border-[var(--border-strong)]'
                      }`}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          <div className="inset-well text-center py-5 px-4 space-y-1">
            <span className="text-xs font-medium text-[var(--ink-muted)] block">
              Escríbela 3 veces seguidas sin fallos para fijarla
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-[var(--ink)] capitalize">
              {currentDrillWord.es}
            </h3>
            <span className="text-xs font-mono font-semibold text-[var(--accent)] block pt-1">
              {currentDrillWord.en} [{currentDrillWord.pron}]
            </span>
          </div>

          <form onSubmit={handleDrillSubmit} className="space-y-3">
            <div>
              <label htmlFor="vocab-drill-input" className="sr-only">
                Repetición en inglés
              </label>
              <input
                id="vocab-drill-input"
                name="vocabDrillInput"
                type="text"
                value={drillInput}
                onChange={(e) => setDrillInput(e.target.value)}
                disabled={drillAnswered}
                placeholder={`Escribe «${currentDrillWord.en}»…`}
                className="input-field text-center font-semibold"
                autoComplete="off"
                spellCheck={false}
              />
            </div>

            {!drillAnswered && (
              <button
                type="submit"
                disabled={!drillInput.trim()}
                className="btn btn-primary w-full"
              >
                <span>Comprobar escritura</span>
                <Send className="w-4 h-4" aria-hidden="true" />
              </button>
            )}
          </form>

          {drillAnswered && (
            <div
              aria-live="polite"
              className={`p-4 rounded-xl border text-center space-y-3 ${
                drillCorrect
                  ? 'bg-[var(--pine-soft)] border-[var(--pine-border)]'
                  : 'bg-[var(--crimson-soft)] border-[var(--crimson-border)]'
              }`}
            >
              <div
                className={`flex items-center justify-center gap-2 font-bold text-sm tabular-nums ${
                  drillCorrect ? 'text-[var(--pine)]' : 'text-[var(--crimson)]'
                }`}
              >
                {drillCorrect ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 shrink-0" aria-hidden="true" />
                    <span>
                      {(drillReps[currentDrillWord.id] || 0) >= 3
                        ? 'Palabra fijada (3/3)'
                        : `Bien escrita (${drillReps[currentDrillWord.id] || 0}/3)`}
                    </span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
                    <span>Has fallado: la racha vuelve a 0/3</span>
                  </>
                )}
              </div>

              <button type="button" onClick={handleNextDrill} className="btn btn-dark w-full">
                <span>
                  {(drillReps[currentDrillWord.id] || 0) >= 3
                    ? 'Siguiente palabra'
                    : 'Repetir de nuevo'}
                </span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          )}
        </section>
      )}

      {/* DIÁLOGO NATIVO GENERADOR IA */}
      <NativeDialog
        open={showAIModal}
        onClose={() => setShowAIModal(false)}
        labelledBy="ai-vocab-dialog-title"
        lightDismiss={true}
      >
        <div className="p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between gap-3 pb-3 border-b border-[var(--border)]">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[var(--accent-soft)] border border-[var(--accent-border)] text-[var(--accent)] flex items-center justify-center">
                <Sparkles className="w-4 h-4" aria-hidden="true" />
              </div>
              <h3
                id="ai-vocab-dialog-title"
                className="font-display font-bold text-base sm:text-lg text-[var(--ink)]"
              >
                Generar vocabulario con IA
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setShowAIModal(false)}
              className="icon-btn"
              aria-label="Cerrar generador"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          <p className="text-xs sm:text-sm text-[var(--ink-muted)] leading-relaxed">
            Indica un campo temático y la IA creará{' '}
            <strong className="text-[var(--ink)]">términos nuevos sin repetir</strong> los que ya
            tienes guardados en el diccionario.
          </p>

          <div className="space-y-1.5">
            <span className="text-xs font-semibold text-[var(--ink-muted)] block">
              Sugerencias rápidas
            </span>
            <div className="flex flex-wrap gap-1.5">
              {AI_QUICK_TOPICS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setAiTopic(item.prompt)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                    aiTopic === item.prompt
                      ? 'bg-[var(--accent-soft)] border-[var(--accent-border)] text-[var(--accent)]'
                      : 'bg-[var(--surface-2)] border-[var(--border)] text-[var(--ink)] hover:border-[var(--border-strong)]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="ai-vocab-topic" className="text-xs font-semibold text-[var(--ink)] block">
              Tema personalizado
            </label>
            <input
              id="ai-vocab-topic"
              name="aiVocabTopic"
              type="text"
              value={aiTopic}
              onChange={(e) => setAiTopic(e.target.value)}
              placeholder="Ej: vocabulario de aeropuerto y aduanas…"
              className="input-field"
            />
          </div>

          <div className="space-y-1.5">
            <span className="text-xs font-semibold text-[var(--ink)] block">Cantidad</span>
            <div className="grid grid-cols-3 gap-2">
              {[20, 35, 50].map((cnt) => (
                <button
                  key={cnt}
                  type="button"
                  onClick={() => setAiCount(cnt)}
                  className={`py-2.5 rounded-lg text-xs font-semibold border transition-colors tabular-nums ${
                    aiCount === cnt
                      ? 'bg-[var(--accent)] text-white border-[var(--accent)]'
                      : 'bg-[var(--surface-2)] text-[var(--ink)] border-[var(--border)]'
                  }`}
                >
                  {cnt} palabras
                </button>
              ))}
            </div>
          </div>

          {aiError && (
            <div
              aria-live="polite"
              className="p-3 rounded-xl bg-[var(--crimson-soft)] border border-[var(--crimson-border)] text-xs text-[var(--crimson)] flex items-start gap-2"
            >
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
              <span>{aiError}</span>
            </div>
          )}

          {aiSuccessMsg && (
            <div
              aria-live="polite"
              className="p-3 rounded-xl bg-[var(--pine-soft)] border border-[var(--pine-border)] text-xs text-[var(--pine)] font-semibold flex items-start gap-2"
            >
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
              <span>{aiSuccessMsg}</span>
            </div>
          )}

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowAIModal(false)}
              className="btn btn-secondary flex-1"
            >
              Cancelar
            </button>
            <button
              type="button"
              disabled={isGeneratingAI || !aiTopic.trim()}
              onClick={handleGenerateVocabulary}
              className="btn btn-primary flex-1 tabular-nums"
            >
              {isGeneratingAI ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" aria-hidden="true" />
                  <span>Generando…</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" aria-hidden="true" />
                  <span>Crear ({aiCount})</span>
                </>
              )}
            </button>
          </div>
        </div>
      </NativeDialog>
    </div>
  );
};
