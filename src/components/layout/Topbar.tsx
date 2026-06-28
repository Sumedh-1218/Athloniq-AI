'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Bell, Bluetooth, Battery, Search, Menu } from 'lucide-react';
import { mockDevice } from '@/lib/mock-data';

interface TopbarProps {
  onMenuClick?: () => void;
}

const PAGE_TITLES: Record<string, string> = {
  '/dashboard': 'Athlete Dashboard',
  '/performance': 'Performance Analytics',
  '/recovery': 'Recovery & Biometrics',
  '/ai-coach': 'AI Coach Intelligence',
  '/devices': 'Device Configuration',
  '/history': 'Workout History',
  '/reports': 'Performance Reports',
  '/settings': 'System Settings',
  '/admin': 'Admin Dashboard',
};

export default function Topbar({ onMenuClick }: TopbarProps) {
  const pathname = usePathname();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "AI Coach: Performance score increased 4% this week!", time: "10m ago", read: false },
    { id: 2, text: "Device synced successfully. 3,200m freestyle logged.", time: "1h ago", read: true },
    { id: 3, text: "HRV baseline updated. Readiness threshold optimal.", time: "1d ago", read: true },
  ]);

  // Determine title based on path
  const matchedPath = Object.keys(PAGE_TITLES).find(key => pathname.startsWith(key));
  const pageTitle = matchedPath ? PAGE_TITLES[matchedPath] : 'Dashboard';

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <header className="h-16 border-b border-white/5 bg-[#080C16]/60 backdrop-blur-xl px-4 md:px-8 flex items-center justify-between sticky top-0 z-20 w-full select-none">
      <div className="flex items-center gap-4">
        {/* Mobile menu trigger */}
        <button 
          onClick={onMenuClick}
          className="md:hidden text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/5 cursor-pointer"
        >
          <Menu className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-lg md:text-xl font-bold text-white tracking-tight">{pageTitle}</h1>
        </div>
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        {/* Search Bar - Hidden on small mobile */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/5 w-64 focus-within:border-brand-cyan/40 transition-colors duration-200">
          <Search className="w-4 h-4 text-gray-500" />
          <input 
            type="text" 
            placeholder="Search workouts or logs..." 
            className="bg-transparent text-xs text-white placeholder-gray-500 focus:outline-none w-full"
          />
        </div>

        {/* Wearable Connection Health Badge */}
        <div className="hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-full bg-[#0F1626]/80 border border-white/5 text-xs text-gray-300">
          <div className="flex items-center gap-1.5 border-r border-white/10 pr-2.5">
            <Bluetooth className="w-3.5 h-3.5 text-brand-cyan animate-pulse" />
            <span className="font-semibold text-[10px] tracking-wider uppercase text-brand-cyan">Connected</span>
          </div>
          <div className="flex items-center gap-1">
            <Battery className="w-4 h-4 text-brand-emerald" />
            <span className="font-mono text-white">{mockDevice.batteryStatus}%</span>
          </div>
        </div>

        {/* Notifications Popover */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 text-gray-300 hover:text-white cursor-pointer transition-all duration-200"
          >
            <Bell className="w-4.5 h-4.5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-brand-rose animate-pulse" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 rounded-2xl bg-[#0F1626] border border-white/10 p-4 shadow-xl z-50">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/5">
                <span className="text-xs font-bold text-white uppercase tracking-wider">Notifications</span>
                {unreadCount > 0 && (
                  <button 
                    onClick={markAllAsRead}
                    className="text-[10px] text-brand-cyan hover:underline cursor-pointer"
                  >
                    Mark all read
                  </button>
                )}
              </div>
              <div className="space-y-2.5 max-h-60 overflow-y-auto">
                {notifications.map(n => (
                  <div 
                    key={n.id} 
                    className={`p-2.5 rounded-lg border transition-colors ${
                      n.read ? 'bg-transparent border-transparent' : 'bg-brand-cyan/5 border-brand-cyan/15'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs text-gray-200 leading-normal">{n.text}</p>
                      {!n.read && <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan mt-1 flex-shrink-0" />}
                    </div>
                    <span className="text-[10px] text-gray-500 mt-1 block">{n.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Quick User Profile */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-brand-cyan/20 border border-brand-cyan/30 flex items-center justify-center text-brand-cyan font-bold text-xs">
            AM
          </div>
        </div>
      </div>
    </header>
  );
}
