import { GrammarUnit, Exercise } from '../types';

export const GRAMMAR_UNITS: GrammarUnit[] = [
  // ==================== A2+ (A2 ADVANCED) ====================
  {
    id: 'a2p-past-tenses',
    level: 'A2+',
    title: 'Past Simple vs. Past Continuous (con when, while, as)',
    subtitle: 'Acciones que interrumpen frente a acciones en progreso en el pasado',
    formula: 'While + Past Continuous (was/were + -ing), Past Simple (V-ed / 2ª col)',
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
        en: 'The box Wasn\'t light enough for me to lift on my own.',
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
    subtitle: 'Convertir voz activa a pasiva sin fallar el tiempo del verbo To Be',
    formula: 'Object + BE (en el tiempo exacto de la frase original) + Past Participle (+ by Agent)',
    whenToUse: [
      'Cuando importa más la acción o quién la sufre que quién la realiza.',
      'Con verbos de dos objetos (give, send, offer, show, tell, pay, lend): el receptor humano suele ponerse como sujeto ("I was offered a job" en vez de "A job was offered to me").',
      'No pongas "by people", "by someone" o "by them" si no aporta información relevante.'
    ],
    spanishSpeakerTraps: [
      {
        wrong: 'Was gave a prize to Maria.',
        right: 'Maria was given a prize.',
        why: 'En inglés toda frase necesita sujeto, y la pasiva prefiere la persona como sujeto ("Maria was given...").'
      },
      {
        wrong: 'The bridge is been repaired right now.',
        right: 'The bridge is being repaired right now.',
        why: 'Para tiempos continuos (Present/Past Continuous), la pasiva usa "BEING" (is/was being + participio), mientras que para Perfect usa "BEEN" (has/had been + participio).'
      }
    ],
    examples: [
      {
        en: 'All flights have been cancelled due to the heavy fog.',
        es: 'Todos los vuelos han sido cancelados debido a la densa niebla.',
        highlight: 'have been cancelled'
      },
      {
        en: 'She was offered a promotion by the board of directors.',
        es: 'Le ofrecieron un ascenso (a ella) por parte de la junta directiva.',
        highlight: 'She was offered'
      }
    ],
    keyTips: [
      'Comprueba siempre el tiempo verbal: Active "is building" -> Passive "is being built"; Active "has built" -> Passive "has been built".'
    ]
  },
  {
    id: 'b1-reported-speech',
    level: 'B1',
    title: 'Reported Speech: Afirmaciones, Preguntas, Órdenes y Reporting Verbs',
    subtitle: 'El salto atrás de los tiempos y el orden sujeto + verbo en preguntas indirectas',
    formula: 'Statements: said (that) / told me (that) | Questions: asked if/whether + Subject + Verb (sin do/did)',
    whenToUse: [
      'Backshift (salto atrás): Present -> Past | Past Simple / Present Perfect -> Past Perfect (had + participio) | will -> would | can -> could.',
      'Preguntas indirectas (Reported Questions): Desaparece el auxiliar (do/does/did) y el orden vuelve a ser SUJETO + VERBO ("He asked me where I lived").',
      'Preguntas de Sí/No: Se introducen con IF o WHETHER ("She asked whether I had finished").'
    ],
    spanishSpeakerTraps: [
      {
        wrong: 'He said me that he was tired.',
        right: 'He told me that he was tired. / He said (that) he was tired.',
        why: '"Say" nunca lleva persona detrás sin "to" (say something / say to me); "Tell" exige persona detrás (tell somebody).'
      },
      {
        wrong: 'She asked me where did I work.',
        right: 'She asked me where I worked.',
        why: 'En Reported Questions ya no es una pregunta directa: nunca pongas did/do ni inviertas sujeto y verbo.'
      }
    ],
    examples: [
      {
        en: 'She asked me if I had seen her keys the day before.',
        es: 'Me preguntó si había visto sus llaves el día anterior.',
        highlight: 'asked me if I had seen'
      },
      {
        en: 'The doctor advised him not to smoke anymore.',
        es: 'El médico le aconsejó que no fumara más.',
        highlight: 'advised him not to smoke'
      }
    ],
    keyTips: [
      'Cambios de tiempo/lugar: today -> that day | yesterday -> the day before / the previous day | tomorrow -> the following day / the next day | here -> there.'
    ]
  },

  // ==================== B1+ (INTERMEDIATE ADVANCED) ====================
  {
    id: 'b1p-perfect-continuous',
    level: 'B1+',
    title: 'Present Perfect Continuous vs. Simple y Past Perfect Continuous',
    subtitle: 'Énfasis en la duración y el proceso frente al resultado completado',
    formula: 'have/has/had + been + V-ing',
    whenToUse: [
      'Present Perfect Continuous (have been doing): Enfatiza la DURACIÓN de una actividad que continúa o cuyos efectos son visibles ahora ("You\'re out of breath. Have you been running?").',
      'Present Perfect Simple (have done): Enfatiza el RESULTADO o la CANTIDAD completada ("I have read three chapters today").',
      'Past Perfect Continuous (had been doing): Acción en progreso durante un tiempo antes de otro momento del pasado ("We had been waiting for two hours when the bus finally came").'
    ],
    spanishSpeakerTraps: [
      {
        wrong: 'I have been knowing him for ten years.',
        right: 'I have known him for ten years.',
        why: 'Los verbos de estado (know, have=poseer, be, like, believe) no pueden ir en Present Perfect Continuous.'
      },
      {
        wrong: 'I have been writing five emails this morning.',
        right: 'I have written five emails this morning.',
        why: 'Cuando dices CUÁNTAS veces o qué cantidad has completado (five emails, three times), es obligatorio el Simple.'
      }
    ],
    examples: [
      {
        en: 'She has been studying English since morning, and she has learned fifty new words.',
        es: 'Lleva estudiando inglés desde la mañana (duración) y ha aprendido cincuenta palabras (cantidad).',
        highlight: 'has been studying ... has learned'
      },
      {
        en: 'The ground was wet because it had been raining all night.',
        es: 'El suelo estaba mojado porque había estado lloviendo toda la noche.',
        highlight: 'had been raining'
      }
    ],
    keyTips: [
      'Pista de examen: "How long...?" -> Continuous (salvo stative verbs). "How many / How much...?" -> Simple.'
    ]
  },
  {
    id: 'b1p-third-conditional',
    level: 'B1+',
    title: 'Third Conditional (El Pasado Irreal y Arrepentimientos)',
    subtitle: 'Hablar de cómo habrían cambiado las cosas en el pasado',
    formula: 'If + Past Perfect (had + participio), would / could / might + have + Past Participle',
    whenToUse: [
      'Se usa exclusivamente para situaciones del PASADO que no ocurrieron y son imposibles de cambiar.',
      'En vez de "would have", puedes usar "could have" (habría podido) o "might have" (quizá habría).'
    ],
    spanishSpeakerTraps: [
      {
        wrong: 'If I would have known, I would have told you.',
        right: 'If I had known, I would have told you.',
        why: 'Regla de oro del inglés: "If" y "would" jamás van juntos en la misma cláusula condicional.'
      },
      {
        wrong: 'If we had left earlier, we wouldn\'t miss the flight.',
        right: 'If we had left earlier, we wouldn\'t have missed the flight.',
        why: 'Si la consecuencia también ocurrió en el pasado (perder el vuelo ayer), debe llevar "wouldn\'t have + participio".'
      }
    ],
    examples: [
      {
        en: 'If you had backed up your files, you wouldn\'t have lost all your work.',
        es: 'Si hubieras hecho copia de seguridad de tus archivos, no habrías perdido todo tu trabajo.',
        highlight: 'If you had backed up ... wouldn\'t have lost'
      },
      {
        en: 'We might have won the match if the referee hadn\'t sent off our goalkeeper.',
        es: 'Podríamos haber ganado el partido si el árbitro no hubiera expulsado a nuestro portero.',
        highlight: 'might have won ... hadn\'t sent off'
      }
    ],
    keyTips: [
      'En Key Word Transformations, si ves una frase en pasado con "because" o "so", transfórmala a Third Conditional invirtiendo afirmativa/negativa.'
    ]
  },
  {
    id: 'b1p-causative-have-get',
    level: 'B1+',
    title: 'Causative: Have / Get Something Done',
    subtitle: 'Cuando encargas un servicio a un profesional o sufres algo inesperado',
    formula: 'Subject + HAVE / GET (en cualquier tiempo) + Object + Past Participle',
    whenToUse: [
      'Cuando tú no haces la acción con tus manos, sino que pagas o encargas a alguien que la haga por ti ("I had my car repaired" = llevé el coche a arreglar).',
      'También para experiencias desafortunadas ("He had his wallet stolen" = le robaron la cartera).',
      'Variante activa: "Make someone do something" (obligar, sin to) vs "Get someone to do something" (convencer, con to) vs "Let someone do something" (permitir, sin to).'
    ],
    spanishSpeakerTraps: [
      {
        wrong: 'I cut my hair yesterday at the hairdresser\'s.',
        right: 'I had / got my hair cut yesterday at the hairdresser\'s.',
        why: 'Decir "I cut my hair" significa que cogiste tú mismo las tijeras frente al espejo.'
      },
      {
        wrong: 'My boss made me to work late.',
        right: 'My boss made me work late. (Pero en pasiva: I was made TO work late).',
        why: '"Make + persona + verbo" en activa NO lleva "to", pero al pasarlo a pasiva ("be made to do") SÍ recupera el "to".'
      }
    ],
    examples: [
      {
        en: 'We are having our kitchen renovated next month.',
        es: 'Nos van a reformar la cocina el mes que viene.',
        highlight: 'are having our kitchen renovated'
      },
      {
        en: 'She got her technician to fix the laptop before the presentation.',
        es: 'Consiguió que su técnico arreglara el portátil antes de la presentación.',
        highlight: 'got her technician to fix'
      }
    ],
    keyTips: [
      'El orden es sagrado: HAVE + OBJETO + PARTICIPIO ("have the roof fixed", nunca "have fixed the roof" si es causativo).'
    ]
  },
  {
    id: 'b1p-future-continuous-perfect',
    level: 'B1+',
    title: 'Future Continuous vs. Future Perfect (Will be doing / Will have done)',
    subtitle: 'Estar haciendo algo en un momento futuro vs. haberlo terminado para una fecha límite',
    formula: 'Future Cont: will be + V-ing | Future Perfect: will have + Past Participle',
    whenToUse: [
      'FUTURE CONTINUOUS (will be doing): Acción que estará en pleno progreso en un momento específico del futuro ("This time tomorrow, I will be flying to Tokyo").',
      'FUTURE PERFECT (will have done): Acción que ya estará terminada ANTES de un momento futuro. Su palabra clave es "BY" ("By Friday", "By the time you arrive", "By 2030").'
    ],
    spanishSpeakerTraps: [
      {
        wrong: 'By the end of this year, I will save €5,000.',
        right: 'By the end of this year, I will have saved €5,000.',
        why: 'La preposición "By + fecha/momento" ("Para cuando llegue X") exige casi siempre Future Perfect (will have + participio).'
      }
    ],
    examples: [
      {
        en: 'Don\'t call me at 8 PM because I will be watching the final.',
        es: 'No me llames a las 8 porque estaré viendo la final.',
        highlight: 'will be watching'
      },
      {
        en: 'By the time you read this message, I will have already boarded the plane.',
        es: 'Para cuando leas este mensaje, ya habré embarcado en el avión.',
        highlight: 'will have already boarded'
      }
    ],
    keyTips: [
      'Truco infalible de examen: "This time tomorrow / At 5 PM tomorrow" -> will be + -ing. "By tomorrow / By the time..." -> will have + participio.'
    ]
  },

  // ==================== B2 (UPPER-INTERMEDIATE) ====================
  {
    id: 'b2-wish-if-only',
    level: 'B2',
    title: 'Wish / If Only (Deseos en Presente, Arrepentimientos en Pasado y Quejas)',
    subtitle: 'Las 3 estructuras de Wish que siempre caen en Key Word Transformation',
    formula: '1) Presente: wish + Past Simple | 2) Pasado: wish + Past Perfect | 3) Queja/Cambio: wish + would + V',
    whenToUse: [
      'WISH + PAST SIMPLE / WERE: Desear que algo del presente fuera diferente ("I wish I knew the answer", "I wish I were taller").',
      'WISH + PAST PERFECT (had + participio): Arrepentimiento sobre el pasado; equivale a "I regret doing / not doing" ("I wish I hadn\'t said that").',
      'WISH + WOULD + Infinitivo: Queja o molestia sobre el comportamiento de OTRA persona o cosa que quieres que cambie ("I wish you would stop interrupting me").'
    ],
    spanishSpeakerTraps: [
      {
        wrong: 'I wish I would have more free time.',
        right: 'I wish I had more free time.',
        why: 'Nunca puedes usar "wish + would" con el mismo sujeto (I wish I would ❌) ni con verbos de estado como have/be/know.'
      },
      {
        wrong: 'I wish I didn\'t buy this jacket last week.',
        right: 'I wish I hadn\'t bought this jacket last week.',
        why: 'Como "last week" es pasado, el arrepentimiento requiere obligatoriamente Past Perfect (hadn\'t bought).'
      }
    ],
    examples: [
      {
        en: 'If only I had listened to your advice before investing that money!',
        es: '¡Ojalá hubiera escuchado tu consejo antes de invertir ese dinero!',
        highlight: 'If only I had listened'
      },
      {
        en: 'I wish my neighbours wouldn\'t play loud music after midnight.',
        es: 'Ojalá mis vecinos dejaran de poner música alta después de medianoche.',
        highlight: 'wish my neighbours wouldn\'t play'
      }
    ],
    keyTips: [
      'En transformaciones: "I regret telling him" = "I wish I hadn\'t told him" = "If only I hadn\'t told him".'
    ]
  },
  {
    id: 'b2-mixed-conditionals',
    level: 'B2',
    title: 'Mixed Conditionals (Mezcla de Pasado y Presente)',
    subtitle: 'Pasado que afecta al presente (3º + 2º) y Presente que afectó al pasado (2º + 3º)',
    formula: 'Tipo A (Pasado->Hoy): If + Past Perfect, would + V (now) | Tipo B (Estado->Ayer): If + Past Simple, would have + PP',
    whenToUse: [
      'TIPO A (3º -> 2º, el más frecuente): Condición en el pasado con resultado en el PRESENTE ("If I had taken that job, I would live in New York now").',
      'TIPO B (2º -> 3º): Rasgo permanente o presente que influyó en algo del PASADO ("If I weren\'t afraid of heights, I would have gone skydiving with you yesterday").'
    ],
    spanishSpeakerTraps: [
      {
        wrong: 'If we hadn\'t missed the train, we would have been at the hotel right now.',
        right: 'If we hadn\'t missed the train, we would be at the hotel right now.',
        why: '"Right now" / "today" indica que el resultado es en el PRESENTE, por lo que usamos "would be" (2º), no "would have been" (3º).'
      }
    ],
    examples: [
      {
        en: 'If she had studied medicine, she would be a surgeon today.',
        es: 'Si hubiera estudiado medicina (pasado), hoy sería cirujana (presente).',
        highlight: 'If she had studied ... would be ... today'
      },
      {
        en: 'If he spoke German, they would have offered him the position last month.',
        es: 'Si él hablara alemán (en general), le habrían ofrecido el puesto el mes pasado.',
        highlight: 'If he spoke ... would have offered'
      }
    ],
    keyTips: [
      'Mira las pistas temporales de cada mitad de la frase: "yesterday/last year" pide Perfect; "now/today/currently" pide simple (would + infinitivo).'
    ]
  },
  {
    id: 'b2-modals-past-deduction',
    level: 'B2',
    title: 'Modales Perfectos en el Pasado (Must have, Can\'t have, May/Might have, Should have, Needn\'t have)',
    subtitle: 'Deducción lógica en el pasado, reproches y acciones innecesarias',
    formula: 'Modal + have + Past Participle',
    whenToUse: [
      'MUST HAVE + PP: Certeza casi total de que algo ocurrió ("He must have forgotten his phone").',
      'CAN\'T / COULDN\'T HAVE + PP: Certeza total de que es IMPOSIBLE que ocurriera ("She can\'t have stolen it; she was with me!"). ¡NUNCA uses mustn\'t have!',
      'MAY / MIGHT / COULD HAVE + PP: Posibilidad o duda sobre el pasado ("They might have got lost").',
      'SHOULD / OUGHT TO HAVE + PP: Crítica o arrepentimiento porque no se hizo lo correcto ("You should have warned me").',
      'NEEDN\'T HAVE + PP: Hiciste algo que no hacía falta hacer ≠ DIDN\'T NEED TO (no hacía falta y por tanto no lo hiciste).'
    ],
    spanishSpeakerTraps: [
      {
        wrong: 'It mustn\'t have been easy for her.',
        right: 'It can\'t have been easy for her.',
        why: 'El negativo de deducción de "must have" es SIEMPRE "can\'t have" o "couldn\'t have". "Mustn\'t have" no existe en inglés estándar.'
      },
      {
        wrong: 'You should told me the truth.',
        right: 'You should have told me the truth.',
        why: 'Nunca olvides el auxiliar "have" entre el modal y el participio.'
      }
    ],
    examples: [
      {
        en: 'You needn\'t have bought bread; we already had two loaves in the kitchen.',
        es: 'No hacía falta que compraras pan (pero lo compraste); ya teníamos dos barras.',
        highlight: 'needn\'t have bought'
      },
      {
        en: 'They can\'t have arrived yet; the traffic on the motorway is terrible.',
        es: 'No pueden haber llegado todavía; el tráfico en la autopista es terrible.',
        highlight: 'can\'t have arrived'
      }
    ],
    keyTips: [
      'En transformaciones: "I\'m sure he took it" -> "He MUST HAVE taken it". "I\'m sure she didn\'t see us" -> "She CAN\'T HAVE seen us". "Perhaps they left" -> "They MIGHT HAVE left".'
    ]
  },
  {
    id: 'b2-gerund-infinitive-meaning',
    level: 'B2',
    title: 'Gerund vs. Infinitive con Cambio de Significado (Stop, Remember, Forget, Regret, Try, Mean)',
    subtitle: 'Verbos que cambian totalmente de sentido según vayan seguidos de -ing o to + infinitivo',
    formula: 'remember/forget/regret + V-ing (acción pasada) vs. + to V (obligación pendiente)',
    whenToUse: [
      'REMEMBER / FORGET + -ING: Tener el recuerdo de algo que ya hiciste en el pasado ("I clearly remember locking the door").',
      'REMEMBER / FORGET + TO V: Acordarse o olvidarse de hacer una tarea ("Don\'t forget to lock the door").',
      'STOP + -ING: Dejar un hábito o actividad ("He stopped smoking"). STOP + TO V: Parar lo que hacías PARA hacer otra cosa ("He stopped to smoke a cigarette").',
      'TRY + -ING: Probar un método o experimento para ver si funciona ("Try restarting the router"). TRY + TO V: Hacer un esfuerzo difícil ("I tried to lift the box").',
      'REGRET + -ING: Arrepentirse de algo pasado ("I regret saying that"). REGRET + TO V: Anunciar malas noticias formalmente ("We regret to inform you...").',
      'MEAN + -ING: Implicar o suponer ("Taking this job means moving abroad"). MEAN + TO V: Tener la intención de ("I didn\'t mean to hurt your feelings").'
    ],
    spanishSpeakerTraps: [
      {
        wrong: 'I look forward to hear from you soon.',
        right: 'I look forward to hearing from you soon.',
        why: 'En "look forward to", "object to", "be committed to", "in addition to", la palabra "to" es una preposición y exige -ING.'
      }
    ],
    examples: [
      {
        en: 'On our way to the coast, we stopped to grab a coffee.',
        es: 'De camino a la costa, paramos para tomar un café.',
        highlight: 'stopped to grab'
      },
      {
        en: 'If you have trouble sleeping, try drinking herbal tea instead of coffee.',
        es: 'Si tienes problemas para dormir, prueba a beber infusión en vez de café.',
        highlight: 'try drinking'
      }
    ],
    keyTips: [
      'Otros verbos clave de B2 con -ING: avoid, deny, admit, suggest, recommend, mind, can\'t stand, can\'t help, it\'s no use, be worth.'
    ]
  },

  // ==================== B2+ (B2 ADVANCED / PRE-C1) ====================
  {
    id: 'b2p-inversion-negative',
    level: 'B2+',
    title: 'Inversión con Adverbios Negativos y Restrictivos (Not only, Never, Hardly, Little, Only then)',
    subtitle: 'Estructura estrella para brillar en B2 Advanced / C1 (Writings y Transformations)',
    formula: 'Negative Adverbial + Auxiliar (do/did/have/had/will/can/should) + Subject + Verb',
    whenToUse: [
      'Cuando colocamos una expresión negativa o restrictiva al principio de la frase para dar énfasis, invertimos el orden como si fuera una pregunta.',
      'NOT ONLY + Aux + S + V, but... also...: "Not only did he arrive late, but he also forgot the tickets."',
      'NEVER / SELDOM / RARELY / UNDER NO CIRCUMSTANCES: "Under no circumstances should you share your password."',
      'HARDLY / SCARCELY ... WHEN / NO SOONER ... THAN (con Past Perfect): "Hardly had I sat down when the phone rang" / "No sooner had I sat down than the phone rang".',
      'LITTLE did I/he/she know/realize: "Little did she know what was about to happen."',
      'ONLY AFTER / ONLY WHEN / ONLY BY / NOT UNTIL: ¡Ojo! Aquí la inversión ocurre en la SEGUNDA cláusula (la principal): "Only when the film ended DID I realize how late it was."'
    ],
    spanishSpeakerTraps: [
      {
        wrong: 'No sooner had we arrived when it started to pour.',
        right: 'No sooner had we arrived than it started to pour.',
        why: '"No sooner" es comparativo y siempre va con "THAN", mientras que "Hardly / Scarcely" van con "WHEN".'
      },
      {
        wrong: 'Only when did I arrive home I noticed my keys were missing.',
        right: 'Only when I arrived home did I notice my keys were missing.',
        why: 'Con "Only when / Only after / Not until", la cláusula subordinada va normal y la inversión se hace en la oración principal.'
      }
    ],
    examples: [
      {
        en: 'Rarely have I read such a compelling and thought-provoking article.',
        es: 'Rara vez he leído un artículo tan fascinante y que invite tanto a la reflexión.',
        highlight: 'Rarely have I read'
      },
      {
        en: 'No sooner had the company launched the product than it sold out completely.',
        es: 'Apenas había lanzado la empresa el producto cuando se agotó por completo.',
        highlight: 'No sooner had ... than'
      }
    ],
    keyTips: [
      'Meter 1 o 2 inversiones ("Not only does this affect...", "Rarely do we see...") en un Essay de B2/C1 dispara tu nota de gramática inmediatamente.'
    ]
  },
  {
    id: 'b2p-impersonal-passive',
    level: 'B2+',
    title: 'Pasiva Impersonal y Personal (It is said that... / He is believed to have...)',
    subtitle: 'Estructuras formales de reportaje con verbos de opinión (believe, think, report, claim, know)',
    formula: 'Sujeto + is/was believed + to V (presente/futuro) OR + to have + Past Participle (pasado)',
    whenToUse: [
      'Con verbos como think, believe, say, report, know, expect, allege, consider, rumour.',
      'Estructura 1 (Impersonal): "It is believed that the CEO resigned yesterday."',
      'Estructura 2 (Personal - la que piden en exámenes): Sujeto + be + participio + TO INFINITIVO.',
      '¡Cuidado con el tiempo del segundo verbo!: Si la acción ocurrió ANTES (en el pasado), usa el Infinitivo Perfecto: TO HAVE + PARTICIPIO ("The CEO is believed TO HAVE RESIGNED yesterday").'
    ],
    spanishSpeakerTraps: [
      {
        wrong: 'The suspect is thought that he escaped abroad.',
        right: 'The suspect is thought to have escaped abroad.',
        why: 'Si empiezas con la persona ("The suspect"), no puedes poner "that"; debes usar infinitivo ("to escape" o "to have escaped").'
      }
    ],
    examples: [
      {
        en: 'The ancient manuscript is thought to have been written in the 12th century.',
        es: 'Se cree que el antiguo manuscrito fue escrito en el siglo XII.',
        highlight: 'is thought to have been written'
      },
      {
        en: 'The prime minister is expected to announce new measures tonight.',
        es: 'Se espera que el primer ministro anuncie nuevas medidas esta noche.',
        highlight: 'is expected to announce'
      }
    ],
    keyTips: [
      'Resumen rápido para el segundo verbo: Presente/Futuro -> "to do" | En progreso ahora -> "to be doing" | Pasado -> "to have done" | Pasado en pasiva -> "to have been done".'
    ]
  },
  {
    id: 'b2p-unreal-past-rather-time',
    level: 'B2+',
    title: 'Unreal Past: Would Rather, It\'s (High) Time, As If / As Though',
    subtitle: 'Cuando usamos el pasado en inglés para hablar del presente o futuro',
    formula: 'would rather + Subject + Past Simple (presente) / Past Perfect (pasado) | It\'s high time + Subject + Past Simple',
    whenToUse: [
      'WOULD RATHER (mismo sujeto): Va con infinitivo sin "to" ("I\'d rather stay at home tonight").',
      'WOULD RATHER (DISTINTO sujeto): Va con PAST SIMPLE para presente/futuro ("I\'d rather you DIDN\'T tell anyone") y con PAST PERFECT para el pasado ("I\'d rather you HAD TOLD me yesterday").',
      'IT\'S TIME / IT\'S HIGH TIME / IT\'S ABOUT TIME + Sujeto + PAST SIMPLE: Para decir que ya va siendo hora de que alguien haga algo ahora mismo ("It\'s high time we left").',
      'AS IF / AS THOUGH + Past Simple / Past Perfect: Para comparaciones irreales ("He talks as if he knew everything").'
    ],
    spanishSpeakerTraps: [
      {
        wrong: 'I would rather you don\'t smoke in here.',
        right: 'I would rather you didn\'t smoke in here.',
        why: 'Cuando cambias de sujeto tras "would rather" (I\'d rather YOU...), el verbo va en Past Simple aunque hables de ahora mismo.'
      },
      {
        wrong: 'It\'s high time you find a job.',
        right: 'It\'s high time you found a job.',
        why: '"It\'s (high/about) time + sujeto" exige siempre Past Simple.'
      }
    ],
    examples: [
      {
        en: 'It is high time the local council invested in better public transport.',
        es: 'Ya va siendo hora de que el ayuntamiento invierta en un mejor transporte público.',
        highlight: 'It is high time ... invested'
      },
      {
        en: 'I\'d rather you hadn\'t mentioned the surprise party in front of Sarah.',
        es: 'Preferiría que no hubieras mencionado la fiesta sorpresa delante de Sarah.',
        highlight: 'I\'d rather you hadn\'t mentioned'
      }
    ],
    keyTips: [
      '"Would prefer" no funciona igual que "would rather": "I\'d prefer you not to go" vs "I\'d rather you didn\'t go".'
    ]
  },
  {
    id: 'b2p-cleft-participle',
    level: 'B2+',
    title: 'Cleft Sentences (Oraciones Hendidas) y Participle Clauses',
    subtitle: 'Estructuras de énfasis ("What I need is...", "It was... who...") y cláusulas reducidas',
    formula: 'What + Subject + Verb + is/was + (to) V / Clause | Having + Past Participle, Subject + Verb',
    whenToUse: [
      'WH- CLEFT ("What... is/was"): Enfatiza la acción o la cosa ("What really annoys me is people interrupting").',
      'IT- CLEFT ("It is/was X that/who..."): Enfatiza un elemento concreto ("It was my brother who broke the window, not me").',
      'ALL (that) + S + V + is/was: Significa "Lo único que..." ("All I want is a quiet weekend").',
      'PARTICIPLE CLAUSES: Sustituyen conectores de causa o tiempo cuando el sujeto es el mismo. "Having finished her degree, she moved abroad" (= After she had finished...). "Not knowing what to do, I called for help" (= Because I didn\'t know...).'
    ],
    spanishSpeakerTraps: [
      {
        wrong: 'What I like most about this city are the parks.',
        right: 'What I like most about this city is the parks. (Aunque con plurales a veces se tolera "are", "What + cláusula" suele concordar en singular).',
        why: 'Recuerda estructura completa: "What + sujeto + verbo + IS/WAS + foco". No olvides el verbo "is/was".'
      }
    ],
    examples: [
      {
        en: 'Having lived in Dublin for five years, she understood the local accent perfectly.',
        es: 'Al haber vivido en Dublín durante cinco años, entendía el acento local a la perfección.',
        highlight: 'Having lived'
      },
      {
        en: 'What made the biggest difference was the team\'s willingness to adapt.',
        es: 'Lo que marcó la mayor diferencia fue la disposición del equipo para adaptarse.',
        highlight: 'What made the biggest difference was'
      }
    ],
    keyTips: [
      '"Having + participio" enfatiza que la primera acción terminó completamente antes que la segunda.'
    ]
  }
];

export const CURATED_GRAMMAR_EXERCISES: Exercise[] = [
  // ==================== A2+ EXERCISES ====================
  {
    id: 'ex-a2p-1',
    level: 'A2+',
    category: 'grammar',
    topicId: 'a2p-past-tenses',
    topicLabel: 'Past Simple vs Continuous',
    type: 'cloze',
    prompt: 'While I ___ (walk) down the street yesterday, I bumped into an old school friend.',
    spanishHint: 'Mientras caminaba por la calle ayer, me topé con un viejo amigo del colegio.',
    acceptedAnswers: ['was walking'],
    explanation: 'La acción de caminar estaba en progreso ("telón de fondo") cuando ocurrió la acción corta que la interrumpió ("bumped into"), por lo que con "While" usamos Past Continuous (was walking).',
    grammarRule: 'While + Past Continuous (was/were + -ing), Past Simple'
  },
  {
    id: 'ex-a2p-2',
    level: 'A2+',
    category: 'grammar',
    topicId: 'a2p-past-tenses',
    topicLabel: 'Stative Verbs in the Past',
    type: 'error_correction',
    prompt: 'Corrige el error gramatical en la siguiente frase:',
    baseSentence: 'When he explained the problem, I was understanding everything immediately.',
    errorWord: 'was understanding',
    acceptedAnswers: [
      'When he explained the problem, I understood everything immediately.',
      'understood'
    ],
    explanation: '"Understand" es un verbo de estado (stative verb) y NUNCA puede ir en tiempos continuos (-ing). Debe ir en Past Simple: "understood".',
    grammarRule: 'Stative verbs (know, understand, believe, want, need) -> NO -ing'
  },
  {
    id: 'ex-a2p-3',
    level: 'A2+',
    category: 'grammar',
    topicId: 'a2p-present-perfect-particles',
    topicLabel: 'Present Perfect (for / since)',
    type: 'transformation',
    prompt: 'Completa la segunda frase para que signifique lo mismo usando la palabra clave (entre 2 y 5 palabras):',
    baseSentence: 'We moved to this neighbourhood five years ago.',
    keyWord: 'LIVED',
    spanishHint: 'Hemos vivido en este barrio durante cinco años -> We ___ this neighbourhood for five years.',
    acceptedAnswers: [
      'have lived in',
      'have been living in'
    ],
    explanation: 'Una acción que empezó hace 5 años ("five years ago" con Past Simple) y continúa hoy se expresa en inglés con Present Perfect ("have lived in") + FOR five years.',
    grammarRule: 'Past Simple + X ago = Present Perfect + for X'
  },
  {
    id: 'ex-a2p-4',
    level: 'A2+',
    category: 'grammar',
    topicId: 'a2p-present-perfect-particles',
    topicLabel: 'Still vs Yet',
    type: 'cloze',
    prompt: 'I sent the application last Monday, but they ___ haven\'t replied to me.',
    spanishHint: 'Envié la solicitud el lunes pasado, pero TODAVÍA no me han respondido.',
    options: ['still', 'yet', 'already', 'ever'],
    acceptedAnswers: ['still'],
    explanation: 'En oraciones negativas, "still" se coloca ANTES del auxiliar negativo ("they still haven\'t replied"), mientras que "yet" iría al final de la frase.',
    grammarRule: 'Subject + STILL + haven\'t/hasn\'t + Past Participle'
  },
  {
    id: 'ex-a2p-5',
    level: 'A2+',
    category: 'grammar',
    topicId: 'a2p-comparatives-modifiers',
    topicLabel: 'Too vs Enough',
    type: 'transformation',
    prompt: 'Transforma la frase usando la palabra clave en mayúsculas (2 a 5 palabras):',
    baseSentence: 'The water in the pool was too cold for the children to swim.',
    keyWord: 'ENOUGH',
    spanishHint: 'The water in the pool ___ for the children to swim.',
    acceptedAnswers: [
      'was not warm enough',
      'wasn\'t warm enough',
      'was not hot enough',
      'wasn\'t hot enough'
    ],
    explanation: '"Too + adjetivo" equivale a "not + adjetivo opuesto + enough". El adjetivo siempre va DELANTE de "enough" (warm enough).',
    grammarRule: 'too + adj = not + opposite adj + enough'
  },
  {
    id: 'ex-a2p-6',
    level: 'A2+',
    category: 'grammar',
    topicId: 'a2p-comparatives-modifiers',
    topicLabel: 'Comparative Modifiers',
    type: 'error_correction',
    prompt: 'Encuentra y corrige el error en esta comparación:',
    baseSentence: 'Living in the city centre is very more expensive than living in the suburbs.',
    errorWord: 'very more expensive',
    acceptedAnswers: [
      'Living in the city centre is much more expensive than living in the suburbs.',
      'Living in the city centre is far more expensive than living in the suburbs.',
      'much more expensive',
      'far more expensive'
    ],
    explanation: 'En inglés jamás se usa "very" delante de un comparativo. Para decir "mucho más caro" se usa "much more expensive", "far more expensive" o "a lot more expensive".',
    grammarRule: 'much / far / a lot + comparative (NUNCA very + comparative)'
  },
  {
    id: 'ex-a2p-7',
    level: 'A2+',
    category: 'grammar',
    topicId: 'a2p-modals-obligation',
    topicLabel: 'Modals of Obligation',
    type: 'transformation',
    prompt: 'Transforma la frase usando la palabra clave (2 a 5 palabras):',
    baseSentence: 'It isn\'t necessary for you to book a table in advance on Tuesdays.',
    keyWord: 'HAVE',
    spanishHint: 'You ___ book a table in advance on Tuesdays.',
    acceptedAnswers: [
      'do not have to',
      'don\'t have to'
    ],
    explanation: '"It isn\'t necessary for you to..." expresa ausencia de obligación, lo cual equivale a "You don\'t have to..." (nunca "mustn\'t", que significa prohibición).',
    grammarRule: 'It isn\'t necessary to V = don\'t have to V / needn\'t V'
  },
  {
    id: 'ex-a2p-8',
    level: 'A2+',
    category: 'grammar',
    topicId: 'a2p-modals-obligation',
    topicLabel: 'Had better / Advice',
    type: 'translation',
    prompt: 'Traduce al inglés usando la estructura "had better":',
    spanishHint: 'Más te vale no llegar tarde a la entrevista de mañana.',
    acceptedAnswers: [
      'You had better not be late for tomorrow\'s interview.',
      'You\'d better not be late for tomorrow\'s interview.',
      'You had better not arrive late to the interview tomorrow.',
      'You\'d better not be late for the interview tomorrow.'
    ],
    explanation: '"Más te vale (no) hacer algo" se expresa con "You had better (not) + infinitivo sin to": "You had better not be late".',
    grammarRule: 'had better (not) + bare infinitive (sin to)'
  },

  // ==================== B1 EXERCISES ====================
  {
    id: 'ex-b1-1',
    level: 'B1',
    category: 'grammar',
    topicId: 'b1-past-perfect-used-to',
    topicLabel: 'Be / Get used to + -ing',
    type: 'transformation',
    prompt: 'Completa la segunda frase para que signifique lo mismo usando la palabra clave:',
    baseSentence: 'Working night shifts is still strange and difficult for Lucas.',
    keyWord: 'GOT',
    spanishHint: 'Lucas still ___ working night shifts.',
    acceptedAnswers: [
      'has not got used to',
      'hasn\'t got used to',
      'has not gotten used to',
      'hasn\'t gotten used to'
    ],
    explanation: 'Acostumbrarse a algo es "get used to + -ing". Como sigue siendo extraño para él, usamos Present Perfect negativo: "hasn\'t got used to (+ working)".',
    grammarRule: 'get used to + V-ing / Noun'
  },
  {
    id: 'ex-b1-2',
    level: 'B1',
    category: 'grammar',
    topicId: 'b1-past-perfect-used-to',
    topicLabel: 'Used to vs Be used to',
    type: 'error_correction',
    prompt: 'Corrige el error muy común en esta frase:',
    baseSentence: 'When I moved to Norway, I wasn\'t used to live in such cold weather.',
    errorWord: 'to live',
    acceptedAnswers: [
      'When I moved to Norway, I wasn\'t used to living in such cold weather.',
      'wasn\'t used to living',
      'used to living'
    ],
    explanation: 'Con el verbo To Be delante ("wasn\'t used to"), significa "estar acostumbrado a" y la palabra "to" es una preposición, por lo que el verbo que sigue DEBE ir en gerundio (-ing): "living".',
    grammarRule: 'be/get used to + V-ing ≠ used to + infinitive'
  },
  {
    id: 'ex-b1-3',
    level: 'B1',
    category: 'grammar',
    topicId: 'b1-conditionals-1-2',
    topicLabel: 'Unless & Conditionals',
    type: 'transformation',
    prompt: 'Transforma la frase usando UNLESS (entre 2 y 5 palabras):',
    baseSentence: 'If you don\'t apologize to her immediately, she will never forgive you.',
    keyWord: 'UNLESS',
    spanishHint: 'She will never forgive you ___ her immediately.',
    acceptedAnswers: [
      'unless you apologize to',
      'unless you apologise to'
    ],
    explanation: '"Unless" significa "a menos que" (= if... not). Como "unless" ya incluye la negación, el verbo detrás va en afirmativa: "unless you apologize to".',
    grammarRule: 'If + negative verb = Unless + affirmative verb'
  },
  {
    id: 'ex-b1-4',
    level: 'B1',
    category: 'grammar',
    topicId: 'b1-conditionals-1-2',
    topicLabel: 'Second Conditional',
    type: 'transformation',
    prompt: 'Transforma la frase al 2º Condicional usando la palabra clave:',
    baseSentence: 'I don\'t have enough space in my flat, so I can\'t adopt a dog.',
    keyWord: 'WOULD',
    spanishHint: 'If I had enough space in my flat, ___ a dog.',
    acceptedAnswers: [
      'I would adopt',
      'I\'d adopt'
    ],
    explanation: 'Una realidad presente ("no tengo espacio, así que no puedo") se transforma en hipótesis con el 2º Condicional: If + Past Simple, would + infinitivo.',
    grammarRule: 'If + Past Simple, would + bare infinitive'
  },
  {
    id: 'ex-b1-5',
    level: 'B1',
    category: 'grammar',
    topicId: 'b1-passive-voice',
    topicLabel: 'Passive Voice (Two Objects)',
    type: 'transformation',
    prompt: 'Pasa a voz pasiva usando la palabra clave:',
    baseSentence: 'The company has offered Sarah a position in the Amsterdam office.',
    keyWord: 'BEEN',
    spanishHint: 'Sarah ___ a position in the Amsterdam office.',
    acceptedAnswers: [
      'has been offered'
    ],
    explanation: 'La frase original está en Present Perfect ("has offered"). En pasiva, con "Sarah" como sujeto, usamos Present Perfect pasivo: "has been offered".',
    grammarRule: 'Present Perfect Passive = have/has + been + Past Participle'
  },
  {
    id: 'ex-b1-6',
    level: 'B1',
    category: 'grammar',
    topicId: 'b1-reported-speech',
    topicLabel: 'Reported Questions',
    type: 'transformation',
    prompt: 'Pasa esta pregunta a Reported Speech usando la palabra clave:',
    baseSentence: '"Where did you park the car last night?" my sister asked me.',
    keyWord: 'HAD',
    spanishHint: 'My sister asked me where ___ the car the night before.',
    acceptedAnswers: [
      'I had parked'
    ],
    explanation: 'En preguntas indirectas (Reported Questions): 1) El Past Simple ("did you park") da un salto atrás a Past Perfect ("had parked"), y 2) desaparece la inversión de pregunta, quedando en orden afirmativo Sujeto + Verbo ("where I had parked").',
    grammarRule: 'asked + wh-word/if + Subject + Past Perfect (sin did)'
  },
  {
    id: 'ex-b1-7',
    level: 'B1',
    category: 'grammar',
    topicId: 'b1-reported-speech',
    topicLabel: 'Reporting Verbs',
    type: 'error_correction',
    prompt: 'Corrige los DOS errores típicos en esta frase de Reported Speech:',
    baseSentence: 'He told to me that he will call me the next day.',
    errorWord: 'told to me ... will',
    acceptedAnswers: [
      'He told me that he would call me the next day.',
      'told me that he would'
    ],
    explanation: '1) "Tell" nunca lleva "to" delante de la persona ("told me", no "told to me"). 2) Con el verbo introductorio en pasado ("told"), "will" pasa a "would".',
    grammarRule: 'tell + person (sin to) + that + would'
  },

  // ==================== B1+ EXERCISES ====================
  {
    id: 'ex-b1p-1',
    level: 'B1+',
    category: 'grammar',
    topicId: 'b1p-perfect-continuous',
    topicLabel: 'Present Perfect Simple vs Continuous',
    type: 'cloze',
    prompt: 'Your eyes are red! How long ___ (you / stare) at that computer screen?',
    spanishHint: '¡Tienes los ojos rojos! ¿Cuánto tiempo llevas mirando esa pantalla de ordenador?',
    acceptedAnswers: [
      'have you been staring'
    ],
    explanation: 'Preguntamos por la duración ("How long...?") de una actividad continua que acaba de producir un efecto visible en el presente ("Your eyes are red"), por lo que usamos Present Perfect Continuous.',
    grammarRule: 'How long + have/has + Subject + been + V-ing?'
  },
  {
    id: 'ex-b1p-2',
    level: 'B1+',
    category: 'grammar',
    topicId: 'b1p-third-conditional',
    topicLabel: 'Third Conditional',
    type: 'transformation',
    prompt: 'Transforma la frase al Third Conditional usando la palabra clave (2 a 5 palabras):',
    baseSentence: 'We didn\'t check the weather forecast, so we got caught in the storm.',
    keyWord: 'CHECKED',
    spanishHint: 'If we ___ the weather forecast, we wouldn\'t have got caught in the storm.',
    acceptedAnswers: [
      'had checked',
      '\'d checked'
    ],
    explanation: 'Como todo ocurrió en el pasado ("didn\'t check"), usamos el 3º Condicional: If + Past Perfect ("had checked"), would have + participio.',
    grammarRule: 'If + had + Past Participle, would(n\'t) have + Past Participle'
  },
  {
    id: 'ex-b1p-3',
    level: 'B1+',
    category: 'grammar',
    topicId: 'b1p-third-conditional',
    topicLabel: 'Third Conditional Error',
    type: 'error_correction',
    prompt: 'Corrige el error gramatical en este condicional:',
    baseSentence: 'If you would have told me about the problem earlier, I could have helped you.',
    errorWord: 'would have told',
    acceptedAnswers: [
      'If you had told me about the problem earlier, I could have helped you.',
      'had told'
    ],
    explanation: 'Jamás se pone "would have" dentro de la cláusula del "If". Después de "If" en el 3º condicional va SIEMPRE Past Perfect: "If you had told me".',
    grammarRule: 'If + HAD + participio (NUNCA If + would have)'
  },
  {
    id: 'ex-b1p-4',
    level: 'B1+',
    category: 'grammar',
    topicId: 'b1p-causative-have-get',
    topicLabel: 'Causative Have/Get',
    type: 'transformation',
    prompt: 'Transforma la frase usando la estructura causativa con la palabra clave:',
    baseSentence: 'A professional photographer is going to take our wedding photos.',
    keyWord: 'TAKEN',
    spanishHint: 'We are going to ___ by a professional photographer.',
    acceptedAnswers: [
      'have our wedding photos taken',
      'get our wedding photos taken'
    ],
    explanation: 'Cuando encargamos un servicio a un profesional usamos la estructura Causative: HAVE / GET + Objeto (our wedding photos) + Participio (taken).',
    grammarRule: 'have / get + something + Past Participle'
  },
  {
    id: 'ex-b1p-5',
    level: 'B1+',
    category: 'grammar',
    topicId: 'b1p-causative-have-get',
    topicLabel: 'Make / Let in Passive',
    type: 'transformation',
    prompt: 'Transforma a voz pasiva prestando atención al infinitivo:',
    baseSentence: 'The customs officer made us open all our suitcases.',
    keyWord: 'MADE',
    spanishHint: 'We ___ all our suitcases by the customs officer.',
    acceptedAnswers: [
      'were made to open'
    ],
    explanation: 'Aunque "make someone do something" no lleva "to" en voz activa, al pasarlo a voz pasiva ("be made TO do something") es obligatorio añadir "to".',
    grammarRule: 'Active: make sb do -> Passive: be made TO do'
  },
  {
    id: 'ex-b1p-6',
    level: 'B1+',
    category: 'grammar',
    topicId: 'b1p-future-continuous-perfect',
    topicLabel: 'Future Perfect vs Continuous',
    type: 'cloze',
    prompt: 'By the time we retire, we ___ (pay) off our mortgage completely.',
    spanishHint: 'Para cuando nos jubilemos, habremos terminado de pagar nuestra hipoteca por completo.',
    acceptedAnswers: [
      'will have paid',
      '\'ll have paid'
    ],
    explanation: '"By the time + Present Simple" indica una fecha límite en el futuro antes de la cual la acción ya estará completada -> Future Perfect (will have + participio).',
    grammarRule: 'By the time + Present, Future Perfect (will have + Past Participle)'
  },

  // ==================== B2 EXERCISES ====================
  {
    id: 'ex-b2-1',
    level: 'B2',
    category: 'grammar',
    topicId: 'b2-wish-if-only',
    topicLabel: 'Wish / Regret in the Past',
    type: 'transformation',
    prompt: 'Completa la segunda frase para que signifique lo mismo usando WISH (2 a 5 palabras):',
    baseSentence: 'I regret accepting that job offer without reading the contract carefully.',
    keyWord: 'WISH',
    spanishHint: 'I ___ that job offer without reading the contract carefully.',
    acceptedAnswers: [
      'wish I had not accepted',
      'wish I hadn\'t accepted'
    ],
    explanation: '"I regret doing something" expresa arrepentimiento sobre una acción pasada, por lo que con "wish" debemos usar Past Perfect negativo: "I wish I hadn\'t accepted".',
    grammarRule: 'regret + V-ing = wish + Subject + hadn\'t + Past Participle'
  },
  {
    id: 'ex-b2-2',
    level: 'B2',
    category: 'grammar',
    topicId: 'b2-wish-if-only',
    topicLabel: 'Wish + Would (Annoyance)',
    type: 'transformation',
    prompt: 'Transforma esta queja usando la palabra clave:',
    baseSentence: 'It really annoys me that you always leave wet towels on the floor!',
    keyWord: 'WISH',
    spanishHint: 'I ___ wet towels on the floor!',
    acceptedAnswers: [
      'wish you would not leave',
      'wish you wouldn\'t leave',
      'wish you would stop leaving'
    ],
    explanation: 'Para quejarse de un hábito molesto de otra persona y pedir que cambie, se usa "wish + sujeto distinto + would / wouldn\'t + infinitivo".',
    grammarRule: 'wish + somebody else + would(n\'t) + bare infinitive'
  },
  {
    id: 'ex-b2-3',
    level: 'B2',
    category: 'grammar',
    topicId: 'b2-mixed-conditionals',
    topicLabel: 'Mixed Conditionals',
    type: 'transformation',
    prompt: 'Transforma usando un Condicional Mixto con la palabra clave:',
    baseSentence: 'I didn\'t sleep well last night, so I am exhausted right now.',
    keyWord: 'WOULD',
    spanishHint: 'If I had slept well last night, I ___ right now.',
    acceptedAnswers: [
      'would not be exhausted',
      'wouldn\'t be exhausted'
    ],
    explanation: 'La causa está en el pasado ("last night" -> If I had slept well), pero la consecuencia está en el PRESENTE ("right now"), por lo que la segunda parte usa 2º Condicional: "wouldn\'t be exhausted".',
    grammarRule: 'Mixed (Past -> Now): If + Past Perfect, would(n\'t) + infinitive (now)'
  },
  {
    id: 'ex-b2-4',
    level: 'B2',
    category: 'grammar',
    topicId: 'b2-modals-past-deduction',
    topicLabel: 'Past Modals of Deduction',
    type: 'transformation',
    prompt: 'Transforma usando un modal de deducción en pasado:',
    baseSentence: 'I am completely sure that Elena didn\'t write this anonymous message.',
    keyWord: 'HAVE',
    spanishHint: 'Elena ___ this anonymous message.',
    acceptedAnswers: [
      'cannot have written',
      'can\'t have written',
      'couldn\'t have written'
    ],
    explanation: 'Cuando estamos 100% seguros de que algo NO ocurrió en el pasado ("I\'m sure she didn\'t..."), usamos "can\'t have + participio" (¡nunca "mustn\'t have"!).',
    grammarRule: 'I\'m sure X didn\'t happen = X can\'t / couldn\'t have + Past Participle'
  },
  {
    id: 'ex-b2-5',
    level: 'B2',
    category: 'grammar',
    topicId: 'b2-modals-past-deduction',
    topicLabel: 'Needn\'t have done',
    type: 'transformation',
    prompt: 'Transforma usando la palabra clave:',
    baseSentence: 'We watered the garden this morning, which was a waste of time because it rained heavily an hour later.',
    keyWord: 'NEED',
    spanishHint: 'We ___ the garden this morning because it rained heavily an hour later.',
    acceptedAnswers: [
      'need not have watered',
      'needn\'t have watered'
    ],
    explanation: 'Cuando hicimos una acción en el pasado que resultó ser innecesaria ("was a waste of time"), usamos "needn\'t have + participio".',
    grammarRule: 'did something unnecessary = needn\'t have + Past Participle'
  },
  {
    id: 'ex-b2-6',
    level: 'B2',
    category: 'grammar',
    topicId: 'b2-gerund-infinitive-meaning',
    topicLabel: 'Gerund vs Infinitive',
    type: 'cloze',
    prompt: 'I clearly remember ___ (hand) the report to your secretary on Friday morning.',
    spanishHint: 'Recuerdo claramente haberle entregado el informe a tu secretaria el viernes por la mañana.',
    acceptedAnswers: [
      'handing'
    ],
    explanation: '"Remember + -ing" significa tener el recuerdo mental de una acción que ya ocurrió en el pasado. ("Remember to hand" significaría acordarse de la obligación antes de hacerlo).',
    grammarRule: 'remember + V-ing (recuerdo del pasado) vs remember + to V (tarea pendiente)'
  },

  // ==================== B2+ EXERCISES ====================
  {
    id: 'ex-b2p-1',
    level: 'B2+',
    category: 'grammar',
    topicId: 'b2p-inversion-negative',
    topicLabel: 'Negative Inversion (No sooner)',
    type: 'transformation',
    prompt: 'Reescribe usando inversión formal con la palabra clave:',
    baseSentence: 'As soon as we had stepped out of the building, the fire alarm went off.',
    keyWord: 'SOONER',
    spanishHint: 'No ___ out of the building than the fire alarm went off.',
    acceptedAnswers: [
      'sooner had we stepped'
    ],
    explanation: 'La estructura de inversión "No sooner + had + Sujeto + Participio ... than ..." requiere invertir el auxiliar "had" y el sujeto "we": "No sooner had we stepped...".',
    grammarRule: 'No sooner + had + Subject + Past Participle ... than ...'
  },
  {
    id: 'ex-b2p-2',
    level: 'B2+',
    category: 'grammar',
    topicId: 'b2p-inversion-negative',
    topicLabel: 'Negative Inversion (Not only)',
    type: 'transformation',
    prompt: 'Transforma usando inversión con la palabra clave:',
    baseSentence: 'She speaks fluent Japanese and she also writes it perfectly.',
    keyWord: 'ONLY',
    spanishHint: 'Not ___ fluent Japanese, but she also writes it perfectly.',
    acceptedAnswers: [
      'only does she speak'
    ],
    explanation: 'Al empezar con "Not only", debemos invertir sujeto y verbo usando el auxiliar correspondiente al Present Simple ("speaks" -> "does she speak").',
    grammarRule: 'Not only + do/does/did + Subject + bare infinitive'
  },
  {
    id: 'ex-b2p-3',
    level: 'B2+',
    category: 'grammar',
    topicId: 'b2p-inversion-negative',
    topicLabel: 'Inversion with Only when',
    type: 'error_correction',
    prompt: 'Corrige la posición de la inversión en esta frase de nivel B2+:',
    baseSentence: 'Only when did the manager resign the company started to recover.',
    errorWord: 'did the manager resign the company started',
    acceptedAnswers: [
      'Only when the manager resigned did the company start to recover.',
      'Only when the manager resigned did the company start'
    ],
    explanation: 'Con "Only when / Only after / Not until", la primera cláusula va en orden normal ("Only when the manager resigned") y la inversión se realiza en la cláusula principal ("did the company start").',
    grammarRule: 'Only when + Subject + Verb (normal) + Aux + Subject + Verb (inversión)'
  },
  {
    id: 'ex-b2p-4',
    level: 'B2+',
    category: 'grammar',
    topicId: 'b2p-impersonal-passive',
    topicLabel: 'Personal Passive (To have done)',
    type: 'transformation',
    prompt: 'Transforma a pasiva personal de reportaje usando la palabra clave:',
    baseSentence: 'Journalists report that the hacker stole over two million passwords last month.',
    keyWord: 'REPORTED',
    spanishHint: 'The hacker ___ over two million passwords last month.',
    acceptedAnswers: [
      'is reported to have stolen'
    ],
    explanation: 'El verbo de opinión está en presente ("report" -> "is reported"), pero el robo ocurrió en el pasado ("stole last month"), por lo que usamos el infinitivo perfecto: "to have stolen".',
    grammarRule: 'Subject + is/are reported/believed + to have + Past Participle'
  },
  {
    id: 'ex-b2p-5',
    level: 'B2+',
    category: 'grammar',
    topicId: 'b2p-unreal-past-rather-time',
    topicLabel: 'Would rather (Different Subject)',
    type: 'transformation',
    prompt: 'Transforma usando WOULD RATHER (2 a 5 palabras):',
    baseSentence: 'I would prefer you not to mention this issue during tonight\'s dinner.',
    keyWord: 'RATHER',
    spanishHint: 'I would ___ this issue during tonight\'s dinner.',
    acceptedAnswers: [
      'rather you did not mention',
      'rather you didn\'t mention'
    ],
    explanation: 'Cuando "would rather" va seguido de otra persona ("you") para hablar del presente o futuro, el verbo va en Past Simple ("didn\'t mention").',
    grammarRule: 'would rather + somebody else + Past Simple (didn\'t + V)'
  },
  {
    id: 'ex-b2p-6',
    level: 'B2+',
    category: 'grammar',
    topicId: 'b2p-unreal-past-rather-time',
    topicLabel: 'It\'s high time',
    type: 'transformation',
    prompt: 'Transforma usando la estructura de Unreal Past con la palabra clave:',
    baseSentence: 'We really ought to start taking climate change seriously right now.',
    keyWord: 'HIGH',
    spanishHint: 'It is ___ taking climate change seriously.',
    acceptedAnswers: [
      'high time we started'
    ],
    explanation: 'Después de "It is (high / about) time + Sujeto", el verbo va obligatoriamente en Past Simple ("we started"), aunque nos refiramos al momento actual.',
    grammarRule: 'It is high time + Subject + Past Simple'
  },
  {
    id: 'ex-b2p-7',
    level: 'B2+',
    category: 'grammar',
    topicId: 'b2p-cleft-participle',
    topicLabel: 'Participle Clauses',
    type: 'transformation',
    prompt: 'Reduce la cláusula usando un participio perfecto con la palabra clave:',
    baseSentence: 'After she had completed her master\'s degree, she applied for a PhD abroad.',
    keyWord: 'HAVING',
    spanishHint: '___ her master\'s degree, she applied for a PhD abroad.',
    acceptedAnswers: [
      'Having completed'
    ],
    explanation: 'Cuando dos acciones tienen el mismo sujeto y una ocurrió claramente antes que la otra, podemos sustituir "After she had completed" por la Participle Clause "Having completed".',
    grammarRule: 'Having + Past Participle (= After/Because + Past Perfect)'
  },
  {
    id: 'ex-b2p-8',
    level: 'B2+',
    category: 'grammar',
    topicId: 'b2p-cleft-participle',
    topicLabel: 'Cleft Sentences (Emphasis)',
    type: 'translation',
    prompt: 'Traduce al inglés usando una Cleft Sentence que empiece por "What...":',
    spanishHint: 'Lo que más me preocupa es la falta de transparencia.',
    acceptedAnswers: [
      'What worries me most is the lack of transparency.',
      'What worries me the most is the lack of transparency.',
      'What concerns me most is the lack of transparency.'
    ],
    explanation: 'Las Cleft Sentences con "What" sirven para enfatizar en nivel B2+: "What + cláusula + IS/WAS + elemento enfatizado".',
    grammarRule: 'What + Subject/Verb + is/was + Noun/Clause'
  }
];
