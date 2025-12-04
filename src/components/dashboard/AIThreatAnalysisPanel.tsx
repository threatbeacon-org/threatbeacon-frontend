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
    <Card className="h-fit">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🧠</span>
          <h3 className="text-lg font-semibold text-white">AI Threat Analysis</h3>
        </div>
        <Badge variant="info" size="sm">
          GPT-4
        </Badge>
      </div>

      {/* Incident ID */}
      <div className="mb-4">
        <p className="text-sm text-slate-400 font-technical">
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
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-400">Analysis Confidence</span>
              <span className="text-xs font-technical text-cyan-400">
                {insight.confidence || 94}%
              </span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div
                className="bg-cyan-500 h-2 rounded-full transition-all"
                style={{ width: `${insight.confidence || 94}%` }}
              ></div>
            </div>
          </div>

          {/* Threat Summary */}
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <span className="text-orange-400 mt-1 text-lg">⚠️</span>
              <div>
                <h4 className="text-sm font-semibold text-white mb-1 uppercase">THREAT SUMMARY</h4>
                <p className="text-sm text-slate-300 leading-relaxed">
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
