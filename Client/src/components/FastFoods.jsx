import React, { useRef } from "react";
import { Plus, ChevronLeft, ChevronRight, Star, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const fastFoods = [
  {
    name: "Veg Hakka Noodles",
    price: "₹149",
    rating: 4.5,
    time: "20-25 min",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&auto=format&fit=crop&q=80",
  },
  {
    name: "Paneer Chilli",
    price: "₹199",
    rating: 4.7,
    time: "15-20 min",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&auto=format&fit=crop&q=80",
  },
  {
    name: "Samosa Chaat",
    price: "₹99",
    rating: 4.3,
    time: "10-15 min",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&auto=format&fit=crop&q=80",
  },
  {
    name: "Pav Bhaji",
    price: "₹129",
    rating: 4.6,
    time: "15-20 min",
    image: "https://images.unsplash.com/photo-1617622141675-d3005b9067c5?w=500&auto=format&fit=crop&q=80",
  },
  {
    name: "Butter Chicken",
    price: "₹349",
    rating: 4.8,
    time: "25-30 min",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500&auto=format&fit=crop&q=80",
  },
  {
    name: "Chicken Biryani",
    price: "₹299",
    rating: 4.7,
    time: "20-25 min",
    image: "https://images.unsplash.com/photo-1563379091339-03b21dd4a433?w=500&auto=format&fit=crop&q=80",
  },
  {
    name: "Tandoori Chicken",
    price: "₹399",
    rating: 4.9,
    time: "25-30 min",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=500&auto=format&fit=crop&q=80",
  },
  {
    name: "Garlic Bread",
    price: "₹89",
    rating: 4.2,
    time: "5-10 min",
    image: "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=500&auto=format&fit=crop&q=80",
  },
];

const FastFoods = () => {
  const scrollContainerRef = useRef(null);

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
            Most Loved Items
          </h3>
          <span className="text-[10px] bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full font-medium">
            🔥 Best Seller
          </span>
        </div>
        
        <Link to="/menu" className="group flex items-center gap-1 text-sm font-medium text-orange-500 hover:text-orange-600 transition-all duration-300">
          <span>See All</span>
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
          {fastFoods.map((item, i) => (
            <div
              key={i}
              className="group relative min-w-[180px] md:min-w-[200px] bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
            >
              {/* Image Container with Overlay */}
              <div className="relative w-full h-32 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Rating Badge */}
                <div className="absolute top-2 left-2 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full shadow-sm">
                  <Star size={10} className="text-yellow-500 fill-yellow-500" />
                  <span className="text-[10px] font-semibold text-gray-800">{item.rating}</span>
                </div>
                
                {/* Time Badge */}
                <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-full">
                  <Clock size={10} className="text-white" />
                  <span className="text-[9px] text-white font-medium">{item.time}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-3">
                <h4 className="text-sm font-bold text-gray-800 leading-tight line-clamp-1 group-hover:text-orange-500 transition-colors duration-300">
                  {item.name}
                </h4>
                
                {/* Price and Cart Button */}
                <div className="flex items-center justify-between mt-2">
                  <div>
                    <span className="text-xs text-gray-400 line-through">₹{parseInt(item.price.slice(1)) + 50}</span>
                    <span className="text-base font-bold text-orange-500 ml-1">
                      {item.price}
                    </span>
                  </div>

                  <button className="relative group/btn bg-gradient-to-r from-orange-500 to-orange-600 text-white p-2 rounded-full hover:shadow-lg hover:shadow-orange-200 transition-all duration-300 active:scale-95">
                    <Plus size={14} />
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] px-2 py-1 rounded-full opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                      Add to cart
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
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
      `}</style>
    </div>
  );
};

export default FastFoods;