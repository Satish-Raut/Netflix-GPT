import { useSelector } from "react-redux";
import { GptMovieListCard } from "./GptMovieListCard";

export const GptMovieList = ({loading}) => {
  const gptData = useSelector((state) => state.gptSearch);
  const gptMovie = gptData?.suggestedMovies;

  // Show loader if gptMovie is null or undefined or loading is true
  if (loading) {
    return (
      <div className="flex items-center justify-center py-10">
        <div className="flex space-x-2">
          <span className="dot animate-bounce bg-blue-500 w-3 h-3 rounded-full"></span>
          <span className="dot animate-bounce bg-blue-500 w-3 h-3 rounded-full delay-150"></span>
          <span className="dot animate-bounce bg-blue-500 w-3 h-3 rounded-full delay-300"></span>
        </div>
      </div>
    );
  }

  if (!gptMovie || gptMovie.length === 0) return null;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 px-1 lg:px-6">
      {gptMovie.map((movie, index) => {
        // If the poster_path is not available for any movie then do not update the UI
        return (
          movie?.poster_path && (
            <GptMovieListCard
              key={movie.id || movie.title || index}
              movie={movie}
            />
          )
        );
      })}
    </div>
  );
};
