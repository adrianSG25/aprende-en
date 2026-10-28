# -*- coding: utf-8 -*-
import json
import os

EXTRA_ITEMS = [
    # Confusing words & False Friends extras
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

    # Additional Collocations
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

    # Additional Dependent Prepositions
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

    # Additional Word Formation Root Families
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

# Read existing build_all_vocab.py
vocab_script_path = os.path.join(os.path.dirname(__file__), 'build_all_vocab.py')
with open(vocab_script_path, 'r', encoding='utf-8') as f:
    script_text = f.read()

# Add extra items before EXERCISES
idx_exercises = script_text.find('EXERCISES = [')
if idx_exercises != -1:
    before = script_text[:idx_exercises]
    after = script_text[idx_exercises:]
    # insert extra items just before the closing bracket of ITEMS
    last_bracket_items = before.rfind(']')
    extra_items_json = ',\n' + json.dumps(EXTRA_ITEMS, ensure_ascii=False, indent=4)[2:-2]
    new_script = before[:last_bracket_items] + extra_items_json + '\n]\n\n' + after
    with open(vocab_script_path, 'w', encoding='utf-8') as f:
        f.write(new_script)
    print("Appended extra vocabulary items to build_all_vocab.py")
else:
    print("Could not find EXERCISES in build_all_vocab.py")
