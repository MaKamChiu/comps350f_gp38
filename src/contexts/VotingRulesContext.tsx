import React, { createContext, useContext, useState, useEffect } from 'react';
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';
import type { VotingOption } from '../types';

interface VotingRulesContextType {
  votingOptions: VotingOption[];
  addVotingOption: (option: VotingOption) => Promise<void>;
  updateVotingOption: (option: VotingOption) => Promise<void>;
  deleteVotingOption: (id: string) => Promise<void>;
}

const VotingRulesContext = createContext<VotingRulesContextType | null>(null);

export function VotingRulesProvider({ children }: { children: React.ReactNode }) {
  const [votingOptions, setVotingOptions] = useState<VotingOption[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'votingOptions'), (snapshot) => {
      const options = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as VotingOption[];
      setVotingOptions(options);
    });

    return () => unsubscribe();
  }, []);

  const addVotingOption = async (option: VotingOption) => {
    await addDoc(collection(db, 'votingOptions'), option);
  };

  const updateVotingOption = async (option: VotingOption) => {
    const docRef = doc(db, 'votingOptions', option.id);
    await updateDoc(docRef, option);
  };

  const deleteVotingOption = async (id: string) => {
    const docRef = doc(db, 'votingOptions', id);
    await deleteDoc(docRef);
  };

  return (
    <VotingRulesContext.Provider value={{
      votingOptions,
      addVotingOption,
      updateVotingOption,
      deleteVotingOption
    }}>
      {children}
    </VotingRulesContext.Provider>
  );
}

export function useVotingRules() {
  const context = useContext(VotingRulesContext);
  if (!context) {
    throw new Error('useVotingRules must be used within a VotingRulesProvider');
  }
  return context;
}