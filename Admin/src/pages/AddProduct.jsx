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

    const [variants, setVariants] = useState([
        { name: "", price: "" },
    ]);

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

    const handleVariantChange = (index, field, value) => {
        const updated = [...variants];
        updated[index][field] = value;
        setVariants(updated);
    };

    const addVariant = () => {
        setVariants([...variants, { name: "", price: "" }]);
    };

    const removeVariant = (index) => {
        const updated = variants.filter((_, i) => i !== index);
        setVariants(updated);
    };

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
        data.append("variants", JSON.stringify(variants));

        dispatch(createProduct(data));

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
        <div className="p-6">

            <div className="max-w-2xl mx-auto bg-cardGradient border border-borderSubtle rounded-xl2 shadow-soft p-8">

                {/* Header */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-textPrimary">
                        🍔 Add Product
                    </h2>
                    <p className="text-sm text-textSecondary mt-1">
                        Create a new menu item with variants and pricing
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                    {/* 🧾 BASIC INFO */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        {/* Name */}
                        <div>
                            <label className="text-xs text-textSecondary mb-1 block">
                                Product Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="e.g. Chicken Burger"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-3 py-2 bg-[#1A1A1A] border border-borderSubtle rounded-xl2 text-textPrimary outline-none focus:shadow-glow transition"
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label className="text-xs text-textSecondary mb-1 block">
                                Category
                            </label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full px-3 py-2 bg-[#1A1A1A] border border-borderSubtle rounded-xl2 text-textPrimary"
                            >
                                <option value="">Select Category</option>
                                {categories.map((cat) => (
                                    <option key={cat._id} value={cat._id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                    </div>

                    {/* 🧾 TYPE + POINTS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        {/* Type */}
                        <div>
                            <label className="text-xs text-textSecondary mb-1 block">
                                Type
                            </label>
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                className="w-full px-3 py-2 bg-[#1A1A1A] border border-borderSubtle rounded-xl2 text-textPrimary"
                            >
                                <option value="">Select Type</option>
                                <option value="veg">Veg</option>
                                <option value="non-veg">Non-Veg</option>
                                <option value="drink">Drink</option>
                            </select>
                        </div>

                        {/* Credit Points */}
                        <div>
                            <label className="text-xs text-textSecondary mb-1 block">
                                Credit Points
                            </label>
                            <input
                                type="number"
                                name="creditPoints"
                                placeholder="e.g. 50"
                                value={formData.creditPoints}
                                onChange={handleChange}
                                className="w-full px-3 py-2 bg-[#1A1A1A] border border-borderSubtle rounded-xl2 text-textPrimary outline-none focus:shadow-glow"
                            />
                        </div>

                    </div>

                    {/* 🧩 VARIANTS */}
                    <div className="bg-[#121212] border border-borderSubtle rounded-xl2 p-4">

                        <div className="flex justify-between items-center mb-3">
                            <p className="text-sm font-medium text-textPrimary">
                                Variants
                            </p>
                            <button
                                type="button"
                                onClick={addVariant}
                                className="text-xs text-primary hover:underline"
                            >
                                + Add Variant
                            </button>
                        </div>

                        <div className="flex flex-col gap-3">
                            {variants.map((v, i) => (
                                <div key={i} className="flex gap-2 items-center">

                                    <input
                                        type="text"
                                        placeholder="Size (Half / Full)"
                                        value={v.name}
                                        onChange={(e) =>
                                            handleVariantChange(i, "name", e.target.value)
                                        }
                                        className="flex-1 px-3 py-2 bg-[#1A1A1A] border border-borderSubtle rounded-lg text-textPrimary"
                                    />

                                    <input
                                        type="number"
                                        placeholder="Price"
                                        value={v.price}
                                        onChange={(e) =>
                                            handleVariantChange(i, "price", e.target.value)
                                        }
                                        className="w-28 px-3 py-2 bg-[#1A1A1A] border border-borderSubtle rounded-lg text-textPrimary"
                                    />

                                    {i !== 0 && (
                                        <button
                                            type="button"
                                            onClick={() => removeVariant(i)}
                                            className="text-danger text-sm"
                                        >
                                            ✕
                                        </button>
                                    )}

                                </div>
                            ))}
                        </div>

                    </div>

                    {/* 🖼 IMAGE */}
                    <div>
                        <label className="text-xs text-textSecondary mb-1 block">
                            Upload Image
                        </label>
                        <input
                            type="file"
                            name="image"
                            onChange={handleChange}
                            className="w-full px-3 py-2 bg-[#1A1A1A] border border-borderSubtle rounded-xl2 text-textSecondary"
                        />
                    </div>

                    {/* 🚀 ACTION */}
                    <button className="w-full bg-primaryGradient text-white py-2.5 rounded-xl2 shadow-glow hover:shadow-glowHover transition font-medium">
                        {loading ? "Adding Product..." : "Add Product"}
                    </button>

                </form>
            </div>
        </div>
    );
};

export default AddProduct;