import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../Utils/Constants";
import { addPopularMovies } from "../Utils/movieSlice";

const usePopularMovies = () => {
    const dispatch = useDispatch();
    const movies = useSelector((state) => state.movies?.popularMovies); // 👈 read state
    // console.log(movies)

  const getPopularMovies = async () => {
    const res = await fetch(
      "https://api.themoviedb.org/3/movie/popular?page=1",
      API_OPTIONS
    );

    const data = await res.json();
    dispatch(addPopularMovies(data.results))
    // console.log(data.results); 
  };

  useEffect(()=>{
    getPopularMovies();
  }, [])

  return movies;    // 👈 return the Movie data
}

export default usePopularMovies;