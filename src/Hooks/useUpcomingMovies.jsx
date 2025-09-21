
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../Utils/Constants";
import { addUpcomingMovies } from "../Utils/movieSlice";

export const useUpcomingMovies = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies?.upcomingMovies); // 👈 read state
  // console.log(movies)

  const getUpcomingMovies = async () => {
    const res = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming?page=1",
      API_OPTIONS

    );

    const data = await res.json();
    dispatch(addUpcomingMovies(data.results));
    // console.log(data.results);
  };

  useEffect(() => {
    getUpcomingMovies();
  }, []);

  return movies; // 👈 return the Movie data
};
