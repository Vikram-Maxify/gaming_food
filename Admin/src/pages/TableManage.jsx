import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    createTable,
    deleteTable,
    getTables,
    freeTableThunk,
} from "../redux/slice/adminTableSlice";
import { MdOutlineEventAvailable } from "react-icons/md";
import { CgUnavailable } from "react-icons/cg";

const TableManage = () => {
    const dispatch = useDispatch();

    const { tables, count, loading, error } = useSelector(
        (state) => state.table
    );

    const [tableNumber, setTableNumber] = useState("");

    useEffect(() => {
        dispatch(getTables());
    }, [dispatch]);

    const handleAdd = () => {
        if (!tableNumber) return alert("Enter table number");

        dispatch(createTable({ tableNumber }));
        setTableNumber("");
    };

    const handleDelete = (id) => {
        if (window.confirm("Delete this table?")) {
            dispatch(deleteTable(id));
        }
    };

    const handleFree = (id) => {
        if (window.confirm("Mark this table as free?")) {
            dispatch(freeTableThunk(id));
        }
    };

    return (
        <div className="p-6">

            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-semibold text-textPrimary">
                    🍽 Table Management
                </h1>
                <p className="text-sm text-textSecondary mt-1">
                    Manage restaurant tables and availability
                </p>
            </div>

            {/* Count */}
            <div className="mb-6 text-textSecondary">
                Total Tables:{" "}
                <span className="text-textPrimary font-semibold">{count}</span>
            </div>

            {/* Add Table */}
            <div className="flex gap-3 mb-8">

                <input
                    type="text"
                    placeholder="Enter table number"
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    className="px-3 py-2 bg-[#1A1A1A] border border-borderSubtle rounded-xl2 text-textPrimary outline-none focus:shadow-glow w-48"
                />

                <button
                    onClick={handleAdd}
                    className="bg-primaryGradient text-white px-5 py-2 rounded-xl2 shadow-glow hover:shadow-glowHover transition"
                >
                    Add Table
                </button>

            </div>

            {/* Error */}
            {error && (
                <p className="text-danger mb-4">{error}</p>
            )}

            {/* Loading */}
            {loading ? (
                <p className="text-textSecondary">Loading...</p>
            ) : (tables || []).length === 0 ? (
                <p className="text-textSecondary">No tables found</p>
            ) : (

                <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

                    {tables.map((table) => (
                        <div
                            key={table._id}
                            className="bg-cardGradient border border-borderSubtle p-5 rounded-xl2 shadow-soft hover:shadow-glowHover transition flex flex-col items-center"
                        >

                            {/* Table Number */}
                            <h2 className="text-lg font-semibold text-textPrimary">
                                Table {table.tableNumber}
                            </h2>

                            {/* Status */}
                            <p className="text-sm mt-2">
                                {table.isOccupied ? (
                                    <span className="text-danger font-medium flex gap-3 items-center">
                                        Occupied <CgUnavailable className="text-xl"/>
                                    </span>
                                ) : (
                                    <span className="text-success font-medium flex gap-3 items-center">
                                        Available <MdOutlineEventAvailable className="text-xl"/>
                                    </span>
                                )}
                            </p>

                            {/* Actions */}
                            <div className="flex flex-col gap-2 mt-4 w-full">

                                {table.isOccupied && (
                                    <button
                                        onClick={() => handleFree(table._id)}
                                        className="w-full py-1.5 text-sm rounded-lg bg-[#1A1A1A] border border-borderSubtle text-primary hover:shadow-glow transition"
                                    >
                                        Free Table
                                    </button>
                                )}

                                <button
                                    onClick={() => handleDelete(table._id)}
                                    disabled={table.isOccupied}
                                    className="w-full py-1.5 text-sm rounded-lg bg-[#1A1A1A] border border-borderSubtle text-danger hover:shadow-glow transition disabled:opacity-40"
                                >
                                    Delete
                                </button>

                            </div>

                        </div>
                    ))}

                </div>
            )}
        </div>
    );
};

export default TableManage;