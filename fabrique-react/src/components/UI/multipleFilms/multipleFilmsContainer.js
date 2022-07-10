import classes from './multipleFilmsContainer.module.scss';
import MultipleFilms from './multipleFilms';
import axios from 'axios';

const MultipleFilmsContainer = () => {
    axios
        .get('https://uvaf6p0qv3.execute-api.us-east-2.amazonaws.com/dev')   
        .then(res => {
        const filmsResponse = res.data.body.fabriqueFilmsInformations;
        console.log(filmsResponse.map(film => (
            <>
                <h1>{film.id}</h1>
                <h2>{film.description}</h2>
            </>
        )));
        return(
                <section className={classes.wrapper__films__container}>
                    {filmsResponse.map(film => (       
                        
                        // Printing problem to do
                        <>
                            <div>
                                {film.id}
                            </div>
                            <div>
                                {film.title}
                            </div>
                        </> 
                        ))
                    };
                </section>
            )
        })
}

export default MultipleFilmsContainer;