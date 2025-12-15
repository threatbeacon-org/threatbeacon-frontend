/**
 * Incident Service
 * Handles all incident-related API calls
 */

import { apiClient } from "@/lib/api/client";
import type {
  IncidentDetail,
  IncidentInsight,
  IncidentSummary,
} from "@/lib/api/types";

/**
 * Fetches list of incident summaries
 */
export async function fetchIncidents(): Promise<IncidentSummary[]> {
  // ¡Conexión real activada!
  return await apiClient.get<IncidentSummary[]>("/api/incidents");
}

/**
 * Fetches detailed information for a specific incident
 */
export async function fetchIncidentDetail(id: number): Promise<IncidentDetail> {
  // ¡Conexión real activada!
  return await apiClient.get<IncidentDetail>(`/api/incidents/${id}`);
}

/**
 * Fetches AI insight for a specific incident
 */
export async function fetchIncidentInsight(
  id: number
): Promise<IncidentInsight> {
  return await apiClient.get<IncidentInsight>(`/api/incidents/${id}/insight`);
}
