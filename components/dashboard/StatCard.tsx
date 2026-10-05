"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'

interface StatCardProps {
  title: string
  value: string | number
  change?: string | { value: number; isPositive?: boolean }
  changeType?: 'positive' | 'negative' | 'neutral'
  icon: any
  color?: 'purple' | 'blue' | 'green' | 'orange' | 'red'
  chart?: React.ReactNode
}

const colorClasses = {
  purple: { bg: 'bg-[#F5F3FF]', icon: 'text-[#7C3AED]', gradient: 'from-[#7C3AED] to-[#6D28D9]' },
  blue: { bg: 'bg-blue-50', icon: 'text-blue-600', gradient: 'from-blue-500 to-blue-600' },
  green: { bg: 'bg-green-50', icon: 'text-green-600', gradient: 'from-green-500 to-green-600' },
  orange: { bg: 'bg-orange-50', icon: 'text-orange-600', gradient: 'from-orange-500 to-orange-600' },
  red: { bg: 'bg-red-50', icon: 'text-red-600', gradient: 'from-red-500 to-red-600' },
}

export function StatCard({ 
  title, 
  value, 
  change, 
  changeType = 'neutral', 
  icon: Icon, 
  color = 'purple',
  chart
}: StatCardProps) {
  const colors = { bg: 'bg-purple-100', icon: 'text-purple-700' };

  const displayChange = typeof change === 'object' 
    ? `${change.isPositive ? '+' : '-'}${change.value}%` 
    : change;

  const isPos = typeof change === 'object' ? change.isPositive : changeType === 'positive';
  const isNeg = typeof change === 'object' ? !change.isPositive : changeType === 'negative';

  return (
    <Card hover>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <p className="text-xs font-semibold text-gray-600 mb-1">{title}</p>
            <p className="text-2xl font-semibold text-black">{value}</p>
            {change && (
              <div className="flex items-center gap-1 mt-1">
                {isPos && <TrendingUp size={14} className="text-purple-700" />}
                {isNeg && <TrendingDown size={14} className="text-black" />}
                <p className="text-xs font-semibold text-purple-700">
                  {displayChange}
                </p>   
              </div>
            )}
          </div>
          <div className="w-12 h-12 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center flex-shrink-0">
            {React.isValidElement(Icon) ? Icon : typeof Icon === 'function' ? <Icon className="w-6 h-6 text-purple-700" /> : null}
          </div>  
        </div>
        {chart && (
          <div className="mt-2 h-12">
            {chart}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default StatCard;
