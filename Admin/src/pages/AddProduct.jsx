// src/pages/admin/AddProduct.jsx

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../redux/slice/AdminProductSlice"

const AddProduct = () => {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.product);

    const [formData, setFormData] = useState({
        name: "",
        category: "",
        creditPoints: "",
        image: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "image") {
            setFormData({ ...formData, image: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append("name", formData.name);
        data.append("category", formData.category);
        data.append("creditPoints", formData.creditPoints);
        data.append("image", formData.image);

        dispatch(createProduct(data));
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
            <div className="bg-gray-800 p-6 rounded-2xl w-full max-w-md shadow-xl text-white">
                <h2 className="text-2xl font-bold mb-4 text-center">
                    🍔 Add New Product
                </h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                    <input
                        type="text"
                        name="name"
                        placeholder="Product Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="p-2 rounded bg-gray-700 outline-none"
                    />

                    <input
                        type="text"
                        name="category"
                        placeholder="Category ID"
                        value={formData.category}
                        onChange={handleChange}
                        className="p-2 rounded bg-gray-700 outline-none"
                    />

                    <input
                        type="number"
                        name="creditPoints"
                        placeholder="Credit Points"
                        value={formData.creditPoints}
                        onChange={handleChange}
                        className="p-2 rounded bg-gray-700 outline-none"
                    />

                    <input
                        type="file"
                        name="image"
                        onChange={handleChange}
                        className="p-2 bg-gray-700 rounded"
                    />

                    <button
                        type="submit"
                        className="bg-orange-500 hover:bg-orange-600 p-2 rounded font-semibold transition"
                    >
                        {loading ? "Adding..." : "Add Product"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;