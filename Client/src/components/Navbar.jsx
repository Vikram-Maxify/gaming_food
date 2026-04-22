import React from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";

const Navbar = () => {

    const { token, user } = useSelector((state) => state.auth);

    return (
        <div className="w-full flex items-center justify-between p-3 md:px-6">

            {/* LEFT (Desktop only) */}
            <div className="hidden md:flex items-center gap-6">
                <Link to="/"><h1 className="text-lg font-semibold">Foodie</h1></Link>

                <nav className="flex gap-4 text-sm text-text-secondary ">
                    <Link to="/" className="shadow-sm hover:text-red-500 rounded-sm px-1">Home</Link>
                    <Link to="/menu" className="shadow-sm hover:text-red-500 rounded-sm px-1">Menu</Link>
                    <Link to="/offers" className="shadow-sm hover:text-red-500 rounded-sm px-1">Offers</Link>
                    <Link to="/contact" className="shadow-sm hover:text-red-500 rounded-sm px-1">Contact</Link>
                </nav>
            </div>

            {/* RIGHT */}
            {/* RIGHT */}
            <div className="flex items-center gap-3 ml-auto">

                <div className="flex gap-4 text-sm text-text-secondary">

                    {/* show only if NOT logged in */}
                    {!token && (
                        <>
                            <Link to="/login" className="shadow-sm hover:bg-gray-300 rounded-sm px-1">
                                Login
                            </Link>

                            <Link to="/register" className="shadow-sm hover:bg-gray-300 rounded-sm px-1">
                                Register
                            </Link>
                        </>
                    )}

                </div>

                {/* Desktop Icons */}
                <div className="hidden md:flex items-center gap-3">

                    <button className="bg-card p-2 rounded-full shadow-sm hover:scale-105 transition">
                        <Search size={18} className="text-text-primary" />
                    </button>

                    <Link to="/cart">
                        <button className="bg-card p-2 rounded-full shadow-sm relative hover:scale-105 transition">
                            <ShoppingCart size={18} className="text-text-primary" />

                            <span className="absolute -top-1 -right-1 bg-primary text-xs text-white rounded-full px-1">
                                2
                            </span>
                        </button>
                    </Link>

                </div>

                {/* Profile image */}
                <Link to="/profile">
                    <img
                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100"
                        alt="profile"
                        className="w-9 h-9 md:w-10 md:h-10 rounded-full object-cover border border-secondary-dark hidden md:block"
                    />
                </Link>
            </div>
        </div>
    );
};

export default Navbar;