import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const OrderStatusBanner = () => {
    const { currentOrder } = useSelector((state) => state.order);

    if (!currentOrder) return null;

    const itemName = currentOrder.items?.[0]?.productName;

    const getStatusUI = () => {
        switch (currentOrder.status) {
            case "pending":
                return { text: "Preparing", color: "bg-yellow-500" };
            case "completed":
                return { text: "Ready", color: "bg-green-500" };
            case "cancelled":
                return { text: "Cancelled", color: "bg-red-500" };
            default:
                return { text: currentOrder.status, color: "bg-gray-500" };
        }
    };

    const status = getStatusUI();

    return (
        <div className="fixed bottom-16 left-0 right-0 z-50 px-4 animate-slide-up mb-10">
            <div className="bg-white shadow-xl rounded-2xl border border-gray-100 overflow-hidden">

                <div className={`h-1 ${status.color}`}></div>

                <div className="flex items-center justify-between p-4">
                    <div>
                        <p className="text-xs text-gray-400">Your Order</p>
                        <p className="font-semibold text-gray-800">
                            {status.text} {itemName}
                        </p>
                    </div>

                    <Link
                        to="/orders"
                        className="text-orange-500 font-semibold text-sm"
                    >
                        Track →
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OrderStatusBanner;