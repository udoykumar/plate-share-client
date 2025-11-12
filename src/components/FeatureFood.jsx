import React, { useEffect, useState } from "react";
import FoodCard from "./FoodCard";
import Loader from "./Loader";
import { Link } from "react-router";
import { FaArrowRight } from "react-icons/fa";
import { motion } from "motion/react";
const FeatureFood = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://plate-share-server-mu.vercel.app/featured-foods")
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
    <motion.section
      className="my-10 px-4 md:px-8"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <h1 className=" font-bebas title">Featured Foods</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((food, i) => (
          <motion.div
            key={food._id}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <FoodCard food={food} />
          </motion.div>
        ))}
      </div>

      <motion.div
        className="flex justify-center items-center my-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        viewport={{ once: true }}
      >
        <Link
          to="/availableFood"
          className="flex items-center gap-2 px-6 py-3 rounded-full font-medium 
          bg-gradient-to-r from-purple-500 to-purple-700 text-white
          hover:from-purple-700 hover:to-purple-500
          dark:from-purple-600 dark:to-purple-600 
          dark:hover:from-purple-600 dark:hover:to-purple-600 
          shadow-md transition-all duration-300"
        >
          Show All <FaArrowRight className="mt-[2px]" />
        </Link>
      </motion.div>
    </motion.section>
  );
};

export default FeatureFood;
