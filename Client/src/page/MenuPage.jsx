import React, { useState, useEffect } from "react";
import { IoIosStar } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

import { fetchProducts } from "../reducer/slice/productSlice";
import {
  addToCartThunk,
  getCartThunk,
} from "../reducer/slice/cartSlice";
import { selectTable, createOrder } from "../reducer/slice/orderSlice";

export default function MenuPage() {
  const dispatch = useDispatch();

  // ✅ Redux state
  const { products, loading, error } = useSelector((state) => state.products);
  const {
    cartItems,
    loading: cartLoading,
  } = useSelector((state) => state.cart);
  const { tableNumber, loading: orderLoading } = useSelector(
    (state) => state.order
  );

  // ✅ Filters
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedType, setSelectedType] = useState("veg");
  const [priceRange, setPriceRange] = useState(500);

  // ✅ Variant state
  const [selectedVariants, setSelectedVariants] = useState({});

  // 🔥 Fetch products + cart
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(getCartThunk()); // ✅ important
  }, [dispatch]);

  // ✅ Min price
  const getMinPrice = (variants = []) => {
    if (!variants.length) return 0;
    return Math.min(...variants.map((v) => v.price));
  };

  // ✅ Filter products
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

  // ✅ Select variant
  const handleVariantChange = (productId, index) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [productId]: index,
    }));
  };

  // 🔥 ✅ FIXED ADD TO CART (THUNK)
  const handleAddToCart = (product) => {
    const variantIndex = selectedVariants[product._id] || 0;
    const variant = product.variants[variantIndex];

    dispatch(
      addToCartThunk({
        productId: product._id,
        variantId: variant._id, // ⚠️ IMPORTANT
        quantity: 1,
      })
    );
  };

  // ✅ Select table
  const handleSelectTable = (table) => {
    dispatch(selectTable(table));
  };

  // 🔥 ✅ FIXED ORDER
  const handlePlaceOrder = () => {
    if (!tableNumber) {
      alert("Please select table first ❗");
      return;
    }

    if (cartItems.length === 0) {
      alert("Cart is empty ❗");
      return;
    }

    const items = cartItems.map((item) => ({
      product: item.product, // 👈 backend se aata hai
      variantId: item.variantId, // ⚠️ IMPORTANT
      quantity: item.quantity,
    }));

    dispatch(createOrder(items));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 pb-24">

      <h1 className="text-xl md:text-2xl font-semibold mb-5">
        Menu Items
      </h1>

      {/* 🪑 TABLE SELECT */}
      <div className="mb-5">
        <h2 className="mb-2 font-semibold">Select Table</h2>
        <div className="flex gap-2 flex-wrap">
          {[1, 2, 3, 4, 5].map((t) => (
            <button
              key={t}
              onClick={() => handleSelectTable(t)}
              className={`px-4 py-2 rounded ${
                tableNumber === t
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              Table {t}
            </button>
          ))}
        </div>
      </div>

      {/* 🔹 Filters */}
      <div className="bg-white p-3 rounded-xl shadow mb-6">
        <div className="flex flex-wrap gap-2">

          {/* Category */}
          {["all", "pizza", "burger", "pasta"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-sm border ${
                selectedCategory === cat
                  ? "bg-gray-900 text-white"
                  : "bg-white"
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
            className={`px-3 py-1.5 rounded-full text-sm border ${
              selectedType === "veg"
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
              className={`px-3 py-1.5 rounded-full text-sm border ${
                priceRange === price
                  ? "bg-orange-500 text-white"
                  : ""
              }`}
            >
              ₹{price}
            </button>
          ))}
        </div>
      </div>

      {/* 🔹 Loading/Error */}
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* 🍔 PRODUCTS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

        {filteredItems?.map((item) => {
          const selectedIndex = selectedVariants[item._id] || 0;
          const selectedVariant = item.variants[selectedIndex];
          const minPrice = getMinPrice(item.variants);

          return (
            <div key={item._id} className="bg-white p-4 rounded-xl shadow">

              <img
                src={item.image}
                className="w-full h-52 object-cover rounded-lg"
              />

              <h2 className="text-lg font-semibold mt-2">
                {item.name}
              </h2>

              <p className="text-sm text-gray-500 capitalize">
                {item.type} • {item.category?.name}
              </p>

              <div className="flex justify-between mt-2">
                <span className="font-bold">
                  ₹{selectedVariant?.price || minPrice}
                </span>

                <div className="flex items-center text-white bg-green-600 px-1 rounded">
                  {item.rating || 4}
                  <IoIosStar />
                </div>
              </div>

              {/* Variant */}
              <select
                className="mt-2 w-full border rounded p-1"
                value={selectedIndex}
                onChange={(e) =>
                  handleVariantChange(item._id, Number(e.target.value))
                }
              >
                {item.variants.map((v, i) => (
                  <option key={i} value={i}>
                    {v.name} - ₹{v.price}
                  </option>
                ))}
              </select>

              {/* 🛒 BUTTON */}
              <button
                onClick={() => handleAddToCart(item)}
                disabled={cartLoading}
                className="mt-3 w-full bg-red-500 text-white py-2 rounded"
              >
                {cartLoading ? "Adding..." : "Add to Cart"}
              </button>
            </div>
          );
        })}
      </div>

      {/* 🛒 BOTTOM BAR */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow p-3 flex justify-between items-center">

        <div>
          <p className="text-sm">Items: {cartItems.length}</p>
          <p className="text-xs text-gray-500">
            Table: {tableNumber || "Not selected"}
          </p>
        </div>

        <button
          onClick={handlePlaceOrder}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          {orderLoading ? "Placing..." : "Place Order"}
        </button>
      </div>

      {/* Empty */}
      {!loading && filteredItems?.length === 0 && (
        <p className="text-center mt-6 text-gray-500">
          No items found 😢
        </p>
      )}
    </div>
  );
}