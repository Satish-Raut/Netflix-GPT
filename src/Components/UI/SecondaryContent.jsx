import { useSelector } from "react-redux";
import { MovieList } from "./MovieList";
import usePopularMovies from "../../Hooks/usePopularMovies";
import { useTopRatedMovies } from "../../Hooks/useTopRatedMovies";
import { useUpcomingMovies } from "../../Hooks/useUpcomingMovies";

export const SecondaryContent = () => {
  const nowPlaying_movies = useSelector((state) => state.movies.nowPlayingMovies);
  const popular_movies = usePopularMovies();
  const topRated_movies = useTopRatedMovies();
  const upcoming_movies = useUpcomingMovies();

  return (
    <div className="relative mt-50 md:mt-34 min-h-screen py-4">
      <MovieList title="Now Playing" movies={nowPlaying_movies} />
      <MovieList title="Popular" movies={popular_movies} />
      <MovieList title="Top Rated" movies={topRated_movies} />
      <MovieList title="Upcoming" movies={upcoming_movies} />
    </div>
  );
};
