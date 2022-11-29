import classes from "./multipleFilms.module.scss";

const multipleFilms = (props) => {
  return (
    <div className={classes.film__card__container}>
      <img
        className={classes.film__card}
        src={props.imageUrl}
        alt={props.title}
        title={props.title}
        loading="lazy"
      />
      <div className={classes.film__card__description}>
        <h2>{props.title}</h2>
        <h4>{props.director}</h4>
        <p>{props.description}</p>
        <small>{props.duration}</small>
        {/* <small>{props.type}</small> */}
        <div className={classes.film__card__button__wrapper}>
          <button className={classes.film__card__cta}>Scopri di più</button>
        </div>
      </div>
    </div>
  );
};

export default multipleFilms;
