import { useReadContract, useWriteContract, useAccount } from 'wagmi'
import { CONTRACT_ADDRESSES, TOKEN_ABI, GOVERNOR_ABI, VAULT_ABI } from '../utils/contracts'
import { type Address } from 'viem'

export function useTokenBalance() {
  const { address } = useAccount()

  return useReadContract({
    address: CONTRACT_ADDRESSES.token,
    abi: TOKEN_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: { enable: !!address }
  })
}

export function useProposals() {
  return useReadContract({
    address: CONTRACT_ADDRESSES.governor,
    abi: GOVERNOR_ABI,
    functionName: 'proposalCount',
  })
}

export function useCreateProposal() {
  const { writeContract } = useWriteContract()

  return (targets: Address[], values: bigint[], calldatas: string[], description: string) => {
    return writeContract({
      address: CONTRACT_ADDRESSES.governor,
      abi: GOVERNOR_ABI,
      functionName: 'propose',
      args: [targets, values, calldatas, description],
    })
  }
}

export function useStokvel() {
  return useReadContract({
    address: CONTRACT_ADDRESSES.vault,
    abi: VAULT_ABI,
    functionName: 'stokvelCount',
  })
}
