import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API, {
    createTableAPI,
    deleteTableAPI,
    getTablesAPI,
} from "../adminApi";

// ➕ CREATE TABLE
export const createTable = createAsyncThunk(
    "table/create",
    async (data, { rejectWithValue }) => {
        try {
            const res = await createTableAPI(data);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message);
        }
    }
);

export const freeTableThunk = createAsyncThunk(
    "table/freeTable",
    async (tableId, { rejectWithValue }) => {
        try {
            const { data } = await API.put(`/table/free/${tableId}`);
            return data.table;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);

// 📋 GET TABLES
export const getTables = createAsyncThunk(
    "table/getAll",
    async (_, { rejectWithValue }) => {
        try {
            const res = await getTablesAPI();
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message);
        }
    }
);

// ❌ DELETE TABLE
export const deleteTable = createAsyncThunk(
    "table/delete",
    async (id, { rejectWithValue }) => {
        try {
            await deleteTableAPI(id);
            return id;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message);
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

            // ➕ CREATE TABLE
            .addCase(createTable.pending, (state) => {
                state.loading = true;
            })
            .addCase(createTable.fulfilled, (state, action) => {
                state.loading = false;
                state.tables.push(action.payload.table);
                state.count += 1;
            })
            .addCase(createTable.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // 📋 GET TABLES
            .addCase(getTables.pending, (state) => {
                state.loading = true;
            })
            .addCase(getTables.fulfilled, (state, action) => {
                state.loading = false;
                state.tables = action.payload.tables;
                state.count = action.payload.count;
            })
            .addCase(getTables.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // ❌ DELETE TABLE
            .addCase(deleteTable.fulfilled, (state, action) => {
                state.tables = state.tables.filter(
                    (table) => table._id !== action.payload
                );
                state.count -= 1;
            })
            .addCase(freeTableThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(freeTableThunk.fulfilled, (state, action) => {
                state.loading = false;

                const index = state.tables.findIndex(
                    (t) => t._id === action.payload._id
                );

                if (index !== -1) {
                    state.tables[index] = action.payload;
                }
            })
            .addCase(freeTableThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default tableSlice.reducer;