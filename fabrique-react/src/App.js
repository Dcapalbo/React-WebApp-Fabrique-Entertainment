// importing the react router dom version 6
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
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
import { isAuth } from "./utils/isAuth";
import LoginForm from "./pages/LoginForm";
import UpdateFilm from "./pages/UpdateFilm";
import AuthSignUp from "./pages/AuthSignUp";
import NewContact from "./pages/NewContact";
import AllContacts from "./pages/AllContacts";
import UpdateContact from "./pages/UpdateContact";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {});
  const uriLocation = window.location.href;
  useEffect(() => {
    setIsAuthenticated(isAuth("token"));
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
        {/* not authenticated Routes  */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/films" element={<Films />} />
        <Route path="/films/:film" element={<Film />} />
        <Route path="/login" element={<LoginForm />} />
        {/* authenticated Routes  */}
        <Route path="/sign-up" element={<AuthSignUp />} />
        {isAuthenticated && (
          <Route path="/admin/films" element={<AllFilms />} />
        )}
        {isAuthenticated && (
          <Route path="/admin/contacts" element={<AllContacts />} />
        )}
        {isAuthenticated && (
          <Route path="/admin/films/add-new-film" element={<NewFilm />} />
        )}
        {isAuthenticated && (
          <Route path="/admin/films/update-film" element={<UpdateFilm />} />
        )}
        {isAuthenticated && (
          <Route
            path="/admin/contacts/add-new-contact"
            element={<NewContact />}
          />
        )}
        {isAuthenticated && (
          <Route
            path="/admin/contacts/update-contact"
            element={<UpdateContact />}
          />
        )}
      </Routes>
    </Router>
  );
};

export default App;
