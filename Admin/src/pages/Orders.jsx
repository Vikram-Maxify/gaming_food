import React from "react";

const ordersData = [
    {
        id: "#ORD001",
        table: "T1",
        items: ["Paneer Tikka", "Butter Naan"],
        total: 340,
        status: "pending",
    },
    {
        id: "#ORD002",
        table: "T3",
        items: ["Chicken Biryani"],
        total: 280,
        status: "preparing",
    },
    {
        id: "#ORD003",
        table: "T2",
        items: ["Veg Fried Rice", "Spring Roll"],
        total: 330,
        status: "ready",
    },
];

const Orders = () => {
    return (
        <div>

            {/* Heading */}
            <h2 className="text-lg font-semibold mb-4 text-gray-900">
                Orders
            </h2>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                {ordersData.map((order, i) => (
                    <div
                        key={i}
                        className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
                    >

                        {/* Top */}
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-sm font-semibold text-gray-900">
                                {order.id}
                            </h3>

                            <span className="text-xs text-gray-500">
                                {order.table}
                            </span>
                        </div>

                        {/* Items */}
                        <div className="text-sm text-gray-700 mb-2">
                            {order.items.map((item, idx) => (
                                <p key={idx}>• {item}</p>
                            ))}
                        </div>

                        {/* Total */}
                        <p className="text-sm font-medium text-gray-900 mb-3">
                            Total: ₹{order.total}
                        </p>

                        {/* Status */}
                        <div className="flex items-center justify-between">

                            <span
                                className={`text-xs px-2 py-1 rounded-full ${order.status === "pending"
                                        ? "bg-gray-100 text-gray-600"
                                        : order.status === "preparing"
                                            ? "bg-yellow-100 text-yellow-700"
                                            : "bg-green-100 text-green-700"
                                    }`}
                            >
                                {order.status}
                            </span>

                            {/* Actions */}
                            <div className="flex gap-2">
                                <button className="text-xs px-2 py-1 bg-gray-100 rounded hover:bg-gray-200">
                                    Preparing
                                </button>
                                <button className="text-xs px-2 py-1 bg-gray-100 rounded hover:bg-gray-200">
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

export default Orders;