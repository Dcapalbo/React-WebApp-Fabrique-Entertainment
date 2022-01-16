import classes from './hero.module.scss';
import HeroVideo from '../../assets/img/80 - Fabrique_E_Logo_Animato.mp4';

const Hero = () => {
    return(
        <section className={classes.hero}>
            <video className={classes.fabrique__video} controls autoPlay="autoPlay">
                <source src={HeroVideo} type="video/mp4"/>
            </video>
        </section>
    )
}

export default Hero;