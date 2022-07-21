import ContactForm from '../components/UI/form/contactForm';
import FilmCardContainer from '../components/UI/card/filmCardContainer';
import Accordion from '../components/UI/accordion/accordion';
import Header from "../components/header/header";
import Footer from '../components/footer/footer';
import Navigation from "../components/nav/nav";
import Hero from "../components/hero/hero";

const Home = () => {
    return (
        <>
            <Header>
                <Navigation/>
            </Header>
            <Hero />
            <Accordion />
            <FilmCardContainer />
            <ContactForm />
            <Footer />
        </>
    )
}

export default Home;