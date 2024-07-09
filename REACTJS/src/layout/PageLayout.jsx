

import React from 'react'
import { Header } from './Header'
import { fetchAsyncMoviesList } from '../features/movies/moviesSlice';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { Footer } from './Footer';

function PageLayout() {

    const dispatch = useDispatch(); 


  const handleSearch = (searchQuery) => {
    dispatch(fetchAsyncMoviesList(searchQuery)); 
  };


  return (
    <>
      <Header onSearch={handleSearch}/>
      <Outlet/>

      <Footer/>

    </>
  )
}

export default PageLayout