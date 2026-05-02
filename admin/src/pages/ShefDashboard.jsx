import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";

import {
  getOrders,
  updateOrderStatus,
  addOrder,
  updateOrderInState,
} from "../redux/slice/adminOrderSlice";

import {
  Flame,
  Clock,
  CheckCircle,
  Circle,
  CookingPot,
} from "lucide-react";

const socket = io("devine.trueprofit.biz", {
  autoConnect: true,
});

const ChefDashboard = () => {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.order);

  // 🔥 Spice Icon (converted)
  const getSpiceIcon = (level) => {
    switch (level) {
      case "low":
        return <Circle className="text-success" size={14} />;
      case "medium":
        return <Flame className="text-warning" size={14} />;
      case "high":
        return <Flame className="text-primary" size={14} />;
      case "extra-high":
        return <Flame className="text-danger" size={14} />;
      default:
        return <Flame className="text-warning" size={14} />;
    }
  };

  useEffect(() => {
    dispatch(getOrders());

    socket.emit("joinAdmin");

    const handleNewOrder = (order) => {
      dispatch(addOrder(order));

      if (order.status === "pending") {
        const audio = new Audio("/notification.mp3");
        audio.play().catch(() => {});
      }
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

  const activeOrders = orders.filter(
    (o) => o.status !== "delivered"
  );

  const sortedOrders = [...activeOrders].sort((a, b) => {
    const priority = {
      pending: 1,
      preparing: 2,
      ready: 3,
    };
    return priority[a.status] - priority[b.status];
  });

  return (
    <div className="p-6">

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-textPrimary flex items-center gap-2">
          <CookingPot size={22} className="text-primary" />
          Kitchen Orders
        </h2>
        <p className="text-sm text-textSecondary">
          Live cooking queue
        </p>
      </div>

      {loading ? (
        <p className="text-textSecondary">Loading...</p>
      ) : sortedOrders.length === 0 ? (
        <p className="text-textSecondary">No orders found</p>
      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

          {sortedOrders.map((order) => {
            const totalAmount = order.items.reduce(
              (sum, item) => sum + item.price * item.quantity,
              0
            );

            return (
              <div
                key={order._id}
                className={`bg-cardGradient border rounded-xl2 p-5 shadow-soft hover:shadow-glowHover transition
                ${
                  order.status === "pending"
                    ? "border-danger/50"
                    : "border-borderSubtle"
                }`}
              >

                {/* Top */}
                <div className="flex justify-between items-center mb-3">

                  <h3 className="text-lg font-semibold text-textPrimary">
                    #{order._id.slice(-5)}
                  </h3>

                  <span className="text-sm text-textSecondary">
                    Table {order.tableNumber || "T"}
                  </span>

                </div>

                {/* Time */}
                <div className="flex items-center gap-2 text-xs text-textSecondary mb-3">
                  <Clock size={14} />
                  {new Date(order.createdAt).toLocaleTimeString()}
                </div>

                {/* Items */}
                <div className="mb-4 space-y-2">
                  {order.items?.map((item, idx) => (
                    <div key={idx} className="border-b border-borderSubtle pb-1">

                      <p className="text-textPrimary font-medium">
                        {item.product?.name}
                        {item.variantName && ` (${item.variantName})`} ×{item.quantity}
                      </p>

                      <div className="flex justify-between text-xs text-textSecondary">

                        <span className="flex items-center gap-1">
                          {getSpiceIcon(item.spiceLevel)}
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
                <div className="flex justify-between items-center mb-4">
                  <span className="text-textSecondary text-sm">Total</span>
                  <span className="text-primary font-semibold text-lg">
                    ₹{totalAmount}
                  </span>
                </div>

                {/* Status + Actions */}
                <div className="flex items-center justify-between">

                  <span
                    className={`flex items-center gap-1 text-xs px-3 py-1 rounded-full font-medium ${
                      order.status === "pending"
                        ? "bg-danger/20 text-danger border border-danger/30"
                        : order.status === "preparing"
                        ? "bg-primary/20 text-primary border border-primary/30"
                        : "bg-success/20 text-success border border-success/30"
                    }`}
                  >
                    {order.status === "ready" && <CheckCircle size={14} />}
                    {order.status === "pending" && <Circle size={14} />}
                    {order.status === "preparing" && <Flame size={14} />}
                    {order.status}
                  </span>

                  <div className="flex gap-2">

                    <button
                      disabled={order.status !== "pending"}
                      onClick={() =>
                        handleStatus(order._id, "preparing")
                      }
                      className={`text-xs px-3 py-1 rounded-lg border border-borderSubtle transition
                      ${
                        order.status !== "pending"
                          ? "opacity-40"
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
                          ? "opacity-40"
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

export default ChefDashboard;