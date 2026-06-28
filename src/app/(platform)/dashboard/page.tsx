'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { mockSessions, recentWorkout, todayAIScores } from '@/lib/mock-data';
import ScoreCardsRow from '@/components/dashboard/ScoreCardsRow';
import RecentWorkoutCard from '@/components/dashboard/RecentWorkoutCard';
import HeartRateZonesChart from '@/components/dashboard/HeartRateZonesChart';
import DeviceStatusCard from '@/components/dashboard/DeviceStatusCard';
import AISummaryCard from '@/components/dashboard/AISummaryCard';
import DailyMetricsStrip from '@/components/dashboard/DailyMetricsStrip';
import { Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const WeeklyPerformanceChart = dynamic(
  () => import('@/components/dashboard/WeeklyPerformanceChart'),
  { 
    ssr: false, 
    loading: () => (
      <div className="h-[380px] w-full bg-[#0F1626]/60 backdrop-blur-xl border border-white/5 rounded-3xl flex items-center justify-center text-gray-500">
        <span className="text-sm font-medium tracking-wider">Syncing telemetry charts...</span>
      </div>
    )
  }
);


export default function DashboardPage() {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="space-y-6 md:space-y-8 select-none">
      {/* Welcome Banner */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h2 className="text-xl md:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            Welcome back, Alex
          </h2>
          <p className="text-xs text-gray-500 mt-1">Here is your biometrics and swimming performance overview.</p>
        </div>
        
        {/* Calendar Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 border border-white/5 text-xs text-gray-400 font-semibold self-start md:self-auto">
          <Calendar className="w-4 h-4 text-brand-cyan" />
          <span>{today}</span>
        </div>
      </motion.div>

      {/* AI Score Cards Row */}
      <ScoreCardsRow scores={todayAIScores} />

      {/* Primary Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Volume & Pace Chart (Spans 2 cols on large screen) */}
        <div className="lg:col-span-2">
          <WeeklyPerformanceChart sessions={mockSessions} />
        </div>
        
        {/* AI Coaching summary */}
        <div>
          <AISummaryCard scores={todayAIScores} />
        </div>
      </div>

      {/* Workout and Sensor Diagnostics section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Recent Swim Workout details */}
        <div>
          <RecentWorkoutCard session={recentWorkout} />
        </div>

        {/* Heart Rate Intensity Zone distribution */}
        <div>
          <HeartRateZonesChart session={recentWorkout} />
        </div>

        {/* Wearable Config & Sensor Diagnostic Check */}
        <div>
          <DeviceStatusCard />
        </div>
      </div>

      {/* Biometrics Strip (Bottom Row) */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">
          Direct Wearable Telemetry (Category 1)
        </h3>
        <DailyMetricsStrip session={recentWorkout} />
      </div>
    </div>
  );
}
