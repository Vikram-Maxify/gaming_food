import React, { useState } from "react";

const menuItems = [
    { id: 1, name: "Margherita Pizza", category: "pizza", type: "veg", price: 200, rating: 4.2 , image : "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&auto=format&fit=crop&q=60"},
    { id: 2, name: "Pepperoni Pizza", category: "pizza", type: "nonveg", price: 350, rating: 4.5 },
    { id: 3, name: "Veg Burger", category: "burger", type: "veg", price: 120, rating: 4.0 },
    { id: 4, name: "Chicken Burger", category: "burger", type: "nonveg", price: 180, rating: 4.3 },
    { id: 5, name: "Pasta Alfredo", category: "pasta", type: "veg", price: 250, rating: 4.1 },
];

// ✅ Toggle Component (same file)
function ToggleSwitch({ isOn, onToggle }) {
    return (
        <button
            onClick={onToggle}
            className={`w-12 h-6 flex items-center rounded-full p-1 transition ${isOn ? "bg-green-500" : "bg-gray-300"
                }`}
        >
            <div
                className={`bg-white w-4 h-4 rounded-full shadow transform transition ${isOn ? "translate-x-6" : "translate-x-0"
                    }`}
            />
        </button>
    );
}

export default function MenuPage() {

    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedType, setSelectedType] = useState("veg"); // ✅ default veg
    const [priceRange, setPriceRange] = useState(500);
    const [minRating, setMinRating] = useState(0);

    const filteredItems = menuItems.filter((item) => {
        return (
            (selectedCategory === "all" || item.category === selectedCategory) &&
            item.type === selectedType && // ✅ direct filter (no "all" now)
            item.price <= priceRange &&
            item.rating >= minRating
        );
    });

    return (

        <div className="min-h-screen bg-gray-100 p-4">

            {/* 🔹 Header */}
            <h1 className="text-xl md:text-2xl font-semibold mb-5">Menu Items</h1>

            {/* 🔹 Filters Section */}
            <div className="bg-white p-5 rounded-xl shadow mb-6">

                {/* Category */}
                <div className="flex overflow-x-auto gap-3 pb-2">
                    {["all", "pizza", "burger", "pasta"].map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-2 rounded-full whitespace-nowrap ${selectedCategory === cat
                                ? "bg-red-500 text-white"
                                : "bg-gray-200"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* ✅ Veg / Non-Veg Toggle */}
                <div className="mt-4 flex items-center gap-3">
                    <span className="text-sm font-medium">
                        {selectedType === "veg" ? "Veg 🌱" : "Non-Veg 🍗"}
                    </span>

                    <ToggleSwitch
                        isOn={selectedType === "veg"}
                        onToggle={() =>
                            setSelectedType((prev) =>
                                prev === "veg" ? "nonveg" : "veg"
                            )
                        }
                    />
                </div>

                {/* Price Range */}
                <div className="mt-4">
                    <p className="text-sm font-medium">
                        Price up to ₹{priceRange}
                    </p>
                    <input
                        type="range"
                        min="0"
                        max="500"
                        value={priceRange}
                        onChange={(e) => setPriceRange(Number(e.target.value))}
                        className="w-full"
                    />
                </div>

                {/* Rating */}
                <div className="mt-4 flex gap-2 flex-wrap">
                    {[0, 3, 4, 4.5].map((rate) => (
                        <button
                            key={rate}
                            onClick={() => setMinRating(rate)}
                            className={`px-3 py-1 rounded ${minRating === rate
                                ? "bg-yellow-400"
                                : "bg-gray-200"
                                }`}
                        >
                            {rate === 0 ? "All" : `${rate}+ ⭐`}
                        </button>
                    ))}
                </div>
            </div>

            {/* 🔹 Items Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredItems.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
                    >
                       
                        <h2 className="text-lg font-semibold">{item.name}</h2>

                        <p className="text-sm text-gray-500 capitalize">
                            {item.type} • {item.category}
                        </p>

                        <div className="flex justify-between items-center mt-2">
                            <span className="font-bold">₹{item.price}</span>
                            <span className="text-yellow-500">
                                ⭐ {item.rating}
                            </span>
                        </div>

                        <button className="mt-3 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600">
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {filteredItems.length === 0 && (
                <p className="text-center mt-6 text-gray-500">
                    No items found 😢
                </p>
            )}
        </div>
    );
}