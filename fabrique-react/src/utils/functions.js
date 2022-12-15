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

export {
  descriptionLength,
  phoneNumberlength,
  surnameLength,
  genericLength,
  durationLength,
  roleLength,
  bioLength,
  emailCheck,
  yearLength,
  isEmpty,
};
