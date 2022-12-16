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

const App = () => {
  const uriLocation = window.location.href;
  useEffect(() => {
    if (
      uriLocation !== "http://localhost:3000/admin/films/update-film" &&
      uriLocation !== "http://localhost:3000/admin/contacts/update-contact"
    ) {
      window.localStorage.removeItem("dataUpdateFilm", "dataUpdateContact");
    }
  }, [uriLocation]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        {/* // routing problem with films parameter */}
        <Route path="/films" element={<Films />} />
        <Route path="/admin/films" element={<AllFilms />} />
        <Route path="/films/:film" element={<Film />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/sign-up" element={<AuthSignUp />} />
        <Route path="/admin/contacts" element={<AllContacts />} />
        <Route path="/admin/films/add-new-film" element={<NewFilm />} />
        <Route path="/admin/films/update-film" element={<UpdateFilm />} />
        <Route
          path="/admin/contacts/add-new-contact"
          element={<NewContact />}
        />
        <Route
          path="/admin/contacts/update-contact"
          element={<UpdateContact />}
        />
      </Routes>
    </Router>
  );
};

export default App;
