import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyOrders } from "../reducer/slice/orderSlice";
import { FaCoins } from "react-icons/fa";
import { MdAccessTime, MdLocalFireDepartment } from "react-icons/md";

const OrderHistory = () => {
    const dispatch = useDispatch();
    const { orders, loading, error } = useSelector((state) => state.order);

    useEffect(() => {
        dispatch(fetchMyOrders());
    }, [dispatch]);

    if (loading) {
        return <div className="text-center mt-20">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500 mt-20">{error}</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <h1 className="text-2xl font-bold mb-6">📦 Order History</h1>

            {orders.map((order) => (
                <div
                    key={order._id}
                    className="bg-white rounded-2xl shadow-sm border p-4 mb-5"
                >
                    {/* Order Header */}
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-sm text-gray-500 flex items-center gap-1">
                            <MdAccessTime />
                            {new Date(order.createdAt).toLocaleString()}
                        </span>

                        <span className="text-sm font-semibold text-orange-500 capitalize">
                            {order.status}
                        </span>
                    </div>

                    {/* Items */}
                    {order.items.map((item) => (
                        <div
                            key={item._id}
                            className="flex gap-3 border-t pt-3 mt-3"
                        >
                            {/* Image */}
                            <img
                                src={item.image}
                                alt={item.productName}
                                className="w-20 h-20 rounded-lg object-cover"
                            />

                            {/* Info */}
                            <div className="flex-1">
                                <h3 className="font-semibold text-gray-800">
                                    {item.productName}
                                </h3>

                                <p className="text-sm text-gray-500">
                                    Variant: {item.variantName}
                                </p>

                                <p className="text-sm text-gray-500 flex items-center gap-1">
                                    <MdLocalFireDepartment className="text-red-400" />
                                    Spice: {item.spiceLevel}
                                </p>

                                <p className="text-sm text-gray-500">
                                    Quantity: {item.quantity}
                                </p>

                                <p className="text-sm text-gray-500">
                                    Price: ₹{item.price}
                                </p>

                                <p className="text-sm text-orange-500 flex items-center gap-1 font-medium">
                                    <FaCoins />
                                    {item.creditPoints} Credits
                                </p>
                            </div>
                        </div>
                    ))}

                    {/* Footer */}
                    <div className="flex justify-between items-center border-t pt-3 mt-4">
                        <span className="text-sm text-gray-500">
                            Table: {order.tableNumber || "N/A"}
                        </span>

                        <span className="font-bold text-orange-600">
                            Total Credits: {order.totalCredits}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default OrderHistory;