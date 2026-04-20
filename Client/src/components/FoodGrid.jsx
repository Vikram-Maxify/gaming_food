import React from "react";
import { Plus } from "lucide-react";

const foods = [
  {
    name: "Cheese Burger",
    price: "₹149",
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&auto=format&fit=crop&q=60",
  },
  {
    name: "Pepperoni Pizza",
    price: "₹299",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&auto=format&fit=crop&q=60",
  },
  {
    name: "Cold Coffee",
    price: "₹99",
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&auto=format&fit=crop&q=60",
  },
  {
    name: "Chocolate Donut",
    price: "₹79",
    image:
      "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&auto=format&fit=crop&q=60",
  },
  {
    name: "Sandwich",
    price: "₹79",
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&auto=format&fit=crop&q=60",
  },
  {
    name: "Sandwich",
    price: "₹79",
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&auto=format&fit=crop&q=60",
  },
];

const FoodGrid = () => {
  return (
    <div className="mb-6">

      {/* Heading */}
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="text-sm font-semibold text-text-primary">
          Popular Food
        </h3>
        <span className="text-xs text-text-secondary">See all</span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">

        {foods.map((item, i) => (
          <div
            key={i}
            className="bg-card rounded-xl2 p-2 shadow-sm hover:shadow-md transition duration-200"
          >

            {/* Image Wrapper */}
            <div className="w-full h-28 rounded-xl overflow-hidden mb-2">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info */}
            <div className="px-1">
              <h4 className="text-sm font-medium text-text-primary leading-tight">
                {item.name}
              </h4>

              <div className="flex items-center justify-between mt-1">

                <span className="text-sm font-semibold text-text-primary">
                  {item.price}
                </span>

                {/* Add Button */}
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