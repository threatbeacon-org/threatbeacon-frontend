"use client";

import React from "react";

export default function AiInsightCard({ incidentId }: { incidentId?: string }) {
  return (
    <aside style={{ padding: 12, border: "1px solid #e5e7eb", borderRadius: 8, marginTop: 12 }}>
      <h3>AI Insight</h3>
      <p>Resumen generado por IA para el incidente {incidentId ?? "-"}.</p>
    </aside>
  );
}
