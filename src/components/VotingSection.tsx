import React from 'react';
import { Check, AlertCircle } from 'lucide-react';
import type { Candidate } from '../types';

interface VotingSectionProps {
  candidates: Candidate[];
  onVote: (candidateId: string) => void;
  hasVoted: boolean;
}

export default function VotingSection({ candidates, onVote, hasVoted }: VotingSectionProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Cast Your Vote</h2>
        <p className="mt-2 text-gray-600">Select your preferred candidate for the software implementation project</p>
      </div>

      {hasVoted && (
        <div className="mb-8 bg-green-50 border border-green-200 rounded-md p-4 flex items-center justify-center">
          <Check className="w-5 h-5 text-green-500 mr-2" />
          <span className="text-green-700">Thank you for voting! Your vote has been recorded.</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {candidates.map((candidate) => (
          <div key={candidate.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={candidate.imageUrl}
              alt={candidate.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900">{candidate.name}</h3>
              <p className="text-gray-600 mt-2">{candidate.position}</p>
              <div className="mt-4">
                <button
                  onClick={() => onVote(candidate.id)}
                  disabled={hasVoted}
                  className={`w-full px-4 py-2 rounded-md ${
                    hasVoted
                      ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  {hasVoted ? 'Vote Recorded' : 'Vote'}
                </button>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                Current Votes: {candidate.votes}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}