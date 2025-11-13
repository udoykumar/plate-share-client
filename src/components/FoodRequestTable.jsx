import React from "react";
import { AuthContext } from "../contexts/AuthContext";
import Swal from "sweetalert2";
import { use } from "react";
import { useState } from "react";
import { useEffect } from "react";

const FoodRequestTable = ({ requestFood, setRequestFood, foodId }) => {
  const { user } = use(AuthContext);
  const [food, setFood] = useState([]);
  const handleRequestAction = (id, action) => {
    fetch(`https://plate-share-server-mu.vercel.app/food-request/${id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ status: action }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          Swal.fire({
            icon: "success",
            title: `Request ${action}`,
            showConfirmButton: false,
            timer: 1200,
          });

          if (action === "accepted") {
            fetch(`https://plate-share-server-mu.vercel.app/foods/${foodId}`, {
              method: "PATCH",
              headers: { "content-type": "application/json" },
              body: JSON.stringify({ food_status: "donated" }),
            });
          }

          fetch(
            `https://plate-share-server-mu.vercel.app/foods/food-request/${foodId}`
          )
            .then((res) => res.json())
            .then((data) => setRequestFood(data));
        }
      });
  };
  // useEffect(() => {
  //   fetch(`https://plate-share-server-mu.vercel.app/foods/${foodId}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setFood(data);
  //       console.log(data);
  //     });
  // }, [foodId]);

  return (
    <div className="px-4 md:px-12 dark:bg-black">
      {user && (
        <div className="mt-6  p-6 shadow rounded-lg">
          {requestFood.length === 0 ? (
            <p className="text-gray-500">No requests yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="table w-full border">
                <thead className="bg-purple-500 text-white">
                  <tr>
                    <th>Food</th>
                    <th>Email</th>
                    <th>Location</th>
                    <th>Contact</th>
                    <th>Reason</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {requestFood.map((req) => (
                    <tr key={req._id} className="border-b">
                      <td className="flex items-center gap-2 py-2">
                        <img
                          src={food.food_image}
                          alt={req.user_name}
                          className="w-10 h-10 rounded-full"
                        />
                        <span>{req.user_name}</span>
                      </td>
                      <td>{req.user_email}</td>
                      <td>{req.location}</td>
                      <td>{req.contact}</td>
                      <td className="max-w-[180px] h-[60px] overflow-hidden text-ellipsis whitespace-pre-line break-words">
                        <div
                          title={req.reason}
                          className="line-clamp-3 overflow-hidden"
                        >
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
                      <td className="space-x-2">
                        <button
                          onClick={() =>
                            handleRequestAction(req._id, "accepted")
                          }
                          className="btn btn-success btn-sm"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() =>
                            handleRequestAction(req._id, "rejected")
                          }
                          className="btn btn-error btn-sm"
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FoodRequestTable;
