import React, { useState } from "react";
import { Link } from "react-router-dom";

const breadsList = [
  {
    name: "Tandoori Roti",
    price: "₹20",
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300&auto=format&fit=crop&q=80",
  },
  {
    name: "Missi Roti",
    price: "₹30",
    image:
      "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=300&auto=format&fit=crop&q=80",
  },
  {
    name: "Missi Roti",
    price: "₹30",
    image:
      "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=300&auto=format&fit=crop&q=80",
  },
  {
    name: "Missi Roti",
    price: "₹30",
    image:
      "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=300&auto=format&fit=crop&q=80",
  },
  {
    name: "Missi Roti",
    price: "₹30",
    image:
      "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=300&auto=format&fit=crop&q=80",
  },
  {
    name: "Missi Roti",
    price: "₹30",
    image:
      "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=300&auto=format&fit=crop&q=80",
  },
  {
    name: "Missi Roti",
    price: "₹30",
    image:
      "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=300&auto=format&fit=crop&q=80",
  },
  {
    name: "Missi Roti",
    price: "₹30",
    image:
      "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=300&auto=format&fit=crop&q=80",
  }, {
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
      <div className="flex items-center justify-between mb-3 px-4 md:px-24">
        <h3 className="text-base md:text-lg font-semibold text-white md:text-black">
          Breads
        </h3>
      <Link to = "/menu"><span className="text-sm md:text-base text-white md:text-black">Choose</span></Link>
      </div>

      {/* Scroll */}
      <div className="flex gap-4 overflow-x-auto no-scrollbar px-4 md:px-24">

        {breadsList.map((item, i) => {
          const isActive = selected.includes(item.name);

          return (
            <div
              key={i}
              onClick={() => toggleBread(item.name)}
              className={`min-w-[110px] cursor-pointer rounded-lg  transition border ${isActive
                  ? "bg-primary/10 border-primary"
                  : "bg-card border-secondary-dark"
                }`}
            >

              {/* Image */}
              <div className="w-full h-16 md:w-full md:h-28 rounded-lg overflow-hidden bg-secondary">
                <img
                  src={item.image}
                  alt={item.name}
                  onError={(e) => (e.currentTarget.src = fallback)}
                  className=" w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* Text */}
              <p className="text-xs font-semibold text-black leading-tight mt-1 px-1">
                {item.name}
              </p>

              <p className="text-[11px] font-medium text-gray-500 px-1">
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