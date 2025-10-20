import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

import '@rainbow-me/rainbowkit/styles.css';

import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';

import { WagmiProvider } from 'wagmi';
import { mainnet, sepolia, zksync } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

// Environment variables
const config = getDefaultConfig({
  appName: import.meta.env.VITE_APP_NAME || 'import.meta.env.appName' || 'Warima DAO',
  projectId: import.meta.env.VITE_PROJECT_ID || 'import.meta.env.projectId',
  chains: [mainnet, sepolia, zksync],
  ssr: false,
});

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>
            <App />
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
  </React.StrictMode>
);
