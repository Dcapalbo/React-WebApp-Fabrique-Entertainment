import logo from "../../assets/img/LOGO_Fabrique_Entertainment_White_PNG.png";
import { isAuth } from "../../utils/isAuth";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import classes from "./nav.module.scss";

const Navigation = () => {
  const dispatch = useDispatch();
  const filmData = useSelector((state) => state.dataFilm.filmData);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {});

  useEffect(() => {
    console.log(filmData.map((film) => film._id));
    console.log(dispatch);
    setIsAuthenticated(isAuth("token"));
  }, [filmData, dispatch]);

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
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link className={classes.navigation__films} to="/films">
            Films
          </Link>
          {filmData.length > 0 &&
            filmData.map((filmData, id) => (
              <ul className={classes.navigation__films__dropdown}>
                <li key={id}>
                  <Link to={`/films/${filmData._id}`}>{filmData.title}</Link>
                </li>
              </ul>
            ))}
        </li>
        <li>
          <Link to="/news">News</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
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
