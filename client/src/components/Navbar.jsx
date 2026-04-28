import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Search, Menu, X } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { getSettings } from "../reducer/slice/settingSlice";
import { getCartThunk } from "../reducer/slice/cartSlice";

const Navbar = () => {
    const { token } = useSelector((state) => state.auth);
    const { settings } = useSelector((state) => state.settings);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
          const { cartItems } = useSelector((state) => state.cart);


    useEffect(() => {
        dispatch(getSettings());
                dispatch(getCartThunk());
        
    }, [dispatch]);

    return (
        <>
            {/* Desktop Navbar */}
            <div className="sticky top-0 z-50 hidden md:block">
                <div className="w-full bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-lg">
                    <div className="max-w-7xl mx-auto px-6 py-3">
                        <div className="flex items-center justify-between gap-6">
                            
                            {/* LEFT - Logo */}
                            <div className="flex items-center gap-10">
                                {settings && (
                                    <Link to="/" className="flex items-center gap-2.5 group">
                                        {settings.logo ? (
                                            <img
                                                src={settings.logo}
                                                alt={settings.title}
                                                className="w-9 h-9 object-contain rounded-xl group-hover:scale-105 transition-transform duration-300"
                                            />
                                        ) : (
                                            <div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                                                <span className="text-white font-bold text-lg">F</span>
                                            </div>
                                        )}
                                        <h1 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                                            {settings?.title || "Foodzzy"}
                                        </h1>
                                    </Link>
                                )}

                                {/* Nav Links - Glass Style */}
                                <nav className="flex gap-1">
                                    {["Home", "Menu", "Offers", "Contact"].map((item) => (
                                        <Link
                                            key={item}
                                            to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                                            className="relative px-4 py-2 text-sm font-medium text-gray-600 rounded-full hover:bg-orange-50 hover:text-orange-500 transition-all duration-300 group"
                                        >
                                            {item}
                                            <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-orange-500 group-hover:w-6 group-hover:left-1/2 group-hover:-translate-x-1/2 transition-all duration-300"></span>
                                        </Link>
                                    ))}
                                </nav>
                            </div>

                            {/* CENTER - Premium Search Bar */}
                            <div className="flex-1 max-w-md">
                                <div className="relative group">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                                    <input
                                        type="text"
                                        placeholder="Search anything here..."
                                        className="w-full pl-11 pr-4 py-2.5 bg-gray-50/80 backdrop-blur-sm border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all duration-300"
                                    />
                                </div>
                            </div>

                            {/* RIGHT - Actions */}
                            <div className="flex items-center gap-3">
                                {!token ? (
                                    <div className="flex gap-2">
                                        <Link
                                            to="/login"
                                            className="px-5 py-2 text-sm font-medium text-gray-700 rounded-full hover:bg-gray-100 transition-all duration-300"
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            to="/register"
                                            className="px-5 py-2 text-sm font-medium bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full hover:shadow-lg hover:shadow-orange-200 hover:scale-105 transition-all duration-300"
                                        >
                                            Sign Up
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="relative">
                                        <img
                                            onClick={() => setOpen(!open)}
                                            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100"
                                            alt="profile"
                                            className="w-10 h-10 rounded-full object-cover border-2 border-orange-100 cursor-pointer hover:border-orange-400 hover:scale-105 transition-all duration-300 shadow-md"
                                        />
                                        {open && <ProfilePopup onClose={() => setOpen(false)} />}
                                    </div>
                                )}

                                {/* Cart Button - Premium Style */}
                                <Link to="/cart">
                                    <button className="relative p-2.5 rounded-full bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 hover:border-orange-200 hover:shadow-lg hover:scale-105 transition-all duration-300 group">
                                        <ShoppingCart size={18} className="text-gray-700 group-hover:text-orange-500 transition-colors" />
                                        <span className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-500 to-orange-600 text-[10px] font-bold text-white rounded-full px-1.5 py-0.5 min-w-[18px] text-center shadow-sm">
                                            {cartItems.length}
                                        </span>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Navbar - Premium Modern */}
            <div className="sticky top-0 z-50 md:hidden">
                <div className="bg-white/90 backdrop-blur-xl border-b border-white/20 shadow-sm">
                    <div className="px-4 py-3 flex items-center justify-between">
                        
                        {/* Logo */}
                        {settings && (
                            <Link to="/" className="flex items-center gap-2">
                                {settings.logo ? (
                                    <img src={settings.logo} alt={settings.title} className="w-8 h-8 object-contain" />
                                ) : (
                                    <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                                        <span className="text-white font-bold">F</span>
                                    </div>
                                )}
                                <h1 className="text-lg font-bold text-gray-800">{settings?.title || "Foodzzy"}</h1>
                            </Link>
                        )}

                        <div className="flex items-center gap-3">
                            {/* Mobile Cart */}
                            <Link to="/cart">
                                <button className="relative p-2 rounded-full bg-gray-100">
                                    <ShoppingCart size={18} />
                                    <span className="absolute -top-1 -right-1 bg-orange-500 text-[10px] text-white rounded-full px-1.5">{cartItems.length}</span>
                                </button>
                            </Link>

                            {/* Menu Button */}
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="p-2 rounded-full bg-gray-100"
                            >
                                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu Dropdown */}
                    {mobileMenuOpen && (
                        <div className="border-t border-gray-100 bg-white/95 backdrop-blur-md">
                            <div className="px-4 py-3 space-y-2">
                                {/* Mobile Search */}
                                <div className="relative mb-3">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        className="w-full pl-9 pr-3 py-2 bg-gray-50 rounded-xl text-sm focus:outline-none focus:border-orange-300"
                                    />
                                </div>

                                {["Home", "Menu", "Offers", "Contact"].map((item) => (
                                    <Link
                                        key={item}
                                        to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="block px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-orange-50 hover:text-orange-500 transition"
                                    >
                                        {item}
                                    </Link>
                                ))}

                                {!token ? (
                                    <div className="flex gap-2 pt-2">
                                        <Link
                                            to="/login"
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="flex-1 text-center px-3 py-2 text-sm font-medium rounded-full border border-gray-300"
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            to="/register"
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="flex-1 text-center px-3 py-2 text-sm font-medium bg-orange-500 text-white rounded-full"
                                        >
                                            Sign Up
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-3 pt-2">
                                        <img
                                            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100"
                                            alt="profile"
                                            className="w-10 h-10 rounded-full object-cover border border-orange-200"
                                        />
                                        <span className="text-sm font-medium">My Profile</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Navbar;