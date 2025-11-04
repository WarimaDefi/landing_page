// components/ProposalCreationModal.tsx
import React, { useState } from "react";
import { Stokvel, Proposal } from "../interfaces/interfaces";

interface ProposalCreationModalProps {
  stokvel: Stokvel;
  onClose: () => void;
  onSubmit: (proposal: Proposal) => void;
}

const ProposalCreationModal: React.FC<ProposalCreationModalProps> = ({
  stokvel,
  onClose,
  onSubmit,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [action, setAction] = useState("");
  const [target, setTarget] = useState("");
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    if (!title || !description) return;

    const newProposal: Proposal = {
      id: `${Date.now()}`,
      title,
      description,
      action,
      target,
      value,
      votesFor: 0,
      votesAgainst: 0,
      executed: false,
      proposer: stokvel.address,
      createdAt: new Date().toISOString(),
    };

    onSubmit(newProposal);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-md p-4">
      <div className="bg-slate-900/90 border border-border rounded-2xl shadow-2xl w-full max-w-lg p-6 space-y-6 animate-in fade-in-50">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <h2 className="text-xl font-semibold text-foreground">
            Create Proposal
          </h2>
          <button
            className="text-muted-foreground hover:text-accent transition-smooth"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-muted-foreground mb-1">
              Proposal Title
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 rounded-lg bg-muted/10 border border-border text-foreground focus:ring-2 focus:ring-accent outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Fund community project"
            />
          </div>

          <div>
            <label className="block text-sm text-muted-foreground mb-1">
              Description
            </label>
            <textarea
              className="w-full px-3 py-2 rounded-lg bg-muted/10 border border-border text-foreground focus:ring-2 focus:ring-accent outline-none"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the purpose and outcome of this proposal..."
            ></textarea>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-muted-foreground mb-1">
                Action (optional)
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 rounded-lg bg-muted/10 border border-border text-foreground focus:ring-2 focus:ring-accent outline-none"
                value={action}
                onChange={(e) => setAction(e.target.value)}
                placeholder="Contract call or off-chain action"
              />
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-1">
                Target Address (optional)
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 rounded-lg bg-muted/10 border border-border text-foreground focus:ring-2 focus:ring-accent outline-none"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                placeholder="0xRecipient..."
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-muted-foreground mb-1">
              Value (ETH, optional)
            </label>
            <input
              type="number"
              step="0.01"
              className="w-full px-3 py-2 rounded-lg bg-muted/10 border border-border text-foreground focus:ring-2 focus:ring-accent outline-none"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="0.00"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-border pt-4">
          <button
            className="px-4 py-2 rounded-lg bg-muted/20 text-muted-foreground hover:bg-muted/40 transition-smooth"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth"
            onClick={handleSubmit}
          >
            Submit Proposal
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProposalCreationModal;
