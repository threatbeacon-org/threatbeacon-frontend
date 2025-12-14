/**
 * Event Service
 * Handles event ingestion API calls
 */

import { apiClient } from '@/lib/api/client';
import { EventData } from '@/lib/api/types';

/**
 * Ingests a new attack event
 */
export async function ingestEvent(eventData: EventData): Promise<string> {
  return await apiClient.post<string>('/api/events', eventData);
}
