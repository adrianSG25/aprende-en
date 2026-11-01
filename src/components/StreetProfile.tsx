import React, { useState } from 'react';
import { GameProgress } from '../types/streetGame';
import { STREET_LEVELS } from '../data/streetData';
import { DEFAULT_GAME_PROGRESS } from '../services/storageService';
import {
  Trophy,
  Sparkles,
  Coins,
  CheckCircle2,
  RotateCcw,
  Crown,
  MapPin,
  Lock
} from 'lucide-react';

interface StreetProfileProps {
  progress: GameProgress;
  onUpdateProgress: (updated: GameProgress) => void;
}

export const StreetProfile: React.FC<StreetProfileProps> = ({
  progress,
  onUpdateProgress
}) => {
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  // Determine current street rank based on highest unlocked level
  const maxUnlocked = Math.max(...progress.unlockedLevels, 1);
  const currentLevelInfo = STREET_LEVELS.find((l) => l.id === maxUnlocked) || STREET_LEVELS[0];

  const handleReset = () => {
    onUpdateProgress(DEFAULT_GAME_PROGRESS);
    setShowConfirmReset(false);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto animate-in fade-in duration-200">
      {/* Passport / Gamer ID Card */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-5 sm:p-6 shadow-xl border-2 border-amber-400/50">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 text-center sm:text-left">
          <div className="w-20 h-20 rounded-3xl bg-amber-400 text-slate-950 flex items-center justify-center text-4xl font-black shadow-lg border-2 border-white shrink-0">
            {currentLevelInfo.badge}
          </div>

          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40">
              Pasaporte Callejero de UK 🇬🇧
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
              Rango: {currentLevelInfo.rankTitle}
            </h2>
            <p className="text-xs text-slate-300 mt-0.5 flex items-center justify-center sm:justify-start gap-1">
              <MapPin className="w-3.5 h-3.5 text-rose-400" />
              <span>Zona Actual: {currentLevelInfo.districtName}</span>
            </p>

            {/* Quick Stat Badges */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-3 pt-3 border-t border-white/10">
              <span className="px-3 py-1 rounded-xl bg-white/10 text-xs font-bold flex items-center gap-1.5 border border-white/10">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <strong>{progress.xp}</strong> XP Callejera
              </span>
              <span className="px-3 py-1 rounded-xl bg-white/10 text-xs font-bold flex items-center gap-1.5 border border-white/10">
                <Coins className="w-3.5 h-3.5 text-emerald-400" />
                <strong>{progress.quids}</strong> Quids en la Cartera 💷
              </span>
              <span className="px-3 py-1 rounded-xl bg-white/10 text-xs font-bold flex items-center gap-1.5 border border-white/10">
                <Trophy className="w-3.5 h-3.5 text-purple-400" />
                <strong>{progress.bossesDefeated.length} / 5</strong> Jefes Derrotados
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Ranks & Districts Progress List */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
        <h3 className="font-extrabold text-slate-900 text-sm sm:text-base flex items-center gap-2">
          <Crown className="w-4 h-4 text-amber-500" />
          <span>Evolución de Tu Reputación por Barrios</span>
        </h3>

        <div className="space-y-3">
          {STREET_LEVELS.map((level) => {
            const isUnlocked = progress.unlockedLevels.includes(level.id);
            const isBossDefeated = progress.bossesDefeated.includes(level.id);

            return (
              <div
                key={level.id}
                className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 ${
                  isUnlocked
                    ? 'bg-slate-50 border-slate-200'
                    : 'bg-slate-100/60 border-slate-200 opacity-60'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-2xl shrink-0">{level.badge}</span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <strong className="text-xs sm:text-sm text-slate-900 font-extrabold truncate">
                        Nivel {level.number}: {level.rankTitle}
                      </strong>
                    </div>
                    <p className="text-[11px] text-slate-500 truncate">
                      {level.districtName}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  {isBossDefeated ? (
                    <span className="text-[10px] font-black px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      Conquistado
                    </span>
                  ) : isUnlocked ? (
                    <span className="text-[10px] font-black px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200">
                      En Curso
                    </span>
                  ) : (
                    <span className="text-[10px] font-black px-2.5 py-1 rounded-lg bg-slate-200 text-slate-600 flex items-center gap-1">
                      <Lock className="w-3 h-3" />
                      Bloqueado
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reset Progress Section */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h4 className="font-extrabold text-slate-900 text-sm">
            Reiniciar Progreso del Videojuego
          </h4>
          <p className="text-xs text-slate-500">
            Vuelve al Nivel 1 y bloquea de nuevo los barrios si quieres empezar de cero.
          </p>
        </div>

        {!showConfirmReset ? (
          <button
            type="button"
            onClick={() => setShowConfirmReset(true)}
            className="px-4 py-2.5 rounded-xl border border-rose-300 text-rose-700 hover:bg-rose-50 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reiniciar Partida</span>
          </button>
        ) : (
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleReset}
              className="px-3.5 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 cursor-pointer shadow-xs"
            >
              Sí, Borrar Progreso
            </button>
            <button
              type="button"
              onClick={() => setShowConfirmReset(false)}
              className="px-3 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200 cursor-pointer"
            >
              Cancelar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
