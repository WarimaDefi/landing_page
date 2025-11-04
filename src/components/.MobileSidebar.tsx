// components/MobileSidebar.tsx
import React, { useState } from "react";
import Sidebat from "./Sidebar";

interface MobileSidebarProps {
  activeView: string;
  onNavigate: (path: string) => void;
  currentUser: string;
  network: string;
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({
  activeView,
  onNavigate,
  currentUser,
  network,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 bg-slate-800/70 rounded-lg text-gray-300 hover:text-white hover:bg-slate-700 transition"
        >
          ☰
        </button>
      </div>

      {/* Sidebar (handles its own overlay + close)* /}
      <Sidebar
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        activeView={activeView}
        onNavigate={onNavigate}
        currentUser={currentUser}
        network={network}
      />
    </>
  );
};

export default MobileSidebar;
