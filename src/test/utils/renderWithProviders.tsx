import React from 'react';
import { render } from '@testing-library/react';
import { LanguageProvider } from '../../contexts/LanguageContext';
import { VotingRulesProvider } from '../../contexts/VotingRulesContext';

export function renderWithProviders(ui: React.ReactElement) {
  return render(
    <LanguageProvider>
      <VotingRulesProvider>
        {ui}
      </VotingRulesProvider>
    </LanguageProvider>
  );
}