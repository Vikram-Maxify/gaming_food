import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    createTable,
    deleteTable,
    getTables,
} from "../redux/slices/tableSlice";

const TablePage = () => {
    const dispatch = useDispatch();

    const { tables, count, loading } = useSelector(
        (state) => state.table
    );

    const [tableNumber, setTableNumber] = useState("");

    // 📥 load tables
    useEffect(() => {
        dispatch(getTables());
    }, [dispatch]);

    // ➕ add table
    const handleAdd = () => {
        if (!tableNumber) return;

        dispatch(createTable({ tableNumber }));
        setTableNumber("");
    };

    // ❌ delete table
    const handleDelete = (id) => {
        if (window.confirm("Delete this table?")) {
            dispatch(deleteTable(id));
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>🍽 Table Management</h1>

            {/* Count */}
            <h3>Total Tables: {count}</h3>

            {/* Add Table */}
            <div style={{ marginBottom: "20px" }}>
                <input
                    type="number"
                    placeholder="Enter table number"
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                />
                <button onClick={handleAdd}>Add Table</button>
            </div>

            {/* Table List */}
            {loading ? (
                <p>Loading...</p>
            ) : (
                <table border="1" cellPadding="10">
                    <thead>
                        <tr>
                            <th>Table No</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {tables.map((t) => (
                            <tr key={t._id}>
                                <td>{t.tableNumber}</td>
                                <td>
                                    {t.isOccupied ? "Occupied 🔴" : "Available 🟢"}
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleDelete(t._id)}
                                        disabled={t.isOccupied}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default TablePage;