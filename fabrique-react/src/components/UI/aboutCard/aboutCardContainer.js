import classes from './aboutCardContainer.module.scss';
import DomenicoImage from '../../../assets/img/FOTO 1 DOMENICO CAPALBO PER SITO.jpg';
import GiovanniImage from '../../../assets/img/FOTO 1 GC PER SITO.jpg';
import RenataImage from '../../../assets/img/FOTO 1 RDL SITO.jpg';
import AboutCard from './aboutCard';

const aboutCardContainer = () => {
    const informations = [
        {
            id: '1',
            headline: 'Giovanni Capalbo',
            role: 'Producer, Actor',
            imageUrl: GiovanniImage,
            email: 'fabriquesrl@gmail.com' 
        },
        {
            id: '2',
            headline: 'Renata Di Leone',
            role: 'Administrator, Producer',
            imageUrl: RenataImage,
            email: 'fabriquesrl@gmail.com' 
        },
        {
            id: '3',
            headline: 'Domenico Capalbo',
            role: 'Director, Producer',
            imageUrl: DomenicoImage,
            email: 'domenico@fabriquentertainment.com' 
        },
    ]
    return (
    <section className={classes.about__wrapper__card__container}>
        <div className={classes.about__card__container}>
            {informations.map(info => (
                <AboutCard
                    key={info.id}
                    headline={info.headline}
                    role={info.role}
                    imageUrl={info.imageUrl}
                    email={info.email}
                /> 
                ))
            }
        </div>
    </section>
    );
}

export default aboutCardContainer;