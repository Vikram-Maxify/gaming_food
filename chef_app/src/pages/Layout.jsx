import React from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { Outlet } from "react-router-dom";

const ChefLayout = () => {
  return (
    <div className="flex bg-surface text-textPrimary">

      {/* ✅ Sticky Sidebar */}
      <div className="h-screen sticky top-0">
        <Sidebar />
      </div>

      {/* Right Side */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">

        {/* Topbar */}
        <Topbar />

        {/* ✅ Scrollable Content Only */}
        <div className="flex-1 overflow-y-auto p-6 bg-surface">
          <Outlet />
        </div>

      </div>

    </div>
  );
};

export default ChefLayout;