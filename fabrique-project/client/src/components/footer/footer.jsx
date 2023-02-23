import classes from "./footer.module.scss";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.footer__container}>
        <ul className={classes.footer__container__elm}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/films">Films</Link>
          </li>
          <li>
            <Link to="/news">News</Link>
          </li>
          <li>
            <Link to="/news">Contact</Link>
          </li>
        </ul>
        <div className={classes.footer__container__elm}>
          <h2>Dati Fatturazione</h2>
          <p>Partita Iva: 364667737727</p>
          <p>Codice Adesione: jjfhhry773</p>
          <p>Sede Legale: piazza euclide</p>
        </div>
        <div className={classes.footer__container__elm}>
          <h2>Dati societari</h2>
          <p>Partita Iva</p>
          <p>Codice Adesione</p>
          <p>Sede Legale</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
