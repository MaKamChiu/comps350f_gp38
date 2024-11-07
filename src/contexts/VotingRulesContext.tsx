import React, { createContext, useContext, useState } from 'react';
import type { VotingOption } from '../types';

interface VotingRulesContextType {
  votingOptions: VotingOption[];
  updateVotingOption: (option: VotingOption) => void;
  addVotingOption: (option: VotingOption) => void;
  removeVotingOption: (optionId: string) => void;
}

const initialVotingOptions: VotingOption[] = [];

const VotingRulesContext = createContext<VotingRulesContextType | undefined>(undefined);

export function VotingRulesProvider({ children }: { children: React.ReactNode }) {
  const [votingOptions, setVotingOptions] = useState<VotingOption[]>(initialVotingOptions);

  const updateVotingOption = (updatedOption: VotingOption) => {
    setVotingOptions(options =>
      options.map(option =>
        option.id === updatedOption.id ? updatedOption : option
      )
    );
  };

  const addVotingOption = (newOption: VotingOption) => {
    setVotingOptions(options => [...options, newOption]);
  };

  const removeVotingOption = (optionId: string) => {
    setVotingOptions(options => options.filter(option => option.id !== optionId));
  };

  return (
    <VotingRulesContext.Provider value={{
      votingOptions,
      updateVotingOption,
      addVotingOption,
      removeVotingOption
    }}>
      {children}
    </VotingRulesContext.Provider>
  );
}

export function useVotingRules() {
  const context = useContext(VotingRulesContext);
  if (context === undefined) {
    throw new Error('useVotingRules must be used within a VotingRulesProvider');
  }
  return context;
}