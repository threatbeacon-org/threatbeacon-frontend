"use client";

/**
 * AiInsightCard Component
 * Displays AI-generated threat analysis and insights
 */

import React from 'react';
import Card from '@/components/ui/Card';

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
        <div className="space-y-3">
          <div className="h-4 bg-slate-700 rounded w-full"></div>
          <div className="h-4 bg-slate-700 rounded w-5/6"></div>
          <div className="h-4 bg-slate-700 rounded w-4/6"></div>
        </div>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card title="AI Threat Analysis">
        <div className="text-red-400">
          <p>Unable to load AI insight. Please try again later.</p>
        </div>
      </Card>
    );
  }

  if (!insight) {
    return (
      <Card title="AI Threat Analysis">
        <div className="text-slate-400">
          <p>No AI insight available for this incident.</p>
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
        <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">
          {insight}
        </p>
        {confidence !== undefined && (
          <div className="mt-4 pt-4 border-t border-slate-700">
            <p className="text-xs text-slate-500">
              Confidence: <span className="text-cyan-400">{confidence}%</span>
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
