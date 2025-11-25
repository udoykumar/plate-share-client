import React from "react";
import { GiCookingPot } from "react-icons/gi";

const Loader = ({ fullScreen = false }) => {
  const loaderContent = (
    <div
      className={`flex flex-col items-center justify-center ${
        fullScreen ? "min-h-screen" : "py-12"
      }`}
    >
      <div className="relative">
        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-purple-500"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <GiCookingPot className="text-purple-500 text-2xl" />
        </div>
      </div>
      <p className="mt-4 text-lg font-medium text-gray-600">Loading...</p>
      <p className="text-sm text-gray-500">Preparing your delicious recipes</p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 z-50 flex items-center justify-center">
        {loaderContent}
      </div>
    );
  }

  return loaderContent;
};

export default Loader;
