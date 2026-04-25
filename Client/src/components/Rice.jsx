import React, { useState } from "react";
import { Plus, Check, Star, Flame, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const riceItems = [
    {
        name: "Chicken Fried Rice",
        price: "₹220",
        originalPrice: "₹299",
        image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&auto=format&fit=crop&q=80",
        rating: 4.7,
        isVeg: false,
        isSpicy: true,
        isPopular: true,
    },
    {
        name: "Veg Biryani",
        price: "₹200",
        originalPrice: "₹279",
        image: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=400&auto=format&fit=crop&q=80",
        rating: 4.5,
        isVeg: true,
        isSpicy: true,
        isPopular: true,
    },
    {
        name: "Chicken Biryani",
        price: "₹299",
        originalPrice: "₹399",
        image: "https://images.unsplash.com/photo-1563379091339-03b21dd4a433?w=400&auto=format&fit=crop&q=80",
        rating: 4.9,
        isVeg: false,
        isSpicy: true,
        isPopular: true,
    },
    {
        name: "Egg Fried Rice",
        price: "₹180",
        originalPrice: "₹249",
        image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&auto=format&fit=crop&q=80",
        rating: 4.3,
        isVeg: false,
        isSpicy: false,
        isPopular: false,
    },
    {
        name: "Mushroom Biryani",
        price: "₹240",
        originalPrice: "₹319",
        image: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=400&auto=format&fit=crop&q=80",
        rating: 4.4,
        isVeg: true,
        isSpicy: true,
        isPopular: false,
    },
    {
        name: "Prawn Fried Rice",
        price: "₹350",
        originalPrice: "₹449",
        image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&auto=format&fit=crop&q=80",
        rating: 4.8,
        isVeg: false,
        isSpicy: true,
        isPopular: false,
    },
    {
        name: "Curd Rice",
        price: "₹120",
        originalPrice: "₹169",
        image: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=400&auto=format&fit=crop&q=80",
        rating: 4.2,
        isVeg: true,
        isSpicy: false,
        isPopular: false,
    },
    {
        name: "Jeera Rice",
        price: "₹150",
        originalPrice: "₹199",
        image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&auto=format&fit=crop&q=80",
        rating: 4.3,
        isVeg: true,
        isSpicy: false,
        isPopular: false,
    },
];

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
        <div className="mb-8">
            {/* Premium Header */}
            <div className="flex items-center justify-between px-4 mb-5">
                <div className="flex items-center gap-2">
                    <div className="w-1 h-6 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full"></div>
                    <h3 className="text-lg font-bold text-gray-800">
                        Rice & Biryani
                    </h3>
                    <span className="text-[10px] bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                        <Flame size={10} />
                        Best Sellers
                    </span>
                </div>
                
                <Link to="/menu" className="group flex items-center gap-1 text-sm font-medium text-orange-500 hover:text-orange-600 transition-all duration-300">
                    <span>Add on</span>
                    <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
                {riceItems.map((item, i) => {
                    const isActive = selected.includes(item.name);

                    return (
                        <div
                            key={i}
                            onClick={() => toggle(item.name)}
                            className={`group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border cursor-pointer
                                ${isActive ? 'ring-2 ring-orange-500 shadow-lg' : 'border-gray-100'}`}
                        >
                            {/* Image Container */}
                            <div className="relative w-full h-40 md:h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    loading="lazy"
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                
                                {/* Dark Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                
                                {/* Popular Badge */}
                                {item.isPopular && (
                                    <div className="absolute top-2 left-2 z-10">
                                        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-md flex items-center gap-1">
                                            <Flame size={8} />
                                            Popular
                                        </div>
                                    </div>
                                )}
                                
                                {/* Veg/Non-Veg Badge */}
                                <div className="absolute top-2 right-2">
                                    <div className={`w-4 h-4 rounded-full border-2 ${item.isVeg ? 'border-green-600' : 'border-red-600'} bg-white flex items-center justify-center shadow-sm`}>
                                        <div className={`w-2 h-2 rounded-full ${item.isVeg ? 'bg-green-600' : 'bg-red-600'}`}></div>
                                    </div>
                                </div>
                                
                                {/* Rating Badge */}
                                <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-white/95 backdrop-blur-sm px-2 py-0.5 rounded-full shadow-md">
                                    <Star size={10} className="text-yellow-500 fill-yellow-500" />
                                    <span className="text-[10px] font-bold text-gray-800">{item.rating}</span>
                                </div>
                                
                                {/* Active Check Overlay */}
                                {isActive && (
                                    <div className="absolute inset-0 bg-orange-500/30 flex items-center justify-center backdrop-blur-[2px]">
                                        <div className="bg-orange-500 rounded-full p-1.5 shadow-lg transform scale-100 animate-pulse">
                                            <Check size={18} className="text-white" />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-3">
                                <h4 className={`text-sm font-bold leading-tight line-clamp-1 transition-colors duration-300
                                    ${isActive ? 'text-orange-600' : 'text-gray-800 group-hover:text-orange-500'}`}>
                                    {item.name}
                                </h4>
                                
                                {/* Price Section */}
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-xs text-gray-400 line-through">{item.originalPrice}</span>
                                    <span className="text-base font-bold text-orange-500">
                                        {item.price}
                                    </span>
                                </div>
                                
                                {/* Order Info & Add Button */}
                                <div className="flex items-center justify-between mt-2">
                                    <div className="flex items-center gap-1">
                                        <div className="flex items-center gap-0.5">
                                            <Star size={10} className="text-yellow-500 fill-yellow-500" />
                                            <span className="text-[10px] font-medium text-gray-600">{item.rating}</span>
                                        </div>
                                        <span className="text-[10px] text-gray-300">•</span>
                                        <span className="text-[10px] text-gray-400">1k+ orders</span>
                                    </div>
                                    
                                    {isActive ? (
                                        <span className="text-[10px] font-medium text-orange-500 bg-orange-100 px-2 py-1 rounded-full">
                                            Selected ✓
                                        </span>
                                    ) : (
                                        <button className="relative group/btn bg-gradient-to-r from-orange-500 to-orange-600 text-white p-1.5 rounded-full hover:shadow-lg hover:shadow-orange-200 transition-all duration-300 active:scale-95">
                                            <Plus size={14} />
                                            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] px-2 py-1 rounded-full opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                                                Add to cart
                                            </span>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            
            {/* Selected Summary Bar */}
            {selected.length > 0 && (
                <div className="fixed bottom-20 left-4 right-4 md:bottom-8 md:left-auto md:right-8 md:w-80 z-40">
                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-4 shadow-2xl animate-slide-up">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-white text-xs font-medium">Selected Items</p>
                                <p className="text-white text-2xl font-bold">{selected.length}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-white/80 text-xs">Total</p>
                                <p className="text-white text-lg font-bold">
                                    ₹{riceItems
                                        .filter(item => selected.includes(item.name))
                                        .reduce((sum, item) => sum + parseInt(item.price.slice(1)), 0)}
                                </p>
                            </div>
                            <button className="bg-white text-orange-500 px-4 py-2 rounded-full text-sm font-semibold hover:scale-105 transition-transform">
                                Add All
                            </button>
                        </div>
                    </div>
                </div>
            )}
            
            <style jsx>{`
                .line-clamp-1 {
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                @keyframes slide-up {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-slide-up {
                    animation: slide-up 0.3s ease-out;
                }
            `}</style>
        </div>
    );
};

export default Rice;