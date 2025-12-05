/**
 * Core type definitions for ThreatBeacon frontend
 * Re-exports from lib/api/types for convenience
 */

export type {
  RiskLevel,
  RiskStatus,
  IncidentSummary,
  IncidentDetail,
  IncidentInsight,
} from '@/lib/api/types';

// Additional frontend-specific types
export interface Credentials {
  username: string;
  password: string;
}

export interface ApiError {
  message: string;
  status?: number;
}


