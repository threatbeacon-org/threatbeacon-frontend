"use client";

/**
 * CyberRobot Component
 * Animated robot matching the design: helmet shape, eyes follow cursor, hands cover eyes
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface CyberRobotProps {
  isTypingUsername: boolean;
  isTypingPassword: boolean;
  inputPosition?: { x: number; y: number };
}

export default function CyberRobot({
  isTypingUsername,
  isTypingPassword,
  inputPosition,
}: CyberRobotProps) {
  const robotRef = useRef<HTMLDivElement>(null);
  const eyeControls = useAnimation();
  const leftHandControls = useAnimation();
  const rightHandControls = useAnimation();
  const antennaControls = useAnimation();

  // Eye following logic - calculate position based on cursor
  const [eyeOffsetX, setEyeOffsetX] = useState(0);
  const [usernameLength, setUsernameLength] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (robotRef.current && isTypingUsername) {
        const rect = robotRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        
        // Calculate relative position (limit movement)
        const deltaX = (e.clientX - centerX) / 50;
        setEyeOffsetX(Math.max(-8, Math.min(8, deltaX)));
      } else {
        setEyeOffsetX(0);
      }
    };

    if (isTypingUsername) {
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    } else {
      setEyeOffsetX(0);
    }
  }, [isTypingUsername]);

  // Hand animation when typing password
  useEffect(() => {
    if (isTypingPassword) {
      // Cover eyes animation
      leftHandControls.start({
        x: 30,
        y: -60,
        rotate: 45,
        transition: { type: "spring", stiffness: 200, damping: 15 }
      });
      rightHandControls.start({
        x: -30,
        y: -60,
        rotate: -45,
        transition: { type: "spring", stiffness: 200, damping: 15 }
      });
      eyeControls.start({
        scaleY: 0.1,
        transition: { duration: 0.2 }
      });
    } else {
      // Reset hands
      leftHandControls.start({
        x: 0,
        y: 0,
        rotate: 0,
        transition: { type: "spring", stiffness: 200, damping: 15 }
      });
      rightHandControls.start({
        x: 0,
        y: 0,
        rotate: 0,
        transition: { type: "spring", stiffness: 200, damping: 15 }
      });
      eyeControls.start({
        scaleY: 1,
        transition: { duration: 0.2 }
      });
    }
  }, [isTypingPassword, leftHandControls, rightHandControls, eyeControls]);

  // Antenna animation when typing
  useEffect(() => {
    if (isTypingUsername) {
      antennaControls.start({
        rotate: [0, -10, 10, -5, 5, 0],
        transition: { duration: 0.5, repeat: Infinity, repeatDelay: 1 }
      });
    } else {
      antennaControls.start({
        rotate: 0,
        transition: { duration: 0.3 }
      });
    }
  }, [isTypingUsername, antennaControls]);

  return (
    <div ref={robotRef} className="relative w-64 h-64 mx-auto mb-6">
      {/* Glow effect behind robot */}
      <motion.div
        className="absolute inset-0 rounded-full bg-cyan-500/20 blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      <svg viewBox="0 0 200 200" className="w-full h-full relative z-10">
        {/* Definitions for glow effect */}
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Antenna */}
        <motion.g animate={antennaControls} style={{ transformOrigin: "100px 40px" }}>
          <line
            x1="100"
            y1="40"
            x2="100"
            y2="15"
            stroke="#06b6d4"
            strokeWidth="4"
            strokeLinecap="round"
            filter="url(#glow)"
          />
          <motion.circle
            cx="100"
            cy="10"
            r="6"
            fill="#06b6d4"
            animate={{
              opacity: [1, 0.5, 1],
            }}
            transition={{ duration: 1, repeat: Infinity }}
            filter="url(#glow)"
          />
        </motion.g>

        {/* Head - Helmet shape */}
        <motion.path
          d="M50 90 Q50 40 100 40 Q150 40 150 90 L150 120 Q150 140 130 145 L70 145 Q50 140 50 120 Z"
          fill="#1e293b"
          stroke="#06b6d4"
          strokeWidth="2"
          animate={isTypingUsername || isTypingPassword ? {
            filter: [
              "drop-shadow(0 0 10px rgba(6, 182, 212, 0.3))",
              "drop-shadow(0 0 20px rgba(6, 182, 212, 0.5))",
              "drop-shadow(0 0 10px rgba(6, 182, 212, 0.3))"
            ]
          } : {}}
          transition={{ duration: 0.5, repeat: Infinity }}
          filter="url(#glow)"
        />

        {/* Visor */}
        <motion.rect
          x="60"
          y="65"
          width="80"
          height="40"
          rx="10"
          fill="#0f172a"
          stroke="#06b6d4"
          strokeWidth="2"
        />

        {/* Left Eye */}
        <motion.g animate={eyeControls}>
          <motion.circle
            cx={80 + (isTypingUsername ? eyeOffsetX : 0)}
            cy="85"
            r="12"
            fill="#06b6d4"
            animate={{
              filter: [
                "drop-shadow(0 0 5px rgba(6, 182, 212, 0.8))",
                "drop-shadow(0 0 10px rgba(6, 182, 212, 1))",
                "drop-shadow(0 0 5px rgba(6, 182, 212, 0.8))"
              ]
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <motion.circle
            cx={80 + (isTypingUsername ? eyeOffsetX : 0)}
            cy="85"
            r="5"
            fill="#000000"
          />
          <motion.circle
            cx={82 + (isTypingUsername ? eyeOffsetX : 0)}
            cy="83"
            r="2"
            fill="#ffffff"
          />
        </motion.g>

        {/* Right Eye */}
        <motion.g animate={eyeControls}>
          <motion.circle
            cx={120 + (isTypingUsername ? eyeOffsetX : 0)}
            cy="85"
            r="12"
            fill="#06b6d4"
            animate={{
              filter: [
                "drop-shadow(0 0 5px rgba(6, 182, 212, 0.8))",
                "drop-shadow(0 0 10px rgba(6, 182, 212, 1))",
                "drop-shadow(0 0 5px rgba(6, 182, 212, 0.8))"
              ]
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <motion.circle
            cx={120 + (isTypingUsername ? eyeOffsetX : 0)}
            cy="85"
            r="5"
            fill="#000000"
          />
          <motion.circle
            cx={122 + (isTypingUsername ? eyeOffsetX : 0)}
            cy="83"
            r="2"
            fill="#ffffff"
          />
        </motion.g>

        {/* Mouth / Speaker grill */}
        <g>
          {[0, 1, 2].map((i) => (
            <motion.rect
              key={i}
              x="85"
              y={120 + i * 6}
              width="30"
              height="3"
              rx="1.5"
              fill="#06b6d4"
              opacity={0.6}
              animate={isTypingUsername ? {
                opacity: [0.3, 0.8, 0.3],
                scaleX: [1, 1.1, 1]
              } : {}}
              transition={{ duration: 0.3, delay: i * 0.1, repeat: Infinity }}
            />
          ))}
        </g>

        {/* Body */}
        <motion.rect
          x="65"
          y="150"
          width="70"
          height="40"
          rx="8"
          fill="#1e293b"
          stroke="#06b6d4"
          strokeWidth="2"
          filter="url(#glow)"
        />

        {/* Chest light - Green */}
        <motion.circle
          cx="100"
          cy="170"
          r="8"
          fill="#00ff8a"
          animate={{
            opacity: [0.5, 1, 0.5],
            filter: [
              "drop-shadow(0 0 5px rgba(0, 255, 138, 0.8))",
              "drop-shadow(0 0 15px rgba(0, 255, 138, 1))",
              "drop-shadow(0 0 5px rgba(0, 255, 138, 0.8))"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Left Arm */}
        <motion.g animate={leftHandControls} style={{ transformOrigin: "55px 160px" }}>
          <motion.rect
            x="35"
            y="155"
            width="25"
            height="12"
            rx="6"
            fill="#1e293b"
            stroke="#06b6d4"
            strokeWidth="2"
            filter="url(#glow)"
          />
          {/* Left Hand */}
          <motion.circle
            cx="30"
            cy="161"
            r="10"
            fill="#1e293b"
            stroke="#06b6d4"
            strokeWidth="2"
            filter="url(#glow)"
          />
        </motion.g>

        {/* Right Arm */}
        <motion.g animate={rightHandControls} style={{ transformOrigin: "145px 160px" }}>
          <motion.rect
            x="140"
            y="155"
            width="25"
            height="12"
            rx="6"
            fill="#1e293b"
            stroke="#06b6d4"
            strokeWidth="2"
            filter="url(#glow)"
          />
          {/* Right Hand */}
          <motion.circle
            cx="170"
            cy="161"
            r="10"
            fill="#1e293b"
            stroke="#06b6d4"
            strokeWidth="2"
            filter="url(#glow)"
          />
        </motion.g>

        {/* Circuit patterns on helmet */}
        <g stroke="#06b6d4" strokeWidth="1" opacity="0.4">
          <path d="M60 55 L75 55 L75 60" fill="none" />
          <path d="M140 55 L125 55 L125 60" fill="none" />
          <circle cx="60" cy="55" r="2" fill="#06b6d4" />
          <circle cx="140" cy="55" r="2" fill="#06b6d4" />
        </g>
      </svg>

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cyan-500 rounded-full"
          style={{
            left: `${20 + Math.random() * 60}%`,
            top: `${20 + Math.random() * 60}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        />
      ))}
    </div>
  );
}
