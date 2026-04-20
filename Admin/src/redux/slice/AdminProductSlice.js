// src/redux/slices/productSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    createProductAPI,
    getProductsAPI,
    getProductByIdAPI,
    updateProductAPI,
    deleteProductAPI,
} from "../adminApi"

// ➕ CREATE
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

// 📦 GET ALL
export const getProducts = createAsyncThunk(
    "product/getAll",
    async (_, { rejectWithValue }) => {
        try {
            const res = await getProductsAPI();
            return res.data.products;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message);
        }
    }
);

// 🔍 GET SINGLE
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

// ✏️ UPDATE
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

// ❌ DELETE
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

const productSlice = createSlice({
    name: "product",
    initialState: {
        products: [],
        singleProduct: null,
        loading: false,
        error: null,
    },

    reducers: {},

    extraReducers: (builder) => {
        builder

            // ➕ CREATE
            .addCase(createProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products.unshift(action.payload);
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // 📦 GET ALL
            .addCase(getProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // 🔍 GET SINGLE
            .addCase(getProductById.fulfilled, (state, action) => {
                state.singleProduct = action.payload;
            })

            // ✏️ UPDATE
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.products = state.products.map((p) =>
                    p._id === action.payload._id ? action.payload : p
                );
            })

            // ❌ DELETE
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.products = state.products.filter(
                    (p) => p._id !== action.payload
                );
            });
    },
});

export default productSlice.reducer;