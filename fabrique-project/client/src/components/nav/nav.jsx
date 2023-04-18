import logo from "../../assets/img/LOGO_Fabrique_Entertainment_White_PNG.png";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { isAuth } from "../../utils/isAuth";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import classes from "./nav.module.scss";

const Navigation = () => {
  const { t } = useTranslation();
  const filmData = useSelector((state) => state.dataFilm.filmData);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {});

  useEffect(() => {
    setIsAuthenticated(isAuth("token"));
  }, [filmData]);

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
          {filmData.length > 0 &&
            filmData.map((filmData, id) => (
              <ul className={classes.navigation__films__dropdown}>
                <li key={id}>
                  <Link key={id} to={`/film/${filmData.slug}`}>
                    {filmData.title}
                  </Link>
                </li>
              </ul>
            ))}
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
