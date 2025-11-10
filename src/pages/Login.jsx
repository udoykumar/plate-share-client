import React from "react";

import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

const Login = () => {
  return (
    <div className="flex flex-col h-screen justify-center items-center mt-15">
      <div className="w-[400px]">
        <form className="max-w-[400px]">
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
            <RiLockPasswordFill className="mr-2" size={20} /> Password
          </label>
          <input
            className="mb-5 border w-full py-2 rounded-full px-4"
            type="password"
            placeholder="password"
          />{" "}
          <br />
          <button className="px-5 py-2 bg-amber-500 w-full rounded-full text-white cursor-pointer">
            Login Now
          </button>
        </form>
        <hr className="mt-5 text-gray-400" />
        <button className="px-5 py-2 bg-amber-500 w-full rounded-full text-white cursor-pointer mt-5">
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
