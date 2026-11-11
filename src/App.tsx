import React, { useState, useRef } from 'react';
import { Exercise, UserStats } from './types';
import { GameProgress } from './types/streetGame';
import { STREET_LEVELS } from './data/streetData';
import {
  loadUserStats,
  saveUserStats,
  recordExerciseAttempt,
  loadGameProgress,
  saveGameProgress
} from './services/storageService';
import { BrandMark } from './components/BrandMark';
import { StreetLevelMap } from './components/StreetLevelMap';
import { StreetDrillArena } from './components/StreetDrillArena';
import { StreetWhatsAppSimulator } from './components/StreetWhatsAppSimulator';
import { StreetProfile } from './components/StreetProfile';
import { FieldDictionaryZone } from './components/FieldDictionaryZone';
import { ReadingZone } from './components/ReadingZone';
import { MediaLearningZone } from './components/MediaLearningZone';
import { SettingsModal } from './components/SettingsModal';
import { runViewTransition } from './utils/viewTransition';
import {
  Map,
  Flame,
  MessageSquare,
  FileText,
  Award,
  Settings,
  Sparkles,
  Coins,
  BookOpen,
  Clapperboard,
  LayoutGrid,
  ChevronRight
} from 'lucide-react';

type ActiveTab = 'levels' | 'vocab' | 'media' | 'drills' | 'whatsapp' | 'reading' | 'profile';

export function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('levels');
  const [stats, setStats] = useState<UserStats>(() => loadUserStats());
  const [gameProgress, setGameProgress] = useState<GameProgress>(() => loadGameProgress());
  const [showSettings, setShowSettings] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  const morePopoverRef = useRef<HTMLDivElement>(null);

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

  const handleSwitchTab = (tab: ActiveTab) => {
    if (morePopoverRef.current?.matches(':popover-open')) {
      morePopoverRef.current.hidePopover();
    }
    if (tab === activeTab) return;
    runViewTransition(() => {
      setActiveTab(tab);
    }, 'main-content');
  };

  const totalBosses = STREET_LEVELS.length;

  const navItems: {
    id: ActiveTab;
    label: string;
    shortLabel: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
  }[] = [
    {
      id: 'levels',
      label: 'Niveles UK',
      shortLabel: 'Niveles',
      description: 'Ruta por barrios y retos de jefe',
      icon: Map
    },
    {
      id: 'vocab',
      label: 'Diccionario',
      shortLabel: 'Vocab',
      description: 'Top 50, pasados y listas con IA',
      icon: BookOpen
    },
    {
      id: 'media',
      label: 'Series y Cine IA',
      shortLabel: 'Series IA',
      description: 'Aprende con episodios y películas',
      icon: Clapperboard
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp UK',
      shortLabel: 'WhatsApp',
      description: 'Conversaciones reales por turnos',
      icon: MessageSquare
    },
    {
      id: 'drills',
      label: 'Machaque',
      shortLabel: 'Machaque',
      description: 'Práctica intensiva de escritura',
      icon: Flame
    },
    {
      id: 'reading',
      label: 'Lecturas',
      shortLabel: 'Lecturas',
      description: 'Historias guiadas y analizador',
      icon: FileText
    },
    {
      id: 'profile',
      label: 'Pasaporte',
      shortLabel: 'Perfil',
      description: 'Rangos y progreso guardado',
      icon: Award
    }
  ];

  // 4 rutas primarias en barra móvil + menú "Más" (máximo 5 controles inferiores)
  const primaryMobileIds: ActiveTab[] = ['levels', 'vocab', 'media', 'drills'];
  const primaryMobileItems = navItems.filter((item) => primaryMobileIds.includes(item.id));
  const overflowMobileItems = navItems.filter((item) => !primaryMobileIds.includes(item.id));
  const isOverflowActive = !primaryMobileIds.includes(activeTab);

  return (
    <div className="min-h-dvh bg-[var(--bg)] text-[var(--ink)] flex flex-col pb-24 lg:pb-12">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 btn btn-primary btn-sm"
      >
        Saltar al contenido principal
      </a>

      {/* Cabecera principal fija */}
      <header className="sticky top-0 z-30 bg-[var(--surface)]/95 backdrop-blur-md border-b border-[var(--border)]">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-3">
          {/* Identidad */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <BrandMark size={30} className="shrink-0 sm:w-[34px] sm:h-[34px]" />
            <div className="min-w-0">
              <h1 className="font-display font-bold text-[14px] sm:text-lg tracking-[-0.02em] text-[var(--ink)] truncate leading-tight">
                UK Street English
              </h1>
              <p className="text-[11px] sm:text-xs text-[var(--ink-muted)] hidden sm:block leading-tight">
                Inglés cotidiano de Londres, pubs y mensajería
              </p>
            </div>
          </div>

          {/* Métricas y botón de ajustes */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Barra de progreso compacta en escritorio */}
            <div className="hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] text-xs font-semibold tabular-nums">
              <span className="flex items-center gap-1.5 text-[var(--brass)]">
                <Sparkles className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span>{gameProgress.xp} XP</span>
              </span>
              <span className="h-3.5 w-px bg-[var(--border-strong)]" aria-hidden="true" />
              <span className="flex items-center gap-1.5 text-[var(--pine)]">
                <Coins className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span>{gameProgress.quids} Quids</span>
              </span>
              <span className="h-3.5 w-px bg-[var(--border-strong)]" aria-hidden="true" />
              <span className="flex items-center gap-1.5 text-[var(--ink)]">
                <Award className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" aria-hidden="true" />
                <span>
                  {gameProgress.bossesDefeated.length}/{totalBosses} Jefes
                </span>
              </span>
            </div>

            {/* Indicador compacto XP en móvil */}
            <div className="sm:hidden flex items-center gap-1 px-2 py-1 rounded-lg bg-[var(--brass-soft)] border border-[var(--brass-border)] text-[var(--brass)] font-bold text-[11px] tabular-nums">
              <Sparkles className="w-3 h-3 shrink-0" aria-hidden="true" />
              <span>{gameProgress.xp} XP</span>
            </div>

            <button
              type="button"
              onClick={() => setShowSettings(true)}
              className="btn btn-dark btn-sm"
              aria-label="Abrir ajustes de inteligencia artificial y copia de seguridad"
            >
              <Settings className="w-4 h-4" aria-hidden="true" />
              <span>
                Ajustes<span className="hidden min-[400px]:inline"> IA</span>
              </span>
            </button>
          </div>
        </div>

        {/* Navegación principal en escritorio */}
        <nav
          aria-label="Secciones principales"
          className="hidden lg:block border-t border-[var(--border)] bg-[var(--surface)]"
        >
          <div className="max-w-6xl mx-auto px-6 flex items-center gap-1 overflow-x-auto no-scrollbar">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSwitchTab(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative px-3.5 py-3 text-[13px] font-semibold flex items-center gap-2 whitespace-nowrap transition-colors ${
                    isActive
                      ? 'text-[var(--accent)]'
                      : 'text-[var(--ink-muted)] hover:text-[var(--ink)]'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 shrink-0 ${
                      isActive ? 'text-[var(--accent)]' : 'text-[var(--ink-subtle)]'
                    }`}
                    aria-hidden="true"
                  />
                  <span>{item.label}</span>
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-[var(--accent)]"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </nav>
      </header>

      {/* Área de contenido principal */}
      <main
        id="main-content"
        tabIndex={-1}
        className="flex-1 max-w-6xl w-full mx-auto px-3.5 sm:px-6 py-5 sm:py-7 outline-none"
      >
        {activeTab === 'levels' && (
          <StreetLevelMap
            progress={gameProgress}
            onUpdateProgress={handleUpdateGameProgress}
            onOpenSettings={() => setShowSettings(true)}
          />
        )}

        {activeTab === 'vocab' && (
          <FieldDictionaryZone
            progress={gameProgress}
            onUpdateProgress={handleUpdateGameProgress}
          />
        )}

        {activeTab === 'media' && (
          <MediaLearningZone
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

      {/* Popover de navegación adicional para móvil (WhatsApp, Lecturas, Pasaporte) */}
      <div
        id="mobile-more-nav"
        ref={morePopoverRef}
        popover="auto"
        onToggle={(e) => {
          const evt = e.nativeEvent as Event & { newState?: string };
          setMoreOpen(evt.newState === 'open');
        }}
        className="mobile-more-popover lg:hidden"
      >
        <div className="px-2.5 py-2 border-b border-[var(--border)] mb-1 flex items-center justify-between">
          <span className="text-xs font-semibold text-[var(--ink-muted)]">
            Más herramientas
          </span>
          <span className="text-xs font-semibold text-[var(--pine)] tabular-nums">
            {gameProgress.quids} Quids · {gameProgress.bossesDefeated.length}/{totalBosses} Jefes
          </span>
        </div>
        <div className="space-y-1">
          {overflowMobileItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSwitchTab(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`w-full text-left px-3 py-2.5 rounded-xl flex items-center justify-between gap-3 transition-colors min-h-[48px] ${
                  isActive
                    ? 'bg-[var(--accent-soft)] text-[var(--accent)]'
                    : 'hover:bg-[var(--surface-2)] text-[var(--ink)]'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                      isActive
                        ? 'bg-[var(--surface)] text-[var(--accent)] border border-[var(--accent-border)]'
                        : 'bg-[var(--surface-2)] text-[var(--ink-muted)]'
                    }`}
                  >
                    <Icon className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-sm font-semibold truncate">{item.label}</span>
                    <span className="block text-[11px] text-[var(--ink-muted)] truncate">
                      {item.description}
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[var(--ink-subtle)] shrink-0" aria-hidden="true" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Barra de navegación inferior móvil (5 espacios amplios >= 48px) */}
      <nav
        aria-label="Navegación móvil"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[var(--surface)]/95 backdrop-blur-md border-t border-[var(--border)] px-2 pt-1.5 pb-safe"
      >
        <div className="grid grid-cols-5 gap-1 max-w-md mx-auto">
          {primaryMobileItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSwitchTab(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`relative flex flex-col items-center justify-center min-h-[48px] py-1 px-1 rounded-xl text-[11px] font-semibold transition-colors ${
                  isActive
                    ? 'text-[var(--accent)] bg-[var(--accent-soft)]'
                    : 'text-[var(--ink-muted)]'
                }`}
              >
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute top-0.5 w-6 h-0.5 rounded-full bg-[var(--accent)]"
                  />
                )}
                <Icon className="w-5 h-5" aria-hidden="true" />
                <span className="mt-0.5 truncate max-w-full">{item.shortLabel}</span>
              </button>
            );
          })}

          <button
            type="button"
            popoverTarget="mobile-more-nav"
            aria-expanded={moreOpen}
            aria-controls="mobile-more-nav"
            className={`relative flex flex-col items-center justify-center min-h-[48px] py-1 px-1 rounded-xl text-[11px] font-semibold transition-colors ${
              isOverflowActive || moreOpen
                ? 'text-[var(--accent)] bg-[var(--accent-soft)]'
                : 'text-[var(--ink-muted)]'
            }`}
          >
            {isOverflowActive && (
              <span
                aria-hidden="true"
                className="absolute top-0.5 w-6 h-0.5 rounded-full bg-[var(--accent)]"
              />
            )}
            <LayoutGrid className="w-5 h-5" aria-hidden="true" />
            <span className="mt-0.5 truncate max-w-full">Más</span>
          </button>
        </div>
      </nav>

      {/* Diálogo modal nativo de Ajustes IA */}
      <SettingsModal open={showSettings} onClose={() => setShowSettings(false)} />
    </div>
  );
}

export default App;
