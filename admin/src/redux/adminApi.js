import axios from "axios";

const API = axios.create({
  baseURL: "/api/admin",
  withCredentials: true,
});

// 🔥 ADD THIS BLOCK (VERY IMPORTANT)
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ================= AUTH =================

// 🔐 Login
export const loginAdminAPI = (data) => API.post("/login", data);

// 👤 Profile
export const getAdminProfileAPI = () => API.get("/profile");

// 🚪 Logout
export const logoutAdminAPI = () => API.post("/logout");

// ================= PRODUCT =================

export const createProductAPI = (data) =>
  API.post("/product/create", data);

export const getProductsAPI = () => API.get("/product");

export const getProductByIdAPI = (id) =>
  API.get(`/product/${id}`);

export const updateProductAPI = (id, data) =>
  API.put(`/product/update/${id}`, data);

export const deleteProductAPI = (id) =>
  API.delete(`/product/delete/${id}`);

// ================= CATEGORY =================

export const createCategoryAPI = (data) =>
  API.post("/category/create", data);

export const getCategoriesAPI = () => API.get("/category");

export const getCategoryByIdAPI = (id) =>
  API.get(`/category/${id}`);

export const updateCategoryAPI = (id, data) =>
  API.put(`/category/update/${id}`, data);

export const deleteCategoryAPI = (id) =>
  API.delete(`/category/delete/${id}`);

// ================= TABLE =================

export const createTableAPI = (data) =>
  API.post("/table/create", data);

export const getTablesAPI = () =>
  API.get("/table/gettables");

export const deleteTableAPI = (id) =>
  API.delete(`/table/delete/${id}`);

export const updatetableApi = (id) =>
  API.put(`/table/free/${id}`);

// ================= SETTINGS =================

export const getSettingsAPI = () =>
  API.get("/settings/settings");

export const updateSettingsAPI = (data) =>
  API.post("/settings/settings", data);

// ================= ORDERS =================

export const getOrdersAPI = () =>
  API.get("/order/all");

export const updateOrderStatusAPI = (id, data) =>
  API.put(`/order/status/${id}`, data);

// ================= USERS =================

export const getAllUsersAPI = () =>
  API.get("/users");

export const getUsersAPI = () => API.get("/users");

export default API;