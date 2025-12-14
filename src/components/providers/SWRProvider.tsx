"use client";

/**
 * SWR Provider Component
 * Wraps the app with SWR configuration
 */

import React from 'react';
import { SWRConfig } from 'swr';

export default function SWRProvider({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig
      value={{
        revalidateOnFocus: true,
        revalidateOnReconnect: true,
        shouldRetryOnError: true,
        errorRetryCount: 3,
        errorRetryInterval: 2000,
      }}
    >
      {children}
    </SWRConfig>
  );
}




