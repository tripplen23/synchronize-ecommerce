import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../redux/utils/hooks";
import { getUser, login } from "../../redux/features/auth/authSlice";
import SpinnerComponent from "../../components/reusable/SpinnerComponent/SpinnerComponent";
import TransitionEffect from "../../components/reusable/TransitionEffect/TransitionEffect";

const Login = () => {
  const { user, token, isLoading } = useAppSelector((state) => state.auth);
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
    console.log("Login data: ", data);
    const username = data.username as string;
    const password = data.password as string;

    const resultAction = await dispatch(login({ username, password }));

    if (login.fulfilled.match(resultAction)) {
      // Login was successful, navigate to Home page
      navigate("/");
      console.log(user);
    } else if (login.rejected.match(resultAction)) {
      const error: any = resultAction.payload;
      console.error(
        `Login failed with status ${error.status}: ${error.message}`
      );
      // Handle the error as needed, e.g., show an error message to the user
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <TransitionEffect />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username (For demo: johnd)
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Enter your username"
            {...register("username", { required: true })}
          />
          {errors.username && (
            <p className="text-red-500 text-xs italic">
              This field is required
            </p>
          )}
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password (For demo: m38rmF$)
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            placeholder="Enter your password"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <p className="text-red-500 text-xs italic">
              This field is required
            </p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-dark hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
