import { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Navigation from "@/components/Navigation";
import Sidebar from "@/components/Sidebar";
import DashboardOverview from "@/components/DashOverview";
import StokvelManagement from "@/components/StokvelManagement";
import GovernanceDashboard from "@/components/GovernanceDash";
import VaultCard from "@/components/VaultCard";
import TransactionSection from "@/components/TransactionSection";

import { Stokvel, UserStats } from "@/interfaces/interfaces";
import { WalletContext } from "@/lib/WalletContext";

type DashboardView =
  | "overview"
  | "stokvels"
  | "governance"
  | "assets"
  | "transactions";

const DEFAULT_STATS: UserStats = {
  stokvelsCount: 0,
  votingPower: "0",
  treasuryValue: "0 ETH",
  livestockCount: 0,
};

const NAVBAR_HEIGHT = 80; // px, adjust to match your Navigation height

const Dashboard = () => {
  const { wallet } = useContext(WalletContext);
  const [activeView, setActiveView] = useState<DashboardView>("overview");
  const [stokvels, setStokvels] = useState<Stokvel[]>([]);
  const [selectedStokvel, setSelectedStokvel] = useState<Stokvel | null>(null);
  const [stats, setStats] = useState<UserStats>(DEFAULT_STATS);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!wallet?.address) return;
    let mounted = true;

    const loadData = async () => {
      setLoading(true);

      // simulate fetching data
      await new Promise((res) => setTimeout(res, 250));

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

      if (!mounted) return;

      setStokvels(mockStokvels);
      setStats(mockStats);
      setSelectedStokvel((prev) => prev ?? mockStokvels[0]);
      setLoading(false);
    };

    loadData();

    return () => {
      mounted = false;
    };
  }, [wallet?.address]);

  if (!wallet?.address) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background text-muted-foreground">
        Please connect your wallet to view the dashboard.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="animate-pulse space-y-4 w-full max-w-2xl p-6">
          <div className="h-10 bg-muted rounded w-2/3" />
          <div className="h-6 bg-muted rounded w-1/2" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="h-28 bg-muted rounded" />
            <div className="h-28 bg-muted rounded" />
          </div>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeView) {
      case "overview":
        return <DashboardOverview userStokvels={stokvels} userStats={stats} onNavigate={setActiveView} />;
      case "stokvels":
        return (
          <StokvelManagement
            stokvels={stokvels}
            onSelectStokvel={setSelectedStokvel}
            onNavigate={setActiveView}
            onCreateStokvel={() => alert("Create stokvel modal soon")}
          />
        );
      case "governance":
        return selectedStokvel ? (
          <GovernanceDashboard stokvel={selectedStokvel} currentUser={wallet.address} />
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            Please select a stokvel to view governance.
          </div>
        );
      case "assets":
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
            <VaultCard />
            <div className="bg-card rounded-lg p-6 border border-border transition-shadow hover:shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-foreground">Asset Details</h3>
              <p className="text-muted-foreground">Detailed asset tracking will be implemented here.</p>
            </div>
          </div>
        );
      case "transactions":
        return <TransactionSection />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Fixed navbar */}
      <Navigation
        walletConnected={true}
        walletInfo={wallet}
        onToggleSidebar={() => setSidebarOpen((s) => !s)}
      />

      {/* Content + Sidebar */}
      <div className="flex flex-1 relative">
        {/* Desktop sidebar */}
        <div className="hidden lg:block w-64 border-r border-border bg-card">
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

        {/* Mobile drawer */}
        <AnimatePresence>
          {sidebarOpen && (
            <>
              <motion.aside
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "tween", duration: 0.28 }}
                className="fixed inset-y-0 left-0 w-64 bg-card border-r border-border z-40 lg:hidden shadow-lg"
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

        {/* Main scrollable content */}
        <main
          className="flex-1 overflow-y-auto p-4 lg:p-6"
          style={{ paddingTop: NAVBAR_HEIGHT }}
        >
          <motion.div
            className="min-h-[calc(100vh-80px)]" // ensures full screen minus navbar
            key={activeView}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
          >
            {renderContent()}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
