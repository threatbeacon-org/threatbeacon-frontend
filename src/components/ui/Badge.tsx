/**
 * Badge Component
 * Status indicators and labels
 */

import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  size?: 'sm' | 'md';
  className?: string;
}

export default function Badge({
  children,
  variant = 'neutral',
  size = 'md',
  className = '',
}: BadgeProps) {
  const variantStyles: Record<NonNullable<BadgeProps['variant']>, string> = {
    success: 'bg-green-600/20 text-green-400 border-green-500/50',
    warning: 'bg-orange-600/20 text-orange-400 border-orange-500/50',
    danger: 'bg-red-600/20 text-red-400 border-red-500/50',
    info: 'bg-cyan-600/20 text-cyan-400 border-cyan-500/50',
    neutral: 'bg-slate-700/50 text-slate-300 border-slate-600/50',
  };

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  };

  return (
    <span
      className={`
        inline-flex items-center font-medium rounded-md border
        ${variant ? variantStyles[variant] : variantStyles.neutral}
        ${sizeStyles[size]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}

