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
  RefreshCw
} from 'lucide-react';

interface SettingsModalProps {
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ onClose }) => {
  const [config, setConfig] = useState<AIConfig>(() => getAIConfig());
  const [saved, setSaved] = useState(false);
  const [availableModels, setAvailableModels] = useState<string[]>([]);
  const [loadingModels, setLoadingModels] = useState(false);
  const [detectMsg, setDetectMsg] = useState<string | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveAIConfig(config);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
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
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-xl w-full p-5 sm:p-6 space-y-5 max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <h3 className="text-base sm:text-lg font-extrabold text-slate-900 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-indigo-600" />
            Configuración IA, Móvil (PWA) & Datos
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* AI Config Form */}
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <h4 className="text-sm font-bold text-indigo-700">
              1. Conectar IA para Ejercicios Infinitos y Corrector de Writing
            </h4>
            <p className="text-xs text-slate-600 mt-0.5">
              Pega tu API Key (Groq `gsk_...`, Google Gemini `AIza...`, xAI Grok `xai-...` u OpenAI `sk-...`). Detecta automáticamente qué modelos tienes activos para evitar fallos.
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">
              API Key (se guarda únicamente en este navegador)
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="password"
                value={config.apiKey}
                onChange={(e) => setConfig({ ...config, apiKey: e.target.value, model: 'auto' })}
                placeholder="gsk_... / AIza... / xai-... / sk-..."
                className="flex-1 bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-indigo-600 min-h-[44px]"
              />
              <button
                type="button"
                onClick={handleDetectModels}
                disabled={loadingModels}
                className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl text-xs font-bold text-indigo-700 flex items-center justify-center gap-1.5 cursor-pointer shrink-0 min-h-[44px]"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loadingModels ? 'animate-spin' : ''}`} />
                {loadingModels ? 'Detectando...' : 'Detectar Modelos'}
              </button>
            </div>
          </div>

          {detectMsg && (
            <p className="text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2">
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
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-800 outline-none focus:border-indigo-600"
              >
                <option value="groq">Groq Cloud (gsk_...)</option>
                <option value="gemini">Google Gemini Studio (AIza...)</option>
                <option value="openai">OpenAI / xAI Grok / OpenRouter</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">
                Modelo (Auto-selección)
              </label>
              {availableModels.length > 0 ? (
                <select
                  value={config.model}
                  onChange={(e) => setConfig({ ...config, model: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-800 outline-none focus:border-indigo-600"
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
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-800 outline-none focus:border-indigo-600"
                />
              )}
            </div>
          </div>

          <button
            type="submit"
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-xs min-h-[44px]"
          >
            {saved ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                ¡Configuración guardada!
              </>
            ) : (
              'Guardar Clave IA'
            )}
          </button>
        </form>

        {/* Mobile PWA Info */}
        <div className="pt-3 border-t border-slate-200 space-y-2">
          <h4 className="text-sm font-bold text-emerald-800 flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-emerald-600" />
            2. Cómo instalarla como App en tu Móvil (PWA)
          </h4>
          <ul className="text-xs text-slate-600 space-y-1.5 bg-slate-50 p-3.5 rounded-xl border border-slate-200 leading-relaxed">
            <li>
              • <strong>En Android (Chrome):</strong> Abre la web, toca los 3 puntos arriba a la derecha y pulsa <strong>"Instalar aplicación" / "Añadir a pantalla de inicio"</strong>.
            </li>
            <li>
              • <strong>En iPhone (Safari):</strong> Abre la web, toca el botón <strong>Compartir</strong> abajo en el centro y selecciona <strong>"Añadir a la pantalla de inicio"</strong>.
            </li>
            <li>
              • Funcionará a pantalla completa como una app nativa con icono propio y offline.
            </li>
          </ul>
        </div>

        {/* Backup Export/Import */}
        <div className="pt-3 border-t border-slate-200 space-y-2">
          <h4 className="text-sm font-bold text-amber-800">
            3. Pasar progreso entre PC y Móvil
          </h4>
          <div className="flex flex-wrap gap-2.5">
            <button
              type="button"
              onClick={handleExportBackup}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 rounded-xl border border-slate-300 flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              Exportar Progreso y Fallos (.json)
            </button>

            <label className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 rounded-xl border border-slate-300 flex items-center gap-1.5 cursor-pointer">
              <Upload className="w-3.5 h-3.5" />
              Importar Progreso
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
