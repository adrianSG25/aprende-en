const fs = require('fs');
const path = require('path');

const outputPath = path.join(__dirname, '..', 'src', 'data', 'expandedGrammarExercises.ts');

const exercises = [
  // ==================== 1. a2p-past-tenses (10 ejercicios) ====================
  {
    id: 'ex-past-1',
    level: 'A2+',
    category: 'grammar',
    topicId: 'a2p-past-tenses',
    topicLabel: 'Past Simple vs. Continuous',
    type: 'cloze',
    prompt: 'While I ___ (walk) down the street yesterday, I bumped into an old school friend.',
    spanishHint: 'Mientras caminaba por la calle ayer, me topé con un viejo amigo del colegio.',
    acceptedAnswers: ['was walking'],
    explanation: 'La acción larga ("telón de fondo") va con While + Past Continuous (was walking).',
    grammarRule: 'While + Past Continuous, Past Simple'
  },
  {
    id: 'ex-past-2',
    level: 'A2+',
    category: 'grammar',
    topicId: 'a2p-past-tenses',
    topicLabel: 'Past Simple vs. Continuous',
    type: 'cloze',
    prompt: 'We were having dinner when the lights suddenly ___ (go) out.',
    spanishHint: 'Estábamos cenando cuando las luces se apagaron de repente.',
    acceptedAnswers: ['went', 'went out'],
    explanation: 'El corte de luz es una acción puntual y repentina que interrumpe la cena: Past Simple (went).',
    grammarRule: 'Interrupción puntual -> Past Simple'
  },
  {
    id: 'ex-past-3',
    level: 'A2+',
    category: 'grammar',
    topicId: 'a2p-past-tenses',
    topicLabel: 'Past Simple vs. Continuous',
    type: 'error_correction',
    prompt: 'Corrige el error en esta frase:',
    baseSentence: 'While I cooked dinner, my brother was setting the table.',
    errorWord: 'cooked',
    acceptedAnswers: ['was cooking', 'While I was cooking dinner, my brother was setting the table.'],
    explanation: 'Dos acciones largas simultáneas en el pasado llevan ambas Past Continuous (was cooking ... was setting).',
    grammarRule: 'Acciones paralelas continuas -> Past Continuous en ambas'
  },
  {
    id: 'ex-past-4',
    level: 'A2+',
    category: 'grammar',
    topicId: 'a2p-past-tenses',
    topicLabel: 'Past Simple vs. Continuous',
    type: 'error_correction',
    prompt: 'Corrige el error de verbo de estado:',
    baseSentence: 'At that moment, I was understanding the whole problem.',
    errorWord: 'was understanding',
    acceptedAnswers: ['understood', 'At that moment, I understood the whole problem.'],
    explanation: '"Understand" es un verbo de estado (stative verb); no admite formas continuas con -ing.',
    grammarRule: 'Stative verbs (understand, know, like) -> Past Simple'
  },
  {
    id: 'ex-past-5',
    level: 'A2+',
    category: 'grammar',
    topicId: 'a2p-past-tenses',
    topicLabel: 'Past Simple vs. Continuous',
    type: 'cloze',
    prompt: 'What ___ (you / do) when the earthquake started?',
    spanishHint: '¿Qué estabas haciendo cuando empezó el terremoto?',
    acceptedAnswers: ['were you doing'],
    explanation: 'Pregunta sobre la acción en progreso en el momento exacto de la interrupción: were you doing.',
    grammarRule: 'What were you doing when...?'
  },
  {
    id: 'ex-past-6',
    level: 'A2+',
    category: 'grammar',
    topicId: 'a2p-past-tenses',
    topicLabel: 'Past Simple vs. Continuous',
    type: 'multiple_choice',
    prompt: 'I was driving to work when I suddenly ___ that I had left the oven on.',
    spanishHint: 'Iba conduciendo al curro cuando de repente me di cuenta de que me había dejado el horno encendido.',
    options: ['realized', 'was realizing', 'have realized', 'had realized'],
    acceptedAnswers: ['realized'],
    explanation: '"Realize" es un fogonazo mental puntual que interrumpe la conducción: Past Simple (realized).',
    grammarRule: 'Darse cuenta (realize) es puntual -> Past Simple'
  },
  {
    id: 'ex-past-7',
    level: 'A2+',
    category: 'grammar',
    topicId: 'a2p-past-tenses',
    topicLabel: 'Past Simple vs. Continuous',
    type: 'cloze',
    prompt: 'It ___ (rain) heavily when we arrived at the festival.',
    spanishHint: 'Estaba lloviendo a cántaros cuando llegamos al festival.',
    acceptedAnswers: ['was raining'],
    explanation: 'El tiempo meteorológico en progreso cuando llegas al lugar va en Past Continuous (was raining).',
    grammarRule: 'Clima en progreso -> was/were raining'
  },
  {
    id: 'ex-past-8',
    level: 'A2+',
    category: 'grammar',
    topicId: 'a2p-past-tenses',
    topicLabel: 'Past Simple vs. Continuous',
    type: 'transformation',
    prompt: 'Reescribe usando WHEN:',
    baseSentence: 'During my shower, someone rang the doorbell.',
    keyWord: 'WHEN',
    spanishHint: 'I was having a shower ___ rang the doorbell.',
    acceptedAnswers: [
      'when someone',
      'when somebody',
      'I was having a shower when someone rang the doorbell.'
    ],
    explanation: '"During my shower" se transforma en "I was having a shower WHEN someone...".',
    grammarRule: 'was doing ... when'
  },
  {
    id: 'ex-past-9',
    level: 'A2+',
    category: 'grammar',
    topicId: 'a2p-past-tenses',
    topicLabel: 'Past Simple vs. Continuous',
    type: 'cloze',
    prompt: 'He dropped his phone into the swimming pool while he ___ (take) a selfie.',
    spanishHint: 'Se le cayó el móvil a la piscina mientras se estaba haciendo un selfie.',
    acceptedAnswers: ['was taking'],
    explanation: 'La acción de hacerse la foto estaba en curso con "while": was taking.',
    grammarRule: 'While + was/were + -ing'
  },
  {
    id: 'ex-past-10',
    level: 'A2+',
    category: 'grammar',
    topicId: 'a2p-past-tenses',
    topicLabel: 'Past Simple vs. Continuous',
    type: 'error_correction',
    prompt: 'Corrige la frase:',
    baseSentence: 'I was hearing a strange noise outside last night.',
    errorWord: 'was hearing',
    acceptedAnswers: ['heard', 'I heard a strange noise outside last night.'],
    explanation: '"Hear" es un verbo de percepción involuntaria y no suele usarse en continuo; se usa "heard".',
    grammarRule: 'Verbos de sentidos (hear, see, smell) -> Past Simple'
  },

  // ==================== 2. a2p-present-perfect-particles (10 ejercicios) ====================
  {
    id: 'ex-ppp-1',
    level: 'A2+',
    category: 'grammar',
    topicId: 'a2p-present-perfect-particles',
    topicLabel: 'Present Perfect Particles',
    type: 'cloze',
    prompt: 'Have you finished the sales report ___? — No, not yet.',
    spanishHint: '¿Has terminado ya el informe de ventas? — No, todavía no.',
    acceptedAnswers: ['yet'],
    explanation: 'En preguntas y frases negativas, "ya" o "todavía" al FINAL de la frase siempre es YET.',
    grammarRule: 'yet va al final en preguntas y negativas'
  },
  {
    id: 'ex-ppp-2',
    level: 'A2+',
    category: 'grammar',
    topicId: 'a2p-present-perfect-particles',
    topicLabel: 'Present Perfect Particles',
    type: 'cloze',
    prompt: 'I\'m not hungry because I have ___ (acabo de) eaten a huge sandwich.',
    spanishHint: 'No tengo hambre porque acabo de comerme un bocadillo enorme.',
    acceptedAnswers: ['just'],
    explanation: 'Para decir "acabo de hacer algo", se pone JUST entre have/has y el participio.',
    grammarRule: 'have/has + just + participio = acabar de'
  },
  {
    id: 'ex-ppp-3',
    level: 'A2+',
    category: 'grammar',
    topicId: 'a2p-present-perfect-particles',
    topicLabel: 'Present Perfect Particles',
    type: 'error_correction',
    prompt: 'Corrige el error temporal:',
    baseSentence: 'I have lived in this apartment since three years.',
    errorWord: 'since',
    acceptedAnswers: ['for', 'I have lived in this apartment for three years.'],
    explanation: 'Para cantidades o periodos de tiempo ("three years", "two months"), se usa FOR, nunca "since".',
    grammarRule: 'FOR + periodo de tiempo (for 3 years)'
  },
  {
    id: 'ex-ppp-4',
    level: 'A2+',
    category: 'grammar',
    topicId: 'a2p-present-perfect-particles',
    topicLabel: 'Present Perfect Particles',
    type: 'multiple_choice',
    prompt: 'Where is Daniel? — He has ___ to the post office; he will be back in ten minutes.',
    spanishHint: '¿Dónde está Daniel? — Se ha ido a correos (sigue allí); volverá en 10 minutos.',
    options: ['gone', 'been', 'went', 'visited'],
    acceptedAnswers: ['gone'],
    explanation: '"Have gone" indica que fue y TODAVÍA no ha regresado. "Have been" significa que fue y ya volvió.',
    grammarRule: 'gone to (sigue allí) ≠ been to (fue y volvió)'
  },
  {
    id: 'ex-ppp-5',
    level: 'A2+',
    category: 'grammar',
    topicId: 'a2p-present-perfect-particles',
    topicLabel: 'Present Perfect Particles',
    type: 'cloze',
    prompt: 'I sent him an urgent email three days ago, but he ___ hasn\'t replied.',
    spanishHint: 'Le mandé un correo urgente hace 3 días, pero TODAVÍA no ha respondido.',
    acceptedAnswers: ['still'],
    explanation: 'En negativas, "STILL" va DELANTE del auxiliar negativo: "still hasn\'t replied".',
    grammarRule: 'still + haven\'t/hasn\'t'
  },
  {
    id: 'ex-ppp-6',
    level: 'A2+',
    category: 'grammar',
    topicId: 'a2p-present-perfect-particles',
    topicLabel: 'Present Perfect Particles',
    type: 'transformation',
    prompt: 'Reescribe usando FOR:',
    baseSentence: 'I started working at this bank in 2021.',
    keyWord: 'FOR',
    spanishHint: 'I have worked at this bank ___ years.',
    acceptedAnswers: [
      'for five',
      'for 5',
      'for five years',
      'for 5 years'
    ],
    explanation: 'La acción que comenzó en 2021 y continúa hoy se expresa con Present Perfect + FOR.',
    grammarRule: 'Present Perfect + FOR'
  },
  {
    id: 'ex-ppp-7',
    level: 'A2+',
    category: 'grammar',
    topicId: 'a2p-present-perfect-particles',
    topicLabel: 'Present Perfect Particles',
    type: 'cloze',
    prompt: 'Have you ___ (alguna vez) ridden a motorcycle in another country?',
    spanishHint: '¿Has montado alguna vez en moto en otro país?',
    acceptedAnswers: ['ever'],
    explanation: 'En preguntas sobre experiencias vitales ("¿alguna vez...?"), se usa EVER.',
    grammarRule: 'Have you ever + participio...?'
  },
  {
    id: 'ex-ppp-8',
    level: 'A2+',
    category: 'grammar',
    topicId: 'a2p-present-perfect-particles',
    topicLabel: 'Present Perfect Particles',
    type: 'cloze',
    prompt: 'We have known each other ___ we were at primary school.',
    spanishHint: 'Nos conocemos desde que estábamos en el colegio de primaria.',
    acceptedAnswers: ['since'],
    explanation: 'Para un punto concreto o momento de inicio en el pasado, se usa SINCE.',
    grammarRule: 'SINCE + punto temporal o frase en Past Simple'
  },
  {
    id: 'ex-ppp-9',
    level: 'A2+',
    category: 'grammar',
    topicId: 'a2p-present-perfect-particles',
    topicLabel: 'Present Perfect Particles',
    type: 'error_correction',
    prompt: 'Corrige la posición del adverbio:',
    baseSentence: 'She has booked already the flight tickets.',
    errorWord: 'booked already',
    acceptedAnswers: ['already booked', 'She has already booked the flight tickets.'],
    explanation: '"Already" se coloca normalmente entre el auxiliar (has) y el participio (booked).',
    grammarRule: 'has + already + booked'
  },
  {
    id: 'ex-ppp-10',
    level: 'A2+',
    category: 'grammar',
    topicId: 'a2p-present-perfect-particles',
    topicLabel: 'Present Perfect Particles',
    type: 'multiple_choice',
    prompt: 'I have ___ been to Australia, but I would love to visit it one day.',
    spanishHint: 'Nunca he estado en Australia, pero me encantaría visitarla algún día.',
    options: ['never', 'ever', 'yet', 'already'],
    acceptedAnswers: ['never'],
    explanation: '"Never" expresa que la experiencia nunca ha ocurrido con verbo en afirmativa.',
    grammarRule: 'have never + participio'
  }
];

console.log('Total generated baseline exercises in script:', exercises.length);
`;

console.log('Writing initial script...');
