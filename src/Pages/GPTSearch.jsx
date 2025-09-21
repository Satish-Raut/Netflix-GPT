import { FaSearch, FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addSuggestedMovieData, toggleGptSearchView } from "../Utils/gptSlice";
import { IoMdSend } from "react-icons/io";
import { useRef } from "react";
import genAI from "../Utils/gemini";
import { API_OPTIONS } from "../Utils/Constants";
import { GptMovieList } from "../Components/UI/GptMovieList";

export const GPTSearch = () => {
  const dispatch = useDispatch();
  const searchText = useRef(null);
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted");
  };

  const searchTMDBMovies = async (movie) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`,
        API_OPTIONS
      );

      const data = await res.json();

      if (!data || !data.results) return null;

      // ✅ Exact match check (case-insensitive)
      const exactMatch = data.results.find(
        (m) => m.title.toLowerCase() === movie.toLowerCase()
      );

      return exactMatch || data || null;
      // return data.results;
    } catch (error) {
      console.log(error);
    }
  };

  const handleGeminiSearchClick = async () => {
    try {
      const response = await genAI.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Act as an expert movie recommender. Based on my query below, suggest a list of movies. Only give the movie names separated by comma & nothing any extra text or digit like date and year: "${searchText.current.value}"`,
      });

      const result = response.text;
      const recommendedMovies = result.split(", "); // Converted movie names to Arrays
      console.log(recommendedMovies);

      // Search the information for each movie in TMDB database
      const movieData = recommendedMovies.map((movie) =>
        searchTMDBMovies(movie)
      );

      const suggestedMoviesData = await Promise.all(movieData); // Resolve all promises
      console.log(suggestedMoviesData); // Final data

      // Sent All data to the Redux store
      dispatch(
        addSuggestedMovieData({
          movieName: recommendedMovies,
          geminiMovieData: suggestedMoviesData,
        })
      );
    } catch (error) {
      console.error("Gemini API error:", error);
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-start 
                bg-black/50 backdrop-blur-lg text-white p-8 pt-20 min-h-screen"
    >
      {/* Close Button */}
      <button
        onClick={() => dispatch(toggleGptSearchView())}
        className="absolute top-6 right-6 text-gray-300 hover:text-white text-2xl transition"
      >
        <FaTimes className="cursor-pointer" />
      </button>

      {/* Header */}
      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-sky-400 to-blue-600 bg-clip-text text-transparent drop-shadow-lg mb-6">
        GPT Search
      </h1>

      {/* Search Bar */}
      <form onSubmit={handleFormSubmit} className="relative w-full max-w-xl">
        <input
          ref={searchText}
          type="text"
          placeholder="Type your query..."
          className="w-full pl-12 pr-4 py-3 text-lg rounded-full border-2 border-white/30 
                     bg-white/10 backdrop-blur-md placeholder-gray-300
                     focus:outline-none focus:border-sky-400
                     transition-all duration-300"
        />
        <FaSearch className="absolute top-1/2 left-4 -translate-y-1/2 text-white text-xl opacity-70" />
        <button
          onClick={handleGeminiSearchClick}
          className="absolute top-1/2 right-2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 shadow-md shadow-sky-800/30 text-white text-xl hover:scale-110 hover:shadow-lg hover:from-sky-400 hover:to-indigo-400 active:scale-105 transition-all duration-300"
        >
          <IoMdSend className="text-2xl" />
        </button>
      </form>

      {/* AI Suggested Movie Result */}
      <div className="mt-10 w-full max-w-8xl space-y-4">
        <p className="text-gray-400 text-center">Results will appear here...</p>

        <div className="p-4 rounded-xl bg-white/5 border border-white/10 shadow hover:bg-white/10 transition lg:mx-6">
          <h2 className="text-lg font-semibold text-center">Example Result Title</h2>
          <div className="text-gray-300 text-sm mt-6">
            <GptMovieList/>
          </div>
        </div>
      </div>
    </div>
  );
};
