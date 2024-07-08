import { Route, Routes } from "react-router";
import MovieCard from "./components/MovieCard";
import MovieList from "./components/MovieList";
import { Header,Footer } from "./layout/index";
import { Home } from "./pages/Home";


function App() {


return (
  <div className="app">
  <Header/>

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
