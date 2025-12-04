/**
 * TypeScript interfaces matching backend DTOs
 * These ensure end-to-end type safety between frontend and backend
 */

export type RiskLevel = 'NORMAL' | 'SUSPICIOUS' | 'CRITICAL';

export interface RiskStatus {
  level: RiskLevel;
  buzzerMuted: boolean;
  lastUpdated: string;
}

export interface IncidentSummary {
  id: number;
  type: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  createdAt: string;
}

export interface IncidentDetail {
  id: number;
  type: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  createdAt: string;
  updatedAt: string;
  eventCount: number;
  mainIps: string[];
  countries: string[];
}

export interface IncidentInsight {
  insight: string;
  generatedAt: string;
  confidence?: number;
}

