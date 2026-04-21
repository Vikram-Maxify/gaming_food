// src/pages/admin/Category.jsx

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getCategories,
    createCategory,
    deleteCategory,
    updateCategory,
} from "../redux/slice/categorySlice"

const Category = () => {
    const dispatch = useDispatch();
    const { categories, loading } = useSelector((state) => state.category);

    const [name, setName] = useState("");
    const [image, setImage] = useState(null);

    const [editId, setEditId] = useState(null);

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    // ➕ ADD / UPDATE
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name) return alert("Name required");

        const data = new FormData();
        data.append("name", name);

        if (image) {
            data.append("image", image);
        }

        if (editId) {
            dispatch(updateCategory({ id: editId, data }));
            setEditId(null);
        } else {
            dispatch(createCategory(data));
        }

        setName("");
        setImage(null);
    };

    // ✏️ EDIT
    const handleEdit = (cat) => {
        setName(cat.name);
        setEditId(cat._id);
    };

    // ❌ DELETE
    const handleDelete = (id) => {
        dispatch(deleteCategory(id));
    };

    return (
        <div className="p-4">

            {/* Heading */}
            <h2 className="text-xl font-semibold mb-4">
                📂 Category Management
            </h2>

            {/* ➕ FORM */}
            <form
                onSubmit={handleSubmit}
                className="bg-white p-4 rounded-xl shadow mb-6 flex flex-col gap-3"
            >
                <input
                    type="text"
                    placeholder="Category Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="p-2 border rounded"
                />

                <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                />

                <button className="bg-blue-500 text-white p-2 rounded">
                    {editId ? "Update Category" : "Add Category"}
                </button>
            </form>

            {/* 📊 STATS */}
            <div className="mb-4">
                Total Categories: <b>{categories.length}</b>
            </div>

            {/* 📦 TABLE */}
            <div className="bg-white rounded-xl shadow overflow-hidden">

                {/* Header */}
                <div className="grid grid-cols-4 bg-gray-100 p-3 text-sm font-semibold">
                    <span>Image</span>
                    <span>Name</span>
                    <span>Date</span>
                    <span>Action</span>
                </div>

                {/* Rows */}
                {loading ? (
                    <p className="p-4">Loading...</p>
                ) : categories.length === 0 ? (
                    <p className="p-4">No categories found</p>
                ) : (
                    categories.map((cat) => (
                        <div
                            key={cat._id}
                            className="grid grid-cols-4 p-3 border-t items-center text-sm"
                        >
                            {/* Image */}
                            <img
                                src={cat.image}
                                alt={cat.name}
                                className="w-12 h-12 object-cover rounded"
                            />

                            {/* Name */}
                            <span>{cat.name}</span>

                            {/* Date */}
                            <span>
                                {new Date(cat.createdAt).toLocaleDateString()}
                            </span>

                            {/* Actions */}
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEdit(cat)}
                                    className="px-2 py-1 bg-gray-200 rounded"
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() => handleDelete(cat._id)}
                                    className="px-2 py-1 bg-red-200 text-red-600 rounded"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Category;