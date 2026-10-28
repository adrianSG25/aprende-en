const fs = require('fs');
const path = require('path');

const grammarFilePath = path.join(__dirname, '..', 'src', 'data', 'grammarData.ts');
const originalContent = fs.readFileSync(grammarFilePath, 'utf8');

// Buscamos donde empieza CURATED_GRAMMAR_EXERCISES
const splitMarker = 'export const CURATED_GRAMMAR_EXERCISES: Exercise[] = [';
const parts = originalContent.split(splitMarker);

if (parts.length !== 2) {
  console.error('Error: no se encontró el marcador de corte exacto');
  process.exit(1);
}

const exercisesPart = splitMarker + parts[1];

const unitsCode = `import { GrammarUnit, Exercise } from '../types';

export const GRAMMAR_UNITS: GrammarUnit[] = [
  // ==================== A2+ (A2 ADVANCED) ====================
  {
    id: 'a2p-past-tenses',
    level: 'A2+',
    title: 'Past Simple vs. Past Continuous (con when, while, as)',
    subtitle: 'Acciones que interrumpen frente a acciones en progreso en el pasado',
    formula: 'While + Past Continuous (was/were + -ing), Past Simple (V-ed / 2ª col)',
    inPlainSpanish: 'Imagina que estás viendo una película o haciendo algo que lleva tiempo (como ducharte, cocinar o conducir), y de repente ¡ZAS! pasa algo puntual que te corta el rollo (suena el móvil, se va la luz o pinchas una rueda). La acción larga y continua lleva "-ing" (was/were doing). El hachazo rápido que te interrumpe va en pasado normal (knocked, rang, started).',
    spanishParallel: 'En español decimos exactamente: "Me estaba duchando cuando sonó el timbre". En inglés es idéntico: "I was having a shower when the doorbell rang". El fallo típico de los españoles es intentar meter dos pasados secos ("While I walked home, it started to rain" ❌) o meter verbos de mente que no admiten acción continua como saber o entender ("I was knowing" ❌ en vez de "I knew" ✅).',
    mentalTrick: 'La regla del "Vídeo y la Foto": la acción larga que dura un rato es un VÍDEO (lleva -ing: was cooking). Lo que te interrumpe de golpe es una FOTO fija (pasado simple: the phone rang).',
    streetExamples: [
      {
        situation: 'Estás en la ducha y de repente llaman a la puerta.',
        howYouSayItInSpanish: 'Me estaba duchando cuando sonó el timbre.',
        howEnglishBuildsIt: 'I was having a shower when the doorbell rang.',
        breakdown: 'Ducharse dura minutos (was having = continuo). El timbre es un segundo puntual (rang = pasado simple).'
      },
      {
        situation: 'Vas conduciendo al trabajo tranquilamente y pinchas una rueda.',
        howYouSayItInSpanish: 'Iba conduciendo al trabajo cuando pinché una rueda.',
        howEnglishBuildsIt: 'I was driving to work when I got a flat tyre.',
        breakdown: 'Conducir era el viaje largo (was driving). El pinchazo ocurrió en un instante (got).'
      },
      {
        situation: 'Cocinando la cena te quemas el dedo con la sartén.',
        howYouSayItInSpanish: 'Me quemé la mano mientras estaba cocinando la cena.',
        howEnglishBuildsIt: 'I burned my hand while I was cooking dinner.',
        breakdown: 'Con "while" (mientras) siempre viene la acción larga con -ing (was cooking).'
      }
    ],
    whenToUse: [
      'Usa Past Continuous para la acción larga o "telón de fondo" que estaba en progreso.',
      'Usa Past Simple para la acción corta que interrumpe o para una secuencia de acciones terminadas.',
      'Con "while" / "as" suele ir Past Continuous; con "when" suele ir la interrupción en Past Simple.'
    ],
    spanishSpeakerTraps: [
      {
        wrong: 'While I walked home, it started to rain.',
        right: 'While I was walking home, it started to rain.',
        why: 'La acción de caminar estaba en progreso cuando empezó a llover.'
      },
      {
        wrong: 'I was knowing the answer immediately.',
        right: 'I knew the answer immediately.',
        why: 'Los "stative verbs" (know, believe, want, belong, understand, need) NUNCA van en continuo.'
      }
    ],
    examples: [
      {
        en: 'We were having dinner when the lights suddenly went out.',
        es: 'Estábamos cenando cuando las luces se apagaron de repente.',
        highlight: 'were having ... went out'
      },
      {
        en: 'What were you doing at 9 PM last night?',
        es: '¿Qué estabas haciendo anoche a las 9?',
        highlight: 'were you doing'
      }
    ],
    keyTips: [
      'Recuerda: Stative verbs (know, like, prefer, own, seem, need) prohíben la forma -ing.',
      'Dos acciones largas simultáneas usan ambas Past Continuous: "While I was cooking, she was working."'
    ]
  },
  {
    id: 'a2p-present-perfect-particles',
    level: 'A2+',
    title: 'Present Perfect con Just, Already, Yet, Still, Ever, Never, For y Since',
    subtitle: 'Conectar el pasado con el presente y posicionar adverbios con precisión',
    formula: 'have/has + (just/already/never/ever) + Past Participle | ... + yet (al final) | Still + haven\'t/hasn\'t',
    inPlainSpanish: 'Sirve para hablar de cosas que acabas de hacer, cosas que ya has hecho antes de tiempo, o cosas que todavía tienes pendientes. El gran lío para los españoles es que nosotros decimos "Llevo 3 años viviendo aquí" (en presente), pero en inglés NO pueden usar presente: dicen literalmente "He vivido aquí durante 3 años" (I have lived here for 3 years) porque la acción sigue viva hoy.',
    spanishParallel: 'En español decimos: "¿Has comido ya?" o "Todavía no me ha contestado". En inglés usan fichas fijas: JUST = "Acabo de" (I have just arrived). ALREADY = "Ya lo he hecho" (I have already done it). YET = "Todavía no" o "¿Ya?" (va SIEMPRE al final de la frase: Not yet / Has he arrived yet?). Y el error mortal: decir "since 3 years" ❌ en vez de "for 3 years" ✅.',
    mentalTrick: 'JUST = Acabo de (en mitad). ALREADY = Ya (en mitad). YET = Al final siempre (en preguntas o negativas). FOR = Número de días/años (for 3 months). SINCE = Fecha fija de partida (since 2021).',
    streetExamples: [
      {
        situation: 'Te ofrecen comida pero te acabas de zampar un bocadillo.',
        howYouSayItInSpanish: 'No gracias, acabo de comer.',
        howEnglishBuildsIt: 'No thanks, I have just eaten.',
        breakdown: 'HAVE JUST + participio = acabo de hacerlo hace dos minutos.'
      },
      {
        situation: 'Tu jefe te pregunta si has terminado el informe y todavía no has podido.',
        howYouSayItInSpanish: 'Todavía no he terminado el informe.',
        howEnglishBuildsIt: 'I haven\'t finished the report yet. (o "I still haven\'t finished it")',
        breakdown: '"Yet" va siempre al final de la frase en negativas y preguntas.'
      },
      {
        situation: 'Le cuentas a un colega cuánto tiempo llevas en tu piso actual.',
        howYouSayItInSpanish: 'Llevo viviendo en este piso 2 años.',
        howEnglishBuildsIt: 'I have lived in this flat for two years.',
        breakdown: 'Prohibido decir "I live since 2 years". En inglés es "have lived" + FOR + cantidad de tiempo.'
      }
    ],
    whenToUse: [
      'JUST: Acción recién ocurrida (va entre have/has y el participio).',
      'ALREADY: Ya ha ocurrido, a menudo antes de lo esperado (entre have/has y participio).',
      'YET: "Todavía no" (negativa) o "¿Ya?" (pregunta). Va SIEMPRE al final de la frase.',
      'STILL: En negativas enfatiza que sigue sin ocurrir: "I still haven\'t found it" (va ANTES de haven\'t).',
      'FOR + periodo de duración (for ten years, for a long time) vs SINCE + punto de inicio (since 2019, since I arrived).'
    ],
    spanishSpeakerTraps: [
      {
        wrong: 'I live in Madrid since five years.',
        right: 'I have lived in Madrid for five years.',
        why: 'En español usamos presente ("vivo desde hace..."), pero en inglés es OBLIGATORIO Present Perfect + FOR.'
      },
      {
        wrong: 'She hasn\'t still called me.',
        right: 'She still hasn\'t called me. / She hasn\'t called me yet.',
        why: '"Still" va ANTES del auxiliar negativo (still haven\'t), mientras que "yet" va al final.'
      }
    ],
    examples: [
      {
        en: 'I have known my best friend since we were at primary school.',
        es: 'Conozco a mi mejor amigo desde que estábamos en primaria.',
        highlight: 'have known ... since'
      },
      {
        en: 'They still haven\'t replied to my email, and I sent it three days ago.',
        es: 'Todavía no han respondido a mi correo, y lo envié hace tres días.',
        highlight: 'still haven\'t replied'
      }
    ],
    keyTips: [
      'Después de "since" si pones un verbo debe ir en Past Simple: "I have been here since the meeting STARTED".',
      'Diferencia clave: "been to" (ha ido y ha vuelto) vs "gone to" (se ha ido y sigue allí).'
    ]
  },
  {
    id: 'a2p-comparatives-modifiers',
    level: 'A2+',
    title: 'Comparativos Avanzados, As...As, Too y Enough',
    subtitle: 'Modificadores (much, far, slightly) y estructuras de suficiencia',
    formula: 'much/far/a lot/a bit + comparative | not as/so + adj + as | too + adj | adj + enough / enough + noun',
    inPlainSpanish: 'Cómo comparar cosas como un nativo: no solo decir "esto es más barato", sino "esto es infinitamente más barato", "este curro no es tan divertido como el otro", "hace demasiado frío para salir" o "no tengo suficiente pasta para comprarlo".',
    spanishParallel: 'El error garrafal del 99% de los hispanohablantes es decir "very better" o "very more cheap" ❌. En inglés "very" NUNCA puede ir delante de un comparativo; tienes que usar "much better" (mucho mejor) o "far more expensive" (muchísimo más caro). Y con "enough": en español decimos "dinero suficiente" o "suficiente dinero", pero en inglés siempre es "enough money" (cosa detrás) y "fast enough" (adjetivo delante).',
    mentalTrick: 'Para decir "mucho más", ¡olvídate de "very" y usa siempre MUCH o FAR! Con "enough": si es cualidad/adjetivo va delante (old enough); si es dinero o tiempo va detrás (enough time, enough money).',
    streetExamples: [
      {
        situation: 'Comparas dos billetes de tren: uno cuesta 15€ y el otro 90€.',
        howYouSayItInSpanish: 'El primer billete es muchísimo más barato que el segundo.',
        howEnglishBuildsIt: 'The first ticket is far cheaper than the second one.',
        breakdown: 'Nunca digas "very cheaper". Usa "far cheaper" o "much cheaper".'
      },
      {
        situation: 'La pizza que te han servido quema una barbaridad.',
        howYouSayItInSpanish: 'La pizza está demasiado caliente para comérsela.',
        howEnglishBuildsIt: 'The pizza is too hot to eat.',
        breakdown: 'TOO + adjetivo + TO + verbo = demasiado para poder hacerlo.'
      },
      {
        situation: 'Quieres alquilar un piso pero te piden ganar 2000€ y ganas 1200€.',
        howYouSayItInSpanish: 'No gano suficiente dinero para alquilarlo.',
        howEnglishBuildsIt: 'I don\'t earn enough money to rent it. (o "I\'m not rich enough")',
        breakdown: 'Enough delante del sustantivo (enough money), pero detrás del adjetivo (rich enough).'
      }
    ],
    whenToUse: [
      'Para intensificar un comparativo NUNCA uses "very" ("very better" ❌); usa "much", "far" o "a lot" ("much better", "far more expensive").',
      'TOO + adjetivo/adverbio + (for someone) + to infinitive: "The coffee is too hot to drink".',
      'Adjetivo + ENOUGH vs ENOUGH + Sustantivo: "old enough" (adjetivo delante) pero "enough money" (sustantivo detrás).'
    ],
    spanishSpeakerTraps: [
      {
        wrong: 'This exam is very easier than the last one.',
        right: 'This exam is much / far easier than the last one.',
        why: 'Delante de un comparativo jamás se usa "very"; se usa "much", "far" o "a lot".'
      },
      {
        wrong: 'He doesn\'t have money enough to buy the car.',
        right: 'He doesn\'t have enough money / He isn\'t rich enough to buy the car.',
        why: '"Enough" va DELANTE de sustantivos (enough time) y DETRÁS de adjetivos (fast enough).'
      }
    ],
    examples: [
      {
        en: 'Travelling by train is far more comfortable than taking a budget flight.',
        es: 'Viajar en tren es mucho más cómodo que coger un vuelo barato.',
        highlight: 'far more comfortable than'
      },
      {
        en: 'The box wasn\'t light enough for me to lift on my own.',
        es: 'La caja no era lo suficientemente ligera como para levantarla yo solo.',
        highlight: 'light enough for me to lift'
      }
    ],
    keyTips: [
      'Truco de transformación: "A is bigger than B" = "B isn\'t as big as A".',
      'Truco de transformación: "too cold to swim" = "not warm enough to swim".'
    ]
  },
  {
    id: 'a2p-modals-obligation',
    level: 'A2+',
    title: 'Modales de Obligación, Prohibición y Consejo (Must, Have to, Should, Ought to, Needn\'t)',
    subtitle: 'La diferencia crítica entre mustn\'t y don\'t have to / needn\'t',
    formula: 'mustn\'t (prohibido) ≠ don\'t have to / don\'t need to / needn\'t (no es necesario)',
    inPlainSpanish: 'La diferencia entre: "está terminantemente prohibido bajo multa", "tienes que hacerlo obligatoriamente", y "no hace falta que lo hagas si no quieres (pero eres libre de hacerlo)". Aquí es donde más españoles se lían porque traducen a lo loco.',
    spanishParallel: 'En español decimos: "No tienes que venir mañana si estás cansado". Si en inglés dices "You mustn\'t come", ¡le estás diciendo que le PROHÍBES la entrada! Si quieres decir que no hace falta, tienes que decir "You don\'t have to come" o "You needn\'t come". Mustn\'t es como saltarse un semáforo en rojo o fumar en un hospital.',
    mentalTrick: 'MUSTN\'T = Prohibido (cárcel/peligro). DON\'T HAVE TO = Libre albedrío (no hace falta, tú decides). HAD BETTER = "Más te vale" (aviso de consecuencias malas si no lo haces).',
    streetExamples: [
      {
        situation: 'En la oficina es viernes y se puede ir en vaqueros.',
        howYouSayItInSpanish: 'Hoy no hace falta llevar traje.',
        howEnglishBuildsIt: 'You don\'t have to wear a suit today. (o "You needn\'t wear a suit")',
        breakdown: 'Si dijeras "You mustn\'t wear a suit", significaría que está prohibido llevar traje.'
      },
      {
        situation: 'En una gasolinera ves a alguien con un cigarrillo.',
        howYouSayItInSpanish: '¡Está prohibido fumar aquí!',
        howEnglishBuildsIt: 'You mustn\'t smoke here!',
        breakdown: 'Prohibición absoluta = MUSTN\'T.'
      },
      {
        situation: 'Tu colega va a perder el vuelo si no sale ya de casa.',
        howYouSayItInSpanish: 'Más te vale coger un taxi ahora mismo.',
        howEnglishBuildsIt: 'You had better take a taxi right now.',
        breakdown: '"Had better + verbo normal" = Más te vale hacerlo (si no, habrá problemas).'
      }
    ],
    whenToUse: [
      'MUST / HAVE TO: Obligación. En pasado ambos son HAD TO.',
      'MUSTN\'T: Prohibición total ("No debes hacerlo / está prohibido").',
      'DON\'T HAVE TO / NEEDN\'T: Ausencia de obligación ("No hace falta que lo hagas, pero puedes si quieres").',
      'SHOULD / OUGHT TO / HAD BETTER: Consejo o recomendación fuerte ("You had better hurry up").'
    ],
    spanishSpeakerTraps: [
      {
        wrong: 'You mustn\'t pay today; you can pay tomorrow.',
        right: 'You don\'t have to / needn\'t pay today; you can pay tomorrow.',
        why: 'Si no es obligatorio pero sí permitido, es "don\'t have to" o "needn\'t", NUNCA "mustn\'t".'
      },
      {
        wrong: 'You needn\'t to bring an umbrella.',
        right: 'You needn\'t bring / You don\'t need to bring an umbrella.',
        why: '"Needn\'t" es modal puro y va seguido de infinitivo SIN "to" (needn\'t bring).'
      }
    ],
    examples: [
      {
        en: 'You don\'t have to wear a tie, but you mustn\'t wear jeans.',
        es: 'No tienes por qué llevar corbata, pero está prohibido llevar vaqueros.',
        highlight: 'don\'t have to ... mustn\'t'
      },
      {
        en: 'You had better tell her the truth before she finds out.',
        es: 'Más te vale decirle la verdad antes de que se entere.',
        highlight: 'had better tell'
      }
    ],
    keyTips: [
      '"Had better" (+ infinitivo sin to) expresa una advertencia fuerte: "You\'d better not be late!".',
      '"Ought to" significa exactamente lo mismo que "should", pero lleva "to" ("You ought to apologize").'
    ]
  },

  // ==================== B1 (INTERMEDIATE) ====================
  {
    id: 'b1-past-perfect-used-to',
    level: 'B1',
    title: 'Past Perfect Simple y Hábitos del Pasado (Used to / Would / Be used to)',
    subtitle: 'El "pasado del pasado" y cómo no confundir used to con be/get used to + -ing',
    formula: 'had + Past Participle | used to + V(inf) | be/get used to + V-ing / Noun',
    inPlainSpanish: 'El "pasado del pasado". Cuando estás contando una historia de ayer o del fin de semana, y mencionas algo que ocurrió ANTES de ese momento (el famoso "ya se había ido", "ya habíamos comido"). Y además: cómo decir "antes hacía esto pero ya no" (used to) frente a "estoy acostumbrado a esto" (be used to + -ing).',
    spanishParallel: 'En español decimos: "Cuando llegué al andén, el tren ya se había marchado". En inglés: "When I arrived, the train had already left". Si no pusieras "had", parecería que el tren se fue en el mismo segundo exacto en que pisaste el andén. Y con hábitos: "I used to play tennis" = antes jugaba, ya no. "I am used to waking up early" = estoy acostumbrado a madrugar (¡con -ing!).',
    mentalTrick: 'HAD + participio = La máquina del tiempo hacia atrás (pasó antes de lo que estás contando). USED TO = "Antes sí, ahora ya no". BE USED TO + ING = "Tengo la costumbre / Ya no me cuesta".',
    streetExamples: [
      {
        situation: 'Llegas al bar a las 10 y tu amigo se había pirado a las 9:45.',
        howYouSayItInSpanish: 'Cuando llegué al bar, Marcos ya se había ido a casa.',
        howEnglishBuildsIt: 'When I got to the pub, Marcos had already gone home.',
        breakdown: 'Marcos se fue antes de que tú llegaras: por eso lleva "had already gone".'
      },
      {
        situation: 'De chaval te pasabas las tardes jugando a la Play y ahora no tienes tiempo.',
        howYouSayItInSpanish: 'Antes jugaba a la consola todos los días.',
        howEnglishBuildsIt: 'I used to play video games every day.',
        breakdown: 'Hábito del pasado que ya no haces = USED TO + verbo normal.'
      },
      {
        situation: 'Te vas a vivir a Inglaterra y al principio te cuesta el frío y las horas de las comidas.',
        howYouSayItInSpanish: 'Ya me he acostumbrado a cenar a las 7 de la tarde.',
        howEnglishBuildsIt: 'I am used to having dinner at 7 PM.',
        breakdown: '"Be used to" significa estar acostumbrado y exige que el verbo termine en -ING.'
      }
    ],
    whenToUse: [
      'PAST PERFECT (had done): Acción que ocurrió ANTES que otra acción pasada ("When I arrived, the train had already left").',
      'USED TO + Infinitivo: Hábitos o estados pasados que ya no ocurren ("I used to live in London").',
      'WOULD + Infinitivo: Hábitos repetidos en el pasado, pero NUNCA con verbos de estado (be, live, have, know).',
      'BE USED TO + -ING: Estar acostumbrado a algo. GET USED TO + -ING: Acostumbrarse a algo.'
    ],
    spanishSpeakerTraps: [
      {
        wrong: 'Did you used to play tennis?',
        right: 'Did you use to play tennis?',
        why: 'Al llevar el auxiliar "Did" o "didn\'t", el verbo pierde la "-d": "Did you use to...?" / "I didn\'t use to...".'
      },
      {
        wrong: 'I am used to wake up early.',
        right: 'I am used to waking up early.',
        why: 'En "be/get used to", ese "to" es una PREPOSICIÓN, por lo que el verbo detrás va en -ING.'
      }
    ],
    examples: [
      {
        en: 'By the time the police arrived, the thieves had already escaped.',
        es: 'Para cuando llegó la policía, los ladrones ya habían escapado.',
        highlight: 'arrived ... had already escaped'
      },
      {
        en: 'It took me a few months to get used to driving on the left.',
        es: 'Me llevó unos meses acostumbrarme a conducir por la izquierda.',
        highlight: 'get used to driving'
      }
    ],
    keyTips: [
      '"By the time + Past Simple" casi siempre pide Past Perfect en la otra parte de la frase.',
      'Si puedes traducirlo por "estoy acostumbrado a", pon SIEMPRE -ing detrás de "to".'
    ]
  },
  {
    id: 'b1-conditionals-1-2',
    level: 'B1',
    title: 'First & Second Conditional (con Unless, Provided that, As long as, In case)',
    subtitle: 'Condicionales reales e hipotéticos y conectores condicionales clave de B1/B2',
    formula: '1st: If/Unless + Present, will + V | 2nd: If + Past Simple (were), would/could/might + V',
    inPlainSpanish: 'El 1er condicional es para cosas reales que pueden pasar en el futuro: "Si llueve, me quedo en casa jugando". El 2º condicional es el modo soñador o para dar consejos a colegas: "Si me tocara la lotería, me compraba un barco" o "Si yo fuera tú, no le hablaría". También incluye "Unless" (a menos que) y "In case" (por si las moscas).',
    spanishParallel: 'El fallo que más delata a un hispanohablante: meter "will" detrás del "if". Decir "If it will rain" ❌ suena horroroso en inglés; se dice "If it rains, I will stay" ✅. Y para "In case": significa "por si acaso" (te llevas la chaqueta ANTES de salir por precaución, no después de que haga frío).',
    mentalTrick: 'Después de IF o UNLESS jamás pongas WILL. 1er condicional: If + Presente -> WILL. 2º condicional: If + Pasado -> WOULD. Para dar consejos: "If I were you, I would...".',
    streetExamples: [
      {
        situation: 'Ves nubes negras y coges el paraguas antes de salir de casa por precaución.',
        howYouSayItInSpanish: 'Me llevo el paraguas por si llueve.',
        howEnglishBuildsIt: 'I\'m taking an umbrella in case it rains.',
        breakdown: '"In case" = por si acaso (haces la acción antes por precaución).'
      },
      {
        situation: 'Tu colega está pensando en dejar el trabajo de golpe sin ahorros y le aconsejas.',
        howYouSayItInSpanish: 'Si yo fuera tú, no dejaría el trabajo todavía.',
        howEnglishBuildsIt: 'If I were you, I wouldn\'t quit my job yet.',
        breakdown: '2º condicional: "If I were you" + wouldn\'t + verbo normal.'
      },
      {
        situation: 'Dices a tu compañero que no irás a la cena si no termina pronto.',
        howYouSayItInSpanish: 'A menos que termines a tiempo, me voy solo.',
        howEnglishBuildsIt: 'Unless you finish on time, I\'ll go on my own.',
        breakdown: '"Unless" ya significa "si no"; no le metas un don\'t detrás.'
      }
    ],
    whenToUse: [
      '1st Conditional: Situaciones probables o reales en el futuro. NUNCA pongas "will" después de if/when/unless/as soon as.',
      '2nd Conditional: Situaciones hipotéticas, irreales o improbables en el presente/futuro.',
      'UNLESS = "A menos que / Si no" (equivale a If... not). Va con verbo en afirmativa.',
      'IN CASE = "Por si acaso" (precaución previa) ≠ IF ("Si...").'
    ],
    spanishSpeakerTraps: [
      {
        wrong: 'Unless you don\'t study, you will fail.',
        right: 'Unless you study, you will fail.',
        why: '"Unless" ya es negativo ("a menos que"); no pongas doble negación con "don\'t".'
      },
      {
        wrong: 'As soon as I will arrive, I will call you.',
        right: 'As soon as I arrive, I will call you.',
        why: 'Después de conectores temporales (when, as soon as, until, before, after, once) se usa Present Simple con valor de futuro.'
      }
    ],
    examples: [
      {
        en: 'If I were in your shoes, I would turn down that job offer.',
        es: 'Si yo estuviera en tu lugar, rechazaría esa oferta de trabajo.',
        highlight: 'If I were ... would turn down'
      },
      {
        en: 'You can borrow my car as long as you promise to drive carefully.',
        es: 'Puedes coger prestado mi coche siempre y cuando prometas conducir con cuidado.',
        highlight: 'as long as you promise'
      }
    ],
    keyTips: [
      'Take an umbrella IN CASE it rains = Cógelo ahora por precaución antes de que llueva.',
      'En 2º condicional, "If I were you" es la forma estándar en exámenes para dar consejos.'
    ]
  },
  {
    id: 'b1-passive-voice',
    level: 'B1',
    title: 'La Voz Pasiva en todos los tiempos y Verbos con Dos Objetos',
    subtitle: 'El "se pasivo" español frente a la pasiva inglesa centrada en la persona',
    formula: 'Sujeto + be (en el tiempo de la activa) + Past Participle (+ by alguien)',
    inPlainSpanish: 'En español decimos a todas horas "Se vende piso", "Me han robado el móvil" o "Construyeron este estadio en 1995". En inglés no existe ese "se" para todo. Tienes que usar la pasiva: poner al que recibe la acción como protagonista. Se usa cuando lo que importa es lo que pasó, y no quién lo hizo (o porque no se sabe o porque da igual).',
    spanishParallel: 'En español decimos: "Ayer me ofrecieron un ascenso". En inglés, la persona a la que le dan algo se convierte en el sujeto principal: dicen literalmente "Yo fui ofrecido un ascenso" (I was offered a promotion!). A los hispanohablantes nos choca al principio, pero en inglés es la forma más natural de hablar.',
    mentalTrick: 'El truco del "Me": En inglés, a quien le dan, pagan, roban o dicen algo, va el primero de la frase: "I was told..." (Me dijeron), "I was given..." (Me dieron), "I was paid..." (Me pagaron).',
    streetExamples: [
      {
        situation: 'Dejas la bici candada en la estación y cuando vuelves ha volado.',
        howYouSayItInSpanish: 'Me han robado la bicicleta.',
        howEnglishBuildsIt: 'My bicycle was stolen yesterday.',
        breakdown: 'No sabes quién fue el ladrón: lo importante es la bici (was stolen).'
      },
      {
        situation: 'En una entrevista de trabajo te dicen que el puesto es tuyo.',
        howYouSayItInSpanish: 'Me ofrecieron el puesto de trabajo.',
        howEnglishBuildsIt: 'I was offered the position.',
        breakdown: 'Tú eres el protagonista que recibe la oferta: I was offered.'
      },
      {
        situation: 'Mandan un correo con datos confidenciales por error.',
        howYouSayItInSpanish: 'Ese correo fue enviado por error.',
        howEnglishBuildsIt: 'That email was sent by mistake.',
        breakdown: 'Acción sobre el correo: was + participio (sent).'
      }
    ],
    whenToUse: [
      'Cuando el agente (quien hace la acción) es desconocido, obvio o irrelevante.',
      'Con verbos de doble objeto (give, send, offer, tell, pay, show): es MUCHO más natural poner a la PERSONA como sujeto ("I was given a bonus" > "A bonus was given to me").',
      'En lenguaje formal, científico, laboral o de noticias.'
    ],
    spanishSpeakerTraps: [
      {
        wrong: 'It was explained me the whole process.',
        right: 'The whole process was explained to me. / I had the whole process explained to me.',
        why: '"Explain", "suggest" y "describe" NUNCA admiten la persona como sujeto pasivo directo; requieren "to me".'
      },
      {
        wrong: 'The car has been repaired yesterday.',
        right: 'The car was repaired yesterday.',
        why: 'Con expresiones de tiempo pasado concreto ("yesterday", "last week") es OBLIGATORIO Past Simple pasivo (was/were), nunca Present Perfect.'
      }
    ],
    examples: [
      {
        en: 'All employees will be notified about the schedule changes tomorrow.',
        es: 'Todos los empleados serán notificados mañana sobre los cambios de horario.',
        highlight: 'will be notified'
      },
      {
        en: 'I was promised a full refund by customer service.',
        es: 'Atención al cliente me prometió un reembolso completo.',
        highlight: 'I was promised'
      }
    ],
    keyTips: [
      'Ecuación clave: "They gave ME a book" -> "I was given a book" (la persona salta a la primera posición).',
      'Si necesitas mencionar quién lo hizo, pon "BY" al final ("written BY Orwell").'
    ]
  },
  {
    id: 'b1-reported-speech',
    level: 'B1',
    title: 'Reported Speech: Afirmaciones, Preguntas, Órdenes y Reporting Verbs',
    subtitle: 'El "paso atrás" temporal, cambios de deícticos y verbos avanzados (advise, warn, refuse)',
    formula: 'Direct: Present / Past Simple / Will -> Reported: Past Simple / Past Perfect / Would',
    inPlainSpanish: 'El modo cotilleo: cómo contarle a tu colega lo que te dijo otra persona ayer. "Oye, pues Carlos me dijo que vendría hoy, y me preguntó si le dejaba la chaqueta". La regla de oro es dar UN PASO ATRÁS en el tiempo verbal, porque lo que la otra persona dijo en presente en ese momento, ahora ya es pasado.',
    spanishParallel: 'En español hacemos exactamente lo mismo: "Él dice: Tengo frío" -> "Dijo que tenía frío". En inglés igual: "I am tired" -> "He said he was tired". La diferencia clave está entre SAY y TELL: TELL necesita a la persona pegada ("He told ME"), mientras que SAY no lleva persona ("He said that...").',
    mentalTrick: 'Regla del chisme: tira el verbo hacia el pasado. AM/IS -> WAS. HAVE -> HAD. WILL -> WOULD. CAN -> COULD. Y acuérdate: "He told me" (con persona) vs "He said that" (sin persona).',
    streetExamples: [
      {
        situation: 'Tu jefe te promete ayer en la reunión que te subirá el sueldo.',
        howYouSayItInSpanish: 'Mi jefe me dijo que me subiría el sueldo.',
        howEnglishBuildsIt: 'My boss told me he would give me a raise.',
        breakdown: 'El "will" del jefe se convierte en "would" al contarlo como cotilleo.'
      },
      {
        situation: 'Un amigo te pregunta por WhatsApp si vas a ir a la fiesta el sábado.',
        howYouSayItInSpanish: 'Me preguntó si iba a ir a la fiesta.',
        howEnglishBuildsIt: 'He asked me if I was going to the party.',
        breakdown: 'En preguntas sin palabra interrogativa se mete "if" o "whether".'
      },
      {
        situation: 'El médico te advierte seriamente de que no fumes.',
        howYouSayItInSpanish: 'El médico me dijo que dejara de fumar.',
        howEnglishBuildsIt: 'The doctor warned me to stop smoking.',
        breakdown: 'Con órdenes y consejos se usa el verbo + persona + TO + infinitivo.'
      }
    ],
    whenToUse: [
      'Al reportar lo dicho en el pasado, los tiempos verbales se retrasan un paso (backshift).',
      'Preguntas indirectas (Reported Questions): pierden la inversión y el "do/did"; llevan orden afirmativo Sujeto + Verbo.',
      'Reporting verbs modernos: refuse to do, apologize for doing, advise someone to do, accuse someone of doing.'
    ],
    spanishSpeakerTraps: [
      {
        wrong: 'She asked me where did I live.',
        right: 'She asked me where I lived.',
        why: 'En estilo indirecto NUNCA se usa el auxiliar interrogativo "did/do"; el orden es Sujeto + Verbo.'
      },
      {
        wrong: 'He said me that he was tired.',
        right: 'He told me that he was tired. / He said that he was tired.',
        why: '"Say" jamás va seguido directamente de una persona sin "to"; usa "tell someone".'
      }
    ],
    examples: [
      {
        en: '"I have already seen this movie" -> He told me he had already seen that movie.',
        es: '"Ya he visto esta peli" -> Me dijo que ya había visto esa película.',
        highlight: 'had already seen'
      },
      {
        en: 'The mechanic advised me to replace the brake pads.',
        es: 'El mecánico me aconsejó cambiar las pastillas de freno.',
        highlight: 'advised me to replace'
      }
    ],
    keyTips: [
      'Palabras clave que cambian: today -> that day, tomorrow -> the next day, yesterday -> the day before, here -> there.',
      'Si el verbo es una orden (Don\'t touch!), pasa a "told me NOT TO touch".'
    ]
  },

  // ==================== B1+ (UPPER-INTERMEDIATE PREPARATION) ====================
  {
    id: 'b1p-perfect-continuous',
    level: 'B1+',
    title: 'Present Perfect Continuous vs. Simple y Past Perfect Continuous',
    subtitle: 'Duración ininterrumpida, efectos visibles en el presente y verbos de estado',
    formula: 'have/has been + V-ing (duración/efecto) vs. have/has + V3 (resultado/veces)',
    inPlainSpanish: 'La diferencia entre: "he terminado esto y aquí está el resultado" vs "llevo haciéndolo un buen rato y se me nota en la cara (o sigo con ello todavía)". Es la forma que usan los ingleses para justificar por qué estás sudando, por qué tienes ojeras o por qué el suelo está mojado.',
    spanishParallel: 'En español decimos: "Llevo dos horas limpiando la casa" (y sigo sudando con la fregona) o "He estado corriendo" (por eso estoy jadeando). En inglés es: "I have been cleaning" o "I have been running". Si dices "I have cleaned the house", destacas que la casa YA está impecable y terminada. Con "have been doing", destacas la paliza del proceso.',
    mentalTrick: 'HAVE BEEN + -ING = Acción pesada o que te ha dejado agotado / que sigue en marcha. HAVE + PARTICIPIO = Tarea terminada con éxito (resultado cerrado o número de veces que lo has hecho).',
    streetExamples: [
      {
        situation: 'Llegas a una cita con los pelos de punta y jadeando.',
        howYouSayItInSpanish: 'Perdona el retraso, es que he venido corriendo.',
        howEnglishBuildsIt: 'Sorry I\'m late, I have been running.',
        breakdown: 'Se te nota el esfuerzo en el cuerpo ahora mismo: have been running.'
      },
      {
        situation: 'Llevas esperando el autobús 45 minutos y estás hasta las narices.',
        howYouSayItInSpanish: 'Llevo esperando el autobús tres cuartos de hora.',
        howEnglishBuildsIt: 'I have been waiting for the bus for 45 minutes.',
        breakdown: 'La espera sigue en curso: have been waiting.'
      },
      {
        situation: 'Te preguntan cuántas veces has visto El Señor de los Anillos.',
        howYouSayItInSpanish: 'He visto esa peli cuatro veces.',
        howEnglishBuildsIt: 'I have watched that movie four times.',
        breakdown: 'Número de veces terminado: Present Perfect Simple normal (have watched).'
      }
    ],
    whenToUse: [
      'Usa CONTINUOUS para acciones que han durado un tiempo y cuyo EFECTO VISIBLE es evidente ahora (sudor, pintura en la ropa, cansancio).',
      'Usa SIMPLE para el resultado final o cuando dices CUÁNTAS cosas has terminado o CUÁNTAS VECES ("I have written three reports today").',
      'Verbos de estado (know, like, have de posesión, believe) NUNCA van en continuous: "I have known him for years" (no "have been knowing").'
    ],
    spanishSpeakerTraps: [
      {
        wrong: 'I have been knowing Sarah since 2015.',
        right: 'I have known Sarah since 2015.',
        why: '"Know" es verbo de estado; prohíbe terminantemente la forma -ing continua.'
      },
      {
        wrong: 'How many beers have you been drinking tonight?',
        right: 'How many beers have you drunk tonight?',
        why: 'Cuando preguntas por una CANTIDAD exacta o número de veces, es obligatorio el Simple (drunk).'
      }
    ],
    examples: [
      {
        en: 'My hands are dirty because I have been fixing my motorbike.',
        es: 'Tengo las manos sucias porque he estado arreglando la moto.',
        highlight: 'have been fixing'
      },
      {
        en: 'She was exhausted because she had been driving for eight hours without a break.',
        es: 'Estaba agotada porque llevaba conduciendo ocho horas sin descanso.',
        highlight: 'had been driving'
      }
    ],
    keyTips: [
      '"How long...?" casi siempre busca Continuous ("How long have you been learning English?").',
      '"How many / How much...?" busca Simple ("How much money have you spent?").'
    ]
  },
  {
    id: 'b1p-third-conditional',
    level: 'B1+',
    title: 'Third Conditional (El Pasado Irreal y Arrepentimientos)',
    subtitle: 'Situaciones hipotéticas del pasado imposibles de cambiar y deducciones de consecuencias',
    formula: 'If + Past Perfect (had + V3), would have + Past Participle (would\'ve done)',
    inPlainSpanish: 'El modo arrepentimiento total de la vida: "Si lo hubiera sabido, no habría venido". Habla de cosas del pasado que ya ocurrieron, no tienen vuelta de hoja, y te imaginas cómo habría sido la película si las cosas hubieran sido distintas.',
    spanishParallel: 'En español usamos: "Si hubiera hecho X... habría pasado Y". En inglés es exactamente igual: "If I had known, I would have come". El fallo de los españoles es trabarse al pronunciar "would have"; los nativos lo pegan todo como "would\'ve" (suena parecido a "wúdef").',
    mentalTrick: 'La fórmula del lamento: IF + HAD + participio -> WOULD HAVE + participio. Si en un lado hay HAD, en el otro SIEMPRE va WOULD HAVE.',
    streetExamples: [
      {
        situation: 'Cenaste un marisco sospechoso y te pasaste la noche en el baño.',
        howYouSayItInSpanish: 'Si no me hubiera comido esas gambas, no me habría puesto enfermo.',
        howEnglishBuildsIt: 'If I hadn\'t eaten those prawns, I wouldn\'t have gotten sick.',
        breakdown: 'Ya te las comiste (pasado cerrado): Hadn\'t eaten -> wouldn\'t have gotten.'
      },
      {
        situation: 'Te dormiste 10 minutos más y perdiste el avión de vacaciones.',
        howYouSayItInSpanish: 'Si hubiera puesto la alarma, no habría perdido el vuelo.',
        howEnglishBuildsIt: 'If I had set the alarm, I wouldn\'t have missed the flight.',
        breakdown: 'Lamento de algo que ya no tiene arreglo en el pasado.'
      },
      {
        situation: 'No compraste bitcoins cuando costaban 50 euros.',
        howYouSayItInSpanish: '¡Si hubiera comprado bitcoins en 2012, habría ganado una fortuna!',
        howEnglishBuildsIt: 'If I had bought Bitcoin in 2012, I would have made a fortune!',
        breakdown: 'Hipotético del pasado imposible de cambiar.'
      }
    ],
    whenToUse: [
      'Para hablar de hechos del pasado que NO ocurrieron y sus consecuencias hipotéticas (arrepentimientos o alivio).',
      'En lugar de "would have", puedes usar "could have" (habría podido) o "might have" (quizás habría).',
      'Estructura de inversión avanzada de examen B2: "Had I known about the strike, I would have stayed at home".'
    ],
    spanishSpeakerTraps: [
      {
        wrong: 'If I would have known, I would have told you.',
        right: 'If I had known, I would have told you.',
        why: 'NUNCA pongas "would" dentro de la cláusula con "If"; ahí va "had + participio".'
      },
      {
        wrong: 'If we took a taxi, we wouldn\'t have missed the train.',
        right: 'If we had taken a taxi, we wouldn\'t have missed the train.',
        why: 'Si la consecuencia es en el pasado ("missed the train"), la condición debe ser Past Perfect ("had taken").'
      }
    ],
    examples: [
      {
        en: 'If you had warned me earlier, I could have avoided that huge fine.',
        es: 'Si me hubieras avisado antes, habría podido evitar esa multa enorme.',
        highlight: 'had warned ... could have avoided'
      },
      {
        en: 'We wouldn\'t have found the restaurant if Google Maps hadn\'t guided us.',
        es: 'No habríamos encontrado el restaurante si Google Maps no nos hubiera guiado.',
        highlight: 'wouldn\'t have found ... hadn\'t guided'
      }
    ],
    keyTips: [
      'Truco de examen Cambridge: "Without your help" = "If it hadn\'t been for your help" = "Had it not been for your help".',
      'Recuerda: la parte de "If" NUNCA lleva "would".'
    ]
  },
  {
    id: 'b1p-causative-have-get',
    level: 'B1+',
    title: 'Causative: Have / Get Something Done',
    subtitle: 'Contratar o encargar servicios y situaciones desafortunadas sufridas',
    formula: 'Sujeto + have / get + Objeto + Past Participle (V3)',
    inPlainSpanish: 'Cuando en español decimos "Me voy a cortar el pelo" o "Ayer arreglé el coche". La realidad es que tú NO te cortaste el pelo con tus manos ni te metiste debajo del coche con una llave inglesa: ¡pagaste a un peluquero o a un mecánico para que lo hiciera por ti! En inglés, si dices "I cut my hair", piensan que te volviste loco con las tijeras en el baño.',
    spanishParallel: 'Para decir que alguien te hace un servicio o reparación, los ingleses usan: HAVE / GET + la cosa + hecha en participio. "I had my hair cut" (me cortaron el pelo). "I need to get my car repaired" (tengo que llevar el coche a que me lo arreglen). También se usa si te pasa una desgracia: "I had my phone stolen" (me robaron el móvil).',
    mentalTrick: 'La regla del taller: HAVE + LO QUE ARREGLAN + EN PASADO. "I had my phone screen replaced" = mandé cambiar la pantalla del móvil a una tienda.',
    streetExamples: [
      {
        situation: 'Vas a la peluquería a hacerte un corte degradado.',
        howYouSayItInSpanish: 'Me voy a cortar el pelo esta tarde.',
        howEnglishBuildsIt: 'I\'m having my hair cut this afternoon. (o "getting my hair cut")',
        breakdown: 'Si dices "I will cut my hair", significa que coges tú las tijeras delante del espejo.'
      },
      {
        situation: 'Se te rompe la caldera en casa y viene el técnico de gas.',
        howYouSayItInSpanish: 'Ayer nos arreglaron la caldera.',
        howEnglishBuildsIt: 'We had the boiler repaired yesterday.',
        breakdown: 'Tuviste la caldera (boiler) reparada (repaired) por un profesional.'
      },
      {
        situation: 'Se te rompe el cristal del móvil y lo llevas al chino a cambiar.',
        howYouSayItInSpanish: 'Tengo que cambiarle la pantalla al móvil.',
        howEnglishBuildsIt: 'I need to get my phone screen replaced.',
        breakdown: 'GET + cosa + participio = encargar que te lo cambien.'
      }
    ],
    whenToUse: [
      'Cuando pagas a un profesional, especialista o servicio para que haga algo por ti (médico, mecánico, peluquero, pintor).',
      'GET es más informal y común en el día a día hablado; HAVE es estándar y formal.',
      'También expresa experiencias negativas involuntarias: "He had his passport stolen at the station".'
    ],
    spanishSpeakerTraps: [
      {
        wrong: 'I cut my hair yesterday at the new salon.',
        right: 'I had / got my hair cut yesterday at the new salon.',
        why: 'Si dices "I cut my hair", significa que tú mismo te pusiste delante del espejo con las tijeras.'
      },
      {
        wrong: 'I must have repaired my computer.',
        right: 'I must have my computer repaired.',
        why: 'El orden de palabras es estricto: HAVE + OBJETO (my computer) + PARTICIPIO (repaired).'
      }
    ],
    examples: [
      {
        en: 'We are going to have our living room painted next weekend.',
        es: 'Nos van a pintar el salón el próximo fin de semana.',
        highlight: 'have our living room painted'
      },
      {
        en: 'Where did you get your tyres changed?',
        es: '¿Dónde te cambiaron los neumáticos?',
        highlight: 'did you get your tyres changed'
      }
    ],
    keyTips: [
      'Estructura activa alternativa: "have someone DO something" (sin to) vs "get someone TO DO something".',
      'En exámenes de Cambridge, si ves "Someone stole John\'s wallet", la transformación suele ser "John had his wallet stolen".'
    ]
  },
  {
    id: 'b1p-future-continuous-perfect',
    level: 'B1+',
    title: 'Future Continuous vs. Future Perfect (Will be doing / Will have done)',
    subtitle: 'Acciones en progreso en un momento futuro frente a tareas completadas para una fecha límite',
    formula: 'Will be + V-ing (en progreso a esa hora) vs. Will have + V3 (completado para esa fecha con "by")',
    inPlainSpanish: 'Dos formas de mirar al futuro como un jefe: 1) Future Continuous: "A esa hora concreta estaré haciendo X" (ej. "A las 4 ni me llames, que estaré en el gimnasio sudando"). 2) Future Perfect: "Para esa fecha o hora límite, ya habré terminado X" (ej. "Para las 8 ya habré llegado a casa" o "Para el viernes me habré fundido todo el sueldo").',
    spanishParallel: 'En español decimos: "A las 10 estaré durmiendo" -> "At 10 PM I will be sleeping". Y decimos: "Para el mes que viene ya me habré sacado el carnet" -> "By next month I will have passed my driving test". La palabra clave que delata al Future Perfect siempre es BY (by tomorrow, by 5 PM, by next year).',
    mentalTrick: 'WILL BE + -ING = "Píllame en pleno proceso a esa hora". BY + fecha = Pide a gritos WILL HAVE + participio ("Para entonces ya estará finiquitado").',
    streetExamples: [
      {
        situation: 'Tus amigos quieren llamarte para jugar a la Play a las 9 pero hay partido de Champions.',
        howYouSayItInSpanish: 'A las 9 no me llaméis, que estaré viendo el partido.',
        howEnglishBuildsIt: 'Don\'t call me at 9 PM, I will be watching the match.',
        breakdown: 'A las 9 en punto estarás en pleno directo: will be watching.'
      },
      {
        situation: 'Le prometes a tu jefe que el proyecto estará listo a media tarde.',
        howYouSayItInSpanish: 'Para las 5 de la tarde ya habré terminado el informe.',
        howEnglishBuildsIt: 'By 5 PM, I will have finished the report.',
        breakdown: 'Con "BY" (para esa hora) siempre va Future Perfect: will have finished.'
      },
      {
        situation: 'Haces planes de vida pensando en el año 2030.',
        howYouSayItInSpanish: 'Para 2030 ya me habré comprado una casa.',
        howEnglishBuildsIt: 'By 2030, I will have bought a house.',
        breakdown: 'Meta cumplida antes de una fecha futura: will have bought.'
      }
    ],
    whenToUse: [
      'FUTURE CONTINUOUS (will be + -ing): Para una acción que estará sucediendo en un momento concreto futuro.',
      'FUTURE PERFECT (will have + V3): Para una acción que estará COMPLETADA antes o a más tardar en una fecha límite ("BY Monday", "BY the time you arrive").',
      'Future Perfect Continuous (will have been + -ing): Para enfatizar la DURACIÓN hasta ese punto futuro.'
    ],
    spanishSpeakerTraps: [
      {
        wrong: 'By next year, I will finish my degree.',
        right: 'By next year, I will have finished my degree.',
        why: '"BY + tiempo futuro" exige Future Perfect porque indica que la acción habrá concluido antes de ese momento.'
      },
      {
        wrong: 'By the time you will get home, I will have cooked dinner.',
        right: 'By the time you get home, I will have cooked dinner.',
        why: 'En cláusulas temporales con "by the time" se usa Present Simple, NUNCA "will".'
      }
    ],
    examples: [
      {
        en: 'This time tomorrow, we will be flying over the Atlantic.',
        es: 'Mañana a estas horas estaremos volando sobre el Atlántico.',
        highlight: 'will be flying'
      },
      {
        en: 'Scientists believe they will have found an effective cure by 2035.',
        es: 'Los científicos creen que habrán encontrado una cura eficaz para 2035.',
        highlight: 'will have found ... by 2035'
      }
    ],
    keyTips: [
      'Regla de oro: Si ves "BY" + expresión de tiempo -> 99% de probabilidades de que sea Future Perfect (will have done).',
      'Si ves "THIS TIME NEXT..." (this time next week) -> Future Continuous (will be doing).'
    ]
  },

  // ==================== B2 (FIRST / VANTAGE) ====================
  {
    id: 'b2-wish-if-only',
    level: 'B2',
    title: 'Wish / If Only (Deseos en Presente, Arrepentimientos en Pasado y Quejas)',
    subtitle: 'El "paso atrás" hipotético: Wish + Past Simple, Wish + Past Perfect y Wish + Would',
    formula: 'Wish + Past Simple (deseo actual) | Wish + had + V3 (arrepentimiento pasado) | Wish + would (queja de actitud)',
    inPlainSpanish: 'El "¡Ojalá!" de toda la vida. Sirve para tres cosas claras: 1) Deseos sobre tu situación actual que te dan rabia: "¡Ojalá tuviera más pasta!" (verbo en pasado). 2) Arrepentimientos del pasado: "¡Ojalá no me hubiera gastado 100€ anoche!" (verbo con had). 3) Broncas porque alguien te está tocando las narices: "¡Ojalá te callaras un rato!" (con would).',
    spanishParallel: 'En español usamos el subjuntivo: "Ojalá tuviera", "Ojalá hubiera ido". Como en inglés no existe el subjuntivo, usan el truco de rebotar hacia el pasado: si el deseo es para hoy, ponen pasado simple ("I wish I had money"); si el lamento es de ayer, ponen past perfect ("I wish I had known"). Y con "If only", significa exactamente lo mismo que "I wish" pero con más drama.',
    mentalTrick: 'WISH nunca lleva presente. Queja sobre hoy -> Pasado (I wish I was/were rich). Arrepentimiento de ayer -> HAD (I wish I had studied). Manía molesta de otra persona -> WOULD (I wish you would listen).',
    streetExamples: [
      {
        situation: 'Es lunes por la mañana en la oficina y estás agobiado.',
        howYouSayItInSpanish: '¡Ojalá estuviera en la playa ahora mismo!',
        howEnglishBuildsIt: 'I wish I were at the beach right now. (o "If only I were...")',
        breakdown: 'Deseo sobre el presente: verbo en pasado (were).'
      },
      {
        situation: 'Tienes una resaca espantosa de salir de fiesta.',
        howYouSayItInSpanish: 'Ojalá no me hubiera bebido esas cuatro cervezas.',
        howEnglishBuildsIt: 'I wish I hadn\'t drunk those four beers.',
        breakdown: 'Lamento de algo que ya pasó anoche: HADN\'T + participio.'
      },
      {
        situation: 'Tu vecino pone el reggaetón a todo volumen a la 1 de la madrugada.',
        howYouSayItInSpanish: '¡Ojalá bajara la música de una vez!',
        howEnglishBuildsIt: 'I wish my neighbour would turn down the music!',
        breakdown: 'Queja sobre la actitud molesta de otra persona = WOULD.'
      }
    ],
    whenToUse: [
      'WISH + Past Simple: Deseo de que la realidad presente fuera diferente ("I wish I had a car" = no tengo coche ahora).',
      'WISH + Past Perfect (had done): Arrepentimiento sobre un hecho del pasado ("I wish I hadn\'t said that" = lo dije y me arrepiento).',
      'WISH + WOULD: Expresar molestia o queja sobre el comportamiento de OTRA persona que queremos que cambie ("I wish you would stop biting your nails").',
      '"IF ONLY" es idéntico a "I wish", pero con mayor carga emocional y enfática.'
    ],
    spanishSpeakerTraps: [
      {
        wrong: 'I wish I will pass the exam tomorrow.',
        right: 'I hope I pass / will pass the exam tomorrow.',
        why: 'Para deseos futuros posibles o alcanzables se usa "HOPE", NUNCA "wish".'
      },
      {
        wrong: 'I wish I would have more free time.',
        right: 'I wish I had more free time.',
        why: 'NUNCA uses "I wish I would" para ti mismo; "would" solo se usa para quejas sobre OTRAS personas.'
      }
    ],
    examples: [
      {
        en: 'If only I had followed your financial advice, I wouldn\'t be in debt now.',
        es: '¡Ojalá hubiera seguido tu consejo financiero! No estaría endeudado ahora.',
        highlight: 'If only I had followed'
      },
      {
        en: 'I wish it would stop raining so we could play football.',
        es: 'Ojalá parase de llover para que pudiéramos jugar al fútbol.',
        highlight: 'wish it would stop raining'
      }
    ],
    keyTips: [
      'Diferencia clave: HOPE = cosas que aún pueden ocurrir ("I hope you win"). WISH = cosas irreales o imposibles.',
      'En exámenes, "I regret not going" se transforma en "I wish I had gone".'
    ]
  },
  {
    id: 'b2-mixed-conditionals',
    level: 'B2',
    title: 'Mixed Conditionals (Mezcla de Pasado y Presente)',
    subtitle: 'Causa en el pasado con consecuencia en el presente, o condición permanente con resultado pasado',
    formula: 'Tipo A: If + had + V3, would + V(inf) | Tipo B: If + Past Simple, would have + V3',
    inPlainSpanish: 'Mezclar el pasado con el presente: una decisión o cagada que hiciste en el pasado que sigue teniendo consecuencias hoy mismo en tu vida. "Si hubiera ahorrado de joven, hoy tendría mi propio piso" o "Si no fuera tan tímido, ayer le habría pedido el número a esa chica".',
    spanishParallel: 'Es exactamente como pensamos los españoles cuando nos quejamos de nuestra vida actual por culpa de algo de antes: "Si hubiera estudiado informática [pasado], ahora ganaría un pastón [presente]". En inglés juntas el "had + participio" (del pasado) con el "would + verbo normal" (del presente). Solo tienes que buscar palabras chivatas como "now", "today" o "at the moment".',
    mentalTrick: 'Si la frase mezcla "ayer" con "hoy", es un condicional mixto: IF + HAD (lo que pasó antes) -> WOULD + VERBO NORMAL (cómo estás hoy por culpa de eso).',
    streetExamples: [
      {
        situation: 'No estudiaste inglés de chaval y ahora te cuesta encontrar un buen curro.',
        howYouSayItInSpanish: 'Si hubiera aprendido inglés de pequeño, hoy tendría un trabajo mejor.',
        howEnglishBuildsIt: 'If I had learned English as a kid, I would have a better job today.',
        breakdown: 'Acción pasada (had learned) -> consecuencia presente hoy (would have).'
      },
      {
        situation: 'Ayer te acostaste a las 4 de la mañana jugando a la Play y hoy en el curro pareces un zombi.',
        howYouSayItInSpanish: 'Si no me hubiera quedado despierto hasta tan tarde, no estaría tan cansado ahora.',
        howEnglishBuildsIt: 'If I hadn\'t stayed up so late, I wouldn\'t be so tired now.',
        breakdown: 'HADN\'T + participio (anoche) -> WOULDN\'T BE (ahora).'
      },
      {
        situation: 'Eres alérgico a los frutos secos (condición permanente) y por eso no comiste tarta ayer.',
        howYouSayItInSpanish: 'Si no fuera alérgico a las nueces, me habría comido la tarta ayer.',
        howEnglishBuildsIt: 'If I weren\'t allergic to nuts, I would have eaten the cake yesterday.',
        breakdown: 'Condición permanente (If I weren\'t) -> resultado en el pasado (would have eaten).'
      }
    ],
    whenToUse: [
      'TIPO A (El más frecuente): Algo que hiciste o no hiciste en el pasado influye directamente en tu situación PRESENTE ("If I hadn\'t missed the train, I would be at home now").',
      'TIPO B: Un rasgo permanente de tu personalidad o realidad presente condicionó un resultado en el PASADO ("If I spoke fluent German, I would have applied for that job last week").',
      'Fíjate siempre en marcadores temporales cruzados: "yesterday / last year" en una parte y "now / today" en la otra.'
    ],
    spanishSpeakerTraps: [
      {
        wrong: 'If I had studied harder, I would have been a doctor now.',
        right: 'If I had studied harder, I would be a doctor now.',
        why: 'Si la consecuencia es "NOW", no puedes poner "would have been"; debes poner "would be".'
      },
      {
        wrong: 'If I was not afraid of flying, I would travel with you yesterday.',
        right: 'If I wasn\'t / weren\'t afraid of flying, I would have travelled with you yesterday.',
        why: 'El viaje fue ayer ("yesterday"), por lo que la consecuencia requiere "would have + participio".'
      }
    ],
    examples: [
      {
        en: 'If she hadn\'t accepted the promotion in London, she wouldn\'t be living in the UK today.',
        es: 'Si no hubiera aceptado el ascenso en Londres, hoy no estaría viviendo en el Reino Unido.',
        highlight: 'hadn\'t accepted ... wouldn\'t be living'
      },
      {
        en: 'If I were better at managing money, I wouldn\'t have spent all my savings last summer.',
        es: 'Si fuera mejor gestionando el dinero, no habría gastado todos mis ahorros el verano pasado.',
        highlight: 'were better ... wouldn\'t have spent'
      }
    ],
    keyTips: [
      'Clave para exámenes de Cambridge: Busca la palabra "NOW" o "TODAY" al final de la frase de resultado.',
      'Si ves "had done" + "now", el hueco debe ser "would + infinitivo".'
    ]
  },
  {
    id: 'b2-modals-past-deduction',
    level: 'B2',
    title: 'Modales Perfectos en el Pasado (Must have, Can\'t have, Couldn\'t have, Might have, Should have)',
    subtitle: 'Deducciones lógicas retrospectivas y reproches de acciones pasadas',
    formula: 'must have + V3 (seguro que sí) | can\'t have + V3 (imposible) | might/could have (quizás) | should have (deberías haber)',
    inPlainSpanish: 'Hacer de detective sobre algo que ya ha pasado: 1) MUST HAVE = Seguro al 100% que fue así ("Fijo que se le ha olvidado la cita"). 2) CAN\'T HAVE = Imposible que fuera así ("Imposible que fuera él, si está de viaje en Roma"). 3) MIGHT / COULD HAVE = A lo mejor pasó ("Quizás se quedó sin batería"). 4) SHOULD HAVE = Deberías haberlo hecho (pero la cagaste y no lo hiciste).',
    spanishParallel: 'En español decimos: "Seguro que se ha dormido". En inglés NO dicen "sure that..."; usan el modal MUST HAVE: "He must have overslept". Y para decir que algo era imposible, NUNCA digas "mustn\'t have" ❌; tienes que decir CAN\'T HAVE: "He can\'t have stolen the money" (Imposible que robara él la pasta).',
    mentalTrick: 'MUST HAVE = Fijo que sí (certeza absoluta positiva). CAN\'T HAVE = Imposible que fuera así (certeza absoluta negativa). SHOULD HAVE = Deberías haberlo hecho (reproche).',
    streetExamples: [
      {
        situation: 'Llamas a tu colega tres veces y no contesta al WhatsApp a las 11 de la mañana de un domingo.',
        howYouSayItInSpanish: 'Seguro que se ha quedado dormido.',
        howEnglishBuildsIt: 'He must have fallen asleep.',
        breakdown: 'Deducción casi 100% segura = MUST HAVE.'
      },
      {
        situation: 'Te dicen que vieron a tu hermano en Barcelona ayer, pero estuvo comiendo contigo en Madrid.',
        howYouSayItInSpanish: '¡Imposible que fuera él!',
        howEnglishBuildsIt: 'It can\'t have been him!',
        breakdown: 'Imposibilidad total en el pasado = CAN\'T HAVE.'
      },
      {
        situation: 'Aparcas el coche en un vado y te lo retira la grúa.',
        howYouSayItInSpanish: 'Debería haber leído la señal de prohibido aparcar.',
        howEnglishBuildsIt: 'I should have read the parking sign.',
        breakdown: 'Reproche por no haber hecho lo correcto = SHOULD HAVE.'
      }
    ],
    whenToUse: [
      'MUST HAVE + V3: Certeza lógica del 95-99% de que algo ocurrió en el pasado según las pruebas.',
      'CAN\'T / COULDN\'T HAVE + V3: Certeza lógica de que era TOTALMENTE IMPOSIBLE que ocurriera.',
      'MIGHT / MAY / COULD HAVE + V3: Posibilidad incierta del pasado (tal vez ocurrió, tal vez no).',
      'SHOULD HAVE + V3: Crítica, consejo retrospectivo o arrepentimiento ("deberías haber hecho").'
    ],
    spanishSpeakerTraps: [
      {
        wrong: 'He mustn\'t have stolen the car; he was with me all night.',
        right: 'He can\'t / couldn\'t have stolen the car; he was with me all night.',
        why: 'Para imposibilidad en deducción pasada, está PROHIBIDO "mustn\'t have"; se usa SIEMPRE "can\'t have".'
      },
      {
        wrong: 'You should apologize yesterday.',
        right: 'You should have apologized yesterday.',
        why: 'Si la acción era ayer ("yesterday"), es obligatorio "should have + participio".'
      }
    ],
    examples: [
      {
        en: 'The ground is soaking wet; it must have poured down during the night.',
        es: 'El suelo está empapado; seguro que ha llovido a mares durante la noche.',
        highlight: 'must have poured down'
      },
      {
        en: 'She can\'t have received my message, otherwise she would have replied by now.',
        es: 'No puede haber recibido mi mensaje; de lo contrario ya habría contestado.',
        highlight: 'can\'t have received'
      }
    ],
    keyTips: [
      'Fórmula de examen: "I am certain he didn\'t do it" -> "He can\'t have done it".',
      '"I am sure she arrived" -> "She must have arrived".'
    ]
  },
  {
    id: 'b2-gerund-infinitive-meaning',
    level: 'B2',
    title: 'Gerund vs. Infinitive con Cambio de Significado (Stop, Remember, Forget, Regret, Try, Mean)',
    subtitle: 'La orientación temporal: memoria previa (-ing) frente a deber futuro (to + inf)',
    formula: 'Verb + -ing (mirando al pasado / experiencia previa) vs. Verb + to inf (mirando hacia adelante / tarea pendiente)',
    inPlainSpanish: 'Verbos tramposos que cambian totalmente de significado según si les pones detrás un verbo en "-ing" o con "to". 1) STOP: "Stop smoking" (dejar de fumar para siempre) vs "Stop to smoke" (parar lo que estabas haciendo para encenderte un cigarrillo). 2) REMEMBER: "Remember locking the door" (te acuerdas del recuerdo de haber cerrado con llave) vs "Remember to lock the door" (acordarte de cerrar la puerta antes de salir).',
    spanishParallel: 'En español usamos verbos distintos o preposiciones: "parar de fumar" vs "parar para fumar". En inglés solo cambian la terminación. Si el verbo lleva "-ING", estás mirando hacia atrás a un RECUERDO o a una experiencia en tu cabeza. Si lleva "TO", estás mirando hacia adelante al DEBER o a la obligación de hacer algo.',
    mentalTrick: '-ING = Miras al pasado (recuerdos o hábitos que dejas). TO = Miras al futuro (tareas que tienes que acordarte de hacer).',
    streetExamples: [
      {
        situation: 'Vas conduciendo por la carretera y necesitas parar en una gasolinera a tomar un café.',
        howYouSayItInSpanish: 'Paré a tomarme un café.',
        howEnglishBuildsIt: 'I stopped to drink a coffee.',
        breakdown: 'Paraste la marcha con el objetivo de tomar café = STOP TO.'
      },
      {
        situation: 'El médico te dice que tienes el colesterol alto y debes dejar de comer fritos.',
        howYouSayItInSpanish: 'He dejado de comer fritos.',
        howEnglishBuildsIt: 'I stopped eating fried food.',
        breakdown: 'Dejar un hábito por completo = STOP + -ING.'
      },
      {
        situation: 'Sales de casa y dudas de si apagaste el fuego de la cocina.',
        howYouSayItInSpanish: 'Recuerdo haber apagado el fuego antes de salir.',
        howEnglishBuildsIt: 'I remember turning off the stove.',
        breakdown: 'Tienes el recuerdo visual en tu cabeza = REMEMBER + -ING.'
      }
    ],
    whenToUse: [
      'REMEMBER / FORGET + -ing: Recordar u olvidar una experiencia o recuerdo del pasado ("I remember meeting her").',
      'REMEMBER / FORGET + to inf: Acordarse de cumplir una tarea u obligación pendiente ("Remember to buy milk").',
      'STOP + -ing: Dejar un hábito o cesar una actividad ("stop biting your nails").',
      'STOP + to inf: Interrumpir lo que estabas haciendo para empezar otra cosa ("stopped to check his phone").',
      'REGRET + -ing: Arrepentirse de algo hecho ("I regret saying that") vs REGRET + to inf: Lamentar dar una mala noticia ("We regret to inform you").',
      'TRY + -ing: Experimentar como solución a ver si funciona ("Try restarting your router") vs TRY + to inf: Hacer un gran esfuerzo físico o mental ("Try to lift this rock").'
    ],
    spanishSpeakerTraps: [
      {
        wrong: 'On my way home, I stopped smoking a cigarette.',
        right: 'On my way home, I stopped to smoke a cigarette.',
        why: 'Si dices "stopped smoking", significa que dejaste de ser fumador; para indicar que hiciste una pausa es "stopped to smoke".'
      },
      {
        wrong: 'Please remember turning off the lights before you leave.',
        right: 'Please remember to turn off the lights before you leave.',
        why: 'Es una tarea u obligación que debe hacerse en el futuro; requiere "to turn off".'
      }
    ],
    examples: [
      {
        en: 'I will never forget travelling to Japan for the first time.',
        es: 'Nunca olvidaré haber viajado a Japón por primera vez.',
        highlight: 'forget travelling'
      },
      {
        en: 'Don\'t forget to lock the back door before going to sleep.',
        es: 'No te olvides de cerrar con llave la puerta trasera antes de irte a dormir.',
        highlight: 'forget to lock'
      }
    ],
    keyTips: [
      'Regla nemotécnica: -ING mira hacia ATRÁS (recuerdos/pasado); TO INFINITIVE mira hacia DELANTE (planes/deberes).',
      'En exámenes, "I am sorry that I shouted" se transforma en "I regret shouting".'
    ]
  },

  // ==================== B2+ (CAMBRIDGE FIRST ADVANCED / TOWARDS C1) ====================
  {
    id: 'b2p-inversion-negative',
    level: 'B2+',
    title: 'Inversión con Adverbios Negativos y Restrictivos (Not only, Never, Hardly, Little, Only then)',
    subtitle: 'El orden de pregunta en oraciones enfáticas y formales',
    formula: 'Adverbio negativo/restrictivo + AUXILIAR (did / had / should / will) + SUJETO + Verbo principal',
    inPlainSpanish: 'El modo "película de Hollywood / dramático". Cuando quieres enfatizar muchísimo algo en inglés, pones una palabra negativa al principio de la frase (como "Jamás en mi vida...", "Bajo ningún concepto...", "Apenas había entrado cuando..."). Al poner esa palabra al principio, la frase se da la vuelta exactamente igual que si estuvieras haciendo una pregunta (metes el auxiliar delante de la persona).',
    spanishParallel: 'En español decimos: "Jamás había visto semejante locura". En inglés normal dirías: "I had never seen such madness". Pero si quieres sonar épico y sacar la máxima nota en el examen B2/C1, dices: "Never HAD I seen such madness". Fíjate cómo "had" salta delante de "I", como si estuvieras preguntando.',
    mentalTrick: 'Si la frase empieza con NEVER, HARDLY, RARELY, SELDOM, NOT ONLY o UNDER NO CIRCUMSTANCES, ¡el auxiliar (did / had / should) salta SIEMPRE delante de la persona!',
    streetExamples: [
      {
        situation: 'Pruebas la mejor hamburguesa de tu vida en un viaje.',
        howYouSayItInSpanish: '¡Jamás en mi vida había comido una hamburguesa tan buena!',
        howEnglishBuildsIt: 'Never in my life had I eaten such an incredible burger!',
        breakdown: 'Never al principio fuerza la inversión: had + I + eaten.'
      },
      {
        situation: 'Entras por la puerta de casa y justo en ese segundo se pone a diluviar.',
        howYouSayItInSpanish: 'Apenas había entrado en casa cuando empezó a llover.',
        howEnglishBuildsIt: 'Hardly had I arrived home when it started pouring down.',
        breakdown: 'Hardly + had + sujeto + when = apenas... cuando...'
      },
      {
        situation: 'En el trabajo un cliente te pide que hagas una chapuza ilegal.',
        howYouSayItInSpanish: 'Bajo ningún concepto debemos aceptar esta propuesta.',
        howEnglishBuildsIt: 'Under no circumstances should we accept this proposal.',
        breakdown: 'Under no circumstances + should + we + accept.'
      }
    ],
    whenToUse: [
      'En redacciones formales (essays, reports), discursos o para dar un énfasis dramático en exámenes de Cambridge.',
      'Palabras que provocan inversión: Never, Rarely, Seldom, Hardly... when, Scarcely... when, No sooner... than, Not only... but also, Under no circumstances, Little did he know.',
      'La inversión utiliza la estructura de una PREGUNTA: "Did I...", "Had we...", "Should you...".'
    ],
    spanishSpeakerTraps: [
      {
        wrong: 'Rarely we have seen such an outstanding performance.',
        right: 'Rarely have we seen such an outstanding performance.',
        why: 'Al empezar con "Rarely", es obligatorio invertir el auxiliar: "have we seen".'
      },
      {
        wrong: 'No sooner had I sat down when the doorbell rang.',
        right: 'No sooner had I sat down than the doorbell rang.',
        why: '"No sooner" se combina OBLIGATORIAMENTE con "THAN" (comparativo), mientras que "Hardly" se combina con "WHEN".'
      }
    ],
    examples: [
      {
        en: 'Not only did he arrive late, but he also forgot the key documents.',
        es: 'No solo llegó tarde, sino que además olvidó los documentos clave.',
        highlight: 'did he arrive'
      },
      {
        en: 'Little did they realize that their conversation was being recorded.',
        es: 'Poco se imaginaban que su conversación estaba siendo grabada.',
        highlight: 'Little did they realize'
      }
    ],
    keyTips: [
      'Parejas obligatorias de examen: HARDLY ... WHEN // NO SOONER ... THAN // NOT ONLY ... BUT ALSO.',
      'Si el verbo está en presente o pasado simple y no tiene auxiliar, INVENTA "do", "does" o "did": "Little DID they know".'
    ]
  },
  {
    id: 'b2p-impersonal-passive',
    level: 'B2+',
    title: 'Pasiva Impersonal y Personal (It is said that... / He is believed to have...)',
    subtitle: 'Verbos de opinión y creencia en noticias, informes y artículos académicos',
    formula: 'Estructura 1: It is said/believed/thought THAT + frase normal | Estructura 2: Sujeto + is said/believed + TO infinitive (o TO HAVE + V3)',
    inPlainSpanish: 'El lenguaje de las noticias y los rumores: "Se dice que...", "Se cree que...", "Está demostrado que...". En lugar de decir "La gente dice que el director va a dimitir", en nivel B2/C1 se dice "The director is said to be resigning" (El director es dicho que va a dimitir).',
    spanishParallel: 'En español usamos "se dice", "se rumorea" o "se sospecha". En inglés profesional de negocios o noticias cogen a la persona de la que se habla y la ponen de protagonista: "He is believed to have escaped" (Se cree que él se ha escapado). Si la acción es del pasado, meten "TO HAVE + participio".',
    mentalTrick: 'PERSONA + IS SAID / THOUGHT / BELIEVED + TO + INFINITIVO. Si ocurrió en el pasado, usa TO HAVE + participio ("He is suspected to have stolen the car").',
    streetExamples: [
      {
        situation: 'En la prensa deportiva dicen que un futbolista va a fichar por otro club.',
        howYouSayItInSpanish: 'Se dice que el jugador firmará con el nuevo equipo.',
        howEnglishBuildsIt: 'The player is reported to be signing with the new team.',
        breakdown: 'The player + is reported + to be signing.'
      },
      {
        situation: 'Se rumorea que el bar de la esquina va a cerrar por jubilación.',
        howYouSayItInSpanish: 'Se cree que el bar cerrará el mes que viene.',
        howEnglishBuildsIt: 'The bar is believed to be closing next month.',
        breakdown: 'The bar + is believed + to be closing.'
      },
      {
        situation: 'La policía sospecha que el ladrón huyó al extranjero hace dos días.',
        howYouSayItInSpanish: 'Se cree que el sospechoso ha huido a Francia.',
        howEnglishBuildsIt: 'The suspect is believed to have fled to France.',
        breakdown: 'Como la huida fue en el pasado: is believed + TO HAVE + participio (fled).'
      }
    ],
    whenToUse: [
      'Al reportar rumores, afirmaciones científicas o noticias formales con verbos como say, believe, report, know, consider, expect, claim, understand.',
      'La estructura personal ("He is said to...") es la preferida en exámenes de Cambridge (Use of English Part 4).',
      'Si el hecho reportado ocurrió ANTES que la creencia, usa infinitivo perfecto ("to have done").'
    ],
    spanishSpeakerTraps: [
      {
        wrong: 'People say he is living in London -> He is said that he lives in London.',
        right: 'He is said to be living in London. / It is said that he lives in London.',
        why: 'Si pones la persona como sujeto ("He"), debes usar infinitivo ("to be living"), NUNCA "that".'
      },
      {
        wrong: 'The suspect is believed to escape last night.',
        right: 'The suspect is believed to have escaped last night.',
        why: 'Como la fuga ocurrió en el pasado ("last night"), es obligatorio el infinitivo perfecto ("to have escaped").'
      }
    ],
    examples: [
      {
        en: 'The painting is considered to be a genuine Picasso masterpiece.',
        es: 'Se considera que el cuadro es una auténtica obra maestra de Picasso.',
        highlight: 'is considered to be'
      },
      {
        en: 'The company is expected to announce record profits next week.',
        es: 'Se espera que la empresa anuncie beneficios récord la próxima semana.',
        highlight: 'is expected to announce'
      }
    ],
    keyTips: [
      'Fórmula infalible de transformación Cambridge: "People believe that SHE stole the money" -> "She is believed TO HAVE STOLEN the money".',
      '"They expect that the prices will rise" -> "Prices are expected TO RISE".'
    ]
  },
  {
    id: 'b2p-unreal-past-rather-time',
    level: 'B2+',
    title: 'Unreal Past: Would Rather, It\'s High Time, As If / As Though',
    subtitle: 'El uso del pasado simple con significado de presente o deseo insatisfecho',
    formula: 'It\'s (high) time + Sujeto + Past Simple | Would rather + Sujeto + Past Simple | Would rather + V(inf sin to)',
    inPlainSpanish: 'Estructuras fijas para dos situaciones muy concretas de la vida: 1) "Ya va siendo hora de que..." (ej. "Ya es hora de que te busques un curro" o "Ya es hora de irnos a dormir"). 2) "Preferiría que tú..." (ej. "Preferiría que no fumases dentro de mi coche").',
    spanishParallel: 'En español decimos: "Ya es hora de que te vayas a casa". En inglés dicen "It\'s time you WENT home" (¡con el verbo en pasado simple aunque te estés refiriendo a ahora mismo!). Y para preferencias: si lo haces tú dices "I\'d rather stay" (sin to), pero si quieres que lo haga OTRA persona usas pasado: "I\'d rather you didn\'t come".',
    mentalTrick: 'IT\'S TIME + PERSONA -> ¡El verbo va SIEMPRE en Pasado Simple! "It\'s time we left" (ya es hora de irnos). I\'D RATHER + PERSONA -> También en Pasado Simple ("I\'d rather you paid today").',
    streetExamples: [
      {
        situation: 'Tu compañero de piso lleva 4 días con los platos sucios en el fregadero.',
        howYouSayItInSpanish: '¡Ya va siendo hora de que friegues los platos!',
        howEnglishBuildsIt: 'It\'s high time you washed the dishes!',
        breakdown: 'It\'s high time + persona + verbo en PASADO (washed).'
      },
      {
        situation: 'Un amigo te pide el coche pero sabes que conduce como un loco.',
        howYouSayItInSpanish: 'Preferiría que cogieras el autobús.',
        howEnglishBuildsIt: 'I\'d rather you took the bus.',
        breakdown: 'I\'d rather + persona distinta + verbo en PASADO (took).'
      },
      {
        situation: 'Son las 2 de la madrugada y mañana madrugáis para trabajar.',
        howYouSayItInSpanish: 'Ya es hora de que nos vayamos a dormir.',
        howEnglishBuildsIt: 'It\'s time we went to sleep.',
        breakdown: 'It\'s time + we + WENT (pasado).'
      }
    ],
    whenToUse: [
      'IT\'S (HIGH / ABOUT) TIME + Sujeto + Past Simple: Para expresar que algo ya debería haberse hecho y que estamos impacientes.',
      'WOULD RATHER + Sujeto + Past Simple: Para expresar una preferencia sobre las acciones de OTRA persona ("I\'d rather you didn\'t smoke here").',
      'WOULD RATHER + bare infinitive (sin sujeto): Para tus propias preferencias directas ("I\'d rather drink tea than coffee").',
      'AS IF / AS THOUGH + Past: Para describir una situación irreal ("He behaves as if he owned the place").'
    ],
    spanishSpeakerTraps: [
      {
        wrong: 'It is time we go home; it is getting dark.',
        right: 'It is time we went home; it is getting dark.',
        why: 'Después de "It\'s time + sujeto" es OBLIGATORIO usar Past Simple ("went"), nunca presente.'
      },
      {
        wrong: 'I would rather you to come tomorrow.',
        right: 'I would rather you came tomorrow.',
        why: '"Would rather" NUNCA lleva "to"; si hay otra persona, el verbo va en Past Simple ("came").'
      }
    ],
    examples: [
      {
        en: 'It\'s high time the government took decisive action against climate change.',
        es: 'Ya va siendo hora de que el gobierno tome medidas decisivas contra el cambio climático.',
        highlight: 'It\'s high time ... took'
      },
      {
        en: 'I would rather you didn\'t mention our conversation to Sarah.',
        es: 'Preferiría que no le mencionaras nuestra conversación a Sarah.',
        highlight: 'would rather you didn\'t mention'
      }
    ],
    keyTips: [
      'Si "It\'s time" no lleva sujeto, va con infinitivo con TO: "It is time TO GO home".',
      'Pero si lleva persona: "It is time WE WENT home".'
    ]
  },
  {
    id: 'b2p-cleft-participle',
    level: 'B2+',
    title: 'Cleft Sentences (Oraciones Hendidas) y Participle Clauses',
    subtitle: 'Énfasis absoluto mediante "What / It is..." y subordinación compacta con participios',
    formula: 'What + frase + is/was + lo enfatizado | It is/was + lo enfatizado + that/who... | V-ing / Having + V3 (cláusulas de participio)',
    inPlainSpanish: 'Dos trucos de nivel pro para sonar convincente y seguro: 1) Cleft Sentences (oraciones para poner el foco): en vez de decir "Me molesta su actitud", dices "Lo que realmente me molesta de él es su actitud" (What really annoys me is his attitude). 2) Participle Clauses: ahorrar palabras como en las noticias o en un correo formal: en vez de "Como no tenía pasta, me quedé en casa", dices "Al no tener pasta, me quedé en casa" (Not having any money, I stayed at home).',
    spanishParallel: 'En español usamos muchísimo "Lo que necesito es...", "Lo que me sorprende fue..." o "Fue Carlos quien rompió el cristal". En inglés empieza con WHAT... IS/WAS o IT WAS... THAT. Te hace sonar seguro, formal y adulto en reuniones o emails.',
    mentalTrick: 'Para enfatizar: arranca con WHAT... ("What I really need is a coffee"). Para unir dos frases elegantes: quita "because/when" y pon el verbo en -ING ("Feeling tired, I went to bed").',
    streetExamples: [
      {
        situation: 'En una reunión de curro dejas claro cuál es el verdadero problema.',
        howYouSayItInSpanish: 'Lo que realmente me preocupa es la fecha de entrega.',
        howEnglishBuildsIt: 'What really worries me is the project deadline.',
        breakdown: 'What + verbo + is + lo importante.'
      },
      {
        situation: 'Explicas por qué te quedaste dormido en el sofá.',
        howYouSayItInSpanish: 'Al estar tan cansado después del curro, me quedé dormido.',
        howEnglishBuildsIt: 'Feeling exhausted after work, I fell asleep on the sofa.',
        breakdown: 'Participle clause: "Feeling exhausted" sustituye a "Because I was feeling exhausted".'
      },
      {
        situation: 'Reconoces que lo único que quieres es un poco de sinceridad.',
        howYouSayItInSpanish: 'Todo lo que pido es un poco de honestidad.',
        howEnglishBuildsIt: 'All I ask for is a little bit of honesty.',
        breakdown: 'Estructura enfática elegante con ALL.'
      }
    ],
    whenToUse: [
      'Cleft Sentences con WHAT: "What surprised me most was his complete lack of manners".',
      'Cleft Sentences con IT: "It was my brother WHO called the emergency services" (enfatiza que fue él y no otra persona).',
      'Participle Clauses con -ING: Sustituyen a oraciones causales o temporales activas ("Having finished his dinner, he went out").',
      'Participle Clauses con Past Participle: Sustituyen a oraciones pasivas ("Shocked by the news, she couldn\'t speak").'
    ],
    spanishSpeakerTraps: [
      {
        wrong: 'The thing what surprised me was his answer.',
        right: 'What surprised me was his answer. / The thing that surprised me was his answer.',
        why: 'NUNCA digas "the thing what"; o usas "What" solo o usas "The thing that".'
      },
      {
        wrong: 'Walking down the street, a brick fell on his head.',
        right: 'While he was walking down the street, a brick fell on his head.',
        why: 'Cuidado con el sujeto colgante (dangling participle): el sujeto de la cláusula de participio DEBE ser el mismo que el de la oración principal.'
      }
    ],
    examples: [
      {
        en: 'What I loved most about living in Edinburgh was the historic atmosphere.',
        es: 'Lo que más me encantó de vivir en Edimburgo fue la atmósfera histórica.',
        highlight: 'What I loved most about ... was'
      },
      {
        en: 'Having lost all his money in the stock market, he had to start from scratch.',
        es: 'Habiendo perdido todo su dinero en bolsa, tuvo que empezar desde cero.',
        highlight: 'Having lost all his money'
      }
    ],
    keyTips: [
      'Transformación de examen: "I only want a quiet weekend" -> "All I want is a quiet weekend".',
      '"Having + participio" enfatiza que la primera acción terminó completamente antes que la segunda.'
    ]
  }
];
`;

const updatedContent = unitsCode + '\n' + exercisesPart;

console.log('Escribiendo archivo grammarData.ts con las 20 unidades actualizadas...');
fs.writeFileSync(grammarFilePath, updatedContent, 'utf8');
console.log('✅ grammarData.ts actualizado con éxito.');
