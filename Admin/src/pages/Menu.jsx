// src/pages/admin/Menu.jsx

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, deleteProduct, updateProduct } from "../redux/slice/AdminProductSlice";
import { getCategories } from "../redux/slice/categorySlice";
import { FaRegEdit } from "react-icons/fa";
import { ImBin } from "react-icons/im";

const Menu = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.product);
  const { categories } = useSelector((state) => state.category);

  const [category, setCategory] = useState("all");

  // 🔥 Edit modal state
  const [showEditModal, setShowEditModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    category: "",
    type: "",
    creditPoints: "",
    variants: [],
  });

  // 🔥 fetch products
  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
  }, [dispatch]);

  // 🔥 dynamic categories (DB se)
  const categoriesList = [
    "all",
    ...new Set(products.map((p) => p.category?.name).filter(Boolean)),
  ];

  // 🔥 filter
  const filteredData = products.filter((item) => {
    return category === "all" || item.category?.name === category;
  });

  // 🔥 Open edit modal
  const handleEditClick = (product) => {
    setEditProduct(product);
    setEditForm({
      name: product.name || "",
      category: product.category?._id || product.category || "",
      type: product.type || "",
      creditPoints: product.creditPoints || "",
      variants: product.variants || [],
    });
    setShowEditModal(true);
  };

  // 🔥 Handle edit form change
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  // 🔥 Handle variant change
  const handleVariantChange = (index, field, value) => {
  const updatedVariants = editForm.variants.map((v, i) =>
    i === index ? { ...v, [field]: value } : v
  );

  setEditForm({
    ...editForm,
    variants: updatedVariants,
  });
};

  // 🔥 Add new variant
  const addVariant = () => {
    setEditForm({
      ...editForm,
      variants: [...editForm.variants, { name: "", price: "" }],
    });
  };

  // 🔥 Remove variant
  const removeVariant = (index) => {
    const updatedVariants = editForm.variants.filter((_, i) => i !== index);
    setEditForm({ ...editForm, variants: updatedVariants });
  };

  // 🔥 Submit update
  const handleUpdate = (e) => {
    e.preventDefault();

    if (!editForm.name || !editForm.category || !editForm.type) {
      alert("Please fill required fields");
      return;
    }

    const data = new FormData();
    data.append("name", editForm.name);
    data.append("category", editForm.category);
    data.append("type", editForm.type);
    data.append("creditPoints", editForm.creditPoints);
    data.append("variants", JSON.stringify(editForm.variants));

    dispatch(updateProduct({ id: editProduct._id, data }));
    setShowEditModal(false);
    setEditProduct(null);
  };

  return (
    <div className="p-4">

      {/* Heading */}
      <h2 className="text-lg font-semibold mb-4 text-gray-900">
        🍔 Menu Management
      </h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        {categoriesList.map((cat) => (
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
        <div className="grid grid-cols-6 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-600">
          <span>Image</span>
          <span>Name</span>
          <span>Category</span>
          <span>Variants</span>
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
              className="grid grid-cols-6 px-4 py-3 text-sm border-t items-center"
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

              {/* Variants */}
              <div className="flex flex-wrap gap-1">
                {item.variants?.map((v, i) => (
                  <span
                    key={i}
                    className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded"
                  >
                    {v.name} ₹{v.price}
                  </span>
                ))}
              </div>

              {/* Credits */}
              <span className="text-gray-700">
                {item.creditPoints}
              </span>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditClick(item)}
                  className="text-xl px-2 py-1 bg-blue-400/30 rounded hover:bg-blue-500/30"
                >
                  <FaRegEdit />
                </button>

                <button
                  onClick={() => dispatch(deleteProduct(item._id))}
                  className="text-xl px-2 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
                >
                  <ImBin />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 🔥 Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">Edit Product</h3>

            <form onSubmit={handleUpdate} className="flex flex-col gap-4">

              {/* Name */}
              <div>
                <label className="text-sm text-gray-600">Name</label>
                <input
                  type="text"
                  name="name"
                  value={editForm.name}
                  onChange={handleEditChange}
                  className="w-full p-2 border rounded"
                />
              </div>

              {/* Category */}
              <div>
                <label className="text-sm text-gray-600">Category</label>
                <select
                  name="category"
                  value={editForm.category}
                  onChange={handleEditChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Type */}
              <div>
                <label className="text-sm text-gray-600">Type</label>
                <select
                  name="type"
                  value={editForm.type}
                  onChange={handleEditChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select Type</option>
                  <option value="veg">Veg</option>
                  <option value="non-veg">Non-Veg</option>
                  <option value="drink">Drink</option>
                </select>
              </div>

              {/* Credit Points */}
              <div>
                <label className="text-sm text-gray-600">Credit Points</label>
                <input
                  type="number"
                  name="creditPoints"
                  value={editForm.creditPoints}
                  onChange={handleEditChange}
                  className="w-full p-2 border rounded"
                />
              </div>

              {/* Variants */}
              <div>
                <label className="text-sm text-gray-600 mb-2 block">Variants</label>
                {editForm.variants.map((variant, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="Size (Half/Full)"
                      value={variant.name}
                      onChange={(e) => handleVariantChange(index, "name", e.target.value)}
                      className="flex-1 p-2 border rounded"
                    />
                    <input
                      type="number"
                      placeholder="Price"
                      value={variant.price}
                      onChange={(e) => handleVariantChange(index, "price", e.target.value)}
                      className="w-24 p-2 border rounded"
                    />
                    {editForm.variants.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeVariant(index)}
                        className="text-red-500 px-2"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addVariant}
                  className="text-sm text-orange-500"
                >
                  + Add Variant
                </button>
              </div>

              {/* Actions */}
              <div className="flex gap-2 mt-4">
                <button
                  type="submit"
                  className="flex-1 bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setEditProduct(null);
                  }}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;