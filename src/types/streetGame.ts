export interface TextbookVsStreet {
  formal: string;
  street: string;
  es: string;
  context: string;
  notes?: string;
}

export interface StreetExercise {
  id: string;
  type: 'street_translate' | 'whatsapp_decode' | 'situation_choice' | 'sarcasm_radar' | 'slang_cloze';
  situation: string;
  speaker?: string;
  incomingMessage?: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanationEs: string;
  streetTip: string;
  xpReward: number;
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
