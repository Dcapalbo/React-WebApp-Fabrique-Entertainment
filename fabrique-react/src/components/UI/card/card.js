import classes from './card.module.scss';

const Card = (props) => {
    return(
        <section className={classes.card}>
            <img className={classes.card__image} src={props.imageUrl} alt="immagine cover film" />
            <div className={classes.card__description}>
                <h2>{props.title}</h2>
                <h5>{props.director}</h5>
                <h6>{props.lenght}</h6>
                <small>{props.description}</small>
                <p>{props.type}</p>
            </div>
        </section>
    )
}

export default Card;