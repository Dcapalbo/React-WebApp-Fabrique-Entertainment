import Header from "../components/header/header";
import Navigation from "../components/nav/nav";
import CompanyInfo from "../components/UI/companyInfo/companyInfo";
import FilmCardContainer from "../components/UI/card/filmCardContainer";
import AboutCardContainer from "../components/UI/aboutCard/aboutCardContainer";

const About = () => {
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
