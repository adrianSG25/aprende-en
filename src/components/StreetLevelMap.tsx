import React, { useState } from 'react';
import { StreetLevel, StreetTopic, GameProgress } from '../types/streetGame';
import { STREET_LEVELS, canUnlockLevel } from '../data/streetData';
import { StreetTopicView } from './StreetTopicView';
import { StreetBossFight } from './StreetBossFight';
import {
  Lock,
  Unlock,
  Trophy,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  Sword,
  Coins
} from 'lucide-react';

interface StreetLevelMapProps {
  progress: GameProgress;
  onUpdateProgress: (updated: GameProgress) => void;
  onOpenSettings?: () => void;
}

export const StreetLevelMap: React.FC<StreetLevelMapProps> = ({
  progress,
  onUpdateProgress,
  onOpenSettings: _onOpenSettings
}) => {
  const [selectedTopic, setSelectedTopic] = useState<StreetTopic | null>(null);
  const [activeBossFight, setActiveBossFight] = useState<StreetLevel | null>(null);

  const handleCompleteExercise = (exerciseId: string, isCorrect: boolean, xp: number) => {
    const updated: GameProgress = {
      ...progress,
      xp: isCorrect ? progress.xp + xp : progress.xp,
      quids: isCorrect ? progress.quids + 1 : progress.quids,
      completedExerciseIds: isCorrect && !progress.completedExerciseIds.includes(exerciseId)
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
      unlockedLevels: unlockedLevels.filter((id) => id <= 5)
    };
    onUpdateProgress(updated);
  };

  if (selectedTopic) {
    return (
      <StreetTopicView
        topic={selectedTopic}
        onBack={() => setSelectedTopic(null)}
        onCompleteExercise={handleCompleteExercise}
        completedExerciseIds={progress.completedExerciseIds}
      />
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-200">
      {/* Boss Fight Modal Overlay if open */}
      {activeBossFight && (
        <StreetBossFight
          boss={activeBossFight.boss}
          onVictory={handleBossVictory}
          onClose={() => setActiveBossFight(null)}
        />
      )}

      {/* Gamer Header Stats Bar */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-4 sm:p-6 shadow-md border border-indigo-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-2xl shadow-md shrink-0">
              🇬🇧
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/30 text-indigo-200 border border-indigo-400">
                Campaña de Calle UK
              </span>
              <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
                El Camino del Idioma Callejero
              </h2>
              <p className="text-xs text-slate-300">
                Aprende el inglés que habla la gente de verdad: sin postureo ni libros de texto.
              </p>
            </div>
          </div>

          {/* Gamification Stats: XP, Quids, Bosses */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap bg-white/5 border border-white/10 rounded-2xl p-2.5 sm:p-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-black">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{progress.xp} XP</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-400/20 border border-emerald-400/40 text-emerald-300 text-xs font-black">
              <Coins className="w-4 h-4 text-emerald-400" />
              <span>{progress.quids} Quids 💷</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-400/20 border border-purple-400/40 text-purple-200 text-xs font-black">
              <Trophy className="w-4 h-4 text-purple-300" />
              <span>{progress.bossesDefeated.length}/5 Jefes</span>
            </div>
          </div>
        </div>

        {/* Global Level Progress Bar */}
        <div className="mt-4 pt-3 border-t border-white/10">
          <div className="flex justify-between items-center text-xs font-bold text-slate-300 mb-1.5">
            <span>Progreso General de los 5 Barrios de UK</span>
            <span className="text-amber-300">{progress.unlockedLevels.length * 20}% Conquistado</span>
          </div>
          <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden border border-white/10">
            <div
              className="h-full bg-gradient-to-r from-amber-400 via-emerald-400 to-indigo-400 transition-all duration-500 rounded-full"
              style={{ width: `${progress.unlockedLevels.length * 20}%` }}
            />
          </div>
        </div>
      </div>

      {/* Levels Roadmap List */}
      <div className="space-y-6">
        {STREET_LEVELS.map((level) => {
          const isUnlocked = progress.unlockedLevels.includes(level.id);
          const isBossDefeated = progress.bossesDefeated.includes(level.id);
          const unlockStatus = canUnlockLevel(level.id, progress.xp, progress.bossesDefeated);

          return (
            <div
              key={level.id}
              className={`rounded-3xl border-2 transition-all overflow-hidden ${
                isUnlocked
                  ? 'bg-white border-slate-200 shadow-sm hover:shadow-md'
                  : 'bg-slate-100/90 border-slate-300 opacity-80'
              }`}
            >
              {/* Level Header Banner */}
              <div
                className={`p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  isUnlocked ? level.bgColor : 'bg-slate-200/70'
                } border-b border-slate-200`}
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-xs shrink-0 ${
                      isUnlocked
                        ? 'bg-white border-2 border-slate-200'
                        : 'bg-slate-300 border border-slate-400 grayscale'
                    }`}
                  >
                    {level.badge}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-900 text-white">
                        Nivel {level.number}
                      </span>
                      <span className="text-xs font-bold text-slate-600">
                        {level.districtName}
                      </span>
                      {isBossDefeated && (
                        <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          Jefe Derrotado
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
                      {level.title}
                    </h3>
                    <p className="text-xs text-slate-600 font-medium">
                      Rango: <strong className="text-slate-800">{level.rankTitle}</strong>
                    </p>
                  </div>
                </div>

                {/* Lock or Play Action Pill */}
                <div className="shrink-0 flex items-center">
                  {isUnlocked ? (
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-500 text-white text-xs font-black shadow-xs">
                      <Unlock className="w-3.5 h-3.5" />
                      <span>Desbloqueado</span>
                    </span>
                  ) : (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 text-white text-xs font-black shadow-xs">
                      <Lock className="w-3.5 h-3.5 text-amber-400" />
                      <span>Bloqueado</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Locked Requirements Banner if locked */}
              {!isUnlocked && (
                <div className="p-4 bg-amber-50 border-b border-amber-200 text-xs sm:text-sm text-amber-950 flex items-start gap-3">
                  <Lock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-black text-amber-900">
                      Requisitos para desbloquear este barrio:
                    </strong>
                    <ul className="list-disc list-inside mt-1 space-y-0.5 text-xs text-amber-800">
                      {unlockStatus.missingXP > 0 && (
                        <li>
                          Te faltan <strong>{unlockStatus.missingXP} XP</strong> de calle (tienes {progress.xp} / {level.requiredXP} XP).
                        </li>
                      )}
                      {unlockStatus.needsBoss && (
                        <li>
                          Debes derrotar al jefe anterior: <strong>{unlockStatus.prevBossName || `Jefe de Nivel ${level.id - 1}`}</strong>.
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              )}

              {/* Level Body: Topics & Boss Fight Button */}
              <div className="p-4 sm:p-5 space-y-4">
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {level.description}
                </p>

                {isUnlocked && (
                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
                      Temas del Barrio:
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {level.topics.map((topic) => {
                        const totalTopicExercises = topic.exercises.length;
                        const completedCount = topic.exercises.filter((ex) =>
                          progress.completedExerciseIds.includes(ex.id)
                        ).length;

                        return (
                          <button
                            key={topic.id}
                            type="button"
                            onClick={() => setSelectedTopic(topic)}
                            className="text-left p-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-indigo-50/50 hover:border-indigo-300 transition-all flex items-center justify-between gap-3 cursor-pointer group shadow-2xs"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <span className="text-2xl shrink-0 group-hover:scale-110 transition-transform">
                                {topic.icon}
                              </span>
                              <div className="min-w-0">
                                <h5 className="font-extrabold text-xs sm:text-sm text-slate-900 group-hover:text-indigo-700 truncate">
                                  {topic.title}
                                </h5>
                                <p className="text-[11px] text-slate-500 truncate">
                                  {topic.subtitle}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600">
                                {completedCount}/{totalTopicExercises}
                              </span>
                              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Boss Fight Card */}
                    <div className="pt-2">
                      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-2 border-amber-400/60 shadow-sm">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center text-2xl font-black shrink-0">
                            {level.boss.bossAvatar}
                          </div>
                          <div>
                            <span className="text-[10px] font-black uppercase tracking-wider text-amber-300">
                              Desafío de Puerta de Salida
                            </span>
                            <h5 className="font-black text-sm sm:text-base text-white">
                              {level.boss.bossName}
                            </h5>
                            <p className="text-xs text-slate-300">
                              {level.boss.bossTitle}
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => setActiveBossFight(level)}
                          className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm cursor-pointer transition-all"
                        >
                          <Sword className="w-4 h-4" />
                          <span>
                            {isBossDefeated ? 'Repetir Desafío del Jefe' : '⚔️ Enfrentar al Jefe (Desbloquear Nivel)'}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
