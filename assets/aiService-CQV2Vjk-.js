function e(e){if(!e)return null;let t=e.toLowerCase().trim(),n=t.match(/s?(\d+)[xe](\d+)/i);if(n)return{season:parseInt(n[1],10),episode:parseInt(n[2],10)};let r=t.match(/(?:temporada|season|temp|t)\s*[:#]?\s*(\d+)/i),i=t.match(/(?:episodio|episodi|capitulo|capítulo|episode|ep|cap|e)\s*[:#]?\s*(\d+)/i);return r&&i?{season:parseInt(r[1],10),episode:parseInt(i[1],10)}:r&&!i?{season:parseInt(r[1],10),episode:1}:!r&&i?{season:1,episode:parseInt(i[1],10)}:null}function t(e){return e.replace(/\(.*?\)/g,``).replace(/\[.*?\]/g,``).replace(/\b(?:serie|series|netflix|amazon|prime|hbo|max|apple\s*tv|disney\+?)\b/gi,``).trim()}async function n(e,t=4500){let n=new AbortController,r=setTimeout(()=>n.abort(),t);try{return await fetch(e,{signal:n.signal})}finally{clearTimeout(r)}}async function r(r,i){try{let a=e(i),o=t(r);if(!o)return null;let s=await n(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(o)}`);if(!s.ok)return null;let c=await s.json();if(!c||c.length===0)return null;let l=c.find(e=>e.show.name.toLowerCase()===o.toLowerCase()),u=l?l.show:c[0].show,d=await n(`https://api.tvmaze.com/shows/${u.id}/episodes`);if(!d.ok)return null;let f=await d.json();if(!Array.isArray(f)||f.length===0)return null;let p=a?f.find(e=>e.season===a.season&&e.number===a.episode):null;if(!p&&a&&(p=f.find(e=>e.season===a.season)||null),!p)return null;let m=(p.summary||``).replace(/<[^>]+>/g,` `).replace(/\s+/g,` `).trim();return{showName:u.name,episodeName:p.name||`Episodio ${p.number}`,season:p.season,number:p.number,summary:m||`Episodio ${p.number} de la temporada ${p.season} de ${u.name}.`,airdate:p.airdate,imageUrl:p.image?.medium||u.image?.medium}}catch(e){return console.warn(`No se pudo consultar TVMaze en vivo:`,e),null}}var i=`engdrill_ai_config_v1`;function a(){try{let e=localStorage.getItem(i);if(e)return JSON.parse(e)}catch{}return{provider:`groq`,apiKey:``,model:`auto`}}function o(e){localStorage.setItem(i,JSON.stringify(e))}function s(e){let t=e.apiKey.trim();return t.startsWith(`AIza`)?{provider:`gemini`,baseUrl:`https://generativelanguage.googleapis.com/v1beta`,apiKey:t}:t.startsWith(`xai-`)?{provider:`xai`,baseUrl:`https://api.x.ai/v1`,apiKey:t}:t.startsWith(`sk-or-`)?{provider:`openrouter`,baseUrl:`https://openrouter.ai/api/v1`,apiKey:t}:t.startsWith(`gsk_`)?{provider:`groq`,baseUrl:`https://api.groq.com/openai/v1`,apiKey:t}:t.startsWith(`sk-`)?{provider:`openai`,baseUrl:`https://api.openai.com/v1`,apiKey:t}:e.provider===`gemini`?{provider:`gemini`,baseUrl:`https://generativelanguage.googleapis.com/v1beta`,apiKey:t}:e.provider===`openai`?{provider:`openai`,baseUrl:`https://api.openai.com/v1`,apiKey:t}:{provider:`groq`,baseUrl:`https://api.groq.com/openai/v1`,apiKey:t}}async function c(e,t={},n=18e3){let r=new AbortController,i=setTimeout(()=>r.abort(),n);try{return await fetch(e,{...t,signal:r.signal})}catch(e){throw e instanceof Error&&e.name===`AbortError`?Error(`La IA tardó más de ${Math.round(n/1e3)}s en responder. Reinténtalo o elige un modelo más rápido en Ajustes IA.`):e}finally{clearTimeout(i)}}async function l(e){let t=s(e);if(!t.apiKey)return[];if(t.provider===`gemini`)try{let e=await c(`${t.baseUrl}/models?key=${t.apiKey}`,{},8e3);if(!e.ok)return[`gemini-3.8-flash`,`gemini-3.5-flash-lite`,`gemini-4-hydrogen`,`gemini-2.5-flash-lite`];let n=((await e.json()).models||[]).filter(e=>{let t=e.supportedGenerationMethods,n=!Array.isArray(t)||t.includes(`generateContent`),r=(e.name||``).toLowerCase();return!(!n||!r.includes(`gemini`)||r.includes(`embedding`)||r.includes(`imagen`)||r.includes(`veo`)||r.includes(`lyria`)||r.includes(`tts`)||r.includes(`live`)||r.includes(`audio`)||r.includes(`transcribe`)||r.includes(`image`)||r.includes(`robotics`)||r.includes(`deep-research`)||r.includes(`2.0`)||r.includes(`1.5`)||r.includes(`1.0`))}).map(e=>(e.name||``).replace(`models/`,``)),r=[`gemini-3.8-flash`,`gemini-3.5-flash-lite`,`gemini-4-hydrogen`,`gemini-3.6-flash`,`gemini-2.5-flash-lite`,`gemini-2.5-flash`,`gemini-4-argon`,`gemini-4-carbon`];return n.sort((e,t)=>{let n=r.findIndex(t=>e.toLowerCase().includes(t.toLowerCase())),i=r.findIndex(e=>t.toLowerCase().includes(e.toLowerCase()));return n!==-1&&i!==-1?n-i:n===-1?i===-1?e.localeCompare(t):1:-1}),n.length>0?n:[`gemini-3.8-flash`,`gemini-3.5-flash-lite`,`gemini-4-hydrogen`,`gemini-2.5-flash-lite`]}catch{return[`gemini-3.8-flash`,`gemini-3.5-flash-lite`,`gemini-4-hydrogen`,`gemini-2.5-flash-lite`]}try{let e=await c(`${t.baseUrl}/models`,{headers:{Authorization:`Bearer ${t.apiKey}`}},8e3);if(!e.ok)return[];let n=((await e.json()).data||[]).map(e=>e.id).filter(e=>{let t=e.toLowerCase();return!(t.includes(`whisper`)||t.includes(`tts`)||t.includes(`guard`)||t.includes(`embed`)||t.includes(`moderation`)||t.includes(`dall-e`)||t.includes(`audio`)||t.includes(`realtime`)||t.includes(`transcribe`)||t.includes(`playai`)||t.includes(`allam`))}),r=[`llama-3.3-70b-versatile`,`llama-3.1-8b-instant`,`gpt-4o-mini`,`gpt-4.1-mini`,`grok-3-mini`,`grok-3`,`grok-2-latest`,`meta-llama/llama-4-scout-17b-16e-instruct`,`meta-llama/llama-4-maverick-17b-128e-instruct`,`openai/gpt-oss-20b`,`openai/gpt-oss-120b`,`gemma2-9b-it`,`llama3-70b-8192`,`llama3-8b-8192`,`gpt-4o`,`qwen/qwen3-32b`,`qwen-qwq-32b`,`deepseek-r1-distill-llama-70b`];return n.sort((e,t)=>{let n=r.findIndex(t=>e.toLowerCase().includes(t.toLowerCase())),i=r.findIndex(e=>t.toLowerCase().includes(e.toLowerCase()));return n!==-1&&i!==-1?n-i:n===-1?i===-1?e.localeCompare(t):1:-1}),n}catch{return[]}}function u(e){let t=e.trim().replace(/<think>[\s\S]*?<\/think>/gi,``).trim(),n=t.match(/```(?:json)?\s*([\s\S]*?)```/i);if(n)return n[1].trim();let r=t.indexOf(`{`),i=t.lastIndexOf(`}`);return r!==-1&&i>r?t.slice(r,i+1):t}async function d(e,t,n){if(!n.apiKey.trim())throw Error(`No has configurado una API Key todavía. Haz clic en el botón "Ajustes IA" arriba a la derecha.`);let r=s(n);if(r.provider===`gemini`){let i=[];n.model&&n.model!==`auto`&&n.model.includes(`gemini`)&&!n.model.includes(`2.0`)&&!n.model.includes(`1.5`)&&i.push(n.model);for(let e of[`gemini-3.8-flash`,`gemini-3.5-flash-lite`,`gemini-4-hydrogen`,`gemini-2.5-flash-lite`,`gemini-2.5-flash`])i.includes(e)||i.push(e);let a=``,s=new Set,d=async i=>{let s=await c(`${r.baseUrl}/models/${i}:generateContent?key=${r.apiKey}`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({contents:[{role:`user`,parts:[{text:`${e}\n\n${t}`}]}],generationConfig:{temperature:.4,responseMimeType:`application/json`}})},18e3);if(s.ok){let e=(await s.json()).candidates?.[0]?.content?.parts?.[0]?.text||`{}`;return n.model!==i&&o({...n,model:i}),u(e)}if(s.status===401||s.status===403)throw Error(`La API Key de Gemini no es válida o no tiene permisos. Revísala en "Ajustes IA".`);if(s.status===429)throw Error(`Has alcanzado el límite de peticiones de Gemini (429). Espera unos segundos e inténtalo de nuevo.`);return a=await s.text(),null};for(let e of i.slice(0,3)){s.add(e);let t=await d(e);if(t!==null)return t}let f=await l(n);for(let e of f.filter(e=>!s.has(e)).slice(0,2)){s.add(e);let t=await d(e);if(t!==null)return t}throw Error(`Error de Gemini API: ${a}`)}let i=!!(n.model&&n.model!==`auto`),a=[];if(i)a.push(n.model);else{let e=await l(n);a.push(...e)}a.length===0&&a.push(r.provider===`xai`?`grok-3-mini`:r.provider===`openai`?`gpt-4o-mini`:`llama-3.1-8b-instant`);let d=``,f=new Set;for(let s=0;s<a.length&&f.size<3;s++){let p=a[s];if(f.has(p))continue;f.add(p);let m=await c(`${r.baseUrl}/chat/completions`,{method:`POST`,headers:{"Content-Type":`application/json`,Authorization:`Bearer ${r.apiKey}`},body:JSON.stringify({model:p,temperature:.4,messages:[{role:`system`,content:e+`
IMPORTANT: Respond ONLY with a valid JSON object. No markdown, no extra text.`},{role:`user`,content:t}]})},18e3);if(m.ok){let e=(await m.json()).choices?.[0]?.message?.content||`{}`;return n.model!==p&&o({...n,model:p}),u(e)}let h=await m.text();if(d=`(${m.status}) ${h}`,m.status===401||m.status===403)throw Error(`La API Key introducida no es válida o ha caducado. Revisa la clave en "Ajustes IA".`);if(m.status===429)throw Error(`Límite temporal de peticiones alcanzado (429). Espera unos segundos e inténtalo de nuevo.`);if(i&&s===0&&(m.status===404||m.status===400)){let e=await l(n);for(let t of e)f.has(t)||a.push(t)}}throw Error(`No se pudo completar la petición con ningún modelo disponible: ${d}`)}function f(e,t){if(!e||!t)return!0;let n=e=>e.toLowerCase().replace(/[-–—]/g,` `).replace(/[.,!?;:'"’()]/g,``).replace(/\s+/g,` `).trim(),r=n(e),i=n(t);if(r===i)return!0;let a=r.split(` `),o=i.split(` `);if(a.length===o.length){let e=0,t=!0;for(let n=0;n<a.length;n++){let r=a[n],i=o[n];if(r!==i){if(Math.abs(r.length-i.length)<=1&&Math.max(r.length,i.length)>=5){let t=Math.abs(r.length-i.length),n=Math.min(r.length,i.length);for(let e=0;e<n;e++)r[e]!==i[e]&&t++;if(t<=2){e+=1;continue}}t=!1}}if(t&&e<=1)return!0}return!1}async function p(e,t){let n=a(),r=await d(`You are a creative Cambridge English story writer (A2+ to B2 Advanced) for Spanish speakers.
Write an engaging 3-paragraph story at level ${e} rich in phrasal verbs, connectors, and target grammar structures of level ${e}.
Also create 4 OPEN-ENDED QUESTIONS about the story where the student must WRITE full sentences in English (NOT fill-in-the-blank, NOT multiple choice).
Return ONLY valid JSON with this structure:
{
  "title": "Engaging Story Title",
  "genre": "Misterio / Vida Real / Viajes / etc.",
  "paragraphs": [
    "Paragraph 1...",
    "Paragraph 2...",
    "Paragraph 3..."
  ],
  "annotations": [
    {
      "phrase": "exact substring from one of the paragraphs",
      "type": "grammar" | "phrasal_verb" | "connector" | "vocab",
      "label": "Name of structure or phrasal verb",
      "explanationEs": "Why it is used here in Spanish"
    }
  ],
  "openQuestions": [
    {
      "questionEn": "Open question in English about the story or asking what the student would have done...",
      "questionEs": "Traducción de la pregunta al español",
      "targetStructureHint": "Pista: Responde usando una frase completa (ej. usando Past Perfect / un condicional / un phrasal verb del texto)",
      "sampleIdealAnswer": "A complete model sentence in English answering the question."
    }
  ]
}`,`Level: ${e}. Topic/Genre preference: "${t||`Una historia interesante con giro inesperado en la vida cotidiana, viajes o trabajo`}".
Ensure there are at least 5 annotations whose "phrase" matches exact substrings inside the paragraphs, and 4 openQuestions that require writing full sentences.`,n),i=JSON.parse(r);return{id:`ai-story-${Date.now()}`,level:e,title:i.title||`Historia Generada por IA`,genre:i.genre||`Narrativa IA`,paragraphs:Array.isArray(i.paragraphs)&&i.paragraphs.length>0?i.paragraphs:[`Once upon a time...`],annotations:Array.isArray(i.annotations)?i.annotations:[],openQuestions:(Array.isArray(i.openQuestions)?i.openQuestions:[]).map((e,t)=>({id:`ai-sq-${Date.now()}-${t}`,questionEn:e.questionEn||`What happened in the story?`,questionEs:e.questionEs||`¿Qué ocurrió en la historia?`,targetStructureHint:e.targetStructureHint||`Escribe una frase completa en inglés.`,sampleIdealAnswer:e.sampleIdealAnswer||``}))}}async function m(e,t,n,r){let i=a(),o=await d(`You are a practical, real-world English coach evaluating a Spanish student's written answer to a reading comprehension & reflection question (Level ${r}).
CRITICAL RULE — NON-PEDANTIC ORTHOGRAPHY:
The student uses English for everyday life and work, NOT academic proofreading.
- NEVER mark missing or extra hyphens as errors (e.g., "second hand" vs "second-hand", "well known" vs "well-known" are 100% VALID).
- NEVER mark missing apostrophes in contractions ("dont", "cant", "im"), capitalization, commas/periods, or minor 1-letter keyboard typos as errors.
- ONLY report real grammatical, verb tense, preposition, word order, or vocabulary mistakes in "errorsFound".

Evaluate BOTH:
1) Whether their answer makes sense according to the story.
2) Real grammatical, preposition, or vocabulary errors in their sentence (ignoring trivial punctuation/hyphens).
Return ONLY valid JSON:
{
  "isContentAccurate": true,
  "scoreOutOf10": 8,
  "correctedUserSentence": "The student's sentence with real grammar/vocabulary errors fixed",
  "b2UpgradeSentence": "How a B2/B2+ native speaker would express the same idea using rich grammar/phrasal verbs",
  "feedbackEs": "Explicación clara y directa en español sobre si ha respondido bien a la pregunta y qué tal la gramática práctica (sin ser tiquismiquis con guiones o puntuación)",
  "errorsFound": [
    {
      "wrong": "exact real grammar/vocabulary error from student",
      "right": "corrected part",
      "whyEs": "Por qué estaba mal explicado en español"
    }
  ]
}`,`Story Text:
"""
${e.join(`

`)}
"""
Question: "${t}"
Student's Written Answer: "${n}"`,i),s=JSON.parse(o),c=Array.isArray(s.errorsFound)?s.errorsFound:[],l=c.filter(e=>!f(e.wrong||``,e.right||``)),u=typeof s.scoreOutOf10==`number`?s.scoreOutOf10:8;return c.length>0&&l.length===0&&u<9&&(u=9.5),{isContentAccurate:s.isContentAccurate!==!1,scoreOutOf10:u,correctedUserSentence:s.correctedUserSentence||n,b2UpgradeSentence:s.b2UpgradeSentence||n,feedbackEs:s.feedbackEs||`Respuesta revisada.`,errorsFound:l}}async function h(e,t=50,n=[]){let r=a(),i=await d(`You are a native British English teacher creating practical vocabulary cards for a Spanish speaker.
The user requested vocabulary on: "${e}".
Generate ${t} distinct, useful vocabulary items or expressions.
CRITICAL INSTRUCTION: Do NOT include any of these words that the user already learned:
${n.slice(0,120).join(`, `)}

Return ONLY valid JSON with this exact structure:
{
  "words": [
    {
      "es": "Traducción clara y directa en español cotidiano",
      "en": "English word, past verb, or expression (lowercase unless proper noun)",
      "acceptedAnswers": ["en", "alternative form without to", "synonym"],
      "pron": "Pronunciación fonética escrita en español con tildes para leerla tal cual (ej. 'uént', 'túk', 'nó-ledzh', 'bi-jéi-vior')",
      "partOfSpeech": "verb" | "noun" | "adjective" | "connector" | "expression",
      "exampleEn": "Natural everyday British English sentence using the word",
      "exampleEs": "Traducción natural al español de la frase"
    }
  ]
}`,`Generate ${t} new words for topic: "${e}". Make sure phonetic pronunciations are in Spanish syllables with tildes on stressed syllables (e.g. 'nó-ledzh', 'túk', 'uént').`,r),o=JSON.parse(i);return(Array.isArray(o.words)?o.words:[]).map(t=>({es:t.es||``,en:(t.en||``).trim(),acceptedAnswers:Array.isArray(t.acceptedAnswers)&&t.acceptedAnswers.length>0?t.acceptedAnswers:[(t.en||``).trim()],pron:t.pron||``,category:e.toLowerCase().includes(`pasado`)?`past_verbs`:`custom_ai`,partOfSpeech:t.partOfSpeech||(e.toLowerCase().includes(`verbo`)?`verb`:`noun`),exampleEn:t.exampleEn||``,exampleEs:t.exampleEs||``}))}async function g(e,t){let n=a(),r=await d(`You are a British English tutor. The student is reading a text and encountered a word or expression they don't know: "${e}".
Provide a concise, practical breakdown for a Spanish speaker.
Return ONLY valid JSON:
{
  "meaningEs": "Significado exacto en español dentro de este contexto",
  "pron": "Pronunciación fonética en español con tildes (ej. 'nó-ledzh')",
  "partOfSpeech": "verbo / sustantivo / adjetivo / conector / phrasal verb",
  "exampleEn": "Another natural short sentence using this word",
  "exampleEs": "Traducción al español de la frase"
}`,`Word: "${e}". Context in story: "${t.slice(0,300)}"`,n),i=JSON.parse(r);return{meaningEs:i.meaningEs||`Significado no disponible`,pron:i.pron||``,partOfSpeech:i.partOfSpeech||`palabra`,exampleEn:i.exampleEn||``,exampleEs:i.exampleEs||``}}async function _(e,t,n,i,o){let s=a(),c=o||null;if(!c&&t===`series`)try{c=await r(e,n)}catch{}let l=await d(`You are a native British English linguist and pop culture tutor.
The student is watching or listening to:
- Title: "${e}"
- Media Type: ${t} (${t===`series`?`TV series episode`:t===`movie`?`movie / film`:`song / music track`})
${t===`series`?`- Episode / Season / Chapter: "${n}"`:t===`song`?`- Artist / Scope: "${n||`Canción completa`}"`:`- Scope: Full movie ("${n||`Película completa`}")`}
${i?`- Additional user notes / lyrics or plot details: "${i}"`:``}
${c?`
=== VERIFIED OFFICIAL EPISODE DATA (From Live TV Database) ===
Show: "${c.showName}"
Episode: Season ${c.season}, Episode ${c.number} — "${c.episodeName}"
Official Synopsis: "${c.summary}"
Air date: ${c.airdate||`Recent`}
MANDATORY: You MUST translate and adapt this official synopsis into Spanish for "synopsisEs" and base your questions and vocabulary directly on this confirmed plot, characters, and events!
`:``}

CRITICAL RULES AGAINST REFUSALS & HALLUCINATIONS:
1. STRICT ZERO-TOLERANCE PROHIBITION ON REFUSALS:
   - NEVER EVER reply with refusal text like "Lo siento, no dispongo de información...", "No tengo datos sobre este episodio...", "I do not have enough information...", or "As an AI, I cannot...".
   - The user is using this app to study English. A refusal is a fatal bug in the user experience.
   - If the season or episode is brand new, very recent, or not in your pre-training memory:
     * If VERIFIED OFFICIAL EPISODE DATA is provided above, USE IT 100%.
     * If NO verified data was found and the user provided no notes, DO NOT REFUSE. Instead, use the authentic universe, core characters, themes, and conflicts of "${e}" to generate a realistic, immersive scenario in Spanish, and extract authentic colloquial/street English words and questions fitting that world.

2. DISTINGUISH ADAPTATIONS CAREFULLY:
   - "The Gentlemen" Netflix TV series (Guy Ritchie): Stars Eddie Horniman (Duke of Halstead / Theo James), Susie Glass (Kaya Scodelario), Bobby Glass (Ray Winstone), Freddy Horniman (Daniel Ings), Geoff Seacombe (Vinnie Jones).
     * Season 1: Eddie inherits the Halstead estate, uncovers the weed empire underneath, and pays off Freddy's debt.
     * Season 2: Eddie and Susie expand their criminal empire into Europe and Italy:
       - S2 Episode 1 ("The Road to Kingdom"): Eddie hosts a lavish, high-stakes shooting party at Halstead estate with Italian mafia figures and an Arab Sheikh to secure political peerage and international distribution.
       - S2 Episode 2 ("There's a Rat in the Kitchen"): Eddie travels to Milan alongside Susie Glass to strike a dangerous pact with Mafia boss Marco Moretti, while back in England Freddy deals with recovery and sudden betrayals.
     * CRITICAL: Do NOT confuse with the 2019 movie! Mickey Pearson (Matthew McConaughey) and Ray (Charlie Hunnam) are from the 2019 MOVIE, NOT the Netflix series! In the Netflix series the protagonists are always Eddie Horniman and Susie Glass.

3. STRICTLY HONOR USER CORRECTIONS:
   - If the user provides notes or corrections about what actually happened, your synopsis, vocabulary and questions MUST be 100% faithful to the user's notes and the real characters. Never invent imaginary plots when the user gave real details.

4. AUTHENTIC UK / GENRE VOCABULARY:
   - Pick genuine slang, idioms or expressions from the real dialogue of that universe.

Generate a rich, authentic study session for this specific work.
You must provide:
1. "synopsisEs": A concise 2-sentence summary in Spanish of what happens in this episode/movie or what this song is about (its emotional tone, story or message).
2. "words": 6 to 8 UNCOMMON, colloquial, slang, idiomatic, phrasal verb, lyrical metaphor or distinctive English words/phrases actually used or strongly associated with this work. (Do NOT include basic A1/A2 words like "house", "car", "eat").
   For each word:
   - "id": "mw-1", "mw-2", etc.
   - "wordEn": English word, phrasal verb or idiom (e.g. "collateral", "proper dodgy", "leverage", "extortion", "take the piss", "geezer")
   - "pron": Phonetic guide in Spanish syllables with tildes (e.g. "kə-lét-ə-rəl", "gí-ser", "lé-və-ridzh")
   - "partOfSpeech": "noun" | "verb" | "adjective" | "expression" | "slang"
   - "acceptedMeaningsEs": array of accepted short Spanish meanings/translations the student might type (e.g. ["garantía", "aval", "fianza", "prenda"])
   - "primaryMeaningEs": clear definition in Spanish
   - "sceneContextEn": sample sentence or lyric-inspired usage showing how it is used in the context
   - "sceneContextEs": natural Spanish translation of that sentence
   - "explanationWhyEs": why it is used here, nuance or street usage
3. "questions": 3 EASYGOING, CONVERSATIONAL comprehension questions in everyday B1/B2 English — just like chatting casually with a friend who asks you about the show, movie, or song.
   STRICT RULES FOR QUESTIONS (VERY IMPORTANT):
   - Keep every question SHORT, CLEAR, and DOWN-TO-EARTH (max ~15 words in "questionEn").
   - Someone who just watched or listened to it must be able to answer effortlessly in 1–2 simple sentences.
   - Ask about clear main events, simple character feelings/actions, or (for songs) what the song feels like, its story/message, or a casual personal opinion (e.g. "Why did X get angry at the start?", "What happened when X met Y?", "What mood does this song put you in and why?").
   - STRICTLY FORBIDDEN: NO academic or literary-criticism questions, NO comparative essays, NO complex or formal vocabulary (NEVER use words like "depiction", "villainy", "pivotal", "alter the traditional", "descent into", "portrayal", "subvert", "juxtaposition", "thematic").
   For each question:
   - "id": "mq-1", "mq-2", "mq-3"
   - "questionEn": Short, casual question in everyday English
   - "questionEs": Natural, casual translation in Spanish
   - "sceneHintEs": Friendly, concrete 1-line memory cue in plain Spanish (e.g. "Recuerda la escena del bar cuando..." o "Piensa en el estribillo...") — NO essay instructions
   - "sampleIdealAnswerEn": Short, natural 1–2 sentence conversational answer in everyday B1/B2 English
   - "targetGrammarHint": Simple grammar tip in Spanish (e.g. "Responde en 1 o 2 frases sencillas usando Past Simple" o "Usa Present Simple para hablar del mensaje")

Return ONLY valid JSON matching this structure.`,t===`series`?`Generate episode analysis for "${e}" - "${n}". Keep vocabulary interesting/colloquial, and keep the 3 questions super relaxed, short, and conversational (like a friend asking what happened).`:t===`movie`?`Generate movie analysis for the film "${e}". Keep vocabulary interesting/colloquial, and keep the 3 questions super relaxed, short, and conversational (like a friend asking what happened).`:`Generate song analysis for the song "${e}". In synopsisEs (in Spanish), explain casually what the song is about, its mood and message. Pick 6-8 interesting colloquial words, British/urban slang, idioms or lyrical metaphors. Keep the 3 questions super relaxed, short, and conversational (like a friend asking what the song is about or what you think of it).`,s),u=JSON.parse(l),f=(u.synopsisEs||``).trim(),p=/no dispongo|no poseo|no tengo informaci[oó]n|lo siento|i do not have|cannot provide|sin informaci[oó]n/i.test(f);return(!f||p)&&(f=c?.summary?`En "${c.episodeName}" (${c.showName} T${c.season}E${c.number}): ${c.summary}`:t===`song`?`Canción centrada en "${e}", analizada a través de sus metáforas, expresiones idiomáticas y matices emocionales en inglés.`:`${t===`series`?`Episodio ambientado`:`Película ambientada`} en el universo de ${e}, donde los personajes se enfrentan a intensas situaciones características de la trama.`),{id:`media-session-${Date.now()}-${Math.random().toString(36).slice(2,6)}`,createdAt:Date.now(),mediaTitle:e,mediaType:t,episodeOrPart:n,synopsisEs:f,words:Array.isArray(u.words)?u.words.map((e,t)=>({id:e.id||`mw-${t+1}`,wordEn:(e.wordEn||``).trim(),pron:e.pron||``,partOfSpeech:e.partOfSpeech||`expression`,acceptedMeaningsEs:Array.isArray(e.acceptedMeaningsEs)&&e.acceptedMeaningsEs.length>0?e.acceptedMeaningsEs:[e.primaryMeaningEs||``],primaryMeaningEs:e.primaryMeaningEs||``,sceneContextEn:e.sceneContextEn||``,sceneContextEs:e.sceneContextEs||``,explanationWhyEs:e.explanationWhyEs||``})):[],questions:Array.isArray(u.questions)?u.questions.map((e,n)=>({id:e.id||`mq-${n+1}`,questionEn:e.questionEn||``,questionEs:e.questionEs||``,sceneHintEs:e.sceneHintEs||``,sampleIdealAnswerEn:e.sampleIdealAnswerEn||``,targetGrammarHint:e.targetGrammarHint||(t===`song`?`Responde en inglés usando expresiones de la canción.`:`Escribe tu respuesta en inglés en pasado.`)})):[]}}async function v(e,t,n,r,i){let o=a(),s=await d(`You are a friendly, non-pedantic British English teacher correcting a student's casual answer about a TV show / movie / song.
Work/Title: "${e}" (${t})
Question: "${n}"
Reference Answer: "${i}"
Student's Answer in English: "${r}"

Evaluate the student's answer in an encouraging, practical way:
1. Is the content generally accurate or reasonable for this episode, movie, or song's meaning (or a valid personal opinion)? Do NOT expect a long academic essay—1 or 2 simple sentences are totally fine.
2. Correct clear grammar, spelling, tense, and vocabulary mistakes (ignore minor punctuation like missing commas or hyphens).
3. Provide a fair score from 1 to 10.
4. Provide a clean corrected version of the user's sentence.
5. Provide a natural everyday British English / B2 upgrade sentence (keep it conversational, not stiff/academic).
6. List all errors found: { wrong, right, whyEs }.
7. Provide encouraging and clear feedback in Spanish.

Return ONLY a valid JSON object:
{
  "isContentAccurate": true,
  "scoreOutOf10": 8,
  "correctedUserSentence": "Sentence without mistakes",
  "b2UpgradeSentence": "Natural native British phrasing",
  "feedbackEs": "Feedback en español claro",
  "errorsFound": [
    {
      "wrong": "word or phrase with error",
      "right": "correction",
      "whyEs": "explicación en español"
    }
  ]
}`,`Evaluate: "${r}" for question: "${n}" in "${e}" (${t})`,o),c=JSON.parse(s);return{isContentAccurate:c.isContentAccurate??!0,scoreOutOf10:c.scoreOutOf10??7,correctedUserSentence:c.correctedUserSentence||r,b2UpgradeSentence:c.b2UpgradeSentence||i,feedbackEs:c.feedbackEs||`Respuesta revisada.`,errorsFound:Array.isArray(c.errorsFound)?c.errorsFound:[]}}function y(e,t){let n=e=>e.toLowerCase().normalize(`NFD`).replace(/[\u0300-\u036f]/g,``).replace(/[.,/#!$%^&*;:{}=\-_`~()?"'’]/g,``).trim(),r=n(e);return r?t.some(e=>{let t=n(e);if(!t)return!1;if(r===t||r.includes(t)||t.includes(r))return!0;let i=r.split(/\s+/).filter(e=>e.length>2),a=t.split(/\s+/).filter(e=>e.length>2);return i.some(e=>a.includes(e))}):!1}export{l as a,_ as c,r as d,g as i,a as l,v as n,p as o,m as r,h as s,y as t,o as u};