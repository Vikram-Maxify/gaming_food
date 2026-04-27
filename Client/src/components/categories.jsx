import React, { useRef } from "react";
import { ChevronLeft, ChevronRight, TrendingUp } from "lucide-react";

const categories = [
    { name: "Burger", image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=200&auto=format&fit=crop&q=60", hasOffer: true },
    { name: "Pizza", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&auto=format&fit=crop&q=60", hasOffer: false },
    { name: "Drinks", image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=200&auto=format&fit=crop&q=60", hasOffer: true },
    { name: "Dessert", image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=200&auto=format&fit=crop&q=60", hasOffer: false },
    { name: "Noodles", image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=200&auto=format&fit=crop&q=60", hasOffer: false },
    { name: "Salad", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200&auto=format&fit=crop&q=60", hasOffer: true },
    { name: "Seafood", image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=200&auto=format&fit=crop&q=60", hasOffer: false },
    { name: "Breakfast", image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=200&auto=format&fit=crop&q=60", hasOffer: false },
    { name: "Sushi", image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=200&auto=format&fit=crop&q=60", hasOffer: true },
    { name: "Tacos", image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=200&auto=format&fit=crop&q=60", hasOffer: false },
    { name: "Ice Cream", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=200&auto=format&fit=crop&q=60", hasOffer: false },
    { name: "Healthy", image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=200&auto=format&fit=crop&q=60", hasOffer: true },
];

const Categories = () => {
    const scrollContainerRef = useRef(null);

    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            const scrollAmount = direction === 'left' ? -200 : 200;
            scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div className="mb-6">
            {/* Header Section - Premium Style */}
            <div className="flex items-center justify-between px-4 mb-4">
                <div className="flex items-center gap-2">
                    <div className="w-1 h-6 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full"></div>
                    <h3 className="text-lg font-bold text-gray-800">
                        Food Categories
                    </h3>
                    <div className="flex items-center gap-1 ml-2">
                        <TrendingUp size={14} className="text-orange-500" />
                        <span className="text-[10px] text-orange-500 font-medium">Trending</span>
                    </div>
                </div>
                
                {/* Scroll Buttons - Desktop Only */}
                <div className="hidden md:flex gap-2">
                    <button 
                        onClick={() => scroll('left')}
                        className="p-1.5 rounded-full bg-gray-100 hover:bg-orange-500 hover:text-white transition-all duration-300 shadow-sm"
                    >
                        <ChevronLeft size={16} />
                    </button>
                    <button 
                        onClick={() => scroll('right')}
                        className="p-1.5 rounded-full bg-gray-100 hover:bg-orange-500 hover:text-white transition-all duration-300 shadow-sm"
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>

            {/* Scroll Container - Premium Horizontal Scroller */}
            <div className="relative">
                {/* Gradient Fade Edges */}
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none md:hidden"></div>
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none md:hidden"></div>
                
                <div 
                    ref={scrollContainerRef}
                    className="flex gap-3 overflow-x-auto scroll-smooth px-4 pb-3 no-scrollbar"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {categories.map((cat, i) => (
                        <div
                            key={i}
                            className="group relative min-w-[85px] cursor-pointer pt-4"
                        >
                            {/* Card Container */}
                            <div className="relative bg-white rounded-2xl p-3 flex flex-col items-center 
                                          shadow-sm hover:shadow-xl transition-all duration-300 
                                          border border-gray-100 hover:border-orange-200
                                          hover:-translate-y-1">
                                
                                {/* Offer Badge */}
                                {cat.hasOffer && (
                                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-orange-600 
                                                  text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full shadow-md z-20">
                                        20% OFF
                                    </div>
                                )}
                                
                                {/* Image Container with Gradient Ring */}
                                <div className="relative mb-2">
                                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-orange-400/20 
                                                  rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    </div>
                                    <img
                                        src={cat.image}
                                        alt={cat.name}
                                        className="w-14 h-14 object-cover rounded-full 
                                                 ring-2 ring-gray-100 group-hover:ring-orange-300 
                                                 transition-all duration-300 group-hover:scale-110"
                                    />
                                    {/* Active Indicator Dot */}
                                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 
                                                  bg-orange-500 rounded-full opacity-0 group-hover:opacity-100 
                                                  transition-opacity duration-300"></div>
                                </div>

                                {/* Category Name */}
                                <p className="text-xs font-semibold text-gray-700 group-hover:text-orange-500 
                                           transition-colors duration-300">
                                    {cat.name}
                                </p>
                                
                                {/* Item Count (Mock) */}
                                <p className="text-[9px] text-gray-400 mt-0.5">
                                    {Math.floor(Math.random() * 30) + 10} items
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Custom Scrollbar Hide Styles */}
            <style jsx>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </div>
    );
};

export default Categories;