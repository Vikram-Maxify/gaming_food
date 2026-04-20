import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5002/api/admin", // apna backend URL
  withCredentials: true,
});

// 🔐 Login
export const loginAdminAPI = (data) => API.post("/login", data);

// 👤 Profile
export const getAdminProfileAPI = () => API.get("/profile");

// 🚪 Logout
export const logoutAdminAPI = () => API.post("/logout");

export default API;