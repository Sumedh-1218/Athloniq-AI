'use client';

import React from 'react';
import { AIScores } from '@/types';
import { Sparkles, Bot, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface AISummaryCardProps {
  scores: AIScores;
}

export default function AISummaryCard({ scores }: AISummaryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="relative rounded-3xl p-[1px] bg-gradient-to-tr from-brand-cyan/40 via-brand-indigo/20 to-transparent shadow-glow-cyan overflow-hidden"
    >
      <div className="bg-[#0F1626]/95 backdrop-blur-xl p-6 rounded-[23px] flex flex-col justify-between h-full">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-cyan to-brand-indigo text-white flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white tracking-tight">AI Coach Daily Intelligence</h3>
                <span className="text-[9px] uppercase tracking-wider font-extrabold text-brand-cyan">Synthesized Analysis</span>
              </div>
            </div>
            <Bot className="w-5 h-5 text-gray-500" />
          </div>

          {/* AI Recommendation text */}
          <p className="text-xs text-gray-300 leading-relaxed font-medium">
            {"\""}{scores.aiInsight}{"\""}
          </p>
        </div>

        {/* Action Link */}
        <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
          <span className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">
            Recommendations update dynamically
          </span>
          <Link href="/ai-coach" className="inline-flex items-center gap-1 text-xs font-bold text-brand-cyan hover:underline cursor-pointer group">
            Consult Coach
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
