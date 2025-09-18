import { FaSearch, FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { toggleGptSearchView } from "../Utils/gptSlice";

export const GPTSearch = () => {
  const dispatch = useDispatch();

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center 
                    bg-black/50 backdrop-blur-lg text-white p-16 pt-14">
      {/* Close Button */}
      <button
        onClick={() => dispatch(toggleGptSearchView())}
        className="absolute top-6 right-6 text-gray-300 hover:text-white text-2xl transition"
      >
        <FaTimes className="cursor-pointer"/>
      </button>

      {/* Header */}
      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-sky-400 to-blue-600 bg-clip-text text-transparent drop-shadow-lg mb-6">
        GPT Search
      </h1>

      {/* Search Bar */}
      <div className="relative w-full max-w-xl">
        <input
          type="text"
          placeholder="Type your query..."
          className="w-full pl-12 pr-4 py-3 text-lg rounded-full border-2 border-white/30 
                     bg-white/10 backdrop-blur-md placeholder-gray-300
                     focus:outline-none focus:border-sky-400
                     transition-all duration-300"
        />
        <FaSearch className="absolute top-1/2 left-4 -translate-y-1/2 text-white text-xl opacity-70" />
      </div>

      {/* Results */}
      <div className="mt-10 w-full max-w-2xl space-y-4">
        <p className="text-gray-400 text-center">Results will appear here...</p>

        <div className="p-4 rounded-xl bg-white/5 border border-white/10 shadow hover:bg-white/10 transition">
          <h2 className="text-lg font-semibold">Example Result Title</h2>
          <p className="text-gray-300 text-sm mt-1">
            This is where the generated or fetched search results would be shown.
          </p>
        </div>
      </div>
    </div>
  );
};
