"use client";

/**
 * RiskHero Component
 * Prominent visual indicator for global risk status
 * Displays risk level with color-coded styling
 */

import React from 'react';
import { useRiskStatus } from '@/hooks/useRiskStatus';
import type { RiskLevel } from '@/lib/api/types';
import Badge from '@/components/ui/Badge';

function getRiskLevelConfig(level: RiskLevel) {
  switch (level) {
    case 'NORMAL':
      return {
        color: 'bg-green-600',
        textColor: 'text-green-400',
        bgGlow: 'bg-green-600/20',
        label: 'NORMAL',
        description: 'All systems operating normally',
      };
    case 'SUSPICIOUS':
      return {
        color: 'bg-orange-600',
        textColor: 'text-orange-400',
        bgGlow: 'bg-orange-600/20',
        label: 'SUSPICIOUS',
        description: 'Unusual activity detected',
      };
    case 'CRITICAL':
      return {
        color: 'bg-red-600',
        textColor: 'text-red-400',
        bgGlow: 'bg-red-600/20',
        label: 'CRITICAL',
        description: 'Immediate attention required',
      };
    default:
      return {
        color: 'bg-slate-600',
        textColor: 'text-slate-400',
        bgGlow: 'bg-slate-600/20',
        label: 'UNKNOWN',
        description: 'Status unknown',
      };
  }
}

export default function RiskHero() {
  const { riskStatus, isLoading, isError } = useRiskStatus();

  if (isLoading) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 animate-pulse">
        <div className="h-8 bg-slate-700 rounded w-48 mb-4"></div>
        <div className="h-4 bg-slate-700 rounded w-64"></div>
      </div>
    );
  }

  if (isError || !riskStatus) {
    return (
      <div className="bg-slate-800 border border-red-700 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-red-400 mb-2">Error Loading Risk Status</h2>
        <p className="text-slate-400">Unable to fetch current risk level</p>
      </div>
    );
  }

  const config = getRiskLevelConfig(riskStatus.level);

  return (
    <div
      className={`
        relative overflow-hidden rounded-lg p-8 border-2
        ${config.bgGlow} border-slate-700
        transition-all duration-500
      `}
    >
      {/* Animated background glow for critical status */}
      {riskStatus.level === 'CRITICAL' && (
        <div className="absolute inset-0 bg-red-600/10 animate-pulse"></div>
      )}

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-2">
              Global Risk Status
            </h2>
            <div className="flex items-center gap-4">
              <div
                className={`
                  w-16 h-16 rounded-full ${config.color}
                  shadow-lg ${riskStatus.level === 'CRITICAL' ? 'animate-pulse' : ''}
                `}
              ></div>
              <div>
                <h1 className={`text-4xl font-bold ${config.textColor} mb-1`}>
                  {config.label}
                </h1>
                <p className="text-slate-400 text-sm">{config.description}</p>
              </div>
            </div>
          </div>

          {riskStatus.buzzerMuted && (
            <Badge variant="warning" size="md">
              🔇 Buzzer Muted
            </Badge>
          )}
        </div>

        <div className="mt-4 pt-4 border-t border-slate-700">
          <p className="text-xs text-slate-500 font-mono">
            Last updated: {new Date(riskStatus.lastUpdated).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
