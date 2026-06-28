'use client';

import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TrendBadgeProps {
  value: number | string;
  type: 'up' | 'down' | 'neutral';
  className?: string;
}

export default function TrendBadge({ value, type, className }: TrendBadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold select-none",
        type === 'up' && "bg-brand-emerald/10 text-brand-emerald border border-brand-emerald/20",
        type === 'down' && "bg-brand-rose/10 text-brand-rose border border-brand-rose/20",
        type === 'neutral' && "bg-white/5 text-gray-400 border border-white/5",
        className
      )}
    >
      {type === 'up' && <ArrowUpRight className="w-3.5 h-3.5" />}
      {type === 'down' && <ArrowDownRight className="w-3.5 h-3.5" />}
      {type === 'neutral' && <Minus className="w-3.5 h-3.5" />}
      <span>{value}</span>
    </div>
  );
}
