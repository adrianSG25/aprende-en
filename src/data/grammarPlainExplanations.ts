import { StreetExample } from '../types';

export interface PlainGrammarExplanation {
  inPlainSpanish: string;
  spanishParallel: string;
  mentalTrick: string;
  streetExamples: StreetExample[];
}

export const GRAMMAR_PLAIN_EXPLANATIONS: Record<string, PlainGrammarExplanation> = {
  // ==================== 1. PAST SIMPLE VS PAST CONTINUOUS ====================
  'a2p-past-tenses': {
    inPlainSpanish:
      "Imagina que estás haciendo algo que dura un rato (ducharte, cocinar, conducir o ver una serie), y de repente ¡ZAS! pasa algo puntual que te corta el rollo (suena el timbre, se va la luz o pinchas una rueda). La acción larga y continua lleva '-ing' (was/were doing). El hachazo rápido que te interrumpe va en pasado normal seco (knocked, rang, started).",
    spanishParallel:
      "En español decimos exactamente igual: 'Me estaba duchando cuando sonó el timbre'. En inglés es idéntico: 'I was having a shower when the doorbell rang'. El fallo que cometen los españoles es meter dos pasados secos seguidos ('While I walked home, it started to rain' ❌) o meter en continuo verbos de la mente como saber o entender ('I was knowing' ❌ en vez de 'I knew' ✅).",
    mentalTrick:
      "La regla del 'Vídeo y la Foto': la acción larga que dura un rato es un VÍDEO (lleva -ing: was cooking). Lo que te interrumpe de golpe es una FOTO fija (pasado simple: the phone rang).",
    streetExamples: [
      {
        situation: "Estás en la ducha y de repente llaman al timbre.",
        howYouSayItInSpanish: "Me estaba duchando cuando sonó el timbre.",
        howEnglishBuildsIt: "I was having a shower when the doorbell rang.",
        breakdown: "Ducharse dura minutos (was having = continuo). El timbre es un segundo puntual (rang = pasado simple)."
      },
      {
        situation: "Vas conduciendo al trabajo tranquilamente y pinchas una rueda.",
        howYouSayItInSpanish: "Iba conduciendo al curro cuando pinché una rueda.",
        howEnglishBuildsIt: "I was driving to work when I got a flat tyre.",
        breakdown: "Conducir era el trayecto largo (was driving). El pinchazo ocurrió en un instante (got)."
      },
      {
        situation: "Cocinando la cena te quemas el dedo con la sartén.",
        howYouSayItInSpanish: "Me quemé la mano mientras estaba cocinando la cena.",
        howEnglishBuildsIt: "I burned my hand while I was cooking dinner.",
        breakdown: "Con 'while' (mientras) siempre viene la acción larga con -ing (was cooking)."
      }
    ]
  },

  // ==================== 2. PRESENT PERFECT CON JUST, ALREADY, YET, STILL, FOR, SINCE ====================
  'a2p-present-perfect-particles': {
    inPlainSpanish:
      "Sirve para tres cosas: cosas que acabas de hacer hace dos minutos, cosas que ya has hecho antes de tiempo, o cosas que todavía tienes pendientes. El gran choque para los españoles es que nosotros decimos 'Llevo 3 años viviendo aquí' (en presente), pero en inglés NO pueden usar presente: dicen literalmente 'He vivido aquí durante 3 años' (I have lived here for 3 years) porque la acción sigue viva hoy.",
    spanishParallel:
      "En español decimos: '¿Has comido ya?' o 'Todavía no me ha contestado'. En inglés usan piezas fijas: JUST = 'Acabo de' (I have just arrived). ALREADY = 'Ya lo he hecho' (I have already done it). YET = 'Todavía no' o '¿Ya?' (va SIEMPRE al final de la frase: Not yet / Has he arrived yet?). Y el error que más suspensos cuesta: decir 'since 3 years' ❌ en vez de 'for 3 years' ✅.",
    mentalTrick:
      "JUST = Acabo de (en mitad). ALREADY = Ya (en mitad). YET = Al final siempre (en preguntas o negativas). FOR = Número de días/años (for 3 months). SINCE = Fecha fija de partida (since 2021).",
    streetExamples: [
      {
        situation: "Te ofrecen comida pero te acabas de zampar un bocata.",
        howYouSayItInSpanish: "No gracias, acabo de comer.",
        howEnglishBuildsIt: "No thanks, I have just eaten.",
        breakdown: "HAVE JUST + participio = acabo de hacerlo hace un momento."
      },
      {
        situation: "Tu jefe te pregunta por el informe y todavía no has podido terminarlo.",
        howYouSayItInSpanish: "Todavía no he terminado el informe.",
        howEnglishBuildsIt: "I haven't finished the report yet. (o 'I still haven't finished it')",
        breakdown: "'Yet' va siempre al final de la frase en negativas y preguntas."
      },
      {
        situation: "Le cuentas a un colega cuánto tiempo llevas en tu piso actual.",
        howYouSayItInSpanish: "Llevo viviendo en este piso dos años.",
        howEnglishBuildsIt: "I have lived in this flat for two years.",
        breakdown: "Prohibido decir 'I live since 2 years'. En inglés es 'have lived' + FOR + cantidad de tiempo."
      }
    ]
  },

  // ==================== 3. COMPARATIVOS AVANZADOS, TOO Y ENOUGH ====================
  'a2p-comparatives-modifiers': {
    inPlainSpanish:
      "Cómo comparar cosas como un nativo: no solo decir 'esto es más barato', sino 'esto es infinitamente más barato', 'este curro no es tan divertido como el otro', 'hace demasiado frío para salir' o 'no tengo suficiente pasta para comprarlo'.",
    spanishParallel:
      "El error número uno del 90% de los hispanohablantes es decir 'very better' o 'very more cheap' ❌. En inglés 'very' JAMÁS puede ir delante de un comparativo; tienes que usar 'much better' (mucho mejor) o 'far more expensive' (muchísimo más caro). Y con 'enough': en español decimos 'dinero suficiente' o 'suficiente dinero', pero en inglés siempre es 'enough money' (cosa detrás) y 'rich enough' (adjetivo delante).",
    mentalTrick:
      "Para decir 'mucho más', ¡olvídate de 'very' y usa siempre MUCH o FAR! Con 'enough': si es adjetivo/cualidad va delante (warm enough); si es dinero o tiempo va detrás (enough time, enough money).",
    streetExamples: [
      {
        situation: "Comparas dos billetes de tren: uno cuesta 15€ y el otro 90€.",
        howYouSayItInSpanish: "El primer billete es muchísimo más barato que el segundo.",
        howEnglishBuildsIt: "The first ticket is far cheaper than the second one.",
        breakdown: "Nunca digas 'very cheaper'. Usa 'far cheaper' o 'much cheaper'."
      },
      {
        situation: "La pizza que te han servido quema una barbaridad.",
        howYouSayItInSpanish: "La pizza está demasiado caliente para comérsela.",
        howEnglishBuildsIt: "The pizza is too hot to eat.",
        breakdown: "TOO + adjetivo + TO + verbo = demasiado caliente para hacer la acción."
      },
      {
        situation: "Quieres alquilar un piso pero te piden ganar 2000€ y ganas 1200€.",
        howYouSayItInSpanish: "No gano suficiente dinero para alquilarlo.",
        howEnglishBuildsIt: "I don't earn enough money to rent it. (o 'I'm not rich enough')",
        breakdown: "Enough va DELANTE del sustantivo (enough money), pero DETRÁS del adjetivo (rich enough)."
      }
    ]
  },

  // ==================== 4. MODALES DE OBLIGACIÓN, PROHIBICIÓN Y CONSEJO ====================
  'a2p-modals-obligation': {
    inPlainSpanish:
      "La diferencia entre: 'está terminantemente prohibido bajo multa', 'tienes que hacerlo obligatoriamente', y 'no hace falta que lo hagas si no quieres (pero si te apetece, puedes)'. Aquí es donde más hispanohablantes meten la pata porque traducen 'mustn't' a lo loco.",
    spanishParallel:
      "En español decimos: 'No tienes que venir mañana si estás cansado'. Si en inglés dices 'You mustn't come', ¡le estás diciendo que le PROHÍBES la entrada como si fueras un policía! Si quieres decir que no hace falta, tienes que decir 'You don't have to come' o 'You needn't come'. Mustn't es como saltarse un semáforo en rojo o fumar en un hospital.",
    mentalTrick:
      "MUSTN'T = Cárcel / Peligro (prohibido). DON'T HAVE TO = Eres libre (no es obligatorio, tú decides). HAD BETTER = 'Más te vale' (aviso de colleja si no lo haces).",
    streetExamples: [
      {
        situation: "En la oficina es viernes informal y puedes ir en vaqueros si quieres.",
        howYouSayItInSpanish: "Hoy no hace falta llevar traje.",
        howEnglishBuildsIt: "You don't have to wear a suit today. (o 'You needn't wear a suit')",
        breakdown: "Si dijeras 'You mustn't wear a suit', significaría que está estrictamente prohibido llevar traje."
      },
      {
        situation: "En una gasolinera ves a alguien con un cigarrillo encendido.",
        howYouSayItInSpanish: "¡Está prohibido fumar aquí!",
        howEnglishBuildsIt: "You mustn't smoke here!",
        breakdown: "Prohibición absoluta y peligrosa = MUSTN'T."
      },
      {
        situation: "Tu colega va a perder el tren si no sale de casa en 2 minutos.",
        howYouSayItInSpanish: "Más te vale coger un taxi ahora mismo.",
        howEnglishBuildsIt: "You had better take a taxi right now.",
        breakdown: "'Had better + verbo normal' = Más te vale hacerlo (si no, habrá consecuencias)."
      }
    ]
  },

  // ==================== 5. PAST PERFECT Y HÁBITOS (USED TO / BE USED TO) ====================
  'b1-past-perfect-used-to': {
    inPlainSpanish:
      "El 'pasado del pasado'. Cuando estás contando una historia de ayer o del fin de semana, y mencionas algo que ocurrió ANTES de ese momento (el famoso 'ya se había ido', 'ya habíamos comido'). Y además: cómo decir 'antes hacía esto pero ya no' (used to) frente a 'estoy acostumbrado a esto' (be used to + -ing).",
    spanishParallel:
      "En español decimos: 'Cuando llegué al andén, el tren ya se había marchado'. En inglés: 'When I arrived, the train had already left'. Si no pusieras 'had', parecería que el tren se fue en el mismo segundo exacto en que pisaste el andén. Y con hábitos: 'I used to play tennis' = antes jugaba, ya no. 'I am used to waking up early' = estoy acostumbrado a madrugar (¡con -ing!).",
    mentalTrick:
      "HAD + participio = La máquina del tiempo hacia atrás (pasó antes de lo que estás contando). USED TO = 'Antes sí, ahora ya no'. BE USED TO + ING = 'Tengo la costumbre / Ya no me cuesta nada'.",
    streetExamples: [
      {
        situation: "Llegas al bar a las 10 y tu amigo se había pirado a las 9:45.",
        howYouSayItInSpanish: "Cuando llegué al bar, Marcos ya se había ido a casa.",
        howEnglishBuildsIt: "When I got to the pub, Marcos had already gone home.",
        breakdown: "Marcos se fue antes de que tú llegaras: por eso lleva 'had already gone'."
      },
      {
        situation: "De chaval te pasabas las tardes jugando a la Play y ahora ya no tienes tiempo.",
        howYouSayItInSpanish: "Antes jugaba a la consola todos los días.",
        howEnglishBuildsIt: "I used to play video games every day.",
        breakdown: "Hábito del pasado que ya no haces = USED TO + verbo normal."
      },
      {
        situation: "Te vas a vivir a Inglaterra y al principio te cuesta el frío y los horarios.",
        howYouSayItInSpanish: "Ya me he acostumbrado a cenar a las 7 de la tarde.",
        howEnglishBuildsIt: "I am used to having dinner at 7 PM.",
        breakdown: "'Be used to' significa estar acostumbrado y exige que el verbo termine en -ING."
      }
    ]
  },

  // ==================== 6. FIRST & SECOND CONDITIONAL (UNLESS, IN CASE) ====================
  'b1-conditionals-1-2': {
    inPlainSpanish:
      "El 1er condicional es para cosas reales que pueden pasar en el futuro: 'Si llueve, me quedo en casa jugando'. El 2º condicional es el modo soñador o para dar consejos a colegas: 'Si me tocara la lotería, me compraba un barco' o 'Si yo fuera tú, no le hablaría'. También incluye 'Unless' (a menos que) y 'In case' (por si las moscas).",
    spanishParallel:
      "El fallo que más delata a un hispanohablante: meter 'will' detrás del 'if'. Decir 'If it will rain' ❌ suena horroroso en inglés; se dice 'If it rains, I will stay' ✅. Y para 'In case': significa 'por si acaso' (te llevas la chaqueta ANTES de salir por precaución, no después de que haga frío).",
    mentalTrick:
      "Después de IF o UNLESS jamás pongas WILL. 1er condicional: If + Presente -> WILL. 2º condicional: If + Pasado -> WOULD. Para dar consejos: 'If I were you, I would...'.",
    streetExamples: [
      {
        situation: "Ves nubes negras y coges el paraguas antes de salir de casa por precaución.",
        howYouSayItInSpanish: "Me llevo el paraguas por si llueve.",
        howEnglishBuildsIt: "I'm taking an umbrella in case it rains.",
        breakdown: "'In case' = por si acaso (haces la acción antes por precaución)."
      },
      {
        situation: "Tu colega está pensando en dejar el trabajo de golpe sin ahorros y le aconsejas.",
        howYouSayItInSpanish: "Si yo fuera tú, no dejaría el trabajo todavía.",
        howEnglishBuildsIt: "If I were you, I wouldn't quit my job yet.",
        breakdown: "2º condicional: 'If I were you' + wouldn't + verbo normal."
      },
      {
        situation: "Dices a tu compañero que no irás a la cena si no termina pronto.",
        howYouSayItInSpanish: "A menos que termines a tiempo, me voy solo.",
        howEnglishBuildsIt: "Unless you finish on time, I'll go on my own.",
        breakdown: "'Unless' ya significa 'si no'; no le metas un don't detrás."
      }
    ]
  },

  // ==================== 7. VOZ PASIVA EN TODOS LOS TIEMPOS ====================
  'b1-passive-voice': {
    inPlainSpanish:
      "En español decimos a todas horas 'Se vende piso', 'Me han robado el móvil' o 'Construyeron este estadio en 1995'. En inglés no existe ese 'se' para todo. Tienes que usar la pasiva: poner al que recibe la acción como protagonista. Se usa cuando lo que importa es lo que pasó, y no quién lo hizo (o porque no se sabe o porque da igual).",
    spanishParallel:
      "En español decimos: 'Ayer me ofrecieron un ascenso'. En inglés, la persona a la que le dan algo se convierte en el sujeto principal: dicen literalmente 'Yo fui ofrecido un ascenso' (I was offered a promotion!). A los hispanohablantes nos choca al principio, pero en inglés es la forma más natural de hablar.",
    mentalTrick:
      "El truco del 'Me': En inglés, a quien le dan, pagan, roban o dicen algo, va el primero de la frase: 'I was told...' (Me dijeron), 'I was given...' (Me dieron), 'I was paid...' (Me pagaron).",
    streetExamples: [
      {
        situation: "Dejas la bici candada en la estación y cuando vuelves ha volado.",
        howYouSayItInSpanish: "Me han robado la bicicleta.",
        howEnglishBuildsIt: "My bicycle was stolen yesterday.",
        breakdown: "No sabes quién fue el ladrón: lo importante es la bici (was stolen)."
      },
      {
        situation: "En una entrevista de trabajo te dicen que el puesto es tuyo.",
        howYouSayItInSpanish: "Me ofrecieron el puesto de trabajo.",
        howEnglishBuildsIt: "I was offered the position.",
        breakdown: "Tú eres el protagonista que recibe la oferta: I was offered."
      },
      {
        situation: "Mandan un correo con datos confidenciales por error.",
        howYouSayItInSpanish: "Ese correo fue enviado por error.",
        howEnglishBuildsIt: "That email was sent by mistake.",
        breakdown: "Acción sobre el correo: was + participio (sent)."
      }
    ]
  },

  // ==================== 8. REPORTED SPEECH (ESTILO INDIRECTO) ====================
  'b1-reported-speech': {
    inPlainSpanish:
      "El modo cotilleo: cómo contarle a tu colega lo que te dijo otra persona ayer. 'Oye, pues Carlos me dijo que vendría hoy, y me preguntó si le dejaba la chaqueta'. La regla de oro es dar UN PASO ATRÁS en el tiempo verbal, porque lo que la otra persona dijo en presente en ese momento, ahora ya es pasado.",
    spanishParallel:
      "En español hacemos exactamente lo mismo: 'Él dice: Tengo frío' -> 'Dijo que tenía frío'. En inglés igual: 'I am tired' -> 'He said he was tired'. La diferencia clave está entre SAY y TELL: TELL necesita a la persona pegada ('He told ME'), mientras que SAY no lleva persona ('He said that...').",
    mentalTrick:
      "Regla del chisme: tira el verbo hacia el pasado. AM/IS -> WAS. HAVE -> HAD. WILL -> WOULD. CAN -> COULD. Y acuérdate: 'He told me' (con persona) vs 'He said that' (sin persona).",
    streetExamples: [
      {
        situation: "Tu jefe te promete ayer en la reunión que te subirá el sueldo.",
        howYouSayItInSpanish: "Mi jefe me dijo que me subiría el sueldo.",
        howEnglishBuildsIt: "My boss told me he would give me a raise.",
        breakdown: "El 'will' del jefe se convierte en 'would' al contarlo como cotilleo."
      },
      {
        situation: "Un amigo te pregunta por WhatsApp si vas a ir a la fiesta el sábado.",
        howYouSayItInSpanish: "Me preguntó si iba a ir a la fiesta.",
        howEnglishBuildsIt: "He asked me if I was going to the party.",
        breakdown: "En preguntas sin palabra interrogativa se mete 'if' o 'whether'."
      },
      {
        situation: "El médico te advierte seriamente de que no fumes.",
        howYouSayItInSpanish: "El médico me dijo que dejara de fumar.",
        howEnglishBuildsIt: "The doctor warned me to stop smoking.",
        breakdown: "Con órdenes y consejos se usa el verbo + persona + TO + infinitivo."
      }
    ]
  },

  // ==================== 9. PRESENT PERFECT CONTINUOUS VS SIMPLE ====================
  'b1p-perfect-continuous': {
    inPlainSpanish:
      "La diferencia entre: 'he terminado esto y aquí está el resultado' vs 'llevo haciéndolo un buen rato y se me nota en la cara (o sigo con ello todavía)'. Es la forma que usan los ingleses para justificar por qué estás sudando, por qué tienes ojeras o por qué el suelo está mojado.",
    spanishParallel:
      "En español decimos: 'Llevo dos horas limpiando la casa' (y sigo sudando con la fregona) o 'He estado corriendo' (por eso estoy jadeando). En inglés es: 'I have been cleaning' o 'I have been running'. Si dices 'I have cleaned the house', destacas que la casa YA está impecable y terminada. Con 'have been doing', destacas la paliza del proceso.",
    mentalTrick:
      "HAVE BEEN + -ING = Acción pesada o que te ha dejado agotado / que sigue en marcha. HAVE + PARTICIPIO = Tarea terminada con éxito (resultado cerrado o número de veces que lo has hecho).",
    streetExamples: [
      {
        situation: "Llegas a una cita con los pelos de punta y jadeando.",
        howYouSayItInSpanish: "Perdona el retraso, es que he venido corriendo.",
        howEnglishBuildsIt: "Sorry I'm late, I have been running.",
        breakdown: "Se te nota el esfuerzo en el cuerpo ahora mismo: have been running."
      },
      {
        situation: "Llevas esperando el autobús 45 minutos y estás hasta las narices.",
        howYouSayItInSpanish: "Llevo esperando el autobús tres cuartos de hora.",
        howEnglishBuildsIt: "I have been waiting for the bus for 45 minutes.",
        breakdown: "La espera sigue en curso: have been waiting."
      },
      {
        situation: "Te preguntan cuántas veces has visto El Señor de los Anillos.",
        howYouSayItInSpanish: "He visto esa peli cuatro veces.",
        howEnglishBuildsIt: "I have watched that movie four times.",
        breakdown: "Número de veces terminado: Present Perfect Simple normal (have watched)."
      }
    ]
  },

  // ==================== 10. THIRD CONDITIONAL (ARREPENTIMIENTOS) ====================
  'b1p-third-conditional': {
    inPlainSpanish:
      "El modo arrepentimiento total de la vida: 'Si lo hubiera sabido, no habría venido'. Habla de cosas del pasado que ya ocurrieron, no tienen vuelta de hoja, y te imaginas cómo habría sido la película si las cosas hubieran sido distintas.",
    spanishParallel:
      "En español usamos: 'Si hubiera hecho X... habría pasado Y'. En inglés es exactamente igual: 'If I had known, I would have come'. El fallo de los españoles es trabarse al pronunciar 'would have'; los nativos lo pegan todo como 'would've' (suena parecido a 'wúdef').",
    mentalTrick:
      "La fórmula del lamento: IF + HAD + participio -> WOULD HAVE + participio. Si en un lado hay HAD, en el otro SIEMPRE va WOULD HAVE.",
    streetExamples: [
      {
        situation: "Cenaste un marisco sospechoso y te pasaste la noche en el baño.",
        howYouSayItInSpanish: "Si no me hubiera comido esas gambas, no me habría puesto enfermo.",
        howEnglishBuildsIt: "If I hadn't eaten those prawns, I wouldn't have gotten sick.",
        breakdown: "Ya te las comiste (pasado cerrado): Hadn't eaten -> wouldn't have gotten."
      },
      {
        situation: "Te dormiste 10 minutos más y perdiste el avión de vacaciones.",
        howYouSayItInSpanish: "Si hubiera puesto la alarma, no habría perdido el vuelo.",
        howEnglishBuildsIt: "If I had set the alarm, I wouldn't have missed the flight.",
        breakdown: "Lamento de algo que ya no tiene arreglo en el pasado."
      },
      {
        situation: "No compraste bitcoins cuando costaban 50 euros.",
        howYouSayItInSpanish: "¡Si hubiera comprado bitcoins en 2012, habría ganado una fortuna!",
        howEnglishBuildsIt: "If I had bought Bitcoin in 2012, I would have made a fortune!",
        breakdown: "Hipotético del pasado imposible de cambiar."
      }
    ]
  },

  // ==================== 11. CAUSATIVE: HAVE / GET SOMETHING DONE ====================
  'b1p-causative-have-get': {
    inPlainSpanish:
      "Cuando en español decimos 'Me voy a cortar el pelo' o 'Ayer arreglé el coche'. La realidad es que tú NO te cortaste el pelo con tus manos ni te metiste debajo del coche con una llave inglesa: ¡pagaste a un peluquero o a un mecánico para que lo hiciera por ti! En inglés, si dices 'I cut my hair', piensan que te volviste loco con las tijeras en el baño.",
    spanishParallel:
      "Para decir que alguien te hace un servicio o reparación, los ingleses usan: HAVE / GET + la cosa + hecha en participio. 'I had my hair cut' (me cortaron el pelo). 'I need to get my car repaired' (tengo que llevar el coche a que me lo arreglen). También se usa si te pasa una desgracia: 'I had my phone stolen' (me robaron el móvil).",
    mentalTrick:
      "La regla del taller: HAVE + LO QUE ARREGLAN + EN PASADO. 'I had my phone screen replaced' = mandé cambiar la pantalla del móvil a una tienda.",
    streetExamples: [
      {
        situation: "Vas a la peluquería a hacerte un corte degradado.",
        howYouSayItInSpanish: "Me voy a cortar el pelo esta tarde.",
        howEnglishBuildsIt: "I'm having my hair cut this afternoon. (o 'getting my hair cut')",
        breakdown: "Si dices 'I will cut my hair', significa que coges tú las tijeras delante del espejo."
      },
      {
        situation: "Se te rompe la caldera en casa y viene el técnico de gas.",
        howYouSayItInSpanish: "Ayer nos arreglaron la caldera.",
        howEnglishBuildsIt: "We had the boiler repaired yesterday.",
        breakdown: "Tuviste la caldera (boiler) reparada (repaired) por un profesional."
      },
      {
        situation: "Se te rompe el cristal del móvil y lo llevas al chino a cambiar.",
        howYouSayItInSpanish: "Tengo que cambiarle la pantalla al móvil.",
        howEnglishBuildsIt: "I need to get my phone screen replaced.",
        breakdown: "GET + cosa + participio = encargar que te lo cambien."
      }
    ]
  },

  // ==================== 12. FUTURE CONTINUOUS VS FUTURE PERFECT ====================
  'b1p-future-continuous-perfect': {
    inPlainSpanish:
      "Dos formas de mirar al futuro como un jefe: 1) Future Continuous: 'A esa hora concreta estaré haciendo X' (ej. 'A las 4 ni me llames, que estaré en el gimnasio sudando'). 2) Future Perfect: 'Para esa fecha o hora límite, ya habré terminado X' (ej. 'Para las 8 ya habré llegado a casa' o 'Para el viernes me habré fundido todo el sueldo').",
    spanishParallel:
      "En español decimos: 'A las 10 estaré durmiendo' -> 'At 10 PM I will be sleeping'. Y decimos: 'Para el mes que viene ya me habré sacado el carnet' -> 'By next month I will have passed my driving test'. La palabra clave que delata al Future Perfect siempre es BY (by tomorrow, by 5 PM, by next year).",
    mentalTrick:
      "WILL BE + -ING = 'Píllame en pleno proceso a esa hora'. BY + fecha = Pide a gritos WILL HAVE + participio ('Para entonces ya estará finiquitado').",
    streetExamples: [
      {
        situation: "Tus amigos quieren llamarte para jugar a la Play a las 9 pero hay partido de Champions.",
        howYouSayItInSpanish: "A las 9 no me llaméis, que estaré viendo el partido.",
        howEnglishBuildsIt: "Don't call me at 9 PM, I will be watching the match.",
        breakdown: "A las 9 en punto estarás en pleno directo: will be watching."
      },
      {
        situation: "Le prometes a tu jefe que el proyecto estará listo a media tarde.",
        howYouSayItInSpanish: "Para las 5 de la tarde ya habré terminado el informe.",
        howEnglishBuildsIt: "By 5 PM, I will have finished the report.",
        breakdown: "Con 'BY' (para esa hora) siempre va Future Perfect: will have finished."
      },
      {
        situation: "Haces planes de vida pensando en el año 2030.",
        howYouSayItInSpanish: "Para 2030 ya me habré comprado una casa.",
        howEnglishBuildsIt: "By 2030, I will have bought a house.",
        breakdown: "Meta cumplida antes de una fecha futura: will have bought."
      }
    ]
  },

  // ==================== 13. WISH / IF ONLY ====================
  'b2-wish-if-only': {
    inPlainSpanish:
      "El '¡Ojalá!' de toda la vida. Sirve para tres cosas claras: 1) Deseos sobre tu situación actual que te dan rabia: '¡Ojalá tuviera más pasta!' (verbo en pasado). 2) Arrepentimientos del pasado: '¡Ojalá no me hubiera gastado 100€ anoche!' (verbo con had). 3) Broncas porque alguien te está tocando las narices: '¡Ojalá te callaras un rato!' (con would).",
    spanishParallel:
      "En español usamos el subjuntivo: 'Ojalá tuviera', 'Ojalá hubiera ido'. Como en inglés no existe el subjuntivo, usan el truco de rebotar hacia el pasado: si el deseo es para hoy, ponen pasado simple ('I wish I had money'); si el lamento es de ayer, ponen past perfect ('I wish I had known'). Y con 'If only', significa exactamente lo mismo que 'I wish' pero con más drama.",
    mentalTrick:
      "WISH nunca lleva presente. Queja sobre hoy -> Pasado (I wish I was/were rich). Arrepentimiento de ayer -> HAD (I wish I had studied). Manía molesta de otra persona -> WOULD (I wish you would listen).",
    streetExamples: [
      {
        situation: "Es lunes por la mañana en la oficina y estás agobiado.",
        howYouSayItInSpanish: "¡Ojalá estuviera en la playa ahora mismo!",
        howEnglishBuildsIt: "I wish I were at the beach right now. (o 'If only I were...')",
        breakdown: "Deseo sobre el presente: verbo en pasado (were)."
      },
      {
        situation: "Tienes una resaca espantosa de salir de fiesta.",
        howYouSayItInSpanish: "Ojalá no me hubiera bebido esas cuatro cervezas.",
        howEnglishBuildsIt: "I wish I hadn't drunk those four beers.",
        breakdown: "Lamento de algo que ya pasó anoche: HADN'T + participio."
      },
      {
        situation: "Tu vecino pone el reggaetón a todo volumen a la 1 de la madrugada.",
        howYouSayItInSpanish: "¡Ojalá bajara la música de una vez!",
        howEnglishBuildsIt: "I wish my neighbour would turn down the music!",
        breakdown: "Queja sobre la actitud molesta de otra persona = WOULD."
      }
    ]
  },

  // ==================== 14. MIXED CONDITIONALS ====================
  'b2-mixed-conditionals': {
    inPlainSpanish:
      "Mezclar el pasado con el presente: una decisión o cagada que hiciste en el pasado que sigue teniendo consecuencias hoy mismo en tu vida. 'Si hubiera ahorrado de joven, hoy tendría mi propio piso' o 'Si no fuera tan tímido, ayer le habría pedido el número a esa chica'.",
    spanishParallel:
      "Es exactamente como pensamos los españoles cuando nos quejamos de nuestra vida actual por culpa de algo de antes: 'Si hubiera estudiado informática [pasado], ahora ganaría un pastón [presente]'. En inglés juntas el 'had + participio' (del pasado) con el 'would + verbo normal' (del presente). Solo tienes que buscar palabras chivatas como 'now', 'today' o 'at the moment'.",
    mentalTrick:
      "Si la frase mezcla 'ayer' con 'hoy', es un condicional mixto: IF + HAD (lo que pasó antes) -> WOULD + VERBO NORMAL (cómo estás hoy por culpa de eso).",
    streetExamples: [
      {
        situation: "No estudiaste inglés de chaval y ahora te cuesta encontrar un buen curro.",
        howYouSayItInSpanish: "Si hubiera aprendido inglés de pequeño, hoy tendría un trabajo mejor.",
        howEnglishBuildsIt: "If I had learned English as a kid, I would have a better job today.",
        breakdown: "Acción pasada (had learned) -> consecuencia presente hoy (would have)."
      },
      {
        situation: "Ayer te acostaste a las 4 de la mañana jugando a la Play y hoy en el curro pareces un zombi.",
        howYouSayItInSpanish: "Si no me hubiera quedado despierto hasta tan tarde, no estaría tan cansado ahora.",
        howEnglishBuildsIt: "If I hadn't stayed up so late, I wouldn't be so tired now.",
        breakdown: "HADN'T + participio (anoche) -> WOULDN'T BE (ahora)."
      },
      {
        situation: "Eres alérgico a los frutos secos (condición permanente) y por eso no comiste tarta ayer.",
        howYouSayItInSpanish: "Si no fuera alérgico a las nueces, me habría comido la tarta ayer.",
        howEnglishBuildsIt: "If I weren't allergic to nuts, I would have eaten the cake yesterday.",
        breakdown: "Condición permanente (If I weren't) -> resultado en el pasado (would have eaten)."
      }
    ]
  },

  // ==================== 15. MODALES PERFECTOS DE DEDUCCIÓN ====================
  'b2-modals-past-deduction': {
    inPlainSpanish:
      "Hacer de detective sobre algo que ya ha pasado: 1) MUST HAVE = Seguro al 100% que fue así ('Fijo que se le ha olvidado la cita'). 2) CAN'T HAVE = Imposible que fuera así ('Imposible que fuera él, si está de viaje en Roma'). 3) MIGHT / COULD HAVE = A lo mejor pasó ('Quizás se quedó sin batería'). 4) SHOULD HAVE = Deberías haberlo hecho (pero la cagaste y no lo hiciste).",
    spanishParallel:
      "En español decimos: 'Seguro que se ha dormido'. En inglés NO dicen 'sure that...'; usan el modal MUST HAVE: 'He must have overslept'. Y para decir que algo era imposible, NUNCA digas 'mustn't have' ❌; tienes que decir CAN'T HAVE: 'He can't have stolen the money' (Imposible que robara él la pasta).",
    mentalTrick:
      "MUST HAVE = Fijo que sí (certeza absoluta positiva). CAN'T HAVE = Imposible que fuera así (certeza absoluta negativa). SHOULD HAVE = Deberías haberlo hecho (reproche).",
    streetExamples: [
      {
        situation: "Llamas a tu colega tres veces y no contesta al WhatsApp a las 11 de la mañana de un domingo.",
        howYouSayItInSpanish: "Seguro que se ha quedado dormido.",
        howEnglishBuildsIt: "He must have fallen asleep.",
        breakdown: "Deducción casi 100% segura = MUST HAVE."
      },
      {
        situation: "Te dicen que vieron a tu hermano en Barcelona ayer, pero estuvo comiendo contigo en Madrid.",
        howYouSayItInSpanish: "¡Imposible que fuera él!",
        howEnglishBuildsIt: "It can't have been him!",
        breakdown: "Imposibilidad total en el pasado = CAN'T HAVE."
      },
      {
        situation: "Aparcas el coche en un vado y te lo retira la grúa.",
        howYouSayItInSpanish: "Debería haber leído la señal de prohibido aparcar.",
        howEnglishBuildsIt: "I should have read the parking sign.",
        breakdown: "Reproche por no haber hecho lo correcto = SHOULD HAVE."
      }
    ]
  },

  // ==================== 16. GERUND VS INFINITIVE CON CAMBIO DE SIGNIFICADO ====================
  'b2-gerund-infinitive-meaning': {
    inPlainSpanish:
      "Verbos tramposos que cambian totalmente de significado según si les pones detrás un verbo en '-ing' o con 'to'. 1) STOP: 'Stop smoking' (dejar de fumar para siempre) vs 'Stop to smoke' (parar lo que estabas haciendo para encenderte un cigarrillo). 2) REMEMBER: 'Remember locking the door' (te acuerdas del recuerdo de haber cerrado con llave) vs 'Remember to lock the door' (acordarte de cerrar la puerta antes de salir).",
    spanishParallel:
      "En español usamos verbos distintos o preposiciones: 'parar de fumar' vs 'parar para fumar'. En inglés solo cambian la terminación. Si el verbo lleva '-ING', estás mirando hacia atrás a un RECUERDO o a una experiencia en tu cabeza. Si lleva 'TO', estás mirando hacia adelante al DEBER o a la obligación de hacer algo.",
    mentalTrick:
      "-ING = Miras al pasado (recuerdos o hábitos que dejas). TO = Miras al futuro (tareas que tienes que acordarte de hacer).",
    streetExamples: [
      {
        situation: "Vas conduciendo por la carretera y necesitas parar en una gasolinera a tomar un café.",
        howYouSayItInSpanish: "Paré a tomarme un café.",
        howEnglishBuildsIt: "I stopped to drink a coffee.",
        breakdown: "Paraste la marcha con el objetivo de tomar café = STOP TO."
      },
      {
        situation: "El médico te dice que tienes el colesterol alto y debes dejar de comer fritos.",
        howYouSayItInSpanish: "He dejado de comer fritos.",
        howEnglishBuildsIt: "I stopped eating fried food.",
        breakdown: "Dejar un hábito por completo = STOP + -ING."
      },
      {
        situation: "Sales de casa y dudas de si apagaste el fuego de la cocina.",
        howYouSayItInSpanish: "Recuerdo haber apagado el fuego antes de salir.",
        howEnglishBuildsIt: "I remember turning off the stove.",
        breakdown: "Tienes el recuerdo visual en tu cabeza = REMEMBER + -ING."
      }
    ]
  },

  // ==================== 17. INVERSIÓN CON ADVERBIOS NEGATIVOS ====================
  'b2p-inversion-negative': {
    inPlainSpanish:
      "El modo 'película de Hollywood / dramático'. Cuando quieres enfatizar muchísimo algo en inglés, pones una palabra negativa al principio de la frase (como 'Jamás en mi vida...', 'Bajo ningún concepto...', 'Apenas había entrado cuando...'). Al poner esa palabra al principio, la frase se da la vuelta exactamente igual que si estuvieras haciendo una pregunta (metes el auxiliar delante de la persona).",
    spanishParallel:
      "En español decimos: 'Jamás había visto semejante locura'. En inglés normal dirías: 'I had never seen such madness'. Pero si quieres sonar épico y sacar la máxima nota en el examen B2/C1, dices: 'Never HAD I seen such madness'. Fíjate cómo 'had' salta delante de 'I', como si estuvieras preguntando.",
    mentalTrick:
      "Si la frase empieza con NEVER, HARDLY, RARELY, SELDOM, NOT ONLY o UNDER NO CIRCUMSTANCES, ¡el auxiliar (did / had / should) salta SIEMPRE delante de la persona!",
    streetExamples: [
      {
        situation: "Pruebas la mejor hamburguesa de tu vida en un viaje.",
        howYouSayItInSpanish: "¡Jamás en mi vida había comido una hamburguesa tan buena!",
        howEnglishBuildsIt: "Never in my life had I eaten such an incredible burger!",
        breakdown: "Never al principio fuerza la inversión: had + I + eaten."
      },
      {
        situation: "Entras por la puerta de casa y justo en ese segundo se pone a diluviar.",
        howYouSayItInSpanish: "Apenas había entrado en casa cuando empezó a llover.",
        howEnglishBuildsIt: "Hardly had I arrived home when it started pouring down.",
        breakdown: "Hardly + had + sujeto + when = apenas... cuando..."
      },
      {
        situation: "En el trabajo un cliente te pide que hagas una chapuza ilegal.",
        howYouSayItInSpanish: "Bajo ningún concepto debemos aceptar esta propuesta.",
        howEnglishBuildsIt: "Under no circumstances should we accept this proposal.",
        breakdown: "Under no circumstances + should + we + accept."
      }
    ]
  },

  // ==================== 18. PASIVA IMPERSONAL Y PERSONAL ====================
  'b2p-impersonal-passive': {
    inPlainSpanish:
      "El lenguaje de las noticias y los rumores: 'Se dice que...', 'Se cree que...', 'Está demostrado que...'. En lugar de decir 'La gente dice que el director va a dimitir', en nivel B2/C1 se dice 'The director is said to be resigning' (El director es dicho que va a dimitir).",
    spanishParallel:
      "En español usamos 'se dice', 'se rumorea' o 'se sospecha'. En inglés profesional de negocios o noticias cogen a la persona de la que se habla y la ponen de protagonista: 'He is believed to have escaped' (Se cree que él se ha escapado). Si la acción es del pasado, meten 'TO HAVE + participio'.",
    mentalTrick:
      "PERSONA + IS SAID / THOUGHT / BELIEVED + TO + INFINITIVO. Si ocurrió en el pasado, usa TO HAVE + participio ('He is suspected to have stolen the car').",
    streetExamples: [
      {
        situation: "En la prensa deportiva dicen que un futbolista va a fichar por otro club.",
        howYouSayItInSpanish: "Se dice que el jugador firmará con el nuevo equipo.",
        howEnglishBuildsIt: "The player is reported to be signing with the new team.",
        breakdown: "The player + is reported + to be signing."
      },
      {
        situation: "Se rumorea que el bar de la esquina va a cerrar por jubilación.",
        howYouSayItInSpanish: "Se cree que el bar cerrará el mes que viene.",
        howEnglishBuildsIt: "The bar is believed to be closing next month.",
        breakdown: "The bar + is believed + to be closing."
      },
      {
        situation: "La policía sospecha que el ladrón huyó al extranjero hace dos días.",
        howYouSayItInSpanish: "Se cree que el sospechoso ha huido a Francia.",
        howEnglishBuildsIt: "The suspect is believed to have fled to France.",
        breakdown: "Como la huida fue en el pasado: is believed + TO HAVE + participio (fled)."
      }
    ]
  },

  // ==================== 19. UNREAL PAST (WOULD RATHER, IT'S TIME) ====================
  'b2p-unreal-past-rather-time': {
    inPlainSpanish:
      "Estructuras fijas para dos situaciones muy concretas de la vida: 1) 'Ya va siendo hora de que...' (ej. 'Ya es hora de que te busques un curro' o 'Ya es hora de irnos a dormir'). 2) 'Preferiría que tú...' (ej. 'Preferiría que no fumases dentro de mi coche').",
    spanishParallel:
      "En español decimos: 'Ya es hora de que te vayas a casa'. En inglés dicen 'It's time you WENT home' (¡con el verbo en pasado simple aunque te estés refiriendo a ahora mismo!). Y para preferencias: si lo haces tú dices 'I'd rather stay' (sin to), pero si quieres que lo haga OTRA persona usas pasado: 'I'd rather you didn't come'.",
    mentalTrick:
      "IT'S TIME + PERSONA -> ¡El verbo va SIEMPRE en Pasado Simple! 'It's time we left' (ya es hora de irnos). I'D RATHER + PERSONA -> También en Pasado Simple ('I'd rather you paid today').",
    streetExamples: [
      {
        situation: "Tu compañero de piso lleva 4 días con los platos sucios en el fregadero.",
        howYouSayItInSpanish: "¡Ya va siendo hora de que friegues los platos!",
        howEnglishBuildsIt: "It's high time you washed the dishes!",
        breakdown: "It's high time + persona + verbo en PASADO (washed)."
      },
      {
        situation: "Un amigo te pide el coche pero sabes que conduce como un loco.",
        howYouSayItInSpanish: "Preferiría que cogieras el autobús.",
        howEnglishBuildsIt: "I'd rather you took the bus.",
        breakdown: "I'd rather + persona distinta + verbo en PASADO (took)."
      },
      {
        situation: "Son las 2 de la madrugada y mañana madrugáis para trabajar.",
        howYouSayItInSpanish: "Ya es hora de que nos vayamos a dormir.",
        howEnglishBuildsIt: "It's time we went to sleep.",
        breakdown: "It's time + we + WENT (pasado)."
      }
    ]
  },

  // ==================== 20. CLEFT SENTENCES Y PARTICIPLE CLAUSES ====================
  'b2p-cleft-participle': {
    inPlainSpanish:
      "Dos trucos de nivel pro para sonar convincente y seguro: 1) Cleft Sentences (oraciones para poner el foco): en vez de decir 'Me molesta su actitud', dices 'Lo que realmente me molesta de él es su actitud' (What really annoys me is his attitude). 2) Participle Clauses: ahorrar palabras como en las noticias o en un correo formal: en vez de 'Como no tenía pasta, me quedé en casa', dices 'Al no tener pasta, me quedé en casa' (Not having any money, I stayed at home).",
    spanishParallel:
      "En español usamos muchísimo 'Lo que necesito es...', 'Lo que me sorprende fue...' o 'Fue Carlos quien rompió el cristal'. En inglés empieza con WHAT... IS/WAS o IT WAS... THAT. Te hace sonar seguro, formal y adulto en reuniones o emails.",
    mentalTrick:
      "Para enfatizar: arranca con WHAT... ('What I really need is a coffee'). Para unir dos frases elegantes: quita 'because/when' y pon el verbo en -ING ('Feeling tired, I went to bed').",
    streetExamples: [
      {
        situation: "En una reunión de curro dejas claro cuál es el verdadero problema.",
        howYouSayItInSpanish: "Lo que realmente me preocupa es la fecha de entrega.",
        howEnglishBuildsIt: "What really worries me is the project deadline.",
        breakdown: "What + verbo + is + lo importante."
      },
      {
        situation: "Explicas por qué te quedaste dormido en el sofá.",
        howYouSayItInSpanish: "Al estar tan cansado después del curro, me quedé dormido.",
        howEnglishBuildsIt: "Feeling exhausted after work, I fell asleep on the sofa.",
        breakdown: "Participle clause: 'Feeling exhausted' sustituye a 'Because I was feeling exhausted'."
      },
      {
        situation: "Reconoces que lo único que quieres es un poco de sinceridad.",
        howYouSayItInSpanish: "Todo lo que pido es un poco de honestidad.",
        howEnglishBuildsIt: "All I ask for is a little bit of honesty.",
        breakdown: "Estructura enfática elegante con ALL."
      }
    ]
  }
};
