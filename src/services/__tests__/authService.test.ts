/**
 * Auth Service Tests
 */

import { login, validateCredentials } from '../authService'
import { apiClient } from '@/lib/api/client'

// Mock the API client
jest.mock('@/lib/api/client', () => ({
  apiClient: {
    get: jest.fn(),
  },
  storeCredentials: jest.fn(),
}))

describe('Auth Service', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    sessionStorage.clear()
  })

  describe('validateCredentials', () => {
    it('returns true when credentials are valid', async () => {
      ;(apiClient.get as jest.Mock).mockResolvedValueOnce({
        level: 'NORMAL',
        buzzerMuted: false,
        lastUpdated: new Date().toISOString(),
      })

      sessionStorage.clear()

      const result = await validateCredentials('user', 'pass')
      expect(result).toBe(true)
      expect(apiClient.get).toHaveBeenCalledWith('/api/risk')
    })

    it('returns false when credentials are invalid', async () => {
      ;(apiClient.get as jest.Mock).mockRejectedValueOnce(
        new Error('Unauthorized')
      )

      const result = await validateCredentials('user', 'wrongpass')
      expect(result).toBe(false)
      expect(sessionStorage.getItem('auth_credentials')).toBeNull()
    })
  })

  describe('login', () => {
    it('succeeds with valid credentials', async () => {
      ;(apiClient.get as jest.Mock).mockResolvedValueOnce({
        level: 'NORMAL',
        buzzerMuted: false,
        lastUpdated: new Date().toISOString(),
      })

      sessionStorage.clear()

      await expect(login('user', 'pass')).resolves.not.toThrow()
    })

    it('throws error with invalid credentials', async () => {
      ;(apiClient.get as jest.Mock).mockRejectedValueOnce(
        new Error('Unauthorized')
      )

      await expect(login('user', 'wrongpass')).rejects.toThrow(
        'Invalid credentials'
      )
    })
  })
})

