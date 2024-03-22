import { createContext, useState } from "react";

const ValidUserContext = createContext({
  isLoggedIn: false,
  apiAuthCheck: () => {},
  localAuthCheck: () => {}
});

export const ValidUserContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const apiAuthCheckHandler = async (enteredEmail, enteredPassword) => {
    const url =
      "https://react-getting-started-aa01c-default-rtdb.firebaseio.com/seemsneat.json";
    await fetch(url).then((response) =>
      response
        .json()
        .then((data) => {
          const validUsers = [];
          for (const key in data) {
            const validUser = {
              id: key,
              ...data[key]
            };
            validUsers.push(validUser);
          }
          const authUser = validUsers.find(
            (user) =>
              user.username === enteredEmail &&
              user.password === enteredPassword
          );
          if (authUser !== undefined) {
            localStorage.setItem("login-data", JSON.stringify(authUser));
            setIsLoggedIn(authUser);
            alert("Logged in!");
          } else {
            alert("Authentication failed!");
          }
        })
        .catch((e) => {
          if (e instanceof TypeError) {
            alert("Network error occurred. Check your internet connection.");
          } else {
            alert("Server error occurred");
          }
        })
    );
  };

  const localAuthCheckHandler = () => {
    const localData = JSON.parse(localStorage.getItem("login-data"));
    localData !== null && setIsLoggedIn(true);
  };

  const context = {
    isLoggedIn: isLoggedIn,
    apiAuthCheck: apiAuthCheckHandler,
    localAuthCheck: localAuthCheckHandler
  };

  return (
    <ValidUserContext.Provider value={context}>
      {props.children}
    </ValidUserContext.Provider>
  );
};

export default ValidUserContext;
