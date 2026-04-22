import React, { useState } from "react";

const breadsList = [
  {
    name: "Tandoori Roti",
    price: "₹20",
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300&auto=format&fit=crop&q=80",
  },
  {
    name: "Butter Naan",
    price: "₹40",
    image:
      "https://images.unsplash.com/photo-1625944525533-473f1b8c6c3b?w=300&auto=format&fit=crop&q=80",
  },
  {
    name: "Garlic Naan",
    price: "₹50",
    image:
      "https://images.unsplash.com/photo-1625944525533-473f1b8c6c3b?w=300&auto=format&fit=crop&q=80",
  },
  {
    name: "Lachha Paratha",
    price: "₹45",
    image:
      "https://images.unsplash.com/photo-1617196038435-8c2f7bdfb1ef?w=300&auto=format&fit=crop&q=80",
  },
  {
    name: "Missi Roti",
    price: "₹30",
    image:
      "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=300&auto=format&fit=crop&q=80",
  },
];



const Breads = () => {
  const [selected, setSelected] = useState([]);

  const toggleBread = (name) => {
    setSelected((prev) =>
      prev.includes(name)
        ? prev.filter((item) => item !== name)
        : [...prev, name]
    );
  };

  return (
    <div className="mb-6">

      {/* Heading */}
      <div className="flex items-center justify-between mb-3 px-4">
        <h3 className="text-sm font-semibold text-text-primary">
          Breads
        </h3>
        <span className="text-xs text-text-secondary">
          Choose
        </span>
      </div>

      {/* Scroll */}
      <div className="flex gap-3 overflow-x-auto no-scrollbar px-1">

        {breadsList.map((item, i) => {
          const isActive = selected.includes(item.name);

          return (
            <div
              key={i}
              onClick={() => toggleBread(item.name)}
              className={`min-w-[110px] cursor-pointer rounded-xl2 p-2 transition border ${
                isActive
                  ? "bg-primary/10 border-primary"
                  : "bg-card border-secondary-dark"
              }`}
            >

              {/* Image */}
              <div className="w-full h-16 rounded-lg overflow-hidden mb-1 bg-secondary">
                <img
                  src={item.image}
                  alt={item.name}
                  onError={(e) => (e.currentTarget.src = fallback)}
                  className=" w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* Text */}
              <p className="text-xs font-medium text-text-primary leading-tight">
                {item.name}
              </p>

              <p className="text-[11px] text-text-secondary">
                {item.price}
              </p>

            </div>
          );
        })}

      </div>
    </div>
  );
};

export default Breads;