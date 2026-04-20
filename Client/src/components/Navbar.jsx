import React from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingCart } from "lucide-react";

const Navbar = () => {
    return (
        <div className="w-full flex items-center justify-between p-3 md:px-6">

            {/* LEFT (Desktop only) */}
            <div className="hidden md:flex items-center gap-6">
                <h1 className="text-lg font-semibold">Foodie</h1>

                <nav className="flex gap-4 text-sm text-text-secondary">
                    <Link to="/">Home</Link>
                    <Link to="/menu">Menu</Link>
                    <Link to="/offers">Offers</Link>
                    <Link to="/contact">Contact</Link>
                </nav>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-3 ml-auto">
                <div className="flex gap-4 text-sm text-text-secondary">
                    <Link to="/login">Login</Link>
                    <Link to ="/register">Register</Link>
                </div>

                {/* Desktop Icons */}
                <div className="hidden md:flex items-center gap-3">

                    <button className="bg-card p-2 rounded-full shadow-sm hover:scale-105 transition">
                        <Search size={18} className="text-text-primary" />
                    </button>

                    <button className="bg-card p-2 rounded-full shadow-sm relative hover:scale-105 transition">
                        <ShoppingCart size={18} className="text-text-primary" />

                        <span className="absolute -top-1 -right-1 bg-primary text-xs text-white rounded-full px-1">
                            2
                        </span>
                    </button>

                </div>

                {/* Profile (Unsplash image) */}
                <img
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100"
                    alt="profile"
                    className="w-9 h-9 md:w-10 md:h-10 rounded-full object-cover border border-secondary-dark"
                />
            </div>
        </div>
    );
};

export default Navbar;