import classes from './card.module.scss';

const Card = (props) => {
    return(
        <div className={classes.card}>
            <p>{props.title}</p>
            <p>{props.description}</p>
            <p>{props.imageUrl}</p>
            <p>{props.director}</p>
            <p>{props.lenght}</p>
            <p>{props.type}</p>
        </div>
    );
}

export default Card;