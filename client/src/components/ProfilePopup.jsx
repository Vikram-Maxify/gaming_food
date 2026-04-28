// src/components/ProfilePopup.jsx
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../reducer/slice/authSlice";
import { User, ShoppingBag, Heart, Settings, LogOut, X } from "lucide-react";

const ProfilePopup = ({ onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logoutUser());
    localStorage.removeItem("token");
    navigate("/login");
    onClose();
  };

  return (
    <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-slide-down">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-3 flex justify-between items-center">
        <span className="text-white text-sm font-semibold">My Account</span>
        <button onClick={onClose} className="text-white/80 hover:text-white">
          <X size={16} />
        </button>
      </div>

      {/* Menu Items */}
      <div className="py-2">
        <Link
          to="/profile"
          onClick={onClose}
          className="flex items-center gap-3 px-4 py-2.5 hover:bg-orange-50 transition-colors group"
        >
          <User size={16} className="text-gray-400 group-hover:text-orange-500" />
          <span className="text-sm text-gray-700 group-hover:text-orange-500">My Profile</span>
        </Link>

        <Link
          to="/orders"
          onClick={onClose}
          className="flex items-center gap-3 px-4 py-2.5 hover:bg-orange-50 transition-colors group"
        >
          <ShoppingBag size={16} className="text-gray-400 group-hover:text-orange-500" />
          <span className="text-sm text-gray-700 group-hover:text-orange-500">My Orders</span>
        </Link>

        <Link
          to="/wishlist"
          onClick={onClose}
          className="flex items-center gap-3 px-4 py-2.5 hover:bg-orange-50 transition-colors group"
        >
          <Heart size={16} className="text-gray-400 group-hover:text-orange-500" />
          <span className="text-sm text-gray-700 group-hover:text-orange-500">Wishlist</span>
        </Link>

        <Link
          to="/settings"
          onClick={onClose}
          className="flex items-center gap-3 px-4 py-2.5 hover:bg-orange-50 transition-colors group"
        >
          <Settings size={16} className="text-gray-400 group-hover:text-orange-500" />
          <span className="text-sm text-gray-700 group-hover:text-orange-500">Settings</span>
        </Link>

        <div className="border-t border-gray-100 my-1"></div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 transition-colors group"
        >
          <LogOut size={16} className="text-gray-400 group-hover:text-red-500" />
          <span className="text-sm text-gray-700 group-hover:text-red-500">Logout</span>
        </button>
      </div>

      <style jsx>{`
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-down {
          animation: slide-down 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ProfilePopup;