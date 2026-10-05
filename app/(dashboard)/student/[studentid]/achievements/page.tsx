'use client';

import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Award, Flame, Star, Zap, Trophy, Target, Globe, Sun } from 'lucide-react';

const badges = [
  { id: 1, title: '14-Day Streak Master', icon: Flame, desc: 'Maintained 14 consecutive days of study', date: 'Earned Yesterday' },
  { id: 2, title: 'Spectroscopy Genius', icon: Globe, desc: 'Achieved 95%+ score in 3 Astrophysics assessments', date: 'Earned Aug 15' },
  { id: 3, title: 'Early Bird Learner', icon: Sun, desc: 'Completed 5 morning study sessions', date: 'Earned Aug 02' },
];

export default function StudentAchievementsPage() {
  return (
    <DashboardLayout title="Achievements" breadcrumb={['Student', 'Achievements']} activeItem="Achievements" role="student">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-black">Gamification & Badges</h1>
          <p className="text-gray-500 text-sm font-normal">Your learning milestones, streaks, and platform badges</p>
        </div>

        {/* Milestone Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-4 bg-purple-700 text-white flex items-center gap-4">
            <div className="w-10 h-10 bg-white text-purple-700 rounded-full flex items-center justify-center">
              <Flame size={20} />
            </div>
            <div>
              <p className="text-xs uppercase font-semibold text-purple-100">Current Streak</p>
              <h3 className="text-xl font-semibold">14 Days</h3>
            </div>
          </Card>

          <Card className="p-4 bg-purple-700 text-white flex items-center gap-4">
            <div className="w-10 h-10 bg-white text-purple-700 rounded-full flex items-center justify-center">
              <Zap size={20} />
            </div>
            <div>
              <p className="text-xs uppercase font-semibold text-purple-100">Total Points</p>
              <h3 className="text-xl font-semibold">2,450 XP</h3>
            </div>
          </Card>

          <Card className="p-4 bg-black text-white flex items-center gap-4">
            <div className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center">
              <Trophy size={20} />
            </div>
            <div>
              <p className="text-xs uppercase font-semibold text-gray-200">Global Rank</p>
              <h3 className="text-xl font-semibold">Top 5%</h3>
            </div>
          </Card>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {badges.map(b => {
            const BadgeIcon = b.icon;
            return (
              <Card key={b.id} className="p-4 text-center space-y-3 hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center mx-auto">
                  <BadgeIcon size={24} />
                </div>
                <h4 className="font-semibold text-black text-base">{b.title}</h4>
                <p className="text-xs text-gray-600 font-normal">{b.desc}</p>
                <Badge variant="success" className="text-[10px] font-semibold">{b.date}</Badge>
              </Card>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
