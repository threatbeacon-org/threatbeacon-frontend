/**
 * Custom hook for fetching incident detail
 */

import useSWR from 'swr';
import { fetchIncidentDetail } from '@/services/incidentService';
import type { IncidentDetail } from '@/lib/api/types';

export function useIncidentDetail(id: number | null) {
  const { data, error, isLoading } = useSWR<IncidentDetail>(
    id ? `/api/incidents/${id}` : null,
    id ? () => fetchIncidentDetail(id) : null,
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      shouldRetryOnError: true,
      errorRetryCount: 3,
    }
  );

  return {
    incident: data,
    isLoading,
    isError: error,
  };
}

