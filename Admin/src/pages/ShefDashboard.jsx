import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrders,
  updateOrderStatus,
} from "../redux/slice/adminOrderSlice";

const ChefDashboard = () => {
  const dispatch = useDispatch();

  const { orders, loading } = useSelector((state) => state.order);

  // 🔥 Fetch orders
  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  // 🔥 Status update
  const handleStatus = (id, status) => {
    dispatch(updateOrderStatus({ id, status }));
  };

  return (
    <div>

      {/* Heading */}
      <h2 className="text-xl font-bold mb-4 text-gray-900">
        Kitchen Orders
      </h2>

      {/* Loading */}
      {loading ? (
        <p>Loading...</p>
      ) : orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          {orders.map((order) => (
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
                  {order.table?.tableNumber || "T"}
                </span>
              </div>

              {/* Items (BIG + CLEAR) */}
              <div className="mb-4">
                {order.items?.map((item, idx) => (
                  <p
                    key={idx}
                    className="text-base font-semibold text-gray-900"
                  >
                    • {item.product?.name}
                  </p>
                ))}
              </div>

              {/* Status */}
              <div className="flex items-center justify-between">

                <span
                  className={`text-sm px-3 py-1 rounded-full font-semibold ${
                    order.status === "pending"
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
                    onClick={() =>
                      handleStatus(order._id, "preparing")
                    }
                    className="text-sm px-3 py-1 bg-gray-900 text-white rounded"
                  >
                    Preparing
                  </button>

                  <button
                    onClick={() =>
                      handleStatus(order._id, "ready")
                    }
                    className="text-sm px-3 py-1 bg-gray-900 text-white rounded"
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