import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const { movieApiKey } = require("../../services/api/api_key");
const { movieApi } = require("../../services/api/api");

export const fetchAsyncMoviesList = createAsyncThunk(
  "movies/fetchAsyncMovies",
  async (query) => {
    const response = await movieApi.get(
      `?apikey=${movieApiKey}&s=${query || 'all'}&type=movie`
    );
    return response.data.Search;
  }
);

export const fetchAsyncMoviesOrShowsDetails = createAsyncThunk(
  "movies/fetchAsyncMoviesOrShowsDetails",
  async (id) => {
    const response = await movieApi.get(
      `?apikey=${movieApiKey}&i=${id}&Plot=full`
    );
    return response.data;
  }
);

const initialState = {
  movies: [],
  selectedMovieOrShow: {},
  isLoading: false,
  favourite: JSON.parse(localStorage.getItem("favouriteMovies")) ?? [],
  sortBy: "all",
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    deleteSelctMovieOrShow: (state) => {
      state.selectedMovieOrShow = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncMoviesList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAsyncMoviesList.fulfilled, (state, { payload }) => {
        state.movies = payload;
        state.isLoading = false;
      })
      .addCase(fetchAsyncMoviesList.rejected, () => {
        alert("There is some issue with the server, please try later!");
      })
      .addCase(fetchAsyncMoviesOrShowsDetails.fulfilled, (state, { payload }) => {
        state.selectedMovieOrShow = payload;
      });
  },
});

export const { deleteSelctMovieOrShow } = movieSlice.actions;

export const getAllMovies = (state) => state.movies.movies;

export const getSelectedMovieOrShow = (state) => state.movies.selectedMovieOrShow;
export const getLoaderInfo = (state) => state.movies.isLoading;

export default movieSlice.reducer;
