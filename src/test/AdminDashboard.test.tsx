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

  it('closes the new voting topic form when the "Cancel" button is clicked', async () => {
    render(
      <AdminDashboard
        votingOptions={mockVotingOptions}
        onRestartVoting={mockOnRestartVoting}
      />
    );

    const addVotingTopicButton = screen.getByText('Add Voting Topic');
    fireEvent.click(addVotingTopicButton);

    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    // Verify that the form is no longer visible
    expect(screen.queryByLabelText('Topic Name')).toBeNull();
  });
});
