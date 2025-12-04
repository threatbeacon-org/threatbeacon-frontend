"use client";

import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

export default function LoginHeader() {
  return (
    <div className="text-center">
      {/* Badge "SISTEMA SEGURO" */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full border border-cyan-500/50 bg-cyan-500/10 backdrop-blur-sm"
        style={{
          boxShadow: '0 0 15px rgba(6, 182, 212, 0.3)',
        }}
      >
        <Shield className="w-4 h-4 text-cyan-400" />
        <span className="text-xs font-cyber-body text-cyan-400 uppercase tracking-wider">
          SISTEMA SEGURO
        </span>
      </motion.div>

      {/* Title "CYBERSEC" */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-6xl font-bold mb-3 font-cyber-title"
        style={{
          textShadow: '0 0 30px rgba(6, 182, 212, 0.5)',
        }}
      >
        <span className="text-white" style={{ textShadow: '0 0 20px rgba(6, 182, 212, 0.8)' }}>
        Threat
        </span>
        <span className="text-green-400 ml-2" style={{ textShadow: '0 0 20px rgba(0, 255, 138, 0.8)' }}>
        Beacon
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-sm text-cyan-400/70 font-cyber-body"
      >
        Autenticación de alta seguridad para tu empresa.
      </motion.p>
    </div>
  );
}

