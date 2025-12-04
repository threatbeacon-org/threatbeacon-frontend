"use client";

/**
 * Navbar Component
 * Top navigation bar for the dashboard
 */

import React from 'react';
import Link from 'next/link';
import { clearCredentials, isAuthenticated } from '@/lib/api/client';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';

export default function Navbar() {
  const router = useRouter();
  const authenticated = isAuthenticated();

  const handleLogout = () => {
    clearCredentials();
    router.push('/login');
  };

  return (
    <nav className="bg-slate-900 border-b border-slate-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/overview" className="flex items-center gap-2">
            <span className="text-2xl">🛡️</span>
            <span className="text-xl font-bold text-white">ThreatBeacon</span>
          </Link>
        </div>

        {authenticated && (
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
