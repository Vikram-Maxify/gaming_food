// src/redux/store.js

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducer/slice/authSlice"
import productReducer from "../reducer/slice/productSlice"
import orderReducer from "../reducer/slice/orderSlice"
import cartReducer from "../reducer/slice/cartSlice"
import tableReducer from "../reducer/slice/tableSlice"




export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    order: orderReducer,
    cart: cartReducer,
    table: tableReducer,




  },
});