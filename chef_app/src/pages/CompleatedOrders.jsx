import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyPreparationsThunk } from "../redux/slice/itemPreparationSlice";

const CompleatedOrders = () => {
  const dispatch = useDispatch();

  const { myData, loading, error } = useSelector(
    (state) => state.itemPreparation
  );

  useEffect(() => {
    dispatch(getMyPreparationsThunk());
  }, [dispatch]);

  // ✅ FIX: handle array OR object response safely
  const rawData = Array.isArray(myData)
    ? myData
    : myData?.data || [];

  const readyItems =
    rawData.filter((item) => item?.status === "ready") || [];

  const totalOrders = readyItems.length;

  const todayOrders = readyItems.filter((item) => {
    const today = new Date().toDateString();
    return new Date(item.createdAt).toDateString() === today;
  }).length;

  // 🔥 LOADING
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-textPrimary">
        Loading...
      </div>
    );
  }

  // ❌ ERROR
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface px-8 py-6 text-textPrimary">

      {/* 🔝 Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-wide">
          Completed Orders
        </h1>
        <p className="text-sm text-textSecondary">
          Track all prepared items
        </p>
      </div>

      {/* 📊 Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">

        <div className="bg-card border border-borderSubtle/70 rounded-2xl p-6">
          <p className="text-xs text-textSecondary">Total Orders</p>
          <h2 className="text-3xl font-semibold mt-2">{totalOrders}</h2>
        </div>

        <div className="bg-card border border-borderSubtle/70 rounded-2xl p-6">
          <p className="text-xs text-textSecondary">Today's Orders</p>
          <h2 className="text-3xl font-semibold mt-2">{todayOrders}</h2>
        </div>

      </div>

      {/* 🧱 GRID */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">

        {readyItems.length === 0 ? (
          <div className="col-span-full text-center text-textSecondary mt-10">
            No completed orders found
          </div>
        ) : (
          readyItems.map((item) => (
            <div
              key={item._id}
              className="bg-card border border-borderSubtle/70 rounded-2xl p-5"
            >
              {/* TOP */}
              <div className="flex justify-between mb-4">
                <span className="font-semibold">
                  #{item.orderId}
                </span>

                <span className="text-xs px-3 py-1 rounded-full bg-primary/15 text-primary">
                  Ready
                </span>
              </div>

              {/* CONTENT */}
              <div className="space-y-3 text-sm text-textSecondary">

                <div className="flex justify-between">
                  <span>Item</span>
                  <span className="text-textPrimary">
                    {item.itemId}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Product</span>
                  <span className="text-textPrimary">
                    {item.productDetails?.name || "N/A"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Chef</span>
                  <span className="text-textPrimary">
                    {item.chefName}
                  </span>
                </div>

              </div>

              {/* FOOTER */}
              <div className="mt-4 pt-3 border-t text-xs text-textSecondary">
                {item.createdAt
                  ? new Date(item.createdAt).toLocaleString()
                  : "N/A"}
              </div>

            </div>
          ))
        )}

      </div>
    </div>
  );
};

export default CompleatedOrders;