import React from "react";
import { Bell, Search } from "lucide-react";

const Topbar = () => {
  return (
    <div className="w-full h-[70px] flex items-center justify-between px-6 
    backdrop-blur-glass bg-[#0D0D0D]/70 border-b border-borderSubtle">

      {/* LEFT */}
      <div>
        <h2 className="text-lg font-semibold text-textPrimary">
          Dashboard
        </h2>
        <p className="text-xs text-textSecondary">
          Welcome back 👋
        </p>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">

        {/* 🔍 Search */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl2 
        bg-[#1A1A1A] border border-borderSubtle w-[220px] 
        focus-within:shadow-glow transition">

          <Search size={16} className="text-textSecondary" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none text-sm text-textPrimary placeholder:text-textSecondary w-full"
          />
        </div>

        {/* 🔔 Notification */}
        <div className="relative p-2 rounded-xl2 bg-[#1A1A1A] border border-borderSubtle hover:shadow-glow transition cursor-pointer">
          <Bell size={18} className="text-textSecondary" />

          {/* Dot */}
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
        </div>

        {/* 👤 Profile */}
        <div className="flex items-center gap-3 pl-3 border-l border-borderSubtle">

          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100"
            className="w-9 h-9 rounded-full object-cover border border-borderSubtle"
          />

          <div className="hidden md:flex flex-col">
            <span className="text-sm text-textPrimary font-medium">
              Oliver Bennett
            </span>
            <span className="text-xs text-textSecondary">
              Admin
            </span>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Topbar;