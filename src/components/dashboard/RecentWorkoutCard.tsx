'use client';

import React from 'react';
import { SwimmingSession } from '@/types';
import { formatDate, formatTime, formatPace, formatShortDuration } from '@/lib/utils';
import { STROKE_LABELS, STROKE_COLORS } from '@/lib/constants';
import { Timer, Heart, Zap, Waves, Goal } from 'lucide-react';
import { motion } from 'framer-motion';

interface RecentWorkoutCardProps {
  session: SwimmingSession;
}

export default function RecentWorkoutCard({ session }: RecentWorkoutCardProps) {
  const strokeColor = STROKE_COLORS[session.primaryStroke] || '#0ea5e9';
  const strokeLabel = STROKE_LABELS[session.primaryStroke] || 'Freestyle';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className="glass-panel p-6 rounded-3xl flex flex-col justify-between h-full relative overflow-hidden"
    >
      {/* Glow highlight matching stroke color */}
      <div 
        className="absolute -top-24 -left-24 w-48 h-48 rounded-full blur-3xl opacity-10 pointer-events-none transition-all duration-500"
        style={{ backgroundColor: strokeColor }}
      />

      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Recent Workout</span>
            <span className="text-xs font-semibold text-gray-400 mt-0.5">
              {formatDate(session.date)} at {formatTime(session.date)}
            </span>
          </div>
          {/* Stroke Badge */}
          <span 
            className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border"
            style={{ 
              borderColor: `${strokeColor}30`, 
              color: strokeColor, 
              backgroundColor: `${strokeColor}10` 
            }}
          >
            {strokeLabel}
          </span>
        </div>

        {/* Large Volume Display */}
        <div className="my-5">
          <div className="flex items-baseline gap-1">
            <span className="text-5xl font-extrabold font-mono text-white tracking-tighter">
              {session.distance.toLocaleString()}
            </span>
            <span className="text-sm font-bold text-gray-500 tracking-wider uppercase">meters</span>
          </div>
          <p className="text-xs text-gray-400 mt-1 flex items-center gap-1.5">
            <Goal className="w-3.5 h-3.5 text-brand-cyan" />
            Completed in {session.lapCount} laps ({session.poolLength}m pool)
          </p>
        </div>

        {/* Core Metrics Grid */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="p-3 bg-white/5 border border-white/5 rounded-2xl flex flex-col">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1">
              <Timer className="w-3 h-3 text-brand-cyan" />
              Duration
            </span>
            <span className="text-lg font-bold font-mono text-white">
              {formatShortDuration(session.duration)}
            </span>
          </div>

          <div className="p-3 bg-white/5 border border-white/5 rounded-2xl flex flex-col">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1">
              <Waves className="w-3 h-3 text-brand-indigo" />
              Pace
            </span>
            <span className="text-lg font-bold font-mono text-white">
              {formatPace(session.pace).split('/')[0]}
            </span>
          </div>

          <div className="p-3 bg-white/5 border border-white/5 rounded-2xl flex flex-col">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1">
              <Goal className="w-3 h-3 text-brand-emerald" />
              SWOLF Efficiency
            </span>
            <span className="text-lg font-bold font-mono text-white">
              {session.swolf}
            </span>
          </div>

          <div className="p-3 bg-white/5 border border-white/5 rounded-2xl flex flex-col">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1">
              <Heart className="w-3 h-3 text-brand-rose" />
              Avg Heart Rate
            </span>
            <span className="text-lg font-bold font-mono text-white flex items-baseline gap-1">
              {session.avgHeartRate} <span className="text-[10px] font-semibold text-gray-500">BPM</span>
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs">
        <span className="text-gray-500 flex items-center gap-1">
          <Zap className="w-3.5 h-3.5 text-brand-amber" />
          {session.calories} kcal burned
        </span>
        <span className="text-brand-cyan font-bold hover:underline cursor-pointer">
          Detailed Analysis →
        </span>
      </div>
    </motion.div>
  );
}
