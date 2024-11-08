// src/main.tsx
import React, { StrictMode } from 'react'; // 加入 React 引入
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './index.css';
import './i18n';
import { LanguageProvider } from './contexts/LanguageContext';
import { VotingRulesProvider } from './contexts/VotingRulesContext';
import { FirebaseProvider } from './contexts/FirebaseContext';

const root = createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <FirebaseProvider>
      <LanguageProvider>
        <VotingRulesProvider>
          <App />
        </VotingRulesProvider>
      </LanguageProvider>
    </FirebaseProvider>
  </React.StrictMode>
);