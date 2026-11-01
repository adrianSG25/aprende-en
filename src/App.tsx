import React, { useState } from 'react';
import { Exercise, UserStats } from './types';
import { GameProgress } from './types/streetGame';
import {
  loadUserStats,
  saveUserStats,
  recordExerciseAttempt,
  loadGameProgress,
  saveGameProgress
} from './services/storageService';
import { StreetLevelMap } from './components/StreetLevelMap';
import { StreetDrillArena } from './components/StreetDrillArena';
import { StreetWhatsAppSimulator } from './components/StreetWhatsAppSimulator';
import { StreetProfile } from './components/StreetProfile';
import { ReadingZone } from './components/ReadingZone';
import { SettingsModal } from './components/SettingsModal';
import {
  Gamepad2,
  Flame,
  MessageSquare,
  FileText,
  Trophy,
  Settings,
  Sparkles,
  Coins
} from 'lucide-react';

type ActiveTab = 'levels' | 'drills' | 'whatsapp' | 'reading' | 'profile';

export function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('levels');
  const [stats, setStats] = useState<UserStats>(() => loadUserStats());
  const [gameProgress, setGameProgress] = useState<GameProgress>(() => loadGameProgress());
  const [showSettings, setShowSettings] = useState(false);

  const handleUpdateGameProgress = (updated: GameProgress) => {
    saveGameProgress(updated);
    setGameProgress(updated);
  };

  const handleExerciseAttempt = (
    exercise: Exercise,
    isCorrect: boolean,
    forceAddToVault = false
  ) => {
    const updated = recordExerciseAttempt(exercise, isCorrect, forceAddToVault);
    setStats(updated.stats);
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

  const desktopNavItems: {
    id: ActiveTab;
    label: string;
    icon: React.ReactNode;
    badge?: string;
  }[] = [
    {
      id: 'levels',
      label: 'Niveles UK (Juego)',
      icon: <Gamepad2 className="w-4 h-4 text-amber-500" />
    },
    {
      id: 'drills',
      label: 'Machaque Callejero',
      icon: <Flame className="w-4 h-4 text-rose-500" />
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp Simulator',
      icon: <MessageSquare className="w-4 h-4 text-emerald-500" />
    },
    {
      id: 'reading',
      label: 'Textos & Historias',
      icon: <FileText className="w-4 h-4 text-sky-500" />
    },
    {
      id: 'profile',
      label: 'Mi Pasaporte & Rep',
      icon: <Trophy className="w-4 h-4 text-purple-500" />
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col pb-24 lg:pb-12">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-3">
          {/* Logo & Title */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-br from-indigo-700 via-indigo-900 to-slate-950 flex items-center justify-center font-black text-white text-base sm:text-lg shadow-sm shrink-0 border border-indigo-500">
              🇬🇧
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <h1 className="font-black text-sm sm:text-lg tracking-tight text-slate-900 truncate">
                  UK Street English
                </h1>
                <span className="hidden xs:inline-block text-[10px] sm:text-[11px] font-black px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-300 shrink-0">
                  Inglés Callejero Real
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                Aprende a hablar y chatear como en las calles y pubs de UK
              </p>
            </div>
          </div>

          {/* Gamification Stats & Settings Button */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Desktop XP & Quids */}
            <div className="hidden sm:flex items-center gap-2.5 bg-slate-50 border border-slate-200 rounded-2xl px-3 py-1.5 text-xs font-black">
              <div className="flex items-center gap-1 text-amber-700">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>{gameProgress.xp} XP</span>
              </div>
              <div className="h-3.5 w-px bg-slate-200" />
              <div className="flex items-center gap-1 text-emerald-700">
                <Coins className="w-3.5 h-3.5 text-emerald-500" />
                <span>{gameProgress.quids} Quids 💷</span>
              </div>
              <div className="h-3.5 w-px bg-slate-200" />
              <div className="flex items-center gap-1 text-purple-700">
                <Trophy className="w-3.5 h-3.5 text-purple-500" />
                <span>{gameProgress.bossesDefeated.length}/5 Jefes</span>
              </div>
            </div>

            {/* Mobile quick XP pill */}
            <div className="sm:hidden flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 font-black text-xs shrink-0">
              <Sparkles className="w-3 h-3 text-amber-600" />
              <span>{gameProgress.xp} XP</span>
            </div>

            {/* Prominent Settings Button: 100% accessible for mobile */}
            <button
              type="button"
              onClick={() => setShowSettings(true)}
              className="min-h-[42px] px-3.5 py-2 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer shrink-0"
              title="Abrir ajustes de IA y API Key"
            >
              <Settings className="w-4 h-4 text-white" />
              <span>Ajustes IA</span>
            </button>
          </div>
        </div>

        {/* Desktop Navigation Tabs */}
        <nav className="hidden lg:block border-t border-slate-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 py-2 flex items-center gap-2">
            {desktopNavItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`px-4 py-2 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-5 sm:py-6">
        {activeTab === 'levels' && (
          <StreetLevelMap
            progress={gameProgress}
            onUpdateProgress={handleUpdateGameProgress}
            onOpenSettings={() => setShowSettings(true)}
          />
        )}

        {activeTab === 'drills' && (
          <StreetDrillArena
            progress={gameProgress}
            onUpdateProgress={handleUpdateGameProgress}
            onOpenSettings={() => setShowSettings(true)}
          />
        )}

        {activeTab === 'whatsapp' && (
          <StreetWhatsAppSimulator
            progress={gameProgress}
            onUpdateProgress={handleUpdateGameProgress}
          />
        )}

        {activeTab === 'reading' && (
          <ReadingZone
            completedStories={stats.completedStories}
            onMarkStoryComplete={handleMarkStoryComplete}
            onExerciseAttempt={handleExerciseAttempt}
            onOpenSettings={() => setShowSettings(true)}
          />
        )}

        {activeTab === 'profile' && (
          <StreetProfile
            progress={gameProgress}
            onUpdateProgress={handleUpdateGameProgress}
          />
        )}
      </main>

      {/* Mobile Bottom Navigation Bar (6 dedicated large touch targets) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-1 pt-1.5 pb-safe shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        <div className="grid grid-cols-6 gap-0.5 max-w-lg mx-auto">
          {/* 1: Niveles (Juego) */}
          <button
            type="button"
            onClick={() => setActiveTab('levels')}
            className={`flex flex-col items-center justify-center py-1.5 px-0.5 rounded-xl text-[10px] font-black transition-all cursor-pointer ${
              activeTab === 'levels'
                ? 'text-indigo-600 bg-indigo-50/90'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Gamepad2 className={`w-5 h-5 ${activeTab === 'levels' ? 'text-indigo-600' : 'text-slate-400'}`} />
            <span className="mt-0.5">Niveles</span>
          </button>

          {/* 2: Machaque */}
          <button
            type="button"
            onClick={() => setActiveTab('drills')}
            className={`flex flex-col items-center justify-center py-1.5 px-0.5 rounded-xl text-[10px] font-black transition-all cursor-pointer ${
              activeTab === 'drills'
                ? 'text-indigo-600 bg-indigo-50/90'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Flame className={`w-5 h-5 ${activeTab === 'drills' ? 'text-indigo-600' : 'text-slate-400'}`} />
            <span className="mt-0.5">Machaque</span>
          </button>

          {/* 3: WhatsApp */}
          <button
            type="button"
            onClick={() => setActiveTab('whatsapp')}
            className={`flex flex-col items-center justify-center py-1.5 px-0.5 rounded-xl text-[10px] font-black transition-all cursor-pointer ${
              activeTab === 'whatsapp'
                ? 'text-indigo-600 bg-indigo-50/90'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <MessageSquare className={`w-5 h-5 ${activeTab === 'whatsapp' ? 'text-indigo-600' : 'text-slate-400'}`} />
            <span className="mt-0.5">WhatsApp</span>
          </button>

          {/* 4: Textos (Preservado) */}
          <button
            type="button"
            onClick={() => setActiveTab('reading')}
            className={`flex flex-col items-center justify-center py-1.5 px-0.5 rounded-xl text-[10px] font-black transition-all cursor-pointer ${
              activeTab === 'reading'
                ? 'text-indigo-600 bg-indigo-50/90'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <FileText className={`w-5 h-5 ${activeTab === 'reading' ? 'text-indigo-600' : 'text-slate-400'}`} />
            <span className="mt-0.5">Textos</span>
          </button>

          {/* 5: Perfil / Pasaporte */}
          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center justify-center py-1.5 px-0.5 rounded-xl text-[10px] font-black transition-all cursor-pointer ${
              activeTab === 'profile'
                ? 'text-indigo-600 bg-indigo-50/90'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Trophy className={`w-5 h-5 ${activeTab === 'profile' ? 'text-indigo-600' : 'text-slate-400'}`} />
            <span className="mt-0.5">Perfil</span>
          </button>

          {/* 6: Ajustes */}
          <button
            type="button"
            onClick={() => setShowSettings(true)}
            className="flex flex-col items-center justify-center py-1.5 px-0.5 rounded-xl text-[10px] font-black text-slate-500 hover:text-indigo-600 hover:bg-slate-50 transition-all cursor-pointer"
          >
            <Settings className="w-5 h-5 text-slate-400" />
            <span className="mt-0.5">Ajustes</span>
          </button>
        </div>
      </nav>

      {/* Settings Modal (API Keys, Groq, Gemini, etc.) */}
      {showSettings && (
        <SettingsModal
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  );
}
export default App;
