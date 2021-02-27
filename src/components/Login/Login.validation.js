export const loginValidation = (email, password) => {
  let errors = {};

  if (!email) {
    errors = { ...errors, email: "Email is required" };
  }

  if (!password) {
    errors = { ...errors, password: "Password is required" };
  }

  return errors;
};
