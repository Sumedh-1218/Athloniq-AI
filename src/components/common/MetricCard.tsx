'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
  icon?: React.ReactNode;
  trend?: {
    value: string | number;
    type: 'up' | 'down' | 'neutral';
  };
  subtext?: string;
  className?: string;
}

export default function MetricCard({
  label,
  value,
  unit,
  icon,
  trend,
  subtext,
  className,
}: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn(
        "glass-panel glass-panel-hover p-5 rounded-2xl flex flex-col justify-between relative overflow-hidden select-none",
        className
      )}
    >
      {/* Background radial accent glow */}
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-brand-cyan/5 rounded-full blur-xl pointer-events-none" />

      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-bold text-gray-400 tracking-wider uppercase">{label}</span>
        {icon && (
          <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-gray-300">
            {icon}
          </div>
        )}
      </div>

      <div className="flex items-baseline gap-1 mb-1">
        <span className="text-2xl font-extrabold font-mono text-white tracking-tight">
          {value}
        </span>
        {unit && (
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            {unit}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5">
        {trend ? (
          <div
            className={cn(
              "inline-flex items-center gap-1 text-xs font-bold",
              trend.type === 'up' && "text-brand-emerald",
              trend.type === 'down' && "text-brand-rose",
              trend.type === 'neutral' && "text-gray-400"
            )}
          >
            <span>{trend.type === 'up' ? '↑' : trend.type === 'down' ? '↓' : '•'}</span>
            <span>{trend.value}</span>
          </div>
        ) : (
          <span />
        )}
        {subtext && (
          <span className="text-[10px] text-gray-500 font-medium truncate max-w-[150px]">
            {subtext}
          </span>
        )}
      </div>
    </motion.div>
  );
}
