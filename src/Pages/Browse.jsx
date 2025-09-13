import { MainContent } from "../Components/UI/MainContent";
import { SecondaryContent } from "../Components/UI/SecondaryContent";
import useNowPlayingMovies from "../Hooks/useNowPlayingMovies";

export const Browse = () => {
  const movies = useNowPlayingMovies();
  // console.log(movies);

  return (
    <div className="min-h-screen text-white">
      {/* Main Hero Section */}
      <MainContent className="border-green-400" />

      {/* Secondary Content Section */}
      <div className="relative z-10 px-4 md:px-12 lg:px-20 mt-[-4rem]">
        <SecondaryContent />
      </div>
    </div>
  );
};
