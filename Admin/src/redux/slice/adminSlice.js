import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    loginAdminAPI,
    getAdminProfileAPI,
    logoutAdminAPI,
    getUsersAPI, // ✅ ADD THIS
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

// 👥 GET USERS (NEW)
export const getUsers = createAsyncThunk(
    "admin/getUsers",
    async (_, { rejectWithValue }) => {
        try {
            const res = await getUsersAPI();
            return res.data; // 👈 direct array aa raha hai backend se
        } catch (err) {
            return rejectWithValue(err.response?.data?.message);
        }
    }
);

const adminSlice = createSlice({
    name: "admin",
    initialState: {
        admin: null,
        users: [], // ✅ NEW
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
                state.error = null;
            })
            .addCase(loginAdmin.fulfilled, (state, action) => {
                state.loading = false;
                state.admin = action.payload?.admin || null;
                state.isAuthenticated = true;
                state.checked = true;
            })
            .addCase(loginAdmin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isAuthenticated = false;
                state.checked = true;
            })

            // 👤 PROFILE
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
                state.checked = true;
            })

            // 👥 GET USERS
            .addCase(getUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload; // 👈 users store ho rahe hain
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // 🚪 LOGOUT
            .addCase(logoutAdmin.fulfilled, (state) => {
                state.admin = null;
                state.users = []; // ✅ clear users also
                state.isAuthenticated = false;
                state.checked = true;
            });
    },
});

export default adminSlice.reducer;