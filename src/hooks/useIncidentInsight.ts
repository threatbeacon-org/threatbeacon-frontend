/**
 * Custom hook for fetching incident AI insight
 */

import useSWR from 'swr';
import { fetchIncidentInsight } from '@/services/incidentService';
import type { IncidentInsight } from '@/lib/api/types';

export function useIncidentInsight(id: number | null) {
  const { data, error, isLoading } = useSWR<IncidentInsight>(
    id ? `/api/incidents/${id}/insights` : null,
    id ? () => fetchIncidentInsight(id) : null,
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      shouldRetryOnError: true,
      errorRetryCount: 3,
    }
  );

  return {
    insight: data,
    isLoading,
    isError: error,
  };
}

