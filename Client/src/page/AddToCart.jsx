import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Trash2,
  Minus,
  Plus,
  ShoppingBag,
  Truck,
  CreditCard,
  ChevronRight,
  CheckCircle,
  X,
  AlertCircle
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateQuantityThunk,
  removeFromCartThunk,
  updateQuantityLocal,
  getCartThunk,
} from "../reducer/slice/cartSlice";
import { getTablesThunk } from "../reducer/slice/tableSlice";
import { selectTable, createOrder } from "../reducer/slice/orderSlice";
import Navbar from "../components/Navbar";

const AddToCart = () => {
  const dispatch = useDispatch();

  const { cartItems, totalAmount } = useSelector((state) => state.cart);
  const { tables, loading: tableLoading } = useSelector((state) => state.table);
  const { user } = useSelector((state) => state.auth);
  const { loading: orderLoading } = useSelector((state) => state.order);

  const [selectedTable, setSelectedTable] = useState(null);
  const [showTableModal, setShowTableModal] = useState(false);
  const [takeaway, setTakeaway] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  console.log(tables);


  useEffect(() => {
    dispatch(getTablesThunk());
    dispatch(getCartThunk());
  }, [dispatch]);

  useEffect(() => {
    if (user?.tableNumber) {
      setSelectedTable(user.tableNumber);
    }
  }, [user]);

  const getVariantId = (item) => item.variantId || item.variant;
  const deliveryFee = cartItems.length ? 47 : 0;
  const discount = 3.99;
  const grandTotal = totalAmount + deliveryFee - discount;

  const increaseQty = (item) => {
    const newQty = Number(item.quantity) + 1;
    dispatch(updateQuantityLocal({
      productId: item.product,
      variantId: getVariantId(item),
      quantity: newQty,
      spiceLevel: item.spiceLevel || "medium",
    }));
    dispatch(updateQuantityThunk({
      productId: item.product,
      variantId: getVariantId(item),
      quantity: newQty,
      spiceLevel: item.spiceLevel || "medium",
    }));
  };

  const decreaseQty = (item) => {
    if (Number(item.quantity) === 1) {
      dispatch(removeFromCartThunk({
        productId: item.product,
        variantId: getVariantId(item),
      }));
      return;
    }
    const newQty = Number(item.quantity) - 1;
    dispatch(updateQuantityLocal({
      productId: item.product,
      variantId: getVariantId(item),
      quantity: newQty,
      spiceLevel: item.spiceLevel || "medium",
    }));
    dispatch(updateQuantityThunk({
      productId: item.product,
      variantId: getVariantId(item),
      quantity: newQty,
      spiceLevel: item.spiceLevel || "medium",
    }));
  };

  const removeItem = (item) => {
    dispatch(removeFromCartThunk({
      productId: item.product,
      variantId: getVariantId(item),
    }));
  };

  const updateSpice = (item, spiceLevel) => {
    dispatch(updateQuantityLocal({
      productId: item.product,
      variantId: getVariantId(item),
      quantity: item.quantity,
      spiceLevel,
    }));
    dispatch(updateQuantityThunk({
      productId: item.product,
      variantId: getVariantId(item),
      quantity: item.quantity,
      spiceLevel,
    }));
  };

  const handlePlaceOrder = async () => {
    try {
      if (!takeaway) {
        if (!user?.tableNumber) {
          if (!selectedTable) {
            alert("Please select a table");
            return;
          }
          await dispatch(selectTable(selectedTable)).unwrap();
        }
      }

      await dispatch(createOrder({
        takeaway,
        tableNumber: takeaway ? null : user?.tableNumber || selectedTable,
        items: cartItems.map((item) => ({
          product: item.product,
          quantity: item.quantity,
          spiceLevel: item.spiceLevel || "medium",
          variantName: item.variantName || item.variant?.name,
        })),
      })).unwrap();

      setShowSuccessPopup(true);
      setShowTableModal(false);
      setSelectedTable(null);
      setTakeaway(false);

      setTimeout(() => {
        setShowSuccessPopup(false);
      }, 3000);
    } catch (err) {
      alert(err.message || "Something went wrong");
    }
  };

  if (cartItems.length === 0) {
    return (
      <>
        <div className="min-h-screen bg-gray-50 pt-20 pb-28">
          <div className="max-w-md mx-auto text-center px-4">
            <div className="bg-white rounded-3xl p-8 shadow-sm">
              <ShoppingBag size={80} className="mx-auto text-gray-300 mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Cart is Empty</h2>
              <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet</p>
              <Link to="/menu">
                <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                  Browse Menu
                </button>
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>

      <div className="min-h-screen bg-gray-50 pt-3 pb-28">
        <div className="max-w-7xl mx-auto px-4">

          {/* Page Title */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">My Cart</h1>
            <p className="text-gray-500 text-sm">{cartItems.length} items added</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Cart Items - Left Column */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={`${item.product}-${getVariantId(item)}`}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-gray-800">{item.name}</h3>
                          <p className="text-sm text-gray-500">{item.variantName}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm font-semibold text-orange-500">
                              ₹{item.price * item.quantity}
                            </span>
                            <span className="text-xs text-gray-400 line-through">
                              ₹{(item.price * 1.3).toFixed(0)}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => removeItem(item)}
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>

                      {/* Spice Level & Quantity */}
                      <div className="flex items-center justify-between mt-3">
                        <select
                          value={item.spiceLevel || "medium"}
                          onChange={(e) => updateSpice(item, e.target.value)}
                          className="text-xs border border-gray-200 rounded-full px-3 py-1.5 bg-gray-50 focus:outline-none focus:border-orange-300"
                        >
                          <option value="low">🌿 Low Spice</option>
                          <option value="medium">🌶️ Medium Spice</option>
                          <option value="high">🔥 High Spice</option>
                        </select>

                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => decreaseQty(item)}
                            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="font-semibold min-w-[20px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => increaseQty(item)}
                            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary - Right Column */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sticky top-24">
                <h2 className="text-lg font-bold text-gray-800 mb-4">Order Summary</h2>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Total Product Price</span>
                    <span className="font-semibold">₹{totalAmount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Delivery fee</span>
                    <span className="font-semibold">₹{deliveryFee}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Discount</span>
                    <span className="text-green-600 font-semibold">-₹{discount}</span>
                  </div>

                  <div className="border-t border-gray-100 pt-3 mt-2">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total Payment</span>
                      <span className="text-orange-500">₹{grandTotal}</span>
                    </div>
                  </div>
                </div>

                {/* Takeaway Toggle */}
                <div className="flex items-center justify-between mt-4 p-3 bg-gray-200 rounded-xl">
                  <div className="flex items-center gap-2">
                    <Truck size={18} className="text-gray-500" />
                    <span className="text-sm font-medium">Takeaway</span>
                  </div>
                  <button
                    onClick={() => setTakeaway(!takeaway)}
                    className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${takeaway ? 'bg-orange-500' : 'bg-gray-400'}`}
                  >
                    <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-300 ${takeaway ? 'translate-x-5' : 'translate-x-0.5'}`} />
                  </button>
                </div>

                {/* Table Info */}
                {!takeaway && (
                  <div className="mt-3 p-3 bg-orange-50 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                          <span className="text-orange-500 font-bold">#</span>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Table Number</p>
                          <p className="font-semibold text-gray-800">
                            {user?.tableNumber || selectedTable || "Not selected"}
                          </p>
                        </div>
                      </div>
                      {!user?.tableNumber && (
                        <button
                          onClick={() => setShowTableModal(true)}
                          className="text-sm text-orange-500 font-medium"
                        >
                          Change
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* Checkout Button */}
                <button
                  onClick={() =>
                    takeaway
                      ? handlePlaceOrder()
                      : user?.tableNumber
                        ? handlePlaceOrder()
                        : setShowTableModal(true)
                  }
                  disabled={orderLoading}
                  className="w-full mt-5 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {orderLoading ? (
                    "Processing..."
                  ) : (
                    <>
                      <CreditCard size={18} />
                      Checkout
                      <ChevronRight size={18} />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Table Selection Modal */}
      {showTableModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full animate-slide-up overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold">Select Table</h2>
                <p className="text-sm text-gray-500">Choose your table number</p>
              </div>
              <button onClick={() => setShowTableModal(false)} className="p-2 hover:bg-gray-100 rounded-full transition">
                <X size={20} />
              </button>
            </div>

            <div className="p-5">
              {tableLoading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-3">
                  {(tables || []).map((table) => {
                    const isUserTable = user?.tableNumber === table?.tableNumber;
                    const isSelected = selectedTable === table?.tableNumber;

                    // ✅ occupied logic (safe)
                    const isOccupied = table?.isOccupied && !isUserTable;

                    // ✅ safe name
                    const occupiedName = table?.occupiedBy?.name || "";

                    // ✅ safe initials function inline (no dependency issue)
                    const getInitials = (name) => {
                      if (!name || typeof name !== "string") return "";
                      return name
                        .trim()
                        .split(" ")
                        .filter(Boolean)
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                        .slice(0, 2); // max 2 letters
                    };

                    return (
                      <button
                        key={table?._id || table?.tableNumber}
                        disabled={isOccupied}
                        onClick={() => setSelectedTable(table?.tableNumber)}
                        className={`
          relative p-4 rounded-xl text-center transition-all duration-300
          ${isSelected
                            ? "bg-orange-500 text-white shadow-lg scale-105"
                            : isUserTable
                              ? "bg-green-500 text-white"
                              : isOccupied
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                : "bg-gray-50 text-gray-700 hover:bg-orange-50 hover:border-orange-300 border border-gray-200"
                          }
        `}
                      >
                        {/* Table Number */}
                        <span className="text-xl font-bold">
                          {table?.tableNumber || "-"}
                        </span>

                        {/* ✅ YOUR TABLE */}
                        {isUserTable && (
                          <span className="absolute -top-2 -right-2 bg-green-600 text-white text-[9px] px-1.5 py-0.5 rounded-full">
                            Your
                          </span>
                        )}

                        {/* ✅ OCCUPIED TABLE (NO DESIGN CHANGE, JUST SAFE) */}
                        {isOccupied && (
                          <div className="absolute -top-2 -right-2 group">
                            {/* Badge */}
                            <span
                              title={occupiedName || "Busy"} // hover pe full name
                              className="bg-gray-500 text-white text-[9px] px-1.5 py-0.5 rounded-full"
                            >
                              {occupiedName ? getInitials(occupiedName) : "Busy"}
                            </span>

                            {/* Tooltip (same design feel, optional hover) */}
                            {occupiedName && (
                              <div className="absolute bottom-full mb-1 hidden group-hover:block bg-black text-white text-[10px] px-2 py-1 rounded whitespace-nowrap z-10">
                                {occupiedName}
                              </div>
                            )}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="p-5 border-t border-gray-100 flex gap-3">
              <button
                onClick={() => setShowTableModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 font-medium hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handlePlaceOrder}
                disabled={!selectedTable}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all duration-300"
              >
                Confirm Order
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed bottom-24 left-4 right-4 md:left-auto md:right-8 md:bottom-8 md:w-96 z-50 animate-slide-up">
          <div className="bg-green-500 rounded-2xl p-4 shadow-2xl">
            <div className="flex items-center gap-3">
              <CheckCircle size={24} className="text-white" />
              <div>
                <p className="text-white font-semibold">Order Placed Successfully!</p>
                <p className="text-green-100 text-sm">Your food will be ready soon</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default AddToCart;