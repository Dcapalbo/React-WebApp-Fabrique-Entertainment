const descriptionLength = (value) =>
  value.trim().length >= 10 && value.trim().length <= 300;
const genericLength = (value) =>
  value.trim().length >= 3 && value.trim().length <= 30;
const durationLength = (value) =>
  value.trim().length >= 1 && value.trim().length <= 3;
const yearLength = (value) => value.trim().length === 4;
const isEmpty = (value) => value.trim() === "";
const surnameLength = (value) =>
  value.trim().length >= 3 && value.trim().length <= 20;
const roleLength = (value) =>
  value.trim().length >= 5 && value.trim().length <= 30;
const bioLength = (value) =>
  value.trim().length >= 10 && value.trim().length <= 300;
const emailCheck = (value) =>
  value.trim().length > 10 &&
  value.trim().length < 40 &&
  value.trim().includes("@");
const phoneNumberlength = (value) => value.length === 10;

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

export {
  descriptionLength,
  phoneNumberlength,
  surnameLength,
  genericLength,
  durationLength,
  roleLength,
  decodeToken,
  bioLength,
  emailCheck,
  yearLength,
  isEmpty,
};
