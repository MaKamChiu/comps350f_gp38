export interface Candidate {
  id: string;
  name: string;
  position: string;
  votes: number;
  imageUrl: string;
  description: string;
}

export interface VotingOption {
  id: string;
  name: string;
  description: string;
  maxSelections: number;
  candidates: Candidate[];
}

export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  password?: string;
  isAdmin: boolean;
  votedOptions: Set<string>;
  registeredAt: string;
  language?: string;
}

export interface BallotRecord {
  userId: string;
  optionId: string;
  candidateId: string;
  timestamp: string;
  verified: boolean;
}