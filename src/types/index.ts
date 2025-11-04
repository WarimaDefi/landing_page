export interface Proposal {
  id: string;
  title: string;
  description: string;
  proposer: string;
  forVotes: bigint;
  againstVotes: bigint;
  abstainVotes: bigint;
  startBlock: bigint;
  endBlock: bigint;
  executed: boolean;
}

export interface Stokvel {
  id: number;
  name: string;
  chairperson: string;
  totalBalance: bigint;
  contributionAmount: bigint;
  memberCount: number;
  isActive: boolean;
}
