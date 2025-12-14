/**
 * Authentication Service
 * Handles login validation and credential management
 */

import { apiClient } from '@/lib/api/client';
import type { RiskStatus } from '@/lib/api/types';

/**
 * Validates credentials by attempting to fetch risk status
 * T4.2.2 - Login validation with /api/risk
 */
export async function validateCredentials(
  username: string,
  password: string
): Promise<boolean> {
  try {
    // Temporarily store credentials for the test request
    const credentials = btoa(`${username}:${password}`);
    
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('auth_credentials', credentials);
    }
    
    // Test the credentials by calling /api/risk
    await apiClient.get<RiskStatus>('/api/risk');
    
    // If successful, credentials are already stored
    return true;
  } catch (error) {
    // Remove credentials if validation failed
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('auth_credentials');
    }
    return false;
  }
}

/**
 * Performs login and stores credentials on success
 */
export async function login(username: string, password: string): Promise<void> {
  const isValid = await validateCredentials(username, password);
  if (!isValid) {
    throw new Error('Invalid credentials');
  }
  // Credentials are already stored in validateCredentials
}

