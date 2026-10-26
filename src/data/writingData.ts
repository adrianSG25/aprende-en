import { WritingPrompt } from '../types';

export const WRITING_PROMPTS: WritingPrompt[] = [
  {
    id: 'wr-a2p-micro-trip',
    level: 'A2+',
    type: 'Micro-Reto Gramatical',
    title: 'Un Viaje Inesperado (Past Tenses + Present Perfect)',
    situationEs: 'Escribe un texto corto (60-100 palabras) contando una anécdota de un viaje o excursión en la que algo salió de forma imprevista.',
    promptEn: 'Write about a trip or excursion where something unexpected happened while you were travelling. Mention what you were doing when it happened, how you solved it, and whether you have visited that place again since then.',
    minWords: 60,
    maxWords: 110,
    requiredStructures: [
      {
        id: 'req-while-past-cont',
        label: 'Past Continuous con While / When',
        examples: ['While we were waiting...', 'When I was walking...'],
        regexPatterns: ['\\b(was|were)\\s+\\w+ing\\b']
      },
      {
        id: 'req-pres-perf',
        label: 'Present Perfect (have/has + participio o never/since/already)',
        examples: ['I have never been back since then', 'We haven\'t forgotten'],
        regexPatterns: ['\\b(have|has|haven\'t|hasn\'t|\'ve)\\s+(never\\s+|already\\s+|ever\\s+|just\\s+)?\\w+(ed|en|t|ne|wn)\\b']
      },
      {
        id: 'req-phrasal-a2',
        label: 'Al menos un Phrasal Verb de viaje (set off, get on/off, break down, find out, run out of)',
        examples: ['set off early', 'ran out of battery', 'found out that', 'broke down'],
        regexPatterns: ['\\b(set off|got on|get on|got off|get off|broke down|break down|found out|find out|ran out|run out|turned up|took off)\\b']
      }
    ],
    modelAnswer: 'Last summer, while my friends and I were driving to the coast, our car suddenly broke down in the middle of nowhere. To make matters worse, we soon found out that we had almost run out of phone battery. Fortunately, a friendly local farmer stopped to help us, so we didn\'t have to call a tow truck. Although it was stressful at the time, we ended up having a great weekend. I haven\'t been back to that village since last August, but I would love to visit it again.',
    modelAnalysisEs: [
      'Usa "while my friends and I were driving... our car suddenly broke down" (Past Continuous interrumpido por Past Simple).',
      'Integra 3 Phrasal Verbs naturales: "broke down" (se averió), "found out" (nos enteramos), "run out of" (quedarse sin).',
      'Cierra conectando pasado y presente con Present Perfect + since: "I haven\'t been back... since last August".'
    ]
  },

  {
    id: 'wr-b1-email-advice',
    level: 'B1',
    type: 'Email / Letter',
    title: 'Email Dando Consejos a un Amigo que se Muda al Extranjero',
    situationEs: 'Un amigo inglés te escribe diciendo que se muda a tu ciudad para trabajar, pero está nervioso por el idioma y las costumbres. Respóndele (100-150 palabras) dándole consejos prácticos.',
    promptEn: 'Write an email to your friend Alex who is moving to your city next month. Give advice about finding a flat, getting used to local schedules, and meeting new people.',
    minWords: 100,
    maxWords: 160,
    requiredStructures: [
      {
        id: 'req-2nd-cond',
        label: '2º Condicional para dar consejo (If I were you, I would...)',
        examples: ['If I were you, I would look for...', 'If you lived near the centre, you could...'],
        regexPatterns: ['\\bif\\s+i\\s+(were|was)\\s+you\\b', '\\bwould\\b']
      },
      {
        id: 'req-used-to',
        label: 'Estructura get used to / be used to + -ING',
        examples: ['You will soon get used to having dinner late', 'I am used to living here'],
        regexPatterns: ['\\b(get|getting|got|be|am|are|is|was|were)\\s+used\\s+to\\s+\\w+ing\\b']
      },
      {
        id: 'req-connector-cond',
        label: 'Conector condicional (unless, as long as, in case, provided that)',
        examples: ['in case you need help', 'as long as you avoid the rush hour'],
        regexPatterns: ['\\b(unless|as long as|so long as|in case|provided that)\\b']
      },
      {
        id: 'req-look-forward',
        label: 'Cierre con look forward to + -ING',
        examples: ['I look forward to seeing you soon', 'I\'m looking forward to showing you around'],
        regexPatterns: ['\\blook(ing)?\\s+forward\\s+to\\s+\\w+ing\\b']
      }
    ],
    modelAnswer: 'Hi Alex,\n\nIt\'s great to hear that you\'re finally moving here next month! Don\'t worry; it\'s normal to feel a bit nervous at first.\n\nIf I were you, I would rent a flat near a metro station rather than in the historic centre, which has become far too expensive. Also, don\'t be surprised by our meal times—people here don\'t usually have dinner before 9:30 PM, though I\'m sure you\'ll quickly get used to eating later!\n\nAs long as you join a local sports club or language exchange, you\'ll make friends in no time. Save my number in case you need a hand with your luggage when you land.\n\nI\'m really looking forward to showing you around the city!\n\nBest wishes,\nAdrián',
    modelAnalysisEs: [
      'Aplica "If I were you, I would rent..." (2º Condicional clásico de examen).',
      'Usa correctamente "get used to eating later" (con -ING detrás de to).',
      'Incluye tanto "As long as" como "in case" con Present Simple.',
      'Despedida perfecta con "looking forward to showing you around".'
    ]
  },

  {
    id: 'wr-b1p-micro-regret',
    level: 'B1+',
    type: 'Micro-Reto Gramatical',
    title: 'La Decisión que Cambió el Plan (3rd Conditional + Wish + Phrasal Verbs)',
    situationEs: 'Escribe un párrafo de 70-120 palabras sobre una decisión pasada (tuya o de un personaje) que salió mal y cómo habría sido distinto si se hubiera actuado de otra manera.',
    promptEn: 'Write a short paragraph (70-120 words) about a decision or mistake in the past. Use a Third Conditional, a sentence with "wish + Past Perfect", and at least one B1+ connector (despite / in spite of / although).',
    minWords: 70,
    maxWords: 130,
    requiredStructures: [
      {
        id: 'req-3rd-cond',
        label: 'Third Conditional (If + had + participio, would/could have + participio)',
        examples: ['If I had checked the contract, I wouldn\'t have signed it.'],
        regexPatterns: ['\\b(had|hadn\'t)\\s+\\w+.*\\b(would|wouldn\'t|could|couldn\'t|might)\\s+(not\\s+)?have\\b', '\\b(would|wouldn\'t|could|couldn\'t|might)\\s+(not\\s+)?have\\s+\\w+.*\\bif\\b']
      },
      {
        id: 'req-wish-past',
        label: 'Arrepentimiento con Wish / If only + Past Perfect',
        examples: ['I wish I had listened to her', 'If only we hadn\'t put it off'],
        regexPatterns: ['\\b(wish|if only)\\s+(i|we|he|she|they)\\s+(had|hadn\'t|\'d)\\b']
      },
      {
        id: 'req-despite',
        label: 'Conector de contraste (Despite / In spite of / Even though)',
        examples: ['Despite knowing the risks...', 'Even though he warned me...'],
        regexPatterns: ['\\b(despite|in spite of|even though|although)\\b']
      }
    ],
    modelAnswer: 'Two years ago, I decided to put off repairing my laptop backup drive because I thought it was a waste of money. Despite receiving several warning messages on my screen, I carried on working without saving my files in the cloud. When the hard drive finally broke down completely, I lost six months of work. I really wish I had listened to my brother\'s advice! If I had backed up my documents in time, I wouldn\'t have had to rewrite the entire project from scratch.',
    modelAnalysisEs: [
      'Usa "put off repairing" y "carried on working" (Phrasal verbs con -ing).',
      'Usa "Despite receiving..." (Despite + V-ing sin "of").',
      'Expresa arrepentimiento con "I really wish I had listened..." y cierra con un Third Conditional impecable.'
    ]
  },

  {
    id: 'wr-b2-essay-work',
    level: 'B2',
    type: 'Essay (B2)',
    title: 'Essay B2: Working from Home vs. Working in an Office',
    situationEs: 'En tu clase de inglés habéis debatido sobre el teletrabajo. Escribe un Essay formal (140-190 palabras) analizando las ventajas y desventajas y dando tu opinión fundamentada.',
    promptEn: 'Some people believe that working from home is the future for all companies, while others argue that working in an office is essential for teamwork and productivity. Write an essay (140-190 words) discussing both views and giving your own opinion.',
    minWords: 130,
    maxWords: 200,
    requiredStructures: [
      {
        id: 'req-b2-linkers',
        label: 'Conectores formales B2 (On the one hand, Furthermore, Nevertheless, However, Whereas)',
        examples: ['On the one hand...', 'Furthermore,...', 'Nevertheless,...', 'whereas...'],
        regexPatterns: ['\\b(furthermore|moreover|nevertheless|nonetheless|whereas|on the other hand|consequently|therefore)\\b']
      },
      {
        id: 'req-b2-passive',
        label: 'Voz Pasiva o Pasiva Impersonal (It is often argued that / is considered / can be seen)',
        examples: ['It is often argued that...', 'Productivity is believed to increase...'],
        regexPatterns: ['\\b(is|are|be|been)\\s+(often\\s+|widely\\s+|generally\\s+)?(argued|believed|considered|thought|said|seen|known|claimed|expected)\\b']
      },
      {
        id: 'req-b2-phrasal-or-colloc',
        label: 'Phrasal Verb o Colocación B2 (cut down on, come up with, carry out, take into account, play a key role)',
        examples: ['cut down on commuting', 'come up with creative ideas', 'take into account'],
        regexPatterns: ['\\b(cut down on|come up with|carry out|carried out|take into account|taken into account|play a (key|vital|crucial) role|boils down to|do away with)\\b']
      }
    ],
    modelAnswer: 'Nowadays, it is widely debated whether remote work should replace traditional offices completely. While working from home offers undeniable flexibility, both approaches have significant merits that must be taken into account.\n\nOn the one hand, working remotely allows employees to cut down on daily commuting time and expenses. Furthermore, many professionals claim that they can concentrate far better at home without constant office interruptions.\n\nOn the other hand, face-to-face interaction plays a vital role in building trust within a team. When colleagues share the same space, it is much easier to brainstorm and come up with creative solutions spontaneously, whereas video calls can often feel impersonal and exhausting.\n\nAll things considered, I firmly believe that companies shouldn\'t do away with offices altogether. Instead, a hybrid model seems to be the most sensible solution, as it combines the freedom of remote work with the social benefits of office life.',
    modelAnalysisEs: [
      'Apertura formal con pasiva impersonal: "it is widely debated whether..." y "must be taken into account".',
      'Conectores de alto nivel en cada párrafo: "On the one hand", "Furthermore", "On the other hand", "whereas", "All things considered".',
      'Phrasal verbs integrados de forma natural: "cut down on", "come up with", "do away with", más el adjetivo "sensible" (sensato).'
    ]
  },

  {
    id: 'wr-b2p-article-inversion',
    level: 'B2+',
    type: 'Article',
    title: 'Artículo B2 Advanced: Una Habilidad que Todo el Mundo Debería Aprender',
    situationEs: 'Escribe un artículo atractivo (140-200 palabras) sobre una habilidad práctica o mental que todo adulto debería dominar, utilizando las estructuras estrella de nivel B2 Advanced (Inversión, Cleft Sentences y Unreal Past).',
    promptEn: 'Write an engaging article (140-200 words) about a skill everyone should learn in the modern world. To achieve a B2+ / C1 score, include at least one Negative Inversion, one Cleft Sentence (What... is), and "It is high time + Past Simple".',
    minWords: 130,
    maxWords: 210,
    requiredStructures: [
      {
        id: 'req-b2p-inversion',
        label: 'Inversión Negativa (Not only does/is..., Rarely do we..., Never have I..., Little do people realize)',
        examples: ['Not only does cooking save money, but it also...', 'Rarely do we stop to think...'],
        regexPatterns: ['\\b(not only|rarely|seldom|never|little|hardly|no sooner|under no circumstances)\\s+(do|does|did|have|has|had|is|are|was|were|can|could|should|will|would)\\s+\\w+\\b']
      },
      {
        id: 'req-b2p-cleft',
        label: 'Cleft Sentence de énfasis (What... is/was...)',
        examples: ['What really matters is...', 'What most people fail to realize is that...'],
        regexPatterns: ['\\bwhat\\s+[\\w\\s\']{2,35}\\s+(is|was)\\b']
      },
      {
        id: 'req-b2p-high-time',
        label: 'Unreal Past: It is (high / about) time + Sujeto + Past Simple',
        examples: ['It is high time schools taught financial literacy.', 'It\'s about time we took...'],
        regexPatterns: ['\\bit(\\s+is|\'s)\\s+(high\\s+|about\\s+)?time\\s+\\w+\\s+\\w+ed\\b', '\\bit(\\s+is|\'s)\\s+(high\\s+|about\\s+)?time\\s+(we|you|they|people|schools|governments)\\s+(took|made|began|learnt|taught|stopped|gave|knew|found|went)\\b']
      }
    ],
    modelAnswer: 'Have you ever wondered why so many brilliant graduates struggle to manage their personal savings? Rarely do we stop to think about how little financial education we actually receive at school.\n\nWhat surprises me most is that young adults are expected to understand mortgages, taxes and inflation without any prior training. Not only does financial literacy protect you from falling into debt, but it also gives you the freedom to make independent life choices.\n\nFortunately, it is never too late to brush up on the basics of budgeting. Nevertheless, it is high time schools included practical money management in the compulsory curriculum so that future generations are better prepared for the real world.',
    modelAnalysisEs: [
      'Usa DOS inversiones negativas impecables: "Rarely do we stop to think..." y "Not only does financial literacy protect you..., but it also...".',
      'Usa una Cleft Sentence en el segundo párrafo: "What surprises me most is that...".',
      'Cierra con Phrasal Verb de B2+ ("brush up on") + Unreal Past ("it is high time schools included...").'
    ]
  }
];

export interface LocalGrammarFeedbackItem {
  type: 'error' | 'warning' | 'upgrade' | 'success';
  snippet: string;
  messageEs: string;
  suggestionEn: string;
}

export interface LocalWritingEvaluation {
  wordCount: number;
  sentenceCount: number;
  estimatedLevel: string;
  scoreOutOf100: number;
  detectedAdvancedStructures: string[];
  feedbackItems: LocalGrammarFeedbackItem[];
}

// Motor local de análisis gramatical para hispanohablantes (funciona 100% offline al instante)
export function analyzeWritingLocally(text: string): LocalWritingEvaluation {
  const clean = text.trim();
  const words = clean ? clean.split(/\s+/) : [];
  const wordCount = words.length;
  const sentences = clean ? clean.split(/[.!?]+/).filter((s) => s.trim().length > 0) : [];
  const sentenceCount = sentences.length;

  const feedbackItems: LocalGrammarFeedbackItem[] = [];
  const detectedAdvancedStructures: string[] = [];

  // 1. Reglas de errores clásicos de hispanohablantes
  const errorRules: { regex: RegExp; msg: string; fix: string }[] = [
    {
      regex: /\b(i am|you are|he is|she is|we are|they are|i'm|you're|he's|she's|we're|they're|was|were)\s+(completely\s+|totally\s+)?(not\s+)?agree\b/i,
      msg: '"Agree" es un verbo, no un adjetivo: nunca pongas el verbo To Be delante.',
      fix: 'Usa "I agree / I don\'t agree / I completely agree" (sin am/is/are).'
    },
    {
      regex: /\bdepend(s|ed|ing)?\s+of\b/i,
      msg: 'Error de preposición: "depender de" en inglés jamás lleva "of".',
      fix: 'Usa siempre "depend ON" (ej. "It depends on...").'
    },
    {
      regex: /\bdespite\s+of\b/i,
      msg: 'Error clásico de examen: "Despite" NUNCA va seguido de "of".',
      fix: 'Escribe "Despite + sustantivo/-ing" (sin of) o bien "In spite of".'
    },
    {
      regex: /\bpeople\s+(is|was|has)\b/i,
      msg: '"People" ("la gente") es SIEMPRE plural en inglés.',
      fix: 'Usa el verbo en plural: "people are / people were / people have".'
    },
    {
      regex: /\b(everybody|everyone|nobody|somebody|someone|everything)\s+(are|were|have)\b/i,
      msg: 'Los pronombres indefinidos (everybody, everyone, nobody, everything) concuerdan SIEMPRE en singular.',
      fix: 'Usa verbo en singular: "everyone is / everybody has".'
    },
    {
      regex: /\b(informations|advices|furnitures|luggages|homeworks|knowledges)\b/i,
      msg: 'Has puesto en plural un sustantivo que es INCONTABLE en inglés.',
      fix: 'Escribe "information / advice / furniture / luggage / homework / knowledge" en singular (o "a piece of advice").'
    },
    {
      regex: /\ban\s+(information|advice|furniture|luggage)\b/i,
      msg: 'Los sustantivos incontables (information, advice) no pueden llevar "a / an" delante.',
      fix: 'Usa "some information / a piece of advice".'
    },
    {
      regex: /\bexplain\s+(me|you|him|her|us|them)\b/i,
      msg: 'El verbo "explain" exige siempre la preposición "to" delante de la persona.',
      fix: 'Escribe "explain (it) TO me / explain to us".'
    },
    {
      regex: /\b(recommend|suggest)\s+(me|you|him|her|us|them)\s+to\s+\w+/i,
      msg: 'Los verbos "recommend" y "suggest" no admiten "persona + to + infinitivo".',
      fix: 'Usa "recommend/suggest + V-ing" o "recommend that you (should) + infinitivo".'
    },
    {
      regex: /\bmarried\s+with\b/i,
      msg: '"Casado con" en inglés no usa "with".',
      fix: 'Usa "married TO somebody".'
    },
    {
      regex: /\blook(ing)?\s+forward\s+to\s+(see|hear|meet|visit|go|have|work|start|make|receive)\b/i,
      msg: 'En "look forward to", la palabra "to" es una preposición y el verbo siguiente debe ir en GERUNDIO (-ing).',
      fix: 'Cambia el verbo a -ING: "looking forward to seeing / hearing / meeting".'
    },
    {
      regex: /\bused\s+to\s+\w+ing\b/i,
      msg: 'Revisa si delante de "used to + -ing" has puesto "be" o "get". Si es "solía hacer", va con infinitivo; si es "acostumbrado a", lleva be/get delante.',
      fix: 'Verifica: "I used to do" (hábito pasado) vs "I am/got used to doing" (acostumbrado).'
    },
    {
      regex: /\bvery\s+(better|worse|easier|harder|bigger|smaller|faster|more\s+\w+|less\s+\w+)\b/i,
      msg: 'Nunca se usa "very" para modificar un comparativo.',
      fix: 'Sustituye "very" por "much", "far" o "a lot" (ej. "much better", "far more expensive").'
    },
    {
      regex: /\bif\s+(i|you|he|she|we|they)\s+would\b/i,
      msg: 'En las oraciones condicionales estándar, "If" y "would" nunca van en la misma cláusula.',
      fix: 'Usa Past Simple (2º cond: "If I knew...") o Past Perfect (3º cond: "If I had known...").'
    },
    {
      regex: /\bmustn't\s+have\b/i,
      msg: '"Mustn\'t have" no existe para deducciones en el pasado.',
      fix: 'Para decir "no puede haber ocurrido", usa "can\'t have + participio" o "couldn\'t have + participio".'
    },
    {
      regex: /\banother\s+\w+s\b/i,
      msg: '"Another" ("an + other") es singular y no puede ir seguido de un sustantivo en plural (salvo con números como "another three days").',
      fix: 'Con sustantivos plurales usa "other" (ej. "other people / other things").'
    }
  ];

  for (const rule of errorRules) {
    const match = clean.match(rule.regex);
    if (match) {
      feedbackItems.push({
        type: 'error',
        snippet: match[0],
        messageEs: rule.msg,
        suggestionEn: rule.fix
      });
    }
  }

  // 2. Detectar vocabulario básico que se puede elevar a B2 / B2+
  const styleUpgrades: { regex: RegExp; msg: string; upgrade: string }[] = [
    {
      regex: /\bvery\s+good\b/i,
      msg: '"Very good" es vocabulario de nivel A1/A2.',
      upgrade: 'Súbelo a B2 usando: "outstanding", "remarkable", "highly effective" o "first-rate".'
    },
    {
      regex: /\bvery\s+bad\b/i,
      msg: '"Very bad" es demasiado básico para un texto B1+/B2.',
      upgrade: 'Usa alternativas de B2: "dreadful", "appalling", "counterproductive" o "severely flawed".'
    },
    {
      regex: /\bvery\s+important\b/i,
      msg: 'Puedes ganar puntos de léxico sustituyendo "very important".',
      upgrade: 'Prueba con: "crucial", "vital", "essential" o "of paramount importance".'
    },
    {
      regex: /\ba\s+lot\s+of\b/i,
      msg: 'En textos formales (Essays/Articles), evita repetir "a lot of".',
      upgrade: 'Sustitúyelo por "a great deal of (+ incontable)", "numerous (+ plural)" o "a wide range of".'
    },
    {
      regex: /\bi\s+think\s+that\b/i,
      msg: 'Para un nivel B2/B2+, varía la forma de introducir tu opinión en lugar de "I think that".',
      upgrade: 'Usa "I firmly believe that...", "From my point of view,...", "As far as I am concerned,..." o "It seems to me that...".'
    }
  ];

  for (const up of styleUpgrades) {
    const match = clean.match(up.regex);
    if (match) {
      feedbackItems.push({
        type: 'upgrade',
        snippet: match[0],
        messageEs: up.msg,
        suggestionEn: up.upgrade
      });
    }
  }

  // 3. Detectar estructuras de mérito (B1, B2, B2+) que el usuario SÍ ha utilizado
  const meritDetectors: { label: string; regex: RegExp }[] = [
    { label: 'Inversión Negativa (B2+)', regex: /\b(not only|rarely|seldom|never|little|hardly|no sooner|under no circumstances)\s+(do|does|did|have|has|had|is|are|was|were|can|could|should|will|would)\b/i },
    { label: 'Cleft Sentence "What... is" (B2+)', regex: /\bwhat\s+[\w\s']{2,30}\s+(is|was)\b/i },
    { label: 'Unreal Past "It is high time" (B2+)', regex: /\bit(\s+is|'s)\s+(high\s+|about\s+)?time\b/i },
    { label: 'Participle Clause "Having + PP" (B2+)', regex: /\bhaving\s+\w+(ed|en|t|ne|wn)\b/i },
    { label: 'Third / Mixed Conditional (B1+/B2)', regex: /\b(had|hadn't)\s+\w+.*\b(would|wouldn't|could|might)\b/i },
    { label: 'Second Conditional (B1)', regex: /\bif\s+\w+\s+(were|was|had|did|went|knew|lived|worked|took|offered)\b/i },
    { label: 'Wish / If only (B2)', regex: /\b(wish|if only)\s+(i|you|he|she|we|they)\b/i },
    { label: 'Modal Perfecto (B2)', regex: /\b(must|can't|couldn't|might|may|should|ought to|needn't)\s+(not\s+)?have\s+\w+/i },
    { label: 'Voz Pasiva / Pasiva Impersonal (B1/B2)', regex: /\b(is|are|was|were|been)\s+(often\s+|widely\s+)?(believed|thought|considered|argued|debated|said|taken|made|given|offered|repaired|built|stolen)\b/i },
    { label: 'Conectores B2 (Furthermore / Nevertheless / Whereas / Despite)', regex: /\b(furthermore|moreover|nevertheless|nonetheless|whereas|despite|in spite of|consequently|on the other hand|as long as|provided that)\b/i },
    { label: 'Phrasal Verbs integrados', regex: /\b(put up with|come up with|cut down on|do away with|brush up on|live up to|look forward to|put off|call off|turn down|figure out|run out of|break down|set off|carry on|get away with)\b/i }
  ];

  for (const m of meritDetectors) {
    if (m.regex.test(clean)) {
      detectedAdvancedStructures.push(m.label);
    }
  }

  // Calcular puntuación y nivel estimado
  const errorCount = feedbackItems.filter((f) => f.type === 'error').length;
  const meritCount = detectedAdvancedStructures.length;

  let baseScore = Math.min(100, Math.max(30, 62 + meritCount * 8 - errorCount * 10 + (wordCount >= 60 ? 8 : 0)));
  if (wordCount < 15) baseScore = 20;

  let estimatedLevel = 'A2+';
  if (meritCount >= 4 && errorCount === 0) estimatedLevel = 'B2+ (B2 Advanced)';
  else if (meritCount >= 3 && errorCount <= 1) estimatedLevel = 'B2 (Upper-Intermediate)';
  else if (meritCount >= 2) estimatedLevel = 'B1+ (Intermediate Advanced)';
  else if (meritCount >= 1 || wordCount >= 50) estimatedLevel = 'B1 (Intermediate)';

  if (errorCount === 0 && wordCount >= 30) {
    feedbackItems.unshift({
      type: 'success',
      snippet: 'Gramática limpia',
      messageEs: '¡Excelente! No se han detectado trampas gramaticales típicas de hispanohablantes en tu texto.',
      suggestionEn: 'Sigue introduciendo conectores de B2, inversiones y phrasal verbs para consolidar el B2 Advanced.'
    });
  }

  return {
    wordCount,
    sentenceCount,
    estimatedLevel,
    scoreOutOf100: baseScore,
    detectedAdvancedStructures,
    feedbackItems
  };
}
