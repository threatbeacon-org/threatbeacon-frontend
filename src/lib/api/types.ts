/**
 * TypeScript interfaces matching backend DTOs
 * These ensure end-to-end type safety between frontend and backend
 */

export type RiskLevel = 'NORMAL' | 'SUSPICIOUS' | 'CRITICAL';

export interface RiskStatus {
  level: RiskLevel;
  buzzerMuted: boolean;
  timestamp: string;  // Backend uses 'timestamp' not 'lastUpdated'
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
  incidentId: number;
  insightText: string;  // Backend uses 'insightText' not 'insight'
}

export interface EventData {
  type: string;           // Tipo de evento (String, obligatorio)
  source: string;         // Origen del evento (String, obligatorio)
  ip: string;            // IP de origen (String, obligatorio)
  country?: string;      // Código del país (String, opcional)
  severity: string;      // Severidad del evento (String, obligatorio)
  metadata?: string;     // Datos adicionales (String, opcional)
}

