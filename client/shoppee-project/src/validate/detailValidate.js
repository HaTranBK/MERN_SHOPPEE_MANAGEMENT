const checkSpace = (value) => {
  if (value === "") return "Please dont leave this field a blank";
  if (value.trim() === "") return "The unappropriate name !";
};
export const validateFirstName = (value) => {
  const res = checkSpace(value);
  if (!res) {
    if (value.length < 3) {
      return "First name must be at least 3 characters long";
    }
    return "";
  }
  return res;
};

export const validateLastName = (value) => {
  const res = checkSpace(value);
  if (!res) {
    if (value.length < 3) {
      return "Last name must be at least 3 characters long";
    }
    return "";
  }
  return res;
};

export const validateEmail = (value) => {
  const res = checkSpace(value);
  if (!res) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return "Invalid email address";
    }
    return "";
  }
  return res;
};

export const validatePhone = (value) => {
  const res = checkSpace(value);
  if (!res) {
    const vietnamPhoneNumberRegex = /^(0\d{9,10})|(0\d{1,2}-\d{6,7})$/;
    return vietnamPhoneNumberRegex.test(value)
      ? ""
      : "Please type the correct Viet Nam format phone number !";
  }
  return res;
};

export const validateAccount = (value) => {
  const res = checkSpace(value);
  if (!res) {
    if (value.length < 5)
      return "Account name must contain at least 5 characters !";
    return "";
  }
  return res;
};

export const validatePassword = (value) => {
  const res = checkSpace(value);
  if (!res) {
    const length = value.length;
    const passwordRegex = /^[a-zA-Z0-9]+$/;
    if (value[0] === " " || value[value.length - 1] === " ")
      return "Dont add space keyword at start and end of string !";
    if (length < 8)
      return "Password must have more than or equal 8 characters !";
    return passwordRegex.test(value)
      ? ""
      : "Password must contain both alphabet and number !";
  }
  return res;
};
export const validateGender = (value) => {
  return value === "" ? "Choose your gender !" : "";
};
export const validateRole = (value) => {
  return value === "" ? "Choose your role !" : "";
};
