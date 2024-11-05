import React, { useState } from 'react';
import { Check, Info } from 'lucide-react';
import type { Candidate } from '../types';

interface VotingSectionProps {
  candidates: Candidate[];
  onVote: (candidateId: string) => void;
  hasVoted: boolean;
  votingEnded: boolean;
}

export default function VotingSection({ candidates, onVote, hasVoted, votingEnded }: VotingSectionProps) {
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

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
              <p className="text-gray-600 mt-1">{candidate.position}</p>
              <p className="text-gray-500 mt-2 text-sm line-clamp-2">{candidate.description}</p>
              
              <div className="mt-4 flex justify-between items-center">
                <button
                  onClick={() => setSelectedCandidate(candidate)}
                  className="text-indigo-600 hover:text-indigo-700 text-sm flex items-center"
                >
                  <Info className="w-4 h-4 mr-1" />
                  View Details
                </button>
                <button
                  onClick={() => onVote(candidate.id)}
                  disabled={hasVoted || votingEnded}
                  className={`px-4 py-2 rounded-md ${
                    hasVoted || votingEnded
                      ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  {hasVoted ? 'Vote Recorded' : 'Vote'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Candidate Details Modal */}
      {selectedCandidate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-gray-900">{selectedCandidate.name}</h3>
              <button
                onClick={() => setSelectedCandidate(null)}
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Close</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <img
              src={selectedCandidate.imageUrl}
              alt={selectedCandidate.name}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Position</h4>
                <p className="text-gray-900">{selectedCandidate.position}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">About</h4>
                <p className="text-gray-900">{selectedCandidate.description}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Current Votes</h4>
                <p className="text-gray-900">{selectedCandidate.votes}</p>
              </div>
            </div>
            <div className="mt-6">
              <button
                onClick={() => setSelectedCandidate(null)}
                className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}