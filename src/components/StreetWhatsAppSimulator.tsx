import React, { useState } from 'react';
import { GameProgress } from '../types/streetGame';
import { CheckCheck, Send, RefreshCw } from 'lucide-react';

interface ChatScenario {
  id: string;
  senderName: string;
  senderRole: string;
  avatar: string;
  incomingText: string;
  options: {
    text: string;
    isCorrect: boolean;
    replyText: string;
    explanation: string;
  }[];
}

const CHAT_SCENARIOS: ChatScenario[] = [
  {
    id: 'chat-1',
    senderName: 'Liam',
    senderRole: 'Compañero de piso (Londres)',
    avatar: '👨‍🦱',
    incomingText: 'yo mate, cba to cook tonight. fancy a cheeky nando\'s? am starving ngl xx',
    options: [
      {
        text: 'sound mate! am down, proper starving as well. see ya in 10 x',
        isCorrect: true,
        replyText: 'sound mate! am down, proper starving as well. see ya in 10 x',
        explanation: '"Sound" (perfecto/genial), "am down" (me apunto) y "proper starving" (muerto de hambre) es el inglés de WhatsApp 100% auténtico.'
      },
      {
        text: 'Dear Liam, I will decline the chicken restaurant invitation.',
        isCorrect: false,
        replyText: 'Dear Liam, I will decline the chicken restaurant invitation.',
        explanation: 'Demasiado formal y antinatural. Pareces una carta del siglo XVIII hablando con tu compañero de piso.'
      },
      {
        text: 'Why do you send me kisses with XX? We are not married.',
        isCorrect: false,
        replyText: 'Why do you send me kisses with XX? We are not married.',
        explanation: 'En UK la "x" al final de los mensajes es mera cordialidad afectuosa informal, no significa propuesta romántica.'
      }
    ]
  },
  {
    id: 'chat-2',
    senderName: 'Callum',
    senderRole: 'Colega del pub',
    avatar: '🧢',
    incomingText: 'alright mate, we\'re at the pub already. Jack is already half pissed lol. you coming down? xx',
    options: [
      {
        text: 'legend! yeah on my way now, save me a seat, my round when I get there! x',
        isCorrect: true,
        replyText: 'legend! yeah on my way now, save me a seat, my round when I get there! x',
        explanation: 'Ofrecerse para la siguiente ronda ("my round") y llamar "legend" a un colega te hace el rey del grupo.'
      },
      {
        text: 'Why is Jack angry? Who upset him?',
        isCorrect: false,
        replyText: 'Why is Jack angry? Who upset him?',
        explanation: 'En UK "pissed" a secas significa borracho, no enfadado. ¡Jack va contento de sidra!'
      },
      {
        text: 'I do not consume alcoholic fermented barley products.',
        isCorrect: false,
        replyText: 'I do not consume alcoholic fermented barley products.',
        explanation: 'Si no bebes cerveza, en un pub pides una Coca-Cola ("a diet coke, cheers mate"), pero no des un sermón químico.'
      }
    ]
  },
  {
    id: 'chat-3',
    senderName: 'Sarah',
    senderRole: 'Compañera de trabajo',
    avatar: '👩‍💼',
    incomingText: 'morning! central line is proper messed up atm, signal failure at bank. gonna be 15 mins late to the 9am meeting, can you cover? cheers x',
    options: [
      {
        text: 'no worries at all, fairs! nightmare commute tbh. I\'ll cover for you, see ya in a bit x',
        isCorrect: true,
        replyText: 'no worries at all, fairs! nightmare commute tbh. I\'ll cover for you, see ya in a bit x',
        explanation: '"No worries" (sin problema), "fairs" (comprensible) y "nightmare commute" (viaje infernal) es el tono exacto de empatía laboral en UK.'
      },
      {
        text: 'You have breached employment punctuality standards.',
        isCorrect: false,
        replyText: 'You have breached employment punctuality standards.',
        explanation: '¡Qué crueldad! El metro de Londres falla a diario y todos los compañeros se cubren unos a otros con empatía.'
      }
    ]
  },
  {
    id: 'chat-4',
    senderName: 'Dave',
    senderRole: 'Amigo de fin de semana',
    avatar: '🎸',
    incomingText: 'mate, that ticket for the gig was forty quid!! are they taking the piss?!',
    options: [
      {
        text: 'madness innit! forty quid is daylight robbery tbh, proper taking the piss',
        isCorrect: true,
        replyText: 'madness innit! forty quid is daylight robbery tbh, proper taking the piss',
        explanation: '"Daylight robbery" (un robo a mano armada), "innit" (a que sí) y "forty quid" (40 libras) es la respuesta perfecta de indignación callejera.'
      },
      {
        text: 'I consider 40 pounds to be a reasonable investment in culture.',
        isCorrect: false,
        replyText: 'I consider 40 pounds to be a reasonable investment in culture.',
        explanation: '¡Cero banter! Tu colega te está pidiendo complicidad para quejaros juntos del atraco que os quieren meter.'
      }
    ]
  }
];

interface StreetWhatsAppSimulatorProps {
  progress: GameProgress;
  onUpdateProgress: (updated: GameProgress) => void;
}

export const StreetWhatsAppSimulator: React.FC<StreetWhatsAppSimulatorProps> = ({
  progress,
  onUpdateProgress
}) => {
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const scenario = CHAT_SCENARIOS[scenarioIdx % CHAT_SCENARIOS.length];
  const chosenOpt = selectedOption !== null ? scenario.options[selectedOption] : null;

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    const opt = scenario.options[idx];
    if (opt.isCorrect) {
      const updated: GameProgress = {
        ...progress,
        xp: progress.xp + 25,
        quids: progress.quids + 1
      };
      onUpdateProgress(updated);
    }
  };

  const handleNext = () => {
    setScenarioIdx((prev) => prev + 1);
    setSelectedOption(null);
    setIsAnswered(false);
  };

  return (
    <div className="max-w-md mx-auto space-y-4 animate-in fade-in duration-200">
      {/* Title Header */}
      <div className="bg-white border border-slate-200 rounded-3xl p-4 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-300 flex items-center justify-center text-xl">
            💬
          </div>
          <div>
            <h2 className="font-extrabold text-slate-900 text-sm">
              Simulador WhatsApp UK
            </h2>
            <p className="text-[11px] text-slate-500">
              Chatea como un británico de verdad
            </p>
          </div>
        </div>
        <span className="text-xs font-black px-2.5 py-1 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
          +25 XP ⚡
        </span>
      </div>

      {/* WhatsApp Device Mockup */}
      <div className="bg-slate-900 rounded-3xl p-2.5 sm:p-3 shadow-xl border-4 border-slate-800">
        <div className="bg-[#efeae2] rounded-2xl overflow-hidden min-h-[460px] flex flex-col justify-between">
          {/* WhatsApp Header */}
          <div className="bg-[#075e54] text-white p-3 flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-xl shrink-0">
                {scenario.avatar}
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-xs sm:text-sm text-white truncate">
                  {scenario.senderName}
                </h4>
                <p className="text-[10px] text-emerald-200 truncate">
                  {scenario.senderRole} • en línea
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="text-white/80 hover:text-white p-1 text-xs"
              title="Siguiente chat"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Messages Area */}
          <div className="p-3 space-y-3 flex-1 overflow-y-auto">
            {/* Date pill */}
            <div className="text-center">
              <span className="text-[10px] bg-white/80 px-2.5 py-0.5 rounded-full text-slate-600 shadow-2xs font-bold">
                Hoy en Londres
              </span>
            </div>

            {/* Incoming Message Bubble */}
            <div className="flex items-end gap-1.5 max-w-[85%]">
              <div className="bg-white rounded-2xl rounded-bl-xs p-3 shadow-xs text-xs sm:text-sm text-slate-800 leading-relaxed">
                <p className="font-medium">{scenario.incomingText}</p>
                <div className="flex justify-end items-center gap-1 mt-1 text-[9px] text-slate-400">
                  <span>19:42</span>
                </div>
              </div>
            </div>

            {/* User Reply Bubble if answered */}
            {isAnswered && chosenOpt && (
              <div className="flex items-end justify-end gap-1.5 animate-in fade-in slide-in-from-bottom-2 duration-200">
                <div
                  className={`max-w-[85%] rounded-2xl rounded-br-xs p-3 shadow-xs text-xs sm:text-sm leading-relaxed ${
                    chosenOpt.isCorrect
                      ? 'bg-[#dcf8c6] text-emerald-950 border border-emerald-300'
                      : 'bg-rose-100 text-rose-950 border border-rose-300'
                  }`}
                >
                  <p className="font-semibold">{chosenOpt.replyText}</p>
                  <div className="flex justify-end items-center gap-1 mt-1 text-[9px] text-slate-500">
                    <span>19:43</span>
                    <CheckCheck className="w-3.5 h-3.5 text-sky-600" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Reply Selector Options */}
          <div className="bg-white/90 backdrop-blur-md p-3 border-t border-slate-200 space-y-2">
            {!isAnswered ? (
              <>
                <p className="text-[11px] font-black text-slate-500 uppercase tracking-wider">
                  ¿Cómo responderías en WhatsApp real?
                </p>
                <div className="space-y-1.5">
                  {scenario.options.map((opt, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectOption(idx)}
                      className="w-full text-left p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-emerald-50 hover:border-emerald-400 text-xs text-slate-800 font-medium transition-all cursor-pointer shadow-2xs"
                    >
                      {opt.text}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="space-y-2">
                <div
                  className={`p-2.5 rounded-xl text-xs ${
                    chosenOpt?.isCorrect
                      ? 'bg-emerald-50 text-emerald-900 border border-emerald-300'
                      : 'bg-rose-50 text-rose-900 border border-rose-300'
                  }`}
                >
                  <strong className="block font-bold">
                    {chosenOpt?.isCorrect ? '¡Respuesta de 10! (+25 XP ⚡)' : 'Respuesta poco natural en UK:'}
                  </strong>
                  <p className="mt-0.5">{chosenOpt?.explanation}</p>
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  className="w-full py-2.5 rounded-xl bg-[#075e54] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <span>Siguiente Conversación de WhatsApp</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
