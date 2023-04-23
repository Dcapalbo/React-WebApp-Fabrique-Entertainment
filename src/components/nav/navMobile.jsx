import logo from "../../assets/img/LOGO_Fabrique_Entertainment_White_PNG.png";
import classes from "./navmobile.module.scss";
import { Link } from "react-router-dom";

const NavigationMobile = () => {
  return (
    <>
      <nav className={classes.navigation__mobile}>
        <Link to="/">
          <img
            className={classes.navigation__logo}
            src={logo}
            alt="logo fabrique entertainment"
          />
        </Link>
      </nav>
    </>
  );
};

export default NavigationMobile;
