import { MultiTurnChatScenario } from '../types/streetGame';

export const WHATSAPP_SCENARIOS: MultiTurnChatScenario[] = [
  {
    id: 'chat-liam-flat',
    name: 'Liam',
    role: 'Compañero de piso en Londres',
    avatar: '👨‍🦱',
    initialStatus: 'en línea',
    topicTitle: 'Organizar la cena y la compra del piso',
    descriptionEs: 'Tu compañero Liam te escribe al salir de trabajar para ver qué cenáis hoy.',
    steps: [
      {
        contactSays: 'Yo mate! What are we doing for dinner tonight? There\'s literally nothing in the fridge.',
        userGoalEs: 'Dile que tú tampoco tienes comida y proponle pedir una pizza o comida para llevar.',
        hint: 'Pista: "Fancy ordering a pizza?" o "Let\'s grab a takeaway"',
        acceptableReplies: [
          'fancy a pizza',
          'fancy ordering a pizza',
          'fancy a takeaway',
          'let\'s order a pizza',
          'lets order a pizza',
          'let\'s get a takeaway',
          'lets get a takeaway',
          'how about a pizza',
          'we can order something',
          'shall we order pizza'
        ],
        sampleGoodReply: 'Fancy ordering a pizza? I have nothing in the fridge either!',
        feedbackIfClose: 'Muy bien. Decir "Fancy ordering a pizza?" o "Let\'s grab a takeaway" es lo más natural entre compañeros de piso.'
      },
      {
        contactSays: 'Sounds great to me! Pizza sounds spot on. Are you paying with card or should I order it on Deliveroo?',
        userGoalEs: 'Dile que lo pida él en Deliveroo y tú le haces una transferencia por Bizum/Revolut o le das tu mitad.',
        hint: 'Pista: "Order it and I\'ll transfer you my half" o "I\'ll send you the money"',
        acceptableReplies: [
          'order it',
          'i\'ll transfer you',
          'ill transfer you',
          'i will transfer you',
          'i\'ll send you my half',
          'ill send you my half',
          'i\'ll pay you back',
          'ill pay you back',
          'transfer',
          'send you the money'
        ],
        sampleGoodReply: 'Order it on Deliveroo and I\'ll transfer you my half, mate!',
        feedbackIfClose: 'Perfecto. "I\'ll transfer you my half" o "I\'ll pay you back" es la fórmula cotidiana exacta.'
      },
      {
        contactSays: 'Sorted! Just ordered a pepperoni and a garlic bread. It says 25 minutes. Do we have any drinks in the fridge?',
        userGoalEs: 'Dile que no queda nada de beber y que puedes entrar tú al súper un segundo a comprar unas latas de Coca-Cola.',
        hint: 'Pista: "I\'ll pop into the shop" o "I can buy some drinks"',
        acceptableReplies: [
          'pop into the shop',
          'pop in',
          'i can buy some',
          'i will buy some',
          'i\'ll get some drinks',
          'ill get some drinks',
          'i can grab some cokes',
          'i\'ll pop into tesco',
          'ill pop into tesco',
          'buy some drinks'
        ],
        sampleGoodReply: 'No drinks left! I\'ll pop into the corner shop and grab some cokes, alright?',
        feedbackIfClose: '¡De lujo! "I\'ll pop into the shop" es el toque 100% británico.'
      },
      {
        contactSays: 'Legend! Grab a cold Diet Coke for me too please mate, see ya at the flat in a bit x',
        userGoalEs: 'Dile que hecho, nos vemos en un rato en casa.',
        hint: 'Pista: "No worries, see ya soon" o "Sorted, see you in a bit"',
        acceptableReplies: [
          'see you in a bit',
          'see ya in a bit',
          'no worries',
          'see you soon',
          'sorted',
          'on it',
          'will do mate',
          'see ya'
        ],
        sampleGoodReply: 'No worries mate, see ya in a bit!',
        feedbackIfClose: 'Excelente. "See ya in a bit" es la despedida perfecta para alguien a quien vas a ver en menos de una hora.'
      }
    ]
  },
  {
    id: 'chat-sarah-work',
    name: 'Sarah',
    role: 'Compañera de curro en la oficina',
    avatar: '👩‍💼',
    initialStatus: 'en línea',
    topicTitle: 'Retraso en el metro y la reunión de las 9:00',
    descriptionEs: 'Sarah te escribe a las 8:30 porque el metro de Londres está parado y llega tarde.',
    steps: [
      {
        contactSays: 'Morning! Nightmarish morning, the Central Line has stopped completely at Holborn. Are you in the office yet?',
        userGoalEs: 'Dile que sí, que acabas de llegar a la oficina.',
        hint: 'Pista: "Yeah, I just arrived" o "Just got to the office"',
        acceptableReplies: [
          'yes i just arrived',
          'yeah i just arrived',
          'just got in',
          'just got to the office',
          'i\'m at the office',
          'im at the office',
          'yeah i am here',
          'just arrived'
        ],
        sampleGoodReply: 'Morning Sarah! Yeah, I just got to the office a minute ago.',
        feedbackIfClose: 'Natural y directo. "Just got in" o "Just arrived" es perfecto.'
      },
      {
        contactSays: 'Phew! Can you do me a massive favour? Can you cover the 9am client call for 10 minutes until I get there?',
        userGoalEs: 'Dile que sin problema ninguno, que no se preocupe que tú te encargas.',
        hint: 'Pista: "No worries at all, I\'ll cover for you" o "No problem"',
        acceptableReplies: [
          'no worries',
          'no worries at all',
          'no problem',
          'no problem at all',
          'i\'ll cover for you',
          'ill cover for you',
          'i will cover for you',
          'sure thing',
          'i got you',
          'don\'t worry'
        ],
        sampleGoodReply: 'No worries at all Sarah, I\'ll cover for you! Don\'t stress.',
        feedbackIfClose: '"No worries at all" es la mejor muestra de empatía laboral cotidiana.'
      },
      {
        contactSays: 'You are an absolute lifesaver! I\'m finally on a replacement bus. Do you want me to bring you a coffee from Pret?',
        userGoalEs: 'Dile que sí por favor, un café con leche para llevar (flat white o latte).',
        hint: 'Pista: "Yes please, a flat white would be great!"',
        acceptableReplies: [
          'yes please',
          'flat white',
          'latte',
          'a coffee please',
          'that would be great',
          'white coffee',
          'cappuccino',
          'a flat white please'
        ],
        sampleGoodReply: 'Yes please, a flat white would be amazing! Thanks a lot!',
        feedbackIfClose: 'En UK el "flat white" de Pret A Manger es el café clásico de oficina.'
      },
      {
        contactSays: 'Done! Flat white on the way. The bus is moving now, see you in 15 mins!',
        userGoalEs: 'Dile que perfecto, que nos vemos en un cuarto de hora.',
        hint: 'Pista: "Sounds great, see you in a bit"',
        acceptableReplies: [
          'see you in a bit',
          'see you soon',
          'sounds good',
          'sounds great',
          'perfect see you soon',
          'cheers see you in a bit'
        ],
        sampleGoodReply: 'Sounds great, see you in a bit Sarah!',
        feedbackIfClose: '¡Conversación redonda!'
      }
    ]
  },
  {
    id: 'chat-callum-pub',
    name: 'Callum',
    role: 'Colega de los viernes',
    avatar: '🧢',
    initialStatus: 'en línea',
    topicTitle: 'Viernes por la tarde y la primera ronda',
    descriptionEs: 'Son las 18:00 del viernes y Callum ya está en el pub del barrio.',
    steps: [
      {
        contactSays: 'Alright mate! Happy Friday! We just got a table outside at The Prince. Are you coming down?',
        userGoalEs: 'Dile que sí, que sales ahora mismo y llegas en 15 minutos.',
        hint: 'Pista: "Yeah, on my way now, be there in 15 mins"',
        acceptableReplies: [
          'on my way',
          'on my way now',
          'be there in 15',
          'be there in 15 mins',
          'be there soon',
          'yeah coming now',
          'coming now',
          'give me 15 minutes'
        ],
        sampleGoodReply: 'Alright mate! Yeah, on my way now! Give me 15 minutes.',
        feedbackIfClose: '"On my way" = voy de camino. Rápido y natural.'
      },
      {
        contactSays: 'Nice one! Jack is already ordering a pint of cider. What can I get you from the bar?',
        userGoalEs: 'Pídele una cerveza rubia (lager) o una sidra, y dile que tú pagas la siguiente ronda.',
        hint: 'Pista: "A pint of lager please, and I\'ll get the next round!"',
        acceptableReplies: [
          'lager',
          'pint of lager',
          'cider',
          'pint of cider',
          'next round',
          'i\'ll get the next round',
          'ill get the next round',
          'my round next',
          'a beer please'
        ],
        sampleGoodReply: 'A pint of lager please mate, and I\'ll get the next round!',
        feedbackIfClose: 'Ofrecerse para la siguiente ronda ("I\'ll get the next round") es la regla de oro.'
      },
      {
        contactSays: 'Sorted! Pint of lager ordered. Table is right next to the big screen. See ya in a second mate x',
        userGoalEs: 'Dile que genial, que estás doblando la esquina.',
        hint: 'Pista: "Brilliant, just round the corner!"',
        acceptableReplies: [
          'round the corner',
          'just round the corner',
          'brilliant',
          'see you in a sec',
          'see ya in a sec',
          'almost there',
          'nearly there'
        ],
        sampleGoodReply: 'Brilliant mate, just round the corner now!',
        feedbackIfClose: '"Just round the corner" = doblando la esquina / al ladito.'
      }
    ]
  },
  {
    id: 'chat-dave-mechanic',
    name: 'Dave (Taller)',
    role: 'Mecánico de coches del barrio',
    avatar: '🔧',
    initialStatus: 'en línea',
    topicTitle: 'Presupuesto de la avería del coche',
    descriptionEs: 'Dave te escribe desde su taller mecánico porque le dejaste el coche esta mañana.',
    steps: [
      {
        contactSays: 'Alright mate, it\'s Dave from the garage. We had a look under the bonnet. The alternator needs replacing.',
        userGoalEs: 'Pregúntale cuánto va a costar la broma y si incluye la mano de obra.',
        hint: 'Pista: "How much is it going to cost?" o "How much will that be?"',
        acceptableReplies: [
          'how much is it going to cost',
          'how much will it cost',
          'how much will that be',
          'how much is that',
          'how much is it',
          'what is the price',
          'how much mate'
        ],
        sampleGoodReply: 'Alright Dave. How much is that going to cost including labour?',
        feedbackIfClose: '"How much will that be?" es directo y educado.'
      },
      {
        contactSays: 'A brand new one is 280 quid plus 50 for fitting. But I can source a good second-hand one for 140 if you want to save some cash.',
        userGoalEs: 'Dile que prefieres la pieza de segunda mano para ahorrar, y pregúntale cuándo estará listo el coche.',
        hint: 'Pista: "Let\'s go with the second-hand one. When will it be ready?"',
        acceptableReplies: [
          'second hand',
          'second-hand',
          'the 140 one',
          'cheaper one',
          'when will it be ready',
          'when can i pick it up',
          'when is it ready',
          'second hand please'
        ],
        sampleGoodReply: 'Let\'s go with the second-hand one please! When will it be ready to pick up?',
        feedbackIfClose: '"When will it be ready to pick up?" = ¿Cuándo estará listo para recoger?'
      },
      {
        contactSays: 'Fair enough mate! I\'ll fit the second-hand one today. It should be ready by 5pm this afternoon.',
        userGoalEs: 'Agradéceselo y dile que te pasas sobre las 5 a por él.',
        hint: 'Pista: "Brilliant, cheers Dave! I\'ll pop by around 5pm"',
        acceptableReplies: [
          'cheers dave',
          'see you at 5',
          'i\'ll be there around 5',
          'ill be there around 5',
          'pop by around 5',
          'pick it up at 5',
          'brilliant thanks',
          'perfect thank you'
        ],
        sampleGoodReply: 'Brilliant, cheers Dave! I\'ll pop by around 5pm to collect it.',
        feedbackIfClose: '"To pop by" = pasarse por un sitio. Y "cheers Dave" remata el trato con confianza.'
      }
    ]
  }
];
