'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
}

const variantClasses = {
  text: 'rounded',
  circular: 'rounded-full',
  rectangular: 'rounded-lg',
};

export const Skeleton = ({
  className,
  variant = 'text',
  width,
  height,
  animation = 'pulse',
}: SkeletonProps) => {
  const animationClass = {
    pulse: 'animate-pulse',
    wave: 'animate-shimmer',
    none: '',
  }[animation];

  return (
    <motion.div
      className={cn(
        'bg-gray-200',
        variantClasses[variant],
        animationClass,
        className
      )}
      style={{ width, height }}
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
    />
  );
};

// Skeleton Card for loading states
export const SkeletonCard = () => (
  <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
    <div className="flex items-start justify-between mb-4">
      <div className="flex-1">
        <Skeleton variant="text" height={20} width="60%" className="mb-2" />
        <Skeleton variant="text" height={32} width="40%" />
      </div>
      <Skeleton variant="circular" width={56} height={56} />
    </div>
    <Skeleton variant="text" height={16} width="30%" />
  </div>
);

// Skeleton Table Row
export const SkeletonTableRow = ({ columns = 5 }: { columns?: number }) => (
  <tr className="border-b border-gray-100">
    {Array.from({ length: columns }).map((_, i) => (
      <td key={i} className="px-6 py-4">
        <Skeleton variant="text" height={20} width="80%" />
      </td>
    ))}
  </tr>
);
