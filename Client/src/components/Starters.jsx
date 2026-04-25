import React, { useState } from "react";
import { Plus, Star, Flame, ChevronRight, Check } from "lucide-react";
import { Link } from "react-router-dom";

const starters = [
  {
    name: "Paneer Tikka",
    type: "veg",
    price: "₹219",
    originalPrice: "₹299",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500&auto=format&fit=crop&q=80",
    rating: 4.7,
    time: "15-20 min",
    isPopular: true,
  },
  {
    name: "Chicken Lollipop",
    type: "nonveg",
    price: "₹249",
    originalPrice: "₹349",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&auto=format&fit=crop&q=80",
    rating: 4.6,
    time: "20-25 min",
    isPopular: true,
  },
  {
    name: "Veg Spring Rolls",
    type: "veg",
    price: "₹179",
    originalPrice: "₹249",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&auto=format&fit=crop&q=80",
    rating: 4.3,
    time: "10-15 min",
    isPopular: false,
  },
  {
    name: "Tandoori Chicken",
    type: "nonveg",
    price: "₹299",
    originalPrice: "₹399",
    image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=500&auto=format&fit=crop&q=80",
    rating: 4.9,
    time: "25-30 min",
    isPopular: true,
  },
  {
    name: "Hara Bhara Kabab",
    type: "veg",
    price: "₹189",
    originalPrice: "₹259",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500&auto=format&fit=crop&q=80",
    rating: 4.4,
    time: "15-20 min",
    isPopular: false,
  },
  {
    name: "Fish Fingers",
    type: "nonveg",
    price: "₹279",
    originalPrice: "₹379",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&auto=format&fit=crop&q=80",
    rating: 4.5,
    time: "20-25 min",
    isPopular: false,
  },
  {
    name: "Mushroom Caps",
    type: "veg",
    price: "₹199",
    originalPrice: "₹269",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500&auto=format&fit=crop&q=80",
    rating: 4.2,
    time: "15-20 min",
    isPopular: false,
  },
  {
    name: "Chicken Wings",
    type: "nonveg",
    price: "₹269",
    originalPrice: "₹369",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&auto=format&fit=crop&q=80",
    rating: 4.7,
    time: "20-25 min",
    isPopular: false,
  },
];

const Starters = () => {
  const [selectedItems, setSelectedItems] = useState([]);

  const toggleSelect = (itemName) => {
    setSelectedItems(prev =>
      prev.includes(itemName)
        ? prev.filter(name => name !== itemName)
        : [...prev, itemName]
    );
  };

  const getTotalPrice = () => {
    return starters
      .filter(item => selectedItems.includes(item.name))
      .reduce((sum, item) => sum + parseInt(item.price.slice(1)), 0);
  };

  return (
    <div className="mb-8">
      {/* Premium Header */}
      <div className="flex items-center justify-between px-4 mb-5 mt-2">
        <div className="flex items-center gap-2">
          <div className="w-1 h-6 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full"></div>
          <h3 className="text-lg font-bold text-gray-800">
            Starters & Appetizers
          </h3>
          <span className="text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
            <Flame size={10} />
            Hot & Spicy
          </span>
        </div>
        
        <Link to="/menu" className="group flex items-center gap-1 text-sm font-medium text-orange-500 hover:text-orange-600 transition-all duration-300">
          <span>See All</span>
          <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
        {starters.map((item, i) => {
          const isSelected = selectedItems.includes(item.name);
          
          return (
            <div
              key={i}
              onClick={() => toggleSelect(item.name)}
              className={`group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border cursor-pointer
                ${isSelected ? 'ring-2 ring-orange-500 shadow-lg' : 'border-gray-100'}`}
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
                  <div className={`w-4 h-4 rounded-full border-2 ${item.type === 'veg' ? 'border-green-600' : 'border-red-600'} bg-white flex items-center justify-center shadow-sm`}>
                    <div className={`w-2 h-2 rounded-full ${item.type === 'veg' ? 'bg-green-600' : 'bg-red-600'}`}></div>
                  </div>
                </div>
                
                {/* Rating Badge */}
                <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-white/95 backdrop-blur-sm px-2 py-0.5 rounded-full shadow-md">
                  <Star size={10} className="text-yellow-500 fill-yellow-500" />
                  <span className="text-[10px] font-bold text-gray-800">{item.rating}</span>
                </div>
                
                {/* Time Badge */}
                <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/70 backdrop-blur-sm px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-[9px] text-white font-medium">⏱ {item.time}</span>
                </div>
                
                {/* Active Check Overlay */}
                {isSelected && (
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
                  ${isSelected ? 'text-orange-600' : 'text-gray-800 group-hover:text-orange-500'}`}>
                  {item.name}
                </h4>
                
                {/* Type Tag */}
                <span className={`text-[10px] font-medium ${item.type === 'veg' ? 'text-green-600' : 'text-red-500'} mt-0.5 inline-block`}>
                  {item.type === 'veg' ? '🌱 Vegetarian' : '🍗 Non-Veg'}
                </span>
                
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
                    <span className="text-[10px] text-gray-400">500+ orders</span>
                  </div>
                  
                  {isSelected ? (
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
      {selectedItems.length > 0 && (
        <div className="fixed bottom-20 left-4 right-4 md:bottom-8 md:left-auto md:right-8 md:w-96 z-40">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-4 shadow-2xl animate-slide-up">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white text-xs font-medium">Selected Starters</p>
                <p className="text-white text-2xl font-bold">{selectedItems.length}</p>
              </div>
              <div className="text-right">
                <p className="text-white/80 text-xs">Total Amount</p>
                <p className="text-white text-lg font-bold">₹{getTotalPrice()}</p>
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

export default Starters;