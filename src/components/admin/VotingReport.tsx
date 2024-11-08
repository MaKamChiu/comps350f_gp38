import React from 'react';
import { BarChart, PieChart, Download } from 'lucide-react';
import type { VotingOption } from '../../types';
import { useTranslation } from 'react-i18next';


interface VotingReportProps {
  votingOptions: VotingOption[];
  totalVotes: number;
}

export default function VotingReport({ votingOptions, totalVotes }: VotingReportProps) {
  const { t } = useTranslation();
  const allCandidates = votingOptions.flatMap(option => option.candidates);

  const downloadReport = () => {
    const report = allCandidates.map(c => ({
      name: c.name,
      position: c.position,
      votes: c.votes,
      percentage: ((c.votes / totalVotes) * 100).toFixed(2)
    }));

    const csvContent = [
      ['Name', 'Position', 'Votes', 'Percentage'],
      ...report.map(r => [r.name, r.position, r.votes, `${r.percentage}%`])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `voting-report-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">{t('voting.VotingReport')}</h3>
        <button
          onClick={downloadReport}
          className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          <Download className="w-4 h-4" />
          <span>{t('voting.ExportCSV')}</span>
        </button>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bar Chart */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-4">
              <BarChart className="w-5 h-5 text-indigo-600" />
              <h4 className="font-medium text-gray-900">{t('voting.VoteDistribution')}</h4>
            </div>
            <div className="space-y-4">
              {allCandidates.map((candidate) => (
                <div key={candidate.id}>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>{candidate.name}</span>
                    <span>{((candidate.votes / totalVotes) * 100).toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full"
                      style={{ width: `${(candidate.votes / totalVotes) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary Stats */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-4">
              <PieChart className="w-5 h-5 text-indigo-600" />
              <h4 className="font-medium text-gray-900">{t('voting.SummaryStatistics')}</h4>
            </div>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-md">
                <p className="text-sm text-gray-600">{t('voting.TotalVotesCast')}</p>
                <p className="text-2xl font-bold text-indigo-600">{totalVotes}</p>
              </div>
              {allCandidates.length > 0 && (
                <div className="bg-white p-4 rounded-md">
                  <p className="text-sm text-gray-600">{t('voting.LeadingCandidates')}</p>
                  <p className="text-xl font-semibold text-gray-900">
                    {allCandidates.reduce((prev, current) => 
                      prev.votes > current.votes ? prev : current
                    ).name}
                  </p>
                </div>
              )}
              {allCandidates.length > 0 && (
                <div className="bg-white p-4 rounded-md">
                  <p className="text-sm text-gray-600">{t('voting.AverageVotesperCandidate')}</p>
                  <p className="text-xl font-semibold text-gray-900">
                    {(totalVotes / allCandidates.length).toFixed(1)}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}