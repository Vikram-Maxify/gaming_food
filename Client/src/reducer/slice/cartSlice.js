import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "./axios";

// 🛒 ADD
export const addToCartThunk = createAsyncThunk(
  "cart/add",
  async (data, { rejectWithValue }) => {
    try {
      const res = await API.post("/api/cart/add", data);
      return res.data.cart;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

// 📦 GET CART
export const getCartThunk = createAsyncThunk(
  "cart/get",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/api/cart");
      return res.data.cart;
    } catch (err) {
      return rejectWithValue("Failed to load cart");
    }
  }
);

// ❌ REMOVE ITEM
export const removeFromCartThunk = createAsyncThunk(
  "cart/remove",
  async (data, { rejectWithValue }) => {
    try {
      const res = await API.post("/api/cart/remove", data);
      return res.data.cart;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

// 🔄 UPDATE QUANTITY
export const updateQuantityThunk = createAsyncThunk(
  "cart/update",
  async (data, { rejectWithValue }) => {
    try {
      const res = await API.put("/api/cart/update", data);
      return res.data.cart;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    totalAmount: 0,
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder

      // 🛒 ADD
      .addCase(addToCartThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCartThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload.items;
        state.totalAmount = action.payload.totalAmount;
      })
      .addCase(addToCartThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 📦 GET
      .addCase(getCartThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCartThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload.items;
        state.totalAmount = action.payload.totalAmount;
      })
      .addCase(getCartThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ❌ REMOVE
      .addCase(removeFromCartThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeFromCartThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload.items;
        state.totalAmount = action.payload.totalAmount;
      })
      .addCase(removeFromCartThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔄 UPDATE
      .addCase(updateQuantityThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateQuantityThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload.items;
        state.totalAmount = action.payload.totalAmount;
      })
      .addCase(updateQuantityThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default cartSlice.reducer;