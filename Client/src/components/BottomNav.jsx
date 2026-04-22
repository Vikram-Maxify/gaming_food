import { useState } from "react";
import { Home, Utensils, ShoppingCart, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const TabStyle1 = () => {
    const location = useLocation();
    const [active, setActive] = useState(location.pathname);

    const navItems = [
        { to: "/", label: "Home", icon: Home },
        { to: "/menu", label: "Menu", icon: Utensils },
        { to: "/cart", label: "Cart", icon: ShoppingCart },
        { to: "/profile", label: "Profile", icon: User },
    ];

    return (
        <div className="fixed bottom-0 left-0 w-full md:hidden  justify-center z-50 ">
            <div className="w-full bg-white rounded-t-2xl shadow-lg relative overflow-hidden">

                <ul className="flex justify-between items-center h-[90px] px-4 relative">

                    {navItems.map((item, index) => {
                        const Icon = item.icon;
                        const isActive = active === item.to;

                        return (
                            <li key={item.to}>
                                <Link
                                    to={item.to}
                                    onClick={() => setActive(item.to)}
                                    className={`flex items-center justify-center w-[60px] h-[60px] transition-all duration-300
                    ${isActive
                                            ? "text-orange-600 -translate-y-3 bg-orange-100 rounded-full shadow-lg"
                                            : "text-gray-500"
                                        }
                  `}
                                >
                                    <Icon size={22} />
                                </Link>
                            </li>
                        );
                    })}

                    {/* FOLLOW ANIMATION CIRCLE */}
                    {/* {<div
                        className="absolute bottom-[20px] w-[60px] h-[60px] rounded-full border-[10px] border-gray-200 bg-gray-200 transition-all duration-300"
                        style={{
                            left: `${navItems.findIndex((i) => i.to === active) * 25}%`,
                        }}
                    />} */}
                </ul>
            </div>
        </div>
    );
};

export default TabStyle1;




// import React from "react";
// import { NavLink } from "react-router-dom";
// import { Home, Utensils, ShoppingCart, User } from "lucide-react";

// const BottomNav = () => {
//     const navItems = [
//         { to: "/", label: "Home", icon: Home },
//         { to: "/menu", label: "Menu", icon: Utensils },
//         { to: "/cart", label: "Cart", icon: ShoppingCart },
//         { to: "/profile", label: "Profile", icon: User },
//     ];

//     return (
//         <div className="fixed bottom-4 left-0 right-0 flex justify-center z-50">

//             {/* Container */}
//             <div className="bg-text-primary px-2 py-2 rounded-full flex items-center gap-2 shadow-lg">

//                 {navItems.map((item, i) => {
//                     const Icon = item.icon;

//                     return (
//                         <NavLink key={i} to={item.to}>
//                             {({ isActive }) => (
//                                 <div
//                                     className={`flex items-center transition-all duration-300 ${isActive
//                                             ? "bg-card text-text-primary px-4 py-2 rounded-full gap-2 shadow-sm"
//                                             : "text-text-secondary p-2"
//                                         }`}
//                                 >
//                                     <Icon size={18} />

//                                     {/* Label only when active */}
//                                     {isActive && (
//                                         <span className="text-xs font-medium">
//                                             {item.label}
//                                         </span>
//                                     )}
//                                 </div>
//                             )}
//                         </NavLink>
//                     );
//                 })}

//             </div>

//         </div>
//     );
// };

// export default BottomNav;