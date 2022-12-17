import logo from "../../assets/img/LOGO_Fabrique_Entertainment_White_PNG.png";
import { Link } from "react-router-dom";
import classes from "./nav.module.scss";
import { isAuth } from "../../utils/isAuth";
import { useState, useEffect } from "react";

const Navigation = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {});
  useEffect(() => {
    setIsAuthenticated(isAuth("token"));
  }, []);

  return (
    <nav className={classes.navigation}>
      <a href="/">
        <img
          className={classes.navigation__logo}
          src={logo}
          alt="logo fabrique entertainment"
        />
      </a>
      <ul className={classes.navigation}>
        <li>
          <Link to="/">home</Link>
        </li>
        <li>
          <Link to="/about">about</Link>
        </li>
        <li>
          <Link className={classes.navigation__films} to="/films">
            films
          </Link>
          <ul className={classes.navigation__films__dropdown}>
            <li>
              <Link to="/films/lucania">lucania</Link>
            </li>
            <li>
              <Link to="/films/guerrieri">guerrieri</Link>
            </li>
            <li>
              <Link to="/films/love-and-desire">love and desire</Link>
            </li>
            <li>
              <Link to="/films/felakuti">felakuti</Link>
            </li>
          </ul>
        </li>
        <li>
          <Link to="/news">news</Link>
        </li>
        <li>
          <Link to="/contact">contact</Link>
        </li>
        {isAuthenticated && (
          <li>
            <Link to="/admin/films">List of Films</Link>
          </li>
        )}
        {isAuthenticated && (
          <li>
            <Link to="/admin/films/add-new-film">Add Film</Link>
          </li>
        )}
        {isAuthenticated && (
          <li>
            <Link to="/admin/contacts/">List of Contacts</Link>
          </li>
        )}
        {isAuthenticated && (
          <li>
            <Link to="/admin/contacts/add-new-contact">Add Contact</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
