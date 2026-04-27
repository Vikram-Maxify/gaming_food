import React from "react";
import { Plus, Star, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const foods = [
  {
    name: "Cheese Burger",
    price: "₹149",
    originalPrice: "₹199",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&auto=format&fit=crop&q=60",
    rating: 4.6,
    time: "15-20 min",
    isVeg: true,
    isPopular: true,
    slug: "cheese-burger",
  },
  {
    name: "Pepperoni Pizza",
    price: "₹299",
    originalPrice: "₹399",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&auto=format&fit=crop&q=60",
    rating: 4.8,
    time: "20-25 min",
    isVeg: false,
    isPopular: false,
    slug: "pepperoni-pizza",
  },
  {
    name: "Cold Coffee",
    price: "₹99",
    originalPrice: "₹149",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&auto=format&fit=crop&q=60",
    rating: 4.3,
    time: "5-10 min",
    isVeg: true,
    isPopular: true,
    slug: "cold-coffee",
  },
  {
    name: "Chocolate Donut",
    price: "₹79",
    originalPrice: "₹129",
    image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&auto=format&fit=crop&q=60",
    rating: 4.4,
    time: "5-10 min",
    isVeg: true,
    isPopular: false,
    slug: "chocolate-donut",
  },
];

const FoodGrid = () => {

  // ✅ FILTER ONLY POPULAR ITEMS
  const popularFoods = foods.filter(item => item.isPopular);

  return (
    <div className="mb-8">
      {/* Premium Header */}
      <div className="flex items-center justify-between px-4 mb-5">
        <div className="flex items-center gap-2">
          <div className="w-1 h-6 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full"></div>
          <h3 className="text-lg font-bold text-gray-800">
            Popular Food
          </h3>
          <span className="text-[10px] bg-green-100 text-green-600 px-2 py-0.5 rounded-full font-medium">
            ⭐ Top Rated
          </span>
        </div>

        <Link to="/menu" className="group flex items-center gap-1 text-sm font-medium text-orange-500 hover:text-orange-600 transition-all duration-300">
          <span>See All</span>
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
        {popularFoods.map((item, i) => (
          <div
            key={i}
            className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 cursor-pointer"
          >
            {/* Image Container */}
            <div className="relative w-full h-40 md:h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="absolute top-2 left-2">
                <div className={`w-4 h-4 rounded-full border-2 ${item.isVeg ? 'border-green-600' : 'border-red-600'} bg-white flex items-center justify-center`}>
                  <div className={`w-2 h-2 rounded-full ${item.isVeg ? 'bg-green-600' : 'bg-red-600'}`}></div>
                </div>
              </div>

              <div className="absolute top-2 right-2 flex items-center gap-1 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-full shadow-md">
                <Star size={12} className="text-yellow-500 fill-yellow-500" />
                <span className="text-[11px] font-bold text-gray-800">{item.rating}</span>
              </div>

              <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/70 backdrop-blur-sm px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Clock size={10} className="text-white" />
                <span className="text-[9px] text-white font-medium">{item.time}</span>
              </div>

              {/* ✅ USING SLUG IN LINK (optional use) */}
              <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <Link to={`/food/${item.slug}`}>
                  <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95">
                    <Plus size={14} />
                  </button>
                </Link>
              </div>
            </div>

            {/* Content */}
            <div className="p-3">
              <h4 className="text-sm md:text-base font-bold text-gray-800 leading-tight line-clamp-1 group-hover:text-orange-500 transition-colors duration-300">
                {item.name}
              </h4>

              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-gray-400 line-through">{item.originalPrice}</span>
                <span className="text-base md:text-lg font-bold text-orange-500">
                  {item.price}
                </span>
              </div>

              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-1">
                  <span className="text-[10px] text-gray-400">⭐ 4.5</span>
                  <span className="text-[10px] text-gray-300">•</span>
                  <span className="text-[10px] text-gray-400">1.2k+ orders</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
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

export default FoodGrid;