import React, { useState } from 'react';
import { AIConfig } from '../types';
import { getAIConfig, saveAIConfig } from '../services/aiService';
import {
  X,
  Cpu,
  Smartphone,
  CheckCircle2,
  Download,
  Upload
} from 'lucide-react';

interface SettingsModalProps {
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ onClose }) => {
  const [config, setConfig] = useState<AIConfig>(() => getAIConfig());
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveAIConfig(config);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
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
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-indigo-400" />
            Configuración IA Híbrida, Móvil (PWA) y Copia de Seguridad
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* AI Config Form */}
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <h4 className="text-sm font-bold text-indigo-300">
              1. Conectar IA para Ejercicios Infinitos y Corrector Profundo de Writing (Opcional)
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              La app incluye cientos de ejercicios y analizadores que funcionan 100% gratis sin claves. Si añades una API Key gratuita de Groq o Google Gemini, podrás generar tandas nuevas infinitas y correcciones de Writing línea por línea.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">
                Proveedor IA
              </label>
              <select
                value={config.provider}
                onChange={(e) => {
                  const prov = e.target.value as AIConfig['provider'];
                  const defaultModel =
                    prov === 'groq'
                      ? 'llama-3.3-70b-versatile'
                      : prov === 'gemini'
                      ? 'gemini-2.5-flash'
                      : 'gpt-4o-mini';
                  setConfig({ ...config, provider: prov, model: defaultModel });
                }}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white"
              >
                <option value="groq">Groq Cloud (Gratis y ultrarrápido)</option>
                <option value="gemini">Google Gemini Studio (Gratis)</option>
                <option value="openai">OpenAI Compatible</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">
                Modelo
              </label>
              <input
                type="text"
                value={config.model}
                onChange={(e) => setConfig({ ...config, model: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 mb-1">
              API Key (se guarda solo en tu navegador local)
            </label>
            <input
              type="password"
              value={config.apiKey}
              onChange={(e) => setConfig({ ...config, apiKey: e.target.value })}
              placeholder="gsk_... / AIza... / sk-..."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white outline-none focus:border-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center gap-2 cursor-pointer"
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
        <div className="pt-4 border-t border-slate-800 space-y-2">
          <h4 className="text-sm font-bold text-emerald-300 flex items-center gap-2">
            <Smartphone className="w-4 h-4" />
            2. Cómo instalarla como App en tu Móvil (PWA)
          </h4>
          <ul className="text-xs text-slate-300 space-y-1.5 bg-slate-950 p-3.5 rounded-xl border border-slate-800">
            <li>
              • <strong>En Android (Chrome):</strong> Abre la URL de Vercel/Netlify, toca los 3 puntos arriba a la derecha y pulsa <strong>"Instalar aplicación" / "Añadir a pantalla de inicio"</strong>.
            </li>
            <li>
              • <strong>En iPhone (Safari):</strong> Abre la URL, toca el botón <strong>Compartir</strong> abajo en el centro y selecciona <strong>"Añadir a la pantalla de inicio"</strong>.
            </li>
            <li>
              • Funcionará a pantalla completa como una app nativa e incluso sin conexión a internet.
            </li>
          </ul>
        </div>

        {/* Backup Export/Import */}
        <div className="pt-4 border-t border-slate-800 space-y-2.5">
          <h4 className="text-sm font-bold text-amber-300">
            3. Pasar progreso entre PC y Móvil
          </h4>
          <div className="flex flex-wrap gap-2.5">
            <button
              type="button"
              onClick={handleExportBackup}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white rounded-xl flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              Exportar Progreso y Fallos (.json)
            </button>

            <label className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white rounded-xl flex items-center gap-1.5 cursor-pointer">
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
