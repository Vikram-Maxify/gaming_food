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
        type: "",
        image: null,
    });

    // 🔥 variants state
    const [variants, setVariants] = useState([
        { name: "", price: "" },
    ]);

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    // 🔹 handle input
    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "image") {
            setFormData({ ...formData, image: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    // 🔹 variant change
    const handleVariantChange = (index, field, value) => {
        const updated = [...variants];
        updated[index][field] = value;
        setVariants(updated);
    };

    // 🔹 add variant
    const addVariant = () => {
        setVariants([...variants, { name: "", price: "" }]);
    };

    // 🔹 remove variant
    const removeVariant = (index) => {
        const updated = variants.filter((_, i) => i !== index);
        setVariants(updated);
    };

    // 🔥 submit
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.name) return alert("Name required");
        if (!formData.category) return alert("Category required");
        if (!formData.type) return alert("Type required");
        if (!formData.image) return alert("Image required");

        if (!variants.length) return alert("Add at least 1 variant");

        const data = new FormData();

        data.append("name", formData.name);
        data.append("category", formData.category);
        data.append("type", formData.type);
        data.append("creditPoints", formData.creditPoints);
        data.append("image", formData.image);

        // 🔥 IMPORTANT
        data.append("variants", JSON.stringify(variants));

        dispatch(createProduct(data));

        // reset
        setFormData({
            name: "",
            category: "",
            creditPoints: "",
            type: "",
            image: null,
        });

        setVariants([{ name: "", price: "" }]);
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
            <div className="bg-gray-800 p-6 rounded-2xl w-full max-w-md text-white">

                <h2 className="text-2xl font-bold mb-4 text-center">
                    🍔 Add Product
                </h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                    {/* Name */}
                    <input
                        type="text"
                        name="name"
                        placeholder="Product Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="p-2 bg-gray-700 rounded"
                    />

                    {/* Category */}
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="p-2 bg-gray-700 rounded"
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
                        className="p-2 bg-gray-700 rounded"
                    >
                        <option value="">Select Type</option>
                        <option value="veg">Veg</option>
                        <option value="non-veg">Non-Veg</option>
                        <option value="drink">Drink</option>
                    </select>

                    {/* Credit Points */}
                    <input
                        type="number"
                        name="creditPoints"
                        placeholder="Credit Points"
                        value={formData.creditPoints}
                        onChange={handleChange}
                        className="p-2 bg-gray-700 rounded"
                    />

                    {/* 🔥 VARIANTS */}
                    <div>
                        <p className="mb-2 font-semibold">Variants</p>

                        {variants.map((v, i) => (
                            <div key={i} className="flex gap-2 mb-2">

                                <input
                                    type="text"
                                    placeholder="Size (Half / Full)"
                                    value={v.name}
                                    onChange={(e) =>
                                        handleVariantChange(i, "name", e.target.value)
                                    }
                                    className="p-2 bg-gray-700 rounded w-1/2"
                                />

                                <input
                                    type="number"
                                    placeholder="Price"
                                    value={v.price}
                                    onChange={(e) =>
                                        handleVariantChange(i, "price", e.target.value)
                                    }
                                    className="p-2 bg-gray-700 rounded w-1/2"
                                />

                                {i !== 0 && (
                                    <button
                                        type="button"
                                        onClick={() => removeVariant(i)}
                                        className="bg-red-500 px-2 rounded"
                                    >
                                        ✕
                                    </button>
                                )}
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={addVariant}
                            className="text-sm text-orange-400"
                        >
                            + Add Variant
                        </button>
                    </div>

                    {/* Image */}
                    <input
                        type="file"
                        name="image"
                        onChange={handleChange}
                        className="p-2 bg-gray-700 rounded"
                    />

                    {/* Submit */}
                    <button className="bg-orange-500 p-2 rounded">
                        {loading ? "Adding..." : "Add Product"}
                    </button>

                </form>
            </div>
        </div>
    );
};

export default AddProduct;