import React from 'react';
import { Check } from 'lucide-react';

const CharacterExercise = ({ exercise, dropZoneActive, setDropZoneActive, handleDragStart, handleDrop }) => {
  return (
    <div className="flex flex-col items-center justify-between h-full py-8">
      <div className="flex-1 flex flex-col items-center justify-center space-y-6">
        <div
          draggable
          onDragStart={(e) => handleDragStart(e, exercise.char)}
          className="cursor-move touch-none"
        >
          <div className="text-9xl font-bold text-blue-600 select-none">{exercise.char}</div>
        </div>
        <div className="space-y-3 text-center">
          <div className="text-xl text-gray-700">Sounds like: <span className="font-semibold">{exercise.sound}</span></div>
          <div className="bg-blue-50 p-5 rounded-xl">
            <div className="text-2xl font-bold text-blue-900 mb-1">{exercise.example}</div>
            <div className="text-lg text-gray-600">{exercise.translation}</div>
          </div>
        </div>
        <div className="text-sm text-gray-500 mt-4">Drag to the circle below to continue</div>
      </div>
      
      <div
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setDropZoneActive(true);
        }}
        onDragEnter={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setDropZoneActive(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setDropZoneActive(false);
        }}
        onDrop={(e) => handleDrop(e)}
        className={`w-40 h-40 rounded-full border-4 border-dashed flex items-center justify-center transition-all ${
          dropZoneActive ? 'border-blue-600 bg-blue-50 scale-110' : 'border-gray-300 bg-gray-50'
        }`}
      >
        <Check className={`w-16 h-16 ${dropZoneActive ? 'text-blue-600' : 'text-gray-400'}`} />
      </div>
    </div>
  );
};

export default CharacterExercise;