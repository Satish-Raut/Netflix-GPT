import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../Utils/Constants";
import { addTrailerVideo } from "../Utils/movieSlice";
import { useEffect } from "react";

export const useGetTrailer = (movieId) => {
    const dispatch = useDispatch();
    const trailerVideo = useSelector((state) => state.movies.trailerVideo);

  // Fetch the Trailer Details and update the store with this details

  const getTrailer = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
        API_OPTIONS
      );
      const data = await res.json();
      const filterData = data.results.filter(
        (video) => video.type === "Trailer"
      );
      const trailer = filterData[0];

    //   console.log(trailer, trailer.key);
      dispatch(addTrailerVideo(trailer));
    } catch (err) {
      console.error("Error fetching trailer:", err);
    }
  };

  useEffect(() => {
    if (movieId) getTrailer();
  }, [movieId]);

    return trailerVideo;
};
