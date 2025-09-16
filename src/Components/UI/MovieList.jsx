import { MovieCards } from "./MovieCards";

export const MovieList = ({ title, movies }) => {
  if (!movies || movies.length === 0) return null;

  return (
    <div className="mb-4 md:mb-8 md:mx-7">
      {/* Title */}
      <h1 className="text-lg sm:text-xl md:text-2xl lg:text-2xl font-bold px-4 sm:px-6 z-10">
        {title}
      </h1>

      {/* Horizontal scroll */}
      <div className="flex gap-4 sm:gap-6 overflow-x-auto px-4 sm:px-6 scrollbar-hide sm:py-3">
        {movies?.map((movie) => (
          <MovieCards key={movie.id} posterPath={movie.poster_path} />
        ))}
      </div>
    </div>
  );
};
