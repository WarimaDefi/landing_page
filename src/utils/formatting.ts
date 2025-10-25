// utils/formatting.ts
export const shortenAddress = (address: string, chars = 4): string => {
  if (!address) return '';
  return `${address.substring(0, chars + 2)}...${address.substring(address.length - chars)}`;
};

export const formatTimeRemaining = (endTime: number): string => {
  const now = Math.floor(Date.now() / 1000);
  const diff = endTime - now;

  if (diff <= 0) return 'Ended';

  const days = Math.floor(diff / 86400);
  const hours = Math.floor((diff % 86400) / 3600);

  if (days > 0) return `${days}d ${hours}h`;
  return `${hours}`;
};

export const formatProposalType = (type: ProposalType): string => {
  const typeMap: Record<ProposalType, string> = {
    [ProposalType.FINANCIAL]: 'Financial',
    [ProposalType.OPERATIONAL]: 'Operational',
    [ProposalType.MEMBERSHIP]: 'Membership',
    [ProposalType.EMERGENCY]: 'Emergency'
  };
};
