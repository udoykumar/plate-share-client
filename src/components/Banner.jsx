import React from "react";
// import image from "../assets/banner1.jpg";
const Banner = () => {
  return (
    <section
      className={`relative w-full h-[80vh] mt-20 bg-cover bg-center bg-[url('/banner1.jpg')]`}
    >
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
          Discover Delicious Foods Near You
        </h1>

        <p className="text-lg md:text-xl text-gray-200 mt-4 max-w-2xl">
          Explore thousands of meals from top restaurants and home chefs. Order
          your favorite food anytime, anywhere.
        </p>

        <div className="mt-8 w-full max-w-xl flex bg-white rounded-full overflow-hidden shadow-lg">
          <input
            type="text"
            placeholder="Search your favourite food..."
            className="flex-1 px-6 py-3 outline-none text-gray-700"
          />
          <button className="px-6 py-3 bg-red-500 text-white font-semibold hover:bg-red-600 transition">
            Search
          </button>
        </div>

        <div className="mt-6 flex gap-4">
          <button className="px-6 py-3 bg-red-500 text-white rounded-full text-lg font-semibold hover:bg-red-600 transition">
            Search Food
          </button>

          <button className="px-6 py-3 bg-white text-gray-800 rounded-full text-lg font-semibold hover:bg-gray-200 transition">
            View All Foods
          </button>
        </div>
      </div>
    </section>
  );
};

export default Banner;
