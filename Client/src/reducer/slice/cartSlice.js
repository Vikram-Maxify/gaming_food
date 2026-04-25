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
      return res.data.cart;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

// 🗑️ CLEAR CART
export const clearCartThunk = createAsyncThunk(
  "cart/clear",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.delete("/api/cart/clear");
      return res.data.cart;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to clear cart");
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    totalAmount: 0,
    totalItems: 0,
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
      
      state.totalItems = state.cartItems.reduce(
        (acc, item) => acc + item.quantity,
        0
      );
    },

    // 🗑️ CLEAR CART LOCAL (without API)
    clearCartLocal: (state) => {
      state.cartItems = [];
      state.totalAmount = 0;
      state.totalItems = 0;
      state.loading = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // 🛒 ADD
      .addCase(addToCartThunk.fulfilled, (state, action) => {
        state.cartItems = action.payload.items;
        state.totalAmount = action.payload.totalAmount;
        state.totalItems = action.payload.items?.reduce(
          (acc, item) => acc + item.quantity,
          0
        ) || 0;
      })

      // 📦 GET
      .addCase(getCartThunk.fulfilled, (state, action) => {
        state.cartItems = action.payload.items;
        state.totalAmount = action.payload.totalAmount;
        state.totalItems = action.payload.items?.reduce(
          (acc, item) => acc + item.quantity,
          0
        ) || 0;
      })

      // ❌ REMOVE
      .addCase(removeFromCartThunk.fulfilled, (state, action) => {
        state.cartItems = action.payload.items;
        state.totalAmount = action.payload.totalAmount;
        state.totalItems = action.payload.items?.reduce(
          (acc, item) => acc + item.quantity,
          0
        ) || 0;
      })

      // 🔄 UPDATE
      .addCase(updateQuantityThunk.fulfilled, (state, action) => {
        state.cartItems = action.payload.items;
        state.totalAmount = action.payload.totalAmount;
        state.totalItems = action.payload.items?.reduce(
          (acc, item) => acc + item.quantity,
          0
        ) || 0;
      })

      // 🗑️ CLEAR CART
      .addCase(clearCartThunk.fulfilled, (state, action) => {
        state.cartItems = [];
        state.totalAmount = 0;
        state.totalItems = 0;
        state.loading = false;
        state.error = null;
      })

      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
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

export const { updateQuantityLocal, clearCartLocal } = cartSlice.actions;
export default cartSlice.reducer;