// src/redux/slices/productSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    createProductAPI,
    getProductsAPI,
    getProductByIdAPI,
    updateProductAPI,
    deleteProductAPI,
} from "../adminApi";

// ===============================
// ➕ CREATE PRODUCT
// ===============================
export const createProduct = createAsyncThunk(
    "product/create",
    async (data, { rejectWithValue }) => {
        try {
            const res = await createProductAPI(data);
            return res.data.product;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message);
        }
    }
);

// ===============================
// 📦 GET ALL PRODUCTS
// ===============================
export const getProducts = createAsyncThunk(
    "product/getAll",
    async (_, { rejectWithValue }) => {
        try {
            const res = await getProductsAPI();
            return {
                products: res.data.products,
                count: res.data.count,
            };
        } catch (err) {
            return rejectWithValue(err.response?.data?.message);
        }
    }
);

// ===============================
// 🔍 GET SINGLE PRODUCT
// ===============================
export const getProductById = createAsyncThunk(
    "product/getById",
    async (id, { rejectWithValue }) => {
        try {
            const res = await getProductByIdAPI(id);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message);
        }
    }
);

// ===============================
// ✏️ UPDATE PRODUCT
// ===============================
export const updateProduct = createAsyncThunk(
    "product/update",
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const res = await updateProductAPI(id, data);
            return res.data.product;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message);
        }
    }
);

// ===============================
// ❌ DELETE PRODUCT
// ===============================
export const deleteProduct = createAsyncThunk(
    "product/delete",
    async (id, { rejectWithValue }) => {
        try {
            await deleteProductAPI(id);
            return id;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message);
        }
    }
);

// ===============================
// 🔥 SLICE
// ===============================
const productSlice = createSlice({
    name: "product",
    initialState: {
        products: [],
        singleProduct: null,
        count: 0, // 🔥 added
        loading: false,
        error: null,
    },

    reducers: {
        clearProductState: (state) => {
            state.loading = false;
            state.error = null;
        },
    },

    extraReducers: (builder) => {
        builder

            // ===============================
            // ➕ CREATE
            // ===============================
            .addCase(createProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products.unshift(action.payload);
                state.count += 1;
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // ===============================
            // 📦 GET ALL
            // ===============================
            .addCase(getProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.products;
                state.count = action.payload.count;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // ===============================
            // 🔍 GET SINGLE
            // ===============================
            .addCase(getProductById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getProductById.fulfilled, (state, action) => {
                state.loading = false;
                state.singleProduct = action.payload;
            })
            .addCase(getProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // ===============================
            // ✏️ UPDATE
            // ===============================
            .addCase(updateProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.loading = false;

                // update list
                state.products = state.products.map((p) =>
                    p._id === action.payload._id ? action.payload : p
                );

                // update single if open
                if (state.singleProduct?._id === action.payload._id) {
                    state.singleProduct = action.payload;
                }
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // ===============================
            // ❌ DELETE
            // ===============================
            .addCase(deleteProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.loading = false;

                state.products = state.products.filter(
                    (p) => p._id !== action.payload
                );

                state.count -= 1;
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearProductState } = productSlice.actions;
export default productSlice.reducer;