"use client";

import React from "react";

export default function IncidentTable() {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Severity</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Example incident</td>
          <td>High</td>
        </tr>
      </tbody>
    </table>
  );
}
