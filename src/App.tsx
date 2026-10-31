import React, { useState } from 'react';
import { Exercise, MistakeRecord, UserStats, ExamResult } from './types';
import {
  loadUserStats,
  saveUserStats,
  loadMistakeVault,
  saveMistakeVault,
  recordExerciseAttempt,
  saveExamResultToHistory
} from './services/storageService';
import { DrillArena } from './components/DrillArena';
import { GrammarZone } from './components/GrammarZone';
import { PhrasalVerbsZone } from './components/PhrasalVerbsZone';
import { VocabZone } from './components/VocabZone';
import { ReadingZone } from './components/ReadingZone';
import { WritingZone } from './components/WritingZone';
import { ExamZone } from './components/ExamZone';
import { SettingsModal } from './components/SettingsModal';
import {
  Flame,
  BookOpen,
  Rocket,
  Brain,
  FileText,
  PenTool,
  Trophy,
  Settings,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

type ActiveTab =
  | 'drill'
  | 'grammar'
  | 'phrasal'
  | 'vocab'
  | 'reading'
  | 'writing'
  | 'exams';

export function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('drill');
  const [stats, setStats] = useState<UserStats>(() => loadUserStats());
  const [mistakes, setMistakes] = useState<MistakeRecord[]>(() => loadMistakeVault());
  const [showSettings, setShowSettings] = useState(false);

  const handleExerciseAttempt = (
    exercise: Exercise,
    isCorrect: boolean,
    forceAddToVault = false
  ) => {
    const updated = recordExerciseAttempt(exercise, isCorrect, forceAddToVault);
    setStats(updated.stats);
    setMistakes(updated.mistakes);
  };

  const handleClearMasteredMistakes = () => {
    const remaining = mistakes.filter((m) => !m.mastered);
    saveMistakeVault(remaining);
    setMistakes(remaining);
  };

  const handleToggleBookmarkPV = (pvId: string) => {
    const next = stats.bookmarkedPhrasalVerbs.includes(pvId)
      ? stats.bookmarkedPhrasalVerbs.filter((id) => id !== pvId)
      : [...stats.bookmarkedPhrasalVerbs, pvId];
    const updated = { ...stats, bookmarkedPhrasalVerbs: next };
    saveUserStats(updated);
    setStats(updated);
  };

  const handleMarkStoryComplete = (storyId: string) => {
    if (!stats.completedStories.includes(storyId)) {
      const updated = {
        ...stats,
        completedStories: [...stats.completedStories, storyId]
      };
      saveUserStats(updated);
      setStats(updated);
    }
  };

  const handleSaveWriting = (entry: UserStats['writingsSaved'][0]) => {
    const updated = {
      ...stats,
      writingsSaved: [entry, ...stats.writingsSaved].slice(0, 50)
    };
    saveUserStats(updated);
    setStats(updated);
  };

  const handleSaveExamResult = (result: ExamResult) => {
    const updated = saveExamResultToHistory(result);
    setStats(updated);
  };

  const pendingMistakesCount = mistakes.filter((m) => !m.mastered).length;
  const accuracyPct =
    stats.totalCompleted > 0
      ? Math.round((stats.totalCorrect / stats.totalCompleted) * 100)
      : 100;

  const desktopNavItems: {
    id: ActiveTab;
    label: string;
    icon: React.ReactNode;
    badge?: number;
  }[] = [
    {
      id: 'drill',
      label: 'Machaque & Ejercicios',
      icon: <Flame className="w-4 h-4 text-amber-500" />,
      badge: pendingMistakesCount > 0 ? pendingMistakesCount : undefined
    },
    {
      id: 'grammar',
      label: 'Gramática A2+ → B2+',
      icon: <BookOpen className="w-4 h-4 text-indigo-500" />
    },
    {
      id: 'phrasal',
      label: 'Phrasal Verbs',
      icon: <Rocket className="w-4 h-4 text-amber-500" />
    },
    {
      id: 'vocab',
      label: 'Vocab & Raíces',
      icon: <Brain className="w-4 h-4 text-emerald-500" />
    },
    {
      id: 'reading',
      label: 'Reading & Análisis',
      icon: <FileText className="w-4 h-4 text-sky-500" />
    },
    {
      id: 'writing',
      label: 'Writing Lab',
      icon: <PenTool className="w-4 h-4 text-rose-500" />
    },
    {
      id: 'exams',
      label: 'Tests & Exámenes',
      icon: <Trophy className="w-4 h-4 text-amber-500" />
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col pb-24 lg:pb-12">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-3">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-indigo-600 flex items-center justify-center font-black text-white text-sm sm:text-base shadow-sm shrink-0">
              EN
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <h1 className="font-extrabold text-sm sm:text-lg tracking-tight text-slate-900 truncate">
                  EngDrill Pro
                </h1>
                <span className="hidden xs:inline-block text-[10px] sm:text-[11px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 shrink-0">
                  A2+ → B2+
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                Gramática, Phrasals, Vocabulario, Situaciones reales & Tests
              </p>
            </div>
          </div>

          {/* Global Stats & Settings */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <div className="hidden md:flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-1.5 text-xs">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-slate-500">Hechos:</span>
                <strong className="text-slate-900">{stats.totalCompleted}</strong>
              </div>
              <div className="h-3.5 w-px bg-slate-200" />
              <div>
                <span className="text-slate-500">Acierto:</span>{' '}
                <strong className="text-emerald-700">{accuracyPct}%</strong>
              </div>
              {pendingMistakesCount > 0 && (
                <>
                  <div className="h-3.5 w-px bg-slate-200" />
                  <button
                    type="button"
                    onClick={() => setActiveTab('drill')}
                    className="flex items-center gap-1 text-rose-600 font-bold hover:underline"
                  >
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
                    {pendingMistakesCount} para repetir
                  </button>
                </>
              )}
            </div>

            {/* Mobile quick mistake badge */}
            {pendingMistakesCount > 0 && (
              <button
                type="button"
                onClick={() => setActiveTab('drill')}
                className="md:hidden flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 font-bold text-xs shrink-0"
                title="Ir a tus fallos pendientes"
              >
                <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
                <span>{pendingMistakesCount}</span>
              </button>
            )}

            {/* Prominent Settings Button in Header: easy to tap on all screens */}
            <button
              type="button"
              onClick={() => setShowSettings(true)}
              className="min-h-[42px] px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer shrink-0"
              title="Abrir configuración de IA, Modelos y PWA"
            >
              <Settings className="w-4 h-4 text-white" />
              <span>Ajustes IA</span>
            </button>
          </div>
        </div>

        {/* Desktop Navigation Bar */}
        <nav className="hidden lg:block border-t border-slate-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center gap-2">
            {desktopNavItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`px-4 py-2 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {item.badge !== undefined && (
                    <span className="px-1.5 py-0.5 text-[10px] rounded-full bg-rose-500 text-white font-extrabold">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </nav>
      </header>

      {/* Main Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-5 sm:py-6">
        {/* Segmented Switcher for Grouped Tabs on Mobile */}
        {(activeTab === 'phrasal' || activeTab === 'vocab') && (
          <div className="lg:hidden flex p-1 bg-slate-200 rounded-xl mb-4 max-w-md mx-auto">
            <button
              type="button"
              onClick={() => setActiveTab('phrasal')}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'phrasal'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🚀 Phrasal Verbs
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('vocab')}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'vocab'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🧬 Vocab & Raíces
            </button>
          </div>
        )}

        {(activeTab === 'writing' || activeTab === 'reading') && (
          <div className="lg:hidden flex p-1 bg-slate-200 rounded-xl mb-4 max-w-md mx-auto">
            <button
              type="button"
              onClick={() => setActiveTab('writing')}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'writing'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ✍️ Situaciones & Writing
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('reading')}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'reading'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              📖 Historias & Reading
            </button>
          </div>
        )}

        {activeTab === 'drill' && (
          <DrillArena
            mistakes={mistakes}
            onExerciseAttempt={handleExerciseAttempt}
            onClearMasteredMistakes={handleClearMasteredMistakes}
            onOpenSettings={() => setShowSettings(true)}
          />
        )}

        {activeTab === 'grammar' && (
          <GrammarZone onExerciseAttempt={handleExerciseAttempt} />
        )}

        {activeTab === 'phrasal' && (
          <PhrasalVerbsZone
            bookmarkedIds={stats.bookmarkedPhrasalVerbs}
            onToggleBookmark={handleToggleBookmarkPV}
            onExerciseAttempt={handleExerciseAttempt}
          />
        )}

        {activeTab === 'vocab' && (
          <VocabZone onExerciseAttempt={handleExerciseAttempt} />
        )}

        {activeTab === 'reading' && (
          <ReadingZone
            completedStories={stats.completedStories}
            onMarkStoryComplete={handleMarkStoryComplete}
            onExerciseAttempt={handleExerciseAttempt}
            onOpenSettings={() => setShowSettings(true)}
          />
        )}

        {activeTab === 'writing' && (
          <WritingZone
            onSaveWriting={handleSaveWriting}
            onExerciseAttempt={handleExerciseAttempt}
            onOpenSettings={() => setShowSettings(true)}
          />
        )}

        {activeTab === 'exams' && (
          <ExamZone
            examHistory={stats.examHistory}
            onSaveExamResult={handleSaveExamResult}
            onExerciseAttempt={handleExerciseAttempt}
            onGoToMistakes={() => setActiveTab('drill')}
          />
        )}
      </main>

      {/* Mobile Bottom Navigation Bar (6 tabs including direct Ajustes / API access) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-1 pt-1.5 pb-safe shadow-[0_-2px_10px_rgba(0,0,0,0.04)]">
        <div className="grid grid-cols-6 gap-0.5 max-w-lg mx-auto">
          {/* Tab 1: Machaque */}
          <button
            type="button"
            onClick={() => setActiveTab('drill')}
            className={`flex flex-col items-center justify-center py-1.5 px-0.5 rounded-xl text-[10px] font-bold transition-all relative cursor-pointer ${
              activeTab === 'drill'
                ? 'text-indigo-600 bg-indigo-50/80'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Flame className={`w-5 h-5 ${activeTab === 'drill' ? 'text-indigo-600' : 'text-slate-400'}`} />
            <span className="mt-0.5">Machaque</span>
            {pendingMistakesCount > 0 && (
              <span className="absolute top-0.5 right-1 min-w-3.5 h-3.5 px-1 rounded-full bg-rose-500 text-white text-[9px] flex items-center justify-center font-extrabold leading-none">
                {pendingMistakesCount}
              </span>
            )}
          </button>

          {/* Tab 2: Gramática */}
          <button
            type="button"
            onClick={() => setActiveTab('grammar')}
            className={`flex flex-col items-center justify-center py-1.5 px-0.5 rounded-xl text-[10px] font-bold transition-all relative cursor-pointer ${
              activeTab === 'grammar'
                ? 'text-indigo-600 bg-indigo-50/80'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <BookOpen className={`w-5 h-5 ${activeTab === 'grammar' ? 'text-indigo-600' : 'text-slate-400'}`} />
            <span className="mt-0.5">Gramática</span>
          </button>

          {/* Tab 3: Vocabulario (Phrasals & Vocab) */}
          <button
            type="button"
            onClick={() => {
              if (activeTab !== 'phrasal' && activeTab !== 'vocab') {
                setActiveTab('phrasal');
              }
            }}
            className={`flex flex-col items-center justify-center py-1.5 px-0.5 rounded-xl text-[10px] font-bold transition-all relative cursor-pointer ${
              activeTab === 'phrasal' || activeTab === 'vocab'
                ? 'text-indigo-600 bg-indigo-50/80'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Brain className={`w-5 h-5 ${activeTab === 'phrasal' || activeTab === 'vocab' ? 'text-indigo-600' : 'text-slate-400'}`} />
            <span className="mt-0.5">Vocab</span>
          </button>

          {/* Tab 4: Textos / Práctica (Writing & Reading) */}
          <button
            type="button"
            onClick={() => {
              if (activeTab !== 'writing' && activeTab !== 'reading') {
                setActiveTab('writing');
              }
            }}
            className={`flex flex-col items-center justify-center py-1.5 px-0.5 rounded-xl text-[10px] font-bold transition-all relative cursor-pointer ${
              activeTab === 'writing' || activeTab === 'reading'
                ? 'text-indigo-600 bg-indigo-50/80'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <PenTool className={`w-5 h-5 ${activeTab === 'writing' || activeTab === 'reading' ? 'text-indigo-600' : 'text-slate-400'}`} />
            <span className="mt-0.5">Textos</span>
          </button>

          {/* Tab 5: Tests */}
          <button
            type="button"
            onClick={() => setActiveTab('exams')}
            className={`flex flex-col items-center justify-center py-1.5 px-0.5 rounded-xl text-[10px] font-bold transition-all relative cursor-pointer ${
              activeTab === 'exams'
                ? 'text-indigo-600 bg-indigo-50/80'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Trophy className={`w-5 h-5 ${activeTab === 'exams' ? 'text-indigo-600' : 'text-slate-400'}`} />
            <span className="mt-0.5">Tests</span>
          </button>

          {/* Tab 6: Ajustes / API (Direct thumb access on mobile) */}
          <button
            type="button"
            onClick={() => setShowSettings(true)}
            className="flex flex-col items-center justify-center py-1.5 px-0.5 rounded-xl text-[10px] font-bold text-indigo-700 bg-indigo-50/60 hover:bg-indigo-100 active:scale-95 transition-all cursor-pointer"
            title="Abrir Ajustes y Configuración de IA"
          >
            <Settings className="w-5 h-5 text-indigo-600" />
            <span className="mt-0.5">Ajustes</span>
          </button>
        </div>
      </nav>

      {/* Settings / Mobile PWA / Backup Modal */}
      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
    </div>
  );
}

export default App;
