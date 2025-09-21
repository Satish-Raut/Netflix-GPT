import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../Utils/Constants";
import { addNowPlayingMovies } from "../Utils/movieSlice";
import { useEffect } from "react";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies?.nowPlayingMovies); // 👈 read state

  const getNowPlayingMovies = async () => {
    const res = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?page=1",
      API_OPTIONS
    );

    const data = await res.json();
    dispatch(addNowPlayingMovies(data.results));
    // console.log(data.results);
  };

  useEffect(() => {
    !movies && getNowPlayingMovies(); // The API call is happen when the movie is empty (Memoization Applied)
  }, []);

  return movies; // 👈 return the Movie data
};

export default useNowPlayingMovies;
