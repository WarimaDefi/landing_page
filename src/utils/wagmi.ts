import { createConfig, http } from 'wagmi'
import { mainnet, sepolia, localhost } from 'wagmi/chains'
import { injected, metaMask, walletConnect } from 'wagmi/connectors'

export const config = createConfig({
  chains: [localhost, mainnet, sepolia],
  connectors: [
    injected(),
    metaMask(),
    wallectConnect({ projectId: '3fcc6bba6f1de962d911bb5b5c3dba68' })
  ],
  transports: {
    [localhost,id]: http('http://127.0.0.1:8545'),
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
