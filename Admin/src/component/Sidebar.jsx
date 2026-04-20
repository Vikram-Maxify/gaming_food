import React from "react";
import { NavLink } from "react-router-dom";
import {
    LayoutDashboard,
    Utensils,
    ShoppingCart,
    Users,
    Settings,
} from "lucide-react";

const Sidebar = () => {
    const links = [
        { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
        { to: "/admin/menu", label: "Menu", icon: Utensils },
        { to: "/admin/orders", label: "Orders", icon: ShoppingCart },
        { to: "/admin/users", label: "Users", icon: Users },
        { to: "/admin/settings", label: "Settings", icon: Settings },
    ];

    return (
        <div className="h-screen w-60 bg-card border-r border-secondary-dark p-4  flex-col">

            {/* Logo */}
            <h1 className="text-lg font-semibold mb-6">Admin</h1>

            {/* Links */}
            <div className="flex flex-col gap-2">
                {links.map((item, i) => {
                    const Icon = item.icon;

                    return (
                        <NavLink key={i} to={item.to}>
                            {({ isActive }) => (
                                <div
                                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${isActive
                                            ? "bg-primary text-white"
                                            : "text-text-secondary hover:bg-secondary"
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
    );
};

export default Sidebar;