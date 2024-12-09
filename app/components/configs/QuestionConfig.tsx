import { useState } from "react";

interface QuestionConfigProps {
  config?: {
    total: number;
    current: number;
    text: string;
  };
  onChange: (config: NonNullable<QuestionConfigProps["config"]>) => void;
}

export function QuestionConfig({ config, onChange }: QuestionConfigProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const currentConfig = config || {
    total: 1,
    current: 1,
    text: "",
  };

  const handleTotalChange = (total: number) => {
    onChange({
      ...currentConfig,
      total,
      current: Math.min(currentConfig.current, total),
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    onChange({
      ...currentConfig,
      current: page,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Total Questions
        </label>
        <input
          type="number"
          min="1"
          max="20"
          value={currentConfig.total}
          onChange={(e) => handleTotalChange(parseInt(e.target.value, 10))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">
            Question {currentPage} of {currentConfig.total}
          </h3>
          <div className="space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-100 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === currentConfig.total}
              className="px-3 py-1 bg-gray-100 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>

        <label className="block text-sm font-medium text-gray-700">
          Question Text
        </label>
        <textarea
          value={currentConfig.text}
          onChange={(e) =>
            onChange({ ...currentConfig, text: e.target.value })
          }
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Enter your question here..."
        />
      </div>
    </div>
  );
}