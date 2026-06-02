import React, { useEffect, useState } from "react";
import { Plus, Star } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../reducer/slice/productSlice";
import { addToCartThunk } from "../reducer/slice/cartSlice";

export default function PopularFood() {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);
  const { loading: cartLoading } = useSelector((state) => state.cart);

  // ✅ Updated states (for real popup)
  const [showDetailPopup, setShowDetailPopup] = useState(false);
  const [activeProduct, setActiveProduct] = useState(null);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // ✅ ONLY POPULAR ITEMS
  const popularFoods = products
    ?.filter((item) => item.isPopular && item.isAvailable !== false)
    ?.slice(0, 8);

  const handleOpen = (item) => {
    setActiveProduct(item);
    setSelectedVariantIndex(0);
    setQuantity(1);
    setShowDetailPopup(true);
  };

  const handleAddToCart = () => {
    const variant = activeProduct.variants[selectedVariantIndex];

    for (let i = 0; i < quantity; i++) {
      dispatch(
        addToCartThunk({
          productId: activeProduct._id,
          variantId: variant._id,
          quantity: 1,
        })
      );
    }

    setShowDetailPopup(false);
  };

  return (
    <div className="mb-10">
      {/* Header */}
      <div className="flex justify-between items-center px-4 mb-4">
        <h2 className="text-lg font-bold">🔥 Popular Food</h2>
      </div>

      {/* Loader */}
      {loading ? (
        <div className="text-center py-10">Loading...</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 md:gap-8 px-2 md:px-10">
          {popularFoods?.map((item) => {
            const price = item.variants?.[0]?.price;

            return (
              <div
                key={item._id}
                className="group relative bg-white rounded-2xl overflow-hidden border border-zinc-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-500 ease-out cursor-pointer"
                onClick={() => handleOpen(item)}
              >

                {/* IMAGE SECTION */}
                <div className="relative w-full h-40 md:h-56 overflow-hidden bg-zinc-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Rating Badge */}
                  <div className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-sm px-2 py-0.5 rounded-lg text-[11px] font-bold text-zinc-800 flex items-center gap-0.5 shadow-sm">
                    <Star size={11} className="text-amber-500 fill-amber-500" />
                    <span>{item.rating || "4.2"}</span>
                  </div>
                </div>

                {/* CONTENT SECTION */}
                <div className="p-3 flex flex-col gap-2">

                  {/* TAG */}
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-zinc-400">
                      Must Try
                    </span>
                  </div>

                  {/* NAME */}
                  <h3 className="font-semibold text-zinc-800 text-sm leading-snug line-clamp-2 group-hover:text-orange-600 transition-colors duration-200">
                    {item.name}
                  </h3>

                  {/* PRICE + BUTTON */}
                  <div className="flex justify-between items-center border-t border-zinc-50">

                    <div className="flex items-center gap-2">


                      {/* Discounted Price */}
                      <span className="text-base font-extrabold text-zinc-900 tracking-tight">
                        ₹{price}
                      </span>


                      {/* Original Price (cut) */}
                      <span className="text-xs text-zinc-400 line-through font-medium">
                        ₹{Math.round(price * 1.2)}
                      </span>


                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpen(item);
                      }}
                      className="bg-orange-50 text-orange-600 hover:bg-orange-500 hover:text-white px-3.5 py-1.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-1 active:scale-95 border border-orange-100 hover:border-orange-500"
                    >
                      <span>Add</span>
                      <Plus size={12} strokeWidth={3} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ✅ REAL POPUP (MenuPage style) */}
      {showDetailPopup && activeProduct && (
        <div className="fixed inset-0 bg-black/70 flex items-end md:items-center justify-center z-[100] mb-24">
          <div
            className="bg-white w-full md:max-w-md rounded-t-2xl md:rounded-2xl overflow-hidden animate-slide-up"
            style={{ maxHeight: "90vh", overflowY: "auto" }}
          >
            {/* Image */}
            <div className="relative">
              <img
                src={activeProduct.image}
                alt={activeProduct.name}
                className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
              />

              <button
                onClick={() => setShowDetailPopup(false)}
                className="absolute top-3 right-3 bg-white/90 rounded-full p-1.5 shadow-md"
              >
                ✕
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

            {/* Content */}
            <div className="p-5 pb-8 ">
              <h2 className="text-xl font-bold text-gray-800">
                {activeProduct.name}
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                {activeProduct.category?.name}
              </p>

              <p className="text-sm text-gray-600 mt-2">
                {activeProduct.description ||
                  "Delicious food prepared with fresh ingredients. Served hot and fresh."}
              </p>

              {/* Variants */}
              <div className="mt-4">
                <h4 className="font-semibold text-sm mb-2">
                  Select Variant
                </h4>

                <div className="flex gap-2 flex-wrap">
                  {activeProduct.variants?.map((v, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedVariantIndex(i)}
                      className={`px-4 py-2 rounded-full text-sm font-medium border ${selectedVariantIndex === i
                        ? "bg-orange-500 text-white border-orange-500"
                        : "border-gray-200 text-gray-700"
                        }`}
                    >
                      {v.name} • ₹{v.price}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mt-4 flex items-center gap-3">
                <button
                  onClick={() =>
                    setQuantity(Math.max(1, quantity - 1))
                  }
                >
                  -
                </button>

                <span>{quantity}</span>

                <button onClick={() => setQuantity(quantity + 1)}>
                  +
                </button>
              </div>

              {/* Price */}
              <div className="mt-4 text-2xl font-bold text-orange-500">
                ₹
                {activeProduct.variants?.[selectedVariantIndex]?.price *
                  quantity}
              </div>

              {/* Add Button */}
              <button
                onClick={handleAddToCart}
                disabled={cartLoading}
                className="w-full mt-4 bg-orange-500 text-white py-2 rounded-full"
              >
                {cartLoading ? "Adding..." : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}