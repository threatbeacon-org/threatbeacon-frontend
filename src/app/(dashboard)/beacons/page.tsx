"use client";

/**
 * Beacons Page
 * Status and management of ThreatBeacon devices
 */

import React, { useState } from 'react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

interface Beacon {
  id: string;
  name: string;
  location: string;
  status: 'online' | 'offline' | 'warning';
  lastSeen: string;
  batteryLevel?: number;
  firmware: string;
}

export default function BeaconsPage() {
  const [beacons] = useState<Beacon[]>([
    {
      id: 'beacon-001',
      name: 'Beacon #1',
      location: 'Main SOC Room',
      status: 'online',
      lastSeen: new Date().toISOString(),
      batteryLevel: 87,
      firmware: 'v2.1.0',
    },
    {
      id: 'beacon-002',
      name: 'Beacon #2',
      location: 'Secondary Monitoring Station',
      status: 'online',
      lastSeen: new Date(Date.now() - 120000).toISOString(),
      batteryLevel: 92,
      firmware: 'v2.1.0',
    },
    {
      id: 'beacon-003',
      name: 'Beacon #3',
      location: 'Data Center Floor 1',
      status: 'warning',
      lastSeen: new Date(Date.now() - 300000).toISOString(),
      batteryLevel: 45,
      firmware: 'v2.0.1',
    },
  ]);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'online':
        return 'success';
      case 'offline':
        return 'danger';
      case 'warning':
        return 'warning';
      default:
        return 'neutral';
    }
  };

  const getBatteryColor = (level?: number) => {
    if (!level) return 'text-slate-400';
    if (level > 60) return 'text-green-400';
    if (level > 30) return 'text-orange-400';
    return 'text-red-400';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Beacons</h1>
          <p className="text-slate-400">
            Monitor and manage ThreatBeacon devices
          </p>
        </div>
        <Button size="sm">Add Beacon</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {beacons.map((beacon) => (
          <Card key={beacon.id} title={beacon.name} subtitle={beacon.location}>
            <div className="space-y-4">
              {/* Status */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Status</span>
                <Badge variant={getStatusVariant(beacon.status)}>
                  {beacon.status.toUpperCase()}
                </Badge>
              </div>

              {/* Last Seen */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Last Seen</span>
                <span className="text-xs text-slate-300 font-mono">
                  {new Date(beacon.lastSeen).toLocaleTimeString()}
                </span>
              </div>

              {/* Battery Level */}
              {beacon.batteryLevel && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Battery</span>
                  <span className={`text-sm font-mono ${getBatteryColor(beacon.batteryLevel)}`}>
                    {beacon.batteryLevel}%
                  </span>
                </div>
              )}

              {/* Firmware */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Firmware</span>
                <span className="text-xs text-slate-300 font-mono">
                  {beacon.firmware}
                </span>
              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-slate-700 flex gap-2">
                <Button variant="ghost" size="sm" className="flex-1">
                  Test
                </Button>
                <Button variant="ghost" size="sm" className="flex-1">
                  Config
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* System Overview */}
      <Card title="System Overview" subtitle="Beacon network statistics">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
            <div className="text-2xl font-bold text-green-400 mb-1">
              {beacons.filter(b => b.status === 'online').length}
            </div>
            <div className="text-sm text-slate-400">Online</div>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
            <div className="text-2xl font-bold text-orange-400 mb-1">
              {beacons.filter(b => b.status === 'warning').length}
            </div>
            <div className="text-sm text-slate-400">Warning</div>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
            <div className="text-2xl font-bold text-red-400 mb-1">
              {beacons.filter(b => b.status === 'offline').length}
            </div>
            <div className="text-sm text-slate-400">Offline</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
