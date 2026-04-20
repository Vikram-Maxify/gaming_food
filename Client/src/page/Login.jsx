// src/pages/Login.jsx

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, resetState } from "../reducer/slice/authSlice"
import { useNavigate } from "react-router-dom";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error, token } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        mobile: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser(formData));
    };

    useEffect(() => {
        if (token) navigate("/");
        return () => dispatch(resetState());
    }, [token]);

    return (
        <div className="h-screen bg-[url('https://images.unsplash.com/photo-1550547660-d9450f859349')] bg-cover bg-center flex items-center justify-center">

            <div className="bg-black/60 absolute inset-0"></div>

            <div className="relative z-10 backdrop-blur-lg bg-white/10 p-8 rounded-2xl w-[320px] text-white shadow-xl">
                <h2 className="text-2xl font-bold text-center mb-2">🍔 Welcome Back</h2>
                <p className="text-center text-sm mb-6 text-gray-200">
                    Login to order your favorite food
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="text"
                        name="mobile"
                        placeholder="Mobile Number"
                        value={formData.mobile}
                        onChange={handleChange}
                        className="p-2 rounded bg-white/20 outline-none placeholder-gray-300"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="p-2 rounded bg-white/20 outline-none placeholder-gray-300"
                    />

                    <button className="bg-red-500 hover:bg-red-600 transition p-2 rounded font-semibold">
                        {loading ? "Loading..." : "Login"}
                    </button>
                </form>

                {error && <p className="text-red-400 mt-3 text-sm">{error}</p>}
            </div>
        </div>
    );
};

export default Login;