// importing the react router dom version 6
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { isAuth } from "./utils/isAuth";
// importing the react traductions functions
import { initReactI18next } from "react-i18next";
import { translationIt } from "./utils/i18It";
import { translationEn } from "./utils/i18En";
import i18n from "i18next";
// scss files
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
import AboutContact from "./pages/AboutContact";
import UpdateContact from "./pages/UpdateContact";
import ResetPasswordForm from "./pages/ResetPassword";
import ForgotPasswordForm from "./pages/ForgotPassword";

// initialize the react traductions
i18n.use(initReactI18next).init({
  resources: {
    it: { translation: translationIt },
    en: { translation: translationEn },
  },
  lng: "it",
  fallbackLng: "it",
  interpolation: { escapeValue: false },
});

const App = () => {
  const isLoggedIn = useSelector((state) => state.userLogin.isLoggedIn);
  const token = useSelector((state) => state.userLogin.token);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [tokenExpiration, setTokenExpiration] = useState(() => {});

  useEffect(() => {
    setIsAuthenticated(isLoggedIn);
    setTokenExpiration(isAuth(token));
  }, [isLoggedIn, token]);

  return (
    <Router>
      <Routes>
        {/* not authenticated Routes  */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/films" element={<Films />} />
        <Route path="/film/:id" element={<Film />} />
        <Route path="/about/:id" element={<AboutContact />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/reset-password" element={<ResetPasswordForm />} />
        <Route path="/sign-up" element={<AuthSignUp />} />

        {/* authenticated Routes  */}
        {isAuthenticated && tokenExpiration && (
          <Route path="/admin/films" element={<AllFilms />} />
        )}
        {isAuthenticated && tokenExpiration && (
          <Route path="/admin/contacts" element={<AllContacts />} />
        )}
        {isAuthenticated && tokenExpiration && (
          <Route path="/admin/add-new-film" element={<NewFilm />} />
        )}
        {isAuthenticated && tokenExpiration && (
          <Route path="/admin/update-film" element={<UpdateFilm />} />
        )}
        {isAuthenticated && tokenExpiration && (
          <Route path="/admin/add-new-contact" element={<NewContact />} />
        )}
        {isAuthenticated && tokenExpiration && (
          <Route path="/admin/update-contact" element={<UpdateContact />} />
        )}
        {isAuthenticated && tokenExpiration && (
          <Route path="/forgot-password" element={<ForgotPasswordForm />} />
        )}
      </Routes>
    </Router>
  );
};

export default App;
