import classes from "./aboutCard.module.scss";

const AboutCard = (props) => {
  return (
    <div className={classes.about__card}>
      <img
        className={classes.about__card__image}
        src={props.imageUrl}
        alt={props.name}
        title={props.role}
        loading="lazy"
      />
      <div className={classes.about__card__description}>
        <h2 className={classes.about__card__name}>{props.name}</h2>
        <h3 className={classes.about__card__surname}>{props.surname}</h3>
        <h4 className={classes.about__card__role}>{props.role}</h4>
        <h5 className={classes.about__card__bio}>{props.bio}</h5>
        <h6 className={classes.about__card__email}>{props.email}</h6>
        <input hidden id={props._id} />
        <small className={classes.about__card__phone__number}>
          {props.phonenumber}
        </small>
      </div>
    </div>
  );
};

export default AboutCard;
