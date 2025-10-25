import { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Navigation from "@/components/Navigation";
import Sidebar from "@/components/Sidebar";
import DashboardOverview from "@/components/DashOverview";
import StokvelManagement from "@/components/StokvelManagement";
import GovernanceDashboard from "@/components/GovernanceDash";
import MultiSigDashboard from "@/components/MultiSigDash";
import VaultCard from "@/components/VaultCard";
import TransactionSection from "@/components/TransactionSection";

import { Stokvel, UserStats } from "@/interfaces/interfaces";
import { WalletContext } from "@/lib/WalletContext";

type DashboardView =
  | "overview"
  | "stokvels"
  | "governance"
  | "multi-sig"
  | "assets"
  | "transactions";

const Dashboard = () => {
  const { wallet } = useContext(WalletContext);
  const [activeView, setActiveView] = useState<DashboardView>("overview");
  const [stokvels, setStokvels] = useState<Stokvel[]>([]);
  const [selectedStokvel, setSelectedStokvel] = useState<Stokvel | null>(null);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Mock data setup (you’ll replace this with on-chain calls later)
  useEffect(() => {
    if (wallet) {
      const mockStokvels: Stokvel[] = [
        {
          address: "0x742d35Cc6634C0532925a3b8D",
          name: "Pioneer Stokvel",
          members: [wallet.address, "0x123...abc", "0x456...def"],
          requiredSignatures: 2,
          balance: "4.2",
          cycleDuration: 90,
          contributionAmount: "0.1",
          farmOperator: "0x789...ghi",
          createdAt: Date.now(),
        },
      ];

      const mockStats: UserStats = {
        stokvelsCount: mockStokvels.length,
        votingPower: "1,250",
        treasuryValue: "4.2 ETH",
        livestockCount: 24,
      };

      setStokvels(mockStokvels);
      setStats(mockStats);
      setSelectedStokvel(mockStokvels[0]);
    }
  }, [wallet]);

  // Dynamically render the selected dashboard section
  const renderContent = () => {
    if (!stats || !stokvels.length) {
      return (
        <div className="flex items-center justify-center h-full text-muted-foreground">
          Loading your dashboard...
        </div>
      );
    }

    switch (activeView) {
      case "overview":
        return (
          <DashboardOverview
            userStokvels={stokvels}
            userStats={stats}
            onNavigate={setActiveView}
          />
        );

      case "stokvels":
        return (
          <StokvelManagement
            stokvels={stokvels}
            onSelectStokvel={setSelectedStokvel}
          />
        );

      case "governance":
        return selectedStokvel ? (
          <GovernanceDashboard
            stokvel={selectedStokvel}
            currentUser={wallet.address}
          />
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            Please select a stokvel to view governance.
          </div>
        );

      case "multi-sig":
        return selectedStokvel ? (
          <MultiSigDashboard
            stokvel={selectedStokvel}
            currentUser={wallet.address}
          />
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            Please select a stokvel to view multi-sig transactions.
          </div>
        );

      case "assets":
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
            <VaultCard />
            <div className="bg-card rounded-lg p-6 border">
              <h3 className="text-xl font-semibold mb-4">Asset Details</h3>
              <p>Detailed asset tracking will be implemented here.</p>
            </div>
          </div>
        );

      case "transactions":
        return <TransactionSection />;

      default:
        return null;
    }
  };

  if (!wallet?.address) {
    return (
      <div className="flex items-center justify-center h-screen text-muted-foreground">
        Please connect your wallet to view the dashboard.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Top Navigation */}
      <Navigation
        walletConnected={true}
        walletInfo={wallet}
        onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
      />

      <div className="flex flex-1 relative overflow-hidden">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-64 border-r bg-card">
          <Sidebar
            activeView={activeView}
            onNavigate={(view) => {
              setActiveView(view);
              setSidebarOpen(false);
            }}
            currentUser={wallet.address}
            network="Polygon"
          />
        </div>

        {/* Mobile Sidebar (Framer Motion Drawer) */}
        <AnimatePresence>
          {sidebarOpen && (
            <>
              <motion.aside
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "tween", duration: 0.3 }}
                className="fixed inset-y-0 left-0 w-64 bg-card border-r z-40 lg:hidden shadow-lg"
              >
                <Sidebar
                  activeView={activeView}
                  onNavigate={(view) => {
                    setActiveView(view);
                    setSidebarOpen(false);
                  }}
                  currentUser={wallet.address}
                  network="Polygon"
                />
              </motion.aside>

              <motion.div
                className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSidebarOpen(false)}
              />
            </>
          )}
        </AnimatePresence>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
