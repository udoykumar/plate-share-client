import React, { useContext, useRef, useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { useLoaderData } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import FoodRequestTable from "./FoodRequestTable";
import { motion, AnimatePresence } from "framer-motion";
import { IoMdClose } from "react-icons/io";

const FoodDetails = () => {
  const foods = useLoaderData();
  const requestFoodModal = useRef(null);
  const { user } = useContext(AuthContext);
  const [requestFood, setRequestFood] = useState([]);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    if (!foods?._id) return;
    fetch(
      `https://plate-share-server-mu.vercel.app/foods/food-request/${foods._id}`
    )
      .then((res) => res.json())
      .then((data) => {
        setRequestFood(data);
      });
  }, [foods._id]);

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
    additional_notes,
  } = foods;

  useEffect(() => {
    setIsOwner(user?.email === donator_email);
  }, [user, donator_email]);

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

    fetch("https://plate-share-server-mu.vercel.app/food-request", {
      method: "POST",
      headers: { "content-type": "application/json" },
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

          fetch(
            `https://plate-share-server-mu.vercel.app/foods/food-request/${_id}`
          )
            .then((res) => res.json())
            .then(setRequestFood);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.warning(err);
      });
  };

  return (
    <div className="container mx-auto py-8 mt-15">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className=""
      >
        <div className="p-5 card lg:card-side rounded-0 overflow-hidden md:gap-5 lg:gap-0 shadow-md">
          <figure className="w-full h-80 md:h-[500px] lg:h-90 lg:w-[850px] rounded-2xl">
            <img
              src={food_image}
              alt={food_name}
              className="object-cover h-full w-full transition-opacity duration-300 hover:opacity-90"
            />
          </figure>

          <div className="card-body flex flex-col justify-between p-3 w-full md:pl-10">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <h2 className="name text-3xl font-bold name pb-2">{food_name}</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 text-sm ">
                <p className="text">
                  <span className="font-semibold font-bold">Status: </span>
                  <span className="badge badge-warning"> {food_status}</span>
                </p>
                <p className="text">
                  <span className="font-semibold font-bold">Quantity: </span>
                  <span className="badge badge-error">{food_quantity} </span>
                </p>
                <p className="text">
                  <span className="font-semibold font-bold">Expire Date: </span>
                  <span className="badge badge-success">{expire_date} </span>
                </p>
                <p className="text">
                  <span className="font-semibold font-bold">Location: </span>
                  <span className="badge badge-accent">
                    {" "}
                    {pickup_location}{" "}
                  </span>
                </p>
              </div>
              <div>
                <p className="text">
                  <span className="text-lg font-bold">Reason: </span>
                  {additional_notes}
                </p>
              </div>

              <div className="mb-6 border-t pt-4 border-[#fd7e075d]">
                <h3 className="  title font-bebas text-xl">
                  Donator Information
                </h3>
                <div className="flex items-center space-x-4">
                  <img
                    src={donator_image}
                    alt={donator_name}
                    className="w-16 h-16 rounded-full object-cover border border-gray-300"
                  />
                  <div>
                    <p className="font-medium ">{donator_name}</p>
                    <p className="text-sm ">{donator_email}</p>
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleFoodRequestModal}
                className="btn btn-primary"
              >
                Request Food
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Modal with Motion Animation */}
      <dialog
        ref={requestFoodModal}
        className="modal modal-bottom sm:modal-middle"
      >
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="modal-box"
          >
            <h3 className="title font-bebas">Food Request Form</h3>

            <form onSubmit={handleFoodReqSubmit}>
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

              <label className="flex items-center mb-1">Why Need Food</label>
              <textarea
                name="reason"
                required
                placeholder="Write your reason..."
                className="w-full h-28 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
              ></textarea>

              <div className="flex justify-start gap-2">
                <button type="submit" className="btn btn-primary">
                  Submit Request
                </button>
              </div>
            </form>

            <div className="modal-action">
              <form method="dialog">
                <button className="">
                  <IoMdClose />
                </button>
              </form>
            </div>
          </motion.div>
        </AnimatePresence>
      </dialog>

      {/* Animated Table Section */}
      {isOwner && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-10"
        >
          <h3 className="title font-bebas">
            Request Food <span>({requestFood.length})</span>
          </h3>
          <FoodRequestTable
            requestFood={requestFood}
            setRequestFood={setRequestFood}
            foodId={_id}
          />
        </motion.div>
      )}
    </div>
  );
};

export default FoodDetails;
