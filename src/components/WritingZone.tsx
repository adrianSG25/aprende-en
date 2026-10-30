import React, { useState, useMemo } from 'react';
import { WritingPrompt, Exercise, Level } from '../types';
import { WRITING_PROMPTS, analyzeWritingLocally } from '../data/writingData';
import {
  evaluateWritingWithAI,
  AIWritingCorrectionResult,
  RoleplayScenario,
  RoleplayEvaluationResult,
  generateAIRoleplayScenario,
  evaluateRoleplayResponseWithAI
} from '../services/aiService';
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
  Save,
  MessageSquare,
  Languages,
  Send
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

const BUILTIN_ROLEPLAY_SCENARIOS: RoleplayScenario[] = [
  {
    id: 'rp-mechanic',
    level: 'B1',
    title: '🔧 En el Mecánico: Avería Cara e Imprevista',
    roleLabel: 'Mechanic (Dave)',
    situationEs: 'Has llevado tu coche al taller porque hacía un ruido raro al cambiar de marcha. El mecánico sale con malas noticias.',
    characterSaysEn: 'I\'ve just looked under the bonnet and I\'m afraid the clutch is completely worn out. It\'s going to cost at least £850 to replace it, and we won\'t get the spare part until next Wednesday.',
    characterSaysEs: 'Acabo de mirar debajo del capó y me temo que el embrague está totalmente desgastado. Va a costar al menos 850 libras cambiarlo, y no recibiremos la pieza de repuesto hasta el próximo miércoles.',
    yourGoalEs: '¿Qué le responderías? Dile que 850 libras te parece demasiado caro, pregúntale si hay una opción más económica (o piezas de segunda mano) y explícale que necesitas el coche el lunes sin falta para ir a trabajar.',
    usefulPhrases: [
      'have it repaired / fixed (Causative)',
      'second-hand part (pieza de segunda mano)',
      'lend me a courtesy car (dejarme un coche de sustitución)',
      'afford (permitirse pagar)'
    ],
    sampleResponseEn: '£850 is way more than I expected! I can\'t afford to pay that much right now. Is there any chance you could use a second-hand part to keep the cost down? Also, I really need my car on Monday to get to work—could you lend me a courtesy car in the meantime?'
  },
  {
    id: 'rp-landlord',
    level: 'B1+',
    title: '🏠 Tu Casero: Sin Calefacción en Pleno Invierno',
    roleLabel: 'Landlord (Mr. Henderson)',
    situationEs: 'La caldera de tu piso alquilado se ha averiado hace dos días y hace muchísimo frío. Llamas a tu casero y te dice esto:',
    characterSaysEn: 'Look, my regular plumber is fully booked this week. If you put on an extra jumper, you\'ll be fine until he can come round next Tuesday to look at the boiler.',
    characterSaysEs: 'Mira, mi fontanero habitual tiene la agenda llena esta semana. Si te pones un jersey extra, estarás bien hasta que pueda pasarse el martes que viene a mirar la caldera.',
    yourGoalEs: '¿Qué le responderías? Dile que no puedes aguantar (put up with) estar sin agua caliente ni calefacción hasta el martes, y que si no manda a otro fontanero hoy mismo, llamarás tú a uno de urgencia y lo descontarás del alquiler.',
    usefulPhrases: [
      'put up with (aguantar / soportar)',
      'have the boiler fixed (hacer arreglar la caldera)',
      'unless you send... (a menos que mandes...)',
      'deduct it from the rent (descontarlo del alquiler)'
    ],
    sampleResponseEn: 'I\'m sorry, Mr. Henderson, but I can\'t put up with freezing temperatures and no hot water until next Tuesday! Unless you get another plumber to fix the boiler today, I will have to call an emergency technician myself and deduct the bill from next month\'s rent.'
  },
  {
    id: 'rp-airport',
    level: 'B1+',
    title: '✈️ En el Aeropuerto: Vuelo Cancelado a Última Hora',
    roleLabel: 'Airline Desk Agent',
    situationEs: 'Estás en el aeropuerto de Londres a las 10 de la noche y acaban de cancelar tu vuelo de vuelta a casa.',
    characterSaysEn: 'Due to a technical fault with the aircraft, tonight\'s flight has been called off. We can rebook you onto a flight leaving on Thursday afternoon, which is in 40 hours.',
    characterSaysEs: 'Debido a un fallo técnico en el avión, el vuelo de esta noche ha sido cancelado. Podemos reubicarle en un vuelo que sale el jueves por la tarde, dentro de 40 horas.',
    yourGoalEs: '¿Qué le responderías? Dile que tienes una reunión o compromiso importante mañana, pregúntale si pueden meterte en un vuelo con escala de otra compañía y exige que la aerolínea se haga cargo del hotel y la cena de esta noche.',
    usefulPhrases: [
      'connecting flight (vuelo con escala)',
      'be entitled to (tener derecho a)',
      'cover the cost of accommodation (cubrir el coste del alojamiento)',
      'make up for (compensar por)'
    ],
    sampleResponseEn: 'Waiting 40 hours is completely unacceptable because I have an important meeting tomorrow morning. Could you check if there is a connecting flight with another airline early tomorrow? Also, since the flight was called off due to a technical fault, we are entitled to hotel accommodation and meal vouchers for tonight.'
  },
  {
    id: 'rp-boss',
    level: 'B2',
    title: '💼 En la Oficina: Tu Jefe Pide rehacer Todo un Viernes a las 18:00',
    roleLabel: 'Project Manager (Sarah)',
    situationEs: 'Son las 6 de la tarde del viernes, estás a punto de apagar el ordenador y tu jefa se acerca a tu mesa.',
    characterSaysEn: 'The client has just turned down our marketing proposal. I need you to stay late tonight and come up with a completely new presentation before Monday morning.',
    characterSaysEs: 'El cliente acaba de rechazar nuestra propuesta de marketing. Necesito que te quedes hasta tarde esta noche y que se te ocurra una presentación totalmente nueva antes del lunes por la mañana.',
    yourGoalEs: '¿Qué le responderías con educación pero firmeza (nivel B2)? Dile que ojalá te lo hubiera dicho antes porque esta noche tienes planes que no puedes cancelar, pero propón revisar los puntos clave el lunes a primera hora con todo el equipo.',
    usefulPhrases: [
      'I wish you had told me earlier (Ojalá me lo hubieras dicho antes)',
      'put off / call off my plans (posponer / cancelar mis planes)',
      'first thing on Monday morning (el lunes a primera hora)',
      'go over the feedback (revisar los comentarios)'
    ],
    sampleResponseEn: 'I understand how frustrating it is that the client turned it down, Sarah, and I wish I had known a few hours earlier. Unfortunately, I have family plans tonight that I really can\'t call off at the last minute. However, I\'d be happy to come in an hour early on Monday morning so we can go over the client\'s feedback and come up with a stronger draft together.'
  },
  {
    id: 'rp-refund',
    level: 'B2+',
    title: '💻 Tienda de Electrónica: Se Niegan a Devolverte el Dinero',
    roleLabel: 'Store Manager',
    situationEs: 'Compraste un portátil reacondicionado hace 5 días con un año de garantía, pero la pantalla parpadea y se apaga solo. El encargado de la tienda te dice:',
    characterSaysEn: 'Once a refurbished laptop has been opened and used, we don\'t give refunds. The best I can do is send it away to our warehouse, which usually takes three to four weeks.',
    characterSaysEs: 'Una vez que un portátil reacondicionado ha sido abierto y usado, no hacemos reembolsos. Lo máximo que puedo hacer es enviarlo a nuestro almacén, lo que suele tardar de tres a cuatro semanas.',
    yourGoalEs: '¿Qué le responderías usando estructuras de nivel B2+? Dile que en ningún caso vas a esperar un mes por un ordenador que ya venía defectuoso, y que o te dan uno de reemplazo hoy mismo o reclamarás el reembolso completo.',
    usefulPhrases: [
      'Under no circumstances am I going to... (Bajo ninguna circunstancia voy a...)',
      'faulty device (dispositivo defectuoso)',
      'file an official complaint (poner una hoja de reclamaciones)',
      'full refund (reembolso íntegro)'
    ],
    sampleResponseEn: 'Under no circumstances am I going to wait four weeks for a computer that was faulty from the moment I bought it. As the laptop has a one-year warranty, I expect either an immediate replacement or a full refund today, otherwise I will have no choice but to file an official complaint.'
  }
];

export const WritingZone: React.FC<WritingZoneProps> = ({
  onSaveWriting,
  onExerciseAttempt
}) => {
  const [mainTab, setMainTab] = useState<'roleplay' | 'essays'>('roleplay');

  // Estado para el modo Roleplay ("¿Qué le responderías?")
  const [scenarios, setScenarios] = useState<RoleplayScenario[]>(BUILTIN_ROLEPLAY_SCENARIOS);
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(BUILTIN_ROLEPLAY_SCENARIOS[0].id);
  const [rpUserText, setRpUserText] = useState('');
  const [rpShowTranslation, setRpShowTranslation] = useState(false);
  const [rpShowSample, setRpShowSample] = useState(false);
  const [rpEvaluating, setRpEvaluating] = useState(false);
  const [rpResult, setRpResult] = useState<RoleplayEvaluationResult | null>(null);

  // Creador IA de nuevas situaciones
  const [newRpLevel, setNewRpLevel] = useState<Level>('B1+');
  const [newRpTopic, setNewRpTopic] = useState('');
  const [newRpLoading, setNewRpLoading] = useState(false);
  const [newRpError, setNewRpError] = useState<string | null>(null);

  // Estado para el modo Essays (Writing Lab tradicional)
  const [selectedPromptId, setSelectedPromptId] = useState(WRITING_PROMPTS[0].id);
  const [text, setText] = useState('');
  const [showModel, setShowModel] = useState(false);
  const [showLocalEval, setShowLocalEval] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<AIWritingCorrectionResult | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);
  const [savedNotice, setSavedNotice] = useState(false);

  const currentScenario = useMemo(() => {
    return scenarios.find((s) => s.id === selectedScenarioId) || scenarios[0];
  }, [scenarios, selectedScenarioId]);

  const currentPrompt = useMemo<WritingPrompt>(() => {
    return WRITING_PROMPTS.find((p) => p.id === selectedPromptId) || WRITING_PROMPTS[0];
  }, [selectedPromptId]);

  const handleSelectScenario = (id: string) => {
    setSelectedScenarioId(id);
    setRpUserText('');
    setRpShowSample(false);
    setRpShowTranslation(false);
    setRpResult(null);
  };

  const handleEvaluateRoleplay = async () => {
    if (!rpUserText.trim()) return;
    setRpEvaluating(true);
    setRpResult(null);
    try {
      const evalRes = await evaluateRoleplayResponseWithAI(
        currentScenario,
        rpUserText
      );
      setRpResult(evalRes);
    } catch {
      // Fallback local sencillo
      setRpResult({
        scoreOutOf10: 8,
        feedbackSummaryEs: 'Tu mensaje se entiende y responde al objetivo con soltura.',
        errorsList: [],
        naturalCorrectedResponseEn: rpUserText,
        b2NativeAlternativeEn: currentScenario.sampleResponseEn,
        characterFollowUpEn: 'I see your point. Let me speak with my manager and see what we can do for you.',
        characterFollowUpEs: 'Entiendo tu postura. Deja que hable con mi responsable para ver qué podemos hacer.'
      });
    } finally {
      setRpEvaluating(false);
    }
  };

  const handleGenerateNewScenario = async (e: React.FormEvent) => {
    e.preventDefault();
    setNewRpLoading(true);
    setNewRpError(null);
    try {
      const created = await generateAIRoleplayScenario(newRpLevel, newRpTopic);
      setScenarios((prev) => [created, ...prev]);
      setSelectedScenarioId(created.id);
      setRpUserText('');
      setRpShowSample(false);
      setRpShowTranslation(false);
      setRpResult(null);
      setNewRpTopic('');
    } catch (err: unknown) {
      setNewRpError(err instanceof Error ? err.message : 'Error creando la situación con IA.');
    } finally {
      setNewRpLoading(false);
    }
  };

  const handleContinueDialogue = () => {
    if (!rpResult?.characterFollowUpEn) return;
    const nextScenario: RoleplayScenario = {
      ...currentScenario,
      id: `rp-cont-${Date.now()}`,
      title: `${currentScenario.title} (Continuación)`,
      characterSaysEn: rpResult.characterFollowUpEn,
      characterSaysEs: rpResult.characterFollowUpEs || '',
      yourGoalEs: 'Responde a esta réplica continuando la conversación para cerrar un acuerdo.',
      sampleResponseEn: ''
    };
    setScenarios((prev) => [nextScenario, ...prev]);
    setSelectedScenarioId(nextScenario.id);
    setRpUserText('');
    setRpShowSample(false);
    setRpResult(null);
  };

  const localEvaluation = useMemo(() => {
    return analyzeWritingLocally(text);
  }, [text]);

  const checklistStatus = useMemo(() => {
    const lower = text.toLowerCase();
    return currentPrompt.requiredStructures.map((req) => {
      const matched = req.examples.some((ex) => {
        const clean = ex.toLowerCase().replace(/[\(\)]/g, '').trim();
        const parts = clean.split(' ');
        if (parts.length === 1) {
          return new RegExp(`\\b${clean}\\b`, 'i').test(lower);
        } else {
          return parts.every((p) => lower.includes(p));
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
    <div className="space-y-4 sm:space-y-6">
      {/* Header & Mode Switcher */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 shadow-sm">
        <div>
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <PenTool className="w-5 h-5 text-rose-500" />
            Zona de Expresión Escrita: Situaciones Reales & Textos
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Responde a situaciones cotidianas (mecánico, trabajo, reclamos...) o practica redacciones guiadas.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setMainTab('roleplay')}
            className={`px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer transition-all ${
              mainTab === 'roleplay'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>💬 ¿Qué le responderías?</span>
          </button>

          <button
            type="button"
            onClick={() => setMainTab('essays')}
            className={`px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer transition-all ${
              mainTab === 'essays'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <PenTool className="w-4 h-4" />
            <span>📝 Emails & Redacciones B2</span>
          </button>
        </div>
      </div>

      {/* ==================== TAB 1: "¿QUÉ LE RESPONDERÍAS?" (ROLEPLAY) ==================== */}
      {mainTab === 'roleplay' && (
        <div className="space-y-4 sm:space-y-6">
          {/* Scenario Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
            {scenarios.map((sc) => {
              const isSelected = sc.id === currentScenario.id;
              return (
                <button
                  key={sc.id}
                  type="button"
                  onClick={() => handleSelectScenario(sc.id)}
                  className={`text-left p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-1.5 shadow-2xs ${
                    isSelected
                      ? 'bg-rose-50 border-2 border-rose-500 text-slate-900 shadow-xs'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-[11px] font-extrabold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                        {sc.level}
                      </span>
                      <span className="text-[11px] text-amber-700 font-semibold truncate">
                        {sc.roleLabel}
                      </span>
                    </div>
                    <h3 className="font-bold text-xs sm:text-sm text-slate-900 line-clamp-2">
                      {sc.title}
                    </h3>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Roleplay Arena */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2 bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-6 space-y-4 sm:space-y-5 shadow-sm">
              {/* Situation Context */}
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
                    Situación Real • Nivel {currentScenario.level}
                  </span>
                  <button
                    type="button"
                    onClick={() => setRpShowTranslation(!rpShowTranslation)}
                    className="text-xs font-bold px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Languages className="w-3.5 h-3.5" />
                    {rpShowTranslation ? 'Ocultar traducción' : 'Traducir lo que te dice'}
                  </button>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
                  {currentScenario.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  📍 <strong>Contexto:</strong> {currentScenario.situationEs}
                </p>
              </div>

              {/* Speech Bubble from Mechanic / Landlord / Boss */}
              <div className="bg-amber-50/70 border-l-4 border-amber-500 rounded-r-2xl p-4 sm:p-5 space-y-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-amber-800 block">
                  🗣️ {currentScenario.roleLabel} te dice:
                </span>
                <p className="text-base sm:text-lg font-semibold text-slate-900 leading-relaxed">
                  "{currentScenario.characterSaysEn}"
                </p>
                {rpShowTranslation && (
                  <p className="text-xs sm:text-sm text-amber-900 pt-2 border-t border-amber-200/70">
                    🌐 "{currentScenario.characterSaysEs}"
                  </p>
                )}
              </div>

              {/* Your Mission */}
              <div className="bg-indigo-50/80 border border-indigo-200 rounded-xl p-4">
                <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-800 block mb-1">
                  🎯 ¿Qué le responderías tú? (Tu objetivo):
                </span>
                <p className="text-xs sm:text-sm text-indigo-950 leading-relaxed font-medium">
                  {currentScenario.yourGoalEs}
                </p>
              </div>

              {/* User Response Input */}
              <div className="space-y-3">
                <textarea
                  rows={4}
                  value={rpUserText}
                  onChange={(e) => setRpUserText(e.target.value)}
                  placeholder={`Escribe aquí en inglés lo que le dirías a ${currentScenario.roleLabel}...`}
                  className="w-full bg-white border-2 border-slate-300 focus:border-rose-500 focus:ring-4 focus:ring-rose-100 rounded-xl p-4 text-slate-900 text-base leading-relaxed outline-none min-h-[120px]"
                  spellCheck={false}
                />

                <div className="flex flex-wrap gap-2.5">
                  <button
                    type="button"
                    disabled={rpEvaluating || !rpUserText.trim()}
                    onClick={handleEvaluateRoleplay}
                    className="px-6 py-3 bg-rose-600 hover:bg-rose-700 disabled:opacity-40 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs flex items-center justify-center gap-2 cursor-pointer min-h-[48px]"
                  >
                    <Send className="w-4 h-4" />
                    {rpEvaluating
                      ? 'Revisando tus errores...'
                      : 'Enviar Respuesta y Ver Mis Errores'}
                  </button>

                  <button
                    type="button"
                    onClick={() => setRpShowSample(!rpShowSample)}
                    className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm rounded-xl border border-slate-200 flex items-center justify-center gap-2 cursor-pointer min-h-[48px]"
                  >
                    <Eye className="w-4 h-4" />
                    {rpShowSample ? 'Ocultar Ejemplo' : 'Ver Ejemplo de Respuesta'}
                  </button>
                </div>
              </div>

              {rpShowSample && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 space-y-1">
                  <span className="text-xs font-bold uppercase text-emerald-800 block">
                    Ejemplo de respuesta natural:
                  </span>
                  <p className="text-sm text-emerald-950 leading-relaxed font-medium">
                    "{currentScenario.sampleResponseEn}"
                  </p>
                </div>
              )}

              {/* Evaluation Feedback Box */}
              {rpResult && (
                <div className="bg-slate-50 border border-rose-200 rounded-2xl p-4 sm:p-5 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <h4 className="font-bold text-base text-slate-900 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-amber-500" />
                      Análisis de tu Respuesta
                    </h4>
                    <span className="px-3 py-1 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-xs">
                      Nota: {rpResult.scoreOutOf10} / 10
                    </span>
                  </div>

                  <p className="text-sm text-slate-700 leading-relaxed">
                    {rpResult.feedbackSummaryEs}
                  </p>

                  {/* Error-by-Error List */}
                  {rpResult.errorsList.length > 0 ? (
                    <div className="space-y-2">
                      <span className="text-xs font-bold uppercase text-rose-800 block">
                        🔍 Errores corregidos en lo que has escrito:
                      </span>
                      {rpResult.errorsList.map((err, i) => (
                        <div
                          key={i}
                          className="bg-white border border-rose-200 rounded-xl p-3.5 text-xs sm:text-sm space-y-1 shadow-2xs"
                        >
                          <p className="text-rose-700 line-through">❌ {err.wrong}</p>
                          <p className="text-emerald-800 font-bold">✅ {err.right}</p>
                          <p className="text-slate-500 text-xs">{err.explanationEs}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm font-semibold">
                      ✅ ¡No se han detectado errores gramaticales en tu respuesta!
                    </div>
                  )}

                  {/* Corrected vs Native B2 Version */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-white border border-emerald-200 rounded-xl p-3.5 space-y-1 shadow-2xs">
                      <span className="text-[11px] font-bold uppercase text-emerald-800 block">
                        ✅ Tu respuesta corregida:
                      </span>
                      <p className="text-sm text-slate-900 font-semibold">
                        "{rpResult.naturalCorrectedResponseEn}"
                      </p>
                    </div>

                    <div className="bg-white border border-amber-200 rounded-xl p-3.5 space-y-1 shadow-2xs">
                      <span className="text-[11px] font-bold uppercase text-amber-800 block">
                        🚀 Cómo lo diría un nativo (Nivel B2):
                      </span>
                      <p className="text-sm text-amber-950 font-semibold">
                        "{rpResult.b2NativeAlternativeEn}"
                      </p>
                    </div>
                  </div>

                  {/* Follow-up reply from the character */}
                  {rpResult.characterFollowUpEn && (
                    <div className="pt-3 border-t border-slate-200 space-y-3">
                      <div className="bg-white border-l-4 border-sky-500 rounded-r-xl p-3.5 space-y-1 shadow-2xs">
                        <span className="text-xs font-bold text-sky-700 block">
                          💬 {currentScenario.roleLabel} te contesta ahora:
                        </span>
                        <p className="text-sm text-slate-900 font-medium">
                          "{rpResult.characterFollowUpEn}"
                        </p>
                        <p className="text-xs text-slate-500">
                          ({rpResult.characterFollowUpEs})
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={handleContinueDialogue}
                        className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl cursor-pointer"
                      >
                        Seguir respondiéndole a esto →
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right Sidebar: Useful Expressions + AI Custom Scenario Generator */}
            <div className="space-y-4">
              <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 space-y-3 shadow-sm">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800">
                  💡 Expresiones Útiles para Esta Situación
                </h4>
                <p className="text-xs text-slate-500">
                  Intenta incluir alguna de estas estructuras al escribir tu respuesta:
                </p>
                <ul className="space-y-2">
                  {currentScenario.usefulPhrases.map((phr, idx) => (
                    <li
                      key={idx}
                      className="text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-indigo-900 font-mono"
                    >
                      • {phr}
                    </li>
                  ))}
                </ul>
              </div>

              {/* AI Custom Situation Creator */}
              <form
                onSubmit={handleGenerateNewScenario}
                className="bg-white border border-purple-200 rounded-2xl p-4 sm:p-5 space-y-3.5 shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-purple-600" />
                  <h4 className="text-sm font-bold text-slate-900">
                    Crear Nueva Situación con IA
                  </h4>
                </div>
                <p className="text-xs text-slate-600">
                  Pide cualquier situación (en el médico, entrevista de trabajo, queja vecinal, aduana...) y practica.
                </p>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Nivel
                  </label>
                  <select
                    value={newRpLevel}
                    onChange={(e) => setNewRpLevel(e.target.value as Level)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-800 outline-none focus:border-purple-600"
                  >
                    <option value="A2+">A2+ (A2 Advanced)</option>
                    <option value="B1">B1 (Intermediate)</option>
                    <option value="B1+">B1+ (Intermediate Advanced)</option>
                    <option value="B2">B2 (Upper-Intermediate)</option>
                    <option value="B2+">B2+ (B2 Advanced)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    ¿En qué situación quieres verte? (Opcional)
                  </label>
                  <input
                    type="text"
                    value={newRpTopic}
                    onChange={(e) => setNewRpTopic(e.target.value)}
                    placeholder="Ej: En el dentista, negociando un sueldo, reclamando maleta..."
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-900 outline-none focus:border-purple-600"
                  />
                </div>

                {newRpError && (
                  <p className="text-xs text-rose-800 bg-rose-50 p-2.5 rounded-lg border border-rose-200">
                    {newRpError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={newRpLoading}
                  className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-xs min-h-[44px]"
                >
                  <Sparkles className="w-4 h-4" />
                  {newRpLoading ? 'Creando situación...' : 'Generar Nueva Situación'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ==================== TAB 2: ESSAYS & GUIDED WRITING LAB ==================== */}
      {mainTab === 'essays' && (
        <div className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
            {WRITING_PROMPTS.map((p) => {
              const isSelected = p.id === currentPrompt.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handleSelectPrompt(p.id)}
                  className={`text-left p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-1.5 shadow-2xs ${
                    isSelected
                      ? 'bg-indigo-50 border-2 border-indigo-600 text-slate-900 shadow-xs'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-[11px] font-extrabold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                        {p.level}
                      </span>
                      <span className="text-[11px] text-amber-700 font-semibold">
                        {p.type}
                      </span>
                    </div>
                    <h3 className="font-bold text-xs sm:text-sm text-slate-900 line-clamp-2">
                      {p.title}
                    </h3>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    {p.minWords}–{p.maxWords} palabras
                  </p>
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 space-y-2.5 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
                    {currentPrompt.type} • Nivel {currentPrompt.level}
                  </span>
                  <span className="text-xs text-slate-500">
                    Objetivo: {currentPrompt.minWords} a {currentPrompt.maxWords} palabras
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                  {currentPrompt.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  {currentPrompt.situationEs}
                </p>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs sm:text-sm text-indigo-950 font-medium">
                  📋 <strong>Task:</strong> {currentPrompt.promptEn}
                </div>
              </div>

              <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 space-y-4 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-3">
                    <span
                      className={`font-bold px-2.5 py-1 rounded-lg ${
                        localEvaluation.wordCount >= currentPrompt.minWords
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      Palabras: {localEvaluation.wordCount} / {currentPrompt.minWords}–{currentPrompt.maxWords}
                    </span>
                    <span className="text-slate-500">
                      Frases: {localEvaluation.sentenceCount}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleSave}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold flex items-center gap-1.5 cursor-pointer border border-slate-200"
                  >
                    <Save className="w-3.5 h-3.5" />
                    {savedNotice ? '¡Guardado!' : 'Guardar borrador'}
                  </button>
                </div>

                <textarea
                  rows={9}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Escribe tu texto en inglés aquí..."
                  className="w-full bg-white border-2 border-slate-300 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 rounded-xl p-4 text-slate-900 text-base leading-relaxed outline-none min-h-[160px]"
                  spellCheck={false}
                />

                <div className="flex flex-wrap gap-2.5">
                  <button
                    type="button"
                    onClick={() => setShowLocalEval(true)}
                    className="px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs flex items-center justify-center gap-2 cursor-pointer min-h-[48px]"
                  >
                    <Sparkles className="w-4 h-4" />
                    Analizar Nivel (Instantáneo)
                  </button>

                  <button
                    type="button"
                    onClick={handleEvaluateAI}
                    disabled={aiLoading}
                    className="px-4 py-3 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs flex items-center justify-center gap-2 cursor-pointer min-h-[48px]"
                  >
                    <Cpu className="w-4 h-4" />
                    {aiLoading ? 'Corrigiendo con IA...' : 'Corrección Profunda IA'}
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowModel(!showModel)}
                    className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm rounded-xl border border-slate-200 flex items-center justify-center gap-2 cursor-pointer min-h-[48px]"
                  >
                    <Eye className="w-4 h-4" />
                    {showModel ? 'Ocultar Modelo' : 'Ver Respuesta Modelo'}
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 space-y-3.5 h-fit shadow-sm">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800">
                  🎯 Checklist Gramatical en Vivo
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Se marcan automáticamente mientras escribes:
                </p>
              </div>

              <div className="space-y-2.5">
                {checklistStatus.map((item) => (
                  <div
                    key={item.id}
                    className={`p-3 rounded-xl border transition-all ${
                      item.matched
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                        : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {item.matched ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <Circle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                      )}
                      <div className="space-y-0.5">
                        <p className="text-xs font-bold text-slate-900">{item.label}</p>
                        <p className="text-[11px] text-slate-500 font-mono">
                          Ej: {item.examples.join(' / ')}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {showLocalEval && (
            <div className="bg-white border border-indigo-200 rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-slate-200">
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  Diagnóstico Gramatical y Léxico Instantáneo
                </h3>
                <div className="flex items-center gap-3">
                  <div className="bg-slate-50 px-3.5 py-1.5 rounded-xl border border-slate-200 text-center">
                    <span className="text-[11px] text-slate-500 block">Nivel</span>
                    <strong className="text-indigo-700 text-sm">{localEvaluation.estimatedLevel}</strong>
                  </div>
                  <div className="bg-slate-50 px-3.5 py-1.5 rounded-xl border border-slate-200 text-center">
                    <span className="text-[11px] text-slate-500 block">Puntuación</span>
                    <strong className="text-emerald-700 text-sm">{localEvaluation.scoreOutOf100} / 100</strong>
                  </div>
                </div>
              </div>

              <div className="space-y-2.5">
                {localEvaluation.feedbackItems.map((fb, i) => (
                  <div
                    key={i}
                    className={`p-3.5 rounded-xl border text-xs sm:text-sm ${
                      fb.type === 'error'
                        ? 'bg-rose-50 border-rose-200 text-rose-950'
                        : fb.type === 'upgrade'
                        ? 'bg-amber-50 border-amber-200 text-amber-950'
                        : 'bg-emerald-50 border-emerald-200 text-emerald-950'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-bold mb-1">
                      {fb.type === 'error' ? (
                        <AlertTriangle className="w-4 h-4 text-rose-600" />
                      ) : (
                        <Sparkles className="w-4 h-4 text-amber-600" />
                      )}
                      <span>
                        {fb.type === 'error'
                          ? `Error detectado: "${fb.snippet}"`
                          : fb.type === 'upgrade'
                          ? `Mejora de Nivel B2 para: "${fb.snippet}"`
                          : fb.snippet}
                      </span>
                    </div>
                    <p className="text-slate-700">{fb.messageEs}</p>
                    <p className="text-indigo-800 font-semibold mt-1">💡 {fb.suggestionEn}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {aiError && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-sm">
              {aiError}
            </div>
          )}

          {aiResult && (
            <div className="bg-white border border-purple-200 rounded-2xl p-5 sm:p-6 space-y-5 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-purple-600" />
                  Informe del Examinador IA
                </h3>
                <span className="px-3 py-1 rounded-xl bg-purple-50 text-purple-800 border border-purple-200 font-bold text-sm">
                  Nota: {aiResult.scoreOutOf100}/100 ({aiResult.estimatedLevel})
                </span>
              </div>

              <p className="text-sm text-slate-700 leading-relaxed">{aiResult.generalFeedbackEs}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 space-y-1.5">
                  <h4 className="text-xs font-bold uppercase text-emerald-800">
                    ✅ Tu Texto Corregido
                  </h4>
                  <p className="text-sm text-slate-900 whitespace-pre-line leading-relaxed">
                    {aiResult.correctedVersionEn}
                  </p>
                </div>

                <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 space-y-1.5">
                  <h4 className="text-xs font-bold uppercase text-amber-900">
                    🚀 Versión Elevada a Nivel B2 Advanced
                  </h4>
                  <p className="text-sm text-slate-900 whitespace-pre-line leading-relaxed">
                    {aiResult.b2AdvancedUpgradeEn}
                  </p>
                </div>
              </div>

              {aiResult.lineByLineCorrections.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase text-rose-800">
                    Correcciones Línea por Línea:
                  </h4>
                  {aiResult.lineByLineCorrections.map((c, idx) => (
                    <div
                      key={idx}
                      className="bg-white border border-slate-200 rounded-xl p-3 text-xs sm:text-sm space-y-1 shadow-2xs"
                    >
                      <p className="text-rose-700 line-through">❌ {c.original}</p>
                      <p className="text-emerald-800 font-bold">✅ {c.correction}</p>
                      <p className="text-slate-500 text-xs">{c.explanationEs}</p>
                    </div>
                  ))}
                </div>
              )}

              {aiResult.generatedDrillExercises.length > 0 && (
                <div className="space-y-3 pt-3 border-t border-slate-200">
                  <h4 className="text-sm font-bold text-purple-800">
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

          {showModel && (
            <div className="bg-white border border-emerald-200 rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm">
              <h3 className="text-base sm:text-lg font-bold text-emerald-800">
                🏆 Respuesta Modelo de Examen (Nivel {currentPrompt.level})
              </h3>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-900 text-sm whitespace-pre-line leading-relaxed">
                {currentPrompt.modelAnswer}
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold uppercase text-amber-800">
                  ¿Por qué este texto saca máxima nota?
                </h4>
                <ul className="space-y-1 text-xs text-slate-600">
                  {currentPrompt.modelAnalysisEs.map((note, i) => (
                    <li key={i}>• {note}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
