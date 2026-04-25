import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import SearchBar from "./SearchBar";
import ProfilePopup from "./ProfilePopup";
import { getSettings } from "../reducer/slice/settingSlice";

const Navbar = () => {
    const { token } = useSelector((state) => state.auth);
    const { settings } = useSelector((state) => state.settings);

    const dispatch = useDispatch();

    console.log(settings);


    const [open, setOpen] = useState(false);

    useEffect(() => {
        dispatch(getSettings());
    }, [dispatch]);

    return (
        <div className="hidden md:block sticky top-0 z-50">
            <div className="w-full flex items-center justify-between px-6 py-3 bg-white/90 backdrop-blur-md shadow-sm border-b">

                {/* 🔥 LEFT */}
                <div className="flex items-center gap-8">

                    {/* Logo + Title */}
{settings && (
  <Link to="/" className="flex items-center gap-2">
    <img
      src={settings.logo}
      alt={settings.title}
      className="w-8 h-8 object-contain"
    />

    <h1 className="text-lg font-semibold">
      {settings.title}
    </h1>
  </Link>
)}

                    {/* Nav Links */}
                    <nav className="flex gap-5 text-sm font-medium text-gray-700">
                        <Link to="/" className="hover:text-orange-500 transition">Home</Link>
                        <Link to="/menu" className="hover:text-orange-500 transition">Menu</Link>
                        <Link to="/offers" className="hover:text-orange-500 transition">Offers</Link>
                        <Link to="/contact" className="hover:text-orange-500 transition">Contact</Link>
                    </nav>
                </div>

                {/* 🔥 CENTER (Search) */}
                <div className="w-[40%]">
                    <SearchBar />
                </div>

                {/* 🔥 RIGHT */}
                <div className="flex items-center gap-5">

                    {/* Auth Links */}
                    {!token && (
                        <div className="flex gap-3 text-sm">
                            <Link
                                to="/login"
                                className="px-3 py-1 rounded-md hover:bg-gray-100 transition"
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="px-3 py-1 rounded-md bg-orange-500 text-white hover:bg-orange-600 transition"
                            >
                                Register
                            </Link>
                        </div>
                    )}

                    {/* Cart */}
                    <Link to="/cart">
                        <button className="relative p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition">
                            <ShoppingCart size={20} />
                            <span className="absolute -top-1 -right-1 bg-red-500 text-xs text-white rounded-full px-1">
                                2
                            </span>
                        </button>
                    </Link>

                    {/* 🔥 Profile Avatar */}
                    {token && (
                        <div className="relative">
                            <img
                                onClick={() => setOpen(!open)}
                                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100"
                                alt="profile"
                                className="w-10 h-10 rounded-full object-cover border border-gray-300 cursor-pointer hover:scale-105 transition"
                            />

                            {open && <ProfilePopup onClose={() => setOpen(false)} />}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;