import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../App";
import { Cart, Catalog, Home, Product, User } from "../pages";
import LoginPage from "../pages/Login/Login";

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

      // Login -> User
      {
        path: "login",
        element: <LoginPage />,
        children: [
          {
            path: "user",
            element: <User />,
          },
        ],
      },

      // User
      {
        path: "user",
        element: <User />,
      },

      // Catalog
      {
        path: "catalog",
        element: <Catalog />,
      },

      // Product
      {
        path: "product",
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
