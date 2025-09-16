// src/app/export-wallet/page.tsx
"use client";

import { usePrivy } from "@privy-io/react-auth";

export default function ExportWalletPage() {
  const { ready, authenticated, exportWallet } = usePrivy();

  const handleExport = async () => {
    try {
      await exportWallet();
    } catch (err) {
      console.error("Export failed:", err);
    }
  };

  if (!ready) return <p>Loading...</p>;

  if (!authenticated) {
    return <p>Please log in first at /login</p>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Export Your Wallet</h2>
      <button onClick={handleExport}>Export Wallet</button>
    </div>
  );
}
