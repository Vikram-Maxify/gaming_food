import React from "react";
import { Bell } from "lucide-react";

const Topbar = () => {
  return (
    <div className="w-full h-14 bg-card border-b border-secondary-dark flex items-center justify-between px-4">

      <h2 className="text-sm font-medium">Dashboard</h2>

      <div className="flex items-center gap-3">
        <Bell size={18} className="text-text-secondary" />

        <img
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100"
          className="w-8 h-8 rounded-full object-cover"
        />
      </div>

    </div>
  );
};

export default Topbar;