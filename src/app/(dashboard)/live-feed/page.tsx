"use client";

/**
 * Live Feed Page
 * Real-time security event feed
 */

import React, { useState, useEffect } from 'react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

interface LiveEvent {
  id: string;
  type: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  source: string;
  message: string;
  timestamp: string;
}

export default function LiveFeedPage() {
  const [events, setEvents] = useState<LiveEvent[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Simulate live events - replace with real WebSocket or polling
    const mockEvents: LiveEvent[] = [
      {
        id: '1',
        type: 'BRUTE FORCE',
        severity: 'CRITICAL',
        source: '192.168.1.100',
        message: 'Multiple failed SSH login attempts detected',
        timestamp: new Date().toISOString(),
      },
      {
        id: '2',
        type: 'SUSPICIOUS ACTIVITY',
        severity: 'MEDIUM',
        source: '10.0.0.45',
        message: 'Unusual network traffic pattern detected',
        timestamp: new Date(Date.now() - 30000).toISOString(),
      },
    ];

    setEvents(mockEvents);
    setIsConnected(true);
  }, []);

  const getSeverityVariant = (severity: string) => {
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
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Live Feed</h1>
          <p className="text-slate-400">
            Real-time security events and alerts
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} />
          <span className="text-sm text-slate-400">
            {isConnected ? 'Connected' : 'Disconnected'}
          </span>
        </div>
      </div>

      <Card title="Live Events" subtitle="Real-time security event stream">
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {events.length === 0 ? (
            <div className="text-center text-slate-400 py-8">
              <p>No events to display</p>
            </div>
          ) : (
            events.map((event) => (
              <div
                key={event.id}
                className="flex items-start gap-4 p-4 bg-slate-900/50 rounded-lg border border-slate-700"
              >
                <div className="flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant={getSeverityVariant(event.severity)} size="sm">
                      {event.severity}
                    </Badge>
                    <span className="text-xs text-slate-400">
                      {new Date(event.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-white text-sm mb-1">{event.message}</p>
                  <div className="flex items-center gap-4 text-xs text-slate-400">
                    <span>Type: {event.type}</span>
                    <span>Source: {event.source}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
}
