/**
 * Incident Service
 * Handles all incident-related API calls
 */

import { apiClient } from '@/lib/api/client';
import type {
  IncidentSummary,
  IncidentDetail,
  IncidentInsight,
} from '@/lib/api/types';

/**
 * Fetches list of incident summaries
 */
export async function fetchIncidents(): Promise<IncidentSummary[]> {
  return apiClient.get<IncidentSummary[]>('/api/incidents');
}

/**
 * Fetches detailed information for a specific incident
 */
export async function fetchIncidentDetail(id: number): Promise<IncidentDetail> {
  return apiClient.get<IncidentDetail>(`/api/incidents/${id}`);
}

/**
 * Fetches AI insight for a specific incident
 */
export async function fetchIncidentInsight(
  id: number
): Promise<IncidentInsight> {
  return apiClient.get<IncidentInsight>(`/api/incidents/${id}/insights`);
}

