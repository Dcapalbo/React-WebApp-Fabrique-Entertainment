import { cleanLocalStorage } from "../utils/functions";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import Navigation from "../components/nav/nav";
import DetailContact from "../components/UI/detailContact/detailContact";

const Contact = () => {
  cleanLocalStorage();

  return (
    <>
      <Header>
        <Navigation />
      </Header>
      <DetailContact />
      <Footer />
    </>
  );
};

export default Contact;
