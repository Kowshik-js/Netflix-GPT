import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addPopularMovies } from "../utils/moviesSlice";

const usePopularMovies = () => {
  const dispatch = useDispatch();

  const getPopularMovies = async () => {
    try {
      const data = await fetch("https://api.themoviedb.org/3/movie/popular?page=1", API_OPTIONS);
      const json = await data.json();
      console.log(json.results); // Ensure this logs the expected data
      dispatch(addPopularMovies(json.results)); // Correct action
    } catch (error) {
      console.error("Error fetching popular movies:", error);
    }
  };

  useEffect(() => {
    getPopularMovies();
  }, []);

  // Optionally return fetched movies or loading state if needed
};
export default usePopularMovies;
