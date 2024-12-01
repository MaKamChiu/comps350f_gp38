import { describe, it, expect, vi } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import VotingSection from '../../components/VotingSection';
import { mockVotingOptions } from '../mocks/votingData';
import { renderWithProviders } from '../utils/renderWithProviders';

describe('VotingSection Component', () => {
  const mockOnVote = vi.fn();
  const mockVotedOptions = new Set<string>();

  it('renders voting topics correctly', () => {
    renderWithProviders(
      <VotingSection
        votingOptions={mockVotingOptions}
        onVote={mockOnVote}
        votedOptions={mockVotedOptions}
      />
    );

    expect(screen.getByText('Presidential Election')).toBeInTheDocument();
    expect(screen.getByText('Board Members')).toBeInTheDocument();
  });

  it('allows selecting and voting for candidates', () => {
    renderWithProviders(
      <VotingSection
        votingOptions={mockVotingOptions}
        onVote={mockOnVote}
        votedOptions={mockVotedOptions}
      />
    );

    // Click to view candidates
    const viewButton = screen.getAllByText('View Candidates')[0];
    fireEvent.click(viewButton);

    // Select a candidate
    const candidateElement = screen.getByText('John Doe');
    fireEvent.click(candidateElement);

    // Submit vote
    const submitButton = screen.getByText(/Submit Votes/);
    fireEvent.click(submitButton);

    expect(mockOnVote).toHaveBeenCalledWith('1', '1');
  });

  it('prevents voting on topics that have already been voted on', () => {
    const votedOptions = new Set(['1']);
    renderWithProviders(
      <VotingSection
        votingOptions={mockVotingOptions}
        onVote={mockOnVote}
        votedOptions={votedOptions}
      />
    );

    expect(screen.getByText('You have already voted in this topic')).toBeInTheDocument();
  });

  it('enforces maximum selections limit', () => {
    renderWithProviders(
      <VotingSection
        votingOptions={mockVotingOptions}
        onVote={mockOnVote}
        votedOptions={mockVotedOptions}
      />
    );

    // Click to view candidates
    const viewButton = screen.getAllByText('View Candidates')[0];
    fireEvent.click(viewButton);

    // Try to select more candidates than allowed
    mockVotingOptions[0].candidates.forEach(candidate => {
      fireEvent.click(screen.getByText(candidate.name));
    });

    expect(mockOnVote).not.toHaveBeenCalled();
  });
});