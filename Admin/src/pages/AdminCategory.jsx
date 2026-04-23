import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getCategories,
    createCategory,
    deleteCategory,
    updateCategory,
} from "../redux/slice/categorySlice";
import { getProducts } from "../redux/slice/AdminProductSlice";
import { ImBin } from "react-icons/im";
import { FaRegEdit } from "react-icons/fa";

const Category = () => {
    const dispatch = useDispatch();
    const { categories, loading } = useSelector((state) => state.category);
    const { products } = useSelector((state) => state.product);

    const [name, setName] = useState("");
    const [image, setImage] = useState(null);
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        dispatch(getCategories());
        dispatch(getProducts());
    }, [dispatch]);

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

    const handleEdit = (cat) => {
        setName(cat.name);
        setEditId(cat._id);
    };

    const handleDelete = (id) => {
        dispatch(deleteCategory(id));
    };

    const getProductCount = (categoryId) => {
        return products.filter(
            (p) => p.category?._id === categoryId || p.category === categoryId
        ).length;
    };

    return (
        <div className="p-6">

            {/* Heading */}
            <h2 className="text-xl font-semibold mb-6 text-textPrimary">
                📂 Category Management
            </h2>

            {/* ➕ FORM */}
            <form
                onSubmit={handleSubmit}
                className="bg-cardGradient border border-borderSubtle p-5 rounded-xl2 shadow-soft mb-6 flex flex-col gap-3"
            >
                <input
                    type="text"
                    placeholder="Category Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="p-2 bg-[#1A1A1A] border border-borderSubtle rounded-lg text-textPrimary outline-none focus:shadow-glow"
                />

                <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="text-textSecondary"
                />

                <button className="bg-primaryGradient text-white p-2 rounded-xl2 shadow-glow hover:shadow-glowHover transition">
                    {editId ? "Update Category" : "Add Category"}
                </button>
            </form>

            {/* 📊 STATS */}
            <div className="mb-6 text-textSecondary">
                Total Categories:{" "}
                <b className="text-textPrimary">{categories.length}</b>
            </div>

            {/* 📦 TABLE */}
            <div className="bg-cardGradient border border-borderSubtle rounded-xl2 shadow-soft overflow-hidden">

                {/* Header */}
                <div className="grid grid-cols-5 px-4 py-3 text-xs font-medium text-textSecondary border-b border-borderSubtle">
                    <span>Image</span>
                    <span>Name</span>
                    <span>Products</span>
                    <span>Date</span>
                    <span>Action</span>
                </div>

                {/* Rows */}
                {loading ? (
                    <p className="p-4 text-textSecondary">Loading...</p>
                ) : categories.length === 0 ? (
                    <p className="p-4 text-textSecondary">No categories found</p>
                ) : (
                    categories.map((cat) => (
                        <div
                            key={cat._id}
                            className="grid grid-cols-5 px-4 py-3 items-center text-sm border-b border-borderSubtle hover:bg-[#1A1A1A] transition"
                        >
                            {/* Image */}
                            <img
                                src={cat.image}
                                alt={cat.name}
                                className="w-12 h-12 object-cover rounded-lg border border-borderSubtle"
                            />

                            {/* Name */}
                            <span className="font-medium text-textPrimary">
                                {cat.name}
                            </span>

                            {/* Product Count */}
                            <span className="text-primary font-semibold">
                                {getProductCount(cat._id)} items
                            </span>

                            {/* Date */}
                            <span className="text-textSecondary">
                                {new Date(cat.createdAt).toLocaleDateString()}
                            </span>

                            {/* Actions */}
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEdit(cat)}
                                    className="p-2 rounded-lg bg-[#1A1A1A] border border-borderSubtle hover:shadow-glow transition text-primary"
                                >
                                    <FaRegEdit />
                                </button>

                                <button
                                    onClick={() => handleDelete(cat._id)}
                                    className="p-2 rounded-lg bg-[#1A1A1A] border border-borderSubtle hover:shadow-glow transition text-danger"
                                >
                                    <ImBin />
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