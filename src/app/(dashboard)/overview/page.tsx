"use client";

/**
 * Overview Page
 * T4.3.1 - General view of global risk and incidents
 * T4.3.2 - Polish /overview UI
 * T4.3.3 - Add "Mute buzzer" button
 */

import React from 'react';
import RiskHero from '@/components/dashboard/RiskHero';
import IncidentTable from '@/components/dashboard/IncidentTable';
import MuteBuzzerButton from '@/components/dashboard/MuteBuzzerButton';
import NotificationAlarm from '@/components/dashboard/NotificationAlarm';

export default function OverviewPage() {
  return (
    <div className="space-y-6">
      <NotificationAlarm />
      
      <div>
        <h1 className="text-3xl font-bold text-white mb-6">Security Overview</h1>
        
        <div className="mb-6">
          <RiskHero />
        </div>

        <div className="mb-6 flex justify-end">
          <MuteBuzzerButton />
        </div>

        <div>
          <IncidentTable />
        </div>
      </div>
    </div>
  );
}
