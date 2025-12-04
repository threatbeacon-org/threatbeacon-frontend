"use client";

/**
 * IncidentTable Component
 * Active Incidents table matching the design image exactly
 */

import React from 'react';
import { useIncidents } from '@/hooks/useIncidents';
import Badge from '@/components/ui/Badge';
import Link from 'next/link';
import type { IncidentSummary } from '@/lib/api/types';

function getSeverityVariant(
  severity: IncidentSummary['severity']
): 'success' | 'warning' | 'danger' | 'neutral' {
  switch (severity) {
    case 'CRITICAL':
      return 'danger';
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
  status: IncidentSummary['status']
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

function formatIncidentId(id: number): string {
  return `#INC-${String(id).padStart(3, '0')}`;
}

export default function IncidentTable() {
  const { incidents, isLoading, isError } = useIncidents();

  if (isLoading) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-slate-700 rounded w-48"></div>
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 bg-slate-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-slate-800 border border-red-700 rounded-lg p-6">
        <p className="text-red-400">Error loading incidents</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
            <h3 className="text-lg font-semibold text-white">Active Incidents</h3>
            <Badge variant="neutral" size="sm" className="bg-slate-700/50 text-slate-300 border-slate-600/50">
              {incidents.length} TOTAL
            </Badge>
          </div>
          <div className="text-xs text-slate-400 font-technical">
            Auto-refresh: 5s
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-900/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider font-technical">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                TYPE
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                SEVERITY
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                STATUS
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {incidents.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-slate-400">
                  No incidents found
                </td>
              </tr>
            ) : (
              incidents.map((incident) => (
                <tr
                  key={incident.id}
                  className="hover:bg-slate-900/50 transition-colors cursor-pointer"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link
                      href={`/incidents/${incident.id}`}
                      className="text-sm font-technical text-cyan-400 hover:text-cyan-300"
                    >
                      {formatIncidentId(incident.id)}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-white font-medium">
                      {incident.type.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant={getSeverityVariant(incident.severity)}>
                      {incident.severity}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant={getStatusVariant(incident.status)}>
                      {incident.status === 'IN_PROGRESS' ? 'INVESTIGATING' : incident.status}
                    </Badge>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
