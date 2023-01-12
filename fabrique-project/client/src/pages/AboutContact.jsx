import { cleanLocalStorage } from "../utils/functions";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import Navigation from "../components/nav/nav";
import DetailAbout from "../components/UI/detailAbout/detailAbout";

const About = () => {
  cleanLocalStorage();

  return (
    <>
      <Header>
        <Navigation />
      </Header>
      <DetailAbout />
      <Footer />
    </>
  );
};

export default About;
