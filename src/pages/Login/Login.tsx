import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../redux/utils/hooks";
import { getUser, login } from "../../redux/features/auth/authSlice";
import { motion } from "framer-motion";
import TransitionEffect from "../../components/reusable/TransitionEffect/TransitionEffect";
import VanGoghImage from "../../assets/imgs/VanGoghImage.jpg"; // Import your Van Gogh image

const Login = () => {
  const { user, token } = useAppSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user === null && token) {
      const userId = localStorage.getItem("userIdDemo");
      dispatch(getUser(Number(userId)));
    }
  }, [token, user, dispatch]);

  // TODO: Signin/Login handler
  const onSubmit = async (data: any) => {
    const username = data.username as string;
    const password = data.password as string;

    const resultAction = await dispatch(login({ username, password }));

    if (login.fulfilled.match(resultAction)) {
      // Login was successful, navigate to Home page
      navigate("/");
    } else if (login.rejected.match(resultAction)) {
      const error: any = resultAction.payload;
      console.error(
        `Login failed with status ${error.status}: ${error.message}`
      );
      // Handle the error as needed, e.g., show an error message to the user
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden mt-6">
      <TransitionEffect />
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${VanGoghImage})` }}
      ></div>
      <div className="bg-white shadow-md rounded p-8 w-full max-w-md relative z-10">
        <div>
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
            Welcome Back!
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="relative z-10">
            <div className="mb-6">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="username"
              >
                Username (For demo: johnd)
              </label>
              <motion.input
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="input-field w-full p-2"
                type="text"
                placeholder="Enter your username"
                {...register("username", { required: true })}
              />
              {errors.username && (
                <p className="text-red-500 text-xs mt-1">
                  This field is required
                </p>
              )}
            </div>

            <div className="mb-6">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="password"
              >
                Password (For demo: m38rmF$)
              </label>
              <motion.input
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="input-field w-full p-2"
                type="password"
                placeholder="Enter your password"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  This field is required
                </p>
              )}
            </div>

            <div className="flex items-center justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-dark hover:bg-gray-800 text-white font-bold py-2 px-6 rounded-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign In
              </motion.button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
