import React from "react";
import { FaUtensils, FaSearch, FaHandHoldingHeart } from "react-icons/fa";

const HowItWorks = () => {
  return (
    <section className="bg-base-200 py-16 px-6">
      <div className="container mx-auto text-center">
        <h2 className="title font-bebas ">How It Works</h2>
        <p className="text font-popins mb-12 max-w-2xl mx-auto">
          Sharing food has never been easier! Follow these three simple steps to
          connect with the community and reduce food waste.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="card bg-base-100 shadow-xl p-6 hover:shadow-2xl transition">
            <div className="text-5xl text-primary mb-4 mx-auto">
              <FaUtensils />
            </div>
            <h3 className="subtitle ">1. Post Food</h3>
            <p className="text font-popins">
              Donators can easily post available food with details like
              quantity, pickup time, and location.
            </p>
          </div>

          <div className="card bg-base-100 shadow-xl p-6 hover:shadow-2xl transition">
            <div className="text-5xl text-primary mb-4 mx-auto">
              <FaSearch />
            </div>
            <h3 className="subtitle">2. Find Food</h3>
            <p className="text font-popins">
              Hungry members or organizations can browse food listings nearby.
            </p>
          </div>

          <div className="card bg-base-100 shadow-xl p-6 hover:shadow-2xl transition">
            <div className="text-5xl text-primary mb-4 mx-auto">
              <FaHandHoldingHeart />
            </div>
            <h3 className="subtitle">3. Collect Food</h3>
            <p className="text font-popins ">
              Pick up the food and share the joy of giving! Help reduce waste
              and feed more people.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
