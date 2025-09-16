import { useRef, useState } from "react";
import { validateUserData } from "../Utils/Validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../Utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../Utils/userSlice";
import { AVTAR_1 } from "../Utils/Constants";

export const SignIn = () => {
  // State to track whether the user is signing in or signing up.
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  // Function to toggle between the sign-in and sign-up forms.
  const toggleForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  // Forma handling & Validation
  const handleFormSubmit = (e) => {
    e.preventDefault();

    const msg = validateUserData(email.current.value, password.current.value);
    setErrorMsg(msg);

    if (msg) return;

    // SignUp / SignIn
    if (!isSignInForm) {
      // Sign Up logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;

          updateProfile(auth.currentUser, {
            displayName: name.current.value,
            photoURL: AVTAR_1,
          })
            .then(() => {
              // Profile updated!
              // console.log(auth.currentUser);

              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(addUser({ uid, email, displayName, photoURL }));

              toggleForm();
            })
            .catch((error) => {
              // An error occurred
              // console.log(error);
              setErrorMsg(error.message);
            });

          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMsg(errorCode + " " + errorMessage);
        });
      // Converted to sign In after SignUp
    } else {
      // Sign In logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("Sign In: ", user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMsg(errorMessage);
          console.log(errorMessage);
        });
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center">
      <div className="bg-black p-12 sm:p-16 rounded-md w-full max-w-md text-white shadow-lg opacity-80 hover:scale-102 duration-300">
        {/* Title: Changes based on the current form state */}
        <h1 className="text-3xl font-bold mb-6">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>

        {/* Form */}
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
          {/* Full Name Input: Renders only on the Sign Up form */}
          {!isSignInForm && (
            <input
              ref={name}
              name="name"
              type="text"
              placeholder="Full Name"
              className="p-3 rounded bg-neutral-700 border border-neutral-600 focus:border-red-500 focus:outline-none"
              required
            />
          )}

          {/* Email or Phone */}
          <input
            ref={email}
            name="email"
            type="email"
            placeholder="Email or phone number"
            className="p-3 rounded bg-neutral-700 border border-neutral-600 focus:border-red-500 focus:outline-none"
            required
          />

          {/* Password */}
          <input
            ref={password}
            name="password"
            type="password"
            placeholder="Password"
            className="p-3 rounded bg-neutral-700 border border-neutral-600 focus:border-red-500 focus:outline-none"
            required
          />
          {/* Error Message */}
          <p className="text-md font-semibold text-center text-red-500">
            {errorMsg}
          </p>

          {/* Button: Text changes based on the current form state */}
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 transition-colors font-semibold py-3 rounded-md mt-4 cursor-pointer "
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
