import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'zh', name: '中文' }
];

export default function LanguageSelector() {
  const { currentLanguage, changeLanguage } = useLanguage();

  return (
    <div className="relative inline-block text-left">
      <div className="flex items-center space-x-2">
        <Globe className="w-4 h-4" />
        <select
          value={currentLanguage}
          onChange={(e) => changeLanguage(e.target.value)}
          className="bg-transparent text-white border-none focus:ring-0 cursor-pointer text-sm"
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code} className="text-gray-900">
              {lang.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}