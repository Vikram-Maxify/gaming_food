import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  deleteProduct,
  updateProduct,
} from "../redux/slice/AdminProductSlice";
import { getCategories } from "../redux/slice/categorySlice";
import Swal from "sweetalert2";

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

  const themedSwal = Swal.mixin({
    background: "#0D0D0D",
    color: "#E5E7EB",
    backdrop: "rgba(0,0,0,0.8)",
    customClass: {
      popup:
        "rounded-2xl border border-borderSubtle shadow-[0_0_30px_rgba(255,122,24,0.15)]",
      confirmButton:
        "bg-primaryGradient text-white px-4 py-2 rounded-lg shadow-glow",
      cancelButton:
        "bg-[#1A1A1A] text-textSecondary border border-borderSubtle px-4 py-2 rounded-lg",
    },
    buttonsStyling: false,
  });

  const categoriesList = [
    "all",
    ...new Set(products.map((p) => p.category?.name).filter(Boolean)),
  ];

  const filteredData = products.filter((item) => {
    return category === "all" || item.category?.name === category;
  });

  // 🔥 DELETE
  const handleDelete = (id) => {
    themedSwal
      .fire({
        title: "Delete Product?",
        text: "This cannot be undone",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Delete",
      })
      .then((result) => {
        if (result.isConfirmed) {
          dispatch(deleteProduct(id));

          themedSwal.fire({
            title: "Deleted!",
            icon: "success",
            timer: 1200,
            showConfirmButton: false,
          });
        }
      });
  };

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
    const updated = editForm.variants.map((v, i) =>
      i === index ? { ...v, [field]: value } : v
    );
    setEditForm({ ...editForm, variants: updated });
  };

  const addVariant = () => {
    setEditForm({
      ...editForm,
      variants: [...editForm.variants, { name: "", price: "" }],
    });
  };

  const removeVariant = (index) => {
    const updated = editForm.variants.filter((_, i) => i !== index);
    setEditForm({ ...editForm, variants: updated });
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    if (!editForm.name || !editForm.category || !editForm.type) {
      themedSwal.fire("Error", "Fill required fields", "error");
      return;
    }

    const data = new FormData();
    data.append("name", editForm.name);
    data.append("category", editForm.category);
    data.append("type", editForm.type);
    data.append("creditPoints", editForm.creditPoints);
    data.append("variants", JSON.stringify(editForm.variants));

    dispatch(updateProduct({ id: editProduct._id, data }));

    themedSwal.fire({
      title: "Updated!",
      icon: "success",
      timer: 1200,
      showConfirmButton: false,
    });

    setShowEditModal(false);
  };

  return (
    <div className="p-6">

      <h2 className="text-xl font-semibold mb-6 text-textPrimary">
        Menu Management
      </h2>

      {/* FILTER */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categoriesList.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-1.5 text-xs rounded-full border ${
              category === cat
                ? "bg-primaryGradient text-white shadow-glow"
                : "bg-[#1A1A1A] text-textSecondary border-borderSubtle"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-5">

        {filteredData.map((item) => (
          <div
            key={item._id}
            className="bg-cardGradient border border-borderSubtle rounded-xl2 p-4 shadow-soft"
          >
            <img
              src={item.image}
              className="h-40 w-full object-cover rounded-lg mb-3"
            />

            <h3 className="text-textPrimary font-semibold text-sm">
              {item.name}
            </h3>

            <div className="flex gap-2 mt-3">

              <button
                onClick={() => handleEditClick(item)}
                className="flex-1 py-1.5 text-xs rounded-lg bg-[#1A1A1A] border border-borderSubtle text-primary"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(item._id)}
                className="flex-1 py-1.5 text-xs rounded-lg bg-[#1A1A1A] border border-borderSubtle text-danger"
              >
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>

      {/* EDIT MODAL */}
      {showEditModal && (
  <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">

    <div className="bg-cardGradient border border-borderSubtle p-6 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-soft">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-lg text-textPrimary font-semibold">
          Edit Product
        </h3>

        <button
          onClick={() => setShowEditModal(false)}
          className="w-8 h-8 flex items-center justify-center bg-[#1A1A1A] border border-borderSubtle rounded-lg text-textSecondary hover:text-textPrimary hover:shadow-glow transition"
        >
          ✕
        </button>
      </div>

      <form onSubmit={handleUpdate} className="flex flex-col gap-4">

        {/* NAME */}
        <input
          type="text"
          name="name"
          value={editForm.name}
          onChange={handleEditChange}
          className="p-2.5 bg-[#1A1A1A] border border-borderSubtle rounded-xl text-textPrimary outline-none 
          focus:border-primary focus:ring-1 focus:ring-primary/40 focus:shadow-[0_0_10px_rgba(255,122,24,0.5)] transition-all"
        />

        {/* CATEGORY */}
        <select
          name="category"
          value={editForm.category}
          onChange={handleEditChange}
          className="p-2.5 bg-[#1A1A1A] border border-borderSubtle rounded-xl text-textPrimary outline-none 
          focus:border-primary focus:ring-1 focus:ring-primary/40 focus:shadow-[0_0_10px_rgba(255,122,24,0.5)] transition-all"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* TYPE */}
        <select
          name="type"
          value={editForm.type}
          onChange={handleEditChange}
          className="p-2.5 bg-[#1A1A1A] border border-borderSubtle rounded-xl text-textPrimary outline-none 
          focus:border-primary focus:ring-1 focus:ring-primary/40 focus:shadow-[0_0_10px_rgba(255,122,24,0.5)] transition-all"
        >
          <option value="">Type</option>
          <option value="veg">Veg</option>
          <option value="non-veg">Non-Veg</option>
          <option value="drink">Drink</option>
        </select>

        {/* VARIANTS */}
        {editForm.variants.map((v, i) => (
          <div key={i} className="flex gap-2">

            <input
              value={v.name}
              onChange={(e) =>
                handleVariantChange(i, "name", e.target.value)
              }
              className="flex-1 p-2 bg-[#1A1A1A] border border-borderSubtle rounded outline-none 
              focus:border-primary focus:ring-1 focus:ring-primary/40 focus:shadow-[0_0_8px_rgba(255,122,24,0.4)] transition"
            />

            <input
              value={v.price}
              onChange={(e) =>
                handleVariantChange(i, "price", e.target.value)
              }
              className="w-24 p-2 bg-[#1A1A1A] border border-borderSubtle rounded outline-none 
              focus:border-primary focus:ring-1 focus:ring-primary/40 focus:shadow-[0_0_8px_rgba(255,122,24,0.4)] transition"
            />

            <button
              type="button"
              onClick={() => removeVariant(i)}
              className="px-2 text-danger hover:scale-110 transition"
            >
              ❌
            </button>

          </div>
        ))}

        {/* ADD VARIANT */}
        <button
          type="button"
          onClick={addVariant}
          className="text-xs text-primary hover:underline w-fit"
        >
          + Add Variant
        </button>

        {/* SUBMIT */}
        <button
          type="submit"
          className="bg-primaryGradient text-white py-2.5 rounded-xl shadow-glow hover:shadow-glowHover transition font-medium"
        >
          Update Product
        </button>

      </form>

    </div>

  </div>
)}

    </div>
  );
};

export default Menu;