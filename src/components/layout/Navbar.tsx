"use client";

/**
 * Navbar Component
 * Top navigation bar with search but without Preview section
 */

import React, { useState } from 'react';

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <nav className="bg-slate-900 border-b border-slate-700 px-6 py-3">
      <div className="flex items-center justify-center gap-8">
        {/* Center - Search */}
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <input
              type="text"
              placeholder="Search incidents, IPs, events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
              🔍
            </span>
          </div>
        </div>

        {/* Right side - Controls */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <div className="flex items-center gap-2 px-3 py-1 bg-green-500/20 border border-green-500/50 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-medium text-green-400">LIVE</span>
          </div>
          <button className="relative text-slate-400 hover:text-white transition-colors">
            <span className="text-xl">🔔</span>
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
              3
            </span>
          </button>
          <button className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center text-slate-300 hover:bg-slate-600 transition-colors">
            👤
          </button>
        </div>
      </div>
    </nav>
  );
}
