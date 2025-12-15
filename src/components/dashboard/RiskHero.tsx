"use client";

/**
 * RiskHero Component
 * Global Risk Level display matching the design image exactly
 */

import { useIncidents } from "@/hooks/useIncidents";
import { useRiskStatus } from "@/hooks/useRiskStatus";
import type { RiskLevel } from "@/lib/api/types";
import MuteBuzzerButton from "./MuteBuzzerButton";

function getRiskLevelConfig(level: RiskLevel) {
  switch (level) {
    case "NORMAL":
      return {
        iconBg: "bg-green-600",
        icon: "✓",
        textColor: "text-green-400",
        label: "NORMAL",
      };
    case "SUSPICIOUS":
      return {
        iconBg: "bg-orange-600",
        icon: "⚠️",
        textColor: "text-orange-400",
        label: "SUSPICIOUS",
      };
    case "CRITICAL":
      return {
        iconBg: "bg-red-600",
        icon: "🛡️",
        textColor: "text-red-400",
        label: "CRITICAL THREAT",
      };
    default:
      return {
        iconBg: "bg-slate-600",
        icon: "?",
        textColor: "text-slate-400",
        label: "UNKNOWN",
      };
  }
}

export default function RiskHero() {
  const {
    riskStatus,
    isLoading: isLoadingRisk,
    isError: isErrorRisk,
  } = useRiskStatus();
  const { incidents, isLoading: isLoadingIncidents } = useIncidents();

  console.log(incidents);

  if (isLoadingRisk) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 animate-pulse">
        <div className="h-8 bg-slate-700 rounded w-48 mb-8"></div>
        <div className="h-4 bg-slate-700 rounded w-64"></div>
      </div>
    );
  }

  if (isErrorRisk || !riskStatus) {
    return (
      <div className="bg-slate-800 border border-red-700 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-red-400 mb-2">
          Error Loading Risk Status
        </h2>
        <p className="text-slate-400">Unable to fetch current risk level</p>
      </div>
    );
  }

  const config = getRiskLevelConfig(riskStatus.level);

  // Calculate statistics from incidents
  const activeCount = incidents.length;

  const criticalCount = incidents.filter((i) => i.severity === "HIGH").length;
  const suspiciousCount = incidents.filter(
    (i) =>
      i.severity === "MEDIUM" || i.type.toLowerCase().includes("suspicious")
  ).length;

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 w-full shadow-lg transition-all duration-300 hover:shadow-xl">
      {/* Header Row */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xs font-medium text-slate-400 uppercase tracking-wider">
          GLOBAL RISK LEVEL
        </h2>
        <div className="text-xs text-slate-500 font-technical">
          LAST SYNC {new Date(riskStatus.timestamp).toLocaleTimeString()}
        </div>
      </div>

      {/* Main Display */}
      <div className="flex flex-col lg:flex-row items-center gap-4">
        {/* Large Circular Icon */}
        <div
          className={`
            w-16 h-16 rounded-full ${config.iconBg}
            flex items-center justify-center
            flex-shrink-0 shadow-lg
          `}
        >
          <span className="text-2xl">{config.icon}</span>
        </div>

        {/* Risk Level Text */}
        <div className="flex-1 text-center lg:text-left">
          <div
            className={`text-3xl lg:text-4xl font-bold ${config.textColor} mb-2`}
          >
            {config.label}
          </div>
          <div className="text-slate-400 text-xs">
            Risk assessment updated in real-time
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-row lg:flex-col gap-3">
          <MuteBuzzerButton />
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
        <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-600/50 min-w-[140px] transition-all duration-200 hover:border-slate-600 hover:bg-slate-900/70">
          <div className="text-xl font-bold text-blue-400 mb-1">
            {activeCount}
          </div>
          <div className="text-xs text-slate-400 uppercase tracking-wider">
            ACTIVE
          </div>
        </div>

        <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-600/50 min-w-[140px] transition-all duration-200 hover:border-slate-600 hover:bg-slate-900/70">
          <div className="text-xl font-bold text-red-400 mb-1">
            {criticalCount}
          </div>
          <div className="text-xs text-slate-400 uppercase tracking-wider">
            CRITICAL
          </div>
        </div>

        <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-600/50 min-w-[140px] transition-all duration-200 hover:border-slate-600 hover:bg-slate-900/70">
          <div className="text-xl font-bold text-orange-400 mb-1">
            {suspiciousCount}
          </div>
          <div className="text-xs text-slate-400 uppercase tracking-wider">
            SUSPICIOUS
          </div>
        </div>
      </div>
    </div>
  );
}
