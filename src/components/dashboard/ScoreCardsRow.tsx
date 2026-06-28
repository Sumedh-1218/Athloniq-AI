'use client';

import React from 'react';
import { AIScores } from '@/types';
import ScoreRing from '../common/ScoreRing';
import { motion } from 'framer-motion';

interface ScoreCardsRowProps {
  scores: AIScores;
}

export default function ScoreCardsRow({ scores }: ScoreCardsRowProps) {
  const scoreItems = [
    {
      id: 'recovery',
      score: scores.recoveryScore,
      label: 'Recovery Score',
      description: 'Based on HRV, Resting HR, and sleep/rest balance.',
    },
    {
      id: 'readiness',
      score: scores.trainingReadiness,
      label: 'Training Readiness',
      description: 'Your physical capacity to handle training load today.',
    },
    {
      id: 'fatigue',
      score: scores.fatigueScore,
      label: 'Fatigue Index',
      description: 'Accumulated strain vs. recovery rate.',
    },
    {
      id: 'performance',
      score: scores.performanceScore,
      label: 'Performance Score',
      description: 'Efficiency, Swolf, and pace trends combined.',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {scoreItems.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          className="glass-panel p-6 rounded-3xl flex flex-col items-center justify-center relative overflow-hidden"
        >
          <ScoreRing score={item.score} label={item.label} size={130} strokeWidth={9} />
          <p className="text-[10px] text-gray-500 text-center mt-3 max-w-[200px] leading-relaxed">
            {item.description}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
