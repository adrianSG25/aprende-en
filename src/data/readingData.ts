import { ReadingStory } from '../types';

export const READING_STORIES: ReadingStory[] = [
  {
    id: 'story-a2p-train',
    level: 'A2+',
    title: 'The Wrong Platform in Edinburgh',
    genre: 'Historia Narrativa / Viajes',
    readingTimeMin: 3,
    grammarFocus: ['Past Simple vs. Past Continuous', 'Present Perfect (already / yet / still)', 'Phrasal Verbs de viaje'],
    paragraphs: [
      'Last October, Daniel travelled to Scotland for a weekend break. While he was waiting for his train at Waverley Station, he realized that his phone battery was about to run out. He had already checked his ticket twice, or so he thought.',
      'As the train was pulling into the station, a loud announcement came over the speakers, but Daniel wasn\'t paying attention because he was looking for his charger at the bottom of his backpack. Without thinking twice, he jumped onto the carriage just before the doors closed.',
      'Ten minutes later, when the ticket inspector asked to see his ticket, Daniel found out that he had got on the express train to Inverness instead of Glasgow! "You don\'t have to pay a fine," the inspector said kindly, "but you had better get off at the next stop, or you will end up in the Highlands tonight."'
    ],
    annotations: [
      {
        phrase: 'While he was waiting',
        type: 'grammar',
        label: 'Past Continuous (A2+)',
        explanationEs: 'Acción larga en progreso en el pasado ("estaba esperando") que sirve de marco temporal antes de "he realized" (Past Simple).'
      },
      {
        phrase: 'run out',
        type: 'phrasal_verb',
        label: 'Phrasal Verb: run out',
        explanationEs: 'Agotarse o quedarse sin batería/tiempo/existencias.'
      },
      {
        phrase: 'wasn\'t paying attention',
        type: 'grammar',
        label: 'Past Continuous Negative',
        explanationEs: 'Explica la acción en progreso en ese momento exacto del pasado.'
      },
      {
        phrase: 'found out',
        type: 'phrasal_verb',
        label: 'Phrasal Verb: find out',
        explanationEs: 'Enterarse de o descubrir una información que desconocías.'
      },
      {
        phrase: 'don\'t have to pay',
        type: 'grammar',
        label: 'Modal: Ausencia de obligación',
        explanationEs: 'Significa "no es necesario que pagues" (a diferencia de "mustn\'t", que es prohibición).'
      },
      {
        phrase: 'had better get off',
        type: 'grammar',
        label: 'Estructura: had better + infinitivo',
        explanationEs: 'Significa "más te vale bajarte" (consejo fuerte con advertencia). Lleva el verbo en infinitivo sin "to".'
      }
    ],
    questions: [
      {
        id: 'sq-a2p-1',
        kind: 'grammar_analysis',
        question: 'ANÁLISIS GRAMATICAL (Párrafo 1): En la frase "While he was waiting..., he realized...", ¿por qué se usa "was waiting" en continuo y "realized" en simple?',
        inputMode: 'choice',
        options: [
          'Porque "waiting" era la acción larga en progreso y "realized" la acción corta que ocurrió en medio (además "realize" es stative verb).',
          'Porque después de "While" siempre es obligatorio poner todos los verbos de la frase en gerundio.',
          'Porque ambas acciones ocurrieron en días distintos.'
        ],
        acceptedAnswers: [
          'Porque "waiting" era la acción larga en progreso y "realized" la acción corta que ocurrió en medio (además "realize" es stative verb).'
        ],
        explanation: 'En narraciones en pasado, el Past Continuous marca la acción en curso ("was waiting") y el Past Simple marca el suceso puntual ("realized").',
        quoteFromText: 'While he was waiting for his train at Waverley Station, he realized...'
      },
      {
        id: 'sq-a2p-2',
        kind: 'vocabulary_hunt',
        question: 'CAZA EN EL TEXTO (Párrafo 3): Escribe el Phrasal Verb de dos palabras que usa el texto para decir "enterarse / descubrir la verdad":',
        inputMode: 'text',
        acceptedAnswers: ['found out', 'find out'],
        explanation: 'En el párrafo 3 dice: "Daniel found out that he had got on the express train...".',
        quoteFromText: 'Daniel found out that he had got on the express train...'
      },
      {
        id: 'sq-a2p-3',
        kind: 'grammar_analysis',
        question: 'ANÁLISIS GRAMATICAL (Párrafo 3): El revisor dice "you had better get off". ¿Qué significa "had better" aquí y qué forma verbal lleva detrás?',
        inputMode: 'choice',
        options: [
          'Significa "más te vale" (advertencia) y va seguido de infinitivo sin "to" (get off).',
          'Es un Past Perfect normal que habla del día anterior.',
          'Es un comparativo que significa "era mejor antes".'
        ],
        acceptedAnswers: [
          'Significa "más te vale" (advertencia) y va seguido de infinitivo sin "to" (get off).'
        ],
        explanation: '"Had better + bare infinitive" se usa para dar recomendaciones fuertes en presente/futuro.',
        quoteFromText: 'but you had better get off at the next stop'
      },
      {
        id: 'sq-a2p-4',
        kind: 'transformation',
        question: 'TRANSFORMACIÓN DEL TEXTO: Reescribe "You don\'t have to pay a fine" usando la palabra NEED (2 a 4 palabras): You ___ pay a fine.',
        inputMode: 'text',
        acceptedAnswers: ['do not need to', 'don\'t need to', 'need not', 'needn\'t'],
        explanation: '"Don\'t have to" equivale exactamente a "don\'t need to" o "needn\'t" (sin to).'
      }
    ]
  },

  {
    id: 'story-b1-remote-work',
    level: 'B1',
    title: 'Leaving the Nine-to-Five Behind',
    genre: 'Artículo de Experiencia / Estilo de Vida',
    readingTimeMin: 4,
    grammarFocus: ['Used to vs. Be/Get used to + -ing', 'Present Perfect vs. Past Simple', 'Second Conditional'],
    paragraphs: [
      'Three years ago, Sofia used to spend nearly two hours every day commuting to a crowded office in central Madrid. By the time she got home in the evening, she was always too exhausted to cook or do any exercise.',
      'When her company offered employees the chance to work remotely, she didn\'t hesitate to apply. However, the transition wasn\'t as easy as she had expected. "At first, I wasn\'t used to working on my own all day without chatting to colleagues," she admits. "It took me a couple of months to get used to organizing my own schedule without a manager looking over my shoulder."',
      'Now that she has lived in a quiet coastal town for two years, she says she would never go back to her old routine. "Unless they offered me double my current salary, I wouldn\'t return to a traditional office," she laughs.'
    ],
    annotations: [
      {
        phrase: 'used to spend',
        type: 'grammar',
        label: 'Hábito pasado: used to + infinitivo',
        explanationEs: 'Expresa una rutina del pasado que ya no ocurre en el presente.'
      },
      {
        phrase: 'By the time she got home',
        type: 'connector',
        label: 'Conector temporal: By the time',
        explanationEs: 'Significa "Para cuando..." y conecta dos puntos temporales en el pasado.'
      },
      {
        phrase: 'wasn\'t used to working',
        type: 'grammar',
        label: 'Be used to + V-ing (B1)',
        explanationEs: '¡Fíjate en la -ING! Con el verbo To Be delante significa "no estaba acostumbrada a trabajar".'
      },
      {
        phrase: 'get used to organizing',
        type: 'grammar',
        label: 'Get used to + V-ing (B1)',
        explanationEs: 'El proceso de acostumbrarse a algo -> siempre seguido de gerundio (-ing).'
      },
      {
        phrase: 'Unless they offered me',
        type: 'grammar',
        label: '2nd Conditional con Unless',
        explanationEs: '"Unless" (= If... not) + Past Simple ("offered") para una condición hipotética en presente/futuro.'
      }
    ],
    questions: [
      {
        id: 'sq-b1-1',
        kind: 'grammar_analysis',
        question: 'ANÁLISIS GRAMATICAL (Párrafo 1 vs Párrafo 2): ¿Por qué en el párrafo 1 dice "used to spend" (infinitivo) y en el párrafo 2 dice "wasn\'t used to working" (-ing)?',
        inputMode: 'choice',
        options: [
          'Porque "used to + infinitivo" es "solía hacer algo", mientras que "be/get used to + -ing" significa "estar/acostumbrarse a algo" y ahí "to" es preposición.',
          'Porque "spend" no tiene forma en -ing en inglés.',
          'Porque en el segundo párrafo es Present Continuous.'
        ],
        acceptedAnswers: [
          'Porque "used to + infinitivo" es "solía hacer algo", mientras que "be/get used to + -ing" significa "estar/acostumbrarse a algo" y ahí "to" es preposición.'
        ],
        explanation: 'Esta distinción es clave en B1/B2: "I used to work" (antes trabajaba) vs "I am used to working" (estoy acostumbrado a trabajar).',
        quoteFromText: 'At first, I wasn\'t used to working on my own all day'
      },
      {
        id: 'sq-b1-2',
        kind: 'transformation',
        question: 'TRANSFORMACIÓN DEL TEXTO (Párrafo 2): "The transition wasn\'t as easy as she had expected." -> Reescríbelo empezando por: The transition was ___ she had expected. (Usa THAN)',
        inputMode: 'text',
        acceptedAnswers: [
          'harder than',
          'more difficult than'
        ],
        explanation: '"Wasn\'t as easy as" (no fue tan fácil como) equivale al comparativo "was harder / more difficult than".'
      },
      {
        id: 'sq-b1-3',
        kind: 'transformation',
        question: 'TRANSFORMACIÓN DEL TEXTO (Párrafo 3): "Unless they offered me double my salary, I wouldn\'t return." -> Transforma usando IF: If they ___ double my salary, I wouldn\'t return.',
        inputMode: 'text',
        acceptedAnswers: [
          'did not offer me',
          'didn\'t offer me'
        ],
        explanation: '"Unless they offered me" equivale en 2º Condicional a "If they didn\'t offer me".'
      }
    ]
  },

  {
    id: 'story-b1p-heist',
    level: 'B1+',
    title: 'The Painting That Vanished in Broad Daylight',
    genre: 'Misterio / Crónica Policial',
    readingTimeMin: 4,
    grammarFocus: ['Past Perfect Continuous', 'Passive Voice', 'Third Conditional', 'Phrasal Verbs de investigación'],
    paragraphs: [
      'For over six months, security guards at the National Gallery had been complaining about a faulty camera in the East Wing, yet management kept putting off having the system repaired. Nobody imagined that a thief would take advantage of that exact blind spot.',
      'Last Thursday afternoon, a small Renaissance portrait was stolen while dozens of tourists were visiting the exhibition. By the time the alarm went off, the suspect had already walked out of the main entrance disguised as a maintenance worker.',
      '"If the gallery had had the cameras fixed last month, the thief wouldn\'t have got away with it so easily," detective Miller told reporters. Despite reviewing hours of footage from nearby streets, the police still haven\'t figured out how the suspect managed to bypass the laser sensors.'
    ],
    annotations: [
      {
        phrase: 'had been complaining',
        type: 'grammar',
        label: 'Past Perfect Continuous (B1+)',
        explanationEs: 'Acción que llevaba ocurriendo durante un periodo ("For over six months") antes del robo en el pasado.'
      },
      {
        phrase: 'putting off',
        type: 'phrasal_verb',
        label: 'Phrasal Verb: put off (+ -ing)',
        explanationEs: 'Posponer o aplazar algo. Nota cómo va seguido del gerundio "having".'
      },
      {
        phrase: 'having the system repaired',
        type: 'grammar',
        label: 'Causative: have something done (B1+)',
        explanationEs: 'Encargar que reparen el sistema (have + the system + repaired).'
      },
      {
        phrase: 'got away with it',
        type: 'phrasal_verb',
        label: 'Phrasal Verb: get away with',
        explanationEs: 'Salirse con la suya sin ser atrapado.'
      },
      {
        phrase: 'Despite reviewing',
        type: 'connector',
        label: 'Conector: Despite + V-ing',
        explanationEs: '"A pesar de revisar...". Recuerda que "Despite" nunca lleva "of" y va seguido de -ing o sustantivo.'
      },
      {
        phrase: 'figured out',
        type: 'phrasal_verb',
        label: 'Phrasal Verb: figure out',
        explanationEs: 'Descifrar o resolver cómo ocurrió algo.'
      }
    ],
    questions: [
      {
        id: 'sq-b1p-1',
        kind: 'grammar_analysis',
        question: 'ANÁLISIS GRAMATICAL (Párrafo 1): En "management kept putting off having the system repaired", hay DOS reglas gramaticales encadenadas. ¿Cuáles son?',
        inputMode: 'choice',
        options: [
          '1) Tras "put off" el verbo va en -ing (having), y 2) "have the system repaired" es un Causativo (encargar una reparación a terceros).',
          '1) Es un Present Perfect Continuous y 2) una oración condicional.',
          '1) Es voz pasiva impersonal y 2) un verbo modal de deducción.'
        ],
        acceptedAnswers: [
          '1) Tras "put off" el verbo va en -ing (having), y 2) "have the system repaired" es un Causativo (encargar una reparación a terceros).'
        ],
        explanation: 'Es una combinación brillante de B1+/B2: Phrasal verb "put off" + gerundio "having" + Causative "the system repaired".',
        quoteFromText: 'management kept putting off having the system repaired'
      },
      {
        id: 'sq-b1p-2',
        kind: 'vocabulary_hunt',
        question: 'CAZA EN EL TEXTO (Párrafo 3): Escribe el Phrasal Verb de 3 palabras que significa "salirse con la suya / escapar sin castigo" (escríbelo en infinitivo, ej. "put up with"):',
        inputMode: 'text',
        acceptedAnswers: ['get away with', 'got away with'],
        explanation: 'En el texto aparece como "wouldn\'t have got away with it" -> infinitivo: "get away with".'
      },
      {
        id: 'sq-b1p-3',
        kind: 'transformation',
        question: 'TRANSFORMACIÓN DEL TEXTO (Párrafo 3): "Despite reviewing hours of footage, the police haven\'t figured it out." -> Transforma usando ALTHOUGH: Although the police ___ hours of footage, they haven\'t figured it out.',
        inputMode: 'text',
        acceptedAnswers: [
          'have reviewed',
          'reviewed'
        ],
        explanation: 'Mientras que "Despite" lleva -ing ("Despite reviewing"), "Although" exige Sujeto + Verbo conjugado ("Although the police reviewed / have reviewed").'
      }
    ]
  },

  {
    id: 'story-b2-algorithm',
    level: 'B2',
    title: 'When the Algorithm Knows You Better Than Yourself',
    genre: 'Ensayo de Opinión / Tecnología',
    readingTimeMin: 5,
    grammarFocus: ['Modals in the Past (must have / can\'t have)', 'Wish / If only', 'Gerund vs. Infinitive', 'B2 Phrasal Verbs'],
    paragraphs: [
      'Have you ever talked about a specific holiday destination over dinner, only to see adverts for flights to that exact city pop up on your screen ten minutes later? Many users are convinced that their smartphones must have been listening to their private conversations.',
      'Cybersecurity experts, however, argue that tech companies needn\'t have resorted to secret microphones to predict our desires. Instead, algorithms rely on thousands of subtle data points—from the links we stop to read for a few seconds to what our friends have recently searched for. In other words, we willingly hand over enough information for machines to come up with terrifyingly accurate predictions.',
      'Many people now say they wish they hadn\'t clicked "Accept All" on every cookie banner over the past decade. Nevertheless, unless stricter privacy laws are enforced, trying to hide our digital footprint is like trying to hold back the tide.'
    ],
    annotations: [
      {
        phrase: 'must have been listening',
        type: 'grammar',
        label: 'Modal Perfecto Continuo (B2)',
        explanationEs: 'Deducción lógica casi segura sobre una acción en progreso en el pasado ("deben de haber estado escuchando").'
      },
      {
        phrase: 'needn\'t have resorted',
        type: 'grammar',
        label: 'Modal Perfecto: needn\'t have + PP',
        explanationEs: 'Indica que no hacía falta haber recurrido a micrófonos secretos.'
      },
      {
        phrase: 'stop to read',
        type: 'grammar',
        label: 'Stop + to infinitive vs -ing (B2)',
        explanationEs: '"Stop TO read" significa detener el scroll PARA leer (propósito), a diferencia de "stop reading" (dejar de leer).'
      },
      {
        phrase: 'come up with',
        type: 'phrasal_verb',
        label: 'Phrasal Verb (B2): come up with',
        explanationEs: 'Generar, idear o producir (una predicción, idea o solución).'
      },
      {
        phrase: 'wish they hadn\'t clicked',
        type: 'grammar',
        label: 'Wish + Past Perfect (B2)',
        explanationEs: 'Expresa arrepentimiento sobre acciones pasadas ("ojalá no hubieran hecho clic").'
      }
    ],
    questions: [
      {
        id: 'sq-b2-1',
        kind: 'grammar_analysis',
        question: 'ANÁLISIS GRAMATICAL (Párrafo 2): El texto dice "the links we stop to read". ¿Qué cambiaría si dijera "the links we stop reading"?',
        inputMode: 'choice',
        options: [
          '"Stop to read" significa que paras lo que estabas haciendo PARA leer el enlace; "stop reading" significaría que dejas de leerlo.',
          'Significan exactamente lo mismo; son intercambiables.',
          '"Stop reading" solo se puede usar en futuro.'
        ],
        acceptedAnswers: [
          '"Stop to read" significa que paras lo que estabas haciendo PARA leer el enlace; "stop reading" significaría que dejas de leerlo.'
        ],
        explanation: 'Con "stop", el infinitivo con "to" indica el propósito por el cual te detienes, mientras que "-ing" indica la actividad que abandonas.',
        quoteFromText: 'from the links we stop to read for a few seconds'
      },
      {
        id: 'sq-b2-2',
        kind: 'transformation',
        question: 'TRANSFORMACIÓN DEL TEXTO (Párrafo 3): "Many people wish they hadn\'t clicked Accept All." -> Reescríbelo usando REGRET (2 a 4 palabras): Many people ___ "Accept All".',
        inputMode: 'text',
        acceptedAnswers: [
          'regret clicking',
          'regret having clicked'
        ],
        explanation: '"Wish + Past Perfect negativo (hadn\'t clicked)" equivale a "regret + V-ing (regret clicking)".'
      },
      {
        id: 'sq-b2-3',
        kind: 'vocabulary_hunt',
        question: 'CAZA EN EL TEXTO (Párrafo 2): Escribe el Phrasal Verb de 3 palabras que usa el texto para decir "idear / generar / ocurrírsele" (predicciones):',
        inputMode: 'text',
        acceptedAnswers: ['come up with'],
        explanation: '"...for machines to come up with terrifyingly accurate predictions."'
      }
    ]
  },

  {
    id: 'story-b2p-expedition',
    level: 'B2+',
    title: 'Beneath the Antarctic Ice',
    genre: 'Reportaje Científico / Nivel B2 Advanced',
    readingTimeMin: 5,
    grammarFocus: ['Negative Inversion (No sooner / Little did they know)', 'Personal Passive (is believed to have...)', 'Participle Clauses (Having drilled)'],
    paragraphs: [
      'For decades, Lake Vostok—buried four kilometres beneath the East Antarctic ice sheet—was believed to have been sealed off from the surface for at least fifteen million years. Having endured temperatures plunging below minus sixty degrees, an international team of glaciologists finally succeeded in reaching the subglacial water.',
      'No sooner had the researchers analysed the first ice core samples than they stumbled upon something extraordinary. Little did they suspect that microscopic organisms could thrive under such crushing pressure and total darkness without any sunlight whatsoever.',
      'Not only has this discovery transformed our understanding of extreme life on Earth, but it has also strengthened the hypothesis that similar ecosystems might exist beneath the frozen crust of Jupiter\'s moon, Europa. It is high time space agencies allocated more funding to sub-surface probes.'
    ],
    annotations: [
      {
        phrase: 'was believed to have been sealed off',
        type: 'grammar',
        label: 'Pasiva Personal con Infinitivo Perfecto Pasivo (B2+)',
        explanationEs: '"Se creía que había estado sellado": was believed + to have been + participio.'
      },
      {
        phrase: 'Having endured',
        type: 'grammar',
        label: 'Participle Clause Perfecta (B2+)',
        explanationEs: 'Equivale a "After they had endured..." (Al haber soportado / Tras haber soportado).'
      },
      {
        phrase: 'No sooner had the researchers analysed',
        type: 'grammar',
        label: 'Inversión Negativa: No sooner had... than (B2+)',
        explanationEs: 'Inversión formal de Past Perfect ("had the researchers analysed") emparejada con "than".'
      },
      {
        phrase: 'Little did they suspect',
        type: 'grammar',
        label: 'Inversión Negativa: Little did + S + V (B2+)',
        explanationEs: 'Equivale a "They had no idea / They didn\'t suspect at all". Invierte con el auxiliar "did".'
      },
      {
        phrase: 'Not only has this discovery transformed',
        type: 'grammar',
        label: 'Inversión Negativa: Not only + Aux + S + V (B2+)',
        explanationEs: 'Al empezar con "Not only", el Present Perfect invierte el auxiliar "has" delante del sujeto "this discovery".'
      },
      {
        phrase: 'It is high time space agencies allocated',
        type: 'grammar',
        label: 'Unreal Past: It is high time + Past Simple (B2+)',
        explanationEs: '"Ya va siendo hora de que...". Exige que el verbo vaya en Past Simple ("allocated") aunque hable del presente/futuro.'
      }
    ],
    questions: [
      {
        id: 'sq-b2p-1',
        kind: 'grammar_analysis',
        question: 'ANÁLISIS GRAMATICAL (Párrafo 2): El texto contiene DOS inversiones negativas seguidas ("No sooner had the researchers analysed..." y "Little did they suspect..."). ¿Qué función cumplen y cómo se construyen?',
        inputMode: 'choice',
        options: [
          'Aportan énfasis dramático/formal y se construyen invirtiendo Auxiliar + Sujeto + Verbo como si fueran preguntas.',
          'Son preguntas reales que el autor hace al lector.',
          'Son errores tipográficos del inglés antiguo.'
        ],
        acceptedAnswers: [
          'Aportan énfasis dramático/formal y se construyen invirtiendo Auxiliar + Sujeto + Verbo como si fueran preguntas.'
        ],
        explanation: 'Las inversiones con adverbios negativos al inicio de la oración son la marca distintiva del nivel B2 Advanced / C1.',
        quoteFromText: 'No sooner had the researchers analysed... Little did they suspect...'
      },
      {
        id: 'sq-b2p-2',
        kind: 'grammar_analysis',
        question: 'ANÁLISIS GRAMATICAL (Párrafo 3): ¿Por qué el verbo "allocated" va en pasado en "It is high time space agencies allocated more funding" si habla de lo que deberían hacer AHORA?',
        inputMode: 'choice',
        options: [
          'Porque es un "Unreal Past": tras "It is (high) time + sujeto", el inglés usa el Past Simple para expresar que algo debería haberse hecho ya.',
          'Porque ocurrió hace quince millones de años.',
          'Porque es una oración en Reported Speech.'
        ],
        acceptedAnswers: [
          'Porque es un "Unreal Past": tras "It is (high) time + sujeto", el inglés usa el Past Simple para expresar que algo debería haberse hecho ya.'
        ],
        explanation: '"It\'s high time + sujeto + Past Simple" siempre se refiere al presente/futuro inmediato.',
        quoteFromText: 'It is high time space agencies allocated more funding'
      },
      {
        id: 'sq-b2p-3',
        kind: 'transformation',
        question: 'TRANSFORMACIÓN DEL TEXTO (Párrafo 1): "Having endured temperatures below -60ºC, the team succeeded." -> Reescribe sin Participle Clause usando AFTER (3 palabras): ___ temperatures below -60ºC, the team succeeded.',
        inputMode: 'text',
        acceptedAnswers: [
          'After they endured',
          'After having endured',
          'After they had endured'
        ],
        explanation: '"Having endured" es la reducción estilística de "After they had endured" / "After having endured".'
      }
    ]
  }
];
