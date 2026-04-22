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
  const [takeaway, setTakeaway] = useState(false);

  useEffect(() => {
    dispatch(getTablesThunk());
  }, [dispatch]);

  // ✅ Increase
  const increaseQty = (item) => {
    dispatch(
      updateQuantityThunk({
        productId: item.product,
        variantId: item.variantId,
        quantity: Number(item.quantity) + 1,
        spiceLevel: item.spiceLevel || "medium",
      })
    );
  };

  // ✅ Decrease + auto remove
  const decreaseQty = (item) => {
    if (Number(item.quantity) === 1) {
      dispatch(
        removeFromCartThunk({
          productId: item.product,
          variantId: item.variantId,
        })
      );
      return;
    }

    dispatch(
      updateQuantityThunk({
        productId: item.product,
        variantId: item.variantId,
        quantity: Number(item.quantity) - 1,
        spiceLevel: item.spiceLevel || "medium",
      })
    );
  };

  // 🌶️ Spice update
  const updateSpice = (item, spiceLevel) => {
    dispatch(
      updateQuantityThunk({
        productId: item.product,
        variantId: item.variantId,
        quantity: item.quantity,
        spiceLevel,
      })
    );
  };

  // ✅ Place Order
  const handlePlaceOrder = async () => {
    try {
      if (!takeaway) {
        if (!selectedTable) {
          alert("Please select a table");
          return;
        }
        await dispatch(selectTable(selectedTable)).unwrap();
      }

      await dispatch(
        createOrder({
          takeaway,
          tableNumber: takeaway ? null : selectedTable,
          items: cartItems.map((item) => ({
            product: item.product,
            quantity: item.quantity,
            spiceLevel: item.spiceLevel || "medium",
          })),
        })
      ).unwrap();

      alert("✅ Order Placed Successfully");

      setShowTableModal(false);
      setSelectedTable(null);
      setTakeaway(false);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
      <Navbar />

      <div className="mt-8 px-3 md:px-6">
        <div className="min-h-screen bg-gray-100 py-4">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4">

            {/* 🛒 CART */}
            <div className="lg:col-span-2 bg-white p-4 rounded-xl shadow">
              <h2 className="text-lg md:text-xl font-semibold mb-4">
                Shopping Cart
              </h2>

              {cartItems.length === 0 ? (
                <p className="text-gray-500 text-sm">Cart is empty 😢</p>
              ) : (
                cartItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between gap-3 border-b pb-4 mb-3"
                  >
                    {/* LEFT */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm truncate">
                        {item.name}
                      </h3>

                      <p className="text-xs text-gray-500">
                        {item.variantName}
                      </p>

                      <p className="text-green-600 font-semibold text-sm">
                        ₹{item.price * item.quantity}
                      </p>

                      <select
                        value={item.spiceLevel || "medium"}
                        onChange={(e) =>
                          updateSpice(item, e.target.value)
                        }
                        className="mt-1 border rounded px-2 py-1 text-xs"
                      >
                        <option value="low">🌶️ Low</option>
                        <option value="medium">🌶️ Medium</option>
                        <option value="high">🌶️ High</option>
                      </select>
                    </div>

                    {/* RIGHT (FIXED) */}
                    <div className="flex items-center gap-2 shrink-0 border rounded-lg px-2 py-1">
                      <button
                        onClick={() => decreaseQty(item)}
                        className="w-7 h-7 flex items-center justify-center bg-gray-100 rounded text-lg"
                      >
                        −
                      </button>

                      <span className="min-w-[20px] text-center text-sm font-medium">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increaseQty(item)}
                        className="w-7 h-7 flex items-center justify-center bg-gray-100 rounded text-lg"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* 💰 SUMMARY */}
            <div className="bg-white p-4 rounded-xl shadow h-fit sticky top-20">
              <h2 className="text-lg md:text-xl font-semibold mb-3">
                Order Summary
              </h2>

              <div className="flex justify-between text-sm mb-1">
                <span>Subtotal</span>
                <span>₹{totalAmount}</span>
              </div>

              <div className="flex justify-between text-sm mb-1">
                <span>Shipping</span>
                <span>₹{cartItems.length ? 50 : 0}</span>
              </div>

              <div className="flex justify-between font-semibold text-base pt-2">
                <span>Total</span>
                <span>
                  ₹{totalAmount + (cartItems.length ? 50 : 0)}
                </span>
              </div>

              <div className="flex items-center justify-between mt-3 text-sm">
                <span>Takeaway</span>
                <input
                  type="checkbox"
                  checked={takeaway}
                  onChange={(e) => setTakeaway(e.target.checked)}
                />
              </div>

              <button
                onClick={() =>
                  takeaway ? handlePlaceOrder() : setShowTableModal(true)
                }
                disabled={!cartItems.length}
                className="w-full mt-4 bg-orange-500 text-white py-2 rounded disabled:bg-gray-400"
              >
                Checkout
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* TABLE MODAL */}
      {showTableModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 px-3">
          <div className="bg-white p-4 rounded-xl w-full max-w-sm">

            <h2 className="text-base font-semibold mb-3">
              Select Table
            </h2>

            {tableLoading ? (
              <p>Loading...</p>
            ) : (
              <div className="grid grid-cols-3 gap-2">
                {tables.map((table) => (
                  <button
                    key={table._id}
                    disabled={table.isOccupied}
                    onClick={() => setSelectedTable(table.tableNumber)}
                    className={`p-2 text-sm border rounded ${
                      selectedTable === table.tableNumber
                        ? "bg-black text-white"
                        : table.isOccupied
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-gray-100"
                    }`}
                  >
                    {table.tableNumber}
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
              className="w-full mt-2 text-gray-500 text-sm"
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