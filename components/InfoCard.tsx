'use client';

import { RightsCard } from '@/lib/types';
import { Lock, Shield, Car, Search, Handcuffs } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InfoCardProps {
  card: RightsCard;
  variant?: 'basic' | 'detailed' | 'script';
  onUnlock?: () => void;
}

const categoryIcons = {
  basic: Shield,
  traffic: Car,
  search: Search,
  arrest: Handcuffs,
};

const categoryColors = {
  basic: 'from-blue-500 to-cyan-500',
  traffic: 'from-green-500 to-emerald-500',
  search: 'from-yellow-500 to-orange-500',
  arrest: 'from-red-500 to-pink-500',
};

export function InfoCard({ card, variant = 'basic', onUnlock }: InfoCardProps) {
  const Icon = categoryIcons[card.category];
  const gradientColor = categoryColors[card.category];

  return (
    <div className={cn(
      'glass-card p-6 card-hover relative overflow-hidden',
      variant === 'detailed' && 'p-8',
      variant === 'script' && 'bg-opacity-15'
    )}>
      {/* Background gradient */}
      <div className={cn(
        'absolute inset-0 bg-gradient-to-br opacity-10',
        gradientColor
      )} />
      
      {/* Premium lock overlay */}
      {card.isPremium && (
        <div className="absolute top-4 right-4">
          <div className="bg-yellow-500 bg-opacity-20 backdrop-blur-sm rounded-full p-2">
            <Lock className="w-4 h-4 text-yellow-400" />
          </div>
        </div>
      )}

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <div className={cn(
            'p-3 rounded-lg bg-gradient-to-br',
            gradientColor
          )}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-white mb-2">
              {card.title}
            </h3>
            {variant === 'detailed' && (
              <div className="text-sm text-gray-300 capitalize">
                {card.category} Rights
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="text-gray-200 leading-relaxed">
          {card.isPremium && !onUnlock ? (
            <div className="text-center py-8">
              <Lock className="w-8 h-8 text-yellow-400 mx-auto mb-4" />
              <p className="text-gray-300 mb-4">
                Unlock premium content for detailed guidance
              </p>
              <button
                onClick={onUnlock}
                className="glass-button bg-gradient-to-r from-yellow-500 to-orange-500"
              >
                Unlock for $2.99
              </button>
            </div>
          ) : (
            <p>{card.content}</p>
          )}
        </div>

        {/* Script variant additional elements */}
        {variant === 'script' && !card.isPremium && (
          <div className="mt-6 p-4 bg-white bg-opacity-5 rounded-lg border border-white border-opacity-10">
            <h4 className="text-sm font-medium text-gray-300 mb-2">
              What to say:
            </h4>
            <p className="text-white font-medium italic">
              "I am exercising my right to remain silent."
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
