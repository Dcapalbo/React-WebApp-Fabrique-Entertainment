import classes from './cardContainer.module.scss';
import Card from './card';

const CardContainer = () => {
    const films = [
        {
            id: '1',
            title: 'Lucania',
            description: 'Descrizione dettagliata del film',
            imageUrl: 'Percorso immagine della cover',
            director: 'Nome del regista',
            lenght: 'Durata del film',
            type: 'Lungometraggio' 
        },
        {
            id: '2',
            title: 'Guerrieri',
            description: 'Descrizione dettagliata del film',
            imageUrl: 'Percorso immagine della cover',
            director: 'Nome del regista',
            lenght: 'Durata del film',
            type: 'Documentario' 
        },
        {
            id: '3',
            title: 'Love and Desire',
            description: 'Descrizione dettagliata del film',
            imageUrl: 'Percorso immagine della cover',
            director: 'Nome del regista',
            lenght: 'Durata del film',
            type: 'Cortometraggio' 
        },
        {
            id: '4',
            title: 'Felakuti',
            description: 'Descrizione dettagliata del film',
            imageUrl: 'Percorso immagine della cover',
            director: 'Nome del regista',
            lenght: 'Durata del film',
            type: 'Documentario' 
        },
        {
            id: '5',
            title: 'Nightlife',
            description: 'Descrizione dettagliata del film',
            imageUrl: 'Percorso immagine della cover',
            director: 'Nome del regista',
            lenght: 'Durata del film',
            type: 'Documentario' 
        },
    ]
    return (
        <div className={classes.card__container}>
            {films.map(film => (
                <Card
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
        </div>
    )
}

export default CardContainer;