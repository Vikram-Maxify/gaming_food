import React, { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { toast } from "react-toastify";

import {
  getOrders,
  updateOrderStatus,
  addOrder,
  updateOrderInState,
} from "../redux/slice/adminOrderSlice";

import notifSound from "/notif.mp3";

// 🔊 single audio instance
const audioRef = new Audio(notifSound);
audioRef.volume = 1;
audioRef.preload = "auto";

const socket = io("http://localhost:5002", {
  autoConnect: true,
});

const Orders = () => {
  const dispatch = useDispatch();
  const { orders = [], loading } = useSelector((state) => state.order);

  const bottomRef = useRef(null);

  // 🔊 SOUND
  const playSound = () => {
    try {
      audioRef.currentTime = 0;
      audioRef.play().catch(() => {});
    } catch {}
  };

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  useEffect(() => {
    socket.emit("joinAdmin");

    const handleNewOrder = (order) => {
      dispatch(addOrder(order));
      playSound();

      toast.success("🍽 New Order Received!", {
        position: "top-right",
        autoClose: 3000,
      });
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

  // ✅ TOTAL CALCULATION
  const enrichedOrders = useMemo(() => {
    return orders.map((order) => {
      const totalAmount =
        order?.items?.reduce(
          (sum, item) =>
            sum + (item?.price || 0) * (item?.quantity || 0),
          0
        ) || 0;

      return { ...order, totalAmount };
    });
  }, [orders]);

  const statusBadge = (status) => {
    const base = "px-3 py-1 text-xs rounded-full font-medium border";

    if (status === "pending")
      return `${base} bg-yellow-500/10 text-yellow-400 border-yellow-500/30`;

    if (status === "preparing")
      return `${base} bg-blue-500/10 text-blue-400 border-blue-500/30`;

    return `${base} bg-green-500/10 text-green-400 border-green-500/30`;
  };

  return (
    <div className="p-6 min-h-screen bg-[#0f0f0f] text-white">
      
      {/* HEADER */}
      <div className="sticky top-0 z-10 bg-[#0f0f0f]/80 backdrop-blur py-4 mb-6 border-b border-gray-800">
        <h2 className="text-2xl font-bold">🍽 Live Orders</h2>
        <p className="text-sm text-gray-400">
          Real-time kitchen dashboard
        </p>
      </div>

      {/* LOADING */}
      {loading ? (
        <p className="text-gray-400">Loading orders...</p>
      ) : enrichedOrders.length === 0 ? (
        <p className="text-gray-400">No orders found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {enrichedOrders.map((order) => (
            <div
              key={order._id}
              className="bg-[#151515] border border-gray-800 rounded-2xl p-5 shadow-lg"
            >

              {/* TOP */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-sm font-semibold text-white">
                    #{order._id?.slice(-6)}
                  </h3>

                  <p className="text-xs text-gray-400">
                    Table:{" "}
                    {order.tableNumber === "null" ||
                    !order.tableNumber
                      ? "N/A"
                      : order.tableNumber}
                  </p>
                </div>

                <span className="text-xs text-gray-500">
                  {new Date(order.createdAt).toLocaleTimeString()}
                </span>
              </div>

              {/* ITEMS */}
              <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                {order.items
                  ?.filter(Boolean)
                  .map((item, idx) => (
                    <div
                      key={idx}
                      className="border-b border-gray-800 pb-2"
                    >
                      <p className="text-sm font-medium">
                        {item.product?.name || "Item"} ×
                        {item.quantity || 0}
                      </p>

                      <div className="flex justify-between text-xs text-gray-400">
                        <span>
                          {item.spiceLevel || "normal"}
                        </span>

                        <span>
                        </span>
                      </div>

                      <div className="flex justify-between mb-2">
                        <span className="text-xs text-gray-500">
                          Portion
                        </span>

                        <span className="text-green-400 font-semibold">
                          {item.variantName || "Standard"}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>

              {/* TOTAL */}

              {/* STATUS */}
              <div className="flex justify-between items-center">
                <span className={statusBadge(order.status)}>
                  {order.status}
                </span>

                <div className="flex gap-2">
                  <button
                    disabled={order.status !== "pending"}
                    onClick={() =>
                      handleStatus(order._id, "preparing")
                    }
                    className="text-xs px-3 py-1 rounded border border-gray-700 disabled:opacity-40"
                  >
                    Prep
                  </button>

                  <button
                    disabled={order.status !== "preparing"}
                    onClick={() =>
                      handleStatus(order._id, "ready")
                    }
                    className="text-xs px-3 py-1 rounded border border-gray-700 disabled:opacity-40"
                  >
                    Ready
                  </button>
                </div>
              </div>

            </div>
          ))}

          <div ref={bottomRef} />
        </div>
      )}
    </div>
  );
};

export default Orders;