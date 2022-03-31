import classes from './aboutCard.module.scss';

const AboutCard = (props) => {
    return(
        <div className={classes.about__card}>
            <img className={classes.about__card__image} src={props.imageUrl} alt={props.headline} loading='lazy'/>
            <div className={classes.about__card__description}>
                <h2 className={classes.about__card__headline}>{props.headline}</h2>
                <p className={classes.about__card__role}>{props.role}</p>
                <small className={classes.about__card__email}>{props.email}</small>
            </div>
        </div>
    );
}

export default AboutCard;