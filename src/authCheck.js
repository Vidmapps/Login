import { createContext, useState } from "react";

const ValidUserContext = createContext({
  isLoggedIn: false,
  apiAuthCheck: (enteredEmail, enteredPassword) => {},
  localAuthCheck: () => {},
});

export const ValidUserContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  async function apiAuthCheckHandler(enteredEmail, enteredPassword) {
    const url =
      "https://react-getting-started-aa01c-default-rtdb.firebaseio.com/seemsneat.json";
    await fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const validUsers = [];
        for (const key in data) {
          const validUser = {
            id: key,
            ...data[key],
          };
          validUsers.push(validUser);
        }
        const authUser = validUsers.find(
          (user) =>
            user.username === enteredEmail && user.password === enteredPassword
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
        alert("Server error");
      });
  }

  const localAuthCheckHandler = () => {
    const localData = JSON.parse(localStorage.getItem("login-data"));
    if (localData !== null) {
      setIsLoggedIn(true);
    }
  };

  const context = {
    isLoggedIn: isLoggedIn,
    apiAuthCheck: apiAuthCheckHandler,
    localAuthCheck: localAuthCheckHandler,
  };

  return (
    <ValidUserContext.Provider value={context}>
      {props.children}
    </ValidUserContext.Provider>
  );
};

export default ValidUserContext;
