import React, { useEffect, useState, use } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router";

const ManageMyFoods = () => {
  const { user } = use(AuthContext);
  const [foods, setFoods] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/foods?email=${user.email}`)
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
        fetch(`http://localhost:3000/foods/${id}`, {
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
    <div className="min-h-screen py-10 px-4 md:px-12 bg-gray-50 mt-15">
      <h1 className="text-3xl font-bold text-center mb-8 text-purple-600">
        Manage My Foods
      </h1>

      <div className="overflow-x-auto">
        <table className="table w-full bg-white rounded-xl shadow-md">
          <thead className="bg-purple-100 text-gray-700">
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
              <tr key={food._id} className="hover:bg-gray-50">
                <td>{index + 1}</td>
                <td>
                  <img
                    src={food.food_image}
                    alt={food.food_name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                </td>
                <td className="font-semibold">{food.food_name}</td>
                <td>{food.food_quantity}</td>
                <td>{food.expire_date}</td>
                <td>{food.food_status}</td>
                <td className="flex flex-col md:flex-row gap-2">
                  <button
                    onClick={() => navigate(`/update-food/${food._id}`)}
                    className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded-md"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(food._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageMyFoods;
