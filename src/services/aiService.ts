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

export async function evaluateWritingWithAI(
  userText: string,
  targetLevel: Level,
  promptTitle: string
): Promise<AIWritingCorrectionResult> {
  const config = getAIConfig();
  const sys = `You are a strict, encouraging Cambridge English Writing Examiner (from A2+ to B2 Advanced) helping a Spanish speaker improve their grammar, phrasal verbs, and connectors.
Return ONLY valid JSON matching this exact structure:
{
  "estimatedLevel": "e.g. B1+ / B2",
  "scoreOutOf100": 82,
  "generalFeedbackEs": "Detailed paragraph in Spanish assessing grammar, vocabulary, connectors, and structure.",
  "correctedVersionEn": "The user's text with all grammatical and lexical errors fixed naturally.",
  "b2AdvancedUpgradeEn": "A B2+ (Advanced) version of the user's text using inversions, cleft sentences, rich phrasal verbs and C1/B2+ linkers.",
  "lineByLineCorrections": [
    {
      "original": "exact wrong phrase from user",
      "correction": "corrected English phrase",
      "explanationEs": "Why it was wrong in Spanish"
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
Analyze the text thoroughly and create 2 practice exercises in generatedDrillExercises targeting the student's weak spots.`;

  const jsonStr = await callLLMJson(sys, usr, config);
  const parsed = JSON.parse(jsonStr);

  return {
    estimatedLevel: parsed.estimatedLevel || targetLevel,
    scoreOutOf100: typeof parsed.scoreOutOf100 === 'number' ? parsed.scoreOutOf100 : 75,
    generalFeedbackEs: parsed.generalFeedbackEs || 'Texto evaluado correctamente.',
    correctedVersionEn: parsed.correctedVersionEn || userText,
    b2AdvancedUpgradeEn: parsed.b2AdvancedUpgradeEn || userText,
    lineByLineCorrections: Array.isArray(parsed.lineByLineCorrections) ? parsed.lineByLineCorrections : [],
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
