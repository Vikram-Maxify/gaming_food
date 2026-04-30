import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../axios";


// =======================
// 🔹 THUNKS
// =======================

// 👨‍🍳 MARK ITEM READY
export const markItemReadyThunk = createAsyncThunk(
  "itemPreparation/markReady",
  async (data, { rejectWithValue }) => {
    try {
      const res = await API.post("/api/item-preparation/ready", data);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Something went wrong" }
      );
    }
  }
);

// 📦 GET ALL PREPARATIONS
export const getPreparationsThunk = createAsyncThunk(
  "itemPreparation/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/api/item-preparation");
      return res.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Failed to fetch data" }
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
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},

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

        // new record top pe add hoga
        state.data.unshift(action.payload);
      })
      .addCase(markItemReadyThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })


      // =====================
      // ✅ GET ALL
      // =====================
      .addCase(getPreparationsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPreparationsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getPreparationsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      });
  },
});

export default itemPreparationSlice.reducer;