import { MainContent } from "../Components/UI/MainContent";
import { SecondaryContent } from "../Components/UI/SecondaryContent";
import useNowPlayingMovies from "../Hooks/useNowPlayingMovies";

export const Browse = () => {
  const movies = useNowPlayingMovies();
  // console.log(movies);

  return (
    <div className="min-h-screen text-white bg-black">
      {/* Main Hero Section */}
      <MainContent className="border-green-400 " />

    
      {/* Secondary Content Section */}
      <div className="relative z-10 mt-[-12rem] lg:mt-[-18rem]">
        <SecondaryContent />
      </div>
    </div>
  );
};
