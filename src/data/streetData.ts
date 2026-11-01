import { StreetLevel } from '../types/streetGame';

export const STREET_LEVELS: StreetLevel[] = [
  {
    id: 1,
    number: 1,
    districtName: 'Heathrow & El Súper de la Esquina',
    title: 'Recién aterrizao (Supervivencia Cotidiana)',
    badge: '🧳',
    rankTitle: 'Guiri Despistado',
    color: 'from-amber-500 to-orange-500',
    borderColor: 'border-amber-300',
    bgColor: 'bg-amber-50',
    description: 'Aprende a saludar como un local sin sonar como un libro de texto, pagar sin liarte y pedir comida o un café en inglés cotidiano.',
    requiredXP: 0,
    topics: [
      {
        id: 'l1-t1',
        levelId: 1,
        title: 'Saludos y Despedidas Cotidianas',
        subtitle: 'Olvídate de "How do you do?" y "Good morning sir"',
        icon: '👋',
        description: 'En el día a día en UK nadie usa fórmulas arcaicas. Usan frases cortas, cercanas y directas para saludarse.',
        phrases: [
          {
            formal: 'How are you today?',
            street: 'Alright? / You alright, mate?',
            es: '¿Qué tal? / ¿Todo bien?',
            context: 'El saludo reflejo número uno en UK. Casi siempre respondes con otro "Alright? You?" y sigues tu camino.'
          },
          {
            formal: 'Thank you very much.',
            street: 'Cheers / Nice one / Cheers mate!',
            es: '¡Gracias! / ¡De lujo! / ¡Genial!',
            context: 'Usado con el conductor de bus, cajeros, al aguantar una puerta o entre colegas.'
          },
          {
            formal: 'Goodbye, have a pleasant day.',
            street: 'Have a good one! / See ya!',
            es: '¡Que vaya bien! / ¡Nos vemos!',
            context: 'La despedida más común y cercana al salir de una tienda o despedirte de alguien.'
          },
          {
            formal: 'Excuse me, may I pass?',
            street: 'Sorry, mate / Excuse me',
            es: 'Perdona / Ojo, paso',
            context: 'Los británicos dicen "Sorry" por todo: si rozas a alguien o para pedir paso.'
          }
        ],
        culturalSecrets: [
          'En UK "Alright?" es un saludo, no una consulta médica. Lo natural es devolver "Alright? You good?".',
          'Decir "Cheers mate" al bajarte del autobús es la norma de cortesía callejera por excelencia.'
        ],
        audioTips: 'Pronuncia "Alright?" de forma rápida y relajada ("Aight?"). No marques la R.',
        exercises: [
          {
            id: 'l1-e1',
            type: 'street_write',
            situation: 'Te cruzas por la calle con tu compañero de curro y te saluda con una sonrisa diciendo: "Alright, mate?".',
            question: 'Escribe tu respuesta natural británica para devolver el saludo:',
            hint: 'Pista: Empieza por "Alright?..." o "Yeah, not bad..."',
            acceptedAnswers: [
              'Alright? You good?',
              'Alright, you good?',
              'Alright mate, you good?',
              'Alright? You?',
              'Alright you?',
              'Yeah, not bad mate, you?',
              'Yeah not bad, you?',
              'Not bad mate, you?',
              'All good mate, you?',
              'Alright mate'
            ],
            sampleIdealAnswer: 'Alright? You good?',
            explanationEs: 'En UK "Alright?" es un saludo reflejo. Lo más natural es devolver "Alright? You good?" o "Yeah, not bad mate, you?".',
            streetTip: 'Devolver otro "Alright?" es la respuesta rápida que nunca falla.',
            xpReward: 20
          },
          {
            id: 'l1-e2',
            type: 'street_write',
            situation: 'Llegas a tu parada en el autobús urbano. Te levantas para bajar por la puerta central.',
            question: 'Escribe qué le dices al conductor al bajar para despedirte educadamente:',
            hint: 'Pista: Dos palabras, empieza por "Cheers..."',
            acceptedAnswers: [
              'Cheers mate!',
              'Cheers mate',
              'Cheers drive!',
              'Cheers drive',
              'Cheers driver!',
              'Cheers, thank you!',
              'Cheers thanks!'
            ],
            sampleIdealAnswer: 'Cheers mate!',
            explanationEs: '"Cheers mate!" (o "Cheers drive!") es la frase clásica y respetuosa que dice casi todo el mundo al bajarse del autobús.',
            streetTip: '"Cheers" es la palabra multiusos británica: vale para dar gracias, despedirse y brindar.',
            xpReward: 20
          },
          {
            id: 'l1-e3',
            type: 'street_write',
            situation: 'Pagas en el supermercado y el cajero te entrega la bolsa y el ticket diciendo "There you go, mate".',
            question: 'Escribe cómo le deseas un buen día de forma natural y cotidiana:',
            hint: 'Pista: "Have a good..."',
            acceptedAnswers: [
              'Have a good one!',
              'Have a good one',
              'Have a good day mate!',
              'Have a good day',
              'Cheers, have a good one!',
              'Cheers have a good one',
              'Cheers mate, have a good one!'
            ],
            sampleIdealAnswer: 'Have a good one!',
            explanationEs: '"Have a good one!" es la fórmula universal para desear un buen día en cualquier tienda o servicio.',
            streetTip: 'Sirve por la mañana, por la tarde y por la noche.',
            xpReward: 20
          }
        ]
      },
      {
        id: 'l1-t2',
        levelId: 1,
        title: 'Pasta, Precios y la Tienda de Barrio',
        subtitle: 'Quids, Tenners y pagar contactless',
        icon: '💷',
        description: 'Aprende los términos cotidianos para la pasta y pagar en cualquier tienda o mercadillo.',
        phrases: [
          {
            formal: 'That costs one pound.',
            street: 'That\'s a quid / It\'s ten quid.',
            es: 'Cuesta un pavo / diez libras.',
            context: '"Quid" nunca lleva S en plural: "five quid", "twenty quid".'
          },
          {
            formal: 'A ten-pound note / A five-pound note.',
            street: 'A tenner / A fiver.',
            es: 'Un billete de 10 libras / Un billete de 5 libras.',
            context: 'Usado para billetes: "Do you have change for a tenner?"'
          },
          {
            formal: 'I will quickly enter the shop.',
            street: 'I\'m just popping into the shop.',
            es: 'Entro un segundo a la tienda y salgo.',
            context: '"To pop" significa ir y volver rápido a un sitio.'
          }
        ],
        culturalSecrets: [
          'En plural siempre se dice "twenty quid", jamás "twenty quids".',
          'En prácticamente todas partes en UK se paga con tarjeta o móvil ("contactless"). Te dirán "Tap it on the screen, mate".'
        ],
        audioTips: '"Quid" rima con "kid".',
        exercises: [
          {
            id: 'l1-e4',
            type: 'street_write',
            situation: 'Estás en un puesto de comida en la calle y preguntas cuánto cuesta una hamburguesa con patatas.',
            question: 'El vendedor te dice que son 10 libras. Escribe cómo lo dice usando la palabra de calle para el billete de 10:',
            hint: 'Pista: "That is a t..." (termina en -er)',
            acceptedAnswers: [
              'That is a tenner',
              'That\'s a tenner',
              'It\'s a tenner',
              'A tenner',
              'Ten quid',
              'That\'s ten quid',
              'It\'s ten quid'
            ],
            sampleIdealAnswer: 'That\'s a tenner',
            explanationEs: 'Un billete de 10 libras se llama "a tenner" (o "ten quid"). Uno de 5 libras es "a fiver".',
            streetTip: 'A fiver (£5), a tenner (£10). Los oirás todos los días.',
            xpReward: 25
          },
          {
            id: 'l1-e5',
            type: 'street_write',
            situation: 'Vas por la calle con un amigo y necesitas entrar 1 minuto al súper a comprar una botella de agua.',
            question: 'Escribe qué le dices a tu amigo para avisarle de que entras un segundito:',
            hint: 'Pista: Usa el verbo "pop in" o "pop into"',
            acceptedAnswers: [
              'I\'m just popping into the shop',
              'Just popping into the shop',
              'Just popping in to grab some water',
              'I\'ll just pop into the shop',
              'Just popping in for a second',
              'Pop into the shop real quick'
            ],
            sampleIdealAnswer: 'Just popping into the shop',
            explanationEs: '"To pop into" es el verbo por excelencia en UK para decir "entrar/ir un segundito a un sitio".',
            streetTip: '"I\'m popping out" = salgo un momento.',
            xpReward: 25
          }
        ]
      }
    ],
    boss: {
      id: 'boss-1',
      levelId: 1,
      bossName: 'Terry "The Cabbie"',
      bossTitle: 'Taxista de Londres y Cajero del Tesco Express',
      bossAvatar: '🚕',
      bossQuote: 'Alright mate! Let\'s see if you can write real English without sounding like a robot from 1950!',
      description: 'Escribe las respuestas en inglés cotidiano para demostrarle a Terry que sabes desenvolverte en la calle.',
      passPercentage: 80,
      questions: [
        {
          id: 'b1-q1',
          type: 'street_write',
          situation: 'Te subes al taxi de Terry y te pregunta por el retrovisor: "Alright mate, where to?". Quieres ir a Camden Market.',
          question: 'Escribe cómo le dices tu destino de forma natural y cercana:',
          hint: 'Pista: Nombre del sitio + "please mate" o "cheers"',
          acceptedAnswers: [
            'Camden Market, please mate',
            'Camden Market please mate',
            'Camden Market, cheers',
            'Camden Market cheers',
            'To Camden Market, please mate',
            'Camden, please mate'
          ],
          sampleIdealAnswer: 'Camden Market, please mate',
          explanationEs: 'Directo, educado y cercano. En UK añadir "please mate" o "cheers" crea buen rollo de inmediato.',
          streetTip: 'Los taxistas británicos aprecian la naturalidad sin rodeos.',
          xpReward: 30
        },
        {
          id: 'b1-q2',
          type: 'street_write',
          situation: 'Vas distraído en el súper y sin querer rozas a una persona en el pasillo.',
          question: 'Escribe la palabra refleja que dice un británico en ese instante:',
          hint: 'Pista: Empieza por S...',
          acceptedAnswers: [
            'Sorry!',
            'Sorry',
            'Oh sorry!',
            'So sorry!',
            'Sorry mate!',
            'Excuse me, sorry!'
          ],
          sampleIdealAnswer: 'Sorry mate!',
          explanationEs: 'En UK el "Sorry!" es casi un reflejo automático para cualquier roce involuntario.',
          streetTip: 'Si te rozan a ti, lo habitual es decir "Sorry!" también de vuelta.',
          xpReward: 30
        },
        {
          id: 'b1-q3',
          type: 'street_write',
          situation: 'Quieres saber si en la cafetería se puede pagar con tarjeta contactless desde el móvil.',
          question: 'Escribe cómo preguntas si puedes pagar con tarjeta de forma sencilla:',
          hint: 'Pista: "Can I pay by..." o "Do you take..."',
          acceptedAnswers: [
            'Can I pay by card?',
            'Can I pay by card please?',
            'Can I pay contactless?',
            'Can I pay contactless please?',
            'Do you take card?',
            'Do you take cards?',
            'Card please'
          ],
          sampleIdealAnswer: 'Can I pay by card, please?',
          explanationEs: '"Can I pay by card?" o "Do you take card?" es lo más común y directo.',
          streetTip: 'Casi todo el comercio en UK funciona 100% con tarjeta/contactless.',
          xpReward: 30
        },
        {
          id: 'b1-q4',
          type: 'street_write',
          situation: 'Al bajarte del taxi le pagas a Terry y te dice: "Cheers, have a good one!".',
          question: 'Escribe qué le respondes para devolverle el buen deseo:',
          hint: 'Pista: "You too, mate!"',
          acceptedAnswers: [
            'You too mate!',
            'You too, mate!',
            'You too!',
            'Cheers, you too!',
            'Cheers you too mate!',
            'Same to you mate!'
          ],
          sampleIdealAnswer: 'You too, mate!',
          explanationEs: '"You too, mate!" es la respuesta perfecta y educada cuando te desean un buen día.',
          streetTip: 'Rápido, agradecido y 100% natural.',
          xpReward: 30
        }
      ]
    }
  },
  {
    id: 2,
    number: 2,
    districtName: 'El Pub The Red Lion & Vida Social',
    title: 'Parroquiano del Pub (Inglés de Vida Cotidiana)',
    badge: '🍺',
    rankTitle: 'Compañero de Pub',
    color: 'from-emerald-500 to-teal-600',
    borderColor: 'border-emerald-300',
    bgColor: 'bg-emerald-50',
    description: 'Aprende a proponer planes cotidianos, invitar a una ronda ("my round"), decir que estás reventado de cansancio y resolver imprevistos.',
    requiredXP: 100,
    topics: [
      {
        id: 'l2-t1',
        levelId: 2,
        title: 'Proponer Planes y el Pub',
        subtitle: 'Fancy a drink? y la sagrada ley de las rondas',
        icon: '🍻',
        description: 'Cómo proponer tomar algo sin sonar artificial y cómo pagar por turnos entre amigos.',
        phrases: [
          {
            formal: 'Would you like to drink some beer with me?',
            street: 'Fancy a drink? / Fancy a pint?',
            es: '¿Te apetece tomar algo? / ¿Nos tomamos una cerveza?',
            context: 'El verbo "fancy" se usa para cualquier cosa cotidiana que te apetezca: "Fancy a coffee?", "Fancy some food?"'
          },
          {
            formal: 'It is my turn to pay for the drinks.',
            street: 'My round! / It\'s on me / I\'ll get these.',
            es: '¡Esta ronda la pago yo! / ¡Invito yo!',
            context: 'En los pubs se suele pagar por turnos de ronda con los amigos.'
          },
          {
            formal: 'Everything is fixed and resolved.',
            street: 'Sorted! / All sorted.',
            es: '¡Arreglado! / ¡Solucionado!',
            context: 'Cuando consigues mesa, pagas la cuenta o resuelves un problema.'
          }
        ],
        culturalSecrets: [
          'En un pub no esperes a que vengan a la mesa: se pide y se paga directamente en la barra.',
          'Si alguien te invita a una bebida, la cortesía británica es pagar tú la siguiente ronda.'
        ],
        audioTips: '"Fancy a drink?" tiene un tono suave y amistoso.',
        exercises: [
          {
            id: 'l2-e1',
            type: 'street_write',
            situation: 'Termina el trabajo y quieres proponerle a un compañero ir a tomar una cerveza o un café.',
            question: 'Escribe tu propuesta usando el verbo cotidiano "fancy":',
            hint: 'Pista: "Fancy a..." (drink / pint / coffee)',
            acceptedAnswers: [
              'Fancy a drink?',
              'Fancy a drink, mate?',
              'Fancy a pint?',
              'Fancy a pint, mate?',
              'Fancy grabbing a drink?',
              'Fancy grabbing a pint?',
              'Fancy a coffee?'
            ],
            sampleIdealAnswer: 'Fancy a drink, mate?',
            explanationEs: '"Fancy a drink?" o "Fancy a pint?" es la invitación informal británica por excelencia para tomar algo.',
            streetTip: '"To fancy" = apetecer en inglés coloquial.',
            xpReward: 25
          },
          {
            id: 'l2-e2',
            type: 'street_write',
            situation: 'Estás en el pub con amigos. Las copas se están vaciando y te toca pagar las bebidas de todos.',
            question: 'Escribe la frase de dos palabras para anunciar que esta ronda la pagas tú:',
            hint: 'Pista: "My r..."',
            acceptedAnswers: [
              'My round!',
              'My round',
              'It\'s my round!',
              'It is my round',
              'I\'ll get these',
              'These are on me'
            ],
            sampleIdealAnswer: 'My round!',
            explanationEs: '"My round!" es la frase para decir "¡Esta ronda la pago yo!".',
            streetTip: 'Respetar las rondas es una norma social clave en los pubs británicos.',
            xpReward: 25
          }
        ]
      },
      {
        id: 'l2-t2',
        levelId: 2,
        title: 'Expresar Emociones Reales',
        subtitle: 'Knackered, Starving y Sound',
        icon: '😴',
        description: 'Cómo decir que estás agotado, muerto de hambre o que algo te parece genial en inglés natural.',
        phrases: [
          {
            formal: 'I am extremely exhausted.',
            street: 'I\'m knackered / I\'m completely exhausted.',
            es: 'Estoy reventado / hecho polvo.',
            context: 'Para cansancio físico después de currar o caminar mucho.'
          },
          {
            formal: 'I am extremely hungry.',
            street: 'I\'m starving! / Proper starving.',
            es: '¡Estoy muerto de hambre!',
            context: 'Mucho más común en la calle que "I am very hungry".'
          },
          {
            formal: 'That sounds perfect to me.',
            street: 'Sounds good / That sounds great, mate!',
            es: 'Me parece genial / Perfecto.',
            context: 'Para aceptar planes o propuestas.'
          }
        ],
        culturalSecrets: [
          '"Knackered" es súper británico pero totalmente apto para el trabajo y amigos (no es una palabrota).',
          '"Sound" como adjetivo significa fiable o perfecto: "He\'s a sound guy" (es un buen tío).'
        ],
        audioTips: '"Knackered" se pronuncia /næk.əd/ (la k no suena).',
        exercises: [
          {
            id: 'l2-e3',
            type: 'street_write',
            situation: 'Llegas a casa después de una jornada larguísima y te duelen hasta las pestañas.',
            question: 'Escribe cómo le dices a tu compañero que estás reventado de cansancio:',
            hint: 'Pista: "I\'m absolutely kn..."',
            acceptedAnswers: [
              'I\'m knackered',
              'I am knackered',
              'I\'m absolutely knackered',
              'I am absolutely knackered',
              'I\'m exhausted',
              'I am exhausted mate'
            ],
            sampleIdealAnswer: 'I\'m absolutely knackered',
            explanationEs: '"I\'m knackered" es la forma coloquial británica más extendida para decir que estás hecho polvo.',
            streetTip: 'Muy natural entre amigos y compañeros de piso.',
            xpReward: 25
          },
          {
            id: 'l2-e4',
            type: 'street_write',
            situation: 'Tu colega te propone pedir una pizza para cenar y a ti te parece una idea genial.',
            question: 'Escribe cómo le dices "Me parece genial / Me suena perfecto":',
            hint: 'Pista: "Sounds..."',
            acceptedAnswers: [
              'Sounds good!',
              'Sounds good',
              'Sounds great!',
              'Sounds great',
              'Sounds good mate!',
              'That sounds great!',
              'That sounds good'
            ],
            sampleIdealAnswer: 'Sounds good, mate!',
            explanationEs: '"Sounds good!" o "Sounds great!" es la forma natural y relajada de aceptar una sugerencia.',
            streetTip: 'Simple, educado y sin complicaciones.',
            xpReward: 25
          }
        ]
      }
    ],
    boss: {
      id: 'boss-2',
      levelId: 2,
      bossName: 'Big Dave "The Bouncer"',
      bossTitle: 'Portero del Pub The Red Lion',
      bossAvatar: '🚪',
      bossQuote: 'Alright! Let\'s see if you can hold a real conversation without getting confused, sunshine!',
      description: 'Escribe respuestas reales para demostrar que te desenvuelves con soltura en planes y situaciones sociales cotidianas.',
      passPercentage: 80,
      questions: [
        {
          id: 'b2-q1',
          type: 'street_write',
          situation: 'Un amigo te pregunta si te apetece cenar fuera porque no hay comida en la nevera.',
          question: 'Escribe cómo le dices que estás muerto de hambre:',
          hint: 'Pista: "I\'m st..." (termina en -ing)',
          acceptedAnswers: [
            'I\'m starving!',
            'I am starving',
            'I\'m starving mate',
            'I am proper starving',
            'I\'m proper starving'
          ],
          sampleIdealAnswer: 'I\'m starving, mate!',
          explanationEs: '"I\'m starving" es la forma cotidiana que usan los hablantes nativos en vez del plano "I am very hungry".',
          streetTip: 'Starving = muerto de hambre.',
          xpReward: 35
        },
        {
          id: 'b2-q2',
          type: 'street_write',
          situation: 'Acaban de traerte la bebida correcta a la mesa y todo está listo.',
          question: 'Escribe la palabra británica de 6 letras que significa "¡Arreglado / Solucionado!":',
          hint: 'Pista: Empieza por S... (Sorted)',
          acceptedAnswers: [
            'Sorted!',
            'Sorted',
            'All sorted!',
            'All sorted',
            'Sorted mate!',
            'Everything is sorted'
          ],
          sampleIdealAnswer: 'Sorted, mate!',
          explanationEs: '"Sorted!" significa que el problema está resuelto y todo está bajo control.',
          streetTip: 'La oirás decenas de veces al día en UK.',
          xpReward: 35
        },
        {
          id: 'b2-q3',
          type: 'street_write',
          situation: 'Alguien te propone un plan que no te convence del todo pero lo entiendes y lo aceptas.',
          question: 'Escribe la expresión británica de dos palabras que significa "Me parece justo / Comprensible":',
          hint: 'Pista: "Fair..."',
          acceptedAnswers: [
            'Fair enough',
            'Fair enough!',
            'Fair enough mate',
            'Fair play',
            'Fair play mate'
          ],
          sampleIdealAnswer: 'Fair enough, mate',
          explanationEs: '"Fair enough" es la respuesta universal para decir "Lo entiendo / Me parece razonable".',
          streetTip: 'Imprescindible en cualquier conversación cotidiana.',
          xpReward: 35
        }
      ]
    }
  },
  {
    id: 3,
    number: 3,
    districtName: 'El Metro & Mensajes del Día a Día',
    title: 'Local Commuter (Transporte y Mensajería)',
    badge: '🚇',
    rankTitle: 'Amo del Transporte y los Chats',
    color: 'from-sky-500 to-blue-600',
    borderColor: 'border-sky-300',
    bgColor: 'bg-sky-50',
    description: 'Aprende a avisar de retrasos, pedir favores a compañeros, disculparte de forma natural y entender los mensajes cotidianos.',
    requiredXP: 250,
    topics: [
      {
        id: 'l3-t1',
        levelId: 3,
        title: 'Mensajes Cotidianos y Avisos',
        subtitle: 'Avisar de que llegas tarde y pedir favores',
        icon: '📱',
        description: 'Frases que usas a diario por mensaje con compañeros de piso o de trabajo.',
        phrases: [
          {
            formal: 'I will arrive approximately 15 minutes late.',
            street: 'I\'m running about 15 minutes late / Running late!',
            es: 'Voy unos 15 minutos tarde / ¡Llego con retraso!',
            context: 'La forma exacta en que todo el mundo avisa de un imprevisto en el metro o carretera.'
          },
          {
            formal: 'Can you please replace me or attend the meeting for me?',
            street: 'Can you cover for me?',
            es: '¿Me puedes cubrir? / ¿Puedes dar la cara por mí?',
            context: 'Usado en el trabajo si no llegas a tiempo a una reunión.'
          },
          {
            formal: 'There is no problem at all.',
            street: 'No worries at all! / No problem, mate.',
            es: 'Sin problema ninguno / ¡Ni te preocupes!',
            context: 'Respuesta empática cuando alguien te avisa de que se retrasa.'
          }
        ],
        culturalSecrets: [
          '"I\'m running late" es mucho más natural que "I will be late".',
          '"No worries" es la respuesta más amistosa y común en el entorno laboral británico informal.'
        ],
        audioTips: 'Mantén un tono comprensivo y tranquilo.',
        exercises: [
          {
            id: 'l3-e5',
            type: 'street_write',
            situation: 'El metro se ha quedado parado en el túnel. Tienes que avisar a tu compañero de que vas con 10 minutos de retraso.',
            question: 'Escribe cómo le dices "Voy unos 10 minutos tarde":',
            hint: 'Pista: "I\'m running about..."',
            acceptedAnswers: [
              'I\'m running about 10 minutes late',
              'I am running about 10 minutes late',
              'Running about 10 minutes late',
              'I\'m running 10 minutes late',
              'Running 10 mins late',
              'I\'m running late, about 10 minutes'
            ],
            sampleIdealAnswer: 'I\'m running about 10 minutes late',
            explanationEs: '"I\'m running 10 minutes late" es la forma idiomática y natural que usa todo el mundo.',
            streetTip: 'Run late = ir con retraso.',
            xpReward: 30
          },
          {
            id: 'l3-e6',
            type: 'street_write',
            situation: 'Un compañero te pide disculpas por haber tardado en contestarte a un mensaje.',
            question: 'Escribe cómo le dices "¡Sin problema / No te preocupes!":',
            hint: 'Pista: "No worries..."',
            acceptedAnswers: [
              'No worries!',
              'No worries',
              'No worries at all!',
              'No worries mate!',
              'No problem at all!',
              'No problem mate!'
            ],
            sampleIdealAnswer: 'No worries at all!',
            explanationEs: '"No worries at all!" es cálido, empático y 100% natural.',
            streetTip: 'No worries = cero dramas.',
            xpReward: 30
          }
        ]
      }
    ],
    boss: {
      id: 'boss-3',
      levelId: 3,
      bossName: 'Sarah "The Tube Inspector"',
      bossTitle: 'Compañera de Curro y Veterana del Transporte',
      bossAvatar: '🚇',
      bossQuote: 'Mind the gap! Write clearly and show me you can handle everyday messaging like a native!',
      description: 'Escribe tus respuestas para resolver situaciones reales de transporte y mensajes laborales.',
      passPercentage: 80,
      questions: [
        {
          id: 'b3-q1',
          type: 'street_write',
          situation: 'Ves que las puertas del metro van a cerrarse y necesitas que tu amigo corra a toda prisa.',
          question: 'Escribe la expresión coloquial británica que significa "¡Corre a toda pastilla!" (usa el verbo leg):',
          hint: 'Pista: "Leg..."',
          acceptedAnswers: [
            'Leg it!',
            'Leg it',
            'We gotta leg it!',
            'Come on, leg it!',
            'Run for it!'
          ],
          sampleIdealAnswer: 'Leg it!',
          explanationEs: '"To leg it" significa salir corriendo a toda velocidad para no perder el transporte.',
          streetTip: 'Leg it = ¡a correr!',
          xpReward: 40
        },
        {
          id: 'b3-q2',
          type: 'street_write',
          situation: 'Miras por la ventana y está cayendo una lluvia torrencial sobre la calle.',
          question: 'Escribe cómo lo dirías usando el verbo británico cotidiano "chuck it down":',
          hint: 'Pista: "It\'s chucking..."',
          acceptedAnswers: [
            'It\'s chucking it down',
            'It is chucking it down',
            'It\'s chucking it down out there',
            'It\'s pouring down',
            'It is pouring down'
          ],
          sampleIdealAnswer: 'It\'s chucking it down',
          explanationEs: 'En UK nadie dice "raining cats and dogs". Dicen "it\'s chucking it down" o "it\'s pouring".',
          streetTip: 'Chucking it down = llueve a mares.',
          xpReward: 40
        }
      ]
    }
  }
];

export const LEVEL_REQUIREMENTS = {
  1: { minXP: 0, prevBossRequired: null },
  2: { minXP: 100, prevBossRequired: 1 },
  3: { minXP: 250, prevBossRequired: 2 }
};

export function canUnlockLevel(levelId: number, xp: number, bossesDefeated: number[]): {
  canUnlock: boolean;
  missingXP: number;
  needsBoss: boolean;
  prevBossName?: string;
} {
  if (levelId === 1) return { canUnlock: true, missingXP: 0, needsBoss: false };
  const req = LEVEL_REQUIREMENTS[levelId as keyof typeof LEVEL_REQUIREMENTS];
  if (!req) return { canUnlock: false, missingXP: 9999, needsBoss: true };

  const missingXP = Math.max(0, req.minXP - xp);
  const needsBoss = req.prevBossRequired !== null && !bossesDefeated.includes(req.prevBossRequired);
  const prevLevel = STREET_LEVELS.find((l) => l.id === req.prevBossRequired);

  return {
    canUnlock: missingXP === 0 && !needsBoss,
    missingXP,
    needsBoss,
    prevBossName: prevLevel?.boss.bossName
  };
}
