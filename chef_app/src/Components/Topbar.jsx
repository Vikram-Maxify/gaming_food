import React from "react";

const Topbar = () => {
  return (
    <div className="h-16 bg-card/70 backdrop-blur-md border-b border-borderSubtle flex items-center justify-between px-6">

      {/* 🔝 Left */}
      <div>
        <h1 className="text-lg font-semibold text-textPrimary tracking-wide">
          👨‍🍳 Chef Dashboard
        </h1>
        <p className="text-xs text-textSecondary">
          Welcome back 👋
        </p>
      </div>

      {/* 🔻 Right */}
      <div className="flex items-center gap-4">

        {/* 🟢 Status */}
        <div className="flex items-center gap-2 text-sm text-textSecondary">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          Online
        </div>

        {/* 👤 Avatar */}
        <div className="w-9 h-9 rounded-full bg-card border border-borderSubtle flex items-center justify-center text-textPrimary font-medium">
          C
        </div>

      </div>
    </div>
  );
};

export default Topbar;