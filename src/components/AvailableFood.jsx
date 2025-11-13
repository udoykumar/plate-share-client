import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import Loader from "./Loader";
import { motion } from "framer-motion";
import { use } from "react";

const AvailableFoods = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = use(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://plate-share-server-mu.vercel.app/foods")
      .then((res) => res.json())
      .then((data) => {
        setFoods(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  const availableFood = foods.filter((f) => f.food_status === "Available");

  const handleViewDetails = (id) => {
    if (!user) {
      navigate("/login");
    } else {
      navigate(`/foodDetails/${id}`);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <Loader />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 mt-15">
      <h1 className="title font-bebas text-center text-4xl tracking-wider text-purple-600 dark:text-purple-400 mb-10">
        Available Foods
      </h1>

      {availableFood.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-300">
          No available foods right now.
        </p>
      ) : (
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", staggerChildren: 0.1 }}
        >
          {availableFood.map((food, index) => (
            <motion.div
              key={food._id}
              className="card  dark:bg-gray-800 shadow-md rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all dark:text-white"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <figure>
                <div className="w-full h-90 overflow-hidden rounded-2xl ">
                  <img
                    className="w-full h-90 object-cover transform transition-transform duration-500 ease-in-out hover:scale-105"
                    src={food.food_image}
                    alt={food.food_name}
                  />
                </div>
              </figure>

              <div className="card-body p-5 flex flex-col">
                <h2 className="text-xl font-semibold  dark:text-white name font-popins flex-1">
                  {food.food_name}
                </h2>

                <div className=" text-sm  dark:text-white space-y-1">
                  <p className="text">
                    <span className="font-semibold">Quantity : </span>
                    {food.food_quantity}
                  </p>
                  <p className="text">
                    <span className="font-semibold ">Pickup : </span>
                    {food.pickup_location}
                  </p>
                  <div className="flex justify-between items-center dark:text-white">
                    <p className="text">
                      <span className="font-semibold">Expire : </span>
                      {food.expire_date}
                    </p>
                    <p className="py-2 px-3 bg-purple-200 dark:bg-purple-700/40 text-purple-600 dark:text-purple-300 rounded-md text-sm text-center">
                      {food.food_status}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 mt-2">
                    <img
                      src={food.donator_image}
                      alt={food.donator_name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <p className="text-sm dark:text-white">
                      {food.donator_name}
                    </p>
                  </div>
                </div>

                <div className="card-actions mt-5 ">
                  <button
                    onClick={() => handleViewDetails(food._id)}
                    className="btn btn-primary w-full bg-gradient-to-r from-purple-500 to-purple-700 border-0 hover:from-purple-600 hover:to-purple-800 text-white"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default AvailableFoods;
