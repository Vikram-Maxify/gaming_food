import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../slice/axios" // ✅ your file

// 🔹 GET ALL
export const getCategories = createAsyncThunk(
    "category/getAll",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await API.get("/api/category"); // ✅ important
            return data.categories;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

// 🔹 GET SINGLE
export const getCategoryById = createAsyncThunk(
    "category/getOne",
    async (id, { rejectWithValue }) => {
        try {
            const { data } = await API.get(`/api/category/${id}`); // ✅ fix
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

// 🔥 SLICE
const categorySlice = createSlice({
    name: "category",
    initialState: {
        categories: [],
        category: null,
        loading: false,
        error: null,
    },

    reducers: {},

    extraReducers: (builder) => {
        builder

            // ✅ GET ALL
            .addCase(getCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase(getCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // ✅ GET ONE
            .addCase(getCategoryById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCategoryById.fulfilled, (state, action) => {
                state.loading = false;
                state.category = action.payload;
            })
            .addCase(getCategoryById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default categorySlice.reducer;