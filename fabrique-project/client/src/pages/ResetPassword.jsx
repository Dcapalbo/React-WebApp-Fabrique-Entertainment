import ResetPassword from "../components/UI/form/resetPassword";
import { cleanLocalStorage } from "../utils/functions";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import Navigation from "../components/nav/nav";

const ResetPasswordForm = () => {
  cleanLocalStorage();

  return (
    <>
      <Header>
        <Navigation />
      </Header>
      <ResetPassword />
      <Footer />
    </>
  );
};

export default ResetPasswordForm;
