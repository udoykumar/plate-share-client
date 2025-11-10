import React from "react";
import { IoMdPerson } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdPhotoLibrary } from "react-icons/md";

const Ragister = () => {
  return (
    <div className="flex flex-col h-screen justify-center items-center mt-15">
      <div className="w-[400px]">
        <form className="max-w-[400px]">
          <label className="flex items-center">
            <IoMdPerson className="mr-2" size={20} /> Name
          </label>
          <input
            className="mb-5 border w-full py-2 rounded-full px-4"
            type="text"
            placeholder="name"
          />{" "}
          <br />
          <label className="flex items-center">
            {" "}
            <MdEmail className="mr-2" size={20} />
            Email
          </label>
          <input
            className="mb-5 border w-full py-2 rounded-full px-4"
            type="email"
            placeholder="email"
          />{" "}
          <br />
          <label className="flex items-center">
            <MdPhotoLibrary className="mr-2" size={20} /> Photo URL
          </label>
          <input
            className="mb-5 border w-full py-2 rounded-full px-4"
            type="text"
            placeholder="Photo URL"
          />{" "}
          <br />
          <label className="flex items-center">
            <RiLockPasswordFill className="mr-2" size={20} /> Password
          </label>
          <input
            className="mb-5 border w-full py-2 rounded-full px-4"
            type="password"
            placeholder="password"
          />{" "}
          <br />
          <button className="px-5 py-2 bg-amber-500 w-full rounded-full text-white cursor-pointer">
            Register Now
          </button>
        </form>
        <hr />
        <button className="px-5 py-2 bg-amber-500 w-full rounded-full text-white cursor-pointer">
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Ragister;
