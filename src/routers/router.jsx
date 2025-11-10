import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../pages/Home";
import AvailableFood from "../components/AvailableFood";
import Ragister from "../pages/Ragister";
import Login from "../pages/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/availableFood",
        element: <AvailableFood />,
      },
      {
        path: "register",
        element: <Ragister />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);
