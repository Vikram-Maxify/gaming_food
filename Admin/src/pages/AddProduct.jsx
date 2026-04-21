// src/pages/admin/AddProduct.jsx

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../redux/slice/AdminProductSlice";
import { getCategories } from "../redux/slice/categorySlice";

const AddProduct = () => {
    const dispatch = useDispatch();

    const { loading } = useSelector((state) => state.product);
    const { categories } = useSelector((state) => state.category);

    const [formData, setFormData] = useState({
        name: "",
        category: "",
        creditPoints: "",
        price: "",
        type: "",
        image: null,
    });

    // 🔥 fetch categories
    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

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

        // 🔒 Validation
        if (!formData.name) return alert("Product name required");
        if (!formData.category) return alert("Select category");
        if (!formData.price) return alert("Price required");
        if (!formData.type) return alert("Select product type");
        if (!formData.image) return alert("Image required");

        const data = new FormData();
        data.append("name", formData.name);
        data.append("category", formData.category);
        data.append("creditPoints", formData.creditPoints);
        data.append("price", formData.price);
        data.append("type", formData.type);
        data.append("image", formData.image);

        for (let pair of data.entries()) {
  console.log(pair);
}

        dispatch(createProduct(data));

        // 🔄 Reset form
        setFormData({
            name: "",
            category: "",
            creditPoints: "",
            price: "",
            type: "",
            image: null,
        });
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
            <div className="bg-gray-800 p-6 rounded-2xl w-full max-w-md shadow-xl text-white">

                <h2 className="text-2xl font-bold mb-4 text-center">
                    🍔 Add New Product
                </h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                    {/* Name */}
                    <input
                        type="text"
                        name="name"
                        placeholder="Product Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="p-2 rounded bg-gray-700 outline-none"
                    />

                    {/* Category */}
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="p-2 rounded bg-gray-700 outline-none"
                    >
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                            <option key={cat._id} value={cat._id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>

                    {/* Type */}
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="p-2 rounded bg-gray-700 outline-none"
                    >
                        <option value="">Select Type</option>
                        <option value="veg">Veg</option>
                        <option value="non-veg">Non-Veg</option>
                        <option value="drink">Drink</option>
                    </select>

                    {/* Price */}
                    <input
                        type="number"
                        name="price"
                        placeholder="Price (₹)"
                        value={formData.price}
                        onChange={handleChange}
                        className="p-2 rounded bg-gray-700 outline-none"
                        min="1"
                    />

                    {/* Credit Points */}
                    <input
                        type="number"
                        name="creditPoints"
                        placeholder="Credit Points (optional)"
                        value={formData.creditPoints}
                        onChange={handleChange}
                        className="p-2 rounded bg-gray-700 outline-none"
                    />

                    {/* Image */}
                    <input
                        type="file"
                        name="image"
                        onChange={handleChange}
                        className="p-2 bg-gray-700 rounded"
                    />

                    {/* Submit */}
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