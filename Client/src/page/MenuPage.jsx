import React, { useState, useEffect } from "react";
import { IoIosStar } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../reducer/slice/productSlice";
// import { addToCart } from "../redux/slices/cartSlice"; // optional

export default function MenuPage() {
    const dispatch = useDispatch();

    const { products, loading, error } = useSelector(
        (state) => state.products
    );

    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedType, setSelectedType] = useState("veg");
    const [priceRange, setPriceRange] = useState(500);

    // for popup 
    const [showPopup, setShowPopup] = useState(false);
    const [activeProduct, setActiveProduct] = useState(null);
    const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);


    // ✅ Store selected variant per product
    const [selectedVariants, setSelectedVariants] = useState({});

    // 🔥 Fetch products
    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    // ✅ Get minimum price
    const getMinPrice = (variants = []) => {
        if (!variants.length) return 0;
        return Math.min(...variants?.map((v) => v.price));
    };

    // ✅ Filter logic
    const filteredItems = products?.filter((item) => {
        const minPrice = getMinPrice(item.variants);

        return (
            (selectedCategory === "all" ||
                item.category?.name === selectedCategory) &&
            item.type === selectedType &&
            minPrice <= priceRange &&
            item.status === "active" &&
            item.isAvailable === true
        );
    });

    // ✅ Handle variant change
    const handleVariantChange = (productId, index) => {
        setSelectedVariants((prev) => ({
            ...prev,
            [productId]: index,
        }));
    };

    // ✅ Add to cart
    const handleAddToCart = (product) => {
        setActiveProduct(product);
        setSelectedVariantIndex(0);
        setShowPopup(true);
    };

    const handleConfirmAdd = () => {
        const variant = activeProduct.variants[selectedVariantIndex];

        const cartItem = {
            productId: activeProduct._id,
            name: activeProduct.name,
            image: activeProduct.image,
            variantName: variant.name,
            price: variant.price,
            quantity: 1,
        };

        console.log("ADD TO CART 👉", cartItem);

        // dispatch(addToCart(cartItem));

        setShowPopup(false);
    };

    return (
        <>
            <div className="min-h-screen bg-gray-100 p-4">
                <h1 className="text-xl md:text-2xl font-semibold mb-5">
                    Menu Items
                </h1>

                {/* 🔹 Filters */}
                <div className="bg-white p-3 rounded-xl shadow mb-6">
                    <div className="flex flex-wrap items-center gap-2">

                        {/* Category */}
                        {["all", "pizza", "burger", "pasta"].map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-3 py-1.5 rounded-full text-sm border ${selectedCategory === cat
                                    ? "bg-gray-900 text-white"
                                    : "bg-white text-gray-700"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}

                        {/* Veg / Non-Veg */}
                        <button
                            onClick={() =>
                                setSelectedType((prev) =>
                                    prev === "veg" ? "non-veg" : "veg"
                                )
                            }
                            className={`px-3 py-1.5 rounded-full text-sm border ${selectedType === "veg"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                                }`}
                        >
                            {selectedType === "veg" ? "Veg 🌱" : "Non-Veg 🍗"}
                        </button>

                        {/* Price */}
                        {[100, 200, 300, 500].map((price) => (
                            <button
                                key={price}
                                onClick={() => setPriceRange(price)}
                                className={`px-3 py-1.5 rounded-full text-sm border ${priceRange === price
                                    ? "bg-orange-500 text-white"
                                    : ""
                                    }`}
                            >
                                ₹{price}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 🔹 Loading / Error */}
                {loading && <p>Loading...</p>}
                {error && <p className="text-red-500">{error}</p>}

                {/* 🔹 Products */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

                    {filteredItems?.map((item) => {
                        const selectedIndex = selectedVariants[item._id] || 0;
                        const selectedVariant = item.variants[selectedIndex];
                        const minPrice = getMinPrice(item.variants);

                        return (
                            <div
                                key={item._id}
                                className="bg-white p-4 rounded-xl shadow hover:shadow-xl transition"
                            >
                                {/* Image */}
                                <img
                                    src={item.image}
                                    className="w-full h-52 object-cover rounded-lg transition-transform duration-500 hover:scale-105"
                                />

                                {/* Name */}
                                <h2 className="text-lg font-semibold mt-2">
                                    {item.name}
                                </h2>

                                {/* Info */}
                                <p className="text-sm text-gray-500 capitalize">
                                    {item.type} • {item.category?.name}
                                </p>

                                {/* Price */}
                                <div className="flex justify-between items-center mt-2">
                                    <span className="font-bold">
                                        ₹{selectedVariant?.price || minPrice}
                                    </span>

                                    <div className="flex items-center text-white bg-green-600 px-1 rounded">
                                        {item.rating || 4}
                                        <IoIosStar />
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleAddToCart(item)}
                                    className="mt-3 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        );
                    })}
                </div>
                {/* Empty */}
                {!loading && filteredItems?.length === 0 && (
                    <p className="text-center mt-6 text-gray-500">
                        No items found 😢
                    </p>
                )}
            </div>
            {showPopup && activeProduct && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

                    <div className="bg-white w-[90%] max-w-md rounded-xl p-4 relative">

                        {/* Close */}
                        <button
                            onClick={() => setShowPopup(false)}
                            className="absolute top-2 right-3 text-xl"
                        >
                            ✕
                        </button>

                        {/* Product */}
                        <h2 className="text-lg font-semibold mb-2">
                            {activeProduct.name}
                        </h2>

                        <p className="text-sm text-gray-500 mb-3">
                            Choose your portion
                        </p>

                        {/* 🔥 Variants as radio */}
                        <div className="space-y-2">
                            {activeProduct.variants.map((variant, index) => (
                                <label
                                    key={index}
                                    className="flex justify-between items-center border p-2 rounded cursor-pointer"
                                >
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name="variant"
                                            checked={selectedVariantIndex === index}
                                            onChange={() => setSelectedVariantIndex(index)}
                                        />
                                        <span>{variant.name}</span>
                                    </div>
                                    <span>₹{variant.price}</span>
                                </label>
                            ))}
                        </div>

                        {/* Button */}
                        <button
                            onClick={handleConfirmAdd}
                            className="mt-4 w-full bg-red-500 text-white py-2 rounded"
                        >
                            Add Item
                        </button>

                    </div>
                </div>
            )}

        </>
    );
}