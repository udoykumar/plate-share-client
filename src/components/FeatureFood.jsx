import React, { useEffect, useState } from "react";
import FoodCard from "./FoodCard";
import Loader from "./Loader";
import { Link } from "react-router";
import { FaArrowRight } from "react-icons/fa";

const FeatureFood = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/featured-foods")
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className=" my-6 px-4">
      <h1 className="text-2xl font-bold ">Featured Foods</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {data.map((food) => (
          <FoodCard key={food._id} food={food} />
        ))}
      </div>
      <div className="flex justify-center items-center my-5">
        <Link to="/availableFood" className="btn btn-primary ext-center">
          Show All
          <FaArrowRight />
        </Link>
      </div>
    </div>
  );
};

export default FeatureFood;
