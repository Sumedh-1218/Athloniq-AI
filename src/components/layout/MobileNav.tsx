'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { LayoutDashboard, Activity, HeartPulse, Bot, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const MOBILE_NAV_ITEMS = [
  { label: 'Dash', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Perf', href: '/performance', icon: Activity },
  { label: 'Recov', href: '/recovery', icon: HeartPulse },
  { label: 'Coach', href: '/ai-coach', icon: Bot },
  { label: 'Config', href: '/settings', icon: Settings },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#080C16]/80 backdrop-blur-xl border-t border-white/5 px-2 pb-safe flex items-center justify-around z-30 select-none">
      {MOBILE_NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive = pathname.startsWith(item.href);

        return (
          <Link key={item.href} href={item.href} className="flex-1 py-1 flex flex-col items-center justify-center relative cursor-pointer">
            <div className={cn(
              "flex flex-col items-center justify-center w-12 h-12 rounded-2xl transition-all duration-300",
              isActive ? "text-brand-cyan" : "text-gray-500"
            )}>
              <Icon className="w-5 h-5 transition-transform duration-200" />
              <span className="text-[10px] font-semibold mt-1 tracking-wider">{item.label}</span>
              
              {isActive && (
                <motion.div 
                  layoutId="activeMobileTab"
                  className="absolute bottom-0 w-8 h-1 rounded-full bg-brand-cyan shadow-glow-cyan"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </div>
          </Link>
        );
      })}
    </nav>
  );
}
