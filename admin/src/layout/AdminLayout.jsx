import React from "react";
import Sidebar from "../component/Sidebar";
import Topbar from "../component/Topbar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
    return (
        <div className="flex h-screen bg-background text-textPrimary overflow-hidden">

            {/* 🔥 SIDEBAR (FIXED) */}
            <div className="w-[260px] fixed left-0 top-0 h-screen bg-surface border-r border-borderSubtle z-50">
                <Sidebar />
            </div>

            {/* 🔥 MAIN SECTION */}
            <div className="flex-1 flex flex-col ml-[260px] h-screen">

                {/* Topbar */}
                <div className="sticky top-0 z-40 backdrop-blur-glass bg-[#0D0D0D]/70 border-b border-borderSubtle">
                    <Topbar />
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-6 bg-background">
                    <div className="max-w-[1400px] mx-auto">
                        <Outlet />
                    </div>
                </div>

            </div>

        </div>
    );
};

export default AdminLayout;