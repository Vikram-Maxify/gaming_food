import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../reducer/slice/authSlice";
import { useNavigate } from "react-router-dom";

const ProfilePopup = ({ onClose }) => {
    const popupRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.auth);

    // 👉 click outside close
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (popupRef.current && !popupRef.current.contains(e.target)) {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [onClose]);

    const handleLogout = async () => {
        await dispatch(logoutUser());
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div
            ref={popupRef}
            className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden animate-in fade-in zoom-in-95"
        >
            {/* Top Gradient */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-5 text-white">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                        {user?.avatar ? (
                            <img
                                src={user.avatar}
                                alt={user.name}
                                className="w-12 h-12 rounded-full object-cover"
                            />
                        ) : (
                            <span className="text-xl font-bold">
                                {user?.name?.charAt(0)?.toUpperCase()}
                            </span>
                        )}
                    </div>

                    <div>
                        <h3 className="font-semibold text-lg">
                            {user?.name || "User"}
                        </h3>
                        <p className="text-sm opacity-80">
                            {user?.mobile || "No number"}
                        </p>
                    </div>
                </div>
            </div>

            {/* Body */}
            <div className="p-4 space-y-3">

                {/* Divider */}
                <div className="border-t"></div>

                {/* Logout */}
                <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 rounded-xl hover:bg-red-50 transition flex items-center justify-between"
                >
                    <span className="text-red-500 font-medium">Logout</span>
                    <span>🚪</span>
                </button>

            </div>
        </div>
    );
};

export default ProfilePopup;