"use client";

import React from "react";
import AiInsightCard from "@/components/dashboard/AiInsightCard";

export default function IncidentDetail({ params }: { params: { id: string } }) {
  return (
    <div>
      <h2>Incident {params.id}</h2>
      <p>Detalles del incidente (contenido de ejemplo).</p>
      <AiInsightCard incidentId={params.id} />
    </div>
  );
}
