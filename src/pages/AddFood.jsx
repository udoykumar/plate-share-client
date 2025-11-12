import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { use } from "react";

const AddFood = () => {
  const { user } = use(AuthContext);
  const navigate = useNavigate();
  const handleAddFood = async (e) => {
    e.preventDefault();
    const form = e.target;

    const newFood = {
      food_name: form.food_name.value,
      food_image: form.food_image.value,
      food_quantity: form.food_quantity.value,
      pickup_location: form.pickup_location.value,
      expire_date: form.expire_date.value,
      additional_notes: form.additional_notes.value,
      donator_name: user?.displayName,
      donator_email: user?.email,
      donator_image: user?.photoURL,
      food_status: "Available",
    };

    try {
      const res = await fetch(
        "https://plate-share-server-mu.vercel.app/foods",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newFood),
        }
      );

      if (res.ok) {
        toast.success("Food added successfully!");
        form.reset();
        navigate("/availableFood");
      } else {
        toast.error("Failed to add food!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="container mx-auto dark:bg-white shadow p-6 rounded-xl mt-20  w-[500px] ">
      <h1 className="text-3xl font-bold text-purple-600 mb-6 text-center">
        Add Food
      </h1>

      <form onSubmit={handleAddFood} className="space-y-4">
        {/* Food Name */}
        <div>
          <label className="font-semibold">Food Name</label>
          <input
            type="text"
            name="food_name"
            required
            className="input input-bordered w-full"
          />
        </div>

        {/* Food Image */}
        <div>
          <label className="font-semibold">Food Image URL</label>
          <input
            type="text"
            name="food_image"
            required
            placeholder="https://i.ibb.co/example/food.jpg"
            className="input input-bordered w-full"
          />
        </div>

        {/* Quantity */}
        <div>
          <label className="font-semibold">Food Quantity</label>
          <input
            type="text"
            name="food_quantity"
            required
            placeholder="Serves 2 people"
            className="input input-bordered w-full"
          />
        </div>

        {/* Pickup Location */}
        <div>
          <label className="font-semibold">Pickup Location</label>
          <input
            type="text"
            name="pickup_location"
            required
            className="input input-bordered w-full"
          />
        </div>

        {/* Expire Date */}
        <div>
          <label className="font-semibold">Expire Date</label>
          <input
            type="date"
            name="expire_date"
            required
            className="input input-bordered w-full"
          />
        </div>

        {/* Notes */}
        <div>
          <label className="font-semibold">Additional Notes</label>
          <textarea
            name="additional_notes"
            rows="4"
            placeholder="Any special notes about the food..."
            className="textarea textarea-bordered w-full"
          ></textarea>
        </div>

        {/* Submit */}
        <button type="submit" className="btn btn-primary w-full mt-4">
          Submit Food
        </button>
      </form>
    </div>
  );
};

export default AddFood;
