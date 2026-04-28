import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../adminApi"

// ===============================
// 🔹 CREATE BANNER
// ===============================
export const createBanner = createAsyncThunk(
    "banner/create",
    async (formData, { rejectWithValue }) => {
        try {
            const res = await API.post("/banner/create", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return res.data;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || "Failed to create banner"
            );
        }
    }
);

// ===============================
// 🔹 GET ALL BANNERS (ADMIN)
// ===============================
export const getBanners = createAsyncThunk(
    "banner/getAll",
    async (_, { rejectWithValue }) => {
        try {
            const res = await API.get("/banner/all");
            return res.data;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || "Failed to fetch banners"
            );
        }
    }
);

// ===============================
// 🔹 UPDATE BANNER
// ===============================
export const updateBanner = createAsyncThunk(
    "banner/update",
    async ({ id, formData }, { rejectWithValue }) => {
        try {
            const res = await API.put(`/banner/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return res.data;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || "Failed to update banner"
            );
        }
    }
);

// ===============================
// 🔹 DELETE BANNER
// ===============================
export const deleteBanner = createAsyncThunk(
    "banner/delete",
    async (id, { rejectWithValue }) => {
        try {
            await API.delete(`/api/admin/banner/${id}`);
            return id;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || "Failed to delete banner"
            );
        }
    }
);

// ===============================
// 🔥 SLICE
// ===============================
const bannerSlice = createSlice({
    name: "banner",
    initialState: {
        banners: [],
        loading: false,
        error: null,
        success: false,
    },

    reducers: {
        resetBannerState: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
        },
    },

    extraReducers: (builder) => {
        builder

            // 🔹 CREATE
            .addCase(createBanner.pending, (state) => {
                state.loading = true;
            })
            .addCase(createBanner.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.banners.unshift(action.payload);
            })
            .addCase(createBanner.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // 🔹 GET ALL
            .addCase(getBanners.pending, (state) => {
                state.loading = true;
            })
            .addCase(getBanners.fulfilled, (state, action) => {
                state.loading = false;
                state.banners = action.payload;
            })
            .addCase(getBanners.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // 🔹 UPDATE
            .addCase(updateBanner.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateBanner.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;

                const index = state.banners.findIndex(
                    (b) => b._id === action.payload._id
                );

                if (index !== -1) {
                    state.banners[index] = action.payload;
                }
            })
            .addCase(updateBanner.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // 🔹 DELETE
            .addCase(deleteBanner.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteBanner.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;

                state.banners = state.banners.filter(
                    (b) => b._id !== action.payload
                );
            })
            .addCase(deleteBanner.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { resetBannerState } = bannerSlice.actions;
export default bannerSlice.reducer;