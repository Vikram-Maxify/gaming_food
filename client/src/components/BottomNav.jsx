import { Home, Utensils, ShoppingCart, User, Sparkles } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { getCartThunk } from "../reducer/slice/cartSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


const TabStyle1 = () => {
    const location = useLocation();
      const { cartItems } = useSelector((state) => state.cart);

    const dispatch = useDispatch();


    const navItems = [
        { to: "/", label: "Home", icon: Home },
        { to: "/menu", label: "Menu", icon: Utensils },
        { to: "/cart", label: "Cart", icon: ShoppingCart },
        { to: "/profile", label: "Profile", icon: User },
    ];

    // Cart item count (example - replace with actual Redux state)
    const cartItemCount = cartItems.length;
      useEffect(() => {
        dispatch(getCartThunk());
      }, [dispatch]);
    


    return (
        <div className="fixed bottom-0 left-0 w-full md:hidden z-50">
            {/* Main Tab Bar Container */}
            <div className="relative mx-3 mb-3">
                
                {/* Glow Effect Behind */}
                <div className="absolute -inset-1 bg-orange-500/20 rounded-2xl blur-xl"></div>
                
                {/* Tab Bar with Glassmorphism */}
                <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
                    
                    {/* Animated Gradient Border Top */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600"></div>
                    
                    {/* Decorative Background Pattern */}
                    <div className="absolute inset-0 opacity-5" style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, #f97316 1px, transparent 1px)`,
                        backgroundSize: '20px 20px'
                    }}></div>

                    <ul className="flex items-center h-[70px] px-2">
                        {navItems.map((item, index) => {
                            const Icon = item.icon;
                            const isActive = location.pathname === item.to;

                            return (
                                <li
                                    key={item.to}
                                    className="flex-1 flex justify-center items-center relative"
                                >
                                    {/* Active Tab Indicator Dot */}
                                    {isActive && (
                                        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-orange-500 rounded-full shadow-glow"></div>
                                    )}
                                    
                                    <Link
                                        to={item.to}
                                        className={`
                                            relative flex flex-col items-center justify-center gap-1
                                            transition-all duration-300 ease-out
                                            ${isActive 
                                                ? "text-orange-500 -translate-y-1" 
                                                : "text-gray-500 hover:text-orange-400"
                                            }
                                        `}
                                    >
                                        {/* Icon Container with Background on Active */}
                                        <div className={`
                                            relative p-2.5 rounded-xl transition-all duration-300
                                            ${isActive 
                                                ? "bg-gradient-to-br from-orange-50 to-orange-100 shadow-md" 
                                                : ""
                                            }
                                        `}>
                                            <Icon 
                                                size={isActive ? 22 : 20} 
                                                className={`transition-all duration-300 ${isActive ? "scale-110" : ""}`}
                                                strokeWidth={isActive ? 2 : 1.8}
                                            />
                                            
                                            {/* Cart Badge */}
                                            {item.label === "Cart" && cartItemCount > 0 && (
                                                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-500 to-orange-600 text-[9px] font-bold text-white rounded-full px-1.5 py-0.5 min-w-[16px] text-center shadow-md animate-pulse">
                                                    {cartItemCount}
                                                </span>
                                            )}
                                        </div>
                                        
                                        {/* Label - Only show on active or hover (optional) */}
                                        <span className={`
                                            text-[10px] font-medium transition-all duration-300
                                            ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"}
                                        `}>
                                            {item.label}
                                        </span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                    
                    {/* Safe Area Indicator for Notch iPhones */}
                    <div className="h-1 w-10 mx-auto mb-1.5 bg-gray-300/50 rounded-full"></div>
                </div>
            </div>
        </div>
    );
};

export default TabStyle1;