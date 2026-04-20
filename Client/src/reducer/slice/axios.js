// src/utils/axios.js

import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5002", // 👈 apna backend port dal
  withCredentials: true,
});

export default API;