import React, { useState } from 'react';
import Navbar from './components/Navbar';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import VotingSection from './components/VotingSection';
import AdminDashboard from './components/AdminDashboard';
import type { User, Candidate, VotingState, BallotRecord } from './types';

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

function App() {
  const [showLogin, setShowLogin] = useState(true);
  const [state, setState] = useState<VotingState>({
    isAuthenticated: false,
    currentUser: null,
    candidates: initialCandidates,
    votingEnded: false,
  });
  const [ballots, setBallots] = useState<BallotRecord[]>(initialBallots);

  const handleLogin = (username: string, password: string) => {
    const isAdmin = username.includes('admin');
    const user: User = {
      id: crypto.randomUUID(),
      username,
      name: isAdmin ? 'Admin User' : username,
      isAdmin,
      hasVoted: false,
      registeredAt: new Date().toISOString(),
    };

    setState({
      ...state,
      isAuthenticated: true,
      currentUser: user,
    });
  };

  const handleRegister = (username: string, name: string, password: string) => {
    const user: User = {
      id: crypto.randomUUID(),
      username,
      name,
      isAdmin: false,
      hasVoted: false,
      registeredAt: new Date().toISOString(),
    };

    setState({
      ...state,
      isAuthenticated: true,
      currentUser: user,
    });
  };

  const handleLogout = () => {
    setState({
      ...state,
      isAuthenticated: false,
      currentUser: null,
    });
  };

  const handleVote = (candidateId: string) => {
    if (!state.currentUser || state.currentUser.hasVoted || state.votingEnded) return;

    const ballot: BallotRecord = {
      userId: state.currentUser.id,
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
      currentUser: {
        ...state.currentUser,
        hasVoted: true,
      },
    });
  };

  const handleEndVoting = () => {
    setState({
      ...state,
      votingEnded: true,
    });
  };

  const totalVotes = state.candidates.reduce((sum, candidate) => sum + candidate.votes, 0);

  if (!state.isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar user={null} onLogout={handleLogout} />
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          {showLogin ? (
            <LoginForm onLogin={handleLogin} onToggleForm={() => setShowLogin(false)} />
          ) : (
            <RegisterForm onRegister={handleRegister} onToggleForm={() => setShowLogin(true)} />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={state.currentUser} onLogout={handleLogout} />
      {state.currentUser?.isAdmin ? (
        <AdminDashboard
          candidates={state.candidates}
          totalVotes={totalVotes}
          onEndVoting={handleEndVoting}
          ballots={ballots}
          votingEnded={state.votingEnded}
        />
      ) : (
        <VotingSection
          candidates={state.candidates}
          onVote={handleVote}
          hasVoted={state.currentUser?.hasVoted || false}
          votingEnded={state.votingEnded}
        />
      )}
    </div>
  );
}

export default App;