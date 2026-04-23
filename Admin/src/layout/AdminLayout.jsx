import React from "react";
import Sidebar from "../component/Sidebar";
import Topbar from "../component/Topbar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
    return (
        <div className="flex min-h-screen bg-background text-textPrimary">

            {/* Sidebar */}
            <div className="w-[260px] bg-surface border-r border-borderSubtle">
                <Sidebar />
            </div>

            {/* Main Section */}
            <div className="flex-1 flex flex-col">

                {/* Topbar */}
                <div className="sticky top-0 z-50 backdrop-blur-glass bg-[#0D0D0D]/70 border-b border-borderSubtle">
                    <Topbar />
                </div>

                {/* Content */}
                <div className="flex-1 p-6 bg-background">
                    <div className="max-w-[1400px] mx-auto">
                        <Outlet />
                    </div>
                </div>

            </div>

        </div>
    );
};

export default AdminLayout;