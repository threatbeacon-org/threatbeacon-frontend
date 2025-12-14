/**
 * Badge Component Tests
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import Badge from '../Badge'

describe('Badge Component', () => {
  it('renders badge with children', () => {
    render(<Badge>Test Badge</Badge>)
    expect(screen.getByText('Test Badge')).toBeInTheDocument()
  })

  it('renders with success variant', () => {
    render(<Badge variant="success">Success</Badge>)
    const badge = screen.getByText('Success')
    expect(badge).toHaveClass('bg-green-600/20')
    expect(badge).toHaveClass('text-green-400')
  })

  it('renders with danger variant', () => {
    render(<Badge variant="danger">Danger</Badge>)
    const badge = screen.getByText('Danger')
    expect(badge).toHaveClass('bg-red-600/20')
    expect(badge).toHaveClass('text-red-400')
  })

  it('renders with warning variant', () => {
    render(<Badge variant="warning">Warning</Badge>)
    const badge = screen.getByText('Warning')
    expect(badge).toHaveClass('bg-orange-600/20')
    expect(badge).toHaveClass('text-orange-400')
  })

  it('renders with info variant', () => {
    render(<Badge variant="info">Info</Badge>)
    const badge = screen.getByText('Info')
    expect(badge).toHaveClass('bg-cyan-600/20')
    expect(badge).toHaveClass('text-cyan-400')
  })

  it('renders with small size', () => {
    render(<Badge size="sm">Small</Badge>)
    const badge = screen.getByText('Small')
    expect(badge).toHaveClass('px-2')
    expect(badge).toHaveClass('text-xs')
  })

  it('applies custom className', () => {
    render(<Badge className="custom-badge">Custom</Badge>)
    const badge = screen.getByText('Custom')
    expect(badge).toHaveClass('custom-badge')
  })
})




