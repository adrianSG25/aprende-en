import { StreetLevel } from '../types/streetGame';

export const STREET_LEVELS: StreetLevel[] = [
  {
    id: 1,
    number: 1,
    districtName: 'Heathrow & El Súper de la Esquina',
    title: 'Recién aterrizao (Supervivencia Básica)',
    badge: '🧳',
    rankTitle: 'Guiri Despistado',
    color: 'from-amber-500 to-orange-500',
    borderColor: 'border-amber-300',
    bgColor: 'bg-amber-50',
    description: 'Aprende a saludar como un local, pagar la compra sin hacer el ridículo y pedir un café o comida sin sonar como un robot del siglo XIX.',
    requiredXP: 0,
    topics: [
      {
        id: 'l1-t1',
        levelId: 1,
        title: 'Saludos y Despedidas de Calle',
        subtitle: 'Olvídate de "How do you do?" y "Good morning sir"',
        icon: '👋',
        description: 'En el Reino Unido nadie usa el inglés encorsetado de los libros de texto para saludar a un cajero, a un colega o al conductor del autobús.',
        phrases: [
          {
            formal: 'How are you today?',
            street: 'Alright? / You alright, mate?',
            es: '¿Qué pasa? / ¿Todo bien?',
            context: 'El 90% de las veces no esperan que les cuentes tu vida. La respuesta correcta británica es simplemente devolver "Alright? You?" y seguir caminando.',
            notes: 'A veces suena casi como una sola palabra rápida: "Y\'alright?"'
          },
          {
            formal: 'Thank you very much.',
            street: 'Cheers / Ta / Nice one!',
            es: '¡Gracias! / ¡De lujo! / ¡De diez!',
            context: 'Usado con conductores de autobús, camareros, al aguantar una puerta o en tiendas.',
            notes: '"Cheers" vale para dar gracias, brindar o despedirse en la calle.'
          },
          {
            formal: 'Goodbye, have a pleasant day.',
            street: 'Take care / See ya / Have a good one!',
            es: '¡Cuídate! / ¡Nos vemos! / ¡Que vaya bien!',
            context: 'La forma más universal y cálida para despedirte de cualquiera.'
          },
          {
            formal: 'Excuse me, may I pass?',
            street: 'Sorry! / Scuse me, mate',
            es: 'Perdona / Ojo, paso',
            context: 'Los británicos dicen "Sorry" por todo: si chocan contigo, si tú chocas con ellos, o para pedir paso.',
            notes: 'Si alguien tropieza contigo en el metro, ellos dirán "Sorry" y tú debes responder "Sorry" de vuelta.'
          }
        ],
        culturalSecrets: [
          'En UK "Alright?" es un saludo, no una pregunta médica. Si respondes "Well, my back hurts and I am stressed", el británico se quedará paralizado del susto.',
          'Decir "Cheers, mate" al bajarte del autobús en Londres o cualquier pueblo de UK es ley no escrita de cortesía urbana.'
        ],
        audioTips: 'Pronuncia "Alright?" con tono plano o ligeramente ascendente ("Aight?"). No marques la R como en español.',
        exercises: [
          {
            id: 'l1-e1',
            type: 'street_translate',
            situation: 'Vas por la calle y te cruzas con un compañero de curro británico.',
            question: 'Él te dice con una sonrisa rápida: "Alright, mate?". ¿Cuál es la respuesta más natural en UK?',
            options: [
              'Alright? You good?',
              'No, today I am having a lot of psychological troubles.',
              'I am extraordinarily fine, thank you very much for inquiring.',
              'My name is Adrian and I live in London.'
            ],
            correctIndex: 0,
            explanationEs: 'En UK "Alright?" es un saludo reflejo. Lo natural es devolver "Alright? You good?" o "Yeah, not bad mate, you?". No te pares a contar penas.',
            streetTip: 'Devuelve la pregunta con otro "Alright?" y quedas como un auténtico local.',
            xpReward: 15
          },
          {
            id: 'l1-e2',
            type: 'situation_choice',
            situation: 'El conductor del autobús te abre la puerta y te bajas en tu parada.',
            question: '¿Qué le dices al conductor al bajar para ser educado como un británico de verdad?',
            options: [
              'Cheers drive! / Cheers mate!',
              'I bid you farewell, Mr. Chauffeur.',
              'Thank you for executing your contracted duty.',
              'Goodbye forever.'
            ],
            correctIndex: 0,
            explanationEs: '"Cheers mate!" o "Cheers drive!" es la frase clásica y respetuosa que dice casi todo británico al abandonar el bus.',
            streetTip: '"Cheers" es la navaja suiza británica: gracias, adiós y brindis a la vez.',
            xpReward: 15
          },
          {
            id: 'l1-e3',
            type: 'slang_cloze',
            situation: 'Un cajero te entrega la bolsa y el ticket de compra.',
            question: 'El cajero te sonríe y te dice: "There you go, mate. Have a good _____!"',
            options: ['one', 'existence', 'passage', 'fortune'],
            correctIndex: 0,
            explanationEs: '"Have a good one!" es la expresión universal inglesa para desear que tengas un buen día sin especificar día, tarde o noche.',
            streetTip: 'Nunca falla: sirve a las 9:00 AM y a las 23:00 PM.',
            xpReward: 15
          }
        ]
      },
      {
        id: 'l1-t2',
        levelId: 1,
        title: 'Pasta, Precios y la Tienda de la Esquina',
        subtitle: 'Quids, Tenners, Fivers y "Corner Shops"',
        icon: '💷',
        description: 'Nadie en la calle dice "pounds sterling". Si no conoces las palabras de la pasta en UK, te perderás con el cambio.',
        phrases: [
          {
            formal: 'That costs one pound.',
            street: 'That\'s a quid / It\'s one quid.',
            es: 'Cuesta un pavo / una libra.',
            context: '"Quid" nunca lleva S en plural: se dice "five quid", "fifty quid", jamás "fifty quids".'
          },
          {
            formal: 'A five-pound note / A ten-pound note.',
            street: 'A fiver / A tenner.',
            es: 'Un billete de 5 pavos / Un billete de 10 pavos.',
            context: 'Pedir cambio o hablar de billetes: "Got change for a tenner?"'
          },
          {
            formal: 'A small local convenience grocery store.',
            street: 'The corner shop / The off-licence (offie).',
            es: 'La tienda de la esquina / el chino / ultramarinos del barrio.',
            context: 'Donde vas a comprar leche a las 22:00, patatas o bebidas frías.'
          },
          {
            formal: 'I will quickly enter the shop for a moment.',
            street: 'Just popping into the shop.',
            es: 'Entro un segundo a la tienda y salgo.',
            context: 'El verbo "to pop" significa ir y volver rápido a un sitio: "pop in", "pop out".'
          }
        ],
        culturalSecrets: [
          'Un billete de 5 libras es un "fiver", uno de 10 es un "tenner", y 1000 libras es un "grand".',
          'En las tiendas de conveniencia ("corner shops" o "offies"), al pagar con tarjeta contactless el dependiente solo te dirá "Tap it there, mate" (Pásala por ahí).'
        ],
        audioTips: '"Quid" rima con "kid". Recuerda: "10 quid", "100 quid" (¡sin -s final!).',
        exercises: [
          {
            id: 'l1-e4',
            type: 'street_translate',
            situation: 'Estás en el puesto del mercadillo y preguntas el precio de una sudadera.',
            question: 'El vendedor te dice: "That\'ll be twenty quid, mate". ¿Cuánto te está pidiendo?',
            options: [
              '20 libras esterlinas (£20)',
              '20 peniques (0.20 libras)',
              '200 libras esterlinas',
              'El precio está por negociar'
            ],
            correctIndex: 0,
            explanationEs: '"Quid" es el término de calle para la libra esterlina (£). "Twenty quid" son 20 libras.',
            streetTip: 'Regla de oro: 1 quid = 1 libra. Y no cambia en plural: "10 quid", no "10 quids".',
            xpReward: 20
          },
          {
            id: 'l1-e5',
            type: 'slang_cloze',
            situation: 'Quieres saber si un amigo tiene cambio de un billete de 10 libras.',
            question: 'Le preguntas: "Hey mate, do you have change for a _____?"',
            options: ['tenner', 'ten-dollar', 'tenty', 'fiver-double'],
            correctIndex: 0,
            explanationEs: 'Un billete de £10 se llama "tenner" en toda Gran Bretaña. Uno de £5 es un "fiver".',
            streetTip: 'A fiver (£5), a tenner (£10). Memorízalos, los oirás a diario.',
            xpReward: 20
          }
        ]
      }
    ],
    boss: {
      id: 'boss-1',
      levelId: 1,
      bossName: 'Terry "The Cabbie"',
      bossTitle: 'Taxista Veterano de Londres y Cajero del Tesco Express',
      bossAvatar: '🚕',
      bossQuote: 'Alright guv\'nor! Let\'s see if you can survive 5 minutes on London streets without sounding like Queen Elizabeth!',
      description: 'Supera 5 situaciones reales de calle sin fallar más de una (80% mínimo) para desbloquear el Nivel 2 y ganarte el respeto del barrio.',
      passPercentage: 80,
      questions: [
        {
          id: 'b1-q1',
          type: 'situation_choice',
          situation: 'Te subes al taxi negro de Terry. Él te mira por el retrovisor y te suelta: "Alright mate, where to?"',
          question: '¿Cómo le dices a dónde vas con soltura británica?',
          options: [
            'Camden Market, please mate / Camden, cheers!',
            'Good afternoon chauffeur, transport me immediately to Camden.',
            'Yes, I am physically alright. Let us discuss philosophy.',
            'I require your automobile services.'
          ],
          correctIndex: 0,
          explanationEs: 'Sencillo, directo y con "mate" o "please mate". Nada de formalismos pomposos.',
          streetTip: 'Los taxistas británicos aprecian la naturalidad: destino + "please mate".',
          xpReward: 30
        },
        {
          id: 'b1-q2',
          type: 'street_translate',
          situation: 'Al llegar a tu destino, Terry señala el taxímetro y dice: "That\'s a tenner and two quid for the luggage, mate".',
          question: '¿Cuánto le tienes que pagar en total?',
          options: [
            '12 libras (£12)',
            '22 libras (£22)',
            '102 libras (£102)',
            '2 libras y 10 peniques'
          ],
          correctIndex: 0,
          explanationEs: '"A tenner" son £10 y "two quid" son £2. Total = £12.',
          streetTip: 'Tenner (£10) + 2 quid (£2) = 12 libras bien pagadas.',
          xpReward: 30
        },
        {
          id: 'b1-q3',
          type: 'slang_cloze',
          situation: 'Entras al Tesco Express a por una botella de agua y un bocadillo. El dependiente te dice que solo va a entrar al almacén un segundo.',
          question: 'Te dice: "Just _____ into the back to grab fresh sandwiches, back in a second!"',
          options: ['popping', 'exploding', 'falling', 'running forever'],
          correctIndex: 0,
          explanationEs: '"To pop into" es el verbo callejero por excelencia para "entrar/ir un segundito a un sitio".',
          streetTip: '"I\'m popping out", "Pop in whenever you want". Súper británico.',
          xpReward: 30
        },
        {
          id: 'b1-q4',
          type: 'situation_choice',
          situation: 'Caminas distraído por el pasillo del súper y sin querer rozas el hombro de una mujer.',
          question: '¿Qué es lo que dice un británico de forma casi instintiva en ese milisegundo?',
          options: [
            '"Oh, sorry! / So sorry!"',
            '"Please do not execute a police report on me."',
            '"I am not guilty of physical violence."',
            'Quedarse en silencio y mirarla fijamente.'
          ],
          correctIndex: 0,
          explanationEs: 'En UK el "Sorry!" es un acto reflejo automático para cualquier roce o imprevisto social.',
          streetTip: 'Si alguien te roza, pide perdón tú también; es la cortesía británica por defecto.',
          xpReward: 30
        },
        {
          id: 'b1-q5',
          type: 'street_translate',
          situation: 'Le das un billete de 20 al cajero, te da el cambio y te dice: "Cheers, have a good one!"',
          question: '¿Qué significa esa frase exactamente?',
          options: [
            'Gracias, ¡que tengas un buen día!',
            'Salud, bébete una cerveza.',
            'Cuidado con la salida de emergencia.',
            'Tienes que comprar un producto más.'
          ],
          correctIndex: 0,
          explanationEs: '"Cheers, have a good one!" = "¡Gracias, que vaya bien el día/la tarde!".',
          streetTip: 'La frase más común en cualquier mostrador del Reino Unido.',
          xpReward: 30
        }
      ]
    }
  },
  {
    id: 2,
    number: 2,
    districtName: 'El Pub The Red Lion & La Noche de Pintas',
    title: 'Parroquiano del Pub (El Inglés de Bar)',
    badge: '🍺',
    rankTitle: 'Bebedor de Pintas con Labia',
    color: 'from-emerald-500 to-teal-600',
    borderColor: 'border-emerald-300',
    bgColor: 'bg-emerald-50',
    description: 'Aprende las reglas de oro del pub, el sistema sagrado de rondas, cómo expresar emociones reales (knackered, buzzing, gutted) y detectar cosas "dodgy".',
    requiredXP: 100,
    topics: [
      {
        id: 'l2-t1',
        levelId: 2,
        title: 'El Ritual de la Ronda y el Pub',
        subtitle: 'Cómo pedir sin romper la ley sagrada del "My round"',
        icon: '🍻',
        description: 'En un pub británico nunca vas a la mesa a que te atiendan: vas a la barra. Y los amigos no pagan su propia copa: pagan por turnos de ronda ("rounds").',
        phrases: [
          {
            formal: 'Would you like to drink some beer with me?',
            street: 'Fancy a pint? / Anyone fancy a drink?',
            es: '¿Te hace una pinta? / ¿Nos tomamos algo?',
            context: 'El verbo "fancy" se usa para cualquier cosa que te apetezca: "Fancy a coffee?", "Fancy some food?"'
          },
          {
            formal: 'It is my turn to purchase beverages for everybody.',
            street: 'My round! / It\'s on me / I\'ll get these.',
            es: '¡Esta ronda la pago yo! / ¡Invito yo!',
            context: 'Saltarse tu turno de ronda en el pub ("dodging a round") es el mayor pecado social en el Reino Unido.'
          },
          {
            formal: 'He is heavily intoxicated with alcohol.',
            street: 'He is totally pissed / hammered / smashed.',
            es: 'Va pedo perdido / va cieguísimo.',
            context: '¡PELIGRO!: En inglés de EE.UU. "pissed" significa enfadado ("pissed off"). En Reino Unido "pissed" a secas significa BORRACHO.',
            notes: 'Si un inglés dice "I got so pissed yesterday", no dice que se enfadó, ¡dice que se pilló una buena cogorza!'
          },
          {
            formal: 'Everything is resolved and under control.',
            street: 'Sorted! / All sorted, mate.',
            es: '¡Arreglado! / ¡Solucionado! / ¡Listo!',
            context: 'Cuando consigues mesa, te traen la comida o pagas la cuenta.'
          }
        ],
        culturalSecrets: [
          'En los pubs tradicionales de UK no hay servicio de mesas: te acercas a la barra, esperas tu turno sin hacer aspavientos y pides todo de golpe.',
          'Si alguien te invita a una pinta diciendo "I got this", se asume que tú pagarás la siguiente ronda cuando los vasos estén casi vacíos.'
        ],
        audioTips: '"Fancy a pint?" suena con un ritmo cantarín: /fæn-si ə paɪnt/. Muy natural y amigable.',
        exercises: [
          {
            id: 'l2-e1',
            type: 'street_translate',
            situation: 'Termina la jornada laboral y tu compañero de curro te mira y dice: "Fancy a pint, mate?".',
            question: '¿Qué te está preguntando realmente?',
            options: [
              '¿Te apetece tomarte una cerveza / ir al pub?',
              '¿Tienes dinero para prestarme?',
              '¿Quieres que te pinte un cuadro?',
              '¿Has terminado tu informe?'
            ],
            correctIndex: 0,
            explanationEs: '"Fancy a pint?" es la invitación informal británica por excelencia para ir a tomar algo después del trabajo.',
            streetTip: '"To fancy" = apetecer ("Fancy a bite to eat?", "Fancy a brew?").',
            xpReward: 20
          },
          {
            id: 'l2-e2',
            type: 'situation_choice',
            situation: 'Estás en el pub con 3 amigos ingleses. Ya os habéis tomado dos rondas que pagaron ellos dos.',
            question: 'Los vasos se están vaciando. ¿Cuál es el comportamiento social correcto para no quedar como un aprovechado?',
            options: [
              'Levantarte y decir con orgullo: "Right lads, my round! What are you having?"',
              'Mirar el móvil y esperar a que otro pague la tercera.',
              'Pedir la cuenta por separado para que el camarero divida los céntimos.',
              'Salir corriendo al baño hasta que traigan las bebidas.'
            ],
            correctIndex: 0,
            explanationEs: 'En UK el sistema de rondas es sagrado. Cuando te toca, dices "My round!" y vas a la barra a por las de todos.',
            streetTip: 'Ser un "tightwad" (tacaño que esquiva su ronda) te condena en cualquier grupo británico.',
            xpReward: 25
          },
          {
            id: 'l2-e3',
            type: 'sarcasm_radar',
            situation: 'Un amigo inglés te cuenta: "Mate, Jack was absolutely pissed on Friday, he couldn\'t even find his own shoes".',
            question: '¿Qué le pasó a Jack según el inglés británico?',
            options: [
              'Iba borrachísimo como una cuba.',
              'Estaba súper enfadado con el camarero.',
              'Tenía muchas ganas de ir al baño.',
              'Había perdido su teléfono de camino a casa.'
            ],
            correctIndex: 0,
            explanationEs: 'En UK "pissed" a secas = borracho / embriagado. (En USA sería enfadado, pero en UK para enfadado dicen "pissed off").',
            streetTip: 'Gran trampa para hispanohablantes: pissed en UK = borracho.',
            xpReward: 25
          }
        ]
      },
      {
        id: 'l2-t2',
        levelId: 2,
        title: 'Emociones Reales de Calle',
        subtitle: 'Knackered, Chuffed, Gutted y Dodgy',
        icon: '🎭',
        description: 'La gente no dice "I am exhausted" ni "I feel sad". Tienen un vocabulario callejero mil veces más expresivo y divertido.',
        phrases: [
          {
            formal: 'I am extremely exhausted after working.',
            street: 'I\'m absolutely knackered!',
            es: '¡Estoy reventado / molido / hecho polvo!',
            context: 'Usado para cansancio físico o mental extremo.'
          },
          {
            formal: 'I am very pleased and proud about this.',
            street: 'I\'m proper chuffed! / Buzzing!',
            es: '¡Estoy contentísimo / flipando de contento / de subidón!',
            context: '"Chuffed" es orgullo y satisfacción; "buzzing" es euforia pura y energía.'
          },
          {
            formal: 'I feel deeply disappointed and heartbroken.',
            street: 'I\'m gutted, mate.',
            es: 'Estoy destrozado / me he quedado chafado / qué bajón.',
            context: 'Si tu equipo pierde, si cancelan tu vuelo o si suspenden tu fiesta.'
          },
          {
            formal: 'That person or object appears suspicious or untrustworthy.',
            street: 'That looks well dodgy / He\'s a dodgy bloke.',
            es: 'Eso tiene una pinta súper turbia / Es un tipo sospechoso.',
            context: 'Una comida rara, un callejón oscuro, un enlace de internet sospechoso o una persona de poca confianza.'
          }
        ],
        culturalSecrets: [
          '"Proper" y "well" se usan en la calle en UK como potenciadores (en vez de "very"): "well dodgy" (súper sospechoso), "proper good" (buenísimo).',
          '"Can\'t be bothered" (abreviado en WhatsApp como CBA) es el lema no oficial de la pereza británica.'
        ],
        audioTips: '"Knackered" empieza con N muda: se pronuncia /ˈnæk.əd/.',
        exercises: [
          {
            id: 'l2-e4',
            type: 'street_translate',
            situation: 'Has tenido un turno de 12 horas cargando cajas y apenas te mantienes en pie.',
            question: 'Tu colega te propone ir a correr al parque. ¿Qué le dices para sonar 100% callejero?',
            options: [
              'Mate, I can\'t. I\'m absolutely knackered!',
              'I have biological fatigue in my muscular tissues.',
              'My energy is inferior to normal parameters.',
              'I refuse because running produces sweat.'
            ],
            correctIndex: 0,
            explanationEs: '"I\'m knackered" es la forma más común en UK de decir que estás reventado de cansancio.',
            streetTip: '"Knackered" = reventado / agotado.',
            xpReward: 20
          },
          {
            id: 'l2-e5',
            type: 'slang_cloze',
            situation: 'Compraste un billete de tren y al llegar a la estación resulta que está cancelado por huelga.',
            question: 'Le mandas un mensaje a tu novia diciendo: "Train is cancelled, absolutely _____! Won\'t be home till 10."',
            options: ['gutted', 'frozen', 'electrified', 'polite'],
            correctIndex: 0,
            explanationEs: '"Gutted" significa destrozado/decepcionado por una mala noticia o faena.',
            streetTip: 'Cuando te pasa una desgracia cotidiana en UK: "Proper gutted".',
            xpReward: 20
          }
        ]
      }
    ],
    boss: {
      id: 'boss-2',
      levelId: 2,
      bossName: 'Big Dave "The Bouncer"',
      bossTitle: 'Portero de Discoteca en Shoreditch y Amo de la Barra',
      bossAvatar: '🚪',
      bossQuote: 'Oi! You can\'t step foot in this venue unless you know how to handle your pints and talk like a proper local!',
      description: 'Demuestra que dominas las expresiones de pub, las emociones de calle y la jerga social de UK para que Big Dave te abra las puertas.',
      passPercentage: 80,
      questions: [
        {
          id: 'b2-q1',
          type: 'street_translate',
          situation: 'Ves a un tipo en la esquina del callejón intentando vender relojes caros a 10 libras en una bolsa de plástico.',
          question: 'Le dices a tu amigo por lo bajo: "Mate, that looks well _____".',
          options: ['dodgy', 'splendid', 'academic', 'courteous'],
          correctIndex: 0,
          explanationEs: '"Dodgy" significa turbio, sospechoso o de mala calidad. Y "well dodgy" = súper turbio.',
          streetTip: 'Dodgy es una de las 5 palabras más usadas en el día a día británico.',
          xpReward: 35
        },
        {
          id: 'b2-q2',
          type: 'situation_choice',
          situation: 'Acaban de avisarte de que te han dado el curro que querías y te van a subir el sueldo.',
          question: 'Llamas a tu mejor amigo. ¿Cómo le transmites esa euforia con jerga británica?',
          options: [
            'Mate! I got the job! I\'m absolutely buzzing, proper chuffed!',
            'Good afternoon, I am formally experiencing psychological gratification.',
            'The corporation has accepted my labour contract, how nice.',
            'I am moderately okay with this development.'
          ],
          correctIndex: 0,
          explanationEs: '"Buzzing" (eufórico/de subidón) y "proper chuffed" (orgullosísimo y feliz) son la combinación perfecta.',
          streetTip: '"I\'m buzzing!" es lo que gritan los futbolistas y los chavales cuando algo sale redondo.',
          xpReward: 35
        },
        {
          id: 'b2-q3',
          type: 'sarcasm_radar',
          situation: 'Tu colega Dave lleva 8 pintas de sidra y empieza a cantar encima de una mesa.',
          question: 'El camarero te mira y te dice: "Mate, your friend is proper pissed, sort him out". ¿Qué te pide el camarero?',
          options: [
            'Que te lleves a tu amigo porque va borrachísimo y desmadrado.',
            'Que calmes a tu amigo porque está muy enfadado con el gobierno.',
            'Que le pagues otra cerveza para que siga cantando.',
            'Que cantes con él para animar el pub.'
          ],
          correctIndex: 0,
          explanationEs: '"Proper pissed" = totalmente ebrio. Y "sort him out" = contrólalo / hazte cargo de él.',
          streetTip: '"Sort it out!" significa "soluciónalo / pon orden".',
          xpReward: 35
        },
        {
          id: 'b2-q4',
          type: 'street_translate',
          situation: 'Son las 21:00 de un domingo lluvioso. Te invitan a una fiesta al otro lado de la ciudad.',
          question: 'Estás en el sofá con manta y no te apetece nada moverte. ¿Qué frase resume perfectamente esa pereza?',
          options: [
            'Can\'t be bothered, to be fair.',
            'My kinetic impulses are temporarily unavailable.',
            'I refuse the festive congregation.',
            'I shall hibernate according to British law.'
          ],
          correctIndex: 0,
          explanationEs: '"Can\'t be bothered" (no me apetece / no me da la gana / qué pereza) es la frase reina británica.',
          streetTip: 'La abreviatura reina de WhatsApp en UK: CBA ("Can\'t be bothered").',
          xpReward: 35
        },
        {
          id: 'b2-q5',
          type: 'slang_cloze',
          situation: 'Un colega te ayuda a encontrar tus llaves perdidas en el suelo del pub. Todo arreglado.',
          question: 'Le das una palmada en la espalda y le dices: "Nice one mate, you\'re a legend! Everything\'s _____!"',
          options: ['sorted', 'liquefied', 'punctual', 'condemned'],
          correctIndex: 0,
          explanationEs: '"Sorted!" significa que el problema está resuelto, arreglado y zanjado.',
          streetTip: 'Sorted = problema resuelto. Lo oirás decenas de veces al día.',
          xpReward: 35
        }
      ]
    }
  },
  {
    id: 3,
    number: 3,
    districtName: 'El Metro de Londres & Grupos de WhatsApp',
    title: 'Local Commuter (Mensajería y Transporte)',
    badge: '🚇',
    rankTitle: 'Amo del Metro y de los Chats',
    color: 'from-sky-500 to-blue-600',
    borderColor: 'border-sky-300',
    bgColor: 'bg-sky-50',
    description: 'Aprende a descifrar los mensajes reales de WhatsApp llenos de siglas que usan los británicos (cba, ngl, tbh, innit, fairs) y a moverte en el transporte público sin dramas.',
    requiredXP: 250,
    topics: [
      {
        id: 'l3-t1',
        levelId: 3,
        title: 'El Diccionario Secreto de WhatsApp en UK',
        subtitle: 'CBA, NGL, TBH, INNIT y la famosa "X" al final',
        icon: '📱',
        description: 'Si abres un chat con un colega de UK o con compañeros de curro jóvenes, parece que escriban en código militar.',
        phrases: [
          {
            formal: 'I cannot be bothered / I am too lazy.',
            street: 'cba (o "can\'t be asked")',
            es: 'Me da pereza máxima / Paso olímpicamente.',
            context: '"cba to cook tonight, fancy ordering a pizza?"'
          },
          {
            formal: 'Not going to lie / To be honest.',
            street: 'ngl / tbh / tbf',
            es: 'No te voy a mentir / Siendo sincero / Para ser justos.',
            context: '"ngl that film was rubbish tbh"'
          },
          {
            formal: 'Fair enough / I understand and accept that.',
            street: 'fairs / fair play',
            es: 'Me parece justo / Lo veo bien / Te lo compro.',
            context: 'Respuesta rápida de WhatsApp cuando alguien te cancela un plan razonablemente: "fairs mate, see ya tomorrow".'
          },
          {
            formal: 'Friendly kiss / Warm affection.',
            street: 'x / xx / xxx',
            es: 'Besito / afecto amistoso informal.',
            context: 'Los británicos ponen una "x" al final de los mensajes incluso con compañeros de trabajo o amigos sin ninguna connotación romántica.',
            notes: 'Si un inglés te pone "Cheers mate x", no está ligando contigo, es solo cordialidad cálida británica.'
          }
        ],
        culturalSecrets: [
          'La "x" al final de los mensajes es casi una puntuación afectuosa en UK. Dejar de ponerla de repente a veces se interpreta como que estás enfadado.',
          '"Innit" es la contracción universal de "isn\'t it?", pero en la calle se usa para dar la razón a cualquier cosa: "Cold today!" -> "Innit!" (¡Totalmente!).'
        ],
        audioTips: '"Innit" se pronuncia rápido y seco: /ˈɪn.ɪt/.',
        exercises: [
          {
            id: 'l3-e1',
            type: 'whatsapp_decode',
            situation: 'Recibes este mensaje de tu compañero de piso inglés a las 20:00.',
            incomingMessage: '"u alright mate? cba to walk to the gym, fancy a cheeky takeaway instead? ngl am starving xx"',
            question: '¿Qué te está diciendo tu compañero exactamente?',
            options: [
              'Que le da pereza ir al gimnasio, le apetece pedir comida a domicilio y no va a mentir: está muerto de hambre.',
              'Que está en el gimnasio haciendo pesas y te comprará comida saludable.',
              'Que ha perdido la cartera y te pide dinero para el taxi.',
              'Que te declara su amor romántico por las "xx" del final.'
            ],
            correctIndex: 0,
            explanationEs: 'cba = can\'t be bothered (le da pereza). cheeky takeaway = comida para llevar improvisada y golosa. ngl = not gonna lie (no te voy a mentir). xx = besos informales cordiales.',
            streetTip: '"Cheeky" se usa en UK para pequeños caprichos traviesos o espontáneos: "a cheeky pint", "a cheeky Nando\'s".',
            xpReward: 25
          },
          {
            id: 'l3-e2',
            type: 'street_translate',
            situation: 'Un amigo te dice por chat: "I can\'t come tonight, my boss gave me extra work". Tú lo entiendes y no te parece mal.',
            question: '¿Cuál es la respuesta de una sola palabra más natural y usada en UK para decir "Entendido / Me parece justo"?',
            options: ['Fairs.', 'Judicially.', 'Equitable.', 'I agree with the constitution.'],
            correctIndex: 0,
            explanationEs: '"Fairs" (o "Fair enough / Fair play") es la forma de calle por excelencia para decir "Lo entiendo / Me parece comprensible".',
            streetTip: '"Fairs" se usa a todas horas en WhatsApp británico.',
            xpReward: 25
          }
        ]
      },
      {
        id: 'l3-t2',
        levelId: 3,
        title: 'Sobrevivir al Transporte y al Clima',
        subtitle: 'The Tube, "Leg it" y quejarse de la lluvia',
        icon: '🌧️',
        description: 'El metro de Londres y el tiempo son los dos temas sagrados de conversación de cualquier persona en las islas británicas.',
        phrases: [
          {
            formal: 'Run fast because you will miss the train.',
            street: 'Leg it! / We gotta leg it!',
            es: '¡Corre que nos quedamos en tierra! / ¡A escape!',
            context: 'Verbo coloquial británico para salir corriendo a toda prisa.'
          },
          {
            formal: 'It is raining very heavily.',
            street: 'It\'s tipping it down / pissing it down / chucking it down.',
            es: 'Está cayendo la del pulpo / llueve a mares.',
            context: 'Nadie en UK dice "it is raining cats and dogs" en la vida real. Dicen "it\'s chucking it down".'
          },
          {
            formal: 'A short nap or sleep.',
            street: 'Having a kip.',
            es: 'Echar una cabezadita / echarse un sueñecito.',
            context: '"I\'m gonna have a quick kip on the train."'
          },
          {
            formal: 'Please leave a gap on the train doorway.',
            street: 'Mind the gap / Let passengers off first.',
            es: 'Atención al hueco / Dejen salir antes de entrar.',
            context: 'La norma no escrita más sagrada del metro: nunca subas al vagón antes de que haya salido la gente.'
          }
        ],
        culturalSecrets: [
          'En las escaleras mecánicas del metro ("the Tube"), ponte SIEMPRE a la derecha. Si te paras a la izquierda, sentirás la furia pasivo-agresiva de 50 londinenses suspirando detrás de ti.',
          'Quejarse del tiempo no es una necesidad meteorológica, es la forma estándar de entablar amistad con cualquier desconocido en una parada de autobús.'
        ],
        audioTips: '"Mind the gap" rima con "cap". En las estaciones lo oirás con tono autoritario clásico.',
        exercises: [
          {
            id: 'l3-e3',
            type: 'street_translate',
            situation: 'Ves que las puertas del metro empiezan a pitar para cerrarse.',
            question: 'Tu colega te agarra del brazo y grita: "Come on mate, leg it!". ¿Qué te está pidiendo?',
            options: [
              '¡Que eches a correr a toda prisa para llegar a tiempo!',
              'Que te sientes en el suelo.',
              'Que mires a ver si te has roto una pierna.',
              'Que le compres un billete de metro.'
            ],
            correctIndex: 0,
            explanationEs: '"To leg it" significa salir por patas / correr a toda pastilla.',
            streetTip: '"We had to leg it" = tuvimos que salir corriendo.',
            xpReward: 25
          },
          {
            id: 'l3-e4',
            type: 'slang_cloze',
            situation: 'Miras por la ventana de la oficina y cae un diluvio torrencial sobre el asfalto.',
            question: 'Tu compañero inglés se acerca a la ventana y dice: "Blimey, it\'s absolutely _____ it down out there!".',
            options: ['chucking', 'singing', 'flying', 'smiling'],
            correctIndex: 0,
            explanationEs: '"It\'s chucking it down" (o "tipping it down") es la forma real en que un británico describe la lluvia torrencial cotidiana.',
            streetTip: 'Olvídate de "cats and dogs". En la calle es "chucking it down".',
            xpReward: 25
          }
        ]
      }
    ],
    boss: {
      id: 'boss-3',
      levelId: 3,
      bossName: 'Sarah "The Tube Inspector"',
      bossTitle: 'Revisora de la Línea Central y Moderadora de WhatsApp de Vecinos',
      bossAvatar: '🚇',
      bossQuote: 'Stand clear of the closing doors! If you can\'t read our texts or survive a signal failure without crying, step off the platform!',
      description: 'Supera 5 situaciones complejas de mensajes de texto en jerga, retrasos y conversaciones cotidianas de transporte con al menos un 80% de acierto.',
      passPercentage: 80,
      questions: [
        {
          id: 'b3-q1',
          type: 'whatsapp_decode',
          situation: 'Mensaje de WhatsApp de tu compañero de trabajo británico:',
          incomingMessage: '"morning mate, central line is a complete nightmare atm, signal failure at Holborn. gonna be 20 mins late, cover for me? cheers x"',
          question: '¿Qué significa "atm" en ese mensaje?',
          options: [
            'At the moment (en este momento / ahora mismo)',
            'Automatic Teller Machine (cajero automático)',
            'At the morning (por la mañana)',
            'Always trust me (confía en mí)'
          ],
          correctIndex: 0,
          explanationEs: 'atm = "at the moment" (en este momento). En WhatsApp se usa constantemente.',
          streetTip: 'atm = ahora mismo. Central line is delayed atm.',
          xpReward: 40
        },
        {
          id: 'b3-q2',
          type: 'street_translate',
          situation: 'Sales del trabajo y tienes 45 minutos antes de cenar. Te sientes agotado.',
          question: 'Le dices a tu pareja: "I\'m going to have a 20-minute _____ before dinner, wake me up please".',
          options: ['kip', 'snort', 'jump', 'quid'],
          correctIndex: 0,
          explanationEs: '"A kip" es una siesta o cabezadita en inglés británico informal.',
          streetTip: 'Have a kip = echar una cabezadita.',
          xpReward: 40
        },
        {
          id: 'b3-q3',
          type: 'sarcasm_radar',
          situation: 'El tren se detiene 40 minutos en medio de un túnel oscuro sin aire acondicionado. Un inglés a tu lado suspira y dice: "Well, isn\'t this lovely?".',
          question: '¿Qué opina el inglés de la situación?',
          options: [
            'Está usando sarcasmo e ironía pura británica: le parece una basura y está que trina por dentro.',
            'Está encantado de descansar en el túnel con la agradable compañía.',
            'Piensa que la iluminación de las vías tiene un valor estético admirable.',
            'Te está haciendo una pregunta romántica.'
          ],
          correctIndex: 0,
          explanationEs: 'El "understatement" y sarcasmo británico es legendario: decir que una situación infernal es "lovely" significa exactamente lo contrario.',
          streetTip: 'Si un inglés dice "lovely" con voz plana ante una desgracia, es sarcasmo puro.',
          xpReward: 40
        },
        {
          id: 'b3-q4',
          type: 'situation_choice',
          situation: 'Un amigo te invita al cine a ver una peli aburrida. No quieres ir porque no tienes ganas de salir de la cama.',
          question: '¿Cómo se lo dices por WhatsApp con las siglas exactas de UK?',
          options: [
            '"Sorry mate, cba tonight! Maybe tomorrow?"',
            '"I manifest a biological lethargy to attend cinematographic arts."',
            '"I am not legally authorized to enter the theater."',
            '"Delete my number immediately."'
          ],
          correctIndex: 0,
          explanationEs: '"cba" = "can\'t be bothered" (me da pereza / no me da la gana). Perfecto y natural entre colegas.',
          streetTip: 'cba es la abreviatura más popular entre amigos jóvenes británicos.',
          xpReward: 40
        },
        {
          id: 'b3-q5',
          type: 'street_translate',
          situation: 'Tu colega dice: "That burger place in Camden was proper delicious, innit?".',
          question: '¿Qué función cumple la palabra "innit" al final de esa frase?',
          options: [
            'Equivale a "¿a que sí? / ¿verdad que sí?" para buscar acuerdo amistoso.',
            'Pregunta la hora del reloj.',
            'Insulta la calidad de la carne de la hamburguesa.',
            'Indica que la hamburguesa no tenía queso.'
          ],
          correctIndex: 0,
          explanationEs: '"Innit" (derivado de "isn\'t it?") se usa en la calle como muletilla universal para buscar confirmación: "¿A que sí?".',
          streetTip: '"Innit" es la coletilla por excelencia del acento londinense moderno.',
          xpReward: 40
        }
      ]
    }
  },
  {
    id: 4,
    number: 4,
    districtName: 'Camden Town & Shoreditch (El Corazón del Banter)',
    title: 'Proper Lad (Banter & Sarcasmo Británico)',
    badge: '👑',
    rankTitle: 'Maestro del Banter Callejero',
    color: 'from-purple-500 to-indigo-600',
    borderColor: 'border-purple-300',
    bgColor: 'bg-purple-50',
    description: 'Aprende a dominar el "banter" (la chulería sana y el vacile entre amigos), descifrar el sarcasmo británico que confunde a todo el mundo y las palabras más picantes de la calle.',
    requiredXP: 500,
    topics: [
      {
        id: 'l4-t1',
        levelId: 4,
        title: 'El Arte del Banter: Vacilar con Cariño',
        subtitle: '"Taking the piss" vs "Having a laugh"',
        icon: '🎯',
        description: 'En el Reino Unido, cuanto más te aprecian tus amigos, más te toman el pelo ("taking the piss"). Aprende a detectarlo y a responder.',
        phrases: [
          {
            formal: 'Are you mocking me or being deceptive?',
            street: 'Are you taking the piss? / Having a laugh?',
            es: '¿Te estás quedando conmigo? / ¿Te estás riendo de mí?',
            context: 'Puede ser indignación real si te cobran 15 libras por una cerveza, o diversión con un colega que exagera una historia.'
          },
          {
            formal: 'Friendly playful teasing among mates.',
            street: 'It\'s just banter, mate! / Good banter.',
            es: '¡Son solo risas, hombre! / Vacile sano entre colegas.',
            context: '"Banter" es la esencia del humor británico masculino y de cuadrilla.'
          },
          {
            formal: 'He is completely exaggerating and talking rubbish.',
            street: 'He is full of it! / Talking bollocks.',
            es: 'Es un fantasma / está diciendo chorradas como puños.',
            context: 'Cuando alguien presume de haber salido de fiesta con futbolistas de la Premier.'
          },
          {
            formal: 'An admirable and generous friend.',
            street: 'He\'s an absolute legend! / Proper gent.',
            es: '¡Es un crack absoluto! / Un tipazo.',
            context: 'El piropo definitivo en la cultura británica popular: "Absolute legend".'
          }
        ],
        culturalSecrets: [
          '"Taking the piss" NO tiene nada que ver con orinar: significa tomar el pelo, vacilar o abusar de la confianza.',
          'Si un británico te toma el pelo y te picas ("throw a wobbly"), te tomarán el pelo el doble. La respuesta británica es reírte y devolvérsela con elegancia.'
        ],
        audioTips: '"Taking the piss" suele pronunciarse acentuando "piss": /teɪk-ɪŋ ðə pɪs/.',
        exercises: [
          {
            id: 'l4-e1',
            type: 'street_translate',
            situation: 'Pides un café solo en un bar turístico y el camarero te pide 9 libras.',
            question: 'Miras el ticket asombrado y dices: "Nine quid for a black coffee?! Are you _____?".',
            options: [
              'taking the piss',
              'drinking the water',
              'constructing a bridge',
              'praying for rain'
            ],
            correctIndex: 0,
            explanationEs: '"Are you taking the piss?" es la frase exacta para denunciar que alguien se está pasando de listo o abusando de ti con un precio o exigencia.',
            streetTip: 'Se usa tanto para precios abusivos como cuando un amigo te cuenta una mentira flagrante.',
            xpReward: 30
          },
          {
            id: 'l4-e2',
            type: 'situation_choice',
            situation: 'Tu colega llega al pub con una camisa con estampado de dinosaurios fluorescentes. Todo el mundo empieza a hacer bromas cariñosas sobre su estilo.',
            question: 'Él sonríe, levanta su pinta y dice con tranquilidad: "Yeah yeah, keep it coming, love the _____ lads!".',
            options: ['banter', 'academic discourse', 'violence', 'silence'],
            correctIndex: 0,
            explanationEs: '"Banter" es el término sagrado para el cachondeo y vacile sano entre amigos.',
            streetTip: 'Tener buen banter ("good banter") es la mayor virtud social en UK.',
            xpReward: 30
          }
        ]
      },
      {
        id: 'l4-t2',
        levelId: 4,
        title: 'El Traductor del Sarcasmo Británico',
        subtitle: 'Lo que dicen con educación vs Lo que realmente piensan',
        icon: '🎭',
        description: 'Los británicos evitan el conflicto directo a toda costa. Para eso inventaron el lenguaje cifrado de la cortesía asesina.',
        phrases: [
          {
            formal: 'What the British person says: "That is quite interesting."',
            street: 'What they actually mean: "That is total nonsense and I don\'t believe you."',
            es: 'En español: "Vaya soplipollez me acabas de soltar".',
            context: 'Si un británico califica tu idea de "quite interesting", prepárate porque no le ha gustado nada.'
          },
          {
            formal: 'What they say: "With the greatest respect..."',
            street: 'What they actually mean: "I think you are an absolute idiot."',
            es: 'En español: "Con el debido respeto... (eres tonto)".',
            context: 'Usado antes de destrozar tu argumento en una reunión de trabajo o debate.'
          },
          {
            formal: 'What they say: "I hear what you say."',
            street: 'What they actually mean: "I completely disagree and I want you to stop talking."',
            es: 'En español: "Me da igual lo que digas, haz el favor de callarte".',
            context: 'Cierre educado de una discusión donde no van a cambiar de opinión.'
          },
          {
            formal: 'What they say: "It is not my cup of tea."',
            street: 'What they actually mean: "I absolutely despise it and hate it."',
            es: 'En español: "Lo detesto con toda mi alma".',
            context: 'Para hablar de comida, música o personas sin sonar grosero.'
          }
        ],
        culturalSecrets: [
          'Si un inglés te dice que algo está "not bad", en realidad significa que es "bastante bueno o excelente". El pudor británico les impide entusiasmarse en exceso.',
          'Decir "I was slightly annoyed" significa que estaba a punto de estallar de furia homicida.'
        ],
        audioTips: 'Presta atención al tono: una sonrisa suave con ojos serios suele delatar el sarcasmo británico.',
        exercises: [
          {
            id: 'l4-e3',
            type: 'sarcasm_radar',
            situation: 'Le enseñas tu nuevo corte de pelo arriesgado a tu compañero de piso londinense. Él ladea la cabeza, sonríe forzadamente y dice: "Well... that\'s certainly... bold, mate. Not really my cup of tea, but good on you!".',
            question: '¿Qué opina honestamente de tu nuevo corte de pelo?',
            options: [
              'Le parece un horror absoluto y jamás se haría algo parecido.',
              'Le encanta y mañana mismo va a ir a la misma peluquería a hacérselo.',
              'Quiere invitarte a tomar una taza de té inglés con galletas.',
              'Piensa que tienes futuro como modelo profesional de pasarela.'
            ],
            correctIndex: 0,
            explanationEs: '"Not my cup of tea" es la forma británica súper educada de decir "no me gusta nada / lo odio".',
            streetTip: 'Not my cup of tea = no es lo mío / no me mola un pelo.',
            xpReward: 30
          },
          {
            id: 'l4-e4',
            type: 'sarcasm_radar',
            situation: 'Propones una idea estrambótica en el curro. Tu jefe británico suspira levemente y dice: "Interesting suggestion. Let me park that for now".',
            question: '¿Qué va a pasar con tu idea?',
            options: [
              'Ha muerto para siempre; no la van a implementar jamás.',
              'La van a aparcar en el garaje de la empresa.',
              'Van a contratar a 5 personas para empezar a desarrollarla hoy mismo.',
              'Te van a ascender a director general.'
            ],
            correctIndex: 0,
            explanationEs: '"To park an idea" en el mundo laboral británico es la forma diplomática de mandarla a la papelera sin decirte que no directamente.',
            streetTip: 'Aprender a leer la diplomacia británica te salva la vida en el trabajo.',
            xpReward: 30
          }
        ]
      }
    ],
    boss: {
      id: 'boss-4',
      levelId: 4,
      bossName: 'Callum "The Banter Merchant"',
      bossTitle: 'Veterano del Mercadillo de Camden y Rey de la Ironía',
      bossAvatar: '😎',
      bossQuote: 'Think you\'ve got the gift of the gab? Let\'s see if you can take a bit of banter without crying for your mum!',
      description: 'Supera el duelo de ironía, sarcasmo y vacile callejero con Callum (80% de aciertos) para acceder al nivel supremo de las leyendas.',
      passPercentage: 80,
      questions: [
        {
          id: 'b4-q1',
          type: 'street_translate',
          situation: 'Un conocido te asegura que el fin de semana cenó con Dua Lipa y que ella le pidió su número.',
          question: 'Te giras hacia tu colega y le dices por lo bajo: "Mate, he is talking complete _____".',
          options: ['bollocks', 'butterflies', 'curtains', 'monasteries'],
          correctIndex: 0,
          explanationEs: '"Talking bollocks" es la expresión reina británica para decir que alguien está soltando mentiras o chorradas como puños.',
          streetTip: '"Bollocks" vale para decir tonterías o para quejarse de un golpe: "Oh bollocks!".',
          xpReward: 45
        },
        {
          id: 'b4-q2',
          type: 'sarcasm_radar',
          situation: 'Un comediante británico se cae del escenario, rompe tres focos y se tira el cubata encima. Se levanta y dice al micro: "Well, that went rather well".',
          question: '¿Qué recurso cómico está utilizando?',
          options: [
            'British understatement (ironía de minimizar una catástrofe absoluta).',
            'Sinceridad absoluta porque cobrará el seguro.',
            'Un conjuro tradicional celta.',
            'Está mintiendo para que no le despidan.'
          ],
          correctIndex: 0,
          explanationEs: 'El "understatement" británico: ante un desastre monumental, soltar "that went rather well" para provocar la risa colectiva.',
          streetTip: 'Los ingleses aman reírse de sus propias desgracias antes de que lo hagan otros.',
          xpReward: 45
        },
        {
          id: 'b4-q3',
          type: 'situation_choice',
          situation: 'Tu colega te presenta a una chica y luego te pregunta por WhatsApp qué te ha parecido.',
          question: 'Ella te ha parecido guapísima y muy atractiva. ¿Qué adjetivo de calle moderno usan los jóvenes en UK?',
          options: [
            'Mate, she is proper fit!',
            'She represents superior geometric facial symmetry.',
            'She is quite athletic and can run marathons.',
            'Her biological appearance is adequate.'
          ],
          correctIndex: 0,
          explanationEs: 'En la jerga callejera de UK, "fit" significa atractiva/buenorra (no solo en forma física deportiva).',
          streetTip: '"Fit" en UK = atractiva / cañón.',
          xpReward: 45
        },
        {
          id: 'b4-q4',
          type: 'slang_cloze',
          situation: 'Ves un coche oxidado, sin parachoques y con una rueda pinchada intentando arrancar.',
          question: 'Dices con asco: "Look at that car, it\'s absolutely _____!".',
          options: ['minging', 'glorious', 'regal', 'philosophical'],
          correctIndex: 0,
          explanationEs: '"Minging" (o "grim") es el término callejero en UK para algo asqueroso, feísimo o cochambroso.',
          streetTip: 'Minging = asqueroso / cutre. Rima con "singing".',
          xpReward: 45
        },
        {
          id: 'b4-q5',
          type: 'street_translate',
          situation: 'Tu compañero te deja las llaves de su casa de campo para el fin de semana sin pedirte nada a cambio.',
          question: 'Le das un abrazo y le dices: "Mate, you\'re an absolute _____!".',
          options: ['legend', 'bureaucrat', 'mammal', 'substance'],
          correctIndex: 0,
          explanationEs: '"You\'re an absolute legend!" es la mayor muestra de gratitud y respeto informal entre colegas en el Reino Unido.',
          streetTip: 'Absolute legend = un titán / un crack absoluto.',
          xpReward: 45
        }
      ]
    }
  },
  {
    id: 5,
    number: 5,
    districtName: 'Peckham, Manchester & Las Calles Reales de UK',
    title: 'UK Street Boss (El Puto Amo del Idioma)',
    badge: '🏆',
    rankTitle: 'Leyenda Callejera Británica',
    color: 'from-rose-500 to-red-600',
    borderColor: 'border-rose-300',
    bgColor: 'bg-rose-50',
    description: 'El escalón definitivo: modismos de todo el país (Manchester, Londres, Escocia), el uso maestro de "innit", entonación y velocidad nativa sin filtro.',
    requiredXP: 850,
    topics: [
      {
        id: 'l5-t1',
        levelId: 5,
        title: 'Modismos Callejeros de Oro',
        subtitle: 'Bob\'s your uncle, Scran, y Throw a wobbly',
        icon: '💎',
        description: 'Frases hechas que desconciertan por completo a los extranjeros pero que todo británico de 18 a 80 años entiende al milisegundo.',
        phrases: [
          {
            formal: 'And just like that, the task is easily completed!',
            street: 'Bob\'s your uncle! (and Fanny\'s your aunt)',
            es: '¡Y ya está! / ¡Coser y cantar! / ¡Listo!',
            context: 'Explicar cómo hacer algo: "You put the code in, press green, and Bob\'s your uncle!"'
          },
          {
            formal: 'Delicious food or a hearty meal.',
            street: 'Scran / Proper good scran.',
            es: 'Comidaza / zampar / papeo.',
            context: 'Muy usado en el norte de Inglaterra, Liverpool, Manchester y por jóvenes de todo UK: "Let\'s get some scran".'
          },
          {
            formal: 'To lose your temper and have an emotional breakdown or tantrum.',
            street: 'Throw a wobbly / Lose the plot.',
            es: 'Pillar una rabieta / perder los papeles / cruzársele los cables.',
            context: '"The boss threw a wobbly when he saw the sales report."'
          },
          {
            formal: 'Extremely wealthy or possessing lots of money.',
            street: 'Minted / Loaded.',
            es: 'Podrido de pasta / forrado.',
            context: 'Antónimo de "skint" (pelado sin un duro).'
          }
        ],
        culturalSecrets: [
          '"Bob\'s your uncle" no significa que tengas un tío llamado Roberto: es la frase cómica para decir "y problema resuelto".',
          'En el norte de UK oirás llamar a un amigo cercano "our kid" (nuestro chaval), y para despedirse dirán "Ta-ra!" en vez de goodbye.'
        ],
        audioTips: 'En el inglés rápido callejero, la letra T entre vocales a menudo desaparece con un "glottal stop" (un golpe suave en la garganta): "wa\'er" en vez de "water".',
        exercises: [
          {
            id: 'l5-e1',
            type: 'street_translate',
            situation: 'Tu colega inglés te explica cómo conectar el cable a la tele para ver el partido de fútbol.',
            question: 'Te dice: "You plug the HDMI into port 2, switch the input, and Bob\'s your _____!".',
            options: ['uncle', 'dentist', 'cousin', 'neighbour'],
            correctIndex: 0,
            explanationEs: '"Bob\'s your uncle!" es la expresión castiza británica para "¡Y ya está resuelto!".',
            streetTip: 'Bob\'s your uncle = ¡así de fácil!',
            xpReward: 35
          },
          {
            id: 'l5-e2',
            type: 'slang_cloze',
            situation: 'Tenéis hambre después de 4 horas pateando la ciudad.',
            question: 'Tu amigo de Manchester se toca la tripa y dice: "I\'m starving lads, where can we get some decent _____ around here?".',
            options: ['scran', 'ironing', 'carpentry', 'furniture'],
            correctIndex: 0,
            explanationEs: '"Scran" es la palabra coloquial británica (especialmente del norte) para la comida o papeo.',
            streetTip: 'Scran = comida / papeo.',
            xpReward: 35
          }
        ]
      },
      {
        id: 'l5-t2',
        levelId: 5,
        title: 'El Doctorado de Calle: Sin Filtros',
        subtitle: 'Skint vs Minted, Chuffed vs Gutted y la agilidad mental',
        icon: '🔥',
        description: 'Capacidad para responder rápido, hacer bromas cruzadas y moverte con soltura por cualquier barrio de Londres, Birmingham o Glasgow.',
        phrases: [
          {
            formal: 'I have zero money in my bank account.',
            street: 'I\'m completely skint, mate.',
            es: 'Estoy a dos velas / tieso como una mojama.',
            context: '"Can\'t come to the pub tonight, am skint till payday."'
          },
          {
            formal: 'A mess or disorganized situation.',
            street: 'A dog\'s dinner / A right shambles.',
            es: 'Una chapuza / un circo / un desastre total.',
            context: '"The new train schedule is a complete dog\'s dinner."'
          },
          {
            formal: 'It was very expensive.',
            street: 'It cost an arm and a leg / Cost a bomb.',
            es: 'Costó un ojo de la cara / un dineral.',
            context: '"London rent costs an arm and a leg."'
          }
        ],
        culturalSecrets: [
          'En UK el humor autocrítico ("self-deprecating humor") es el mayor signo de madurez e inteligencia social.',
          'Nunca te tomes a ti mismo demasiado en serio; quien presume es inmediatamente bajado a tierra con un poco de banter de barrio.'
        ],
        audioTips: 'Mantén la entonación relajada y usa pausas naturales: "to be fair...", "at the end of the day...", "you know what I mean?".',
        exercises: [
          {
            id: 'l5-e3',
            type: 'street_translate',
            situation: 'Te invitan a un restaurante de 5 estrellas pero es fin de mes y aún no has cobrado.',
            question: 'Rechazas educadamente entre risas diciendo: "Can\'t do it mate, I\'m completely _____ till Friday!".',
            options: ['skint', 'minted', 'golden', 'monumental'],
            correctIndex: 0,
            explanationEs: '"Skint" = sin un duro / a dos velas. (Lo contrario de "minted" = forrado de pasta).',
            streetTip: 'Skint = sin un pavo en la cuenta.',
            xpReward: 35
          },
          {
            id: 'l5-e4',
            type: 'slang_cloze',
            situation: 'El ayuntamiento intentó repavimentar una calle peatonal y ha dejado socavones y baldosas rotas.',
            question: 'Un vecino del barrio comenta indignado: "Look at this road, it\'s a complete dog\'s _____!".',
            options: ['dinner', 'breakfast', 'afternoon', 'dessert'],
            correctIndex: 0,
            explanationEs: '"A dog\'s dinner" (o "a right shambles") describe un trabajo chapucero o una situación caótica.',
            streetTip: 'A dog\'s dinner = una chapuza infame.',
            xpReward: 35
          }
        ]
      }
    ],
    boss: {
      id: 'boss-5',
      levelId: 5,
      bossName: 'Arthur of Peckham',
      bossTitle: 'El Patriarca Callejero del Sur de Londres',
      bossAvatar: '👑',
      bossQuote: 'Right then sunshine! You\'ve climbed all the way from Heathrow to my manor. Show me you talk the talk, or hop back on the Eurostar!',
      description: 'El examen definitivo de 5 preguntas sobre modismos, expresiones complejas, agilidad mental y frases hechas de todo UK para coronarte como Leyenda de la Calle.',
      passPercentage: 80,
      questions: [
        {
          id: 'b5-q1',
          type: 'street_translate',
          situation: 'Arthur te dice que montar el negocio fue muy duro y le costó todos sus ahorros.',
          question: 'Te dice: "Setting up this market stall cost me an arm and a _____, but we made it work".',
          options: ['leg', 'finger', 'shoe', 'elbow'],
          correctIndex: 0,
          explanationEs: '"Cost an arm and a leg" = costar un riñón / un ojo de la cara.',
          streetTip: 'Cost an arm and a leg: universal en todo el mundo angloparlante.',
          xpReward: 50
        },
        {
          id: 'b5-q2',
          type: 'situation_choice',
          situation: 'Un cliente en el mercado pierde los estribos, grita y tira una caja de fruta al suelo porque no tenían aguacates maduros.',
          question: 'Arthur se limpia las manos en su delantal y comenta con flema británica:',
          options: [
            '"Blimey, no need to throw a wobbly over an avocado, mate!"',
            '"Please continue your biological destruction of agricultural goods."',
            '"I am reporting your calorie deficit to the authorities."',
            '"Avocados are mathematically superior to bananas."'
          ],
          correctIndex: 0,
          explanationEs: '"Throw a wobbly" = montar un pollo / pillar una rabieta monumental.',
          streetTip: 'Throw a wobbly = perder los papeles por una tontería.',
          xpReward: 50
        },
        {
          id: 'b5-q3',
          type: 'street_translate',
          situation: 'Son las 18:00 del viernes. Arthur baja la persiana de su puesto y le dice a los muchachos del barrio:',
          question: '"Right lads, pack it up, time to get some proper _____ and head to the pub!".',
          options: ['scran', 'cement', 'petrol', 'paperwork'],
          correctIndex: 0,
          explanationEs: '"Scran" = comida / papeo.',
          streetTip: 'Pack it up, let\'s get some scran!',
          xpReward: 50
        },
        {
          id: 'b5-q4',
          type: 'sarcasm_radar',
          situation: 'El cielo se pone negro, caen rayos, granizo y se inunda la calle en 3 minutos. Arthur mira al cielo con las manos en los bolsillos y dice: "Bit nippy today".',
          question: '¿Qué significa esa frase en boca de un británico en mitad de la tormenta?',
          options: [
            'Hace un frío que pela y un tiempo criminal, pero lo dice con ironía fría.',
            'Cree que la temperatura es idónea para tomar el sol en bermudas.',
            'Tiene calor y se va a quitar la chaqueta.',
            'Está intentando cazar mariposas.'
          ],
          correctIndex: 0,
          explanationEs: '"A bit nippy" = refresca un poco. Usado en pleno diluvio o helada es el culmen del humor británico.',
          streetTip: 'Bit nippy = hace rasca / está helando.',
          xpReward: 50
        },
        {
          id: 'b5-q5',
          type: 'slang_cloze',
          situation: 'Has superado todas las pruebas de Arthur. Te da una palmada en el hombro, te invita a una pinta y te dice:',
          question: '"Fair play to you mate! You talk like a proper local now, Bob\'s your _____!".',
          options: ['uncle', 'neighbour', 'cousin', 'lawyer'],
          correctIndex: 0,
          explanationEs: '"Bob\'s your uncle!" = ¡y todo solucionado / ya lo tienes hecho!',
          streetTip: '¡Felicidades, te has ganado el respeto de las calles de Reino Unido!',
          xpReward: 50
        }
      ]
    }
  }
];

// Helper functions for game progress
export const LEVEL_REQUIREMENTS = {
  1: { minXP: 0, prevBossRequired: null },
  2: { minXP: 100, prevBossRequired: 1 },
  3: { minXP: 250, prevBossRequired: 2 },
  4: { minXP: 500, prevBossRequired: 3 },
  5: { minXP: 850, prevBossRequired: 4 }
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
