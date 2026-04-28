// src/pages/Login.jsx

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, resetState } from "../reducer/slice/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, Smartphone, Lock, ArrowRight, Sparkles } from "lucide-react";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error, token } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        mobile: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

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
    }, [token, navigate, dispatch]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-400 via-orange-500 to-red-500 flex items-center justify-center p-4">
            
            {/* Animated Background Circles */}
            <div className="absolute top-20 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
            
            {/* Decorative Food Icons */}
            <div className="absolute top-10 right-10 text-4xl opacity-20 animate-bounce">🍔</div>
            <div className="absolute bottom-10 left-10 text-4xl opacity-20 animate-bounce delay-300">🍕</div>
            <div className="absolute top-1/3 right-20 text-3xl opacity-20 animate-pulse">🌮</div>

            <div className="relative z-10 w-full max-w-md">
                {/* Logo/Brand Section */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl mb-4 shadow-lg">
                        <span className="text-4xl">🍽️</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Foodzzy</h1>
                    <p className="text-white/80 text-sm">Order your favorite food online</p>
                </div>

                {/* Login Card */}
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20">
                    <div className="flex items-center gap-2 mb-6">
                        <Sparkles size={18} className="text-yellow-300" />
                        <h2 className="text-xl font-bold text-white">Welcome Back</h2>
                    </div>
                    
                    <p className="text-white/70 text-sm mb-6">
                        Login to continue your food journey
                    </p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        {/* Mobile Number Field */}
                        <div className="relative">
                            <Smartphone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
                            <input
                                type="tel"
                                name="mobile"
                                placeholder="Mobile Number"
                                value={formData.mobile}
                                onChange={handleChange}
                                autoComplete="off"
                                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/50 outline-none focus:border-white/60 focus:ring-2 focus:ring-white/30 transition-all duration-300"
                            />
                        </div>

                        {/* Password Field */}
                        <div className="relative">
                            <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full pl-10 pr-12 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/50 outline-none focus:border-white/60 focus:ring-2 focus:ring-white/30 transition-all duration-300"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/80 transition"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="w-4 h-4 rounded border-white/30 bg-white/20 checked:bg-white/40"
                                />
                                <span className="text-white/70 text-sm">Remember me</span>
                            </label>
                            <button
                                type="button"
                                className="text-white/70 text-sm hover:text-white transition"
                            >
                                Forgot Password?
                            </button>
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="relative group bg-white text-orange-500 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                {loading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                                        Logging in...
                                    </>
                                ) : (
                                    <>
                                        Login
                                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
                                    </>
                                )}
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-100 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </button>
                    </form>

                    {/* Error Message */}
                    {error && (
                        <div className="mt-4 p-3 bg-red-500/20 border border-red-500/50 rounded-xl">
                            <p className="text-red-200 text-sm text-center">{error}</p>
                        </div>
                    )}

                    {/* Sign Up Link */}
                    <div className="mt-6 text-center">
                        <p className="text-white/70 text-sm">
                            Don't have an account?{" "}
                            <Link to="/register" className="text-white font-semibold hover:underline">
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Guest Checkout Option */}
                <div className="text-center mt-6">
                    <button
                        type="button"
                        onClick={() => navigate("/menu")}
                        className="text-white/80 text-sm hover:text-white transition"
                    >
                        Continue as Guest →
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;