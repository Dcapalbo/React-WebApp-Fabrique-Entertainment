// importing the react router dom version 6
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
// scss files
import "./assets/variables.scss";
import "./assets/mixin.scss";
import "./assets/typography.scss";
import "./assets/reset.scss";
// pages
import Home from "./pages/Home";
import Film from "./pages/Film";
import About from "./pages/About";
import Films from "./pages/Films";
import NewFilm from "./pages/NewFilm";
import AllFilms from "./pages/AllFilms";
import LoginForm from "./pages/LoginForm";
import UpdateFilm from "./pages/UpdateFilm";
import AuthSignUp from "./pages/AuthSignUp";
import NewContact from "./pages/NewContact";
import AllContacts from "./pages/AllContacts";
import UpdateContact from "./pages/UpdateContact";

function App() {
  const uriLocation = window.location.href;
  useEffect(() => {
    if (
      uriLocation !== "http://localhost:3000/films/update-film" &&
      uriLocation !== "http://localhost:3000/contacts/update-contact"
    ) {
      window.localStorage.clear();
    }
  }, [uriLocation]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        {/* // routing problem with films */}
        <Route path="/films" element={<Films />} />
        <Route path="/films" element={<AllFilms />} />
        <Route path="/films/:film" element={<Film />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/sign-up" element={<AuthSignUp />} />
        <Route path="/contacts" element={<AllContacts />} />
        <Route path="/films/add-new-film" element={<NewFilm />} />
        <Route path="/films/update-film" element={<UpdateFilm />} />
        <Route path="/contacts/add-new-contact" element={<NewContact />} />
        <Route path="/contacts/update-contact" element={<UpdateContact />} />
      </Routes>
    </Router>
  );
}

export default App;
