import { configureStore } from "@reduxjs/toolkit";
import chefReducer from "./slice/chefAuthSlice";
import orderReducer from "./slice/adminOrderSlice";
import itemPreparationReducer from "./slice/itemPreparationSlice";

export const store = configureStore({
  reducer: {
    chef: chefReducer,
    order: orderReducer,
    itemPreparation: itemPreparationReducer,



  },
});