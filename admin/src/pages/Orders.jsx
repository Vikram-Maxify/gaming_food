import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";

import {
  getOrders,
  updateOrderStatus,
  addOrder,
  updateOrderInState,
} from "../redux/slice/adminOrderSlice";

const socket = io("http://localhost:5002", {
  autoConnect: true,
});

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.order);

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

  const handleStatus = (id, status) => {
    dispatch(updateOrderStatus({ id, status }));
  };

  return (
    <div className="p-6">

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-textPrimary">
          🍽 Orders
        </h2>
        <p className="text-sm text-textSecondary">
          Real-time incoming orders
        </p>
      </div>

      {loading ? (
        <p className="text-textSecondary">Loading...</p>
      ) : orders.length === 0 ? (
        <p className="text-textSecondary">No orders found</p>
      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

          {orders.map((order) => {
            const totalAmount = order.items.reduce(
              (sum, item) => sum + item.price * item.quantity,
              0
            );

            return (
              <div
                key={order._id}
                className="bg-cardGradient border border-borderSubtle rounded-xl2 p-5 shadow-soft hover:shadow-glowHover transition flex flex-col justify-between"
              >

                {/* Top */}
                <div className="flex justify-between items-start mb-3">

                  <div>
                    <h3 className="text-sm font-semibold text-textPrimary">
                      #{order._id.slice(-5)}
                    </h3>
                    <p className="text-xs text-textSecondary mt-1">
                      Table: {order.tableNumber || "T"}
                    </p>
                  </div>

                  <span className="text-xs text-textSecondary">
                    {new Date(order.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>

                </div>

                {/* Items */}
                <div className="text-sm mb-3 space-y-2">
                  {order.items?.map((item, idx) => (
                    <div key={idx} className="border-b border-borderSubtle pb-1">

                      <p className="text-textPrimary font-medium">
                        {item.product?.name}
                        {item.variantName && ` (${item.variantName})`} ×{item.quantity}
                      </p>

                      <div className="flex justify-between text-xs text-textSecondary">
                        <span>{item.spiceLevel || "medium"}</span>
                        <span>
                          ₹{item.price} × {item.quantity} = ₹
                          {item.price * item.quantity}
                        </span>
                      </div>

                    </div>
                  ))}
                </div>

                {/* Total */}
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-textSecondary">Total</span>
                  <span className="text-lg font-semibold text-primary">
                    ₹{totalAmount}
                  </span>
                </div>

                {/* Status + Actions */}
                <div className="flex items-center justify-between">

                  {/* Status */}
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium ${
                      order.status === "pending"
                        ? "bg-warning/20 text-warning border border-warning/30"
                        : order.status === "preparing"
                        ? "bg-primary/20 text-primary border border-primary/30"
                        : "bg-success/20 text-success border border-success/30"
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
                      className={`text-xs px-3 py-1 rounded-lg border border-borderSubtle transition
                      ${
                        order.status !== "pending"
                          ? "opacity-40 cursor-not-allowed"
                          : "bg-[#1A1A1A] text-primary hover:shadow-glow"
                      }`}
                    >
                      Preparing
                    </button>

                    <button
                      disabled={order.status !== "preparing"}
                      onClick={() =>
                        handleStatus(order._id, "ready")
                      }
                      className={`text-xs px-3 py-1 rounded-lg border border-borderSubtle transition
                      ${
                        order.status !== "preparing"
                          ? "opacity-40 cursor-not-allowed"
                          : "bg-[#1A1A1A] text-success hover:shadow-glow"
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