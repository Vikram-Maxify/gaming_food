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
        navigate("/login"); // 🔥 redirect after logout
    };

    if (loading || !chef) {
        return (
            <div className="text-textSecondary flex justify-center items-center h-[60vh]">
                Loading profile...
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto bg-cardGradient border border-borderSubtle rounded-xl2 shadow-soft p-6">

            {/* 🔝 HEADER */}
            <div className="flex items-center gap-4 mb-6">

                {/* Avatar */}
                <div className="w-14 h-14 rounded-full bg-[#1A1A1A] flex items-center justify-center text-xl text-textPrimary border border-borderSubtle">
                    {chef.name?.charAt(0)}
                </div>

                <div>
                    <h2 className="text-xl font-semibold text-textPrimary">
                        {chef.name}
                    </h2>
                    <p className="text-sm text-textSecondary">
                        👨‍🍳 Chef
                    </p>
                </div>

            </div>

            {/* 📋 DETAILS */}
            <div className="space-y-4">

                <div className="flex justify-between border-b border-borderSubtle pb-2">
                    <span className="text-textSecondary text-sm">Mobile</span>
                    <span className="text-textPrimary">{chef.mobile}</span>
                </div>

                <div className="flex justify-between border-b border-borderSubtle pb-2">
                    <span className="text-textSecondary text-sm">Category</span>
                    <span className="text-textPrimary">
                        {chef.category?.name || chef.category}
                    </span>
                </div>

                <div className="flex justify-between border-b border-borderSubtle pb-2">
                    <span className="text-textSecondary text-sm">Joined</span>
                    <span className="text-textPrimary">
                        {new Date(chef.createdAt).toLocaleDateString()}
                    </span>
                </div>

            </div>

            {/* 🚪 LOGOUT */}
            <button
                onClick={handleLogout}
                className="mt-6 w-full bg-red-500/90 hover:bg-red-600 text-white py-2.5 rounded-xl2 transition font-medium"
            >
                Logout
            </button>

        </div>
    );
};

export default ChefProfile;