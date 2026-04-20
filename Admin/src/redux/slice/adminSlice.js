import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    loginAdminAPI,
    getAdminProfileAPI,
    logoutAdminAPI,
} from "../adminApi";

// 🔐 LOGIN
export const loginAdmin = createAsyncThunk(
    "admin/login",
    async (data, { rejectWithValue }) => {
        try {
            const res = await loginAdminAPI(data);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message);
        }
    }
);

// 👤 PROFILE
export const getAdminProfile = createAsyncThunk(
    "admin/profile",
    async (_, { rejectWithValue }) => {
        try {
            const res = await getAdminProfileAPI();
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message);
        }
    }
);

// 🚪 LOGOUT
export const logoutAdmin = createAsyncThunk(
    "admin/logout",
    async (_, { rejectWithValue }) => {
        try {
            const res = await logoutAdminAPI();
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message);
        }
    }
);

const adminSlice = createSlice({
    name: "admin",
    initialState: {
        admin: null,
        loading: false,
        error: null,
        isAuthenticated: false,
        checked: false,
    },

    reducers: {},

    extraReducers: (builder) => {
        builder

            // 🔐 LOGIN
            .addCase(loginAdmin.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginAdmin.fulfilled, (state, action) => {
                state.loading = false;
                state.admin = action.payload?.admin || null;
                state.isAuthenticated = true;
                state.checked = true;
            })
            .addCase(loginAdmin.rejected, (state) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.checked = true;
            })

            // 👤 PROFILE (refresh case)
            .addCase(getAdminProfile.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAdminProfile.fulfilled, (state, action) => {
                state.loading = false;

                const data = action.payload;

                if (!data) {
                    state.admin = null;
                    state.isAuthenticated = false;
                } else {
                    state.admin = data.admin || data;
                    state.isAuthenticated = true;
                }

                state.checked = true;
            })
            .addCase(getAdminProfile.rejected, (state) => {
                state.loading = false;
                state.admin = null;
                state.isAuthenticated = false;
                state.checked = true; // 🔥 VERY IMPORTANT
            })

            // 🚪 LOGOUT
            .addCase(logoutAdmin.fulfilled, (state) => {
                state.admin = null;
                state.isAuthenticated = false;
                state.checked = true;
            });
    },
});

export default adminSlice.reducer;