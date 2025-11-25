import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";

const UpdateFood = () => {
  const { id } = useParams();
  const [food, setFood] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://plate-share-server-mu.vercel.app/foods/${id}`)
      .then((res) => res.json())
      .then((data) => setFood(data));
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedFood = {
      food_name: form.food_name.value,
      food_image: form.food_image.value,
      food_quantity: form.food_quantity.value,
      pickup_location: form.pickup_location.value,
      expire_date: form.expire_date.value,
      additional_notes: form.additional_notes.value,
    };

    fetch(`https://plate-share-server-mu.vercel.app/foods/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedFood),
    })
      .then((res) => res.json())
      .then(() => {
        Swal.fire("Updated!", "Food info has been updated.", "success");
        navigate("/manage-food");
      });
  };

  return (
    <div className="container mx-auto py-10 px-6 mt-15 w-1/2 h-[80vh] flex items-center">
      <div className=" p-10 shadow-2xl rounded-lg ">
        <h2 className="text-3xl font-bold text-center text-purple-600 mb-8">
          Update Food
        </h2>
        <form
          onSubmit={handleUpdate}
          className="space-y-4  p-6 shadow-md rounded-xl"
        >
          <label>Name</label>
          <input
            type="text"
            name="food_name"
            defaultValue={food.food_name}
            className="input input-bordered w-full"
            placeholder="Food Name"
            required
          />
          <label>Photo URL</label>
          <input
            type="text"
            name="food_image"
            defaultValue={food.food_image}
            className="input input-bordered w-full"
            placeholder="Image URL"
            required
          />
          <label>Food Quantity</label>
          <input
            type="number"
            name="food_quantity"
            defaultValue={food.food_quantity}
            className="input input-bordered w-full"
            placeholder="Quantity"
            required
          />
          <label>Pickup Location</label>
          <input
            type="text"
            name="pickup_location"
            defaultValue={food.pickup_location}
            className="input input-bordered w-full"
            placeholder="Pickup Location"
            required
          />
          <label>Date</label>
          <input
            type="date"
            name="expire_date"
            defaultValue={food.expire_date}
            className="input input-bordered w-full"
            required
          />
          <label>Reason</label>
          <textarea
            name="additional_notes"
            defaultValue={food.additional_notes}
            className="textarea textarea-bordered w-full"
            placeholder="Additional Notes"
          ></textarea>

          <button className="bg-purple-600 hover:bg-purple-700 text-white w-full py-2 rounded-md font-semibold">
            Update Food
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateFood;
