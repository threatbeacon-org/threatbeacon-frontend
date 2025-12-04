"use client";

/**
 * NotificationAlarm Component
 * Visual and audio alarm for critical risk status
 * Provides browser notification API integration
 */

import React, { useEffect, useState } from 'react';
import { useRiskStatus } from '@/hooks/useRiskStatus';

export default function NotificationAlarm() {
  const { riskStatus } = useRiskStatus();
  const [hasNotificationPermission, setHasNotificationPermission] = useState(false);
  const [lastNotifiedLevel, setLastNotifiedLevel] = useState<string | null>(null);

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

  // Trigger alarm when risk level changes to CRITICAL
  useEffect(() => {
    if (!riskStatus) return;

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

      // Visual alarm indicator
      setLastNotifiedLevel(riskStatus.level);
    } else if (riskStatus.level !== 'CRITICAL') {
      setLastNotifiedLevel(riskStatus.level);
    }
  }, [riskStatus, hasNotificationPermission, lastNotifiedLevel]);

  // Render visual alarm indicator
  if (riskStatus?.level === 'CRITICAL' && !riskStatus.buzzerMuted) {
    return (
      <div className="fixed top-4 right-4 z-50 animate-bounce">
        <div className="bg-red-600 text-white px-6 py-3 rounded-lg shadow-2xl border-2 border-red-400 flex items-center gap-3">
          <span className="text-2xl animate-pulse">🚨</span>
          <div>
            <p className="font-bold text-lg">CRITICAL ALERT</p>
            <p className="text-sm">Immediate action required</p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

