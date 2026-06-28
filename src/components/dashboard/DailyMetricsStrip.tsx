'use client';

import React from 'react';
import { SwimmingSession } from '@/types';
import { Heart, Activity, Thermometer, Flame } from 'lucide-react';
import { motion } from 'framer-motion';

interface DailyMetricsStripProps {
  session: SwimmingSession;
}

export default function DailyMetricsStrip({ session }: DailyMetricsStripProps) {
  const biometrics = [
    {
      label: 'Avg Heart Rate',
      value: `${session.avgHeartRate} BPM`,
      sub: 'Z3 Aerobic Zone',
      icon: <Heart className="w-4 h-4 text-brand-rose" />,
    },
    {
      label: 'Heart Rate Variability',
      value: `${session.hrv} ms`,
      sub: 'Optimal HRV State',
      icon: <Activity className="w-4 h-4 text-brand-cyan" />,
    },
    {
      label: 'Body Temperature',
      value: `${session.avgTemperature} °C`,
      sub: 'Baseline Standard',
      icon: <Thermometer className="w-4 h-4 text-brand-amber" />,
    },
    {
      label: 'Calories Burned',
      value: `${session.calories} kcal`,
      sub: 'Training Target Met',
      icon: <Flame className="w-4 h-4 text-brand-indigo" />,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
      {biometrics.map((metric, idx) => (
        <motion.div
          key={metric.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: idx * 0.05 }}
          className="glass-panel p-4 rounded-2xl flex items-center justify-between border border-white/5"
        >
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
              {metric.label}
            </span>
            <span className="text-base font-extrabold font-mono text-white mt-1">
              {metric.value}
            </span>
            <span className="text-[9px] text-gray-400 font-semibold mt-0.5">
              {metric.sub}
            </span>
          </div>
          <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center">
            {metric.icon}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
