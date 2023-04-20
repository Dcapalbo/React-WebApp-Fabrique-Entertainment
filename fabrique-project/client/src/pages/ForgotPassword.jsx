import ForgotPassword from "../components/UI/form/forgotPassword";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import Navigation from "../components/nav/nav";

const ForgotPasswordForm = () => {
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
