import { useState } from "react";

export const SignIn = () => {
  // State to track whether the user is signing in or signing up.
  const [isSignInForm, setIsSignInForm] = useState(true);

  // Function to toggle between the sign-in and sign-up forms.
  const toggleForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div className="flex-grow flex items-center justify-center">
      <div className="bg-black p-12 sm:p-16 rounded-md w-full max-w-md text-white shadow-lg bg-opacity-75">
        {/* Title: Changes based on the current form state */}
        <h1 className="text-3xl font-bold mb-6">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>

        {/* Form */}
        <form className="flex flex-col gap-4">
          {/* Full Name Input: Renders only on the Sign Up form */}
          {!isSignInForm && (
            <input
              type="text"
              placeholder="Full Name"
              className="p-3 rounded bg-neutral-700 border border-neutral-600 focus:border-red-500 focus:outline-none"
              required
            />
          )}

          {/* Email or Phone */}
          <input
            type="text"
            placeholder="Email or phone number"
            className="p-3 rounded bg-neutral-700 border border-neutral-600 focus:border-red-500 focus:outline-none"
            required
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            className="p-3 rounded bg-neutral-700 border border-neutral-600 focus:border-red-500 focus:outline-none"
            required
          />

          {/* Button: Text changes based on the current form state */}
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 transition-colors font-semibold py-3 rounded-md mt-8"
          >
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>
        </form>

        {/* Extra actions: "Remember me" and "Need help?" are only shown for Sign In */}
        {isSignInForm && (
          <div className="flex justify-between items-center text-sm text-gray-400 mt-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="bg-neutral-700 border-neutral-500 rounded-sm w-4 h-4 text-white focus:ring-0"
              />
              Remember me
            </label>
            <a href="#" className="hover:underline">
              Need help?
            </a>
          </div>
        )}

        {/* Toggle link to switch between Sign In and Sign Up */}
        <p className="text-gray-400 text-sm mt-8">
          {isSignInForm ? "New to Netflix? " : "Already registered? "}
          <span
            onClick={toggleForm}
            className="text-white hover:underline font-semibold cursor-pointer"
          >
            {isSignInForm ? "Sign up now" : "Sign in now"}
          </span>
          .
        </p>

        {/* reCAPTCHA Notice */}
        <p className="text-xs text-gray-500 mt-3">
          This page is protected by Google reCAPTCHA to ensure you're not a bot.{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Learn more.
          </a>
        </p>
      </div>
    </div>
  );
};
