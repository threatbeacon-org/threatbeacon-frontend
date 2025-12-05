"use client";

/**
 * NotificationAlarm Component
 * Visual and audio alarm for critical risk status
 * Provides browser notification API integration with dismiss button
 */

import React, { useEffect, useState } from 'react';
import { useRiskStatus } from '@/hooks/useRiskStatus';

export default function NotificationAlarm() {
  const { riskStatus } = useRiskStatus();
  const [hasNotificationPermission, setHasNotificationPermission] = useState(false);
  const [lastNotifiedLevel, setLastNotifiedLevel] = useState<string | null>(null);
  const [isDismissed, setIsDismissed] = useState(false);

  // Request notification permission on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      if (Notification.permission === 'default') {
        Notification.requestPermission().then((permission) => {
          setHasNotificationPermission(permission === 'granted');
        });
      } else {
        setHasNotificationPermission(Notification.permission === 'granted');
      }
    }
  }, []);

  // Reset dismissed state when risk level changes
  useEffect(() => {
    if (riskStatus && lastNotifiedLevel !== riskStatus.level) {
      setIsDismissed(false);
      setLastNotifiedLevel(riskStatus.level);
    }
  }, [riskStatus, lastNotifiedLevel]);

  // Trigger alarm when risk level changes to CRITICAL
  useEffect(() => {
    if (!riskStatus || isDismissed) return;

    const isCritical = riskStatus.level === 'CRITICAL';
    const levelChanged = lastNotifiedLevel !== riskStatus.level;

    if (isCritical && levelChanged && !riskStatus.buzzerMuted) {
      // Browser notification
      if (hasNotificationPermission) {
        new Notification('🚨 CRITICAL THREAT DETECTED', {
          body: 'Immediate attention required. Threat level is CRITICAL.',
          icon: '/favicon.ico',
          tag: 'critical-threat',
          requireInteraction: true,
        });
      }
    }
  }, [riskStatus, hasNotificationPermission, lastNotifiedLevel, isDismissed]);

  const handleDismiss = () => {
    setIsDismissed(true);
  };

  // Render visual alarm indicator
  if (riskStatus?.level === 'CRITICAL' && !riskStatus.buzzerMuted && !isDismissed) {
    return (
      <div className="fixed top-2 left-2 right-2 sm:top-4 sm:left-auto sm:right-4 z-50 animate-bounce max-w-[calc(100%-1rem)] sm:max-w-sm md:max-w-md">
        <div className="bg-red-600 text-white px-2.5 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg shadow-2xl border-2 border-red-400 flex items-center gap-2 sm:gap-3">
          <span className="text-lg sm:text-xl md:text-2xl animate-pulse flex-shrink-0">🚨</span>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-xs sm:text-sm md:text-lg truncate">CRITICAL ALERT</p>
            <p className="text-[10px] sm:text-xs md:text-sm truncate">Immediate action required</p>
          </div>
          <button
            onClick={handleDismiss}
            className="ml-1 sm:ml-2 md:ml-4 text-white hover:text-red-200 transition-colors text-base sm:text-lg md:text-xl font-bold flex-shrink-0"
            aria-label="Dismiss alert"
          >
            ×
          </button>
        </div>
      </div>
    );
  }

  return null;
}
