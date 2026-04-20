// src/api/adminApi.js

import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5002/api/admin",
  withCredentials: true,
});


// ================= AUTH =================

// 🔐 Login
export const loginAdminAPI = (data) => API.post("/login", data);

// 👤 Profile
export const getAdminProfileAPI = () => API.get("/profile");

// 🚪 Logout
export const logoutAdminAPI = () => API.post("/logout");


// ================= PRODUCT =================

// ➕ CREATE PRODUCT
export const createProductAPI = (data) =>
  API.post("/product", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// 📦 GET ALL PRODUCTS
export const getProductsAPI = () => API.get("/product");

// 🔍 GET SINGLE PRODUCT
export const getProductByIdAPI = (id) => API.get(`/product/${id}`);

// ✏️ UPDATE PRODUCT
export const updateProductAPI = (id, data) =>
  API.put(`/product/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// ❌ DELETE PRODUCT
export const deleteProductAPI = (id) =>
  API.delete(`/product/${id}`);


export default API;