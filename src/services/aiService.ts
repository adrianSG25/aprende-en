import { AIConfig, Exercise, Level, ExerciseCategory } from '../types';

const AI_CONFIG_KEY = 'engdrill_ai_config_v1';

export function getAIConfig(): AIConfig {
  try {
    const raw = localStorage.getItem(AI_CONFIG_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore
  }
  return {
    provider: 'groq',
    apiKey: '',
    model: 'auto'
  };
}

export function saveAIConfig(config: AIConfig): void {
  localStorage.setItem(AI_CONFIG_KEY, JSON.stringify(config));
}

// Detecta automáticamente el proveedor real según el prefijo de la API Key para evitar errores 404
function resolveProviderAndEndpoint(config: AIConfig): {
  provider: 'groq' | 'gemini' | 'openai' | 'xai' | 'openrouter';
  baseUrl: string;
  apiKey: string;
} {
  const key = config.apiKey.trim();

  if (key.startsWith('AIza')) {
    return {
      provider: 'gemini',
      baseUrl: 'https://generativelanguage.googleapis.com/v1beta',
      apiKey: key
    };
  }
  if (key.startsWith('xai-')) {
    return {
      provider: 'xai',
      baseUrl: 'https://api.x.ai/v1',
      apiKey: key
    };
  }
  if (key.startsWith('sk-or-')) {
    return {
      provider: 'openrouter',
      baseUrl: 'https://openrouter.ai/api/v1',
      apiKey: key
    };
  }
  if (key.startsWith('gsk_')) {
    return {
      provider: 'groq',
      baseUrl: 'https://api.groq.com/openai/v1',
      apiKey: key
    };
  }
  if (key.startsWith('sk-')) {
    return {
      provider: 'openai',
      baseUrl: 'https://api.openai.com/v1',
      apiKey: key
    };
  }

  // Si no tiene prefijo estándar, usar lo seleccionado en el desplegable
  if (config.provider === 'gemini') {
    return {
      provider: 'gemini',
      baseUrl: 'https://generativelanguage.googleapis.com/v1beta',
      apiKey: key
    };
  }
  if (config.provider === 'openai') {
    return {
      provider: 'openai',
      baseUrl: 'https://api.openai.com/v1',
      apiKey: key
    };
  }
  return {
    provider: 'groq',
    baseUrl: 'https://api.groq.com/openai/v1',
    apiKey: key
  };
}

// Consulta en vivo a la API qué modelos tiene disponibles esta cuenta/clave y elige el mejor modelo de texto
export async function fetchAvailableModelsForKey(config: AIConfig): Promise<string[]> {
  const resolved = resolveProviderAndEndpoint(config);
  if (!resolved.apiKey) return [];

  if (resolved.provider === 'gemini') {
    try {
      const res = await fetch(`${resolved.baseUrl}/models?key=${resolved.apiKey}`);
      if (!res.ok) return ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash'];
      const data = await res.json();
      const models: string[] = (data.models || [])
        .map((m: { name?: string }) => (m.name || '').replace('models/', ''))
        .filter((name: string) => name.includes('gemini') && !name.includes('embedding') && !name.includes('imagen'));
      return models.length > 0 ? models : ['gemini-2.5-flash', 'gemini-2.0-flash'];
    } catch {
      return ['gemini-2.5-flash', 'gemini-2.0-flash'];
    }
  }

  try {
    const res = await fetch(`${resolved.baseUrl}/models`, {
      headers: {
        Authorization: `Bearer ${resolved.apiKey}`
      }
    });
    if (!res.ok) return [];
    const data = await res.json();
    const rawIds: string[] = (data.data || []).map((m: { id: string }) => m.id);

    // Filtrar modelos que NO son de chat/texto (ej. whisper, tts, guard, embedding, moderation, vision-only)
    const chatModels = rawIds.filter((id) => {
      const low = id.toLowerCase();
      if (
        low.includes('whisper') ||
        low.includes('tts') ||
        low.includes('guard') ||
        low.includes('embed') ||
        low.includes('moderation') ||
        low.includes('dall-e') ||
        low.includes('audio') ||
        low.includes('realtime') ||
        low.includes('transcribe') ||
        low.includes('playai') ||
        low.includes('allam')
      ) {
        return false;
      }
      return true;
    });

    // Priorizar los mejores modelos conocidos si están en la lista de la cuenta
    const preferredOrder = [
      'llama-3.3-70b-versatile',
      'llama-3.1-8b-instant',
      'openai/gpt-oss-120b',
      'openai/gpt-oss-20b',
      'meta-llama/llama-4-scout-17b-16e-instruct',
      'meta-llama/llama-4-maverick-17b-128e-instruct',
      'qwen-qwq-32b',
      'qwen/qwen3-32b',
      'deepseek-r1-distill-llama-70b',
      'gemma2-9b-it',
      'llama3-70b-8192',
      'llama3-8b-8192',
      'grok-3-mini',
      'grok-3',
      'grok-2-latest',
      'gpt-4o-mini',
      'gpt-4.1-mini',
      'gpt-4o'
    ];

    chatModels.sort((a, b) => {
      const idxA = preferredOrder.findIndex((p) => a.toLowerCase().includes(p.toLowerCase()));
      const idxB = preferredOrder.findIndex((p) => b.toLowerCase().includes(p.toLowerCase()));
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return a.localeCompare(b);
    });

    return chatModels;
  } catch {
    return [];
  }
}

function extractCleanJson(text: string): string {
  const trimmed = text.trim();
  // Quitar etiquetas <think>...</think> si el modelo es de razonamiento (DeepSeek/Qwen)
  const withoutThink = trimmed.replace(/<think>[\s\S]*?<\/think>/gi, '').trim();
  const fenceMatch = withoutThink.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenceMatch) return fenceMatch[1].trim();
  const firstBrace = withoutThink.indexOf('{');
  const lastBrace = withoutThink.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace > firstBrace) {
    return withoutThink.slice(firstBrace, lastBrace + 1);
  }
  return withoutThink;
}

async function callLLMJson(systemPrompt: string, userPrompt: string, config: AIConfig): Promise<string> {
  if (!config.apiKey.trim()) {
    throw new Error('No has configurado una API Key todavía. Haz clic en el botón "IA / Móvil" arriba a la derecha.');
  }

  const resolved = resolveProviderAndEndpoint(config);

  // 1) Proveedor Gemini
  if (resolved.provider === 'gemini') {
    const candidateModels =
      config.model && config.model !== 'auto' && config.model.includes('gemini')
        ? [config.model, 'gemini-2.5-flash', 'gemini-2.0-flash']
        : ['gemini-2.5-flash', 'gemini-2.0-flash'];

    let lastErr = '';
    for (const mdl of candidateModels) {
      const url = `${resolved.baseUrl}/models/${mdl}:generateContent?key=${resolved.apiKey}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }] }],
          generationConfig: {
            temperature: 0.4,
            responseMimeType: 'application/json'
          }
        })
      });
      if (res.ok) {
        const data = await res.json();
        const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || '{}';
        return extractCleanJson(rawText);
      }
      lastErr = await res.text();
    }
    throw new Error(`Error de Gemini API: ${lastErr}`);
  }

  // 2) Proveedores compatibles con OpenAI (Groq, xAI Grok, OpenAI, OpenRouter)
  // Descubrimos qué modelos tiene activos la cuenta por si el modelo guardado ya no existe (404 model_not_found)
  const discoveredModels = await fetchAvailableModelsForKey(config);

  const candidateModels: string[] = [];
  if (config.model && config.model !== 'auto') {
    candidateModels.push(config.model);
  }
  for (const m of discoveredModels) {
    if (!candidateModels.includes(m)) {
      candidateModels.push(m);
    }
  }
  if (candidateModels.length === 0) {
    candidateModels.push(
      resolved.provider === 'xai'
        ? 'grok-3-mini'
        : resolved.provider === 'openai'
        ? 'gpt-4o-mini'
        : 'llama-3.1-8b-instant'
    );
  }

  let lastErrorText = '';

  for (const modelToTry of candidateModels.slice(0, 6)) {
    // Intento con response_format json_object primero
    const res = await fetch(`${resolved.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${resolved.apiKey}`
      },
      body: JSON.stringify({
        model: modelToTry,
        temperature: 0.4,
        messages: [
          { role: 'system', content: systemPrompt + '\nIMPORTANT: Respond ONLY with a valid JSON object. No markdown, no extra text.' },
          { role: 'user', content: userPrompt }
        ]
      })
    });

    if (res.ok) {
      const data = await res.json();
      const content = data.choices?.[0]?.message?.content || '{}';
      // Guardar este modelo que sí ha funcionado para futuras llamadas
      if (config.model !== modelToTry) {
        saveAIConfig({ ...config, model: modelToTry });
      }
      return extractCleanJson(content);
    }

    const errText = await res.text();
    lastErrorText = `(${res.status}) ${errText}`;

    // Si es error 401 (API Key inválida), no seguir probando otros modelos
    if (res.status === 401) {
      throw new Error('La API Key introducida no es válida o ha caducado (Error 401). Revisa la clave en el botón "IA / Móvil".');
    }
  }

  throw new Error(`No se pudo completar la petición con ningún modelo disponible: ${lastErrorText}`);
}

export async function generateAIExercisesBatch(
  level: Level,
  category: ExerciseCategory,
  customFocus: string,
  count: number = 5
): Promise<Exercise[]> {
  const config = getAIConfig();
  const sys = `You are an expert Cambridge English (A2+ to B2 Advanced) grammar and Use of English teacher for Spanish speakers.
Return ONLY valid JSON with the shape:
{
  "exercises": [
    {
      "level": "${level}",
      "category": "${category}",
      "topicLabel": "Short topic name",
      "type": "transformation" | "cloze" | "error_correction" | "translation" | "word_formation",
      "prompt": "Clear instruction in Spanish",
      "baseSentence": "Original English sentence (for transformation, error_correction, or word_formation)",
      "keyWord": "KEYWORD IN CAPS (if transformation or word_formation)",
      "spanishHint": "Target English sentence with ___ gap (for transformation) or Spanish translation",
      "acceptedAnswers": ["valid answer 1", "valid answer 2 with contraction"],
      "explanation": "Detailed grammatical explanation in Spanish explaining why this is the right answer",
      "grammarRule": "Short formula"
    }
  ]
}`;

  const usr = `Generate ${count} rigorous, non-repetitive English exercises for level ${level}, category "${category}".
Special user focus: "${customFocus || 'Mix of Key Word Transformations, Error Correction, Phrasal Verbs, and Cloze'}".
Make sure acceptedAnswers correspond ONLY to what goes inside the ___ gap (or the corrected phrase), and include both contracted and uncontracted variants.`;

  const jsonStr = await callLLMJson(sys, usr, config);
  const parsed = JSON.parse(jsonStr);
  const list = Array.isArray(parsed.exercises) ? parsed.exercises : [];

  return list.map((item: Partial<Exercise>, idx: number) => ({
    id: `ai-ex-${Date.now()}-${idx}`,
    level: (item.level as Level) || level,
    category: (item.category as ExerciseCategory) || category,
    topicLabel: item.topicLabel || 'Ejercicio Generado por IA',
    type: item.type || 'transformation',
    prompt: item.prompt || 'Completa el ejercicio:',
    baseSentence: item.baseSentence,
    keyWord: item.keyWord,
    spanishHint: item.spanishHint,
    acceptedAnswers: Array.isArray(item.acceptedAnswers) && item.acceptedAnswers.length > 0 ? item.acceptedAnswers : [''],
    explanation: item.explanation || 'Explicación generada por IA.',
    grammarRule: item.grammarRule || `${level} Grammar`
  }));
}

export interface AIWritingCorrectionResult {
  estimatedLevel: string;
  scoreOutOf100: number;
  generalFeedbackEs: string;
  correctedVersionEn: string;
  b2AdvancedUpgradeEn: string;
  lineByLineCorrections: {
    original: string;
    correction: string;
    explanationEs: string;
  }[];
  generatedDrillExercises: Exercise[];
}

// Filtra correcciones tiquismiquis (guiones como second hand vs second-hand, mayúsculas, apóstrofes, comas o erratas de 1 letra)
function isPedanticOrMinorOrthography(wrong: string, right: string): boolean {
  if (!wrong || !right) return true;
  const clean = (s: string) =>
    s
      .toLowerCase()
      .replace(/[-–—]/g, ' ')
      .replace(/[.,!?;:'"’()]/g, '')
      .replace(/\s+/g, ' ')
      .trim();

  const cw = clean(wrong);
  const cr = clean(right);

  // Si al quitar guiones, signos de puntuación, apóstrofes y mayúsculas son iguales (ej. "second hand" vs "second-hand", "dont" vs "don't", "monday" vs "Monday"), ignorar el error
  if (cw === cr) return true;

  // Si tienen exactamente las mismas palabras y solo hay 1 letra de diferencia por errata de teclado en una palabra de >= 5 letras, no marcarlo como fallo gramatical
  const wWords = cw.split(' ');
  const rWords = cr.split(' ');
  if (wWords.length === rWords.length) {
    let totalCharDiff = 0;
    let sameStructure = true;
    for (let i = 0; i < wWords.length; i++) {
      const a = wWords[i];
      const b = rWords[i];
      if (a === b) continue;
      if (Math.abs(a.length - b.length) <= 1 && Math.max(a.length, b.length) >= 5) {
        // Calcular diferencia simple
        let mismatches = Math.abs(a.length - b.length);
        const minLen = Math.min(a.length, b.length);
        for (let c = 0; c < minLen; c++) {
          if (a[c] !== b[c]) mismatches++;
        }
        if (mismatches <= 2) {
          totalCharDiff += 1;
          continue;
        }
      }
      sameStructure = false;
    }
    if (sameStructure && totalCharDiff <= 1) return true;
  }

  return false;
}

export async function evaluateWritingWithAI(
  userText: string,
  targetLevel: Level,
  promptTitle: string
): Promise<AIWritingCorrectionResult> {
  const config = getAIConfig();
  const sys = `You are a practical, encouraging English Writing Coach (from A2+ to B2 Advanced) helping a Spanish speaker communicate naturally in real-world and work contexts.
CRITICAL RULE: DO NOT be pedantic about orthography or punctuation!
- NEVER mark hyphens (e.g. "second hand" vs "second-hand"), missing apostrophes ("dont" vs "don't"), capitalization ("monday" vs "Monday"), commas, or minor 1-letter keyboard typos as errors.
- ONLY correct real GRAMMATICAL errors (wrong verb tense, wrong preposition, wrong word order, missing subject, false friends) or unnatural phrasing.
Return ONLY valid JSON matching this exact structure:
{
  "estimatedLevel": "e.g. B1+ / B2",
  "scoreOutOf100": 82,
  "generalFeedbackEs": "Detailed paragraph in Spanish assessing grammar, vocabulary, connectors, and practical communication.",
  "correctedVersionEn": "The user's text with real grammatical and lexical errors fixed naturally.",
  "b2AdvancedUpgradeEn": "A B2+ (Advanced) version of the user's text using natural phrasal verbs and strong connectors.",
  "lineByLineCorrections": [
    {
      "original": "exact wrong grammar phrase from user",
      "correction": "corrected English phrase",
      "explanationEs": "Why it was grammatically wrong in Spanish"
    }
  ],
  "generatedDrillExercises": [
    {
      "level": "${targetLevel}",
      "category": "grammar",
      "topicLabel": "Basado en tu Writing",
      "type": "transformation",
      "prompt": "Corrige o transforma este punto basado en tu texto:",
      "baseSentence": "...",
      "keyWord": "...",
      "spanishHint": "... ___ ...",
      "acceptedAnswers": ["..."],
      "explanation": "...",
      "grammarRule": "..."
    }
  ]
}`;

  const usr = `Target Level: ${targetLevel}
Task Title: ${promptTitle}
Student's Text:
"""
${userText}
"""
Analyze the text focusing ONLY on real grammar/vocabulary (ignore hyphens, commas, apostrophes, and minor spelling slips).`;

  const jsonStr = await callLLMJson(sys, usr, config);
  const parsed = JSON.parse(jsonStr);

  const rawCorrections = Array.isArray(parsed.lineByLineCorrections)
    ? parsed.lineByLineCorrections
    : [];
  const filteredCorrections = rawCorrections.filter(
    (c: { original?: string; correction?: string }) =>
      !isPedanticOrMinorOrthography(c.original || '', c.correction || '')
  );

  return {
    estimatedLevel: parsed.estimatedLevel || targetLevel,
    scoreOutOf100: typeof parsed.scoreOutOf100 === 'number' ? parsed.scoreOutOf100 : 80,
    generalFeedbackEs: parsed.generalFeedbackEs || 'Texto evaluado correctamente.',
    correctedVersionEn: parsed.correctedVersionEn || userText,
    b2AdvancedUpgradeEn: parsed.b2AdvancedUpgradeEn || userText,
    lineByLineCorrections: filteredCorrections,
    generatedDrillExercises: (Array.isArray(parsed.generatedDrillExercises) ? parsed.generatedDrillExercises : []).map(
      (ex: Partial<Exercise>, i: number) => ({
        id: `ai-wr-ex-${Date.now()}-${i}`,
        level: targetLevel,
        category: 'grammar',
        topicLabel: ex.topicLabel || 'Fallo de tu Writing',
        type: ex.type || 'transformation',
        prompt: ex.prompt || 'Completa el hueco:',
        baseSentence: ex.baseSentence,
        keyWord: ex.keyWord,
        spanishHint: ex.spanishHint,
        acceptedAnswers: Array.isArray(ex.acceptedAnswers) ? ex.acceptedAnswers : [''],
        explanation: ex.explanation || '',
        grammarRule: ex.grammarRule || ''
      })
    )
  };
}

// ==================== 3. GENERADOR DE HISTORIAS CON PREGUNTAS DE ESCRIBIR ====================

export interface AIStoryOpenQuestion {
  id: string;
  questionEn: string;
  questionEs: string;
  targetStructureHint: string;
  sampleIdealAnswer: string;
}

export interface AIGeneratedStory {
  id: string;
  level: Level;
  title: string;
  genre: string;
  paragraphs: string[];
  annotations: {
    phrase: string;
    type: 'grammar' | 'phrasal_verb' | 'connector' | 'vocab';
    label: string;
    explanationEs: string;
  }[];
  openQuestions: AIStoryOpenQuestion[];
}

export async function generateAIStoryWithOpenQuestions(
  level: Level,
  topicOrGenre: string
): Promise<AIGeneratedStory> {
  const config = getAIConfig();
  const sys = `You are a creative Cambridge English story writer (A2+ to B2 Advanced) for Spanish speakers.
Write an engaging 3-paragraph story at level ${level} rich in phrasal verbs, connectors, and target grammar structures of level ${level}.
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
}`;

  const usr = `Level: ${level}. Topic/Genre preference: "${topicOrGenre || 'Una historia interesante con giro inesperado en la vida cotidiana, viajes o trabajo'}".
Ensure there are at least 5 annotations whose "phrase" matches exact substrings inside the paragraphs, and 4 openQuestions that require writing full sentences.`;

  const jsonStr = await callLLMJson(sys, usr, config);
  const parsed = JSON.parse(jsonStr);

  return {
    id: `ai-story-${Date.now()}`,
    level,
    title: parsed.title || 'Historia Generada por IA',
    genre: parsed.genre || 'Narrativa IA',
    paragraphs: Array.isArray(parsed.paragraphs) && parsed.paragraphs.length > 0
      ? parsed.paragraphs
      : ['Once upon a time...'],
    annotations: Array.isArray(parsed.annotations) ? parsed.annotations : [],
    openQuestions: (Array.isArray(parsed.openQuestions) ? parsed.openQuestions : []).map(
      (q: Partial<AIStoryOpenQuestion>, idx: number) => ({
        id: `ai-sq-${Date.now()}-${idx}`,
        questionEn: q.questionEn || 'What happened in the story?',
        questionEs: q.questionEs || '¿Qué ocurrió en la historia?',
        targetStructureHint: q.targetStructureHint || 'Escribe una frase completa en inglés.',
        sampleIdealAnswer: q.sampleIdealAnswer || ''
      })
    )
  };
}

export interface OpenAnswerFeedback {
  isContentAccurate: boolean;
  scoreOutOf10: number;
  correctedUserSentence: string;
  b2UpgradeSentence: string;
  feedbackEs: string;
  errorsFound: {
    wrong: string;
    right: string;
    whyEs: string;
  }[];
}

export async function evaluateStoryOpenAnswerWithAI(
  storyParagraphs: string[],
  questionEn: string,
  userWrittenAnswer: string,
  level: Level
): Promise<OpenAnswerFeedback> {
  const config = getAIConfig();
  const sys = `You are a practical, real-world English coach evaluating a Spanish student's written answer to a reading comprehension & reflection question (Level ${level}).
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
}`;

  const usr = `Story Text:
"""
${storyParagraphs.join('\n\n')}
"""
Question: "${questionEn}"
Student's Written Answer: "${userWrittenAnswer}"`;

  const jsonStr = await callLLMJson(sys, usr, config);
  const parsed = JSON.parse(jsonStr);

  const rawErrors = Array.isArray(parsed.errorsFound) ? parsed.errorsFound : [];
  const filteredErrors = rawErrors.filter(
    (err: any) => !isPedanticOrMinorOrthography(err.wrong || '', err.right || '')
  );

  let finalScore = typeof parsed.scoreOutOf10 === 'number' ? parsed.scoreOutOf10 : 8;
  if (rawErrors.length > 0 && filteredErrors.length === 0 && finalScore < 9) {
    finalScore = 9.5;
  }

  return {
    isContentAccurate: parsed.isContentAccurate !== false,
    scoreOutOf10: finalScore,
    correctedUserSentence: parsed.correctedUserSentence || userWrittenAnswer,
    b2UpgradeSentence: parsed.b2UpgradeSentence || userWrittenAnswer,
    feedbackEs: parsed.feedbackEs || 'Respuesta revisada.',
    errorsFound: filteredErrors
  };
}

// ==================== 4. SITUACIONES DE LA VIDA REAL ("¿QUÉ LE RESPONDERÍAS?") ====================

export interface RoleplayScenario {
  id: string;
  level: Level;
  title: string;
  roleLabel: string;
  situationEs: string;
  characterSaysEn: string;
  characterSaysEs: string;
  yourGoalEs: string;
  usefulPhrases: string[];
  sampleResponseEn: string;
}

export async function generateAIRoleplayScenario(
  level: Level,
  customTopic: string
): Promise<RoleplayScenario> {
  const config = getAIConfig();
  const sys = `You are designing a practical real-life English conversational scenario (Level ${level}) for a Spanish speaker ("¿Qué le responderías?").
For example: at the mechanic's garage, landlord problem, airport desk, job negotiation, doctor, restaurant complaint, noisy neighbour, bank issue, etc.
Return ONLY valid JSON:
{
  "title": "Short title (e.g. En el Mecánico: Avería Cara)",
  "roleLabel": "Mechanic / Landlord / Boss / Flight Attendant / etc.",
  "situationEs": "Descripción en español del contexto en el que te encuentras",
  "characterSaysEn": "What the person says directly to you in natural English (2-3 sentences)",
  "characterSaysEs": "Traducción al español de lo que te acaba de decir",
  "yourGoalEs": "Tu objetivo al responderle (ej. Dile que es demasiado caro, pregúntale si hay una pieza de segunda mano y cuándo estará listo)",
  "usefulPhrases": ["phrase or phrasal verb 1", "phrase 2", "phrase 3"],
  "sampleResponseEn": "A natural, high-scoring model response in English"
}`;

  const usr = `Level: ${level}. Scenario topic: "${customTopic || 'Una situación cotidiana práctica donde tengas que defenderte, negociar o resolver un imprevisto en inglés'}".`;

  const jsonStr = await callLLMJson(sys, usr, config);
  const parsed = JSON.parse(jsonStr);

  return {
    id: `rp-ai-${Date.now()}`,
    level,
    title: parsed.title || 'Situación en Vivo',
    roleLabel: parsed.roleLabel || 'Interlocutor',
    situationEs: parsed.situationEs || '',
    characterSaysEn: parsed.characterSaysEn || '',
    characterSaysEs: parsed.characterSaysEs || '',
    yourGoalEs: parsed.yourGoalEs || 'Respóndele con tus propias palabras en inglés.',
    usefulPhrases: Array.isArray(parsed.usefulPhrases) ? parsed.usefulPhrases : [],
    sampleResponseEn: parsed.sampleResponseEn || ''
  };
}

export interface RoleplayEvaluationResult {
  scoreOutOf10: number;
  naturalCorrectedResponseEn: string;
  b2NativeAlternativeEn: string;
  feedbackSummaryEs: string;
  errorsList: {
    wrong: string;
    right: string;
    explanationEs: string;
  }[];
  characterFollowUpEn: string;
  characterFollowUpEs: string;
}

export async function evaluateRoleplayResponseWithAI(
  scenario: RoleplayScenario,
  userResponseEn: string
): Promise<RoleplayEvaluationResult> {
  const config = getAIConfig();
  const sys = `You are a practical, real-world English coach for Spanish speakers (focused on everyday, informal, and workplace communication, NOT pedantic academic proofreading).
The user is responding in English to a real-life situation (${scenario.level}).
CRITICAL RULE — DO NOT BE PEDANTIC ABOUT ORTHOGRAPHY OR PUNCTUATION:
- NEVER flag missing or extra hyphens as mistakes! For example, writing "second hand" instead of "second-hand", "well known" instead of "well-known", or "full time" instead of "full-time" is 100% CORRECT and natural in real-world messages.
- NEVER flag missing apostrophes in contractions ("dont", "cant", "im", "wont"), capitalization, commas, periods, or minor 1-letter keyboard typos.
- ONLY include genuine grammar mistakes (wrong verb tense, wrong preposition, Spanish false friends, broken word order, wrong vocabulary choice) in "errorsList".

Analyze their written response:
1) Point out ONLY genuine grammar, vocabulary, preposition, or structure mistakes (ignore hyphens, punctuation, and minor typos).
2) Give them their exact sentence with any real grammar errors fixed naturally.
3) Give them a B2/B2+ native-sounding version using phrasal verbs or idiomatic expressions.
4) Write how the interlocutor (${scenario.roleLabel}) replies next so the user can keep the conversation going if they want!
Return ONLY valid JSON:
{
  "scoreOutOf10": 8,
  "naturalCorrectedResponseEn": "The student's response with real grammar errors fixed",
  "b2NativeAlternativeEn": "How a fluent B2/B2+ speaker would say it in real life",
  "feedbackSummaryEs": "Valoración directa en español sobre su respuesta y gramática práctica (sin ser tiquismiquis con guiones, mayúsculas o puntuación)",
  "errorsList": [
    {
      "wrong": "exact real grammar/vocabulary mistake written by student",
      "right": "correct English form",
      "explanationEs": "Explicación clara en español de por qué estaba mal gramaticalmente"
    }
  ],
  "characterFollowUpEn": "What the mechanic/boss/landlord replies back to the student's message in English",
  "characterFollowUpEs": "Traducción al español de esa nueva respuesta"
}`;

  const usr = `Situation: ${scenario.situationEs}
${scenario.roleLabel} said: "${scenario.characterSaysEn}"
Goal: ${scenario.yourGoalEs}
Student replied: "${userResponseEn}"`;

  const jsonStr = await callLLMJson(sys, usr, config);
  const parsed = JSON.parse(jsonStr);

  const rawErrors = Array.isArray(parsed.errorsList) ? parsed.errorsList : [];
  const filteredErrors = rawErrors.filter(
    (err: any) => !isPedanticOrMinorOrthography(err.wrong || '', err.right || '')
  );

  let finalScore = typeof parsed.scoreOutOf10 === 'number' ? parsed.scoreOutOf10 : 8;
  if (rawErrors.length > 0 && filteredErrors.length === 0 && finalScore < 9) {
    finalScore = 9.5;
  }

  return {
    scoreOutOf10: finalScore,
    naturalCorrectedResponseEn: parsed.naturalCorrectedResponseEn || userResponseEn,
    b2NativeAlternativeEn: parsed.b2NativeAlternativeEn || userResponseEn,
    feedbackSummaryEs: parsed.feedbackSummaryEs || '¡Buena respuesta!',
    errorsList: filteredErrors,
    characterFollowUpEn: parsed.characterFollowUpEn || '',
    characterFollowUpEs: parsed.characterFollowUpEs || ''
  };
}

export interface GeneratedWordItem {
  es: string;
  en: string;
  acceptedAnswers: string[];
  pron: string;
  category: string;
  partOfSpeech: 'noun' | 'verb' | 'adjective' | 'connector' | 'expression';
  exampleEn: string;
  exampleEs: string;
}

export async function generateCustomVocabularyWithAI(
  topicPrompt: string,
  count: number = 50,
  existingWords: string[] = []
): Promise<GeneratedWordItem[]> {
  const config = getAIConfig();
  const sys = `You are a native British English teacher creating practical vocabulary cards for a Spanish speaker.
The user requested vocabulary on: "${topicPrompt}".
Generate ${count} distinct, useful vocabulary items or expressions.
CRITICAL INSTRUCTION: Do NOT include any of these words that the user already learned:
${existingWords.slice(0, 120).join(', ')}

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
}`;

  const usr = `Generate ${count} new words for topic: "${topicPrompt}". Make sure phonetic pronunciations are in Spanish syllables with tildes on stressed syllables (e.g. 'nó-ledzh', 'túk', 'uént').`;

  const jsonStr = await callLLMJson(sys, usr, config);
  const parsed = JSON.parse(jsonStr);
  const list = Array.isArray(parsed.words) ? parsed.words : [];

  return list.map((item: any) => ({
    es: item.es || '',
    en: (item.en || '').trim(),
    acceptedAnswers: Array.isArray(item.acceptedAnswers) && item.acceptedAnswers.length > 0
      ? item.acceptedAnswers
      : [(item.en || '').trim()],
    pron: item.pron || '',
    category: topicPrompt.toLowerCase().includes('pasado') ? 'past_verbs' : 'custom_ai',
    partOfSpeech: item.partOfSpeech || (topicPrompt.toLowerCase().includes('verbo') ? 'verb' : 'noun'),
    exampleEn: item.exampleEn || '',
    exampleEs: item.exampleEs || ''
  }));
}

export async function explainWordInStoryContextWithAI(
  word: string,
  storySnippet: string
): Promise<{
  meaningEs: string;
  pron: string;
  partOfSpeech: string;
  exampleEn: string;
  exampleEs: string;
}> {
  const config = getAIConfig();
  const sys = `You are a British English tutor. The student is reading a text and encountered a word or expression they don't know: "${word}".
Provide a concise, practical breakdown for a Spanish speaker.
Return ONLY valid JSON:
{
  "meaningEs": "Significado exacto en español dentro de este contexto",
  "pron": "Pronunciación fonética en español con tildes (ej. 'nó-ledzh')",
  "partOfSpeech": "verbo / sustantivo / adjetivo / conector / phrasal verb",
  "exampleEn": "Another natural short sentence using this word",
  "exampleEs": "Traducción al español de la frase"
}`;

  const usr = `Word: "${word}". Context in story: "${storySnippet.slice(0, 300)}"`;
  const jsonStr = await callLLMJson(sys, usr, config);
  const parsed = JSON.parse(jsonStr);

  return {
    meaningEs: parsed.meaningEs || 'Significado no disponible',
    pron: parsed.pron || '',
    partOfSpeech: parsed.partOfSpeech || 'palabra',
    exampleEn: parsed.exampleEn || '',
    exampleEs: parsed.exampleEs || ''
  };
}

// ==================== ANÁLISIS DE SERIES, PELÍCULAS Y LIBROS CON IA ====================
export interface MediaWordItem {
  id: string;
  wordEn: string;
  pron: string;
  partOfSpeech: 'noun' | 'verb' | 'adjective' | 'expression' | 'slang';
  acceptedMeaningsEs: string[];
  primaryMeaningEs: string;
  sceneContextEn: string;
  sceneContextEs: string;
  explanationWhyEs: string;
}

export interface MediaQuestionItem {
  id: string;
  questionEn: string;
  questionEs: string;
  sceneHintEs: string;
  sampleIdealAnswerEn: string;
  targetGrammarHint: string;
}

export interface MediaAnalysisSession {
  id: string;
  createdAt: number;
  mediaTitle: string;
  mediaType: 'series' | 'movie' | 'book';
  episodeOrPart: string;
  synopsisEs: string;
  words: MediaWordItem[];
  questions: MediaQuestionItem[];
}

export async function generateMediaAnalysisWithAI(
  mediaTitle: string,
  mediaType: 'series' | 'movie' | 'book',
  episodeOrPart: string,
  userNotes?: string
): Promise<MediaAnalysisSession> {
  const config = getAIConfig();
  const sys = `You are a native British English linguist and pop culture tutor.
The student is watching or reading:
- Title: "${mediaTitle}"
- Media Type: ${mediaType}
- Episode / Season / Chapter: "${episodeOrPart}"
${userNotes ? `- Additional user notes / real plot details: "${userNotes}"` : ''}

CRITICAL RULES AGAINST HALLUCINATIONS:
1. DISTINGUISH ADAPTATIONS CAREFULLY:
   - "The Gentlemen" Netflix TV series (2024, Guy Ritchie): Stars Eddie Horniman (Duke of Halstead / Theo James), Susie Glass (Kaya Scodelario), Freddy Horniman (Daniel Ings), Geoff Seacombe (Vinnie Jones). Season 1 has 8 episodes. Season 2 has not aired yet. If the user asks for Season 2 or an unaired episode, state clearly in synopsisEs that Season 2 has not aired yet and focus on Eddie Horniman, Susie Glass and the Halstead estate, OR follow the user's specific notes.
   - "The Gentlemen" 2019 Movie: Stars Mickey Pearson (Matthew McConaughey), Ray (Charlie Hunnam), Fletcher (Hugh Grant), Dry Eye. DO NOT confuse the 2019 movie characters (Mickey, Ray) with the 2024 Netflix series!
2. STRICTLY HONOR USER CORRECTIONS:
   - If the user provides notes or corrections about what actually happened, your synopsis, vocabulary and questions MUST be 100% faithful to the user's notes and the real characters. Never invent imaginary plots when the user gave real details.
3. AUTHENTIC UK VOCABULARY:
   - Pick genuine slang, idioms or expressions from the real dialogue of that universe.

Generate a rich, authentic study session for this specific episode/work.
You must provide:
1. "synopsisEs": A concise 2-sentence summary in Spanish of what happens in this episode/chapter.
2. "words": 6 to 8 UNCOMMON, colloquial, slang, idiomatic or distinctive British English words/phrases actually used or strongly associated with this episode. (Do NOT include basic A1/A2 words like "house", "car", "eat").
   For each word:
   - "id": "mw-1", "mw-2", etc.
   - "wordEn": English word, phrasal verb or idiom (e.g. "collateral", "proper dodgy", "leverage", "extortion", "take the piss", "geezer")
   - "pron": Phonetic guide in Spanish syllables with tildes (e.g. "kə-lét-ə-rəl", "gí-ser", "lé-və-ridzh")
   - "partOfSpeech": "noun" | "verb" | "adjective" | "expression" | "slang"
   - "acceptedMeaningsEs": array of accepted short Spanish meanings/translations the student might type (e.g. ["garantía", "aval", "fianza", "prenda"])
   - "primaryMeaningEs": clear definition in Spanish
   - "sceneContextEn": sample sentence showing how it is used in the episode
   - "sceneContextEs": natural Spanish translation of that sentence
   - "explanationWhyEs": why it is used here, nuance or British street usage
3. "questions": 3 open comprehension questions in English about specific plot events, character motivations or decisions in this episode.
   For each question:
   - "id": "mq-1", "mq-2", "mq-3"
   - "questionEn": Question in English
   - "questionEs": Translation in Spanish
   - "sceneHintEs": Scene context hint in Spanish
   - "sampleIdealAnswerEn": Complete, natural model answer in English
   - "targetGrammarHint": Grammar advice in Spanish (e.g. "Responde usando Past Simple o Past Continuous")

Return ONLY valid JSON matching this structure.`;

  const usr = `Generate episode analysis for "${mediaTitle}" - "${episodeOrPart}". Make sure vocabulary has words that are not common and require thinking to translate to Spanish.`;
  const jsonStr = await callLLMJson(sys, usr, config);
  const parsed = JSON.parse(jsonStr);

  return {
    id: `media-session-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    createdAt: Date.now(),
    mediaTitle,
    mediaType,
    episodeOrPart,
    synopsisEs: parsed.synopsisEs || `Análisis de ${mediaTitle} (${episodeOrPart}).`,
    words: Array.isArray(parsed.words)
      ? parsed.words.map((w: any, idx: number) => ({
          id: w.id || `mw-${idx + 1}`,
          wordEn: (w.wordEn || '').trim(),
          pron: w.pron || '',
          partOfSpeech: w.partOfSpeech || 'expression',
          acceptedMeaningsEs:
            Array.isArray(w.acceptedMeaningsEs) && w.acceptedMeaningsEs.length > 0
              ? w.acceptedMeaningsEs
              : [w.primaryMeaningEs || ''],
          primaryMeaningEs: w.primaryMeaningEs || '',
          sceneContextEn: w.sceneContextEn || '',
          sceneContextEs: w.sceneContextEs || '',
          explanationWhyEs: w.explanationWhyEs || ''
        }))
      : [],
    questions: Array.isArray(parsed.questions)
      ? parsed.questions.map((q: any, idx: number) => ({
          id: q.id || `mq-${idx + 1}`,
          questionEn: q.questionEn || '',
          questionEs: q.questionEs || '',
          sceneHintEs: q.sceneHintEs || '',
          sampleIdealAnswerEn: q.sampleIdealAnswerEn || '',
          targetGrammarHint: q.targetGrammarHint || 'Escribe tu respuesta en inglés en pasado.'
        }))
      : []
  };
}

export async function evaluateMediaQuestionAnswerWithAI(
  mediaTitle: string,
  episodeOrPart: string,
  questionEn: string,
  userAnswerEn: string,
  expectedContextEn: string
): Promise<OpenAnswerFeedback> {
  const config = getAIConfig();
  const sys = `You are an expert British English teacher correcting a student's answer about a TV show / movie / book episode.
Show/Movie: "${mediaTitle}" (${episodeOrPart})
Question: "${questionEn}"
Expected Plot Answer / Reference: "${expectedContextEn}"
Student's Answer in English: "${userAnswerEn}"

Evaluate the student's answer:
1. Is the content accurate to what happened in this episode?
2. Correct every grammar, spelling, tense, and vocabulary mistake.
3. Provide a score from 1 to 10.
4. Provide a corrected version of the user's sentence.
5. Provide a natural native British English / B2 upgrade sentence.
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
}`;

  const usr = `Evaluate: "${userAnswerEn}" for question: "${questionEn}" in "${mediaTitle}" (${episodeOrPart})`;
  const jsonStr = await callLLMJson(sys, usr, config);
  const parsed = JSON.parse(jsonStr);

  return {
    isContentAccurate: parsed.isContentAccurate ?? true,
    scoreOutOf10: parsed.scoreOutOf10 ?? 7,
    correctedUserSentence: parsed.correctedUserSentence || userAnswerEn,
    b2UpgradeSentence: parsed.b2UpgradeSentence || expectedContextEn,
    feedbackEs: parsed.feedbackEs || 'Respuesta revisada.',
    errorsFound: Array.isArray(parsed.errorsFound) ? parsed.errorsFound : []
  };
}

// Comparador semántico tolerante para traducciones al español
export function checkSpanishMeaningMatch(userInput: string, accepted: string[]): boolean {
  const norm = (s: string) =>
    s
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[.,/#!$%^&*;:{}=\-_`~()?"'’]/g, '')
      .trim();

  const userNorm = norm(userInput);
  if (!userNorm) return false;

  return accepted.some((acc) => {
    const accNorm = norm(acc);
    if (!accNorm) return false;
    if (userNorm === accNorm) return true;
    if (userNorm.includes(accNorm) || accNorm.includes(userNorm)) return true;
    const userWords = userNorm.split(/\s+/).filter((w) => w.length > 2);
    const accWords = accNorm.split(/\s+/).filter((w) => w.length > 2);
    return userWords.some((uw) => accWords.includes(uw));
  });
}
