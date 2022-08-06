import classes from './card.module.scss';

const FilmCard = (props) => {
    return(
        <div className={classes.card}>
            <img className={classes.card__image} src={props.imageUrl} alt='immagine cover film' title={props.title} loading='lazy'/>
            <div className={classes.card__description}>
                <h2>{props.title}</h2>
                <h5>{props.director}</h5>
                <h6>{props.lenght}</h6>
                <p>{props.type}</p>
                <small>{props.description}</small>
            </div>
        </div>
    )
}

export default FilmCard;