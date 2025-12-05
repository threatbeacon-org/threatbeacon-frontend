"use client";

/**
 * Dashboard Layout
 * Common layout for all dashboard routes with authentication check
 */

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { isAuthenticated } from '@/lib/api/client';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Only check authentication on client side
    const checkAuth = () => {
      const authenticated = isAuthenticated();
      setIsAuth(authenticated);
      setIsCheckingAuth(false);

      if (!authenticated && pathname !== '/login') {
        router.push('/login');
      }
    };

    checkAuth();
  }, [router, pathname]);

  // Close sidebar when route changes on mobile
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  // Show loading state while checking auth (prevents hydration mismatch)
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-slate-400">Loading...</div>
      </div>
    );
  }

  // If not authenticated, show redirect message (will redirect via useEffect)
  if (!isAuth) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-slate-400">Redirecting to login...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Sidebar - Hidden on mobile, shown on desktop */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="fixed left-0 top-0 bottom-0 z-50 lg:hidden">
            <Sidebar onClose={() => setSidebarOpen(false)} />
          </div>
        </>
      )}

      <div className="flex-1 flex flex-col min-w-0 w-full lg:w-auto">
        <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 p-3 sm:p-4 md:p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
