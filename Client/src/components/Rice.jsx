import React, { useState } from "react";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

const riceItems = [

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
        name: "Veg Biryani",
        price: "₹200",
        image:
            "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=400&auto=format&fit=crop&q=80",
    },
    {
        name: "Veg Biryani",
        price: "₹200",
        image:
            "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=400&auto=format&fit=crop&q=80",
    },
    {
        name: "Veg Biryani",
        price: "₹200",
        image:
            "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=400&auto=format&fit=crop&q=80",
    },
    {
        name: "Veg Biryani",
        price: "₹200",
        image:
            "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=400&auto=format&fit=crop&q=80",
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
            <div className="flex items-center justify-between mb-3 px-4 md:px-24">
                <h3 className="text-base md:text-lg  font-semibold text-white md:text-black">
                    Rice
                </h3>
               <Link to = "/menu"><span className="text-sm md:text-base text-white md:text-black">Add on</span></Link>
            </div>

            {/* SAME GRID SYSTEM */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-4 md:px-24">

                {riceItems.map((item, i) => {
                    const isActive = selected.includes(item.name);

                    return (
                        <div
                            key={i}
                            onClick={() => toggle(item.name)}
                            className={`bg-card rounded-xl shadow-sm transition cursor-pointer ${isActive ? "ring-2 ring-primary" : ""
                                }`}
                        >

                            {/* Image */}
                            <div className="w-full h-52 bg-secondary rounded-xl overflow-hidden mb-2">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    onError={(e) => (e.currentTarget.src = fallback)}
                                    loading="lazy"
                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                />
                            </div>

                            {/* Info */}
                            <div className="px-2">
                                <h4 className="text-sm font-semibold text-black">
                                    {item.name}
                                </h4>

                                <div className="flex items-center justify-between mt-1">
                                    <span className="text-sm font-semibold text-gray-500">
                                        {item.price}
                                    </span>

                                    <div className="bg-green-600 text-white p-1.5 rounded-full -translate-y-2 hover:bg-green-800">
                                        <Plus size={16} />
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