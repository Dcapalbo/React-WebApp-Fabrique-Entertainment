import classes from './card.module.scss';

const Card = (props) => {
    return(
        <div className={classes.card}>
            <h2>{props.title}</h2>
            <h5>{props.director}</h5>
            <h6>{props.lenght}</h6>
            <small>{props.description}</small>
            <p>{props.imageUrl}</p>
            <p>{props.type}</p>
        </div>
    )
}

export default Card;