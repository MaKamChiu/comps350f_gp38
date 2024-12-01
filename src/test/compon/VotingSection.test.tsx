import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import VotingSection from '../../components/VotingSection';
import { mockVotingOptions } from '../mocks/votingData';

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
    const viewButton = screen.getAllByText('ViewCandidates')[0];
    fireEvent.click(viewButton);

    // Select a candidate by position
    const candidateElement = screen.getByText('President'); // Use position text (e.g., "President")
    fireEvent.click(candidateElement);

    // Submit vote
    const submitButton = screen.getByText(/Submit Votes/);
    fireEvent.click(submitButton);

    expect(mockOnVote).toHaveBeenCalledWith('1', '1'); // Adjust parameters based on mockVotingOptions
  });

});
