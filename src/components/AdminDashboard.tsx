import React, { useState } from 'react';
import { BarChart3, Users, Activity, ClipboardList, FileText } from 'lucide-react';
import type { Candidate, BallotRecord } from '../types';
import AuditLog from './admin/AuditLog';
import VotingReport from './admin/VotingReport';

interface AdminDashboardProps {
  candidates: Candidate[];
  totalVotes: number;
  onEndVoting: () => void;
  ballots: BallotRecord[];
  votingEnded: boolean;
}

export default function AdminDashboard({ 
  candidates, 
  totalVotes, 
  onEndVoting, 
  ballots,
  votingEnded 
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'audit' | 'report'>('overview');

  const calculatePercentage = (votes: number) => {
    if (totalVotes === 0) return 0;
    return (votes / totalVotes) * 100;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Admin Dashboard</h2>
        {!votingEnded && (
          <button
            onClick={onEndVoting}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            End Voting Session
          </button>
        )}
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <Users className="w-8 h-8 text-indigo-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Candidates</p>
              <p className="text-2xl font-semibold text-gray-900">{candidates.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <Activity className="w-8 h-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Votes</p>
              <p className="text-2xl font-semibold text-gray-900">{totalVotes}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <BarChart3 className="w-8 h-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Voting Status</p>
              <p className="text-2xl font-semibold text-gray-900">
                {votingEnded ? 'Ended' : 'Active'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`${
              activeTab === 'overview'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } flex items-center whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            <ClipboardList className="w-5 h-5 mr-2" />
            Overview
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`${
              activeTab === 'audit'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } flex items-center whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            <FileText className="w-5 h-5 mr-2" />
            Audit Log
          </button>
          <button
            onClick={() => setActiveTab('report')}
            className={`${
              activeTab === 'report'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } flex items-center whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            <BarChart3 className="w-5 h-5 mr-2" />
            Reports
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Live Results</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {candidates.map((candidate) => (
              <div key={candidate.id} className="px-6 py-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{candidate.name}</h4>
                    <p className="text-sm text-gray-500">{candidate.position}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{candidate.votes} votes</p>
                    <p className="text-sm text-gray-500">
                      {calculatePercentage(candidate.votes).toFixed(1)}%
                    </p>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${calculatePercentage(candidate.votes)}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'audit' && <AuditLog ballots={ballots} />}
      
      {activeTab === 'report' && (
        <VotingReport candidates={candidates} totalVotes={totalVotes} />
      )}
    </div>
  );
}