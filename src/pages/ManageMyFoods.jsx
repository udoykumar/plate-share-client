import React, { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";

const ManageMyFoods = () => {
  const { user } = useContext(AuthContext);
  const [foods, setFoods] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.email) {
      fetch(
        `https://plate-share-server-mu.vercel.app/foods?email=${user.email}`
      )
        .then((res) => res.json())
        .then((data) => setFoods(data));
    }
  }, [user]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This food will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#8b5cf6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://plate-share-server-mu.vercel.app/foods/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then(() => {
            setFoods(foods.filter((food) => food._id !== id));
            Swal.fire("Deleted!", "Your food has been deleted.", "success");
          });
      }
    });
  };

  return (
    <div className="min-h-screen py-10 px-4 md:px-12  dark:bg-gray-900 mt-15 transition-colors duration-300">
      <h1 className="title font-bebas text-purple-600 dark:text-purple-400 mb-6">
        Manage My Foods
      </h1>

      <div className="overflow-x-auto">
        <table className="table w-full dark:bg-gray-800 rounded-xl shadow-md transition-colors duration-300">
          <thead className=" bg-purple-300 text-gray-700 ">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Food Name</th>
              <th>Quantity</th>
              <th>Expire Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {foods.map((food, index) => (
              <motion.tr
                key={food._id}
                className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <td className="dark:text-white">{index + 1}</td>
                <td>
                  <img
                    src={food.food_image}
                    alt={food.food_name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                </td>
                <td className="font-semibold dark:text-gray-200">
                  {food.food_name}
                </td>
                <td className="dark:text-gray-300">{food.food_quantity}</td>
                <td className="dark:text-gray-300">{food.expire_date}</td>
                <td className=" dark:text-gray-300">{food.food_status}</td>
                <td className="flex flex-col md:flex-row gap-2 mt-4">
                  <motion.button
                    onClick={() => navigate(`/update-food/${food._id}`)}
                    className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded-md"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Update
                  </motion.button>
                  <motion.button
                    onClick={() => handleDelete(food._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Delete
                  </motion.button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageMyFoods;
