// src/utils/axios.js

import axios from "axios";

const API = axios.create({
  baseURL: "https://devine.trueprofit.biz/", // 👈 apna backend port dal
  withCredentials: true,
});

export default API;