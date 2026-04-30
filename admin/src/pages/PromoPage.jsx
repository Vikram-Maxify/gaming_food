import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPromo, getAllPromos, deletePromo } from "../redux/slice/promoSlice";

export default function PromoPage() {
    const dispatch = useDispatch();
    const { promos = [], loading } = useSelector((state) => state.promo);

    const [form, setForm] = useState({
        code: "",
        discountType: "percentage",
        discountValue: "",
        minOrderAmount: "",
        maxDiscount: "",
    });

    useEffect(() => {
        dispatch(getAllPromos());
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(createPromo({
            ...form,
            discountValue: Number(form.discountValue),
            minOrderAmount: Number(form.minOrderAmount) || 0,
            maxDiscount: Number(form.maxDiscount) || 0,
        }));

        setForm({
            code: "",
            discountType: "percentage",
            discountValue: "",
            minOrderAmount: "",
            maxDiscount: "",
        });
    };

    const handleDelete = (id) => {
        if (confirm("Delete this promo?")) {
            dispatch(deletePromo(id));
        }
    };

    return (
        <div className="p-6 min-h-screen bg-[#0f0f0f] text-white">

            {/* HEADER */}
            <div className="mb-6 border-b border-gray-800 pb-4">
                <h2 className="text-2xl font-bold">🎟 Promo Manager</h2>
                <p className="text-sm text-gray-400">
                    Advanced discount system
                </p>
            </div>

            {/* FORM */}
            <form
                onSubmit={handleSubmit}
                className="bg-[#151515] border border-gray-800 rounded-xl p-4 mb-6 grid md:grid-cols-5 gap-3"
            >
                {/* CODE */}
                <input
                    type="text"
                    placeholder="Code"
                    value={form.code}
                    onChange={(e) => setForm({ ...form, code: e.target.value })}
                    className="bg-[#0f0f0f] border border-gray-700 rounded px-3 py-2 text-sm"
                />

                {/* TYPE */}
                <select
                    value={form.discountType}
                    onChange={(e) =>
                        setForm({ ...form, discountType: e.target.value })
                    }
                    className="bg-[#0f0f0f] border border-gray-700 rounded px-2 text-sm"
                >
                    <option value="percentage">%</option>
                    <option value="flat">₹ Flat</option>
                </select>

                {/* VALUE */}
                <input
                    type="number"
                    placeholder="Value"
                    value={form.discountValue}
                    onChange={(e) =>
                        setForm({ ...form, discountValue: e.target.value })
                    }
                    className="bg-[#0f0f0f] border border-gray-700 rounded px-3 py-2 text-sm"
                />

                {/* MIN ORDER */}
                <input
                    type="number"
                    placeholder="Min Order"
                    value={form.minOrderAmount}
                    onChange={(e) =>
                        setForm({ ...form, minOrderAmount: e.target.value })
                    }
                    className="bg-[#0f0f0f] border border-gray-700 rounded px-3 py-2 text-sm"
                />

                {/* MAX DISCOUNT */}
                {form.discountType === "percentage" && (
                    <input
                        type="number"
                        placeholder="Max Cap"
                        value={form.maxDiscount}
                        onChange={(e) =>
                            setForm({ ...form, maxDiscount: e.target.value })
                        }
                        className="bg-[#0f0f0f] border border-gray-700 rounded px-3 py-2 text-sm"
                    />
                )}

                {/* BUTTON */}
                <button
                    type="submit"
                    className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded text-sm font-semibold md:col-span-5"
                >
                    Create Promo
                </button>
            </form>

            {/* LIST */}
            {loading ? (
                <p className="text-gray-400">Loading promos...</p>
            ) : promos.length === 0 ? (
                <p className="text-gray-500">No promos found</p>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {promos.map((promo) => (
                        <div
                            key={promo._id}
                            className="bg-[#151515] border border-gray-800 rounded-xl p-4 hover:border-orange-500 transition"
                        >
                            <div className="flex justify-between items-center">
                                <p className="text-lg font-bold text-orange-400">
                                    {promo.code}
                                </p>

                                <button
                                    onClick={() => handleDelete(promo._id)}
                                    className="text-xs bg-red-500 px-2 py-1 rounded"
                                >
                                    Delete
                                </button>
                            </div>

                            <p className="text-sm text-gray-400 mt-1">
                                {promo.discountType === "percentage"
                                    ? `${promo.discountValue}% OFF`
                                    : `₹${promo.discountValue} OFF`}
                            </p>

                            <p className="text-xs text-gray-500 mt-1">
                                Min Order: ₹{promo.minOrderAmount}
                            </p>

                            {promo.maxDiscount && (
                                <p className="text-xs text-gray-500">
                                    Max Discount: ₹{promo.maxDiscount}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}