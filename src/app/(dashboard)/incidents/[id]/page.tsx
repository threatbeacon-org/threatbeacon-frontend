"use client";

/**
 * Incident Detail Page
 * T4.4.1 - Route /incidents/[id]
 * T4.4.2 - Fetch and render incident detail + insight
 */

import AiInsightCard from "@/components/dashboard/AiInsightCard";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { useIncidentDetail } from "@/hooks/useIncidentDetail";
import { useIncidentInsight } from "@/hooks/useIncidentInsight";
import Link from "next/link";
import { useParams } from "next/navigation";

function getSeverityVariant(
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"
): "success" | "warning" | "danger" | "neutral" {
  switch (severity) {
    case "CRITICAL":
    case "HIGH":
      return "danger";
    case "MEDIUM":
      return "warning";
    case "LOW":
      return "success";
    default:
      return "neutral";
  }
}

function getStatusVariant(
  status: "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED"
): "success" | "warning" | "danger" | "info" | "neutral" {
  switch (status) {
    case "RESOLVED":
    case "CLOSED":
      return "success";
    case "IN_PROGRESS":
      return "info";
    case "OPEN":
      return "warning";
    default:
      return "neutral";
  }
}

export default function IncidentDetailPage() {
  const params = useParams();
  const incidentId = params?.id ? parseInt(params.id as string, 10) : null;

  const {
    incident,
    isLoading: isLoadingDetail,
    isError: isErrorDetail,
  } = useIncidentDetail(incidentId);
  const {
    insight,
    isLoading: isLoadingInsight,
    isError: isErrorInsight,
  } = useIncidentInsight(incidentId);

  if (isLoadingDetail) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-slate-700 rounded w-64 mb-6"></div>
          <div className="h-64 bg-slate-800 rounded"></div>
        </div>
      </div>
    );
  }

  if (isErrorDetail || !incident) {
    return (
      <div className="space-y-6">
        <Card>
          <div className="text-red-400">
            <p>Error loading incident details. Please try again.</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
        <div className="w-full sm:w-auto">
          <Link href="/overview">
            <Button variant="ghost" size="sm" className="text-xs sm:text-sm">
              ← Back to Overview
            </Button>
          </Link>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mt-2 sm:mt-4 wrap-break-word">
            Incident #{incident.id}
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Incident Details */}
        <div>
          <Card title="Incident Details">
            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="text-xs sm:text-sm font-medium text-slate-400">
                  Type
                </label>
                <p className="text-white mt-1 text-sm sm:text-base wrap-break-word">
                  {incident.type}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <div className="flex-1">
                  <label className="text-xs sm:text-sm font-medium text-slate-400">
                    Severity
                  </label>
                  <div className="mt-1">
                    <Badge
                      variant={getSeverityVariant(incident.severity)}
                      size="sm"
                      className="text-xs sm:text-sm"
                    >
                      {incident.severity}
                    </Badge>
                  </div>
                </div>

                <div className="flex-1">
                  <label className="text-xs sm:text-sm font-medium text-slate-400">
                    Status
                  </label>
                  <div className="mt-1">
                    <Badge
                      variant={getStatusVariant(incident.status)}
                      size="sm"
                      className="text-xs sm:text-sm"
                    >
                      {incident.status.replace("_", " ")}
                    </Badge>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs sm:text-sm font-medium text-slate-400">
                  Event Count
                </label>
                <p className="text-white mt-1 font-mono text-sm sm:text-base">
                  {incident.eventCount}
                </p>
              </div>

              {incident.mainIps && incident.mainIps.length > 0 && (
                <div>
                  <label className="text-xs sm:text-sm font-medium text-slate-400">
                    Main IPs
                  </label>
                  <div className="mt-1 space-y-1">
                    {incident.mainIps.map((ip, idx) => (
                      <p
                        key={idx}
                        className="text-cyan-400 font-mono text-xs sm:text-sm break-all"
                      >
                        {ip}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {incident.countries && incident.countries.length > 0 && (
                <div>
                  <label className="text-xs sm:text-sm font-medium text-slate-400">
                    Countries
                  </label>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {incident.countries.map((country, idx) => (
                      <Badge
                        key={idx}
                        variant="neutral"
                        size="sm"
                        className="text-[10px] sm:text-xs"
                      >
                        {country}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-3 sm:pt-4 border-t border-slate-700 space-y-2">
                <div>
                  <label className="text-xs sm:text-sm font-medium text-slate-400">
                    Created At
                  </label>
                  <p className="text-slate-300 font-mono text-xs sm:text-sm mt-1 wrap-break-word">
                    {new Date(incident.createdAt).toLocaleString()}
                  </p>
                </div>

                <div>
                  <label className="text-xs sm:text-sm font-medium text-slate-400">
                    Last Updated
                  </label>
                  <p className="text-slate-300 font-mono text-xs sm:text-sm mt-1 wrap-break-word">
                    {new Date(incident.updatedAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* AI Insight */}
        <div>
          <AiInsightCard
            insight={insight?.insightText}
            isLoading={isLoadingInsight}
            isError={isErrorInsight}
          />
        </div>
      </div>
    </div>
  );
}
