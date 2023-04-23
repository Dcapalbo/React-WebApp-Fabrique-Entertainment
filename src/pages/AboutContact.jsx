import DetailAbout from "../components/UI/detailAbout/detailAbout";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import Navigation from "../components/nav/nav";

const About = () => {
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
