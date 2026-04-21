import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "./axios";

// 📦 GET TABLES
export const getTablesThunk = createAsyncThunk(
  "table/getTables",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/api/table/get-usertables"); // 👈 backend route
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch tables"
      );
    }
  }
);

const tableSlice = createSlice({
  name: "table",
  initialState: {
    tables: [],
    count: 0,
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // ⏳ LOADING
      .addCase(getTablesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // ✅ SUCCESS
      .addCase(getTablesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.tables = action.payload.tables;
        state.count = action.payload.count;
      })

      // ❌ ERROR
      .addCase(getTablesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default tableSlice.reducer;