import classes from "./footer.module.scss";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.footer__container}>
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
