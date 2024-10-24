export interface Candidate {
  id: string;
  name: string;
  position: string;
  votes: number;
  imageUrl: string;
  description: string;
}

export interface User {
  id: string;
  username: string;
  name: string;
  isAdmin: boolean;
  hasVoted: boolean;
  registeredAt: string;
}

export interface VotingState {
  isAuthenticated: boolean;
  currentUser: User | null;
  candidates: Candidate[];
  votingEnded: boolean;
}

export interface BallotRecord {
  userId: string;
  candidateId: string;
  timestamp: string;
  verified: boolean;
}