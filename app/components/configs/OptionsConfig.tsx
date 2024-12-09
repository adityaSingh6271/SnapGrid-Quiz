import { useState } from "react";

interface OptionsConfigProps {
  config?: {
    items: string[];
    correctAnswer: number;
  };
  onChange: (config: NonNullable<OptionsConfigProps["config"]>) => void;
}

export function OptionsConfig({ config, onChange }: OptionsConfigProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const currentConfig = config || {
    items: ["", "", "", ""],
    correctAnswer: 0,
  };

  const handleOptionChange = (index: number, value: string) => {
    const newItems = [...currentConfig.items];
    newItems[index] = value;
    onChange({ ...currentConfig, items: newItems });
  };

  const handleCorrectAnswerChange = (index: number) => {
    onChange({ ...currentConfig, correctAnswer: index });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {currentConfig.items.map((option, index) => (
          <div key={index} className="flex items-start space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">
                Option {index + 1}
              </label>
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder={`Enter option ${index + 1}`}
              />
            </div>
            <div className="pt-6">
              <input
                type="radio"
                name="correctAnswer"
                checked={currentConfig.correctAnswer === index}
                onChange={() => handleCorrectAnswerChange(index)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-600">Correct</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}