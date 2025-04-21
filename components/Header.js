"use client";

import React, { useState } from "react";
import { useAccount } from "@/hooks/useAccount";
import { claimGovToken } from "@/lib/viem";
import ConnectWallet from "./ConnectWallet";

export default function Header() {
  const { address } = useAccount();
  const [claiming, setClaiming] = useState(false);
  const [claimed, setClaimed] = useState(false);
  const [error, setError] = useState("");

  const handleClaim = async () => {
    if (!address) {
      setError("请先连接钱包");
      return;
    }

    setClaiming(true);
    setError("");
    try {
      const txHash = await claimGovToken(address);
      setClaimed(true);
      console.log("Claim successful:", txHash);
    } catch (err) {
      setError(err.message || "领取失败");
    } finally {
      setClaiming(false);
    }
  };

  return (
    <header className="w-full px-6 py-4 flex justify-between items-center border-b border-gray-700 bg-black text-white">
      <h1 className="text-xl font-bold">🗳️ DAO 抽奖系统</h1>

      <div className="flex items-center gap-4">
        <ConnectWallet />
        {address && !claimed && (
          <button
            onClick={handleClaim}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm disabled:opacity-50"
            disabled={claiming}
          >
            {claiming ? "领取中..." : "领取初始 GOV 代币"}
          </button>
        )}
        {claimed && <span className="text-green-400 text-sm">已领取</span>}
        {error && <span className="text-red-400 text-sm">{error}</span>}
      </div>
    </header>
  );
}
