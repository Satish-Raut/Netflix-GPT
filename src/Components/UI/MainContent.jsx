import useNowPlayingMovies from "../../Hooks/useNowPlayingMovies";
import { BackgroundTrailer } from "./BackgroundTrailer";

export const MainContent = () => {
  const movies = useNowPlayingMovies();
  if (!movies) return null;

  const mainMovie = movies[0];
  if (!mainMovie) return null;
  // console.log(mainMovie);

  const { id, title, original_title, overview, backdrop_path, poster_path } =
    mainMovie;

  // console.log(title)

  // URLs (adjust sizes if you want smaller images)
  const backdropUrl = backdrop_path
    ? `https://image.tmdb.org/t/p/original${backdrop_path}`
    : "";
  const posterUrl = poster_path
    ? `https://image.tmdb.org/t/p/original${poster_path}`
    : backdropUrl; // fallback

  return (
    <section className="relative w-full">
      {/* Hero container - controls visible height at different breakpoints */}
      <div className="relative w-full h-[60vh] sm:h-[75vh] md:h-[90vh] lg:h-screen overflow-hidden">
        {/* Background Video */}
        <BackgroundTrailer
          movieId={id}
          posterUrl={posterUrl}
          backdropUrl={backdropUrl}
          title={title}
        />

        {/* Content block - positioned relative to the top so header doesn't look far */}
        <div className="absolute left-4 sm:left-12 top-[55%] sm:top-[22%] md:top-[43%] max-w-xl">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-white">
            {title}
          </h1>

          <p className="mt-3 text-sm sm:text-base md:text-lg text-gray-200 line-clamp-3 max-w-md">
            {overview}
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <button className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-md font-bold hover:opacity-70 transition text-sm sm:text-base cursor-pointer">
              ▶ Play
            </button>
            <button className="flex items-center gap-2 bg-gray-500 bg-opacity-50 text-white px-4 py-2 rounded-md font-semibold hover:opacity-70 transition text-sm sm:text-base cursor-pointer">
              ℹ More Info
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
