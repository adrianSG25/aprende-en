# -*- coding: utf-8 -*-
"""
Generador de más de 200 ejercicios de gramática estructurados por tema (10 por cada una de las 20 unidades).
Niveles A2+ a B2+ Advanced.
"""

import json
import os

OUTPUT_PATH = os.path.join(os.path.dirname(__file__), '..', 'src', 'data', 'expandedGrammarExercises.ts')

# Data dictionary for all 20 units with 10 exercises each
ALL_UNITS = [
    # ==================== 1. a2p-past-tenses ====================
    {
        "unitId": "a2p-past-tenses",
        "level": "A2+",
        "label": "Past Simple vs. Past Continuous",
        "exercises": [
            {
                "id": "ex-pst-1", "type": "cloze",
                "prompt": "While I ___ (walk) down the street yesterday, I bumped into an old school friend.",
                "hint": "Mientras caminaba por la calle ayer, me topé con un viejo amigo del colegio.",
                "ans": ["was walking"],
                "exp": "La acción larga ('telón de fondo') va con While + Past Continuous (was walking).",
                "rule": "While + Past Continuous, Past Simple"
            },
            {
                "id": "ex-pst-2", "type": "cloze",
                "prompt": "We were having dinner when the lights suddenly ___ (go) out.",
                "hint": "Estábamos cenando cuando las luces se apagaron de repente.",
                "ans": ["went", "went out"],
                "exp": "El corte de luz es una acción puntual y repentina que interrumpe la cena: Past Simple (went).",
                "rule": "Interrupción puntual -> Past Simple"
            },
            {
                "id": "ex-pst-3", "type": "error_correction",
                "prompt": "Corrige el error en esta frase:",
                "base": "While I cooked dinner, my brother was setting the table.",
                "err": "cooked",
                "ans": ["was cooking", "While I was cooking dinner, my brother was setting the table."],
                "exp": "Dos acciones largas simultáneas en el pasado llevan ambas Past Continuous (was cooking ... was setting).",
                "rule": "Acciones paralelas continuas -> Past Continuous en ambas"
            },
            {
                "id": "ex-pst-4", "type": "error_correction",
                "prompt": "Corrige el error de verbo de estado:",
                "base": "At that moment, I was understanding the whole problem.",
                "err": "was understanding",
                "ans": ["understood", "At that moment, I understood the whole problem."],
                "exp": "'Understand' es un verbo de estado (stative verb); no admite formas continuas con -ing.",
                "rule": "Stative verbs (understand, know, like) -> Past Simple"
            },
            {
                "id": "ex-pst-5", "type": "cloze",
                "prompt": "What ___ (you / do) when the earthquake started?",
                "hint": "¿Qué estabas haciendo cuando empezó el terremoto?",
                "ans": ["were you doing"],
                "exp": "Pregunta sobre la acción en progreso en el momento de la interrupción: were you doing.",
                "rule": "What were you doing when...?"
            },
            {
                "id": "ex-pst-6", "type": "multiple_choice",
                "prompt": "I was driving to work when I suddenly ___ that I had left the oven on.",
                "hint": "Iba conduciendo al curro cuando de repente me di cuenta de que me había dejado el horno encendido.",
                "options": ["realized", "was realizing", "have realized", "had realized"],
                "ans": ["realized"],
                "exp": "'Realize' es un fogonazo mental puntual que interrumpe la conducción: Past Simple (realized).",
                "rule": "Darse cuenta (realize) es puntual -> Past Simple"
            },
            {
                "id": "ex-pst-7", "type": "cloze",
                "prompt": "It ___ (rain) heavily when we arrived at the festival.",
                "hint": "Estaba lloviendo a cántaros cuando llegamos al festival.",
                "ans": ["was raining"],
                "exp": "El clima en progreso en ese momento pasado va en Past Continuous (was raining).",
                "rule": "Clima en progreso -> was/were raining"
            },
            {
                "id": "ex-pst-8", "type": "transformation",
                "prompt": "Reescribe usando WHEN:",
                "base": "During my shower, someone rang the doorbell.",
                "key": "WHEN",
                "hint": "I was having a shower ___ rang the doorbell.",
                "ans": ["when someone", "when somebody", "I was having a shower when someone rang the doorbell."],
                "exp": "'During my shower' se transforma en 'I was having a shower WHEN someone...'.",
                "rule": "was doing ... when"
            },
            {
                "id": "ex-pst-9", "type": "cloze",
                "prompt": "He dropped his phone into the swimming pool while he ___ (take) a selfie.",
                "hint": "Se le cayó el móvil a la piscina mientras se estaba haciendo un selfie.",
                "ans": ["was taking"],
                "exp": "La acción de hacerse la foto estaba en curso con 'while': was taking.",
                "rule": "While + was/were + -ing"
            },
            {
                "id": "ex-pst-10", "type": "error_correction",
                "prompt": "Corrige la frase:",
                "base": "I was hearing a strange noise outside last night.",
                "err": "was hearing",
                "ans": ["heard", "I heard a strange noise outside last night."],
                "exp": "'Hear' es un verbo de percepción involuntaria y no suele usarse en continuo; se usa 'heard'.",
                "rule": "Verbos de sentidos (hear, see, smell) -> Past Simple"
            }
        ]
    },

    # ==================== 2. a2p-present-perfect-particles ====================
    {
        "unitId": "a2p-present-perfect-particles",
        "level": "A2+",
        "label": "Present Perfect Particles (Just, Already, Yet, For, Since)",
        "exercises": [
            {
                "id": "ex-ppp-1", "type": "cloze",
                "prompt": "Have you finished the sales report ___? — No, not yet.",
                "hint": "¿Has terminado ya el informe de ventas? — No, todavía no.",
                "ans": ["yet"],
                "exp": "En preguntas y frases negativas, 'ya' o 'todavía' al FINAL de la frase siempre es YET.",
                "rule": "yet va al final en preguntas y negativas"
            },
            {
                "id": "ex-ppp-2", "type": "cloze",
                "prompt": "I'm not hungry because I have ___ (acabo de) eaten a huge sandwich.",
                "hint": "No tengo hambre porque acabo de comerme un bocadillo enorme.",
                "ans": ["just"],
                "exp": "Para decir 'acabo de hacer algo', se pone JUST entre have/has y el participio.",
                "rule": "have/has + just + participio = acabar de"
            },
            {
                "id": "ex-ppp-3", "type": "error_correction",
                "prompt": "Corrige el error temporal:",
                "base": "I have lived in this apartment since three years.",
                "err": "since",
                "ans": ["for", "I have lived in this apartment for three years."],
                "exp": "Para cantidades o periodos de tiempo ('three years', 'two months'), se usa FOR, nunca 'since'.",
                "rule": "FOR + periodo de tiempo (for 3 years)"
            },
            {
                "id": "ex-ppp-4", "type": "multiple_choice",
                "prompt": "Where is Daniel? — He has ___ to the post office; he will be back in ten minutes.",
                "hint": "¿Dónde está Daniel? — Se ha ido a correos (sigue allí); volverá en 10 minutos.",
                "options": ["gone", "been", "went", "visited"],
                "ans": ["gone"],
                "exp": "'Have gone' indica que fue y TODAVÍA no ha regresado. 'Have been' significa que fue y ya volvió.",
                "rule": "gone to (sigue allí) ≠ been to (fue y volvió)"
            },
            {
                "id": "ex-ppp-5", "type": "cloze",
                "prompt": "I sent him an urgent email three days ago, but he ___ hasn't replied.",
                "hint": "Le mandé un correo urgente hace 3 días, pero TODAVÍA no ha respondido.",
                "ans": ["still"],
                "exp": "En negativas, 'STILL' va DELANTE del auxiliar negativo: 'still hasn't replied'.",
                "rule": "still + haven't/hasn't"
            },
            {
                "id": "ex-ppp-6", "type": "transformation",
                "prompt": "Reescribe usando FOR:",
                "base": "I started working at this bank in 2021.",
                "key": "FOR",
                "hint": "I have worked at this bank ___ years.",
                "ans": ["for five", "for 5", "for five years", "for 5 years"],
                "exp": "La acción que comenzó en 2021 y continúa hoy se expresa con Present Perfect + FOR.",
                "rule": "Present Perfect + FOR"
            },
            {
                "id": "ex-ppp-7", "type": "cloze",
                "prompt": "Have you ___ (alguna vez) ridden a motorcycle in another country?",
                "hint": "¿Has montado alguna vez en moto en otro país?",
                "ans": ["ever"],
                "exp": "En preguntas sobre experiencias vitales ('¿alguna vez...?'), se usa EVER.",
                "rule": "Have you ever + participio...?"
            },
            {
                "id": "ex-ppp-8", "type": "cloze",
                "prompt": "We have known each other ___ we were at primary school.",
                "hint": "Nos conocemos desde que estábamos en el colegio de primaria.",
                "ans": ["since"],
                "exp": "Para un punto concreto o momento de inicio en el pasado, se usa SINCE.",
                "rule": "SINCE + punto temporal o frase en Past Simple"
            },
            {
                "id": "ex-ppp-9", "type": "error_correction",
                "prompt": "Corrige la posición del adverbio:",
                "base": "She has booked already the flight tickets.",
                "err": "booked already",
                "ans": ["already booked", "She has already booked the flight tickets."],
                "exp": "'Already' se coloca normalmente entre el auxiliar (has) y el participio (booked).",
                "rule": "has + already + booked"
            },
            {
                "id": "ex-ppp-10", "type": "multiple_choice",
                "prompt": "I have ___ been to Australia, but I would love to visit it one day.",
                "hint": "Nunca he estado en Australia, pero me encantaría visitarla algún día.",
                "options": ["never", "ever", "yet", "already"],
                "ans": ["never"],
                "exp": "'Never' expresa que la experiencia nunca ha ocurrido con verbo en afirmativa.",
                "rule": "have never + participio"
            }
        ]
    },

    # ==================== 3. a2p-comparatives-modifiers ====================
    {
        "unitId": "a2p-comparatives-modifiers",
        "level": "A2+",
        "label": "Comparatives, Modifiers, Too & Enough",
        "exercises": [
            {
                "id": "ex-cmp-1", "type": "error_correction",
                "prompt": "Corrige el error de intensificador:",
                "base": "This second-hand car is very cheaper than the new one.",
                "err": "very cheaper",
                "ans": ["much cheaper", "far cheaper", "This second-hand car is much cheaper than the new one.", "This second-hand car is far cheaper than the new one."],
                "exp": "Con comparativos JAMÁS se usa 'very'; se usa 'much' o 'far' (much cheaper / far cheaper).",
                "rule": "much/far + comparative (¡nunca 'very better/cheaper'!)"
            },
            {
                "id": "ex-cmp-2", "type": "cloze",
                "prompt": "The coffee was ___ hot to drink immediately, so I waited five minutes.",
                "hint": "El café estaba demasiado caliente para bebérselo inmediatamente.",
                "ans": ["too"],
                "exp": "TOO + adjetivo + TO infinitive significa 'demasiado... como para poder hacerlo'.",
                "rule": "too + adj + to infinitive"
            },
            {
                "id": "ex-cmp-3", "type": "error_correction",
                "prompt": "Corrige el orden de 'enough':",
                "base": "He is not enough old to vote in the general elections.",
                "err": "enough old",
                "ans": ["old enough", "He is not old enough to vote in the general elections."],
                "exp": "Con adjetivos, 'enough' va SIEMPRE DETRÁS: 'old enough' (no 'enough old').",
                "rule": "adjective + enough"
            },
            {
                "id": "ex-cmp-4", "type": "transformation",
                "prompt": "Reescribe usando AS:",
                "base": "My brother is taller than me.",
                "key": "AS",
                "hint": "I am not ___ my brother.",
                "ans": ["as tall as", "I am not as tall as my brother."],
                "exp": "'A is taller than B' equivale a 'B is not AS tall AS A'.",
                "rule": "not as + adj + as"
            },
            {
                "id": "ex-cmp-5", "type": "cloze",
                "prompt": "We don't have ___ time to visit the museum before closing.",
                "hint": "No tenemos suficiente tiempo para visitar el museo antes de que cierren.",
                "ans": ["enough"],
                "exp": "Delante de sustantivos (time, money), 'enough' va delante: 'enough time'.",
                "rule": "enough + noun"
            },
            {
                "id": "ex-cmp-6", "type": "multiple_choice",
                "prompt": "Travelling by high-speed train is ___ faster than driving through the mountains.",
                "hint": "Viajar en tren de alta velocidad es muchísimo más rápido que conducir.",
                "options": ["far", "very", "more", "such"],
                "ans": ["far"],
                "exp": "'Far faster' significa 'muchísimo más rápido'. 'Very' no puede modificar comparativos.",
                "rule": "far + faster / much + faster"
            },
            {
                "id": "ex-cmp-7", "type": "transformation",
                "prompt": "Reescribe usando WARM:",
                "base": "The water was too cold for us to swim in.",
                "key": "WARM",
                "hint": "The water was not ___ for us to swim in.",
                "ans": ["warm enough", "The water was not warm enough for us to swim in."],
                "exp": "'Too cold' equivale a 'not warm enough'.",
                "rule": "too cold = not warm enough"
            },
            {
                "id": "ex-cmp-8", "type": "cloze",
                "prompt": "His new novel is slightly ___ (good) than his previous one.",
                "hint": "Su nueva novela es ligeramente mejor que la anterior.",
                "ans": ["better"],
                "exp": "El comparativo irregular de 'good' es 'better'.",
                "rule": "good -> better -> the best"
            },
            {
                "id": "ex-cmp-9", "type": "error_correction",
                "prompt": "Corrige el error:",
                "base": "She earns money enough to buy a flat in the city centre.",
                "err": "money enough",
                "ans": ["enough money", "She earns enough money to buy a flat in the city centre."],
                "exp": "Con sustantivos, 'enough' va DELANTE: 'enough money' (nunca 'money enough').",
                "rule": "enough + noun"
            },
            {
                "id": "ex-cmp-10", "type": "multiple_choice",
                "prompt": "This exam was ___ more difficult than I had anticipated.",
                "hint": "Este examen fue mucho más difícil de lo que había previsto.",
                "options": ["a lot", "very", "too", "so"],
                "ans": ["a lot"],
                "exp": "'A lot more difficult' o 'much more difficult' son las opciones correctas.",
                "rule": "a lot / much + more + adj"
            }
        ]
    },

    # ==================== 4. a2p-modals-obligation ====================
    {
        "unitId": "a2p-modals-obligation",
        "level": "A2+",
        "label": "Modals of Obligation, Prohibition & Advice",
        "exercises": [
            {
                "id": "ex-mod-1", "type": "error_correction",
                "prompt": "Corrige el error de significado:",
                "base": "Tomorrow is a bank holiday, so you mustn't set your alarm.",
                "err": "mustn't",
                "ans": ["don't have to", "needn't", "don't need to", "Tomorrow is a bank holiday, so you don't have to set your alarm."],
                "exp": "Si no es necesario pero no está prohibido, se usa 'don't have to' o 'needn't', NUNCA 'mustn't'.",
                "rule": "mustn't (prohibido) ≠ don't have to (no hace falta)"
            },
            {
                "id": "ex-mod-2", "type": "cloze",
                "prompt": "You ___ (no debes / prohibido) touch that wire; it's extremely dangerous!",
                "hint": "¡No debes tocar ese cable; es extremadamente peligroso!",
                "ans": ["mustn't", "must not"],
                "exp": "Prohibición por seguridad = mustn't.",
                "rule": "mustn't = prohibido terminantemente"
            },
            {
                "id": "ex-mod-3", "type": "multiple_choice",
                "prompt": "You ___ hurry; the train is delayed by twenty minutes, so we have plenty of time.",
                "hint": "No hace falta que corras; el tren viene con retraso.",
                "options": ["needn't", "mustn't", "shouldn't", "can't"],
                "ans": ["needn't"],
                "exp": "'Needn't' significa 'no hace falta' seguido de infinitivo sin to.",
                "rule": "needn't + bare infinitive = don't have to"
            },
            {
                "id": "ex-mod-4", "type": "cloze",
                "prompt": "You had ___ take an umbrella; the weather forecast predicts heavy storms.",
                "hint": "Más te vale coger un paraguas; el pronóstico anuncia tormentas.",
                "ans": ["better"],
                "exp": "'Had better' (+ verbo normal) expresa una recomendación urgente o advertencia.",
                "rule": "had better + bare infinitive"
            },
            {
                "id": "ex-mod-5", "type": "transformation",
                "prompt": "Reescribe usando SHOULD:",
                "base": "It is a good idea for you to apologize to your colleague.",
                "key": "SHOULD",
                "hint": "You ___ to your colleague.",
                "ans": ["should apologize", "should apologise", "You should apologize to your colleague."],
                "exp": "'It is a good idea to...' se expresa en inglés con el modal 'should'.",
                "rule": "should + infinitive para consejos"
            },
            {
                "id": "ex-mod-6", "type": "error_correction",
                "prompt": "Corrige el error gramatical:",
                "base": "You needn't to bring any food to the barbecue.",
                "err": "needn't to bring",
                "ans": ["needn't bring", "don't need to bring", "You needn't bring any food to the barbecue."],
                "exp": "'Needn't' es un verbo modal y va seguido de infinitivo SIN 'to' (needn't bring).",
                "rule": "needn't + bare infinitive (sin to)"
            },
            {
                "id": "ex-mod-7", "type": "cloze",
                "prompt": "In the UK, drivers ___ (obligación legal) drive on the left side of the road.",
                "hint": "En el Reino Unido, los conductores tienen que conducir por la izquierda.",
                "ans": ["have to", "must"],
                "exp": "Obligación legal impuesta por normas de tráfico = have to / must.",
                "rule": "have to para leyes y reglas externas"
            },
            {
                "id": "ex-mod-8", "type": "transformation",
                "prompt": "Reescribe en PASADO:",
                "base": "Yesterday I must stay late at the office.",
                "key": "HAD",
                "hint": "Yesterday I ___ late at the office.",
                "ans": ["had to stay", "Yesterday I had to stay late at the office."],
                "exp": "'Must' no tiene forma de pasado; el pasado de 'must' y 'have to' es siempre 'HAD TO'.",
                "rule": "Pasado de must/have to = HAD TO"
            },
            {
                "id": "ex-mod-9", "type": "multiple_choice",
                "prompt": "You ___ better not be late for the meeting with the CEO.",
                "hint": "Más te vale no llegar tarde a la reunión con el director general.",
                "options": ["had", "would", "should", "could"],
                "ans": ["had"],
                "exp": "La expresión fija de advertencia es 'HAD better', nunca 'would better'.",
                "rule": "had better not be late"
            },
            {
                "id": "ex-mod-10", "type": "cloze",
                "prompt": "Museum admission is free, so visitors ___ not pay any entrance fee.",
                "hint": "La entrada al museo es gratis, por lo que los visitantes no tienen que pagar.",
                "ans": ["need", "do"],
                "exp": "Visitors 'need not pay' o 'do not have to pay'.",
                "rule": "need not pay = don't have to pay"
            }
        ]
    },

    # ==================== 5. b1-past-perfect-used-to ====================
    {
        "unitId": "b1-past-perfect-used-to",
        "level": "B1",
        "label": "Past Perfect & Past Habits (Used to / Would)",
        "exercises": [
            {
                "id": "ex-ppu-1", "type": "cloze",
                "prompt": "By the time the police arrived, the thieves ___ (already / escape).",
                "hint": "Para cuando llegó la policía, los ladrones ya habían escapado.",
                "ans": ["had already escaped"],
                "exp": "Acción que ocurrió antes que otra acción pasada (arrived): Past Perfect (had already escaped).",
                "rule": "By the time + Past Simple, Past Perfect"
            },
            {
                "id": "ex-ppu-2", "type": "error_correction",
                "prompt": "Corrige el error en la pregunta:",
                "base": "Did you used to play tennis when you were younger?",
                "err": "used to",
                "ans": ["use to", "Did you use to play tennis when you were younger?"],
                "exp": "Con el auxiliar 'Did', el verbo pierde la -d: 'Did you use to...?' (no 'used to').",
                "rule": "Did you USE to...?"
            },
            {
                "id": "ex-ppu-3", "type": "transformation",
                "prompt": "Reescribe usando BEFORE:",
                "base": "The train left, and then we arrived at the platform.",
                "key": "BEFORE",
                "hint": "The train had left ___ at the platform.",
                "ans": ["before we arrived", "The train had left before we arrived at the platform."],
                "exp": "La acción anterior usa Past Perfect y la posterior Past Simple con 'before'.",
                "rule": "had done ... before + Past Simple"
            },
            {
                "id": "ex-ppu-4", "type": "error_correction",
                "prompt": "Corrige el verbo de estado con 'would':",
                "base": "When I was a kid, I would live in a small village by the sea.",
                "err": "would live",
                "ans": ["used to live", "lived", "When I was a kid, I used to live in a small village by the sea."],
                "exp": "'Would' para hábitos pasados NO se puede usar con verbos de estado (live, be, have, know); se usa 'used to'.",
                "rule": "used to live (would live ❌ para estados permanentes)"
            },
            {
                "id": "ex-ppu-5", "type": "cloze",
                "prompt": "She couldn't board the flight because she ___ (forget) her passport at home.",
                "hint": "No pudo embarcar porque se había olvidado el pasaporte en casa.",
                "ans": ["had forgotten", "had left"],
                "exp": "El olvido del pasaporte ocurrió antes de intentar embarcar: Past Perfect (had forgotten).",
                "rule": "Past Perfect para la causa previa"
            },
            {
                "id": "ex-ppu-6", "type": "multiple_choice",
                "prompt": "It took me several months to get used to ___ on the left when I moved to England.",
                "hint": "Me llevó varios meses acostumbrarme a conducir por la izquierda.",
                "options": ["driving", "drive", "drove", "driven"],
                "ans": ["driving"],
                "exp": "'Get used to' (acostumbrarse a) lleva preposición 'to', por lo que el verbo debe terminar en -ING.",
                "rule": "get used to + V-ing"
            },
            {
                "id": "ex-ppu-7", "type": "cloze",
                "prompt": "I didn't ___ (solía) like olives when I was a child, but now I love them.",
                "hint": "No me solían gustar las aceitunas de pequeño, pero ahora me encantan.",
                "ans": ["use to"],
                "exp": "En negativa con 'didn't', se escribe 'use to' sin la -d.",
                "rule": "didn't use to"
            },
            {
                "id": "ex-ppu-8", "type": "transformation",
                "prompt": "Reescribe usando USED:",
                "base": "In the past, my grandfather smoked twenty cigarettes a day, but he quit.",
                "key": "USED",
                "hint": "My grandfather ___ twenty cigarettes a day.",
                "ans": ["used to smoke", "My grandfather used to smoke twenty cigarettes a day."],
                "exp": "Hábito del pasado que ya no existe = used to + infinitivo.",
                "rule": "used to + verb"
            },
            {
                "id": "ex-ppu-9", "type": "cloze",
                "prompt": "When we got to the cinema, the film ___ (already / start).",
                "hint": "Cuando llegamos al cine, la película ya había empezado.",
                "ans": ["had already started"],
                "exp": "La película empezó antes de que llegaran: Past Perfect (had already started).",
                "rule": "When + Past Simple, Past Perfect"
            },
            {
                "id": "ex-ppu-10", "type": "multiple_choice",
                "prompt": "I am a night owl, so I am used to ___ late at night.",
                "hint": "Soy un búho nocturno, así que estoy acostumbrado a trabajar hasta tarde.",
                "options": ["working", "work", "worked", "have worked"],
                "ans": ["working"],
                "exp": "'Be used to' (estar acostumbrado a) siempre va seguido de verbo en -ING o sustantivo.",
                "rule": "be used to + -ing"
            }
        ]
    },

    # ==================== 6. b1-conditionals-1-2 ====================
    {
        "unitId": "b1-conditionals-1-2",
        "level": "B1",
        "label": "First & Second Conditional (Unless, In Case)",
        "exercises": [
            {
                "id": "ex-c12-1", "type": "error_correction",
                "prompt": "Corrige el error de 'will' tras condicional:",
                "base": "If it will rain tomorrow, we will cancel the barbecue.",
                "err": "will rain",
                "ans": ["rains", "If it rains tomorrow, we will cancel the barbecue."],
                "exp": "En cláusulas condicionales con IF nunca se usa 'will'; se usa Present Simple (rains).",
                "rule": "If + Present Simple, will + verb"
            },
            {
                "id": "ex-c12-2", "type": "error_correction",
                "prompt": "Corrige la doble negación con 'unless':",
                "base": "Unless you don't study hard, you will fail the exam.",
                "err": "don't study",
                "ans": ["study", "Unless you study hard, you will fail the exam."],
                "exp": "'Unless' ya significa 'si no' o 'a menos que'; poner 'don't' crea una doble negación errónea.",
                "rule": "Unless + verbo en afirmativa"
            },
            {
                "id": "ex-c12-3", "type": "cloze",
                "prompt": "If I were in your shoes, I ___ (accept) that promotion immediately.",
                "hint": "Si yo estuviera en tu lugar, aceptaría ese ascenso inmediatamente.",
                "ans": ["would accept", "'d accept"],
                "exp": "Segundo condicional (hipótesis o consejo): If I were you, I would accept.",
                "rule": "If + were, would + infinitive"
            },
            {
                "id": "ex-c12-4", "type": "multiple_choice",
                "prompt": "Take an umbrella ___ it rains later this evening.",
                "hint": "Llévate un paraguas por si acaso llueve luego.",
                "options": ["in case", "if", "unless", "provided"],
                "ans": ["in case"],
                "exp": "'In case' expresa precaución previa ('por si acaso'). 'If' esperaría a que lloviera primero.",
                "rule": "in case = por precaución antes de que ocurra"
            },
            {
                "id": "ex-c12-5", "type": "transformation",
                "prompt": "Reescribe usando IF:",
                "base": "Unless you book the tickets in advance, you won't get a good seat.",
                "key": "IF",
                "hint": "You won't get a good seat ___ the tickets in advance.",
                "ans": ["if you don't book", "if you do not book", "You won't get a good seat if you don't book the tickets in advance."],
                "exp": "'Unless you book' equivale exactamente a 'if you don't book'.",
                "rule": "Unless = If ... not"
            },
            {
                "id": "ex-c12-6", "type": "cloze",
                "prompt": "What would you do if you ___ (win) ten million euros in the lottery?",
                "hint": "¿Qué harías si ganaras diez millones de euros en la lotería?",
                "ans": ["won"],
                "exp": "Segundo condicional hipotético: If + Past Simple (won), would do.",
                "rule": "If + Past Simple, would + V"
            },
            {
                "id": "ex-c12-7", "type": "multiple_choice",
                "prompt": "You can borrow my laptop ___ that you return it before Friday.",
                "hint": "Puedes coger prestado mi portátil con la condición de que lo devuelvas antes del viernes.",
                "options": ["provided", "unless", "in case", "although"],
                "ans": ["provided"],
                "exp": "'Provided that' o 'as long as' significa 'siempre y cuando / con la condición de que'.",
                "rule": "provided that = siempre que"
            },
            {
                "id": "ex-c12-8", "type": "cloze",
                "prompt": "As soon as I ___ (arrive) at the airport, I will send you a text message.",
                "hint": "En cuanto llegue al aeropuerto, te mandaré un mensaje de texto.",
                "ans": ["arrive"],
                "exp": "Tras conectores temporales de futuro (as soon as, when, until), se usa Present Simple.",
                "rule": "As soon as + Present Simple, will..."
            },
            {
                "id": "ex-c12-9", "type": "transformation",
                "prompt": "Reescribe dando un consejo usando WERE:",
                "base": "My advice is for you to talk to your manager.",
                "key": "WERE",
                "hint": "If I ___ to your manager.",
                "ans": ["were you, I would talk", "were you I would talk", "were you I'd talk", "If I were you, I would talk to your manager."],
                "exp": "Fórmula estándar de consejo: 'If I were you, I would talk...'.",
                "rule": "If I were you, I would..."
            },
            {
                "id": "ex-c12-10", "type": "cloze",
                "prompt": "If he ___ (not be) so arrogant, more people would like him.",
                "hint": "Si no fuera tan prepotente, le caería bien a más gente.",
                "ans": ["weren't", "wasn't", "were not", "was not"],
                "exp": "Segundo condicional con el verbo To Be: 'weren't' o 'wasn't'.",
                "rule": "If + weren't / wasn't"
            }
        ]
    },

    # ==================== 7. b1-passive-voice ====================
    {
        "unitId": "b1-passive-voice",
        "level": "B1",
        "label": "The Passive Voice (All Tenses & Two Objects)",
        "exercises": [
            {
                "id": "ex-pas-1", "type": "transformation",
                "prompt": "Pasa a pasiva empezando por la PERSONA:",
                "base": "They offered Maria a prestigious job in Berlin.",
                "key": "OFFERED",
                "hint": "Maria ___ a prestigious job in Berlin.",
                "ans": ["was offered", "Maria was offered a prestigious job in Berlin."],
                "exp": "En inglés, cuando un verbo tiene dos objetos, la persona salta a la primera posición como sujeto pasivo.",
                "rule": "Person + was offered something"
            },
            {
                "id": "ex-pas-2", "type": "cloze",
                "prompt": "The new hospital ___ (inaugurar / will be opened) by the mayor next month.",
                "hint": "El nuevo hospital será inaugurado por el alcalde el próximo mes.",
                "ans": ["will be opened", "is being opened"],
                "exp": "Pasiva de futuro: will be + participio (opened).",
                "rule": "will be + Past Participle"
            },
            {
                "id": "ex-pas-3", "type": "error_correction",
                "prompt": "Corrige el error de tiempo en la pasiva:",
                "base": "The bridge has been built in 1995.",
                "err": "has been built",
                "ans": ["was built", "The bridge was built in 1995."],
                "exp": "Con fecha pasada exacta ('in 1995'), es obligatorio Past Simple pasivo (was built), no Present Perfect.",
                "rule": "Past Simple passive (was/were + V3) con fechas pasadas"
            },
            {
                "id": "ex-pas-4", "type": "transformation",
                "prompt": "Reescribe usando GIVEN:",
                "base": "The teacher gave each student a certificate.",
                "key": "GIVEN",
                "hint": "Each student ___ a certificate by the teacher.",
                "ans": ["was given", "Each student was given a certificate by the teacher."],
                "exp": "La persona como sujeto de la pasiva: Each student WAS GIVEN.",
                "rule": "was given a certificate"
            },
            {
                "id": "ex-pas-5", "type": "cloze",
                "prompt": "This book ___ (translate) into more than forty languages since it was published.",
                "hint": "Este libro ha sido traducido a más de 40 idiomas desde que se publicó.",
                "ans": ["has been translated"],
                "exp": "Acción que empezó en el pasado y sigue teniendo relevancia con 'since': Present Perfect pasivo.",
                "rule": "has been translated"
            },
            {
                "id": "ex-pas-6", "type": "multiple_choice",
                "prompt": "The missing documents ___ in the archive room yesterday afternoon.",
                "hint": "Los documentos perdidos fueron encontrados en la sala de archivos ayer por la tarde.",
                "options": ["were found", "have been found", "found", "was found"],
                "ans": ["were found"],
                "exp": "Sujeto plural (documents) + pasado cerrado (yesterday) = were found.",
                "rule": "were + found"
            },
            {
                "id": "ex-pas-7", "type": "error_correction",
                "prompt": "Corrige la preposición de agente:",
                "base": "Romeo and Juliet was written with William Shakespeare.",
                "err": "with",
                "ans": ["by", "Romeo and Juliet was written by William Shakespeare."],
                "exp": "El agente que realiza la acción en una pasiva siempre va introducido por BY, nunca 'with'.",
                "rule": "written BY somebody"
            },
            {
                "id": "ex-pas-8", "type": "cloze",
                "prompt": "Look! The old town hall ___ (restaurar / is being) at the moment.",
                "hint": "¡Mira! El antiguo ayuntamiento está siendo restaurado en este momento.",
                "ans": ["is being restored", "is being renovated"],
                "exp": "Pasiva en presente continuo (acción sucediendo ahora): is being + participio.",
                "rule": "is/are being + Past Participle"
            },
            {
                "id": "ex-pas-9", "type": "transformation",
                "prompt": "Reescribe usando TOLD:",
                "base": "The flight attendant ordered the passengers to fasten their seatbelts.",
                "key": "TOLD",
                "hint": "The passengers ___ to fasten their seatbelts.",
                "ans": ["were told", "The passengers were told to fasten their seatbelts."],
                "exp": "Pasiva con tell: 'were told to do something'.",
                "rule": "were told to do something"
            },
            {
                "id": "ex-pas-10", "type": "cloze",
                "prompt": "Millions of smartphones ___ (fabricar / sell) in Asia every year.",
                "hint": "Millones de teléfonos móviles son fabricados en Asia cada año.",
                "ans": ["are manufactured", "are made", "are produced"],
                "exp": "Hecho habitual en Present Simple pasivo: are + participio.",
                "rule": "are made / are produced"
            }
        ]
    },

    # ==================== 8. b1-reported-speech ====================
    {
        "unitId": "b1-reported-speech",
        "level": "B1",
        "label": "Reported Speech & Reporting Verbs",
        "exercises": [
            {
                "id": "ex-rep-1", "type": "error_correction",
                "prompt": "Corrige el orden en la pregunta indirecta:",
                "base": "She asked me where did I live.",
                "err": "where did I live",
                "ans": ["where I lived", "She asked me where I lived."],
                "exp": "En estilo indirecto no se usa el auxiliar interrogativo 'did'; el orden es afirmativo Sujeto + Verbo.",
                "rule": "Reported questions: where + Subject + Verb"
            },
            {
                "id": "ex-rep-2", "type": "error_correction",
                "prompt": "Corrige el uso de 'say' vs 'tell':",
                "base": "He said me that he was feeling ill.",
                "err": "said me",
                "ans": ["told me", "said to me", "He told me that he was feeling ill."],
                "exp": "'Say' no puede llevar a la persona directamente sin 'to'; lo natural es 'He told me'.",
                "rule": "tell someone vs say that"
            },
            {
                "id": "ex-rep-3", "type": "cloze",
                "prompt": "\"I will call you tomorrow,\" she promised. -> She promised that she ___ call me the following day.",
                "hint": "Ella prometió que me llamaría al día siguiente.",
                "ans": ["would"],
                "exp": "'Will' da un paso atrás en reported speech y se transforma en 'would'.",
                "rule": "will -> would"
            },
            {
                "id": "ex-rep-4", "type": "transformation",
                "prompt": "Pasa a estilo indirecto con REFUSED:",
                "base": "\"I definitely will not sign this contract,\" said Mark.",
                "key": "REFUSED",
                "hint": "Mark ___ that contract.",
                "ans": ["refused to sign", "Mark refused to sign that contract."],
                "exp": "El verbo de reporte 'refuse' se construye con infinitivo con TO: refused to sign.",
                "rule": "refuse + to infinitive"
            },
            {
                "id": "ex-rep-5", "type": "cloze",
                "prompt": "\"Don't touch that wet paint!\" -> The painter warned us ___ touch the wet paint.",
                "hint": "El pintor nos advirtió que no tocáramos la pintura fresca.",
                "ans": ["not to"],
                "exp": "Las órdenes negativas en reported speech usan 'not to + infinitivo'.",
                "rule": "warned us NOT TO touch"
            },
            {
                "id": "ex-rep-6", "type": "multiple_choice",
                "prompt": "He apologized ___ for being late to the interview.",
                "hint": "Pidió disculpas por llegar tarde a la entrevista.",
                "options": ["for being", "to be", "that he was", "about being"],
                "ans": ["for being"],
                "exp": "La estructura de 'apologize' es: apologize (to someone) FOR + V-ing.",
                "rule": "apologize for + -ing"
            },
            {
                "id": "ex-rep-7", "type": "cloze",
                "prompt": "\"Are you coming to the concert?\" -> David asked me ___ I was coming to the concert.",
                "hint": "David me preguntó si iba a ir al concierto.",
                "ans": ["if", "whether"],
                "exp": "Las preguntas de sí/no se reportan con IF o WHETHER.",
                "rule": "asked me IF / WHETHER"
            },
            {
                "id": "ex-rep-8", "type": "transformation",
                "prompt": "Reescribe usando ADVISE:",
                "base": "\"You should see a doctor about that cough,\" said Sarah.",
                "key": "ADVISED",
                "hint": "Sarah ___ a doctor about my cough.",
                "ans": ["advised me to see", "Sarah advised me to see a doctor about my cough."],
                "exp": "Reporting verb: advise someone + TO infinitive.",
                "rule": "advise someone to do something"
            },
            {
                "id": "ex-rep-9", "type": "cloze",
                "prompt": "\"I have already seen this movie.\" -> He said that he ___ already seen that movie.",
                "hint": "Dijo que ya había visto esa película.",
                "ans": ["had"],
                "exp": "Present Perfect ('have seen') pasa a Past Perfect ('had seen').",
                "rule": "have seen -> had seen"
            },
            {
                "id": "ex-rep-10", "type": "multiple_choice",
                "prompt": "The mechanic reminded me ___ check the engine oil every month.",
                "hint": "El mecánico me recordó revisar el aceite del motor cada mes.",
                "options": ["to check", "checking", "that I check", "check"],
                "ans": ["to check"],
                "exp": "'Remind someone + TO do something'.",
                "rule": "remind someone to do something"
            }
        ]
    },

    # ==================== 9. b1p-perfect-continuous ====================
    {
        "unitId": "b1p-perfect-continuous",
        "level": "B1+",
        "label": "Present & Past Perfect Continuous vs. Simple",
        "exercises": [
            {
                "id": "ex-ppc-1", "type": "cloze",
                "prompt": "My eyes are burning because I ___ (stare) at a computer screen for nine hours.",
                "hint": "Me arden los ojos porque llevo nueve horas mirando fijamente la pantalla del ordenador.",
                "ans": ["have been staring"],
                "exp": "Acción continua con efecto físico visible en el presente = Present Perfect Continuous.",
                "rule": "have been + -ing (efecto visible en el presente)"
            },
            {
                "id": "ex-ppc-2", "type": "error_correction",
                "prompt": "Corrige el verbo de estado en continuo:",
                "base": "I have been knowing Carlos since our university days.",
                "err": "have been knowing",
                "ans": ["have known", "I have known Carlos since our university days."],
                "exp": "'Know' es verbo de estado; prohíbe la forma continua con -ing: 'have known'.",
                "rule": "know -> have known (no 'have been knowing')"
            },
            {
                "id": "ex-ppc-3", "type": "multiple_choice",
                "prompt": "How many emails ___ this morning? — About fifteen.",
                "hint": "¿Cuántos correos has enviado esta mañana? — Unos quince.",
                "options": ["have you sent", "have you been sending", "did you sent", "had you sent"],
                "ans": ["have you sent"],
                "exp": "Cuando se pregunta por una cantidad o resultado terminado ('How many...?'), se usa el Simple.",
                "rule": "How many -> Present Perfect Simple"
            },
            {
                "id": "ex-ppc-4", "type": "cloze",
                "prompt": "She was completely exhausted when she arrived because she ___ (drive) through the storm for six hours.",
                "hint": "Estaba agotada porque llevaba seis horas conduciendo bajo la tormenta.",
                "ans": ["had been driving"],
                "exp": "Acción continua previa a un momento del pasado ('was exhausted'): Past Perfect Continuous.",
                "rule": "had been + -ing"
            },
            {
                "id": "ex-ppc-5", "type": "transformation",
                "prompt": "Reescribe usando SINCE:",
                "base": "It started raining at 9 AM, and it is still raining now.",
                "key": "SINCE",
                "hint": "It ___ 9 AM.",
                "ans": ["has been raining since", "It has been raining since 9 AM."],
                "exp": "Acción que empezó en el pasado y sigue en curso = has been raining since.",
                "rule": "has been raining since"
            },
            {
                "id": "ex-ppc-6", "type": "cloze",
                "prompt": "Sorry about my dirty hands; I ___ (repair) the bicycle chain.",
                "hint": "Perdona por las manos sucias; he estado arreglando la cadena de la bici.",
                "ans": ["have been repairing", "have been fixing"],
                "exp": "El resultado visible (manos sucias) justifica el uso del continuo.",
                "rule": "have been repairing"
            },
            {
                "id": "ex-ppc-7", "type": "multiple_choice",
                "prompt": "We ___ this documentary three times already.",
                "hint": "Ya hemos visto este documental tres veces.",
                "options": ["have watched", "have been watching", "had been watching", "were watching"],
                "ans": ["have watched"],
                "exp": "Número de veces que se ha completado una acción ('three times') = Simple.",
                "rule": "veces terminadas -> Simple"
            },
            {
                "id": "ex-ppc-8", "type": "cloze",
                "prompt": "How long ___ (you / learn) Japanese?",
                "hint": "¿Cuánto tiempo llevas aprendiendo japonés?",
                "ans": ["have you been learning"],
                "exp": "'How long' indaga sobre la duración de una actividad en curso: have you been learning.",
                "rule": "How long have you been + -ing?"
            },
            {
                "id": "ex-ppc-9", "type": "error_correction",
                "prompt": "Corrige el error de posesión:",
                "base": "I have been having this car for more than ten years.",
                "err": "have been having",
                "ans": ["have had", "I have had this car for more than ten years."],
                "exp": "'Have' en sentido de posesión es verbo de estado; no admite forma continua: 'have had'.",
                "rule": "have (posesión) -> have had"
            },
            {
                "id": "ex-ppc-10", "type": "cloze",
                "prompt": "The grass is soaking wet because it ___ (rain) all night.",
                "hint": "La hierba está empapada porque ha estado lloviendo toda la noche.",
                "ans": ["has been raining"],
                "exp": "Efecto visible directo en el suelo = has been raining.",
                "rule": "has been raining"
            }
        ]
    },

    # ==================== 10. b1p-third-conditional ====================
    {
        "unitId": "b1p-third-conditional",
        "level": "B1+",
        "label": "Third Conditional (Unreal Past & Regrets)",
        "exercises": [
            {
                "id": "ex-c3-1", "type": "error_correction",
                "prompt": "Corrige el uso erróneo de 'would' tras If:",
                "base": "If I would have known about the traffic jam, I would have taken the metro.",
                "err": "would have known",
                "ans": ["had known", "If I had known about the traffic jam, I would have taken the metro."],
                "exp": "En la cláusula con IF jamás se usa 'would have'; se usa Past Perfect (had known).",
                "rule": "If + had + V3, would have + V3"
            },
            {
                "id": "ex-c3-2", "type": "cloze",
                "prompt": "If you had warned me earlier, I ___ (could / avoid) that enormous fine.",
                "hint": "Si me hubieras avisado antes, habría podido evitar esa multa enorme.",
                "ans": ["could have avoided", "would have avoided"],
                "exp": "En la consecuencia del tercer condicional: could have avoided.",
                "rule": "could have + Past Participle"
            },
            {
                "id": "ex-c3-3", "type": "transformation",
                "prompt": "Reescribe usando HAD:",
                "base": "We missed the flight because we woke up late.",
                "key": "HAD",
                "hint": "If we ___ late, we wouldn't have missed the flight.",
                "ans": ["hadn't woken up", "had not woken up", "If we hadn't woken up late, we wouldn't have missed the flight."],
                "exp": "Condición irreal en el pasado: If we hadn't woken up late.",
                "rule": "If we hadn't woken up"
            },
            {
                "id": "ex-c3-4", "type": "cloze",
                "prompt": "She wouldn't have slipped on the ice if she ___ (wear) winter boots.",
                "hint": "No se habría resbalado en el hielo si hubiera llevado botas de invierno.",
                "ans": ["had worn"],
                "exp": "Cláusula condicional de tercer condicional: had + participio de wear (worn).",
                "rule": "had worn"
            },
            {
                "id": "ex-c3-5", "type": "multiple_choice",
                "prompt": "If it hadn't been ___ your support, I would have given up completely.",
                "hint": "De no haber sido por tu apoyo, me habría rendido por completo.",
                "options": ["for", "of", "to", "with"],
                "ans": ["for"],
                "exp": "Estructura fija en exámenes de Cambridge: 'If it hadn't been FOR...'.",
                "rule": "If it hadn't been FOR = Sin..."
            },
            {
                "id": "ex-c3-6", "type": "transformation",
                "prompt": "Reescribe usando INVERSIÓN (sin 'if'):",
                "base": "If I had realized the danger, I wouldn't have climbed the mountain.",
                "key": "HAD",
                "hint": "___ the danger, I wouldn't have climbed the mountain.",
                "ans": ["Had I realized", "Had I realised", "Had I realized the danger, I wouldn't have climbed the mountain."],
                "exp": "Inversión formal de tercer condicional: Had I realized... (elimina el 'If').",
                "rule": "Had + Sujeto + participio (inversión formal)"
            },
            {
                "id": "ex-c3-7", "type": "cloze",
                "prompt": "If they ___ (listen) to the instructions, they wouldn't have broken the machine.",
                "hint": "Si hubieran escuchado las instrucciones, no habrían roto la máquina.",
                "ans": ["had listened"],
                "exp": "Tercer condicional: had listened.",
                "rule": "had listened"
            },
            {
                "id": "ex-c3-8", "type": "error_correction",
                "prompt": "Corrige el error de tiempo en el resultado:",
                "base": "If we had taken a taxi, we arrived on time yesterday.",
                "err": "arrived",
                "ans": ["would have arrived", "could have arrived", "If we had taken a taxi, we would have arrived on time yesterday."],
                "exp": "La consecuencia en el pasado exige 'would have + participio' (would have arrived).",
                "rule": "would have arrived"
            },
            {
                "id": "ex-c3-9", "type": "multiple_choice",
                "prompt": "I ___ you if my mobile phone hadn't run out of battery.",
                "hint": "Te habría llamado si mi teléfono móvil no se hubiera quedado sin batería.",
                "options": ["would have called", "would call", "had called", "called"],
                "ans": ["would have called"],
                "exp": "Resultado hipotético de un hecho pasado: would have called.",
                "rule": "would have called"
            },
            {
                "id": "ex-c3-10", "type": "cloze",
                "prompt": "If he hadn't gambled away his savings, he ___ (not lose) his home.",
                "hint": "Si no se hubiera jugado sus ahorros, no habría perdido su casa.",
                "ans": ["would not have lost", "wouldn't have lost"],
                "exp": "Consecuencia negativa en tercer condicional: wouldn't have lost.",
                "rule": "wouldn't have lost"
            }
        ]
    },

    # ==================== 11. b1p-causative-have-get ====================
    {
        "unitId": "b1p-causative-have-get",
        "level": "B1+",
        "label": "Causative Have / Get Something Done",
        "exercises": [
            {
                "id": "ex-cau-1", "type": "error_correction",
                "prompt": "Corrige el error de quien realizó la acción:",
                "base": "I cut my hair yesterday at the expensive salon in the centre.",
                "err": "cut my hair",
                "ans": ["had my hair cut", "got my hair cut", "I had my hair cut yesterday at the expensive salon in the centre."],
                "exp": "Si pagas a un peluquero, se usa la causativa: 'had/got my hair cut' (no 'I cut my hair').",
                "rule": "had my hair cut"
            },
            {
                "id": "ex-cau-2", "type": "transformation",
                "prompt": "Reescribe usando HAD:",
                "base": "A specialist repaired our central heating system yesterday.",
                "key": "HAD",
                "hint": "We ___ yesterday by a specialist.",
                "ans": ["had our central heating system repaired", "had our heating repaired", "We had our central heating system repaired yesterday by a specialist."],
                "exp": "Estructura causativa: HAVE + objeto + participio.",
                "rule": "had + object + repaired"
            },
            {
                "id": "ex-cau-3", "type": "cloze",
                "prompt": "I need to get my car ___ (serviciar / revisar) before our long road trip.",
                "hint": "Tengo que llevar el coche a revisar antes de nuestro largo viaje por carretera.",
                "ans": ["serviced", "checked"],
                "exp": "GET + objeto (my car) + participio (serviced).",
                "rule": "get something serviced"
            },
            {
                "id": "ex-cau-4", "type": "multiple_choice",
                "prompt": "While travelling in Madrid, she had her handbag ___ on the underground.",
                "hint": "Mientras viajaba por Madrid, le robaron el bolso en el metro.",
                "options": ["stolen", "steal", "stole", "stealing"],
                "ans": ["stolen"],
                "exp": "Causativa para experiencias negativas sufridas: had + object + stolen.",
                "rule": "had something stolen"
            },
            {
                "id": "ex-cau-5", "type": "error_correction",
                "prompt": "Corrige el orden de palabras:",
                "base": "We must have repaired the computer as soon as possible.",
                "err": "have repaired the computer",
                "ans": ["have the computer repaired", "We must have the computer repaired as soon as possible."],
                "exp": "El orden es estricto: HAVE + OBJETO (the computer) + PARTICIPIO (repaired).",
                "rule": "have the computer repaired"
            },
            {
                "id": "ex-cau-6", "type": "cloze",
                "prompt": "How often do you have your teeth ___ (check) by the dentist?",
                "hint": "¿Con qué frecuencia te revisa los dientes el dentista?",
                "ans": ["checked", "cleaned"],
                "exp": "HAVE + objeto (your teeth) + participio (checked).",
                "rule": "have your teeth checked"
            },
            {
                "id": "ex-cau-7", "type": "transformation",
                "prompt": "Reescribe usando GOT:",
                "base": "The decorators painted our kitchen white.",
                "key": "GOT",
                "hint": "We ___ white by the decorators.",
                "ans": ["got our kitchen painted", "We got our kitchen painted white by the decorators."],
                "exp": "Forma más informal de la causativa: GOT + kitchen + painted.",
                "rule": "got our kitchen painted"
            },
            {
                "id": "ex-cau-8", "type": "cloze",
                "prompt": "I couldn't read the contract, so I had it ___ (translate) into Spanish.",
                "hint": "No podía leer el contrato, así que lo mandé traducir al español.",
                "ans": ["translated"],
                "exp": "HAVE + it + translated.",
                "rule": "had it translated"
            },
            {
                "id": "ex-cau-9", "type": "multiple_choice",
                "prompt": "He got a professional photographer ___ photos at his wedding.",
                "hint": "Consiguió que un fotógrafo profesional hiciera las fotos en su boda.",
                "options": ["to take", "take", "taken", "taking"],
                "ans": ["to take"],
                "exp": "Causativa activa con GET: get someone TO DO something (con 'to').",
                "rule": "get someone TO do something"
            },
            {
                "id": "ex-cau-10", "type": "cloze",
                "prompt": "Where did you get your jacket ___ (dry-clean)?",
                "hint": "¿Dónde llevaste a lavar en seco tu chaqueta?",
                "ans": ["dry-cleaned", "cleaned"],
                "exp": "GET + your jacket + dry-cleaned.",
                "rule": "get your jacket dry-cleaned"
            }
        ]
    },

    # ==================== 12. b1p-future-continuous-perfect ====================
    {
        "unitId": "b1p-future-continuous-perfect",
        "level": "B1+",
        "label": "Future Continuous vs. Future Perfect",
        "exercises": [
            {
                "id": "ex-fcp-1", "type": "error_correction",
                "prompt": "Corrige el error de tiempo con 'BY':",
                "base": "By next summer, I will finish my university degree.",
                "err": "will finish",
                "ans": ["will have finished", "By next summer, I will have finished my university degree."],
                "exp": "Con 'BY + tiempo futuro', la acción estará terminada para esa fecha: Future Perfect (will have finished).",
                "rule": "By + tiempo futuro -> will have + participio"
            },
            {
                "id": "ex-fcp-2", "type": "cloze",
                "prompt": "Don't call me at 8 PM tonight because I ___ (watch) the Champions League final.",
                "hint": "No me llames a las 8 de la tarde porque estaré viendo la final.",
                "ans": ["will be watching", "'ll be watching"],
                "exp": "Acción que estará en progreso en un momento futuro concreto = Future Continuous.",
                "rule": "will be + -ing"
            },
            {
                "id": "ex-fcp-3", "type": "transformation",
                "prompt": "Reescribe usando HAVE:",
                "base": "The construction workers will complete the bridge before December.",
                "key": "HAVE",
                "hint": "By December, the construction workers will ___ the bridge.",
                "ans": ["have completed", "have finished", "By December, the construction workers will have completed the bridge."],
                "exp": "Acción completada antes de una fecha límite = will have completed.",
                "rule": "will have completed"
            },
            {
                "id": "ex-fcp-4", "type": "cloze",
                "prompt": "This time next week, we ___ (sunbathe) on a beach in Mallorca.",
                "hint": "La semana que viene a estas horas estaremos tomando el sol en una playa.",
                "ans": ["will be sunbathing", "'ll be sunbathing"],
                "exp": "'This time next week' pide Future Continuous (will be sunbathing).",
                "rule": "This time next... -> will be doing"
            },
            {
                "id": "ex-fcp-5", "type": "error_correction",
                "prompt": "Corrige el error en la cláusula temporal:",
                "base": "By the time you will arrive, I will have cooked dinner.",
                "err": "will arrive",
                "ans": ["arrive", "By the time you arrive, I will have cooked dinner."],
                "exp": "En cláusulas temporales introducidas por 'by the time', se usa Present Simple, nunca 'will'.",
                "rule": "By the time + Present Simple"
            },
            {
                "id": "ex-fcp-6", "type": "multiple_choice",
                "prompt": "Scientists estimate that they ___ an effective vaccine by 2030.",
                "hint": "Los científicos calculan que habrán desarrollado una vacuna eficaz para 2030.",
                "options": ["will have developed", "will be developing", "will develop", "have developed"],
                "ans": ["will have developed"],
                "exp": "Con 'by 2030' se expresa una meta completada = will have developed.",
                "rule": "will have developed by..."
            },
            {
                "id": "ex-fcp-7", "type": "cloze",
                "prompt": "At 11 AM tomorrow, she ___ (give) a keynote presentation at the conference.",
                "hint": "Mañana a las 11 estará dando una conferencia magistral.",
                "ans": ["will be giving"],
                "exp": "Momento puntual de futuro en progreso = will be giving.",
                "rule": "will be giving"
            },
            {
                "id": "ex-fcp-8", "type": "transformation",
                "prompt": "Reescribe usando BEEN:",
                "base": "In October, she will reach her tenth year of working for this company.",
                "key": "BEEN",
                "hint": "By October, she will have ___ for this company for ten years.",
                "ans": ["been working", "By October, she will have been working for this company for ten years."],
                "exp": "Future Perfect Continuous para enfatizar la duración acumulada hasta una fecha futura.",
                "rule": "will have been working"
            },
            {
                "id": "ex-fcp-9", "type": "cloze",
                "prompt": "Hurry up! By the time we reach the stadium, the match ___ (already / start).",
                "hint": "¡Date prisa! Para cuando lleguemos al estadio, el partido ya habrá empezado.",
                "ans": ["will have already started", "will already have started"],
                "exp": "Acción que ya habrá ocurrido antes de nuestra llegada = will have already started.",
                "rule": "will have already started"
            },
            {
                "id": "ex-fcp-10", "type": "multiple_choice",
                "prompt": "Will you be ___ your car tomorrow, or can I borrow it?",
                "hint": "¿Vas a estar usando tu coche mañana o te lo puedo coger prestado?",
                "options": ["using", "use", "used", "have used"],
                "ans": ["using"],
                "exp": "Future Continuous usado con cortesía para preguntar por los planes de otra persona: Will you be using...?",
                "rule": "Will you be using...?"
            }
        ]
    },

    # ==================== 13. b2-wish-if-only ====================
    {
        "unitId": "b2-wish-if-only",
        "level": "B2",
        "label": "Wish / If Only (Present, Past & Complaints)",
        "exercises": [
            {
                "id": "ex-wsh-1", "type": "error_correction",
                "prompt": "Corrige el tiempo tras 'wish':",
                "base": "I wish I have more free time to travel the world.",
                "err": "have",
                "ans": ["had", "I wish I had more free time to travel the world."],
                "exp": "Un deseo sobre la situación presente exige Past Simple: I wish I HAD.",
                "rule": "Wish + Past Simple (deseo actual)"
            },
            {
                "id": "ex-wsh-2", "type": "cloze",
                "prompt": "I have an awful hangover. I wish I ___ (not drink) so much tequila last night.",
                "hint": "Tengo una resaca horrible. Ojalá no hubiera bebido tanto anoche.",
                "ans": ["hadn't drunk", "had not drunk"],
                "exp": "Arrepentimiento sobre un hecho del pasado = Wish + Past Perfect (hadn't drunk).",
                "rule": "Wish + had + V3 (arrepentimiento pasado)"
            },
            {
                "id": "ex-wsh-3", "type": "cloze",
                "prompt": "My neighbour is playing loud music again. I wish he ___ (turn) it down!",
                "hint": "Mi vecino ha puesto la música a tope otra vez. ¡Ojalá la bajara!",
                "ans": ["would turn"],
                "exp": "Queja sobre el comportamiento molesto de OTRA persona = Wish + WOULD.",
                "rule": "Wish + would (queja de actitud)"
            },
            {
                "id": "ex-wsh-4", "type": "transformation",
                "prompt": "Reescribe usando WISH:",
                "base": "I regret not accepting the job offer in Canada.",
                "key": "WISH",
                "hint": "I ___ the job offer in Canada.",
                "ans": ["wish I had accepted", "I wish I had accepted the job offer in Canada."],
                "exp": "'I regret not doing' se transforma siempre en 'I wish I had done'.",
                "rule": "I regret not doing = I wish I had done"
            },
            {
                "id": "ex-wsh-5", "type": "error_correction",
                "prompt": "Corrige la confusión entre 'wish' y 'hope':",
                "base": "I wish you will pass your driving test tomorrow.",
                "err": "wish",
                "ans": ["hope", "I hope you will pass your driving test tomorrow.", "I hope you pass your driving test tomorrow."],
                "exp": "Para deseos futuros reales y posibles se usa HOPE, nunca 'wish'.",
                "rule": "HOPE para deseos posibles del futuro"
            },
            {
                "id": "ex-wsh-6", "type": "multiple_choice",
                "prompt": "If only I ___ where I left my house keys!",
                "hint": "¡Ojalá supiera dónde me dejé las llaves de casa!",
                "options": ["knew", "know", "have known", "would know"],
                "ans": ["knew"],
                "exp": "Deseo sobre el presente con 'If only' = Past Simple (knew).",
                "rule": "If only + Past Simple"
            },
            {
                "id": "ex-wsh-7", "type": "transformation",
                "prompt": "Reescribe usando ONLY:",
                "base": "It's a pity I didn't save enough money last year.",
                "key": "ONLY",
                "hint": "If ___ enough money last year.",
                "ans": ["only I had saved", "If only I had saved enough money last year."],
                "exp": "'It's a pity I didn't' se transforma en 'If only I had saved'.",
                "rule": "If only I had saved"
            },
            {
                "id": "ex-wsh-8", "type": "cloze",
                "prompt": "I'm terrified of flying. I wish I ___ (not be) so anxious on planes.",
                "hint": "Me da pánico volar. Ojalá no fuera tan ansioso en los aviones.",
                "ans": ["weren't", "wasn't", "were not", "was not"],
                "exp": "Deseo sobre el presente con el verbo To Be: weren't o wasn't.",
                "rule": "I wish I weren't..."
            },
            {
                "id": "ex-wsh-9", "type": "multiple_choice",
                "prompt": "I wish you ___ interrupting me when I'm speaking on the phone!",
                "hint": "¡Ojalá dejaras de interrumpirme cuando hablo por teléfono!",
                "options": ["would stop", "stopped", "had stopped", "will stop"],
                "ans": ["would stop"],
                "exp": "Molestia hacia la conducta repetida de otra persona = would stop.",
                "rule": "wish + would stop"
            },
            {
                "id": "ex-wsh-10", "type": "cloze",
                "prompt": "We are lost in the middle of nowhere. If only we ___ (bring) a physical map!",
                "hint": "Estamos perdidos. ¡Ojalá nos hubiéramos traído un mapa físico!",
                "ans": ["had brought"],
                "exp": "Lamento de algo no hecho en el pasado = If only + had brought.",
                "rule": "If only + had brought"
            }
        ]
    },

    # ==================== 14. b2-mixed-conditionals ====================
    {
        "unitId": "b2-mixed-conditionals",
        "level": "B2",
        "label": "Mixed Conditionals (Past Cause & Present Result)",
        "exercises": [
            {
                "id": "ex-mxc-1", "type": "error_correction",
                "prompt": "Corrige el resultado presente:",
                "base": "If I had accepted the scholarship, I would have lived in Oxford now.",
                "err": "would have lived",
                "ans": ["would be living", "would live", "If I had accepted the scholarship, I would be living in Oxford now."],
                "exp": "Como la consecuencia es 'NOW' (en el presente), debe usarse 'would be living' o 'would live', no el condicional perfecto.",
                "rule": "If + had + V3 ... would be (now)"
            },
            {
                "id": "ex-mxc-2", "type": "cloze",
                "prompt": "If she hadn't stayed up until 4 AM playing games, she ___ (not be) so exhausted today.",
                "hint": "Si no se hubiera quedado despierta hasta las 4 de la mañana, hoy no estaría tan agotada.",
                "ans": ["wouldn't be", "would not be"],
                "exp": "Causa en el pasado (hadn't stayed) con efecto en el presente (today) = wouldn't be.",
                "rule": "hadn't done -> wouldn't be today"
            },
            {
                "id": "ex-mxc-3", "type": "transformation",
                "prompt": "Reescribe combinando pasado y presente:",
                "base": "I didn't learn French at school, so I don't understand this document now.",
                "key": "HAD",
                "hint": "If I ___ French at school, I would understand this document now.",
                "ans": ["had learned", "had learnt", "If I had learned French at school, I would understand this document now."],
                "exp": "Causa en el pasado: If I had learned.",
                "rule": "If I had learned ... would understand now"
            },
            {
                "id": "ex-mxc-4", "type": "cloze",
                "prompt": "If I ___ (be) better at managing money, I wouldn't have spent all my savings last month.",
                "hint": "Si fuera mejor administrando el dinero (característica permanente), no me habría fundido todos los ahorros el mes pasado.",
                "ans": ["were", "was"],
                "exp": "Condición permanente en presente ('If I were better') con resultado en el pasado = Tipo B mixto.",
                "rule": "If + were (rasgo) ... wouldn't have spent"
            },
            {
                "id": "ex-mxc-5", "type": "multiple_choice",
                "prompt": "If they had followed the map, they ___ lost in the forest right now.",
                "hint": "Si hubieran seguido el mapa, ahora mismo no estarían perdidos en el bosque.",
                "options": ["wouldn't be", "wouldn't have been", "weren't", "hadn't been"],
                "ans": ["wouldn't be"],
                "exp": "'Right now' indica que el resultado es en el presente: wouldn't be.",
                "rule": "wouldn't be right now"
            },
            {
                "id": "ex-mxc-6", "type": "cloze",
                "prompt": "He wouldn't be in hospital today if he ___ (wear) a seatbelt during the crash.",
                "hint": "Hoy no estaría en el hospital si hubiera llevado puesto el cinturón durante el choque.",
                "ans": ["had worn"],
                "exp": "La causa en el accidente pasado requiere Past Perfect: had worn.",
                "rule": "wouldn't be today if had worn"
            },
            {
                "id": "ex-mxc-7", "type": "transformation",
                "prompt": "Reescribe usando BE:",
                "base": "Because you didn't listen to the doctor, you are still sick.",
                "key": "BE",
                "hint": "If you had listened to the doctor, you wouldn't ___ sick now.",
                "ans": ["be", "still be", "If you had listened to the doctor, you wouldn't be sick now."],
                "exp": "Condicional mixto: had listened -> wouldn't be sick now.",
                "rule": "wouldn't be sick now"
            },
            {
                "id": "ex-mxc-8", "type": "error_correction",
                "prompt": "Corrige el error de concordancia temporal:",
                "base": "If I was speaking fluent Japanese, I would have applied for that job in Tokyo last week.",
                "err": "was speaking",
                "ans": ["spoke", "were speaking", "could speak", "If I spoke fluent Japanese, I would have applied for that job in Tokyo last week."],
                "exp": "Condición presente (habilidad permanente): If I spoke / could speak.",
                "rule": "If I spoke ... would have applied"
            },
            {
                "id": "ex-mxc-9", "type": "multiple_choice",
                "prompt": "If we had invested in that startup company in 2015, we ___ millionaires today.",
                "hint": "Si hubiéramos invertido en esa empresa en 2015, hoy seríamos millonarios.",
                "options": ["would be", "would have been", "had been", "were"],
                "ans": ["would be"],
                "exp": "Efecto actual marcado por 'today': would be.",
                "rule": "would be today"
            },
            {
                "id": "ex-mxc-10", "type": "cloze",
                "prompt": "If she were not so stubborn, she ___ (admit) her mistake yesterday.",
                "hint": "Si no fuera tan cabezota, ayer habría admitido su error.",
                "ans": ["would have admitted"],
                "exp": "Rasgo permanente (If she were not so stubborn) con resultado en el pasado (yesterday): would have admitted.",
                "rule": "would have admitted yesterday"
            }
        ]
    },

    # ==================== 15. b2-modals-past-deduction ====================
    {
        "unitId": "b2-modals-past-deduction",
        "level": "B2",
        "label": "Past Modal Deductions (Must have, Can't have, Should have)",
        "exercises": [
            {
                "id": "ex-mpd-1", "type": "error_correction",
                "prompt": "Corrige el modal de imposibilidad pasada:",
                "base": "He mustn't have stolen the wallet; he was with me all evening.",
                "err": "mustn't have stolen",
                "ans": ["can't have stolen", "couldn't have stolen", "He can't have stolen the wallet; he was with me all evening."],
                "exp": "Para imposibilidad lógica en el pasado, JAMÁS se usa 'mustn't have'; se usa CAN'T HAVE o COULDN'T HAVE.",
                "rule": "can't have done (¡nunca mustn't have para deducciones!)"
            },
            {
                "id": "ex-mpd-2", "type": "cloze",
                "prompt": "The streets are soaking wet this morning. It ___ (must / rain) heavily during the night.",
                "hint": "Las calles están empapadas. Seguro que ha llovido a mares durante la noche.",
                "ans": ["must have rained"],
                "exp": "Certeza lógica casi absoluta en el pasado = must have rained.",
                "rule": "must have + Past Participle"
            },
            {
                "id": "ex-mpd-3", "type": "transformation",
                "prompt": "Reescribe usando CAN'T:",
                "base": "I am certain that Sarah didn't commit the crime because she was in Rome.",
                "key": "CAN'T",
                "hint": "Sarah ___ the crime because she was in Rome.",
                "ans": ["can't have committed", "cannot have committed", "Sarah can't have committed the crime because she was in Rome."],
                "exp": "'I am certain she didn't' se transforma en 'Sarah can't have committed'.",
                "rule": "certain she didn't = can't have done"
            },
            {
                "id": "ex-mpd-4", "type": "cloze",
                "prompt": "You ___ (deberías haber) called me when you landed at the airport!",
                "hint": "¡Deberías haberme llamado cuando aterrizaste en el aeropuerto!",
                "ans": ["should have", "ought to have"],
                "exp": "Reproche o deber incumplido en el pasado = should have called.",
                "rule": "should have + participio"
            },
            {
                "id": "ex-mpd-5", "type": "multiple_choice",
                "prompt": "Where is my passport? — You ___ left it in the taxi on your way here.",
                "hint": "¿Dónde está mi pasaporte? — Quizás te lo dejaste en el taxi.",
                "options": ["might have", "must to have", "should to have", "can have"],
                "ans": ["might have"],
                "exp": "Posibilidad incierta en el pasado = might have o could have.",
                "rule": "might have / could have = quizás pasó"
            },
            {
                "id": "ex-mpd-6", "type": "transformation",
                "prompt": "Reescribe usando MUST:",
                "base": "I'm sure Mark was thrilled when he got the job.",
                "key": "MUST",
                "hint": "Mark ___ thrilled when he got the job.",
                "ans": ["must have been", "Mark must have been thrilled when he got the job."],
                "exp": "'I'm sure he was' se transforma en 'He must have been'.",
                "rule": "sure he was = must have been"
            },
            {
                "id": "ex-mpd-7", "type": "error_correction",
                "prompt": "Corrige la falta de 'have':",
                "base": "You should apologize to her yesterday; now she won't talk to you.",
                "err": "should apologize",
                "ans": ["should have apologized", "should have apologised", "You should have apologized to her yesterday; now she won't talk to you."],
                "exp": "La acción correspondía al pasado ('yesterday'), por lo que es obligatorio 'should have apologized'.",
                "rule": "should have apologized"
            },
            {
                "id": "ex-mpd-8", "type": "cloze",
                "prompt": "Nobody answered the phone. They ___ (must / go) out for dinner.",
                "hint": "Nadie contestó al teléfono. Seguro que se habían ido a cenar fuera.",
                "ans": ["must have gone"],
                "exp": "Deducción lógica de alta certeza en el pasado = must have gone.",
                "rule": "must have gone"
            },
            {
                "id": "ex-mpd-9", "type": "multiple_choice",
                "prompt": "He didn't prepare at all for the interview; he ___ surprised that he didn't get the offer.",
                "hint": "No se preparó nada; no debería sorprenderle.",
                "options": ["can't have been", "mustn't have been", "wouldn't have be", "shouldn't to be"],
                "ans": ["can't have been"],
                "exp": "Imposibilidad en el pasado: can't have been.",
                "rule": "can't have been"
            },
            {
                "id": "ex-mpd-10", "type": "cloze",
                "prompt": "Why didn't you ask me for help? I ___ (could / lend) you the money!",
                "hint": "¿Por qué no me pediste ayuda? ¡Habría podido prestarte el dinero!",
                "ans": ["could have lent", "could have loaned"],
                "exp": "Habilidad u oportunidad no aprovechada en el pasado = could have lent.",
                "rule": "could have lent"
            }
        ]
    },

    # ==================== 16. b2-gerund-infinitive-meaning ====================
    {
        "unitId": "b2-gerund-infinitive-meaning",
        "level": "B2",
        "label": "Gerund vs. Infinitive with Change of Meaning",
        "exercises": [
            {
                "id": "ex-gim-1", "type": "error_correction",
                "prompt": "Corrige el sentido de la frase:",
                "base": "On our road trip, we stopped smoking a cigarette at the service station.",
                "err": "stopped smoking",
                "ans": ["stopped to smoke", "On our road trip, we stopped to smoke a cigarette at the service station."],
                "exp": "Para indicar que hiciste una pausa con el fin de fumar, se usa STOP TO SMOKE. 'Stop smoking' significa dejar el hábito.",
                "rule": "stop to smoke (hacer una pausa para) ≠ stop smoking (dejar el hábito)"
            },
            {
                "id": "ex-gim-2", "type": "cloze",
                "prompt": "Please remember ___ (lock) the front door when you leave the house.",
                "hint": "Por favor, acuérdate de cerrar con llave la puerta al salir de casa.",
                "ans": ["to lock"],
                "exp": "Obligación o tarea hacia el futuro = remember TO lock.",
                "rule": "remember to do = acordarse de hacer la tarea"
            },
            {
                "id": "ex-gim-3", "type": "cloze",
                "prompt": "I clearly remember ___ (lock) the door because I checked it twice.",
                "hint": "Recuerdo claramente haber cerrado la puerta con llave.",
                "ans": ["locking"],
                "exp": "Recuerdo de una acción ya ocurrida en la memoria = remember LOCKING.",
                "rule": "remember doing = tener el recuerdo en la cabeza"
            },
            {
                "id": "ex-gim-4", "type": "multiple_choice",
                "prompt": "We regret ___ you that your application has been unsuccessful.",
                "hint": "Lamentamos comunicarle que su candidatura no ha sido seleccionada.",
                "options": ["to inform", "informing", "inform", "have informed"],
                "ans": ["to inform"],
                "exp": "Fórmula formal para dar malas noticias: 'We regret to inform you'. 'Regret doing' es arrepentirse de una acción pasada.",
                "rule": "regret to inform / tell"
            },
            {
                "id": "ex-gim-5", "type": "transformation",
                "prompt": "Reescribe usando REGRET:",
                "base": "I'm sorry that I lost my temper during the meeting.",
                "key": "REGRET",
                "hint": "I ___ my temper during the meeting.",
                "ans": ["regret losing", "I regret losing my temper during the meeting."],
                "exp": "Arrepentimiento de algo hecho en el pasado = regret + V-ing.",
                "rule": "regret losing"
            },
            {
                "id": "ex-gim-6", "type": "cloze",
                "prompt": "If the TV remote isn't working, try ___ (change) the batteries.",
                "hint": "Si el mando no funciona, prueba a cambiar las pilas.",
                "ans": ["changing"],
                "exp": "Experimentar como posible solución = try + -ing. 'Try to do' es hacer un gran esfuerzo.",
                "rule": "try + -ing (experimentar)"
            },
            {
                "id": "ex-gim-7", "type": "cloze",
                "prompt": "He tried ___ (lift) the heavy sofa, but it was impossible for one person.",
                "hint": "Intentó levantar el sofá pesado, pero fue imposible para una sola persona.",
                "ans": ["to lift"],
                "exp": "Hacer un esfuerzo físico o mental para conseguir algo = try TO lift.",
                "rule": "try to do (esforzarse)"
            },
            {
                "id": "ex-gim-8", "type": "error_correction",
                "prompt": "Corrige el error de deber futuro:",
                "base": "Don't forget taking your passport before leaving for the airport.",
                "err": "taking",
                "ans": ["to take", "Don't forget to take your passport before leaving for the airport."],
                "exp": "Obligación futura = don't forget TO take.",
                "rule": "forget to do"
            },
            {
                "id": "ex-gim-9", "type": "cloze",
                "prompt": "I will never forget ___ (meet) Lionel Messi in person in Barcelona.",
                "hint": "Nunca olvidaré haber conocido a Messi en persona.",
                "ans": ["meeting"],
                "exp": "Experiencia viva en el recuerdo = forget + -ing.",
                "rule": "forget meeting"
            },
            {
                "id": "ex-gim-10", "type": "multiple_choice",
                "prompt": "Accepting this promotion means ___ to London.",
                "hint": "Aceptar este ascenso implica mudarse a Londres.",
                "options": ["moving", "to move", "move", "moved"],
                "ans": ["moving"],
                "exp": "'Mean + -ing' significa 'implicar o conllevar'. 'Mean to do' significa 'tener la intención de'.",
                "rule": "mean + -ing = implicar / suponer"
            }
        ]
    },

    # ==================== 17. b2p-inversion-negative ====================
    {
        "unitId": "b2p-inversion-negative",
        "level": "B2+",
        "label": "Inversion with Negative & Restrictive Adverbials",
        "exercises": [
            {
                "id": "ex-inv-1", "type": "error_correction",
                "prompt": "Corrige la falta de inversión:",
                "base": "Never in my life I had seen such an extraordinary sunset.",
                "err": "I had seen",
                "ans": ["had I seen", "Never in my life had I seen such an extraordinary sunset."],
                "exp": "Al comenzar con 'Never', es obligatorio invertir el auxiliar como en una pregunta: HAD I seen.",
                "rule": "Never + had + Subject + V3"
            },
            {
                "id": "ex-inv-2", "type": "transformation",
                "prompt": "Reescribe usando HARDLY:",
                "base": "As soon as I sat down, the phone rang.",
                "key": "HARDLY",
                "hint": "Hardly ___ when the phone rang.",
                "ans": ["had I sat down", "Hardly had I sat down when the phone rang."],
                "exp": "Estructura fija: Hardly + had I sat down + WHEN.",
                "rule": "Hardly had I done ... when"
            },
            {
                "id": "ex-inv-3", "type": "cloze",
                "prompt": "Not only ___ (he / arrive) late, but he also forgot the key presentation documents.",
                "hint": "No solo llegó tarde, sino que además olvidó los documentos.",
                "ans": ["did he arrive"],
                "exp": "Inversión en pasado simple sin auxiliar existente: se añade 'did' (did he arrive).",
                "rule": "Not only did he arrive"
            },
            {
                "id": "ex-inv-4", "type": "multiple_choice",
                "prompt": "Under no circumstances ___ this emergency door be opened during flight.",
                "hint": "Bajo ningún concepto debe abrirse esta puerta de emergencia.",
                "options": ["should", "you should", "must you", "ought"],
                "ans": ["should"],
                "exp": "Inversión con 'Under no circumstances' + modal (should).",
                "rule": "Under no circumstances should..."
            },
            {
                "id": "ex-inv-5", "type": "error_correction",
                "prompt": "Corrige el conector que acompaña a 'No sooner':",
                "base": "No sooner had we left the house when the thunderstorm broke out.",
                "err": "when",
                "ans": ["than", "No sooner had we left the house than the thunderstorm broke out."],
                "exp": "'No sooner' lleva el comparativo THAN (no 'when'). 'Hardly' es el que lleva 'when'.",
                "rule": "No sooner had ... THAN"
            },
            {
                "id": "ex-inv-6", "type": "cloze",
                "prompt": "Little ___ (they / realize) that the police were monitoring their communications.",
                "hint": "Poco se imaginaban que la policía estaba vigilando sus comunicaciones.",
                "ans": ["did they realize", "did they realise"],
                "exp": "Inversión con 'Little' en pasado: Little did they realize.",
                "rule": "Little did they realize"
            },
            {
                "id": "ex-inv-7", "type": "transformation",
                "prompt": "Reescribe con SELDOM:",
                "base": "We rarely witness such incredible artistic talent.",
                "key": "SELDOM",
                "hint": "Seldom ___ such incredible artistic talent.",
                "ans": ["do we witness", "Seldom do we witness such incredible artistic talent."],
                "exp": "Inversión en Present Simple con 'do': Seldom do we witness.",
                "rule": "Seldom do we witness"
            },
            {
                "id": "ex-inv-8", "type": "cloze",
                "prompt": "Only after the match had finished ___ (we / discover) the referee's mistake.",
                "hint": "Solo después de que terminara el partido descubrimos el error del árbitro.",
                "ans": ["did we discover"],
                "exp": "Con 'Only after / Only when', la inversión va en la segunda cláusula principal: did we discover.",
                "rule": "Only after... did we discover"
            },
            {
                "id": "ex-inv-9", "type": "multiple_choice",
                "prompt": "Rarely ___ such dedication in a young athlete.",
                "hint": "Rara vez he visto semejante dedicación en un deportista joven.",
                "options": ["have I seen", "I have seen", "I saw", "did I seen"],
                "ans": ["have I seen"],
                "exp": "Rarely + auxiliar (have) + sujeto (I) + participio (seen).",
                "rule": "Rarely have I seen"
            },
            {
                "id": "ex-inv-10", "type": "cloze",
                "prompt": "At no time ___ (the company / inform) the public about the chemical leak.",
                "hint": "En ningún momento informó la empresa al público sobre la fuga química.",
                "ans": ["did the company inform"],
                "exp": "At no time + did + subject + bare infinitive.",
                "rule": "At no time did the company inform"
            }
        ]
    },

    # ==================== 18. b2p-impersonal-passive ====================
    {
        "unitId": "b2p-impersonal-passive",
        "level": "B2+",
        "label": "Impersonal & Personal Passive (Is said to / Believed to)",
        "exercises": [
            {
                "id": "ex-imp-1", "type": "transformation",
                "prompt": "Pasa a pasiva personal empezando por THE CEO:",
                "base": "People say that the CEO earns over ten million euros a year.",
                "key": "SAID",
                "hint": "The CEO ___ over ten million euros a year.",
                "ans": ["is said to earn", "The CEO is said to earn over ten million euros a year."],
                "exp": "Estructura personal: Sujeto + is said + TO infinitive.",
                "rule": "is said to earn"
            },
            {
                "id": "ex-imp-2", "type": "transformation",
                "prompt": "Reescribe con infinitivo perfecto:",
                "base": "The police believe that the suspect fled the country last night.",
                "key": "BELIEVED",
                "hint": "The suspect ___ the country last night.",
                "ans": ["is believed to have fled", "The suspect is believed to have fled the country last night."],
                "exp": "Como la huida ocurrió antes de la creencia (last night), se usa infinitivo perfecto: to have fled.",
                "rule": "is believed TO HAVE fled"
            },
            {
                "id": "ex-imp-3", "type": "error_correction",
                "prompt": "Corrige el uso erróneo de 'that':",
                "base": "He is thought that he is hiding in South America.",
                "err": "is thought that he is hiding",
                "ans": ["is thought to be hiding", "He is thought to be hiding in South America."],
                "exp": "Si el sujeto es la persona ('He'), debe seguir infinitivo ('to be hiding'), no 'that'.",
                "rule": "He is thought TO BE hiding"
            },
            {
                "id": "ex-imp-4", "type": "cloze",
                "prompt": "It is widely ___ (creer) that excessive sugar consumption causes health issues.",
                "hint": "Se cree ampliamente que el consumo excesivo de azúcar causa problemas de salud.",
                "ans": ["believed", "accepted"],
                "exp": "Estructura impersonal con 'It': It is widely believed that...",
                "rule": "It is believed that..."
            },
            {
                "id": "ex-imp-5", "type": "multiple_choice",
                "prompt": "The historical painting is considered ___ a masterpiece of the Renaissance.",
                "hint": "Se considera que la pintura histórica es una obra maestra del Renacimiento.",
                "options": ["to be", "that is", "being", "as be"],
                "ans": ["to be"],
                "exp": "is considered + TO BE.",
                "rule": "is considered to be"
            },
            {
                "id": "ex-imp-6", "type": "transformation",
                "prompt": "Reescribe usando EXPECTED:",
                "base": "Economists expect that house prices will fall next quarter.",
                "key": "EXPECTED",
                "hint": "House prices ___ next quarter.",
                "ans": ["are expected to fall", "House prices are expected to fall next quarter."],
                "exp": "House prices (plural) + ARE EXPECTED TO FALL.",
                "rule": "are expected to fall"
            },
            {
                "id": "ex-imp-7", "type": "cloze",
                "prompt": "The ancient fortress is understood ___ (build) in the twelfth century.",
                "hint": "Se tiene entendido que la antigua fortaleza fue construida en el siglo XII.",
                "ans": ["to have been built"],
                "exp": "Infinitivo pasivo de pasado: to have been built.",
                "rule": "to have been built"
            },
            {
                "id": "ex-imp-8", "type": "multiple_choice",
                "prompt": "The stolen jewels are reported ___ by customs officers at the airport.",
                "hint": "Se informa de que las joyas robadas han sido interceptadas por funcionarios de aduanas.",
                "options": ["to have been found", "to find", "finding", "that they found"],
                "ans": ["to have been found"],
                "exp": "Acción pasada y pasiva = to have been found.",
                "rule": "to have been found"
            },
            {
                "id": "ex-imp-9", "type": "transformation",
                "prompt": "Reescribe con THOUGHT:",
                "base": "They think that the missing hikers have found shelter in a cave.",
                "key": "THOUGHT",
                "hint": "The missing hikers ___ shelter in a cave.",
                "ans": ["are thought to have found", "The missing hikers are thought to have found shelter in a cave."],
                "exp": "Hikers (plural) + ARE THOUGHT TO HAVE FOUND.",
                "rule": "are thought to have found"
            },
            {
                "id": "ex-imp-10", "type": "cloze",
                "prompt": "The new drug is claimed ___ (reduce) recovery times by half.",
                "hint": "Se afirma que el nuevo fármaco reduce los tiempos de recuperación a la mitad.",
                "ans": ["to reduce"],
                "exp": "is claimed + TO REDUCE.",
                "rule": "is claimed to reduce"
            }
        ]
    },

    # ==================== 19. b2p-unreal-past-rather-time ====================
    {
        "unitId": "b2p-unreal-past-rather-time",
        "level": "B2+",
        "label": "Unreal Past (Would Rather, It's High Time)",
        "exercises": [
            {
                "id": "ex-unr-1", "type": "error_correction",
                "prompt": "Corrige el tiempo presente tras 'It's time':",
                "base": "It is high time you start looking for a permanent job.",
                "err": "start looking",
                "ans": ["started looking", "It is high time you started looking for a permanent job."],
                "exp": "Después de 'It's high time + sujeto', el verbo va OBLIGATORIAMENTE en Past Simple (started looking).",
                "rule": "It's high time + Subject + Past Simple"
            },
            {
                "id": "ex-unr-2", "type": "transformation",
                "prompt": "Reescribe usando RATHER:",
                "base": "I prefer you not to smoke inside my flat.",
                "key": "RATHER",
                "hint": "I would ___ inside my flat.",
                "ans": ["rather you didn't smoke", "rather you did not smoke", "I would rather you didn't smoke inside my flat."],
                "exp": "'Would rather + sujeto' exige Past Simple para acciones presentes/futuras: didn't smoke.",
                "rule": "would rather you didn't smoke"
            },
            {
                "id": "ex-unr-3", "type": "cloze",
                "prompt": "It's 2 AM; it's about time we ___ (go) home and got some rest.",
                "hint": "Son las 2 de la madrugada; ya va siendo hora de que nos vayamos a casa.",
                "ans": ["went"],
                "exp": "It's about time + we + Past Simple (went).",
                "rule": "it's about time we went"
            },
            {
                "id": "ex-unr-4", "type": "error_correction",
                "prompt": "Corrige el uso de 'to' con 'would rather':",
                "base": "I would rather to stay at home tonight than go to the pub.",
                "err": "to stay",
                "ans": ["stay", "I would rather stay at home tonight than go to the pub."],
                "exp": "Sin cambio de sujeto, 'would rather' lleva infinitivo SIN 'to' (stay).",
                "rule": "would rather + bare infinitive"
            },
            {
                "id": "ex-unr-5", "type": "multiple_choice",
                "prompt": "He speaks about philosophy as if he ___ an expert professor.",
                "hint": "Habla de filosofía como si fuera un catedrático experto (pero no lo es).",
                "options": ["were", "is", "has been", "will be"],
                "ans": ["were", "was"],
                "exp": "'As if / as though' con situación hipotética irreal = were o was.",
                "rule": "as if + were"
            },
            {
                "id": "ex-unr-6", "type": "transformation",
                "prompt": "Reescribe usando PAID:",
                "base": "I want you to pay me back the money today.",
                "key": "PAID",
                "hint": "I'd rather you ___ the money today.",
                "ans": ["paid me back", "paid back", "I'd rather you paid me back the money today."],
                "exp": "I'd rather + persona + verbo en pasado (paid).",
                "rule": "I'd rather you paid"
            },
            {
                "id": "ex-unr-7", "type": "cloze",
                "prompt": "It is high time the city council ___ (take) action against illegal parking.",
                "hint": "Ya es hora de que el ayuntamiento tome medidas contra el estacionamiento ilegal.",
                "ans": ["took"],
                "exp": "It is high time + subject + Past Simple (took).",
                "rule": "took action"
            },
            {
                "id": "ex-unr-8", "type": "multiple_choice",
                "prompt": "Would you rather I ___ back tomorrow morning?",
                "hint": "¿Preferirías que volviera mañana por la mañana?",
                "options": ["came", "come", "will come", "to come"],
                "ans": ["came"],
                "exp": "Would you rather + I + Past Simple (came).",
                "rule": "Would you rather I came...?"
            },
            {
                "id": "ex-unr-9", "type": "cloze",
                "prompt": "I'd rather you ___ (not tell) anyone about our secret conversation.",
                "hint": "Preferiría que no le contaras a nadie sobre nuestra conversación secreta.",
                "ans": ["didn't tell", "did not tell"],
                "exp": "Negativa tras would rather + sujeto = didn't tell.",
                "rule": "didn't tell"
            },
            {
                "id": "ex-unr-10", "type": "transformation",
                "prompt": "Reescribe usando TIME:",
                "base": "You should wash your dirty laundry now.",
                "key": "TIME",
                "hint": "It is ___ your dirty laundry.",
                "ans": ["time you washed", "high time you washed", "It is time you washed your dirty laundry."],
                "exp": "It is time you washed...",
                "rule": "It is time you washed"
            }
        ]
    },

    # ==================== 20. b2p-cleft-participle ====================
    {
        "unitId": "b2p-cleft-participle",
        "level": "B2+",
        "label": "Cleft Sentences & Participle Clauses",
        "exercises": [
            {
                "id": "ex-clp-1", "type": "transformation",
                "prompt": "Reescribe usando WHAT para enfatizar:",
                "base": "I really need a quiet holiday in the mountains.",
                "key": "WHAT",
                "hint": "___ is a quiet holiday in the mountains.",
                "ans": ["What I really need", "What I need", "What I really need is a quiet holiday in the mountains."],
                "exp": "Cleft sentence con WHAT: 'What I really need is...'.",
                "rule": "What + clause + is/was"
            },
            {
                "id": "ex-clp-2", "type": "transformation",
                "prompt": "Reescribe usando IT para enfatizar a la persona:",
                "base": "Daniel broke the office coffee machine, not Peter.",
                "key": "IT",
                "hint": "___ broke the office coffee machine.",
                "ans": ["It was Daniel who", "It was Daniel that", "It was Daniel who broke the office coffee machine."],
                "exp": "Cleft sentence con IT: 'It was Daniel who broke...'.",
                "rule": "It was [person] who..."
            },
            {
                "id": "ex-clp-3", "type": "cloze",
                "prompt": "___ (hear) a loud crash downstairs, he immediately called the emergency services.",
                "hint": "Al oír un fuerte estrépito abajo, llamó inmediatamente a emergencias.",
                "ans": ["Hearing"],
                "exp": "Participle clause de acción consecutiva o temporal activa = Hearing.",
                "rule": "Hearing ... he called"
            },
            {
                "id": "ex-clp-4", "type": "cloze",
                "prompt": "___ (have / spend) all his inheritance, he was forced to find a job.",
                "hint": "Habiéndose gastado toda su herencia, se vio obligado a buscar trabajo.",
                "ans": ["Having spent"],
                "exp": "Perfect participle para enfatizar que la primera acción concluyó antes: Having spent.",
                "rule": "Having + Past Participle"
            },
            {
                "id": "ex-clp-5", "type": "error_correction",
                "prompt": "Corrige el error en la cleft sentence:",
                "base": "The thing what annoyed me most was his complete lack of respect.",
                "err": "The thing what",
                "ans": ["What", "The thing that", "What annoyed me most was his complete lack of respect."],
                "exp": "NUNCA se dice 'The thing what'; se usa 'What' a secas o 'The thing that'.",
                "rule": "What annoyed me / The thing that annoyed me"
            },
            {
                "id": "ex-clp-6", "type": "transformation",
                "prompt": "Reescribe usando ALL:",
                "base": "I only asked for a little bit of honesty.",
                "key": "ALL",
                "hint": "___ for was a little bit of honesty.",
                "ans": ["All I asked", "All that I asked", "All I asked for was a little bit of honesty."],
                "exp": "Cleft sentence enfática con ALL: 'All I asked for was...'.",
                "rule": "All I asked for was..."
            },
            {
                "id": "ex-clp-7", "type": "multiple_choice",
                "prompt": "___ by the shocking news, she was unable to speak for several minutes.",
                "hint": "Conmocionada por la impactante noticia, fue incapaz de hablar durante varios minutos.",
                "options": ["Shocked", "Shocking", "Having shock", "To shock"],
                "ans": ["Shocked"],
                "exp": "Past participle clause con significado pasivo: Shocked by the news...",
                "rule": "Past participle clause (Shocked by...)"
            },
            {
                "id": "ex-clp-8", "type": "cloze",
                "prompt": "Not ___ (know) which bus to take, I asked a police officer for directions.",
                "hint": "Al no saber qué autobús coger, le pregunté a un policía.",
                "ans": ["knowing"],
                "exp": "Participle clause negativa: Not knowing...",
                "rule": "Not knowing..."
            },
            {
                "id": "ex-clp-9", "type": "transformation",
                "prompt": "Reescribe usando REASON:",
                "base": "I called you because I wanted to confirm tomorrow's meeting.",
                "key": "REASON",
                "hint": "The ___ I called you was to confirm tomorrow's meeting.",
                "ans": ["reason why", "reason that", "The reason why I called you was to confirm tomorrow's meeting."],
                "exp": "The reason why I called you was...",
                "rule": "The reason why..."
            },
            {
                "id": "ex-clp-10", "type": "cloze",
                "prompt": "___ (finish) the exam early, she checked her answers carefully before submitting.",
                "hint": "Al haber terminado el examen pronto, revisó sus respuestas cuidadosamente.",
                "ans": ["Having finished"],
                "exp": "Having finished the exam early...",
                "rule": "Having finished"
            }
        ]
    }
]

# Build TypeScript Code
code_lines = [
    "import { Exercise } from '../types';",
    "",
    "// Banco ampliado con 10 ejercicios dedicados por cada una de las 20 unidades gramaticales (200 ejercicios totales)",
    "export const EXPANDED_GRAMMAR_DRILLS: Exercise[] = ["
]

for unit in ALL_UNITS:
    unit_id = unit["unitId"]
    lvl = unit["level"]
    lbl = unit["label"]
    for ex in unit["exercises"]:
        code_lines.append("  {")
        code_lines.append(f"    id: '{ex['id']}',")
        code_lines.append(f"    level: '{lvl}',")
        code_lines.append("    category: 'grammar',")
        code_lines.append(f"    topicId: '{unit_id}',")
        code_lines.append(f"    topicLabel: {json.dumps(lbl, ensure_ascii=False)},")
        code_lines.append(f"    type: '{ex['type']}',")
        code_lines.append(f"    prompt: {json.dumps(ex['prompt'], ensure_ascii=False)},")
        if "base" in ex:
            code_lines.append(f"    baseSentence: {json.dumps(ex['base'], ensure_ascii=False)},")
        if "err" in ex:
            code_lines.append(f"    errorWord: {json.dumps(ex['err'], ensure_ascii=False)},")
        if "key" in ex:
            code_lines.append(f"    keyWord: {json.dumps(ex['key'], ensure_ascii=False)},")
        if "hint" in ex:
            code_lines.append(f"    spanishHint: {json.dumps(ex['hint'], ensure_ascii=False)},")
        if "options" in ex:
            code_lines.append(f"    options: {json.dumps(ex['options'], ensure_ascii=False)},")
        code_lines.append(f"    acceptedAnswers: {json.dumps(ex['ans'], ensure_ascii=False)},")
        code_lines.append(f"    explanation: {json.dumps(ex['exp'], ensure_ascii=False)},")
        code_lines.append(f"    grammarRule: {json.dumps(ex['rule'], ensure_ascii=False)}")
        code_lines.append("  },")

code_lines.append("];")
code_lines.append("")

with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
    f.write("\n".join(code_lines))

print(f"Generated {len(ALL_UNITS) * 10} grammar exercises successfully in {OUTPUT_PATH}")
