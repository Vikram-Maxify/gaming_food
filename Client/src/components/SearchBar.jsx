import React from "react";
import { Search, SlidersHorizontal } from "lucide-react";

const SearchBar = () => {
    return (
        <div className="flex items-center gap-2 mb-4">

            {/* Search Input */}
            <div className="flex items-center bg-card px-3 py-2 rounded-full shadow-sm flex-1">
                <Search size={18} className="text-text-secondary mr-2" />
                <input
                    type="text"
                    placeholder="Search burger, pizza..."
                    className="bg-transparent outline-none text-sm w-full focus-within:ring-2 focus-within:ring-primary"
                />
            </div>

            {/* Filter Button */}
            <button className="bg-primary p-2 rounded-full shadow-sm hover:scale-105 transition">
                <SlidersHorizontal size={18} className="text-white" />
            </button>

        </div>
    );
};

export default SearchBar;