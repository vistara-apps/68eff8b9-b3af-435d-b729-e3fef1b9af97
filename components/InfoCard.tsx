'use client';

import { Lock, ChevronRight } from 'lucide-react';
import { InfoCardProps } from '@/lib/types';
import { cn } from '@/lib/utils';

export function InfoCard({
  title,
  description,
  variant = 'basic',
  isPremium = false,
  onUnlock,
  children
}: InfoCardProps) {
  const cardClasses = cn(
    'info-card animate-fade-in',
    variant === 'script' && 'script-card',
    variant === 'detailed' && 'border-l-4 border-primary'
  );

  return (
    <div className={cardClasses}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
          <p className="text-gray-300 leading-relaxed">{description}</p>
        </div>
        
        {isPremium && (
          <div className="ml-4 flex items-center space-x-2">
            <Lock className="w-5 h-5 text-yellow-400" />
            <span className="text-yellow-400 text-sm font-medium">Premium</span>
          </div>
        )}
      </div>

      {children && (
        <div className="mt-4 pt-4 border-t border-white border-opacity-20">
          {children}
        </div>
      )}

      {isPremium && onUnlock && (
        <button
          onClick={onUnlock}
          className="mt-4 w-full btn-primary flex items-center justify-center space-x-2"
        >
          <Lock className="w-4 h-4" />
          <span>Unlock Premium Content</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
