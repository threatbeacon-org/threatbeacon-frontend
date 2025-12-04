"use client";

/**
 * Eye Animation Component
 * Cybersecurity-themed animation that covers eyes when password is being typed
 */

import React, { useState, useEffect } from 'react';

interface EyeAnimationProps {
  isPasswordFocused: boolean;
  hasPassword: boolean;
}

export default function EyeAnimation({ isPasswordFocused, hasPassword }: EyeAnimationProps) {
  const [showEyes, setShowEyes] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isPasswordFocused || hasPassword) {
      setIsAnimating(true);
      // Delay before covering eyes
      const timer = setTimeout(() => {
        setShowEyes(false);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      // Show eyes again when password field is empty and not focused
      setShowEyes(true);
      setIsAnimating(false);
    }
  }, [isPasswordFocused, hasPassword]);

  return (
    <div className="flex items-center justify-center mb-6">
      <div className="relative w-32 h-32">
        {/* Face/Head */}
        <div className="absolute inset-0 bg-slate-800 rounded-full border-2 border-cyan-500/30 flex items-center justify-center">
          {/* Eyes Container */}
          <div className="flex items-center gap-6 mt-2">
            {/* Left Eye */}
            <div className="relative">
              {showEyes ? (
                <div className="w-8 h-8 bg-cyan-400 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-slate-900 rounded-full"></div>
                </div>
              ) : (
                <div className="w-8 h-8 flex items-center justify-center">
                  <span className="text-2xl">👁️</span>
                </div>
              )}
            </div>
            
            {/* Right Eye */}
            <div className="relative">
              {showEyes ? (
                <div className="w-8 h-8 bg-cyan-400 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-slate-900 rounded-full"></div>
                </div>
              ) : (
                <div className="w-8 h-8 flex items-center justify-center">
                  <span className="text-2xl">👁️</span>
                </div>
              )}
            </div>
          </div>

          {/* Hands covering eyes animation */}
          {(isPasswordFocused || hasPassword) && !showEyes && (
            <div className="absolute inset-0 flex items-center justify-center animate-fade-in">
              <div className="flex items-center gap-8 mt-2">
                <span className="text-4xl animate-pulse">🤚</span>
                <span className="text-4xl animate-pulse">🤚</span>
              </div>
            </div>
          )}

          {/* Cyber grid background effect */}
          <div className="absolute inset-0 cyber-grid opacity-20 rounded-full"></div>
        </div>

        {/* Scan line effect when typing */}
        {isPasswordFocused && (
          <div className="absolute inset-0 scan-line rounded-full"></div>
        )}
      </div>
    </div>
  );
}

