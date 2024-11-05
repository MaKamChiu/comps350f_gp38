import { useState } from 'react';
import Navbar from './components/Navbar';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import ForgotPasswordForm from './components/auth/ForgotPasswordForm';
import VotingSection from './components/VotingSection';
import AdminDashboard from './components/AdminDashboard';
import { useAuth } from './hooks/useAuth';
import { AuthService } from './services/auth';
import type { Candidate, BallotRecord } from './types';

const initialCandidates: Candidate[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    position: 'Technical Lead',
    votes: 15,
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=300',
    description: 'Expert in system architecture and team leadership with 8+ years of experience.',
  },
  {
    id: '2',
    name: 'Michael Chen',
    position: 'Software Architect',
    votes: 12,
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400&h=300',
    description: 'Specialized in scalable cloud solutions and microservices architecture.',
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    position: 'Development Manager',
    votes: 18,
    imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400&h=300',
    description: 'Proven track record in delivering complex software projects on time.',
  },
];

const initialBallots: BallotRecord[] = [];

export function App() {
  const { user, error, login, register, resetPassword, logout, updateUser } = useAuth();
  const [showLogin, setShowLogin] = useState(true);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [state, setState] = useState({
    candidates: initialCandidates,
    votingEnded: false,
  });
  const [ballots, setBallots] = useState<BallotRecord[]>(initialBallots);

  const handleVote = (candidateId: string) => {
    if (!user || user.hasVoted || state.votingEnded) return;

    const ballot: BallotRecord = {
      userId: user.id,
      candidateId,
      timestamp: new Date().toISOString(),
      verified: false,
    };

    setBallots([...ballots, ballot]);

    setState({
      ...state,
      candidates: state.candidates.map((candidate) =>
        candidate.id === candidateId
          ? { ...candidate, votes: candidate.votes + 1 }
          : candidate
      ),
    });

    updateUser({
      ...user,
      hasVoted: true,
    });
  };

  const handleEndVoting = () => {
    setState({
      ...state,
      votingEnded: true,
    });
  };

  const handleRestartVoting = () => {
    // Reset all votes and voting status
    setState({
      ...state,
      votingEnded: false,
      candidates: state.candidates.map(candidate => ({
        ...candidate,
        votes: 0
      })),
    });
    setBallots([]);
    
    // Reset hasVoted status for all users
    AuthService.resetAllVotes();
    
    // Update current user's hasVoted status
    if (user) {
      updateUser({
        ...user,
        hasVoted: false,
      });
    }
  };

  const handleUpdateCandidate = (updatedCandidate: Candidate) => {
    setState({
      ...state,
      candidates: state.candidates.map(candidate =>
        candidate.id === updatedCandidate.id ? updatedCandidate : candidate
      ),
    });
  };

  const handleAddCandidate = (newCandidate: Candidate) => {
    setState({
      ...state,
      candidates: [...state.candidates, newCandidate],
    });
  };

  const handleDeleteCandidate = (candidateId: string) => {
    setState({
      ...state,
      candidates: state.candidates.filter(candidate => candidate.id !== candidateId),
    });
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

  const totalVotes = state.candidates.reduce((sum, candidate) => sum + candidate.votes, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} onLogout={logout} />
      {user.isAdmin ? (
        <AdminDashboard
          candidates={state.candidates}
          totalVotes={totalVotes}
          onEndVoting={handleEndVoting}
          onRestartVoting={handleRestartVoting}
          onUpdateCandidate={handleUpdateCandidate}
          onAddCandidate={handleAddCandidate}
          onDeleteCandidate={handleDeleteCandidate}
          ballots={ballots}
          votingEnded={state.votingEnded}
        />
      ) : (
        <VotingSection
          candidates={state.candidates}
          onVote={handleVote}
          hasVoted={user.hasVoted}
          votingEnded={state.votingEnded}
        />
      )}
    </div>
  );
}