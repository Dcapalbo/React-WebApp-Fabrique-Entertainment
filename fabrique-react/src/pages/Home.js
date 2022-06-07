import { Fragment } from 'react';

import ContactForm from '../components/UI/form/contactForm';
import CardContainer from '../components/UI/card/cardContainer';
import Accordion from '../components/UI/accordion/accordion';
import Header from "../components/header/header";
import Footer from '../components/footer/footer';
import Navigation from "../components/nav/nav";
import Hero from "../components/hero/hero";

const Home = () => {
    return (
        <Fragment>
            <Header>
                <Navigation/>
            </Header>
            <Hero />
            <Accordion />
            <CardContainer />
            <ContactForm />
            <Footer />
        </Fragment>
    )
}

export default Home;