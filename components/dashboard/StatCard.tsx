"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'

interface StatCardProps {
  title: string
  value: string | number
  change?: string
  changeType?: 'positive' | 'negative' | 'neutral'
  icon: LucideIcon
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

export default function StatCard({ 
  title, 
  value, 
  change, 
  changeType = 'neutral', 
  icon: Icon, 
  color = 'purple',
  chart
}: StatCardProps) {
  const colors = colorClasses[color]

  return (
    <Card hover>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
            <p className="text-3xl font-bold text-gray-900">{value}</p>
            {change && (
              <div className="flex items-center gap-1 mt-2">
                {changeType === 'positive' && <TrendingUp size={16} className="text-green-600" />}
                {changeType === 'negative' && <TrendingDown size={16} className="text-red-600" />}
                <p className={`text-sm font-medium ${
                  changeType === 'positive' ? 'text-green-600' : 
                  changeType === 'negative' ? 'text-red-600' : 
                  'text-gray-500'
                }`}>
                  {change}
                </p>
              </div>
            )}
          </div>
          <div className={`w-14 h-14 ${colors.bg} rounded-2xl flex items-center justify-center flex-shrink-0`}>
            <Icon className={`w-7 h-7 ${colors.icon}`} />
          </div>
        </div>
        {chart && (
          <div className="mt-4 h-16">
            {chart}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
