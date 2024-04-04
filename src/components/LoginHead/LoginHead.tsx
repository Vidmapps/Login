import classes from "./LoginHead.module.scss";
import { useTranslation } from 'react-i18next';

const LoginHead = () => {
  const { t } = useTranslation();

  return ( 
    <div>
      <h1 className={classes.loginTitle}>{t("loginPage.login")}</h1>
      <div>{t("loginPage.passwordRequest")}</div>
    </div>
  );
};

export default LoginHead;
