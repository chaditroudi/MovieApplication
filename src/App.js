import { Route, Routes } from "react-router";
import MovieCard from "./components/MovieCard";
import MovieList from "./components/MovieList";
import { Header,Footer } from "./layout/index";
import { Home } from "./pages/Home";
import { useDispatch } from "react-redux";
import { fetchAsyncMoviesList } from "./features/movies/moviesSlice";


function App() {
  const dispatch = useDispatch(); 


  const handleSearch = (searchQuery) => {
    dispatch(fetchAsyncMoviesList(searchQuery)); 
  };

return (
  <div className="app">
  <Header onSearch={handleSearch}/>

  <div className="my-0 mx-10">
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  </div>


  <Footer/>
</div>
)
}

export default App;
