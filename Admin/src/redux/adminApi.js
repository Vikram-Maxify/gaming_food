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
  API.post("/product/create", data,);

// 📦 GET ALL
export const getProductsAPI = () => API.get("/product");

// 🔍 GET SINGLE
export const getProductByIdAPI = (id) =>
  API.get(`/product/${id}`);

// ✏️ UPDATE
export const updateProductAPI = (id, data) =>
  API.put(`/product/update/${id}`, data,);

// ❌ DELETE
export const deleteProductAPI = (id) =>
  API.delete(`/product/delete/${id}`);


// ================= CATEGORY =================

// ➕ CREATE
export const createCategoryAPI = (data) =>
  API.post("/category/create", data);
// 📦 GET ALL
export const getCategoriesAPI = () => API.get("/category");

// 🔍 GET SINGLE
export const getCategoryByIdAPI = (id) =>
  API.get(`/category/${id}`);

// ✏️ UPDATE
export const updateCategoryAPI = (id, data) =>
  API.put(`/category/update/${id}`, data,);

// ❌ DELETE
export const deleteCategoryAPI = (id) =>
  API.delete(`/category/delete/${id}`);

//=================Table=======================//

export const createTableAPI = (data) =>
  API.post("/table/create", data);

export const getTablesAPI = () =>
  API.get("/table/gettables");

export const deleteTableAPI = (id) =>
  API.delete(`/table/delete/${id}`);


// 🔹 GET SETTINGS
export const getSettingsAPI = () =>
  API.get("/admin/settings");

// 🔹 UPDATE SETTINGS
export const updateSettingsAPI = (data) =>
  API.post("/admin/settings", data); // formData (title + logo)


// 🔹 GET ALL ORDERS
export const getOrdersAPI = () =>
  API.get("/order/all");

// 🔹 UPDATE STATUS
export const updateOrderStatusAPI = (id, data) =>
  API.put(`/order/status/${id}`, data);

// 🔹 GET ALL USERS
export const getAllUsersAPI = () =>
  API.get("/users");


export const updatetableApi =()=>API.put(`/table/free/${id}`)

export default API;