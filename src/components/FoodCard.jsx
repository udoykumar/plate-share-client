import { Link } from "react-router";

const FoodCard = ({ food }) => {
  return (
    <section className="rounded-lg flex flex-col justify-between gap-2 p-4 shadow-lg/50 border border-gray-300 shadow-gray-600">
      <div className="dark:text-white">
        <span className="flex items-center-safe gap-2 font-semibold">
          <img
            className="w-10 h-10 rounded-full"
            src={food.donator_image}
            alt=""
          />
          <p className="dark:text-white">{food.donator_name}</p>
        </span>
        <p className="text-sm">Location : {food.pickup_location}</p>
      </div>
      <div className="w-full h-90 overflow-hidden rounded-2xl ">
        <img
          className="w-full h-80 object-cover transform transition-transform duration-500 ease-in-out hover:scale-105"
          src={food.food_image}
          alt="Food"
        />
      </div>

      <article className="text-sm font-medium dark:text-white space-y-1">
        <p className="name">{food.food_name}</p>
        <p>Expire Date : {new Date(food.expire_date).toLocaleDateString()}</p>
        <p>Quantity : {food.food_quantity}</p>
      </article>
      <Link
        to={`/foodDetails/${food._id}`}
        className=" hover:bg- flex items-center w-full btn-primary btn mx-auto "
      >
        view details
      </Link>
    </section>
  );
};
export default FoodCard;
