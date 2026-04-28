import React, { useState, useEffect, useRef } from "react";
import { IoIosStar, IoIosClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { RxFilter, RxCross2 } from "react-icons/rx";
import { FiFilter } from "react-icons/fi";
import { HiOutlineMinus, HiOutlinePlus } from "react-icons/hi";
import { MdShoppingCart, MdDelete, MdRemoveShoppingCart } from "react-icons/md";
import { FaRupeeSign, FaTrashAlt } from "react-icons/fa";

import { fetchProducts } from "../reducer/slice/productSlice";
import {
    addToCartThunk,
    getCartThunk,
    removeFromCartThunk,
    clearCartThunk
} from "../reducer/slice/cartSlice";
import { selectTable, createOrder } from "../reducer/slice/orderSlice";

export default function MenuPage() {
    const dispatch = useDispatch();

    // Redux States
    const { products, loading } = useSelector((state) => state.products);
    const { cartItems, loading: cartLoading } = useSelector((state) => state.cart);
    const { tableNumber, loading: orderLoading } = useSelector((state) => state.order);

    // Filters State
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedType, setSelectedType] = useState("all");
    const [priceRange, setPriceRange] = useState(500);
    const [showFilter, setShowFilter] = useState(false);
    const [rating, setRating] = useState(null);
    const [sortBy, setSortBy] = useState("popular");

    // Popup State
    const [showDetailPopup, setShowDetailPopup] = useState(false);
    const [activeProduct, setActiveProduct] = useState(null);
    const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);

    // 🔥 Cart Popup State - Two modes
    const [showCartPopup, setShowCartPopup] = useState(false);
    const [popupMode, setPopupMode] = useState("toast"); // "toast" or "banner"
    const [lastAddedItem, setLastAddedItem] = useState(null);
    const popupTimeoutRef = useRef(null);

    const popupRef = useRef(null);
    const filterRef = useRef(null);

    // Load Data
    useEffect(() => {
        dispatch(fetchProducts());
        dispatch(getCartThunk());
    }, [dispatch]);

    // Close Popup Outside Click
    useEffect(() => {
        const handler = (e) => {
            if (popupRef.current && !popupRef.current.contains(e.target) && popupMode === "banner") {
                setShowCartPopup(false);
                setPopupMode("toast");
                setLastAddedItem(null);
            }
            if (filterRef.current && !filterRef.current.contains(e.target) && showFilter) {
                setShowFilter(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [showFilter, popupMode]);

    // Body scroll lock when popup is open
    useEffect(() => {
        if (showDetailPopup || showFilter) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [showDetailPopup, showFilter]);

    // Handle popup mode transition
    useEffect(() => {
        if (showCartPopup) {
            // Clear any existing timeout
            if (popupTimeoutRef.current) clearTimeout(popupTimeoutRef.current);

            // After 3 seconds, switch to banner mode
            popupTimeoutRef.current = setTimeout(() => {
                setPopupMode("banner");
            }, 3000);
        }
        return () => {
            if (popupTimeoutRef.current) clearTimeout(popupTimeoutRef.current);
        };
    }, [showCartPopup]);

    // Get unique categories
    const categories = ["all", ...new Set(products?.map(p => p.category?.name?.toLowerCase()).filter(Boolean))];

    // Filter Logic
    const getMinPrice = (variants = []) => {
        if (!variants.length) return 0;
        return Math.min(...variants.map((v) => v.price));
    };

    const filteredItems = products?.filter((item) => {
        const minPrice = getMinPrice(item.variants);
        const categoryMatch = selectedCategory === "all" ||
            item.category?.name?.toLowerCase() === selectedCategory;
        const typeMatch = selectedType === "all" || item.type === selectedType;
        const priceMatch = minPrice <= priceRange;
        const ratingMatch = rating === null || (item.rating || 4) >= rating;
        return categoryMatch && typeMatch && priceMatch && ratingMatch && item.isAvailable !== false;
    });

    // Sort Logic
    const sortedItems = [...(filteredItems || [])].sort((a, b) => {
        if (sortBy === "popular") return (b.rating || 0) - (a.rating || 0);
        if (sortBy === "price_low") return getMinPrice(a.variants) - getMinPrice(b.variants);
        if (sortBy === "price_high") return getMinPrice(b.variants) - getMinPrice(a.variants);
        return 0;
    });

    // Handlers
    const handleCardClick = (item) => {
        setActiveProduct(item);
        setSelectedVariantIndex(0);
        setQuantity(1);
        setShowDetailPopup(true);
    };

    const handleAddToCart = () => {
        const variant = activeProduct.variants[selectedVariantIndex];
        for (let i = 0; i < quantity; i++) {
            dispatch(addToCartThunk({
                productId: activeProduct._id,
                variantId: variant._id,
                quantity: 1,
            }));
        }

        // Show premium popup
        setLastAddedItem({
            name: activeProduct.name,
            variantName: variant.name,
            price: variant.price,
            quantity: quantity,
            image: activeProduct.image
        });
        setPopupMode("toast");
        setShowCartPopup(true);

        setShowDetailPopup(false);
        setQuantity(1);
    };

    const handleClearCart = () => {
        dispatch(clearCartThunk());
        setShowCartPopup(false);
        setPopupMode("toast");
        setLastAddedItem(null);
    };

    const handlePlaceOrder = () => {
        if (!tableNumber) return alert("Please select a table first");
        if (!cartItems.length) return alert("Your cart is empty");
        dispatch(createOrder(cartItems));
    };

    const totalCartAmount = cartItems?.reduce((sum, item) => sum + (item.price || 0), 0) || 0;

    return (
        <>
            {/* Main Content */}
            <div className={`min-h-screen bg-gray-50 pb-28 pt-4 ${showDetailPopup || showFilter ? 'overflow-hidden' : ''}`}>

                {/* Header Section */}
                <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100">
                    <div className="px-4 py-3">
                        <div className="flex items-center justify-between gap-3">
                            <button
                                onClick={() => setShowFilter(!showFilter)}
                                className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-200 transition"
                            >
                                <FiFilter size={16} />
                                Filters
                                {(selectedCategory !== "all" || selectedType !== "all" || rating !== null || priceRange < 500) && (
                                    <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                                )}
                            </button>

                            <div className="flex-1 max-w-xs">
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="w-full px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                >
                                    <option value="popular">⭐ Most Popular</option>
                                    <option value="price_low">💰 Price: Low to High</option>
                                    <option value="price_high">💰 Price: High to Low</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex gap-2 overflow-x-auto mt-3 pb-1 no-scrollbar">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300
                                        ${selectedCategory === cat
                                            ? "bg-orange-500 text-white shadow-md"
                                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                        }`}
                                >
                                    {cat === "all" ? "All Items" : cat.charAt(0).toUpperCase() + cat.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Filter Sidebar */}
                {showFilter && (
                    <div className="fixed inset-0 z-50 bg-black/50 flex justify-end">
                        <div ref={filterRef} className="w-full max-w-sm bg-white h-full overflow-y-auto animate-slide-right">
                            <div className="p-4 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white">
                                <h3 className="text-lg font-bold">Filters</h3>
                                <button onClick={() => setShowFilter(false)} className="p-1 rounded-full hover:bg-gray-100">
                                    <RxCross2 size={20} />
                                </button>
                            </div>
                            <div className="p-4 space-y-6">
                                <div>
                                    <h4 className="font-semibold mb-2">Food Type</h4>
                                    <div className="flex gap-3">
                                        {["all", "veg", "nonveg"].map((type) => (
                                            <button
                                                key={type}
                                                onClick={() => setSelectedType(type)}
                                                className={`px-4 py-2 rounded-full text-sm transition
                                                    ${selectedType === type
                                                        ? "bg-orange-500 text-white"
                                                        : "bg-gray-100 text-gray-700"
                                                    }`}
                                            >
                                                {type === "all" ? "All" : type === "veg" ? " Veg" : " Non-Veg"}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-2">Minimum Rating</h4>
                                    <div className="flex gap-2">
                                        {[null, 4, 4.5, 4.8].map((rate) => (
                                            <button
                                                key={rate}
                                                onClick={() => setRating(rate)}
                                                className={`px-3 py-1.5 rounded-full text-sm transition flex items-center gap-1
                                                    ${rating === rate
                                                        ? "bg-orange-500 text-white"
                                                        : "bg-gray-100 text-gray-700"
                                                    }`}
                                            >
                                                {rate ? <><IoIosStar /> {rate}+</> : "Any"}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-2">Max Price: ₹{priceRange}</h4>
                                    <input
                                        type="range"
                                        min="100"
                                        max="1000"
                                        step="50"
                                        value={priceRange}
                                        onChange={(e) => setPriceRange(parseInt(e.target.value))}
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                                    />
                                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                                        <span>₹100</span>
                                        <span>₹500</span>
                                        <span>₹1000</span>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 border-t border-gray-100 sticky bottom-0 bg-white">
                                <button
                                    onClick={() => {
                                        setSelectedCategory("all");
                                        setSelectedType("all");
                                        setPriceRange(500);
                                        setRating(null);
                                        setShowFilter(false);
                                    }}
                                    className="w-full py-2 bg-gray-100 text-gray-700 rounded-full font-medium"
                                >
                                    Reset All Filters
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Products Grid */}
                <div className="px-4 mt-4">
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
                        </div>
                    ) : sortedItems.length === 0 ? (
                        <div className="text-center py-16">
                            <p className="text-gray-400 text-lg">No items found</p>
                            <button
                                onClick={() => {
                                    setSelectedCategory("all");
                                    setSelectedType("all");
                                    setPriceRange(500);
                                    setRating(null);
                                }}
                                className="mt-4 text-orange-500 font-medium"
                            >
                                Clear filters
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {sortedItems.map((item) => {
                                const minPrice = getMinPrice(item.variants);
                                return (
                                    <div
                                        key={item._id}
                                        onClick={() => handleCardClick(item)}
                                        className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border border-gray-100"
                                    >
                                        <div className="relative h-32 md:h-40 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                            {item.type === "veg" ? (
                                                <div className="absolute top-2 left-2 w-4 h-4 rounded-full border-2 border-green-600 bg-white flex items-center justify-center">
                                                    <div className="w-2 h-2 rounded-full bg-green-600"></div>
                                                </div>
                                            ) : (
                                                <div className="absolute top-2 left-2 w-4 h-4 rounded-full border-2 border-red-600 bg-white flex items-center justify-center">
                                                    <div className="w-2 h-2 rounded-full bg-red-600"></div>
                                                </div>
                                            )}
                                            <div className="absolute top-2 right-2 flex items-center gap-1 bg-white/95 backdrop-blur-sm px-1.5 py-0.5 rounded-full">
                                                <IoIosStar className="text-yellow-500" />
                                                <span className="text-xs font-bold">{item.rating || 4}</span>
                                            </div>
                                        </div>
                                        <div className="p-3">
                                            <h3 className="font-semibold text-sm text-gray-800 line-clamp-1 group-hover:text-orange-500 transition">
                                                {item.name}
                                            </h3>
                                            <p className="text-xs text-gray-400 mt-0.5">{item.category?.name}</p>
                                            <div className="flex items-center justify-between mt-2">
                                                <span className="font-bold text-orange-500">₹{minPrice}</span>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleCardClick(item);
                                                    }}
                                                    className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 py-1 rounded-full text-xs font-medium hover:shadow-md transition"
                                                >
                                                    Add
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* 🔥 PREMIUM CART POPUP - Two Modes */}
                {showCartPopup && cartItems.length > 0 && (
                    <div className="fixed bottom-20 left-4 right-4 z-50 md:left-auto md:right-8 md:w-96 animate-slide-up">
                        {/* Toast Mode (First 3 seconds) */}
                        {popupMode === "toast" && lastAddedItem && (
                            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
                                <div className="h-1 bg-gradient-to-r from-orange-500 to-orange-400 animate-progress"></div>
                                <div className="p-4">
                                    <div className="flex items-start gap-3">
                                        <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                                            <img src={lastAddedItem.image} alt={lastAddedItem.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                                <span className="text-xs font-medium text-green-600">Added to cart</span>
                                            </div>
                                            <h4 className="font-semibold text-gray-800 text-sm mt-1">{lastAddedItem.name}</h4>
                                            <p className="text-xs text-gray-500">{lastAddedItem.variantName} • Qty: {lastAddedItem.quantity}</p>
                                            <p className="text-sm font-bold text-orange-500 mt-1">₹{lastAddedItem.price * lastAddedItem.quantity}</p>
                                        </div>
                                        <button
                                            onClick={() => window.location.href = "/cart"}
                                            className="px-4 py-2 bg-orange-500 text-white rounded-xl text-sm font-semibold hover:bg-orange-600 transition shadow-md whitespace-nowrap"
                                        >
                                            View Cart
                                        </button>
                                    </div>
                                </div>
                                <div className="bg-orange-50 px-4 py-3 border-t border-orange-100">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <MdShoppingCart className="text-orange-500" size={18} />
                                            <span className="text-sm font-medium text-gray-700">{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in cart</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <FaRupeeSign className="text-orange-500" size={12} />
                                            <span className="text-lg font-bold text-orange-600">₹{totalCartAmount}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Banner Mode (After 3 seconds) */}
                        {popupMode === "banner" && (
                            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
                                <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-4 py-3 flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <MdShoppingCart className="text-orange-400" size={20} />
                                        <span className="text-white font-semibold text-sm">Your Cart</span>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setShowCartPopup(false);
                                            setPopupMode("toast");
                                            setLastAddedItem(null);
                                        }}
                                        className="text-white/70 hover:text-white transition"
                                    >
                                        <IoIosClose size={24} />
                                    </button>
                                </div>

                                <div className="p-4">
                                    {/* Cart Items Preview */}
                                    <div className="max-h-48 overflow-y-auto space-y-2 mb-4">
                                        {cartItems.slice(0, 3).map((item, idx) => (
                                            <div key={idx} className="flex items-center justify-between text-sm">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-gray-500">{item.quantity}x</span>
                                                    <span className="text-gray-700">{item.name}</span>
                                                </div>
                                                <span className="font-medium text-gray-800">₹{item.price * item.quantity}</span>
                                            </div>
                                        ))}
                                        {cartItems.length > 3 && (
                                            <p className="text-xs text-gray-400 text-center">+{cartItems.length - 3} more items</p>
                                        )}
                                    </div>

                                    {/* Total */}
                                    <div className="border-t border-gray-100 pt-3 mb-4">
                                        <div className="flex justify-between items-center">
                                            <span className="font-semibold text-gray-800">Total Amount</span>
                                            <span className="text-xl font-bold text-orange-500">₹{totalCartAmount}</span>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-3">
                                        <button
                                            onClick={handleClearCart}
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-red-50 text-red-600 rounded-xl font-medium hover:bg-red-100 transition"
                                        >
                                            <FaTrashAlt size={14} />
                                            Empty Cart
                                        </button>
                                        <button
                                            onClick={() => window.location.href = "/cart"}
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold hover:shadow-lg transition"
                                        >
                                            <MdShoppingCart size={16} />
                                            Go to Cart →
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Bottom Order Bar - Hide when cart popup is shown */}
                {cartItems.length > 0 && !showDetailPopup && !showFilter && !showCartPopup && (
                    <div className="fixed bottom-0 left-0 right-0 z-40 p-4 bg-gradient-to-r from-orange-500 to-orange-600 shadow-2xl animate-slide-up">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-white/80 text-xs">Total Items</p>
                                <p className="text-white text-2xl font-bold">{cartItems.length}</p>
                            </div>
                            <div className="text-center">
                                <p className="text-white/80 text-xs">Table No.</p>
                                <p className="text-white font-semibold">{tableNumber || "Not selected"}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-white/80 text-xs">Total Amount</p>
                                <p className="text-white text-xl font-bold">₹{totalCartAmount}</p>
                            </div>
                            <button
                                onClick={handlePlaceOrder}
                                disabled={orderLoading}
                                className="bg-white text-orange-600 px-5 py-2.5 rounded-full font-bold text-sm shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50"
                            >
                                {orderLoading ? "Placing..." : "Place Order →"}
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Product Detail Popup */}
            {showDetailPopup && activeProduct && (
                <div className="fixed inset-0 bg-black/70 flex items-end md:items-center justify-center z-[100]">
                    <div ref={popupRef} className="bg-white w-full md:max-w-md rounded-t-2xl md:rounded-2xl overflow-hidden animate-slide-up" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
                        <div className="relative">
                            <img src={activeProduct.image} alt={activeProduct.name} className="w-full h-48 object-cover" />
                            <button onClick={() => setShowDetailPopup(false)} className="absolute top-3 right-3 bg-white/90 rounded-full p-1.5 shadow-md">
                                <IoIosClose size={24} />
                            </button>
                            {activeProduct.type === "veg" ? (
                                <div className="absolute bottom-3 left-3 w-5 h-5 rounded-full border-2 border-green-600 bg-white flex items-center justify-center">
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-600"></div>
                                </div>
                            ) : (
                                <div className="absolute bottom-3 left-3 w-5 h-5 rounded-full border-2 border-red-600 bg-white flex items-center justify-center">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-600"></div>
                                </div>
                            )}
                        </div>
                        <div className="p-5 pb-8">
                            <h2 className="text-xl font-bold text-gray-800">{activeProduct.name}</h2>
                            <p className="text-sm text-gray-500 mt-1">{activeProduct.category?.name}</p>
                            <p className="text-sm text-gray-600 mt-2">{activeProduct.description || "Delicious food prepared with fresh ingredients. Served hot and fresh."}</p>
                            <div className="mt-4">
                                <h4 className="font-semibold text-sm mb-2">Select Variant</h4>
                                <div className="flex gap-2 flex-wrap">
                                    {activeProduct.variants?.map((v, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setSelectedVariantIndex(i)}
                                            className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-300
                                                ${selectedVariantIndex === i
                                                    ? "bg-orange-500 text-white border-orange-500 shadow-md"
                                                    : "border-gray-200 text-gray-700 hover:border-orange-300"
                                                }`}
                                        >
                                            {v.name} • ₹{v.price}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="mt-4">
                                <h4 className="font-semibold text-sm mb-2">Quantity</h4>
                                <div className="flex items-center gap-3">
                                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition">
                                        <HiOutlineMinus size={16} />
                                    </button>
                                    <span className="text-lg font-semibold w-8 text-center">{quantity}</span>
                                    <button onClick={() => setQuantity(quantity + 1)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition">
                                        <HiOutlinePlus size={16} />
                                    </button>
                                </div>
                            </div>
                            <div className="mt-5 flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-gray-400">Total Price</p>
                                    <p className="text-2xl font-bold text-orange-500">₹{activeProduct.variants?.[selectedVariantIndex]?.price * quantity}</p>
                                </div>
                                <button onClick={handleAddToCart} disabled={cartLoading} className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50">
                                    {cartLoading ? "Adding..." : "Add to Cart"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .line-clamp-1 {
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                @keyframes slide-right {
                    from { transform: translateX(100%); }
                    to { transform: translateX(0); }
                }
                @keyframes slide-up {
                    from { transform: translateY(100%); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                @keyframes progress {
                    from { width: 100%; }
                    to { width: 0%; }
                }
                .animate-slide-right { animation: slide-right 0.3s ease-out; }
                .animate-slide-up { animation: slide-up 0.3s ease-out; }
                .animate-progress { animation: progress 3s linear forwards; }
            `}</style>
        </>
    );
}