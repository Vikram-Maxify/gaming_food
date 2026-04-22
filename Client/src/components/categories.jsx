import React from "react";

const categories = [
    {
        name: "Burger",
        image:
            "https://images.unsplash.com/photo-1550547660-d9450f859349?w=200&auto=format&fit=crop&q=60",
    },
    {
        name: "Pizza",
        image:
            "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&auto=format&fit=crop&q=60",
    },
    {
        name: "Drinks",
        image:
            "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=200&auto=format&fit=crop&q=60",
    },
    {
        name: "Dessert",
        image:
            "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=200&auto=format&fit=crop&q=60",
    },
];

const Categories = () => {
    return (
        
        <div className="mb-5">
            {/* Heading */}
            <h3 className="text-base font-semibold text-text-primary mb-3 px-4 pt-3">
                Category
            </h3>

            {/* Scroll Container */}
            <div className="flex gap-3 overflow-x-auto no-scrollbar px-1">

                {categories.map((cat, i) => (
                    <div
                        key={i}
                        className="min-w-[90px] bg-card rounded-xl2 p-2 flex flex-col items-center shadow-sm hover:scale-105 transition"
                    >
                        {/* Image */}
                        <img
                            src={cat.image}
                            alt={cat.name}
                            className="w-14 h-14 object-cover rounded-full mb-2"
                        />

                        {/* Text */}
                        <p className="text-xs font-medium text-text-primary">
                            {cat.name}
                        </p>
                    </div>
                ))}

            </div>
        </div>
    );
};

export default Categories;