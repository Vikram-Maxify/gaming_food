import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getOrders } from "../redux/slice/adminOrderSlice";
import { getUsers } from "../redux/slice/adminSlice";

import {
    BarChart, Bar, XAxis, Tooltip, ResponsiveContainer,
    LineChart, Line
} from "recharts";

const Dashboard = () => {
    const dispatch = useDispatch();

    const { orders } = useSelector((state) => state.order);
    const { users } = useSelector((state) => state.admin);
    console.log(users);
    console.log(orders)

    useEffect(() => {
        dispatch(getOrders());
        dispatch(getUsers());
    }, [dispatch]);

    // 🔥 DATE LOGIC
    const today = new Date().toDateString();
    const yesterdayDate = new Date();
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);

    const todayOrders = orders.filter(
        o => new Date(o.createdAt).toDateString() === today
    );

    const yesterdayOrders = orders.filter(
        o => new Date(o.createdAt).toDateString() === yesterdayDate.toDateString()
    );

    const calcRevenue = (list) =>
        list.reduce(
            (sum, o) =>
                sum + o.items.reduce((s, i) => s + i.price * i.quantity, 0),
            0
        );

    const todayRevenue = calcRevenue(todayOrders);
    const yesterdayRevenue = calcRevenue(yesterdayOrders);

    const todayCustomers = new Set(todayOrders.map(o => o.user)).size;
    const yesterdayCustomers = new Set(yesterdayOrders.map(o => o.user)).size;

    const todayCancelled = todayOrders.filter(o => o.status === "cancelled").length;
    const yesterdayCancelled = yesterdayOrders.filter(o => o.status === "cancelled").length;

    const getPercent = (today, yesterday) => {
        if (!yesterday) return 0;
        return (((today - yesterday) / yesterday) * 100).toFixed(1);
    };

    // 🔥 DAILY GRAPH (7 DAYS)
    const last7Days = Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (6 - i));

        const dayString = d.toDateString();

        const revenue = orders
            .filter(o => new Date(o.createdAt).toDateString() === dayString)
            .reduce((sum, o) => {
                return sum + o.items.reduce((s, it) => s + it.price * it.quantity, 0);
            }, 0);

        return {
            name: d.toLocaleDateString("en-US", { weekday: "short" }),
            revenue,
        };
    });

    // 🔥 TRENDING ITEMS
    const itemMap = {};
    orders.forEach(o => {
        o.items.forEach(i => {
            const name = i.product?.name;
            if (!itemMap[name]) itemMap[name] = { count: 0, image: i.product?.image };
            itemMap[name].count += i.quantity;
        });
    });

    const trending = Object.entries(itemMap)
        .map(([name, data]) => ({ name, ...data }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 4);

    const bestItem = trending[0];

    // 🔥 RECENT ORDERS
    const recentOrders = [...orders]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);

    return (
        <div className="p-6 space-y-6">

            {/* 🔥 TOP CARDS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

                <Card title="Today's Income" value={`₹${todayRevenue}`} sub={`Since Yesterday ₹${yesterdayRevenue}`} percent={getPercent(todayRevenue, yesterdayRevenue)} />

                <Card title="Today's Orders" value={todayOrders.length} sub={`Since Yesterday ${yesterdayOrders.length}`} percent={getPercent(todayOrders.length, yesterdayOrders.length)} />

                <Card title="Today's Customers" value={todayCustomers} sub={`Since Yesterday ${yesterdayCustomers}`} percent={getPercent(todayCustomers, yesterdayCustomers)} />

                <Card title="Canceled Order" value={todayCancelled} sub={`Since Yesterday ${yesterdayCancelled}`} percent={getPercent(todayCancelled, yesterdayCancelled)} />

            </div>

            {/* 🔥 MAIN GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* LEFT */}
                <div className="lg:col-span-2 space-y-6">

                    {/* 🔥 DAILY REVENUE CHART */}
                    <div className="bg-cardGradient border border-borderSubtle rounded-xl2 p-5">
                        <h3 className="text-textPrimary mb-4">Daily Revenue</h3>

                        <ResponsiveContainer width="100%" height={220}>
                            <BarChart data={last7Days}>
                                <XAxis dataKey="name" stroke="#aaa" />

                                <Tooltip
                                    contentStyle={{
                                        background: "#1A1A1A",
                                        border: "1px solid rgba(255,255,255,0.1)",
                                        borderRadius: "10px",
                                    }}
                                />

                                <Bar
                                    dataKey="revenue"
                                    fill="#FF7A18"
                                    radius={[10, 10, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* 🔥 RECENT ORDERS */}
                    {/* 🔥 RECENT ORDERS TABLE */}
                    <div className="bg-cardGradient border border-borderSubtle rounded-xl2 shadow-soft overflow-hidden">

                        {/* Header */}
                        <div className="px-5 py-4 border-b border-borderSubtle">
                            <h3 className="text-lg font-semibold text-textPrimary">
                                Recent Orders
                            </h3>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">

                            <table className="w-full text-sm">

                                {/* THEAD */}
                                <thead>
                                    <tr className="text-textSecondary text-xs border-b border-borderSubtle">
                                        <th className="px-5 py-3 text-left">Item</th>
                                        <th className="px-5 py-3 text-left">Customer</th>
                                        <th className="px-5 py-3 text-left">Qty</th>
                                        <th className="px-5 py-3 text-left">Price</th>
                                        <th className="px-5 py-3 text-left">Status</th>
                                    </tr>
                                </thead>

                                {/* TBODY */}
                                <tbody>
                                    {recentOrders.map((order) => {

                                        const total = order.items.reduce(
                                            (s, i) => s + i.price * i.quantity,
                                            0
                                        );

                                        const totalQty = order.items.reduce(
                                            (s, i) => s + i.quantity,
                                            0
                                        );

                                        return (
                                            <tr
                                                key={order._id}
                                                className="border-b border-borderSubtle hover:bg-[#1A1A1A] transition"
                                            >

                                                {/* ITEM */}
                                                <td className="px-5 py-3 flex items-center gap-3">
                                                    <img
                                                        src={order.items[0]?.product?.image}
                                                        className="w-10 h-10 rounded-lg object-cover border border-borderSubtle"
                                                    />
                                                    <span className="text-textPrimary font-medium">
                                                        {order.items[0]?.product?.name}
                                                    </span>
                                                </td>

                                                {/* CUSTOMER */}
                                                <td className="px-5 py-3 text-textSecondary">
                                                    {order.user?.name || "Guest"}
                                                </td>

                                                {/* QTY */}
                                                <td className="px-5 py-3 text-textPrimary font-medium">
                                                    {totalQty}
                                                </td>

                                                {/* PRICE */}
                                                <td className="px-5 py-3 text-primary font-semibold">
                                                    ₹{total}
                                                </td>

                                                {/* STATUS */}
                                                <td className="px-5 py-3">
                                                    <span
                                                        className={`px-2 py-1 text-xs rounded-full border ${order.status === "pending"
                                                                ? "bg-warning/20 text-warning border-warning/30"
                                                                : order.status === "preparing"
                                                                    ? "bg-primary/20 text-primary border-primary/30"
                                                                    : "bg-success/20 text-success border-success/30"
                                                            }`}
                                                    >
                                                        {order.status}
                                                    </span>
                                                </td>

                                            </tr>
                                        );
                                    })}
                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

                {/* RIGHT */}
                <div className="space-y-6">

                    {/* BEST ITEM */}
                    {bestItem && (
                        <div className="bg-cardGradient border border-borderSubtle p-5 rounded-xl2 text-center">
                            <h3 className="text-textPrimary mb-3">Weekly Best Item</h3>

                            <img src={bestItem.image} className="w-24 h-24 rounded-full mx-auto mb-2 object-cover" />

                            <p className="text-textPrimary">{bestItem.name}</p>
                            <p className="text-primary text-sm">{bestItem.count} orders</p>
                        </div>
                    )}

                    {/* TRENDING */}
                    <div className="bg-cardGradient border border-borderSubtle p-5 rounded-xl2">
                        <h3 className="text-textPrimary mb-3">Trending Menu</h3>

                        {trending.map((item, i) => (
                            <div key={i} className="flex justify-between items-center mb-2">
                                <div className="flex gap-2 items-center">
                                    <img src={item.image} className="w-8 h-8 rounded object-cover" />
                                    <p className="text-textPrimary text-sm">{item.name}</p>
                                </div>
                                <span className="text-primary">{item.count}</span>
                            </div>
                        ))}
                    </div>

                    {/* CUSTOMER GRAPH */}
                    <div className="bg-cardGradient border border-borderSubtle p-5 rounded-xl2">
                        <h3 className="text-textPrimary mb-3">Customer Activity</h3>

                        <ResponsiveContainer width="100%" height={150}>
                            <LineChart data={last7Days}>
                                <Line type="monotone" dataKey="revenue" stroke="#FF7A18" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                </div>

            </div>

        </div>
    );
};

// 🔥 CARD COMPONENT
const Card = ({ title, value, sub, percent }) => {
    const isUp = percent >= 0;

    return (
        <div className="bg-cardGradient border border-borderSubtle p-5 rounded-xl2 shadow-soft">

            <p className="text-sm text-textSecondary">{title}</p>

            <h3 className="text-2xl text-textPrimary mt-2">{value}</h3>

            <div className="flex justify-between mt-2">

                <p className="text-xs text-textSecondary">{sub}</p>

                <span className={`text-xs px-2 py-1 rounded ${isUp ? "bg-success/20 text-success" : "bg-danger/20 text-danger"
                    }`}>
                    {isUp ? "↑" : "↓"} {Math.abs(percent)}%
                </span>

            </div>

        </div>
    );
};

export default Dashboard;