import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    createTable,
    deleteTable,
    getTables,
    freeTableThunk, // ✅ add this
} from "../redux/slice/adminTableSlice";

const TableManage = () => {
    const dispatch = useDispatch();

    const { tables, count, loading, error } = useSelector(
        (state) => state.table
    );

    const [tableNumber, setTableNumber] = useState("");

    // 🔥 fetch tables
    useEffect(() => {
        dispatch(getTables());
    }, [dispatch]);

    // ➕ add table
    const handleAdd = () => {
        if (!tableNumber) return alert("Enter table number");

        dispatch(createTable({ tableNumber }));
        setTableNumber("");
    };

    // ❌ delete table
    const handleDelete = (id) => {
        if (window.confirm("Delete this table?")) {
            dispatch(deleteTable(id));
        }
    };

    // ✅ FREE TABLE
    const handleFree = (id) => {
        if (window.confirm("Mark this table as free?")) {
            dispatch(freeTableThunk(id));
        }
    };

    return (
        <div className="p-6">

            <h1 className="text-2xl font-bold mb-4">
                🍽 Table Management
            </h1>

            {/* Count */}
            <p className="mb-4 text-gray-600">
                Total Tables: <strong>{count}</strong>
            </p>

            {/* Add Table */}
            <div className="flex gap-2 mb-6">
                <input
                    type="text"
                    placeholder="Enter table number"
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    className="border px-3 py-2 rounded w-40"
                />

                <button
                    onClick={handleAdd}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                    Add Table
                </button>
            </div>

            {/* Error */}
            {error && (
                <p className="text-red-500 mb-4">{error}</p>
            )}

            {/* Loading */}
            {loading ? (
                <p>Loading...</p>
            ) : (tables || []).length === 0 ? (
                <p>No tables found</p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                    {tables.map((table) => (
                        <div
                            key={table._id}
                            className="bg-white border p-4 rounded-xl shadow flex flex-col items-center"
                        >
                            <h2 className="text-lg font-semibold">
                                Table {table.tableNumber}
                            </h2>

                            <p className="text-sm mt-1">
                                {table.isOccupied ? (
                                    <span className="text-red-500">Occupied 🔴</span>
                                ) : (
                                    <span className="text-green-500">Available 🟢</span>
                                )}
                            </p>

                            {/* ✅ FREE BUTTON (only if occupied) */}
                            {table.isOccupied && (
                                <button
                                    onClick={() => handleFree(table._id)}
                                    className="mt-3 px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    Free Table
                                </button>
                            )}

                            {/* DELETE */}
                            <button
                                onClick={() => handleDelete(table._id)}
                                disabled={table.isOccupied}
                                className="mt-2 px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-300"
                            >
                                Delete
                            </button>
                        </div>
                    ))}

                </div>
            )}
        </div>
    );
};

export default TableManage;