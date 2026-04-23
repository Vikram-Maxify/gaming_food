import React, { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { FaStar } from "react-icons/fa6";

const SearchBar = () => {

    const [showFilter, setShowFilter] = useState(false);
    const [selectedType, setSelectedType] = useState("veg");
    const [priceRange, setPriceRange] = useState(500);
    const [rating, setRating] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("all");

    return (
        <>
            <div className="flex items-center justify-center gap-3 px-2 mt-4 md:mt-3 mb-4">

                {/* Search Input */}
                <div className="relative w-full md:w-[30%] px-3">

                    {/* Search Icon */}
                    <Search
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 ms-3"
                    />

                    <input
                        type="text"
                        placeholder="Search burger, pizza..."
                        className="w-full pl-12 pr-4 py-2 md:py-3 rounded-full border border-gray-300 
                        focus:ring-2 focus:ring-orange-200 outline-none text-sm"
                    />
                </div>

                {/* Filter Button */}
                <button
                    onClick={() => setShowFilter(true)}
                    className="bg-orange-200 p-2.5 rounded-full shadow-md 
                    hover:bg-orange-200 hover:scale-105 
                    active:scale-95 transition duration-200"
                >
                    <SlidersHorizontal size={18} className="text-white" />
                </button>

            </div>

            {/* FILTER POPUP */}
            {showFilter && (
                <div className="fixed inset-0  bg-black/50 z-50 flex items-end md:items-center justify-center">
                    <div className="bg-white w-full md:max-w-md rounded-t-2xl md:rounded-xl p-4">

                        {/* HEADER */}
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">Filters</h2>
                            <button onClick={() => setShowFilter(false)}>✖</button>
                        </div>

                        {/* TYPE */}
                        <div className="mb-4">
                            <h3 className="text-sm font-medium mb-2">Veg / Non-Veg</h3>
                            <div className="flex gap-2">
                                {["veg", "non-veg"].map((type) => (
                                    <button
                                        key={type}
                                        onClick={() => setSelectedType(type)}
                                        className={`px-3 py-1 rounded-full border ${selectedType === type
                                                ? type === "veg"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                                : ""
                                            }`}
                                    >
                                        {type === "veg" ? "Veg" : "Non-Veg"}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* PRICE */}
                        <div className="mb-4">
                            <h3 className="text-sm font-medium mb-2">Price</h3>
                            <div className="flex flex-wrap gap-2">
                                {[100, 200, 300, 500].map((price) => (
                                    <button
                                        key={price}
                                        onClick={() => setPriceRange(price)}
                                        className={`px-3 py-1 rounded-full border ${priceRange === price
                                                ? "bg-orange-500 text-white"
                                                : ""
                                            }`}
                                    >
                                        ₹{price}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* RATING */}
                        <div className="mb-4">
                            <h3 className="text-sm font-medium mb-2">Rating</h3>
                            <div className="flex gap-2">
                                {[4, 3, 2].map((r) => (
                                    <button
                                        key={r}
                                        onClick={() => setRating(r)}
                                        className={`px-3 py-1 rounded-full border ${rating === r
                                                ? "bg-yellow-400 text-white flex"
                                                : "flex"
                                            }`}
                                    >
                                         {r}<FaStar className=" text-xl ps-1 mt-[1px] flex items-center"/>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* ACTION */}
                        <div className="flex gap-2 mt-4">
                            <button
                                onClick={() => {
                                    setSelectedCategory("all");
                                    setSelectedType("veg");
                                    setPriceRange(500);
                                    setRating(null);
                                }}
                                className="w-1/2 border py-2 rounded-lg"
                            >
                                Clear
                            </button>

                            <button
                                onClick={() => setShowFilter(false)}
                                className="w-1/2 bg-orange-500 text-white py-2 rounded-lg"
                            >
                                Apply
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </>
    );
};

export default SearchBar;