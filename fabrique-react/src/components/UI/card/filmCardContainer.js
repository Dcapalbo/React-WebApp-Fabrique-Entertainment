import ApiHook from '../../../hooks/api-hook';
import classes from './cardContainer.module.scss';
import FilmCard from './filmCard';

const FilmCardContainer = () => {

    const { fabriqueData, loading, error } = ApiHook(
        "https://uvaf6p0qv3.execute-api.us-east-2.amazonaws.com/dev", 
        "fabriqueFilmsInformations"
    );

    if ( loading ) {
        return <h1>Loading...</h1>
    } else if ( error ) {
        <h1>There is some problem, please try to refresh</h1>
    } else {
        return (
            <section className={classes.wrapper__card__container}>
                <div className={classes.card__container}>
                    {fabriqueData.map(film => (
                        <FilmCard
                            description={film.description}
                            director={film.director}
                            imageUrl={film.imageUrl}
                            lenght={film.lenght}
                            title={film.title}
                            type={film.type}
                            key={film.id}
                        /> 
                        ))
                    }
                </div>
            </section>
        )
    }
}

export default FilmCardContainer;