import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../pages/Home";
import AvailableFood from "../components/AvailableFood";
import Ragister from "../pages/Ragister";
import Login from "../pages/Login";
import ManageMyFoods from "../pages/ManageMyFoods";
import AddFood from "../pages/AddFood";
import MyFoodRequests from "../pages/MyFoodRequests";
import PrivateRoute from "../privateRoute/PrivateRoute";

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
      {
        path: "add-food",
        element: (
          <PrivateRoute>
            <AddFood />,
          </PrivateRoute>
        ),
      },
      {
        path: "manage-food",
        element: (
          <PrivateRoute>
            <ManageMyFoods />,
          </PrivateRoute>
        ),
      },
      {
        path: "food-request",
        element: (
          <PrivateRoute>
            <MyFoodRequests />,
          </PrivateRoute>
        ),
      },
    ],
  },
]);
