import React from 'react';
import type { VotingOption } from '../../types';
import CandidateManagement from './CandidateManagement';

interface VotingTopicsListProps {
  votingOptions: VotingOption[];
  selectedOptionId: string | null;
  onSelectOption: (id: string) => void;
  onRemoveOption: (id: string) => void;
}

export default function VotingTopicsList({
  votingOptions,
  selectedOptionId,
  onSelectOption,
  onRemoveOption
}: VotingTopicsListProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Voting Topics</h3>
      </div>
      <div className="divide-y divide-gray-200">
        {votingOptions.map((option) => (
          <div key={option.id} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-lg font-medium text-gray-900">{option.name}</h4>
                <p className="text-sm text-gray-600">{option.description}</p>
                <p className="text-sm text-gray-500">Maximum selections: {option.maxSelections}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => onSelectOption(option.id)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm"
                >
                  Manage Candidates
                </button>
                <button
                  onClick={() => onRemoveOption(option.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
                >
                  Remove Topic
                </button>
              </div>
            </div>
            {selectedOptionId === option.id && (
              <CandidateManagement selectedOption={option} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}