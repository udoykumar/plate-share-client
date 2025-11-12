import React, { use } from "react";
import { IoMdPerson } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdPhotoLibrary } from "react-icons/md";
import { AuthContext } from "../contexts/AuthContext";
import { useState } from "react";
import { IoMdEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { updateProfile } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";

const Ragister = () => {
  const [show, setShow] = useState(false);
  const { createUser, singInWithGoogle } = use(AuthContext);

  const navigate = useNavigate();

  const handleRagister = (e) => {
    e.preventDefault();
    const name = e.target.name?.value;
    const email = e.target.email?.value;
    const password = e.target.password?.value;
    const photoURL = e.target.photoURL?.value;
    console.log({ name, email, password, photoURL });
    createUser(email, password)
      .then((result) => {
        console.log(result);
        navigate("/");
        toast.success("register successful");
        const loggedUser = result.user;
        console.log("User created:", loggedUser);

        updateProfile(loggedUser, {
          displayName: name,
          photoURL: photoURL,
        })
          .then(() => {
            console.log("Profile updated");
          })
          .catch((err) => {
            console.log("Profile update error:", err);
          });
        e.target.reset();
      })
      .catch((error) => {
        console.log("Create user error =>", error);
      });
  };

  const handleGoogleSingIn = () => {
    singInWithGoogle()
      .then((result) => {
        const newUser = {
          name: result.user.displayName,
          email: result.user.email,
          image: result.user.photoURL,
        };
        navigate(location.state);
        console.log(result);
        fetch("https://plate-share-server-mu.vercel.app/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(newUser),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="flex flex-col h-[70vh] justify-center items-center mt-15">
      <div className="w-[400px] border-2 border-gray-500 p-9 rounded-md shadow-md">
        <form className="max-w-[400px]" onSubmit={handleRagister}>
          <label className="flex items-center">
            <IoMdPerson className="mr-2" size={20} /> Name
          </label>
          <input
            className="mb-5 border w-full py-2 rounded-full px-4"
            name="name"
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
            name="email"
            type="email"
            placeholder="email"
          />{" "}
          <br />
          <label className="flex items-center">
            <MdPhotoLibrary className="mr-2" size={20} /> Photo URL
          </label>
          <input
            className="mb-5 border w-full py-2 rounded-full px-4"
            name="photoURL"
            type="text"
            placeholder="Photo URL"
          />{" "}
          <br />
          <label className="flex items-center">
            <RiLockPasswordFill className="mr-2" size={20} /> Password
          </label>
          <div className="relative">
            <input
              className=" mb-5 border w-full py-2 rounded-full px-4"
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
            Register Now
          </button>
        </form>
        <hr className="my-4 text-gray-400" />
        <button
          onClick={handleGoogleSingIn}
          className="px-5 py-2 bg-amber-500 w-full rounded-full text-white cursor-pointer flex  justify-center items-center"
        >
          <FcGoogle size={25} className="mr-2" />
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Ragister;
