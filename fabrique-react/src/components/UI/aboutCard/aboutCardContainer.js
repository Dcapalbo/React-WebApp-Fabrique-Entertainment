import { useState, useEffect } from 'react';

import classes from './aboutCardContainer.module.scss';
import AboutCard from './aboutCard';
import axios from 'axios';

const aboutCardContainer = () => {

    // find and solve the problem 
    const [loading, setloading] = useState(false);
    const [error, setError] = useState(null);
    const [contacts, setContacts] = useState([]);

    const url = "https://uvaf6p0qv3.execute-api.us-east-2.amazonaws.com/dev";

    useEffect(() => {
        setloading(true);
        axios
        .get(url)   
            .then(res => {
                setContacts(res.data.body.fabriqueContactsInformations);
                console.log(res.data.body);
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
            <section className={classes.about__wrapper__card__container}>
                <div className={classes.about__card__container}>
                    {contacts.map(contact => (
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

export default aboutCardContainer;
