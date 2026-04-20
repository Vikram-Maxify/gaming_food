// src/pages/Register.jsx

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, resetState } from "../reducer/slice/authSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData));
  };

  useEffect(() => {
    if (success) navigate("/login");
    return () => dispatch(resetState());
  }, [success]);

  return (
    <div className="h-screen bg-[url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092')] bg-cover bg-center flex items-center justify-center">
      
      <div className="bg-black/60 absolute inset-0"></div>

      <div className="relative z-10 backdrop-blur-lg bg-white/10 p-8 rounded-2xl w-[340px] text-white shadow-xl">
        <h2 className="text-2xl font-bold text-center mb-2">🍕 Join Foodies</h2>
        <p className="text-center text-sm mb-6 text-gray-200">
          Create account & start ordering
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="p-2 rounded bg-white/20 outline-none placeholder-gray-300"
          />

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

          <button className="bg-orange-500 hover:bg-orange-600 transition p-2 rounded font-semibold">
            {loading ? "Loading..." : "Register"}
          </button>
        </form>

        {error && <p className="text-red-400 mt-3 text-sm">{error}</p>}
      </div>
    </div>
  );
};

export default Register;