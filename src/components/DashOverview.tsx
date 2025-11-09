// components/DashboardOverview.tsx
import React from 'react';
import { Stokvel, UserStats } from '@/interfaces/interfaces';
import { motion } from "framer-motion";

interface DashboardOverviewProps {
  userStokvels: Stokvel[];
  userStats: UserStats;
  onNavigate: (path: string) => void;
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  userStokvels,
  userStats,
  onNavigate
}) => {
  return (
    <div className="dashboard-overview min-h-screen bg-gradient-to-b from-slate-950 to-slate-950 text-gray-100 px-6 py-10">
      <div className="welcome-section mb-10">
        <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Warima Dashboard</h1>
        <p className="text-gray-400 text-sm">Manage your stokvels, participate in governance, and track your assets</p>
      </div>

      <div className="stats-grid grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-10">
        <StatCard
          icon="🏛️ "
          title="Stokvels"
          value={userStats?.stokvelsCount?.toString() ?? "0"}
          label="Active Communities"
        />
        <StatCard
          icon="⚖️ "
          title="Voting Power"
          value={userStats?.votingPower?.toString() ?? "0"}
          label="Governance Rights"
        />
        <StatCard
          icon="💰"
          title="Treasury"
          value={userStats?.votingPower?.toString() ?? "0"}
          label="Governance Rights"
        />
        <StatCard
          icon="🐖"
          title="Livestock"
          value={userStats?.livestockCount?.toString() ?? "0"}
          label="Tokenized Assets"
        />
      </div>

      <QuickActions onNavigate={onNavigate} />

      <div className="recent-activity">
        <h3>Recent Activity</h3>
        <ActivityFeed />
      </div>
    </div>
  );
};

interface StatCardProps {
  icon: string;
  title: string;
  value: string;
  label: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value, label }) => (
  <motion.div>
    <div className="stat-card bg-slate-800/60 backdrop-blur-xl rounded-2xl p-5 shadow-lg hover:shadow-accent/30 hover:scale-[1.02] transition-transform">
      <div className="flex items-center gap-4">
      <div className="stat-icon text-3xl">{icon}</div>
      <div className="stat-info">
        <h3 className="text-gray-300 text-sm font-medium">{title}</h3>
        <span className="stat-value text-2xl font-semimedium text-white">{value}</span>
        <span className="stat-label text-xs text-gray-500">{label}</span>
      </div>
      </div>
    </div>
  </motion.div>
);

interface QuickActionsProps {
  onNavigate: (path: string) => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ onNavigate }) => {
  const actions = [
    { icon: '➕', label: 'Create Stokvel', path: "stokvels"},
    { icon: '🗳️', label: 'View Proposals', path: "governance"},
    { icon: '📊', label: 'Asset Tracking', path: "assets"},
  ];

  return (
    <div className="quick-actions mb-10">
      <h3 className="text-lg font-semibold mb-4 text-gray-200">Quick Actions</h3>
      <div className="action-buttons grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action) => (
          <button
            key={action.path}
            className="action-btn flex flex-col items-center justify-center gap-2 bg-slate-800/60 hover:bg-sky-600/20 border border-slate-700 rounded-xl p-6 transition-all duration-200 hover:scale-105"
            onClick={() => onNavigate(action.path)}
          >
            <div className="action-icon text-2xl">{action.icon}</div>
            <span className="text-sm text-gray-300">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

const ActivityFeed: React.FC = () => {
  // Implement activity feed logic
  return (
    <div className="recent-activity-feed mt-12">
      <h3 className="text-lg font-semibold text-gray-200 mb-4">Recent Activity</h3>
      <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 text-gray-400"></div>
      {/* Activity items will be rendered here */}
      <p className="text-sm text-gray-500">No recent activity yet.</p>
    </div>
  );
};

export default DashboardOverview;
