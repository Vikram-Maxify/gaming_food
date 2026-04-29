import { configureStore } from "@reduxjs/toolkit";
import chefReducer from "./slice/chefAuthSlice";

export const store = configureStore({
  reducer: {
    chef: chefReducer,
  },
});