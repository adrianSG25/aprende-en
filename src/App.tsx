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

  const navItems: {
    id: ActiveTab;
    label: string;
    shortLabel: string;
    icon: React.ReactNode;
    badge?: number;
  }[] = [
    {
      id: 'drill',
      label: 'Machaque & Ejercicios',
      shortLabel: 'Ejercicios',
      icon: <Flame className="w-4 h-4 text-amber-400" />,
      badge: pendingMistakesCount > 0 ? pendingMistakesCount : undefined
    },
    {
      id: 'grammar',
      label: 'Gramática A2+ → B2+',
      shortLabel: 'Gramática',
      icon: <BookOpen className="w-4 h-4 text-indigo-400" />
    },
    {
      id: 'phrasal',
      label: 'Phrasal Verbs',
      shortLabel: 'Phrasals',
      icon: <Rocket className="w-4 h-4 text-amber-300" />
    },
    {
      id: 'vocab',
      label: 'Vocab & Raíces',
      shortLabel: 'Vocab',
      icon: <Brain className="w-4 h-4 text-emerald-400" />
    },
    {
      id: 'reading',
      label: 'Reading & Análisis',
      shortLabel: 'Reading',
      icon: <FileText className="w-4 h-4 text-sky-400" />
    },
    {
      id: 'writing',
      label: 'Writing Lab',
      shortLabel: 'Writing',
      icon: <PenTool className="w-4 h-4 text-rose-400" />
    },
    {
      id: 'exams',
      label: 'Tests & Exámenes',
      shortLabel: 'Tests',
      icon: <Trophy className="w-4 h-4 text-yellow-400" />
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col pb-20 lg:pb-10">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center font-black text-white text-lg shadow-lg shadow-indigo-600/30">
              EN
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-base sm:text-lg tracking-tight text-white">
                  EngDrill Pro
                </h1>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  A2+ → B2+ Advanced
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-400 hidden sm:block">
                Entrenamiento intensivo de Gramática, Phrasal Verbs, Use of English, Reading & Writing
              </p>
            </div>
          </div>

          {/* Global Stats & Settings */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden md:flex items-center gap-3 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-1.5 text-xs">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-slate-400">Hechos:</span>
                <strong className="text-white">{stats.totalCompleted}</strong>
              </div>
              <div className="h-3.5 w-px bg-slate-800" />
              <div>
                <span className="text-slate-400">Acierto:</span>{' '}
                <strong className="text-emerald-400">{accuracyPct}%</strong>
              </div>
              {pendingMistakesCount > 0 && (
                <>
                  <div className="h-3.5 w-px bg-slate-800" />
                  <button
                    type="button"
                    onClick={() => setActiveTab('drill')}
                    className="flex items-center gap-1 text-rose-300 font-bold cursor-pointer hover:underline"
                  >
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                    {pendingMistakesCount} fallos por repetir
                  </button>
                </>
              )}
            </div>

            <button
              type="button"
              onClick={() => setShowSettings(true)}
              className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-slate-200 flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Settings className="w-4 h-4 text-indigo-400" />
              <span className="hidden sm:inline">IA / Móvil</span>
            </button>
          </div>
        </div>

        {/* Desktop Navigation Bar */}
        <nav className="hidden lg:block border-t border-slate-900 bg-slate-950/60">
          <div className="max-w-7xl mx-auto px-4 py-2 flex items-center gap-2 overflow-x-auto">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`px-4 py-2 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
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
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6">
        {activeTab === 'drill' && (
          <DrillArena
            mistakes={mistakes}
            onExerciseAttempt={handleExerciseAttempt}
            onClearMasteredMistakes={handleClearMasteredMistakes}
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
          />
        )}

        {activeTab === 'writing' && (
          <WritingZone
            onSaveWriting={handleSaveWriting}
            onExerciseAttempt={handleExerciseAttempt}
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

      {/* Mobile Bottom Navigation Bar (App-like experience on phone) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 px-1 py-1.5">
        <div className="grid grid-cols-7 gap-0.5 max-w-lg mx-auto">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-[10px] font-bold transition-all relative cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600/20 text-indigo-300'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {item.icon}
                <span className="mt-1 truncate max-w-full">{item.shortLabel}</span>
                {item.badge !== undefined && (
                  <span className="absolute top-0.5 right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] flex items-center justify-center font-extrabold">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Settings / Mobile PWA / Backup Modal */}
      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
    </div>
  );
}

export default App;
