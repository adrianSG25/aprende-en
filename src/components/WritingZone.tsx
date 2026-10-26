import React, { useState, useMemo } from 'react';
import { WritingPrompt, Exercise } from '../types';
import { WRITING_PROMPTS, analyzeWritingLocally } from '../data/writingData';
import { evaluateWritingWithAI, AIWritingCorrectionResult } from '../services/aiService';
import { appendCustomAIExercises } from '../services/storageService';
import { ExerciseCard } from './ExerciseCard';
import {
  PenTool,
  CheckCircle2,
  Circle,
  Sparkles,
  Eye,
  AlertTriangle,
  Cpu,
  Save
} from 'lucide-react';

interface WritingZoneProps {
  onSaveWriting: (entry: {
    id: string;
    promptId: string;
    title: string;
    date: string;
    content: string;
    score?: string;
    feedback?: string;
  }) => void;
  onExerciseAttempt: (exercise: Exercise, isCorrect: boolean, forceAddToVault?: boolean) => void;
}

export const WritingZone: React.FC<WritingZoneProps> = ({
  onSaveWriting,
  onExerciseAttempt
}) => {
  const [selectedPromptId, setSelectedPromptId] = useState<string>(WRITING_PROMPTS[0].id);
  const [text, setText] = useState<string>('');
  const [showModel, setShowModel] = useState<boolean>(false);
  const [showLocalEval, setShowLocalEval] = useState<boolean>(false);
  const [savedNotice, setSavedNotice] = useState<boolean>(false);

  // AI Correction State
  const [aiLoading, setAiLoading] = useState<boolean>(false);
  const [aiResult, setAiResult] = useState<AIWritingCorrectionResult | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);

  const currentPrompt: WritingPrompt =
    WRITING_PROMPTS.find((p) => p.id === selectedPromptId) || WRITING_PROMPTS[0];

  const localEvaluation = useMemo(() => analyzeWritingLocally(text), [text]);

  const checklistStatus = useMemo(() => {
    return currentPrompt.requiredStructures.map((req) => {
      const matched = req.regexPatterns.some((pattern) => {
        try {
          return new RegExp(pattern, 'i').test(text);
        } catch {
          return false;
        }
      });
      return { ...req, matched };
    });
  }, [currentPrompt, text]);

  const handleSelectPrompt = (id: string) => {
    setSelectedPromptId(id);
    setShowModel(false);
    setShowLocalEval(false);
    setAiResult(null);
    setAiError(null);
    setSavedNotice(false);
  };

  const handleSave = () => {
    if (!text.trim()) return;
    onSaveWriting({
      id: `wr-${Date.now()}`,
      promptId: currentPrompt.id,
      title: currentPrompt.title,
      date: new Date().toLocaleDateString('es-ES'),
      content: text,
      score: `${localEvaluation.scoreOutOf100}/100 (${localEvaluation.estimatedLevel})`
    });
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  const handleEvaluateAI = async () => {
    if (!text.trim() || localEvaluation.wordCount < 10) {
      setAiError('Escribe al menos una o dos frases en inglés antes de pedir la corrección.');
      return;
    }
    setAiLoading(true);
    setAiError(null);
    try {
      const res = await evaluateWritingWithAI(text, currentPrompt.level, currentPrompt.title);
      setAiResult(res);
      if (res.generatedDrillExercises.length > 0) {
        appendCustomAIExercises(res.generatedDrillExercises);
      }
    } catch (err: unknown) {
      setAiError(err instanceof Error ? err.message : 'Error al conectar con la IA.');
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <PenTool className="w-5 h-5 text-rose-400" />
          Laboratorio de Escritura y Retos Gramaticales (A2+ → B2+)
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Practica integrando estructuras obligatorias en vivo, detecta trampas de hispanohablantes al instante y compara con modelos de examen.
        </p>
      </div>

      {/* Prompt Selector Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {WRITING_PROMPTS.map((p) => {
          const isSelected = p.id === currentPrompt.id;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => handleSelectPrompt(p.id)}
              className={`text-left p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                isSelected
                  ? 'bg-rose-950/40 border-rose-500 text-white shadow-lg shadow-rose-500/10'
                  : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-1.5">
                  <span className="text-xs font-extrabold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
                    Nivel {p.level}
                  </span>
                  <span className="text-[11px] text-amber-300 font-semibold">
                    {p.type}
                  </span>
                </div>
                <h3 className="font-bold text-sm text-white line-clamp-2">
                  {p.title}
                </h3>
              </div>
              <p className="text-[11px] text-slate-400">
                {p.minWords}–{p.maxWords} palabras
              </p>
            </button>
          );
        })}
      </div>

      {/* Main Writing Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Prompt + Editor */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
                {currentPrompt.type} • Nivel {currentPrompt.level}
              </span>
              <span className="text-xs text-slate-400">
                Objetivo: {currentPrompt.minWords} a {currentPrompt.maxWords} palabras
              </span>
            </div>

            <h3 className="text-lg font-extrabold text-white">
              {currentPrompt.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              {currentPrompt.situationEs}
            </p>
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs sm:text-sm text-indigo-200 font-medium">
              📋 <strong>Task:</strong> {currentPrompt.promptEn}
            </div>
          </div>

          {/* Textarea Editor */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-3">
                <span
                  className={`font-bold px-2.5 py-1 rounded-lg ${
                    localEvaluation.wordCount >= currentPrompt.minWords
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  Palabras: {localEvaluation.wordCount} / {currentPrompt.minWords}–{currentPrompt.maxWords}
                </span>
                <span className="text-slate-400">
                  Frases: {localEvaluation.sentenceCount}
                </span>
              </div>

              <button
                type="button"
                onClick={handleSave}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                {savedNotice ? '¡Guardado!' : 'Guardar borrador'}
              </button>
            </div>

            <textarea
              rows={10}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Escribe tu texto en inglés aquí... Fíjate en el panel derecho para ir cumpliendo los retos gramaticales en tiempo real."
              className="w-full bg-slate-950 border border-slate-700 focus:border-indigo-500 rounded-xl p-4 text-white text-base leading-relaxed outline-none"
              spellCheck={false}
            />

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setShowLocalEval(true)}
                className="px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-indigo-600/25 flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                Analizar Gramática y Nivel (Instantáneo)
              </button>

              <button
                type="button"
                onClick={handleEvaluateAI}
                disabled={aiLoading}
                className="px-5 py-3 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-purple-600/25 flex items-center gap-2 cursor-pointer"
              >
                <Cpu className="w-4 h-4" />
                {aiLoading ? 'Corrigiendo con IA...' : 'Corrección Profunda IA + Crear Ejercicios'}
              </button>

              <button
                type="button"
                onClick={() => setShowModel(!showModel)}
                className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs sm:text-sm rounded-xl flex items-center gap-2 cursor-pointer"
              >
                <Eye className="w-4 h-4" />
                {showModel ? 'Ocultar Respuesta Modelo' : 'Ver Respuesta Modelo Comentada'}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Live Required Structures Checklist */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 h-fit">
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-amber-300">
              🎯 Checklist Gramatical en Vivo
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Se marcan en verde automáticamente mientras escribes al detectar la estructura:
            </p>
          </div>

          <div className="space-y-3">
            {checklistStatus.map((item) => (
              <div
                key={item.id}
                className={`p-3.5 rounded-xl border transition-all ${
                  item.matched
                    ? 'bg-emerald-950/35 border-emerald-500/40 text-emerald-100'
                    : 'bg-slate-950/70 border-slate-800 text-slate-300'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  {item.matched ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-600 shrink-0 mt-0.5" />
                  )}
                  <div className="space-y-1">
                    <p className="text-xs sm:text-sm font-bold">{item.label}</p>
                    <p className="text-xs text-slate-400 font-mono">
                      Ej: {item.examples.join(' / ')}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Detected Bonus Structures */}
          {localEvaluation.detectedAdvancedStructures.length > 0 && (
            <div className="pt-3 border-t border-slate-800 space-y-2">
              <span className="text-xs font-bold uppercase text-indigo-300 block">
                ✨ Estructuras detectadas en tu texto:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {localEvaluation.detectedAdvancedStructures.map((st, i) => (
                  <span
                    key={i}
                    className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-200 border border-indigo-500/30"
                  >
                    ✓ {st}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Local Instant Evaluation Results */}
      {showLocalEval && (
        <div className="bg-slate-900 border border-indigo-500/40 rounded-2xl p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-lg font-bold text-white">
                Diagnóstico Gramatical y Léxico Instantáneo
              </h3>
              <p className="text-xs sm:text-sm text-slate-400">
                Escaneo automático de errores hispanos, variedad estructural y nivel de vocabulario.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-slate-950 px-4 py-2 rounded-xl border border-slate-800 text-center">
                <span className="text-[11px] text-slate-400 block">Nivel Estimado</span>
                <strong className="text-indigo-300 text-sm">{localEvaluation.estimatedLevel}</strong>
              </div>
              <div className="bg-slate-950 px-4 py-2 rounded-xl border border-slate-800 text-center">
                <span className="text-[11px] text-slate-400 block">Puntuación</span>
                <strong className="text-emerald-400 text-sm">{localEvaluation.scoreOutOf100} / 100</strong>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {localEvaluation.feedbackItems.map((fb, i) => (
              <div
                key={i}
                className={`p-4 rounded-xl border text-xs sm:text-sm ${
                  fb.type === 'error'
                    ? 'bg-rose-950/30 border-rose-500/40 text-rose-100'
                    : fb.type === 'upgrade'
                    ? 'bg-amber-950/30 border-amber-500/40 text-amber-100'
                    : 'bg-emerald-950/30 border-emerald-500/40 text-emerald-100'
                }`}
              >
                <div className="flex items-center gap-2 font-bold mb-1">
                  {fb.type === 'error' ? (
                    <AlertTriangle className="w-4 h-4 text-rose-400" />
                  ) : (
                    <Sparkles className="w-4 h-4 text-amber-400" />
                  )}
                  <span>
                    {fb.type === 'error'
                      ? `Error detectado: "${fb.snippet}"`
                      : fb.type === 'upgrade'
                      ? `Mejora de Nivel B2 para: "${fb.snippet}"`
                      : fb.snippet}
                  </span>
                </div>
                <p className="text-slate-200">{fb.messageEs}</p>
                <p className="text-indigo-300 font-semibold mt-1">💡 {fb.suggestionEn}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI Deep Evaluation Results */}
      {aiError && (
        <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/40 text-rose-200 text-sm">
          {aiError}
        </div>
      )}

      {aiResult && (
        <div className="bg-slate-900 border border-purple-500/40 rounded-2xl p-6 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Cpu className="w-5 h-5 text-purple-400" />
              Informe del Examinador IA
            </h3>
            <span className="px-3.5 py-1.5 rounded-xl bg-purple-500/20 text-purple-200 font-bold text-sm">
              Nota: {aiResult.scoreOutOf100}/100 ({aiResult.estimatedLevel})
            </span>
          </div>

          <p className="text-sm text-slate-200 leading-relaxed">{aiResult.generalFeedbackEs}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950 border border-emerald-500/30 rounded-xl p-4 space-y-2">
              <h4 className="text-xs font-bold uppercase text-emerald-400">
                ✅ Tu Texto Corregido
              </h4>
              <p className="text-sm text-slate-100 whitespace-pre-line leading-relaxed">
                {aiResult.correctedVersionEn}
              </p>
            </div>

            <div className="bg-slate-950 border border-amber-500/30 rounded-xl p-4 space-y-2">
              <h4 className="text-xs font-bold uppercase text-amber-300">
                🚀 Versión Elevada a Nivel B2 Advanced
              </h4>
              <p className="text-sm text-slate-100 whitespace-pre-line leading-relaxed">
                {aiResult.b2AdvancedUpgradeEn}
              </p>
            </div>
          </div>

          {aiResult.lineByLineCorrections.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase text-rose-300">
                Correcciones Línea por Línea:
              </h4>
              {aiResult.lineByLineCorrections.map((c, idx) => (
                <div
                  key={idx}
                  className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs sm:text-sm space-y-1"
                >
                  <p className="text-rose-300 line-through">❌ {c.original}</p>
                  <p className="text-emerald-300 font-bold">✅ {c.correction}</p>
                  <p className="text-slate-400 text-xs">{c.explanationEs}</p>
                </div>
              ))}
            </div>
          )}

          {aiResult.generatedDrillExercises.length > 0 && (
            <div className="space-y-3 pt-3 border-t border-slate-800">
              <h4 className="text-sm font-bold text-purple-300">
                🔥 Ejercicios generados a partir de los fallos de tu Writing:
              </h4>
              {aiResult.generatedDrillExercises.map((ex, i) => (
                <ExerciseCard
                  key={ex.id}
                  exercise={ex}
                  onAttempt={onExerciseAttempt}
                  indexLabel={`Fallo de Writing #${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Model Answer Comparison */}
      {showModel && (
        <div className="bg-slate-900 border border-emerald-500/30 rounded-2xl p-6 space-y-4">
          <h3 className="text-lg font-bold text-emerald-300">
            🏆 Respuesta Modelo de Examen (Nivel {currentPrompt.level})
          </h3>
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-slate-100 text-sm sm:text-base whitespace-pre-line leading-relaxed">
            {currentPrompt.modelAnswer}
          </div>
          <div className="space-y-1.5">
            <h4 className="text-xs font-bold uppercase text-amber-300">
              ¿Por qué este texto saca máxima nota?
            </h4>
            <ul className="space-y-1 text-xs sm:text-sm text-slate-300">
              {currentPrompt.modelAnalysisEs.map((note, i) => (
                <li key={i}>• {note}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
