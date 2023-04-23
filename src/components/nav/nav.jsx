import logo from "../../assets/img/LOGO_Fabrique_Entertainment_White_PNG.png";
import { dataFilmActions } from "../../store/data-film-slice";
import { useDispatch, useSelector } from "react-redux";
import base64ArrayBuffer from "../../utils/base64";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { isAuth } from "../../utils/isAuth";
import { Link } from "react-router-dom";
import classes from "./nav.module.scss";

const Navigation = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const isLoggedIn = useSelector((state) => state.userLogin.isLoggedIn);
  const filmsTitle = useSelector((state) => state.dataFilm.filmsData);
  const token = useSelector((state) => state.userLogin.token);

  const [tokenExpiration, setTokenExpiration] = useState(() => {});
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(isLoggedIn);
    setTokenExpiration(isAuth(token));
  }, [isLoggedIn, token]);

  const sendFilmIdHanlder = (data) => {
    dispatch(
      dataFilmActions.setFilmData({
        title: data.title,
        director: data.director,
        production: data.production,
        screenwriter: data.screenwriter,
        directorOfPhotography: data.directorOfPhotography,
        synopsis: data.synopsis,
        duration: data.duration.toString(),
        year: data.year.toString(),
        slug: data.slug,
        type: data.type,
        imageUrl: `data:image/png;base64,${base64ArrayBuffer(data)}`,
        _id: data._id,
      })
    );
  };

  return (
    <nav className={classes.navigation}>
      <Link to="/">
        <img
          className={classes.navigation__logo}
          src={logo}
          alt="logo fabrique entertainment"
          title="logo fabrique entertainment"
        />
      </Link>
      <ul className={classes.navigation}>
        <li>
          <Link to="/">{t("home")}</Link>
        </li>
        <li>
          <Link to="/about">{t("about")}</Link>
        </li>
        <li>
          <Link className={classes.navigation__films} to="/films">
            {t("films")}
          </Link>
          <ul className={classes.navigation__films__dropdown}>
            {filmsTitle?.length > 0 &&
              filmsTitle?.map((film, id) => (
                <li key={id}>
                  <Link
                    onClick={() => sendFilmIdHanlder(film)}
                    key={film._id}
                    to={`/film/${film.slug}`}
                    _id={film._id}
                  >
                    {film.title}
                  </Link>
                </li>
              ))}
          </ul>
        </li>
        <li>
          <Link to="/contact">{t("contacts")}</Link>
        </li>
        {isAuthenticated && tokenExpiration && (
          <li>
            <Link to="/admin/films">{t("filmsList")}</Link>
          </li>
        )}
        {isAuthenticated && tokenExpiration && (
          <li>
            <Link to="/admin/add-new-film">{t("addFilm")}</Link>
          </li>
        )}
        {isAuthenticated && tokenExpiration && (
          <li>
            <Link to="/admin/contacts/">{t("contactsList")}</Link>
          </li>
        )}
        {isAuthenticated && tokenExpiration && (
          <li>
            <Link to="/admin/add-new-contact">{t("addContact")}</Link>
          </li>
        )}
        {isAuthenticated && tokenExpiration && (
          <li>
            <Link to="/forgot-password">{t("forgotPassword")}</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
