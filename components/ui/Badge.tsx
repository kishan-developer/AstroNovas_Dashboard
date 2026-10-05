import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'default' | 'purple' | 'blue' | 'green' | 'orange' | 'red' | 'primary' | 'secondary';
  className?: string;
}

export const Badge = ({ children, variant = 'default', className }: BadgeProps) => {
  const variants = {
    success: 'bg-purple-50 text-purple-700 border-purple-200',
    warning: 'bg-[#F5F3FF] text-purple-900 border-purple-300',
    danger: 'bg-black text-white border-black',
    info: 'bg-purple-100 text-purple-800 border-purple-200',
    default: 'bg-gray-100 text-black border-gray-300',
    purple: 'bg-purple-100 text-purple-800 border-purple-200',
    blue: 'bg-purple-50 text-purple-700 border-purple-200',
    green: 'bg-purple-100 text-purple-800 border-purple-200',
    orange: 'bg-[#F5F3FF] text-purple-900 border-purple-200',
    red: 'bg-black text-white border-black',
    primary: 'bg-purple-700 text-white border-purple-700',
    secondary: 'bg-gray-200 text-black border-gray-300',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-md text-xs font-semibold border',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
};
