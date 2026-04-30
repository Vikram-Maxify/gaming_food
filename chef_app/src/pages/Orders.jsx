import React, { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { toast } from "react-toastify";
import { FaFireFlameCurved } from "react-icons/fa6";

import {
    getOrders,
    updateOrderStatus,
    addOrder,
    updateOrderInState,
} from "../redux/slice/adminOrderSlice";

// ✅ NEW: item tracking thunk
import { markItemReadyThunk } from "../redux/slice/itemPreparationSlice";

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

    // 📦 LOAD ORDERS
    useEffect(() => {
        dispatch(getOrders());
    }, [dispatch]);

    // 🔌 SOCKET
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

    // ✅ FIXED: STATUS HANDLER
    const handleStatus = (order, status) => {
        // update order status
        dispatch(updateOrderStatus({ id: order._id, status }));

        // 🔥 when READY → track each item
        if (status === "ready") {
            order.items?.forEach((item) => {
                if (!item?._id) return;

                dispatch(
                    markItemReadyThunk({
                        orderId: order._id,
                        itemId: item._id,
                        productId: item.product?._id,
                    })
                );
            });

            toast.success("✅ All items marked ready!");
        }
    };

    // 💰 TOTAL CALCULATION
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
                                    .map((item, idx) => {

                                        const spiceColor =
                                            item.spiceLevel === "low"
                                                ? "bg-green-500/10 text-green-400 border-green-500/30"
                                                : item.spiceLevel === "medium"
                                                ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/30"
                                                : "bg-red-500/10 text-red-400 border-red-500/30";

                                        return (
                                            <div
                                                key={idx}
                                                className="border-b border-gray-800 pb-3"
                                            >
                                                <p className="text-sm font-semibold text-white mb-1">
                                                    {item.product?.name || "Item"} ×{item.quantity || 0}
                                                </p>

                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <span
                                                        className={`text-[11px] px-2 py-1 rounded-full border font-medium flex items-center gap-1 ${spiceColor}`}
                                                    >
                                                        <FaFireFlameCurved />
                                                        {item.spiceLevel || "normal"}
                                                    </span>

                                                    <span className="text-[11px] px-2 py-1 rounded-full border border-gray-700 text-gray-300 bg-gray-800">
                                                        {item.variantName || "Standard"}
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>

                            {/* STATUS */}
                            <div className="flex justify-between items-center">
                                <span className={statusBadge(order.status)}>
                                    {order.status}
                                </span>

                                <div className="flex gap-2">
                                    <button
                                        disabled={order.status !== "pending"}
                                        onClick={() =>
                                            handleStatus(order, "preparing")
                                        }
                                        className="text-xs px-3 py-1 rounded border border-gray-700 disabled:opacity-40"
                                    >
                                        Prep
                                    </button>

                                    <button
                                        disabled={order.status !== "preparing"}
                                        onClick={() =>
                                            handleStatus(order, "ready")
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