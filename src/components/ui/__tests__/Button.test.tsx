/**
 * Button Component Tests
 */

import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Button from '../Button'

describe('Button Component', () => {
  it('renders button with children', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    fireEvent.click(screen.getByText('Click me'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('renders with primary variant by default', () => {
    render(<Button>Primary</Button>)
    const button = screen.getByText('Primary')
    expect(button).toHaveClass('bg-cyan-600')
  })

  it('renders with danger variant', () => {
    render(<Button variant="danger">Delete</Button>)
    const button = screen.getByText('Delete')
    expect(button).toHaveClass('bg-red-600')
  })

  it('renders with warning variant', () => {
    render(<Button variant="warning">Warning</Button>)
    const button = screen.getByText('Warning')
    expect(button).toHaveClass('bg-orange-600')
  })

  it('disables button when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>)
    const button = screen.getByText('Disabled')
    expect(button).toBeDisabled()
  })

  it('shows loading state when isLoading is true', () => {
    render(<Button isLoading>Submit</Button>)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
    expect(screen.queryByText('Submit')).not.toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<Button className="custom-class">Custom</Button>)
    const button = screen.getByText('Custom')
    expect(button).toHaveClass('custom-class')
  })
})

