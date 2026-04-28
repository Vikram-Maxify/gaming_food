import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAdmin } from "../redux/slice/adminSlice"; 
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
    const [form, setForm] = useState({
        mobile: "",
        password: "",
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error, isAuthenticated } = useSelector(
        (state) => state.admin
    );

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await dispatch(loginAdmin(form));

        if (res.meta.requestStatus === "fulfilled") {
            navigate("/admin");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">

            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-xl shadow-sm w-full max-w-sm border border-gray-200"
            >

                <h2 className="text-lg font-semibold mb-4 text-gray-900">
                    Admin Login
                </h2>

                {/* Mobile */}
                <input
                    type="text"
                    name="mobile"
                    placeholder="Mobile Number"
                    value={form.mobile}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3 text-sm outline-none"
                />

                {/* Password */}
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3 text-sm outline-none"
                />

                {/* Error */}
                {error && (
                    <p className="text-red-500 text-xs mb-2">{error}</p>
                )}

                {/* Button */}
                <button
                    type="submit"
                    className="w-full bg-gray-900 text-white py-2 rounded-lg text-sm"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

            </form>

        </div>
    );
};

export default AdminLogin;