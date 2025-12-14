/**
 * Mock Data for Development
 * Used when backend is not available
 */

import type { RiskStatus, IncidentSummary, IncidentDetail, IncidentInsight } from '@/lib/api/types';

export const mockRiskStatus: RiskStatus = {
  level: 'CRITICAL',
  buzzerMuted: false,
  lastUpdated: new Date().toISOString(),
  activeIncidents: 21,
  criticalCount: 3,
  suspiciousCount: 5,
};

export const mockIncidents: IncidentSummary[] = [
  {
    id: 1,
    type: 'BRUTE FORCE',
    severity: 'CRITICAL',
    status: 'OPEN',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 2,
    type: 'SQL INJECTION',
    severity: 'HIGH',
    status: 'IN_PROGRESS',
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 3,
    type: 'UNAUTHORIZED ACCESS',
    severity: 'HIGH',
    status: 'OPEN',
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 4,
    type: 'MALWARE DETECTION',
    severity: 'CRITICAL',
    status: 'OPEN',
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
  },
  {
    id: 5,
    type: 'DDoS ATTACK',
    severity: 'CRITICAL',
    status: 'IN_PROGRESS',
    createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
  },
  {
    id: 6,
    type: 'PHISHING ATTEMPT',
    severity: 'MEDIUM',
    status: 'OPEN',
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 7,
    type: 'DATA EXFILTRATION',
    severity: 'HIGH',
    status: 'OPEN',
    createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
  },
];

export const mockIncidentDetail: IncidentDetail = {
  id: 1,
  type: 'BRUTE FORCE',
  severity: 'CRITICAL',
  status: 'OPEN',
  createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  updatedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
  eventCount: 1247,
  mainIps: ['192.168.1.100', '10.0.0.45', '172.16.0.23'],
  countries: ['United States', 'Russia', 'China'],
};

export const mockIncidentInsight: IncidentInsight = {
  insight: 'Coordinated brute force attack targeting SSH service on primary database server. Multiple IP addresses from different countries attempting credential stuffing. Immediate action required to block source IPs and rotate credentials.',
  generatedAt: new Date().toISOString(),
  confidence: 94,
};




