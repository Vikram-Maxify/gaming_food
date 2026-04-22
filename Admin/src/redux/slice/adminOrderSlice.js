import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getOrdersAPI,
  updateOrderStatusAPI,
} from "../adminApi";

// ===============================
// 🔹 GET ALL ORDERS
// ===============================
export const getOrders = createAsyncThunk(
  "order/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getOrdersAPI();
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch orders"
      );
    }
  }
);

// ===============================
// 🔹 UPDATE ORDER STATUS
// ===============================
export const updateOrderStatus = createAsyncThunk(
  "order/updateStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const res = await updateOrderStatusAPI(id, { status });
      return res.data.order;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Status update failed"
      );
    }
  }
);

// ===============================
// 🔥 SLICE
// ===============================
const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },

  // 🔥 ADD THESE (IMPORTANT)
  reducers: {
    // 🆕 New order from socket
    addOrder: (state, action) => {
      state.orders.unshift(action.payload);
    },

    // 🔄 Update order from socket
    updateOrderInState: (state, action) => {
      state.orders = state.orders.map((order) =>
        order._id === action.payload._id
          ? action.payload
          : order
      );
    },
  },

  extraReducers: (builder) => {
    builder

      // 🔹 GET ORDERS
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔹 UPDATE STATUS (API response)
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.orders = state.orders.map((order) =>
          order._id === action.payload._id
            ? action.payload
            : order
        );
      });
  },
});

// ✅ EXPORT ACTIONS (VERY IMPORTANT)
export const { addOrder, updateOrderInState } = orderSlice.actions;

export default orderSlice.reducer;