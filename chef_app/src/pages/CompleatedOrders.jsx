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

  const readyItems = myData?.filter((item) => item.status === "ready");

  const totalOrders = readyItems.length;

  const todayOrders = readyItems.filter((item) => {
    const today = new Date().toDateString();
    return new Date(item.createdAt).toDateString() === today;
  }).length;

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

    <div className="bg-card border border-borderSubtle/70 rounded-2xl p-6 shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
      <p className="text-xs text-textSecondary">Total Orders</p>
      <h2 className="text-3xl font-semibold mt-2">
        {totalOrders}
      </h2>
    </div>

    <div className="bg-card border border-borderSubtle/70 rounded-2xl p-6 shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
      <p className="text-xs text-textSecondary">Today's Orders</p>
      <h2 className="text-3xl font-semibold mt-2">
        {todayOrders}
      </h2>
    </div>

  </div>

  {/* 🧱 CARD GRID */}
  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">

    {readyItems.map((item) => (
      <div
        key={item._id}
        className="
          bg-card 
          border border-borderSubtle/70 
          rounded-2xl 
          p-5 
          shadow-[0_4px_20px_rgba(0,0,0,0.35)]
          hover:shadow-[0_8px_30px_rgba(0,0,0,0.45)]
          hover:-translate-y-1
          transition-all duration-300
        "
      >
        {/* 🔝 Top */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-semibold tracking-wide">
            #{item.orderId}
          </span>

          <span className="bg-primary/15 text-primary text-xs px-3 py-1 rounded-full font-medium border border-primary/20">
            Ready
          </span>
        </div>

        {/* 📦 Content */}
        <div className="space-y-3 text-sm text-textSecondary">

          <div className="flex justify-between">
            <span className="opacity-60">Item</span>
            <span className="text-textPrimary">{item.itemId}</span>
          </div>

          <div className="flex justify-between">
            <span className="opacity-60">Product</span>
            <span className="text-textPrimary">{item.productId}</span>
          </div>

          <div className="flex justify-between">
            <span className="opacity-60">Chef</span>
            <span className="text-textPrimary">{item.chefName}</span>
          </div>

        </div>

        {/* ⏱ Footer */}
        <div className="mt-5 pt-3 border-t border-borderSubtle/60 text-xs text-textSecondary">
          {new Date(item.createdAt).toLocaleString()}
        </div>
      </div>
    ))}

  </div>
</div>
  );
};

export default CompleatedOrders;