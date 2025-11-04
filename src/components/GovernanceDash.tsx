// components/GovernanceDash.tsx
import React, { useState } from 'react';
import { Proposal, Stokvel } from '../interfaces/interfaces';
import ProposalCreationModal from './ProposalCreationModal';

interface GovernanceDashProps {
  stokvel: Stokvel;
  currentUser: string;
}

const GovernanceDash: React.FC<GovernanceDashProps> = ({ stokvel, currentUser }) => {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleVote = async (proposalId: string, vote: boolean) => {
    console.log(`User ${currentUser} voted ${vote ? 'For' : 'Against'} on proposal ${proposalId}`);
  };

  return (
    <div className="governance-dashboard min-h-screen bg-gradient-to-b from-slate-950 text-gray-100 px-6 py-10">
      <div className="flex items-center justify-between border-b border-border pb-4 mb-6">
        <h2 className="text-2xl font-bold tracking-tight">Governance</h2>
        <button
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all"
          onClick={() => setIsModalOpen(true)}
        >
          + New Proposal
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {proposals.length > 0 ? (
          proposals.map((proposal) => (
            <div
              key={proposal.id}
              className="proposal-card bg-slate-800/60 backdrop-blur-xl rounded-2xl p-5 shadow-lg hover:shadow-accent/30 hover:scale-[1.02] transition-transform"
            >
              <div className="mb-3">
                <h3 className="text-lg font-semibold text-foreground">{proposal.title}</h3>
                <p className="text-sm text-muted-foreground">{proposal.description}</p>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="text-xs text-muted-foreground">
                  Votes: {proposal.votesFor}/{proposal.votesAgainst}
                </span>
                <div className="flex gap-2">
                  <button
                    className="px-3 py-1.5 text-sm bg-accent text-black rounded-md hover:bg-accent-dark transition-smooth"
                    onClick={() => handleVote(proposal.id, true)}
                  >
                    For
                  </button>
                  <button
                    className="px-3 py-1.5 text-sm bg-muted/20 rounded-md hover:bg-destructive/70 transition-smooth"
                    onClick={() => handleVote(proposal.id, false)}
                  >
                    Against
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-muted-foreground py-10 border border-border rounded-lg">
            <p>No proposals yet. Create one to get started!</p>
          </div>
        )}
      </div>

      {isModalOpen && (
        <ProposalCreationModal
          stokvel={stokvel}
          onClose={() => setIsModalOpen(false)}
          onSubmit={(proposal) => setProposals([...proposals, proposal])}
        />
      )}
    </div>
  );
};

export default GovernanceDash;
