export interface DictionaryWord {
  id: string;
  es: string;
  en: string;
  acceptedAnswers: string[];
  pron: string;
  category: 'top50' | 'verbs' | 'core_concepts' | 'connectors' | 'uk_life';
  partOfSpeech: 'noun' | 'verb' | 'adjective' | 'connector' | 'expression';
  exampleEn: string;
  exampleEs: string;
}

export const DICTIONARY_CATEGORIES: {
  id: 'top50' | 'verbs' | 'core_concepts' | 'connectors' | 'uk_life';
  label: string;
  icon: string;
  color: string;
  description: string;
}[] = [
  {
    id: 'top50',
    label: 'Top 50 Palabras Más Usadas',
    icon: '🌟',
    color: 'amber',
    description: 'Las 50 palabras más frecuentes que representan más del 50% de todo el inglés hablado.'
  },
  {
    id: 'verbs',
    label: 'Verbos Cotidianos Clave',
    icon: '⚡',
    color: 'emerald',
    description: 'Los verbos esenciales de acción para desenvolverte en cualquier conversación diaria.'
  },
  {
    id: 'core_concepts',
    label: 'Conceptos Imprescindibles (Knowledge, etc.)',
    icon: '🧠',
    color: 'indigo',
    description: 'Sustantivos y conceptos clave que necesitas dominar para hablar con precisión.'
  },
  {
    id: 'connectors',
    label: 'Conectores y Enlaces',
    icon: '🔗',
    color: 'purple',
    description: 'Palabras para unir frases y sonar natural (although, instead of, because of...).'
  },
  {
    id: 'uk_life',
    label: 'Vida Cotidiana en UK',
    icon: '🇬🇧',
    color: 'rose',
    description: 'Palabras del día a día en Reino Unido: piso, facturas, casero, cola, etc.'
  }
];

export const DICTIONARY_WORDS: DictionaryWord[] = [
  // ==================== TOP 50 PALABRAS MÁS USADAS ====================
  {
    id: 'w-top-1',
    es: 'tiempo / vez',
    en: 'time',
    acceptedAnswers: ['time'],
    pron: 'táim',
    category: 'top50',
    partOfSpeech: 'noun',
    exampleEn: 'Do you have time for a quick coffee?',
    exampleEs: '¿Tienes tiempo para un café rápido?'
  },
  {
    id: 'w-top-2',
    es: 'año',
    en: 'year',
    acceptedAnswers: ['year'],
    pron: 'yíer',
    category: 'top50',
    partOfSpeech: 'noun',
    exampleEn: 'I have lived in the UK for one year.',
    exampleEs: 'He vivido en el Reino Unido durante un año.'
  },
  {
    id: 'w-top-3',
    es: 'gente / personas',
    en: 'people',
    acceptedAnswers: ['people'],
    pron: 'pí-pol',
    category: 'top50',
    partOfSpeech: 'noun',
    exampleEn: 'People are very polite here.',
    exampleEs: 'La gente es muy educada aquí.'
  },
  {
    id: 'w-top-4',
    es: 'camino / forma / manera',
    en: 'way',
    acceptedAnswers: ['way'],
    pron: 'uéi',
    category: 'top50',
    partOfSpeech: 'noun',
    exampleEn: 'Is this the right way to the station?',
    exampleEs: '¿Es este el camino correcto a la estación?'
  },
  {
    id: 'w-top-5',
    es: 'día',
    en: 'day',
    acceptedAnswers: ['day'],
    pron: 'déi',
    category: 'top50',
    partOfSpeech: 'noun',
    exampleEn: 'Have a lovely day!',
    exampleEs: '¡Que tengas un buen día!'
  },
  {
    id: 'w-top-6',
    es: 'cosa',
    en: 'thing',
    acceptedAnswers: ['thing'],
    pron: 'zíng',
    category: 'top50',
    partOfSpeech: 'noun',
    exampleEn: 'That is the best thing you could do.',
    exampleEs: 'Eso es lo mejor que podías hacer.'
  },
  {
    id: 'w-top-7',
    es: 'hombre / tipo',
    en: 'man',
    acceptedAnswers: ['man', 'guy'],
    pron: 'mán',
    category: 'top50',
    partOfSpeech: 'noun',
    exampleEn: 'The man at the counter was very helpful.',
    exampleEs: 'El hombre del mostrador fue muy amable.'
  },
  {
    id: 'w-top-8',
    es: 'mundo',
    en: 'world',
    acceptedAnswers: ['world'],
    pron: 'uérld',
    category: 'top50',
    partOfSpeech: 'noun',
    exampleEn: 'London is a very multicultural world.',
    exampleEs: 'Londres es un mundo muy multicultural.'
  },
  {
    id: 'w-top-9',
    es: 'vida',
    en: 'life',
    acceptedAnswers: ['life'],
    pron: 'láif',
    category: 'top50',
    partOfSpeech: 'noun',
    exampleEn: 'Everyday life in London is fast.',
    exampleEs: 'La vida cotidiana en Londres es rápida.'
  },
  {
    id: 'w-top-10',
    es: 'mano',
    en: 'hand',
    acceptedAnswers: ['hand'],
    pron: 'jánd',
    category: 'top50',
    partOfSpeech: 'noun',
    exampleEn: 'Can you give me a hand with this?',
    exampleEs: '¿Me puedes echar una mano con esto?'
  },
  {
    id: 'w-top-11',
    es: 'parte',
    en: 'part',
    acceptedAnswers: ['part'],
    pron: 'párt',
    category: 'top50',
    partOfSpeech: 'noun',
    exampleEn: 'Which part of town do you live in?',
    exampleEs: '¿En qué parte de la ciudad vives?'
  },
  {
    id: 'w-top-12',
    es: 'niño / hijo',
    en: 'child',
    acceptedAnswers: ['child', 'kid'],
    pron: 'cháild',
    category: 'top50',
    partOfSpeech: 'noun',
    exampleEn: 'The child is playing in the park.',
    exampleEs: 'El niño está jugando en el parque.'
  },
  {
    id: 'w-top-13',
    es: 'ojo',
    en: 'eye',
    acceptedAnswers: ['eye'],
    pron: 'ái',
    category: 'top50',
    partOfSpeech: 'noun',
    exampleEn: 'Keep an eye on my bag for a second.',
    exampleEs: 'Échale un ojo a mi mochila un segundo.'
  },
  {
    id: 'w-top-14',
    es: 'mujer',
    en: 'woman',
    acceptedAnswers: ['woman'],
    pron: 'uú-man',
    category: 'top50',
    partOfSpeech: 'noun',
    exampleEn: 'A woman showed me where to get off.',
    exampleEs: 'Una mujer me indicó dónde bajarme.'
  },
  {
    id: 'w-top-15',
    es: 'lugar / sitio',
    en: 'place',
    acceptedAnswers: ['place'],
    pron: 'pléis',
    category: 'top50',
    partOfSpeech: 'noun',
    exampleEn: 'This cafe is a lovely place.',
    exampleEs: 'Esta cafetería es un sitio encantador.'
  },
  {
    id: 'w-top-16',
    es: 'trabajo / curro',
    en: 'work',
    acceptedAnswers: ['work', 'job'],
    pron: 'uórk',
    category: 'top50',
    partOfSpeech: 'noun',
    exampleEn: 'I start work at nine in the morning.',
    exampleEs: 'Empiezo a trabajar a las nueve de la mañana.'
  },
  {
    id: 'w-top-17',
    es: 'semana',
    en: 'week',
    acceptedAnswers: ['week'],
    pron: 'uík',
    category: 'top50',
    partOfSpeech: 'noun',
    exampleEn: 'See you next week, mate!',
    exampleEs: '¡Nos vemos la semana que viene, colega!'
  },
  {
    id: 'w-top-18',
    es: 'caso / situación',
    en: 'case',
    acceptedAnswers: ['case'],
    pron: 'kéis',
    category: 'top50',
    partOfSpeech: 'noun',
    exampleEn: 'In that case, we can go tomorrow.',
    exampleEs: 'En ese caso, podemos ir mañana.'
  },
  {
    id: 'w-top-19',
    es: 'punto / tema',
    en: 'point',
    acceptedAnswers: ['point'],
    pron: 'póint',
    category: 'top50',
    partOfSpeech: 'noun',
    exampleEn: 'Fair point, I agree with you.',
    exampleEs: 'Buen punto, estoy de acuerdo contigo.'
  },
  {
    id: 'w-top-20',
    es: 'gobierno',
    en: 'government',
    acceptedAnswers: ['government'],
    pron: 'gá-vern-ment',
    category: 'top50',
    partOfSpeech: 'noun',
    exampleEn: 'The local government announced new rules.',
    exampleEs: 'El gobierno local anunció nuevas normas.'
  },
  {
    id: 'w-top-21',
    es: 'empresa / compañía',
    en: 'company',
    acceptedAnswers: ['company'],
    pron: 'kám-pa-ni',
    category: 'top50',
    partOfSpeech: 'noun',
    exampleEn: 'He works for an IT company.',
    exampleEs: 'Trabaja para una empresa de informática.'
  },
  {
    id: 'w-top-22',
    es: 'número',
    en: 'number',
    acceptedAnswers: ['number'],
    pron: 'nám-ber',
    category: 'top50',
    partOfSpeech: 'noun',
    exampleEn: 'Can I take your phone number?',
    exampleEs: '¿Me puedes dar tu número de teléfono?'
  },
  {
    id: 'w-top-23',
    es: 'grupo',
    en: 'group',
    acceptedAnswers: ['group'],
    pron: 'grúp',
    category: 'top50',
    partOfSpeech: 'noun',
    exampleEn: 'A group of friends arrived at the pub.',
    exampleEs: 'Un grupo de amigos llegó al pub.'
  },
  {
    id: 'w-top-24',
    es: 'problema',
    en: 'problem',
    acceptedAnswers: ['problem', 'issue'],
    pron: 'pró-blem',
    category: 'top50',
    partOfSpeech: 'noun',
    exampleEn: 'No problem at all, mate.',
    exampleEs: 'Ningún problema, colega.'
  },
  {
    id: 'w-top-25',
    es: 'hecho / realidad',
    en: 'fact',
    acceptedAnswers: ['fact'],
    pron: 'fákt',
    category: 'top50',
    partOfSpeech: 'noun',
    exampleEn: 'In fact, it is much cheaper than that.',
    exampleEs: 'De hecho, es mucho más barato que eso.'
  },
  {
    id: 'w-top-26',
    es: 'bueno / buena',
    en: 'good',
    acceptedAnswers: ['good'],
    pron: 'gúd',
    category: 'top50',
    partOfSpeech: 'adjective',
    exampleEn: 'That sounds like a very good idea.',
    exampleEs: 'Me parece muy buena idea.'
  },
  {
    id: 'w-top-27',
    es: 'nuevo / nueva',
    en: 'new',
    acceptedAnswers: ['new'],
    pron: 'niú',
    category: 'top50',
    partOfSpeech: 'adjective',
    exampleEn: 'I bought a new jacket today.',
    exampleEs: 'Me he comprado una chaqueta nueva hoy.'
  },
  {
    id: 'w-top-28',
    es: 'primero / primera',
    en: 'first',
    acceptedAnswers: ['first'],
    pron: 'férst',
    category: 'top50',
    partOfSpeech: 'adjective',
    exampleEn: 'This is my first time visiting Manchester.',
    exampleEs: 'Es mi primera vez visitando Mánchester.'
  },
  {
    id: 'w-top-29',
    es: 'último / pasada',
    en: 'last',
    acceptedAnswers: ['last'],
    pron: 'lást',
    category: 'top50',
    partOfSpeech: 'adjective',
    exampleEn: 'I saw him last Friday at the pub.',
    exampleEs: 'Le vi el viernes pasado en el pub.'
  },
  {
    id: 'w-top-30',
    es: 'largo / mucho tiempo',
    en: 'long',
    acceptedAnswers: ['long'],
    pron: 'lóng',
    category: 'top50',
    partOfSpeech: 'adjective',
    exampleEn: 'It has been a long day at work.',
    exampleEs: 'Ha sido un día largo en el curro.'
  },
  {
    id: 'w-top-31',
    es: 'grande',
    en: 'great',
    acceptedAnswers: ['great', 'big'],
    pron: 'gréit',
    category: 'top50',
    partOfSpeech: 'adjective',
    exampleEn: 'That sounds great, let us do it!',
    exampleEs: '¡Suena genial, hagámoslo!'
  },
  {
    id: 'w-top-32',
    es: 'pequeño / poco',
    en: 'little',
    acceptedAnswers: ['little', 'small'],
    pron: 'lí-tol',
    category: 'top50',
    partOfSpeech: 'adjective',
    exampleEn: 'Can you wait a little minute?',
    exampleEs: '¿Puedes esperar un minutito?'
  },
  {
    id: 'w-top-33',
    es: 'propio / propia',
    en: 'own',
    acceptedAnswers: ['own'],
    pron: 'óun',
    category: 'top50',
    partOfSpeech: 'adjective',
    exampleEn: 'I have my own room in the flat.',
    exampleEs: 'Tengo mi propia habitación en el piso.'
  },
  {
    id: 'w-top-34',
    es: 'otro / otra',
    en: 'other',
    acceptedAnswers: ['other'],
    pron: 'á-der',
    category: 'top50',
    partOfSpeech: 'adjective',
    exampleEn: 'Let us try the other supermarket.',
    exampleEs: 'Probemos el otro supermercado.'
  },
  {
    id: 'w-top-35',
    es: 'viejo / antiguo',
    en: 'old',
    acceptedAnswers: ['old'],
    pron: 'óuld',
    category: 'top50',
    partOfSpeech: 'adjective',
    exampleEn: 'The old pub has a lot of history.',
    exampleEs: 'El viejo pub tiene mucha historia.'
  },
  {
    id: 'w-top-36',
    es: 'correcto / derecha',
    en: 'right',
    acceptedAnswers: ['right'],
    pron: 'ráit',
    category: 'top50',
    partOfSpeech: 'adjective',
    exampleEn: 'You are completely right, mate.',
    exampleEs: 'Tienes toda la razón, colega.'
  },
  {
    id: 'w-top-37',
    es: 'alto / elevado',
    en: 'high',
    acceptedAnswers: ['high'],
    pron: 'jái',
    category: 'top50',
    partOfSpeech: 'adjective',
    exampleEn: 'London rent is very high.',
    exampleEs: 'El alquiler en Londres es muy alto.'
  },
  {
    id: 'w-top-38',
    es: 'diferente',
    en: 'different',
    acceptedAnswers: ['different'],
    pron: 'dí-fe-rent',
    category: 'top50',
    partOfSpeech: 'adjective',
    exampleEn: 'British English is slightly different.',
    exampleEs: 'El inglés británico es ligeramente diferente.'
  },
  {
    id: 'w-top-39',
    es: 'pequeño',
    en: 'small',
    acceptedAnswers: ['small', 'little'],
    pron: 'smól',
    category: 'top50',
    partOfSpeech: 'adjective',
    exampleEn: 'I live in a small flat near the station.',
    exampleEs: 'Vivo en un piso pequeño cerca de la estación.'
  },
  {
    id: 'w-top-40',
    es: 'siguiente / próximo',
    en: 'next',
    acceptedAnswers: ['next'],
    pron: 'nékst',
    category: 'top50',
    partOfSpeech: 'adjective',
    exampleEn: 'Get off at the next bus stop.',
    exampleEs: 'Bájate en la siguiente parada de autobús.'
  },
  {
    id: 'w-top-41',
    es: 'temprano',
    en: 'early',
    acceptedAnswers: ['early'],
    pron: 'ér-li',
    category: 'top50',
    partOfSpeech: 'adjective',
    exampleEn: 'I need an early night today.',
    exampleEs: 'Necesito acostarme temprano hoy.'
  },
  {
    id: 'w-top-42',
    es: 'joven',
    en: 'young',
    acceptedAnswers: ['young'],
    pron: 'yáng',
    category: 'top50',
    partOfSpeech: 'adjective',
    exampleEn: 'Lots of young people live in Camden.',
    exampleEs: 'Mucha gente joven vive en Camden.'
  },
  {
    id: 'w-top-43',
    es: 'importante',
    en: 'important',
    acceptedAnswers: ['important'],
    pron: 'im-pór-tant',
    category: 'top50',
    partOfSpeech: 'adjective',
    exampleEn: 'It is important to keep your receipt.',
    exampleEs: 'Es importante guardar el ticket de compra.'
  },
  {
    id: 'w-top-44',
    es: 'pocos / pocas',
    en: 'few',
    acceptedAnswers: ['few'],
    pron: 'fiú',
    category: 'top50',
    partOfSpeech: 'adjective',
    exampleEn: 'Only a few seats are left.',
    exampleEs: 'Solo quedan unos pocos asientos.'
  },
  {
    id: 'w-top-45',
    es: 'público',
    en: 'public',
    acceptedAnswers: ['public'],
    pron: 'pá-blik',
    category: 'top50',
    partOfSpeech: 'adjective',
    exampleEn: 'Public transport is very frequent in London.',
    exampleEs: 'El transporte público es muy frecuente en Londres.'
  },
  {
    id: 'w-top-46',
    es: 'mismo / misma',
    en: 'same',
    acceptedAnswers: ['same'],
    pron: 'séim',
    category: 'top50',
    partOfSpeech: 'adjective',
    exampleEn: 'Same to you, mate!',
    exampleEs: '¡Igualmente para ti, colega!'
  },
  {
    id: 'w-top-47',
    es: 'capaz',
    en: 'able',
    acceptedAnswers: ['able'],
    pron: 'éi-bol',
    category: 'top50',
    partOfSpeech: 'adjective',
    exampleEn: 'I will be able to help you tomorrow.',
    exampleEs: 'Podré ayudarte mañana.'
  },
  {
    id: 'w-top-48',
    es: 'seguro / cierta',
    en: 'sure',
    acceptedAnswers: ['sure'],
    pron: 'shór',
    category: 'top50',
    partOfSpeech: 'adjective',
    exampleEn: 'Are you sure about that?',
    exampleEs: '¿Estás seguro de eso?'
  },
  {
    id: 'w-top-49',
    es: 'posible',
    en: 'possible',
    acceptedAnswers: ['possible'],
    pron: 'pó-si-bol',
    category: 'top50',
    partOfSpeech: 'adjective',
    exampleEn: 'As soon as possible, please.',
    exampleEs: 'Lo antes posible, por favor.'
  },
  {
    id: 'w-top-50',
    es: 'dinero / pasta',
    en: 'money',
    acceptedAnswers: ['money', 'cash'],
    pron: 'má-ni',
    category: 'top50',
    partOfSpeech: 'noun',
    exampleEn: 'Do you have any cash on you?',
    exampleEs: '¿Llevas dinero suelto encima?'
  },

  // ==================== VERBOS CLAVE COTIDIANOS ====================
  {
    id: 'w-verb-1',
    es: 'conseguir / pillar / llegar (verbo multiusos)',
    en: 'get',
    acceptedAnswers: ['get', 'to get'],
    pron: 'guét',
    category: 'verbs',
    partOfSpeech: 'verb',
    exampleEn: 'Can I get a bottle of water, please?',
    exampleEs: '¿Me pones una botella de agua, por favor?'
  },
  {
    id: 'w-verb-2',
    es: 'hacer / fabricar',
    en: 'make',
    acceptedAnswers: ['make', 'to make'],
    pron: 'méik',
    category: 'verbs',
    partOfSpeech: 'verb',
    exampleEn: 'I need to make a phone call.',
    exampleEs: 'Tengo que hacer una llamada de teléfono.'
  },
  {
    id: 'w-verb-3',
    es: 'hacer (acciones/actividades)',
    en: 'do',
    acceptedAnswers: ['do', 'to do'],
    pron: 'dú',
    category: 'verbs',
    partOfSpeech: 'verb',
    exampleEn: 'What are you doing tonight?',
    exampleEs: '¿Qué haces esta noche?'
  },
  {
    id: 'w-verb-4',
    es: 'saber / conocer',
    en: 'know',
    acceptedAnswers: ['know', 'to know'],
    pron: 'nóu',
    category: 'verbs',
    partOfSpeech: 'verb',
    exampleEn: 'Do you know where the nearest chemist is?',
    exampleEs: '¿Sabes dónde está la farmacia más cercana?'
  },
  {
    id: 'w-verb-5',
    es: 'pensar / creer',
    en: 'think',
    acceptedAnswers: ['think', 'to think'],
    pron: 'zínk',
    category: 'verbs',
    partOfSpeech: 'verb',
    exampleEn: 'I think it is going to rain.',
    exampleEs: 'Creo que va a llover.'
  },
  {
    id: 'w-verb-6',
    es: 'tomar / coger / tardar',
    en: 'take',
    acceptedAnswers: ['take', 'to take'],
    pron: 'téik',
    category: 'verbs',
    partOfSpeech: 'verb',
    exampleEn: 'It takes 20 minutes on the tube.',
    exampleEs: 'Se tarda 20 minutos en el metro.'
  },
  {
    id: 'w-verb-7',
    es: 'ver',
    en: 'see',
    acceptedAnswers: ['see', 'to see'],
    pron: 'sí',
    category: 'verbs',
    partOfSpeech: 'verb',
    exampleEn: 'I see what you mean.',
    exampleEs: 'Ya veo lo que quieres decir.'
  },
  {
    id: 'w-verb-8',
    es: 'venir / llegar',
    en: 'come',
    acceptedAnswers: ['come', 'to come'],
    pron: 'kám',
    category: 'verbs',
    partOfSpeech: 'verb',
    exampleEn: 'Are you coming to the pub tonight?',
    exampleEs: '¿Vienes al pub esta noche?'
  },
  {
    id: 'w-verb-9',
    es: 'querer',
    en: 'want',
    acceptedAnswers: ['want', 'to want'],
    pron: 'uónt',
    category: 'verbs',
    partOfSpeech: 'verb',
    exampleEn: 'What do you want to drink?',
    exampleEs: '¿Qué quieres beber?'
  },
  {
    id: 'w-verb-10',
    es: 'mirar / parecer',
    en: 'look',
    acceptedAnswers: ['look', 'to look'],
    pron: 'lúk',
    category: 'verbs',
    partOfSpeech: 'verb',
    exampleEn: 'Look at the queue at the bus stop!',
    exampleEs: '¡Mira la cola en la parada de autobús!'
  },
  {
    id: 'w-verb-11',
    es: 'dar',
    en: 'give',
    acceptedAnswers: ['give', 'to give'],
    pron: 'guív',
    category: 'verbs',
    partOfSpeech: 'verb',
    exampleEn: 'Can you give me five minutes?',
    exampleEs: '¿Me das cinco minutos?'
  },
  {
    id: 'w-verb-12',
    es: 'decir / contar',
    en: 'tell',
    acceptedAnswers: ['tell', 'to tell'],
    pron: 'tél',
    category: 'verbs',
    partOfSpeech: 'verb',
    exampleEn: 'Tell me when you are ready.',
    exampleEs: 'Dime cuándo estés listo.'
  },
  {
    id: 'w-verb-13',
    es: 'preguntar / pedir',
    en: 'ask',
    acceptedAnswers: ['ask', 'to ask'],
    pron: 'ásk',
    category: 'verbs',
    partOfSpeech: 'verb',
    exampleEn: 'Ask the driver which stop to get off.',
    exampleEs: 'Pregúntale al conductor en qué parada bajarte.'
  },
  {
    id: 'w-verb-14',
    es: 'parecer',
    en: 'seem',
    acceptedAnswers: ['seem', 'to seem'],
    pron: 'sím',
    category: 'verbs',
    partOfSpeech: 'verb',
    exampleEn: 'He seems like a sound bloke.',
    exampleEs: 'Parece un buen tipo.'
  },
  {
    id: 'w-verb-15',
    es: 'sentir / encontrarse',
    en: 'feel',
    acceptedAnswers: ['feel', 'to feel'],
    pron: 'fíl',
    category: 'verbs',
    partOfSpeech: 'verb',
    exampleEn: 'I feel completely exhausted today.',
    exampleEs: 'Me siento completamente agotado hoy.'
  },
  {
    id: 'w-verb-16',
    es: 'intentar / probar',
    en: 'try',
    acceptedAnswers: ['try', 'to try'],
    pron: 'trái',
    category: 'verbs',
    partOfSpeech: 'verb',
    exampleEn: 'Let us try this new restaurant.',
    exampleEs: 'Probemos este nuevo restaurante.'
  },
  {
    id: 'w-verb-17',
    es: 'irse / dejar / salir',
    en: 'leave',
    acceptedAnswers: ['leave', 'to leave'],
    pron: 'lív',
    category: 'verbs',
    partOfSpeech: 'verb',
    exampleEn: 'What time are you leaving the flat?',
    exampleEs: '¿A qué hora sales del piso?'
  },
  {
    id: 'w-verb-18',
    es: 'significar / pretender',
    en: 'mean',
    acceptedAnswers: ['mean', 'to mean'],
    pron: 'míin',
    category: 'verbs',
    partOfSpeech: 'verb',
    exampleEn: 'What does this word mean in British English?',
    exampleEs: '¿Qué significa esta palabra en inglés británico?'
  },
  {
    id: 'w-verb-19',
    es: 'mantener / guardar',
    en: 'keep',
    acceptedAnswers: ['keep', 'to keep'],
    pron: 'kíip',
    category: 'verbs',
    partOfSpeech: 'verb',
    exampleEn: 'Keep the change, cheers mate!',
    exampleEs: '¡Quédate el cambio, gracias colega!'
  },
  {
    id: 'w-verb-20',
    es: 'dejar / permitir',
    en: 'let',
    acceptedAnswers: ['let', 'to let'],
    pron: 'lét',
    category: 'verbs',
    partOfSpeech: 'verb',
    exampleEn: 'Let me know when you arrive.',
    exampleEs: 'Avísame cuando llegues.'
  },
  {
    id: 'w-verb-21',
    es: 'ayudar',
    en: 'help',
    acceptedAnswers: ['help', 'to help'],
    pron: 'jélp',
    category: 'verbs',
    partOfSpeech: 'verb',
    exampleEn: 'Can I help you with those bags?',
    exampleEs: '¿Te ayudo con esas bolsas?'
  },
  {
    id: 'w-verb-22',
    es: 'hablar / charlar',
    en: 'talk',
    acceptedAnswers: ['talk', 'to talk', 'speak'],
    pron: 'tók',
    category: 'verbs',
    partOfSpeech: 'verb',
    exampleEn: 'We need to talk about the rent.',
    exampleEs: 'Tenemos que hablar sobre el alquiler.'
  },
  {
    id: 'w-verb-23',
    es: 'empezar',
    en: 'start',
    acceptedAnswers: ['start', 'to start', 'begin'],
    pron: 'stárt',
    category: 'verbs',
    partOfSpeech: 'verb',
    exampleEn: 'The film starts in ten minutes.',
    exampleEs: 'La película empieza en diez minutos.'
  },
  {
    id: 'w-verb-24',
    es: 'mostrar / enseñar',
    en: 'show',
    acceptedAnswers: ['show', 'to show'],
    pron: 'shóu',
    category: 'verbs',
    partOfSpeech: 'verb',
    exampleEn: 'Can you show me on Google Maps?',
    exampleEs: '¿Me lo puedes enseñar en Google Maps?'
  },
  {
    id: 'w-verb-25',
    es: 'oír / escuchar',
    en: 'hear',
    acceptedAnswers: ['hear', 'to hear'],
    pron: 'jíer',
    category: 'verbs',
    partOfSpeech: 'verb',
    exampleEn: 'I can hear the train coming.',
    exampleEs: 'Puedo oír venir el tren.'
  },
  {
    id: 'w-verb-26',
    es: 'entender / comprender',
    en: 'understand',
    acceptedAnswers: ['understand', 'to understand'],
    pron: 'an-der-stánd',
    category: 'verbs',
    partOfSpeech: 'verb',
    exampleEn: 'I understand what you are saying.',
    exampleEs: 'Entiendo lo que estás diciendo.'
  },
  {
    id: 'w-verb-27',
    es: 'creer',
    en: 'believe',
    acceptedAnswers: ['believe', 'to believe'],
    pron: 'bi-líiv',
    category: 'verbs',
    partOfSpeech: 'verb',
    exampleEn: 'I cannot believe how expensive this is!',
    exampleEs: '¡No me puedo creer lo caro que es esto!'
  },
  {
    id: 'w-verb-28',
    es: 'traer',
    en: 'bring',
    acceptedAnswers: ['bring', 'to bring'],
    pron: 'bríng',
    category: 'verbs',
    partOfSpeech: 'verb',
    exampleEn: 'Can you bring some milk home?',
    exampleEs: '¿Puedes traer algo de leche a casa?'
  },
  {
    id: 'w-verb-29',
    es: 'ocurrir / pasar',
    en: 'happen',
    acceptedAnswers: ['happen', 'to happen'],
    pron: 'já-pen',
    category: 'verbs',
    partOfSpeech: 'verb',
    exampleEn: 'What happened to the train?',
    exampleEs: '¿Qué le ha pasado al tren?'
  },
  {
    id: 'w-verb-30',
    es: 'pagar',
    en: 'pay',
    acceptedAnswers: ['pay', 'to pay'],
    pron: 'péi',
    category: 'verbs',
    partOfSpeech: 'verb',
    exampleEn: 'Can I pay contactless, please?',
    exampleEs: '¿Puedo pagar contactless, por favor?'
  },
  {
    id: 'w-verb-31',
    es: 'conocer / quedar con alguien',
    en: 'meet',
    acceptedAnswers: ['meet', 'to meet'],
    pron: 'míit',
    category: 'verbs',
    partOfSpeech: 'verb',
    exampleEn: 'Let us meet outside the station at seven.',
    exampleEs: 'Quedemos fuera de la estación a las siete.'
  },
  {
    id: 'w-verb-32',
    es: 'aprender',
    en: 'learn',
    acceptedAnswers: ['learn', 'to learn'],
    pron: 'lérn',
    category: 'verbs',
    partOfSpeech: 'verb',
    exampleEn: 'I am learning everyday British English.',
    exampleEs: 'Estoy aprendiendo inglés cotidiano británico.'
  },
  {
    id: 'w-verb-33',
    es: 'cambiar',
    en: 'change',
    acceptedAnswers: ['change', 'to change'],
    pron: 'chéiny',
    category: 'verbs',
    partOfSpeech: 'verb',
    exampleEn: 'You need to change trains at King\'s Cross.',
    exampleEs: 'Tienes que cambiar de tren en King\'s Cross.'
  },
  {
    id: 'w-verb-34',
    es: 'esperar',
    en: 'wait',
    acceptedAnswers: ['wait', 'to wait'],
    pron: 'uéit',
    category: 'verbs',
    partOfSpeech: 'verb',
    exampleEn: 'Wait for me at the entrance.',
    exampleEs: 'Espérame en la entrada.'
  },
  {
    id: 'w-verb-35',
    es: 'recordar / acordarse',
    en: 'remember',
    acceptedAnswers: ['remember', 'to remember'],
    pron: 'ri-mém-ber',
    category: 'verbs',
    partOfSpeech: 'verb',
    exampleEn: 'Remember to tap out with your Oyster card.',
    exampleEs: 'Acuérdate de pasar la tarjeta Oyster al salir.'
  },

  // ==================== CONCEPTOS IMPRESCINDIBLES (KNOWLEDGE, ETC.) ====================
  {
    id: 'w-core-1',
    es: 'conocimiento / saber',
    en: 'knowledge',
    acceptedAnswers: ['knowledge'],
    pron: 'nó-ledzh',
    category: 'core_concepts',
    partOfSpeech: 'noun',
    exampleEn: 'He has great knowledge of London streets.',
    exampleEs: 'Tiene un gran conocimiento de las calles de Londres.'
  },
  {
    id: 'w-core-2',
    es: 'experiencia',
    en: 'experience',
    acceptedAnswers: ['experience'],
    pron: 'ik-spí-riens',
    category: 'core_concepts',
    partOfSpeech: 'noun',
    exampleEn: 'Living in the UK is an amazing experience.',
    exampleEs: 'Vivir en Reino Unido es una experiencia increíble.'
  },
  {
    id: 'w-core-3',
    es: 'habilidad / destreza',
    en: 'skill',
    acceptedAnswers: ['skill'],
    pron: 'skíl',
    category: 'core_concepts',
    partOfSpeech: 'noun',
    exampleEn: 'Speaking English on the phone is a useful skill.',
    exampleEs: 'Hablar inglés por teléfono es una habilidad muy útil.'
  },
  {
    id: 'w-core-4',
    es: 'capacidad / aptitud',
    en: 'ability',
    acceptedAnswers: ['ability'],
    pron: 'a-bí-li-ti',
    category: 'core_concepts',
    partOfSpeech: 'noun',
    exampleEn: 'He has the ability to learn very fast.',
    exampleEs: 'Tiene la capacidad de aprender muy rápido.'
  },
  {
    id: 'w-core-5',
    es: 'propósito / finalidad',
    en: 'purpose',
    acceptedAnswers: ['purpose'],
    pron: 'pér-pos',
    category: 'core_concepts',
    partOfSpeech: 'noun',
    exampleEn: 'What is the purpose of this meeting?',
    exampleEs: '¿Cuál es el propósito de esta reunión?'
  },
  {
    id: 'w-core-6',
    es: 'comportamiento / conducta',
    en: 'behavior',
    acceptedAnswers: ['behavior', 'behaviour'],
    pron: 'bi-jéi-vior',
    category: 'core_concepts',
    partOfSpeech: 'noun',
    exampleEn: 'Good behavior is appreciated on the tube.',
    exampleEs: 'Se agradece el buen comportamiento en el metro.'
  },
  {
    id: 'w-core-7',
    es: 'relación / trato',
    en: 'relationship',
    acceptedAnswers: ['relationship'],
    pron: 'ri-léi-shon-ship',
    category: 'core_concepts',
    partOfSpeech: 'noun',
    exampleEn: 'I have a great relationship with my landlord.',
    exampleEs: 'Tengo una excelente relación con mi casero.'
  },
  {
    id: 'w-core-8',
    es: 'entorno / medio ambiente',
    en: 'environment',
    acceptedAnswers: ['environment'],
    pron: 'en-vái-ron-ment',
    category: 'core_concepts',
    partOfSpeech: 'noun',
    exampleEn: 'It is a friendly work environment.',
    exampleEs: 'Es un entorno de trabajo muy amigable.'
  },
  {
    id: 'w-core-9',
    es: 'éxito',
    en: 'success',
    acceptedAnswers: ['success'],
    pron: 'sak-sés',
    category: 'core_concepts',
    partOfSpeech: 'noun',
    exampleEn: 'The job interview was a complete success.',
    exampleEs: 'La entrevista de trabajo fue un éxito rotundo.'
  },
  {
    id: 'w-core-10',
    es: 'asunto / problema / tema',
    en: 'issue',
    acceptedAnswers: ['issue', 'problem'],
    pron: 'í-shu',
    category: 'core_concepts',
    partOfSpeech: 'noun',
    exampleEn: 'There is a minor issue with the hot water.',
    exampleEs: 'Hay un pequeño problema con el agua caliente.'
  },
  {
    id: 'w-core-11',
    es: 'elección / opción',
    en: 'choice',
    acceptedAnswers: ['choice'],
    pron: 'chóis',
    category: 'core_concepts',
    partOfSpeech: 'noun',
    exampleEn: 'You made the right choice, mate.',
    exampleEs: 'Tomaste la elección correcta, colega.'
  },
  {
    id: 'w-core-12',
    es: 'decisión',
    en: 'decision',
    acceptedAnswers: ['decision'],
    pron: 'di-sí-shon',
    category: 'core_concepts',
    partOfSpeech: 'noun',
    exampleEn: 'It was a tough decision to move abroad.',
    exampleEs: 'Fue una decisión difícil mudarse al extranjero.'
  },
  {
    id: 'w-core-13',
    es: 'consejo (incontable en inglés)',
    en: 'advice',
    acceptedAnswers: ['advice'],
    pron: 'ad-váis',
    category: 'core_concepts',
    partOfSpeech: 'noun',
    exampleEn: 'Can you give me a piece of advice?',
    exampleEs: '¿Me puedes dar un consejo?'
  },
  {
    id: 'w-core-14',
    es: 'oportunidad / probabilidad',
    en: 'chance',
    acceptedAnswers: ['chance', 'opportunity'],
    pron: 'cháns',
    category: 'core_concepts',
    partOfSpeech: 'noun',
    exampleEn: 'Is there any chance of getting a discount?',
    exampleEs: '¿Hay alguna posibilidad de conseguir descuento?'
  },
  {
    id: 'w-core-15',
    es: 'esfuerzo',
    en: 'effort',
    acceptedAnswers: ['effort'],
    pron: 'é-fort',
    category: 'core_concepts',
    partOfSpeech: 'noun',
    exampleEn: 'Learning the language requires daily effort.',
    exampleEs: 'Aprender el idioma requiere esfuerzo diario.'
  },
  {
    id: 'w-core-16',
    es: 'objetivo / meta',
    en: 'goal',
    acceptedAnswers: ['goal', 'target'],
    pron: 'góul',
    category: 'core_concepts',
    partOfSpeech: 'noun',
    exampleEn: 'My goal is to chat fluently with locals.',
    exampleEs: 'Mi objetivo es charlar con soltura con los locales.'
  },
  {
    id: 'w-core-17',
    es: 'error / equivocación',
    en: 'mistake',
    acceptedAnswers: ['mistake', 'error'],
    pron: 'mis-téik',
    category: 'core_concepts',
    partOfSpeech: 'noun',
    exampleEn: 'Do not worry, everyone makes mistakes.',
    exampleEs: 'No te preocupes, todo el mundo comete errores.'
  },
  {
    id: 'w-core-18',
    es: 'verdad',
    en: 'truth',
    acceptedAnswers: ['truth'],
    pron: 'trúuz',
    category: 'core_concepts',
    partOfSpeech: 'noun',
    exampleEn: 'To tell you the truth, I was quite nervous.',
    exampleEs: 'A decir verdad, estaba bastante nervioso.'
  },
  {
    id: 'w-core-19',
    es: 'duda',
    en: 'doubt',
    acceptedAnswers: ['doubt'],
    pron: 'dáut',
    category: 'core_concepts',
    partOfSpeech: 'noun',
    exampleEn: 'Without a doubt, London is a vibrant city.',
    exampleEs: 'Sin duda, Londres es una ciudad vibrante.'
  },
  {
    id: 'w-core-20',
    es: 'confianza (en alguien)',
    en: 'trust',
    acceptedAnswers: ['trust'],
    pron: 'trást',
    category: 'core_concepts',
    partOfSpeech: 'noun',
    exampleEn: 'Trust is essential between flatmates.',
    exampleEs: 'La confianza es esencial entre compañeros de piso.'
  },
  {
    id: 'w-core-21',
    es: 'seguridad en uno mismo',
    en: 'confidence',
    acceptedAnswers: ['confidence'],
    pron: 'kón-fi-dens',
    category: 'core_concepts',
    partOfSpeech: 'noun',
    exampleEn: 'Practice gives you confidence to speak.',
    exampleEs: 'La práctica te da seguridad para hablar.'
  },
  {
    id: 'w-core-22',
    es: 'reto / desafío',
    en: 'challenge',
    acceptedAnswers: ['challenge'],
    pron: 'chá-leny',
    category: 'core_concepts',
    partOfSpeech: 'noun',
    exampleEn: 'Understanding fast British accents is a challenge.',
    exampleEs: 'Entender los acentos británicos rápidos es un reto.'
  },
  {
    id: 'w-core-23',
    es: 'hábito / costumbre',
    en: 'habit',
    acceptedAnswers: ['habit'],
    pron: 'já-bit',
    category: 'core_concepts',
    partOfSpeech: 'noun',
    exampleEn: 'Drinking tea in the afternoon is a British habit.',
    exampleEs: 'Tomar té por la tarde es una costumbre británica.'
  },
  {
    id: 'w-core-24',
    es: 'mentalidad',
    en: 'mindset',
    acceptedAnswers: ['mindset'],
    pron: 'máind-set',
    category: 'core_concepts',
    partOfSpeech: 'noun',
    exampleEn: 'A positive mindset makes all the difference.',
    exampleEs: 'Una mentalidad positiva marca toda la diferencia.'
  },
  {
    id: 'w-core-25',
    es: 'salud',
    en: 'health',
    acceptedAnswers: ['health'],
    pron: 'jélz',
    category: 'core_concepts',
    partOfSpeech: 'noun',
    exampleEn: 'Register with the NHS for your health.',
    exampleEs: 'Regístrate en el NHS por tu salud.'
  },

  // ==================== CONECTORES Y PALABRAS DE ENLACE ====================
  {
    id: 'w-conn-1',
    es: 'aunque / a pesar de que',
    en: 'although',
    acceptedAnswers: ['although', 'even though', 'though'],
    pron: 'ol-dóu',
    category: 'connectors',
    partOfSpeech: 'connector',
    exampleEn: 'Although it was raining, we went for a walk.',
    exampleEs: 'Aunque llovía, fuimos a dar un paseo.'
  },
  {
    id: 'w-conn-2',
    es: 'sin embargo / no obstante',
    en: 'however',
    acceptedAnswers: ['however'],
    pron: 'jau-é-ver',
    category: 'connectors',
    partOfSpeech: 'connector',
    exampleEn: 'The flat is small. However, the location is perfect.',
    exampleEs: 'El piso es pequeño. Sin embargo, la ubicación es perfecta.'
  },
  {
    id: 'w-conn-3',
    es: 'en vez de / en lugar de',
    en: 'instead of',
    acceptedAnswers: ['instead of'],
    pron: 'in-stéd of',
    category: 'connectors',
    partOfSpeech: 'connector',
    exampleEn: 'Let us take the bus instead of the tube.',
    exampleEs: 'Cojamos el autobús en vez del metro.'
  },
  {
    id: 'w-conn-4',
    es: 'debido a / por culpa de',
    en: 'because of',
    acceptedAnswers: ['because of', 'due to'],
    pron: 'bi-kós of',
    category: 'connectors',
    partOfSpeech: 'connector',
    exampleEn: 'The train is delayed because of bad weather.',
    exampleEs: 'El tren va con retraso debido al mal tiempo.'
  },
  {
    id: 'w-conn-5',
    es: 'así como / además de',
    en: 'as well as',
    acceptedAnswers: ['as well as'],
    pron: 'as uél as',
    category: 'connectors',
    partOfSpeech: 'connector',
    exampleEn: 'I bought milk as well as some bread.',
    exampleEs: 'Compré leche además de algo de pan.'
  },

  // ==================== VIDA COTIDIANA EN UK ====================
  {
    id: 'w-uk-1',
    es: 'casero / propietario',
    en: 'landlord',
    acceptedAnswers: ['landlord', 'landlady'],
    pron: 'lánd-lord',
    category: 'uk_life',
    partOfSpeech: 'noun',
    exampleEn: 'I need to call the landlord about the heating.',
    exampleEs: 'Tengo que llamar al casero por la calefacción.'
  },
  {
    id: 'w-uk-2',
    es: 'factura / cuenta',
    en: 'bill',
    acceptedAnswers: ['bill'],
    pron: 'bíl',
    category: 'uk_life',
    partOfSpeech: 'noun',
    exampleEn: 'Are bills included in the monthly rent?',
    exampleEs: '¿Están las facturas incluidas en el alquiler mensual?'
  },
  {
    id: 'w-uk-3',
    es: 'fianza / depósito',
    en: 'deposit',
    acceptedAnswers: ['deposit'],
    pron: 'di-pó-sit',
    category: 'uk_life',
    partOfSpeech: 'noun',
    exampleEn: 'You will get your deposit back when you move out.',
    exampleEs: 'Te devolverán la fianza cuando te mudes.'
  },
  {
    id: 'w-uk-4',
    es: 'cola / hacer cola',
    en: 'queue',
    acceptedAnswers: ['queue'],
    pron: 'kiú',
    category: 'uk_life',
    partOfSpeech: 'noun',
    exampleEn: 'British people respect the queue.',
    exampleEs: 'Los británicos respetan la cola.'
  },
  {
    id: 'w-uk-5',
    es: 'grifo',
    en: 'tap',
    acceptedAnswers: ['tap'],
    pron: 'táp',
    category: 'uk_life',
    partOfSpeech: 'noun',
    exampleEn: 'Can I have a glass of tap water, please?',
    exampleEs: '¿Me puedes poner un vaso de agua del grifo, por favor?'
  }
];
