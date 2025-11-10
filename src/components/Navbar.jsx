import React, { use, useState } from "react";
import { Link, NavLink } from "react-router";
import { MdOutlineClose } from "react-icons/md";
import { CiMenuFries } from "react-icons/ci";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, logout } = use(AuthContext);
  console.log(user);
  const [isOpen, setIsOpen] = useState(false);
  const handleLogout = () => {
    logout()
      .then(() => {
        toast.success("logout successful");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <div className="fixed top-0 left-0 z-50 w-full flex items-center justify-between px-6 md:px-16 lg:px-36">
        <Link to="/" className="max-md:flex-1">
          <h1 className="text-2xl font-bold">
            Food <span className="text-purple-500">Sharing</span>
          </h1>
          {/* <img src={logo} alt="" className="w-36 h-10" /> */}
        </Link>
        <div
          className={`max-md:absolute max-md:top-0 max-md:left-0 max-md:font-sm z-50 max-md:text-[10px] flex flex-col md:flex-row items-center max-md:justify-center gap-8 md:px-8 py-3 max-md:h-screen md:rounded-full backdrop-blur bg-black/60 md:bg-white/10 md:border border-gray-300/20 overflow-hidden transition-[width] duration-300 ${
            isOpen ? "max-md:w-full text-white" : "max-md:w-0"
          }`}
        >
          <MdOutlineClose
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden absolute top-6 right-6 w-6 h-6 cursor-pointer"
          />

          <NavLink
            className={({ isActive }) =>
              isActive
                ? "text-purple-500 font-semibold"
                : "text-black hover:text-purple-400"
            }
            onClick={() => {
              scrollTo(0, 0), setIsOpen(false);
            }}
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "text-purple-500 font-semibold"
                : "text-black hover:text-purple-400"
            }
            onClick={() => {
              scrollTo(0, 0), setIsOpen(false);
            }}
            to="/availableFood"
          >
            Available Food
          </NavLink>
        </div>
        <div className="flex items-center gap-8">
          {user ? (
            <div className="w-10 h-10 ">
              <img
                src={user.photoURL}
                alt={user.displayName}
                className="rounded-full"
              />
              <button onClick={handleLogout}>logout</button>
            </div>
          ) : (
            <button className="px-4  py-1 sm:px-7 sm:py-2 bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer">
              Login
            </button>
          )}
        </div>
        <CiMenuFries
          onClick={() => setIsOpen(!isOpen)}
          className="max-md:ml-4 md:hidden w-8 h-8 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Navbar;
