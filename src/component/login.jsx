import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const Login = () => {
  const [isLoggedInMode, setIsLoggedInMode] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const submitCall = async (data) => {
    setErrorMessage("");
    try {
      if (isLoggedInMode) {
        const response = await axios.post(`${API_URL}/api/auth/login`, data);
        console.log(response.data);
        // Handle login success, e.g., save token, redirect
        reset();
        navigate('/');
      } else {
        const response = await axios.post(`${API_URL}/api/auth/signup`, data);
        console.log(response.data);
        // Handle signup success, e.g., redirect to login
        reset();
        navigate('/');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
      console.error("There was an error!", error.response ? error.response.data : error);
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
      {/* Header */}
      <div className="flex justify-center mb-6">
        <h2 className="text-3xl font-semibold text-slate-800">
          {isLoggedInMode ? "Login" : "Sign Up"}
        </h2>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{errorMessage}</span>
        </div>
      )}

      {/* Tab Control */}
      <div className="relative flex h-12 mb-8 border border-gray-300 rounded-full overflow-hidden">
        <button
          type="button"
          onClick={() => {
            setIsLoggedInMode(true);
            setErrorMessage("");
            reset();
          }}
          className={`w-1/2 text-lg font-medium z-10 transition-all duration-300 ${
            isLoggedInMode ? "text-white" : "text-slate-700"
          }`}
        >
          Login
        </button>

        <button
          type="button"
          onClick={() => {
            setIsLoggedInMode(false);
            setErrorMessage("");
            reset();
          }}
          className={`w-1/2 text-lg font-medium z-10 transition-all duration-300 ${
            !isLoggedInMode ? "text-white" : "text-slate-700"
          }`}
        >
          Sign Up
        </button>

        <div
          className={`absolute top-0 h-full w-1/2 rounded-full bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 transition-all duration-300 ${
            isLoggedInMode ? "left-0" : "left-1/2"
          }`}
        />
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(submitCall)} className="space-y-4">
        {/* Full Name */}
        {!isLoggedInMode && (
          <div>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 border-b-2 border-gray-300 outline-none focus:border-slate-600"
              {...register("fullName", {
                required: "Full Name is required",
              })}
            />

            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.fullName.message}
              </p>
            )}
          </div>
        )}

        {/* Email */}
        <div>
          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-3 border-b-2 border-gray-300 outline-none focus:border-slate-600"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email",
              },
            })}
          />

          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border-b-2 border-gray-300 outline-none focus:border-slate-600"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />

          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        {!isLoggedInMode && (
          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full p-3 border-b-2 border-gray-300 outline-none focus:border-slate-600"
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
            />

            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        )}

        {/* Forgot Password */}
        {isLoggedInMode && (
          <div className="text-right">
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="text-sm text-slate-700 hover:text-slate-900"
            >
              Forgot Password?
            </a>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 text-white font-medium hover:opacity-90 transition"
        >
          {isLoggedInMode ? "Login" : "Create Account"}
        </button>

        {/* Toggle */}
        <p className="text-center text-gray-600">
          {isLoggedInMode
            ? "Don't have an account? "
            : "Already have an account? "}

          <button
            type="button"
            onClick={() => {
              setIsLoggedInMode(!isLoggedInMode);
              reset();
            }}
            className="text-slate-800 font-semibold ml-1"
          >
            {isLoggedInMode ? "Sign Up" : "Login"}
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;