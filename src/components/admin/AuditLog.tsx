import React from 'react';
import { Clock, User, CheckCircle } from 'lucide-react';
import type { BallotRecord } from '../../types';

interface AuditLogProps {
  ballots: BallotRecord[];
}

export default function AuditLog({ ballots }: AuditLogProps) {
  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Audit Log</h3>
      </div>
      <div className="divide-y divide-gray-200 max-h-96 overflow-auto">
        {ballots.map((ballot) => (
          <div key={ballot.userId + ballot.timestamp} className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-gray-400" />
                <span className="text-sm font-medium text-gray-900">
                  Voter ID: {ballot.userId.slice(0, 8)}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-500">
                  {new Date(ballot.timestamp).toLocaleString()}
                </span>
              </div>
            </div>
            <div className="mt-2 flex items-center space-x-2">
              <CheckCircle className={`w-4 h-4 ${ballot.verified ? 'text-green-500' : 'text-yellow-500'}`} />
              <span className={`text-sm ${ballot.verified ? 'text-green-600' : 'text-yellow-600'}`}>
                {ballot.verified ? 'Verified' : 'Pending Verification'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}