import { useState } from "react";
import Navigation from "@/components/Navigation";
import VaultCard from "@/components/VaultCard";
import TransactionSection from "@/components/TransactionSection";

const Dashboard = () => {
  const [walletConnected, setWalletConnected] = useState<boolean>(false)
  const [walletInfo, setWalletInfo] = useState<WalletInfo>({
    address: "",
    balance: 1000
  });

  const handleConnectedWallet = () => {
    setWalletConnected(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <div className="dashboard flex" >
        <div className="main-content flex-1 p-6">
          <VaultCard />
          <TransactionSection />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
