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
import { mockIncidents, mockIncidentDetail, mockIncidentInsight } from '@/lib/mockData';

const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true' || 
                      (typeof window !== 'undefined' && !process.env.NEXT_PUBLIC_API_BASE_URL);

/**
 * Fetches list of incident summaries
 */
export async function fetchIncidents(): Promise<IncidentSummary[]> {
  if (USE_MOCK_DATA) {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [...mockIncidents];
  }
  
  try {
    return await apiClient.get<IncidentSummary[]>('/api/incidents');
  } catch (error) {
    console.warn('API call failed, using mock data:', error);
    return [...mockIncidents];
  }
}

/**
 * Fetches detailed information for a specific incident
 */
export async function fetchIncidentDetail(id: number): Promise<IncidentDetail> {
  if (USE_MOCK_DATA) {
    await new Promise(resolve => setTimeout(resolve, 400));
    return { ...mockIncidentDetail, id };
  }
  
  try {
    return await apiClient.get<IncidentDetail>(`/api/incidents/${id}`);
  } catch (error) {
    console.warn('API call failed, using mock data:', error);
    return { ...mockIncidentDetail, id };
  }
}

/**
 * Fetches AI insight for a specific incident
 */
export async function fetchIncidentInsight(
  id: number
): Promise<IncidentInsight> {
  if (USE_MOCK_DATA) {
    await new Promise(resolve => setTimeout(resolve, 600));
    return { ...mockIncidentInsight };
  }
  
  try {
    return await apiClient.get<IncidentInsight>(`/api/incidents/${id}/insights`);
  } catch (error) {
    console.warn('API call failed, using mock data:', error);
    return { ...mockIncidentInsight };
  }
}

