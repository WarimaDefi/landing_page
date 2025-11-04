export const CONTRACT_ADDRESSES = {
  token: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  governor: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
  timelock: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
  vault: ""
};

// Simplified ABIs can generate full ones from contracts
export const TOKEN_ABI =[
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint256)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address)view returns (uint256)",
  "function delegate(address)",
];

export const GOVERNOR_ABI = [
  "function proposalCount() view returns (uint256)",
  "function proposals(uint256) view returns (tuple(string title, string description, address proposer, uint256 forVotes, uint256 againstVotes, uint256 abstainVotes, uint256 startBlock, uint256 endBlock, bool executed))",
  "function propose(address[] targets, uint256[] values, bytes[] calldatas, string description) returns (uint256)",
  "function castVote(uint256 proposalId, uint256 support)",
  "function queue(uint256 proposalId)",
  "function execute(uint256 proposalId)",
];

export const VAULT_ABI = [
  "function stokvelCount() view returns (uint256)",
  "function stokvels() view returns (tuple(string name, address chairperson, uint256 totalBalance, uint256 contributionAmount, bool isActive))",
  "function createStokvel(string name, uint256 contributionAmount)",
  "function joinStokvel(uint256 stokvelId)",
  "function contribute(uint256 stokvelId) payable",
  "function payout(uint256 stokvelId)",
];

