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
import Swal from "sweetalert2";

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

    const themedSwal = Swal.mixin({
        background: "#0D0D0D",
        color: "#E5E7EB",
        backdrop: "rgba(0,0,0,0.85)",
        customClass: {
            popup:
                "rounded-2xl border border-borderSubtle shadow-[0_0_30px_rgba(255,122,24,0.15)]",
            confirmButton:
                "bg-primaryGradient text-white px-4 py-2 rounded-lg shadow-glow",
            cancelButton:
                "bg-[#1A1A1A] text-textSecondary border border-borderSubtle px-4 py-2 rounded-lg",
        },
        buttonsStyling: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name) {
            themedSwal.fire("Error", "Name required", "error");
            return;
        }

        const data = new FormData();
        data.append("name", name);
        if (image) data.append("image", image);

        if (editId) {
            dispatch(updateCategory({ id: editId, data }));
            themedSwal.fire({ title: "Updated!", icon: "success", timer: 1200, showConfirmButton: false });
            setEditId(null);
        } else {
            dispatch(createCategory(data));
            themedSwal.fire({ title: "Created!", icon: "success", timer: 1200, showConfirmButton: false });
        }

        setName("");
        setImage(null);
    };

    const handleEdit = (cat) => {
        setName(cat.name);
        setEditId(cat._id);
    };

    const handleDelete = (id) => {
        themedSwal.fire({
            title: "Delete Category?",
            text: "This cannot be undone",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Delete",
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteCategory(id));
                themedSwal.fire({ title: "Deleted!", icon: "success", timer: 1200, showConfirmButton: false });
            }
        });
    };

    const getProductCount = (categoryId) => {
        return products.filter(
            (p) =>
                p.category?._id === categoryId ||
                p.category === categoryId
        ).length;
    };

    return (
        <div className="p-6 space-y-6">

            <h2 className="text-xl font-semibold text-textPrimary">
                Category Management
            </h2>

            {/* FORM */}
            <form
                onSubmit={handleSubmit}
                className="bg-cardGradient border border-borderSubtle p-5 rounded-xl2 shadow-soft flex flex-col gap-3"
            >
                <input
                    type="text"
                    placeholder="Category Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="p-2.5 bg-[#1A1A1A] border border-borderSubtle rounded-xl text-textPrimary outline-none focus:shadow-glow"
                />

                <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="text-textSecondary"
                />

                <button className="bg-primaryGradient text-white py-2.5 rounded-xl2 shadow-glow">
                    {editId ? "Update Category" : "Add Category"}
                </button>
            </form>

            {/* GRID */}
            {loading ? (
                <p className="text-textSecondary">Loading...</p>
            ) : categories.length === 0 ? (
                <p className="text-textSecondary">No categories found</p>
            ) : (

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">

                    {categories.map((cat) => {

                        const count = getProductCount(cat._id);

                        return (
                            <div
                                key={cat._id}
                                className="bg-cardGradient border border-borderSubtle rounded-xl2 shadow-soft hover:shadow-glowHover transition overflow-hidden flex flex-col"
                            >

                                {/* IMAGE + BADGE */}
                                <div className="relative h-32 overflow-hidden">

                                    <img
                                        src={cat.image}
                                        alt={cat.name}
                                        className="w-full h-full object-cover"
                                    />

                                    {/* 🔥 BADGE */}
                                    <div className="absolute top-2 right-2 px-2 py-0.5 text-xs rounded-full bg-primaryGradient text-white shadow-glow">
                                        {count}
                                    </div>

                                </div>

                                {/* CONTENT */}
                                <div className="p-4 flex flex-col gap-2 flex-1">

                                    <h3 className="text-textPrimary font-semibold text-sm">
                                        {cat.name}
                                    </h3>

                                    <p className="text-xs text-textSecondary">
                                        {count} Products
                                    </p>

                                    <p className="text-xs text-textSecondary">
                                        {new Date(cat.createdAt).toLocaleDateString()}
                                    </p>

                                    <div className="flex gap-2 mt-auto">

                                        <button
                                            onClick={() => handleEdit(cat)}
                                            className="flex-1 py-1.5 text-xs rounded-lg bg-[#1A1A1A] border border-borderSubtle text-primary flex justify-center items-center gap-2 font-bold"
                                        >
                                            <FaRegEdit /> Edit
                                        </button>

                                        <button
                                            onClick={() => handleDelete(cat._id)}
                                            className="flex-1 py-1.5 text-xs rounded-lg bg-[#1A1A1A] border border-borderSubtle text-danger flex justify-center items-center gap-2 font-bold"
                                        >
                                            <ImBin /> Delete
                                        </button>

                                    </div>

                                </div>

                            </div>
                        );
                    })}

                </div>

            )}
        </div>
    );
};

export default Category;