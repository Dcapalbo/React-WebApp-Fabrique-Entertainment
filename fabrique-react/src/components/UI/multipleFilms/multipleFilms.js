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
        <h3>{props.director}</h3>
        <p>{props.description}</p>
        <small>{props.type}</small>
        <small>{props.duration}</small>
        <small>{props.year}</small>
        <input hidden id={props._id}></input>
        <div className={classes.film__card__button__wrapper}>
          <button className={classes.film__card__cta}>Scopri di più</button>
        </div>
      </div>
    </div>
  );
};

export default multipleFilms;
