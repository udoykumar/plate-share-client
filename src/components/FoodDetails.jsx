import React from "react";
import { use } from "react";
import { useRef } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { useLoaderData } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import { FaPhoneAlt } from "react-icons/fa";

const FoodDetails = () => {
  const foods = useLoaderData();
  const requestFoodModal = useRef(null);
  const { user } = use(AuthContext);
  console.log(foods);
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
  const handelFoodRequestModal = () => {
    requestFoodModal.current.showModal();
  };
  const handleFoodReqSubmit = (e) => {
    e.preventDefault();
    const location = e.target.location.value;
    const contact = e.target.contact.value;
    const textarea = e.target.textarea.value;
    const newFoodReq = {
      _id: _id,
      user_email: user.email,
      user_name: user.displayName,
      photoURL: user.photoURL,
      status: "pending",
      location: location,
      contact: contact,
      textarea: textarea,
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
        console.log(data);
      });
  };
  return (
    <div className="min-h-[calc(100vh-100px)] bg-gray-50 py-8 mt-15">
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
            {/* <p className="text-gray-700 mb-4">{description}</p> */}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 text-sm text-gray-600">
              <p>
                <span className="font-semibold text-gray-700">Status:</span>{" "}
                {food_status}
              </p>
              <p>
                <span className="font-semibold text-gray-700">Quantity:</span>{" "}
                {food_quantity}
              </p>

              {/* <p>
                <span className="font-semibold text-gray-700">
                  Cooked Time:
                </span>{" "}
                {food}
              </p> */}
              <p>
                <span className="font-semibold text-gray-700">
                  Expire Date:
                </span>{" "}
                {expire_date}
              </p>
              {/* <p>
                <span className="font-semibold text-gray-700">
                  Pickup Time:
                </span>{" "}
                {}
              </p> */}
              <p>
                <span className="font-semibold text-gray-700">Location:</span>{" "}
                {pickup_location}
              </p>
              {/* <p>
                <span className="font-semibold text-gray-700">Packaging:</span>{" "}
                {packagingType}
              </p> */}
              <p>
                <span className="font-semibold text-gray-700">Rating:</span>{" "}
                {food_status} ⭐
              </p>
              <p>
                <span className="font-semibold text-gray-700">Requests:</span>{" "}
                {food_quantity}
              </p>
            </div>

            <div className="mb-4"></div>

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
              onClick={handelFoodRequestModal}
              className="btn btn-primary"
            >
              Food Request
            </button>
          </div>
        </div>
      </div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <dialog
        ref={requestFoodModal}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg ">Food Request Form</h3>
          <form onSubmit={handleFoodReqSubmit} className="">
            <label className="flex items-center">
              {" "}
              <FaLocationDot className="mr-2" size={20} />
              Location
            </label>
            <input
              className="mb-5 border w-full py-2 rounded-full px-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
              name="location"
              type="text"
              placeholder="Location"
            />
            <label className="flex items-center">
              {" "}
              <FaPhoneAlt className="mr-2" size={20} />
              Contact
            </label>
            <input
              className="mb-5 border w-full py-2 rounded-full px-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
              name="contact"
              type="text"
              placeholder="Contact Number"
            />
            <label className="flex items-center"> Why Need Food</label>
            <textarea
              name="textarea"
              className="w-full h-32 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Write your description..."
            ></textarea>
            <button type="submit" className="btn btn-primary">
              Submit Request
            </button>
          </form>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default FoodDetails;
