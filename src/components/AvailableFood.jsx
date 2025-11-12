import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import { use } from "react";
import Loader from "./Loader";

const AvailableFoods = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = use(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/foods")
      .then((res) => res.json())
      .then((data) => {
        setFoods(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

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
      <h1 className="text-3xl font-bold text-center mb-8 text-purple-600">
        Available Foods
      </h1>

      {foods.length === 0 ? (
        <p className="text-center text-gray-600">
          No available foods right now.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {foods.map((food) => (
            <div
              key={food._id}
              className="card bg-white shadow-md rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition"
            >
              <figure>
                <img
                  src={food.food_image}
                  alt={food.food_name}
                  className="h-56 w-full object-cover"
                />
              </figure>

              <div className="card-body p-5">
                <h2 className="text-xl font-semibold text-purple-600">
                  {food.food_name}
                </h2>

                <div className="flex items-center gap-3 mt-2">
                  <img
                    src={food.donator_image}
                    alt={food.donator_name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <p className="text-sm text-gray-700">{food.donator_name}</p>
                </div>

                <div className="mt-4 text-sm text-gray-600 space-y-1">
                  <p>
                    <span className="font-semibold">Quantity:</span>{" "}
                    {food.food_quantity}
                  </p>
                  <p>
                    <span className="font-semibold">Pickup:</span>{" "}
                    {food.pickup_location}
                  </p>
                  <p>
                    <span className="font-semibold">Expire:</span>{" "}
                    {food.expire_date}
                  </p>
                </div>

                <div className="card-actions mt-5">
                  <button
                    onClick={() => handleViewDetails(food._id)}
                    className="btn btn-primary w-full"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AvailableFoods;
