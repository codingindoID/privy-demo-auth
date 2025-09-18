"use client";
import { usePrivy } from "@privy-io/react-auth";
import { useState } from "react";

export default function ExportWalletPage() {
  const { ready, authenticated, user, exportWallet } = usePrivy();

  const [isExporting, setIsExporting] = useState(false);
  const [exportStatus, setExportStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const isAuthenticated = ready && authenticated;
  const hasEmbeddedWallet = !!user?.linkedAccounts?.find(
    (account) =>
      account.type === "wallet" &&
      account.walletClientType === "privy" &&
      account.chainType === "solana"
  );

  const handleExportWallet = async () => {
    if (!hasEmbeddedWallet) {
      console.error("No embedded Solana wallet found to export.");
      setExportStatus("error");
      return;
    }

    // Check if exportWallet is available
    if (!exportWallet) {
      console.error("exportWallet function not available");
      setExportStatus("error");
      return;
    }

    setIsExporting(true);
    setExportStatus("idle");

    try {
      await exportWallet();
      setExportStatus("success");
      console.log("Wallet exported successfully!");
    } catch (error) {
      console.error("Error exporting wallet:", error);
      setExportStatus("error");
    } finally {
      setIsExporting(false);
    }
  };

  // Debug: Log what's available in usePrivy
  console.log("Available Privy methods:", Object.keys(usePrivy()));

  if (!ready) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div>Please log in to export your wallet.</div>;
  }

  if (!hasEmbeddedWallet) {
    return <div>No embedded Solana wallet found. Please create one first.</div>;
  }

  // Show message if exportWallet is not available
  if (!exportWallet) {
    return (
      <div>
        <p>Export wallet functionality not available.</p>
        <p>Available methods: {Object.keys(usePrivy()).join(", ")}</p>
      </div>
    );
  }

  return (
    <div className="export-wallet-container">
      <button
        onClick={handleExportWallet}
        disabled={isExporting}
        className={`export-btn ${isExporting ? "loading" : ""}`}
      >
        {isExporting ? "Exporting..." : "Export my wallet"}
      </button>

      {exportStatus === "success" && (
        <p className="success-message">✅ Wallet exported successfully!</p>
      )}

      {exportStatus === "error" && (
        <p className="error-message">
          ❌ Failed to export wallet. Please try again.
        </p>
      )}

      <style jsx>{`
        .export-wallet-container {
          padding: 20px;
          max-width: 400px;
          margin: 0 auto;
        }

        .export-btn {
          width: 100%;
          padding: 12px 24px;
          background-color: #6366f1;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .export-btn:hover:not(:disabled) {
          background-color: #5855eb;
        }

        .export-btn:disabled {
          background-color: #9ca3af;
          cursor: not-allowed;
        }

        .export-btn.loading {
          opacity: 0.7;
        }

        .success-message {
          margin-top: 12px;
          padding: 8px;
          background-color: #d1fae5;
          color: #065f46;
          border-radius: 4px;
          text-align: center;
        }

        .error-message {
          margin-top: 12px;
          padding: 8px;
          background-color: #fee2e2;
          color: #991b1b;
          border-radius: 4px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
