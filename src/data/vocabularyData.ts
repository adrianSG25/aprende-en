import { VocabItem, Exercise } from '../types';

export const VOCABULARY_ITEMS: VocabItem[] = [
  // ==================== CONFUSING WORDS & FALSE FRIENDS ====================
  {
    id: 'voc-sensible-sensitive',
    level: 'A2+',
    category: 'confusing_words',
    term: 'Sensible vs. Sensitive',
    meaningEs: 'Sensible = Sensato/Prudente | Sensitive = Sensible/Susceptible',
    contextExample: 'Wearing a helmet is a sensible decision. / Don\'t tease him; he\'s very sensitive.',
    contextTranslation: 'Llevar casco es una decisión sensata. / No te burles de él; es muy sensible.',
    commonMistake: 'Decir "She is very sensible" queriendo decir que llora fácilmente (eso es "sensitive").'
  },
  {
    id: 'voc-actually-currently',
    level: 'A2+',
    category: 'confusing_words',
    term: 'Actually vs. Currently / Nowadays',
    meaningEs: 'Actually = En realidad / De hecho | Currently = Actualmente / Hoy en día',
    contextExample: 'People think he\'s British, but he\'s actually Australian. She is currently working in Berlin.',
    contextTranslation: 'La gente cree que es británico, pero en realidad es australiano. Actualmente trabaja en Berlín.',
    commonMistake: 'Usar "actually" para decir "actualmente".'
  },
  {
    id: 'voc-remember-remind',
    level: 'B1',
    category: 'confusing_words',
    term: 'Remember vs. Remind',
    meaningEs: 'Remember = Acordarse uno mismo | Remind = Recordarle algo a alguien / Hacer pensar en',
    contextExample: 'I can\'t remember his name. Please remind me to call the bank. You remind me of my cousin.',
    contextTranslation: 'No recuerdo su nombre. Por favor, recuérdame llamar al banco. Me recuerdas a mi primo.',
    commonMistake: 'Decir "Remember me to call you" ❌ -> Siempre es "Remind me to call you" ✅.'
  },
  {
    id: 'voc-win-earn-gain',
    level: 'B1',
    category: 'confusing_words',
    term: 'Win vs. Earn vs. Gain',
    meaningEs: 'Win (un premio/partido/lotería) | Earn (un sueldo trabajando) | Gain (experiencia, peso, velocidad, tiempo)',
    contextExample: 'She earns a good salary and has gained valuable experience in the sector.',
    contextTranslation: 'Gana un buen sueldo y ha adquirido una valiosa experiencia en el sector.',
    commonMistake: 'Decir "win money at work" ❌ -> "earn money / earn a living" ✅.'
  },
  {
    id: 'voc-raise-rise',
    level: 'B1+',
    category: 'confusing_words',
    term: 'Raise vs. Rise',
    meaningEs: 'Raise (+ objeto) = Levantar/Subir algo (regular: raised) | Rise (sin objeto) = Subir por sí solo (irregular: rose, risen)',
    contextExample: 'The landlord raised the rent again. / Unemployment has risen by 2% this year.',
    contextTranslation: 'El casero subió el alquiler otra vez. / El paro ha subido un 2% este año.',
    commonMistake: 'Si detrás hay un objeto directo ("the prices", "your hand", "taxes"), usa SIEMPRE RAISE.'
  },

  // ==================== COLLOCATIONS (MAKE vs DO & B2 ADVERBS) ====================
  {
    id: 'voc-make-vs-do',
    level: 'B1',
    category: 'collocations',
    term: 'Make vs. Do (Casos de Examen)',
    meaningEs: 'MAKE: a mistake, an effort, progress, a decision, a complaint, an excuse, money, a noise, up your mind | DO: business, a favour, harm, research, your best, damage, a degree/course',
    contextExample: 'You have made great progress this term because you always do your best.',
    contextTranslation: 'Has hecho un gran progreso este trimestre porque siempre das lo mejor de ti.',
    commonMistake: 'Ojo: "Make an effort" (con make), pero "Do research / Do business / Do harm" (con do).'
  },
  {
    id: 'voc-b2-adverb-collocations',
    level: 'B2',
    category: 'collocations',
    term: 'Bitterly / Utterly / Highly / Deeply',
    meaningEs: 'Bitterly (cold, disappointed, regret) | Utterly (impossible, ridiculous, exhausted) | Highly (likely, recommended, qualified) | Deeply (concerned, ashamed, grateful)',
    contextExample: 'We were bitterly disappointed when the concert was cancelled at the last minute.',
    contextTranslation: 'Nos sentimos amargamente decepcionados cuando el concierto se canceló a última hora.',
    commonMistake: 'Usar "very" para todo en vez de colocaciones de nivel B2.'
  },

  // ==================== DEPENDENT PREPOSITIONS ====================
  {
    id: 'voc-prep-depend-rely',
    level: 'B1',
    category: 'prepositions',
    term: 'Depend ON / Rely ON / Count ON / Insist ON',
    meaningEs: 'Depender de / Confiar en / Contar con / Insistir en (+ -ing)',
    contextExample: 'It depends on the weather. She insisted on paying for everyone\'s dinner.',
    contextTranslation: 'Depende del tiempo. Ella insistió en pagar la cena de todos.',
    commonMistake: 'Decir "It depends of" ❌ -> En inglés SIEMPRE es "depend ON" ✅.'
  },
  {
    id: 'voc-prep-succeed-consist',
    level: 'B1+',
    category: 'prepositions',
    term: 'Succeed IN (+ -ing) / Consist OF / Approve OF / Accuse OF',
    meaningEs: 'Tener éxito en (lograr) / Consistir en / Aprobar / Acusar de',
    contextExample: 'After months of trying, she finally succeeded in passing the driving test.',
    contextTranslation: 'Tras meses intentándolo, por fin logró aprobar el examen de conducir.',
    commonMistake: 'Decir "succeed to pass" ❌ -> Es obligatorio "succeed IN + V-ing" ✅. Y "consist OF" (no "consist in").'
  },
  {
    id: 'voc-prep-apologize-blame',
    level: 'B1+',
    category: 'prepositions',
    term: 'Apologize (to sb) FOR / Blame (sb) FOR / Forgive (sb) FOR / Criticize FOR',
    meaningEs: 'Pedir disculpas por / Culpar por / Perdonar por / Criticar por (+ -ing)',
    contextExample: 'He apologized to me for arriving so late. Don\'t blame me for making that mistake!',
    contextTranslation: 'Me pidió disculpas por llegar tan tarde. ¡No me culpes por cometer ese error!'
  },
  {
    id: 'voc-prep-capable-aware',
    level: 'B2',
    category: 'prepositions',
    term: 'Capable OF / Aware OF / Envious OF / Fed up WITH / Accustomed TO (+ -ing)',
    meaningEs: 'Capaz de / Consciente de / Envidioso de / Harto de / Acostumbrado a',
    contextExample: 'Are you aware of the risks? I\'m fed up with waiting for the bus every day.',
    contextTranslation: '¿Eres consciente de los riesgos? Estoy harto de esperar el autobús todos los días.'
  },

  // ==================== CONNECTORS & LINKERS ====================
  {
    id: 'voc-conn-despite-although',
    level: 'B1+',
    category: 'connectors',
    term: 'Although / Even though vs. Despite / In spite of',
    meaningEs: 'Although / Even though + Sujeto + Verbo | Despite / In spite of + Sustantivo / V-ing / "the fact that + S + V"',
    contextExample: 'Although it was raining heavily, we went out. = Despite the heavy rain / Despite raining heavily, we went out.',
    contextTranslation: 'Aunque llovía fuerte, salimos. = A pesar de la fuerte lluvia, salimos.',
    commonMistake: '¡Error crítico!: "Despite of" ❌ NO EXISTE (o pones "Despite" sin of, o "In spite of" con of).'
  },
  {
    id: 'voc-conn-due-to-owing-to',
    level: 'B2',
    category: 'connectors',
    term: 'Because / Since / As vs. Due to / Owing to / Because of',
    meaningEs: 'Because/Since/As + Sujeto + Verbo | Due to / Owing to / Because of + Sustantivo (o "the fact that")',
    contextExample: 'The match was delayed owing to the bad weather (= because the weather was bad).',
    contextTranslation: 'El partido se retrasó debido al mal tiempo.',
    commonMistake: 'Poner una frase completa con verbo detrás de "due to" sin añadir "the fact that".'
  },
  {
    id: 'voc-conn-nevertheless-whereas',
    level: 'B2+',
    category: 'connectors',
    term: 'Nevertheless / Nonetheless / Whereas / Furthermore',
    meaningEs: 'Nevertheless = No obstante / Sin embargo | Whereas = Mientras que (contraste) | Furthermore / Moreover = Además',
    contextExample: 'The plan was risky; nevertheless, it succeeded. He loves city life, whereas his wife prefers the countryside.',
    contextTranslation: 'El plan era arriesgado; no obstante, tuvo éxito. A él le encanta la ciudad, mientras que su mujer prefiere el campo.'
  },

  // ==================== WORD FORMATION FAMILIES ====================
  {
    id: 'voc-wf-rely',
    level: 'B1+',
    category: 'word_formation',
    term: 'RELY (Familia de palabras)',
    meaningEs: 'Confiar -> Fiabilidad, Fiable, Poco fiable',
    contextExample: 'Public transport here is completely unreliable; you can never rely on it.',
    contextTranslation: 'El transporte público aquí es totalmente poco fiable; nunca puedes confiar en él.',
    rootFamily: {
      verb: 'rely',
      noun: 'reliability',
      adjective: 'reliable',
      negative: 'unreliable',
      adverb: 'reliably'
    }
  },
  {
    id: 'voc-wf-fortune',
    level: 'B1+',
    category: 'word_formation',
    term: 'FORTUNE (Familia de palabras)',
    meaningEs: 'Fortuna/Suerte -> Afortunado, Desafortunadamente',
    contextExample: 'Unfortunately, we missed the last train home.',
    contextTranslation: 'Desafortunadamente, perdimos el último tren a casa.',
    rootFamily: {
      noun: 'fortune / misfortune',
      adjective: 'fortunate',
      negative: 'unfortunate',
      adverb: 'fortunately / unfortunately'
    }
  },
  {
    id: 'voc-wf-doubt',
    level: 'B2',
    category: 'word_formation',
    term: 'DOUBT (Familia de palabras)',
    meaningEs: 'Duda -> Indudablemente, Dudoso',
    contextExample: 'She is undoubtedly the best candidate for the role.',
    contextTranslation: 'Ella es indudablemente la mejor candidata para el puesto.',
    rootFamily: {
      noun: 'doubt',
      verb: 'doubt',
      adjective: 'doubtful',
      negative: 'undoubted',
      adverb: 'undoubtedly / doubtless'
    }
  },
  {
    id: 'voc-wf-Compare',
    level: 'B2',
    category: 'word_formation',
    term: 'COMPARE (Familia de palabras)',
    meaningEs: 'Comparar -> Comparación, Comparativamente, Incomparable',
    contextExample: 'Living costs here are comparatively low compared to London.',
    contextTranslation: 'El coste de vida aquí es comparativamente bajo en comparación con Londres.',
    rootFamily: {
      verb: 'compare',
      noun: 'comparison',
      adjective: 'comparable / comparative',
      negative: 'incomparable',
      adverb: 'comparatively'
    }
  },
  {
    id: 'voc-wf-expect',
    level: 'B2+',
    category: 'word_formation',
    term: 'EXPECT (Familia de palabras)',
    meaningEs: 'Esperar -> Expectativa, Inesperado, Inesperadamente',
    contextExample: 'His resignation came completely unexpectedly to everyone in the office.',
    contextTranslation: 'Su dimisión llegó de forma totalmente inesperada para todos en la oficina.',
    rootFamily: {
      verb: 'expect',
      noun: 'expectation / life expectancy',
      adjective: 'expected',
      negative: 'unexpected',
      adverb: 'unexpectedly'
    }
  }
];

export const CURATED_VOCAB_EXERCISES: Exercise[] = [
  {
    id: 'voc-ex-1',
    level: 'A2+',
    category: 'vocabulary',
    topicLabel: 'Remember vs Remind',
    type: 'error_correction',
    prompt: 'Corrige el error léxico en esta frase:',
    baseSentence: 'Please remember me to send the invoice before Friday.',
    errorWord: 'remember me',
    acceptedAnswers: [
      'Please remind me to send the invoice before Friday.',
      'remind me'
    ],
    explanation: '"Remember" es acordarse uno mismo; para pedir que otra persona te recuerde hacer algo se usa siempre "remind someone to do something".',
    grammarRule: 'remind + person + to infinitive'
  },
  {
    id: 'voc-ex-2',
    level: 'B1',
    category: 'prepositions',
    topicLabel: 'Dependent Prepositions (Depend / Consist)',
    type: 'error_correction',
    prompt: 'Corrige el error de preposición típico de hispanohablantes:',
    baseSentence: 'Whether we have the barbecue outside or not depends of the weather.',
    errorWord: 'depends of',
    acceptedAnswers: [
      'Whether we have the barbecue outside or not depends on the weather.',
      'depends on'
    ],
    explanation: '"Depender de" en inglés SIEMPRE lleva la preposición ON: "depend on" (jamás "depend of").',
    grammarRule: 'depend ON / rely ON / count ON'
  },
  {
    id: 'voc-ex-3',
    level: 'B1+',
    category: 'connectors',
    topicLabel: 'Although vs Despite / In spite of',
    type: 'transformation',
    prompt: 'Transforma usando DESPITE (entre 2 y 5 palabras):',
    baseSentence: 'Although he had very little experience, he got the job.',
    keyWord: 'DESPITE',
    spanishHint: 'He got the job ___ very little experience.',
    acceptedAnswers: [
      'despite having',
      'despite his',
      'despite the fact he had'
    ],
    explanation: '"Despite" va seguido de gerundio (-ing) o sustantivo, y NUNCA lleva "of" detrás ("despite having very little experience").',
    grammarRule: 'Despite + V-ing / Noun (sin "of")'
  },
  {
    id: 'voc-ex-4',
    level: 'B1+',
    category: 'prepositions',
    topicLabel: 'Succeed in + -ing',
    type: 'transformation',
    prompt: 'Transforma usando el verbo SUCCEED y su preposición correcta:',
    baseSentence: 'After hours of negotiation, they finally managed to reach an agreement.',
    keyWord: 'SUCCEEDED',
    spanishHint: 'After hours of negotiation, they finally ___ an agreement.',
    acceptedAnswers: [
      'succeeded in reaching'
    ],
    explanation: '"Manage to do" equivale a "succeed IN doing something" (con la preposición IN + gerundio -ing).',
    grammarRule: 'manage to V = succeed IN + V-ing'
  },
  {
    id: 'voc-ex-5',
    level: 'B1+',
    category: 'word_formation',
    topicLabel: 'Word Formation: RELY',
    type: 'word_formation',
    prompt: 'Transforma la palabra en mayúsculas para que encaje gramatical y semánticamente en el hueco:',
    baseSentence: 'I wouldn\'t buy a second-hand car from him; he is completely ___.',
    keyWord: 'RELY',
    spanishHint: 'No le compraría un coche de segunda mano; es completamente poco fiable.',
    acceptedAnswers: [
      'unreliable'
    ],
    explanation: 'Necesitamos un adjetivo detrás de "is completely", y por el contexto negativo ("I wouldn\'t buy...") añadimos el prefijo negativo UN- y el sufijo adjetival -ABLE: "unreliable".',
    grammarRule: 'RELY -> reliable (adj) -> unreliable (negative adj)'
  },
  {
    id: 'voc-ex-6',
    level: 'B2',
    category: 'word_formation',
    topicLabel: 'Word Formation: DOUBT',
    type: 'word_formation',
    prompt: 'Transforma la palabra raíz para completar el hueco:',
    baseSentence: 'Winning the championship was ___ the proudest moment of her career.',
    keyWord: 'DOUBT',
    spanishHint: 'Ganar el campeonato fue indudablemente el momento de mayor orgullo de su carrera.',
    acceptedAnswers: [
      'undoubtedly',
      'doubtless'
    ],
    explanation: 'Para modificar toda la cláusula o el superlativo ("the proudest moment"), necesitamos un adverbio negativo ("sin duda"): UN- + DOUBT + -ED + -LY = "undoubtedly".',
    grammarRule: 'DOUBT -> undoubted -> undoubtedly (adverb)'
  },
  {
    id: 'voc-ex-7',
    level: 'B2',
    category: 'word_formation',
    topicLabel: 'Word Formation: FORTUNE',
    type: 'word_formation',
    prompt: 'Transforma la palabra raíz para completar el hueco:',
    baseSentence: '___, by the time the firefighters arrived, the warehouse had burned down.',
    keyWord: 'FORTUNE',
    spanishHint: 'Desafortunadamente, para cuando llegaron los bomberos, el almacén se había quemado.',
    acceptedAnswers: [
      'unfortunately'
    ],
    explanation: 'Al principio de la frase seguido de coma necesitamos un adverbio de actitud, y por el contexto ("burned down") debe ser negativo: "Unfortunately".',
    grammarRule: 'FORTUNE -> fortunate -> unfortunate -> unfortunately'
  },
  {
    id: 'voc-ex-8',
    level: 'B2+',
    category: 'word_formation',
    topicLabel: 'Word Formation: EXPECT',
    type: 'word_formation',
    prompt: 'Transforma la palabra raíz para completar el hueco:',
    baseSentence: 'Due to advances in medicine, life ___ has increased significantly over the last century.',
    keyWord: 'EXPECT',
    spanishHint: 'Debido a los avances en medicina, la esperanza de vida ha aumentado significativamente.',
    acceptedAnswers: [
      'expectancy'
    ],
    explanation: 'La colocación fija en inglés para "esperanza de vida" es "life expectancy" (no "life expectation").',
    grammarRule: 'life expectancy = esperanza de vida'
  }
];
