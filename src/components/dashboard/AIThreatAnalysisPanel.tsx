"use client";

/**
 * AI Threat Analysis Panel
 * Right-side panel matching the design image exactly
 */

import React from 'react';
import { useIncidents } from '@/hooks/useIncidents';
import { useIncidentInsight } from '@/hooks/useIncidentInsight';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

function formatIncidentId(id: number): string {
  return `#INC-${String(id).padStart(3, '0')}`;
}

export default function AIThreatAnalysisPanel() {
  const { incidents } = useIncidents();
  const firstIncidentId = incidents.length > 0 ? incidents[0].id : null;
  const { insight, isLoading, isError } = useIncidentInsight(firstIncidentId);

  if (!firstIncidentId) {
    return (
      <Card className="h-fit">
        <div className="text-center py-8">
          <div className="text-4xl mb-4">🧠</div>
          <h3 className="text-lg font-semibold text-white mb-2">AI Threat Analysis</h3>
          <p className="text-sm text-slate-400">Select an incident to view AI insights</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="h-fit w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 sm:mb-4 gap-2">
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
          <span className="text-xl sm:text-2xl flex-shrink-0">🧠</span>
          <h3 className="text-sm sm:text-base md:text-lg font-semibold text-white truncate">AI Threat Analysis</h3>
        </div>
        <Badge variant="info" size="sm" className="text-[9px] sm:text-xs flex-shrink-0">
          GPT-4
        </Badge>
      </div>

      {/* Incident ID */}
      <div className="mb-3 sm:mb-4">
        <p className="text-xs sm:text-sm text-slate-400 font-technical">
          Incident {formatIncidentId(firstIncidentId)}
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-3 animate-pulse">
          <div className="h-4 bg-slate-700 rounded w-3/4"></div>
          <div className="h-4 bg-slate-700 rounded w-full"></div>
          <div className="h-4 bg-slate-700 rounded w-5/6"></div>
        </div>
      ) : isError ? (
        <div className="text-red-400 text-sm">
          Unable to load AI insight
        </div>
      ) : insight ? (
        <>
          {/* Analysis Confidence */}
          <div className="mb-3 sm:mb-4">
            <div className="flex items-center justify-between mb-1.5 sm:mb-2">
              <span className="text-[10px] sm:text-xs text-slate-400">Analysis Confidence</span>
              <span className="text-[10px] sm:text-xs font-technical text-cyan-400">
                {insight.confidence || 94}%
              </span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-1.5 sm:h-2">
              <div
                className="bg-cyan-500 h-1.5 sm:h-2 rounded-full transition-all"
                style={{ width: `${insight.confidence || 94}%` }}
              ></div>
            </div>
          </div>

          {/* Threat Summary */}
          <div className="space-y-2 sm:space-y-3">
            <div className="flex items-start gap-1.5 sm:gap-2">
              <span className="text-orange-400 mt-0.5 sm:mt-1 text-base sm:text-lg flex-shrink-0">⚠️</span>
              <div className="min-w-0 flex-1">
                <h4 className="text-xs sm:text-sm font-semibold text-white mb-1 uppercase">THREAT SUMMARY</h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed break-words">
                  {insight.insight || 'No threat summary available'}
                </p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="text-slate-400 text-sm">
          No AI insight available for this incident
        </div>
      )}
    </Card>
  );
}
