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
  ChevronRight
} from 'lucide-react';

interface StreetWhatsAppSimulatorProps {
  progress: GameProgress;
  onUpdateProgress: (updated: GameProgress) => void;
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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleOpenScenario = (scenario: MultiTurnChatScenario) => {
    setSelectedScenario(scenario);
    setCurrentStepIndex(0);
    setIsFinished(false);
    setShowHint(false);
    setInputText('');

    // Load initial message from contact
    const firstStep = scenario.steps[0];
    setMessages([
      {
        id: `msg-0`,
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

    // Validate user reply with smart matching
    const isGoodReply = checkAnswer(userText, currentStep.acceptableReplies);

    // Add User Message to thread
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

    // Reward XP
    if (isGoodReply) {
      const updated: GameProgress = {
        ...progress,
        xp: progress.xp + 15,
        quids: progress.quids + 1
      };
      onUpdateProgress(updated);
    }

    // Advance to next turn or finish
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
      }, 1200);
    } else {
      // Conversation completed
      setTimeout(() => {
        setIsFinished(true);
        const updated: GameProgress = {
          ...progress,
          xp: progress.xp + 35,
          quids: progress.quids + 2
        };
        onUpdateProgress(updated);
      }, 800);
    }
  };

  // If no scenario selected, show the Contact List
  if (!selectedScenario) {
    return (
      <div className="max-w-md mx-auto space-y-4 animate-in fade-in duration-200">
        {/* Header */}
        <div className="bg-white border border-slate-200 rounded-3xl p-4 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-300 flex items-center justify-center text-xl">
              💬
            </div>
            <div>
              <h2 className="font-extrabold text-slate-900 text-sm">
                Tus Chats de WhatsApp en UK
              </h2>
              <p className="text-[11px] text-slate-500">
                Elige un contacto y mantén una conversación real
              </p>
            </div>
          </div>
          <span className="text-xs font-black px-2.5 py-1 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
            {progress.quids} Quids 💷
          </span>
        </div>

        {/* WhatsApp Shell Container */}
        <div className="bg-slate-900 rounded-3xl p-2.5 shadow-xl border-4 border-slate-800">
          <div className="bg-white rounded-2xl overflow-hidden min-h-[480px]">
            {/* Top WhatsApp App Bar */}
            <div className="bg-[#075e54] text-white p-3.5 flex items-center justify-between shadow-xs">
              <span className="font-extrabold text-base tracking-wide">WhatsApp</span>
              <span className="text-xs text-emerald-200 font-bold">4 conversaciones</span>
            </div>

            {/* Chats List */}
            <div className="divide-y divide-slate-100">
              {WHATSAPP_SCENARIOS.map((scen) => (
                <button
                  key={scen.id}
                  type="button"
                  onClick={() => handleOpenScenario(scen)}
                  className="w-full text-left p-3.5 hover:bg-slate-50 flex items-center gap-3 transition-colors cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-2xl shrink-0 group-hover:scale-105 transition-transform">
                    {scen.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-0.5">
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                        {scen.name}
                      </h4>
                      <span className="text-[10px] text-slate-400">18:42</span>
                    </div>
                    <p className="text-xs text-indigo-700 font-semibold truncate">
                      {scen.topicTitle}
                    </p>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">
                      {scen.steps[0].contactSays}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-600 transition-colors shrink-0" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentStep = selectedScenario.steps[currentStepIndex];

  return (
    <div className="max-w-md mx-auto space-y-3 animate-in fade-in duration-200">
      {/* Device Wrapper */}
      <div className="bg-slate-900 rounded-3xl p-2 sm:p-2.5 shadow-2xl border-4 border-slate-800">
        <div className="bg-[#efeae2] rounded-2xl overflow-hidden flex flex-col h-[560px]">
          {/* Header */}
          <div className="bg-[#075e54] text-white p-2.5 sm:p-3 flex items-center justify-between shadow-xs shrink-0">
            <div className="flex items-center gap-2 min-w-0">
              <button
                type="button"
                onClick={() => setSelectedScenario(null)}
                className="p-1 -ml-1 text-white/90 hover:text-white cursor-pointer"
                title="Volver a los chats"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>

              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-xl shrink-0">
                {selectedScenario.avatar}
              </div>

              <div className="min-w-0">
                <h4 className="font-bold text-xs sm:text-sm text-white truncate">
                  {selectedScenario.name}
                </h4>
                <p className="text-[10px] text-emerald-200 truncate">
                  {isTyping ? 'escribiendo...' : `${selectedScenario.role} • en línea`}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleOpenScenario(selectedScenario)}
              className="text-white/80 hover:text-white p-1 text-xs cursor-pointer"
              title="Reiniciar conversación"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Feed */}
          <div className="p-3 space-y-3 flex-1 overflow-y-auto">
            {/* Context Pill */}
            <div className="text-center">
              <span className="text-[10px] bg-white/80 px-2.5 py-0.5 rounded-full text-slate-600 shadow-2xs font-semibold">
                Londres • {selectedScenario.topicTitle}
              </span>
            </div>

            {/* Chat History */}
            {messages.map((m) => {
              const isContact = m.sender === 'contact';
              return (
                <div
                  key={m.id}
                  className={`flex items-end gap-1.5 ${
                    isContact ? 'justify-start' : 'justify-end'
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-2.5 sm:p-3 shadow-xs text-xs sm:text-sm leading-relaxed ${
                      isContact
                        ? 'bg-white text-slate-800 rounded-bl-xs'
                        : 'bg-[#dcf8c6] text-slate-900 rounded-br-xs'
                    }`}
                  >
                    <p className="font-medium whitespace-pre-wrap">{m.text}</p>
                    <div className="flex justify-end items-center gap-1 mt-1 text-[9px] text-slate-400">
                      <span>{m.timestamp}</span>
                      {!isContact && <CheckCheck className="w-3.5 h-3.5 text-sky-600" />}
                    </div>

                    {/* Inline Pedagogical Feedback on User's Message */}
                    {m.feedback && (
                      <div className="mt-1.5 pt-1.5 border-t border-emerald-300 text-[10px] text-emerald-950 font-semibold bg-emerald-50/70 p-1.5 rounded-lg">
                        💡 {m.feedback.tip}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-1 bg-white px-3 py-2 rounded-2xl rounded-bl-xs shadow-xs w-20">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]" />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Goal & Hint Pill Bar */}
          {!isFinished && currentStep && (
            <div className="bg-white/95 border-t border-slate-200 p-2.5 space-y-1.5 shrink-0">
              <div className="flex items-start justify-between gap-2 text-xs">
                <div className="flex items-start gap-1.5 text-slate-700">
                  <span className="font-black text-indigo-700 uppercase text-[10px] shrink-0 mt-0.5">
                    Tu turno:
                  </span>
                  <p className="text-[11px] font-semibold leading-tight text-slate-800">
                    {currentStep.userGoalEs}
                  </p>
                </div>

                {!showHint ? (
                  <button
                    type="button"
                    onClick={() => setShowHint(true)}
                    className="text-[10px] font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1 shrink-0 cursor-pointer"
                  >
                    <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                    <span>Pista</span>
                  </button>
                ) : null}
              </div>

              {showHint && (
                <div className="p-2 bg-amber-50 border border-amber-200 rounded-xl text-[10px] text-amber-900 animate-in fade-in">
                  💡 {currentStep.hint}
                </div>
              )}
            </div>
          )}

          {/* Typing Form Bar */}
          {!isFinished ? (
            <form
              onSubmit={handleSendMessage}
              className="bg-[#f0f2f5] p-2 flex items-center gap-2 border-t border-slate-200 shrink-0"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Escribe tu mensaje en inglés..."
                className="flex-1 px-3 py-2.5 bg-white rounded-full text-xs sm:text-sm text-slate-900 outline-none border border-slate-300 focus:border-emerald-600 transition-colors"
                autoComplete="off"
                disabled={isTyping}
              />

              <button
                type="submit"
                disabled={!inputText.trim() || isTyping}
                className="w-9 h-9 rounded-full bg-[#075e54] hover:bg-emerald-700 disabled:opacity-40 text-white flex items-center justify-center cursor-pointer transition-transform active:scale-95 shrink-0"
              >
                <Send className="w-4 h-4 ml-0.5" />
              </button>
            </form>
          ) : (
            /* Finished Conversation Card */
            <div className="p-4 bg-emerald-50 border-t border-emerald-300 text-center space-y-2 shrink-0 animate-in fade-in">
              <span className="text-xl">🎉</span>
              <h5 className="font-extrabold text-xs sm:text-sm text-emerald-950">
                ¡Conversación completada con éxito!
              </h5>
              <p className="text-[11px] text-emerald-800">
                Has mantenido una charla natural y fluida en inglés cotidiano (+35 XP y +2 Quids 💷).
              </p>
              <div className="flex gap-2 justify-center pt-1">
                <button
                  type="button"
                  onClick={() => handleOpenScenario(selectedScenario)}
                  className="px-3 py-1.5 rounded-xl bg-white border border-emerald-300 text-emerald-900 font-bold text-xs cursor-pointer shadow-2xs"
                >
                  Repetir Charla
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedScenario(null)}
                  className="px-3 py-1.5 rounded-xl bg-[#075e54] text-white font-bold text-xs cursor-pointer shadow-2xs"
                >
                  Volver a Chats
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
