import React from "react";
import { Plus } from "lucide-react";

const starters = [
  {
    name: "Paneer Tikka",
    type: "veg",
    price: "₹219",
    image:
      "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500&auto=format&fit=crop&q=80",
  },
  {
    name: "Chicken Lollipop",
    type: "nonveg",
    price: "₹249",
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&auto=format&fit=crop&q=80",
  },
  {
    name: "Veg Spring Rolls",
    type: "veg",
    price: "₹179",
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Tandoori Chicken",
    type: "nonveg",
    price: "₹299",
    image:
      "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=500&auto=format&fit=crop&q=80",
  },
  {
    name: "Tandoori Chicken",
    type: "nonveg",
    price: "₹299",
    image:
      "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=500&auto=format&fit=crop&q=80",
  },
  {
    name: "Tandoori Chicken",
    type: "nonveg",
    price: "₹299",
    image:
      "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=500&auto=format&fit=crop&q=80",
  },
];

// const fallback =
//   "https://via.placeholder.com/300x200?text=Food";

const Starters = () => {
  return (
    <div className="mb-6">

      {/* Heading */}
      <div className="flex items-center justify-between mb-3 px-7 md:px-24 mt-3">
        <h3 className="text-base md:text-lg font-semibold text-text-primary">
          Starters
        </h3>
        <span className="text-xs text-text-secondary">See all</span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-4 md:px-24">

        {starters.map((item, i) => (
          <div
            key={i}
            className="bg-card rounded-xl shadow-sm overflow-hidden"
          >

            {/* Image */}
            <div className="w-full h-52 bg-secondary rounded-xl overflow-hidden mb-2">
              <img
                src={item.image}
                alt={item.name}
                onError={(e) => (e.currentTarget.src = fallback)}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>

            {/* Info */}
            <div className="px-2">
              <h4 className="text-sm font-semibold text-text-primary leading-tight">
                {item.name}
              </h4>

              {/* Veg / Non-Veg Tag */}
              <span
                className={`text-[12px] font-medium ${
                  item.type === "veg"
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {item.type === "veg" ? "Veg" : "Non-Veg"}
              </span>

              {/* Price + Add */}
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

export default Starters;