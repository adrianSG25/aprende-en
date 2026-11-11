import React, { useState, useRef, useEffect } from 'react';
import { GameProgress, MultiTurnChatScenario, ChatMessage, ChatStep } from '../types/streetGame';
import { WHATSAPP_SCENARIOS } from '../data/whatsappScenarios';
import { checkAnswer } from '../utils/answerChecker';
import {
  ArrowLeft,
  Send,
  CheckCheck,
  RotateCcw,
  Lightbulb,
  ChevronRight,
  MessageSquare,
  CheckCircle2,
  Coins
} from 'lucide-react';

interface StreetWhatsAppSimulatorProps {
  progress: GameProgress;
  onUpdateProgress: (updated: GameProgress) => void;
}

const AVATAR_TONES = [
  'bg-[#E6EFEA] text-[#0E6B47] border-[#B3DFC8]',
  'bg-[#EDF3FC] text-[#12397A] border-[#BFD0EC]',
  'bg-[#FEF8E7] text-[#9A5D07] border-[#EEDAA1]',
  'bg-[#ECEEE9] text-[#12151C] border-[#C2C7BD]'
];

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');
}

export const StreetWhatsAppSimulator: React.FC<StreetWhatsAppSimulatorProps> = ({
  progress,
  onUpdateProgress
}) => {
  const [selectedScenario, setSelectedScenario] = useState<MultiTurnChatScenario | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    messagesEndRef.current?.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth' });
  }, [messages, isTyping]);

  const handleOpenScenario = (scenario: MultiTurnChatScenario) => {
    setSelectedScenario(scenario);
    setCurrentStepIndex(0);
    setIsFinished(false);
    setShowHint(false);
    setInputText('');

    const firstStep = scenario.steps[0];
    setMessages([
      {
        id: 'msg-0',
        sender: 'contact',
        text: firstStep.contactSays,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!selectedScenario || !inputText.trim() || isTyping || isFinished) return;

    const currentStep: ChatStep = selectedScenario.steps[currentStepIndex];
    const userText = inputText.trim();
    setInputText('');
    setShowHint(false);

    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const isGoodReply = checkAnswer(userText, currentStep.acceptableReplies);

    const newMsgList: ChatMessage[] = [
      ...messages,
      {
        id: `msg-${Date.now()}`,
        sender: 'user',
        text: userText,
        timestamp: now,
        feedback: {
          isGood: isGoodReply,
          tip: currentStep.feedbackIfClose || `Respuesta natural: "${currentStep.sampleGoodReply}"`
        }
      }
    ];
    setMessages(newMsgList);

    if (isGoodReply) {
      onUpdateProgress({
        ...progress,
        xp: progress.xp + 15,
        quids: progress.quids + 1
      });
    }

    const nextIdx = currentStepIndex + 1;
    if (nextIdx < selectedScenario.steps.length) {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const nextStep = selectedScenario.steps[nextIdx];
        setMessages((prev) => [
          ...prev,
          {
            id: `msg-${Date.now()}`,
            sender: 'contact',
            text: nextStep.contactSays,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
        setCurrentStepIndex(nextIdx);
      }, 1100);
    } else {
      setTimeout(() => {
        setIsFinished(true);
        onUpdateProgress({
          ...progress,
          xp: progress.xp + 35,
          quids: progress.quids + 2
        });
      }, 750);
    }
  };

  if (!selectedScenario) {
    return (
      <div className="max-w-lg mx-auto space-y-4">
        {/* Cabecera */}
        <section className="card p-4 sm:p-5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-[var(--pine-soft)] border border-[var(--pine-border)] text-[var(--pine)] flex items-center justify-center shrink-0">
              <MessageSquare className="w-5 h-5" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <h2 className="font-display font-bold text-base sm:text-lg text-[var(--ink)] truncate">
                Simulador de WhatsApp UK
              </h2>
              <p className="text-xs text-[var(--ink-muted)] truncate">
                Chats cotidianos por turnos con corrección al instante
              </p>
            </div>
          </div>

          <span className="px-2.5 py-1 rounded-lg bg-[var(--pine-soft)] border border-[var(--pine-border)] text-[var(--pine)] text-xs font-semibold flex items-center gap-1 tabular-nums shrink-0">
            <Coins className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{progress.quids}</span>
          </span>
        </section>

        {/* Lista de chats estilo WhatsApp limpia sin marco falso grueso */}
        <section className="card overflow-hidden border-[var(--border-strong)]">
          <div className="bg-[#075E54] text-white px-4 py-3.5 flex items-center justify-between">
            <span className="font-display font-bold text-base tracking-tight">WhatsApp</span>
            <span className="text-xs text-emerald-100 font-medium tabular-nums">
              {WHATSAPP_SCENARIOS.length} chats activos
            </span>
          </div>

          <div className="divide-y divide-[var(--border)] bg-[var(--surface)]">
            {WHATSAPP_SCENARIOS.map((scen, idx) => (
              <button
                key={scen.id}
                type="button"
                onClick={() => handleOpenScenario(scen)}
                className="w-full text-left p-4 hover:bg-[var(--surface-2)]/70 flex items-center gap-3.5 transition-colors group"
              >
                <div
                  className={`w-11 h-11 rounded-full border flex items-center justify-center font-display font-bold text-sm shrink-0 ${
                    AVATAR_TONES[idx % AVATAR_TONES.length]
                  }`}
                >
                  {getInitials(scen.name)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline gap-2 mb-0.5">
                    <h3 className="font-semibold text-sm text-[var(--ink)] truncate">
                      {scen.name}
                    </h3>
                    <span className="text-[11px] text-[var(--ink-subtle)] font-mono tabular-nums shrink-0">
                      18:42
                    </span>
                  </div>
                  <p className="text-xs text-[var(--accent)] font-semibold truncate">
                    {scen.topicTitle}
                  </p>
                  <p className="text-xs text-[var(--ink-muted)] truncate mt-0.5">
                    {scen.steps[0].contactSays}
                  </p>
                </div>

                <ChevronRight
                  className="w-4 h-4 text-[var(--ink-subtle)] group-hover:text-[var(--pine)] transition-colors shrink-0"
                  aria-hidden="true"
                />
              </button>
            ))}
          </div>
        </section>
      </div>
    );
  }

  const currentStep = selectedScenario.steps[currentStepIndex];

  return (
    <div className="max-w-lg mx-auto">
      <div className="rounded-2xl overflow-hidden border border-[var(--border-strong)] bg-[#EFEAE2] flex flex-col h-[min(580px,calc(100dvh-215px))] min-h-[420px]">
        {/* Cabecera del chat */}
        <div className="bg-[#075E54] text-white px-3 py-2.5 flex items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <button
              type="button"
              onClick={() => setSelectedScenario(null)}
              className="min-w-[40px] min-h-[40px] -ml-1 rounded-xl text-white/90 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors shrink-0"
              aria-label="Volver a la lista de chats"
            >
              <ArrowLeft className="w-5 h-5" aria-hidden="true" />
            </button>

            <div className="w-9 h-9 rounded-full bg-white/15 border border-white/25 flex items-center justify-center font-display font-bold text-xs text-white shrink-0">
              {getInitials(selectedScenario.name)}
            </div>

            <div className="min-w-0">
              <h2 className="font-semibold text-sm text-white truncate">
                {selectedScenario.name}
              </h2>
              <p className="text-[11px] text-emerald-100 truncate">
                {isTyping ? 'escribiendo…' : `${selectedScenario.role} · en línea`}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => handleOpenScenario(selectedScenario)}
            className="min-w-[40px] min-h-[40px] rounded-xl text-white/85 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors shrink-0"
            aria-label="Reiniciar conversación"
          >
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        {/* Hilo de mensajes */}
        <div className="p-3.5 space-y-3 flex-1 overflow-y-auto overscroll-contain">
          <div className="text-center">
            <span className="text-[11px] bg-white/90 px-3 py-1 rounded-lg text-[var(--ink-muted)] font-medium inline-block">
              Londres · {selectedScenario.topicTitle}
            </span>
          </div>

          {messages.map((m) => {
            const isContact = m.sender === 'contact';
            return (
              <div
                key={m.id}
                className={`flex items-end ${isContact ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed border ${
                    isContact
                      ? 'bg-white text-[var(--ink)] border-black/5 rounded-bl-sm'
                      : 'bg-[#DCF8C6] text-[var(--ink)] border-emerald-900/10 rounded-br-sm'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{m.text}</p>
                  <div className="flex justify-end items-center gap-1 mt-1 text-[10px] text-[var(--ink-subtle)] tabular-nums">
                    <span>{m.timestamp}</span>
                    {!isContact && <CheckCheck className="w-3.5 h-3.5 text-sky-600" aria-hidden="true" />}
                  </div>

                  {m.feedback && (
                    <div className="mt-2 pt-2 border-t border-emerald-800/15 text-xs text-[var(--pine)] flex items-start gap-1.5 font-medium">
                      <Lightbulb className="w-3.5 h-3.5 shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{m.feedback.tip}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div
              className="inline-flex items-center gap-1.5 bg-white px-3.5 py-2.5 rounded-2xl rounded-bl-sm border border-black/5"
              aria-label="El contacto está escribiendo"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--ink-subtle)] typing-dot" />
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--ink-subtle)] typing-dot" />
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--ink-subtle)] typing-dot" />
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Objetivo y pista */}
        {!isFinished && currentStep && (
          <div className="bg-[var(--surface)] border-t border-[var(--border)] px-3.5 py-2.5 space-y-2 shrink-0">
            <div className="flex items-start justify-between gap-3 text-xs">
              <div className="min-w-0 space-y-0.5">
                <span className="font-semibold text-[var(--accent)] block">Tu turno</span>
                <p className="text-[var(--ink)] leading-snug">{currentStep.userGoalEs}</p>
              </div>

              {!showHint && (
                <button
                  type="button"
                  onClick={() => setShowHint(true)}
                  className="text-xs font-semibold text-[var(--brass)] hover:underline flex items-center gap-1 shrink-0 py-1"
                >
                  <Lightbulb className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Pista</span>
                </button>
              )}
            </div>

            {showHint && (
              <div className="px-3 py-2 rounded-lg bg-[var(--brass-soft)] border border-[var(--brass-border)] text-xs text-[var(--ink)]">
                {currentStep.hint}
              </div>
            )}
          </div>
        )}

        {/* Entrada de texto o resumen final */}
        {!isFinished ? (
          <form
            onSubmit={handleSendMessage}
            className="bg-[#F0F2F5] p-2.5 flex items-center gap-2 border-t border-[var(--border)] shrink-0"
          >
            <label htmlFor="whatsapp-message-input" className="sr-only">
              Mensaje en inglés
            </label>
            <input
              id="whatsapp-message-input"
              name="whatsappMessage"
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Escribe tu mensaje en inglés…"
              className="flex-1 px-4 py-2.5 bg-white rounded-full text-sm text-[var(--ink)] border border-[var(--border-strong)] focus:outline-none focus:border-[#075E54] min-h-[44px]"
              autoComplete="off"
              disabled={isTyping}
            />

            <button
              type="submit"
              disabled={!inputText.trim() || isTyping}
              aria-label="Enviar mensaje"
              className="w-11 h-11 rounded-full bg-[#075E54] hover:bg-[#064e46] disabled:opacity-45 text-white flex items-center justify-center transition-colors shrink-0"
            >
              <Send className="w-4 h-4" aria-hidden="true" />
            </button>
          </form>
        ) : (
          <div className="p-4 bg-[var(--pine-soft)] border-t border-[var(--pine-border)] text-center space-y-2.5 shrink-0">
            <div className="inline-flex items-center gap-1.5 font-bold text-sm text-[var(--pine)]">
              <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
              <span>Conversación completada (+35 XP y +2 Quids)</span>
            </div>
            <div className="flex gap-2 justify-center">
              <button
                type="button"
                onClick={() => handleOpenScenario(selectedScenario)}
                className="btn btn-secondary btn-sm"
              >
                Repetir chat
              </button>
              <button
                type="button"
                onClick={() => setSelectedScenario(null)}
                className="btn btn-pine btn-sm"
              >
                Volver a chats
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
