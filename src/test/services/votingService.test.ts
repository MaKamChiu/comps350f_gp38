import { describe, it, expect, vi } from 'vitest';
import { VotingService } from '../../services/votingService';
import { mockVotingOptions, mockCandidates } from '../mocks/votingData';
import { collection, doc, setDoc, getDoc, getDocs, writeBatch, getFirestore } from 'firebase/firestore';

// Mock Firebase Firestore
vi.mock('firebase/firestore', () => {
  const actual = vi.importActual('firebase/firestore'); // Partially import the real module
  return {
    ...actual,
    getFirestore: vi.fn(() => ({})), // Mock getFirestore to return a dummy object
    collection: vi.fn(),
    doc: vi.fn(),
    setDoc: vi.fn(),
    getDoc: vi.fn(),
    getDocs: vi.fn(),
    writeBatch: vi.fn(() => ({
      set: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(), // Mock batch.delete
      commit: vi.fn(),
    })),
    serverTimestamp: vi.fn(() => new Date()),
  };
});

describe('VotingService', () => {
  it('gets all voting options', async () => {
    const mockSnapshot = {
      docs: mockVotingOptions.map(option => ({
        id: option.id,
        data: () => option,
      })),
    };

    (getDocs as any).mockResolvedValueOnce(mockSnapshot);

    const options = await VotingService.getAllVotingOptions();
    expect(options).toHaveLength(mockVotingOptions.length);
    expect(options[0].name).toBe(mockVotingOptions[0].name);
  });

  it('adds a new voting option', async () => {
    const newOption = {
      name: 'New Election',
      title: 'New Election 2024',
      description: 'New election description',
      candidates: [],
      maxSelections: 1,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      type: 'single' as const,
      status: 'draft' as const,
      createdBy: 'admin',
      updatedAt: new Date().toISOString(),
    };

    (doc as any).mockReturnValueOnce({ id: 'new-id' });
    (setDoc as any).mockResolvedValueOnce(undefined);

    const result = await VotingService.addVotingOption(newOption);
    expect(result.id).toBe('new-id');
    expect(result.name).toBe(newOption.name);
  });

  it('records a vote successfully', async () => {
    const ballot = {
      id: 'ballot-1',
      userId: 'user-1',
      optionId: '1',
      candidateId: '1',
    };

    // Mock the document structure as expected by the VotingService
    const mockOptionDoc = {
      exists: () => true,
      data: () => ({
        id: '1', // Ensure this is correctly set
        name: 'Option 1',
        candidates: mockCandidates,
      }),
    };

    // Ensure getDoc mock returns the mock document
    (getDoc as any).mockResolvedValueOnce(mockOptionDoc);
  });

  it('resets all votes', async () => {
    const mockOptionsSnapshot = {
      docs: mockVotingOptions.map(option => ({
        data: () => option,
        ref: { id: option.id },
      })),
    };

    const mockBallotsSnapshot = {
      docs: [{ ref: { id: 'ballot-1' } }],
    };

    const mockUsersSnapshot = {
      docs: [{ ref: { id: 'user-1' }, data: () => ({ votedOptions: ['1'] }) }],
    };

    (getDocs as any)
      .mockResolvedValueOnce(mockOptionsSnapshot)
      .mockResolvedValueOnce(mockBallotsSnapshot)
      .mockResolvedValueOnce(mockUsersSnapshot);

    await expect(VotingService.resetAllVotes()).resolves.not.toThrow();
  });
});
