import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

const MyFoodRequests = () => {
  const { user } = useContext(AuthContext);
  const [myRequests, setMyRequests] = useState([]);

  useEffect(() => {
    if (!user?.email) return;

    fetch(`https://plate-share-server-mu.vercel.app/food-request/${user.email}`)
      .then((res) => res.json())
      .then((data) => setMyRequests(data))
      .catch((err) => console.error(err));
  }, [user?.email]);

  return (
    <div
      className="px-4 md:px-12 dark:bg-gray-400
     min-h-screen mt-20"
    >
      <h2 className="title font-bebas">
        My Food Requests ({myRequests.length})
      </h2>

      <div className="dark:bg-gray-500 p-6 shadow rounded-lg">
        {myRequests.length === 0 ? (
          <p className="text-gray-500">No requests found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full border">
              <thead className="bg-purple-400 text-white">
                <tr>
                  <th>Food ID</th>
                  <th>Location</th>
                  <th>Contact</th>
                  <th>Reason</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {myRequests.map((req) => (
                  <tr key={req._id} className="border-b">
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
