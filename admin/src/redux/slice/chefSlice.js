import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../adminApi";

// 🔥 REGISTER
export const registerChef = createAsyncThunk(
  "chef/register",
  async (data, { rejectWithValue }) => {
    try {
      const res = await API.post("/chef/register", data); // ✅ FIX
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

// 📥 GET ALL CHEFS
export const getAllChefs = createAsyncThunk(
  "chef/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/chef/getall"); // ✅ FIXED
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const updateChef = createAsyncThunk(
  "chef/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await API.put(`/chef/${id}`, data); // 🔥 matches backend
      return res.data.chef;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

// ❌ DELETE CHEF
export const deleteChef = createAsyncThunk(
  "chef/delete",
  async (id, { rejectWithValue }) => {
    try {
      await API.delete(`/chef/delete/${id}`); // ✅ FIXED
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

const chefSlice = createSlice({
  name: "chef",
  initialState: {
    loading: false,
    chefs: [],
    chef: null,
    error: null,
    success: false,
  },

  reducers: {
    clearChefState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },

  extraReducers: (builder) => {
    builder

      // 🔹 REGISTER
      .addCase(registerChef.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerChef.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.chef = action.payload.chef;
        state.chefs.unshift(action.payload.chef); // 🔥 better UX (new on top)
      })
      .addCase(registerChef.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // 🔹 GET ALL
      .addCase(getAllChefs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllChefs.fulfilled, (state, action) => {
        state.loading = false;
        state.chefs = action.payload;
      })
      .addCase(getAllChefs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // 🔹 DELETE
      .addCase(deleteChef.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteChef.fulfilled, (state, action) => {
        state.loading = false;
        state.chefs = state.chefs.filter(
          (chef) => chef._id !== action.payload
        );
      })
      .addCase(deleteChef.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })
      // 🔹 UPDATE
      .addCase(updateChef.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateChef.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        // 🔁 update in list
        state.chefs = state.chefs.map((chef) =>
          chef._id === action.payload._id ? action.payload : chef
        );

        // 🎯 update single chef if open
        if (state.chef?._id === action.payload._id) {
          state.chef = action.payload;
        }
      })
      .addCase(updateChef.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      });
  },
});

export const { clearChefState } = chefSlice.actions;
export default chefSlice.reducer;