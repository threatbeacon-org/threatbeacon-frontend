"use client";

/**
 * ParticleBackground Component
 * Animated background with particles, grid, scan line, and HUD decorations
 */

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  delay: number;
  duration: number;
}

export default function ParticleBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Generate random particles only on client side
    const generatedParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 10,
    }));
    setParticles(generatedParticles);
  }, []);

  if (!isClient) {
    // Return empty div on server side to prevent hydration mismatch
    return <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" />;
  }

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Grid Pattern */}
      <div className="absolute inset-0 cyber-grid opacity-10"></div>

      {/* Floating Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-cyan-500 rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [-20, -100],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Scan Line */}
      <motion.div
        className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
        style={{ top: '50%' }}
        animate={{
          y: [-500, 500],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* HUD Corner Decorations */}
      {/* Top Left */}
      <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-cyan-500/30">
        <div className="absolute top-2 left-2 w-2 h-2 bg-cyan-500 animate-pulse"></div>
        <div className="absolute top-6 left-2 text-xs text-cyan-400/50 font-cyber-body">
          SYSTEM
        </div>
      </div>

      {/* Top Right */}
      <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-cyan-500/30">
        <div className="absolute top-2 right-2 w-2 h-2 bg-green-500 animate-pulse"></div>
        <div className="absolute top-6 right-2 text-xs text-green-400/50 font-cyber-body text-right">
          SECURE
        </div>
      </div>

      {/* Bottom Left */}
      <div className="absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-cyan-500/30">
        <div className="absolute bottom-6 left-2 text-xs text-cyan-400/50 font-cyber-body">
          [ENCRYPTED]
        </div>
      </div>

      {/* Bottom Right */}
      <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-cyan-500/30">
        <div className="absolute bottom-6 right-2 text-xs text-cyan-400/50 font-cyber-body text-right">
          256-bit SSL
        </div>
      </div>
    </div>
  );
}

