/**
 * Custom hook for fetching and polling risk status
 * Uses SWR for automatic revalidation and caching
 */

import useSWR from 'swr';
import { fetchRiskStatus } from '@/services/riskService';
import { RiskStatus } from '@/lib/api/types';

const POLLING_INTERVAL = 5000; // 5 seconds

export function useRiskStatus() {
  const { data, error, isLoading, mutate } = useSWR(
    '/api/risk',
    fetchRiskStatus,
    {
      refreshInterval: POLLING_INTERVAL,
      revalidateOnFocus: true,
    }
  );

  // Transform backend response to match frontend expectations
  const transformedData: RiskStatus | null = data ? {
    level: data.level,
    buzzerMuted: data.buzzerMuted,
    lastUpdated: data.timestamp, // Map timestamp to lastUpdated for existing components
  } : null;

  return {
    riskStatus: transformedData,
    isLoading,
    isError: !!error,
    refresh: mutate,
  };
}




