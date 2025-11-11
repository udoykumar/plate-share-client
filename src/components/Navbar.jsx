import React, { use, useState } from "react";
import { Link, NavLink } from "react-router";
import { MdOutlineClose } from "react-icons/md";
import { CiMenuFries } from "react-icons/ci";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import { useEffect } from "react";

const Navbar = () => {
  const { user, logout } = use(AuthContext);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const data = document.querySelector("html");
    data.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };

  const handleLogout = () => {
    logout()
      .then(() => {
        toast.success("Logout successful");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <div className="fixed top-0 left-0 z-50 w-full flex items-center justify-between px-6 md:px-16 lg:px-36 py-3 bg-white/70 backdrop-blur">
        {/* Logo */}
        <Link to="/" className="max-md:flex-1">
          <h1 className="text-2xl font-bold">
            Food <span className="text-purple-500">Sharing</span>
          </h1>
        </Link>

        {/* Menu items */}
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
            className={`
              ({ isActive }) =>
              isActive
                ? "text-purple-500 font-semibold"
                : "text-black hover:text-purple-400 " text-xl`}
            onClick={() => {
              scrollTo(0, 0);
              setIsOpen(false);
            }}
            to="/"
          >
            Home
          </NavLink>

          <NavLink
            className={`
              ({ isActive }) =>
              isActive
                ? "text-purple-500 font-semibold"
                : "text-black hover:text-purple-400"
              text-xl`}
            onClick={() => {
              scrollTo(0, 0);
              setIsOpen(false);
            }}
            to="/availableFood"
          >
            Available Food
          </NavLink>
        </div>

        <div className="flex items-center gap-6 relative">
          {user ? (
            <div className="relative">
              <img
                src={user.photoURL}
                alt={user.displayName}
                className="w-10 h-10 rounded-full cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />

              {/* Dropdown */}
              {dropdownOpen && (
                <div
                  className="
      absolute right-0 top-12 min-w-60 
      bg-white dark:bg-gray-800 
      text-gray-800 dark:text-gray-200 
      shadow-xl rounded-lg p-4 
      border border-gray-200 dark:border-gray-700 
      transition-all duration-300
    "
                >
                  <p className="mb-3 font-semibold text-center">
                    {user.displayName || "User"}
                  </p>
                  <div className="w-[10px]">
                    <p className="text-wrap mb-3 font-semibold text-center">
                      {user.email || "email"}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 text-sm">
                    <Link
                      to="/add-food"
                      onClick={() => setDropdownOpen(false)}
                      className="
          py-2 px-3 rounded-md 
          hover:bg-purple-100 dark:hover:bg-purple-700 
          transition
        "
                    >
                      Add Food
                    </Link>

                    <Link
                      to="/manage-food"
                      onClick={() => setDropdownOpen(false)}
                      className="
          py-2 px-3 rounded-md 
          hover:bg-purple-100 dark:hover:bg-purple-700 
          transition
        "
                    >
                      Manage My Foods
                    </Link>

                    <Link
                      to="/food-request"
                      onClick={() => setDropdownOpen(false)}
                      className="
          py-2 px-3 rounded-md 
          hover:bg-purple-100 dark:hover:bg-purple-700 
          transition
        "
                    >
                      My Food Requests
                    </Link>
                  </div>

                  {/* Dark Mode Toggle */}
                  <div
                    className="
        flex items-center justify-between 
        mt-4 pt-3 
        border-t border-gray-200 dark:border-gray-700
      "
                  >
                    <span>Dark Mode</span>
                    <input
                      type="checkbox"
                      className="toggle"
                      checked={theme === "dark"}
                      onChange={(e) => handleTheme(e.target.checked)}
                    />
                  </div>

                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="
        mt-4 w-full py-2 rounded-md 
        bg-purple-500 text-white 
        hover:bg-purple-600 
        dark:bg-purple-600 dark:hover:bg-purple-700
        transition
      "
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="px-4 py-1 sm:px-7 sm:py-2 bg-purple-500 text-white hover:bg-purple-600 transition rounded-full font-medium cursor-pointer"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <CiMenuFries
          onClick={() => setIsOpen(!isOpen)}
          className="max-md:ml-4 md:hidden w-8 h-8 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Navbar;
