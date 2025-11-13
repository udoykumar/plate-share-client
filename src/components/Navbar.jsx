import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { MdOutlineClose } from "react-icons/md";
import { CiMenuFries } from "react-icons/ci";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import logo from "/logo.png";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = (checked) => setTheme(checked ? "dark" : "light");

  const handleLogout = () => {
    logout()
      .then(() => toast.success("Logout successful"))
      .catch((error) => console.log(error));
  };

  const navLinkClass = ({ isActive }) =>
    `text-md font-medium transition-colors duration-300 ${
      isActive
        ? "py-2 px-3 rounded-md bg-purple-100 text-purple-500  transition"
        : " py-2 px-3 rounded-md text-gray-800 dark:text-gray-200 hover:text-purple-500 hover:bg-purple-100 dark:hover:text-purple-400"
    }`;

  return (
    <div
      className={`fixed top-0 left-0 z-50 w-full flex items-center justify-between px-6 md:px-16 py-3 bg-white/70 dark:bg-gray-900/80 backdrop-blur shadow-md transition`}
    >
      <Link to="/" className="max-md:flex-1">
        <div className="flex items-center">
          <img className="w-15 h-10 rounded-fulls" src={logo} alt="" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Food <span className="text-purple-500">Sharing</span>
          </h1>
        </div>
      </Link>

      <div
        className={`max-md:absolute max-md:top-0 max-md:left-0 z-40 flex flex-col md:flex-row items-center gap-8 md:static 
           dark:bg-gray-800/90 max-md:h-90 md:hidden max-md:w-60 md:w-auto px-6 py-6 md:p-0
          transition-all duration-300 ease-in-out ${
            isOpen
              ? "max-md:opacity-100 bg-white/20 mt-20"
              : "max-md:opacity-0 max-md:pointer-events-none"
          }`}
      >
        <MdOutlineClose
          onClick={() => setIsOpen(false)}
          className="md:hidden absolute top-6 right-6 w-6 h-6 cursor-pointer text-gray-700 dark:text-gray-200"
        />

        <NavLink
          to="/"
          className={navLinkClass}
          onClick={() => setIsOpen(false)}
        >
          Home
        </NavLink>

        <NavLink
          to="/availableFood"
          className={navLinkClass}
          onClick={() => setIsOpen(false)}
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
              className="w-10 h-10 rounded-full cursor-pointer border-2 border-purple-400"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />

            {dropdownOpen && (
              <div
                className="absolute right-0 top-12 min-w-60 bg-white dark:bg-gray-800 
                text-gray-800 dark:text-gray-200 shadow-xl rounded-lg p-4 border border-gray-200 dark:border-gray-700"
              >
                <p className="mb-3 font-semibold text-center">
                  {user.displayName || "User"}
                </p>
                <p className="text-xs mb-3 text-center text-gray-500 dark:text-gray-400 break-words">
                  {user.email}
                </p>

                <div className="flex flex-col gap-2 text-sm">
                  <NavLink
                    to="/add-food"
                    onClick={() => setDropdownOpen(false)}
                    className={navLinkClass}
                  >
                    Add Food
                  </NavLink>

                  <NavLink
                    to="/manage-food"
                    onClick={() => setDropdownOpen(false)}
                    className={navLinkClass}
                  >
                    Manage My Foods
                  </NavLink>

                  <NavLink
                    to="/food-request"
                    onClick={() => setDropdownOpen(false)}
                    className={navLinkClass}
                  >
                    My Food Requests
                  </NavLink>
                </div>

                {/* Dark Mode Toggle */}
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <span>Dark Mode</span>
                  <input
                    type="checkbox"
                    className="toggle toggle-sm"
                    checked={theme === "dark"}
                    onChange={(e) => handleTheme(e.target.checked)}
                  />
                </div>

                <button
                  onClick={handleLogout}
                  className="mt-4 w-full py-2 rounded-md bg-purple-500 hover:bg-purple-600 text-white transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            className="px-5 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-full font-medium transition"
          >
            Login
          </Link>
        )}
      </div>

      {/* Menu Icon (mobile) */}
      <CiMenuFries
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden w-8 h-8 cursor-pointer text-gray-700 dark:text-gray-200"
      />
    </div>
  );
};

export default Navbar;
