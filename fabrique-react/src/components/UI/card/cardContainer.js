import classes from './cardContainer.module.scss';
import CoverLucania from '../../../assets/img/LUCANIA_PASSEGGIATA_2.jpg'
import CoverGuerrieri from '../../../assets/img/COVER GUERRIERI.jpg'
import CoverLoveAndDesire from '../../../assets/img/COVER AED FOR SITE FABRIQUE.jpg'
import CoverNighlife from '../../../assets/img/COVER NIGHTLIFE 2018.jpg'
import Card from './card';

const CardContainer = () => {
    const films = [
        {
            id: '1',
            title: 'Lucania',
            description: 'Descrizione dettagliata del film',
            imageUrl: CoverLucania,
            director: 'Nome del regista',
            lenght: 'Durata del film',
            type: 'Lungometraggio' 
        },
        {
            id: '2',
            title: 'Love and Desire',
            description: 'Descrizione dettagliata del film',
            imageUrl: CoverLoveAndDesire,
            director: 'Nome del regista',
            lenght: 'Durata del film',
            type: 'Cortometraggio' 
        },
        {
            id: '2',
            title: 'Guerrieri',
            description: 'Descrizione dettagliata del film',
            imageUrl: CoverGuerrieri,
            director: 'Nome del regista',
            lenght: 'Durata del film',
            type: 'Documentario' 
        },
        {
            id: '4',
            title: 'Nightlife',
            description: 'Descrizione dettagliata del film',
            imageUrl: CoverNighlife,
            director: 'Nome del regista',
            lenght: 'Durata del film',
            type: 'Documentario' 
        },
    ]
    return (
    <section className={classes.wrapper__card__container}>
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
    </section>
    )
}

export default CardContainer;