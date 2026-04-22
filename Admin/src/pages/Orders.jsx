import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";

import {
  getOrders,
  updateOrderStatus,
  addOrder,
  updateOrderInState,
} from "../redux/slice/adminOrderSlice";

// ✅ single socket instance
const socket = io("http://localhost:5002", {
  autoConnect: true,
});

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.order);

  // 🔥 Initial fetch + socket setup
  useEffect(() => {
    dispatch(getOrders());

    socket.emit("joinAdmin");

    const handleNewOrder = (order) => {
      dispatch(addOrder(order));
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

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4 text-gray-900">
        Orders
      </h2>

      {loading ? (
        <p>Loading...</p>
      ) : orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {orders.map((order) => {
            // ✅ total calculation (safe)
            const totalAmount = order.items.reduce(
              (sum, item) => sum + item.price * item.quantity,
              0
            );

            return (
              <div
                key={order._id}
                className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
              >
                {/* Top */}
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-semibold text-gray-900">
                    #{order._id.slice(-5)}
                  </h3>

                  <span className="text-xs text-gray-500">
                    {new Date(order.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>

                  <span className="text-xs text-gray-500">
                    Table: {order.tableNumber || "T"}
                  </span>
                </div>

                {/* Items */}
                <div className="text-sm text-gray-700 mb-2">
                  {order.items?.map((item, idx) => (
                    <div key={idx} className="mb-1">
                      <p className="font-medium">
                        • {item.product?.name}
                        {item.variantName &&
                          ` (${item.variantName})`}{" "}
                        x{item.quantity}
                      </p>

                      <div className="flex justify-between text-xs text-gray-500">
                        <span>
                          {item.spiceLevel || "medium"}
                        </span>

                        <span>
                          ₹{item.price} × {item.quantity} = ₹
                          {item.price * item.quantity}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <p className="text-sm font-semibold text-gray-900 mb-3">
                  Total: ₹{totalAmount}
                </p>

                {/* Status */}
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      order.status === "pending"
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
                    <button
                      disabled={order.status !== "pending"}
                      onClick={() =>
                        handleStatus(order._id, "preparing")
                      }
                      className={`text-xs px-2 py-1 rounded ${
                        order.status !== "pending"
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      Preparing
                    </button>

                    <button
                      disabled={order.status !== "preparing"}
                      onClick={() =>
                        handleStatus(order._id, "ready")
                      }
                      className={`text-xs px-2 py-1 rounded ${
                        order.status !== "preparing"
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      Ready
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Orders;