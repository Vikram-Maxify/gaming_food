// src/redux/slices/authSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../slice/axios";

// ===============================
// 🔹 HELPERS (LOCAL STORAGE)
// ===============================
const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user")) || null;
  } catch {
    return null;
  }
};

const getStoredToken = () => {
  return localStorage.getItem("token") || null;
};

// ===============================
// 🔹 REGISTER (Send OTP)
// ===============================
export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      const res = await API.post("/api/auth/register", userData);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Register failed"
      );
    }
  }
);

// ===============================
// 🔹 VERIFY OTP
// ===============================
export const verifyOTP = createAsyncThunk(
  "auth/verifyOTP",
  async (data, thunkAPI) => {
    try {
      const res = await API.post("/api/auth/verify-otp", data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "OTP verification failed"
      );
    }
  }
);

// ===============================
// 🔹 LOGIN
// ===============================
export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      const res = await API.post("/api/auth/login", userData);
      return res.data; // { token }
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

// ===============================
// 🔹 GET USER
// ===============================
export const getUser = createAsyncThunk(
  "auth/getUser",
  async (_, thunkAPI) => {
    try {
      const res = await API.get("/api/auth/user");
      return res.data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Fetch user failed"
      );
    }
  }
);

// ===============================
// 🔹 LOGOUT
// ===============================
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      await API.get("/api/auth/logout");
      return true;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Logout failed"
      );
    }
  }
);

// ===============================
// 🔥 INITIAL STATE (PERSISTED)
// ===============================
const initialState = {
  user: getStoredUser(),
  token: getStoredToken(),

  tempUserId: null,
  otpSent: false,

  loading: false,
  error: null,
  success: false,
};

// ===============================
// 🔥 SLICE
// ===============================
const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    resetState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },

    clearAuth: (state) => {
      state.user = null;
      state.token = null;
      state.tempUserId = null;
      state.otpSent = false;

      // ✅ clear storage
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },

  extraReducers: (builder) => {
    builder

      // ===============================
      // REGISTER
      // ===============================
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.otpSent = true;
        state.tempUserId = action.payload.tempUserId;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ===============================
      // VERIFY OTP
      // ===============================
      .addCase(verifyOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        state.user = action.payload.user;
        state.otpSent = false;
        state.tempUserId = null;

        // ✅ SAVE USER
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ===============================
      // LOGIN
      // ===============================
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.success = true;

        // ✅ SAVE TOKEN
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ===============================
      // GET USER
      // ===============================
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;

        // ✅ SAVE USER
        localStorage.setItem("user", JSON.stringify(action.payload));
      })

      // ===============================
      // LOGOUT
      // ===============================
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.success = false;

        // ✅ CLEAR STORAGE
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      });
  },
});

export const { resetState, clearAuth } = authSlice.actions;
export default authSlice.reducer;