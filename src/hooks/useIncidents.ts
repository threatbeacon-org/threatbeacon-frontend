/**
 * Custom hook for fetching and polling incidents
 * Uses SWR for automatic revalidation and caching
 */

import useSWR from 'swr';
import { fetchIncidents } from '@/services/incidentService';
import type { IncidentSummary } from '@/lib/api/types';

const POLLING_INTERVAL = 10000; // 10 seconds

export function useIncidents() {
  const { data, error, isLoading, mutate } = useSWR<IncidentSummary[]>(
    '/api/incidents',
    fetchIncidents,
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
    incidents: data || [],
    isLoading,
    isError: error,
    refresh: mutate,
  };
}

