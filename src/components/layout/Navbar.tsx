"use client";

import React from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <header style={{ padding: 12, borderBottom: "1px solid #e5e7eb" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <strong>Threat Beacon</strong>
        <nav>
          <Link href="/">Home</Link>
        </nav>
      </div>
    </header>
  );
}
