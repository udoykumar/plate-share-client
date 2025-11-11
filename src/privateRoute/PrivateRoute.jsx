import React, { use } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate, useLocation } from "react-router";
import { HashLoader } from "react-spinners";
const PrivateRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);
  const location = useLocation();
  if (loading) {
    return (
      <div className="h-[80vh] flex justify-center items-center">
        <HashLoader color="#f06f4d" size={100} />;
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/login" state={location.pathname} replace />;
  }

  return children;
};

export default PrivateRoute;
