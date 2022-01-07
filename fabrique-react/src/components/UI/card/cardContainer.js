import classes from './card.module.scss';
import Card from './card';

const CardContainer = () => {
    const Films = [
        {
            title: 'Lucania',
            description: 'Descrizione dettagliata del film',
            imageUrl: 'Percorso immagine della cover',
            director: 'Nome del regista',
            lenght: 'Durata del film',
            type: 'tipologia di formato: film, corto, documentario' 
        },
        {
            title: 'Guerrieri',
            description: 'Descrizione dettagliata del film',
            imageUrl: 'Percorso immagine della cover',
            director: 'Nome del regista',
            lenght: 'Durata del film',
            type: 'tipologia di formato: film, corto, documentario' 
        },
        {
            title: 'Love and Desire',
            description: 'Descrizione dettagliata del film',
            imageUrl: 'Percorso immagine della cover',
            director: 'Nome del regista',
            lenght: 'Durata del film',
            type: 'tipologia di formato: film, corto, documentario' 
        },
        {
            title: 'Felakuti',
            description: 'Descrizione dettagliata del film',
            imageUrl: 'Percorso immagine della cover',
            director: 'Nome del regista',
            lenght: 'Durata del film',
            type: 'tipologia di formato: film, corto, documentario' 
        },
        {
            title: 'Nightlife',
            description: 'Descrizione dettagliata del film',
            imageUrl: 'Percorso immagine della cover',
            director: 'Nome del regista',
            lenght: 'Durata del film',
            type: 'tipologia di formato: film, corto, documentario' 
        },
    ];
    console.log(Films, 'logging single films');
    return (
        <div className={classes.card__container}>
            {Films.map(film => (
                <Card
                    title={film.title}
                    description={film.description}
                    imagUrl={film.imagUrl}
                    director={film.director}
                    lenght={film.lenght}
                    type={film.type}
                /> 
                ))
            };
        </div>
    )
}

export default CardContainer;