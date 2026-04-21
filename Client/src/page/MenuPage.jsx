import React, { useState, useEffect, useRef } from "react";
import { IoIosStar } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../reducer/slice/productSlice";

export default function MenuPage() {
    const dispatch = useDispatch();

    const { products, loading, error } = useSelector(
        (state) => state.products
    );

    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedType, setSelectedType] = useState("veg");
    const [priceRange, setPriceRange] = useState(500);
    const [quantity, setQuantity] = useState(1);

    // ✅ POPUP STATES
    const [showVariantPopup, setShowVariantPopup] = useState(false);
    const [showDetailPopup, setShowDetailPopup] = useState(false);

    const [activeProduct, setActiveProduct] = useState(null);
    const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);

    const popupRef = useRef(null);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    // ✅ CLOSE ON OUTSIDE CLICK
    useEffect(() => {
        function handleOutsideClick(e) {
            if (popupRef.current && !popupRef.current.contains(e.target)) {
                setShowVariantPopup(false);
                setShowDetailPopup(false);
            }
        }

        if (showVariantPopup || showDetailPopup) {
            document.addEventListener("mousedown", handleOutsideClick);
        }

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [showVariantPopup, showDetailPopup]);

    // ✅ GET MIN PRICE
    const getMinPrice = (variants = []) => {
        if (!variants.length) return 0;
        return Math.min(...variants.map((v) => v.price));
    };

    // ✅ FILTER
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

    // ✅ OPEN DETAIL POPUP (CARD CLICK)
    const handleCardClick = (item) => {
        setActiveProduct(item);
        setShowDetailPopup(true);
    };

    // ✅ OPEN VARIANT POPUP (ADD BUTTON)
    const handleAddToCart = (product, qty = 1) => {
        setActiveProduct(product);
        setSelectedVariantIndex(0);
        setShowVariantPopup(true);

        console.log("Quantity 👉", qty);
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

        setShowVariantPopup(false);
    };

    return (
        <>
            <div className="min-h-screen bg-gray-100 p-4">
                <h1 className="text-xl md:text-2xl font-semibold mb-5">
                    Menu Items
                </h1>

                {/* PRODUCTS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

                    {filteredItems?.map((item) => {
                        const minPrice = getMinPrice(item.variants);

                        return (
                            <div
                                key={item._id}
                                onClick={() => handleCardClick(item)}
                                className="bg-white p-4 rounded-xl shadow hover:shadow-xl transition cursor-pointer"
                            >
                                <img
                                    src={item.image}
                                    className="w-full h-52 object-cover rounded-lg transition-transform duration-500 hover:scale-105"
                                />

                                <h2 className="text-lg font-semibold mt-2">
                                    {item.name}
                                </h2>

                                <p className="text-sm text-gray-500 capitalize">
                                    {item.type} • {item.category?.name}
                                </p>

                                <div className="flex justify-between items-center mt-2">
                                    <span className="font-bold">
                                        ₹{minPrice}
                                    </span>

                                    <div className="flex items-center text-white bg-green-600 px-1 rounded">
                                        {item.rating || 4}
                                        <IoIosStar />
                                    </div>
                                </div>

                                <button
                                    onClick={(e) => handleAddToCart(item, e)}
                                    className="mt-3 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>

            {showDetailPopup && activeProduct && (
                <div className="fixed inset-0 bg-black/60 flex items-end md:items-center justify-center z-50">

                    <div className="relative w-full md:max-w-md md:mx-auto">
                        {/* ❌ Close Button */}
                        <button
                            onClick={() => setShowDetailPopup(false)}
                            className="absolute -top-14 left-1/2 -translate-x-1/2 bg-black text-white text-xl px-4 py-2 rounded-full shadow-lg z-50"
                        >
                            ✕
                        </button>

                        {/* Modal */}
                        <div
                            ref={popupRef}
                            className="bg-white w-full rounded-t-2xl md:rounded-2xl overflow-hidden 
                            max-h-[85vh] md:max-h-[80vh] flex flex-col"                        >

                            {/* Image */}
                            <div className="w-full h-52 md:h-52">
                                <img
                                    src={activeProduct.image}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Content */}
                            <div className="p-4 flex-1 overflow-y-auto">

                                <h2 className="text-xl font-semibold">
                                    {activeProduct.name}
                                </h2>

                                <p className="text-gray-500 text-sm mt-1">
                                    {activeProduct.type} • {activeProduct.category?.name}
                                </p>

                                {/* Rating */}
                                <div className="flex items-center gap-1 mt-2 bg-green-600 text-white w-fit px-2 rounded">
                                    {activeProduct.rating || 4}
                                    <IoIosStar />
                                </div>

                                {/* Price */}
                                <p className="text-lg font-bold mt-3">
                                    ₹{activeProduct.variants?.[selectedVariantIndex]?.price}
                                </p>

                                {/* Description */}
                                <p className="text-sm text-gray-600 mt-2">
                                    Delicious food item prepared with fresh ingredients.
                                </p>

                                {/* 🔥 VARIANTS */}
                                <div className="mt-4">
                                    <p className="font-medium mb-2">Choose portion</p>

                                    <div className="flex gap-2 flex-wrap">
                                        {activeProduct.variants.map((variant, index) => {
                                            // 🔥 Short label logic
                                            const getShortName = (name) => {
                                                const n = name.toLowerCase();
                                                if (n.includes("quarter")) return "Q";
                                                if (n.includes("half")) return "H";
                                                if (n.includes("full")) return "F";
                                                return name.charAt(0).toUpperCase();
                                            };

                                            return (
                                                <button
                                                    key={index}
                                                    onClick={() => setSelectedVariantIndex(index)}
                                                    className={`px-3 py-2 rounded-lg border text-sm font-medium transition
                                                        ${selectedVariantIndex === index
                                                            ? "bg-red-500 text-white border-red-500"
                                                            : "bg-white text-gray-700 border-gray-300"
                                                        }`}
                                                >
                                                    {/* 👇 Responsive text */}
                                                    <span className="hidden sm:inline">
                                                        {variant.name}
                                                    </span>
                                                    <span className="sm:hidden">
                                                        {getShortName(variant.name)}
                                                    </span>

                                                    <span className="ml-1">₹{variant.price}</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            {/* 🔥 BOTTOM SECTION */}
                            <div className="p-4 border-t bg-white flex items-center gap-3">

                                {/* Quantity */}
                               

                                {/* Add to Cart */}
                                <button
                                    onClick={() => {
                                        handleConfirmAdd();
                                        setShowDetailPopup(false);
                                    }}
                                    className="flex-1 bg-red-500 text-white py-3 rounded-xl text-lg font-medium"
                                >
                                    Add to Cart
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}