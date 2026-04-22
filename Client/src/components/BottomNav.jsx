import { Home, Utensils, ShoppingCart, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const TabStyle1 = () => {
    const location = useLocation();

    const navItems = [
        { to: "/", label: "Home", icon: Home },
        { to: "/menu", label: "Menu", icon: Utensils },
        { to: "/cart", label: "Cart", icon: ShoppingCart },
        { to: "/profile", label: "Profile", icon: User },
    ];

    return (
        <div className="fixed bottom-0 left-0 w-full md:hidden z-50">
            <div className="w-full bg-gradient-to-r from-orange-500 via-pink-500 to-red-500 rounded-t-2xl shadow-lg">

                <ul className="flex items-center h-[85px]">

                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.to;

                        return (
                            <li
                                key={item.to}
                                className="flex-1 flex justify-center items-center"
                            >
                                <Link
                                    to={item.to}
                                    className={`flex items-center justify-center w-[60px] h-[60px] rounded-full transition-all duration-300
                                        ${isActive
                                            ? "text-white -translate-y-2 bg-white/20 backdrop-blur-md shadow-md"
                                            : "text-white/70"
                                        }`}
                                >
                                    <Icon size={22} />
                                </Link>
                            </li>
                        );
                    })}

                </ul>
            </div>
        </div>
    );
};

export default TabStyle1;