import React from "react";
import type { Metadata } from "next";
import "../../app/globals.css";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";

export const metadata: Metadata = {
  title: "Dashboard - Threat Beacon",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <div style={{ display: "flex", minHeight: "100vh" }}>
          <Sidebar />
          <main style={{ flex: 1 }}>
            <Navbar />
            <div style={{ padding: 16 }}>{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
