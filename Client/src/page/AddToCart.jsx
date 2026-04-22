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

  // 🔥 LOCAL STATE FOR INSTANT UI UPDATE
  const [localCart, setLocalCart] = useState([]);

  const [selectedTable, setSelectedTable] = useState(null);
  const [showTableModal, setShowTableModal] = useState(false);
  const [takeaway, setTakeaway] = useState(false);

  useEffect(() => {
    dispatch(getTablesThunk());
  }, [dispatch]);

  // 🔥 Sync Redux → Local
  useEffect(() => {
    setLocalCart(cartItems);
  }, [cartItems]);

  // ✅ Increase
  const increaseQty = (item) => {
    const updatedCart = localCart.map((i) =>
      i._id === item._id
        ? { ...i, quantity: Number(i.quantity) + 1 }
        : i
    );

    setLocalCart(updatedCart); // 🔥 instant UI update

    dispatch(
      updateQuantityThunk({
        productId: item.product,
        variantId: item.variant || item.variantId,
        quantity: Number(item.quantity) + 1,
        spiceLevel: item.spiceLevel || "medium",
      })
    );
  };

  // ✅ Decrease
  const decreaseQty = (item) => {
    if (Number(item.quantity) === 1) {
      setLocalCart(localCart.filter((i) => i._id !== item._id));

      dispatch(
        removeFromCartThunk({
          productId: item.product,
          variantId: item.variant || item.variantId,
        })
      );
      return;
    }

    const updatedCart = localCart.map((i) =>
      i._id === item._id
        ? { ...i, quantity: Number(i.quantity) - 1 }
        : i
    );

    setLocalCart(updatedCart); // 🔥 instant UI update

    dispatch(
      updateQuantityThunk({
        productId: item.product,
        variantId: item.variant || item.variantId,
        quantity: Number(item.quantity) - 1,
        spiceLevel: item.spiceLevel || "medium",
      })
    );
  };

  // 🌶️ Spice update (FIXED)
  const updateSpice = (item, spiceLevel) => {
    const updatedCart = localCart.map((i) =>
      i._id === item._id ? { ...i, spiceLevel } : i
    );

    setLocalCart(updatedCart);

    dispatch(
      updateQuantityThunk({
        productId: item.product,
        variantId: item.variant || item.variantId, // ✅ FIX
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
          items: localCart.map((item) => ({
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
      setLocalCart([]);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
      <Navbar />

      <div className="mt-16 px-3 md:px-6">
        <div className="min-h-screen bg-gray-100 py-4">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4">

            {/* 🛒 CART */}
            <div className="lg:col-span-2 bg-white p-4 rounded-xl shadow">
              <h2 className="text-lg font-semibold mb-4">Shopping Cart</h2>

              {localCart.length === 0 ? (
                <p className="text-gray-500">Cart is empty 😢</p>
              ) : (
                localCart.map((item) => (
                  <div
                    key={item._id}
                    className="flex justify-between border-b pb-4 mb-3"
                  >
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-xs text-gray-500">
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
                        className="mt-1 border px-2 py-1 text-xs"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => decreaseQty(item)}
                        className="px-2 bg-gray-200"
                      >
                        -
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() => increaseQty(item)}
                        className="px-2 bg-gray-200"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* 💰 SUMMARY */}
            <div className="bg-white p-4 rounded-xl shadow">
              <h2 className="text-lg font-semibold mb-3">
                Order Summary
              </h2>

              <p>Subtotal: ₹{totalAmount}</p>
              <p>Shipping: ₹{localCart.length ? 50 : 0}</p>

              <h3 className="font-bold">
                Total: ₹{totalAmount + (localCart.length ? 50 : 0)}
              </h3>

              <button
                onClick={() =>
                  takeaway ? handlePlaceOrder() : setShowTableModal(true)
                }
                className="w-full mt-4 bg-orange-500 text-white py-2"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddToCart;