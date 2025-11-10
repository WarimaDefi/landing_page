import React from "react";
import { MenuItem } from "../../interfaces/interfaces";
import { shortenAddress } from "@/utils/formatting";

interface SidebarProps {
  activeView: string;
  onNavigate: (view: string) => void;
  currentUser: string;
  network: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  onNavigate,
  currentUser,
  network,
}) => {
  const menuItems: MenuItem[] = [
    { id: "overview", label: "Overview", icon: "📊" },
    { id: "stokvels", label: "My Stokvel", icon: "🏛️" },
    { id: "governance", label: "Governance", icon: "🗳️" },
    { id: "assets", label: "Assets", icon: "🐖" },
    { id: "transactions", label: "Transactions", icon: "💸" },
  ];

  return (
    <div className="sidebar flex flex-col justify-between h-full bg-card border-r">
      <div>
        <div className="sidebar-header p-4 border-b">
          <h2 className="text-lg font-semibold tracking-tight">Warima</h2>
        </div>

        <nav className="sidebar-nav flex flex-col mt-4 space-y-1 px-2">
          {menuItems.map((item: MenuItem) => (
            <button
              key={item.id}
              className={`nav-item flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                activeView === item.id
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "hover:bg-muted text-muted-foreground"
              }`}
              onClick={() => onNavigate(item.id)} // <-- notice: id not path
            >
              <span className="nav-icon text-lg">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
