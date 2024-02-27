import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../App";
import {
  Cart,
  Catalog,
  Home,
  Product,
  AdminDashboard,
  AdminProfile,
  Login,
} from "../pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // Home
      {
        path: "",
        element: <Home />,
      },

      // Login -> Admin
      {
        path: "login",
        element: <Login />,
      },

      // Admin
      {
        path: "admin",
        element: <AdminDashboard />,
        children: [
          {
            path: "profile",
            element: <AdminProfile />,
          },
        ],
      },

      // Admin profile (Debt)
      {
        path: "/admin/profile",
        element: <AdminProfile />,
      },

      // Catalog
      {
        path: "catalog",
        element: <Catalog />,
        children: [
          {
            path: ":id",
            element: <Catalog />,
          },
        ],
      },

      // Product
      {
        path: "products",
        children: [
          {
            path: ":id",
            element: <Product />,
          },
        ],
      },

      // Cart
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "*",
        element: <Navigate to="/" />,
      },
    ],
  },
]);
