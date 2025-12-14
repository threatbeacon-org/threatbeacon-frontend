/**
 * Custom hook for fetching and polling risk status
 * Uses SWR for automatic revalidation and caching
 */

import useSWR from 'swr';
import { fetchRiskStatus } from '@/services/riskService';
import type { RiskStatus } from '@/lib/api/types';

const POLLING_INTERVAL = 5000; // 5 seconds

export function useRiskStatus() {
  const { data, error, isLoading, mutate } = useSWR<RiskStatus>(
    '/api/risk',
    fetchRiskStatus,
    {
      refreshInterval: POLLING_INTERVAL,
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      shouldRetryOnError: true,
      errorRetryCount: 3,
      errorRetryInterval: 2000,
    }
  );

  return {
    riskStatus: data,
    isLoading,
    isError: error,
    refresh: mutate,
  };
}




