import { createContext, useState, ReactNode } from "react";
import { WalletInfo } from "@/interfaces/interfaces";

interface WalletContextType {
  wallet: WalletInfo;
  setWallet: (wallet: WalletInfo) => void;
}

export const WalletContext = createContext<WalletContextType>({
  wallet: { address: "", balance: 0 },
  setWallet: () => {},
});

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [wallet, setWallet] = useState<WalletInfo>({
    address: "0x1a2b3c4d5e6f...",
    balance: 1000,
  });

  return (
    <WalletContext.Provider value={{ wallet, setWallet }}>
      {children}
    </WalletContext.Provider>
  );
};
