import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    getProductsAPI,
    getProductByIdAPI,
} from "../../../../Admin/src/redux/adminApi";

// 📦 GET ALL PRODUCTS
export const getProducts = createAsyncThunk(
    "product/getAll",
    async (_, { rejectWithValue }) => {
        try {
            const res = await getProductsAPI();
            return res.data; // { count, products }
        } catch (err) {
            return rejectWithValue(err.response?.data?.message);
        }
    }
);

// 🔍 GET SINGLE PRODUCT
export const getProductById = createAsyncThunk(
    "product/getById",
    async (id, { rejectWithValue }) => {
        try {
            const res = await getProductByIdAPI(id);
            return res.data; // single product
        } catch (err) {
            return rejectWithValue(err.response?.data?.message);
        }
    }
);

const productSlice = createSlice({
    name: "product",
    initialState: {
        products: [],
        count: 0,
        singleProduct: null,
        loading: false,
        error: null,
    },

    reducers: {},

    extraReducers: (builder) => {
        builder

            // 📦 GET ALL
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

            // 🔍 GET SINGLE
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
            });
    },
});

export default productSlice.reducer;