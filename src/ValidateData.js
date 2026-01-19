export const validateName = (name) => {
  if (!name) return "Name is required";
  const regex=/^[a-zA-Z]+$/;
  if (!(name.match(regex))) return "Name should not contain digitsor Special Charecters"
  return "";
};

export const validateEmail = (email) => {
  if (!email) return "Email is required";
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!(email.match(regex))) return "Invalid email format";
  return "";
};

export const validateMobile = (mobile) => {
  if (!mobile) return "Mobile number is required";
  const regex = /^[0-9]{10}$/;
  if (!(mobile.match(regex))) return "Mobile number must be 10 digits";
  return "";
};

export const validatePassword = (password) => {
  if (!password) return "Password is required";
  if (password.length < 6) return "Password must be at least 6 characters";
  return "";
};

export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) return "Confirm password is required";
  if (password !== confirmPassword) return "Passwords do not match";
  return "";
};