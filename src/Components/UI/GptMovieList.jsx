import { useSelector } from "react-redux";
import { GptMovieListCard } from "./GptMovieListCard";

export const GptMovieList = () => {
  const gptData = useSelector((state) => state.gptSearch);
  const gptMovie = gptData?.suggestedMovies;

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
