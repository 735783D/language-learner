import React from 'react';

const WritingLesson = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-100 via-amber-50 to-orange-100 p-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="mb-4 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition text-stone-700 font-semibold"
        >
          ← Back to Lessons
        </button>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-stone-800 mb-4">Writing - Practice Writing</h1>
          <p className="text-stone-600">Writing exercises will go here...</p>
        </div>
      </div>
    </div>
  );
};

export default WritingLesson;