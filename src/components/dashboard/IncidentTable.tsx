"use client";

/**
 * IncidentTable Component
 * Displays list of incidents in a table format
 * Highlights critical/high severity incidents
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

  if (incidents.length === 0) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Active Incidents</h3>
        <p className="text-slate-400">No incidents found</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
      <div className="p-6 border-b border-slate-700">
        <h3 className="text-xl font-semibold text-white">Active Incidents</h3>
        <p className="text-sm text-slate-400 mt-1">
          {incidents.length} incident{incidents.length !== 1 ? 's' : ''} detected
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-900/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Severity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Created At
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {incidents.map((incident) => (
              <tr
                key={incident.id}
                className="hover:bg-slate-900/50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-mono text-cyan-400">
                    #{incident.id}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-white">{incident.type}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge variant={getSeverityVariant(incident.severity)}>
                    {incident.severity}
                  </Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge variant={getStatusVariant(incident.status)}>
                    {incident.status.replace('_', ' ')}
                  </Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-slate-400 font-mono">
                    {new Date(incident.createdAt).toLocaleString()}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link
                    href={`/incidents/${incident.id}`}
                    className="text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors"
                  >
                    View Details →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
