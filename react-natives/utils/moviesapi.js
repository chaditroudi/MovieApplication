import axios from 'axios';
import { movieApikey } from './apikey';

const omdbApiUrl = 'http://www.omdbapi.com/';

export const searchMovies = async (query) => {
  const url = query
    ? `${omdbApiUrl}?s=${query}&apikey=${movieApikey}`
    : `${omdbApiUrl}?s=movie&apikey=${movieApikey}`; 

  try {
    const response = await axios.get(url);

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log('Error fetching movies:', error);
    return { Search: [] };
  }
};


export const getMovieDetails = async (imdbID) => {
  const url = `${omdbApiUrl}?i=${imdbID}&apikey=${movieApikey}`;

  try {
    const response = await axios.get(url);

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching movie details for ${imdbID}:`, error);
    return null;
  }
};