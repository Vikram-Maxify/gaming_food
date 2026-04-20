import React from "react";

const ordersData = [
    {
        id: "#ORD001",
        table: "T1",
        items: ["Paneer Tikka", "Butter Naan"],
        status: "pending",
    },
    {
        id: "#ORD002",
        table: "T3",
        items: ["Chicken Biryani"],
        status: "preparing",
    },
    {
        id: "#ORD003",
        table: "T2",
        items: ["Veg Fried Rice", "Spring Roll"],
        status: "ready",
    },
];

const ChefDashboard = () => {
    return (
        <div>

            {/* Heading */}
            <h2 className="text-xl font-bold mb-4 text-gray-900">
                Kitchen Orders
            </h2>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                {ordersData.map((order, i) => (
                    <div
                        key={i}
                        className="bg-white border-2 border-gray-300 rounded-xl p-5 shadow-sm"
                    >

                        {/* Top */}
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="text-lg font-bold text-gray-900">
                                {order.id}
                            </h3>

                            <span className="text-sm font-semibold text-gray-700">
                                {order.table}
                            </span>
                        </div>

                        {/* Items (BIG + CLEAR) */}
                        <div className="mb-4">
                            {order.items.map((item, idx) => (
                                <p
                                    key={idx}
                                    className="text-base font-semibold text-gray-900"
                                >
                                    • {item}
                                </p>
                            ))}
                        </div>

                        {/* Status */}
                        <div className="flex items-center justify-between">

                            <span
                                className={`text-sm px-3 py-1 rounded-full font-semibold ${order.status === "pending"
                                        ? "bg-gray-200 text-gray-800"
                                        : order.status === "preparing"
                                            ? "bg-yellow-200 text-yellow-900"
                                            : "bg-green-200 text-green-900"
                                    }`}
                            >
                                {order.status}
                            </span>

                            {/* Actions */}
                            <div className="flex gap-2">
                                <button className="text-sm px-3 py-1 bg-gray-900 text-white rounded">
                                    Preparing
                                </button>
                                <button className="text-sm px-3 py-1 bg-gray-900 text-white rounded">
                                    Ready
                                </button>
                            </div>

                        </div>

                    </div>
                ))}

            </div>

        </div>
    );
};

export default ChefDashboard;