"use client";

import { motion } from "framer-motion";
import { InputHTMLAttributes, forwardRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Eye, EyeOff, User, Lock } from "lucide-react";

interface CyberInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: "user" | "lock";
  showPasswordToggle?: boolean;
}

export const CyberInput = forwardRef<HTMLInputElement, CyberInputProps>(
  ({ label, icon, type, showPasswordToggle, className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const inputType = showPasswordToggle ? (showPassword ? "text" : "password") : type;
    const Icon = icon === "user" ? User : icon === "lock" ? Lock : null;

    return (
      <motion.div
        className="relative w-full"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <label className="block text-xs sm:text-sm md:text-base font-semibold text-slate-300 uppercase tracking-wider mb-2 sm:mb-3 md:mb-4 font-cyber-body">
          {label}
        </label>
        <div className="relative">
          
          <motion.div
            className="absolute -inset-1 rounded-xl bg-cyan-500/20 blur-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: isFocused ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
          
          <div className="relative flex items-center">
            <input
              ref={ref}
              type={inputType}
              className={cn(
                "cyber-input w-full px-4 sm:px-5 md:px-6 py-4 sm:py-5 md:py-6",
                showPasswordToggle && "pr-10 sm:pr-12 md:pr-14",
                "bg-slate-800/60 border-2 border-cyan-500/30 rounded-xl",
                "text-slate-100 placeholder-slate-500",
                "focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20",
                "transition-all duration-300",
                "font-cyber-body text-sm sm:text-base md:text-lg",
                className
              )}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              {...props}
            />

            {showPasswordToggle && (
              <button
                type="button"
                className="absolute right-3 sm:right-4 md:right-5 z-10 text-slate-400 hover:text-cyan-400 transition-colors p-1"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} className="sm:w-5 sm:h-5" /> : <Eye size={18} className="sm:w-5 sm:h-5" />}
              </button>
            )}
          </div>
          {/* Animated border */}
          <motion.div
            className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-cyan-500 via-teal-500 to-cyan-500"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isFocused ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            style={{ transformOrigin: "left" }}
          />
        </div>
      </motion.div>
    );
  }
);

CyberInput.displayName = "CyberInput";

export default CyberInput;
