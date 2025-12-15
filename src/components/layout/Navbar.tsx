"use client";

/**
 * Navbar Component
 * Top navigation bar with search but without Preview section
 */

import React, { useState } from 'react';

interface NavbarProps {
  onMenuClick?: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <nav className="bg-slate-900 border-b border-slate-700 h-auto sm:h-20 px-3 sm:px-6 md:px-8 py-3 sm:py-0 flex items-center justify-between gap-3 sm:gap-4">
      <div className="flex items-center gap-3 sm:gap-4 md:gap-6 flex-1 min-w-0">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden text-slate-400 hover:text-white p-2 sm:p-2.5 flex-shrink-0 transition-colors"
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Center - Search */}
        <div className="hidden sm:flex flex-1 min-w-0 max-w-md md:max-w-lg lg:max-w-2xl">
          <div className="w-full relative">
            <input
              type="text"
              placeholder="Search incidents, IPs, events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 text-xs sm:text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
            />
            <span className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-slate-400 text-base sm:text-lg shrink-0">
              🔍
            </span>
          </div>
        </div>
      </div>

      {/* Right side - Controls */}
      <div className="flex items-center gap-2 sm:gap-3 md:gap-4 shrink-0">
        <div className="hidden sm:flex items-center gap-2 sm:gap-2.5 px-3 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-green-500/20 border border-green-500/50 rounded-full">
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse shrink-0"></div>
          <span className="text-[10px] sm:text-xs md:text-xs font-medium text-green-400 whitespace-nowrap">LIVE</span>
        </div>
        <button className="relative text-slate-400 hover:text-white transition-colors p-2 sm:p-2.5 shrink-0">
          <span className="text-lg sm:text-xl md:text-2xl">🔔</span>
          <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-red-500 rounded-full flex items-center justify-center text-[9px] sm:text-[10px] md:text-xs font-bold text-white shrink-0">
            3
          </span>
        </button>
        <button className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-slate-700 rounded-full flex items-center justify-center text-slate-300 hover:bg-slate-600 transition-colors text-base sm:text-lg md:text-xl shrink-0">
          👤
        </button>
      </div>
    </nav>
  );
}
