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

// 📦 GET
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

// ❌ REMOVE
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

// 🔄 UPDATE
export const updateQuantityThunk = createAsyncThunk(
  "cart/update",
  async (data, { rejectWithValue }) => {
    try {
      const res = await API.put("/api/cart/update", data);
      return res.data.cart; // ✅ full cart
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

  reducers: {
    // ⚡ OPTIMISTIC UI UPDATE
    updateQuantityLocal: (state, action) => {
      const { productId, variantId, quantity, spiceLevel } = action.payload;

      state.cartItems = state.cartItems.map((item) =>
        item.product === productId &&
        (item.variantId || item.variant) === variantId
          ? {
              ...item,
              quantity,
              spiceLevel: spiceLevel || item.spiceLevel,
            }
          : item
      );

      state.totalAmount = state.cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
    },
  },

  extraReducers: (builder) => {
    builder

      // 🛒 ADD
      .addCase(addToCartThunk.fulfilled, (state, action) => {
        state.cartItems = action.payload.items;
        state.totalAmount = action.payload.totalAmount;
      })

      // 📦 GET
      .addCase(getCartThunk.fulfilled, (state, action) => {
        state.cartItems = action.payload.items;
        state.totalAmount = action.payload.totalAmount;
      })

      // ❌ REMOVE
      .addCase(removeFromCartThunk.fulfilled, (state, action) => {
        state.cartItems = action.payload.items;
        state.totalAmount = action.payload.totalAmount;
      })

      // 🔄 UPDATE (FINAL FIX)
      .addCase(updateQuantityThunk.fulfilled, (state, action) => {
        // ✅ ALWAYS replace full cart from backend
        state.cartItems = action.payload.items;
        state.totalAmount = action.payload.totalAmount;
      })

      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
        }
      )

      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      .addMatcher(
        (action) => action.type.endsWith("/fulfilled"),
        (state) => {
          state.loading = false;
        }
      );
  },
});

export const { updateQuantityLocal } = cartSlice.actions;
export default cartSlice.reducer;