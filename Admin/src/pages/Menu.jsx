import React, { useState } from "react";

const menuData = [
    { id: 1, name: "Paneer Tikka", type: "veg", category: "starter", price: 220 },
    { id: 2, name: "Chicken Biryani", type: "non-veg", category: "main", price: 280 },
    { id: 3, name: "Veg Fried Rice", type: "veg", category: "chinese", price: 180 },
    { id: 4, name: "Chilli Chicken", type: "non-veg", category: "chinese", price: 260 },
    { id: 5, name: "Butter Chicken", type: "non-veg", category: "main", price: 320 },
    { id: 6, name: "Spring Roll", type: "veg", category: "starter", price: 150 },
];

const Menu = () => {
    const [category, setCategory] = useState("all");
    const [type, setType] = useState("all");

    // Filter Logic
    const filteredData = menuData.filter((item) => {
        return (
            (category === "all" || item.category === category) &&
            (type === "all" || item.type === type)
        );
    });

    const vegCount = filteredData.filter(i => i.type === "veg").length;
    const nonVegCount = filteredData.filter(i => i.type === "non-veg").length;

    return (
        <div>

            {/* Heading */}
            <h2 className="text-lg font-semibold mb-4 text-gray-900">
                Menu Management
            </h2>

            {/* Filters */}
            <div className="flex flex-wrap gap-2 mb-4">

                {/* Category Filters */}
                {["all", "starter", "main", "chinese"].map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setCategory(cat)}
                        className={`px-3 py-1 text-xs rounded-full border ${category === cat
                                ? "bg-gray-900 text-white"
                                : "bg-white text-gray-600 border-gray-300"
                            }`}
                    >
                        {cat}
                    </button>
                ))}

                {/* Type Filters */}
                {["all", "veg", "non-veg"].map((t) => (
                    <button
                        key={t}
                        onClick={() => setType(t)}
                        className={`px-3 py-1 text-xs rounded-full border ${type === t
                                ? "bg-gray-900 text-white"
                                : "bg-white text-gray-600 border-gray-300"
                            }`}
                    >
                        {t}
                    </button>
                ))}

            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">

                <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm">
                    <p className="text-sm text-gray-500">Total Items</p>
                    <h3 className="text-xl font-semibold">{filteredData.length}</h3>
                </div>

                <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm">
                    <p className="text-sm text-gray-500">Veg Items</p>
                    <h3 className="text-xl font-semibold">{vegCount}</h3>
                </div>

                <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm">
                    <p className="text-sm text-gray-500">Non-Veg Items</p>
                    <h3 className="text-xl font-semibold">{nonVegCount}</h3>
                </div>

            </div>

            {/* Table */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">

                {/* Header */}
                <div className="grid grid-cols-5 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-600">
                    <span>Name</span>
                    <span>Category</span>
                    <span>Type</span>
                    <span>Price</span>
                    <span>Action</span>
                </div>

                {/* Rows */}
                {filteredData.map((item) => (
                    <div
                        key={item.id}
                        className="grid grid-cols-5 px-4 py-3 text-sm border-t border-gray-100 items-center"
                    >
                        <span className="text-gray-900">{item.name}</span>

                        <span className="text-gray-600 capitalize">
                            {item.category}
                        </span>

                        <span
                            className={`font-medium ${item.type === "veg"
                                    ? "text-green-600"
                                    : "text-red-500"
                                }`}
                        >
                            {item.type}
                        </span>

                        <span className="text-gray-700">₹{item.price}</span>

                        <div className="flex gap-2">
                            <button className="text-xs px-2 py-1 bg-gray-100 rounded hover:bg-gray-200">
                                Edit
                            </button>
                            <button className="text-xs px-2 py-1 bg-gray-100 rounded hover:bg-gray-200">
                                Delete
                            </button>
                        </div>
                    </div>
                ))}

            </div>

        </div>
    );
};

export default Menu;