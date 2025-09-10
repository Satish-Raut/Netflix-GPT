import { NavLink, Outlet, useLocation } from "react-router-dom";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { useSelector } from "react-redux";

export const AppLayout = () => {
  // Get the Logged in user data from the redux store
  const user = useSelector((state) => state.user);

  // Get the current path
  const location = useLocation();

  // Check if we are on the home page
  const isHomePage = location.pathname === "/";
  const isSignInPage = location.pathname === "/signin";

  return (
    <>
      <div
        className="min-h-screen bg-cover bg-center flex flex-col"
        style={
          isSignInPage || (!user && isHomePage)
            ? {
                backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.9) 1%, rgba(0,0,0,0.6) 10%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.8) 100%), url('https://assets.nflxext.com/ffe/siteui/vlv3/8d617e19-3c3c-4c28-8998-c9b14dbc7200/web/IN-en-20250901-TRIFECTA-perspective_48d84d4e-9558-46b8-a0f3-8b2dc8478431_small.jpg')`,
              }
            : {}
        }
      >
        <Header />

        {/* Hero Section visible only on home page and if user is not signed in */}
        {!user && isHomePage && (
          <main className="flex-grow flex items-center justify-center text-center text-white px-6">
            <div className="max-w-2xl">
              <h1 className="text-6xl md:text-6xl font-bold mb-4">
                Unlimited movies, TV shows and more
              </h1>
              <p className="text-lg mb-2">
                Starts at ₹149. Cancel at any time.
              </p>
              <p className="mb-6">
                Ready to watch? Enter your email to create or restart your
                membership.
              </p>

              {/* Email input & button */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <input
                  type="email"
                  placeholder="Email address"
                  className="p-4 rounded-md text-white bg-black bg-opacity-40 border border-gray-500 flex-grow w-full sm:w-2/3 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <NavLink
                  to={"/signin"}
                  className="bg-red-600 hover:bg-red-700 px-6 py-4 rounded-md font-semibold text-white cursor-pointer my-auto"
                >
                  Get Started &gt;
                </NavLink>
              </div>
            </div>
          </main>
        )}

        <Outlet />
      </div>
      <Footer />
    </>
  );
};
