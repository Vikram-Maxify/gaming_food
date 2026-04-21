import React, { useState } from "react";
import { IoIosStar } from "react-icons/io";


const menuItems = [
    { id: 1, name: "Margherita Pizza", category: "pizza", type: "veg", price: 200, discount: 30, rating: 4.2, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&auto=format&fit=crop&q=60" },
    { id: 2, name: "Pepperoni Pizza", category: "pizza", type: "nonveg", price: 350, discount: 40, rating: 4.5, image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=300&auto=format&fit=crop&q=80" },
    { id: 3, name: "Veg Burger", category: "burger", type: "veg", price: 120, discount: 25, rating: 4.0, image: "https://plus.unsplash.com/premium_photo-1683619761492-639240d29bb5?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 4, name: "Chicken Burger", category: "burger", type: "nonveg", price: 180, discount: 60, rating: 4.3, image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 5, name: "Pasta Alfredo", category: "pasta", type: "veg", price: 250, discount: 42, rating: 4.1, image: "https://plus.unsplash.com/premium_photo-1664478288635-b9703a502393?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
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
           <div className="bg-white p-3 rounded-xl shadow mb-6">

    <div className="flex flex-wrap items-center gap-2">

        {/* Category */}
        {["all", "pizza", "burger", "pasta"].map((cat) => (
            <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-sm border ${
                    selectedCategory === cat
                        ? "bg-gray-900 text-white border-gray-900"
                        : "bg-white text-gray-700 border-gray-300"
                }`}
            >
                {cat}
            </button>
        ))}

        {/* Veg / Non-Veg */}
        <button
            onClick={() =>
                setSelectedType((prev) =>
                    prev === "veg" ? "nonveg" : "veg"
                )
            }
            className={`px-3 py-1.5 rounded-full text-sm border ${
                selectedType === "veg"
                    ? "bg-green-100 text-green-700 border-green-400"
                    : "bg-red-100 text-red-700 border-red-400"
            }`}
        >
            {selectedType === "veg" ? "Veg 🌱" : "Non-Veg 🍗"}
        </button>

        {/* Price */}
        {[100, 200, 300, 500].map((price) => (
            <button
                key={price}
                onClick={() => setPriceRange(price)}
                className={`px-3 py-1.5 rounded-full text-sm border ${
                    priceRange === price
                        ? "bg-orange-500 text-white border-orange-500"
                        : "bg-white text-gray-700 border-gray-300"
                }`}
            >
                ₹{price}
            </button>
        ))}

        {/* Rating */}
        {[3, 4, 4.5].map((rate) => (
            <button
                key={rate}
                onClick={() => setMinRating(rate)}
                className={`px-3 py-1.5 rounded-full text-sm border flex items-center gap-1 ${
                    minRating === rate
                        ? "bg-yellow-400 text-black border-yellow-400"
                        : "bg-white text-gray-700 border-gray-300"
                }`}
            >
                {rate}+ <IoIosStar />
            </button>
        ))}

    </div>
</div>

            {/* 🔹 Items Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredItems.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white p-4 rounded-xl shadow hover:shadow-xl transition hover:outline outline-gray-200"
                    >
                        <div className="relative w-full">
                            <img
                                src={item.image}
                                className="w-full h-52 object-cover rounded-lg transition-transform duration-500 hover:scale-105"
                            />

                            <h3 className="absolute bottom-2 left-2 bg-black/65 text-white px-2 py-1 rounded-md text-sm">
                                {item.discount}% OFF
                            </h3>
                        </div>
                        <h2 className="text-lg font-semibold mt-2">{item.name}</h2>

                        <p className="text-sm text-gray-500 capitalize">
                            {item.type} • {item.category}
                        </p>

                        <div className="flex justify-between items-center mt-2">
                            <span className="font-bold">₹{item.price}</span>

                            <div className="flex items-center gap-0 text-white bg-[#267E3E] px-[5px] rounded-md">
                                <span>{item.rating}</span>
                                <IoIosStar className="text-sm" />
                            </div>
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