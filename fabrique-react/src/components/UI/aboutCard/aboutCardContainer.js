import ApiHook from '../../../hooks/api-hook';
import classes from './aboutCardContainer.module.scss';
import AboutCard from './aboutCard';
import Spinner from '../spinner/spinner';

const AboutCardContainer = () => {

    const { fabriqueData, loading, error } = ApiHook(
        "https://uvaf6p0qv3.execute-api.us-east-2.amazonaws.com/dev", 
        "fabriqueContactsInformations"
    );

    if ( loading ) {
        return <Spinner />
    } else if ( error ) {
        <h1>There is some problem, please try to refresh</h1>
    } else {
        return (
            <section className={classes.about__wrapper__card__container}>
                <div className={classes.about__card__container}>
                    {fabriqueData.map(contact => (
                        <AboutCard
                            headline={contact.headline}
                            imageUrl={contact.imageUrl}
                            email={contact.email}
                            role={contact.role}
                            key={contact.id}
                        /> 
                        ))
                    }
                </div>
            </section>
        )
    }
}

export default AboutCardContainer;
