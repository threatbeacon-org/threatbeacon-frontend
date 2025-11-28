"use client";

import React from "react";

export default function LoginPage() {
  return (
    <div style={{ maxWidth: 480, margin: "0 auto", padding: 16 }}>
      <h1>Login</h1>
      <form>
        <label>
          Usuario
          <input type="text" name="username" />
        </label>
        <br />
        <label>
          Contraseña
          <input type="password" name="password" />
        </label>
        <br />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
