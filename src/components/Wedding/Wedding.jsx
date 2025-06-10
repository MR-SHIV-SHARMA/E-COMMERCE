import React from "react";

function Wedding() {
  return (
    <div className="mx-auto max-w-7xl relative">
      {/* Image section with responsive height */}
      <div className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden">
        <img
          src="../../../images/pexels-amine-photographe-291182746-27650381.jpg"
          alt="Wedding couple holding hands"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Content section with responsive spacing */}
      <div className="flex flex-col items-center text-center px-4 py-6 sm:py-8 md:py-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-3">
          WEAR TO WEDDING
        </h1>
        <p className="text-base sm:text-lg md:text-xl mb-4 sm:mb-5 max-w-2xl">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora,
          fuga?
        </p>
        <button className="bg-black text-white px-8 sm:px-10 md:px-12 py-2 sm:py-2.5 md:py-3 rounded-full text-sm sm:text-base hover:bg-gray-800 transition-colors">
          See Details
        </button>
      </div>
    </div>
  );
}

export default Wedding;
