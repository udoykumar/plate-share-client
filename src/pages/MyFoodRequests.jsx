import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

const MyFoodRequests = () => {
  const { user } = useContext(AuthContext);
  const [myRequests, setMyRequests] = useState([]);
  const [food, setFood] = useState([]);
  useEffect(() => {
    if (!user?.email) return;

    fetch(`http://localhost:3000/food-request/${user.email}`)
      .then((res) => res.json())
      .then((data) => setMyRequests(data))
      .catch((err) => console.error(err));
  }, [user?.email]);

  useEffect(() => {
    fetch(`http://localhost:3000/foods/${myRequests.food_id}`)
      .then((res) => res.json())
      .then((data) => {
        setFood(data);
        console.log(data);
      });
  }, [myRequests.food_id]);

  return (
    <div className="px-4 md:px-12  min-h-screen mt-15">
      <h2 className="text-3xl font-bold text-purple-500 py-4 text-center">
        My Food Requests ({myRequests.length})
      </h2>

      <div className=" p-6 shadow rounded-lg">
        {myRequests.length === 0 ? (
          <p className="text-gray-500">No requests found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full border">
              <thead className="bg-purple-500 text-white">
                <tr>
                  <th>Food ID</th>
                  <th>Food</th>
                  <th>Location</th>
                  <th>Contact</th>
                  <th>Reason</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody className="dark:bg-black">
                {myRequests.map((req) => (
                  <tr key={req._id} className="border-b">
                    <td>
                      <div>
                        <img
                          src={food.food_image}
                          className="w-15 h-15 rounded-full"
                          alt=""
                        />
                      </div>
                    </td>
                    <td>{req.food_id}</td>
                    <td>{req.location}</td>
                    <td>{req.contact}</td>
                    <td className="max-w-[200px] h-[60px] overflow-hidden break-words whitespace-pre-line">
                      <div title={req.reason} className="line-clamp-3">
                        {req.reason}
                      </div>
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          req.status === "accepted"
                            ? "badge-success"
                            : req.status === "rejected"
                            ? "badge-error"
                            : "badge-warning"
                        }`}
                      >
                        {req.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyFoodRequests;
