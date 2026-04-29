import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 🔐 LOGIN API
export const chefLogin = createAsyncThunk(
  "chef/login",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/chef/login",
        data,
        { withCredentials: true }
      );

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

// 👨‍🍳 PROFILE API
export const chefProfile = createAsyncThunk(
  "chef/profile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/chef/profile",
        { withCredentials: true }
      );

      return res.data.chef;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

// 🚪 LOGOUT API
export const chefLogout = createAsyncThunk(
  "chef/logout",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/chef/logout",
        {},
        { withCredentials: true }
      );

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

const chefSlice = createSlice({
  name: "chef",
  initialState: {
    chef: null,
    loading: false,
    error: null,
    isAuthenticated: false
  },
  reducers: {},

  extraReducers: (builder) => {
    builder

      // LOGIN
      .addCase(chefLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(chefLogin.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(chefLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // PROFILE
      .addCase(chefProfile.fulfilled, (state, action) => {
        state.chef = action.payload;
        state.isAuthenticated = true;
      })

      // LOGOUT
      .addCase(chefLogout.fulfilled, (state) => {
        state.chef = null;
        state.isAuthenticated = false;
      });
  },
});

export default chefSlice.reducer;