export type Level = 'A2+' | 'B1' | 'B1+' | 'B2' | 'B2+';

export type ExerciseType =
  | 'cloze'             // Rellenar hueco (escribiendo o eligiendo)
  | 'transformation'    // Key Word Transformation (estilo Cambridge B1/B2)
  | 'error_correction'  // Detectar y corregir el error gramatical en la frase
  | 'translation'       // Traducción inversa Español -> Inglés
  | 'word_formation'    // Transformar palabra raíz (FORTUNE -> unfortunately)
  | 'multiple_choice';  // Opción múltiple con trampas gramaticales reales

export type ExerciseCategory =
  | 'grammar'
  | 'phrasal_verbs'
  | 'vocabulary'
  | 'connectors'
  | 'prepositions'
  | 'word_formation';

export interface Exercise {
  id: string;
  level: Level;
  category: ExerciseCategory;
  topicId?: string;
  topicLabel: string;
  type: ExerciseType;
  prompt: string;               // Instrucción o frase principal (con ___ si aplica)
  spanishHint?: string;         // Frase en español o pista contextual
  keyWord?: string;             // Palabra clave en MAYÚSCULAS para Key Word Transformation / Word Formation
  baseSentence?: string;        // Frase original para transformar o frase con error
  options?: string[];           // Opciones para apoyo o modo test
  acceptedAnswers: string[];    // Respuestas válidas (normalizadas sin importar mayúsculas/contracciones)
  errorWord?: string;           // En error_correction, la parte errónea de la frase original
  explanation: string;          // Explicación detallada en español de POR QUÉ es así
  grammarRule?: string;         // Fórmula rápida (ej. "wish + Past Perfect = arrepentimiento del pasado")
}

export interface GrammarUnit {
  id: string;
  level: Level;
  title: string;
  subtitle: string;
  formula: string;
  whenToUse: string[];
  spanishSpeakerTraps: {
    wrong: string;
    right: string;
    why: string;
  }[];
  examples: {
    en: string;
    es: string;
    highlight: string;
  }[];
  keyTips: string[];
}

export interface PhrasalVerbItem {
  id: string;
  verb: string;                 // ej. "put up with"
  baseVerb: string;             // ej. "put"
  particle: string;             // ej. "up with"
  level: Level;
  separable: boolean;
  meaningEs: string;
  formalEquivalent: string;     // ej. "tolerate / endure"
  examples: {
    en: string;
    es: string;
  }[];
  memoryTrick: string;          // Truco lógico de la partícula para memorizarlo
}

export interface VocabItem {
  id: string;
  level: Level;
  category: 'collocations' | 'prepositions' | 'confusing_words' | 'connectors' | 'word_formation' | 'idioms';
  term: string;
  meaningEs: string;
  contextExample: string;
  contextTranslation: string;
  commonMistake?: string;
  rootFamily?: {
    noun?: string;
    verb?: string;
    adjective?: string;
    adverb?: string;
    negative?: string;
  };
}

export interface StoryAnnotation {
  phrase: string;               // Texto exacto dentro de la historia
  type: 'grammar' | 'phrasal_verb' | 'connector' | 'vocab';
  label: string;                // ej. "Third Conditional" o "Phrasal Verb (B2)"
  explanationEs: string;        // Explicación gramatical/léxica en español
}

export interface StoryQuestion {
  id: string;
  kind: 'comprehension' | 'grammar_analysis' | 'vocabulary_hunt' | 'transformation';
  question: string;
  inputMode: 'choice' | 'text';
  options?: string[];
  acceptedAnswers: string[];
  explanation: string;
  quoteFromText?: string;
}

export interface ReadingStory {
  id: string;
  level: Level;
  title: string;
  genre: string;
  readingTimeMin: number;
  grammarFocus: string[];
  paragraphs: string[];
  annotations: StoryAnnotation[];
  questions: StoryQuestion[];
}

export interface WritingPrompt {
  id: string;
  level: Level;
  type: 'Essay (B2)' | 'Article' | 'Email / Letter' | 'Review' | 'Micro-Reto Gramatical' | 'Story';
  title: string;
  situationEs: string;
  promptEn: string;
  minWords: number;
  maxWords: number;
  requiredStructures: {
    id: string;
    label: string;
    examples: string[];
    regexPatterns: string[];    // Patrones para detectar en vivo si el usuario lo ha usado
  }[];
  modelAnswer: string;
  modelAnalysisEs: string[];
}

export interface MistakeRecord {
  exerciseId: string;
  exercise: Exercise;
  failCount: number;
  consecutiveCorrect: number; // Necesita llegar a 3 para darse por "Dominado"
  lastFailedAt: string;
  mastered: boolean;
}

export interface ExamResult {
  id: string;
  date: string;
  level: string;
  score: number;
  total: number;
  breakdown: Record<string, { correct: number; total: number }>;
}

export interface AIConfig {
  provider: 'groq' | 'gemini' | 'openai';
  apiKey: string;
  model: string;
}

export interface UserStats {
  totalCompleted: number;
  totalCorrect: number;
  streakDays: number;
  lastActiveDate: string;
  completedIds: string[];
  bookmarkedPhrasalVerbs: string[];
  bookmarkedVocab: string[];
  completedStories: string[];
  writingsSaved: {
    id: string;
    promptId: string;
    title: string;
    date: string;
    content: string;
    score?: string;
    feedback?: string;
  }[];
  examHistory: ExamResult[];
}
