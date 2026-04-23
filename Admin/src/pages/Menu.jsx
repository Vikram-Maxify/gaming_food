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

  const [showEditModal, setShowEditModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    category: "",
    type: "",
    creditPoints: "",
    variants: [],
  });

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
  }, [dispatch]);

  const categoriesList = [
    "all",
    ...new Set(products.map((p) => p.category?.name).filter(Boolean)),
  ];

  const filteredData = products.filter((item) => {
    return category === "all" || item.category?.name === category;
  });

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

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const handleVariantChange = (index, field, value) => {
    const updatedVariants = editForm.variants.map((v, i) =>
      i === index ? { ...v, [field]: value } : v
    );

    setEditForm({
      ...editForm,
      variants: updatedVariants,
    });
  };

  const addVariant = () => {
    setEditForm({
      ...editForm,
      variants: [...editForm.variants, { name: "", price: "" }],
    });
  };

  const removeVariant = (index) => {
    const updatedVariants = editForm.variants.filter((_, i) => i !== index);
    setEditForm({ ...editForm, variants: updatedVariants });
  };

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
    <div className="p-6">

      {/* Heading */}
      <h2 className="text-xl font-semibold mb-6 text-textPrimary">
        🍔 Menu Management
      </h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categoriesList.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-1.5 text-xs rounded-full border transition
              ${
                category === cat
                  ? "bg-primaryGradient text-white shadow-glow"
                  : "bg-[#1A1A1A] text-textSecondary border-borderSubtle hover:text-textPrimary hover:border-primary"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-cardGradient border border-borderSubtle p-5 rounded-xl2 shadow-soft hover:shadow-glowHover transition">
          <p className="text-sm text-textSecondary">Total Items</p>
          <h3 className="text-2xl font-semibold text-textPrimary mt-1">
            {filteredData.length}
          </h3>
        </div>
      </div>

      {/* Table */}
      <div className="bg-cardGradient border border-borderSubtle rounded-xl2 shadow-soft overflow-hidden">

        {/* Header */}
        <div className="grid grid-cols-6 px-4 py-3 text-xs font-medium text-textSecondary border-b border-borderSubtle">
          <span>Image</span>
          <span>Name</span>
          <span>Category</span>
          <span>Variants</span>
          <span>Credits</span>
          <span>Action</span>
        </div>

        {/* Rows */}
        {loading ? (
          <p className="p-4 text-textSecondary">Loading...</p>
        ) : filteredData.length === 0 ? (
          <p className="p-4 text-textSecondary">No products found</p>
        ) : (
          filteredData.map((item) => (
            <div
              key={item._id}
              className="grid grid-cols-6 px-4 py-3 text-sm items-center border-b border-borderSubtle hover:bg-[#1A1A1A] transition"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-12 h-12 object-cover rounded-lg border border-borderSubtle"
              />

              <span className="text-textPrimary">{item.name}</span>

              <span className="text-textSecondary">
                {item.category?.name}
              </span>

              <div className="flex flex-wrap gap-1">
                {item.variants?.map((v, i) => (
                  <span
                    key={i}
                    className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full border border-primary/30"
                  >
                    {v.name} ₹{v.price}
                  </span>
                ))}
              </div>

              <span className="text-textPrimary">
                {item.creditPoints}
              </span>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEditClick(item)}
                  className="p-2 rounded-lg bg-[#1A1A1A] border border-borderSubtle hover:shadow-glow transition text-primary"
                >
                  <FaRegEdit />
                </button>

                <button
                  onClick={() => dispatch(deleteProduct(item._id))}
                  className="p-2 rounded-lg bg-[#1A1A1A] border border-borderSubtle hover:shadow-glow transition text-danger"
                >
                  <ImBin />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-cardGradient border border-borderSubtle p-6 rounded-xl2 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-soft">
            <h3 className="text-xl font-bold mb-4 text-textPrimary">Edit Product</h3>

            <form onSubmit={handleUpdate} className="flex flex-col gap-4">

              <div>
                <label className="text-sm text-textSecondary">Name</label>
                <input
                  type="text"
                  name="name"
                  value={editForm.name}
                  onChange={handleEditChange}
                  className="w-full p-2 bg-[#1A1A1A] border border-borderSubtle rounded-lg text-textPrimary outline-none focus:shadow-glow"
                />
              </div>

              <div>
                <label className="text-sm text-textSecondary">Category</label>
                <select
                  name="category"
                  value={editForm.category}
                  onChange={handleEditChange}
                  className="w-full p-2 bg-[#1A1A1A] border border-borderSubtle rounded-lg text-textPrimary"
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm text-textSecondary">Type</label>
                <select
                  name="type"
                  value={editForm.type}
                  onChange={handleEditChange}
                  className="w-full p-2 bg-[#1A1A1A] border border-borderSubtle rounded-lg text-textPrimary"
                >
                  <option value="">Select Type</option>
                  <option value="veg">Veg</option>
                  <option value="non-veg">Non-Veg</option>
                  <option value="drink">Drink</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-textSecondary">Credit Points</label>
                <input
                  type="number"
                  name="creditPoints"
                  value={editForm.creditPoints}
                  onChange={handleEditChange}
                  className="w-full p-2 bg-[#1A1A1A] border border-borderSubtle rounded-lg text-textPrimary outline-none focus:shadow-glow"
                />
              </div>

              <div>
                <label className="text-sm text-textSecondary mb-2 block">Variants</label>
                {editForm.variants.map((variant, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="Size"
                      value={variant.name}
                      onChange={(e) => handleVariantChange(index, "name", e.target.value)}
                      className="flex-1 p-2 bg-[#1A1A1A] border border-borderSubtle rounded-lg text-textPrimary"
                    />
                    <input
                      type="number"
                      placeholder="Price"
                      value={variant.price}
                      onChange={(e) => handleVariantChange(index, "price", e.target.value)}
                      className="w-24 p-2 bg-[#1A1A1A] border border-borderSubtle rounded-lg text-textPrimary"
                    />
                    {editForm.variants.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeVariant(index)}
                        className="text-danger px-2"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addVariant}
                  className="text-sm text-primary"
                >
                  + Add Variant
                </button>
              </div>

              <div className="flex gap-2 mt-4">
                <button
                  type="submit"
                  className="flex-1 bg-primaryGradient text-white py-2 rounded-xl2 shadow-glow hover:shadow-glowHover transition"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setEditProduct(null);
                  }}
                  className="flex-1 bg-[#1A1A1A] border border-borderSubtle text-textSecondary py-2 rounded-xl2 hover:text-textPrimary"
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