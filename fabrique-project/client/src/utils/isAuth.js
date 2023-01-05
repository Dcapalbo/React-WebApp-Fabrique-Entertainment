import { decodeToken } from "./functions";

const isAuth = (auth) => {
  let token = window.sessionStorage.getItem(auth);
  let user;
  if (token) {
    user = decodeToken(token);
    if (Date.now() <= user.exp * 1000) {
      console.log(user);
      return true;
    } else if (Date.now() >= user.exp * 1000) {
      window.sessionStorage.removeItem(auth);
      window.sessionStorage.removeItem("userId");
      window.location.replace("/login");
      return false;
    }
  }
};

export { isAuth };
