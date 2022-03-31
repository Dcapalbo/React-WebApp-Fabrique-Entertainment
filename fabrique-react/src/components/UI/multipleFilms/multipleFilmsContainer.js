import classes from './multipleFilmsContainer.module.scss';
import StillLucania from '../../../assets/img/DIGA_SENISE.png'
import StillLoveDesire from '../../../assets/img/S4.png';
import MultipleFilms from './multipleFilms';

const MultipleFilmsContainer = () => {
    const films = [
        {
            id: '1',
            title: 'Lucania',
            description: 'Descrizione dettagliata del film',
            imageUrl: StillLucania,
            director: 'Gigi Roccati',
            lenght: 'Durata del film',
            type: 'Lungometraggio' 
        },
        {
            id: '2',
            title: 'Love and Desire',
            description: 'Descrizione dettagliata del film',
            imageUrl: StillLucania,
            director: 'Domenico Capalbo',
            lenght: '23m',
            type: 'Cortometraggio' 
        },
        {
            id: '2',
            title: 'Guerrieri',
            description: 'Descrizione dettagliata del film',
            imageUrl: StillLucania,
            director: 'Fabio Segatori',
            lenght: 'Durata del film',
            type: 'Documentario' 
        },
        {
            id: '4',
            title: 'Nightlife',
            description: 'Descrizione dettagliata del film',
            imageUrl: StillLucania,
            director: 'Joseph Lefevre',
            lenght: 'Durata del film',
            type: 'Documentario' 
        },
    ]
    return (
    <section className={classes.wrapper__films__container}>
        {films.map(film => (
            <MultipleFilms
                key={film.id}
                title={film.title}
                description={film.description}
                imageUrl={film.imageUrl}
                director={film.director}
                lenght={film.lenght}
                type={film.type}
            /> 
            ))
        }
    </section>
    )
}

export default MultipleFilmsContainer;