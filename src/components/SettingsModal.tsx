import React, { useState } from 'react';
import { AIConfig } from '../types';
import {
  getAIConfig,
  saveAIConfig,
  fetchAvailableModelsForKey
} from '../services/aiService';
import { NativeDialog } from './NativeDialog';
import {
  X,
  Cpu,
  Smartphone,
  CheckCircle2,
  Download,
  Upload,
  RefreshCw,
  Eye,
  EyeOff,
  ClipboardPaste,
  AlertTriangle,
  Zap
} from 'lucide-react';

interface SettingsModalProps {
  open: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ open, onClose }) => {
  const [config, setConfig] = useState<AIConfig>(() => getAIConfig());
  const [saved, setSaved] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const [availableModels, setAvailableModels] = useState<string[]>([]);
  const [loadingModels, setLoadingModels] = useState(false);
  const [detectStatus, setDetectStatus] = useState<{
    kind: 'ok' | 'warn';
    text: string;
  } | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveAIConfig(config);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handlePasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text && text.trim()) {
        setConfig({ ...config, apiKey: text.trim(), model: 'auto' });
      }
    } catch {
      // El navegador no concedió acceso automático al portapapeles
    }
  };

  const handleDetectModels = async () => {
    if (!config.apiKey.trim()) {
      setDetectStatus({
        kind: 'warn',
        text: 'Pega primero tu clave API para consultar los modelos disponibles.'
      });
      return;
    }
    setLoadingModels(true);
    setDetectStatus(null);
    try {
      const models = await fetchAvailableModelsForKey(config);
      setAvailableModels(models);
      if (models.length > 0) {
        const updated = { ...config, model: models[0] };
        setConfig(updated);
        saveAIConfig(updated);
        setDetectStatus({
          kind: 'ok',
          text: `${models.length} modelos activos detectados. Seleccionado: ${models[0]}`
        });
      } else {
        setDetectStatus({
          kind: 'warn',
          text: 'No se pudieron listar los modelos. Se usará detección automática.'
        });
      }
    } catch {
      setDetectStatus({
        kind: 'warn',
        text: 'Error al consultar modelos. Revisa tu clave API e inténtalo de nuevo.'
      });
    } finally {
      setLoadingModels(false);
    }
  };

  const handleExportBackup = () => {
    const data = {
      stats: localStorage.getItem('engdrill_user_stats_v1'),
      mistakes: localStorage.getItem('engdrill_mistake_vault_v1'),
      customEx: localStorage.getItem('engdrill_custom_exercises_v1'),
      gameProgress: localStorage.getItem('uk_street_game_progress_v1')
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `uk_street_en_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        if (parsed.stats) localStorage.setItem('engdrill_user_stats_v1', parsed.stats);
        if (parsed.mistakes) localStorage.setItem('engdrill_mistake_vault_v1', parsed.mistakes);
        if (parsed.customEx) localStorage.setItem('engdrill_custom_exercises_v1', parsed.customEx);
        if (parsed.gameProgress) {
          localStorage.setItem('uk_street_game_progress_v1', parsed.gameProgress);
        }
        window.location.reload();
      } catch {
        setDetectStatus({
          kind: 'warn',
          text: 'El archivo seleccionado no es una copia de seguridad JSON válida.'
        });
      }
    };
    reader.readAsText(file);
  };

  return (
    <NativeDialog
      open={open}
      onClose={onClose}
      labelledBy="settings-dialog-title"
      lightDismiss={true}
    >
      <div className="p-4 sm:p-6 space-y-5">
        {/* Cabecera del diálogo */}
        <div className="flex items-center justify-between gap-3 pb-3.5 border-b border-[var(--border)]">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-[var(--accent-soft)] border border-[var(--accent-border)] flex items-center justify-center text-[var(--accent)] shrink-0">
              <Cpu className="w-4 h-4" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <h2
                id="settings-dialog-title"
                className="font-display text-base sm:text-lg font-bold text-[var(--ink)] truncate"
              >
                Ajustes de IA y Sincronización
              </h2>
              <p className="text-xs text-[var(--ink-muted)] truncate">
                Groq, Gemini, OpenAI y copia de seguridad local
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="icon-btn shrink-0"
            aria-label="Cerrar ajustes"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Formulario de clave API */}
        <form onSubmit={handleSave} className="space-y-4">
          <div className="inset-well p-3.5 space-y-1">
            <div className="text-xs sm:text-sm font-semibold text-[var(--ink)] flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-[var(--accent)]" aria-hidden="true" />
              <span>Conectar proveedor de IA</span>
            </div>
            <p className="text-xs text-[var(--ink-muted)] leading-relaxed">
              Pega tu clave de Groq (<code className="font-mono text-[11px] bg-[var(--surface)] px-1.5 py-0.5 rounded border border-[var(--border)]">gsk_…</code>), Google Gemini (<code className="font-mono text-[11px] bg-[var(--surface)] px-1.5 py-0.5 rounded border border-[var(--border)]">AIza…</code>) u OpenAI (<code className="font-mono text-[11px] bg-[var(--surface)] px-1.5 py-0.5 rounded border border-[var(--border)]">sk-…</code>). Se guarda únicamente en tu dispositivo.
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="settings-api-key" className="text-xs font-semibold text-[var(--ink)]">
                Clave API
              </label>
              {typeof navigator !== 'undefined' && navigator.clipboard && (
                <button
                  type="button"
                  onClick={handlePasteFromClipboard}
                  className="text-xs text-[var(--accent)] hover:underline font-semibold flex items-center gap-1"
                >
                  <ClipboardPaste className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Pegar del portapapeles</span>
                </button>
              )}
            </div>

            <div className="relative">
              <input
                id="settings-api-key"
                name="apiKey"
                type={showKey ? 'text' : 'password'}
                value={config.apiKey}
                onChange={(e) => setConfig({ ...config, apiKey: e.target.value, model: 'auto' })}
                placeholder="Pega aquí: gsk_… / AIza… / sk-…"
                className="input-field pr-11 font-mono text-sm"
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="icon-btn absolute right-1 top-1/2 -translate-y-1/2 !min-w-[38px] !min-h-[38px]"
                aria-label={showKey ? 'Ocultar clave API' : 'Mostrar clave API'}
              >
                {showKey ? (
                  <EyeOff className="w-4 h-4" aria-hidden="true" />
                ) : (
                  <Eye className="w-4 h-4" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={handleDetectModels}
            disabled={loadingModels || !config.apiKey.trim()}
            className="btn btn-soft w-full"
          >
            <RefreshCw
              className={`w-4 h-4 ${loadingModels ? 'animate-spin' : ''}`}
              aria-hidden="true"
            />
            <span>
              {loadingModels ? 'Consultando modelos disponibles…' : 'Detectar modelos automáticamente'}
            </span>
          </button>

          {detectStatus && (
            <div
              aria-live="polite"
              className={`rounded-xl px-3.5 py-2.5 text-xs flex items-start gap-2 border ${
                detectStatus.kind === 'ok'
                  ? 'bg-[var(--pine-soft)] border-[var(--pine-border)] text-[var(--pine)]'
                  : 'bg-[var(--brass-soft)] border-[var(--brass-border)] text-[var(--brass)]'
              }`}
            >
              {detectStatus.kind === 'ok' ? (
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
              ) : (
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
              )}
              <span>{detectStatus.text}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="settings-provider"
                className="block text-xs font-semibold text-[var(--ink-muted)] mb-1.5"
              >
                Proveedor IA
              </label>
              <select
                id="settings-provider"
                name="provider"
                value={config.provider}
                onChange={(e) => {
                  const prov = e.target.value as AIConfig['provider'];
                  setConfig({ ...config, provider: prov, model: 'auto' });
                }}
                className="input-field"
              >
                <option value="groq">Groq Cloud (gsk_…)</option>
                <option value="gemini">Google Gemini Studio (AIza…)</option>
                <option value="openai">OpenAI / xAI / OpenRouter</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="settings-model"
                className="block text-xs font-semibold text-[var(--ink-muted)] mb-1.5"
              >
                Modelo
              </label>
              {availableModels.length > 0 ? (
                <select
                  id="settings-model"
                  name="model"
                  value={config.model}
                  onChange={(e) => setConfig({ ...config, model: e.target.value })}
                  className="input-field"
                >
                  <option value="auto">Automático (el mejor disponible)</option>
                  {availableModels.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id="settings-model"
                  name="model"
                  type="text"
                  value={config.model}
                  onChange={(e) => setConfig({ ...config, model: e.target.value })}
                  placeholder="auto"
                  className="input-field"
                />
              )}
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-full">
            {saved ? (
              <>
                <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                <span>Configuración guardada</span>
              </>
            ) : (
              <span>Guardar configuración IA</span>
            )}
          </button>
        </form>

        {/* Instalación PWA en móvil */}
        <div className="pt-4 border-t border-[var(--border)] space-y-2">
          <h3 className="text-xs sm:text-sm font-bold text-[var(--ink)] flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-[var(--pine)]" aria-hidden="true" />
            <span>Instalar como aplicación móvil</span>
          </h3>
          <ul className="inset-well p-3.5 text-xs text-[var(--ink-muted)] space-y-1.5 leading-relaxed">
            <li>
              <strong className="text-[var(--ink)]">Android (Chrome):</strong> menú arriba a la derecha → «Instalar aplicación».
            </li>
            <li>
              <strong className="text-[var(--ink)]">iPhone (Safari):</strong> botón Compartir → «Añadir a pantalla de inicio».
            </li>
          </ul>
        </div>

        {/* Copias de seguridad */}
        <div className="pt-4 border-t border-[var(--border)] space-y-2.5">
          <h3 className="text-xs sm:text-sm font-bold text-[var(--ink)]">
            Copia de seguridad local (.json)
          </h3>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleExportBackup}
              className="btn btn-secondary btn-sm flex-1"
            >
              <Download className="w-4 h-4" aria-hidden="true" />
              <span>Exportar progreso</span>
            </button>

            <label className="btn btn-secondary btn-sm flex-1 cursor-pointer">
              <Upload className="w-4 h-4" aria-hidden="true" />
              <span>Importar progreso</span>
              <input
                type="file"
                accept=".json"
                onChange={handleImportBackup}
                className="sr-only"
              />
            </label>
          </div>
        </div>
      </div>
    </NativeDialog>
  );
};
