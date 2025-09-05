'use client';

import { Globe } from 'lucide-react';
import { LanguageSelectorProps } from '@/lib/types';

export function LanguageSelector({
  currentLanguage,
  onLanguageChange,
  variant
}: LanguageSelectorProps) {
  return (
    <div className="glass-card p-4">
      <div className="flex items-center space-x-3 mb-4">
        <Globe className="w-5 h-5 text-white" />
        <h3 className="font-medium text-white">Language / Idioma</h3>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => onLanguageChange('en')}
          className={`p-3 rounded-lg border-2 transition-all duration-200 ${
            currentLanguage === 'en'
              ? 'border-accent bg-accent bg-opacity-20 text-white'
              : 'border-white border-opacity-20 text-gray-300 hover:border-opacity-40'
          }`}
        >
          <div className="text-center">
            <div className="text-lg font-semibold">🇺🇸</div>
            <div className="text-sm">English</div>
          </div>
        </button>

        <button
          onClick={() => onLanguageChange('es')}
          className={`p-3 rounded-lg border-2 transition-all duration-200 ${
            currentLanguage === 'es'
              ? 'border-accent bg-accent bg-opacity-20 text-white'
              : 'border-white border-opacity-20 text-gray-300 hover:border-opacity-40'
          }`}
        >
          <div className="text-center">
            <div className="text-lg font-semibold">🇪🇸</div>
            <div className="text-sm">Español</div>
          </div>
        </button>
      </div>
    </div>
  );
}
