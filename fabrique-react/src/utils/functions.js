const genericLength = (value) =>
  value.trim().length >= 3 && value.trim().length <= 30;
const isEmpty = (value) => value.trim() === "";
const emailCheck = (value) =>
  value.trim().length > 10 &&
  value.trim().length < 40 &&
  value.trim().includes("@");

const decodeToken = (token) => {
  let base64Url = token.split(".")[1];
  let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  let jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
};

const cleanLocalStorage = () => {
  const uriLocation = window.location.href;
  if (uriLocation !== "http://localhost:3000/admin/films/update-film") {
    window.localStorage.removeItem("dataUpdateFilm");
  } else if (
    uriLocation !== "http://localhost:3000/admin/contacts/update-contact"
  ) {
    window.localStorage.removeItem("dataUpdateContact");
  }
};

export { cleanLocalStorage, genericLength, decodeToken, emailCheck, isEmpty };
