import { dataFilmActions } from "../../store/data-film-slice";
import { useDispatch, useSelector } from "react-redux";
import base64ArrayBuffer from "../../utils/base64";
import ApiGetHook from "../../hooks/apiGetHook";
import { useTranslation } from "react-i18next";
import classes from "./navModal.module.scss";
import { isAuth } from "../../utils/isAuth";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const NavModal = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const isLoggedIn = useSelector((state) => state.userLogin.isLoggedIn);
  const token = useSelector((state) => state.userLogin.token);

  const [modalVisible, setIsModalVisible] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [tokenExpiration, setTokenExpiration] = useState(() => {});

  const { fabriqueData } = ApiGetHook(
    `${process.env.REACT_APP_API_LOCAL_PORT}/get-films`
  );

  useEffect(() => {
    setIsAuthenticated(isLoggedIn);
    setTokenExpiration(isAuth(token));
  }, [fabriqueData, isLoggedIn, token]);

  const sendFilmIdHanlder = (filmData) => {
    dispatch(
      dataFilmActions.setFilmData({
        title: filmData.title,
        director: filmData.director,
        production: filmData.production,
        screenwriter: filmData.screenwriter,
        directorOfPhotography: filmData.directorOfPhotography,
        synopsis: filmData.synopsis,
        duration: filmData.duration.toString(),
        year: filmData.year.toString(),
        slug: filmData.slug,
        type: filmData.type,
        imageUrl: `data:image/png;base64,${base64ArrayBuffer(filmData)}`,
        _id: filmData._id,
      })
    );
  };

  const closingModalHandler = () => {
    const body = document.querySelector("body");
    body.style.overflow = "scroll";
    setIsModalVisible(true);
  };

  return (
    <>
      {!modalVisible && (
        <div className={classes.navigation__modal}>
          <div className={classes.navigation__modal__close}>
            <span onClick={closingModalHandler}>X</span>
          </div>
          <ul className={classes.navigation__mobile__menu}>
            <li>
              <Link to="/">{t("home")}</Link>
            </li>
            <li>
              <Link to="/about">{t("about")}</Link>
            </li>
            <li>
              <Link className={classes.navigation__films__mobile} to="/films">
                {t("films")}
              </Link>
              <ul className={classes.navigation__films__mobile__dropdown}>
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
          </ul>
        </div>
      )}
    </>
  );
};

export default NavModal;
