import { Route, Routes } from "react-router";
import MovieCard from "./components/MovieCard";
import MovieList from "./components/MovieList";
import { Header, Footer } from "./layout/index";
import { Home } from "./pages/Home";
import { useDispatch } from "react-redux";
import { fetchAsyncMoviesList } from "./features/movies/moviesSlice";
import { NotFound } from "./pages/NotFound";
import PageLayout from "./layout/PageLayout";
import { MovieDetails } from "./pages/MovieDetails";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route element={<PageLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:imdbID" element={<MovieDetails />} />

        </Route>  

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
