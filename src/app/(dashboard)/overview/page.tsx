"use client";

import React from "react";
import RiskHero from "@/components/dashboard/RiskHero";
import IncidentTable from "@/components/dashboard/IncidentTable";

export default function OverviewPage() {
  return (
    <section>
      <h1>Overview</h1>
      <RiskHero />
      <IncidentTable />
    </section>
  );
}
