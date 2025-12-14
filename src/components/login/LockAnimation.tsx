"use client";

/**
 * Lock Animation Component
 * Professional cybersecurity-themed lock animation
 * Lock opens as user types credentials and fully opens on successful login
 */

import React, { useState, useEffect } from 'react';

interface LockAnimationProps {
  hasUsername: boolean;
  hasPassword: boolean;
  isPasswordFocused: boolean;
  isLoggingIn: boolean;
  loginSuccess: boolean;
}

export default function LockAnimation({
  hasUsername,
  hasPassword,
  isPasswordFocused,
  isLoggingIn,
  loginSuccess,
}: LockAnimationProps) {
  const [lockState, setLockState] = useState<'closed' | 'opening' | 'open'>('closed');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Calculate progress based on form completion
    let newProgress = 0;
    if (hasUsername) newProgress += 33;
    if (hasPassword) newProgress += 33;
    if (isPasswordFocused) newProgress += 10;
    if (isLoggingIn) newProgress = 90;
    if (loginSuccess) newProgress = 100;

    setProgress(newProgress);

    // Update lock state based on progress
    if (loginSuccess) {
      setLockState('open');
    } else if (newProgress >= 66) {
      setLockState('opening');
    } else {
      setLockState('closed');
    }
  }, [hasUsername, hasPassword, isPasswordFocused, isLoggingIn, loginSuccess]);

  const lockRotation = lockState === 'open' ? 45 : lockState === 'opening' ? progress * 0.45 : 0;
  const shackleOpen = lockState === 'open' ? 20 : lockState === 'opening' ? progress * 0.2 : 0;

  return (
    <div className="flex flex-col items-center justify-center mb-8">
      {/* Lock Container */}
      <div className="relative w-40 h-40 mb-4">
        {/* Glow effect when opening */}
        {(lockState === 'opening' || lockState === 'open') && (
          <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-xl animate-pulse"></div>
        )}

        {/* Lock Body */}
        <div className="relative w-40 h-40 flex items-center justify-center">
          {/* Shackle (U-shaped part) */}
          <svg
            className="absolute top-0 left-1/2 -translate-x-1/2 transition-all duration-500"
            width="80"
            height="60"
            viewBox="0 0 80 60"
            style={{
              transform: `translateX(-50%) translateY(${-shackleOpen}px)`,
            }}
          >
            <path
              d="M 20 20 Q 20 10, 30 10 L 50 10 Q 60 10, 60 20 L 60 40"
              stroke={lockState === 'open' ? '#06b6d4' : '#64748b'}
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              className="transition-colors duration-500"
            />
          </svg>

          {/* Lock Body */}
          <div
            className={`
              w-24 h-24 rounded-lg border-4
              flex items-center justify-center
              transition-all duration-500
              ${
                lockState === 'open'
                  ? 'border-cyan-500 bg-cyan-500/20'
                  : lockState === 'opening'
                  ? 'border-cyan-400/50 bg-cyan-500/10'
                  : 'border-slate-600 bg-slate-800'
              }
            `}
            style={{
              transform: `rotate(${lockRotation}deg)`,
            }}
          >
            {/* Keyhole */}
            <div className="relative">
              {lockState === 'open' ? (
                <div className="text-cyan-400 text-3xl animate-pulse">✓</div>
              ) : (
                <div
                  className={`
                    w-6 h-8 rounded-full border-2
                    transition-colors duration-500
                    ${
                      lockState === 'opening'
                        ? 'border-cyan-400'
                        : 'border-slate-500'
                    }
                  `}
                >
                  <div
                    className={`
                      w-2 h-2 rounded-full mx-auto mt-2
                      transition-colors duration-500
                      ${
                        lockState === 'opening'
                          ? 'bg-cyan-400'
                          : 'bg-slate-500'
                      }
                    `}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Scan line effect when typing */}
          {(isPasswordFocused || hasPassword) && lockState !== 'open' && (
            <div className="absolute inset-0 scan-line rounded-lg"></div>
          )}
        </div>

        {/* Progress indicator */}
        {lockState !== 'closed' && (
          <div className="mt-4 w-32">
            <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-slate-400 text-center mt-2 font-technical">
              {progress}% Secure
            </p>
          </div>
        )}

        {/* Status text */}
        <div className="mt-2 text-center">
          {lockState === 'open' && (
            <p className="text-sm text-cyan-400 font-medium animate-fade-in">
              Access Granted
            </p>
          )}
          {lockState === 'opening' && !isLoggingIn && (
            <p className="text-sm text-slate-400 font-medium">
              Unlocking...
            </p>
          )}
          {isLoggingIn && (
            <p className="text-sm text-cyan-400 font-medium animate-pulse">
              Authenticating...
            </p>
          )}
          {lockState === 'closed' && (
            <p className="text-sm text-slate-500 font-medium">
              Enter credentials
            </p>
          )}
        </div>
      </div>
    </div>
  );
}




