import React, { useState } from "react";
import { Plus } from "lucide-react";

const riceItems = [
    {
        name: "Steamed Rice",
        price: "₹120",
        image:
            "https://images.unsplash.com/photo-1604909053192-1a6e1b3b2a3c?w=400&auto=format&fit=crop&q=80",
    },
    {
        name: "Veg Fried Rice",
        price: "₹180",
        image:
            "https://images.unsplash.com/photo-1589308078054-8328f7f06c1a?w=400&auto=format&fit=crop&q=80",
    },
    {
        name: "Chicken Fried Rice",
        price: "₹220",
        image:
            "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&auto=format&fit=crop&q=80",
    },
    {
        name: "Veg Biryani",
        price: "₹200",
        image:
            "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=400&auto=format&fit=crop&q=80",
    },
    {
        name: "Chicken Biryani",
        price: "₹260",
        image:
            "https://images.unsplash.com/photo-1604908176997-431c6f5c8c1d?w=400&auto=format&fit=crop&q=80",
    },
];

// const fallback =
//     "https://via.placeholder.com/300x200?text=Rice";

const Rice = () => {
    const [selected, setSelected] = useState([]);

    const toggle = (name) => {
        setSelected((prev) =>
            prev.includes(name)
                ? prev.filter((i) => i !== name)
                : [...prev, name]
        );
    };

    return (
        <div className="mb-6">

            {/* Heading */}
            <div className="flex items-center justify-between mb-3 px-1">
                <h3 className="text-sm font-semibold text-text-primary">
                    Rice
                </h3>
                <span className="text-xs text-text-secondary">
                    Add-on
                </span>
            </div>

            {/* SAME GRID SYSTEM */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">

                {riceItems.map((item, i) => {
                    const isActive = selected.includes(item.name);

                    return (
                        <div
                            key={i}
                            onClick={() => toggle(item.name)}
                            className={`bg-card rounded-xl2 p-2 shadow-sm transition cursor-pointer ${isActive ? "ring-2 ring-primary" : ""
                                }`}
                        >

                            {/* Image */}
                            <div className="w-full h-28 bg-secondary rounded-xl overflow-hidden mb-2">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    onError={(e) => (e.currentTarget.src = fallback)}
                                    loading="lazy"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Info */}
                            <div className="px-1">
                                <h4 className="text-sm font-medium text-text-primary">
                                    {item.name}
                                </h4>

                                <div className="flex items-center justify-between mt-1">
                                    <span className="text-sm font-semibold">
                                        {item.price}
                                    </span>

                                    <div className="bg-primary text-white p-1.5 rounded-full">
                                        <Plus size={14} />
                                    </div>
                                </div>
                            </div>

                        </div>
                    );
                })}

            </div>
        </div>
    );
};

export default Rice;