"use client";

/**
 * Overview Page
 * Main dashboard matching the design image exactly
 */

import React from 'react';
import RiskHero from '@/components/dashboard/RiskHero';
import IncidentTable from '@/components/dashboard/IncidentTable';
import AIThreatAnalysisPanel from '@/components/dashboard/AIThreatAnalysisPanel';
import NotificationAlarm from '@/components/dashboard/NotificationAlarm';

export default function OverviewPage() {
  return (
    <div className="space-y-6">
      <NotificationAlarm />
      
      {/* Global Risk Level Section */}
      <div>
        <RiskHero />
      </div>

      {/* Two Column Layout: Incidents Table + AI Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Incidents Table (2/3 width) */}
        <div className="lg:col-span-2">
          <IncidentTable />
        </div>

        {/* Right Column - AI Threat Analysis (1/3 width) */}
        <div className="lg:col-span-1">
          <AIThreatAnalysisPanel />
        </div>
      </div>
    </div>
  );
}
