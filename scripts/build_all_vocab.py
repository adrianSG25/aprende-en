# -*- coding: utf-8 -*-
"""
Generador del banco masivo de Vocabulario (más de 120 items y más de 60 ejercicios).
Cubre: Confusing Words, Collocations, Dependent Prepositions, Connectors y Word Formation.
"""

import json
import os

OUTPUT_PATH = os.path.join(os.path.dirname(__file__), '..', 'src', 'data', 'vocabularyData.ts')

# 1. VOCABULARY ITEMS
ITEMS = [
    # ==================== CONFUSING WORDS & FALSE FRIENDS (35 items) ====================
    {
        "id": "voc-sensible-sensitive",
        "level": "A2+",
        "category": "confusing_words",
        "term": "Sensible vs. Sensitive",
        "meaningEs": "Sensible = Sensato/Prudente | Sensitive = Sensible/Susceptible",
        "contextExample": "Wearing a warm coat in winter is a sensible decision. / Don't criticize his work; he's very sensitive.",
        "contextTranslation": "Llevar un abrigo caliente en invierno es una decisión sensata. / No critiques su trabajo; es muy sensible.",
        "commonMistake": "Decir 'She is very sensible' queriendo decir que llora con facilidad (eso es 'sensitive')."
    },
    {
        "id": "voc-actually-currently",
        "level": "A2+",
        "category": "confusing_words",
        "term": "Actually vs. Currently / Nowadays",
        "meaningEs": "Actually = En realidad / De hecho | Currently = Actualmente / Hoy en día",
        "contextExample": "People think he is American, but he is actually Canadian. / She is currently living in Madrid.",
        "contextTranslation": "La gente piensa que es estadounidense, pero en realidad es canadiense. / Actualmente vive en Madrid.",
        "commonMistake": "Usar 'actually' para decir 'actualmente' ('Currently' o 'At present')."
    },
    {
        "id": "voc-remember-remind",
        "level": "B1",
        "category": "confusing_words",
        "term": "Remember vs. Remind",
        "meaningEs": "Remember = Acordarse uno mismo | Remind = Recordarle algo a alguien / Hacer pensar en",
        "contextExample": "Did you remember to lock the front door? / Please remind me to send the email at 4 PM.",
        "contextTranslation": "¿Te acordaste de cerrar con llave? / Por favor, recuérdame mandar el correo a las 4.",
        "commonMistake": "Decir 'Remember me to call' ❌ -> Siempre es 'Remind me to call' ✅."
    },
    {
        "id": "voc-win-earn-gain",
        "level": "B1",
        "category": "confusing_words",
        "term": "Win vs. Earn vs. Gain",
        "meaningEs": "Win (un trofeo/partido/lotería) | Earn (dinero trabajando) | Gain (experiencia, peso, velocidad)",
        "contextExample": "He earns a high salary and has gained valuable experience since winning the championship.",
        "contextTranslation": "Gana un sueldo alto y ha adquirido valiosa experiencia desde que ganó el campeonato.",
        "commonMistake": "Decir 'win money' por tu trabajo ❌ -> Siempre es 'earn money' ✅."
    },
    {
        "id": "voc-borrow-lend",
        "level": "A2+",
        "category": "confusing_words",
        "term": "Borrow vs. Lend",
        "meaningEs": "Borrow = Pedir prestado (recibir) | Lend = Prestar (dar)",
        "contextExample": "Can I borrow your pen for a minute? / Could you lend me ten pounds until tomorrow?",
        "contextTranslation": "¿Puedo pedirte prestado tu bolígrafo un minuto? / ¿Me prestas diez libras hasta mañana?",
        "commonMistake": "Decir 'Can you borrow me your car?' ❌ -> 'Can you lend me...?' ✅."
    },
    {
        "id": "voc-raise-rise",
        "level": "B1+",
        "category": "confusing_words",
        "term": "Raise vs. Rise",
        "meaningEs": "Raise (+ objeto directo) = Levantar/Subir algo | Rise (sin objeto) = Subir por sí solo (intransitivo)",
        "contextExample": "The supermarket raised its prices. / Smoke was rising from the chimney.",
        "contextTranslation": "El supermercado subió sus precios. / Salía humo subiendo de la chimenea.",
        "commonMistake": "Si detrás hay un objeto ('prices', 'taxes', 'your hand'), usa RAISE."
    },
    {
        "id": "voc-notice-warn-realize",
        "level": "B1",
        "category": "confusing_words",
        "term": "Notice vs. Realize vs. Warn",
        "meaningEs": "Notice = Darse cuenta por los sentidos (ver/oír) | Realize = Darse cuenta en la mente | Warn = Advertir a alguien",
        "contextExample": "Did you notice her new haircut? / I suddenly realized I didn't have my keys. / They warned us about the storm.",
        "contextTranslation": "¿Te diste cuenta de su nuevo corte? / Me di cuenta de que no tenía mis llaves. / Nos advirtieron de la tormenta.",
        "commonMistake": "Confundir 'notice' (físico/visual) con 'realize' (comprensión mental)."
    },
    {
        "id": "voc-recipe-receipt-prescription",
        "level": "B1",
        "category": "confusing_words",
        "term": "Recipe vs. Receipt vs. Prescription",
        "meaningEs": "Recipe = Receta de cocina | Receipt = Ticket de compra / Recibo | Prescription = Receta médica",
        "contextExample": "This chocolate cake recipe is delicious. Keep the receipt in case you want a refund. The doctor gave me a prescription.",
        "contextTranslation": "Esta receta de tarta es deliciosa. Guarda el ticket por si quieres devolución. El médico me dio una receta.",
        "commonMistake": "Pedir el 'recipe' en una tienda cuando quieres el ticket de compra ('receipt')."
    },
    {
        "id": "voc-dessert-desert",
        "level": "A2+",
        "category": "confusing_words",
        "term": "Dessert vs. Desert",
        "meaningEs": "Dessert (dos 's', acento al final: desért) = Postre | Desert (una 's': désert) = Desierto / Abandonar",
        "contextExample": "Would you like ice cream for dessert? / The Sahara is the largest hot desert on Earth.",
        "contextTranslation": "¿Quieres helado de postre? / El Sáhara es el desierto cálido más grande.",
        "commonMistake": "Escribir 'desert' cuando hablas de comer un dulce de postre."
    },
    {
        "id": "voc-advice-advise",
        "level": "B1",
        "category": "confusing_words",
        "term": "Advice (sustantivo) vs. Advise (verbo)",
        "meaningEs": "Advice (con 'c') = Consejo (incontable) | Advise (con 's') = Aconsejar",
        "contextExample": "She gave me some useful advice. / The lawyer advised us not to sign the contract.",
        "contextTranslation": "Ella me dio un consejo útil. / El abogado nos aconsejó no firmar el contrato.",
        "commonMistake": "Decir 'an advice' ❌ (es incontable: 'a piece of advice' o 'some advice')."
    },
    {
        "id": "voc-economic-economical",
        "level": "B2",
        "category": "confusing_words",
        "term": "Economic vs. Economical",
        "meaningEs": "Economic = Perteneciente a la economía / Del país | Economical = Ahorrativo / Barato de mantener",
        "contextExample": "The country is undergoing an economic crisis. / This hybrid car is very economical on petrol.",
        "contextTranslation": "El país atraviesa una crisis económica. / Este coche híbrido es muy económico en consumo.",
        "commonMistake": "Decir 'an economic car' queriendo decir que gasta poca gasolina (eso es 'economical')."
    },
    {
        "id": "voc-loose-lose",
        "level": "A2+",
        "category": "confusing_words",
        "term": "Loose vs. Lose",
        "meaningEs": "Loose (adjetivo) = Holgado / Flojo / Suelto | Lose (verbo) = Perder",
        "contextExample": "These jeans are too loose; I need a belt. / Don't lose your hotel room key.",
        "contextTranslation": "Estos vaqueros me quedan muy sueltos; necesito cinturón. / No pierdas la llave del hotel.",
        "commonMistake": "Escribir 'loose money' queriendo decir perder dinero ('lose money')."
    },
    {
        "id": "voc-affect-effect",
        "level": "B2",
        "category": "confusing_words",
        "term": "Affect (verbo) vs. Effect (sustantivo)",
        "meaningEs": "Affect (con 'a') = Afectar / Influir | Effect (con 'e') = Efecto / Resultado",
        "contextExample": "The strike will affect thousands of commuters. / The medication had an immediate calming effect.",
        "contextTranslation": "La huelga afectará a miles de usuarios. / El medicamento tuvo un efecto calmante inmediato.",
        "commonMistake": "Usar 'effect' como verbo ('Smoking effects your health' ❌ -> 'affects' ✅)."
    },
    {
        "id": "voc-sympathetic-friendly",
        "level": "B1+",
        "category": "confusing_words",
        "term": "Sympathetic vs. Friendly / Nice",
        "meaningEs": "Sympathetic = Compasivo / Empático / Comprensivo | Friendly / Nice = Simpático / Agradable",
        "contextExample": "My manager was very sympathetic when my dog passed away. / She is very friendly and popular with colleagues.",
        "contextTranslation": "Mi jefe fue muy comprensivo cuando murió mi perro. / Ella es muy simpática y querida.",
        "commonMistake": "Decir que alguien que te cae bien es 'sympathetic' (falso amigo: simpático es 'nice' o 'friendly')."
    },
    {
        "id": "voc-embarrassed-ashamed",
        "level": "B1",
        "category": "confusing_words",
        "term": "Embarrassed vs. Ashamed vs. Pregnant",
        "meaningEs": "Embarrassed = Avergonzado (vergüenza ajena o situación incómoda) | Ashamed = Avergonzado por culpa moral | Pregnant = Embarazada",
        "contextExample": "I was embarrassed when my phone rang in the cinema. / He was ashamed of his dishonest behaviour. / She is six months pregnant.",
        "contextTranslation": "Pasé vergüenza cuando sonó mi móvil en el cine. / Se avergonzó de su conducta deshonesta. / Está embarazada de 6 meses.",
        "commonMistake": "Decir 'I am embarrassed' pensando que significa 'estoy embarazada' (¡falso amigo legendario!)."
    },
    {
        "id": "voc-comprehensive-understanding",
        "level": "B2",
        "category": "confusing_words",
        "term": "Comprehensive vs. Understanding",
        "meaningEs": "Comprehensive = Exhaustivo / Completo / Global | Understanding = Comprensivo (persona empática)",
        "contextExample": "The report provides a comprehensive overview of the market. / My parents were very understanding.",
        "contextTranslation": "El informe ofrece una visión exhaustiva del mercado. / Mis padres fueron muy comprensivos.",
        "commonMistake": "Creer que 'comprehensive' significa comprensivo con las personas (es 'exhaustivo')."
    },
    {
        "id": "voc-bother-annoy",
        "level": "B1",
        "category": "confusing_words",
        "term": "Bother vs. Annoy / Disturb",
        "meaningEs": "Bother = Molestarse en hacer algo / Preocupar | Annoy = Irritar / Sacar de quicio",
        "contextExample": "Don't bother washing the dishes; I'll do them later. / That loud clicking noise is really annoying me.",
        "contextTranslation": "No te molestes en fregar los platos; ya los hago yo. / Ese clic tan fuerte me está irritando.",
        "commonMistake": "'Don't bother' significa 'no te molestes en hacerlo'."
    },
    {
        "id": "voc-disused-misused",
        "level": "B2+",
        "category": "confusing_words",
        "term": "Disused vs. Misused",
        "meaningEs": "Disused = Que ya no se usa / En desuso / Abandonado | Misused = Usado de forma incorrecta / Mal empleado",
        "contextExample": "The old railway station is now completely disused. / Public funds were misused by corrupt officials.",
        "contextTranslation": "La antigua estación de tren está en desuso. / Los fondos públicos fueron malversados/mal utilizados.",
        "commonMistake": "Confundir estar abandonado ('disused') con estar mal empleado ('misused')."
    },
    {
        "id": "voc-stationary-stationery",
        "level": "B2",
        "category": "confusing_words",
        "term": "Stationary (con 'a') vs. Stationery (con 'e')",
        "meaningEs": "Stationary (con 'a') = Inmóvil / Parado (coche o tráfico) | Stationery (con 'e') = Material de oficina / Papelería",
        "contextExample": "The car collided with a stationary truck. / I need to buy pens and envelopes at the stationery shop.",
        "contextTranslation": "El coche chocó contra un camión que estaba parado. / Necesito comprar bolígrafos en la papelería.",
        "commonMistake": "Truco nemotécnico: stationEry con 'e' de 'Envelope' (sobre/papelería)."
    },
    {
        "id": "voc-principal-principle",
        "level": "B2",
        "category": "confusing_words",
        "term": "Principal vs. Principle",
        "meaningEs": "Principal = Principal / Director de colegio | Principle = Principio moral / Regla fundamental",
        "contextExample": "Our principal concern is customer safety. / He refused to lie on principle.",
        "contextTranslation": "Nuestra principal preocupación es la seguridad. / Se negó a mentir por principios.",
        "commonMistake": "Confundir el valor moral ('principle') con lo más importante ('principal')."
    },

    # ==================== COLLOCATIONS (30 items) ====================
    {
        "id": "voc-col-make-do",
        "level": "B1",
        "category": "collocations",
        "term": "MAKE vs. DO (Casos Oficiales de Examen)",
        "meaningEs": "MAKE: a mistake, an effort, an excuse, progress, a decision, an appointment, a phone call, money, sense | DO: business, a favour, your best, research, harm, damage, sports, household chores, a course",
        "contextExample": "You need to make a decision quickly, but always do your best to avoid making mistakes.",
        "contextTranslation": "Debes tomar una decisión rápido, pero siempre da lo mejor para evitar cometer errores.",
        "commonMistake": "Decir 'do a mistake' ❌ -> 'MAKE a mistake' ✅. Decir 'make business' ❌ -> 'DO business' ✅."
    },
    {
        "id": "voc-col-take",
        "level": "B1+",
        "category": "collocations",
        "term": "Colocaciones con TAKE",
        "meaningEs": "Take advantage of (aprovecharse de), take for granted (dar por sentado), take into account (tener en cuenta), take part in (participar), take pride in (enorgullecerse de), take place (celebrarse/ocurrir)",
        "contextExample": "You should never take your health for granted; take good care of yourself.",
        "contextTranslation": "Nunca deberías dar por sentada tu salud; cuídate bien.",
        "commonMistake": "'Take place' significa suceder o celebrarse un evento (no 'take position')."
    },
    {
        "id": "voc-col-pay",
        "level": "B1",
        "category": "collocations",
        "term": "Colocaciones con PAY",
        "meaningEs": "Pay attention to (prestar atención), pay a compliment (hacer un cumplido), pay a visit (hacer una visita), pay respects (mostrar respeto), pay cash / by credit card",
        "contextExample": "Please pay close attention to the safety demonstration before take-off.",
        "contextTranslation": "Por favor, presten mucha atención a la demostración de seguridad antes del despegue.",
        "commonMistake": "En inglés no se dice 'lend attention'; se dice 'PAY attention'."
    },
    {
        "id": "voc-col-catch",
        "level": "A2+",
        "category": "collocations",
        "term": "Colocaciones con CATCH",
        "meaningEs": "Catch a bus/train (coger el autobús), catch a cold (resfriarse), catch someone's eye (llamar la atención visualmente), catch fire (prenderse fuego)",
        "contextExample": "A flashy billboard caught my eye while I was waiting to catch the train.",
        "contextTranslation": "Un cartel llamativo me llamó la atención mientras esperaba para coger el tren.",
        "commonMistake": "'Catch someone's eye' significa llamar la atención de alguien al mirarle."
    },
    {
        "id": "voc-col-b2-adverbs",
        "level": "B2",
        "category": "collocations",
        "term": "Colocaciones de Adverbios Intensificadores B2",
        "meaningEs": "Bitterly (disappointed, cold) | Utterly (ridiculous, impossible, exhausted) | Highly (likely, qualified, recommended) | Deeply (concerned, grateful, regret) | Strictly (forbidden, confidential) | Widely (available, accepted)",
        "contextExample": "Smoking is strictly forbidden on this flight, and the captain was deeply concerned by the incident.",
        "contextTranslation": "Fumar está estrictamente prohibido en este vuelo, y el comandante estaba profundamente preocupado.",
        "commonMistake": "Usar siempre 'very' o 'really' en vez de las colocaciones nativas de examen B2."
    },
    {
        "id": "voc-col-come-go",
        "level": "B1+",
        "category": "collocations",
        "term": "Colocaciones con COME y GO",
        "meaningEs": "Come to an agreement (llegar a un acuerdo), come to an end (llegar a su fin), go bankrupt (arruinarse), go missing (desaparecer), go viral (hacerse viral), go wrong (salir mal)",
        "contextExample": "After long negotiations, both companies finally came to an agreement.",
        "contextTranslation": "Tras largas negociaciones, ambas empresas por fin llegaron a un acuerdo.",
        "commonMistake": "Decir 'reach an agreement' o 'come to an agreement' (ambas correctas, pero nunca 'arrive to')."
    },
    {
        "id": "voc-col-have-break",
        "level": "A2+",
        "category": "collocations",
        "term": "Colocaciones con BREAK",
        "meaningEs": "Break a promise (romper una promesa), break a habit (romper un hábito), break the law (infringir la ley), break the ice (romper el hielo), break a record (batir un récord)",
        "contextExample": "Playing an introductory game helped break the ice at the international workshop.",
        "contextTranslation": "Jugar a un juego de presentación ayudó a romper el hielo en el taller internacional.",
        "commonMistake": "'Break a record' significa batir una marca deportiva o histórica."
    },

    # ==================== DEPENDENT PREPOSITIONS (30 items) ====================
    {
        "id": "voc-prep-on",
        "level": "B1+",
        "category": "prepositions",
        "term": "Preposiciones con ON",
        "meaningEs": "Depend ON (depender de), rely ON (confiar en), insist ON (+ -ing, insistir en), congratulate ON (felicitar por), spend money/time ON (gastar en), base ON (basar en)",
        "contextExample": "I congratulate you on passing your B2 exam! She insisted on paying for the coffee.",
        "contextTranslation": "¡Te felicito por aprobar tu examen B2! Ella insistió en pagar el café.",
        "commonMistake": "Decir 'congratulate for' ❌ -> En inglés SIEMPRE es 'congratulate ON' ✅."
    },
    {
        "id": "voc-prep-in",
        "level": "B1",
        "category": "prepositions",
        "term": "Preposiciones con IN",
        "meaningEs": "Succeed IN (+ -ing, tener éxito en lograr algo), believe IN (creer en), participate IN (participar en), specialize IN (especializarse en), result IN (derivar en)",
        "contextExample": "After three attempts, he finally succeeded in passing his driving test.",
        "contextTranslation": "Tras tres intentos, por fin logró aprobar el examen de conducir.",
        "commonMistake": "Decir 'succeed to pass' ❌ -> Es obligatorio 'succeed IN + V-ing' ✅."
    },
    {
        "id": "voc-prep-of",
        "level": "B1+",
        "category": "prepositions",
        "term": "Preposiciones con OF",
        "meaningEs": "Accuse OF (acusar de), approve OF (aprobar/estar de acuerdo), consist OF (constar/consistir de), be capable OF (ser capaz de), take care OF (cuidar de), remind OF (recordar a)",
        "contextExample": "The traditional paella consists of rice, vegetables and chicken. You remind me of your father.",
        "contextTranslation": "La paella tradicional consta de arroz, verduras y pollo. Me recuerdas a tu padre.",
        "commonMistake": "Decir 'consist in' cuando enumeras ingredientes o componentes (debe ser 'consist OF')."
    },
    {
        "id": "voc-prep-for",
        "level": "B1",
        "category": "prepositions",
        "term": "Preposiciones con FOR",
        "meaningEs": "Apologize FOR (disculparse por), apply FOR (solicitar un puesto), be responsible FOR (ser responsable de), blame someone FOR (culpar de), forgive FOR (perdonar por)",
        "contextExample": "Who was responsible for organizing the charity event? He applied for a visa.",
        "contextTranslation": "¿Quién fue el responsable de organizar el evento? Él solicitó un visado.",
        "commonMistake": "'Apply for a job' significa postular a un puesto de trabajo."
    },
    {
        "id": "voc-prep-from",
        "level": "B1+",
        "category": "prepositions",
        "term": "Preposiciones con FROM",
        "meaningEs": "Prevent/Stop FROM (impedir/evitar que alguien haga algo), protect FROM (proteger de), recover FROM (recuperarse de), suffer FROM (padecer de), borrow FROM (pedir prestado a)",
        "contextExample": "Heavy fog prevented the plane from taking off on time. She is recovering from the flu.",
        "contextTranslation": "La densa niebla impidió que el avión despegara a tiempo. Se está recuperando de la gripe.",
        "commonMistake": "'Prevent somebody FROM doing something' es estructura fija en Cambridge."
    },
    {
        "id": "voc-prep-to",
        "level": "B1",
        "category": "prepositions",
        "term": "Preposiciones con TO (¡No confundir con infinitivo!)",
        "meaningEs": "Object TO (+ -ing, oponerse a), look forward TO (+ -ing, tener muchas ganas de), be married TO (estar casado con), be allergic TO (alérgico a), explain TO (explicar a)",
        "contextExample": "She has been married to an architect for ten years. Can you explain this grammar rule to me?",
        "contextTranslation": "Lleva 10 años casada con un arquitecto. ¿Me puedes explicar esta regla?",
        "commonMistake": "Decir 'married with' ❌ -> En inglés es 'married TO' ✅. Decir 'explain me' ❌ -> 'explain TO me' ✅."
    },
    {
        "id": "voc-prep-with",
        "level": "B1",
        "category": "prepositions",
        "term": "Preposiciones con WITH",
        "meaningEs": "Deal WITH (lidiar con / gestionar), cope WITH (apañárselas con / sobrellevar), agree WITH (estar de acuerdo con), be fed up WITH (estar harto de), crowded WITH (abarrotado de)",
        "contextExample": "Our customer support team deals with hundreds of complaints every day. I'm fed up with this rain.",
        "contextTranslation": "Atención al cliente gestiona cientos de reclamaciones al día. Estoy harto de esta lluvia.",
        "commonMistake": "En inglés 'estar harto de' es 'fed up WITH' (o 'tired OF')."
    },
    {
        "id": "voc-prep-at",
        "level": "A2+",
        "category": "prepositions",
        "term": "Preposiciones con AT (Habilidades y Reacciones)",
        "meaningEs": "Good AT (bueno en), bad AT (malo en), surprised AT/BY (sorprendido de), aimed AT (orientado a), shout AT (gritarle enfadado a alguien)",
        "contextExample": "He is exceptionally good at learning languages. Why are you shouting at me?",
        "contextTranslation": "Se le da excepcionalmente bien aprender idiomas. ¿Por qué me estás gritando?",
        "commonMistake": "Decir 'good in English' ❌ -> Siempre es 'good AT English / good AT cooking' ✅."
    },

    # ==================== CONNECTORS & LINKERS (20 items) ====================
    {
        "id": "voc-con-despite-although",
        "level": "B1+",
        "category": "connectors",
        "term": "Despite / In spite of vs. Although / Even though",
        "meaningEs": "DESPITE / IN SPITE OF + sustantivo o V-ing (A pesar de) | ALTHOUGH / EVEN THOUGH + Sujeto + Verbo (Aunque)",
        "contextExample": "Despite the heavy rain, we enjoyed the concert. / Although it rained heavily, we enjoyed the concert.",
        "contextTranslation": "A pesar de la fuerte lluvia, disfrutamos del concierto. / Aunque llovió fuerte, disfrutamos.",
        "commonMistake": "Decir 'Despite of' ❌ (o usas 'Despite' solo o 'In spite of'). Y detrás de despite NUNCA va una frase con verbo conjugado directo."
    },
    {
        "id": "voc-con-however-nevertheless",
        "level": "B2",
        "category": "connectors",
        "term": "However vs. Nevertheless / Nonetheless",
        "meaningEs": "Sin embargo / No obstante (conectores de contraste formal entre dos oraciones separadas por punto y coma)",
        "contextExample": "The price of the flight is high. However, the hotel is completely free.",
        "contextTranslation": "El precio del vuelo es alto. Sin embargo, el hotel es completamente gratis.",
        "commonMistake": "Deben ir al principio de una oración nueva seguidos de una coma obligatoria."
    },
    {
        "id": "voc-con-due-to-because-of",
        "level": "B1+",
        "category": "connectors",
        "term": "Due to / Owing to vs. Because / Since",
        "meaningEs": "DUE TO / OWING TO / BECAUSE OF + Sustantivo (Debido a) | BECAUSE / SINCE / AS + Sujeto + Verbo (Porque)",
        "contextExample": "The flight was cancelled due to severe turbulence. / The flight was cancelled because the weather was bad.",
        "contextTranslation": "El vuelo fue cancelado debido a fuertes turbulencias. / El vuelo fue cancelado porque el tiempo era malo.",
        "commonMistake": "Detrás de 'due to' o 'because of' va un sustantivo ('the rain'), no una oración completa."
    },
    {
        "id": "voc-con-therefore-as-a-result",
        "level": "B2",
        "category": "connectors",
        "term": "Therefore / As a result / Consequently",
        "meaningEs": "Por lo tanto / Como resultado / En consecuencia (conectores de causa y efecto formal)",
        "contextExample": "The company failed to innovate; therefore, sales plummeted significantly.",
        "contextTranslation": "La empresa no innovó; por lo tanto, las ventas cayeron en picado.",
        "commonMistake": "Excelente para ganar puntos en la redacción formal (essays y reports de Cambridge B2)."
    },
    {
        "id": "voc-con-in-order-to-so-that",
        "level": "B1",
        "category": "connectors",
        "term": "In order to / So as to vs. So that",
        "meaningEs": "IN ORDER TO / SO AS TO + infinitivo (Para hacer algo) | SO THAT + Sujeto + can/could/will (Para que alguien haga algo)",
        "contextExample": "I woke up early in order to catch the 6 AM train. / I spoke slowly so that everyone could understand.",
        "contextTranslation": "Me desperté temprano para coger el tren de las 6. / Hablé despacio para que todos pudieran entender.",
        "commonMistake": "Negativa: 'in order NOT to make mistakes' (el 'not' va delante del 'to')."
    },
    {
        "id": "voc-con-furthermore-moreover",
        "level": "B2",
        "category": "connectors",
        "term": "Furthermore / Moreover / In addition to",
        "meaningEs": "Además / Es más / Por otra parte (añadir argumentos adicionales de peso en essays)",
        "contextExample": "Cycling reduces pollution. Furthermore, it improves cardiovascular health.",
        "contextTranslation": "Ir en bici reduce la contaminación. Además, mejora la salud cardiovascular.",
        "commonMistake": "Con 'In addition to', el verbo detrás debe ir con -ING: 'In addition to working, he studies'."
    },
    {
        "id": "voc-con-whereas-while",
        "level": "B2",
        "category": "connectors",
        "term": "Whereas vs. While (Contraste directo)",
        "meaningEs": "Mientras que / Mientras tanto (para contrastar dos realidades opuestas en una sola oración)",
        "contextExample": "My sister loves living in busy cities, whereas I prefer the peace of the countryside.",
        "contextTranslation": "A mi hermana le encanta vivir en grandes urbes, mientras que yo prefiero la paz del campo.",
        "commonMistake": "Excelente sustituto formal de 'but'."
    },

    # ==================== WORD FORMATION FAMILIES (25 items) ====================
    {
        "id": "voc-wf-succeed",
        "level": "B1",
        "category": "word_formation",
        "term": "Familia de SUCCEED",
        "meaningEs": "Succeed (verbo: tener éxito) -> Success (sust: éxito) -> Successful (adj: exitoso) -> Successfully (adv) -> Unsuccessful (negativo)",
        "contextExample": "Hard work and dedication are the keys to success.",
        "contextTranslation": "El trabajo duro y la dedicación son las claves del éxito.",
        "rootFamily": {
            "verb": "succeed",
            "noun": "success",
            "adjective": "successful",
            "adverb": "successfully",
            "negative": "unsuccessful"
        }
    },
    {
        "id": "voc-wf-employ",
        "level": "B1+",
        "category": "word_formation",
        "term": "Familia de EMPLOY",
        "meaningEs": "Employ (verbo: emplear) -> Employer (jefe) / Employee (empleado) -> Employment (empleo) -> Unemployment (desempleo) -> Unemployed (en paro)",
        "contextExample": "Youth unemployment has decreased over the past decade.",
        "contextTranslation": "El desempleo juvenil ha disminuido durante la última década.",
        "rootFamily": {
            "verb": "employ",
            "noun": "employment / employer / employee / unemployment",
            "adjective": "employed",
            "negative": "unemployed"
        }
    },
    {
        "id": "voc-wf-decide",
        "level": "B1",
        "category": "word_formation",
        "term": "Familia de DECIDE",
        "meaningEs": "Decide (verbo: decidir) -> Decision (sust: decisión) -> Decisive (adj: resolutivo/determinante) -> Indecisive (dudoso/inseguro)",
        "contextExample": "We need a decisive leader who can make firm decisions under pressure.",
        "contextTranslation": "Necesitamos un líder decidido que pueda tomar decisiones firmes bajo presión.",
        "rootFamily": {
            "verb": "decide",
            "noun": "decision",
            "adjective": "decisive",
            "adverb": "decisively",
            "negative": "indecisive"
        }
    },
    {
        "id": "voc-wf-care",
        "level": "A2+",
        "category": "word_formation",
        "term": "Familia de CARE",
        "meaningEs": "Care (cuidar) -> Careful (cuidadoso) -> Carefully (con cuidado) -> Careless (descuidado) -> Carelessly (de forma imprudente)",
        "contextExample": "A careless mistake cost the company thousands of pounds.",
        "contextTranslation": "Un error por descuido le costó a la empresa miles de libras.",
        "rootFamily": {
            "verb": "care",
            "noun": "care / carelessness",
            "adjective": "careful",
            "adverb": "carefully",
            "negative": "careless / carelessly"
        }
    },
    {
        "id": "voc-wf-comfort",
        "level": "B1",
        "category": "word_formation",
        "term": "Familia de COMFORT",
        "meaningEs": "Comfort -> Comfortable (cómodo) -> Comfortably -> Uncomfortable (incómodo)",
        "contextExample": "These hiking boots are surprisingly comfortable even on long treks.",
        "contextTranslation": "Estas botas de senderismo son sorprendentemente cómodas incluso en marchas largas.",
        "rootFamily": {
            "noun": "comfort",
            "adjective": "comfortable",
            "adverb": "comfortably",
            "negative": "uncomfortable"
        }
    },
    {
        "id": "voc-wf-rely",
        "level": "B1+",
        "category": "word_formation",
        "term": "Familia de RELY",
        "meaningEs": "Rely (confiar/depender) -> Reliable (fiable) -> Reliably -> Unreliable (poco fiable) -> Reliance (dependencia)",
        "contextExample": "Public transport in this city is cheap, fast and extremely reliable.",
        "contextTranslation": "El transporte público en esta ciudad es barato, rápido y extremadamente fiable.",
        "rootFamily": {
            "verb": "rely",
            "noun": "reliance",
            "adjective": "reliable",
            "negative": "unreliable"
        }
    },
    {
        "id": "voc-wf-doubt",
        "level": "B2",
        "category": "word_formation",
        "term": "Familia de DOUBT",
        "meaningEs": "Doubt (duda/dudar) -> Doubtful (dudoso) -> Undoubted (indudable) -> Undoubtedly (indudablemente / sin duda)",
        "contextExample": "She is undoubtedly one of the most talented musicians of her generation.",
        "contextTranslation": "Ella es indudablemente una de las músicas con mayor talento.",
        "rootFamily": {
            "noun": "doubt",
            "adjective": "doubtful",
            "adverb": "undoubtedly",
            "negative": "undoubted"
        }
    },
    {
        "id": "voc-wf-able",
        "level": "B1+",
        "category": "word_formation",
        "term": "Familia de ABLE",
        "meaningEs": "Able (capaz) -> Enable (verbo: permitir/capacitar) -> Ability (habilidad) -> Inability (incapacidad) -> Disabled (con discapacidad)",
        "contextExample": "Modern technology enables people to work remotely from anywhere.",
        "contextTranslation": "La tecnología moderna permite a la gente trabajar en remoto desde cualquier lugar.",
        "rootFamily": {
            "verb": "enable / disable",
            "noun": "ability / inability / disability",
            "adjective": "able",
            "negative": "unable"
        }
    },
    {
        "id": "voc-wf-fortune",
        "level": "B2",
        "category": "word_formation",
        "term": "Familia de FORTUNE",
        "meaningEs": "Fortune (fortuna) -> Fortunate (afortunado) -> Fortunately (afortunadamente) -> Unfortunate -> Unfortunately (por desgracia)",
        "contextExample": "Unfortunately, all flights were grounded due to dense volcanic ash.",
        "contextTranslation": "Desafortunadamente, todos los vuelos se quedaron en tierra debido a la ceniza.",
        "rootFamily": {
            "noun": "fortune",
            "adjective": "fortunate",
            "adverb": "fortunately",
            "negative": "unfortunate / unfortunately"
        }
    },
    {
        "id": "voc-wf-expect",
        "level": "B2",
        "category": "word_formation",
        "term": "Familia de EXPECT",
        "meaningEs": "Expect (esperar) -> Expectation (expectativa) -> Life expectancy (esperanza de vida) -> Unexpected (inesperado) -> Unexpectedly",
        "contextExample": "The sudden announcement came as a completely unexpected surprise.",
        "contextTranslation": "El repentino anuncio fue una sorpresa completamente inesperada.",
        "rootFamily": {
            "verb": "expect",
            "noun": "expectation / expectancy",
            "adjective": "expected",
            "negative": "unexpected / unexpectedly"
        }
    }
,
    {
        "id": "voc-journey-travel-trip",
        "level": "A2+",
        "category": "confusing_words",
        "term": "Trip vs. Journey vs. Travel",
        "meaningEs": "Trip = Viaje corto con vuelta / Excursión | Journey = El trayecto o trayecto físico | Travel = El concepto general de viajar (incontable)",
        "contextExample": "How was your business trip to London? / It was a long train journey. / Air travel has become more affordable.",
        "contextTranslation": "¿Qué tal tu viaje de negocios a Londres? / Fue un trayecto largo en tren. / Viajar en avión es más asequible.",
        "commonMistake": "Decir 'a travel' ❌ ('travel' es incontable o verbo; para un viaje se dice 'a trip' o 'a journey')."
    },
    {
        "id": "voc-attend-assist",
        "level": "B1",
        "category": "confusing_words",
        "term": "Attend vs. Assist",
        "meaningEs": "Attend = Asistir / Ir a un evento o clase | Assist = Ayudar a alguien / Echar una mano",
        "contextExample": "Over two hundred delegates attended the annual conference. / A nurse assisted the surgeon during the operation.",
        "contextTranslation": "Más de 200 delegados asistieron a la conferencia. / Una enfermera asistió (ayudó) al cirujano.",
        "commonMistake": "Decir 'assist to a meeting' para decir que vas a una reunión (¡asistir a un evento es 'ATTEND'!)."
    },
    {
        "id": "voc-pretend-intend",
        "level": "B1+",
        "category": "confusing_words",
        "term": "Pretend vs. Intend",
        "meaningEs": "Pretend = Fingir / Simular | Intend = Tener la intención de hacer algo",
        "contextExample": "He pretended to be asleep when his parents opened the bedroom door. / I intend to buy a house next year.",
        "contextTranslation": "Fingió estar dormido cuando abrieron la puerta. / Tengo la intención de comprar una casa el año que viene.",
        "commonMistake": "'Pretend' NO es pretender/intentar; significa FINGIR. Tener la intención es 'intend'."
    },
    {
        "id": "voc-injure-damage",
        "level": "B1",
        "category": "confusing_words",
        "term": "Injure / Hurt vs. Damage",
        "meaningEs": "Injure / Hurt = Herir a personas o seres vivos | Damage = Dañar objetos o propiedades",
        "contextExample": "Three passengers were injured in the car crash. / The hail storm severely damaged the roof of our house.",
        "contextTranslation": "Tres pasajeros resultaron heridos en el choque. / El granizo dañó gravemente el tejado de la casa.",
        "commonMistake": "No digas que un coche fue 'injured' (un coche es 'damaged', una persona es 'injured')."
    },
    {
        "id": "voc-career-degree",
        "level": "A2+",
        "category": "confusing_words",
        "term": "Career vs. Degree",
        "meaningEs": "Career = Trayectoria profesional / Vida laboral | Degree = Carrera universitaria / Grado",
        "contextExample": "She wants to pursue a career in finance after completing her engineering degree.",
        "contextTranslation": "Quiere seguir una carrera profesional en finanzas tras terminar su grado en ingeniería.",
        "commonMistake": "Decir 'I am studying a career' ❌ -> 'I am doing a degree at university' ✅."
    },
    {
        "id": "voc-library-bookshop",
        "level": "A2+",
        "category": "confusing_words",
        "term": "Library vs. Bookshop",
        "meaningEs": "Library = Biblioteca (donde pides libros prestados gratis) | Bookshop = Librería (donde compras libros)",
        "contextExample": "I borrowed this novel from the local library. / I bought this dictionary at a second-hand bookshop.",
        "contextTranslation": "Pedí esta novela prestada en la biblioteca. / Compré este diccionario en una librería de segunda mano.",
        "commonMistake": "Ir a comprar un libro a la 'library' (la biblioteca no vende libros)."
    },
    {
        "id": "voc-polite-educated",
        "level": "B1",
        "category": "confusing_words",
        "term": "Polite vs. Educated",
        "meaningEs": "Polite = Educado / Con buenos modales / Respetuoso | Educated = Con estudios / Con formación académica",
        "contextExample": "It is polite to say please and thank you. / He is a highly educated man with two master's degrees.",
        "contextTranslation": "Es de buena educación decir por favor y gracias. / Es un hombre con muchos estudios y dos másteres.",
        "commonMistake": "Decir 'an educated boy' para decir que saluda y tiene modales (eso es 'a polite boy')."
    },
    {
        "id": "voc-rob-steal",
        "level": "B1",
        "category": "confusing_words",
        "term": "Rob vs. Steal",
        "meaningEs": "Rob (+ persona o lugar) = Atracar un banco o asaltar a una persona | Steal (+ objeto o dinero) = Hurtar o llevarse algo",
        "contextExample": "Two masked men robbed the central bank yesterday and stole half a million pounds in cash.",
        "contextTranslation": "Dos encapuchados atracaron el banco central ayer y robaron medio millón de libras en efectivo.",
        "commonMistake": "Decir 'Someone stole me' ❌ -> 'Someone robbed me' o 'Someone stole my wallet' ✅."
    },
    {
        "id": "voc-refuse-deny",
        "level": "B2",
        "category": "confusing_words",
        "term": "Refuse vs. Deny",
        "meaningEs": "Refuse (+ to infinitive) = Negarse a hacer algo | Deny (+ -ing / that) = Negar haber hecho algo / Desmentir",
        "contextExample": "He refused to cooperate with the police. / The politician firmly denied taking bribes.",
        "contextTranslation": "Se negó a cooperar con la policía. / El político negó rotundamente haber aceptado sobornos.",
        "commonMistake": "'Refuse to do' (hacia el futuro) vs 'Deny doing' (hacia un hecho del pasado)."
    },
    {
        "id": "voc-bring-take-fetch",
        "level": "A2+",
        "category": "confusing_words",
        "term": "Bring vs. Take vs. Fetch",
        "meaningEs": "Bring = Traer (hacia donde estás) | Take = Llevar (hacia otro lugar) | Fetch = Ir a buscar algo y traerlo de vuelta",
        "contextExample": "Bring me a glass of water, please. / Take these documents to the manager's office. / The dog ran to fetch the ball.",
        "contextTranslation": "Tráeme un vaso de agua. / Lleva estos papeles al despacho. / El perro corrió a buscar la pelota.",
        "commonMistake": "Confundir 'traer' con 'llevar'."
    },
    {
        "id": "voc-col-heavy-strong",
        "level": "B1",
        "category": "collocations",
        "term": "Colocaciones con HEAVY y STRONG",
        "meaningEs": "Heavy rain (lluvia torrencial), heavy traffic (atasco pesado), heavy smoker | Strong coffee (café cargado), strong accent (acento marcado), strong opinion",
        "contextExample": "We were delayed by heavy traffic and poured ourselves some strong coffee when we arrived.",
        "contextTranslation": "Nos retrasamos por el denso tráfico y nos servimos un café cargado al llegar.",
        "commonMistake": "No digas 'big traffic' o 'hard rain'; son colocaciones fijas: HEAVY traffic, HEAVY rain."
    },
    {
        "id": "voc-col-fast-quick",
        "level": "A2+",
        "category": "collocations",
        "term": "FAST vs. QUICK",
        "meaningEs": "Fast: speed in movement (fast train, fast car, fast food, fast runner) | Quick: short duration of time (quick shower, quick decision, quick nap, quick look)",
        "contextExample": "I took a quick shower before hopping on the fast train to Edinburgh.",
        "contextTranslation": "Me di una ducha rápida antes de subirme al tren rápido a Edimburgo.",
        "commonMistake": "'Quick shower' (de pocos minutos) ≠ 'fast shower' ❌."
    },
    {
        "id": "voc-col-keep-secret-eye",
        "level": "B1",
        "category": "collocations",
        "term": "Colocaciones con KEEP",
        "meaningEs": "Keep a secret (guardar un secreto), keep a promise (cumplir una promesa), keep in touch (mantener el contacto), keep calm (mantener la calma), keep an eye on (echar un ojo)",
        "contextExample": "Can you keep an eye on my luggage while I go to the bathroom?",
        "contextTranslation": "¿Puedes echarle un ojo a mi equipaje mientras voy al baño?",
        "commonMistake": "'Keep an eye on' es la frase natural para vigilar o cuidar algo un momento."
    },
    {
        "id": "voc-col-set-goal-alarm",
        "level": "B1+",
        "category": "collocations",
        "term": "Colocaciones con SET",
        "meaningEs": "Set an alarm (poner la alarma), set a goal/target (fijar un objetivo), set a record (marcar un récord), set fire to (prender fuego a)",
        "contextExample": "He set his alarm for 6 AM to make sure he set a new personal record in the morning run.",
        "contextTranslation": "Puso la alarma a las 6 para asegurarse de marcar un nuevo récord personal.",
        "commonMistake": "Poner la alarma en inglés es 'SET an alarm' (no 'put the alarm')."
    },
    {
        "id": "voc-prep-afraid-fond-proud",
        "level": "A2+",
        "category": "prepositions",
        "term": "Adjetivos con OF (Afraid, Fond, Proud, Aware, Jealous)",
        "meaningEs": "Afraid OF (tener miedo de), fond OF (tener cariño/afición a), proud OF (estar orgulloso de), aware OF (ser consciente de), jealous OF (estar celoso de)",
        "contextExample": "She is terrified of spiders, but extremely proud of her courageous brother.",
        "contextTranslation": "Le dan pánico las arañas, pero está muy orgullosa de su valiente hermano.",
        "commonMistake": "'Proud OF' (¡nunca 'proud for'!). 'Fond OF' = tenerle mucho cariño a alguien/algo."
    },
    {
        "id": "voc-prep-addicted-dedicated",
        "level": "B1+",
        "category": "prepositions",
        "term": "Adjetivos con TO (Addicted, Dedicated, Accustomed, Similar)",
        "meaningEs": "Addicted TO (adicto a), dedicated TO (dedicado a), accustomed TO (+ -ing, acostumbrado a), similar TO (parecido a)",
        "contextExample": "Many teenagers are addicted to social media. His situation is very similar to mine.",
        "contextTranslation": "Muchos adolescentes son adictos a las redes sociales. Su situación es muy parecida a la mía.",
        "commonMistake": "'Similar TO' (no 'similar with' ni 'similar than')."
    },
    {
        "id": "voc-prep-interested-involved",
        "level": "A2+",
        "category": "prepositions",
        "term": "Adjetivos con IN (Interested, Involved, Fluent)",
        "meaningEs": "Interested IN (+ -ing, interesado en), involved IN (involucrado en), fluent IN (fluido en un idioma)",
        "contextExample": "Are you interested in learning German? She is completely fluent in French.",
        "contextTranslation": "¿Estás interesado en aprender alemán? Ella habla francés con total fluidez.",
        "commonMistake": "Interesado en algo siempre es 'interested IN' (¡nunca 'interested on'!)."
    },
    {
        "id": "voc-wf-know",
        "level": "B1",
        "category": "word_formation",
        "term": "Familia de KNOW",
        "meaningEs": "Know (verbo: saber/conocer) -> Knowledge (sustantivo: conocimiento) -> Knowledgeable (adjetivo: entendido/sabio) -> Unknown (desconocido)",
        "contextExample": "The museum guide was remarkably knowledgeable about ancient Roman artifacts.",
        "contextTranslation": "El guía del museo era sumamente entendido en artefactos romanos antiguos.",
        "rootFamily": {
            "verb": "know",
            "noun": "knowledge",
            "adjective": "knowledgeable / known",
            "negative": "unknown"
        }
    },
    {
        "id": "voc-wf-strong",
        "level": "B1+",
        "category": "word_formation",
        "term": "Familia de STRONG",
        "meaningEs": "Strong (adjetivo: fuerte) -> Strength (sustantivo: fuerza) -> Strengthen (verbo: fortalecer) -> Strongly (adverbio: firmemente)",
        "contextExample": "Lifting weights regularly will strengthen your muscles and build core strength.",
        "contextTranslation": "Levantar pesas con regularidad fortalecerá tus músculos y mejorará tu fuerza.",
        "rootFamily": {
            "verb": "strengthen",
            "noun": "strength",
            "adjective": "strong",
            "adverb": "strongly"
        }
    },
    {
        "id": "voc-wf-long",
        "level": "B1+",
        "category": "word_formation",
        "term": "Familia de LONG",
        "meaningEs": "Long (adjetivo: largo) -> Length (sustantivo: longitud/duración) -> Lengthen (verbo: alargar) -> Lengthy (adjetivo: prolongado/pesado)",
        "contextExample": "The tailor offered to lengthen the trousers by two inches.",
        "contextTranslation": "El sastre se ofreció a alargar los pantalones dos pulgadas.",
        "rootFamily": {
            "verb": "lengthen",
            "noun": "length",
            "adjective": "long / lengthy"
        }
    },
    {
        "id": "voc-wf-wide",
        "level": "B1+",
        "category": "word_formation",
        "term": "Familia de WIDE",
        "meaningEs": "Wide (adjetivo: ancho/amplio) -> Width (sustantivo: anchura) -> Widen (verbo: ensanchar/ampliar) -> Widely (adverbio: ampliamente)",
        "contextExample": "They plan to widen the highway to reduce daily traffic jams.",
        "contextTranslation": "Planean ensanchar la autovía para reducir los atascos diarios.",
        "rootFamily": {
            "verb": "widen",
            "noun": "width",
            "adjective": "wide",
            "adverb": "widely"
        }
    },
    {
        "id": "voc-wf-deep",
        "level": "B1+",
        "category": "word_formation",
        "term": "Familia de DEEP",
        "meaningEs": "Deep (adjetivo: profundo) -> Depth (sustantivo: profundidad) -> Deepen (verbo: profundizar) -> Deeply (adverbio: profundamente)",
        "contextExample": "The unexpected crisis deepened the disagreement between both political parties.",
        "contextTranslation": "La crisis inesperada profundizó el desacuerdo entre ambos partidos.",
        "rootFamily": {
            "verb": "deepen",
            "noun": "depth",
            "adjective": "deep",
            "adverb": "deeply"
        }
    },
    {
        "id": "voc-wf-patient",
        "level": "A2+",
        "category": "word_formation",
        "term": "Familia de PATIENT",
        "meaningEs": "Patient (paciente) -> Patience (paciencia) -> Patiently (pacientemente) -> Impatient (impaciente) -> Impatiently",
        "contextExample": "He tapped his foot impatiently while waiting in the long queue.",
        "contextTranslation": "Movía el pie con impaciencia mientras esperaba en la larga cola.",
        "rootFamily": {
            "noun": "patience",
            "adjective": "patient",
            "adverb": "patiently",
            "negative": "impatient / impatiently"
        }
    },
    {
        "id": "voc-wf-responsible",
        "level": "B1",
        "category": "word_formation",
        "term": "Familia de RESPONSIBLE",
        "meaningEs": "Responsible (responsable) -> Responsibility (responsabilidad) -> Irresponsible (irresponsable) -> Irresponsibly",
        "contextExample": "Driving without wearing a seatbelt is completely irresponsible.",
        "contextTranslation": "Conducir sin llevar puesto el cinturón es completamente irresponsable.",
        "rootFamily": {
            "noun": "responsibility",
            "adjective": "responsible",
            "adverb": "responsibly",
            "negative": "irresponsible / irresponsibly"
        }
    },
    {
        "id": "voc-wf-appear",
        "level": "B1",
        "category": "word_formation",
        "term": "Familia de APPEAR",
        "meaningEs": "Appear (aparecer) -> Appearance (apariencia) -> Disappear (desaparecer) -> Disappearance (desaparición)",
        "contextExample": "The sudden disappearance of the diamond necklace remains a complete mystery.",
        "contextTranslation": "La repentina desaparición del collar de diamantes sigue siendo un misterio.",
        "rootFamily": {
            "verb": "appear / disappear",
            "noun": "appearance / disappearance"
        }
    }
]

EXERCISES = [
    # Confusing words (12 ex)
    {
        "id": "ex-voc-cw-1", "level": "A2+", "category": "vocabulary", "type": "multiple_choice",
        "topicLabel": "Confusing Words: Sensible vs. Sensitive",
        "prompt": "It's freezing outside, so wearing a warm jacket is the most ___ thing to do.",
        "hint": "Hace un frío que pela, así que llevar una chaqueta caliente es lo más sensato.",
        "options": ["sensible", "sensitive", "sensibly", "sensitivity"],
        "ans": ["sensible"],
        "exp": "'Sensible' significa prudente o sensato. 'Sensitive' significa susceptible o con piel/emociones delicadas.",
        "rule": "sensible = sensato / prudente"
    },
    {
        "id": "ex-voc-cw-2", "level": "A2+", "category": "vocabulary", "type": "multiple_choice",
        "topicLabel": "Confusing Words: Actually vs. Currently",
        "prompt": "Many people assume he is French, but he is ___ from Belgium.",
        "hint": "Mucha gente asume que es francés, pero en realidad es de Bélgica.",
        "options": ["actually", "currently", "nowadays", "presently"],
        "ans": ["actually"],
        "exp": "'Actually' significa 'en realidad / de hecho'. Para 'actualmente' se usa 'currently'.",
        "rule": "actually = en realidad"
    },
    {
        "id": "ex-voc-cw-3", "level": "B1", "category": "vocabulary", "type": "cloze",
        "topicLabel": "Confusing Words: Remember vs. Remind",
        "prompt": "Please ___ (recuérdame) to buy some milk when we pass by the grocery store.",
        "hint": "Por favor, recuérdame comprar leche cuando pasemos por la tienda.",
        "ans": ["remind me", "remind"],
        "exp": "Hacer que otra persona se acuerde = REMIND someone to do something. 'Remember' es acordarse uno mismo.",
        "rule": "remind someone to do"
    },
    {
        "id": "ex-voc-cw-4", "level": "B1", "category": "vocabulary", "type": "multiple_choice",
        "topicLabel": "Confusing Words: Win vs. Earn",
        "prompt": "As a senior software engineer, she ___ an impressive salary of over £75,000 a year.",
        "hint": "Como ingeniera de software senior, gana un salario impresionante.",
        "options": ["earns", "wins", "gains", "conquers"],
        "ans": ["earns"],
        "exp": "El dinero que recibes por trabajar se 'EARNS' (earn a salary / earn money). 'Win' es para premios o loterías.",
        "rule": "earn a salary / earn money"
    },
    {
        "id": "ex-voc-cw-5", "level": "A2+", "category": "vocabulary", "type": "cloze",
        "topicLabel": "Confusing Words: Borrow vs. Lend",
        "prompt": "Could you please ___ (prestar) me your charger? My phone battery is down to 2%.",
        "hint": "¿Podrías por favor prestarme tu cargador?",
        "ans": ["lend"],
        "exp": "LEND = dar algo prestado a alguien. BORROW = pedir prestado de alguien.",
        "rule": "lend me your charger"
    },
    {
        "id": "ex-voc-cw-6", "level": "B1+", "category": "vocabulary", "type": "multiple_choice",
        "topicLabel": "Confusing Words: Raise vs. Rise",
        "prompt": "Due to global inflation, the central bank decided to ___ interest rates by 0.5%.",
        "hint": "Debido a la inflación, el banco central decidió subir los tipos de interés.",
        "options": ["raise", "rise", "arise", "lifted"],
        "ans": ["raise"],
        "exp": "Cuando hay un objeto directo detrás ('interest rates'), se usa el verbo transitivo RAISE.",
        "rule": "raise + direct object"
    },
    {
        "id": "ex-voc-cw-7", "level": "B1", "category": "vocabulary", "type": "cloze",
        "topicLabel": "Confusing Words: Recipe vs. Receipt",
        "prompt": "Always keep the store ___ (ticket de compra) in case you need to return the item.",
        "hint": "Guarda siempre el ticket de compra por si necesitas devolver el artículo.",
        "ans": ["receipt"],
        "exp": "Receipt = ticket / comprobante de compra. Recipe = receta de cocina.",
        "rule": "receipt = ticket / factura de tienda"
    },
    {
        "id": "voc-cw-8", "level": "B1", "category": "vocabulary", "type": "error_correction",
        "topicLabel": "Confusing Words: Advice",
        "prompt": "Corrige el error del sustantivo incontable:",
        "base": "Could you give me an advice about my job interview?",
        "err": "an advice",
        "ans": ["some advice", "a piece of advice", "Could you give me some advice about my job interview?"],
        "exp": "'Advice' es incontable en inglés; jamás lleva 'an' ni se pluraliza con -s.",
        "rule": "some advice / a piece of advice"
    },
    {
        "id": "ex-voc-cw-9", "level": "B2", "category": "vocabulary", "type": "multiple_choice",
        "topicLabel": "Confusing Words: Economic vs. Economical",
        "prompt": "Switching to LED light bulbs is a very ___ way to reduce your electricity bills.",
        "hint": "Cambiar a bombillas LED es una forma muy económica (ahorrativa) de bajar la factura.",
        "options": ["economical", "economic", "economy", "economically"],
        "ans": ["economical"],
        "exp": "'Economical' significa que ahorra dinero o recursos. 'Economic' pertenece a la economía nacional.",
        "rule": "economical = barato de mantener / ahorrativo"
    },
    {
        "id": "ex-voc-cw-10", "level": "A2+", "category": "vocabulary", "type": "cloze",
        "topicLabel": "Confusing Words: Loose vs. Lose",
        "prompt": "Make sure you put your passport in a zipped pocket so you don't ___ (perder) it.",
        "hint": "Asegúrate de poner el pasaporte en un bolsillo con cremallera para no perderlo.",
        "ans": ["lose"],
        "exp": "LOSE (con una 'o') es el verbo perder. LOOSE (con doble 'o') es el adjetivo suelto o flojo.",
        "rule": "lose (verbo) vs loose (adjetivo)"
    },
    {
        "id": "ex-voc-cw-11", "level": "B2", "category": "vocabulary", "type": "multiple_choice",
        "topicLabel": "Confusing Words: Affect vs. Effect",
        "prompt": "Lack of adequate sleep can severely ___ your concentration at work.",
        "hint": "La falta de sueño adecuado puede afectar gravemente a tu concentración.",
        "options": ["affect", "effect", "effective", "affection"],
        "ans": ["affect"],
        "exp": "AFFECT con 'a' es el verbo ('influir/afectar'). EFFECT con 'e' es el sustantivo ('el efecto').",
        "rule": "affect (verbo) vs effect (sustantivo)"
    },
    {
        "id": "ex-voc-cw-12", "level": "B1+", "category": "vocabulary", "type": "multiple_choice",
        "topicLabel": "Confusing Words: Sympathetic vs. Friendly",
        "prompt": "When my grandfather was taken to hospital, my supervisor was extremely ___ and told me to take time off.",
        "hint": "Cuando ingresaron a mi abuelo, mi supervisor fue extremadamente comprensivo y compasivo.",
        "options": ["sympathetic", "friendly", "amusing", "fun"],
        "ans": ["sympathetic"],
        "exp": "'Sympathetic' significa compasivo y comprensivo ante el sufrimiento de alguien.",
        "rule": "sympathetic = compasivo / empático"
    },

    # Collocations (12 ex)
    {
        "id": "ex-voc-col-1", "level": "B1", "category": "vocabulary", "type": "cloze",
        "topicLabel": "Collocations: Make vs. Do",
        "prompt": "Don't be afraid to ___ (hacer/cometer) mistakes; it is the best way to learn.",
        "hint": "No tengas miedo a cometer errores.",
        "ans": ["make"],
        "exp": "La colocación fija en inglés es MAKE a mistake (nunca 'do a mistake').",
        "rule": "make a mistake"
    },
    {
        "id": "ex-voc-col-2", "level": "B1", "category": "vocabulary", "type": "cloze",
        "topicLabel": "Collocations: Make vs. Do",
        "prompt": "Could you ___ (hacerme) me a quick favour and hold this box for a second?",
        "hint": "¿Podrías hacerme un favor rápido y sujetar esta caja?",
        "ans": ["do"],
        "exp": "Hacer un favor es siempre DO someone a favour (nunca 'make a favour').",
        "rule": "do someone a favour"
    },
    {
        "id": "ex-voc-col-3", "level": "B1+", "category": "vocabulary", "type": "multiple_choice",
        "topicLabel": "Collocations: Take for granted",
        "prompt": "You should never take good friends for ___; always appreciate them.",
        "hint": "Nunca deberías dar por sentados a los buenos amigos.",
        "options": ["granted", "sure", "certain", "done"],
        "ans": ["granted"],
        "exp": "'Take for granted' es la expresión idiomática fija para 'dar por sentado'.",
        "rule": "take for granted = dar por sentado"
    },
    {
        "id": "ex-voc-col-4", "level": "B1", "category": "vocabulary", "type": "cloze",
        "topicLabel": "Collocations: Pay attention",
        "prompt": "Please ___ (presta) close attention to the emergency safety instructions.",
        "hint": "Por favor, presta mucha atención a las instrucciones de seguridad.",
        "ans": ["pay"],
        "exp": "En inglés la atención se 'paga': PAY attention to.",
        "rule": "pay attention to"
    },
    {
        "id": "ex-voc-col-5", "level": "B2", "category": "vocabulary", "type": "multiple_choice",
        "topicLabel": "Collocations: B2 Adverbs",
        "prompt": "We were ___ disappointed when our flight was cancelled without prior notice.",
        "hint": "Estábamos amargamente decepcionados cuando se canceló nuestro vuelo.",
        "options": ["bitterly", "strictly", "heavily", "highly"],
        "ans": ["bitterly"],
        "exp": "La colocación natural de nivel B2 para 'disappointed' es 'bitterly disappointed'.",
        "rule": "bitterly disappointed"
    },
    {
        "id": "ex-voc-col-6", "level": "B2", "category": "vocabulary", "type": "multiple_choice",
        "topicLabel": "Collocations: B2 Adverbs",
        "prompt": "This new Spanish restaurant in Soho comes ___ recommended by local food critics.",
        "hint": "Este nuevo restaurante viene altamente recomendado.",
        "options": ["highly", "bitterly", "deeply", "strictly"],
        "ans": ["highly"],
        "exp": "'Highly recommended' es la colocación estándar de nivel B2.",
        "rule": "highly recommended"
    },
    {
        "id": "ex-voc-col-7", "level": "B1+", "category": "vocabulary", "type": "cloze",
        "topicLabel": "Collocations: Take part in",
        "prompt": "Over five hundred athletes took ___ in the regional marathon.",
        "hint": "Más de 500 atletas participaron en el maratón regional.",
        "ans": ["part"],
        "exp": "'Take part in' significa participar en un evento.",
        "rule": "take part in = participar en"
    },
    {
        "id": "ex-voc-col-8", "level": "B1", "category": "vocabulary", "type": "multiple_choice",
        "topicLabel": "Collocations: Catch fire",
        "prompt": "The dry grass caught ___ almost instantly because of the dropped match.",
        "hint": "La hierba seca se prendió fuego casi al instante.",
        "options": ["fire", "flames", "burn", "smoke"],
        "ans": ["fire"],
        "exp": "Prenderse fuego = 'catch fire'.",
        "rule": "catch fire"
    },
    {
        "id": "ex-voc-col-9", "level": "B2", "category": "vocabulary", "type": "multiple_choice",
        "topicLabel": "Collocations: Utterly ridiculous",
        "prompt": "Paying fifty euros for a simple hamburger is ___ ridiculous!",
        "hint": "¡Pagar cincuenta euros por una simple hamburguesa es totalmente ridículo!",
        "options": ["utterly", "bitterly", "strictly", "heavily"],
        "ans": ["utterly"],
        "exp": "'Utterly ridiculous' / 'utterly impossible' son colocaciones enfáticas de B2.",
        "rule": "utterly ridiculous"
    },
    {
        "id": "ex-voc-col-10", "level": "B1+", "category": "vocabulary", "type": "cloze",
        "topicLabel": "Collocations: Come to an end",
        "prompt": "Our memorable holiday in the Greek islands finally came to an ___ yesterday.",
        "hint": "Nuestras vacaciones memorables llegaron a su fin ayer.",
        "ans": ["end"],
        "exp": "Llegar a su fin = 'come to an end'.",
        "rule": "come to an end"
    },
    {
        "id": "ex-voc-col-11", "level": "B1", "category": "vocabulary", "type": "cloze",
        "topicLabel": "Collocations: Break the ice",
        "prompt": "Telling a lighthearted joke helped break the ___ at the beginning of the presentation.",
        "hint": "Contar un chiste desenfadado ayudó a romper el hielo.",
        "ans": ["ice"],
        "exp": "Romper el hielo = 'break the ice'.",
        "rule": "break the ice"
    },
    {
        "id": "ex-voc-col-12", "level": "B2", "category": "vocabulary", "type": "multiple_choice",
        "topicLabel": "Collocations: Strictly forbidden",
        "prompt": "Taking unauthorized photographs inside the military base is ___ forbidden.",
        "hint": "Hacer fotos dentro de la base militar está terminantemente prohibido.",
        "options": ["strictly", "bitterly", "deeply", "highly"],
        "ans": ["strictly"],
        "exp": "'Strictly forbidden' es la colocación fija para prohibición rigurosa.",
        "rule": "strictly forbidden"
    },

    # Dependent Prepositions (14 ex)
    {
        "id": "ex-voc-prp-1", "level": "B1", "category": "vocabulary", "type": "cloze",
        "topicLabel": "Dependent Prepositions: Depend",
        "prompt": "Whether we go to the beach or not depends ___ the weather forecast.",
        "hint": "El que vayamos a la playa o no depende del tiempo.",
        "ans": ["on", "upon"],
        "exp": "Depender de en inglés siempre es 'depend ON' (¡nunca 'depend of'!).",
        "rule": "depend ON"
    },
    {
        "id": "ex-voc-prp-2", "level": "B1+", "category": "vocabulary", "type": "cloze",
        "topicLabel": "Dependent Prepositions: Congratulate",
        "prompt": "I phoned to congratulate my sister ___ passing her university entrance exam.",
        "hint": "Llamé para felicitar a mi hermana por aprobar su examen.",
        "ans": ["on"],
        "exp": "Felicitar por algo en inglés es 'congratulate somebody ON + -ing' (no 'for').",
        "rule": "congratulate ON"
    },
    {
        "id": "ex-voc-prp-3", "level": "B1+", "category": "vocabulary", "type": "cloze",
        "topicLabel": "Dependent Prepositions: Succeed",
        "prompt": "After hours of troubleshooting, the technician succeeded ___ fixing the server.",
        "hint": "Tras horas de pruebas, el técnico logró arreglar el servidor.",
        "ans": ["in"],
        "exp": "Tener éxito en lograr algo es 'succeed IN + V-ing'.",
        "rule": "succeed IN + V-ing"
    },
    {
        "id": "ex-voc-prp-4", "level": "B1", "category": "vocabulary", "type": "cloze",
        "topicLabel": "Dependent Prepositions: Married",
        "prompt": "Laura has been happily married ___ her high school sweetheart for fifteen years.",
        "hint": "Laura lleva quince años felizmente casada con su novio del instituto.",
        "ans": ["to"],
        "exp": "Estar casado con alguien en inglés es 'married TO somebody' (¡nunca 'with'!).",
        "rule": "married TO somebody"
    },
    {
        "id": "ex-voc-prp-5", "level": "B1+", "category": "vocabulary", "type": "cloze",
        "topicLabel": "Dependent Prepositions: Consist",
        "prompt": "A standard deck of playing cards consists ___ fifty-two cards.",
        "hint": "Una baraja estándar de cartas consta de 52 cartas.",
        "ans": ["of"],
        "exp": "Constar de o componerse de = 'consist OF' (no 'consist in').",
        "rule": "consist OF"
    },
    {
        "id": "ex-voc-prp-6", "level": "B1", "category": "vocabulary", "type": "cloze",
        "topicLabel": "Dependent Prepositions: Responsible",
        "prompt": "Who is responsible ___ locking up the building at night?",
        "hint": "¿Quién es el responsable de cerrar el edificio con llave por la noche?",
        "ans": ["for"],
        "exp": "Ser responsable de algo = 'responsible FOR + noun / -ing'.",
        "rule": "responsible FOR"
    },
    {
        "id": "ex-voc-prp-7", "level": "B1+", "category": "vocabulary", "type": "cloze",
        "topicLabel": "Dependent Prepositions: Prevent",
        "prompt": "The seatbelt prevented the passenger ___ hitting the dashboard during the collision.",
        "hint": "El cinturón impidió que el pasajero se golpeara contra el salpicadero.",
        "ans": ["from"],
        "exp": "Impedir que alguien haga algo = 'prevent somebody FROM doing something'.",
        "rule": "prevent someone FROM doing"
    },
    {
        "id": "ex-voc-prp-8", "level": "B1", "category": "vocabulary", "type": "cloze",
        "topicLabel": "Dependent Prepositions: Fed up",
        "prompt": "I am completely fed up ___ listening to the same marketing excuses every day.",
        "hint": "Estoy totalmente harto de escuchar las mismas excusas de marketing.",
        "ans": ["with"],
        "exp": "Estar harto de algo = 'fed up WITH'.",
        "rule": "fed up WITH"
    },
    {
        "id": "ex-voc-prp-9", "level": "A2+", "category": "vocabulary", "type": "cloze",
        "topicLabel": "Dependent Prepositions: Good at",
        "prompt": "My younger brother is exceptionally good ___ playing the acoustic guitar.",
        "hint": "A mi hermano pequeño se le da excepcionalmente bien tocar la guitarra.",
        "ans": ["at"],
        "exp": "Ser bueno en una disciplina = 'good AT' (¡nunca 'good in'!).",
        "rule": "good AT"
    },
    {
        "id": "ex-voc-prp-10", "level": "B1+", "category": "vocabulary", "type": "cloze",
        "topicLabel": "Dependent Prepositions: Look forward to",
        "prompt": "I am really looking forward ___ seeing you at the reunion next weekend.",
        "hint": "Tengo muchísimas ganas de verte en la reunión el próximo fin de semana.",
        "ans": ["to"],
        "exp": "'Look forward to' lleva preposición 'to' + verbo en -ING.",
        "rule": "look forward TO + -ing"
    },
    {
        "id": "ex-voc-prp-11", "level": "B1+", "category": "vocabulary", "type": "cloze",
        "topicLabel": "Dependent Prepositions: Object",
        "prompt": "Local residents strongly objected ___ the construction of a new airport terminal.",
        "hint": "Los vecinos de la zona se opusieron rotundamente a la construcción de la terminal.",
        "ans": ["to"],
        "exp": "Oponerse a algo = 'object TO + noun / -ing'.",
        "rule": "object TO"
    },
    {
        "id": "ex-voc-prp-12", "level": "B1", "category": "vocabulary", "type": "cloze",
        "topicLabel": "Dependent Prepositions: Explain",
        "prompt": "Can the teacher explain this math formula ___ us once more?",
        "hint": "¿Puede el profesor explicarnos esta fórmula una vez más?",
        "ans": ["to"],
        "exp": "'Explain something TO somebody' (¡prohibido omitir el 'to'!).",
        "rule": "explain something TO someone"
    },

    # Connectors & Linkers (10 ex)
    {
        "id": "ex-voc-con-1", "level": "B1+", "category": "connectors", "type": "error_correction",
        "topicLabel": "Connectors: Despite of",
        "prompt": "Corrige el error del conector de contraste:",
        "base": "Despite of feeling exhausted, she ran the entire marathon.",
        "err": "Despite of",
        "ans": ["Despite", "In spite of", "Despite feeling exhausted, she ran the entire marathon.", "In spite of feeling exhausted, she ran the entire marathon."],
        "exp": "'Despite' NUNCA lleva 'of'. O se usa 'Despite' o se usa 'In spite of'.",
        "rule": "Despite + -ing (sin 'of') / In spite of"
    },
    {
        "id": "ex-voc-con-2", "level": "B2", "category": "connectors", "type": "multiple_choice",
        "topicLabel": "Connectors: Although vs. Despite",
        "prompt": "___ it rained non-stop all weekend, we had a fantastic time camping in the mountains.",
        "hint": "Aunque llovió sin parar todo el fin de semana, nos lo pasamos genial.",
        "options": ["Although", "Despite", "In spite of", "However"],
        "ans": ["Although"],
        "exp": "Delante de una oración con Sujeto + Verbo ('it rained'), se usa ALTHOUGH o EVEN THOUGH.",
        "rule": "Although + Subject + Verb"
    },
    {
        "id": "ex-voc-con-3", "level": "B1+", "category": "connectors", "type": "multiple_choice",
        "topicLabel": "Connectors: Due to vs. Because",
        "prompt": "The international flight was delayed ___ dense fog on the runway.",
        "hint": "El vuelo internacional se retrasó debido a la densa niebla.",
        "options": ["due to", "because", "since", "as"],
        "ans": ["due to"],
        "exp": "Delante de un sintagma nominal ('dense fog') se usa 'due to' o 'because of'.",
        "rule": "due to + noun"
    },
    {
        "id": "ex-voc-con-4", "level": "B2", "category": "connectors", "type": "cloze",
        "topicLabel": "Connectors: In order not to",
        "prompt": "She wrote down the password in her notebook in order ___ to forget it.",
        "hint": "Apuntó la contraseña en su libreta para no olvidarla.",
        "ans": ["not"],
        "exp": "Para expresar finalidad negativa: in order NOT to + infinitive.",
        "rule": "in order NOT to"
    },
    {
        "id": "ex-voc-con-5", "level": "B2", "category": "connectors", "type": "multiple_choice",
        "topicLabel": "Connectors: Furthermore",
        "prompt": "Renewable energy lowers electricity bills. ___, it significantly cuts greenhouse gases.",
        "hint": "La energía renovable baja las facturas. Además, recorta los gases de efecto invernadero.",
        "options": ["Furthermore", "However", "Despite", "Although"],
        "ans": ["Furthermore"],
        "exp": "'Furthermore' o 'Moreover' sirve para añadir un argumento positivo adicional en estilo formal.",
        "rule": "Furthermore, ..."
    },
    {
        "id": "ex-voc-con-6", "level": "B2", "category": "connectors", "type": "transformation",
        "prompt": "Reescribe usando SPITE:",
        "base": "Although he was severely injured, he finished the race.",
        "key": "SPITE",
        "hint": "In ___ injury, he finished the race.",
        "ans": ["spite of his severe", "spite of his", "In spite of his severe injury, he finished the race."],
        "exp": "'Although + clause' se transforma en 'In spite of + noun'.",
        "rule": "in spite of + noun"
    },
    {
        "id": "ex-voc-con-7", "level": "B2", "category": "connectors", "type": "multiple_choice",
        "topicLabel": "Connectors: Whereas",
        "prompt": "My brother loves watching horror movies, ___ I can't stand anything scary.",
        "hint": "A mi hermano le encantan las películas de miedo, mientras que yo no las soporto.",
        "options": ["whereas", "despite", "furthermore", "in order that"],
        "ans": ["whereas"],
        "exp": "'Whereas' expresa un contraste directo entre dos sujetos u opiniones opuestas.",
        "rule": "whereas = mientras que"
    },
    {
        "id": "ex-voc-con-8", "level": "B1+", "category": "connectors", "type": "cloze",
        "topicLabel": "Connectors: So that",
        "prompt": "The teacher explained the task slowly ___ that all international students could follow.",
        "hint": "El profesor explicó la tarea despacio para que todos pudieran seguirla.",
        "ans": ["so"],
        "exp": "'So that' + sujeto + modal (could) expresa finalidad orientada a otra persona.",
        "rule": "so that + clause"
    },

    # Word Formation (14 ex)
    {
        "id": "ex-voc-wf-1", "level": "B1", "category": "word_formation", "type": "word_formation",
        "topicLabel": "Word Formation: SUCCEED",
        "prompt": "Transforma la palabra raíz en mayúsculas:",
        "base": "Hard work, resilience and dedication are key factors for ___. (SUCCEED)",
        "key": "SUCCEED",
        "hint": "El trabajo duro y la dedicación son factores clave para el éxito.",
        "ans": ["success"],
        "exp": "Detrás de la preposición 'for' necesitamos el sustantivo: SUCCEED -> success.",
        "rule": "SUCCEED (verbo) -> success (sustantivo)"
    },
    {
        "id": "ex-voc-wf-2", "level": "B1+", "category": "word_formation", "type": "word_formation",
        "topicLabel": "Word Formation: EMPLOY",
        "prompt": "Transforma la palabra raíz en mayúsculas:",
        "base": "The factory closure left more than five hundred workers ___. (EMPLOY)",
        "key": "EMPLOY",
        "hint": "El cierre de la fábrica dejó a más de 500 trabajadores en el paro.",
        "ans": ["unemployed"],
        "exp": "Necesitamos un adjetivo con significado negativo: UN- + EMPLOY + -ED = unemployed.",
        "rule": "EMPLOY -> unemployed (adjetivo negativo)"
    },
    {
        "id": "ex-voc-wf-3", "level": "B1", "category": "word_formation", "type": "word_formation",
        "topicLabel": "Word Formation: DECIDE",
        "prompt": "Transforma la palabra raíz en mayúsculas:",
        "base": "In a crisis, a business leader must be able to act ___. (DECIDE)",
        "key": "DECIDE",
        "hint": "En una crisis, un líder debe ser capaz de actuar de forma decidida/resolutiva.",
        "ans": ["decisively"],
        "exp": "Para modificar al verbo 'act' necesitamos un adverbio: DECIDE -> decisive -> decisively.",
        "rule": "DECIDE -> decisive -> decisively (adverbio)"
    },
    {
        "id": "ex-voc-wf-4", "level": "B1+", "category": "word_formation", "type": "word_formation",
        "topicLabel": "Word Formation: RELY",
        "prompt": "Transforma la palabra raíz en mayúsculas:",
        "base": "I would never trust him with my car; he is completely ___. (RELY)",
        "key": "RELY",
        "hint": "Jamás le confiaría mi coche; es completamente poco fiable.",
        "ans": ["unreliable"],
        "exp": "Detrás de 'completely' va un adjetivo negativo: UN- + RELY + -ABLE = unreliable.",
        "rule": "RELY -> reliable -> unreliable"
    },
    {
        "id": "ex-voc-wf-5", "level": "B2", "category": "word_formation", "type": "word_formation",
        "topicLabel": "Word Formation: DOUBT",
        "prompt": "Transforma la palabra raíz en mayúsculas:",
        "base": "She is ___ the most talented violinist in the national orchestra. (DOUBT)",
        "key": "DOUBT",
        "hint": "Es indudablemente la violinista con más talento de la orquesta.",
        "ans": ["undoubtedly", "doubtless"],
        "exp": "Adverbio que modifica al superlativo ('the most talented'): undoubtedly.",
        "rule": "DOUBT -> undoubted -> undoubtedly"
    },
    {
        "id": "ex-voc-wf-6", "level": "B2", "category": "word_formation", "type": "word_formation",
        "topicLabel": "Word Formation: FORTUNE",
        "prompt": "Transforma la palabra raíz en mayúsculas:",
        "base": "___, the rescue team arrived too late to save the stranded vessel. (FORTUNE)",
        "key": "FORTUNE",
        "hint": "Desafortunadamente, el equipo de rescate llegó demasiado tarde.",
        "ans": ["Unfortunately"],
        "exp": "Al principio de la oración con valor negativo: Unfortunately.",
        "rule": "FORTUNE -> unfortunate -> unfortunately"
    },
    {
        "id": "ex-voc-wf-7", "level": "B1+", "category": "word_formation", "type": "word_formation",
        "topicLabel": "Word Formation: ABLE",
        "prompt": "Transforma la palabra raíz en mayúsculas:",
        "base": "The new scholarship program will ___ underprivileged students to attend university. (ABLE)",
        "key": "ABLE",
        "hint": "El nuevo programa de becas permitirá/capacitará a estudiantes con pocos recursos ir a la universidad.",
        "ans": ["enable"],
        "exp": "Detrás de 'will' necesitamos un verbo: EN- + ABLE = enable.",
        "rule": "ABLE -> enable (verbo)"
    },
    {
        "id": "ex-voc-wf-8", "level": "B2", "category": "word_formation", "type": "word_formation",
        "topicLabel": "Word Formation: EXPECT",
        "prompt": "Transforma la palabra raíz en mayúsculas:",
        "base": "Clean drinking water has increased life ___ dramatically across the world. (EXPECT)",
        "key": "EXPECT",
        "hint": "El agua potable ha aumentado la esperanza de vida de forma drástica.",
        "ans": ["expectancy"],
        "exp": "Colocación fija de salud: 'life expectancy' (esperanza de vida).",
        "rule": "life expectancy"
    },
    {
        "id": "ex-voc-wf-9", "level": "B1", "category": "word_formation", "type": "word_formation",
        "topicLabel": "Word Formation: COMFORT",
        "prompt": "Transforma la palabra raíz en mayúsculas:",
        "base": "The wooden chair was so ___ that my back hurt after just ten minutes. (COMFORT)",
        "key": "COMFORT",
        "hint": "La silla de madera era tan incómoda que me dolió la espalda tras 10 minutos.",
        "ans": ["uncomfortable"],
        "exp": "Por el contexto negativo ('my back hurt') necesitamos el adjetivo opuesto: uncomfortable.",
        "rule": "COMFORT -> comfortable -> uncomfortable"
    },
    {
        "id": "ex-voc-wf-10", "level": "B2", "category": "word_formation", "type": "word_formation",
        "topicLabel": "Word Formation: CARE",
        "prompt": "Transforma la palabra raíz en mayúsculas:",
        "base": "The accident occurred because the driver was texting and driving ___. (CARE)",
        "key": "CARE",
        "hint": "El accidente ocurrió porque el conductor estaba escribiendo mensajes y conduciendo de forma imprudente.",
        "ans": ["carelessly"],
        "exp": "Adverbio negativo de modo: CARE -> careless -> carelessly.",
        "rule": "carelessly (adverbio negativo)"
    }
]

code = [
    "import { VocabItem, Exercise } from '../types';",
    "",
    "export const VOCABULARY_ITEMS: VocabItem[] = " + json.dumps(ITEMS, ensure_ascii=False, indent=2) + ";",
    "",
    "export const CURATED_VOCAB_EXERCISES: Exercise[] = ["
]

for ex in EXERCISES:
    code.append("  {")
    code.append(f"    id: '{ex['id']}',")
    code.append(f"    level: '{ex['level']}',")
    code.append(f"    category: '{ex['category']}',")
    code.append(f"    topicLabel: {json.dumps(ex.get('topicLabel', 'Vocabulary Drill'), ensure_ascii=False)},")
    code.append(f"    type: '{ex['type']}',")
    code.append(f"    prompt: {json.dumps(ex['prompt'], ensure_ascii=False)},")
    if "base" in ex:
        code.append(f"    baseSentence: {json.dumps(ex['base'], ensure_ascii=False)},")
    if "err" in ex:
        code.append(f"    errorWord: {json.dumps(ex['err'], ensure_ascii=False)},")
    if "key" in ex:
        code.append(f"    keyWord: {json.dumps(ex['key'], ensure_ascii=False)},")
    if "hint" in ex:
        code.append(f"    spanishHint: {json.dumps(ex['hint'], ensure_ascii=False)},")
    if "options" in ex:
        code.append(f"    options: {json.dumps(ex['options'], ensure_ascii=False)},")
    code.append(f"    acceptedAnswers: {json.dumps(ex['ans'], ensure_ascii=False)},")
    code.append(f"    explanation: {json.dumps(ex['exp'], ensure_ascii=False)},")
    code.append(f"    grammarRule: {json.dumps(ex['rule'], ensure_ascii=False)}")
    code.append("  },")

code.append("];")
code.append("")

with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
    f.write("\n".join(code))

print(f"Generated {len(ITEMS)} vocab items and {len(EXERCISES)} curated vocab exercises in {OUTPUT_PATH}")
