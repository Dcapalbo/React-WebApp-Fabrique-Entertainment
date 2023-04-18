import logo from "../../assets/img/LOGO_Fabrique_Entertainment_White_PNG.png";
import { useTranslation } from "react-i18next";
import base64ArrayBuffer from "../../utils/base64";
import { isAuth } from "../../utils/isAuth";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import classes from "./nav.module.scss";
import ApiGetHook from "../../hooks/apiGetHook";
import { dataFilmActions } from "../../store/data-film-slice";

const Navigation = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [isAuthenticated, setIsAuthenticated] = useState(() => {});
  const { fabriqueData } = ApiGetHook("http://localhost:5000/get-films");

  useEffect(() => {
    setIsAuthenticated(isAuth("token"));
    console.log("dataFilms", fabriqueData);
  }, [fabriqueData]);

  const sendFilmIdHanlder = (filmData) => {
    window.localStorage.setItem(
      "filmData",
      JSON.stringify(
        dispatch(
          dataFilmActions.setFilmData({
            title: filmData.title,
            director: filmData.director,
            production: filmData.production,
            screenwriter: filmData.screenwriter,
            directorOfPhotography: filmData.directorOfPhotography,
            synopsis: filmData.synopsis,
            duration: filmData.duration,
            year: filmData.year,
            slug: filmData.slug,
            type: filmData.type,
            imageUrl: `data:image/png;base64,${base64ArrayBuffer(filmData)}`,
            _id: filmData._id,
          })
        )
      )
    );
  };

  return (
    <nav className={classes.navigation}>
      <a href="/">
        <img
          className={classes.navigation__logo}
          src={logo}
          alt="logo fabrique entertainment"
          title="logo fabrique entertainment"
        />
      </a>
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
            {fabriqueData.length > 0 &&
              fabriqueData.map((filmData, id) => (
                <li key={id}>
                  <Link
                    onClick={() => sendFilmIdHanlder(filmData)}
                    key={filmData._id}
                    to={`/film/${filmData.slug}`}
                    _id={filmData._id}
                  >
                    {filmData.title}
                  </Link>
                </li>
              ))}
          </ul>
        </li>
        <li>
          <Link to="/news">{t("news")}</Link>
        </li>
        <li>
          <Link to="/contact">{t("contacts")}</Link>
        </li>
        {isAuthenticated && (
          <li>
            <Link to="/admin/films">{t("filmsList")}</Link>
          </li>
        )}
        {isAuthenticated && (
          <li>
            <Link to="/admin/films/add-new-film">{t("addFilm")}</Link>
          </li>
        )}
        {isAuthenticated && (
          <li>
            <Link to="/admin/contacts/">{t("contactsList")}</Link>
          </li>
        )}
        {isAuthenticated && (
          <li>
            <Link to="/admin/contacts/add-new-contact">{t("addContact")}</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
