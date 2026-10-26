import { PhrasalVerbItem, Exercise } from '../types';

export const PARTICLE_LOGIC_GUIDE = [
  {
    particle: 'UP',
    coreMeaning: 'Completar al 100%, aumentar, aparecer o crear de la nada',
    examples: [
      'eat up / drink up / use up (terminar por completo)',
      'speak up / turn up / speed up (subir volumen o intensidad)',
      'show up / turn up (aparecer)',
      'make up (inventar una excusa/historia)'
    ]
  },
  {
    particle: 'DOWN',
    coreMeaning: 'Reducir, rechazar, registrar por escrito o fallar/colapsar',
    examples: [
      'cut down on / turn down / slow down (reducir)',
      'turn down (rechazar una oferta)',
      'write down / jot down / take down (apuntar)',
      'break down (averiarse o venirse abajo emocionalmente)',
      'let down (decepcionar / dejar tirado)'
    ]
  },
  {
    particle: 'OUT',
    coreMeaning: 'Descubrir/resolver, extinguirse/agotarse, excluir o distribuir',
    examples: [
      'find out / figure out / work out (averiguar, descifrar)',
      'run out of (quedarse sin nada) / put out (apagar un fuego)',
      'leave out / rule out (excluir, descartar)',
      'hand out / give out (repartir)'
    ]
  },
  {
    particle: 'OFF',
    coreMeaning: 'Separación, cancelación/aplazamiento, salida o desconexión',
    examples: [
      'put off (posponer/aplazar) / call off (cancelar)',
      'set off (partir de viaje) / take off (despegar)',
      'cut off (aislar o cortar suministro) / lay off (despedir empleados)',
      'go off (sonar la alarma, explotar o caducar la comida)'
    ]
  },
  {
    particle: 'ON',
    coreMeaning: 'Continuar sin parar, conectar o depender',
    examples: [
      'carry on / go on / keep on (continuar haciendo algo)',
      'count on / rely on (confiar o depender de)',
      'take on (asumir responsabilidades o contratar personal)'
    ]
  },
  {
    particle: 'OVER / THROUGH',
    coreMeaning: 'OVER = revisar o superar | THROUGH = atravesar una dificultad de principio a fin',
    examples: [
      'go over / look over (revisar detenidamente)',
      'get over (superar una enfermedad o ruptura)',
      'go through (pasar por una mala racha) / get through (lograr comunicar o superar)'
    ]
  }
];

export const PHRASAL_VERBS_LIST: PhrasalVerbItem[] = [
  // ==================== A2+ ====================
  {
    id: 'pv-find-out',
    verb: 'find out',
    baseVerb: 'find',
    particle: 'out',
    level: 'A2+',
    separable: true,
    meaningEs: 'Averiguar, enterarse de, descubrir información',
    formalEquivalent: 'discover / learn',
    examples: [
      { en: 'Have you found out how much the tickets cost?', es: '¿Has averiguado cuánto cuestan las entradas?' },
      { en: 'She was furious when she found out the truth.', es: 'Se puso furiosa cuando se enteró de la verdad.' }
    ],
    memoryTrick: 'Sacar (OUT) información que estaba oculta.'
  },
  {
    id: 'pv-give-up',
    verb: 'give up',
    baseVerb: 'give',
    particle: 'up',
    level: 'A2+',
    separable: true,
    meaningEs: 'Dejar un hábito (+ -ing) o rendirse',
    formalEquivalent: 'quit / surrender',
    examples: [
      { en: 'My doctor advised me to give up smoking immediately.', es: 'Mi médico me aconsejó dejar de fumar de inmediato.' },
      { en: 'Don\'t give up now; you are so close to passing!', es: '¡No te rindas ahora; estás muy cerca de aprobar!' }
    ],
    memoryTrick: 'SIEMPRE lleva -ING detrás si le sigue un verbo (give up trying).'
  },
  {
    id: 'pv-look-after',
    verb: 'look after',
    baseVerb: 'look',
    particle: 'after',
    level: 'A2+',
    separable: false,
    meaningEs: 'Cuidar de alguien o algo',
    formalEquivalent: 'take care of',
    examples: [
      { en: 'Could you look after my cat while I\'m away?', es: '¿Podrías cuidar de mi gato mientras estoy fuera?' }
    ],
    memoryTrick: 'Mirar detrás de alguien (AFTER) para asegurarte de que está bien (Inseparable).'
  },
  {
    id: 'pv-run-out-of',
    verb: 'run out of',
    baseVerb: 'run',
    particle: 'out of',
    level: 'A2+',
    separable: false,
    meaningEs: 'Quedarse sin (tiempo, gasolina, dinero, paciencia)',
    formalEquivalent: 'exhaust the supply of',
    examples: [
      { en: 'We are running out of milk; could you buy some?', es: 'Nos estamos quedando sin leche; ¿podrías comprar?' },
      { en: 'I ran out of time during the last part of the exam.', es: 'Me quedé sin tiempo durante la última parte del examen.' }
    ],
    memoryTrick: 'Salir corriendo (RUN OUT) de las existencias de algo.'
  },
  {
    id: 'pv-set-off',
    verb: 'set off',
    baseVerb: 'set',
    particle: 'off',
    level: 'A2+',
    separable: false,
    meaningEs: 'Salir de viaje, ponerse en camino',
    formalEquivalent: 'depart / start a journey',
    examples: [
      { en: 'We need to set off at 6 AM to avoid the morning traffic.', es: 'Necesitamos salir a las 6 de la mañana para evitar el tráfico.' }
    ],
    memoryTrick: 'OFF indica separación del punto de partida.'
  },
  {
    id: 'pv-take-off',
    verb: 'take off',
    baseVerb: 'take',
    particle: 'off',
    level: 'A2+',
    separable: true,
    meaningEs: '1) Despegar (avión) | 2) Quitarse ropa | 3) Tener éxito repentino (B2)',
    formalEquivalent: 'depart / remove / become successful',
    examples: [
      { en: 'Please take off your shoes before entering the house.', es: 'Por favor, quítate los zapatos antes de entrar en casa.' },
      { en: 'Her career really took off after she published her first novel.', es: 'Su carrera despegó de verdad tras publicar su primera novela.' }
    ],
    memoryTrick: 'Con pronombre es obligatorio intercalarlo: "Take them off" (NUNCA "Take off them").'
  },

  // ==================== B1 ====================
  {
    id: 'pv-put-off',
    verb: 'put off',
    baseVerb: 'put',
    particle: 'off',
    level: 'B1',
    separable: true,
    meaningEs: 'Posponer, aplazar (+ -ing si le sigue verbo)',
    formalEquivalent: 'postpone / delay',
    examples: [
      { en: 'Never put off until tomorrow what you can do today.', es: 'Nunca dejes para mañana lo que puedas hacer hoy.' },
      { en: 'He keeps putting off going to the dentist.', es: 'Sigue posponiendo ir al dentista.' }
    ],
    memoryTrick: 'Poner algo lejos en el calendario (OFF). Si lleva verbo detrás, va en -ING (put off making).'
  },
  {
    id: 'pv-call-off',
    verb: 'call off',
    baseVerb: 'call',
    particle: 'off',
    level: 'B1',
    separable: true,
    meaningEs: 'Cancelar un evento, reunión o huelga',
    formalEquivalent: 'cancel',
    examples: [
      { en: 'They had to call off the open-air concert because of the storm.', es: 'Tuvieron que cancelar el concierto al aire libre por la tormenta.' }
    ],
    memoryTrick: 'No confundir PUT OFF (aplazar para otro día) con CALL OFF (cancelar definitivamente).'
  },
  {
    id: 'pv-turn-down',
    verb: 'turn down',
    baseVerb: 'turn',
    particle: 'down',
    level: 'B1',
    separable: true,
    meaningEs: '1) Rechazar (una oferta/propuesta) | 2) Bajar el volumen o calefacción',
    formalEquivalent: 'reject / refuse / reduce',
    examples: [
      { en: 'Why did she turn down such a well-paid job offer?', es: '¿Por qué rechazó una oferta de trabajo tan bien pagada?' },
      { en: 'Could you turn the music down a bit, please?', es: '¿Podrías bajar un poco la música, por favor?' }
    ],
    memoryTrick: 'Pulgar hacia abajo (DOWN) = rechazar oferta o bajar volumen.'
  },
  {
    id: 'pv-look-forward-to',
    verb: 'look forward to',
    baseVerb: 'look',
    particle: 'forward to',
    level: 'B1',
    separable: false,
    meaningEs: 'Tener muchas ganas de, esperar con ilusión (+ -ING / sustantivo)',
    formalEquivalent: 'anticipate with pleasure',
    examples: [
      { en: 'I am really looking forward to meeting your family.', es: 'Tengo muchas ganas de conocer a tu familia.' },
      { en: 'We look forward to hearing from you soon.', es: 'Esperamos tener noticias suyas pronto.' }
    ],
    memoryTrick: '¡Trampa nº1 de examen! Ese "to" es preposición: SIEMPRE va seguido de V-ING.'
  },
  {
    id: 'pv-bring-up',
    verb: 'bring up',
    baseVerb: 'bring',
    particle: 'up',
    level: 'B1',
    separable: true,
    meaningEs: '1) Criar/educar a un niño | 2) Sacar un tema de conversación',
    formalEquivalent: 'raise (children) / mention (a topic)',
    examples: [
      { en: 'She was brought up by her grandparents in a small village.', es: 'Fue criada por sus abuelos en un pueblo pequeño.' },
      { en: 'I wouldn\'t bring up politics during dinner if I were you.', es: 'Yo que tú no sacaría el tema de la política durante la cena.' }
    ],
    memoryTrick: 'Grow up = crecer (intransitivo: "I grew up in Madrid"); Bring up = criar (transitivo: "My parents brought me up").'
  },
  {
    id: 'pv-carry-on',
    verb: 'carry on',
    baseVerb: 'carry',
    particle: 'on',
    level: 'B1',
    separable: false,
    meaningEs: 'Continuar haciendo algo (+ -ing)',
    formalEquivalent: 'continue',
    examples: [
      { en: 'If you carry on spending money like that, you\'ll be broke.', es: 'Si sigues gastando dinero así, te quedarás sin blanca.' }
    ],
    memoryTrick: 'ON = continuidad. Carry on doing = Go on doing = Keep on doing.'
  },
  {
    id: 'pv-break-down',
    verb: 'break down',
    baseVerb: 'break',
    particle: 'down',
    level: 'B1',
    separable: false,
    meaningEs: '1) Averiarse un vehículo/máquina | 2) Venirse abajo llorando | 3) Fracasar negociaciones',
    formalEquivalent: 'stop working / collapse / fail',
    examples: [
      { en: 'Our car broke down on the motorway in the middle of the night.', es: 'Nuestro coche se averió en la autopista en mitad de la noche.' }
    ],
    memoryTrick: 'Algo que se rompe y cae (DOWN).'
  },
  {
    id: 'pv-let-down',
    verb: 'let down',
    baseVerb: 'let',
    particle: 'down',
    level: 'B1',
    separable: true,
    meaningEs: 'Decepcionar, fallar a alguien que confiaba en ti',
    formalEquivalent: 'disappoint',
    examples: [
      { en: 'You can count on me; I promise I won\'t let you down.', es: 'Puedes contar conmigo; te prometo que no te fallaré.' }
    ],
    memoryTrick: 'Dejar caer (DOWN) las expectativas de alguien. Con pronombre siempre en medio: "let me down".'
  },

  // ==================== B1+ ====================
  {
    id: 'pv-put-up-with',
    verb: 'put up with',
    baseVerb: 'put',
    particle: 'up with',
    level: 'B1+',
    separable: false,
    meaningEs: 'Soportar, aguantar, tolerar algo molesto',
    formalEquivalent: 'tolerate / endure',
    examples: [
      { en: 'I don\'t know how you can put up with such a rude boss.', es: 'No sé cómo puedes aguantar a un jefe tan maleducado.' },
      { en: 'We had to put up with constant noise from the construction site.', es: 'Tuvimos que soportar el ruido constante de la obra.' }
    ],
    memoryTrick: 'Clásico absoluto de Key Word Transformation: "can\'t stand / can\'t tolerate" = "can\'t put up with".'
  },
  {
    id: 'pv-make-up-for',
    verb: 'make up for',
    baseVerb: 'make',
    particle: 'up for',
    level: 'B1+',
    separable: false,
    meaningEs: 'Compensar por un error o falta',
    formalEquivalent: 'compensate for',
    examples: [
      { en: 'He bought her flowers to make up for forgetting their anniversary.', es: 'Le compró flores para compensar el haber olvidado su aniversario.' }
    ],
    memoryTrick: 'Make up (inventar/reconciliarse) + FOR = compensar.'
  },
  {
    id: 'pv-get-away-with',
    verb: 'get away with',
    baseVerb: 'get',
    particle: 'away with',
    level: 'B1+',
    separable: false,
    meaningEs: 'Salirse con la suya, librarse de un castigo tras hacer algo malo',
    formalEquivalent: 'escape punishment for',
    examples: [
      { en: 'He cheated in the test, but he didn\'t get away with it.', es: 'Hizo trampas en el examen, pero no se salió con la suya.' }
    ],
    memoryTrick: 'Escapar lejos (GET AWAY) llevándote el botín (WITH).'
  },
  {
    id: 'pv-cut-down-on',
    verb: 'cut down on',
    baseVerb: 'cut',
    particle: 'down on',
    level: 'B1+',
    separable: false,
    meaningEs: 'Reducir el consumo de algo (azúcar, café, gastos)',
    formalEquivalent: 'reduce consumption of',
    examples: [
      { en: 'I\'m trying to cut down on caffeine and sugary drinks.', es: 'Estoy intentando reducir la cafeína y las bebidas azucaradas.' }
    ],
    memoryTrick: 'Cortar hacia abajo (CUT DOWN) sobre (ON) un hábito.'
  },
  {
    id: 'pv-figure-out',
    verb: 'figure out',
    baseVerb: 'figure',
    particle: 'out',
    level: 'B1+',
    separable: true,
    meaningEs: 'Descifrar, entender cómo funciona algo o resolver un problema',
    formalEquivalent: 'solve / understand',
    examples: [
      { en: 'I still haven\'t figured out how to use this new software.', es: 'Todavía no he descifrado cómo usar este nuevo programa.' }
    ],
    memoryTrick: 'Sinónimo directo de "work out" (resolver mediante cálculo o lógica).'
  },
  {
    id: 'pv-take-after',
    verb: 'take after',
    baseVerb: 'take',
    particle: 'after',
    level: 'B1+',
    separable: false,
    meaningEs: 'Parecerse a un familiar mayor (en carácter o físico)',
    formalEquivalent: 'resemble (a relative)',
    examples: [
      { en: 'In terms of personality, Clara really takes after her mother.', es: 'En cuanto a personalidad, Clara se parece muchísimo a su madre.' }
    ],
    memoryTrick: 'Tomar los rasgos que vienen detrás (AFTER) de tus padres. (Inseparable).'
  },
  {
    id: 'pv-turn-out',
    verb: 'turn out',
    baseVerb: 'turn',
    particle: 'out',
    level: 'B1+',
    separable: false,
    meaningEs: 'Resultar ser (al final de modo inesperado)',
    formalEquivalent: 'prove to be (in the end)',
    examples: [
      { en: 'The hotel turned out to be much nicer than the reviews suggested.', es: 'El hotel resultó ser mucho mejor de lo que sugerían las reseñas.' }
    ],
    memoryTrick: 'Estructura fija muy útil: "turn out to be..." o "It turned out that...".'
  },

  // ==================== B2 ====================
  {
    id: 'pv-come-up-with',
    verb: 'come up with',
    baseVerb: 'come',
    particle: 'up with',
    level: 'B2',
    separable: false,
    meaningEs: 'Ocurrírsele a uno (una idea, un plan, una solución, una excusa)',
    formalEquivalent: 'think of / devise / produce (an idea)',
    examples: [
      { en: 'We need to come up with a convincing solution before Friday.', es: 'Necesitamos que se nos ocurra una solución convincente antes del viernes.' }
    ],
    memoryTrick: 'Subir a la superficie (COME UP) trayendo una idea (WITH).'
  },
  {
    id: 'pv-look-up-to',
    verb: 'look up to',
    baseVerb: 'look',
    particle: 'up to',
    level: 'B2',
    separable: false,
    meaningEs: 'Admirar y respetar a alguien (su opuesto es "look down on" = menospreciar)',
    formalEquivalent: 'admire / respect',
    examples: [
      { en: 'She has always looked up to her older sister.', es: 'Siempre ha admirado a su hermana mayor.' }
    ],
    memoryTrick: 'Mirar hacia arriba (UP) = admirar; Mirar por encima del hombro hacia abajo (LOOK DOWN ON) = despreciar.'
  },
  {
    id: 'pv-live-up-to',
    verb: 'live up to',
    baseVerb: 'live',
    particle: 'up to',
    level: 'B2',
    separable: false,
    meaningEs: 'Estar a la altura de (las expectativas, la fama o una promesa)',
    formalEquivalent: 'fulfil expectations',
    examples: [
      { en: 'The sequel failed to live up to the high expectations of fans.', es: 'La secuela no logró estar a la altura de las altas expectativas de los fans.' }
    ],
    memoryTrick: 'Casi siempre va con "expectations" o "reputation" en exámenes de B2.'
  },
  {
    id: 'pv-run-into',
    verb: 'run into',
    baseVerb: 'run',
    particle: 'into',
    level: 'B2',
    separable: false,
    meaningEs: '1) Toparse por casualidad con alguien (= bump into) | 2) Encontrarse con dificultades',
    formalEquivalent: 'meet by chance / encounter (problems)',
    examples: [
      { en: 'Guess who I ran into at the airport yesterday!', es: '¡Adivina con quién me topé ayer en el aeropuerto!' },
      { en: 'The project ran into serious financial difficulties.', es: 'El proyecto se topó con graves dificultades financieras.' }
    ],
    memoryTrick: 'Chocar por sorpresa contra (INTO) alguien o un problema.'
  },
  {
    id: 'pv-talk-into',
    verb: 'talk someone into',
    baseVerb: 'talk',
    particle: 'into',
    level: 'B2',
    separable: true,
    meaningEs: 'Convencer a alguien para que haga algo (+ -ING) | Su opuesto: talk someone OUT OF',
    formalEquivalent: 'persuade someone to do',
    examples: [
      { en: 'My friends talked me into signing up for the marathon.', es: 'Mis amigos me convencieron para apuntarme al maratón.' },
      { en: 'Thankfully, she talked him out of quitting his job.', es: 'Por suerte, ella lo disuadió de dejar su trabajo.' }
    ],
    memoryTrick: 'Hablar a alguien hasta meterlo dentro (INTO) o sacarlo (OUT OF) de una acción (+ V-ing).'
  },
  {
    id: 'pv-account-for',
    verb: 'account for',
    baseVerb: 'account',
    particle: 'for',
    level: 'B2',
    separable: false,
    meaningEs: '1) Explicar o justificar la causa de algo | 2) Representar un porcentaje',
    formalEquivalent: 'explain / constitute',
    examples: [
      { en: 'How do you account for the sudden drop in sales?', es: '¿Cómo explicas la caída repentina de las ventas?' },
      { en: 'Renewable energy now accounts for 45% of our electricity.', es: 'La energía renovable representa ahora el 45% de nuestra electricidad.' }
    ],
    memoryTrick: 'Dar cuentas (ACCOUNT) por (FOR) algo.'
  },
  {
    id: 'pv-stand-out',
    verb: 'stand out',
    baseVerb: 'stand',
    particle: 'out',
    level: 'B2',
    separable: false,
    meaningEs: 'Destacar, sobresalir entre los demás',
    formalEquivalent: 'be noticeable / excel',
    examples: [
      { en: 'Her CV really stood out from the hundreds of applications we received.', es: 'Su currículum destacó de verdad entre los cientos de solicitudes que recibimos.' }
    ],
    memoryTrick: 'Estar de pie (STAND) fuera del grupo (OUT).'
  },

  // ==================== B2+ ====================
  {
    id: 'pv-do-away-with',
    verb: 'do away with',
    baseVerb: 'do',
    particle: 'away with',
    level: 'B2+',
    separable: false,
    meaningEs: 'Abolir, eliminar, deshacerse por completo de una norma o sistema antiguo',
    formalEquivalent: 'abolish / eliminate / get rid of',
    examples: [
      { en: 'Many companies have done away with strict dress codes.', es: 'Muchas empresas han eliminado los códigos de vestimenta estrictos.' }
    ],
    memoryTrick: 'Mandar lejos (AWAY) una costumbre o regla.'
  },
  {
    id: 'pv-brush-up-on',
    verb: 'brush up on',
    baseVerb: 'brush',
    particle: 'up on',
    level: 'B2+',
    separable: false,
    meaningEs: 'Repasar o refrescar un idioma o habilidad que tenías oxidada',
    formalEquivalent: 'review / refresh one\'s knowledge of',
    examples: [
      { en: 'I need to brush up on my English grammar before the interview.', es: 'Necesito repasar/desempolvar mi gramática inglesa antes de la entrevista.' }
    ],
    memoryTrick: 'Cepillar (BRUSH UP) para quitar el polvo a un conocimiento.'
  },
  {
    id: 'pv-come-down-with',
    verb: 'come down with',
    baseVerb: 'come',
    particle: 'down with',
    level: 'B2+',
    separable: false,
    meaningEs: 'Caer enfermo de (gripe, resfriado, virus; no enfermedades graves)',
    formalEquivalent: 'catch an illness / fall ill with',
    examples: [
      { en: 'I think I\'m coming down with the flu; my throat hurts.', es: 'Creo que estoy pillando la gripe; me duele la garganta.' }
    ],
    memoryTrick: 'Caer en cama (DOWN) con (WITH) un resfriado o gripe.'
  },
  {
    id: 'pv-boil-down-to',
    verb: 'boil down to',
    baseVerb: 'boil',
    particle: 'down to',
    level: 'B2+',
    separable: false,
    meaningEs: 'Reducirse en el fondo a (la razón principal o esencia de un problema)',
    formalEquivalent: 'be essentially a matter of',
    examples: [
      { en: 'In the end, the whole dispute boils down to a lack of communication.', es: 'Al final, toda la disputa se reduce a una falta de comunicación.' }
    ],
    memoryTrick: 'Cuando hierves una salsa (BOIL DOWN), se evapora el agua y queda solo la esencia.'
  },
  {
    id: 'pv-back-out-of',
    verb: 'back out of',
    baseVerb: 'back',
    particle: 'out of',
    level: 'B2+',
    separable: false,
    meaningEs: 'Echarse atrás en un acuerdo o promesa en el último momento',
    formalEquivalent: 'withdraw from an agreement',
    examples: [
      { en: 'The buyer backed out of the deal at the very last minute.', es: 'El comprador se echó atrás en el trato en el último minuto.' }
    ],
    memoryTrick: 'Dar marcha atrás (BACK) saliendo (OUT) de un compromiso.'
  },
  {
    id: 'pv-crack-down-on',
    verb: 'crack down on',
    baseVerb: 'crack',
    particle: 'down on',
    level: 'B2+',
    separable: false,
    meaningEs: 'Tomar medidas drásticas o mano dura contra algo ilegal',
    formalEquivalent: 'take severe measures against',
    examples: [
      { en: 'The authorities are cracking down on tax evasion.', es: 'Las autoridades están tomando medidas severas contra la evasión fiscal.' }
    ],
    memoryTrick: 'Golpear con mano dura (CRACK DOWN) sobre (ON) una infracción.'
  },
  {
    id: 'pv-fall-through',
    verb: 'fall through',
    baseVerb: 'fall',
    particle: 'through',
    level: 'B2+',
    separable: false,
    meaningEs: 'Fracasar o no llegar a realizarse un plan, negocio o venta',
    formalEquivalent: 'fail to happen / collapse (a plan)',
    examples: [
      { en: 'Our plans to buy the house fell through when the bank refused the loan.', es: 'Nuestros planes de comprar la casa se vinieron abajo cuando el banco denegó el préstamo.' }
    ],
    memoryTrick: 'Caerse por un agujero en el suelo (FALL THROUGH) = un plan que fracasa.'
  }
];

export const CURATED_PHRASAL_EXERCISES: Exercise[] = [
  {
    id: 'pv-ex-1',
    level: 'A2+',
    category: 'phrasal_verbs',
    topicLabel: 'Phrasal Verbs: Separable Pronouns',
    type: 'error_correction',
    prompt: 'Corrige el error de orden del pronombre con el Phrasal Verb:',
    baseSentence: 'Your shoes are covered in mud; please take off them before coming inside.',
    errorWord: 'take off them',
    acceptedAnswers: [
      'Your shoes are covered in mud; please take them off before coming inside.',
      'take them off'
    ],
    explanation: 'Con Phrasal Verbs separables (take off, turn on, put on, throw away, let down), si el objeto es un PRONOMBRE (it, them, me, him, her), es OBLIGATORIO colocarlo en medio: "take them off".',
    grammarRule: 'Separable Phrasal Verb + Pronoun (it/them) -> Verb + Pronoun + Particle'
  },
  {
    id: 'pv-ex-2',
    level: 'B1',
    category: 'phrasal_verbs',
    topicLabel: 'Put off vs Call off',
    type: 'transformation',
    prompt: 'Sustituye el verbo formal por un Phrasal Verb usando la palabra clave:',
    baseSentence: 'They decided to postpone the meeting until next Wednesday.',
    keyWord: 'PUT',
    spanishHint: 'They decided to ___ until next Wednesday.',
    acceptedAnswers: [
      'put off the meeting',
      'put the meeting off'
    ],
    explanation: '"Postpone" (aplazar para más adelante) equivale a "put off". ("Call off" significaría cancelar definitivamente).',
    grammarRule: 'postpone = put off | cancel = call off'
  },
  {
    id: 'pv-ex-3',
    level: 'B1',
    category: 'phrasal_verbs',
    topicLabel: 'Look forward to + -ing',
    type: 'transformation',
    prompt: 'Completa usando un Phrasal Verb con la palabra clave:',
    baseSentence: 'I can\'t wait to see how you react when you open your present!',
    keyWord: 'FORWARD',
    spanishHint: 'I am really ___ how you react when you open your present!',
    acceptedAnswers: [
      'looking forward to seeing'
    ],
    explanation: '"Can\'t wait to do" equivale a "look forward to + V-ing" ("looking forward to seeing"). Recuerda que tras "look forward to" el verbo va siempre en -ING.',
    grammarRule: 'look forward to + V-ing'
  },
  {
    id: 'pv-ex-4',
    level: 'B1+',
    category: 'phrasal_verbs',
    topicLabel: 'Put up with (Tolerate)',
    type: 'transformation',
    prompt: 'Transforma usando un Phrasal Verb de 3 palabras:',
    baseSentence: 'I refuse to tolerate his arrogant attitude any longer.',
    keyWord: 'PUT',
    spanishHint: 'I refuse to ___ his arrogant attitude any longer.',
    acceptedAnswers: [
      'put up with'
    ],
    explanation: '"Tolerate / stand / endure" equivale al Phrasal Verb de tres palabras "put up with".',
    grammarRule: 'tolerate = put up with'
  },
  {
    id: 'pv-ex-5',
    level: 'B1+',
    category: 'phrasal_verbs',
    topicLabel: 'Cut down on (Reduce)',
    type: 'transformation',
    prompt: 'Transforma usando un Phrasal Verb con la palabra clave:',
    baseSentence: 'My doctor told me that I should reduce the amount of salt I eat.',
    keyWord: 'CUT',
    spanishHint: 'My doctor told me that I should ___ salt.',
    acceptedAnswers: [
      'cut down on'
    ],
    explanation: 'Para decir "reducir el consumo de algo" usamos el Phrasal Verb de tres palabras "cut down on".',
    grammarRule: 'reduce consumption of = cut down on'
  },
  {
    id: 'pv-ex-6',
    level: 'B2',
    category: 'phrasal_verbs',
    topicLabel: 'Come up with (Ideas)',
    type: 'transformation',
    prompt: 'Transforma usando el Phrasal Verb adecuado:',
    baseSentence: 'Nobody in the department could think of a better name for the campaign.',
    keyWord: 'COME',
    spanishHint: 'Nobody in the department could ___ a better name for the campaign.',
    acceptedAnswers: [
      'come up with'
    ],
    explanation: '"Think of / invent / produce an idea or solution" equivale a "come up with".',
    grammarRule: 'think of (an idea/plan/solution) = come up with'
  },
  {
    id: 'pv-ex-7',
    level: 'B2',
    category: 'phrasal_verbs',
    topicLabel: 'Live up to (Expectations)',
    type: 'transformation',
    prompt: 'Transforma usando la palabra clave:',
    baseSentence: 'Unfortunately, the restaurant wasn\'t as good as we had expected.',
    keyWord: 'LIVE',
    spanishHint: 'Unfortunately, the restaurant didn\'t ___ our expectations.',
    acceptedAnswers: [
      'live up to'
    ],
    explanation: '"Estar a la altura de las expectativas" es la colocación fija de nivel B2 "live up to (one\'s) expectations".',
    grammarRule: 'live up to expectations'
  },
  {
    id: 'pv-ex-8',
    level: 'B2',
    category: 'phrasal_verbs',
    topicLabel: 'Talk into / out of',
    type: 'transformation',
    prompt: 'Transforma usando un Phrasal Verb con TALK:',
    baseSentence: 'Elena persuaded her brother not to buy that second-hand motorbike.',
    keyWord: 'TALKED',
    spanishHint: 'Elena ___ buying that second-hand motorbike.',
    acceptedAnswers: [
      'talked her brother out of'
    ],
    explanation: 'Disuadir o convencer a alguien de NO hacer algo es "talk someone OUT OF + V-ing". (Convencer de hacerlo es "talk someone INTO + V-ing").',
    grammarRule: 'persuade sb NOT to do = talk sb out of + V-ing'
  },
  {
    id: 'pv-ex-9',
    level: 'B2+',
    category: 'phrasal_verbs',
    topicLabel: 'Brush up on / Come down with',
    type: 'cloze',
    prompt: 'Before moving to Brussels, I really need to brush ___ on my French.',
    spanishHint: 'Antes de mudarme a Bruselas, necesito de verdad repasar/refrescar mi francés.',
    acceptedAnswers: [
      'up'
    ],
    explanation: '"Brush up on something" significa repasar o desempolvar un idioma o conocimiento que tenías olvidado.',
    grammarRule: 'brush up on + skill/language'
  },
  {
    id: 'pv-ex-10',
    level: 'B2+',
    category: 'phrasal_verbs',
    topicLabel: 'Fall through / Back out of',
    type: 'transformation',
    prompt: 'Transforma usando un Phrasal Verb de nivel B2+:',
    baseSentence: 'The merger between the two airlines failed to happen at the last moment.',
    keyWord: 'FELL',
    spanishHint: 'The merger between the two airlines ___ at the last moment.',
    acceptedAnswers: [
      'fell through'
    ],
    explanation: 'Cuando un trato, acuerdo, plan o compra fracasa y no llega a completarse, usamos "fall through" (en pasado: "fell through").',
    grammarRule: 'plan/deal fails to happen = fall through'
  }
];
