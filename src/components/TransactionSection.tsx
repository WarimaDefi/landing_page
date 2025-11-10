import React, { useState } from "react";
import { useAccount, useBalance } from "wagmi";

function TransactionSection() {
  const { address, isConnected } = useAccount();
  const [amount, setAmount] = useState<string>("");

  // Mock USDC balance (replace with contract fetch)
  const { data: usdcBalance } = useBalance({
    address: address,
    token: "0xea6227A0b60267Fdb04a1fAc47A2722b2c3C5473", // Polygon_Amoy Warima WZR
    chainId: 80002,
  });

  const mockTransactions = [
    { date: "2023-10-15", type: "deposit", amount: "25%" },
    { date: "2023-10-10", type: "deposit", amount: "50%" },
    { date: "2023-10-05", type: "withdraw", amount: "10%" },
  ];

  const handleDeposit = (): void => {
    if (!amount || parseFloat(amount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    alert(`Depositing ${amount} USDC`);
    setAmount("");
  };

  const handleWithdraw = (): void => {
    if (!amount || parseFloat(amount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    alert(`Withdrawing ${amount} USDC`);
    setAmount("");
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setAmount(value);
    if (activePercentage !== null) {
      setActivePercentage(null);
    }
  };

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] bg-slate-950 text-gray-200 p-10 rounded-2xl border border-slate-800">
        <h3 className="text-xl font-semibold text-gray-100 mb-3">
          Wallet Not Connected
        </h3>
        <p className="text-gray-400">
          Please connect your wallet to interact with the vault.
        </p>
      </div>
    );
  }

  return (
    <div className="transaction-section min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-gray-100 px-6 py-10">
      <div className="max-w-3xl mx-auto space-y-10">
        {/* Wallet Overview */}
        <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-slate-700">
          <h2 className="text-2xl font-bold mb-6 tracking-tight">
            Treasury Transactions
          </h2>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-sm text-gray-400">Wallet Address</p>
              <p className="font-mono text-gray-200">
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-400">WZR Balance</p>
              <p className="font-semibold text-gray-100">
                {usdcBalance
                  ? `${parseFloat(usdcBalance.formatted).toFixed(2)} USDC`
                  : "Loading..."}
              </p>
            </div>
          </div>

          {/* Amount Input */}
          <div className="mb-5">
            <label className="block text-sm text-gray-400 mb-1">
              Amount (USDC)
            </label>
            <input
              type="number"
              className="w-full px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter amount"
              value={amount}
              onChange={handleAmountChange}
              min="0"
              step="0.01"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-6">
            <button
              className="flex-1 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all"
              onClick={handleDeposit}
            >
              Contribute
            </button>
            <button
              className="flex-1 py-3 bg-transparent border border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-all"
              onClick={handleWithdraw}
            >
              Withdraw
            </button>
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 shadow-md border border-slate-700">
          <h3 className="text-lg font-semibold mb-4 text-gray-200">
            Recent Activity
          </h3>
          {mockTransactions.length > 0 ? (
            <div className="space-y-3">
              {mockTransactions.map((tx, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center border-b border-slate-700/60 pb-2"
                >
                  <span className="text-gray-400 text-sm">{tx.date}</span>
                  <span
                    className={`font-medium ${
                      tx.type === "deposit"
                        ? "text-emerald-400"
                        : "text-rose-400"
                    }`}
                  >
                    {tx.type === "deposit" ? "Deposit" : "Withdraw"} —{" "}
                    {tx.amount}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">
              No transactions recorded yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default TransactionSection;
