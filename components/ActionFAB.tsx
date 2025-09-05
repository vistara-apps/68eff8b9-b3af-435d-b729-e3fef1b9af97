'use client';

import { ActionFABProps } from '@/lib/types';
import { cn } from '@/lib/utils';

export function ActionFAB({
  variant,
  onClick,
  icon,
  label,
  disabled = false
}: ActionFABProps) {
  const baseClasses = 'floating-action-btn';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600',
    secondary: 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600',
    record: 'bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600'
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        baseClasses,
        variantClasses[variant],
        disabled && 'opacity-50 cursor-not-allowed hover:scale-100'
      )}
      aria-label={label}
    >
      {icon}
    </button>
  );
}
