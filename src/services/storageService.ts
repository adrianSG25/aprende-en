import { Exercise, MistakeRecord, UserStats, ExamResult } from '../types';

const STATS_KEY = 'engdrill_user_stats_v1';
const MISTAKES_KEY = 'engdrill_mistake_vault_v1';
const CUSTOM_EXERCISES_KEY = 'engdrill_custom_exercises_v1';

const DEFAULT_STATS: UserStats = {
  totalCompleted: 0,
  totalCorrect: 0,
  streakDays: 1,
  lastActiveDate: new Date().toISOString().slice(0, 10),
  completedIds: [],
  bookmarkedPhrasalVerbs: [],
  bookmarkedVocab: [],
  completedStories: [],
  writingsSaved: [],
  examHistory: []
};

export function loadUserStats(): UserStats {
  try {
    const raw = localStorage.getItem(STATS_KEY);
    if (!raw) return DEFAULT_STATS;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_STATS, ...parsed };
  } catch {
    return DEFAULT_STATS;
  }
}

export function saveUserStats(stats: UserStats): void {
  localStorage.setItem(STATS_KEY, JSON.stringify(stats));
}

export function loadMistakeVault(): MistakeRecord[] {
  try {
    const raw = localStorage.getItem(MISTAKES_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveMistakeVault(records: MistakeRecord[]): void {
  localStorage.setItem(MISTAKES_KEY, JSON.stringify(records));
}

export function recordExerciseAttempt(exercise: Exercise, isCorrect: boolean, forceAddToVault = false): {
  stats: UserStats;
  mistakes: MistakeRecord[];
} {
  const stats = loadUserStats();
  const today = new Date().toISOString().slice(0, 10);

  if (stats.lastActiveDate !== today) {
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    stats.streakDays = stats.lastActiveDate === yesterday ? stats.streakDays + 1 : 1;
    stats.lastActiveDate = today;
  }

  stats.totalCompleted += 1;
  if (isCorrect) {
    stats.totalCorrect += 1;
    if (!stats.completedIds.includes(exercise.id)) {
      stats.completedIds.push(exercise.id);
    }
  }
  saveUserStats(stats);

  // Actualizar el Banco de Fallos / Repetición (SRS)
  const mistakes = loadMistakeVault();
  const existingIdx = mistakes.findIndex((m) => m.exerciseId === exercise.id);

  if (!isCorrect || forceAddToVault) {
    if (existingIdx >= 0) {
      mistakes[existingIdx].failCount += isCorrect ? 0 : 1;
      mistakes[existingIdx].consecutiveCorrect = 0;
      mistakes[existingIdx].mastered = false;
      mistakes[existingIdx].lastFailedAt = new Date().toISOString();
    } else {
      mistakes.unshift({
        exerciseId: exercise.id,
        exercise,
        failCount: isCorrect ? 1 : 1,
        consecutiveCorrect: 0,
        lastFailedAt: new Date().toISOString(),
        mastered: false
      });
    }
  } else if (existingIdx >= 0) {
    mistakes[existingIdx].consecutiveCorrect += 1;
    if (mistakes[existingIdx].consecutiveCorrect >= 3) {
      mistakes[existingIdx].mastered = true;
    }
  }

  saveMistakeVault(mistakes);
  return { stats, mistakes };
}

export function loadCustomAIExercises(): Exercise[] {
  try {
    const raw = localStorage.getItem(CUSTOM_EXERCISES_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function appendCustomAIExercises(newExercises: Exercise[]): Exercise[] {
  const existing = loadCustomAIExercises();
  const merged = [...newExercises, ...existing].slice(0, 300);
  localStorage.setItem(CUSTOM_EXERCISES_KEY, JSON.stringify(merged));
  return merged;
}

export function saveExamResultToHistory(result: ExamResult): UserStats {
  const stats = loadUserStats();
  stats.examHistory = [result, ...stats.examHistory].slice(0, 30);
  saveUserStats(stats);
  return stats;
}
