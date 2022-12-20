import { decodeToken } from "./functions";

const isAuth = (auth) => {
  let token = window.localStorage.getItem(auth);
  let user;
  if (token) {
    user = decodeToken(token);
    if (Date.now() <= user.exp * 1000) {
      return true;
    } else if (Date.now() >= user.exp * 1000) {
      window.localStorage.removeItem(auth);
      window.location.replace("/login");
      return false;
    }
  }
};

export { isAuth };
