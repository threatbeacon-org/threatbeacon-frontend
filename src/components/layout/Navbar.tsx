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
    <nav className="bg-slate-900 border-b border-slate-700 px-2 sm:px-4 md:px-6 py-2 sm:py-3">
      <div className="flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-8">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden text-slate-400 hover:text-white p-1.5 sm:p-2 flex-shrink-0"
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Center - Search */}
        <div className="flex-1 min-w-0 max-w-md lg:max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search incidents, IPs, events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
            <span className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm sm:text-base">
              🔍
            </span>
          </div>
        </div>

        {/* Right side - Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 md:gap-4 flex-shrink-0">
          <div className="hidden sm:flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 bg-green-500/20 border border-green-500/50 rounded-full">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] sm:text-xs font-medium text-green-400">LIVE</span>
          </div>
          <button className="relative text-slate-400 hover:text-white transition-colors p-1 sm:p-1.5 md:p-0">
            <span className="text-base sm:text-lg md:text-xl">🔔</span>
            <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 bg-red-500 rounded-full flex items-center justify-center text-[9px] sm:text-[10px] md:text-xs font-bold text-white">
              3
            </span>
          </button>
          <button className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-slate-700 rounded-full flex items-center justify-center text-slate-300 hover:bg-slate-600 transition-colors text-xs sm:text-sm md:text-base flex-shrink-0">
            👤
          </button>
        </div>
      </div>
    </nav>
  );
}
