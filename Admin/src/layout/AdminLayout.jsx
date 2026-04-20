import React from "react";
import Sidebar from "../component/Sidebar"; 
import Topbar from "../component/Topbar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
    return (
        <div className="flex min-h-screen bg-secondary">

            {/* Sidebar */}
            <Sidebar />

            {/* Main */}
            <div className="flex-1 flex flex-col">

                <Topbar />

                <div className="p-4">
                    <Outlet />
                </div>

            </div>

        </div>
    );
};

export default AdminLayout;