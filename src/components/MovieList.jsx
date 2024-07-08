import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  getAllMovies,
  getLoaderInfo,
} from "../features/movies/moviesSlice.jsx";
import { TailSpin } from "react-loader-spinner";
import MovieCard from "./MovieCard";
import { getFilteredMovies } from "../utilities/FilteredData.jsx";

export const MovieList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const movies = useSelector(getAllMovies);

  //   const handleInputChange = (e) => {
  //     setSearchTerm(e.target.value);
  //   };

  //   const handleSearch = () => {
  //     onSearch(searchTerm);
  //   };

  // //   const sortByType = useSelector(null);

  //   const favouriteMovies = useSelector(null);

  const isLoading = useSelector(getLoaderInfo);

  const filteredMovies = getFilteredMovies(movies, null, null);

  return (
    <div>
      {isLoading ? (
        <TailSpin color="00BFFF" height={80} with={80} />
      ) : (
        <>
          <div className="grid-layout">
            {filteredMovies.map((movie, index) => (
              <MovieCard key={index} data={movie} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MovieList;
