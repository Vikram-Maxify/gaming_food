import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutAdmin } from "../redux/slice/adminSlice";

import {
    LayoutDashboard,
    Utensils,
    ShoppingCart,
    Users,
    Settings,
    Gift,
    LogOut,
    SquareMenu,
    Table,
    
} from "lucide-react";

const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const links = [
        { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
        { to: "/admin/menu", label: "Menu", icon: SquareMenu },
        { to: "/admin/categories", label: "Categories", icon: Utensils },
        { to: "/admin/add_item", label: "Add Item", icon:  Utensils},
        { to: "/admin/table", label: "Add Table", icon: Table },
        { to: "/admin/orders", label: "Orders", icon: ShoppingCart },
        { to: "/admin/schef_dash", label: "Chef Dashboard", icon: LayoutDashboard },
        { to: "/admin/users", label: "Users", icon: Users },
        { to: "/admin/coins_mng", label: "Coin Manage", icon: Gift },
        { to: "/admin/settings", label: "Settings", icon: Settings },
    ];

    // 🔥 Logout handler
    const handleLogout = async () => {
        await dispatch(logoutAdmin());

        // agar token localStorage me hai
        localStorage.removeItem("token");

        navigate("/admin/login");
    };

    return (
        <div className="h-screen w-60 bg-white border-r border-gray-200 p-4 flex flex-col justify-between">

            {/* TOP */}
            <div>

                {/* Logo */}
                <h1 className="text-lg font-semibold text-gray-900 mb-6">
                    Admin Panel
                </h1>

                {/* Links */}
                <div className="flex flex-col gap-1">
                    {links.map((item, i) => {
                        const Icon = item.icon;

                        return (
                            <NavLink key={i} to={item.to}>
                                {({ isActive }) => (
                                    <div
                                        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200
                    ${isActive
                                                ? "bg-gray-100 text-gray-900 font-medium"
                                                : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                                            }`}
                                    >
                                        <Icon size={18} />
                                        {item.label}
                                    </div>
                                )}
                            </NavLink>
                        );
                    })}
                </div>

            </div>

            {/* 🔥 LOGOUT (BOTTOM) */}
            <div
                onClick={handleLogout}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-500 hover:bg-red-50 cursor-pointer"
            >
                <LogOut size={18} />
                Logout
            </div>

        </div>
    );
};

export default Sidebar;