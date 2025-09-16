import { IMG_CDN_URL } from "../../Utils/Constants";

export const MovieCards = ({ posterPath }) => {
  return (
    <div className="relative flex-shrink-0 w-28 sm:w-36 md:w-44 lg:w-52 xl:w-45 aspect-[2/3] rounded-md overflow-hidden cursor-pointer duration-500 hover:scale-105 hover:z-10">
      <img
        className="w-full h-full object-cover"
        src={IMG_CDN_URL + posterPath}
        alt="movie poster"
      />
    </div>
  );
};
