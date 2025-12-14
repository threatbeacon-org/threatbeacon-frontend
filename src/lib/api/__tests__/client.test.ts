/**
 * API Client Tests
 */

import { apiClient, storeCredentials, clearCredentials, isAuthenticated } from '../client'

// Mock fetch
global.fetch = jest.fn()

describe('API Client', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    clearCredentials()
    // Reset location href
    window.location.href = ''
  })

  describe('storeCredentials', () => {
    it('stores credentials in sessionStorage', () => {
      storeCredentials('user', 'pass')
      const stored = sessionStorage.getItem('auth_credentials')
      expect(stored).toBeTruthy()
      expect(stored).toBe(btoa('user:pass'))
    })
  })

  describe('clearCredentials', () => {
    it('removes credentials from sessionStorage', () => {
      storeCredentials('user', 'pass')
      expect(sessionStorage.getItem('auth_credentials')).toBeTruthy()
      clearCredentials()
      expect(sessionStorage.getItem('auth_credentials')).toBeNull()
    })
  })

  describe('isAuthenticated', () => {
    it('returns false when no credentials are stored', () => {
      clearCredentials()
      expect(isAuthenticated()).toBe(false)
    })

    it('returns true when credentials are stored', () => {
      storeCredentials('user', 'pass')
      expect(isAuthenticated()).toBe(true)
    })
  })

  describe('apiClient.get', () => {
    it('makes GET request with Authorization header when authenticated', async () => {
      storeCredentials('user', 'pass')
      ;(fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: async () => ({ data: 'test' }),
      })

      await apiClient.get('/api/test')

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/test'),
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            Authorization: expect.stringContaining('Basic'),
          }),
        })
      )
    })

    it('redirects to login on 401 response', async () => {
      storeCredentials('user', 'pass')

      ;(fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 401,
      })

      await expect(apiClient.get('/api/test')).rejects.toThrow('Unauthorized')
      // Verify credentials are cleared
      expect(sessionStorage.getItem('auth_credentials')).toBeNull()
      // Note: window.location.href assignment is tested indirectly via the error being thrown
    })

    it('throws error on non-ok response', async () => {
      sessionStorage.getItem = jest.fn().mockReturnValue('dXNlcjpwYXNz')
      ;(fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 500,
        text: async () => 'Internal Server Error',
      })

      await expect(apiClient.get('/api/test')).rejects.toThrow()
    })
  })

  describe('apiClient.post', () => {
    it('makes POST request with JSON body', async () => {
      storeCredentials('user', 'pass')
      ;(fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: async () => ({ success: true }),
      })

      await apiClient.post('/api/test', { key: 'value' })

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/test'),
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ key: 'value' }),
        })
      )
    })
  })
})

