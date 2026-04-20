// src/pages/admin/Menu.jsx

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, deleteProduct } from "../redux/slice/AdminProductSlice";

const Menu = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.product);

  const [category, setCategory] = useState("all");

  // 🔥 fetch products
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  // 🔥 dynamic categories (DB se)
  const categories = [
    "all",
    ...new Set(products.map((p) => p.category?.name).filter(Boolean)),
  ];

  // 🔥 filter
  const filteredData = products.filter((item) => {
    return category === "all" || item.category?.name === category;
  });

  return (
    <div className="p-4">

      {/* Heading */}
      <h2 className="text-lg font-semibold mb-4 text-gray-900">
        🍔 Menu Management
      </h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-3 py-1 text-xs rounded-full border ${
              category === cat
                ? "bg-gray-900 text-white"
                : "bg-white text-gray-600 border-gray-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">

        <div className="bg-white border p-4 rounded-xl shadow-sm">
          <p className="text-sm text-gray-500">Total Items</p>
          <h3 className="text-xl font-semibold">{filteredData.length}</h3>
        </div>

      </div>

      {/* Table */}
      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">

        {/* Header */}
        <div className="grid grid-cols-5 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-600">
          <span>Image</span>
          <span>Name</span>
          <span>Category</span>
          <span>Credits</span>
          <span>Action</span>
        </div>

        {/* Rows */}
        {loading ? (
          <p className="p-4">Loading...</p>
        ) : filteredData.length === 0 ? (
          <p className="p-4">No products found</p>
        ) : (
          filteredData.map((item) => (
            <div
              key={item._id}
              className="grid grid-cols-5 px-4 py-3 text-sm border-t items-center"
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.name}
                className="w-12 h-12 object-cover rounded"
              />

              {/* Name */}
              <span className="text-gray-900">{item.name}</span>

              {/* Category */}
              <span className="text-gray-600">
                {item.category?.name}
              </span>

              {/* Credits */}
              <span className="text-gray-700">
                {item.creditPoints}
              </span>

              {/* Actions */}
              <div className="flex gap-2">
                <button className="text-xs px-2 py-1 bg-gray-100 rounded hover:bg-gray-200">
                  Edit
                </button>

                <button
                  onClick={() => dispatch(deleteProduct(item._id))}
                  className="text-xs px-2 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Menu;