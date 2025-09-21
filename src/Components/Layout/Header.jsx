import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FaSearch, FaBell, FaBars, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../../Utils/userSlice";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../Utils/firebase";
import { AVTAR_2, LOGO } from "../../Utils/Constants";
import { toggleGptSearchView } from "../../Utils/gptSlice";
import { SupportedLanguages } from "../../Utils/LanguageConstant";
import { changeLanguage } from "../../Utils/configSlice";

export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [menuOpen, setMenuOpen] = useState(false);
  const [avatarMenu, setAvatarMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const isSignInPage = location.pathname === "/signin";

  // ✅ Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Capturing the Auth State changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName, photoURL }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);

  const handelSignOut = () => {
    signOut(auth).catch((error) => {
      console.error("Error signing out:", error);
    });
  };

  const handleGptSearch = () => {
    // Toggle GPT Search
    dispatch(toggleGptSearchView());
  };

  const handelLanguage = (e) => {
    // console.log(e.target.value)
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-30 px-4 sm:px-8 py-4 flex justify-between items-center transition-colors duration-500 ${
        !isSignInPage && user
          ? isScrolled
            ? "bg-black bg-opacity-80"
            : "bg-transparent"
          : "absolute"
      }`}
    >
      {/* Left: Logo */}
      <div className="flex items-center space-x-4 md:space-x-8 mx-2">
        <NavLink to={isSignInPage ? "/" : user ? "/browse" : "/"}>
          <img src={LOGO} className="h-10 md:h-14 " />
        </NavLink>

        {/* Nav only if signed in */}
        {!isSignInPage && user && (
          <nav className="hidden md:flex space-x-4 lg:space-x-6 text-white text-md">
            <NavLink to="/browse">Home</NavLink>
            <NavLink to="/browse">TV Shows</NavLink>
            <NavLink to="/browse">Movies</NavLink>
            <NavLink to="/browse">New & Popular</NavLink>
            <NavLink to="/browse">My List</NavLink>
            <NavLink to="/browse">Languages</NavLink>
          </nav>
        )}
      </div>

      {/* Right side */}
      <div className="flex items-center space-x-2 sm:space-x-4 mx-3">
        {!user || isSignInPage ? (
          <>
            <select
              onChange={handelLanguage}
              className="bg-black bg-opacity-60 border border-gray-500 text-white text-sm rounded-md py-1 pl-2 pr-6"
            >
              {SupportedLanguages.map((lang) => (
                <option key={lang.id} value={lang.id}>
                  {lang.name}
                </option>
              ))}
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
            <div
              onClick={handleGptSearch}
              className="relative flex flex-row items-center justify-center gap-2 px-4 py-2 
             border-2 border-white rounded-full cursor-pointer 
             bg-white/10 backdrop-blur-md shadow-md
             transition-all duration-300 ease-in-out
             hover:scale-105 hover:bg-white/20 hover:shadow-lg active:scale-95"
            >
              {/* Blue highlight with ping effect */}
              <span className="absolute -top-1 -right-1 flex size-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex size-3 rounded-full bg-red-500"></span>
              </span>

              {/* Icon */}
              <FaSearch className="text-white text-xl transform transition-transform duration-300 group-hover:rotate-12" />

              {/* Label */}
              <span className="hidden sm:inline text-white font-medium transition-opacity duration-300">
                GPT Search
              </span>
            </div>

            <FaBell className="text-white cursor-pointer" />

            {/* User Avatar Dropdown */}
            <div className="relative">
              <img
                src={user?.photoURL || AVTAR_2}
                alt="User Avatar"
                className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-13 lg:h-13 rounded-full object-cover border-2 border-transparent hover:border-red-500 hover:scale-105 transition-all duration-300 cursor-pointer"
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
            className="md:hidden text-white text-xl ml-2 z-10"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        )}
      </div>

      {/* Mobile Navigation */}
      {!isSignInPage && user && menuOpen && (
        <nav className=" absolute top-0 left-0 w-full bg-black bg-opacity-80 flex flex-col items-center py-4 space-y-3 md:hidden text-white text-xl">
          <NavLink onClick={() => setMenuOpen(false)} to="/browse">
            Home
          </NavLink>
          <NavLink onClick={() => setMenuOpen(false)} to="/browse">
            TV Shows
          </NavLink>
          <NavLink onClick={() => setMenuOpen(false)} to="/browse">
            Movies
          </NavLink>
          <NavLink onClick={() => setMenuOpen(false)} to="/browse">
            New & Popular
          </NavLink>
          <NavLink onClick={() => setMenuOpen(false)} to="/browse">
            My List
          </NavLink>
          <NavLink onClick={() => setMenuOpen(false)} to="/browse">
            Languages
          </NavLink>
        </nav>
      )}
    </header>
  );
};
