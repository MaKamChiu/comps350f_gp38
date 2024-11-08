// src/App.tsx
import { useState } from 'react';
import Navbar from './components/Navbar';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import ForgotPasswordForm from './components/auth/ForgotPasswordForm';
import VotingSection from './components/VotingSection';
import AdminDashboard from './components/AdminDashboard';
import { useAuth } from './hooks/useAuth';
import { AuthService } from './services/auth';
import { useVotingRules } from './contexts/VotingRulesContext';
import type { Candidate, BallotRecord } from './types';

export function App() {
  const { user, error, login, register, resetPassword, logout, updateUser } = useAuth();
  const { votingOptions, updateVotingOption } = useVotingRules();
  const [showLogin, setShowLogin] = useState(true);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [ballots, setBallots] = useState<BallotRecord[]>([]);

  const handleVote = (optionId: string, candidateId: string) => {
    if (!user || (user.votedOptions && user.votedOptions.has(optionId))) return;

    const ballot: BallotRecord = {
      userId: user.id,
      optionId,
      candidateId,
      timestamp: new Date().toISOString(),
      verified: false,
    };
    setBallots([...ballots, ballot]);

    const option = votingOptions.find(opt => opt.id === optionId);
    if (option) {
      const updatedCandidates = option.candidates.map(candidate =>
        candidate.id === candidateId
          ? { ...candidate, votes: candidate.votes + 1 }
          : candidate
      );
      updateVotingOption({
        ...option,
        candidates: updatedCandidates
      });
    }

    const updatedVotedOptions = new Set(user.votedOptions || new Set());
    updatedVotedOptions.add(optionId);
    updateUser({
      ...user,
      votedOptions: updatedVotedOptions
    });
  };

  const handleRestartVoting = () => {
    votingOptions.forEach(option => {
      updateVotingOption({
        ...option,
        candidates: option.candidates.map(candidate => ({
          ...candidate,
          votes: 0
        }))
      });
    });
    
    setBallots([]);
    AuthService.resetAllVotes();
    
    if (user) {
      updateUser({
        ...user,
        votedOptions: new Set()
      });
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar user={null} onLogout={logout} />
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          {error && (
            <div className="absolute top-20 right-4 bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-md">
              {error}
            </div>
          )}
          {showForgotPassword ? (
            <ForgotPasswordForm
              onSubmit={resetPassword}
              onBack={() => {
                setShowForgotPassword(false);
                setShowLogin(true);
              }}
            />
          ) : showLogin ? (
            <LoginForm
              onLogin={login}
              onToggleForm={() => setShowLogin(false)}
              onForgotPassword={() => {
                setShowLogin(false);
                setShowForgotPassword(true);
              }}
            />
          ) : (
            <RegisterForm
              onRegister={register}
              onToggleForm={() => setShowLogin(true)}
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} onLogout={logout} />
      {user.isAdmin ? (
        <AdminDashboard
          votingOptions={votingOptions}
          onRestartVoting={handleRestartVoting}
          ballots={ballots}
        />
      ) : (
        <VotingSection
          votingOptions={votingOptions}
          onVote={handleVote}
          votedOptions={user.votedOptions || new Set()}
        />
      )}
    </div>
  );
}