import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AdminDashboard from '../components/AdminDashboard';
import { mockVotingOptions } from './mocks/votingData';
import { useVotingRules } from '../contexts/VotingRulesContext';
import { VotingService } from '../services/votingService';

// Mock the VotingRulesContext
vi.mock('../contexts/VotingRulesContext', () => ({
  useVotingRules: () => ({
    addVotingOption: vi.fn(),
    removeVotingOption: vi.fn(),
  }),
}));

// Mock translations
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'admin.dashboard': 'Admin Dashboard',
        'admin.AddVotingTopic': 'Add Voting Topic',
        'admin.restartVoting': 'Restart Voting',
        'voting.TopicName': 'Topic Name',
        'voting.Description': 'Description',
        'voting.maxSelections': 'Maximum Selections',
        'voting.addtopic': 'Add Topic',
        'candidates.cancel': 'Cancel',
      };
      return translations[key] || key; // Fallback to key if no translation found
    },
  }),
}));

// Mock the VotingService resetAllVotes method
vi.mock('../services/votingService', () => ({
  VotingService: {
    resetAllVotes: vi.fn().mockResolvedValueOnce({}),
  },
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

    // Verify dashboard header
    expect(screen.getByText('Admin Dashboard')).toBeInTheDocument();

    // Verify voting options are displayed
    expect(screen.getByText('Presidential Election 2024')).toBeInTheDocument();
    expect(screen.getByText('Board Member Selection')).toBeInTheDocument();
  });

  it('allows adding new voting topics', async () => {
    render(
      <AdminDashboard
        votingOptions={mockVotingOptions}
        onRestartVoting={mockOnRestartVoting}
      />
    );

    // Click add topic button
    fireEvent.click(screen.getByTestId('add-voting-topic-button'));

    // Wait for the form to appear and fill the inputs
    const topicNameInput = await screen.findByTestId('new-option-name');
    const descriptionInput = await screen.findByTestId('new-option-description');
    const maxSelectionsInput = await screen.findByTestId('new-option-max-selections');

    fireEvent.change(topicNameInput, {
      target: { value: 'New Election' },
    });
    fireEvent.change(descriptionInput, {
      target: { value: 'New election description' },
    });
    fireEvent.change(maxSelectionsInput, {
      target: { value: '2' },
    });

    // Submit form
    fireEvent.click(screen.getByTestId('add-new-option'));

    // Verify the form closes and the new option is added
    await waitFor(() => {
      expect(screen.queryByTestId('new-option-form')).not.toBeInTheDocument();
    });
  });

  it('prevents adding new voting topics with invalid input', async () => {
    render(
      <AdminDashboard
        votingOptions={mockVotingOptions}
        onRestartVoting={mockOnRestartVoting}
      />
    );

    // Click add topic button
    fireEvent.click(screen.getByTestId('add-voting-topic-button'));

    // Fill the form with invalid data
    const topicNameInput = await screen.findByTestId('new-option-name');
    const descriptionInput = await screen.findByTestId('new-option-description');
    const maxSelectionsInput = await screen.findByTestId('new-option-max-selections');

    fireEvent.change(topicNameInput, {
      target: { value: '' }, // Invalid name
    });
    fireEvent.change(descriptionInput, {
      target: { value: 'Valid description' },
    });
    fireEvent.change(maxSelectionsInput, {
      target: { value: '2' },
    });

    // Try to submit the form
    fireEvent.click(screen.getByTestId('add-new-option'));

    // Verify form is not submitted
    expect(screen.queryByTestId('new-option-form')).toBeInTheDocument();
  });

  it('allows restarting voting', async () => {
    render(
      <AdminDashboard
        votingOptions={mockVotingOptions}
        onRestartVoting={mockOnRestartVoting}
      />
    );

    // Verify restart voting button exists
    const restartButton = screen.getByTestId('restart-voting-button');

    // Click the restart voting button
    fireEvent.click(restartButton);

    // Ensure restart callback is called
    await waitFor(() => {
      expect(mockOnRestartVoting).toHaveBeenCalled();
    });
  });



  it('handles tab switching between audit and report', () => {
    render(
      <AdminDashboard
        votingOptions={mockVotingOptions}
        onRestartVoting={mockOnRestartVoting}
      />
    );

    // Initially, the audit tab should be active
    expect(screen.getByTestId('audit-tab')).toHaveClass('border-indigo-500');

    // Switch to the report tab
    fireEvent.click(screen.getByTestId('report-tab'));

    // Verify that the report tab is active
    expect(screen.getByTestId('report-tab')).toHaveClass('border-indigo-500');
    expect(screen.getByTestId('audit-tab')).not.toHaveClass('border-indigo-500');
  });
});
