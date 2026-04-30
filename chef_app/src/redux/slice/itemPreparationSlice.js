import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../adminApi";

// =======================
// 🔹 THUNKS
// =======================

// 👨‍🍳 MARK ITEM READY
export const markItemReadyThunk = createAsyncThunk(
  "itemPreparation/markReady",
  async (data, { rejectWithValue }) => {
    try {
      const res = await API.post("/item-preparation/ready", data);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Something went wrong" }
      );
    }
  }
);

// 📦 GET ALL PREPARATIONS (ADMIN)
export const getPreparationsThunk = createAsyncThunk(
  "itemPreparation/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/item-preparation");
      return res.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Failed to fetch data" }
      );
    }
  }
);

// 👨‍🍳 GET MY PREPARATIONS (CHEF)
export const getMyPreparationsThunk = createAsyncThunk(
  "itemPreparation/getMy",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/item-preparation/getdatabyid");
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Failed to fetch my data" }
      );
    }
  }
);

// =======================
// 🔹 SLICE
// =======================

const itemPreparationSlice = createSlice({
  name: "itemPreparation",
  initialState: {
    allData: [],   // 📦 admin ke liye
    myData: [],    // 👨‍🍳 chef ke liye
    loading: false,
    error: null,
    success: false,
  },

  reducers: {
    resetState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },

  extraReducers: (builder) => {
    builder

      // =====================
      // ✅ MARK READY
      // =====================
      .addCase(markItemReadyThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(markItemReadyThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        // chef list update
        state.myData.unshift(action.payload);

        // optional: admin list bhi update
        state.allData.unshift(action.payload);
      })
      .addCase(markItemReadyThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // =====================
      // ✅ GET ALL (ADMIN)
      // =====================
      .addCase(getPreparationsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPreparationsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.allData = action.payload;
      })
      .addCase(getPreparationsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // =====================
      // ✅ GET MY (CHEF)
      // =====================
      .addCase(getMyPreparationsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMyPreparationsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.myData = action.payload;
      })
      .addCase(getMyPreparationsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      });
  },
});

export const { resetState } = itemPreparationSlice.actions;
export default itemPreparationSlice.reducer;