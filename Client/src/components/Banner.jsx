import React from "react";
import { ArrowRight } from "lucide-react";
import Pizza from "../assets/Images/pizzaBottomNavbar.jpg"

const Banner = () => {
  return (
    <div className="w-full bg-gradient-to-r from-primary to-accent-yellow rounded-xl2 p-6 flex items-center justify-between overflow-hidden px-4">

      {/* LEFT CONTENT */}
      <div className="z-10">
        <p className="text-sm text-text-secondary">
          Order a combo & get
        </p>

        <h2 className="text-lg font-bold text-text-primary leading-tight">
          40% OFF
        </h2>

        <div className="absolute w-20 h-20 bg-white/30 blur-2xl rounded-full -z-10"></div>

        <button className="mt-3 flex items-center gap-1 bg-black text-white px-4 py-1.5 rounded-full text-xs hover:scale-105 transition">
          Order Now
          <ArrowRight size={14} />
        </button>
      </div>

      {/* RIGHT IMAGE */}
      <div className="relative bg-transparent">
       <img src={Pizza} alt="food"
          className="w-44 h-24 object-cover rounded-md"></img>
      </div>

    </div>
  );
};

export default Banner;