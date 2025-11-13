import React from "react";
import { use } from "react";
import { IoMdEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { AuthContext } from "../contexts/AuthContext";
import { Link, useLocation, useNavigate } from "react-router";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
const Login = () => {
  const [show, setShow] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { singInWithGoogle, singInUser } = use(AuthContext);
  // if (user) {
  //   navigate("/");
  // }
  const userPath = location.state?.from || "/";
  const handleEmailPassLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must have:\n- At least one uppercase letter\n- At least one lowercase letter\n- Minimum 6 characters"
      );
      return;
    }

    singInUser(email, password)
      .then((result) => {
        console.log(location);
        navigate(userPath, { replace: true });
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
    e.target.reset();
  };
  const handleGoogleSingin = () => {
    singInWithGoogle()
      .then((result) => {
        console.log(result);
        console.log(location.state);
        navigate(userPath, { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex flex-col h-[70vh] justify-center items-center mt-15 ">
      <div className="w-[400px] border-2 border-gray-500 p-9 rounded-md shadow-md">
        <form onSubmit={handleEmailPassLogin} className="max-w-[400px]">
          <label className="flex items-center">
            {" "}
            <MdEmail className="mr-2" size={20} />
            Email
          </label>
          <input
            className="mb-5 border w-full py-2 rounded-full px-4"
            name="email"
            type="email"
            placeholder="email"
          />{" "}
          <br />
          <label className="flex items-center">
            <RiLockPasswordFill className="mr-2" size={20} /> Password
          </label>
          <div className="relative">
            <input
              className="mb-5 border w-full py-2 rounded-full px-4"
              name="password"
              type={show ? "text" : "password"}
              placeholder="password"
            />
            <span
              onClick={() => setShow(!show)}
              className="absolute top-4 right-4"
            >
              {show ? <IoMdEye /> : <IoIosEyeOff />}
            </span>
          </div>
          <br />
          <button
            type="submit"
            className="px-5 py-2 bg-amber-500 w-full rounded-full text-white cursor-pointer"
          >
            Login Now
          </button>
        </form>
        <hr className="mt-5 text-gray-400" />
        <button
          onClick={handleGoogleSingin}
          className="px-5 py-2 bg-amber-500 w-full rounded-full text-white cursor-pointer mt-5 flex  justify-center items-center"
        >
          <FcGoogle size={25} className="mr-2" />
          Login with Google
        </button>
        <div className="mt-5">
          <Link
            className="text-lg hover:underline text-teal-400 "
            to="/register"
          >
            Create new account Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
