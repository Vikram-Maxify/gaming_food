import React from "react";
import { Plus } from "lucide-react";

const fastFoods = [
  {
    name: "Veg Hakka Noodles",
    price: "₹149",
    image:
      "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&auto=format&fit=crop&q=80",
  },
  {
    name: "Paneer Chilli",
    price: "₹199",
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&auto=format&fit=crop&q=80",
  },
  {
    name: "Samosa Chaat",
    price: "₹99",
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Pav Bhaji",
    price: "₹129",
    image:
      "https://images.unsplash.com/photo-1617622141675-d3005b9067c5?w=500&auto=format&fit=crop&q=80",
  },
];

// const fallback =
//   "https://via.placeholder.com/300x200?text=Food";

const FastFoods = () => {
  return (


    <div className="mb-6 px-4">

      {/* Heading */}
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="text-sm font-semibold text-text-primary">
          Fast Foods
        </h3>
        <span className="text-xs text-text-secondary">See all</span>
      </div>

      {/* Scroll */}
      <div className="flex gap-3 overflow-x-auto no-scrollbar px-1">

        {fastFoods.map((item, i) => (
          <div
            key={i}
            className="min-w-[160px] bg-card overflow-hidden shadow-md"
          >

            {/* Image */}
            <div className="rounded-md overflow-hidden w-full h-28 bg-secondary">
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
              <h4 className="text-sm font-medium text-text-primary leading-tight">
                {item.name}
              </h4>

              <div className="flex items-center justify-between mt-1">
                <span className="text-sm font-semibold text-text-primary">
                  {item.price}
                </span>

                <button className="bg-primary text-white p-1.5 rounded-full active:scale-95 transition">
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

export default FastFoods;