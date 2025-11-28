"use client";

import React from "react";
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside style={{ width: 240, borderRight: "1px solid #e5e7eb", padding: 12 }}>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li>
          <Link href="/dashboard/overview">Overview</Link>
        </li>
        <li>
          <Link href="/dashboard/incidents">Incidents</Link>
        </li>
        <li>
          <Link href="/dashboard/config">Config</Link>
        </li>
      </ul>
    </aside>
  );
}
