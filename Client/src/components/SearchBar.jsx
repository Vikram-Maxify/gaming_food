import React, { useState, useRef, useEffect } from "react";
import { Search, SlidersHorizontal, X, Filter, ChevronDown } from "lucide-react";
import { FaStar, FaRegStar } from "react-icons/fa6";

const SearchBar = () => {
    const [showFilter, setShowFilter] = useState(false);
    const [selectedType, setSelectedType] = useState("all");
    const [priceRange, setPriceRange] = useState(500);
    const [rating, setRating] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    
    const filterRef = useRef(null);
    const filterButtonRef = useRef(null);

    // Close filter popup when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showFilter && 
                filterRef.current && 
                !filterRef.current.contains(event.target) &&
                filterButtonRef.current &&
                !filterButtonRef.current.contains(event.target)) {
                setShowFilter(false);
            }
        };
        
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [showFilter]);

    // Body scroll lock when filter is open
    useEffect(() => {
        if (showFilter) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [showFilter]);

    const handleSearch = (e) => {
        e.preventDefault();
        // Handle search logic here
        console.log("Searching for:", searchQuery);
    };

    const getActiveFiltersCount = () => {
        let count = 0;
        if (selectedType !== "all") count++;
        if (priceRange !== 500) count++;
        if (rating !== null) count++;
        return count;
    };

    const activeFiltersCount = getActiveFiltersCount();

    return (
        <>
            <div className="w-full bg-white/95 backdrop-blur-sm sticky top-0 z-30 py-3 px-4 shadow-sm">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-center gap-3">
                        
                        {/* Search Input Container */}
                        <div className="relative flex-1 md:max-w-lg">
                            <div className="relative group">
                                {/* Search Icon */}
                                <Search
                                    size={18}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors duration-300"
                                />
                                
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
                                    placeholder="Search burger, pizza, biryani..."
                                    className="w-full pl-11 pr-12 py-3 rounded-full border border-gray-200 
                                    bg-gray-50 focus:bg-white focus:ring-2 focus:ring-orange-200 focus:border-orange-300 
                                    outline-none text-sm transition-all duration-300 shadow-sm hover:shadow-md"
                                />
                                
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery("")}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                                    >
                                        <X size={16} />
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Filter Button with Badge */}
                        <button
                            ref={filterButtonRef}
                            onClick={() => setShowFilter(true)}
                            className="relative bg-gradient-to-r from-orange-500 to-orange-600 p-2.5 rounded-full 
                            shadow-md hover:shadow-lg hover:scale-105 active:scale-95 
                            transition-all duration-300 group"
                        >
                            <Filter size={18} className="text-white" />
                            
                            {/* Active Filters Badge */}
                            {activeFiltersCount > 0 && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-white text-orange-500 
                                text-[10px] font-bold rounded-full flex items-center justify-center shadow-md">
                                    {activeFiltersCount}
                                </span>
                            )}
                        </button>
                    </div>

                    {/* Active Filters Chips */}
                    {activeFiltersCount > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3 px-1">
                            {selectedType !== "all" && (
                                <span className="inline-flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-600 rounded-full text-xs">
                                    {selectedType === "veg" ? "🌱 Veg" : "🍗 Non-Veg"}
                                    <button onClick={() => setSelectedType("all")} className="hover:text-orange-800">
                                        <X size={12} />
                                    </button>
                                </span>
                            )}
                            {priceRange !== 500 && (
                                <span className="inline-flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-600 rounded-full text-xs">
                                    ₹{priceRange}+
                                    <button onClick={() => setPriceRange(500)} className="hover:text-orange-800">
                                        <X size={12} />
                                    </button>
                                </span>
                            )}
                            {rating !== null && (
                                <span className="inline-flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-600 rounded-full text-xs">
                                    ⭐ {rating}+
                                    <button onClick={() => setRating(null)} className="hover:text-orange-800">
                                        <X size={12} />
                                    </button>
                                </span>
                            )}
                            <button 
                                onClick={() => {
                                    setSelectedType("all");
                                    setPriceRange(500);
                                    setRating(null);
                                }}
                                className="text-xs text-gray-400 hover:text-gray-600 transition"
                            >
                                Clear all
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Premium Filter Popup */}
            {showFilter && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end md:items-center justify-center animate-fade-in">
                    <div 
                        ref={filterRef}
                        className="bg-white w-full md:max-w-md rounded-t-2xl md:rounded-2xl overflow-hidden animate-slide-up shadow-2xl"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-5 py-4 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <SlidersHorizontal size={18} className="text-white" />
                                <h2 className="text-white font-semibold text-lg">Filters</h2>
                            </div>
                            <button 
                                onClick={() => setShowFilter(false)}
                                className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition"
                            >
                                <X size={18} className="text-white" />
                            </button>
                        </div>

                        <div className="p-5 max-h-[70vh] overflow-y-auto">
                            {/* Food Type Section */}
                            <div className="mb-6">
                                <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                    <span className="w-1 h-4 bg-orange-500 rounded-full"></span>
                                    Food Type
                                </h3>
                                <div className="flex gap-3">
                                    {[
                                        { value: "all", label: "All", icon: "🍽️" },
                                        { value: "veg", label: "Veg", icon: "🌱", color: "green" },
                                        { value: "nonveg", label: "Non-Veg", icon: "🍗", color: "red" }
                                    ].map((type) => (
                                        <button
                                            key={type.value}
                                            onClick={() => setSelectedType(type.value)}
                                            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium 
                                            transition-all duration-300 ${
                                                selectedType === type.value
                                                    ? type.value === "veg"
                                                        ? "bg-green-500 text-white shadow-md"
                                                        : type.value === "nonveg"
                                                        ? "bg-red-500 text-white shadow-md"
                                                        : "bg-orange-500 text-white shadow-md"
                                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                            }`}
                                        >
                                            <span>{type.icon}</span>
                                            {type.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Price Range Section */}
                            <div className="mb-6">
                                <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                    <span className="w-1 h-4 bg-orange-500 rounded-full"></span>
                                    Max Price: ₹{priceRange}
                                </h3>
                                <div className="px-2">
                                    <input
                                        type="range"
                                        min="100"
                                        max="1000"
                                        step="50"
                                        value={priceRange}
                                        onChange={(e) => setPriceRange(parseInt(e.target.value))}
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                                    />
                                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                                        <span>₹100</span>
                                        <span>₹300</span>
                                        <span>₹500</span>
                                        <span>₹800</span>
                                        <span>₹1000</span>
                                    </div>
                                </div>
                            </div>

                            {/* Rating Section */}
                            <div className="mb-6">
                                <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                    <span className="w-1 h-4 bg-orange-500 rounded-full"></span>
                                    Minimum Rating
                                </h3>
                                <div className="flex gap-3">
                                    {[4.5, 4, 3.5, 3].map((r) => (
                                        <button
                                            key={r}
                                            onClick={() => setRating(rating === r ? null : r)}
                                            className={`flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-xl text-sm font-medium 
                                            transition-all duration-300 ${
                                                rating === r
                                                    ? "bg-yellow-400 text-white shadow-md"
                                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                            }`}
                                        >
                                            <FaStar size={14} className={rating === r ? "text-white" : "text-yellow-500"} />
                                            {r}+
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Sort By Section */}
                            <div className="mb-6">
                                <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                    <span className="w-1 h-4 bg-orange-500 rounded-full"></span>
                                    Sort By
                                </h3>
                                <div className="flex gap-3">
                                    {["Popular", "Price: Low", "Price: High", "Rating"].map((sort) => (
                                        <button
                                            key={sort}
                                            className="flex-1 px-3 py-2 rounded-xl text-xs font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition"
                                        >
                                            {sort}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="p-5 border-t border-gray-100 bg-gray-50 flex gap-3">
                            <button
                                onClick={() => {
                                    setSelectedType("all");
                                    setPriceRange(500);
                                    setRating(null);
                                }}
                                className="flex-1 py-2.5 rounded-xl border border-gray-300 text-gray-600 font-medium 
                                hover:bg-gray-100 transition-all duration-300"
                            >
                                Reset All
                            </button>
                            <button
                                onClick={() => setShowFilter(false)}
                                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold 
                                shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
                            >
                                Apply Filters
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                @keyframes fade-in {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }
                @keyframes slide-up {
                    from {
                        transform: translateY(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }
                .animate-fade-in {
                    animation: fade-in 0.2s ease-out;
                }
                .animate-slide-up {
                    animation: slide-up 0.3s ease-out;
                }
            `}</style>
        </>
    );
};

export default SearchBar;