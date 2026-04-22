import React from "react";
import { Search, SlidersHorizontal } from "lucide-react";

const SearchBar = () => {

    return (

        <div className="flex items-center justify-center gap-3 mb-4 px-2">

            {/* Search Input */}
            <div className="relative w-full md:w-1/2 px-3">

                {/* Search Icon */}
                <Search
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 ms-3"
                />

                <input
                    type="text"
                    placeholder="Search burger, pizza..."
                    className="w-full pl-12 pr-4 py-2 rounded-full border border-gray-300 
                 focus:ring-2 focus:ring-orange-200 outline-none text-sm"
                />
            </div>

            {/* Filter Button */}
            <button
                className="bg-orange-200 p-2.5 rounded-full shadow-md 
               hover:bg-orange-200 hover:scale-105 
               active:scale-95 transition duration-200"
            >
                <SlidersHorizontal size={18} className="text-white" />
            </button>

        </div>
    );
};

export default SearchBar;