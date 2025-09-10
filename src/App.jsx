import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { Browse } from "./Pages/Browse";
import { SignIn } from "./Pages/SignIn";
import { AppLayout } from "./Components/Layout/AppLayout";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Utils/firebase";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "./Utils/userSlice";

const App = () => {
  const dispatch = useDispatch();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "/browse",
          element: <Browse />,
        },
        {
          path: "/signin",
          element: <SignIn />,
        },
      ],
    },
  ]);

  // Capturing the Auth State changes

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName, photoURL })); // ✅ send object as payload
      } else {
        // User is signed out
        dispatch(removeUser());
      }
    });
  }, []);

  return <RouterProvider router={router} />;
};

export default App;
