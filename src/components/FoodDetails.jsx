import React, { useContext, useRef } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { useLoaderData } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useState } from "react";
import FoodRequestTable from "./FoodRequestTable";

const FoodDetails = () => {
  const foods = useLoaderData();
  const requestFoodModal = useRef(null);
  const { user } = useContext(AuthContext);
  const [requestFood, setRequestFood] = useState([]);
  useEffect(() => {
    if (!foods?._id) return;

    fetch(`http://localhost:3000/foods/food-request/${foods._id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("useeffect ", data);
        setRequestFood(data);
      });
  }, [foods._id]);
  console.log("food details", foods);
  const {
    _id,
    food_name,
    food_image,
    food_quantity,
    pickup_location,
    expire_date,
    donator_name,
    donator_email,
    donator_image,
    food_status,
  } = foods;

  const handleFoodRequestModal = () => {
    requestFoodModal.current.showModal();
  };

  const handleFoodReqSubmit = (e) => {
    e.preventDefault();

    const location = e.target.location.value;
    const contact = e.target.contact.value;
    const reason = e.target.reason.value;

    const newFoodReq = {
      food_id: _id,
      user_email: user?.email,
      user_name: user?.displayName,
      photoURL: user?.photoURL,
      location,
      contact,
      reason,
      status: "pending",
      createdAt: new Date(),
    };

    fetch("http://localhost:3000/food-request", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newFoodReq),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          requestFoodModal.current.close();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your request has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
          e.target.reset();
        }
      })
      .catch((err) => {
        console.error(err);
        toast.warning(err);
      });
  };

  return (
    <div className="container mx-auto bg-gray-50 py-8 mt-15">
      <div className="card lg:card-side bg-white rounded-0 overflow-hidden md:gap-5 lg:gap-0">
        <figure className="w-full h-80 md:h-[500px] lg:h-full lg:w-[850px] rounded-2xl bg-amber-400">
          <img
            src={food_image}
            alt={food_name}
            className="object-cover h-full w-full transition-opacity duration-300 hover:opacity-90"
          />
        </figure>

        <div className="card-body flex flex-col justify-between p-3 w-full md:pl-10">
          <div>
            <h2 className="card-title text-3xl font-bold text-[#fd7d07] pb-2">
              {food_name}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 text-sm text-gray-600">
              <p>
                <span className="font-semibold text-gray-700">Status:</span>{" "}
                {food_status}
              </p>
              <p>
                <span className="font-semibold text-gray-700">Quantity:</span>{" "}
                {food_quantity}
              </p>
              <p>
                <span className="font-semibold text-gray-700">
                  Expire Date:
                </span>{" "}
                {expire_date}
              </p>
              <p>
                <span className="font-semibold text-gray-700">Location:</span>{" "}
                {pickup_location}
              </p>
            </div>

            <div className="mb-6 border-t pt-4 border-[#fd7e075d]">
              <h3 className="font-semibold mb-2 text-[#fd7d07] text-xl">
                Donator Information
              </h3>
              <div className="flex items-center space-x-4">
                <img
                  src={donator_image}
                  alt={donator_name}
                  className="w-16 h-16 rounded-full object-cover border border-gray-300"
                />
                <div>
                  <p className="font-medium text-gray-700">{donator_name}</p>
                  <p className="text-sm text-gray-600">{donator_email}</p>
                </div>
              </div>
            </div>

            <button
              onClick={handleFoodRequestModal}
              className="btn btn-primary"
            >
              Request Food
            </button>
          </div>
        </div>
      </div>

      <dialog
        ref={requestFoodModal}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-3 text-[#fd7d07]">
            Food Request Form
          </h3>

          <form onSubmit={handleFoodReqSubmit}>
            {/* Location */}
            <label className="flex items-center mb-1">
              <FaLocationDot className="mr-2" size={18} /> Location
            </label>
            <input
              name="location"
              type="text"
              placeholder="Enter your location"
              required
              className="mb-4 border w-full py-2 rounded-full px-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            {/* Contact */}
            <label className="flex items-center mb-1">
              <FaPhoneAlt className="mr-2" size={18} /> Contact No.
            </label>
            <input
              name="contact"
              type="text"
              placeholder="Contact number"
              required
              className="mb-4 border w-full py-2 rounded-full px-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            {/* Reason */}
            <label className="flex items-center mb-1">Why Need Food</label>
            <textarea
              name="reason"
              required
              placeholder="Write your reason..."
              className="w-full h-28 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
            ></textarea>

            <div className="flex justify-end gap-2">
              <button type="submit" className="btn btn-primary">
                Submit Request
              </button>
            </div>
          </form>

          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>

      <div>
        <h3 className="text-3xl font-bold text-center text-purple-500 py-4">
          Request Food <span>({requestFood.length})</span>
        </h3>

        <FoodRequestTable requestFood={requestFood} />
      </div>
    </div>
  );
};

export default FoodDetails;
