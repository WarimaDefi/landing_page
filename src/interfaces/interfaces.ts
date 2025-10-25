export interface LoginFormValues {
  email: string;
  password: string;
}

export interface UserFormValues {
  email: string;
  password: string;
  displayName: string;
}

export interface WalletInfo {
  address: string;
  balance: number;
}

export interface Transaction {
  date: string;
  type: 'deposit' | 'withdraw';
  amount: string;
  percentage?: number;
}

export interface Stokvel {
  address: string;
  name: string;
  members: string[];
  requiredSignatures: number;
  balance: string;
  cycleDuration: number;
  contributionAmount: string;
  farmOperator: string;
  createdAt: number;
}

export interface MultiSigTransaction {
  id: string;
  description: string;
  amount: string;
  recipient: string;
  confirmations: string[];
  requiredSignatures: number;
  executed: boolean;
  proposedBy: string;
  proposedAt: number;
}

export interface interface GovernanceProposal {
  id: string;
  title: string;
  description: string;
  proposer: string;
  type: ProposalType;
  votesFor: number;
  votesAgainst: number;
  totalVotes: number;
  startTime: number;
  endTime: number;
  executed: boolean;
  targets: string[];
  values: string[];
}

export enum ProposalType {
  FINANCIAL = 'FINANCIAL',
  OPERATIONAL = 'OPERATIONAL',
  MEMBERSHIP = 'MEMBERSHIP',
  EMERGENCY = 'EMERGENCY'
}

export interface UserStats {
  stokvelsCount: number;
  votingPower: string;
  treasuryValue: string;
  livestockCount: number;
}

export interface MenuItem {
  id: string;
  label: string;
  icon: string;
  path: string;
}
