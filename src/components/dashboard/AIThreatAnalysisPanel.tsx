"use client";

/**
 * AI Threat Analysis Panel
 * Right-side panel matching the design image exactly
 */

import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import { useIncidentInsight } from "@/hooks/useIncidentInsight";
import { useIncidents } from "@/hooks/useIncidents";
import MarkdownRenderer from "../md/MarkdownRenderer";

function formatIncidentId(id: number): string {
  return `#INC-${String(id).padStart(3, "0")}`;
}

export default function AIThreatAnalysisPanel() {
  const { incidents } = useIncidents();
  const firstIncidentId = incidents.length > 0 ? incidents[0].id : null;
  const { insight, isLoading, isError } = useIncidentInsight(firstIncidentId);

  console.log(insight);

  if (!firstIncidentId) {
    return (
      <Card className="h-fit">
        <div className="text-center py-8">
          <div className="text-4xl mb-4">🧠</div>
          <h3 className="text-lg font-semibold text-white mb-2">
            AI Threat Analysis
          </h3>
          <p className="text-sm text-slate-400">
            Select an incident to view AI insights
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="h-fit w-full shadow-lg transition-all duration-300 hover:shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-2xl flex-shrink-0">🧠</span>
          <h3 className="text-lg font-semibold text-white truncate">
            AI Threat Analysis
          </h3>
        </div>
        <Badge variant="info" size="sm" className="text-xs flex-shrink-0">
          GPT-4
        </Badge>
      </div>

      {/* Incident ID */}
      <div className="mb-6">
        <p className="text-sm text-slate-400 font-technical">
          ANALYZING: {formatIncidentId(firstIncidentId)}
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-4 animate-pulse">
          <div className="h-4 bg-slate-700 rounded w-3/4"></div>
          <div className="h-4 bg-slate-700 rounded w-full"></div>
          <div className="h-4 bg-slate-700 rounded w-5/6"></div>
        </div>
      ) : isError ? (
        <div className="text-red-400 text-sm">Unable to load AI insight</div>
      ) : insight ? (
        <>
          {/* Analysis Confidence */}
          <div className="mb-3 sm:mb-4"></div>

          {/* Threat Summary */}
          <div className="space-y-2 sm:space-y-3">
            <div className="flex items-start gap-1.5 sm:gap-2">
              <span className="text-orange-400 mt-0.5 sm:mt-1 text-base sm:text-lg flex-shrink-0">
                ⚠️
              </span>
              <div className="min-w-0 flex-1">
                <h4 className="text-xs sm:text-sm font-semibold text-white mb-1 uppercase">
                  THREAT SUMMARY
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed break-words">
                  <MarkdownRenderer content={insight.insightText} />
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
