import classes from "./Layout.module.scss";

const Layout = (props) => (
  <div className={classes.content}>{props.children}</div>
);

export default Layout;
