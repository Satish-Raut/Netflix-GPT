import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FaSearch, FaBell, FaBars, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../../Utils/userSlice";
import { signOut } from "firebase/auth";
import { auth } from "../../Utils/firebase";

export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [menuOpen, setMenuOpen] = useState(false);
  const [avatarMenu, setAvatarMenu] = useState(false);
  const location = useLocation();

  const isSignInPage = location.pathname === "/signin";

  const handelSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(removeUser());
        navigate("/");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  return (
    <header
      className={`top-0 left-0 w-full z-30 px-4 sm:px-8 py-4 flex justify-between items-center ${
        !isSignInPage && user ? "fixed bg-black bg-opacity-70" : "absolute"
      }`}
    >
      {/* Left: Logo */}
      <div className="flex items-center space-x-4 md:space-x-8 mx-4">
        <NavLink to={isSignInPage ? "/" : user ? "/browse" : "/"}>
          <img
            src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2025-08-26/consent/87b6a5c0-0104-4e96-a291-092c11350111/0198e689-25fa-7d64-bb49-0f7e75f898d2/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
            alt="Netflix Logo"
            className="h-10 md:h-14"
          />
        </NavLink>

        {/* Nav only if signed in */}
        {!isSignInPage && user && (
          <nav className="hidden md:flex space-x-4 lg:space-x-6 text-white text-md">
            <NavLink to="/browse">Home</NavLink>
            <NavLink to="/tvshows">TV Shows</NavLink>
            <NavLink to="/movies">Movies</NavLink>
            <NavLink to="/new">New & Popular</NavLink>
            <NavLink to="/mylist">My List</NavLink>
            <NavLink to="/languages">Languages</NavLink>
          </nav>
        )}
      </div>

      {/* Right side */}
      <div className="flex items-center space-x-2 sm:space-x-4 mx-3">
        {!user || isSignInPage ? (
          <>
            <select className="bg-black bg-opacity-60 border border-gray-500 text-white text-sm rounded-md py-1 pl-2 pr-6">
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
            </select>

            <NavLink
              to="/signin"
              className="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold py-2 px-4 rounded-md transition"
            >
              Sign In
            </NavLink>
          </>
        ) : (
          <>
            <FaSearch className="text-white cursor-pointer" />
            <span className="hidden sm:inline text-white">Children</span>
            <FaBell className="text-white cursor-pointer" />

            {/* User Avatar Dropdown */}
            <div className="relative">
              <img
                src={
                  user?.photoURL ||
                  "https://yt3.ggpht.com/hyqijXbkwfgZFIY5OWHddRNBcgD1A8VSQtPQReAaxhERw2jqINlRN4U8hyBFMZip0m78RNP2rA=s88-c-k-c0x00ffffff-no-rj"
                }
                alt="User Avatar"
                className="
                  w-8 h-8 
                  sm:w-10 sm:h-10 
                  md:w-12 md:h-12 
                  lg:w-14 lg:h-14 
                  rounded-full object-cover 
                  border-2 border-transparent 
                  hover:border-red-500 hover:scale-105 
                  transition-all duration-300 cursor-pointer
                "
                onClick={() => setAvatarMenu(!avatarMenu)}
              />

              {avatarMenu && (
                <div className="absolute right-0 mt-2 w-30 bg-red-500 text-white rounded-md shadow-lg border border-gray-700">
                  <button
                    onClick={() => {
                      setAvatarMenu(false);
                      handelSignOut();
                    }}
                    className="block w-full text-center px-4 py-2 hover:bg-red-800 hover:rounded-md transition cursor-pointer"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </>
        )}

        {/* Mobile menu toggle */}
        {!isSignInPage && user && (
          <button
            className="md:hidden text-white text-xl ml-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        )}
      </div>

      {/* Mobile Navigation */}
      {!isSignInPage && user && menuOpen && (
        <nav className=" absolute top-full left-0 w-full bg-black bg-opacity-90 flex flex-col items-center py-4 space-y-3 md:hidden text-white text-xl">
          <NavLink onClick={() => setMenuOpen(false)} to="/browse">
            Home
          </NavLink>
          <NavLink onClick={() => setMenuOpen(false)} to="/tvshows">
            TV Shows
          </NavLink>
          <NavLink onClick={() => setMenuOpen(false)} to="/movies">
            Movies
          </NavLink>
          <NavLink onClick={() => setMenuOpen(false)} to="/new">
            New & Popular
          </NavLink>
          <NavLink onClick={() => setMenuOpen(false)} to="/mylist">
            My List
          </NavLink>
          <NavLink onClick={() => setMenuOpen(false)} to="/languages">
            Languages
          </NavLink>
        </nav>
      )}
    </header>
  );
};
