// src/redux/store.js

import { configureStore } from "@reduxjs/toolkit";

import adminReducer from "./slice/adminSlice";
import productReducer from "./slice/AdminProductSlice";
import categoryReducer from "./slice/categorySlice";
import tableReducer from "./slice/adminTableSlice";
import settingsReducer from "./slice/settingsSlice";
import orderReducer from "./slice/adminOrderSlice";
import bannerReducer from "./slice/bannerSlice";

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    product: productReducer, 
    category: categoryReducer,
    table: tableReducer,
     settings: settingsReducer,
      order: orderReducer,
      banner: bannerReducer,
  
  },
});