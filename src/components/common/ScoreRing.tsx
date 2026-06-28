'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getScoreLevel } from '@/lib/constants';

interface ScoreRingProps {
  score: number;
  label: string;
  size?: number;
  strokeWidth?: number;
}

export default function ScoreRing({ 
  score, 
  label, 
  size = 120, 
  strokeWidth = 10 
}: ScoreRingProps) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  
  // Scoring colors and details
  const level = getScoreLevel(score);

  useEffect(() => {
    // Basic counter animation
    let start = 0;
    const end = score;
    if (start === end) return;
    
    const totalDuration = 1000; // 1s
    const incrementTime = Math.abs(Math.floor(totalDuration / end));
    
    const timer = setInterval(() => {
      start += 1;
      setAnimatedScore(start);
      if (start >= end) {
        clearInterval(timer);
      }
    }, incrementTime);
    
    return () => clearInterval(timer);
  }, [score]);

  // Stroke animated values
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center select-none text-center">
      <div className="relative" style={{ width: size, height: size }}>
        {/* Outer subtle glow matching level color */}
        <div 
          className="absolute inset-0 rounded-full blur-xl opacity-20 transition-all duration-1000"
          style={{ backgroundColor: level.stroke }}
        />

        {/* SVG Circle drawing */}
        <svg width={size} height={size} className="transform -rotate-90 relative z-10">
          {/* Background Ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            className="stroke-white/5 fill-transparent"
            strokeWidth={strokeWidth}
          />
          {/* Active Ring with Gradient/Stroke */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            className="fill-transparent transition-all duration-1000 ease-out"
            stroke={level.stroke}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            strokeLinecap="round"
          />
        </svg>

        {/* Center Text (Score & Status) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-15">
          <span className="text-3xl font-extrabold font-mono text-white tracking-tighter">
            {animatedScore}
          </span>
          <span className="text-[10px] uppercase font-bold tracking-widest mt-0.5" style={{ color: level.stroke }}>
            {level.label}
          </span>
        </div>
      </div>
      <span className="text-sm font-semibold text-gray-300 mt-3">{label}</span>
    </div>
  );
}
