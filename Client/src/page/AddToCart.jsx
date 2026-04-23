import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import {
  updateQuantityThunk,
  removeFromCartThunk,
  updateQuantityLocal,
  getCartThunk,
} from "../reducer/slice/cartSlice";
import { getTablesThunk } from "../reducer/slice/tableSlice";
import { selectTable, createOrder } from "../reducer/slice/orderSlice";

const AddToCart = () => {
  const dispatch = useDispatch();

  const { cartItems, totalAmount } = useSelector((state) => state.cart);
  const { tables, loading: tableLoading } = useSelector(
    (state) => state.table
  );
  const { user } = useSelector((state) => state.auth); // ✅ USER

  const [selectedTable, setSelectedTable] = useState(null);
  const [showTableModal, setShowTableModal] = useState(false);
  const [takeaway, setTakeaway] = useState(false);

  useEffect(() => {
    dispatch(getTablesThunk());
    dispatch(getCartThunk())
  }, [dispatch]);

  // ✅ Auto select user's table
  useEffect(() => {
    if (user?.tableNumber) {
      setSelectedTable(user.tableNumber);
    }
  }, [user]);

  const getVariantId = (item) => item.variantId || item.variant;

  // ➕ Increase
  const increaseQty = (item) => {
    const newQty = Number(item.quantity) + 1;

    dispatch(
      updateQuantityLocal({
        productId: item.product,
        variantId: getVariantId(item),
        quantity: newQty,
        spiceLevel: item.spiceLevel || "medium",
      })
    );

    dispatch(
      updateQuantityThunk({
        productId: item.product,
        variantId: getVariantId(item),
        quantity: newQty,
        spiceLevel: item.spiceLevel || "medium",
      })
    );
  };

  // ➖ Decrease
  const decreaseQty = (item) => {
    if (Number(item.quantity) === 1) {
      dispatch(
        removeFromCartThunk({
          productId: item.product,
          variantId: getVariantId(item),
        })
      );
      return;
    }

    const newQty = Number(item.quantity) - 1;

    dispatch(
      updateQuantityLocal({
        productId: item.product,
        variantId: getVariantId(item),
        quantity: newQty,
        spiceLevel: item.spiceLevel || "medium",
      })
    );

    dispatch(
      updateQuantityThunk({
        productId: item.product,
        variantId: getVariantId(item),
        quantity: newQty,
        spiceLevel: item.spiceLevel || "medium",
      })
    );
  };

  // 🌶️ Spice
  const updateSpice = (item, spiceLevel) => {
    dispatch(
      updateQuantityLocal({
        productId: item.product,
        variantId: getVariantId(item),
        quantity: item.quantity,
        spiceLevel,
      })
    );

    dispatch(
      updateQuantityThunk({
        productId: item.product,
        variantId: getVariantId(item),
        quantity: item.quantity,
        spiceLevel,
      })
    );
  };

  // ✅ Place Order
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

      await dispatch(
        createOrder({
          takeaway,
          tableNumber: takeaway
            ? null
            : user?.tableNumber || selectedTable,

          items: cartItems.map((item) => ({
            product: item.product,
            quantity: item.quantity,
            spiceLevel: item.spiceLevel || "medium",

            // ✅ FIXED
            variantName: item.variantName || item.variant?.name,
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

      <div className="mt-6 px-3 md:px-6">
        <div className="min-h-screen bg-gray-100 py-4 rounded-2xl">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4 ">

            {/* 🛒 CART */}
            <div className="lg:col-span-2 bg-white p-3 rounded-xl shadow">
              <h2 className="text-lg font-semibold mb-4">Shopping Cart</h2>

              {cartItems.length === 0 ? (
                <p className="text-gray-500">Cart is empty</p>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={`${item.product}-${getVariantId(item)}`}
                    className="flex items-center justify-between gap-3 pb-4 mb-3"
                  >

                    {/* ✅ LEFT SIDE (IMAGE + DETAILS) */}
                    <div className="flex items-center gap-3 flex-1">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />

                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-500">
                          {item.variantName}
                        </p>

                        <p className="text-green-600 font-semibold">
                          ₹{item.price * item.quantity}
                        </p>

                        <select
                          value={item.spiceLevel || "medium"}
                          onChange={(e) =>
                            updateSpice(item, e.target.value)
                          }
                          className="mt-1 border rounded px-2 py-1 text-sm"
                        >
                          <option value="low">🌶️ Low</option>
                          <option value="medium">🌶️ Medium</option>
                          <option value="high">🌶️ High</option>
                        </select>
                      </div>
                    </div>

                    {/* ✅ RIGHT SIDE (QUANTITY CONTROL) */}
                    <div className="flex items-center gap-2 border rounded-lg px-2 py-1">
                      <button
                        onClick={() => decreaseQty(item)}
                        className="w-7 h-7 bg-gray-200 rounded"
                      >
                        −
                      </button>

                      <span className="min-w-[20px] text-center">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increaseQty(item)}
                        className="w-7 h-7 bg-gray-200 rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* 💰 SUMMARY */}
            <div className="bg-white p-4 rounded-xl shadow h-fit sticky top-16">
              <h2 className="text-lg font-semibold mb-3">Order Summary</h2>

              <div className="flex justify-between mb-1">
                <span>Subtotal</span>
                <span>₹{totalAmount}</span>
              </div>

              <div className="flex justify-between mb-1">
                <span>Shipping</span>
                <span>₹{cartItems.length ? 50 : 0}</span>
              </div>

              <div className="flex justify-between font-semibold pt-2">
                <span>Total</span>
                <span>
                  ₹{totalAmount + (cartItems.length ? 50 : 0)}
                </span>
              </div>

              <div className="flex justify-between mt-3">
                <span>Takeaway</span>
                <input
                  type="checkbox"
                  checked={takeaway}
                  onChange={(e) => setTakeaway(e.target.checked)}
                />
              </div>

              <button
                onClick={() =>
                  takeaway
                    ? handlePlaceOrder()
                    : user?.tableNumber
                      ? handlePlaceOrder() // ✅ Direct if already table
                      : setShowTableModal(true)
                }
                disabled={!cartItems.length}
                className="w-full mt-4 bg-orange-500 text-white py-2 rounded-lg"
              >
                Checkout
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* TABLE MODAL */}
      {showTableModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-4 rounded-xl w-full max-w-sm">
            <h2 className="font-semibold mb-3">Select Table</h2>

            {tableLoading ? (
              <p>Loading...</p>
            ) : (
              <div className="grid grid-cols-3 gap-2">
                {tables.map((table) => {
                  const isUserTable =
                    user?.tableNumber === table.tableNumber;

                  return (
                    <button
                      key={table._id}
                      disabled={table.isOccupied && !isUserTable}
                      onClick={() =>
                        setSelectedTable(table.tableNumber)
                      }
                      className={`p-2 border rounded ${selectedTable === table.tableNumber
                        ? "bg-black text-white"
                        : isUserTable
                          ? "bg-green-500 text-white"
                          : table.isOccupied
                            ? "bg-gray-300"
                            : "bg-gray-100"
                        }`}
                    >
                      {table.tableNumber}

                      {isUserTable && (
                        <span className="block text-xs mt-1">
                          Your Table
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            <button
              onClick={handlePlaceOrder}
              disabled={!selectedTable}
              className="w-full mt-4 bg-green-600 text-white py-2 rounded"
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