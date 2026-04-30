import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllChefs,
  deleteChef,
  registerChef,
} from "../redux/slice/chefSlice";
import { getCategories } from "../redux/slice/categorySlice";

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

  useEffect(() => {
    dispatch(getAllChefs());
    dispatch(getCategories()); // 🔥 important
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
    if (confirm("Delete this chef?")) {
      dispatch(deleteChef(id));
    }
  };

  return (
    <div className="mt-5">

      {/* 🔥 REGISTER FORM (same UI) */}
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

          {/* ✅ FIXED CATEGORY (dropdown, same CSS) */}
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-[#1A1A1A] border border-borderSubtle rounded-xl2 text-textPrimary"
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
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

      {/* 📋 LIST (same UI) */}
      <div className="max-w-2xl mx-auto bg-cardGradient border border-borderSubtle rounded-xl2 shadow-soft p-6">

        <h2 className="text-xl font-bold mb-3 text-textPrimary">
          All Chefs
        </h2>

        {loading && <p className="text-textSecondary">Loading...</p>}

        <div className="space-y-3">
          {chefs.map((chef) => (
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

                {/* ✅ populated category */}
                <p className="text-sm text-primary">
                  {chef.category?.name}
                </p>
              </div>

              <button
                onClick={() => handleDelete(chef._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}