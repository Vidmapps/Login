import { useRef, useEffect, useContext, FormEvent } from "react";
import classes from "./LoginForm.module.scss";
import usernameIcon from "../../assets/akar-icons_person.svg";
import passwordIcon from "../../assets/carbon_password.svg";
import ValidUserContext from "../../authCheck";
import { useTranslation } from "react-i18next";

let isInitial = true;

const LoginForm = () => {
  const { t } = useTranslation();

  const validUserContext = useContext(ValidUserContext);

  const emailInputRef = useRef<HTMLInputElement>(null!);
  const passwordInputRef = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    if (isInitial) {
      validUserContext.localAuthCheck();
      isInitial = false;
    }
  }, [validUserContext]);

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    validUserContext.apiAuthCheck(
      emailInputRef.current.value,
      passwordInputRef.current.value
    );
  };

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div>
        <img
          className={classes.icon}
          src={usernameIcon}
          alt="Username icon"
        />
        <input
          className={classes.input}
          type="email"
          id="username"
          name="username"
          autoComplete="on"
          placeholder={t("loginPage.username")}
          ref={emailInputRef}
          required={!validUserContext.isLoggedIn}
          data-testid="username" 
        />
      </div>

      <div>
        <img
          className={classes.icon}
          src={passwordIcon}
          alt="Password icon"
        />
        <input
          className={classes.input}
          type="password"
          id="userPassword"
          name="userPassword"
          autoComplete="off"
          placeholder={t("loginPage.password")}
          ref={passwordInputRef}
          required={!validUserContext.isLoggedIn}
          data-testid="password" 
        />
      </div>
      <button
        className={classes.loginBtn}
        disabled={validUserContext.isLoggedIn}
        data-testid="submit" 
      >
        {validUserContext.isLoggedIn ? t("loginPage.alreadyLoggedIn") : t("loginPage.login")}
      </button>
    </form>
  );
};

export default LoginForm;
