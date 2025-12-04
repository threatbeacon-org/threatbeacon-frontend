/**
 * Risk Service
 * Handles all risk-related API calls
 */

import { apiClient } from '@/lib/api/client';
import type { RiskStatus } from '@/lib/api/types';
import { mockRiskStatus } from '@/lib/mockData';

const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true' || 
                      (typeof window !== 'undefined' && !process.env.NEXT_PUBLIC_API_BASE_URL);

/**
 * Fetches current risk status
 */
export async function fetchRiskStatus(): Promise<RiskStatus> {
  if (USE_MOCK_DATA) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return { ...mockRiskStatus, lastUpdated: new Date().toISOString() };
  }
  
  try {
    return await apiClient.get<RiskStatus>('/api/risk');
  } catch (error) {
    // Fallback to mock data if API fails
    console.warn('API call failed, using mock data:', error);
    return { ...mockRiskStatus, lastUpdated: new Date().toISOString() };
  }
}

/**
 * Mutes the buzzer
 */
export async function muteBuzzer(): Promise<void> {
  if (USE_MOCK_DATA) {
    await new Promise(resolve => setTimeout(resolve, 300));
    return;
  }
  
  try {
    return await apiClient.post<void>('/api/beacon/mute');
  } catch (error) {
    console.warn('API call failed:', error);
    throw error;
  }
}

