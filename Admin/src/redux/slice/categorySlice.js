// src/redux/slices/categorySlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    getCategoriesAPI,
    getCategoryByIdAPI,
    createCategoryAPI,
    updateCategoryAPI,
    deleteCategoryAPI,
} from "../adminApi";


// ➕ CREATE CATEGORY
export const createCategory = createAsyncThunk(
    "category/create",
    async (data, { rejectWithValue }) => {
        for (let pair of data.entries()) {
            console.log(pair);
        }
        try {
            const res = await createCategoryAPI(data);
            return res.data.category;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message);
        }
    }
);


// 📦 GET ALL
export const getCategories = createAsyncThunk(
    "category/getAll",
    async (_, { rejectWithValue }) => {
        try {
            const res = await getCategoriesAPI();
            return res.data.categories;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message);
        }
    }
);


// 🔍 GET SINGLE
export const getCategoryById = createAsyncThunk(
    "category/getById",
    async (id, { rejectWithValue }) => {
        try {
            const res = await getCategoryByIdAPI(id);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message);
        }
    }
);


// ✏️ UPDATE
export const updateCategory = createAsyncThunk(
    "category/update",
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const res = await updateCategoryAPI(id, data);
            return res.data.category;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message);
        }
    }
);


// ❌ DELETE
export const deleteCategory = createAsyncThunk(
    "category/delete",
    async (id, { rejectWithValue }) => {
        try {
            await deleteCategoryAPI(id);
            return id;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message);
        }
    }
);


const categorySlice = createSlice({
    name: "category",
    initialState: {
        categories: [],
        singleCategory: null,
        loading: false,
        error: null,
    },

    reducers: {},

    extraReducers: (builder) => {
        builder

            // ➕ CREATE
            .addCase(createCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.categories.unshift(action.payload);
            })
            .addCase(createCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // 📦 GET ALL
            .addCase(getCategories.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase(getCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // 🔍 GET SINGLE
            .addCase(getCategoryById.fulfilled, (state, action) => {
                state.singleCategory = action.payload;
            })

            // ✏️ UPDATE
            .addCase(updateCategory.fulfilled, (state, action) => {
                state.categories = state.categories.map((cat) =>
                    cat._id === action.payload._id ? action.payload : cat
                );
            })

            // ❌ DELETE
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.categories = state.categories.filter(
                    (cat) => cat._id !== action.payload
                );
            });
    },
});

export default categorySlice.reducer;