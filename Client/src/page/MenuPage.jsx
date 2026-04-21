import React, { useState } from "react";
import { IoIosStar } from "react-icons/io";
import { useRef, useEffect } from "react";

const menuItems = [
    { id: 1, name: "Margherita Pizza", category: "pizza", type: "veg", price: 200, discount: 30, rating: 4.2, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&auto=format&fit=crop&q=60" },
    { id: 2, name: "Pepperoni Pizza", category: "pizza", type: "nonveg", price: 350, discount: 40, rating: 4.5, image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=300&auto=format&fit=crop&q=80" },
    { id: 3, name: "Veg Burger", category: "burger", type: "veg", price: 120, discount: 25, rating: 4.0, image: "https://plus.unsplash.com/premium_photo-1683619761492-639240d29bb5?q=80&w=687&auto=format&fit=crop" },
    { id: 4, name: "Chicken Burger", category: "burger", type: "nonveg", price: 180, discount: 60, rating: 4.3, image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=2080&auto=format&fit=crop" },
    { id: 5, name: "Pasta Alfredo", category: "pasta", type: "veg", price: 250, discount: 42, rating: 4.1, image: "https://plus.unsplash.com/premium_photo-1664478288635-b9703a502393?q=80&w=880&auto=format&fit=crop" },
];

export default function MenuPage() {

    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedType, setSelectedType] = useState("veg");
    const [priceRange, setPriceRange] = useState(500);
    const [minRating, setMinRating] = useState(0);

    // ✅ NEW STATE FOR MODAL
    const [selectedItem, setSelectedItem] = useState(null);

    const filteredItems = menuItems.filter((item) => {
        return (
            (selectedCategory === "all" || item.category === selectedCategory) &&
            item.type === selectedType &&
            item.price <= priceRange &&
            item.rating >= minRating
        );
    });

    // for handleclick
    const CategoryRef = useRef(null);
    useEffect(() => {
        function handleOutsideClick(e) {
            if (
                CategoryRef.current &&
                !CategoryRef.current.contains(e.target)
            ) {
                setSelectedItem(null) // ✅ CLOSE MODAL
            }
        }

        if (selectedItem) {
            document.addEventListener("mousedown", handleOutsideClick)
        }

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick)
        }
    }, [selectedItem])


    return (
        <div className="min-h-screen bg-gray-100 p-4">

            <h1 className="text-xl md:text-2xl font-semibold mb-5">Menu Items</h1>

            {/* Filters (unchanged) */}
            <div className="bg-white p-3 rounded-xl shadow mb-6">
                <div className="flex flex-wrap items-center gap-2">

                    {["all", "pizza", "burger", "pasta"].map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-3 py-1.5 rounded-full text-sm border ${selectedCategory === cat
                                ? "bg-gray-900 text-white"
                                : "bg-white text-gray-700 border-gray-300"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}

                    <button
                        onClick={() =>
                            setSelectedType((prev) =>
                                prev === "veg" ? "nonveg" : "veg"
                            )
                        }
                        className={`px-3 py-1.5 rounded-full text-sm border ${selectedType === "veg"
                            ? "bg-green-100 text-green-700 border-green-400"
                            : "bg-red-100 text-red-700 border-red-400"
                            }`}
                    >
                        {selectedType === "veg" ? "Veg 🌱" : "Non-Veg 🍗"}
                    </button>

                    {[100, 200, 300, 500].map((price) => (
                        <button
                            key={price}
                            onClick={() => setPriceRange(price)}
                            className={`px-3 py-1.5 rounded-full text-sm border ${priceRange === price
                                ? "bg-orange-500 text-white"
                                : "bg-white text-gray-700 border-gray-300"
                                }`}
                        >
                            ₹{price}
                        </button>
                    ))}

                    {[3, 4, 4.5].map((rate) => (
                        <button
                            key={rate}
                            onClick={() => setMinRating(rate)}
                            className={`px-3 py-1.5 rounded-full text-sm border flex items-center gap-1 ${minRating === rate
                                ? "bg-yellow-400"
                                : "bg-white text-gray-700 border-gray-300"
                                }`}
                        >
                            {rate}+ <IoIosStar />
                        </button>
                    ))}

                </div>
            </div>

            {/* Items Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredItems.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => setSelectedItem(item)} // ✅ CLICK HANDLER
                        className="bg-white p-4 rounded-xl shadow hover:shadow-xl transition hover:outline outline-gray-200 cursor-pointer"
                    >
                        <div className="relative w-full">
                            <img
                                src={item.image}
                                className="w-full h-52 object-cover rounded-lg"
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

                            <div className="flex items-center text-white bg-[#267E3E] px-[5px] rounded-md">
                                <span>{item.rating}</span>
                                <IoIosStar className="text-sm" />
                            </div>
                        </div>

                        <button className="mt-3 w-full bg-red-500 text-white py-2 rounded">
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
            {/* MODAL */}
            {selectedItem && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 pb-20 md:pb-0">

                    {/* Wrapper for positioning */}
                    <div ref={CategoryRef} className="relative w-full md:max-w-md">

                        {/* ❌ Close Button (responsive & centered above modal) */}
                        <button
                            onClick={() => setSelectedItem(null)}
                            className="absolute -top-16 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xl px-4 py-2 rounded-full shadow-lg"
                        >
                            ✕
                        </button>
                        {/* Modal Box */}
                        <div className="bg-white w-full rounded-t-2xl md:rounded-2xl p-4">
                            <img
                                src={selectedItem.image}
                                className="w-full h-60 object-cover rounded-xl"
                            />
                            <h2 className="text-xl font-semibold mt-3">
                                {selectedItem.name}
                            </h2>
                            <p className="text-gray-500 text-sm">
                                {selectedItem.type} • {selectedItem.category}
                            </p>
                            <p className="text-lg font-bold mt-2">
                                ₹{selectedItem.price}
                            </p>
                            <button className="mt-4 w-full bg-red-500 text-white py-2 rounded-xl">
                                Add to Cart
                            </button>

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}