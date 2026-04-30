import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllChefs,
  deleteChef,
  registerChef,
  updateChef,
} from "../redux/slice/chefSlice";
import { getCategories } from "../redux/slice/categorySlice";
import { FaEdit } from "react-icons/fa";

export default function ChefList() {
  const dispatch = useDispatch();

  const { chefs, loading } = useSelector((state) => state.chef);
  const { categories } = useSelector((state) => state.category);

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    category: "",
    password: "",
  });

  const [editOpen, setEditOpen] = useState(false);

  const [editForm, setEditForm] = useState({
    _id: "",
    name: "",
    mobile: "",
    category: "",
    credit: 0,
  });

  useEffect(() => {
    dispatch(getAllChefs());
    dispatch(getCategories());
  }, [dispatch]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(registerChef(form));

    setForm({
      name: "",
      mobile: "",
      category: "",
      password: "",
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this chef?")) {
      dispatch(deleteChef(id));
    }
  };

  const handleEditOpen = (chef) => {
    setEditForm({
      _id: chef._id,
      name: chef.name,
      mobile: chef.mobile,
      category: chef.category?._id || "",
      credit: chef.credit || 0,
    });

    setEditOpen(true);
  };

  const handleEditChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();

    dispatch(
      updateChef({
        id: editForm._id,
        data: {
          name: editForm.name,
          mobile: editForm.mobile,
          category: editForm.category,
          credit: Number(editForm.credit),
        },
      })
    );

    setEditOpen(false);
  };

  return (
    <div className="mt-5">

      {/* REGISTER FORM */}
      <div className="max-w-2xl mx-auto bg-cardGradient border border-borderSubtle rounded-xl2 shadow-soft p-8 mb-6">

        <h2 className="text-xl font-bold mb-3 text-textPrimary">
          Register Chef
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">

          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-[#1A1A1A] border border-borderSubtle rounded-xl2 text-textPrimary"
            required
          />

          <input
            type="text"
            name="mobile"
            placeholder="Mobile"
            value={form.mobile}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-[#1A1A1A] border border-borderSubtle rounded-xl2 text-textPrimary"
            required
          />

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-[#1A1A1A] border border-borderSubtle rounded-xl2 text-textPrimary"
            required
          >
            <option value="">Select Category</option>
            {categories?.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-[#1A1A1A] border border-borderSubtle rounded-xl2 text-textPrimary"
            required
          />

          <button className="w-full bg-primaryGradient text-white py-2.5 rounded-xl2 shadow-glow hover:shadow-glowHover transition font-medium">
            Register Chef
          </button>

        </form>
      </div>

      {/* CHEF LIST */}
      <div className="max-w-2xl mx-auto bg-cardGradient border border-borderSubtle rounded-xl2 shadow-soft p-6">

        <h2 className="text-xl font-bold mb-3 text-textPrimary">
          All Chefs
        </h2>

        {loading && (
          <p className="text-textSecondary">Loading...</p>
        )}

        <div className="space-y-3">
          {chefs?.map((chef) => (
            <div
              key={chef._id}
              className="flex justify-between items-center border border-borderSubtle p-3 rounded-xl2"
            >
              <div>
                <p className="font-semibold text-textPrimary">
                  {chef.name}
                </p>

                <p className="text-sm text-textSecondary">
                  {chef.mobile}
                </p>

                <p className="text-sm text-primary">
                  {chef.category?.name}
                </p>

                <p className="text-sm text-green-400">
                  Credit: {chef.credit}
                </p>
              </div>

              <div className="flex gap-2">

                <button
                  onClick={() => handleEditOpen(chef)}
                  className="bg-blue-500 text-white px-3 py-2 rounded"
                >
                  <FaEdit />
                </button>

                <button
                  onClick={() => handleDelete(chef._id)}
                  className="bg-red-500 text-white px-3 py-2 rounded"
                >
                  Delete
                </button>

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* EDIT MODAL */}
      {editOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

          <div className="bg-cardGradient border border-borderSubtle p-6 rounded-xl2 w-full max-w-md">

            <h2 className="text-lg font-bold mb-4 text-textPrimary">
              Edit Chef
            </h2>

            <form onSubmit={handleEditSubmit} className="space-y-3">

              <input
                type="text"
                name="name"
                value={editForm.name}
                onChange={handleEditChange}
                className="w-full px-3 py-2 bg-[#1A1A1A] border border-borderSubtle rounded-xl2 text-textPrimary"
              />

              <input
                type="text"
                name="mobile"
                value={editForm.mobile}
                onChange={handleEditChange}
                className="w-full px-3 py-2 bg-[#1A1A1A] border border-borderSubtle rounded-xl2 text-textPrimary"
              />

              <select
                name="category"
                value={editForm.category}
                onChange={handleEditChange}
                className="w-full px-3 py-2 bg-[#1A1A1A] border border-borderSubtle rounded-xl2 text-textPrimary"
              >
                {categories?.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>

              <input
                type="number"
                name="credit"
                value={editForm.credit}
                onChange={handleEditChange}
                className="w-full px-3 py-2 bg-[#1A1A1A] border border-borderSubtle rounded-xl2 text-textPrimary"
              />

              <div className="flex gap-2">

                <button
                  type="submit"
                  className="flex-1 bg-primaryGradient text-white py-2 rounded-xl2"
                >
                  Update
                </button>

                <button
                  type="button"
                  onClick={() => setEditOpen(false)}
                  className="flex-1 bg-gray-500 text-white py-2 rounded-xl2"
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
}