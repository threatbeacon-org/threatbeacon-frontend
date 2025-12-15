/**
 * Mock Data for Development
 * Used when backend is not available
 */

import type { RiskStatus, IncidentSummary, IncidentDetail, IncidentInsight } from '@/lib/api/types';

export const mockRiskStatus: RiskStatus = {
  level: 'CRITICAL',
  buzzerMuted: false,
  timestamp: new Date().toISOString(),
  lastUpdated: new Date().toISOString(),
};

export const mockIncidents: IncidentSummary[] = [
  {
    id: 1,
    type: 'NETWORK ANOMALY',
    severity: 'MEDIUM',
    status: 'OPEN',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 2,
    type: 'SYSTEM ALERT',
    severity: 'LOW',
    status: 'IN_PROGRESS',
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 3,
    type: 'SECURITY EVENT',
    severity: 'MEDIUM',
    status: 'OPEN',
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
  },
];

export const mockIncidentDetail: IncidentDetail = {
  id: 1,
  type: 'NETWORK ANOMALY',
  severity: 'MEDIUM',
  status: 'OPEN',
  createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  updatedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
  eventCount: 47,
  mainIps: ['192.168.1.100', '10.0.0.45'],
  countries: ['United States'],
};

export const mockIncidentInsight: IncidentInsight = {
  incidentId: 1,
  insightText: 'Network anomaly detected in internal traffic patterns. Unusual communication between internal systems identified. Monitor for potential misconfiguration or unauthorized access attempts.',
  insight: 'Network anomaly detected in internal traffic patterns. Unusual communication between internal systems identified. Monitor for potential misconfiguration or unauthorized access attempts.',
  confidence: 78,
};




