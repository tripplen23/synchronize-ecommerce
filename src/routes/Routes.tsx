import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../App";
import { Cart, Catalog, Home, Product, AdminDashboard, Login } from "../pages";

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

      // Admin: Should be set as a private route
      {
        path: "admin",
        element: <AdminDashboard />,
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
