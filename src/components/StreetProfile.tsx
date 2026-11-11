import React, { useState } from 'react';
import { GameProgress } from '../types/streetGame';
import { STREET_LEVELS } from '../data/streetData';
import { DEFAULT_GAME_PROGRESS } from '../services/storageService';
import { NativeDialog } from './NativeDialog';
import {
  Award,
  Sparkles,
  Coins,
  CheckCircle2,
  RotateCcw,
  Crown,
  MapPin,
  Lock,
  AlertTriangle
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

  const maxUnlocked = Math.max(...progress.unlockedLevels, 1);
  const currentLevelInfo = STREET_LEVELS.find((l) => l.id === maxUnlocked) || STREET_LEVELS[0];
  const totalBosses = STREET_LEVELS.length;

  const handleReset = () => {
    onUpdateProgress(DEFAULT_GAME_PROGRESS);
    setShowConfirmReset(false);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Tarjeta de Pasaporte Británico */}
      <section className="rounded-2xl bg-[#0D213F] text-white p-5 sm:p-6 border border-[#243B61] space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#163059] border border-amber-300/40 flex flex-col items-center justify-center shrink-0">
            <Crown className="w-6 h-6 text-amber-300" aria-hidden="true" />
            <span className="font-mono text-[11px] font-bold text-amber-200 mt-0.5 tabular-nums">
              N0{currentLevelInfo.number}
            </span>
          </div>

          <div className="min-w-0 flex-1 space-y-1">
            <span className="text-xs font-medium text-amber-200 block">
              Pasaporte de calle · Reino Unido
            </span>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-white">
              Rango: {currentLevelInfo.rankTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-300 shrink-0" aria-hidden="true" />
              <span className="truncate">Zona actual: {currentLevelInfo.districtName}</span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2.5 pt-4 border-t border-white/10">
          <div className="rounded-xl bg-white/5 px-3 py-2.5">
            <div className="text-[11px] text-slate-300 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-300" aria-hidden="true" />
              <span>Experiencia</span>
            </div>
            <div className="font-display text-lg font-bold text-white tabular-nums mt-0.5">
              {progress.xp} XP
            </div>
          </div>

          <div className="rounded-xl bg-white/5 px-3 py-2.5">
            <div className="text-[11px] text-slate-300 flex items-center gap-1">
              <Coins className="w-3 h-3 text-emerald-300" aria-hidden="true" />
              <span>Cartera</span>
            </div>
            <div className="font-display text-lg font-bold text-white tabular-nums mt-0.5">
              {progress.quids} Quids
            </div>
          </div>

          <div className="rounded-xl bg-white/5 px-3 py-2.5">
            <div className="text-[11px] text-slate-300 flex items-center gap-1">
              <Award className="w-3 h-3 text-sky-300" aria-hidden="true" />
              <span>Jefes</span>
            </div>
            <div className="font-display text-lg font-bold text-white tabular-nums mt-0.5">
              {progress.bossesDefeated.length}/{totalBosses}
            </div>
          </div>
        </div>
      </section>

      {/* Evolución por barrios */}
      <section className="card p-5 sm:p-6 space-y-4">
        <h3 className="font-display font-bold text-base sm:text-lg text-[var(--ink)] flex items-center gap-2">
          <Crown className="w-4 h-4 text-[var(--brass)]" aria-hidden="true" />
          <span>Reputación por barrios</span>
        </h3>

        <div className="space-y-2.5">
          {STREET_LEVELS.map((level) => {
            const isUnlocked = progress.unlockedLevels.includes(level.id);
            const isBossDefeated = progress.bossesDefeated.includes(level.id);

            return (
              <div
                key={level.id}
                className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 ${
                  isUnlocked
                    ? 'bg-[var(--surface-2)] border-[var(--border)]'
                    : 'bg-[var(--surface-2)]/50 border-[var(--border)] opacity-65'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-9 h-9 rounded-lg bg-[var(--surface)] border border-[var(--border)] font-mono text-xs font-bold text-[var(--ink)] flex items-center justify-center shrink-0 tabular-nums">
                    0{level.number}
                  </span>
                  <div className="min-w-0">
                    <strong className="text-sm text-[var(--ink)] font-semibold block truncate">
                      {level.rankTitle}
                    </strong>
                    <p className="text-xs text-[var(--ink-muted)] truncate">{level.districtName}</p>
                  </div>
                </div>

                <div className="shrink-0">
                  {isBossDefeated ? (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-md bg-[var(--pine-soft)] text-[var(--pine)] border border-[var(--pine-border)]">
                      <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Conquistado</span>
                    </span>
                  ) : isUnlocked ? (
                    <span className="inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-md bg-[var(--accent-soft)] text-[var(--accent)] border border-[var(--accent-border)]">
                      En curso
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-md bg-[var(--surface-3)] text-[var(--ink-muted)]">
                      <Lock className="w-3 h-3" aria-hidden="true" />
                      <span>Bloqueado</span>
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Reinicio con confirmación modal nativa */}
      <section className="card p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-0.5">
          <h3 className="font-display font-bold text-sm sm:text-base text-[var(--ink)]">
            Reiniciar progreso de barrios
          </h3>
          <p className="text-xs text-[var(--ink-muted)]">
            Vuelve a la Zona 01 con 0 XP y bloquea de nuevo los niveles desbloqueados.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowConfirmReset(true)}
          className="btn btn-danger-outline btn-sm shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Reiniciar partida</span>
        </button>
      </section>

      <NativeDialog
        open={showConfirmReset}
        onClose={() => setShowConfirmReset(false)}
        labelledBy="reset-dialog-title"
        lightDismiss={true}
      >
        <div className="p-5 sm:p-6 space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--crimson-soft)] border border-[var(--crimson-border)] text-[var(--crimson)] flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5" aria-hidden="true" />
            </div>
            <div className="space-y-1">
              <h3
                id="reset-dialog-title"
                className="font-display font-bold text-lg text-[var(--ink)]"
              >
                ¿Reiniciar todo el progreso?
              </h3>
              <p className="text-sm text-[var(--ink-muted)]">
                Se borrarán tus XP, Quids acumulados y jefes derrotados. Esta acción no se puede deshacer.
              </p>
            </div>
          </div>

          <div className="flex flex-col-reverse sm:flex-row gap-2 justify-end pt-2">
            <button
              type="button"
              onClick={() => setShowConfirmReset(false)}
              className="btn btn-secondary"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="btn bg-[var(--crimson)] hover:bg-[var(--crimson-hover)] text-white"
            >
              Sí, reiniciar progreso
            </button>
          </div>
        </div>
      </NativeDialog>
    </div>
  );
};
