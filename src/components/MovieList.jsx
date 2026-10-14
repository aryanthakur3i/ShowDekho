import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../redux/movieSlice";
import MovieCard from "./MovieCard";

const MovieList = () => {
  const dispatch = useDispatch();

  // get movie data , loading status , and error from redux
  const { data, isLoading, error } = useSelector((state) => state.movies);

  // fetch popular movies when the components load
  useEffect(() => {
    if (data.length === 0) {
      dispatch(fetchMovies());
    }
  }, [dispatch, data.length]);

  // show a loading message while fetching movies
  if (isLoading) {
    return <p className="bg-gray-950 p-6 text-white">Loading movies...</p>;
  }

  //show the error message if api request fails
  if (error) {
    return <p className="bg-gray-950 p-6 text-red-500">Error: {error}</p>;
  }
  return (
    <>
      <section className="bg-gray-950 px-5 py-10 text-white md:px-8">
        {/* section heading */}
        <h2 className="mb-6 text-2xl font-bold md:text-3xl">Popular Movies</h2>

        {/* display movie card  */}
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {data.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>
    </>
  );
};

export default MovieList;
