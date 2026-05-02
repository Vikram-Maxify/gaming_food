import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { chefProfile, chefLogout } from "../redux/slice/chefAuthSlice";
import { useNavigate } from "react-router-dom";

const ChefProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { chef, loading } = useSelector((state) => state.chef);

    useEffect(() => {
        if (!chef) {
            dispatch(chefProfile());
        }
    }, [dispatch, chef]);

    const handleLogout = async () => {
        await dispatch(chefLogout());
        navigate("/login");
    };

    if (loading || !chef) {
        return (
            <div className="text-textSecondary flex justify-center items-center h-[60vh]">
                Loading profile...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-surface flex items-center justify-center px-6">

            <div className="
        w-full max-w-xl
        bg-card
        border border-borderSubtle/70
        rounded-2xl
        p-7
        shadow-[0_10px_40px_rgba(0,0,0,0.4)]
      ">

                {/* 🔝 HEADER */}
                <div className="flex items-center gap-4 mb-8">

                    {/* Avatar */}
                    <div className="
            w-16 h-16 rounded-full
            bg-card border border-borderSubtle
            flex items-center justify-center
            text-xl font-semibold text-textPrimary
            shadow-inner
          ">
                        {chef.name?.charAt(0)}
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold tracking-wide">
                            {chef.name}
                        </h2>
                        <p className="text-sm text-textSecondary">
                            👨‍🍳 Chef
                        </p>
                    </div>

                </div>

                {/* 📋 DETAILS */}
                <div className="space-y-5">

                    <div className="flex justify-between items-center">
                        <span className="text-textSecondary text-sm">Mobile</span>
                        <span className="text-textPrimary font-medium">
                            {chef.mobile}
                        </span>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-textSecondary text-sm">Category</span>
                        <span className="text-textPrimary font-medium">
                            {chef.category?.name || chef.category}
                        </span>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-textSecondary text-sm">Credit</span>
                        <span className="text-textPrimary font-medium">
                            {chef.credit?.name || chef.credit}
                        </span>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-textSecondary text-sm">Joined</span>
                        <span className="text-textPrimary font-medium">
                            {new Date(chef.createdAt).toLocaleDateString()}
                        </span>
                    </div>

                </div>

                {/* 🚪 LOGOUT */}
                <button
                    onClick={handleLogout}
                    className="
            mt-8 w-full
            bg-card border border-borderSubtle
            hover:border-red-500/40
            hover:text-red-400
            text-textPrimary
            py-2.5 rounded-xl2
            transition-all duration-200
            font-medium
          "
                >
                    Logout
                </button>

            </div>
        </div>
    );
};

export default ChefProfile;