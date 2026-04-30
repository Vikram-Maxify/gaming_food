import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../adminApi"; // 👈 baseURL = /api/admin

// 🔹 CREATE PROMO
export const createPromo = createAsyncThunk(
    "promo/create",
    async (formData, { rejectWithValue }) => {
        try {
            const { data } = await API.post("/promo/create", formData);
            return data.promo;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

// 🔹 GET ALL PROMOS
export const getAllPromos = createAsyncThunk(
    "promo/getAll",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await API.get("/promo");
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

// 🔹 DELETE PROMO
export const deletePromo = createAsyncThunk(
    "promo/delete",
    async (id, { rejectWithValue }) => {
        try {
            await API.delete(`/promo/${id}`);
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

// 🔥 SLICE
const promoSlice = createSlice({
    name: "promo",
    initialState: {
        promos: [],
        loading: false,
        error: null,
    },

    reducers: {},

    extraReducers: (builder) => {
        builder

            // ✅ CREATE
            .addCase(createPromo.pending, (state) => {
                state.loading = true;
            })
            .addCase(createPromo.fulfilled, (state, action) => {
                state.loading = false;
                state.promos.unshift(action.payload); // new promo top pe
            })
            .addCase(createPromo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // ✅ GET ALL
            .addCase(getAllPromos.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllPromos.fulfilled, (state, action) => {
                state.loading = false;
                state.promos = action.payload;
            })
            .addCase(getAllPromos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // ✅ DELETE
            .addCase(deletePromo.fulfilled, (state, action) => {
                state.promos = state.promos.filter(
                    (promo) => promo._id !== action.payload
                );
            });
    },
});

export default promoSlice.reducer;