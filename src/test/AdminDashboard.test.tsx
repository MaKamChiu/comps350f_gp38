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

// Mock the translation function
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key, // Return the key itself for testing
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
    fireEvent.click(screen.getByText('admin.AddVotingTopic'));

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

    // Use role matcher for button
    fireEvent.click(screen.getByRole('button', { name: /admin.restartVoting/i }));

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
