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
    User,
} from "lucide-react";

const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const links = [
        { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
        { to: "/admin/menu", label: "Menu", icon: SquareMenu },
        { to: "/admin/categories", label: "Categories", icon: Utensils },
        { to: "/admin/add_item", label: "Add Item", icon: Utensils },
        { to: "/admin/table", label: "Add Table", icon: Table },
        { to: "/admin/orders", label: "Orders", icon: ShoppingCart },
        { to: "/admin/schef_dash", label: "Chef Dashboard", icon: LayoutDashboard },
        { to: "/admin/users", label: "Users", icon: Users },
        { to: "/admin/coins_mng", label: "Coin Manage", icon: Gift },
        { to: "/admin/settings", label: "Settings", icon: Settings },
        { to: "/admin/baner_mng", label: "Banner Manager", icon: Settings },
        { to: "/admin/profile", label: "Profile", icon: User },
    ];

    const handleLogout = async () => {
        await dispatch(logoutAdmin());
        localStorage.removeItem("token");
        navigate("/admin/login");
    };

    return (
        <div className="h-screen w-[260px] bg-surface border-r border-borderSubtle flex flex-col justify-between p-4">

            {/* TOP */}
            <div>

                {/* 🔥 Logo */}
                <div className="mb-8">
                    <h1 className="text-xl font-semibold text-textPrimary tracking-wide">
                        Hungry Fork
                    </h1>
                    <p className="text-xs text-textSecondary mt-1">
                        Admin Dashboard
                    </p>
                </div>

                {/* Links */}
                <div className="flex flex-col gap-1">

                    {links.map((item, i) => {
                        const Icon = item.icon;

                        return (
                            <NavLink key={i} to={item.to}>
                                {({ isActive }) => (
                                    <div
                                        className={`
                                        group flex items-center gap-3 px-4 py-2.5 rounded-xl2 text-sm transition-smooth duration-300 cursor-pointer
                                        
                                        ${isActive
                                                ? "bg-sidebarActive border-l-[3px] border-primary text-textPrimary shadow-glow"
                                                : "text-textSecondary hover:text-textPrimary hover:bg-[#1A1A1A]"
                                            }
                                        `}
                                    >
                                        <Icon
                                            size={18}
                                            className={`transition ${
                                                isActive
                                                    ? "text-primary"
                                                    : "text-textSecondary group-hover:text-primary"
                                            }`}
                                        />
                                        <span className="font-medium">
                                            {item.label}
                                        </span>
                                    </div>
                                )}
                            </NavLink>
                        );
                    })}
                </div>

            </div>

            {/* 🔥 LOGOUT */}
            <div
                onClick={handleLogout}
                className="group flex items-center gap-3 px-4 py-2.5 rounded-xl2 text-sm text-danger hover:bg-[#1A1A1A] cursor-pointer transition"
            >
                <LogOut size={18} className="group-hover:scale-110 transition" />
                Logout
            </div>

        </div>
    );
};

export default Sidebar;