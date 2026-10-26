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
    model: 'llama-3.3-70b-versatile'
  };
}

export function saveAIConfig(config: AIConfig): void {
  localStorage.setItem(AI_CONFIG_KEY, JSON.stringify(config));
}

async function callLLMJson(systemPrompt: string, userPrompt: string, config: AIConfig): Promise<string> {
  if (!config.apiKey.trim()) {
    throw new Error('No has configurado una API Key todavía. Haz clic en el botón "IA Config" arriba a la derecha.');
  }

  if (config.provider === 'gemini') {
    const model = config.model || 'gemini-2.5-flash';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${config.apiKey.trim()}`;
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
    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Error de Gemini API (${res.status}): ${errText}`);
    }
    const data = await res.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || '{}';
  }

  // Groq or OpenAI
  const baseUrl =
    config.provider === 'groq'
      ? 'https://api.groq.com/openai/v1/chat/completions'
      : 'https://api.openai.com/v1/chat/completions';

  const model =
    config.model || (config.provider === 'groq' ? 'llama-3.3-70b-versatile' : 'gpt-4o-mini');

  const res = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${config.apiKey.trim()}`
    },
    body: JSON.stringify({
      model,
      temperature: 0.4,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ]
    })
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Error de API (${res.status}): ${errText}`);
  }
  const data = await res.json();
  return data.choices?.[0]?.message?.content || '{}';
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
      "spanishHint": "Sentence with ___ gap or Spanish translation hint",
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
