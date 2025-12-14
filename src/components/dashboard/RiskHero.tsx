"use client";

/**
 * RiskHero Component
 * Global Risk Level display matching the design image exactly
 */

import React from 'react';
import { useRiskStatus } from '@/hooks/useRiskStatus';
import { useIncidents } from '@/hooks/useIncidents';
import type { RiskLevel } from '@/lib/api/types';
import MuteBuzzerButton from './MuteBuzzerButton';

function getRiskLevelConfig(level: RiskLevel) {
  switch (level) {
    case 'NORMAL':
      return {
        iconBg: 'bg-green-600',
        icon: '✓',
        textColor: 'text-green-400',
        label: 'NORMAL',
      };
    case 'SUSPICIOUS':
      return {
        iconBg: 'bg-orange-600',
        icon: '⚠️',
        textColor: 'text-orange-400',
        label: 'SUSPICIOUS',
      };
    case 'CRITICAL':
      return {
        iconBg: 'bg-red-600',
        icon: '🛡️',
        textColor: 'text-red-400',
        label: 'CRITICAL THREAT',
      };
    default:
      return {
        iconBg: 'bg-slate-600',
        icon: '?',
        textColor: 'text-slate-400',
        label: 'UNKNOWN',
      };
  }
}

export default function RiskHero() {
  const { riskStatus, isLoading: isLoadingRisk, isError: isErrorRisk } = useRiskStatus();
  const { incidents, isLoading: isLoadingIncidents } = useIncidents();

  if (isLoadingRisk) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 animate-pulse">
        <div className="h-8 bg-slate-700 rounded w-48 mb-4"></div>
        <div className="h-4 bg-slate-700 rounded w-64"></div>
      </div>
    );
  }

  if (isErrorRisk || !riskStatus) {
    return (
      <div className="bg-slate-800 border border-red-700 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-red-400 mb-2">Error Loading Risk Status</h2>
        <p className="text-slate-400">Unable to fetch current risk level</p>
      </div>
    );
  }

  const config = getRiskLevelConfig(riskStatus.level);

  // Calculate statistics from incidents
  const activeCount = incidents.length;
  const criticalCount = incidents.filter((i) => i.severity === 'CRITICAL').length;
  const suspiciousCount = incidents.filter((i) => 
    i.severity === 'HIGH' || 
    i.severity === 'MEDIUM' ||
    i.type.toLowerCase().includes('suspicious')
  ).length;

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 w-full">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6 md:mb-8 lg:mb-10">
        <h2 className="text-[10px] sm:text-xs md:text-sm font-medium text-slate-400 uppercase tracking-wider">
          GLOBAL RISK LEVEL
        </h2>
        <div className="text-[9px] sm:text-xs text-slate-500 font-technical">
          LAST SYNC {new Date(riskStatus.lastUpdated).toLocaleTimeString()}
        </div>
      </div>

      {/* Main Display */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 md:gap-8 lg:gap-10">
        {/* Large Circular Icon */}
        <div
          className={`
            w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full ${config.iconBg}
            flex items-center justify-center
            flex-shrink-0
            ${riskStatus.level === 'CRITICAL' ? 'pulse-critical' : ''}
          `}
        >
          <span className="text-2xl sm:text-3xl md:text-4xl text-white">{config.icon}</span>
        </div>

        {/* Risk Level Text and Stats */}
        <div className="flex-1 w-full min-w-0">
          <h1 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold ${config.textColor} mb-3 sm:mb-4 md:mb-6 lg:mb-8 text-center sm:text-left break-words`}>
            {config.label}
          </h1>
          
          {/* Statistics Cards */}
          <div className="flex flex-wrap gap-3 sm:gap-4 md:gap-6 mb-3 sm:mb-4 md:mb-6 lg:mb-8 justify-center sm:justify-start">
            <div className="bg-slate-900/50 border border-slate-700 rounded px-3 sm:px-4 md:px-6 py-2 sm:py-3 min-w-[80px] sm:min-w-[90px] md:min-w-[100px]">
              <div className="text-lg sm:text-xl md:text-2xl font-bold text-white font-technical">
                {activeCount}
              </div>
              <div className="text-[10px] sm:text-xs text-slate-400 uppercase">ACTIVE</div>
            </div>
            <div className="bg-red-600/20 border border-red-500/30 rounded px-3 sm:px-4 md:px-6 py-2 sm:py-3 min-w-[80px] sm:min-w-[90px] md:min-w-[100px]">
              <div className="text-lg sm:text-xl md:text-2xl font-bold text-red-400 font-technical">
                {criticalCount}
              </div>
              <div className="text-[10px] sm:text-xs text-red-400 uppercase">CRITICAL</div>
            </div>
            <div className="bg-orange-600/20 border border-orange-500/30 rounded px-3 sm:px-4 md:px-6 py-2 sm:py-3 min-w-[80px] sm:min-w-[90px] md:min-w-[100px]">
              <div className="text-lg sm:text-xl md:text-2xl font-bold text-orange-400 font-technical">
                {suspiciousCount}
              </div>
              <div className="text-[10px] sm:text-xs text-orange-400 uppercase">SUSPICIOUS</div>
            </div>
          </div>

          {/* Mute Buzzer Button */}
          {riskStatus.level !== 'NORMAL' && !riskStatus.buzzerMuted && (
            <div className="flex justify-center sm:justify-start">
              <MuteBuzzerButton />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
