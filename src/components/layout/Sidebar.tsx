"use client";

/**
 * Sidebar Component
 * Navigation sidebar matching the design image
 */

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clearCredentials } from '@/lib/api/client';
import { useRouter } from 'next/navigation';

interface NavItem {
  href: string;
  label: string;
  icon: string;
}

interface SidebarProps {
  onClose?: () => void;
}

const navItems: NavItem[] = [
  { href: '/overview', label: 'Overview', icon: '📊' },
  { href: '/incidents', label: 'Incidents', icon: '⚠️' },
  { href: '/live-feed', label: 'Live Feed', icon: '📡' },
  { href: '/beacons', label: 'Beacons', icon: '🔴' },
  { href: '/config', label: 'Config', icon: '⚙️' },
];

export default function Sidebar({ onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    clearCredentials();
    router.push('/login');
  };

  return (
    <aside className="fixed w-full w-56 sm:w-64 bg-slate-900 border-r border-slate-700 min-h-screen flex flex-col z-50">
      {/* Logo Section */}
      <div className="p-3 sm:p-4 md:p-6 border-b border-slate-700 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-lg sm:text-xl text-cyan-400">🛡️</span>
          </div>
          <div className="min-w-0">
            <h1 className="text-sm sm:text-base font-bold text-white truncate">ThreatBeacon</h1>
            <p className="text-[10px] sm:text-xs text-slate-400">SOC Dashboard</p>
          </div>
        </div>
        {/* Close button for mobile */}
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden text-slate-400 hover:text-white text-xl sm:text-2xl flex-shrink-0 ml-2"
            aria-label="Close menu"
          >
            ×
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 sm:p-3 md:p-4 overflow-y-auto">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname?.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={`
                    flex items-center gap-2 sm:gap-3 px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 rounded-lg
                    transition-all duration-200
                    ${
                      isActive
                        ? 'bg-cyan-500/20 text-cyan-400 border-l-2 border-cyan-500'
                        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                    }
                  `}
                >
                  <span className="text-base sm:text-lg flex-shrink-0">{item.icon}</span>
                  <span className="font-medium text-xs sm:text-sm truncate">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* System Status */}
      <div className="p-2 sm:p-3 md:p-4 border-t border-slate-700">
        <div className="bg-slate-800/50 rounded-lg p-2 sm:p-2.5 md:p-3 border border-slate-700">
          <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse flex-shrink-0"></div>
            <span className="text-[10px] sm:text-xs font-medium text-slate-300">System Status</span>
          </div>
          <p className="text-[10px] sm:text-xs text-slate-400">All systems operational</p>
        </div>
      </div>

      {/* Logout Button */}
      <div className="p-2 sm:p-3 md:p-4 border-t border-slate-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-between px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
        >
          <span className="font-medium text-xs sm:text-sm">Logout</span>
          <span className="text-sm sm:text-base">→</span>
        </button>
      </div>
    </aside>
  );
}
