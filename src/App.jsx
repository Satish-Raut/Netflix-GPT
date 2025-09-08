import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { Home } from "./Pages/Home";
import { Browse } from "./Pages/Browse";
import { SignIn } from "./Pages/SignIn";
import { AppLayout } from "./Components/Layout/AppLayout";

const App = () => {
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
