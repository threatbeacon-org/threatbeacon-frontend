/**
 * Centralized API Client
 * Handles Basic Auth, error handling, and 401 redirects
 * 
 * T4.1.1 - Centralized API client implementation
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

/**
 * Retrieves stored credentials from sessionStorage
 */
function getStoredCredentials(): string | null {
  if (typeof window === 'undefined') return null;
  return sessionStorage.getItem('auth_credentials');
}

/**
 * Builds Authorization header from stored credentials
 */
function getAuthHeader(): string | null {
  const credentials = getStoredCredentials();
  if (!credentials) return null;
  return `Basic ${credentials}`;
}

/**
 * Handles 401 Unauthorized responses by redirecting to login
 */
function handleUnauthorized(): void {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem('auth_credentials');
    window.location.href = '/login';
  }
}

/**
 * Generic API request function
 */
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const authHeader = getAuthHeader();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (authHeader) {
    headers['Authorization'] = authHeader;
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (response.status === 401) {
      handleUnauthorized();
      throw new Error('Unauthorized');
    }

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error');
      throw new Error(`API Error: ${response.status} - ${errorText}`);
    }

    // Handle empty responses
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }
    
    return {} as T;
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      throw error;
    }
    throw new Error(`Network error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * API Client with convenience methods
 */
export const apiClient = {
  /**
   * GET request
   */
  get: <T>(endpoint: string): Promise<T> => {
    return apiRequest<T>(endpoint, { method: 'GET' });
  },

  /**
   * POST request
   */
  post: <T>(endpoint: string, data?: unknown): Promise<T> => {
    return apiRequest<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  },

  /**
   * PUT request
   */
  put: <T>(endpoint: string, data?: unknown): Promise<T> => {
    return apiRequest<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  },

  /**
   * DELETE request
   */
  delete: <T>(endpoint: string): Promise<T> => {
    return apiRequest<T>(endpoint, { method: 'DELETE' });
  },
};

/**
 * Stores credentials in sessionStorage after successful login
 */
export function storeCredentials(username: string, password: string): void {
  if (typeof window === 'undefined') return;
  const credentials = btoa(`${username}:${password}`);
  sessionStorage.setItem('auth_credentials', credentials);
}

/**
 * Clears stored credentials (logout)
 */
export function clearCredentials(): void {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem('auth_credentials');
}

/**
 * Checks if user is authenticated
 */
export function isAuthenticated(): boolean {
  return getStoredCredentials() !== null;
}

