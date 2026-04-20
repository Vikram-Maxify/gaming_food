// src/redux/store.js

import { configureStore } from "@reduxjs/toolkit";

import adminReducer from "./slice/adminSlice";
import productReducer from "./slice/AdminProductSlice";
import categoryReducer from "./slice/categorySlice";

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    product: productReducer, 
    category: categoryReducer,
  },
});