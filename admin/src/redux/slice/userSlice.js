// src/redux/slice/userSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllUsersAPI } from "../adminApi";

// ===============================
// 📦 GET ALL USERS
// ===============================
export const getAllUsers = createAsyncThunk(
    "users/getAll",
    async (_, { rejectWithValue }) => {
        try {
            const res = await getAllUsersAPI();
            return {
                users: res.data.users,
                count: res.data.count,
            };
        } catch (err) {
            return rejectWithValue(err.response?.data?.message);
        }
    }
);

// ===============================
// 🔥 SLICE
// ===============================
const userSlice = createSlice({
    name: "users",
    initialState: {
        users: [],
        count: 0,
        loading: false,
        error: null,
    },

    reducers: {},

    extraReducers: (builder) => {
        builder

            // 📦 GET ALL
            .addCase(getAllUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload.users;
                state.count = action.payload.count;
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default userSlice.reducer;