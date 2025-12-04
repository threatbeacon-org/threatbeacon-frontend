"use client";

/**
 * Incident Detail Page
 * T4.4.1 - Route /incidents/[id]
 * T4.4.2 - Fetch and render incident detail + insight
 */

import React from 'react';
import { useParams } from 'next/navigation';
import { useIncidentDetail } from '@/hooks/useIncidentDetail';
import { useIncidentInsight } from '@/hooks/useIncidentInsight';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import AiInsightCard from '@/components/dashboard/AiInsightCard';
import Link from 'next/link';
import Button from '@/components/ui/Button';

function getSeverityVariant(
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
): 'success' | 'warning' | 'danger' | 'neutral' {
  switch (severity) {
    case 'CRITICAL':
    case 'HIGH':
      return 'danger';
    case 'MEDIUM':
      return 'warning';
    case 'LOW':
      return 'success';
    default:
      return 'neutral';
  }
}

function getStatusVariant(
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED'
): 'success' | 'warning' | 'danger' | 'info' | 'neutral' {
  switch (status) {
    case 'RESOLVED':
    case 'CLOSED':
      return 'success';
    case 'IN_PROGRESS':
      return 'info';
    case 'OPEN':
      return 'warning';
    default:
      return 'neutral';
  }
}

export default function IncidentDetailPage() {
  const params = useParams();
  const incidentId = params?.id ? parseInt(params.id as string, 10) : null;

  const { incident, isLoading: isLoadingDetail, isError: isErrorDetail } =
    useIncidentDetail(incidentId);
  const { insight, isLoading: isLoadingInsight, isError: isErrorInsight } =
    useIncidentInsight(incidentId);

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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link href="/overview">
            <Button variant="ghost" size="sm">← Back to Overview</Button>
          </Link>
          <h1 className="text-3xl font-bold text-white mt-4">
            Incident #{incident.id}
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Incident Details */}
        <Card title="Incident Details">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-400">Type</label>
              <p className="text-white mt-1">{incident.type}</p>
            </div>

            <div className="flex gap-4">
              <div>
                <label className="text-sm font-medium text-slate-400">Severity</label>
                <div className="mt-1">
                  <Badge variant={getSeverityVariant(incident.severity)}>
                    {incident.severity}
                  </Badge>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-400">Status</label>
                <div className="mt-1">
                  <Badge variant={getStatusVariant(incident.status)}>
                    {incident.status.replace('_', ' ')}
                  </Badge>
                </div>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-400">Event Count</label>
              <p className="text-white mt-1 font-mono">{incident.eventCount}</p>
            </div>

            {incident.mainIps && incident.mainIps.length > 0 && (
              <div>
                <label className="text-sm font-medium text-slate-400">Main IPs</label>
                <div className="mt-1 space-y-1">
                  {incident.mainIps.map((ip, idx) => (
                    <p key={idx} className="text-cyan-400 font-mono text-sm">
                      {ip}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {incident.countries && incident.countries.length > 0 && (
              <div>
                <label className="text-sm font-medium text-slate-400">Countries</label>
                <div className="mt-1 flex flex-wrap gap-2">
                  {incident.countries.map((country, idx) => (
                    <Badge key={idx} variant="neutral" size="sm">
                      {country}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-slate-700 space-y-2">
              <div>
                <label className="text-sm font-medium text-slate-400">Created At</label>
                <p className="text-slate-300 font-mono text-sm mt-1">
                  {new Date(incident.createdAt).toLocaleString()}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-400">Last Updated</label>
                <p className="text-slate-300 font-mono text-sm mt-1">
                  {new Date(incident.updatedAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* AI Insight */}
        <div>
          <AiInsightCard
            insight={insight?.insight}
            isLoading={isLoadingInsight}
            isError={isErrorInsight}
            generatedAt={insight?.generatedAt}
            confidence={insight?.confidence}
          />
        </div>
      </div>
    </div>
  );
}
