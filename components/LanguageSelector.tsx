'use client';

import { useState } from 'react';
import { Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LanguageSelectorProps {
  currentLanguage: 'en' | 'es';
  onLanguageChange: (language: 'en' | 'es') => void;
  variant?: 'simple';
}

const languages = {
  en: { label: 'English', flag: '🇺🇸' },
  es: { label: 'Español', flag: '🇪🇸' },
};

export function LanguageSelector({ 
  currentLanguage, 
  onLanguageChange, 
  variant = 'simple' 
}: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-2 glass-button',
          variant === 'simple' && 'px-3 py-2'
        )}
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm">
          {languages[currentLanguage].flag} {languages[currentLanguage].label}
        </span>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute top-full left-0 mt-2 w-48 glass-card p-2 z-50">
            {Object.entries(languages).map(([code, lang]) => (
              <button
                key={code}
                onClick={() => {
                  onLanguageChange(code as 'en' | 'es');
                  setIsOpen(false);
                }}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left hover:bg-white hover:bg-opacity-10 transition-colors duration-200',
                  currentLanguage === code && 'bg-white bg-opacity-10'
                )}
              >
                <span className="text-lg">{lang.flag}</span>
                <span className="text-white">{lang.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
