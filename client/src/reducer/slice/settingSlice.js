import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "./axios";

// ===============================
// 🔹 GET SETTINGS
// ===============================
export const getSettings = createAsyncThunk(
    "settings/get",
    async (_, { rejectWithValue }) => {
        try {
            const res = await API.get("/api/admin/settings/settings");
            return res.data;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || "Failed to fetch settings"
            );
        }
    }
);



// ===============================
// 🔥 SLICE
// ===============================
const settingsSlice = createSlice({
    name: "settings",
    initialState: {
        settings: null,
        loading: false,
        error: null,
        success: false,
    },

    reducers: {
        resetSettingsState: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
        },
    },

    extraReducers: (builder) => {
        builder

            // 🔹 GET SETTINGS
            .addCase(getSettings.pending, (state) => {
                state.loading = true;
            })
            .addCase(getSettings.fulfilled, (state, action) => {
                state.loading = false;
                state.settings = action.payload;
            })
            .addCase(getSettings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export const { resetSettingsState } = settingsSlice.actions;
export default settingsSlice.reducer;