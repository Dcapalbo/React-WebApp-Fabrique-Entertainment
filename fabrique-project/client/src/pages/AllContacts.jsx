import AboutCardContainer from "../components/UI/aboutCard/aboutCardContainer";
import Footer from "../components/footer/footer";
import Header from "../components/header/header";
import Navigation from "../components/nav/nav";

const AllContacts = () => {
  return (
    <>
      <Header>
        <Navigation />
      </Header>
      <AboutCardContainer />
      <Footer />
    </>
  );
};

export default AllContacts;
