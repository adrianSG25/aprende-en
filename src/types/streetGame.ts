export interface TextbookVsStreet {
  formal: string;
  street: string;
  es: string;
  context: string;
  notes?: string;
}

export interface StreetExercise {
  id: string;
  type: 'street_write' | 'street_translate' | 'whatsapp_decode' | 'situation_choice' | 'sarcasm_radar' | 'slang_cloze';
  situation: string;
  speaker?: string;
  incomingMessage?: string;
  question: string;
  acceptedAnswers: string[]; // Variantes aceptadas que el usuario escribe
  sampleIdealAnswer: string;  // La mejor respuesta en inglés cotidiano
  hint?: string;              // Pista para escribirla
  explanationEs: string;
  streetTip: string;
  xpReward: number;
  options?: string[];         // Opcional para apoyo
  correctIndex?: number;
}

export interface StreetBossChallenge {
  id: string;
  levelId: number;
  bossName: string;
  bossTitle: string;
  bossAvatar: string;
  bossQuote: string;
  description: string;
  passPercentage: number; // e.g. 80
  questions: StreetExercise[];
}

export interface StreetTopic {
  id: string;
  levelId: number;
  title: string;
  subtitle: string;
  icon: string;
  description: string;
  phrases: TextbookVsStreet[];
  culturalSecrets: string[];
  audioTips: string;
  exercises: StreetExercise[];
}

export interface StreetLevel {
  id: number;
  number: number;
  districtName: string;
  title: string;
  badge: string;
  rankTitle: string;
  color: string;
  borderColor: string;
  bgColor: string;
  description: string;
  requiredXP: number;
  topics: StreetTopic[];
  boss: StreetBossChallenge;
}

export interface GameProgress {
  currentLevelId: number;
  xp: number;
  quids: number; // Monedas de la calle (libras)
  unlockedLevels: number[];
  bossesDefeated: number[];
  completedTopicIds: string[];
  completedExerciseIds: string[];
  streakDays: number;
  lastActiveDate: string;
}

// WhatsApp Conversation Types
export interface ChatMessage {
  id: string;
  sender: 'contact' | 'user';
  text: string;
  timestamp: string;
  feedback?: {
    isGood: boolean;
    tip?: string;
  };
}

export interface ChatStep {
  contactSays: string;
  userGoalEs: string;
  hint: string;
  acceptableReplies: string[]; // Palabras clave o frases aceptables
  sampleGoodReply: string;
  feedbackIfClose?: string;
}

export interface MultiTurnChatScenario {
  id: string;
  name: string;
  role: string;
  avatar: string;
  initialStatus: string;
  topicTitle: string;
  descriptionEs: string;
  steps: ChatStep[];
}
