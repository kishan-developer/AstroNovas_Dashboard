'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number;
  max?: number;
  color?: 'purple' | 'blue' | 'green' | 'orange' | 'red';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  label?: string;
  className?: string;
}

const colorClasses = {
  purple: 'bg-purple-700',
  blue: 'bg-purple-800',
  green: 'bg-purple-600',
  orange: 'bg-black',
  red: 'bg-black',
};

const sizeClasses = {
  sm: 'h-2',
  md: 'h-3',
  lg: 'h-4',
};

export const ProgressBar = ({
  value,
  max = 100,
  color = 'purple',
  size = 'md',
  showLabel = false,
  label,
  className,
}: ProgressBarProps) => {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className={cn('w-full', className)}>
      {(label || showLabel) && (
        <div className="flex items-center justify-between mb-2">
          {label && <span className="text-sm font-semibold text-black">{label}</span>}
          {showLabel && <span className="text-sm font-semibold text-purple-700">{percentage.toFixed(0)}%</span>}
        </div>
      )}
      <div className={cn('w-full bg-purple-100 rounded-md overflow-hidden', sizeClasses[size])}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={cn('h-full rounded-md', colorClasses[color])}
        />
      </div>
    </div>
  );
};
