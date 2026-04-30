import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { chefLogout } from "../redux/slice/chefAuthSlice";
import toast from "react-hot-toast";

import { LogOut, ClipboardList, CheckCircle, User } from "lucide-react";

const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const links = [
        {
            to: "/chef/live-orders",
            label: "Live Orders",
            icon: ClipboardList,
        },
        {
            to: "/chef/completed-orders",
            label: "Completed Orders",
            icon: CheckCircle,
        },
        {
            to: "/chef/profile",
            label: "Profile",
            icon: User,
        },
    ];

    // ✅ CLEAN LOGOUT
    const handleLogout = async () => {
        try {
            const res = await dispatch(chefLogout());

            if (res?.payload?.success || res?.type?.includes("fulfilled")) {
                navigate("/login");
            }
        } catch (error) {
            console.log("Logout error:", error);
        }
    };

    return (
        <div className="h-screen w-[260px] bg-surface border-r border-borderSubtle flex flex-col justify-between p-4">

            {/* 🔝 TOP */}
            <div>

                <div className="mb-8">
                    <h1 className="text-xl font-semibold text-textPrimary tracking-wide">
                        Hungry Fork
                    </h1>
                    <p className="text-xs text-textSecondary mt-1">
                        Chef Dashboard
                    </p>
                </div>

                <div className="flex flex-col gap-1">

                    {links.map((item, i) => {
                        const Icon = item.icon;

                        return (
                            <NavLink key={i} to={item.to}>
                                {({ isActive }) => (
                                    <div
                                        className={`
                      group flex items-center gap-3 px-4 py-2.5 rounded-xl2 text-sm transition cursor-pointer
                      
                      ${isActive
                                                ? "bg-sidebarActive border-l-[3px] border-primary text-textPrimary shadow-glow"
                                                : "text-textSecondary hover:text-textPrimary hover:bg-[#1A1A1A]"
                                            }
                    `}
                                    >
                                        <Icon
                                            size={18}
                                            className={`${isActive
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

            {/* 🔻 LOGOUT */}
            <div
                onClick={handleLogout}
                className="group flex items-center gap-3 px-4 py-2.5 rounded-xl2 text-sm text-danger hover:bg-[#1A1A1A] cursor-pointer transition"
            >
                <LogOut size={18} />
                Logout
            </div>

        </div>
    );
};

export default Sidebar;