import React from "react";
import { MenuItem } from "../../interfaces/interfaces";

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
    <div className="flex flex-col h-full bg-card border-r">
        <div className="p-4 border-b flex-shrink-0">
          <h2 className="text-lg font-semibold tracking-tight">Warima</h2>
          <p className="tet-xs text-muted-foreground mt-1">
            {currentUser && `${currentUser.slice(0,6)}...${currentUser.slice(-4)}`} on {network}
          </p>
        </div>

        <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-1">
          {menuItems.map((item: MenuItem) => (
            <button
              key={item.id}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all w-full text-left ${
                activeView === item.id
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "hover:bg-muted text-muted-foreground"
              }`}
              onClick={() => onNavigate(item.id)} // <-- notice: id not path
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
    </div>
  );
};

export default Sidebar;
