// components/MultisigTransactionModal.tsx
import React, { useState } from "react";

interface MultisigTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (transaction: {
    recipient: string;
    amount: string;
    description: string;
  }) => void;
  stokvelName?: string;
}

const MultisigTransactionModal: React.FC<MultisigTransactionModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  stokvelName,
}) => {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipient || !amount) return;
    onSubmit({ recipient, amount, description });
    onClose();
    setRecipient("");
    setAmount("");
    setDescription("");
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-slate-900/90 text-gray-100 rounded-2xl shadow-2xl w-full max-w-md p-6 border border-slate-700">
        <h2 className="text-xl font-semibold mb-1">
          Create Multi-Sig Transaction
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          {stokvelName ? `Stokvel: ${stokvelName}` : "Initiate a transaction proposal"}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Recipient Address</label>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="0x..."
              className="w-full px-3 py-2 rounded-lg bg-slate-800/80 border border-slate-700 text-gray-100 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Amount (ETH)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              step="0.0001"
              className="w-full px-3 py-2 rounded-lg bg-slate-800/80 border border-slate-700 text-gray-100 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Purpose of transaction..."
              rows={3}
              className="w-full px-3 py-2 rounded-lg bg-slate-800/80 border border-slate-700 text-gray-100 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-700">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-muted/20 hover:bg-muted/40 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all"
            >
              Submit Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MultisigTransactionModal;
