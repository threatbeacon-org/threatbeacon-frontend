"use client";
import React from 'react';
import RiskHero from '@/components/dashboard/RiskHero';
import IncidentTable from '@/components/dashboard/IncidentTable';
import AIThreatAnalysisPanel from '@/components/dashboard/AIThreatAnalysisPanel';
import NotificationAlarm from '@/components/dashboard/NotificationAlarm';

export default function OverviewPage() {
  return (
    <div className="space-y-6">
      <div className="ml-1">
        <NotificationAlarm />
      </div>
      
      {/* Global Risk Level Section */}
      <div className="w-full ml-1">
        <RiskHero />
      </div>

      {/* Responsive Grid Layout: Incidents Table + AI Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 ml-1">
        {/* Incidents Table - 8 columns on desktop, full on mobile */}
        <div className="lg:col-span-8 order-2 lg:order-1">
          <IncidentTable />
        </div>

        {/* AI Threat Analysis Panel - 4 columns on desktop, full on mobile */}
        <div className="lg:col-span-4 order-1 lg:order-2">
          <AIThreatAnalysisPanel />
        </div>
      </div>
    </div>
  );
}
