import classes from './multipleFilmsContainer.module.scss';
import Spinner from '../spinner/spinner';
import MultipleFilms from './multipleFilms';
import ApiHook from '../../../hooks/api-hook';

const MultipleFilmsContainer = () => {

    const { fabriqueData, loading, error } = ApiHook(
        "https://uvaf6p0qv3.execute-api.us-east-2.amazonaws.com/dev", 
        "fabriqueFilmsInformations"
    );

    if ( loading ) {
        return <Spinner /> 
    } else if ( error ) {
        <h1>There is some problem, please try to refresh</h1>
    } else {
        return (
                <section className={classes.wrapper__films__container}>
                    {fabriqueData.map(film => (
                            <MultipleFilms
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
                </section>
        )
    }
}

export default MultipleFilmsContainer;