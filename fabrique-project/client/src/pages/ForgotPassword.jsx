import ForgotPassword from "../components/UI/form/forgotPassword";
import { cleanLocalStorage } from "../utils/functions";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import Navigation from "../components/nav/nav";

const ForgotPasswordForm = () => {
  cleanLocalStorage();

  return (
    <>
      <Header>
        <Navigation />
      </Header>
      <ForgotPassword />
      <Footer />
    </>
  );
};

export default ForgotPasswordForm;
