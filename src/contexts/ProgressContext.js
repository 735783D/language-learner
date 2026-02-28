import React, { createContext, useContext, useState, useCallback } from 'react';

const STORAGE_KEY = 'creekLanguageProgress';
const CURRENT_VERSION = 1;

// Security limits
const MAX_FILE_SIZE_BYTES = 50 * 1024;        // 50KB max — a real progress file will never be this large
const MAX_LESSON_ENTRIES = 200;                // No legitimate user will have more than this
const MAX_KEY_LENGTH = 60;                     // Lesson ID keys should never be this long
const MAX_SCORE_VALUE = 100;                   // Scores are percentages
const ALLOWED_KEY_PATTERN = /^[a-zA-Z0-9_\-]+$/; // Only alphanumeric, hyphens, underscores

const defaultProgress = {
  version: CURRENT_VERSION,
  lessons: {}
};

const loadProgress = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProgress;
    const parsed = JSON.parse(raw);
    if (parsed.version !== CURRENT_VERSION) return defaultProgress;
    return parsed;
  } catch {
    return defaultProgress;
  }
};

const saveToStorage = (progress) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    console.warn('Could not save progress to localStorage');
  }
};

// Validates and sanitizes a single lesson entry.
// Returns a clean object or null if the entry is invalid/suspicious.
const validateLessonEntry = (key, value) => {
  // Key must be a string, reasonable length, and only safe characters
  if (typeof key !== 'string') return null;
  if (key.length > MAX_KEY_LENGTH) return null;
  if (!ALLOWED_KEY_PATTERN.test(key)) return null;

  // Value must be a plain object
  if (typeof value !== 'object' || value === null || Array.isArray(value)) return null;

  // Extract and validate each field strictly — never trust the file
  const completed = value.completed === true; // Must be exactly boolean true

  const bestScore = typeof value.bestScore === 'number' &&
    Number.isFinite(value.bestScore) &&
    value.bestScore >= 0 &&
    value.bestScore <= MAX_SCORE_VALUE
      ? Math.round(value.bestScore)
      : 0;

  const timesPracticed = typeof value.timesPracticed === 'number' &&
    Number.isFinite(value.timesPracticed) &&
    value.timesPracticed >= 0 &&
    value.timesPracticed <= 10000
      ? Math.round(value.timesPracticed)
      : 0;

  // Date must match YYYY-MM-DD exactly — reject anything else
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;
  const lastPracticed = typeof value.lastPracticed === 'string' &&
    datePattern.test(value.lastPracticed)
      ? value.lastPracticed
      : null;

  // Require completed:true to be a meaningful entry
  if (!completed) return null;

  return { completed, bestScore, timesPracticed, lastPracticed };
};

// Full validation of the imported progress object.
// Returns { valid: true, data } or { valid: false, reason }
const validateImportedProgress = (parsed) => {
  if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
    return { valid: false, reason: 'Invalid file format' };
  }

  if (parsed.version !== CURRENT_VERSION) {
    return { valid: false, reason: 'Unrecognized file version' };
  }

  if (typeof parsed.lessons !== 'object' || parsed.lessons === null || Array.isArray(parsed.lessons)) {
    return { valid: false, reason: 'Invalid lessons data' };
  }

  const keys = Object.keys(parsed.lessons);

  if (keys.length > MAX_LESSON_ENTRIES) {
    return { valid: false, reason: 'File contains too many entries' };
  }

  // Validate and sanitize each entry — silently drop invalid ones
  const cleanLessons = {};
  for (const key of keys) {
    const clean = validateLessonEntry(key, parsed.lessons[key]);
    if (clean !== null) {
      cleanLessons[key] = clean;
    }
  }

  return {
    valid: true,
    data: {
      version: CURRENT_VERSION,
      lessons: cleanLessons
    }
  };
};

const ProgressContext = createContext(null);

export const ProgressProvider = ({ children }) => {
  const [progress, setProgress] = useState(() => loadProgress());

  const saveProgress = useCallback((lessonId, score, total) => {
    if (!lessonId) return;

    const percentage = total > 0 ? Math.round((score / total) * 100) : 100;
    const today = new Date().toISOString().split('T')[0];

    setProgress(prev => {
      const existing = prev.lessons[lessonId] || {};
      const updated = {
        ...prev,
        lessons: {
          ...prev.lessons,
          [lessonId]: {
            completed: true,
            bestScore: Math.max(existing.bestScore ?? 0, percentage),
            timesPracticed: (existing.timesPracticed ?? 0) + 1,
            lastPracticed: today
          }
        }
      };
      saveToStorage(updated);
      return updated;
    });
  }, []);

  const isCompleted = useCallback((lessonId) => {
    return progress.lessons[lessonId]?.completed ?? false;
  }, [progress]);

  const getLessonProgress = useCallback((lessonId) => {
    return progress.lessons[lessonId] ?? null;
  }, [progress]);

  const getCompletedLessons = useCallback(() => {
    return Object.keys(progress.lessons).filter(id => progress.lessons[id].completed);
  }, [progress]);

  const exportProgress = useCallback(() => {
    const json = JSON.stringify(progress, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const date = new Date().toISOString().split('T')[0];
    a.href = url;
    a.download = `creek-language-progress-${date}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [progress]);

  // Secure import — validates file size, type, structure, and sanitizes all values.
  // Returns a Promise resolving to { success: true } or { success: false, reason }
  const importProgress = useCallback((file) => {
    return new Promise((resolve) => {
      if (!file) {
        resolve({ success: false, reason: 'No file provided' });
        return;
      }

      // Must be a .json file
      if (!file.name.endsWith('.json') && file.type !== 'application/json') {
        resolve({ success: false, reason: 'File must be a .json file' });
        return;
      }

      // Enforce size limit before reading anything
      if (file.size > MAX_FILE_SIZE_BYTES) {
        resolve({ success: false, reason: 'File is too large to be a valid progress file' });
        return;
      }

      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const parsed = JSON.parse(e.target.result);
          const result = validateImportedProgress(parsed);

          if (!result.valid) {
            resolve({ success: false, reason: result.reason });
            return;
          }

          // Only clean, validated data reaches localStorage
          saveToStorage(result.data);
          setProgress(result.data);
          resolve({ success: true });

        } catch {
          resolve({ success: false, reason: 'File is not valid JSON' });
        }
      };

      reader.onerror = () => {
        resolve({ success: false, reason: 'Could not read file' });
      };

      reader.readAsText(file);
    });
  }, []);

  const clearProgress = useCallback(() => {
    saveToStorage(defaultProgress);
    setProgress(defaultProgress);
  }, []);

  return (
    <ProgressContext.Provider value={{
      progress,
      saveProgress,
      isCompleted,
      getLessonProgress,
      getCompletedLessons,
      exportProgress,
      importProgress,
      clearProgress
    }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be used inside ProgressProvider');
  return ctx;
};