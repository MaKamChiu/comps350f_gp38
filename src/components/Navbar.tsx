import React from 'react';
import { Vote, LogOut, HelpCircle } from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import { useTranslation } from 'react-i18next';

interface NavbarProps {
  user: { name: string; isAdmin: boolean } | null;
  onLogout: () => void;
  onHelpClick?: () => void;
}

export default function Navbar({ user, onLogout, onHelpClick }: NavbarProps) {
  const { t } = useTranslation();

  return (
    <nav className="bg-indigo-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-2">
            <Vote className="w-8 h-8" />
            <span className="font-bold text-xl">SecureVote</span>
          </div>
          
          <div className="flex items-center space-x-6">
            <LanguageSelector />
            
            {user && (
              <div className="flex items-center space-x-4">
                <span className="text-sm">
                  {t('common.welcome')}, {user.name} {user.isAdmin && `(${t('common.admin')})`}
                </span>
                {onHelpClick && (
                  <button
                    onClick={onHelpClick}
                    className="flex items-center space-x-1 bg-indigo-700 hover:bg-indigo-800 px-3 py-2 rounded-md text-sm"
                  >
                    <HelpCircle className="w-4 h-4" />
                    <span>{t('common.help')}</span>
                  </button>
                )}
                <button
                  onClick={onLogout}
                  className="flex items-center space-x-1 bg-indigo-700 hover:bg-indigo-800 px-3 py-2 rounded-md text-sm"
                >
                  <LogOut className="w-4 h-4" />
                  <span>{t('common.logout')}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}