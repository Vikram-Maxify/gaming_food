// src/redux/store.js

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducer/slice/authSlice"
import productReducer from "../reducer/slice/productSlice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
  },
});