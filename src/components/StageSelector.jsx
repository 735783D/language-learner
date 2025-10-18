import React from 'react';
import { Lock } from 'lucide-react';

const StageSelector = ({ 
  stages, 
  currentStage, 
  setCurrentStage, 
  unlockedStages, 
  stageProgress 
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
      <div className="flex justify-around">
        {Object.keys(stages).map((stageNum) => {
          const stage = stages[stageNum];
          const num = parseInt(stageNum);
          
          return (
            <button
              key={num}
              onClick={() => unlockedStages.includes(num) && setCurrentStage(num)}
              disabled={!unlockedStages.includes(num)}
              className={`flex flex-col items-center p-4 rounded-xl transition ${
                currentStage === num
                  ? "bg-blue-100 border-2 border-blue-500"
                  : unlockedStages.includes(num)
                  ? "hover:bg-gray-100"
                  : "opacity-50 cursor-not-allowed"
              }`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                unlockedStages.includes(num) ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-600"
              }`}>
                {unlockedStages.includes(num) ? num : <Lock size={20} />}
              </div>
              <div className="font-semibold text-sm">{stage.name}</div>
              <div className="text-xs text-gray-600 mt-1">
                {stageProgress[num]}/{stage.requiredScore}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default StageSelector;