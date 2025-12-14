/**
 * Input Component Tests
 */

import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Input from '../Input'

describe('Input Component', () => {
  it('renders input without label', () => {
    render(<Input />)
    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()
  })

  it('renders input with label', () => {
    render(<Input label="Username" />)
    expect(screen.getByText('Username')).toBeInTheDocument()
    expect(screen.getByLabelText('Username')).toBeInTheDocument()
  })

  it('handles value changes', () => {
    const handleChange = jest.fn()
    render(<Input onChange={handleChange} />)
    
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'test' } })
    
    expect(handleChange).toHaveBeenCalled()
  })

  it('displays error message when error prop is provided', () => {
    render(<Input error="This field is required" />)
    expect(screen.getByText('This field is required')).toBeInTheDocument()
  })

  it('applies error styling when error exists', () => {
    render(<Input error="Error message" />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveClass('border-red-500')
  })

  it('renders password input type', () => {
    render(<Input type="password" />)
    const input = document.querySelector('input[type="password"]')
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('type', 'password')
  })

  it('disables input when disabled prop is true', () => {
    render(<Input disabled />)
    const input = screen.getByRole('textbox')
    expect(input).toBeDisabled()
  })
})

