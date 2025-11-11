import { Link } from "react-router";
import ImgManager from "./ImgManager";
import {
  MdKeyboardDoubleArrowRight,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";

export default function FoodCard({ e }) {
  return (
    <section className="rounded-lg flex flex-col justify-between gap-2 p-4 shadow-lg/50 border border-gray-300 shadow-gray-600">
      <div>
        <span className="flex items-center-safe gap-2 font-semibold">
          <ImgManager
            imgUrl={e.donator_image}
            altTxt="Donator Image"
            styles="h-9 aspect-square object-center object-cover rounded-full"
          />
          <p>{e.donator_name}</p>
        </span>
        <p className="text-sm">Location : {e.pickup_location}</p>
      </div>
      <ImgManager
        imgUrl={e.image}
        altTxt="Food image"
        styles="w-full aspect-square object-center rounded-lg my-2"
      />
      <article className="text-sm font-medium text-gray-600 space-y-1">
        <p className="font-semibold text-xl text-gray-900">{e.name}</p>
        <p>Expire Date : {new Date(e.expire_date).toLocaleDateString()}</p>
        <p>Quantity : {e.quantity}</p>
      </article>
      <Link
        to={`/food/details/${e._id}`}
        className="italic hover:underline flex items-center w-fit"
      >
        view details <MdOutlineKeyboardDoubleArrowRight className="text-lg" />
      </Link>
    </section>
  );
}
