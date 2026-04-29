import { configureStore } from "@reduxjs/toolkit";
import chefReducer from "./slice/chefAuthSlice";
import orderReducer from "./slice/adminOrderSlice";

export const store = configureStore({
  reducer: {
    chef: chefReducer,
    order: orderReducer,
  

  },
});