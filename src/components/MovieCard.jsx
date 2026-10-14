import React from "react";

const MovieCard = ({ movie }) => {
  // create  the poster using the tmdb image path
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  return (
    <>
      <div className="group overflow-hidden rounded-xl bg-gray-900 text-white transition duration-300 hover:scale-105 hover:shadow-xl">
        {/* display the movie poster */}

        {posterUrl ? (
          <img
            src={posterUrl}
            alt={movie.title}
            className="h-64 w-full object-cover sm:h-72"
            loading="lazy"
          />
        ) : (
          <div className="flex h-64 items-center justofy-center bg-gray-800 text-gray-300 ">
            No Poster Available
          </div>
        )}

        {/* display movie information */}
        <div className="p-3">
          <h2 className="truncate text-base font-bold sm:text-lg">
            {movie.title}
          </h2>

          <p className="mt-1 text-sm text-gray-300">
            Release: {movie.release_date || "Not Available"}
          </p>

          <p className="mt-2 text-sm font-semibold text-yellow-400">
            ⭐ {movie.vote_average?.toFixed(1) ?? "N/A"} / 10
          </p>
        </div>
      </div>
    </>
  );
};

export default MovieCard;
