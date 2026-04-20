// src/redux/store.js

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducer/slice/authSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});