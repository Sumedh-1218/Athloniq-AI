'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Activity, 
  HeartPulse, 
  Bot, 
  Cpu, 
  History, 
  FileText, 
  Settings, 
  ShieldAlert,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Waves
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { NAV_ITEMS, ADMIN_NAV_ITEMS } from '@/lib/constants';

const IconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard,
  Activity,
  HeartPulse,
  Bot,
  Cpu,
  History,
  FileText,
  Settings,
  ShieldAlert,
};

interface SidebarProps {
  isAdmin?: boolean;
}

export default function Sidebar({ isAdmin = false }: SidebarProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const items = isAdmin ? ADMIN_NAV_ITEMS : NAV_ITEMS;

  return (
    <motion.aside
      animate={{ width: isCollapsed ? 76 : 260 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="hidden md:flex flex-col h-screen sticky top-0 left-0 bg-[#0B0F19]/80 backdrop-blur-xl border-r border-white/5 text-gray-400 select-none z-30"
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-6 border-b border-white/5 overflow-hidden">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-indigo to-brand-cyan shadow-glow-cyan text-white">
            <Waves className="w-5 h-5 animate-pulse-slow" />
          </div>
          {!isCollapsed && (
            <motion.span 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-blue-50 to-brand-cyan bg-clip-text text-transparent"
            >
              Athloniq<span className="text-brand-cyan font-light">AI</span>
            </motion.span>
          )}
        </Link>
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-[#162035] hover:bg-brand-cyan hover:text-white border border-white/10 flex items-center justify-center text-gray-400 cursor-pointer shadow-lg transition-colors duration-200"
      >
        {isCollapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
      </button>

      {/* Navigation Items */}
      <nav className="flex-1 py-6 px-3 space-y-1.5 overflow-y-auto">
        {items.map((item) => {
          const Icon = IconMap[item.iconName] || LayoutDashboard;
          const isActive = pathname.startsWith(item.href);
          
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  "relative flex items-center gap-3 px-3 py-3 rounded-xl font-medium text-sm transition-all duration-200 group cursor-pointer",
                  isActive 
                    ? "text-white bg-gradient-to-r from-brand-cyan/15 to-brand-indigo/5 border-l-2 border-brand-cyan" 
                    : "hover:text-white hover:bg-white/5 border-l-2 border-transparent"
                )}
              >
                <Icon className={cn(
                  "w-5 h-5 flex-shrink-0 transition-transform duration-200 group-hover:scale-105",
                  isActive ? "text-brand-cyan" : "text-gray-400 group-hover:text-white"
                )} />
                
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="truncate"
                  >
                    {item.label}
                  </motion.span>
                )}

                {/* Glass glow background effect for active items */}
                {isActive && (
                  <div className="absolute inset-0 rounded-xl bg-brand-cyan/5 -z-10 pointer-events-none blur-sm" />
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Footer Profile & Logout */}
      <div className="p-4 border-t border-white/5 flex flex-col gap-3">
        <div className={cn(
          "flex items-center gap-3 rounded-xl p-2 transition-all duration-200",
          !isCollapsed && "bg-white/5 border border-white/5"
        )}>
          <div className="relative w-8 h-8 rounded-full bg-brand-indigo/20 border border-brand-indigo/30 flex items-center justify-center text-brand-cyan font-bold text-sm">
            AM
            <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-brand-emerald border border-[#0B0F19]" />
          </div>
          {!isCollapsed && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-1 overflow-hidden"
            >
              <h4 className="text-sm font-semibold text-white truncate">Alex Mercer</h4>
              <p className="text-xs text-gray-500 truncate">Pro Athlete</p>
            </motion.div>
          )}
        </div>

        <button 
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:text-brand-rose hover:bg-brand-rose/10 transition-all duration-200 cursor-pointer w-full text-left",
            isCollapsed && "justify-center"
          )}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && <span>Log Out</span>}
        </button>
      </div>
    </motion.aside>
  );
}
