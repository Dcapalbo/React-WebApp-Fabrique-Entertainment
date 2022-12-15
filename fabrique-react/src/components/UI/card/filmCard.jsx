import classes from "./card.module.scss";

const FilmCard = (props) => {
  return (
    <div className={classes.card}>
      <img
        className={classes.card__image}
        src={props.imageUrl}
        alt={props.title}
        title={props.title}
        loading="lazy"
      />
      <div className={classes.card__description}>
        <h2>{props.title}</h2>
        <h3>{props.director}</h3>
        <h6>{props.year}</h6>
        <h5>{props.type}</h5>
        <h4>{props.duration}</h4>
        <small>{props.description}</small>
        <input type="hidden" id={props._id} />
      </div>
    </div>
  );
};

export default FilmCard;
