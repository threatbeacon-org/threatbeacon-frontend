"use client";

/**
 * MuteBuzzerButton Component
 * Allows users to mute the buzzer when risk level is not NORMAL
 */

import React, { useState } from 'react';
import { muteBuzzer } from '@/services/riskService';
import { useRiskStatus } from '@/hooks/useRiskStatus';
import Button from '@/components/ui/Button';

export default function MuteBuzzerButton() {
  const { riskStatus, refresh } = useRiskStatus();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!riskStatus || riskStatus.level === 'NORMAL') {
    return null;
  }

  if (riskStatus.buzzerMuted) {
    return (
      <div className="flex items-center gap-2 text-orange-400">
        <span>🔇</span>
        <span className="text-sm font-medium">Buzzer is muted</span>
      </div>
    );
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
    <div className="flex flex-col gap-2">
      <Button
        variant="warning"
        onClick={handleMute}
        isLoading={isLoading}
        disabled={isLoading}
      >
        🔇 Mute Buzzer
      </Button>
      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}
    </div>
  );
}

