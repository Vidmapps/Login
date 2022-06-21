import { useState, useRef, useEffect } from "react";
import { authCheck, localAuthCheck } from "../authCheck";

import classes from "./LoginForm.module.scss";
import usernameIcon from "../assets/akar-icons_person.svg";
import passwordIcon from "../assets/carbon_password.svg";

let isInitial = true;

function LoginForm() {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [loginData, setLoginData] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (isInitial) {
      setIsLoggedIn(localAuthCheck());
      isInitial = false;
    } else {
      localStorage.setItem("login-data", JSON.stringify(loginData));
    }
  }, [loginData]);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    if (authCheck(enteredEmail, enteredPassword)) {
      setLoginData(authCheck(enteredEmail, enteredPassword));
      setIsLoggedIn(true);
      alert("Logged in!");
    } else {
      setIsLoggedIn(false);
      alert("Authentication failed!");
    }
  };

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div>
        <img
          className={classes.icon}
          src={usernameIcon}
          alt="Username icon"
          htmlFor="user-name"
        ></img>
        <input
          className={classes.input}
          type="email"
          id="user-name"
          name="user-name"
          autoComplete="off"
          placeholder="Username or E-mail"
          ref={emailInputRef}
          required={!isLoggedIn}
        ></input>
      </div>

      <div>
        <img
          className={classes.icon}
          src={passwordIcon}
          alt="Password icon"
          htmlFor="user-password"
        ></img>
        <input
          className={classes.input}
          type="password"
          id="user-password"
          name="user-password"
          autoComplete="off"
          placeholder="Password"
          ref={passwordInputRef}
          required={!isLoggedIn}
        ></input>
      </div>
      <button className={classes.loginBtn} disabled={isLoggedIn}>
        {isLoggedIn ? "Already logged in" : "Login"}
      </button>
    </form>
  );
}

export default LoginForm;
