import classes from './multipleFilmsContainer.module.scss';
import StillLucania from '../../../assets/img/DIGA_SENISE.png'
import MultipleFilms from './multipleFilms';

const MultipleFilmsContainer = () => {
    const films = [
        {
            id: '1',
            title: 'Lucania',
            description: 'An ancient dying land is brought back to life by the primal force of a young mute girl, who witnesses the fatal clash between her farmer father and those who want to poison his fields, in a magic journey of redemption.',
            imageUrl: StillLucania,
            director: 'Gigi Roccati',
            lenght: '84m',
            type: 'Lungometraggio' 
        },
        {
            id: '2',
            title: 'Love and Desire',
            description: 'An ancient dying land is brought back to life by the primal force of a young mute girl, who witnesses the fatal clash between her farmer father and those who want to poison his fields, in a magic journey of redemption.',
            imageUrl: StillLucania,
            director: 'Domenico Capalbo',
            lenght: '23m',
            type: 'Cortometraggio' 
        },
        {
            id: '2',
            title: 'Guerrieri',
            description: 'An ancient dying land is brought back to life by the primal force of a young mute girl, who witnesses the fatal clash between her farmer father and those who want to poison his fields, in a magic journey of redemption.',
            imageUrl: StillLucania,
            director: 'Fabio Segatori',
            lenght: '84m',
            type: 'Documentario' 
        },
        {
            id: '4',
            title: 'Nightlife',
            description: 'An ancient dying land is brought back to life by the primal force of a young mute girl, who witnesses the fatal clash between her farmer father and those who want to poison his fields, in a magic journey of redemption.',
            imageUrl: StillLucania,
            director: 'Joseph Lefevre',
            lenght: '84m',
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