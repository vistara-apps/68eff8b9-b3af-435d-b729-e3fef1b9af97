'use client';

import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface ActionFABProps {
  icon: LucideIcon;
  label: string;
  variant?: 'primary' | 'secondary' | 'record';
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}

const variants = {
  primary: 'from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600',
  secondary: 'from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600',
  record: 'from-red-500 to-red-600 hover:from-red-600 hover:to-red-700',
};

export function ActionFAB({ 
  icon: Icon, 
  label, 
  variant = 'primary', 
  onClick, 
  className,
  disabled = false 
}: ActionFABProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'fab-button group',
        `bg-gradient-to-r ${variants[variant]}`,
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      aria-label={label}
    >
      <Icon className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-200" />
      
      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-black bg-opacity-80 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
        {label}
      </div>
    </button>
  );
}
