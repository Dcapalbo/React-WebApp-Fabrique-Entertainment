import AboutCardContainer from "../components/UI/aboutCard/aboutCardContainer";
import CompanyInfo from "../components/UI/companyInfo/companyInfo";
import Footer from "../components/footer/footer";
import Header from "../components/header/header";
import Navigation from "../components/nav/nav";

const About = () => {
  return (
    <>
      <Header>
        <Navigation />
      </Header>
      <AboutCardContainer />
      <CompanyInfo />
      <Footer />
    </>
  );
};

export default About;
