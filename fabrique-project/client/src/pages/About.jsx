import AboutCardContainer from "../components/UI/aboutCard/aboutCardContainer";
import FilmCardContainer from "../components/UI/card/filmCardContainer";
import CompanyInfo from "../components/UI/companyInfo/companyInfo";
import { cleanLocalStorage } from "../utils/functions";
import Header from "../components/header/header";
import Navigation from "../components/nav/nav";

const About = () => {
  cleanLocalStorage();

  return (
    <>
      <Header>
        <Navigation />
      </Header>
      <AboutCardContainer />
      <CompanyInfo />
      <FilmCardContainer />
    </>
  );
};

export default About;
