// importing the react router dom version 6
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// scss files
import "./assets/variables.scss";
import "./assets/mixin.scss";
import "./assets/typography.scss";
import "./assets/reset.scss";
// pages
import Home from "./pages/Home";
import About from "./pages/About";
import Films from "./pages/Films";
import Film from "./pages/Film";
import NewFilm from "./pages/NewFilm";
import AllFilms from "./pages/AllFilms";
import UpdateFilm from "./pages/UpdateFilm";

function App() {
  const uriLocation = window.location.href;
  useEffect(() => {
    if (uriLocation !== "http://localhost:3000/films/update-film") {
      window.localStorage.clear();
    }
  }, [uriLocation]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/films" element={<Films />} />
        <Route path="/films/:film" element={<Film />} />
        <Route path="/films/addNewFilm" element={<NewFilm />} />
        <Route path="/films/allFilms" element={<AllFilms />} />
        <Route path="/films/update-film" element={<UpdateFilm />} />
      </Routes>
    </Router>
  );
}

export default App;
