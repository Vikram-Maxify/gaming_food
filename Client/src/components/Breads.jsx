import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Plus, Check, ChevronLeft, ChevronRight, Wheat } from "lucide-react";

const breadsList = [
  {
    name: "Tandoori Roti",
    price: "₹20",
    originalPrice: "₹35",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300&auto=format&fit=crop&q=80",
    isPopular: true,
  },
  {
    name: "Butter Naan",
    price: "₹45",
    originalPrice: "₹65",
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=300&auto=format&fit=crop&q=80",
    isPopular: true,
  },
  {
    name: "Garlic Naan",
    price: "₹55",
    originalPrice: "₹75",
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=300&auto=format&fit=crop&q=80",
    isPopular: false,
  },
  {
    name: "Missi Roti",
    price: "₹30",
    originalPrice: "₹45",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=300&auto=format&fit=crop&q=80",
    isPopular: false,
  },
  {
    name: "Lacha Paratha",
    price: "₹40",
    originalPrice: "₹60",
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=300&auto=format&fit=crop&q=80",
    isPopular: true,
  },
  {
    name: "Roomali Roti",
    price: "₹25",
    originalPrice: "₹40",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300&auto=format&fit=crop&q=80",
    isPopular: false,
  },
  {
    name: "Cheese Naan",
    price: "₹75",
    originalPrice: "₹99",
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=300&auto=format&fit=crop&q=80",
    isPopular: false,
  },
  {
    name: "Pudina Paratha",
    price: "₹50",
    originalPrice: "₹70",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=300&auto=format&fit=crop&q=80",
    isPopular: false,
  },
];

const Breads = () => {
  const [selected, setSelected] = useState([]);
  const scrollContainerRef = useRef(null);

  const toggleBread = (name) => {
    setSelected((prev) =>
      prev.includes(name)
        ? prev.filter((item) => item !== name)
        : [...prev, name]
    );
  };

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="mb-8">
      {/* Premium Header */}
      <div className="flex items-center justify-between px-4 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-1 h-6 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full"></div>
          <h3 className="text-lg font-bold text-gray-800">
            Breads
          </h3>
          <span className="text-[10px] bg-amber-100 text-amber-600 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
            <Wheat size={10} />
            Freshly Baked
          </span>
        </div>
        
        <Link to="/menu" className="group flex items-center gap-1 text-sm font-medium text-orange-500 hover:text-orange-600 transition-all duration-300">
          <span>Choose</span>
          <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>

      {/* Scroll Container with Navigation */}
      <div className="relative">
        {/* Left Gradient Fade */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none md:hidden"></div>
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none md:hidden"></div>
        
        {/* Desktop Scroll Buttons */}
        <div className="hidden md:flex absolute -left-3 top-1/2 -translate-y-1/2 z-20">
          <button 
            onClick={() => scroll('left')}
            className="p-2 rounded-full bg-white shadow-lg border border-gray-200 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all duration-300"
          >
            <ChevronLeft size={18} />
          </button>
        </div>
        <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20">
          <button 
            onClick={() => scroll('right')}
            className="p-2 rounded-full bg-white shadow-lg border border-gray-200 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all duration-300"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        <div 
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto scroll-smooth px-4 pb-4 no-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {breadsList.map((item, i) => {
            const isActive = selected.includes(item.name);

            return (
              <div
                key={i}
                onClick={() => toggleBread(item.name)}
                className={`group relative min-w-[130px] md:min-w-[140px] cursor-pointer rounded-2xl transition-all duration-300
                  ${isActive 
                    ? 'bg-orange-50 ring-2 ring-orange-500 shadow-lg' 
                    : 'bg-white shadow-sm hover:shadow-xl border border-gray-100'
                  } hover:-translate-y-1`}
              >
                {/* Popular Badge */}
                {item.isPopular && (
                  <div className="absolute -top-2 -right-2 z-20">
                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-md">
                      🔥 Popular
                    </div>
                  </div>
                )}

                {/* Image Container */}
                <div className="relative w-full h-24 md:h-28 rounded-t-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Active Check Overlay */}
                  {isActive && (
                    <div className="absolute inset-0 bg-orange-500/20 flex items-center justify-center">
                      <div className="bg-orange-500 rounded-full p-1 shadow-lg">
                        <Check size={16} className="text-white" />
                      </div>
                    </div>
                  )}
                  
                  {/* Gradient Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Content */}
                <div className="p-2.5">
                  <p className={`text-xs font-bold leading-tight transition-colors duration-300 line-clamp-1
                    ${isActive ? 'text-orange-600' : 'text-gray-800 group-hover:text-orange-500'}`}>
                    {item.name}
                  </p>
                  
                  {/* Price Section */}
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="text-xs font-bold text-orange-500">
                      {item.price}
                    </span>
                    <span className="text-[10px] text-gray-400 line-through">
                      {item.originalPrice}
                    </span>
                  </div>
                  
                  {/* Add/Selected Indicator */}
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[9px] text-gray-400">per piece</span>
                    {isActive ? (
                      <span className="text-[10px] font-medium text-orange-500 bg-orange-100 px-2 py-0.5 rounded-full">
                        Added
                      </span>
                    ) : (
                      <button className="bg-gray-100 text-gray-600 p-1 rounded-full hover:bg-orange-500 hover:text-white transition-all duration-300">
                        <Plus size={12} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Selected Summary Bar */}
      {selected.length > 0 && (
        <div className="fixed bottom-20 left-4 right-4 md:hidden z-40">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-3 shadow-2xl animate-slide-up">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white text-xs font-medium">Selected Breads</p>
                <p className="text-white text-lg font-bold">{selected.length} item(s)</p>
              </div>
              <button className="bg-white text-orange-500 px-4 py-2 rounded-full text-sm font-semibold hover:scale-105 transition-transform">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
      
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
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

export default Breads;