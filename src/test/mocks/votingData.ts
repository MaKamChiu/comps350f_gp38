import type { VotingOption, Candidate } from '../../types';

export const mockCandidates: Candidate[] = [
  {
    id: '1',
    name: 'John Doe',
    description: 'Experienced leader',
    position: 'President',
    votes: 10,
    imageUrl: 'https://example.com/john.jpg'
  },
  {
    id: '2',
    name: 'Jane Smith',
    description: 'Innovative thinker',
    position: 'Vice President',
    votes: 8,
    imageUrl: 'https://example.com/jane.jpg'
  }
];

export const mockVotingOptions: VotingOption[] = [
  {
    id: '1',
    name: 'Presidential Election',
    title: 'Presidential Election 2024',
    description: 'Vote for the next president',
    candidates: mockCandidates,
    maxSelections: 1,
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    type: 'single',
    status: 'active',
    createdBy: 'admin',
    updatedAt: '2024-01-01'
  },
  {
    id: '2',
    name: 'Board Members',
    title: 'Board Member Selection',
    description: 'Select board members',
    candidates: [],
    maxSelections: 3,
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    type: 'multiple',
    status: 'draft',
    createdBy: 'admin',
    updatedAt: '2024-01-01'
  }
];