import { Exercise, Level, ExerciseCategory } from '../types';
import { CURATED_GRAMMAR_EXERCISES } from './grammarData';
import { CURATED_PHRASAL_EXERCISES } from './phrasalVerbsData';
import { CURATED_VOCAB_EXERCISES } from './vocabularyData';

// Banco ampliado de matrices de ejercicios por nivel y formato para práctica infinita
const EXPANDED_DRILL_MATRICES: Exercise[] = [
  // ==================== A2+ EXPANDED BANK ====================
  {
    id: 'gen-a2p-101',
    level: 'A2+',
    category: 'grammar',
    topicId: 'a2p-present-perfect-particles',
    topicLabel: 'Present Perfect: Been vs Gone',
    type: 'cloze',
    prompt: 'Where is Marcos? — He isn\'t here; he has ___ to the supermarket, and he\'ll be back in twenty minutes.',
    spanishHint: '¿Dónde está Marcos? — No está aquí; se ha ido al supermercado (y sigue allí).',
    options: ['gone', 'been', 'went', 'going'],
    acceptedAnswers: ['gone'],
    explanation: '"Have gone to" significa que la persona se ha marchado a un lugar y TODAVÍA no ha vuelto. ("Have been to" significa que fue y ya regresó).',
    grammarRule: 'gone to (sigue allí) ≠ been to (fue y volvió)'
  },
  {
    id: 'gen-a2p-102',
    level: 'A2+',
    category: 'grammar',
    topicId: 'a2p-present-perfect-particles',
    topicLabel: 'Present Perfect vs Past Simple',
    type: 'error_correction',
    prompt: 'Corrige el error temporal en esta frase:',
    baseSentence: 'I have seen that documentary on television last Tuesday.',
    errorWord: 'have seen',
    acceptedAnswers: [
      'I saw that documentary on television last Tuesday.',
      'saw'
    ],
    explanation: 'Con expresiones de tiempo terminado en el pasado ("last Tuesday", "yesterday", "in 2020", "two days ago"), está PROHIBIDO usar Present Perfect; es obligatorio Past Simple ("saw").',
    grammarRule: 'Finished past time (yesterday / last week / ago) -> Past Simple'
  },
  {
    id: 'gen-a2p-103',
    level: 'A2+',
    category: 'grammar',
    topicId: 'a2p-comparatives-modifiers',
    topicLabel: 'As...as Transformation',
    type: 'transformation',
    prompt: 'Transforma manteniendo el mismo significado (2 a 5 palabras):',
    baseSentence: 'My new laptop is much faster than my old one.',
    keyWord: 'AS',
    spanishHint: 'My old laptop is ___ my new one.',
    acceptedAnswers: [
      'not as fast as',
      'not so fast as'
    ],
    explanation: '"A is faster than B" equivale a "B is not as fast as A". Recuerda que entre "as ... as" el adjetivo va en grado positivo ("fast", nunca "faster").',
    grammarRule: 'A is + comparative + than B = B is not as + adj + as A'
  },
  {
    id: 'gen-a2p-104',
    level: 'A2+',
    category: 'grammar',
    topicId: 'a2p-modals-obligation',
    topicLabel: 'Needn\'t vs Mustn\'t',
    type: 'cloze',
    prompt: 'You ___ wash the dishes by hand; we have a dishwasher!',
    spanishHint: 'No hace falta que fregues los platos a mano; ¡tenemos lavavajillas!',
    options: ['don\'t have to', 'mustn\'t', 'shouldn\'t to', 'can\'t'],
    acceptedAnswers: ['don\'t have to', 'needn\'t', 'don\'t need to'],
    explanation: 'Fregar a mano no está prohibido, simplemente no es necesario porque hay lavavajillas -> "don\'t have to" o "needn\'t".',
    grammarRule: 'No es necesario = don\'t have to / needn\'t'
  },
  {
    id: 'gen-a2p-105',
    level: 'A2+',
    category: 'grammar',
    topicId: 'a2p-past-tenses',
    topicLabel: 'Past Continuous Interruption',
    type: 'translation',
    prompt: 'Traduce al inglés:',
    spanishHint: '¿Qué estabas haciendo cuando empezó la tormenta?',
    acceptedAnswers: [
      'What were you doing when the storm started?',
      'What were you doing when the storm began?'
    ],
    explanation: 'Pregunta en Past Continuous ("What were you doing") + interrupción en Past Simple ("when the storm started").',
    grammarRule: 'What + were/was + Subject + V-ing + when + Past Simple?'
  },
  {
    id: 'gen-a2p-106',
    level: 'A2+',
    category: 'phrasal_verbs',
    topicLabel: 'Phrasal Verbs: Run out of',
    type: 'transformation',
    prompt: 'Transforma usando un Phrasal Verb con RUN:',
    baseSentence: 'There is no coffee left in the jar.',
    keyWord: 'RUN',
    spanishHint: 'We have ___ coffee.',
    acceptedAnswers: [
      'run out of'
    ],
    explanation: '"Quedarse sin existencias de algo" es "run out of" (participio pasado: run -> have run out of).',
    grammarRule: 'have no X left = have run out of X'
  },

  // ==================== B1 EXPANDED BANK ====================
  {
    id: 'gen-b1-101',
    level: 'B1',
    category: 'grammar',
    topicId: 'b1-past-perfect-used-to',
    topicLabel: 'Past Perfect with By the time',
    type: 'cloze',
    prompt: 'By the time we got to the cinema, the film ___ (already / start).',
    spanishHint: 'Para cuando llegamos al cine, la película ya había empezado.',
    acceptedAnswers: [
      'had already started',
      '\'d already started'
    ],
    explanation: 'La película empezó ANTES de que nosotros llegáramos al cine ("got"), por lo que usamos el pasado del pasado: Past Perfect ("had already started").',
    grammarRule: 'By the time + Past Simple, Past Perfect (had + PP)'
  },
  {
    id: 'gen-b1-102',
    level: 'B1',
    category: 'grammar',
    topicId: 'b1-conditionals-1-2',
    topicLabel: 'In case vs If',
    type: 'cloze',
    prompt: 'Write down my phone number ___ your battery dies while you are in London.',
    spanishHint: 'Apunta mi número de teléfono POR SI ACASO se te muere la batería mientras estás en Londres.',
    options: ['in case', 'unless', 'as long as', 'even if'],
    acceptedAnswers: ['in case'],
    explanation: '"In case" significa "por si acaso" y se usa para tomar una precaución AHORA (apuntar el número) ante un posible problema futuro.',
    grammarRule: 'Precaución previa = in case + Present Simple'
  },
  {
    id: 'gen-b1-103',
    level: 'B1',
    category: 'grammar',
    topicId: 'b1-conditionals-1-2',
    topicLabel: 'As long as / Provided that',
    type: 'transformation',
    prompt: 'Transforma usando la palabra clave (2 a 5 palabras):',
    baseSentence: 'I will lend you my bike only if you bring it back before dark.',
    keyWord: 'LONG',
    spanishHint: 'I will lend you my bike ___ you bring it back before dark.',
    acceptedAnswers: [
      'as long as',
      'so long as'
    ],
    explanation: '"Only if" ("siempre y cuando / con la condición de que") equivale a "as long as" o "provided that".',
    grammarRule: 'only if = as long as / provided (that)'
  },
  {
    id: 'gen-b1-104',
    level: 'B1',
    category: 'grammar',
    topicId: 'b1-passive-voice',
    topicLabel: 'Continuous Passive',
    type: 'transformation',
    prompt: 'Transforma a voz pasiva manteniendo el tiempo continuo:',
    baseSentence: 'Mechanics are repairing my car at the garage right now.',
    keyWord: 'BEING',
    spanishHint: 'My car ___ at the garage right now.',
    acceptedAnswers: [
      'is being repaired'
    ],
    explanation: 'La frase activa está en Present Continuous ("are repairing"). Su equivalente pasivo es "is/are BEING + participio" ("is being repaired").',
    grammarRule: 'Present Continuous Passive = am/is/are + BEING + Past Participle'
  },
  {
    id: 'gen-b1-105',
    level: 'B1',
    category: 'grammar',
    topicId: 'b1-reported-speech',
    topicLabel: 'Reporting Verbs: Apologize / Accuse / Suggest',
    type: 'transformation',
    prompt: 'Transforma usando el verbo SUGGEST en estilo indirecto:',
    baseSentence: '"Why don\'t we try that new Thai restaurant tonight?" said Clara.',
    keyWord: 'TRYING',
    spanishHint: 'Clara ___ that new Thai restaurant that night.',
    acceptedAnswers: [
      'suggested trying'
    ],
    explanation: 'El verbo "suggest" NUNCA va seguido de "me + to infinitive" ("suggested me to try" ❌). Va seguido directamente de GERUNDIO (-ing): "Clara suggested trying...".',
    grammarRule: 'suggest + V-ing (NUNCA suggest sb to do)'
  },
  {
    id: 'gen-b1-106',
    level: 'B1',
    category: 'grammar',
    topicId: 'b1-reported-speech',
    topicLabel: 'Warn / Advise + Object + (not) to',
    type: 'transformation',
    prompt: 'Transforma a Reported Speech usando WARN:',
    baseSentence: '"Don\'t touch that wire because it\'s dangerous!" the electrician told us.',
    keyWord: 'WARNED',
    spanishHint: 'The electrician ___ touch that wire.',
    acceptedAnswers: [
      'warned us not to'
    ],
    explanation: 'Con "warn", "advise", "remind", "tell", "ask" y "persuade", la estructura de orden negativa es: Verbo + persona + NOT TO + infinitivo ("warned us not to touch").',
    grammarRule: 'warn / advise / tell + person + (not) to + infinitive'
  },
  {
    id: 'gen-b1-107',
    level: 'B1',
    category: 'phrasal_verbs',
    topicLabel: 'Turn down vs Turn up',
    type: 'translation',
    prompt: 'Traduce al inglés usando un Phrasal Verb:',
    spanishHint: 'No entiendo por qué rechazó una oportunidad tan buena.',
    acceptedAnswers: [
      'I don\'t understand why he turned down such a good opportunity.',
      'I don\'t understand why she turned down such a good opportunity.',
      'I do not understand why he turned down such a great opportunity.'
    ],
    explanation: '"Rechazar una oferta/oportunidad" = "turn down". "Tan buena oportunidad" = "such a good opportunity".',
    grammarRule: 'turn down (an offer/opportunity) + such a/an + adj + singular noun'
  },

  // ==================== B1+ EXPANDED BANK ====================
  {
    id: 'gen-b1p-101',
    level: 'B1+',
    category: 'grammar',
    topicId: 'b1p-perfect-continuous',
    topicLabel: 'Past Perfect Continuous',
    type: 'transformation',
    prompt: 'Une las frases usando Past Perfect Continuous con la palabra clave:',
    baseSentence: 'They drove for six hours without a break and then they finally stopped at a motel.',
    keyWord: 'DRIVING',
    spanishHint: 'They ___ for six hours without a break when they finally stopped at a motel.',
    acceptedAnswers: [
      'had been driving',
      '\'d been driving'
    ],
    explanation: 'Para enfatizar la duración ("for six hours") de una acción en progreso ANTES de otra acción pasada ("stopped"), usamos Past Perfect Continuous: "had been driving".',
    grammarRule: 'had been + V-ing + for X + before/when + Past Simple'
  },
  {
    id: 'gen-b1p-102',
    level: 'B1+',
    category: 'grammar',
    topicId: 'b1p-third-conditional',
    topicLabel: 'Third Conditional with But for / Without',
    type: 'transformation',
    prompt: 'Transforma al Third Conditional usando la palabra clave:',
    baseSentence: 'Thanks to your quick reaction, the accident wasn\'t fatal.',
    keyWord: 'HAD',
    spanishHint: 'If you ___ so quickly, the accident would have been fatal.',
    acceptedAnswers: [
      'had not reacted',
      'hadn\'t reacted'
    ],
    explanation: '"Gracias a tu rápida reacción..." implica que en realidad SÍ reaccionaste rápido; la condición irreal en el pasado es negativa: "If you hadn\'t reacted...".',
    grammarRule: 'Real affirmative past -> Unreal negative Past Perfect (If + hadn\'t + PP)'
  },
  {
    id: 'gen-b1p-103',
    level: 'B1+',
    category: 'grammar',
    topicId: 'b1p-causative-have-get',
    topicLabel: 'Causative in Past Simple',
    type: 'transformation',
    prompt: 'Transforma usando la estructura causativa:',
    baseSentence: 'Someone stole David\'s passport while he was waiting at the station.',
    keyWord: 'HAD',
    spanishHint: 'David ___ while he was waiting at the station.',
    acceptedAnswers: [
      'had his passport stolen'
    ],
    explanation: 'Además de servicios contratados, "have + objeto + participio" se usa para cosas desafortunadas que le ocurren a uno: "David had his passport stolen".',
    grammarRule: 'have + object + Past Participle (sufrir un robo/accidente)'
  },
  {
    id: 'gen-b1p-104',
    level: 'B1+',
    category: 'connectors',
    topicLabel: 'In spite of the fact that',
    type: 'transformation',
    prompt: 'Transforma usando SPITE (entre 2 y 5 palabras):',
    baseSentence: 'Even though she speaks three languages fluently, she couldn\'t find a job as a translator.',
    keyWord: 'SPITE',
    spanishHint: 'In ___ three languages fluently, she couldn\'t find a job as a translator.',
    acceptedAnswers: [
      'spite of speaking',
      'spite of the fact she speaks'
    ],
    explanation: '"In spite of" va seguido de un verbo en gerundio (-ing): "In spite of speaking..." (o "In spite of the fact that + cláusula").',
    grammarRule: 'In spite of + V-ing / Noun'
  },
  {
    id: 'gen-b1p-105',
    level: 'B1+',
    category: 'phrasal_verbs',
    topicLabel: 'Get away with / Make up for',
    type: 'cloze',
    prompt: 'How did he manage to get ___ with paying no taxes for five years?',
    spanishHint: '¿Cómo logró salirse con la suya sin pagar impuestos durante cinco años?',
    acceptedAnswers: ['away'],
    explanation: '"Get away with something / doing something" significa salirse con la suya sin recibir castigo.',
    grammarRule: 'get away with + noun / V-ing'
  },

  // ==================== B2 EXPANDED BANK ====================
  {
    id: 'gen-b2-101',
    level: 'B2',
    category: 'grammar',
    topicId: 'b2-wish-if-only',
    topicLabel: 'If only (Present vs Past)',
    type: 'error_correction',
    prompt: 'Corrige el error gramatical en esta frase con IF ONLY:',
    baseSentence: 'If only I would know how to fix this engine myself!',
    errorWord: 'would know',
    acceptedAnswers: [
      'If only I knew how to fix this engine myself!',
      'knew'
    ],
    explanation: 'Para desear que un estado presente fuera distinto (saber arreglar el motor ahora), se usa Past Simple ("If only I knew..."), nunca "would know" (además "know" es stative verb y el sujeto es "I").',
    grammarRule: 'Wish / If only + Past Simple (para deseos sobre el presente)'
  },
  {
    id: 'gen-b2-102',
    level: 'B2',
    category: 'grammar',
    topicId: 'b2-modals-past-deduction',
    topicLabel: 'Must have been / May have been',
    type: 'transformation',
    prompt: 'Transforma usando un modal perfecto:',
    baseSentence: 'Perhaps they didn\'t receive our invitation in time.',
    keyWord: 'MIGHT',
    spanishHint: 'They ___ our invitation in time.',
    acceptedAnswers: [
      'might not have received',
      'mightn\'t have received'
    ],
    explanation: '"Perhaps they didn\'t..." expresa posibilidad negativa en el pasado -> "might not have + participio" ("might not have received").',
    grammarRule: 'Perhaps + Past Simple negative = may/might not have + Past Participle'
  },
  {
    id: 'gen-b2-103',
    level: 'B2',
    category: 'grammar',
    topicId: 'b2-modals-past-deduction',
    topicLabel: 'Should have done (Criticism)',
    type: 'transformation',
    prompt: 'Transforma expresando reproche en pasado:',
    baseSentence: 'It was a mistake on your part to lend him so much money.',
    keyWord: 'OUGHT',
    spanishHint: 'You ___ him so much money.',
    acceptedAnswers: [
      'ought not to have lent',
      'oughtn\'t to have lent'
    ],
    explanation: '"Ought to" equivale a "should". En negativa de pasado es "ought not TO have + participio" ("ought not to have lent"). ¡No olvides el "to"!',
    grammarRule: 'ought (not) to have + Past Participle'
  },
  {
    id: 'gen-b2-104',
    level: 'B2',
    category: 'grammar',
    topicId: 'b2-gerund-infinitive-meaning',
    topicLabel: 'Stop to do vs Stop doing',
    type: 'transformation',
    prompt: 'Transforma usando el verbo MEAN con cambio de significado:',
    baseSentence: 'If you accept the promotion, you will have to travel abroad every week.',
    keyWord: 'MEANS',
    spanishHint: 'Accepting the promotion ___ abroad every week.',
    acceptedAnswers: [
      'means travelling',
      'means traveling',
      'means having to travel'
    ],
    explanation: 'Cuando "mean" significa "implicar / suponer como consecuencia necesaria", va seguido de GERUNDIO (-ing): "means travelling". ("Mean to do" significa tener la intención de).',
    grammarRule: 'mean + V-ing = implicar / conllevar'
  },
  {
    id: 'gen-b2-105',
    level: 'B2',
    category: 'grammar',
    topicId: 'b2-gerund-infinitive-meaning',
    topicLabel: 'It\'s no use / Worth + -ing',
    type: 'transformation',
    prompt: 'Transforma usando la expresión de B2 con POINT:',
    baseSentence: 'Trying to convince him is a complete waste of time because he\'s so stubborn.',
    keyWord: 'POINT',
    spanishHint: 'There is ___ to convince him because he\'s so stubborn.',
    acceptedAnswers: [
      'no point in trying',
      'no point trying'
    ],
    explanation: '"There is no point (in) + V-ing" o "It\'s no use + V-ing" significan "No sirve de nada / Es inútil hacer algo" y exigen gerundio (-ing).',
    grammarRule: 'There is no point (in) + V-ing = It\'s no use + V-ing'
  },
  {
    id: 'gen-b2-106',
    level: 'B2',
    category: 'word_formation',
    topicLabel: 'Word Formation: COMPARE',
    type: 'word_formation',
    prompt: 'Transforma la palabra raíz para completar la frase:',
    baseSentence: 'In ___ with last year\'s figures, our online sales have doubled.',
    keyWord: 'COMPARE',
    spanishHint: 'En comparación con las cifras del año pasado, nuestras ventas online se han duplicado.',
    acceptedAnswers: ['comparison'],
    explanation: 'La expresión fija es "In comparison with..." (sustantivo derivado de compare -> comparison).',
    grammarRule: 'in comparison with = en comparación con'
  },

  // ==================== B2+ EXPANDED BANK ====================
  {
    id: 'gen-b2p-101',
    level: 'B2+',
    category: 'grammar',
    topicId: 'b2p-inversion-negative',
    topicLabel: 'Inversion: Little did he know',
    type: 'transformation',
    prompt: 'Reescribe con inversión enfática usando la palabra clave:',
    baseSentence: 'She had no idea that her colleagues were planning a farewell party for her.',
    keyWord: 'LITTLE',
    spanishHint: '___ that her colleagues were planning a farewell party for her.',
    acceptedAnswers: [
      'Little did she know',
      'Little did she suspect',
      'Little did she realise',
      'Little did she realize'
    ],
    explanation: '"She had no idea" se transforma en nivel B2+/C1 con la inversión negativa "Little did she know / realize that...".',
    grammarRule: 'Little + did + Subject + know/realize'
  },
  {
    id: 'gen-b2p-102',
    level: 'B2+',
    category: 'grammar',
    topicId: 'b2p-inversion-negative',
    topicLabel: 'Inversion: Under no circumstances',
    type: 'transformation',
    prompt: 'Transforma usando inversión formal con CIRCUMSTANCES:',
    baseSentence: 'You must never leave the laboratory door unlocked at night.',
    keyWord: 'CIRCUMSTANCES',
    spanishHint: 'Under ___ the laboratory door unlocked at night.',
    acceptedAnswers: [
      'no circumstances must you leave',
      'no circumstances should you leave',
      'no circumstances are you to leave'
    ],
    explanation: 'Al iniciar la frase con la expresión negativa "Under no circumstances", es obligatorio invertir el modal y el sujeto: "must/should you leave".',
    grammarRule: 'Under no circumstances + should/must + Subject + bare infinitive'
  },
  {
    id: 'gen-b2p-103',
    level: 'B2+',
    category: 'grammar',
    topicId: 'b2p-inversion-negative',
    topicLabel: 'Conditional Inversion (Had I known)',
    type: 'transformation',
    prompt: 'Transforma este 3º Condicional eliminando "If" mediante inversión formal:',
    baseSentence: 'If you had informed us earlier, we could have arranged alternative transport.',
    keyWord: 'HAD',
    spanishHint: '___ us earlier, we could have arranged alternative transport.',
    acceptedAnswers: [
      'Had you informed'
    ],
    explanation: 'En registro formal (B2+/C1), "If you had informed..." puede invertirse suprimiendo "If": "Had you informed...".',
    grammarRule: 'Had + Subject + Past Participle (= If + Subject + had + PP)'
  },
  {
    id: 'gen-b2p-104',
    level: 'B2+',
    category: 'grammar',
    topicId: 'b2p-impersonal-passive',
    topicLabel: 'Personal Passive in Passive Past',
    type: 'transformation',
    prompt: 'Transforma a pasiva personal (¡fíjate en que el segundo verbo también es pasivo!):',
    baseSentence: 'Historians believe that the castle was destroyed by a fire in 1640.',
    keyWord: 'BELIEVED',
    spanishHint: 'The castle ___ by a fire in 1640.',
    acceptedAnswers: [
      'is believed to have been destroyed'
    ],
    explanation: 'Como el castillo fue destruido (pasado + pasiva), necesitamos el Infinitivo Perfecto Pasivo: "to have been + participio" ("is believed to have been destroyed").',
    grammarRule: 'Subject + is believed + to have been + Past Participle'
  },
  {
    id: 'gen-b2p-105',
    level: 'B2+',
    category: 'grammar',
    topicId: 'b2p-unreal-past-rather-time',
    topicLabel: 'Would rather in the Past',
    type: 'transformation',
    prompt: 'Transforma usando WOULD RATHER sobre un hecho del PASADO:',
    baseSentence: 'I was annoyed that you told Mark about my financial problems yesterday.',
    keyWord: 'RATHER',
    spanishHint: 'I would ___ Mark about my financial problems yesterday.',
    acceptedAnswers: [
      'rather you had not told',
      'rather you hadn\'t told'
    ],
    explanation: 'Cuando "would rather + distinto sujeto" se refiere a algo que ya ocurrió en el PASADO ("yesterday"), el verbo va en Past Perfect: "I\'d rather you hadn\'t told...".',
    grammarRule: 'would rather + somebody else + Past Perfect (para acciones pasadas)'
  }
];

// Plantillas combinatorias que generan cientos de ejercicios dinámicos únicos
interface CombinatorialTemplate {
  level: Level;
  category: ExerciseCategory;
  topicLabel: string;
  generate: () => Exercise[];
}

const COMBINATORIAL_TEMPLATES: CombinatorialTemplate[] = [
  // 1. Word Formation Mega Matrix (B1+ to B2+)
  {
    level: 'B2',
    category: 'word_formation',
    topicLabel: 'Word Formation (Use of English Part 3)',
    generate: () => {
      const items = [
        {
          root: 'APPROVE',
          sentence: 'She looked at his dirty boots with obvious ___.',
          es: 'Ella miró sus botas sucias con evidente desaprobación.',
          ans: ['disapproval'],
          exp: 'Detrás del adjetivo "obvious" necesitamos un sustantivo, y por el contexto ("dirty boots") debe ser negativo: DIS + APPROV(E) + AL = disapproval.'
        },
        {
          root: 'ABLE',
          sentence: 'His ___ to speak in public held him back from getting the promotion.',
          es: 'Su incapacidad para hablar en público le impidió conseguir el ascenso.',
          ans: ['inability'],
          exp: 'Sustantivo negativo derivado de ABLE: "inability" (incapacidad).'
        },
        {
          root: 'AWARE',
          sentence: 'The campaign aims to raise public ___ of cybersecurity threats.',
          es: 'La campaña busca aumentar la concienciación pública sobre las amenazas de ciberseguridad.',
          ans: ['awareness'],
          exp: 'La colocación fija es "raise public awareness of..." (sustantivo con sufijo -ness).'
        },
        {
          root: 'REPLACE',
          sentence: 'That antique vase my grandmother gave me is completely ___.',
          es: 'Ese jarrón antiguo que me dio mi abuela es completamente irremplazable.',
          ans: ['irreplaceable'],
          exp: 'Adjetivo negativo con prefijo IR- y sufijo -ABLE: "irreplaceable".'
        },
        {
          root: 'UNDERSTAND',
          sentence: 'The dispute was caused by a simple ___ between the two departments.',
          es: 'La disputa fue causada por un simple malentendido entre los dos departamentos.',
          ans: ['misunderstanding'],
          exp: 'Sustantivo con prefijo MIS- ("mal-"): "misunderstanding" (malentendido).'
        },
        {
          root: 'SUCCESS',
          sentence: 'They tried several times to reach the summit, but ___ had to turn back.',
          es: 'Intentaron varias veces alcanzar la cima, pero sin éxito tuvieron que darse la vuelta.',
          ans: ['unsuccessfully'],
          exp: 'Adverbio negativo derivado de success -> successful -> unsuccessful -> unsuccessfully.'
        },
        {
          root: 'PATIENCE',
          sentence: 'Passengers grew increasingly ___ as the flight delay stretched to four hours.',
          es: 'Los pasajeros se volvieron cada vez más impacientes a medida que el retraso llegó a cuatro horas.',
          ans: ['impatient'],
          exp: 'Detrás de "grew increasingly" necesitamos un adjetivo negativo con prefijo IM-: "impatient".'
        },
        {
          root: 'KNOW',
          sentence: 'She fixed the computer without my ___; I had no idea she had touched it!',
          es: 'Arregló el ordenador sin mi conocimiento; ¡no tenía ni idea de que lo había tocado!',
          ans: ['knowledge'],
          exp: 'El sustantivo derivado del verbo KNOW es "knowledge" (sin my knowledge = sin mi conocimiento).'
        },
        {
          root: 'LONG',
          sentence: 'We need to measure the exact ___ and width of the living room before buying the sofa.',
          es: 'Necesitamos medir la longitud y anchura exactas del salón antes de comprar el sofá.',
          ans: ['length'],
          exp: 'Cambios internos de adjetivo a sustantivo de medida: LONG -> length | WIDE -> width | HIGH -> height | DEEP -> depth | STRONG -> strength.'
        },
        {
          root: 'STRONG',
          sentence: 'Regular exercise will help ___ your back muscles.',
          es: 'El ejercicio regular ayudará a fortalecer los músculos de tu espalda.',
          ans: ['strengthen'],
          exp: 'De adjetivo (strong) pasamos a sustantivo (strength) y con el sufijo -EN formamos el verbo: "strengthen" (fortalecer).'
        }
      ];

      return items.map((it, idx) => ({
        id: `wf-comb-${idx}`,
        level: idx < 5 ? 'B1+' : 'B2',
        category: 'word_formation',
        topicLabel: `Word Formation: ${it.root}`,
        type: 'word_formation',
        prompt: 'Transforma la palabra en mayúsculas para que encaje perfectamente en el hueco:',
        baseSentence: it.sentence,
        keyWord: it.root,
        spanishHint: it.es,
        acceptedAnswers: it.ans,
        explanation: it.exp,
        grammarRule: `Root: ${it.root} -> ${it.ans[0]}`
      }));
    }
  },

  // 2. Dependent Prepositions Rapid Matrix
  {
    level: 'B1+',
    category: 'prepositions',
    topicLabel: 'Preposiciones Dependientes (Verbos y Adjetivos)',
    generate: () => {
      const preps = [
        {
          s: 'Who was responsible ___ organizing the conference?',
          es: '¿Quién fue responsable de organizar la conferencia?',
          ans: ['for'],
          rule: 'responsible FOR + V-ing / noun'
        },
        {
          s: 'The suspect was accused ___ forging official documents.',
          es: 'El sospechoso fue acusado de falsificar documentos oficiales.',
          ans: ['of'],
          rule: 'accuse somebody OF + V-ing (pero charge somebody WITH)'
        },
        {
          s: 'I would like to congratulate you ___ passing your B2 exam!',
          es: '¡Me gustaría felicitarte por aprobar tu examen B2!',
          ans: ['on'],
          rule: 'congratulate somebody ON + V-ing (¡En inglés es ON, nunca FOR!)'
        },
        {
          s: 'The heavy rain prevented us ___ going on the hike.',
          es: 'La fuerte lluvia nos impidió ir de excursión.',
          ans: ['from'],
          rule: 'prevent / stop somebody FROM + V-ing'
        },
        {
          s: 'This traditional dish consists mainly ___ rice, vegetables and saffron.',
          es: 'Este plato tradicional consiste principalmente en arroz, verduras y azafrán.',
          ans: ['of'],
          rule: 'consist OF (¡nunca "consist in" para ingredientes o partes!)'
        },
        {
          s: 'She is completely capable ___ running the company on her own.',
          es: 'Ella es totalmente capaz de dirigir la empresa por su cuenta.',
          ans: ['of'],
          rule: 'capable OF + V-ing'
        },
        {
          s: 'Many people objected ___ the construction of the new motorway.',
          es: 'Mucha gente se opuso a la construcción de la nueva autopista.',
          ans: ['to'],
          rule: 'object TO + noun / V-ing'
        },
        {
          s: 'I am fed up ___ listening to the same excuses every single day.',
          es: 'Estoy harto de escuchar las mismas excusas todos los días.',
          ans: ['with'],
          rule: 'fed up WITH / bored WITH / tired OF'
        }
      ];

      return preps.map((p, idx) => ({
        id: `prep-comb-${idx}`,
        level: idx < 4 ? 'B1' : 'B2',
        category: 'prepositions',
        topicLabel: 'Dependent Prepositions',
        type: 'cloze',
        prompt: p.s,
        spanishHint: p.es,
        acceptedAnswers: p.ans,
        explanation: `La preposición obligatoria en inglés para esta estructura es "${p.ans[0].toUpperCase()}": ${p.rule}.`,
        grammarRule: p.rule
      }));
    }
  },

  // 3. Spanish-Speaker Classic Grammar Errors (Error Correction Drill)
  {
    level: 'B1',
    category: 'grammar',
    topicLabel: 'Trampas Clásicas de Hispanohablantes',
    generate: () => {
      const traps = [
        {
          lvl: 'A2+' as Level,
          base: 'I am completely agree with your proposal.',
          err: 'am completely agree',
          ans: ['I completely agree with your proposal.', 'completely agree'],
          exp: '"Agree" es un verbo ("estar de acuerdo"), NO un adjetivo. Jamás lleva el verbo To Be delante ("I am agree" ❌ -> "I agree" ✅).'
        },
        {
          lvl: 'A2+' as Level,
          base: 'Most of people in my country enjoy watching football.',
          err: 'Most of people',
          ans: ['Most people in my country enjoy watching football.', 'Most people'],
          exp: 'Cuando hablamos en general sin artículo ("the") ni posesivo ("my"), se usa "Most people" (sin "of"). Solo se pone "of" si sigue "the/my/these": "Most of the people here".'
        },
        {
          lvl: 'A2+' as Level,
          base: 'Could you give me some informations about the course?',
          err: 'some informations',
          ans: ['Could you give me some information about the course?', 'some information'],
          exp: '"Information", "advice", "furniture", "luggage", "news" y "research" son INCONTABLES en inglés: nunca llevan "-s" plural ni "a/an".'
        },
        {
          lvl: 'B1' as Level,
          base: 'Can you explain me how this machine works?',
          err: 'explain me',
          ans: ['Can you explain to me how this machine works?', 'explain to me'],
          exp: 'Los verbos "explain", "suggest", "describe" y "listen" SIEMPRE exigen la preposición "TO" delante de la persona: "explain (it) TO me" (nunca "explain me").'
        },
        {
          lvl: 'B1' as Level,
          base: 'She has been married with a famous architect since 2018.',
          err: 'married with',
          ans: ['She has been married to a famous architect since 2018.', 'married to'],
          exp: '"Estar casado con alguien" en inglés es SIEMPRE "be married TO somebody" (nunca "married with").'
        },
        {
          lvl: 'B1+' as Level,
          base: 'Despite of the heavy traffic, we managed to arrive on time.',
          err: 'Despite of',
          ans: ['Despite the heavy traffic, we managed to arrive on time.', 'In spite of the heavy traffic, we managed to arrive on time.', 'Despite'],
          exp: '"Despite" NUNCA lleva "of". O usas "Despite + sustantivo" o usas "In spite of + sustantivo".'
        },
        {
          lvl: 'B2' as Level,
          base: 'I recommend you to book the tickets as soon as possible.',
          err: 'recommend you to book',
          ans: [
            'I recommend booking the tickets as soon as possible.',
            'I recommend that you book the tickets as soon as possible.',
            'recommend booking',
            'recommend that you book'
          ],
          exp: '"Recommend" y "suggest" NO admiten la estructura "persona + to infinitive" ("recommend you to do" ❌). Se usa "recommend doing" o "recommend (that) you (should) do".'
        },
        {
          lvl: 'B2+' as Level,
          base: 'Hardly we had left the harbour when a violent storm broke out.',
          err: 'Hardly we had left',
          ans: [
            'Hardly had we left the harbour when a violent storm broke out.',
            'Hardly had we left'
          ],
          exp: 'Al empezar una frase con "Hardly", "Scarcely" o "No sooner", es obligatorio invertir el auxiliar "had" y el sujeto: "Hardly had we left...".'
        }
      ];

      return traps.map((t, idx) => ({
        id: `trap-comb-${idx}`,
        level: t.lvl,
        category: 'grammar',
        topicLabel: 'Caza el Error (Trampa Hispana)',
        type: 'error_correction',
        prompt: 'Encuentra y corrige el error típico en esta frase:',
        baseSentence: t.base,
        errorWord: t.err,
        acceptedAnswers: t.ans,
        explanation: t.exp,
        grammarRule: `Correction: ${t.ans[t.ans.length - 1]}`
      }));
    }
  }
];

export function getAllStaticExercises(): Exercise[] {
  const generatedFromTemplates = COMBINATORIAL_TEMPLATES.flatMap((tpl) => tpl.generate());
  return [
    ...CURATED_GRAMMAR_EXERCISES,
    ...CURATED_PHRASAL_EXERCISES,
    ...CURATED_VOCAB_EXERCISES,
    ...EXPANDED_DRILL_MATRICES,
    ...generatedFromTemplates
  ];
}

// Generador procedural de variaciones ilimitadas cuando el usuario quiere repetir estructuras sin fin
export function generateProceduralVariation(levelFilter: Level | 'ALL', categoryFilter: ExerciseCategory | 'ALL'): Exercise {
  const proceduralBlueprints: (() => Exercise)[] = [
    // Blueprint 1: Key Word Transformation - Past Simple to Present Perfect (A2+/B1)
    () => {
      const subjects = [
        { name: 'Elena', pron: 'she', verbPast: 'last saw her cousins', perfVerb: 'has not seen her cousins', shortPerf: 'hasn\'t seen her cousins', time: 'three years' },
        { name: 'David', pron: 'he', verbPast: 'last played the piano', perfVerb: 'has not played the piano', shortPerf: 'hasn\'t played the piano', time: 'six months' },
        { name: 'We', pron: 'we', verbPast: 'last went abroad', perfVerb: 'have not been abroad', shortPerf: 'haven\'t been abroad', time: 'two years' },
        { name: 'They', pron: 'they', verbPast: 'last spoke to each other', perfVerb: 'have not spoken to each other', shortPerf: 'haven\'t spoken to each other', time: 'ages' }
      ];
      const pick = subjects[Math.floor(Math.random() * subjects.length)];
      return {
        id: `proc-perf-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        level: 'B1',
        category: 'grammar',
        topicLabel: 'Present Perfect vs Past Simple (FOR)',
        type: 'transformation',
        prompt: 'Transforma manteniendo el mismo significado usando FOR:',
        baseSentence: `${pick.name} ${pick.verbPast} ${pick.time} ago.`,
        keyWord: 'FOR',
        spanishHint: `${pick.name} ___ ${pick.time}.`,
        acceptedAnswers: [
          `${pick.perfVerb} for`,
          `${pick.shortPerf} for`
        ],
        explanation: 'Cuando decimos cuándo fue la última vez que ocurrió algo ("last did X... ago"), equivale a llevar ese tiempo sin hacerlo en Present Perfect negativo + FOR.',
        grammarRule: 'last + Past Simple + X ago = haven\'t/hasn\'t + Past Participle + for X'
      };
    },
    // Blueprint 2: Third Conditional Procedural (B1+/B2)
    () => {
      const scenarios = [
        {
          base: 'I didn\'t set my alarm clock, so I missed the early train.',
          hint: 'If I had set my alarm clock, I ___ the early train.',
          key: 'MISSED',
          ans: ['would not have missed', 'wouldn\'t have missed'],
          es: 'Si hubiera puesto el despertador, no habría perdido el tren temprano.'
        },
        {
          base: 'She didn\'t wear a coat, so she caught a terrible cold.',
          hint: 'If she had worn a coat, she ___ a terrible cold.',
          key: 'CAUGHT',
          ans: ['would not have caught', 'wouldn\'t have caught'],
          es: 'Si hubiera llevado abrigo, no habría pillado un resfriado terrible.'
        },
        {
          base: 'They didn\'t book a table, so they had to wait outside for an hour.',
          hint: 'If they ___ a table, they wouldn\'t have had to wait outside.',
          key: 'BOOKED',
          ans: ['had booked', '\'d booked'],
          es: 'Si hubieran reservado mesa, no habrían tenido que esperar fuera.'
        }
      ];
      const pick = scenarios[Math.floor(Math.random() * scenarios.length)];
      return {
        id: `proc-3cond-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        level: 'B1+',
        category: 'grammar',
        topicLabel: 'Third Conditional Drill',
        type: 'transformation',
        prompt: 'Transforma al Third Conditional usando la palabra clave:',
        baseSentence: pick.base,
        keyWord: pick.key,
        spanishHint: `${pick.hint} (${pick.es})`,
        acceptedAnswers: pick.ans,
        explanation: 'En el Third Conditional (pasado irreal): If + Past Perfect (had + participio), would(n\'t) have + participio.',
        grammarRule: 'If + had + PP, would(n\'t) have + PP'
      };
    },
    // Blueprint 3: Phrasal Verbs Transformation Procedural (B1-B2+)
    () => {
      const pvPairs = [
        {
          lvl: 'B1' as Level,
          base: 'The referee decided to cancel the match due to the snow.',
          key: 'CALL',
          hint: 'The referee decided to ___ the match due to the snow.',
          ans: ['call off'],
          exp: 'Cancelar un partido o evento = "call off".'
        },
        {
          lvl: 'B1+' as Level,
          base: 'How can you tolerate so much noise from the street?',
          key: 'PUT',
          hint: 'How can you ___ so much noise from the street?',
          ans: ['put up with'],
          exp: 'Tolerar o aguantar algo molesto = "put up with".'
        },
        {
          lvl: 'B2' as Level,
          base: 'Has anyone thought of a solution to the parking problem yet?',
          key: 'COME',
          hint: 'Has anyone ___ a solution to the parking problem yet?',
          ans: ['come up with'],
          exp: 'Ocurrírsele a uno una idea o solución = "come up with".'
        },
        {
          lvl: 'B2+' as Level,
          base: 'It is time for the government to abolish these outdated regulations.',
          key: 'DO',
          hint: 'It is time for the government to ___ these outdated regulations.',
          ans: ['do away with'],
          exp: 'Abolir o eliminar leyes/sistemas = "do away with".'
        }
      ];
      const pick = pvPairs[Math.floor(Math.random() * pvPairs.length)];
      return {
        id: `proc-pv-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        level: pick.lvl,
        category: 'phrasal_verbs',
        topicLabel: 'Phrasal Verb Transformation',
        type: 'transformation',
        prompt: 'Sustituye el verbo por el Phrasal Verb exacto:',
        baseSentence: pick.base,
        keyWord: pick.key,
        spanishHint: pick.hint,
        acceptedAnswers: pick.ans,
        explanation: pick.exp,
        grammarRule: `${pick.key} -> ${pick.ans[0]}`
      };
    },
    // Blueprint 4: B2+ Negative Inversion Procedural
    () => {
      const inversions = [
        {
          base: 'I have never tasted such delicious seafood in my entire life.',
          key: 'HAVE',
          hint: 'Never ___ such delicious seafood in my entire life.',
          ans: ['have I tasted']
        },
        {
          base: 'We rarely see such dedication in a young athlete nowadays.',
          key: 'DO',
          hint: 'Rarely ___ such dedication in a young athlete nowadays.',
          ans: ['do we see']
        },
        {
          base: 'He not only apologized, but he also paid for the damage.',
          key: 'DID',
          hint: 'Not only ___, but he also paid for the damage.',
          ans: ['did he apologize', 'did he apologise']
        }
      ];
      const pick = inversions[Math.floor(Math.random() * inversions.length)];
      return {
        id: `proc-inv-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        level: 'B2+',
        category: 'grammar',
        topicLabel: 'Negative Inversion (B2+)',
        type: 'transformation',
        prompt: 'Reescribe usando inversión enfática con la palabra clave:',
        baseSentence: pick.base,
        keyWord: pick.key,
        spanishHint: pick.hint,
        acceptedAnswers: pick.ans,
        explanation: 'Con un adverbio negativo al inicio (Never, Rarely, Not only), invertimos Auxiliar + Sujeto + Verbo principal.',
        grammarRule: 'Negative Adverb + Aux + Subject + Verb'
      };
    }
  ];

  // Si hay filtro, intentamos elegir el que mejor cuadre
  const candidates = proceduralBlueprints.map((fn) => fn());
  const filtered = candidates.filter(
    (c) =>
      (levelFilter === 'ALL' || c.level === levelFilter) &&
      (categoryFilter === 'ALL' || c.category === categoryFilter)
  );
  if (filtered.length > 0) {
    return filtered[Math.floor(Math.random() * filtered.length)];
  }
  return candidates[Math.floor(Math.random() * candidates.length)];
}

export function normalizeAnswer(str: string): string {
  return str
    .trim()
    .toLowerCase()
    .replace(/[.,!?;:"']/g, (m) => (m === "'" ? "'" : ''))
    .replace(/’/g, "'")
    .replace(/\s+/g, ' ')
    .replace(/\bcan't\b/g, 'cannot')
    .replace(/\bwon't\b/g, 'will not')
    .replace(/\bshan't\b/g, 'shall not')
    .replace(/\bn't\b/g, ' not')
    .replace(/\bi'm\b/g, 'i am')
    .replace(/\byou're\b/g, 'you are')
    .replace(/\bwe're\b/g, 'we are')
    .replace(/\bthey're\b/g, 'they are')
    .replace(/\bhe's\b/g, 'he is')
    .replace(/\bshe's\b/g, 'she is')
    .replace(/\bit's\b/g, 'it is')
    .replace(/\bi've\b/g, 'i have')
    .replace(/\byou've\b/g, 'you have')
    .replace(/\bwe've\b/g, 'we have')
    .replace(/\bthey've\b/g, 'they have')
    .replace(/\bi'll\b/g, 'i will')
    .replace(/\b'd\b/g, ' would') // Note: we also check direct match before contraction expansion
    .trim();
}

export function checkAnswerMatch(userInput: string, acceptedAnswers: string[]): boolean {
  const cleanUserRaw = userInput.trim().toLowerCase().replace(/[.,!?;:"]/g, '').replace(/’/g, "'").replace(/\s+/g, ' ');
  if (!cleanUserRaw) return false;

  for (const ans of acceptedAnswers) {
    const cleanAnsRaw = ans.trim().toLowerCase().replace(/[.,!?;:"]/g, '').replace(/’/g, "'").replace(/\s+/g, ' ');
    if (cleanUserRaw === cleanAnsRaw) return true;
    if (normalizeAnswer(userInput) === normalizeAnswer(ans)) return true;
  }
  return false;
}
