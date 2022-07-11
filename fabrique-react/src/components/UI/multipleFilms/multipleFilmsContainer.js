import { useState, useEffect } from 'react';

import classes from './multipleFilmsContainer.module.scss';
import MultipleFilms from './multipleFilms';
import axios from 'axios';

const MultipleFilmsContainer = () => {

    const [loading, setloading] = useState(false);
    const [error, setError] = useState(null);
    const [films, setFilms] = useState([]);

    const url = "https://uvaf6p0qv3.execute-api.us-east-2.amazonaws.com/dev";

    useEffect(() => {
        setloading(true);
        axios
        .get(url)   
            .then(res => {
                setFilms(res.data.body.fabriqueFilmsInformations);
            })
            .catch(err => {
                setError(err);
            })
            .finally(() => {
                setloading(false);
                console.log("finished to fetch data");
            }); 
    }, [url] );

    if (loading) {
        return <h1>Loading...</h1>
    } else if (error) {
        return <h1>Something went wrong, try to refresh the page!</h1>;
    } else {
        return (
                <section className={classes.wrapper__films__container}>
                    {films.map(film => (
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