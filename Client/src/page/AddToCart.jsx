import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import {
  updateQuantityThunk,
  removeFromCartThunk,
} from "../reducer/slice/cartSlice";
import { getTablesThunk } from "../reducer/slice/tableSlice";
import { selectTable, createOrder } from "../reducer/slice/orderSlice";

const AddToCart = () => {
  const dispatch = useDispatch();

  const { cartItems, totalAmount } = useSelector((state) => state.cart);
  const { tables, loading: tableLoading } = useSelector(
    (state) => state.table
  );

  const [selectedTable, setSelectedTable] = useState(null);
  const [showTableModal, setShowTableModal] = useState(false);

  // 🔥 Fetch tables
  useEffect(() => {
    dispatch(getTablesThunk());
  }, [dispatch]);

  // ➕ Increase Qty
  const increaseQty = (item) => {
    dispatch(
      updateQuantityThunk({
        productId: item.product,
        variantId: item.variantId,
        quantity: item.quantity + 1,
      })
    );
  };

  // ➖ Decrease Qty
  const decreaseQty = (item) => {
    if (item.quantity <= 1) return;

    dispatch(
      updateQuantityThunk({
        productId: item.product,
        variantId: item.variantId,
        quantity: item.quantity - 1,
      })
    );
  };

  // ❌ Remove Item
  const removeItem = (item) => {
    dispatch(
      removeFromCartThunk({
        productId: item.product,
        variantId: item.variantId,
      })
    );
  };

  // ✅ PLACE ORDER
  const handlePlaceOrder = async () => {
    if (!selectedTable) {
      alert("Please select a table");
      return;
    }

    try {
      // ✅ Step 1: Select Table
      await dispatch(selectTable(selectedTable)).unwrap();

      // ✅ Step 2: Create Order
      await dispatch(
        createOrder({
          tableNumber: selectedTable,
          items: cartItems,
          totalAmount,
        })
      ).unwrap();

      alert("✅ Order Placed Successfully");

      setShowTableModal(false);
      setSelectedTable(null);

      // 👉 Optional: clear cart
      // dispatch(clearCart());

    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
      <Navbar />

      <div className="mt-10">
        <div className="min-h-screen bg-gray-100 p-4 md:p-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* 🛒 CART */}
            <div className="lg:col-span-2 bg-white p-4 rounded-2xl shadow">
              <h2 className="text-xl font-semibold mb-8">Shopping Cart</h2>

              {cartItems.length === 0 ? (
                <p className="text-gray-500">Cart is empty 😢</p>
              ) : (
                cartItems.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 pb-4 border-b">

                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />

                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-500">
                        {item.variantName}
                      </p>
                      <p className="text-green-600 font-semibold">
                        ₹{item.price * item.quantity}
                      </p>
                    </div>

                    <div className="flex items-center border rounded-lg">
                      <button onClick={() => decreaseQty(item)} className="px-2">−</button>
                      <span className="px-3">{item.quantity}</span>
                      <button onClick={() => increaseQty(item)} className="px-2">+</button>
                    </div>

                    <button
                      onClick={() => removeItem(item)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Remove
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* 💰 SUMMARY */}
            <div className="bg-white p-4 rounded-2xl shadow h-fit">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>₹{totalAmount}</span>
              </div>

              <div className="flex justify-between mb-2">
                <span>Shipping</span>
                <span>₹{cartItems.length ? 50 : 0}</span>
              </div>

              <div className="flex justify-between font-semibold text-lg border-t pt-3">
                <span>Total</span>
                <span>
                  ₹{totalAmount + (cartItems.length ? 50 : 0)}
                </span>
              </div>

              <button
                onClick={() => setShowTableModal(true)}
                disabled={!cartItems.length}
                className="w-full mt-4 bg-black text-white py-2 rounded disabled:bg-gray-400"
              >
                Checkout
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* ✅ TABLE MODAL */}
      {showTableModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-80">

            <h2 className="text-lg font-semibold mb-4">Select Table</h2>

            {tableLoading ? (
              <p>Loading tables...</p>
            ) : (
              <div className="grid grid-cols-3 gap-3">
                {tables.map((table) => (
                  <button
                    key={table._id}
                    disabled={table.isOccupied}
                    onClick={() => setSelectedTable(table.tableNumber)}
                    className={`p-3 border rounded ${
                      selectedTable === table.tableNumber
                        ? "bg-black text-white"
                        : table.isOccupied
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-gray-100"
                    }`}
                  >
                    {table.tableNumber}
                    {table.isOccupied && (
                      <p className="text-xs text-red-500">Occupied</p>
                    )}
                  </button>
                ))}
              </div>
            )}

            <button
              onClick={handlePlaceOrder}
              disabled={!selectedTable}
              className="w-full mt-4 bg-green-600 text-white py-2 rounded disabled:bg-gray-400"
            >
              Confirm Order
            </button>

            <button
              onClick={() => setShowTableModal(false)}
              className="w-full mt-2 text-gray-500"
            >
              Cancel
            </button>

          </div>
        </div>
      )}
    </>
  );
};

export default AddToCart;