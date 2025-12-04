/**
 * Risk Service
 * Handles all risk-related API calls
 */

import { apiClient } from '@/lib/api/client';
import type { RiskStatus } from '@/lib/api/types';

/**
 * Fetches current risk status
 */
export async function fetchRiskStatus(): Promise<RiskStatus> {
  return apiClient.get<RiskStatus>('/api/risk');
}

/**
 * Mutes the buzzer
 */
export async function muteBuzzer(): Promise<void> {
  return apiClient.post<void>('/api/beacon/mute');
}

