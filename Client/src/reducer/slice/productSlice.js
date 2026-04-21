import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "./axios";

// =================== ASYNC THUNKS ===================

// ✅ GET ALL PRODUCTS
export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get("/api/product");
      return data; // { count, products }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// ✅ GET SINGLE PRODUCT
export const fetchProductById = createAsyncThunk(
  "products/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await API.get(`/api/product/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// =================== SLICE ===================

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    product: {},
    count: 0,
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ===== GET ALL =====
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.count = action.payload.count;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ===== GET BY ID =====
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = productSlice.actions;
export default productSlice.reducer;