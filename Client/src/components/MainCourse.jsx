import React from "react";
import { Plus } from "lucide-react";

const mainCourse = [
    {
        name: "Grilled Chicken",
        price: "₹349",
        image:
            "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=500&auto=format&fit=crop&q=80",
    },
    {
        name: "Veg Pasta",
        price: "₹249",
        image:
            "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=500&auto=format&fit=crop&q=80",
    },
    {
        name: "Paneer Tikka",
        price: "₹299",
        image:
            "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500&auto=format&fit=crop&q=80",
    },
    {
        name: "Paneer Tikka",
        price: "₹299",
        image:
            "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500&auto=format&fit=crop&q=80",
    },
    {
        name: "Paneer Tikka",
        price: "₹299",
        image:
            "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500&auto=format&fit=crop&q=80",
    },
    {
        name: "Paneer Tikka",
        price: "₹299",
        image:
            "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500&auto=format&fit=crop&q=80",
    },
    {
        name: "Paneer Tikka",
        price: "₹299",
        image:
            "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500&auto=format&fit=crop&q=80",
    },
    {
        name: "Paneer Tikka",
        price: "₹299",
        image:
            "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500&auto=format&fit=crop&q=80",
    },
    {
        name: "Paneer Tikka",
        price: "₹299",
        image:
            "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500&auto=format&fit=crop&q=80",
    },{
        name: "Paneer Tikka",
        price: "₹299",
        image:
            "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500&auto=format&fit=crop&q=80",
    },
    
];

const fallback =
    "https://via.placeholder.com/300x200?text=Food";

const MainCourse = () => {
    return (
        <div className="mb-6">

            {/* Heading */}
            <div className="flex items-center justify-between mb-3 px-4 md:px-24">
                <h3 className="text-base md:text-lg font-semibold text-white md:text-black">
                    Main Course
                </h3>
                <span className="text-xs text-text-secondary">See all</span>
            </div>

            {/* Scroll */}
            <div className="flex gap-4 overflow-x-auto no-scrollbar px-4 md:px-24">

                {mainCourse.map((item, i) => (
                    <div
                        key={i}
                        className="min-w-[160px] bg-white rounded-lg shadow-md overflow-hidden"
                    >

                        {/* Image */}
                        <div className="w-full h-28 overflow-hidden">
                            <img
                                src={item.image}
                                alt={item.name}
                                onError={(e) => (e.currentTarget.src = fallback)}
                                loading="lazy"
                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                            />
                        </div>

                        {/* Content */}
                        <div className="p-2">
                            <h4 className="text-sm font-medium text-gray-800">
                                {item.name}
                            </h4>

                            <div className="flex items-center justify-between mt-1">
                                <span className="text-sm font-semibold">
                                    {item.price}
                                </span>

                                <button className="bg-orange-500 text-white p-1.5 rounded-full active:scale-95 transition">
                                    <Plus size={14} />
                                </button>
                            </div>
                        </div>

                    </div>
                ))}

            </div>
        </div>
    );
};

export default MainCourse;