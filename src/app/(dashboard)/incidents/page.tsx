"use client";

/**
 * Incidents List Page
 * Shows all incidents in a detailed view
 */

import React from 'react';
import IncidentTable from '@/components/dashboard/IncidentTable';

export default function IncidentsPage() {
  return (
    <div className="space-y-6">
      <div className="ml-1">
        <h1 className="text-2xl font-bold text-white mb-2">Security Incidents</h1>
        <p className="text-slate-400">
          Monitor and manage all detected security incidents
        </p>
      </div>
      
      <IncidentTable />
    </div>
  );
}
