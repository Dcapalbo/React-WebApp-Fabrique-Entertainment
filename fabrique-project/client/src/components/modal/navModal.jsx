import classes from "./navModal.module.scss";
import { Link } from "react-router-dom";
import { isAuth } from "../../utils/isAuth";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const NavModal = () => {
  const { t } = useTranslation();
  const [modalVisible, setIsModalVisible] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {});

  useEffect(() => {
    setIsAuthenticated(isAuth("token"));
  }, []);

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
                <li>
                  <Link to="/films/lucania">Lucania</Link>
                </li>
                <li>
                  <Link to="/films/guerrieri">Guerrieri</Link>
                </li>
                <li>
                  <Link to="/films/love-and-desire">Love and Desire</Link>
                </li>
                <li>
                  <Link to="/films/felakuti">Felakuti</Link>
                </li>
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
                <Link to="/admin/contacts/add-new-contact">
                  {t("addContact")}
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </>
  );
};

export default NavModal;
