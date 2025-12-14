/**
 * RiskHero Component Tests
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import RiskHero from '../RiskHero'
import { useRiskStatus } from '@/hooks/useRiskStatus'

// Mock the hook
jest.mock('@/hooks/useRiskStatus')

describe('RiskHero Component', () => {
  const mockUseRiskStatus = useRiskStatus as jest.MockedFunction<
    typeof useRiskStatus
  >

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('shows loading state', () => {
    mockUseRiskStatus.mockReturnValue({
      riskStatus: null,
      isLoading: true,
      isError: false,
      refresh: jest.fn(),
    })

    const { container } = render(<RiskHero />)
    // Check for loading skeleton elements
    expect(container.querySelector('.animate-pulse')).toBeInTheDocument()
  })

  it('displays NORMAL risk level', () => {
    mockUseRiskStatus.mockReturnValue({
      riskStatus: {
        level: 'NORMAL',
        buzzerMuted: false,
        lastUpdated: new Date().toISOString(),
      },
      isLoading: false,
      isError: false,
      refresh: jest.fn(),
    })

    render(<RiskHero />)
    expect(screen.getByText('NORMAL')).toBeInTheDocument()
  })

  it('displays CRITICAL risk level', () => {
    mockUseRiskStatus.mockReturnValue({
      riskStatus: {
        level: 'CRITICAL',
        buzzerMuted: false,
        lastUpdated: new Date().toISOString(),
      },
      isLoading: false,
      isError: false,
      refresh: jest.fn(),
    })

    render(<RiskHero />)
    expect(screen.getByText('CRITICAL')).toBeInTheDocument()
  })

  it('shows buzzer muted badge when muted', () => {
    mockUseRiskStatus.mockReturnValue({
      riskStatus: {
        level: 'SUSPICIOUS',
        buzzerMuted: true,
        lastUpdated: new Date().toISOString(),
      },
      isLoading: false,
      isError: false,
      refresh: jest.fn(),
    })

    render(<RiskHero />)
    expect(screen.getByText(/buzzer muted/i)).toBeInTheDocument()
  })

  it('displays error message on error', () => {
    mockUseRiskStatus.mockReturnValue({
      riskStatus: null,
      isLoading: false,
      isError: new Error('Failed to fetch'),
      refresh: jest.fn(),
    })

    render(<RiskHero />)
    expect(screen.getByText(/error loading risk status/i)).toBeInTheDocument()
  })
})

