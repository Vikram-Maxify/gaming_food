import React from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { Outlet } from "react-router-dom";

const ChefLayout = () => {
  return (
    <div className="flex">

      {/* Sidebar */}
      <Sidebar />

      {/* Right Side */}
      <div className="flex-1 flex flex-col">

        {/* Topbar */}
        <Topbar />

        {/* Page Content */}
        <div className="p-6 bg-[#0F0F0F] min-h-screen">
          <Outlet />
        </div>

      </div>

    </div>
  );
};

export default ChefLayout;