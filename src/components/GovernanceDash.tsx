// components/GovernanceDash.tsx
import React, { useState } from 'react';
import { GovernanceProposal, ProposalType, Stokvel } from '../../interfaces/interfaces';

interface GovernanceDashboardProps {
  stokvel: Stokvel;
  currentUser: string;
}

const GovernanceDashboard: React.FC<GovernanceDashboardProps> = ({ stokvel, currentUser }) => {
  const [activeProposals, setActiveProposals] = useState<GovernanceProposal[]>([]);
  const [userVotingPower, setUserVotingPower] = useState<number>(0);
  const [isProposalModalOpen, setIsProposalModalOpen] = useState(false);

  const castVote = async (proposalId: string, vote: number): Promise<void> => {
    // Implement voting logic
    console.log('Casting vote:', { proposalId, vote });
  };

  const createProposal = async (proposalData: Omit<GovernanceProposal, 'id' | 'votesFor' | 'votesAgainst' | 'totalVotes' | 'executed'>): Promise<void> => {
    //Implement proposal creation logic
    console.log('Creating proposal:', proposalData);
  };

  return (
    <div className="governance-dashboard min-h-screen bg-gradient-to-b from-slate-950 text-gray-100 px-6 py-10">
      <div className="governance-header space-y-6">
        <h2 className="flex items-center justify-between border-b pb-4 text-2xl font-bold tracking-tight">Stokvel Governance</h2>
        <div className="voting-power">
          <span>Your Voting Power: {userVotingPower} ZWR</span>
        </div>
      </div>

      <div className="proposal-section">
        <div className="section-header">
          <h3>Active Proposals</h3>
          <button
            className="btn-primary"
            onClick={() => setIsProposalModalOpen(true)}
          >
            Create Proposal
          </button>
        </div>

        <div className="proposal-grid">
          {activeProposals.map((proposal: GovernanceProposal) => (
            <ProposalCard
              key={proposal.id}
              proposal={proposal}
              onVote={castVote}
            />
          ))}
          {activeProposals.length === 0 && (
            <div className="empty-state">
              <p>No active proposals</p>
            </div>
          )}
        </div>
      </div>

      {isProposalModalOpen && (
        <ProposalCreationModal
          stokvel={stokvel}
          onClose={() => setIsProposalModalOpen(false)}
          onSubmit={createProposal}
        />
      )}
    </div>
  );
};

interface ProposalCardProps {
  proposal: GovernanceProposal;
  onVote: (proposalId: string, vote: number) => void;
}

const ProposalCard: React.FC<ProposalCardProps> = ({ proposal, onVote }) => {
  const forPercentage = proposal.totalVotes > 0 ? (proposal.voteFor / proposal.totalVotes) * 100 : 0;

  return (
    <div className="proposal-card">
      <div className="proposal-header">
        <span className={`proposal-type ${proposal.type.toLowerCase()}`}>
          {proposal.type}
        </span>
        <span className="proposal-id">#{proposal.id}</span>
      </div>

      <h4 className="proposal-title">{proposal.title}</h4>
      <p className="proposal-description">{proposal.description}</p>

      <div className="proposal-meta">
        <span>Proposer: {shortenAddress(proposal.proposer)}</span>
        <span>Ends: {formatTimeRemaining(proposal.endTime)}</span>
      </div>

      <div className="voting-section">
        <div className="vote-options">
          <button
            className="btn-vote for"
            onClick={() => onVote(proposal.id, 1)}
          >
            For
          </button>
        </div>
        <button
          className="btn-vote against"
          onClick={() => onVote(proposal.id, 0)}
        >
          Against
        </button>
        <button
          className="btn-vote abstain"
          onClick={() => onVote(proposal.id, 2)}
        >
          Abstain
        </button>
      </div>

      <div className="vote-stats">
        <div className="vote-bar">
          <div
            className="for-bar"
            style={{ width: `${forPercentage}%` }}
          ></div>
          <div
            className="against-bar"
            style={{ width: `${againstPercentage}%` }}
          ></div>
          <div className="vote-numbers">
            <span>For: {proposal.votesFor}</span>
            <span>Against: {proposal.voteAgainst}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GovernanceDashboard;
