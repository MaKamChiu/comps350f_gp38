import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import AdminDashboard from '../components/AdminDashboard';
import { mockVotingOptions } from './mocks/votingData';

// Mock the VotingRulesContext
vi.mock('../contexts/VotingRulesContext', () => ({
  useVotingRules: () => ({
    addVotingOption: vi.fn(),
    removeVotingOption: vi.fn(),
  }),
}));

describe('AdminDashboard Component', () => {
  const mockOnRestartVoting = vi.fn();

  it('renders dashboard with voting options', () => {
    render(
      <AdminDashboard
        votingOptions={mockVotingOptions}
        onRestartVoting={mockOnRestartVoting}
      />
    );

    expect(screen.getByText('Admin Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Presidential Election 2024')).toBeInTheDocument();
  });

  it('allows adding new voting topics', () => {
    render(
      <AdminDashboard
        votingOptions={mockVotingOptions}
        onRestartVoting={mockOnRestartVoting}
      />
    );

    // Click add topic button
    fireEvent.click(screen.getByText('Add Voting Topic'));

    // Fill form
    fireEvent.change(screen.getByLabelText('Topic Name'), {
      target: { value: 'New Election' },
    });
    fireEvent.change(screen.getByLabelText('Description'), {
      target: { value: 'New election description' },
    });
    fireEvent.change(screen.getByLabelText('Maximum Selections'), {
      target: { value: '2' },
    });

    // Submit form
    fireEvent.click(screen.getByText('Add Topic'));

    // Verify form is closed
    expect(screen.queryByText('Add Topic')).not.toBeInTheDocument();
  });

  it('allows restarting voting', () => {
    render(
      <AdminDashboard
        votingOptions={mockVotingOptions}
        onRestartVoting={mockOnRestartVoting}
      />
    );

    fireEvent.click(screen.getByText('Restart Voting'));
    expect(mockOnRestartVoting).toHaveBeenCalled();
  });

  it('displays voting statistics correctly', () => {
    render(
      <AdminDashboard
        votingOptions={mockVotingOptions}
        onRestartVoting={mockOnRestartVoting}
      />
    );

    expect(screen.getByText('Total Votes Cast')).toBeInTheDocument();
    expect(screen.getByText('18')).toBeInTheDocument(); // Sum of votes from mock data
  });
});