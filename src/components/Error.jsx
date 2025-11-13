import React from "react";
import error from "../assets/error-404.png";
import { Link } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";
const Error = () => {
  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen">
        <div className="space-y-4 ">
          <img src={error} alt="" />
          <h1 className="text-2xl font-bold text-center">
            Oops, Page not found!
          </h1>
          <p className="text-xl text-center">
            The page you are looking for is not available
          </p>
          <div className="flex justify-center">
            <Link
              to="/"
              className="text-center mx-auto  border border-gray-500/30 px-4 py-2 text-lg text-gray-800 rounded bg-white hover:text-pink-500/70 hover:bg-pink-500/10 hover:border-pink-500/30 active:scale-95 transition"
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Error;
