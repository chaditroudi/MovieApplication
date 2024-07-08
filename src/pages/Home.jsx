import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import MovieList from '../components/MovieList';
import { fetchAsyncMoviesList } from '../features/movies/moviesSlice';

export const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAsyncMoviesList(''));
  }, [dispatch]);

  const handleSearch = (searchQuery) => {
    dispatch(fetchAsyncMoviesList(searchQuery));
  };

  return (
    <>
      <MovieList onSearch={handleSearch} />
    </>
  );
};
