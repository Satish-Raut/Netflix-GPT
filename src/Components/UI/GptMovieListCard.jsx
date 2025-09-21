import { IMG_CDN_URL } from "../../Utils/Constants";

export const GptMovieListCard = ({ movie }) => {
  const { title, overview, poster_path, popularity } = movie;
  return (
    <div className="rounded-2xl overflow-hidden bg-white/10 border border-white/20 shadow-md 
                    hover:border-blue-500 transition-all duration-500 flex flex-col items-center ">
      
      {/* Poster Image */}
      <div className="relative w-full sm:w-44 md:w-48 lg:w-64 h-80 rounded-[20%] lg:rounded-md overflow-hidden cursor-pointer 
                      duration-500 hover:scale-105 hover:z-10 mt-4 p-4 lg:p-0">
        <img
          className="w-full h-full object-cover"
          src={IMG_CDN_URL + poster_path}
          alt={title}
        />
      </div>

      {/* Text Content */}
      <div className="p-4 w-full flex flex-col gap-2">
        <h2 className="text-lg sm:text-xl font-bold text-white truncate hover:text-blue-400 transition-colors duration-300">
          {title}
        </h2>
        <p className="text-sm sm:text-base text-gray-300 leading-relaxed line-clamp-4">
          {overview}
        </p>
        <p className="text-sm sm:text-base text-blue-300 font-semibold">
          Rating: {popularity ? popularity.toFixed(1) : "N/A"}
        </p>
      </div>
    </div>
  );
};
