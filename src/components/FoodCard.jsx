import { Link } from "react-router";

const FoodCard = ({ food }) => {
  return (
    <section className="rounded-lg flex flex-col justify-between gap-2 p-4 shadow-lg/50 border border-gray-300 shadow-gray-600">
      <div>
        <span className="flex items-center-safe gap-2 font-semibold">
          <img
            className="w-10 h-10 rounded-full"
            src={food.donator_image}
            alt=""
          />
          <p>{food.donator_name}</p>
        </span>
        <p className="text-sm">Location : {food.pickup_location}</p>
      </div>
      <img
        className="w-full h-90 bg-cover bg-center "
        src={food.food_image}
        alt=""
      />

      <article className="text-sm font-medium text-gray-600 space-y-1">
        <p className="font-semibold text-xl text-gray-900">{food.name}</p>
        <p>Expire Date : {new Date(food.expire_date).toLocaleDateString()}</p>
        <p>Quantity : {food.food_quantity}</p>
      </article>
      <Link
        to={`/foodDetails/${food._id}`}
        className="italic hover:underline flex items-center w-full btn-primary btn mx-auto "
      >
        view details
      </Link>
    </section>
  );
};
export default FoodCard;
