import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "./axios";

// ✅ Select Table
export const selectTable = createAsyncThunk(
  "order/selectTable",
  async (tableNumber, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/api/order/select-table", {
        tableNumber,
      });
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// ✅ Create Order (FIXED)
export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/api/order/create", orderData);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// ✅ My Orders
export const fetchMyOrders = createAsyncThunk(
  "order/myOrders",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get("/api/order/my");
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    tableNumber: null,
    orders: [],
    currentOrder: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearOrderState: (state) => {
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder

      // 🔹 SELECT TABLE
      .addCase(selectTable.pending, (state) => {
        state.loading = true;
      })
      .addCase(selectTable.fulfilled, (state, action) => {
        state.loading = false;
        state.tableNumber = action.payload.tableNumber;
      })
      .addCase(selectTable.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔹 CREATE ORDER
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.currentOrder = action.payload.order;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔹 MY ORDERS
      .addCase(fetchMyOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchMyOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearOrderState } = orderSlice.actions;
export default orderSlice.reducer;