/**
 * Mock Services for Development
 * Use these when backend endpoints are unavailable (e.g., 500 errors)
 * 
 * USAGE:
 * 1. Import from here instead of '@/services/riskService', etc.
 * 2. Or set USE_MOCK_DATA=true in .env.local
 */

import { mockRiskStatus, mockIncidents, mockIncidentDetail, mockIncidentInsight } from '@/lib/mockData';
import type { RiskStatus, IncidentSummary, IncidentDetail, IncidentInsight, EventData } from '@/lib/api/types';

// Simulate network delay
const MOCK_DELAY = 300; // ms

/**
 * Mock: Fetches current risk status
 */
export async function fetchRiskStatusMock(): Promise<RiskStatus> {
  await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
  return { ...mockRiskStatus, timestamp: new Date().toISOString() };
}

/**
 * Mock: Mutes the buzzer
 */
export async function muteBuzzerMock(): Promise<RiskStatus> {
  await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
  return {
    ...mockRiskStatus,
    buzzerMuted: true,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Mock: Stops the buzzer and resets system to normal
 */
export async function stopBuzzerMock(): Promise<RiskStatus> {
  await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
  return {
    ...mockRiskStatus,
    buzzerMuted: false,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Mock: Fetches list of incident summaries
 */
export async function fetchIncidentsMock(): Promise<IncidentSummary[]> {
  await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
  return mockIncidents;
}

/**
 * Mock: Fetches detailed information for a specific incident
 */
export async function fetchIncidentDetailMock(id: number): Promise<IncidentDetail> {
  await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
  return { ...mockIncidentDetail, id };
}

/**
 * Mock: Fetches AI insight for a specific incident
 */
export async function fetchIncidentInsightMock(id: number): Promise<IncidentInsight> {
  await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
  return { ...mockIncidentInsight, incidentId: id };
}

/**
 * Mock: Ingests a new attack event
 */
export async function ingestEventMock(eventData: EventData): Promise<string> {
  await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
  console.log('[MOCK] Event ingested:', eventData);
  return 'Event received and processed';
}
