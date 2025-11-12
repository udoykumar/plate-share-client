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
import FoodDetails from "../components/FoodDetails";
import UpdateFood from "../components/UpdatedFood";

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
        path: "/foodDetails/:id",
        loader: ({ params }) =>
          fetch(`https://plate-share-server-mu.vercel.app/foods/${params.id}`),
        element: (
          <PrivateRoute>
            <FoodDetails />
          </PrivateRoute>
        ),
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
        path: "/update-food/:id",
        element: (
          <PrivateRoute>
            <UpdateFood />
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
