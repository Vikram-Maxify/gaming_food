import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { chefLogin } from "../redux/slice/chefAuthSlice";
import { toast } from "react-toastify";

const ChefLogin = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.chef);

  const [form, setForm] = useState({
    mobile: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await dispatch(chefLogin(form));

    if (res.type === "chef/login/fulfilled") {
      toast.success("Chef Login Success 👨‍🍳");
    } else {
      toast.error(res.payload || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f]">

      <div className="w-full max-w-md bg-[#1a1a1a] p-6 rounded-xl shadow-lg">

        <h2 className="text-2xl font-bold text-white text-center mb-6">
          👨‍🍳 Chef Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="mobile"
            placeholder="Mobile"
            value={form.mobile}
            onChange={handleChange}
            className="w-full p-3 rounded bg-[#111] text-white outline-none border border-gray-700"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 rounded bg-[#111] text-white outline-none border border-gray-700"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded font-semibold"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

      </div>

    </div>
  );
};

export default ChefLogin;