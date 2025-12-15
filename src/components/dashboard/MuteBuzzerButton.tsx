"use client";

/**
 * MuteBuzzerButton Component
 * Allows users to mute the buzzer when risk level is not NORMAL
 */

import React, { useState } from 'react';
import { muteBuzzer, stopBuzzer } from '@/services/riskService';
import { useRiskStatus } from '@/hooks/useRiskStatus';

export default function MuteBuzzerButton() {
  const { riskStatus, refresh } = useRiskStatus();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!riskStatus || riskStatus.level === 'NORMAL') {
    return null;
  }

  const handleMute = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await muteBuzzer();
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to mute buzzer');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
      <button
        onClick={handleMute}
        disabled={isLoading || riskStatus.buzzerMuted}
        className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium text-xs sm:text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="text-sm sm:text-base">🔇</span>
        <span className="whitespace-nowrap">
          {riskStatus.buzzerMuted ? 'BUZZER MUTED' : 'MUTE BUZZER'}</span>
      </button>
    </div>
  );
}

