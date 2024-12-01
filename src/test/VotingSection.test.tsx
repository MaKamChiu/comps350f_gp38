import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import VotingSection from '../components/VotingSection';
import { mockVotingOptions } from './mocks/votingData';

// Mocking i18n
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key.replace('common.', ''), // Simplifies translation for testing
  }),
}));

describe('VotingSection Component', () => {
  const mockOnVote = vi.fn();
  const mockVotedOptions = new Set<string>();

  it('renders voting topics correctly', () => {
    render(
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
    render(
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
    const candidateElement = screen.getByText('John Doe'); // Ensure this name exists in mockVotingOptions
    fireEvent.click(candidateElement);

    // Submit vote
    const submitButton = screen.getByText(/Submit Votes/);
    fireEvent.click(submitButton);

    expect(mockOnVote).toHaveBeenCalledWith('1', '1'); // Adjust parameters based on mockVotingOptions
  });

  it('prevents voting on topics that have already been voted on', () => {
    const votedOptions = new Set(['1']); // Assuming '1' is a topic ID
    render(
      <VotingSection
        votingOptions={mockVotingOptions}
        onVote={mockOnVote}
        votedOptions={votedOptions}
      />
    );

    expect(screen.getByText('You have already voted in this topic')).toBeInTheDocument();
  });

  it('enforces maximum selections limit', () => {
    render(
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
      fireEvent.click(screen.getByText(candidate.name)); // Assumes candidates have a "name" property
    });

    // Ensure the callback was not triggered due to exceeding the limit
    expect(mockOnVote).not.toHaveBeenCalled();
  });
});
