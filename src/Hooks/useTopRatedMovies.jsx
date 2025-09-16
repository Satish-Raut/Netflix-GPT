import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTopRatedMovies } from "../Utils/movieSlice";
import { API_OPTIONS } from "../Utils/Constants";

export const useTopRatedMovies = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies?.topRatedMovies); // 👈 read state
  console.log(movies)

  const getTopRatedMovies = async () => {
    const res = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?page=1",
      API_OPTIONS

    );

    const data = await res.json();
    dispatch(addTopRatedMovies(data.results));
    // console.log(data.results);
  };

  useEffect(() => {
    getTopRatedMovies();
  }, []);

  return movies; // 👈 return the Movie data
};
