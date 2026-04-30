import React, { useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, TrendingUp } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../reducer/slice/categorySlice";

const Categories = () => {
    const scrollContainerRef = useRef(null);
    const dispatch = useDispatch();

    const { categories = [], loading } = useSelector(
        (state) => state.category
    );

    // 🔥 FETCH DATA
    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            const scrollAmount = direction === "left" ? -200 : 200;
            scrollContainerRef.current.scrollBy({
                left: scrollAmount,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className="mb-5">

            {/* HEADER */}
            <div className="flex items-center justify-between px-4 mb-3">
                <div className="flex items-center gap-2 pt-3">
                    <div className="w-1 h-6 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full"></div>
                    <h3 className="text-lg font-bold text-gray-800">
                        Food Categories
                    </h3>

                    <div className="flex items-center gap-1 ml-2">
                        <TrendingUp size={14} className="text-orange-500" />
                        <span className="text-[10px] text-orange-500 font-medium">
                            Trending
                        </span>
                    </div>
                </div>

                <div className="hidden md:flex gap-2">
                    <button onClick={() => scroll("left")} className="p-1.5 rounded-full bg-gray-100 hover:bg-orange-500 hover:text-white">
                        <ChevronLeft size={16} />
                    </button>

                    <button onClick={() => scroll("right")} className="p-1.5 rounded-full bg-gray-100 hover:bg-orange-500 hover:text-white">
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>

            {/* LOADING */}
            {loading ? (
                <p className="px-4 text-sm text-gray-400">Loading categories...</p>
            ) : (
                <div className="relative">

                    <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none md:hidden"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none md:hidden"></div>

                    <div
                        ref={scrollContainerRef}
                        className="flex gap-3 overflow-x-auto scroll-smooth px-4 pb-3 no-scrollbar"
                    >
                        {categories.map((cat) => (
                            <div
                                key={cat._id}
                                className="group relative min-w-[85px] cursor-pointer pt-4"
                            >
                                <div className="relative bg-white rounded-2xl p-3 flex flex-col items-center 
                                shadow-sm hover:shadow-xl transition-all duration-300 
                                border border-gray-100 hover:border-orange-200
                                hover:-translate-y-1">

                                    {/* IMAGE */}
                                    <div className="relative mb-2">
                                        <img
                                            src={cat.image}
                                            alt={cat.name}
                                            className="w-14 h-14 object-cover rounded-full 
                               ring-2 ring-gray-100 group-hover:ring-orange-300 
                               transition-all duration-300 group-hover:scale-110"
                                        />
                                    </div>

                                    {/* NAME */}
                                    <p className="text-xs font-semibold text-gray-700 group-hover:text-orange-500">
                                        {cat.name}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
        </div>
    );
};

export default Categories;