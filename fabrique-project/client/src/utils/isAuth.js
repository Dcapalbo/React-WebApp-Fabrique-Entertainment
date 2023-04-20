import { decodeToken } from "./functions";

const isAuth = (auth) => {
  let token = auth;
  let user;
  if (token) {
    user = decodeToken(token);
    if (Date.now() <= user.exp * 1000) {
      return true;
    } else if (Date.now() >= user.exp * 1000) {
      console.log("FUNZIOOOOOONAAAAA IL TOKEN EXPIRAAAAATIOOON");
      window.sessionStorage.removeItem(auth);
      window.sessionStorage.removeItem("userId");
      window.location.replace("/login");
      return false;
    }
  }
};

export { isAuth };
