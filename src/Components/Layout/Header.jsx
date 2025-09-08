import { NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <header className="absolute top-0 left-0 w-full z-20 px-0 sm:px-8 md:px-16 lg:px-24 pb-4">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <div className="h-6 sm:h-8 md:h-20 mt-0">
          <img
            src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2025-08-26/consent/87b6a5c0-0104-4e96-a291-092c11350111/0198e689-25fa-7d64-bb49-0f7e75f898d2/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
            alt="Netflix Logo"
            className="h-full object-contain"
          />
        </div>

        {/* Right side actions */}
        <div className="flex items-center space-x-4 pr-6">
          {/* Language Selector */}
          <div className="relative">
            <select className="bg-black bg-opacity-60 border border-gray-500 text-white text-sm rounded-md py-2 pl-8 pr-6 appearance-none cursor-pointer">
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
            </select>
            {/* Dropdown Icon */}
            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none">
              🌐
            </span>
          </div>

          {/* Sign In Button */}
          <NavLink
            to="/signin"
            className="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold py-2 px-4 rounded-md transition-colors duration-200"
          >
            Sign In
          </NavLink>
        </div>
      </div>
    </header>
  );
};
