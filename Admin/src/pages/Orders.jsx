import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrders,
  updateOrderStatus,
} from "../redux/slice/adminOrderSlice"

const Orders = () => {
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
      <h2 className="text-lg font-semibold mb-4 text-gray-900">
        Orders
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
              className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
            >

              {/* Top */}
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-semibold text-gray-900">
                  #{order._id.slice(-5)}
                </h3>

                <span className="text-xs text-gray-500">
                  {order.table?.tableNumber || "T"}
                </span>
              </div>

              {/* Items */}
              <div className="text-sm text-gray-700 mb-2">
                {order.items?.map((item, idx) => (
                  <p key={idx}>
                    • {item.product?.name}
                  </p>
                ))}
              </div>

              {/* Total */}
              <p className="text-sm font-medium text-gray-900 mb-3">
                Total: ₹{order.totalAmount}
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
                    onClick={() =>
                      handleStatus(order._id, "preparing")
                    }
                    className="text-xs px-2 py-1 bg-gray-100 rounded hover:bg-gray-200"
                  >
                    Preparing
                  </button>

                  <button
                    onClick={() =>
                      handleStatus(order._id, "ready")
                    }
                    className="text-xs px-2 py-1 bg-gray-100 rounded hover:bg-gray-200"
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

export default Orders;