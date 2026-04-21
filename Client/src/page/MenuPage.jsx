import React, { useState, useEffect, useRef } from "react";
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

  // ✅ Redux
  const { products, loading } = useSelector((state) => state.products);
  const { cartItems, loading: cartLoading } = useSelector((state) => state.cart);
  const { tableNumber, loading: orderLoading } = useSelector((state) => state.order);

  // ✅ UI State
  const [selectedVariants, setSelectedVariants] = useState({});
  const [showDetailPopup, setShowDetailPopup] = useState(false);
  const [activeProduct, setActiveProduct] = useState(null);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);

  const popupRef = useRef(null);

  // 🔥 Load data
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(getCartThunk());
  }, [dispatch]);

  // ✅ Close popup outside
  useEffect(() => {
    const handler = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setShowDetailPopup(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ✅ Open popup
  const handleCardClick = (item) => {
    setActiveProduct(item);
    setSelectedVariantIndex(0);
    setShowDetailPopup(true);
  };

  // 🔥 ADD TO CART (REAL LOGIC)
  const handleAddToCart = () => {
    const variant = activeProduct.variants[selectedVariantIndex];

    dispatch(
      addToCartThunk({
        productId: activeProduct._id,
        variantId: variant._id,
        quantity: 1,
      })
    );

    setShowDetailPopup(false);
  };

  // 🔥 PLACE ORDER
  const handlePlaceOrder = () => {
    if (!tableNumber) return alert("Select table first");
    if (!cartItems.length) return alert("Cart empty");

    const items = cartItems.map((item) => ({
      product: item.product,
      variantId: item.variantId,
      quantity: item.quantity,
    }));

    dispatch(createOrder(items));
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-4 pb-24">

        {/* TABLE SELECT */}
        <div className="mb-4">
          <h2 className="font-semibold mb-2">Select Table</h2>
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((t) => (
              <button
                key={t}
                onClick={() => dispatch(selectTable(t))}
                className={`px-3 py-1 rounded ${
                  tableNumber === t ? "bg-blue-600 text-white" : "bg-gray-200"
                }`}
              >
                T{t}
              </button>
            ))}
          </div>
        </div>

        {/* PRODUCTS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          {products.map((item) => (
            <div
              key={item._id}
              onClick={() => handleCardClick(item)}
              className="bg-white p-3 rounded-xl shadow cursor-pointer"
            >
              <img src={item.image} className="h-40 w-full object-cover rounded" />

              <h2 className="mt-2 font-semibold">{item.name}</h2>

              <div className="flex justify-between mt-1">
                <span>₹{item.variants?.[0]?.price}</span>
                <div className="bg-green-600 text-white px-1 rounded flex items-center">
                  4 <IoIosStar />
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleCardClick(item);
                }}
                className="mt-2 w-full bg-red-500 text-white py-1 rounded"
              >
                Add
              </button>
            </div>
          ))}
        </div>

        {/* BOTTOM BAR */}
        <div className="fixed bottom-0 left-0 right-0 bg-white p-3 flex justify-between">

          <div>
            Items: {cartItems.length} <br />
            Table: {tableNumber || "Not selected"}
          </div>

          <button
            onClick={handlePlaceOrder}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            {orderLoading ? "Placing..." : "Place Order"}
          </button>
        </div>
      </div>

      {/* 🔥 POPUP */}
      {showDetailPopup && activeProduct && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-end md:items-center z-50">

          <div ref={popupRef} className="bg-white w-full md:max-w-md rounded-2xl p-4">

            <img src={activeProduct.image} className="w-full h-40 object-cover rounded" />

            <h2 className="mt-2 text-lg font-semibold">{activeProduct.name}</h2>

            <p className="text-gray-500">{activeProduct.category?.name}</p>

            {/* VARIANTS */}
            <div className="mt-3 flex gap-2 flex-wrap">
              {activeProduct.variants.map((v, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedVariantIndex(i)}
                  className={`px-3 py-2 border rounded ${
                    selectedVariantIndex === i
                      ? "bg-red-500 text-white"
                      : ""
                  }`}
                >
                  {v.name} ₹{v.price}
                </button>
              ))}
            </div>

            <button
              onClick={handleAddToCart}
              disabled={cartLoading}
              className="mt-4 w-full bg-red-500 text-white py-2 rounded"
            >
              {cartLoading ? "Adding..." : "Add to Cart"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}