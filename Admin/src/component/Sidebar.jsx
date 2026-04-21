import React from "react";
import { NavLink } from "react-router-dom";
import {
    LayoutDashboard,
    Utensils,
    ShoppingCart,
    Users,
    Settings,
    Gift,
} from "lucide-react";

const Sidebar = () => {
    const links = [
        { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
        { to: "/admin/menu", label: "Menu", icon: Utensils },
        { to: "/admin/categories", label: "Categories", icon: Utensils },
        { to: "/admin/add_item", label: "Add Item", icon: Utensils },
        { to: "/admin/table", label: "Add Table", icon: Utensils },
        { to: "/admin/orders", label: "Orders", icon: ShoppingCart },
        { to: "/admin/schef_dash", label: "Shef Dashboard", icon: LayoutDashboard },
        { to: "/admin/users", label: "Users", icon: Users },
        { to: "/admin/coins_mng", label: "Coin Manage", icon: Gift },
        { to: "/admin/settings", label: "Settings", icon: Settings },
    ];

    return (
        <div className="h-screen w-60 bg-white border-r border-gray-200 p-4 flex flex-col">

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
    );
};

export default Sidebar;