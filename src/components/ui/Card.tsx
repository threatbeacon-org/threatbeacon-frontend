/**
 * Card Component
 * Reusable card container with consistent styling
 */

import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
}

export default function Card({ children, className = '', title, subtitle }: CardProps) {
  return (
    <div
      className={`
        bg-slate-800 border border-slate-700 rounded-lg p-3 sm:p-4 md:p-6
        shadow-lg w-full
        ${className}
      `}
    >
      {(title || subtitle) && (
        <div className="mb-3 sm:mb-4">
          {title && (
            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-1 break-words">{title}</h3>
          )}
          {subtitle && (
            <p className="text-xs sm:text-sm text-slate-400 break-words">{subtitle}</p>
          )}
        </div>
      )}
      {children}
    </div>
  );
}


