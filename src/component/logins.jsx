import React from "react";
import {useForm} from "react-hook-form";

const Login = () => {
    const {register,handleSubmit,formState:{errors}}=useForm();
    const submitCall=(data)=>{
        console.log (data)
    }
  const [isLoggedInMode, setIsLoggedInMode] = React.useState(true);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (isLoggedInMode) {
//       console.log("Login Form Submitted");
//     } else {
//       console.log("Sign Up Form Submitted");
//     }
//   };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
        {/* Header */}
        <div className="flex justify-center mb-6">
          <h2 className="text-3xl font-semibold text-slate-800">
            {isLoggedInMode ? "Login" : "Sign Up"}
          </h2>
        </div>

        {/* Tab Control */}
        <div className="relative flex h-12 mb-8 border border-gray-300 rounded-full overflow-hidden">
          <button
            type="button"
            onClick={() => setIsLoggedInMode(true)}
            className={`w-1/2 text-lg font-medium z-10 transition-all duration-300 ${
              isLoggedInMode ? "text-white" : "text-slate-700"
            }`}
          >
            Login
          </button>

          <button
            type="button"
            onClick={() => setIsLoggedInMode(false)}
            className={`w-1/2 text-lg font-medium z-10 transition-all duration-300 ${
              !isLoggedInMode ? "text-white" : "text-slate-700"
            }`}
          >
            Sign Up
          </button>

          <div
            className={`absolute top-0 h-full w-1/2 rounded-full bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 transition-all duration-300 ease-in-out ${
              isLoggedInMode ? "left-0" : "left-1/2"
            }`}
          />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(submitCall)} className="space-y-5">
          {!isLoggedInMode && (
            <input
              type="text"
              placeholder="Full Name"
              required
              {...register("fullName", {required: "Full Name is required"})}
              className="w-full p-3 border-b-2 border-gray-300 outline-none focus:border-slate-600 transition-colors placeholder-gray-400"
              {...errors.fullName && (
                <div className="text-red-500 text-sm">{errors.fullName.message}</div>
              )}
            />
          )}

          <input
            type="email"
            placeholder="Email Address"
            required
            {...register("email", {required: "Email Address is required",
            pattern:{ 
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Invalid email address",}
            })}
            className="w-full p-3 border-b-2 border-gray-300 outline-none focus:border-slate-600 transition-colors placeholder-gray-400"
            {...errors.email && (
                <div className="text-red-500 text-sm">{errors.email.message}</div>
              )}
          />

          <input
            type="password"
            placeholder="Password"
            required
            {...register("password", {required: "Password is required"})}
            className="w-full p-3 border-b-2 border-gray-300 outline-none focus:border-slate-600 transition-colors placeholder-gray-400"
          />

          {!isLoggedInMode && (
            <input
              type="password"
              placeholder="Confirm Password"
              required
              {...register("confirmPassword", {required: "Confirm Password is required"})}
              className="w-full p-3 border-b-2 border-gray-300 outline-none focus:border-slate-600 transition-colors placeholder-gray-400"
            />
          )}

          {isLoggedInMode && (
            <div className="text-right">
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="text-sm text-slate-700 hover:text-slate-900 transition-colors"
              >
                Forgot Password?
              </a>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 text-white font-medium shadow-md hover:opacity-90 transition duration-300"
          >
            {isLoggedInMode ? "Login" : "Create Account"}
          </button>

          <p className="text-center text-gray-600">
            {isLoggedInMode
              ? "Don't have an account? "
              : "Already have an account? "}

            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setIsLoggedInMode(!isLoggedInMode);
              }}
              className="text-slate-800 font-semibold hover:text-black"
            >
              {isLoggedInMode ? "Sign Up" : "Login"}
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;