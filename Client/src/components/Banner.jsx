import React from "react";
import { ArrowRight, Sparkles, Clock } from "lucide-react";

const Banner = () => {
  return (
    <div className="px-4 md:px-6 w-full">
      <div className="relative w-full bg-gradient-to-r from-orange-500 via-orange-500 to-orange-400 rounded-2xl overflow-hidden shadow-xl shadow-orange-200/50">
        
        {/* Animated Background Blobs */}
        <div className="absolute top-0 -left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 -right-20 w-72 h-72 bg-orange-300/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        {/* Decorative Dots Pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1.5px, transparent 1.5px)`,
          backgroundSize: '24px 24px'
        }}></div>

        <div className="relative p-5 flex items-center justify-between gap-4">
          
          {/* LEFT CONTENT */}
          <div className="flex-1 z-10">
            <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-full mb-2">
              <Sparkles size={12} className="text-yellow-200" />
              <span className="text-[11px] font-medium text-white/90 tracking-wide">
                LIMITED TIME OFFER
              </span>
            </div>

            <p className="text-xs text-white/80 font-medium mb-1">
              Order a combo & get
            </p>

            <h2 className="text-2xl md:text-3xl font-black text-white leading-tight tracking-tight">
              40% <span className="text-yellow-200">OFF</span>
            </h2>

            <div className="flex items-center gap-2 mt-2 mb-3">
              <div className="flex items-center gap-1">
                <Clock size={12} className="text-white/70" />
                <span className="text-[10px] text-white/70">15 mins left</span>
              </div>
              <div className="w-1 h-1 bg-white/50 rounded-full"></div>
              <span className="text-[10px] text-white/70">Min. order $10</span>
            </div>

            <button className="group flex items-center gap-2 bg-white text-orange-500 px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
              Order Now
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>

          {/* RIGHT IMAGE - Premium Card Style */}
          <div className="relative">
            {/* Glow behind image */}
            <div className="absolute inset-0 bg-white/20 rounded-2xl blur-xl"></div>
            
            {/* Image Container */}
            <div className="relative w-32 h-28 md:w-36 md:h-32 rounded-xl overflow-hidden shadow-2xl ring-2 ring-white/30">
              <img 
                src="https://media.istockphoto.com/id/868408746/photo/assorted-indian-dish.jpg?s=2048x2048&w=is&k=20&c=WIUXa_BOsldeI9KJB3HEVuG70yd4F1SlBuwwiHtbSJw=" 
                alt="Delicious Food Combo"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
              {/* Gradient Overlay on Image */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full px-2 py-0.5 shadow-lg">
              <span className="text-[10px] font-black text-orange-900">🔥 HOT</span>
            </div>
          </div>
        </div>

        {/* Bottom Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
          <div className="h-full w-2/3 bg-white/60 rounded-full animate-[progress_2s_ease-in-out_infinite]"></div>
        </div>
      </div>
    </div>
  );
};

export default Banner;