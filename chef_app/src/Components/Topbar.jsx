import React from "react";

const Topbar = () => {
    return (
        <div className="h-16 bg-cardGradient border-b border-borderSubtle flex items-center justify-between px-6">

            {/* Left */}
            <h1 className="text-lg font-semibold text-textPrimary">
                👨‍🍳 Chef Dashboard
            </h1>

            {/* Right */}
            <div className="flex items-center gap-4">

                {/* Status */}
                <span className="text-sm text-green-400">
                    ● Online
                </span>

                {/* Avatar */}
                <div className="w-9 h-9 rounded-full bg-[#1A1A1A] border border-borderSubtle flex items-center justify-center text-textPrimary">
                    C
                </div>

            </div>

        </div>
    );
};

export default Topbar;