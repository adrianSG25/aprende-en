import React, { useState } from 'react';
import { StreetLevel, StreetTopic, GameProgress } from '../types/streetGame';
import { STREET_LEVELS, canUnlockLevel } from '../data/streetData';
import { StreetTopicView } from './StreetTopicView';
import { StreetBossFight } from './StreetBossFight';
import { runViewTransition } from '../utils/viewTransition';
import {
  Lock,
  Unlock,
  Award,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  Swords,
  Coins,
  PlaneLanding,
  Beer,
  TrainFront,
  Hand,
  PoundSterling,
  Smartphone,
  MoonStar
} from 'lucide-react';

interface StreetLevelMapProps {
  progress: GameProgress;
  onUpdateProgress: (updated: GameProgress) => void;
  onOpenSettings?: () => void;
}

function getLevelDistrictVisual(levelId: number): {
  icon: React.ComponentType<{ className?: string }>;
  dotColor: string;
} {
  if (levelId === 1) {
    return { icon: PlaneLanding, dotColor: 'bg-[var(--brass)]' };
  }
  if (levelId === 2) {
    return { icon: Beer, dotColor: 'bg-[var(--pine)]' };
  }
  return { icon: TrainFront, dotColor: 'bg-[var(--accent)]' };
}

function getTopicIcon(topicId: string) {
  if (topicId.includes('l1-t1')) return Hand;
  if (topicId.includes('l1-t2')) return PoundSterling;
  if (topicId.includes('l2-t1')) return Beer;
  if (topicId.includes('l2-t2')) return MoonStar;
  return Smartphone;
}

export const StreetLevelMap: React.FC<StreetLevelMapProps> = ({
  progress,
  onUpdateProgress
}) => {
  const [selectedTopic, setSelectedTopic] = useState<StreetTopic | null>(null);
  const [activeBossFight, setActiveBossFight] = useState<StreetLevel | null>(null);

  const handleCompleteExercise = (exerciseId: string, isCorrect: boolean, xp: number) => {
    const updated: GameProgress = {
      ...progress,
      xp: isCorrect ? progress.xp + xp : progress.xp,
      quids: isCorrect ? progress.quids + 1 : progress.quids,
      completedExerciseIds:
        isCorrect && !progress.completedExerciseIds.includes(exerciseId)
          ? [...progress.completedExerciseIds, exerciseId]
          : progress.completedExerciseIds
    };
    onUpdateProgress(updated);
  };

  const handleBossVictory = (levelId: number, xpEarned: number) => {
    const nextLevelId = levelId + 1;
    const bossesDefeated = progress.bossesDefeated.includes(levelId)
      ? progress.bossesDefeated
      : [...progress.bossesDefeated, levelId];

    const unlockedLevels = progress.unlockedLevels.includes(nextLevelId)
      ? progress.unlockedLevels
      : [...progress.unlockedLevels, nextLevelId];

    const updated: GameProgress = {
      ...progress,
      xp: progress.xp + xpEarned,
      quids: progress.quids + 5,
      bossesDefeated,
      unlockedLevels: unlockedLevels.filter((id) => id <= STREET_LEVELS.length)
    };
    onUpdateProgress(updated);
  };

  if (selectedTopic) {
    return (
      <StreetTopicView
        topic={selectedTopic}
        onBack={() =>
          runViewTransition(() => setSelectedTopic(null), 'levels-route-heading')
        }
        onCompleteExercise={handleCompleteExercise}
        completedExerciseIds={progress.completedExerciseIds}
      />
    );
  }

  const totalDistricts = STREET_LEVELS.length;
  const unlockedPct = Math.round((progress.unlockedLevels.length / totalDistricts) * 100);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Diálogo nativo de Reto del Jefe */}
      {activeBossFight && (
        <StreetBossFight
          boss={activeBossFight.boss}
          onVictory={handleBossVictory}
          onClose={() => setActiveBossFight(null)}
        />
      )}

      {/* Resumen de Ruta y Métricas */}
      <section className="card p-5 sm:p-6 space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2
              id="levels-route-heading"
              tabIndex={-1}
              className="font-display text-xl sm:text-2xl font-bold text-[var(--ink)] tracking-[-0.02em] outline-none"
            >
              Ruta por barrios de Reino Unido
            </h2>
            <p className="text-sm text-[var(--ink-muted)] max-w-xl">
              Domina cada situación real escribiendo como un nativo y supera a cada jefe de zona para abrir el siguiente barrio.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-2.5 shrink-0">
            <div className="inset-well px-3 py-2 text-center sm:text-left">
              <div className="text-[11px] font-medium text-[var(--ink-muted)] flex items-center justify-center sm:justify-start gap-1">
                <Sparkles className="w-3 h-3 text-[var(--brass)]" aria-hidden="true" />
                <span>XP</span>
              </div>
              <div className="font-display text-base sm:text-lg font-bold text-[var(--ink)] tabular-nums mt-0.5">
                {progress.xp}
              </div>
            </div>

            <div className="inset-well px-3 py-2 text-center sm:text-left">
              <div className="text-[11px] font-medium text-[var(--ink-muted)] flex items-center justify-center sm:justify-start gap-1">
                <Coins className="w-3 h-3 text-[var(--pine)]" aria-hidden="true" />
                <span>Quids</span>
              </div>
              <div className="font-display text-base sm:text-lg font-bold text-[var(--ink)] tabular-nums mt-0.5">
                {progress.quids}
              </div>
            </div>

            <div className="inset-well px-3 py-2 text-center sm:text-left">
              <div className="text-[11px] font-medium text-[var(--ink-muted)] flex items-center justify-center sm:justify-start gap-1">
                <Award className="w-3 h-3 text-[var(--accent)]" aria-hidden="true" />
                <span>Jefes</span>
              </div>
              <div className="font-display text-base sm:text-lg font-bold text-[var(--ink)] tabular-nums mt-0.5">
                {progress.bossesDefeated.length}/{totalDistricts}
              </div>
            </div>
          </div>
        </div>

        {/* Barra segmentada de progreso general */}
        <div className="pt-4 border-t border-[var(--border)] space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-[var(--ink-muted)]">
              Progreso de la campaña ({progress.unlockedLevels.length} de {totalDistricts} zonas)
            </span>
            <span className="text-[var(--accent)] tabular-nums">{unlockedPct}%</span>
          </div>
          <div
            className="grid gap-1.5"
            style={{ gridTemplateColumns: `repeat(${totalDistricts}, minmax(0, 1fr))` }}
            role="progressbar"
            aria-valuenow={unlockedPct}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Progreso de barrios desbloqueados"
          >
            {STREET_LEVELS.map((lvl) => {
              const isOpen = progress.unlockedLevels.includes(lvl.id);
              const isCleared = progress.bossesDefeated.includes(lvl.id);
              return (
                <div
                  key={lvl.id}
                  className={`h-2 rounded-full transition-colors ${
                    isCleared
                      ? 'bg-[var(--pine)]'
                      : isOpen
                      ? 'bg-[var(--accent)]'
                      : 'bg-[var(--surface-3)]'
                  }`}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* Lista de Barrios / Niveles */}
      <div className="space-y-5">
        {STREET_LEVELS.map((level) => {
          const isUnlocked = progress.unlockedLevels.includes(level.id);
          const isBossDefeated = progress.bossesDefeated.includes(level.id);
          const unlockStatus = canUnlockLevel(level.id, progress.xp, progress.bossesDefeated);
          const { icon: DistrictIcon, dotColor } = getLevelDistrictVisual(level.id);

          return (
            <article
              key={level.id}
              className={`card overflow-hidden ${isUnlocked ? '' : 'opacity-85 bg-[var(--surface-2)]/60'}`}
            >
              {/* Cabecera del barrio */}
              <div className="p-4 sm:p-5 border-b border-[var(--border)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3.5 min-w-0">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${
                      isUnlocked
                        ? 'bg-[var(--surface-2)] border-[var(--border)] text-[var(--ink)]'
                        : 'bg-[var(--surface-3)] border-[var(--border)] text-[var(--ink-subtle)]'
                    }`}
                  >
                    <DistrictIcon className="w-5 h-5" aria-hidden="true" />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold font-mono text-[var(--ink)] tabular-nums">
                        <span className={`w-2 h-2 rounded-full ${dotColor}`} aria-hidden="true" />
                        Zona 0{level.number}
                      </span>
                      <span className="text-xs text-[var(--ink-muted)] truncate">
                        {level.districtName}
                      </span>
                      {isBossDefeated && (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-md bg-[var(--pine-soft)] text-[var(--pine)] border border-[var(--pine-border)]">
                          <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Jefe superado</span>
                        </span>
                      )}
                    </div>

                    <h3 className="font-display text-lg sm:text-xl font-bold text-[var(--ink)] mt-1">
                      {level.title}
                    </h3>
                    <p className="text-xs text-[var(--ink-muted)] mt-0.5">
                      Rango asignado:{' '}
                      <strong className="font-semibold text-[var(--ink)]">{level.rankTitle}</strong>
                    </p>
                  </div>
                </div>

                <div className="shrink-0">
                  {isUnlocked ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--pine-soft)] border border-[var(--pine-border)] text-[var(--pine)] text-xs font-semibold">
                      <Unlock className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Disponible</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--surface-3)] border border-[var(--border-strong)] text-[var(--ink-muted)] text-xs font-semibold">
                      <Lock className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Bloqueado</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Aviso de desbloqueo si está cerrado */}
              {!isUnlocked && (
                <div className="px-4 sm:px-5 py-3.5 bg-[var(--brass-soft)] border-b border-[var(--brass-border)] text-xs sm:text-sm text-[var(--ink)] flex items-start gap-2.5">
                  <Lock className="w-4 h-4 text-[var(--brass)] shrink-0 mt-0.5" aria-hidden="true" />
                  <div className="space-y-1">
                    <div className="font-semibold text-[var(--brass)]">
                      Requisitos para abrir esta zona
                    </div>
                    <ul className="space-y-0.5 text-xs text-[var(--ink-muted)]">
                      {unlockStatus.missingXP > 0 && (
                        <li className="tabular-nums">
                          Necesitas <strong className="text-[var(--ink)]">{unlockStatus.missingXP} XP</strong> más ({progress.xp} / {level.requiredXP} XP).
                        </li>
                      )}
                      {unlockStatus.needsBoss && (
                        <li>
                          Supera al jefe previo:{' '}
                          <strong className="text-[var(--ink)]">
                            {unlockStatus.prevBossName || `Jefe de Zona ${level.id - 1}`}
                          </strong>
                          .
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              )}

              {/* Contenido del nivel */}
              <div className="p-4 sm:p-5 space-y-4">
                <p className="text-sm text-[var(--ink-muted)] leading-relaxed">{level.description}</p>

                {isUnlocked && (
                  <div className="space-y-4 pt-1">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {level.topics.map((topic) => {
                        const TopicIcon = getTopicIcon(topic.id);
                        const totalTopicExercises = topic.exercises.length;
                        const completedCount = topic.exercises.filter((ex) =>
                          progress.completedExerciseIds.includes(ex.id)
                        ).length;

                        return (
                          <button
                            key={topic.id}
                            type="button"
                            onClick={() =>
                              runViewTransition(() => setSelectedTopic(topic), 'topic-view-heading')
                            }
                            className="text-left p-3.5 rounded-xl bg-[var(--surface-2)] border border-[var(--border)] hover:border-[var(--accent-border)] hover:bg-[var(--accent-soft)]/50 transition-colors flex items-center justify-between gap-3 group"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="w-10 h-10 rounded-lg bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center text-[var(--ink)] group-hover:text-[var(--accent)] shrink-0 transition-colors">
                                <TopicIcon className="w-4 h-4" aria-hidden="true" />
                              </div>
                              <div className="min-w-0">
                                <h4 className="font-semibold text-sm text-[var(--ink)] group-hover:text-[var(--accent)] truncate">
                                  {topic.title}
                                </h4>
                                <p className="text-xs text-[var(--ink-muted)] truncate">
                                  {topic.subtitle}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-md bg-[var(--surface)] border border-[var(--border)] text-[var(--ink-muted)] tabular-nums">
                                {completedCount}/{totalTopicExercises}
                              </span>
                              <ChevronRight
                                className="w-4 h-4 text-[var(--ink-subtle)] group-hover:text-[var(--accent)] transition-colors"
                                aria-hidden="true"
                              />
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Barra del Jefe de Zona */}
                    <div className="rounded-xl bg-[var(--tarmac)] text-white p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-[var(--tarmac-border)]">
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className="w-11 h-11 rounded-xl bg-[var(--tarmac-soft)] border border-[var(--tarmac-border)] flex items-center justify-center text-amber-400 shrink-0">
                          <Swords className="w-5 h-5" aria-hidden="true" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-medium text-amber-300">
                            Prueba final de salida
                          </div>
                          <h4 className="font-display font-bold text-base text-white truncate">
                            {level.boss.bossName}
                          </h4>
                          <p className="text-xs text-slate-300 truncate">{level.boss.bossTitle}</p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setActiveBossFight(level)}
                        className="btn bg-amber-400 hover:bg-amber-300 text-[var(--tarmac)] font-bold shrink-0"
                      >
                        <Swords className="w-4 h-4" aria-hidden="true" />
                        <span>{isBossDefeated ? 'Repetir prueba' : 'Enfrentar al jefe'}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
