import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono, Orbitron } from "next/font/google";
import SWRProvider from "@/components/providers/SWRProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "ThreatBeacon - SOC Dashboard",
  description: "Security Operations Center Dashboard for ThreatBeacon",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${jetbrainsMono.variable} ${orbitron.variable} antialiased`}
      >
        <SWRProvider>{children}</SWRProvider>
      </body>
    </html>
  );
}
