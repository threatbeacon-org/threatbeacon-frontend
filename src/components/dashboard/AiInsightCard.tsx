"use client";

/**
 * AiInsightCard Component
 * Displays AI-generated threat analysis and insights
 */

import Card from "@/components/ui/Card";
import MarkdownRenderer from "../md/MarkdownRenderer";

export interface AiInsightCardProps {
  insight?: string;
  isLoading?: boolean;
  isError?: boolean;
  generatedAt?: string;
  confidence?: number;
}

export default function AiInsightCard({
  insight,
  isLoading = false,
  isError = false,
  generatedAt,
  confidence,
}: AiInsightCardProps) {
  if (isLoading) {
    return (
      <Card title="AI Threat Analysis" className="animate-pulse">
        <div className="space-y-2 sm:space-y-3">
          <div className="h-3 sm:h-4 bg-slate-700 rounded w-full"></div>
          <div className="h-3 sm:h-4 bg-slate-700 rounded w-5/6"></div>
          <div className="h-3 sm:h-4 bg-slate-700 rounded w-4/6"></div>
        </div>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card title="AI Threat Analysis">
        <div className="text-red-400">
          <p className="text-xs sm:text-sm break-words">
            Unable to load AI insight. Please try again later.
          </p>
        </div>
      </Card>
    );
  }

  if (!insight) {
    return (
      <Card title="AI Threat Analysis">
        <div className="text-slate-400">
          <p className="text-xs sm:text-sm break-words">
            No AI insight available for this incident.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card
      title="AI Threat Analysis"
      subtitle={
        generatedAt
          ? `Generated at ${new Date(generatedAt).toLocaleString()}`
          : undefined
      }
    >
      <div className="prose prose-invert max-w-none">
        <p className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed whitespace-pre-wrap wrap-break-word">
          <MarkdownRenderer keepOpen content={insight} />
        </p>
        {confidence !== undefined && (
          <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-slate-700">
            <p className="text-[10px] sm:text-xs text-slate-500">
              Confidence: <span className="text-cyan-400">{confidence}%</span>
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
