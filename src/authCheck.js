import { Users } from "./data";

export const authCheck = (enteredEmail, enteredPassword) => {
  const authUser = Users.find(
    (user) => user.email === enteredEmail && user.password === enteredPassword
  );
  return authUser;
};

export const localAuthCheck = () => {
  const localData = JSON.parse(localStorage.getItem("login-data"));
  if (localData !== null) {
    const loggedUser = Users.find(
      (user) =>
        user.email === localData.email && user.password === localData.password
    );
    return loggedUser;
  }
};
