export const registerValidation = (email, password, repeatPassword) => {
  let errors = {};

  if (!email) {
    errors = { ...errors, email: "Email is required" };
  }

  if (!password) {
    errors = { ...errors, password: "Password is required" };
  }

  if (!repeatPassword) {
    errors = {
      ...errors,
      repeatPassword: "Repeat Password is required",
    };
  }

  if (password !== repeatPassword) {
    errors = {
      ...errors,
      repeatPassword: "Password and Repeat Password must match",
    };
  }

  return Object.keys(errors).length > 0 ? errors : null;
};
