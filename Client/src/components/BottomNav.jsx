import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Utensils, ShoppingCart, User } from "lucide-react";

const BottomNav = () => {
    const navItems = [
        { to: "/", label: "Home", icon: Home },
        { to: "/menu/all", label: "Menu", icon: Utensils },
        { to: "/cart", label: "Cart", icon: ShoppingCart },
        { to: "/profile", label: "Profile", icon: User },
    ];

    return (
        <div className="fixed bottom-4 left-0 right-0 flex justify-center z-50">

            {/* Container */}
            <div className="bg-text-primary px-2 py-2 rounded-full flex items-center gap-2 shadow-lg">

                {navItems.map((item, i) => {
                    const Icon = item.icon;

                    return (
                        <NavLink key={i} to={item.to}>
                            {({ isActive }) => (
                                <div
                                    className={`flex items-center transition-all duration-300 ${isActive
                                            ? "bg-card text-text-primary px-4 py-2 rounded-full gap-2 shadow-sm"
                                            : "text-text-secondary p-2"
                                        }`}
                                >
                                    <Icon size={18} />

                                    {/* Label only when active */}
                                    {isActive && (
                                        <span className="text-xs font-medium">
                                            {item.label}
                                        </span>
                                    )}
                                </div>
                            )}
                        </NavLink>
                    );
                })}

            </div>

        </div>
    );
};

export default BottomNav;