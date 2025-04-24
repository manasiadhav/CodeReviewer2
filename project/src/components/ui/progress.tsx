import React from 'react';
import { cn } from '../../lib/utils';

interface ProgressProps {
  value: number;
  max: number;
  className?: string;
  progressClassName?: string;
}

export const Progress: React.FC<ProgressProps> = ({ 
  value, 
  max, 
  className,
  progressClassName
}) => {
  return (
    <div className={cn('h-2 w-full bg-gray-200 rounded-full overflow-hidden', className)}>
      <div
        className={cn('h-full transition-all duration-500 ease-out', progressClassName || 'bg-accent-600')}
        style={{ width: `${Math.min(100, (value / max) * 100)}%` }}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={value}
      />
    </div>
  );
};