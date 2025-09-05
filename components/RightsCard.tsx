'use client';

import { Shield, Volume2, Eye, Scale } from 'lucide-react';
import { InfoCard } from './InfoCard';

interface RightsCardProps {
  right: {
    id: string;
    title: string;
    description: string;
    script: string;
  };
  onSpeak?: (text: string) => void;
}

export function RightsCard({ right, onSpeak }: RightsCardProps) {
  const getIcon = (id: string) => {
    switch (id) {
      case 'right-to-remain-silent':
        return <Volume2 className="w-6 h-6 text-accent" />;
      case 'right-to-refuse-search':
        return <Eye className="w-6 h-6 text-accent" />;
      case 'right-to-leave':
        return <Shield className="w-6 h-6 text-accent" />;
      case 'right-to-attorney':
        return <Scale className="w-6 h-6 text-accent" />;
      default:
        return <Shield className="w-6 h-6 text-accent" />;
    }
  };

  return (
    <InfoCard
      title={right.title}
      description={right.description}
      variant="detailed"
    >
      <div className="flex items-center space-x-3">
        {getIcon(right.id)}
        <div className="flex-1">
          <p className="text-sm text-gray-400 mb-1">What to say:</p>
          <p className="text-white font-medium italic">"{right.script}"</p>
        </div>
        {onSpeak && (
          <button
            onClick={() => onSpeak(right.script)}
            className="p-2 glass-card hover:bg-opacity-20 transition-all duration-200"
          >
            <Volume2 className="w-4 h-4 text-white" />
          </button>
        )}
      </div>
    </InfoCard>
  );
}
