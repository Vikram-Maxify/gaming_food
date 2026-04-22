import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";

import {
  getOrders,
  updateOrderStatus,
  addOrder,
  updateOrderInState,
} from "../redux/slice/adminOrderSlice";

// ✅ SINGLE SOCKET INSTANCE
const socket = io("http://localhost:5002", {
  autoConnect: true,
});

const ChefDashboard = () => {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.order);



  // 🔥 Spice Icon Function
  const getSpiceIcon = (level) => {
    switch (level) {
      case "low":
        return "🟢";
      case "medium":
        return "🟡";
      case "high":
        return "🟠";
      case "extra-high":
        return "🔴";
      default:
        return "🟡";
    }
  };

  // 🔥 Fetch + Socket Setup
  useEffect(() => {
    dispatch(getOrders());

    socket.emit("joinAdmin");

    const handleNewOrder = (order) => {
      dispatch(addOrder(order));

      // 🔔 sound
      const audio = new Audio("/notification.mp3");
      audio.play().catch(() => { });
    };

    const handleUpdate = (order) => {
      dispatch(updateOrderInState(order));
    };

    socket.on("newOrder", handleNewOrder);
    socket.on("adminOrderUpdated", handleUpdate);

    return () => {
      socket.off("newOrder", handleNewOrder);
      socket.off("adminOrderUpdated", handleUpdate);
    };
  }, [dispatch]);

  // 🔥 Status update
  const handleStatus = (id, status) => {
    dispatch(updateOrderStatus({ id, status }));
  };

  // ✅ FILTER ACTIVE
  const activeOrders = orders.filter(
    (o) => o.status !== "delivered"
  );

  // 🔥 SORT BY PRIORITY
  const sortedOrders = [...activeOrders].sort((a, b) => {
    const priority = {
      pending: 1,
      preparing: 2,
      ready: 3,
    };
    return priority[a.status] - priority[b.status];
  });

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-gray-900">
        Kitchen Orders
      </h2>

      {loading ? (
        <p>Loading...</p>
      ) : sortedOrders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedOrders.map((order) => (
            <div
              key={order._id}
              className="bg-white border-2 border-gray-300 rounded-xl p-5 shadow-sm"
            >
              {/* Top */}
              <div className="flex justify-between items-center mb-3">

                <h3 className="text-lg font-bold text-gray-900">
                  #{order._id.slice(-5)}
                </h3>

                <span className="text-sm font-semibold text-gray-700">
                  Table No: {order.tableNumber || "T"}
                </span>
              </div>

              {/* Items with SPICE 🔥 */}
              <div className="mb-4">
                {order.items?.map((item, idx) => (
                  <p
                    key={idx}
                    className="text-base font-semibold text-gray-900 flex flex-col"
                  >
                    • {item.product?.name} x{item.quantity}
                    <span className="ml-2 text-sm text-gray-600">
                      ({getSpiceIcon(item.spiceLevel)}{" "}
                      {item.spiceLevel || "medium"})
                    </span>
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
                  <button
                    disabled={order.status !== "pending"}
                    onClick={() =>
                      handleStatus(order._id, "preparing")
                    }
                    className={`text-sm px-3 py-1 rounded ${order.status !== "pending"
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-black text-white"
                      }`}
                  >
                    Preparing
                  </button>

                  <button
                    disabled={order.status !== "preparing"}
                    onClick={() =>
                      handleStatus(order._id, "ready")
                    }
                    className={`text-sm px-3 py-1 rounded ${order.status !== "preparing"
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-green-600 text-white"
                      }`}
                  >
                    Ready
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChefDashboard;