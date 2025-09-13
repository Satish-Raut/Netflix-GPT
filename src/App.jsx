import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { Browse } from "./Pages/Browse";
import { SignIn } from "./Pages/SignIn";
import { AppLayout } from "./Components/Layout/AppLayout";
import { useDispatch } from "react-redux";

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



  return <RouterProvider router={router} />;
};

export default App;
