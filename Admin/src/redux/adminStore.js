// src/redux/store.js

import { configureStore } from "@reduxjs/toolkit";

import adminReducer from "./slice/adminSlice";
import productReducer from "./slice/AdminProductSlice";

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    product: productReducer, // ✅ add kar diya
  },
});