import { createContext, useState, ReactNode } from "react";
import { useTranslation } from "react-i18next";

interface User {
  id: string;
  username: string;
  password: string;
}

interface ValidUserContextType {
  isLoggedIn: boolean;
  apiAuthCheck: (enteredEmail: string, enteredPassword: string) => Promise<void>;
  localAuthCheck: () => void;
}

export const ValidUserContext = createContext<ValidUserContextType>({
  isLoggedIn: false,
  apiAuthCheck: async () => {},
  localAuthCheck: () => {}
});

interface ValidUserContextProviderProps {
  children: ReactNode;
}

export const ValidUserContextProvider = ({ children }: ValidUserContextProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const { t } = useTranslation();

  const apiAuthCheckHandler = async (enteredEmail: string, enteredPassword: string) => {
    try {
      const response = await fetch("https://react-getting-started-aa01c-default-rtdb.firebaseio.com/seemsneat.json");
      const data = await response.json();
      const validUsers: User[] = Object.keys(data).map(key => ({ id: key, ...data[key] }));
      const authUser = validUsers.find(user => user.username === enteredEmail && user.password === enteredPassword);
      if (authUser) {
        localStorage.setItem("login-data", JSON.stringify(authUser));
        setIsLoggedIn(true);
        alert(t("alert.loggedIn"));
      } else {
        alert(t("alert.authFailed"));
      }
    } catch (error) {
      if (error instanceof TypeError) {
        alert(t("alert.networkError"));
      } else {
        alert(t("alert.serverError"));
      }
    }
  };

  const localAuthCheckHandler = () => {
    const localData = JSON.parse(localStorage.getItem("login-data") || "null");
    if (localData !== null) {
      setIsLoggedIn(true);
    }
  };

  const context: ValidUserContextType = {
    isLoggedIn,
    apiAuthCheck: apiAuthCheckHandler,
    localAuthCheck: localAuthCheckHandler
  };

  return (
    <ValidUserContext.Provider value={context}>
      {children}
    </ValidUserContext.Provider>
  );
};

export default ValidUserContext;
