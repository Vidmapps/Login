import classes from "./LoginHead.module.scss";

const LoginHead = () => (
  <div>
    <title className={classes.loginTitle}>Login</title>
    <div>Please enter you Login and your Password</div>
  </div>
);

export default LoginHead;
