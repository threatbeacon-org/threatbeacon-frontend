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
    <div className="space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10 max-w-full">
      <NotificationAlarm />
      
      {/* Global Risk Level Section */}
      <div className="w-full">
        <RiskHero />
      </div>

      {/* Two Column Layout: Incidents Table + AI Panel */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
        {/* Left Column - Incidents Table (2/3 width on xl+) */}
        <div className="xl:col-span-2 order-2 xl:order-1 w-full">
          <IncidentTable />
        </div>

        {/* Right Column - AI Threat Analysis (1/3 width on xl+) */}
        <div className="xl:col-span-1 order-1 xl:order-2 w-full">
          <AIThreatAnalysisPanel />
        </div>
      </div>
    </div>
  );
}
