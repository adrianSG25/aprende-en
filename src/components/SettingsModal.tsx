import React, { useState } from 'react';
import { AIConfig } from '../types';
import {
  getAIConfig,
  saveAIConfig,
  fetchAvailableModelsForKey
} from '../services/aiService';
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
  ClipboardPaste
} from 'lucide-react';

interface SettingsModalProps {
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ onClose }) => {
  const [config, setConfig] = useState<AIConfig>(() => getAIConfig());
  const [saved, setSaved] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const [availableModels, setAvailableModels] = useState<string[]>([]);
  const [loadingModels, setLoadingModels] = useState(false);
  const [detectMsg, setDetectMsg] = useState<string | null>(null);

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
      // Ignorar si el navegador no tiene permiso de portapapeles
    }
  };

  const handleDetectModels = async () => {
    if (!config.apiKey.trim()) {
      setDetectMsg('Pega primero tu API Key abajo para consultar los modelos disponibles.');
      return;
    }
    setLoadingModels(true);
    setDetectMsg(null);
    try {
      const models = await fetchAvailableModelsForKey(config);
      setAvailableModels(models);
      if (models.length > 0) {
        const updated = { ...config, model: models[0] };
        setConfig(updated);
        saveAIConfig(updated);
        setDetectMsg(`✅ Se han detectado ${models.length} modelos activos en tu cuenta. Seleccionado: ${models[0]}`);
      } else {
        setDetectMsg('⚠️ No se pudieron listar los modelos. Se usará detección automática.');
      }
    } catch {
      setDetectMsg('⚠️ Error al consultar modelos. Revisa tu API Key.');
    } finally {
      setLoadingModels(false);
    }
  };

  const handleExportBackup = () => {
    const data = {
      stats: localStorage.getItem('engdrill_user_stats_v1'),
      mistakes: localStorage.getItem('engdrill_mistake_vault_v1'),
      customEx: localStorage.getItem('engdrill_custom_exercises_v1')
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `aprende_en_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
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
        window.location.reload();
      } catch {
        alert('Archivo de copia de seguridad no válido.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overscroll-contain">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-xl w-full p-4 sm:p-6 space-y-4 sm:space-y-5 max-h-[92vh] overflow-y-auto shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                Ajustes de IA y Móvil
              </h3>
              <p className="text-[11px] text-slate-500">Groq, Gemini, OpenAI y modo PWA</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 flex items-center justify-center cursor-pointer transition-colors"
            aria-label="Cerrar ajustes"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* AI Config Form */}
        <form onSubmit={handleSave} className="space-y-4">
          <div className="bg-indigo-50/70 border border-indigo-200 rounded-2xl p-3.5 space-y-1">
            <h4 className="text-xs sm:text-sm font-bold text-indigo-900 flex items-center gap-1.5">
              <span>⚡ Conectar API de IA</span>
            </h4>
            <p className="text-[11px] sm:text-xs text-indigo-950/80 leading-relaxed">
              Pega tu clave gratuita de Groq (<code className="font-mono bg-white px-1 py-0.5 rounded border border-indigo-200">gsk_...</code>), Google Gemini (<code className="font-mono bg-white px-1 py-0.5 rounded border border-indigo-200">AIza...</code>) u OpenAI (<code className="font-mono bg-white px-1 py-0.5 rounded border border-indigo-200">sk-...</code>). Solo se guarda en tu propio dispositivo.
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-slate-700">
                API Key
              </label>
              {navigator.clipboard && (
                <button
                  type="button"
                  onClick={handlePasteFromClipboard}
                  className="text-[11px] text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1 cursor-pointer"
                >
                  <ClipboardPaste className="w-3.5 h-3.5" />
                  Pegar del portapapeles
                </button>
              )}
            </div>

            <div className="relative">
              <input
                type={showKey ? 'text' : 'password'}
                value={config.apiKey}
                onChange={(e) => setConfig({ ...config, apiKey: e.target.value, model: 'auto' })}
                placeholder="Pega aquí: gsk_... / AIza... / sk-..."
                className="w-full bg-white border-2 border-slate-300 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 rounded-xl pl-3.5 pr-10 py-3 text-sm text-slate-900 outline-none min-h-[48px]"
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                title={showKey ? 'Ocultar clave' : 'Mostrar clave'}
              >
                {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <button
              type="button"
              onClick={handleDetectModels}
              disabled={loadingModels || !config.apiKey.trim()}
              className="flex-1 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 disabled:opacity-50 border border-slate-300 rounded-xl text-xs font-bold text-indigo-700 flex items-center justify-center gap-1.5 cursor-pointer min-h-[44px]"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loadingModels ? 'animate-spin' : ''}`} />
              <span>{loadingModels ? 'Detectando modelos...' : 'Detectar modelos automáticamente'}</span>
            </button>
          </div>

          {detectMsg && (
            <p className="text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-xl px-3.5 py-2">
              {detectMsg}
            </p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">
                Proveedor IA
              </label>
              <select
                value={config.provider}
                onChange={(e) => {
                  const prov = e.target.value as AIConfig['provider'];
                  setConfig({ ...config, provider: prov, model: 'auto' });
                }}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-indigo-600 min-h-[44px]"
              >
                <option value="groq">Groq Cloud (gsk_...)</option>
                <option value="gemini">Google Gemini Studio (AIza...)</option>
                <option value="openai">OpenAI / xAI Grok / OpenRouter</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">
                Modelo
              </label>
              {availableModels.length > 0 ? (
                <select
                  value={config.model}
                  onChange={(e) => setConfig({ ...config, model: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-indigo-600 min-h-[44px]"
                >
                  <option value="auto">✨ Automático (el mejor disponible)</option>
                  {availableModels.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  value={config.model}
                  onChange={(e) => setConfig({ ...config, model: e.target.value })}
                  placeholder="auto"
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-indigo-600 min-h-[44px]"
                />
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-xs min-h-[48px]"
          >
            {saved ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-emerald-300" />
                <span>¡Clave IA guardada correctamente!</span>
              </>
            ) : (
              <span>Guardar Configuración IA</span>
            )}
          </button>
        </form>

        {/* Mobile PWA Info */}
        <div className="pt-3 border-t border-slate-200 space-y-2">
          <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-emerald-600" />
            <span>Cómo instalarla como App en tu Móvil</span>
          </h4>
          <ul className="text-xs text-slate-600 space-y-1.5 bg-slate-50 p-3.5 rounded-xl border border-slate-200 leading-relaxed">
            <li>
              • <strong>Android (Chrome):</strong> Menú (3 puntos) arriba a la derecha → <strong>"Instalar aplicación"</strong>.
            </li>
            <li>
              • <strong>iPhone (Safari):</strong> Botón <strong>Compartir</strong> abajo → <strong>"Añadir a pantalla de inicio"</strong>.
            </li>
          </ul>
        </div>

        {/* Backup Export/Import */}
        <div className="pt-3 border-t border-slate-200 space-y-2">
          <h4 className="text-xs sm:text-sm font-bold text-slate-900">
            Copias de Seguridad (Sincronizar PC y Móvil)
          </h4>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleExportBackup}
              className="flex-1 px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 rounded-xl border border-slate-300 flex items-center justify-center gap-1.5 cursor-pointer min-h-[40px]"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Exportar (.json)</span>
            </button>

            <label className="flex-1 px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 rounded-xl border border-slate-300 flex items-center justify-center gap-1.5 cursor-pointer min-h-[40px]">
              <Upload className="w-3.5 h-3.5" />
              <span>Importar</span>
              <input
                type="file"
                accept=".json"
                onChange={handleImportBackup}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
