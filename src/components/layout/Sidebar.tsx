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

const navItems: NavItem[] = [
  { href: '/overview', label: 'Overview', icon: '📊' },
  { href: '/incidents', label: 'Incidents', icon: '⚠️' },
  { href: '/live-feed', label: 'Live Feed', icon: '📡' },
  { href: '/beacons', label: 'Beacons', icon: '🔴' },
  { href: '/config', label: 'Config', icon: '⚙️' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    clearCredentials();
    router.push('/login');
  };

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-700 min-h-screen flex flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
            <span className="text-xl text-cyan-400">🛡️</span>
          </div>
          <div>
            <h1 className="text-base font-bold text-white">ThreatBeacon</h1>
            <p className="text-xs text-slate-400">SOC Dashboard</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname?.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg
                    transition-all duration-200
                    ${
                      isActive
                        ? 'bg-cyan-500/20 text-cyan-400 border-l-2 border-cyan-500'
                        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                    }
                  `}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium text-sm">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* System Status */}
      <div className="p-4 border-t border-slate-700">
        <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-medium text-slate-300">System Status</span>
          </div>
          <p className="text-xs text-slate-400">All systems operational</p>
        </div>
      </div>

      {/* Logout Button */}
      <div className="p-4 border-t border-slate-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
        >
          <span className="font-medium text-sm">Logout</span>
          <span>→</span>
        </button>
      </div>
    </aside>
  );
}
