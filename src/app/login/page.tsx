"use client";

import CyberInput from "@/components/login/CyberInput";
import CyberRobot from "@/components/login/CyberRobot";
import LoginHeader from "@/components/login/LoginHeader";
import ParticleBackground from "@/components/login/ParticleBackground";
import { login } from "@/services/authService";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUsernameFocused, setIsUsernameFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await login(username, password);
      await new Promise((resolve) => setTimeout(resolve, 500));
      router.push("/overview");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-3 sm:p-4 md:p-6 relative overflow-hidden">
      {/* Background Effects */}
      <ParticleBackground />

      {/* Main Content - Centered */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-xs sm:max-w-md md:max-w-lg mx-auto"
      >
        {/* Login Header */}
        <div className="text-center mb-4 sm:mb-6 md:mb-8 lg:mb-12">
          <LoginHeader />
        </div>

        {/* Cyber Robot */}
        <div className="mb-4 sm:mb-6 md:mb-8 lg:mb-12 flex justify-center">
          <div className="scale-[0.6] sm:scale-75 md:scale-90 lg:scale-100">
            <CyberRobot
              isTypingUsername={isUsernameFocused || username.length > 0}
              isTypingPassword={isPasswordFocused || password.length > 0}
            />
          </div>
        </div>

        {/* Login Card - Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="w-full"
        >
          <form
            onSubmit={handleSubmit}
            className="space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10"
          >
            {/* Username Input */}
            <CyberInput
              label="USUARIO"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onFocus={() => setIsUsernameFocused(true)}
              onBlur={() => setIsUsernameFocused(false)}
              required
              autoComplete="username"
              disabled={isLoading}
              placeholder="Ingrese su usuario"
            />

            {/* Password Input */}
            <CyberInput
              label="CONTRASEÑA"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
              required
              autoComplete="current-password"
              disabled={isLoading}
              showPasswordToggle
              placeholder="Ingrese su contraseña"
            />

            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-red-600/20 border border-red-600/50 rounded-lg p-2.5 sm:p-3"
              >
                <p className="text-red-400 text-xs sm:text-sm font-cyber-body wrap-break-word">
                  {error}
                </p>
              </motion.div>
            )}

            {/* Login Button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="pt-2"
            >
              <button
                type="submit"
                disabled={isLoading}
                className="w-full relative overflow-hidden px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl font-bold text-sm sm:text-base md:text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider flex items-center justify-center gap-2 sm:gap-3"
                style={{
                  boxShadow: "0 0 25px rgba(6, 182, 212, 0.6)",
                }}
              >
                {isLoading ? (
                  <>
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="text-base sm:text-lg md:text-xl"
                    >
                      ⚙️
                    </motion.span>
                    <span className="text-xs sm:text-sm md:text-base">
                      Autenticando...
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-base sm:text-lg md:text-xl">🛡️</span>
                    <span className="text-xs sm:text-sm md:text-base">
                      INICIAR SESIÓN
                    </span>
                  </>
                )}
                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent"
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                />
              </button>
            </motion.div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
}
