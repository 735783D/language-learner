import React, { useRef, useState } from 'react';
import { ArrowLeft, Download, Upload, Trash2, CheckCircle, Clock, BarChart2 } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useProgress } from '../../contexts/ProgressContext';
import ThemeToggle from '../ThemeToggle';

// Human-readable labels for lesson IDs
const LESSON_LABELS = {
  // Words - regular categories
  'colors-learn': 'Colors — Learn',
  'colors-practice': 'Colors — Practice',
  'family-learn': 'Family — Learn',
  'family-practice': 'Family — Practice',
  'food-learn': 'Food — Learn',
  'food-practice': 'Food — Practice',
  'body-learn': 'Body Parts — Learn',
  'body-practice': 'Body Parts — Practice',
  'nature-learn': 'Nature — Learn',
  'nature-practice': 'Nature — Practice',
  'home-learn': 'Home & Objects — Learn',
  'home-practice': 'Home & Objects — Practice',
  'people-learn': 'People — Learn',
  'people-practice': 'People — Practice',
  // Animals
  'animals-birds-learn': 'Animals: Birds — Learn',
  'animals-birds-practice': 'Animals: Birds — Practice',
  'animals-farmAnimals-learn': 'Animals: Farm Animals — Learn',
  'animals-farmAnimals-practice': 'Animals: Farm Animals — Practice',
  'animals-wildAnimals-learn': 'Animals: Wild Animals — Learn',
  'animals-wildAnimals-practice': 'Animals: Wild Animals — Practice',
  'animals-aquatic-learn': 'Animals: Aquatic — Learn',
  'animals-aquatic-practice': 'Animals: Aquatic — Practice',
  'animals-insects-learn': 'Animals: Insects — Learn',
  'animals-insects-practice': 'Animals: Insects — Practice',
  'animals-reptiles-learn': 'Animals: Reptiles — Learn',
  'animals-reptiles-practice': 'Animals: Reptiles — Practice',
  // Verbs
  'infinitives-learn': 'Verbs: Infinitives — Learn',
  'infinitives-practice': 'Verbs: Infinitives — Practice',
  'present-learn': 'Verbs: Present Tense — Learn',
  'present-practice': 'Verbs: Present Tense — Practice',
  'future-learn': 'Verbs: Future Tense — Learn',
  'future-practice': 'Verbs: Future Tense — Practice',
};

const getLessonLabel = (id) => LESSON_LABELS[id] || id;

const ProgressScreen = ({ onBack }) => {
  const { theme } = useTheme();
  const { progress, exportProgress, importProgress, clearProgress, getCompletedLessons } = useProgress();
  const fileInputRef = useRef(null);
  const [importStatus, setImportStatus] = useState(null); // 'success' | 'error' | null
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const completedLessons = getCompletedLessons();
  const totalCompleted = completedLessons.length;

  // Overall best score average
  const scores = completedLessons.map(id => progress.lessons[id].bestScore).filter(Boolean);
  const avgScore = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : null;

  const handleImport = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const result = await importProgress(file);
    setImportStatus(result.success ? 'success' : { error: result.reason || 'Import failed' });
    setTimeout(() => setImportStatus(null), 4000);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleClear = () => {
    clearProgress();
    setShowClearConfirm(false);
  };

  return (
    <div className={`min-h-screen ${theme.bg} relative overflow-hidden`}>
      <ThemeToggle />

      <button
        onClick={onBack}
        className={`fixed top-4 left-4 z-50 px-4 py-2 rounded-lg shadow hover:shadow-md transition ${theme.button} flex items-center gap-2`}
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back</span>
      </button>

      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-8 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className={`text-5xl font-bold ${theme.text} mb-3`}>My Progress</h1>
          <p className={`text-xl ${theme.textSecondary}`}>Track your Mvskoke learning journey</p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className={`${theme.card} rounded-2xl p-6 text-center shadow`}>
            <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <div className={`text-4xl font-bold ${theme.text}`}>{totalCompleted}</div>
            <div className={`${theme.textSecondary} text-sm mt-1`}>Lessons Completed</div>
          </div>
          <div className={`${theme.card} rounded-2xl p-6 text-center shadow`}>
            <BarChart2 className="w-8 h-8 text-amber-500 mx-auto mb-2" />
            <div className={`text-4xl font-bold ${theme.text}`}>{avgScore !== null ? `${avgScore}%` : '—'}</div>
            <div className={`${theme.textSecondary} text-sm mt-1`}>Average Best Score</div>
          </div>
        </div>

        {/* Lesson List */}
        <div className={`${theme.card} rounded-3xl shadow-lg p-6 mb-6`}>
          <h2 className={`text-xl font-bold ${theme.text} mb-4`}>Completed Lessons</h2>
          {completedLessons.length === 0 ? (
            <p className={`${theme.textSecondary} text-center py-8`}>
              No lessons completed yet. Start learning to track your progress!
            </p>
          ) : (
            <div className="space-y-3">
              {completedLessons.map(id => {
                const data = progress.lessons[id];
                return (
                  <div key={id} className={`flex items-center justify-between p-3 rounded-xl border border-gray-100 dark:border-gray-700`}>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <div>
                        <div className={`font-semibold ${theme.text} text-sm`}>{getLessonLabel(id)}</div>
                        <div className={`${theme.textSecondary} text-xs flex items-center gap-2 mt-0.5`}>
                          <Clock className="w-3 h-3" />
                          {data.lastPracticed} · {data.timesPracticed}× practiced
                        </div>
                      </div>
                    </div>
                    <div className={`text-lg font-bold ${
                      data.bestScore >= 80 ? 'text-green-500' : 
                      data.bestScore >= 60 ? 'text-yellow-500' : 'text-orange-500'
                    }`}>
                      {data.bestScore}%
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Export / Import / Clear */}
        <div className={`${theme.card} rounded-3xl shadow-lg p-6`}>
          <h2 className={`text-xl font-bold ${theme.text} mb-2`}>Save Your Progress</h2>
          <p className={`${theme.textSecondary} text-sm mb-5`}>
            Your progress is saved in this browser. Export a backup file to keep it safe — 
            especially if you share this device or clear browser data.
          </p>

          <div className="space-y-3">
            {/* Export */}
            <button
              onClick={exportProgress}
              disabled={totalCompleted === 0}
              className={`w-full flex items-center gap-3 px-5 py-4 rounded-xl font-semibold transition
                ${totalCompleted === 0 
                  ? 'opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-800 text-gray-400' 
                  : `${theme.button} hover:scale-102`
                }`}
            >
              <Download className="w-5 h-5" />
              Export Progress to File
            </button>

            {/* Import */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className={`w-full flex items-center gap-3 px-5 py-4 rounded-xl font-semibold ${theme.card} border-2 border-gray-200 dark:border-gray-700 hover:border-amber-400 transition hover:scale-102`}
            >
              <Upload className="w-5 h-5" />
              Import Progress from File
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
            />

            {/* Import status message */}
            {importStatus === 'success' && (
              <p className="text-green-600 dark:text-green-400 text-sm text-center font-semibold">
                ✓ Progress imported successfully!
              </p>
            )}
            {importStatus?.error && (
              <p className="text-red-500 text-sm text-center font-semibold">
                ✗ {importStatus.error}
              </p>
            )}

            {/* Clear */}
            {!showClearConfirm ? (
              <button
                onClick={() => setShowClearConfirm(true)}
                disabled={totalCompleted === 0}
                className={`w-full flex items-center gap-3 px-5 py-4 rounded-xl font-semibold transition
                  ${totalCompleted === 0
                    ? 'opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-800 text-gray-400'
                    : 'text-red-500 border-2 border-red-200 dark:border-red-900 hover:bg-red-50 dark:hover:bg-red-900/20'
                  }`}
              >
                <Trash2 className="w-5 h-5" />
                Clear All Progress
              </button>
            ) : (
              <div className="rounded-xl border-2 border-red-400 p-4 space-y-3">
                <p className={`${theme.text} font-semibold text-center`}>
                  Are you sure? This cannot be undone.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={handleClear}
                    className="flex-1 py-3 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold transition"
                  >
                    Yes, Clear Everything
                  </button>
                  <button
                    onClick={() => setShowClearConfirm(false)}
                    className={`flex-1 py-3 rounded-lg ${theme.card} border-2 border-gray-300 dark:border-gray-600 font-semibold ${theme.text} transition`}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .blob { position: absolute; border-radius: 50%; filter: blur(40px); opacity: 0.3; animation: float 20s ease-in-out infinite; }
        .blob-1 { width: 350px; height: 350px; background: linear-gradient(135deg, #f59e0b, #d97706); top: -100px; right: -100px; animation-delay: 0s; }
        .blob-2 { width: 300px; height: 300px; background: linear-gradient(135deg, #10b981, #059669); bottom: -80px; left: -80px; animation-delay: 10s; }
        @keyframes float { 0%, 100% { transform: translate(0,0) scale(1); } 50% { transform: translate(20px, -20px) scale(1.05); } }
      `}</style>
    </div>
  );
};

export default ProgressScreen;