import React from "react";
import { Plus } from "lucide-react";
import { FaStar } from "react-icons/fa";

const foods = [
  {
    name: "Cheese Burger",
    price: "₹149",
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&auto=format&fit=crop&q=60",
    rating: 4,
  },
  {
    name: "Pepperoni Pizza",
    price: "₹299",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&auto=format&fit=crop&q=60",
    rating: 4,
  },
  {
    name: "Cold Coffee",
    price: "₹99",
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&auto=format&fit=crop&q=60",
    rating: 4,
  },
  {
    name: "Chocolate Donut",
    price: "₹79",
    image:
      "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&auto=format&fit=crop&q=60",
    rating: 4,
  },
  {
    name: "Sandwich",
    price: "₹79",
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&auto=format&fit=crop&q=60",
    rating: 4,
  },
  {
    name: "Sandwich",
    price: "₹79",
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&auto=format&fit=crop&q=60",
    rating: 4,
  },
];

const FoodGrid = () => {
  return (
    <div className="mb-6">

      {/* Heading */}
      <div className="flex items-center justify-between mb-3 px-6 md:px-24">
        <h3 className="text-base md:text-lg font-semibold text-text-primary">
          Popular Food
        </h3>
        <span className="text-xs text-text-secondary">See all</span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-7 px-4 md:px-24">

        {foods.map((item, i) => (
          <div
            key={i}
            className="bg-card rounded-xl  hover:shadow-md shadow-md"
          >

            {/* Image Wrapper */}
            <div className="w-full h-52 rounded-xl overflow-hidden mb-3">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-500 md:hover:scale-105"
              />
            </div>

            {/* Info */}
            <div className="px-2">

              {/* Top Row: Name + Rating */}
              <div className="flex items-start justify-between">
                <h4 className="text-sm font-medium text-text-primary leading-tight mt-2">
                  {item.name}
                </h4>
                <div className="bg-green-600 text-white px-1 rounded flex items-center mt-3">
                  <h4 className="flex items-center text-base">
                    {item.rating}
                    <FaStar className="text-white ml-1 text-base" />
                  </h4>
                </div>
              </div>

              {/* Price (just below name) */}
              <span className="text-sm font-semibold text-text-primary mt-1 block">
                {item.price}
              </span>
              {/* Add Button */}
              <div className="flex justify-end">
                <button className="bg-primary text-white p-1.5 rounded-full hover:scale-105 active:scale-95 transition">
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

export default FoodGrid;