import React, { useState, useContext } from "react";
import { IoMdEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { AuthContext } from "../contexts/AuthContext";
import { Link, useLocation, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/firebase.init";

const Login = () => {
  const [show, setShow] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { singInWithGoogle, singInUser } = useContext(AuthContext);
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
        navigate(userPath, { replace: true });
        toast.success("Login successful!");
        console.log(result);
      })
      .catch((error) => {
        toast.error(error.message);
      });
    e.target.reset();
  };

  const handleGoogleSingin = () => {
    singInWithGoogle()
      .then(() => {
        navigate(userPath, { replace: true });
        toast.success("Logged in with Google!");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleResetPassword = () => {
    if (!resetEmail) {
      toast.warn("Please enter your email first!");
      return;
    }
    sendPasswordResetEmail(auth, resetEmail)
      .then(() => {
        toast.info("Password reset email sent! Check your inbox.");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="flex flex-col h-[70vh] justify-center items-center mt-15 ">
      <div className="w-[400px] border-2 border-gray-500 p-9 rounded-md shadow-md">
        <form onSubmit={handleEmailPassLogin} className="max-w-[400px]">
          <label className="flex items-center">
            <MdEmail className="mr-2" size={20} />
            Email
          </label>
          <input
            className="mb-5 border w-full py-2 rounded-full px-4"
            name="email"
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setResetEmail(e.target.value)}
            required
          />
          <label className="flex items-center">
            <RiLockPasswordFill className="mr-2" size={20} /> Password
          </label>
          <div className="relative">
            <input
              className="mb-5 border w-full py-2 rounded-full px-4"
              name="password"
              type={show ? "text" : "password"}
              placeholder="Enter your password"
              required
            />
            <span
              onClick={() => setShow(!show)}
              className="absolute top-4 right-4 cursor-pointer"
            >
              {show ? <IoMdEye /> : <IoIosEyeOff />}
            </span>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full rounded-full text-white cursor-pointer"
          >
            Login Now
          </button>
        </form>

        <div className="mt-3 text-center">
          <button
            onClick={handleResetPassword}
            className="text-sm text-teal-500 hover:underline"
          >
            Forgot password?
          </button>
        </div>

        <hr className="mt-5 text-gray-400" />
        <button
          onClick={handleGoogleSingin}
          className="btn btn-primary w-full rounded-full text-white cursor-pointer mt-5 flex justify-center items-center"
        >
          <FcGoogle size={25} className="mr-2" />
          Login with Google
        </button>

        <div className="mt-5 text-center">
          <Link
            className="text-lg hover:underline text-teal-500 "
            to="/register"
          >
            Create new account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
