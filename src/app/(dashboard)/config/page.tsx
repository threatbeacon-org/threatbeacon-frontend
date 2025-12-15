/**
 * Config Page
 * T4.5.1 - Config page for SIEM integration information
 * Server Component - no client-side interactivity needed
 */

import React from 'react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

export default function ConfigPage() {
  return (
    <div className="space-y-6">
      <div className="ml-1">
        <h1 className="text-2xl font-bold text-white mb-2">Configuration</h1>
        <p className="text-slate-400">
          Integration settings and SIEM connectivity information
        </p>
      </div>

      <Card title="API Endpoint" subtitle="Event ingestion endpoint for SIEM integration">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-400 block mb-2">
              POST Endpoint
            </label>
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-4">
              <code className="text-cyan-400 font-mono text-sm break-all">
                {API_BASE_URL}/api/events
              </code>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-400 block mb-2">
              API Key (Example)
            </label>
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-4">
              <code className="text-slate-300 font-mono text-sm">
                tb_api_key_example_12345
              </code>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              * This is a display-only example. Actual API key authentication will be
              implemented in a future version.
            </p>
          </div>
        </div>
      </Card>

      <Card title="Beacon Status" subtitle="Active ThreatBeacon devices">
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-slate-700">
            <div>
              <h4 className="text-white font-medium">Beacon #1</h4>
              <p className="text-sm text-slate-400">Main SOC Room</p>
            </div>
            <Badge variant="success">Online</Badge>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-slate-700">
            <div>
              <h4 className="text-white font-medium">Beacon #2</h4>
              <p className="text-sm text-slate-400">Secondary Monitoring Station</p>
            </div>
            <Badge variant="success">Online</Badge>
          </div>
        </div>
      </Card>

      <Card
        title="SIEM Integration Guide"
        subtitle="How to forward events from your SIEM to ThreatBeacon"
      >
        <div className="prose prose-invert max-w-none space-y-4">
          <p className="text-slate-300">
            To integrate ThreatBeacon with your existing SIEM solution, configure your
            SIEM to forward selected security events to ThreatBeacon API endpoint.
          </p>

          <div>
            <h4 className="text-white font-semibold mb-2">Integration Steps:</h4>
            <ol className="list-decimal list-inside space-y-2 text-slate-300">
              <li>
                Configure your SIEM to send HTTP POST requests to endpoint above
              </li>
              <li>
                Include API key in request headers (future implementation)
              </li>
              <li>
                Format events according to ThreatBeacon&apos;s event schema
              </li>
              <li>
                Monitor ThreatBeacon dashboard for detected incidents and risk
                level changes
              </li>
            </ol>
          </div>

          <div className="bg-cyan-600/10 border border-cyan-600/30 rounded-lg p-4 mt-4">
            <p className="text-cyan-400 text-sm">
              <strong>Note:</strong> Full API key authentication and event schema
              documentation will be available in a future release. For now, ThreatBeacon
              uses Basic Authentication for dashboard access.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
