// src/app/login/page.tsx
"use client";

import { usePrivy } from "@privy-io/react-auth";

export default function LoginPage() {
  const { ready, authenticated, login, logout } = usePrivy();

  if (!ready) return <p>Loading...</p>;

  if (!authenticated) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Login with Privy</h2>
        <button onClick={login}>Login</button>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Welcome! You are logged in 🎉</h2>
      <button onClick={logout}>Logout</button>
      <br />
      <a href="/export-wallet">Go to Export Wallet</a>
    </div>
  );
}
