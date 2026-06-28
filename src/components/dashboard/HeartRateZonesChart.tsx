'use client';

import React from 'react';
import { SwimmingSession } from '@/types';
import { getHeartRateZones } from '@/lib/mock-data';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface HeartRateZonesChartProps {
  session: SwimmingSession;
}

export default function HeartRateZonesChart({ session }: HeartRateZonesChartProps) {
  const zones = getHeartRateZones(session);
  const totalPercentage = zones.reduce((sum, zone) => sum + zone.value, 0);

  return (
    <div className="glass-panel p-6 rounded-3xl w-full select-none flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              <Heart className="w-4 h-4 text-brand-rose" />
              Heart Rate Intensity Zones
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">Based on max HR of {session.maxHeartRate} BPM</p>
          </div>
        </div>

        {/* Stacked Percentage Bar */}
        <div className="h-4 rounded-full bg-white/5 overflow-hidden flex mb-6">
          {zones.map((zone, idx) => {
            const widthPct = `${(zone.value / totalPercentage) * 100}%`;
            return (
              <motion.div
                key={zone.name}
                initial={{ width: 0 }}
                animate={{ width: widthPct }}
                transition={{ duration: 0.8, delay: idx * 0.1, ease: 'easeOut' }}
                style={{ backgroundColor: zone.color }}
                className="h-full relative group cursor-pointer"
                title={`${zone.name}: ${zone.value}%`}
              />
            );
          })}
        </div>

        {/* Individual Zone Metrics */}
        <div className="space-y-3.5">
          {zones.map((zone, idx) => {
            const pct = Math.round((zone.value / totalPercentage) * 100);
            return (
              <motion.div
                key={zone.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="flex items-center justify-between"
              >
                <div className="flex items-start gap-2.5">
                  <span 
                    className="w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0"
                    style={{ backgroundColor: zone.color }}
                  />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-white">{zone.name}</span>
                    <span className="text-[10px] text-gray-500 font-semibold uppercase">
                      {zone.minHr}-{zone.maxHr} BPM
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium text-gray-400 font-mono">
                    {pct}%
                  </span>
                  <div className="w-16 h-1.5 rounded-full bg-white/5 overflow-hidden hidden sm:block">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.6, delay: 0.3 + idx * 0.05 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: zone.color }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
