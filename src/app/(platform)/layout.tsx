'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Topbar from '@/components/layout/Topbar';
import MobileNav from '@/components/layout/MobileNav';

interface PlatformLayoutProps {
  children: React.ReactNode;
}

export default function PlatformLayout({ children }: PlatformLayoutProps) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#080C16] text-[#F3F4F6] overflow-hidden bg-grid-pattern">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main Content Pane */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative pb-16 md:pb-0">
        {/* Topbar */}
        <Topbar onMenuClick={() => setIsMobileSidebarOpen(true)} />

        {/* Scrollable Page Body */}
        <main className="flex-1 overflow-y-auto px-4 md:px-8 py-6 md:py-8 focus:outline-none">
          {children}
        </main>

        {/* Mobile Navigation bar */}
        <MobileNav />
      </div>

      {/* Mobile Drawer Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div 
            onClick={() => setIsMobileSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />
          {/* Sidebar Drawer */}
          <div className="relative flex flex-col w-64 max-w-xs bg-[#0B0F19] border-r border-white/5 h-full">
            <Sidebar />
          </div>
        </div>
      )}
    </div>
  );
}
